import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProfileForm } from "@/components/profile/profile-form";
import { requireServerUser } from "@/lib/auth-server";

export const metadata: Metadata = { title: "Your profile", robots: { index: false, follow: false } };

export default function ProfilePage() {
  return <Suspense fallback={<ProfileFallback />}><ProfileContent /></Suspense>;
}

async function ProfileContent() {
  const user = await requireServerUser();
  return <main className="min-h-screen bg-[linear-gradient(180deg,var(--brand-ivory),var(--brand-parchment))] px-5 py-12"><div className="mx-auto max-w-2xl"><Link href="/dashboard" className="text-sm text-muted-foreground underline-offset-4 hover:underline">← Back to your account</Link><section className="mt-7 rounded-[2rem] border border-white/80 bg-card/90 p-7 shadow-soft sm:p-10"><p className="text-xs tracking-[0.2em] text-brand-botanical">ACCOUNT DETAILS</p><h1 className="mt-2 text-4xl">Your profile</h1><ProfileForm initialName={user.name} initialImage={user.image ?? ""} email={user.email} /></section></div></main>;
}

function ProfileFallback() {
  return <main className="min-h-screen animate-pulse bg-background px-5 py-12"><div className="mx-auto max-w-2xl"><div className="h-4 w-40 rounded bg-secondary" /><div className="mt-8 h-[34rem] rounded-[2rem] bg-secondary" /></div></main>;
}
