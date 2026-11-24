import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Create an account", robots: { index: false, follow: false } };

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--brand-champagne),transparent_48%),transparent_55%),linear-gradient(180deg,var(--brand-ivory),var(--brand-parchment))] px-5 py-12">
    <section className="w-full max-w-md rounded-[2rem] border border-white/80 bg-card/90 p-7 shadow-elegant backdrop-blur sm:p-10" aria-labelledby="auth-title">
      <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">← Back to Everafter</Link>
      <p className="mt-8 text-xs tracking-[0.2em] text-brand-botanical">BEGIN YOUR STORY</p><h1 id="auth-title" className="mt-2 text-4xl">Create your account</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Start gathering your wedding details in one thoughtful place.</p>
      <Suspense><AuthForm mode="register" /></Suspense>
    </section>
  </main>;
}
