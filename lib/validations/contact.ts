import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  subject: z.string().trim().min(4, "Subject must be at least 4 characters").max(200),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
