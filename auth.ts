import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "@/auth.config";
import { InvalidCredentialsError, RateLimitedError, RecaptchaError, ServerError } from "@/lib/auth-errors";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, clearAttempts, getClientIp, recordFailedAttempt } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { adminCredentialsSchema } from "@/lib/validations/auth";

const RECAPTCHA_ACTION = "login";

// Runs once per cold start. Auth.js reads AUTH_SECRET from process.env at
// this exact module-load moment (setEnvDefaults in next-auth/lib/env.js) —
// if it's missing, EVERY /api/auth/* route fails Auth.js's own config
// assertion (@auth/core assertConfig), which is what produces the generic
// "There is a problem with the server configuration" page / 500 on
// /api/auth/providers. Logging presence only, never values.
for (const key of ["AUTH_SECRET", "DATABASE_URL", "DIRECT_URL"] as const) {
  if (!process.env[key]) {
    console.error(`[auth] Missing required environment variable: ${key}`);
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        recaptchaToken: { label: "Recaptcha Token", type: "text" },
      },
      async authorize(credentials, request) {
        const ip = getClientIp(request);

        // Deliberate CredentialsSignin rejections (rate limit, recaptcha,
        // bad credentials) rethrow as-is. Anything else — a Prisma/network
        // blip, a bug — is caught below and converted to ServerError so it
        // can never surface as Auth.js's generic "problem with the server
        // configuration" page or an unhandled 500.
        try {
          if (checkRateLimit(ip).limited) {
            console.warn(`[auth] Rejected: IP ${ip} is rate-limited.`);
            throw new RateLimitedError();
          }

          const recaptchaToken =
            typeof credentials?.recaptchaToken === "string" ? credentials.recaptchaToken : undefined;
          console.log(`[auth] reCAPTCHA token present: ${Boolean(recaptchaToken)}`);

          const recaptchaResult = await verifyRecaptcha(recaptchaToken, ip, RECAPTCHA_ACTION);
          console.log("[auth] reCAPTCHA result:", recaptchaResult);

          if (!recaptchaResult.ok && recaptchaResult.reason !== "not_configured") {
            recordFailedAttempt(ip);
            throw new RecaptchaError();
          }

          const parsed = adminCredentialsSchema.safeParse(credentials);
          if (!parsed.success) {
            recordFailedAttempt(ip);
            throw new InvalidCredentialsError();
          }

          const { email, password } = parsed.data;

          const admin = await prisma.admin.findUnique({ where: { email } });
          console.log(`[auth] Admin lookup for "${email}": ${admin ? "found" : "not found"}`);
          if (!admin) {
            recordFailedAttempt(ip);
            throw new InvalidCredentialsError();
          }

          const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
          console.log(`[auth] Password comparison: ${isValidPassword ? "match" : "mismatch"}`);
          if (!isValidPassword) {
            recordFailedAttempt(ip);
            throw new InvalidCredentialsError();
          }

          clearAttempts(ip);

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name ?? admin.email,
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          }
          console.error("[auth] Unexpected error in authorize():", error);
          throw new ServerError();
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
