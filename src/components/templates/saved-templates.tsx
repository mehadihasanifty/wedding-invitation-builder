"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TemplateCard } from "@/components/templates/template-card";
import { getSavedTemplates, type TemplateCardData } from "@/lib/templates-api";

export function SavedTemplates() {
  const [requestState, setRequestState] = useState<{ key: number; templates?: TemplateCardData[]; error?: string }>();
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    void getSavedTemplates(controller.signal).then((templates) => setRequestState({ key: retry, templates })).catch((cause: unknown) => {
      if (!controller.signal.aborted) setRequestState({ key: retry, error: cause instanceof Error ? cause.message : "Saved designs could not be loaded." });
    });
    return () => controller.abort();
  }, [retry]);
  const currentRequest = requestState?.key === retry ? requestState : undefined;
  const templates = currentRequest?.templates ?? [];
  const loading = !currentRequest;
  const error = currentRequest?.error ?? "";

  return <main className="mx-auto max-w-7xl px-page py-12 sm:py-16"><Link href="/templates" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"><ArrowLeft aria-hidden="true" className="size-4" /> Explore designs</Link><p className="mt-8 text-xs tracking-[0.2em] text-brand-botanical">YOUR WISHLIST</p><h1 className="mt-2 text-4xl sm:text-5xl">Saved designs.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">The invitation styles you have kept close.</p>
    {loading && <div aria-label="Loading saved templates" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="aspect-[0.9/1] rounded-[1.65rem]" />)}</div>}
    {error && <div role="alert" className="mt-8 rounded-3xl border border-destructive/20 bg-destructive/5 p-7 text-sm text-destructive"><p>{error}</p>{error.includes("Authentication") && <Link href="/login?callbackURL=%2Ftemplates%2Ffavorites" className="mt-3 inline-block underline">Sign in to see your wishlist</Link>}<button type="button" onClick={() => setRetry((value) => value + 1)} className="ml-4 underline">Try again</button></div>}
    {!loading && !error && templates.length === 0 && <div className="mt-8 rounded-[2rem] border border-dashed border-border bg-card/55 px-6 py-16 text-center"><h2 className="font-heading text-3xl">Your wishlist is waiting.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">Save an invitation design while exploring and it will be gathered here.</p><Link href="/templates" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Explore designs</Link></div>}
    {!loading && !error && templates.length > 0 && <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{templates.map((template) => <TemplateCard key={template.id} template={template} onFavoriteChange={(id, saved) => { if (!saved) setRequestState((current) => current?.key === retry ? { ...current, templates: (current.templates ?? []).filter((item) => item.id !== id) } : current); }} />)}</div>}
  </main>;
}
