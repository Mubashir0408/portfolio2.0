import type { NextAuthConfig } from "next-auth";

// Edge-safe config used by middleware.ts. Must stay free of Node-only
// dependencies (Prisma, bcrypt) since middleware runs on the Edge runtime.
// The Credentials provider (which needs those) is added in auth.ts, which
// only runs in the Node runtime (API route, Server Components, Server Actions).
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin) {
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
