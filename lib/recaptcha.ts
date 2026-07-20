const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

export type RecaptchaCheckResult =
  | { ok: true }
  | {
      ok: false;
      reason: "not_configured" | "missing_token" | "verification_failed" | "low_score";
    };

let warnedMissingSecret = false;

/**
 * Verifies a reCAPTCHA v3 token server-side. If RECAPTCHA_SECRET_KEY isn't
 * set, verification is skipped (reason: "not_configured") rather than
 * blocking login — this keeps the admin login usable before reCAPTCHA is
 * configured instead of crashing or locking everyone out.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  remoteIp: string | undefined
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

    const data = (await response.json()) as {
      success: boolean;
      score?: number;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.error("[recaptcha] Verification rejected by Google:", data["error-codes"]);
      return { ok: false, reason: "verification_failed" };
    }

    if (typeof data.score === "number" && data.score < MIN_SCORE) {
      return { ok: false, reason: "low_score" };
    }

    return { ok: true };
  } catch (error) {
    console.error("[recaptcha] Verification request failed:", error);
    return { ok: false, reason: "verification_failed" };
  }
}
