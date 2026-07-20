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
 */
export function useRecaptcha(siteKey: string | undefined) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!siteKey || loadedRef.current) {
      return;
    }
    loadedRef.current = true;
    loadRecaptchaScript(siteKey).catch(() => {
      loadedRef.current = false;
    });
  }, [siteKey]);

  const execute = useCallback(
    async (action: string): Promise<string | null> => {
      if (!siteKey) {
        return null;
      }

      try {
        await loadRecaptchaScript(siteKey);
      } catch {
        return null;
      }

      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) {
        return null;
      }

      return new Promise<string | null>((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(siteKey, { action }).then(resolve).catch(() => resolve(null));
        });
      });
    },
    [siteKey]
  );

  return { execute };
}
