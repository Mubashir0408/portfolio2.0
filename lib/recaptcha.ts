const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

export type RecaptchaCheckResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "not_configured"
        | "missing_token"
        | "verification_failed"
        | "low_score"
        | "action_mismatch";
    };

interface RecaptchaApiResponse {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
}

let warnedMissingSecret = false;

/**
 * Verifies a reCAPTCHA v3 token server-side against Google's siteverify
 * endpoint (https://developers.google.com/recaptcha/docs/v3). If
 * RECAPTCHA_SECRET_KEY isn't set, verification is skipped (reason:
 * "not_configured") rather than blocking login — this keeps the admin login
 * usable before reCAPTCHA is configured instead of crashing or locking
 * everyone out.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  remoteIp: string | undefined,
  expectedAction?: string
): Promise<RecaptchaCheckResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    if (!warnedMissingSecret) {
      console.warn(
        "[recaptcha] RECAPTCHA_SECRET_KEY is not set — skipping reCAPTCHA verification on admin login. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY to enable it."
      );
      warnedMissingSecret = true;
    }
    return { ok: false, reason: "not_configured" };
  }

  if (!token) {
    console.warn("[recaptcha] No token supplied — the client failed to obtain one.");
    return { ok: false, reason: "missing_token" };
  }

  try {
    const params = new URLSearchParams({ secret: secretKey, response: token });
    if (remoteIp && remoteIp !== "unknown") {
      params.set("remoteip", remoteIp);
    }

    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = (await response.json()) as RecaptchaApiResponse;

    // Logged unconditionally (no secrets in this payload) — this is exactly
    // what's needed to diagnose a live "verification failing" report: score,
    // action, hostname (confirms the request came from the expected
    // domain), and Google's own error-codes.
    console.log("[recaptcha] Google siteverify response:", {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
      "error-codes": data["error-codes"],
    });

    if (!data.success) {
      return { ok: false, reason: "verification_failed" };
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(
        `[recaptcha] Action mismatch: expected "${expectedAction}", got "${data.action}".`
      );
      return { ok: false, reason: "action_mismatch" };
    }

    if (typeof data.score === "number" && data.score < MIN_SCORE) {
      return { ok: false, reason: "low_score" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[recaptcha] Verification request to Google failed:", error);
    return { ok: false, reason: "verification_failed" };
  }
}
