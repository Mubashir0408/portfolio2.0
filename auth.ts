import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "@/auth.config";
import { InvalidCredentialsError, RateLimitedError, RecaptchaError } from "@/lib/auth-errors";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, clearAttempts, getClientIp, recordFailedAttempt } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { adminCredentialsSchema } from "@/lib/validations/auth";

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

        if (checkRateLimit(ip).limited) {
          throw new RateLimitedError();
        }

        const recaptchaToken =
          typeof credentials?.recaptchaToken === "string" ? credentials.recaptchaToken : undefined;
        const recaptchaResult = await verifyRecaptcha(recaptchaToken, ip);
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
        if (!admin) {
          recordFailedAttempt(ip);
          throw new InvalidCredentialsError();
        }

        const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
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
