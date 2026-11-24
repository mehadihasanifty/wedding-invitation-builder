import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PasswordRecovery } from "@/components/auth/password-recovery";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false, follow: false } };
export default function ResetPasswordPage() { return <main className="grid min-h-screen place-items-center bg-background px-5 py-12"><section className="w-full max-w-md rounded-[2rem] border border-border bg-card p-7 shadow-elegant sm:p-10"><Link href="/login" className="text-sm text-muted-foreground underline-offset-4 hover:underline">← Back to sign in</Link><p className="mt-8 text-xs tracking-[0.2em] text-brand-botanical">ACCOUNT ACCESS</p><h1 className="mt-2 text-4xl">Choose a new password</h1><Suspense><PasswordRecovery mode="reset" /></Suspense></section></main>; }
