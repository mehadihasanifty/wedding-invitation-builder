"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { clientEnv } from "@/lib/env";

type RecoveryMode = "request" | "reset";

export function PasswordRecovery({ mode }: { mode: RecoveryMode }) {
  const params = useSearchParams();
  const token = params.get("token");
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "request") return;
    fetch(new URL("/api/auth/config", clientEnv.NEXT_PUBLIC_API_URL), { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not check account recovery availability.");
        const body = await response.json() as { data?: { passwordRecoveryEnabled?: boolean } };
        setEnabled(body.data?.passwordRecoveryEnabled === true);
      }).catch(() => setEnabled(false));
  }, [mode]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const values = new FormData(event.currentTarget);
    try {
      if (mode === "request") {
        const result = await authClient.requestPasswordReset({ email: String(values.get("email") ?? "").trim(), redirectTo: `${window.location.origin}/reset-password` });
        if (result.error) throw new Error(result.error.message || "A reset message could not be requested.");
        setMessage("If an account exists for that email, a password reset link will arrive shortly.");
      } else {
        const result = await authClient.resetPassword({ token: token ?? "", newPassword: String(values.get("password") ?? "") });
        if (result.error) throw new Error(result.error.message || "The reset link may be invalid or expired.");
        setMessage("Your password has been reset. You can now sign in.");
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "We could not complete your request."); }
    finally { setBusy(false); }
  }

  if (mode === "request" && enabled === null) return <p role="status" className="mt-7 text-sm text-muted-foreground">Checking recovery availability…</p>;
  if (mode === "request" && !enabled) return <div className="mt-7 rounded-xl border border-border bg-secondary/50 p-4 text-sm leading-6 text-muted-foreground">Password recovery email has not been configured for this environment. Please contact the site administrator for help.</div>;
  return <form className="mt-8 space-y-5" onSubmit={submit}>
    {mode === "request" ? <label className="block text-sm font-medium">Email address<input type="email" name="email" autoComplete="email" required className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4" /></label> : <label className="block text-sm font-medium">New password<input type="password" name="password" autoComplete="new-password" minLength={8} maxLength={128} required className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4" /></label>}
    {mode === "reset" && !token && <p role="alert" className="text-sm text-destructive">This reset link is missing its token. Request a new link to continue.</p>}
    {message && <p role="status" className="rounded-xl bg-brand-botanical/10 px-4 py-3 text-sm text-brand-botanical">{message} {mode === "reset" && <Link href="/login" className="underline">Sign in</Link>}</p>}{error && <p role="alert" className="rounded-xl bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}
    <button disabled={busy || (mode === "reset" && !token)} className="h-12 w-full rounded-xl bg-primary px-5 font-medium text-primary-foreground disabled:opacity-60">{busy ? "Please wait…" : mode === "request" ? "Send reset link" : "Reset password"}</button>
  </form>;
}
