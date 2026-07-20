import { handlers } from "@/auth";

// Explicit for clarity/safety: this route pulls in Prisma and bcrypt via
// auth.ts, both Node-only. The App Router defaults route handlers to the
// Node runtime already, but declaring it removes any ambiguity.
export const runtime = "nodejs";

export const { GET, POST } = handlers;
