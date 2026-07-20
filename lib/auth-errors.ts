import { CredentialsSignin } from "next-auth";

// Custom `code` values surface via `result.code` from the client-side
// `signIn()` call, letting the login form show a specific message per
// failure reason without leaking which part of the credentials was wrong.
export class InvalidCredentialsError extends CredentialsSignin {
  override code = "invalid_credentials";
}

export class RateLimitedError extends CredentialsSignin {
  override code = "rate_limited";
}

export class RecaptchaError extends CredentialsSignin {
  override code = "recaptcha_failed";
}

// Thrown when authorize() hits something unexpected (DB blip, network
// error, etc.) instead of a real credential/rate-limit/recaptcha rejection —
// keeps those failures from surfacing as Auth.js's generic "There is a
// problem with the server configuration" page.
export class ServerError extends CredentialsSignin {
  override code = "server_error";
}
