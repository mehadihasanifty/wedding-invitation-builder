"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import { setTemplateSaved, type TemplateCardData } from "@/lib/templates-api";

function labelize(value: string) { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "); }

export function TemplateCard({ template, onFavoriteChange }: { template: TemplateCardData; onFavoriteChange?: (id: string, saved: boolean) => void }) {
  const [saved, setSaved] = useState(template.isFavorite);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function toggleFavorite() {
    setBusy(true); setError("");
    try {
      const nextSaved = await setTemplateSaved(template.id, !saved);
      setSaved(nextSaved); onFavoriteChange?.(template.id, nextSaved);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your saved templates could not be updated.");
    } finally { setBusy(false); }
  }

  return <article className="group overflow-hidden rounded-[1.65rem] border border-border/75 bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elegant motion-reduce:transition-none">
    <div className="relative aspect-[0.9/1] overflow-hidden bg-secondary">
      <Link href={`/templates/${encodeURIComponent(template.slug)}`} aria-label={`Preview ${template.name}`} className="absolute inset-0">
        <Image src={template.previewImageUrl} alt={`${template.name} wedding invitation design`} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw" className="object-cover transition duration-700 group-hover:scale-[1.035] motion-reduce:transition-none" />
      </Link>
      <button type="button" onClick={() => void toggleFavorite()} disabled={busy} aria-pressed={saved} aria-label={saved ? `Remove ${template.name} from saved templates` : `Save ${template.name}`} className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/75 bg-white/90 text-brand-burgundy shadow-sm backdrop-blur transition hover:scale-105 disabled:opacity-60"><Heart aria-hidden="true" className={`size-5 ${saved ? "fill-current" : ""}`} /></button>
      <div className="absolute bottom-4 left-4 flex gap-2"><span className="rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[0.68rem] font-medium tracking-wide text-foreground shadow-sm backdrop-blur">{labelize(template.category)}</span></div>
    </div>
    <div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.16em] text-brand-botanical">{template.styles.slice(0, 2).map(labelize).join(" · ")}</p><h2 className="mt-2 font-heading text-2xl leading-tight">{template.name}</h2></div><Link href={`/templates/${encodeURIComponent(template.slug)}`} aria-label={`View ${template.name}`} className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-border transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight aria-hidden="true" className="size-4" /></Link></div><p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">{template.description}</p><div className="mt-5 flex items-center justify-between gap-3"><div className="flex items-center gap-1.5" aria-label={`Color palette: ${template.colors.join(", ")}`}>{template.colors.slice(0, 5).map((color) => <span key={color} aria-hidden="true" className="size-4 rounded-full border border-black/10" style={{ backgroundColor: color }} />)}</div><Link href={`/templates/${encodeURIComponent(template.slug)}`} className="text-xs font-medium text-primary underline-offset-4 hover:underline">Preview design</Link></div>{error && <p role="alert" className="mt-3 text-xs leading-5 text-destructive">{error}{error.includes("Authentication") && <> <Link href="/login" className="underline">Sign in</Link></>}</p>}</div>
  </article>;
}
