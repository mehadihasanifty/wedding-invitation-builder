"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message || "Sign out could not be completed.");
      router.replace("/"); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Sign out could not be completed."); }
    finally { setBusy(false); }
  }
  return <div className="text-right"><button type="button" onClick={() => void signOut()} disabled={busy} className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-secondary disabled:opacity-60">{busy ? "Signing out…" : "Sign out"}</button>{error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}</div>;
}
