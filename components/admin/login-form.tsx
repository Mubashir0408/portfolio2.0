"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { useRecaptcha } from "@/hooks/use-recaptcha";
import { adminCredentialsSchema, type AdminCredentials } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ERROR_DISPLAY_MS = 5000;

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Invalid email or password.",
  rate_limited: "Too many failed login attempts. Please try again in 10 minutes.",
  recaptcha_failed: "Unable to verify reCAPTCHA. Please refresh the page.",
  server_error: "Something went wrong. Please try again in a moment.",
};

function resolveErrorMessage(code: string | undefined): string {
  if (code && code in ERROR_MESSAGES) {
    return ERROR_MESSAGES[code]!;
  }
  return ERROR_MESSAGES.invalid_credentials!;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const { execute: executeRecaptcha } = useRecaptcha(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  );

  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!error) {
      return;
    }
    const timeout = setTimeout(() => setError(null), ERROR_DISPLAY_MS);
    return () => clearTimeout(timeout);
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminCredentials>({
    resolver: zodResolver(adminCredentialsSchema),
  });

  async function onSubmit(data: AdminCredentials) {
    setError(null);
    setIsSubmitting(true);

    try {
      const recaptchaToken = await executeRecaptcha("login");

      const result = await signIn("credentials", {
        ...data,
        recaptchaToken: recaptchaToken ?? "",
        redirect: false,
      });

      if (!result || result.error) {
        setError(resolveErrorMessage(result?.code));
        setIsSubmitting(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      // signIn() itself can throw (e.g. a raw 500 with a non-JSON body) —
      // without this, a hard server error left the button stuck on
      // "Signing in..." forever with no feedback at all.
      console.error("[login] Unexpected error during sign-in:", error);
      setError(ERROR_MESSAGES.server_error!);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="glass w-full max-w-md rounded-3xl p-8">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg font-extrabold text-white">
          MI
        </span>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage contact submissions.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="size-4" />
              Sign in
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
