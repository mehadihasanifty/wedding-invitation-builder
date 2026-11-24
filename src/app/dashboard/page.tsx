import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Heart, UserRound } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { requireServerUser } from "@/lib/auth-server";

export const metadata: Metadata = { title: "Your account", robots: { index: false, follow: false } };

export default function DashboardPage() {
  return <Suspense fallback={<DashboardFallback />}><DashboardContent /></Suspense>;
}

async function DashboardContent() {
  const user = await requireServerUser();
  return <main className="min-h-screen bg-background">
    <header className="border-b border-border/70 bg-card/70"><div className="mx-auto flex max-w-6xl items-center justify-between px-page py-5"><Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Heart className="size-4" /></span><span className="font-heading text-xl">Everafter</span></Link><div className="flex items-center gap-3"><Link href="/profile" className="rounded-full p-2 text-sm hover:bg-secondary" aria-label="Edit profile"><UserRound className="size-5" /></Link><SignOutButton /></div></div></header>
    <section className="mx-auto max-w-6xl px-page py-16 sm:py-24"><p className="text-xs tracking-[0.2em] text-brand-botanical">YOUR ACCOUNT</p><h1 className="mt-3 text-4xl sm:text-5xl">Welcome, {user.name}</h1><p className="mt-4 max-w-2xl text-muted-foreground">Your account is ready. Invitation creation will appear here as that part of the platform is built.</p><div className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-soft"><h2 className="text-2xl">Your invitations</h2><p className="mt-2 text-sm text-muted-foreground">You do not have any invitations yet.</p></div></section>
  </main>;
}

function DashboardFallback() {
  return <main className="min-h-screen animate-pulse bg-background px-page py-20"><div className="mx-auto max-w-6xl"><div className="h-4 w-32 rounded bg-secondary" /><div className="mt-5 h-12 max-w-lg rounded bg-secondary" /><div className="mt-4 h-5 max-w-xl rounded bg-secondary" /><div className="mt-10 h-36 rounded-3xl bg-secondary" /></div></main>;
}
