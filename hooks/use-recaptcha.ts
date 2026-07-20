"use client";

import { useCallback, useEffect, useRef } from "react";

const RECAPTCHA_SCRIPT_ID = "recaptcha-v3-script";

function loadRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }

    const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load reCAPTCHA script"))
      );
      return;
    }

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
    document.head.appendChild(script);
  });
}

/**
 * Invisible reCAPTCHA v3: no widget, no checkbox. `execute()` resolves to
 * `null` (instead of throwing) whenever the site key is missing or the
 * script fails to load, so the login flow degrades gracefully — the server
 * treats a missing token as unconfigured/rejected as appropriate.
 *
 * Failures are logged with their actual reason (e.g. grecaptcha.execute()
 * rejects client-side with codes like "browser-error" when Google's script
 * can't complete the challenge — commonly caused by an ad blocker/privacy
 * extension blocking google.com, or the site key's domain not being
 * authorized). That reason previously got silently discarded, which made
 * "Unable to verify reCAPTCHA" impossible to diagnose from just the UI.
 */
export function useRecaptcha(siteKey: string | undefined) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!siteKey || loadedRef.current) {
      return;
    }
    loadedRef.current = true;
    loadRecaptchaScript(siteKey)
      .then(() => console.log("[recaptcha] Script loaded successfully."))
      .catch((error: unknown) => {
        console.error("[recaptcha] Script failed to load:", error);
        loadedRef.current = false;
      });
  }, [siteKey]);

  const execute = useCallback(
    async (action: string): Promise<string | null> => {
      if (!siteKey) {
        console.warn(
          "[recaptcha] No NEXT_PUBLIC_RECAPTCHA_SITE_KEY configured — skipping token generation."
        );
        return null;
      }

      try {
        await loadRecaptchaScript(siteKey);
      } catch (error) {
        console.error("[recaptcha] Script load failed during execute():", error);
        return null;
      }

      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) {
        console.error("[recaptcha] window.grecaptcha is unavailable after script load.");
        return null;
      }

      return new Promise<string | null>((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(siteKey, { action })
            .then((token) => {
              console.log("[recaptcha] Token generated successfully.");
              resolve(token);
            })
            .catch((error: unknown) => {
              console.error("[recaptcha] grecaptcha.execute() rejected:", error);
              resolve(null);
            });
        });
      });
    },
    [siteKey]
  );

  return { execute };
}
