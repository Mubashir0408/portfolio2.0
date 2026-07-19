import { Resend } from "resend";

let resendClient: Resend | null = null;

/**
 * Lazily constructs the Resend client. The SDK throws if instantiated
 * without an API key, so we defer construction until a request actually
 * needs to send mail — a missing key then only disables email sending
 * instead of crashing route module loading (and the production build).
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Resend's sandbox sender works without a verified domain, so emails still
// go out in local/dev. Once a domain is verified in the Resend dashboard,
// swap this for an address on that domain (e.g. "Mubashir Ijaz <hello@mubashirijaz.dev>").
export const CONTACT_FROM_EMAIL = "Mubashir Ijaz <onboarding@resend.dev>";
