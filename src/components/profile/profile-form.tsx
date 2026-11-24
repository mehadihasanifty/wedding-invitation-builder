"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { clientEnv } from "@/lib/env";

export function ProfileForm({ initialName, initialImage, email }: { initialName: string; initialImage: string; email: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); setError("");
    try {
      const response = await fetch(new URL("/api/users/me", clientEnv.NEXT_PUBLIC_API_URL), {
        method: "PATCH", credentials: "include", headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, ...(image.trim() ? { image: image.trim() } : { image: null }) }),
      });
      const body = await response.json() as { success: boolean; message: string };
      if (!response.ok || !body.success) throw new Error(body.message || "Profile could not be updated.");
      setMessage("Your profile has been saved."); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Profile could not be updated."); }
    finally { setBusy(false); }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); setError("");
    try {
      const result = await authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true });
      if (result.error) throw new Error(result.error.message || "Password could not be changed.");
      setMessage("Your password has been changed. Other sessions have been signed out."); setCurrentPassword(""); setNewPassword("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Password could not be changed."); }
    finally { setBusy(false); }
  }

  return <div className="mt-8 space-y-10">
    <form className="space-y-5" onSubmit={saveProfile}><label className="block text-sm font-medium">Name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4" /></label><label className="block text-sm font-medium">Email address<input value={email} readOnly aria-describedby="email-note" className="mt-2 h-12 w-full rounded-xl border border-border bg-secondary/50 px-4 text-muted-foreground"/><span id="email-note" className="mt-1 block text-xs text-muted-foreground">Email changes are not enabled for this account.</span></label><label className="block text-sm font-medium">Profile image URL <span className="font-normal text-muted-foreground">(optional)</span><input type="url" value={image} onChange={(event) => setImage(event.target.value)} maxLength={2048} placeholder="https://…" className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4" /></label><button disabled={busy} className="h-12 rounded-xl bg-primary px-5 font-medium text-primary-foreground disabled:opacity-60">{busy ? "Saving…" : "Save profile"}</button></form>
    <div className="border-t border-border pt-8"><h2 className="text-2xl">Change password</h2><form className="mt-5 space-y-4" onSubmit={changePassword}><label className="block text-sm font-medium">Current password<input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4" /></label><label className="block text-sm font-medium">New password<input type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={8} maxLength={128} required className="mt-2 h-12 w-full rounded-xl border border-border bg-white/75 px-4" /></label><button disabled={busy} className="h-12 rounded-xl border border-border px-5 font-medium hover:bg-secondary disabled:opacity-60">Update password</button></form></div>
    {message && <p role="status" className="rounded-xl bg-brand-botanical/10 px-4 py-3 text-sm text-brand-botanical">{message}</p>}{error && <p role="alert" className="rounded-xl bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}
  </div>;
}
