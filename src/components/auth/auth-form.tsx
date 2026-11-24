"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCallback = searchParams.get("callbackURL");
  const callbackURL = requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//") && !requestedCallback.includes("\\")
    ? requestedCallback
    : "/dashboard";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    try {
      const result = mode === "register"
        ? await authClient.signUp.email({ name: String(data.get("name") ?? "").trim(), email, password, callbackURL })
        : await authClient.signIn.email({ email, password, callbackURL });
      if (result.error) throw new Error(result.error.message || "We could not complete your request.");
      router.replace(callbackURL);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not complete your request.");
    } finally { setBusy(false); }
  }

  return <form className="mt-8 space-y-5" onSubmit={submit}>
    {mode === "register" && <label className="block text-sm font-medium">Your name<input autoComplete="name" name="name" required maxLength={100} className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>}
    <label className="block text-sm font-medium">Email address<input autoComplete="email" type="email" name="email" required maxLength={254} className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4 outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
    <label className="block text-sm font-medium">Password<input autoComplete={mode === "register" ? "new-password" : "current-password"} type="password" name="password" required minLength={mode === "register" ? 8 : 1} maxLength={128} className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4 outline-none focus-visible:ring-2 focus-visible:ring-ring" />{mode === "register" && <span className="mt-1 block text-xs text-muted-foreground">Use at least 8 characters.</span>}</label>
    {mode === "login" && <div className="text-right"><Link className="text-sm text-primary underline-offset-4 hover:underline" href="/forgot-password">Forgot password?</Link></div>}
    {error && <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}
    <button disabled={busy} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 font-medium text-primary-foreground shadow-elegant transition hover:brightness-110 disabled:cursor-wait disabled:opacity-65">{busy ? "Please wait…" : mode === "register" ? "Create your account" : "Sign in"}</button>
    <p className="text-center text-sm text-muted-foreground">{mode === "register" ? "Already have an account?" : "New to Everafter?"} <Link className="font-medium text-primary underline-offset-4 hover:underline" href={mode === "register" ? "/login" : "/register"}>{mode === "register" ? "Sign in" : "Create an account"}</Link></p>
  </form>;
}
