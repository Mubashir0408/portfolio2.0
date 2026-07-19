import { z } from "zod";

export const adminCredentialsSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type AdminCredentials = z.infer<typeof adminCredentialsSchema>;
