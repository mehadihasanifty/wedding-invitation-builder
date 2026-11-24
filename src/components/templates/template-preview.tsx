"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Heart, Monitor, RotateCcw, Smartphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTemplate, setTemplateSaved, type TemplateCardData } from "@/lib/templates-api";

type PreviewMode = "desktop" | "mobile";
const customizationLabels: Record<TemplateCardData["supportedCustomization"][number], string> = {
  copy: "Invitation wording",
  "color-palette": "Color palette",
  typography: "Typography",
  photos: "Photo selection",
  "section-visibility": "Show or hide sections",
  "section-order": "Section order",
};

function humanize(value: string) { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "); }

function PreviewSkeleton() {
  return <main className="mx-auto max-w-7xl px-page py-10 sm:py-14"><Skeleton className="h-5 w-36" /><div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"><Skeleton className="aspect-[1.2/1] rounded-[2rem]" /><div className="space-y-5 py-6"><Skeleton className="h-4 w-32" /><Skeleton className="h-12 w-3/4" /><Skeleton className="h-24 w-full" /><Skeleton className="h-12 w-48" /></div></div></main>;
}

export function TemplatePreview() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [requestState, setRequestState] = useState<{ slug: string; template?: TemplateCardData; error?: string }>();
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [animationCycle, setAnimationCycle] = useState(0);
  const [saving, setSaving] = useState(false);
  const [favoriteError, setFavoriteError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    void getTemplate(slug, controller.signal).then((template) => setRequestState({ slug, template })).catch((cause: unknown) => {
      if (!controller.signal.aborted) setRequestState({ slug, error: cause instanceof Error ? cause.message : "This design could not be loaded." });
    });
    return () => controller.abort();
  }, [slug]);

  const currentRequest = requestState?.slug === slug ? requestState : undefined;
  const template = currentRequest?.template ?? null;
  const loading = !currentRequest;
  const error = currentRequest?.error ?? "";

  async function toggleFavorite() {
    if (!template) return;
    setSaving(true); setFavoriteError("");
    try {
      const isFavorite = await setTemplateSaved(template.id, !template.isFavorite);
      setRequestState((current) => current?.slug === slug && current.template ? { ...current, template: { ...current.template, isFavorite } } : current);
    } catch (cause) { setFavoriteError(cause instanceof Error ? cause.message : "Your saved designs could not be updated."); }
    finally { setSaving(false); }
  }

  if (loading) return <PreviewSkeleton />;
  if (error || !template) return <main className="mx-auto max-w-3xl px-page py-20 text-center"><p className="text-xs tracking-[0.2em] text-brand-botanical">DESIGN PREVIEW</p><h1 className="mt-3 font-heading text-4xl">We could not find this design.</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">It may have been removed or is no longer published.</p><Link href="/templates" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Return to the collection</Link></main>;

  const builderHref = `/builder/new?templateId=${encodeURIComponent(template.id)}`;
  return <main className="mx-auto max-w-7xl px-page py-8 sm:py-12">
    <Link href="/templates" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"><ArrowLeft aria-hidden="true" className="size-4" /> All invitation designs</Link>
    <div className="mt-7 grid items-start gap-8 xl:grid-cols-[minmax(0,1.22fr)_minmax(350px,0.78fr)] xl:gap-14">
      <section aria-label="Invitation preview" className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs tracking-[0.18em] text-brand-botanical">LIVE DESIGN PREVIEW</p><p className="mt-1 text-xs text-muted-foreground">Switch between screen sizes to explore the layout.</p></div><button type="button" onClick={() => setAnimationCycle((current) => current + 1)} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-medium transition hover:bg-secondary"><RotateCcw aria-hidden="true" className="size-3.5" /> Replay preview</button></div>
        <div role="group" aria-label="Preview size" className="mb-5 inline-flex rounded-full border border-border bg-card p-1"><button type="button" aria-pressed={previewMode === "desktop"} onClick={() => { setPreviewMode("desktop"); setAnimationCycle((current) => current + 1); }} className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm transition ${previewMode === "desktop" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Monitor aria-hidden="true" className="size-4" /> Desktop</button><button type="button" aria-pressed={previewMode === "mobile"} onClick={() => { setPreviewMode("mobile"); setAnimationCycle((current) => current + 1); }} className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm transition ${previewMode === "mobile" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Smartphone aria-hidden="true" className="size-4" /> Mobile</button></div>
        <div className={`relative mx-auto overflow-hidden border border-border bg-[#f1ece3] shadow-elegant transition-[width,border-radius] duration-500 motion-reduce:transition-none ${previewMode === "mobile" ? "aspect-[9/18] w-full max-w-[340px] rounded-[2.6rem] border-[7px] border-[#312b28] bg-[#312b28] p-1.5" : "aspect-[1.2/1] w-full rounded-[1.8rem] p-3 sm:p-5"}`}>
          {previewMode === "mobile" && <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#312b28]" />}
          <div key={`${previewMode}-${animationCycle}`} className={`invitation-preview-reveal relative h-full w-full overflow-hidden bg-white ${previewMode === "mobile" ? "rounded-[2rem]" : "rounded-xl"}`}>
            <Image src={template.previewImageUrl} alt={`${template.name} invitation design`} fill priority sizes={previewMode === "mobile" ? "340px" : "(max-width: 1280px) 100vw, 65vw"} className={previewMode === "mobile" ? "object-cover" : "object-contain"} />
          </div>
          {previewMode === "mobile" && <span aria-hidden="true" className="absolute bottom-2 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-white/85" />}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">{previewMode === "mobile" ? "Mobile screen preview" : "Desktop screen preview"} · Demo artwork from the template</p>
      </section>

      <aside className="xl:sticky xl:top-28">
        <p className="text-xs tracking-[0.2em] text-brand-botanical">{humanize(template.category).toUpperCase()}</p><h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{template.name}</h1><p className="mt-5 text-base leading-7 text-muted-foreground">{template.description}</p>
        <div className="mt-7 flex flex-wrap gap-2">{template.styles.map((style) => <span key={style} className="rounded-full border border-border bg-card px-3 py-2 text-sm">{humanize(style)}</span>)}</div>
        <div className="mt-7 flex flex-wrap items-center gap-3"><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Palette</h2>{template.colors.map((color) => <span key={color} className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5 text-xs"><span aria-hidden="true" className="size-5 rounded-full border border-black/10" style={{ backgroundColor: color }} />{color.toUpperCase()}</span>)}</div>
        <div className="mt-8 rounded-3xl border border-border bg-card/75 p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><h2 className="font-heading text-2xl">Design details</h2><span className="rounded-full bg-secondary px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">{template.designInfo.layout}</span></div><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-xs text-muted-foreground">Heading type</dt><dd className="mt-1 font-medium">{template.designInfo.headingFont}</dd></div><div><dt className="text-xs text-muted-foreground">Body type</dt><dd className="mt-1 font-medium">{template.designInfo.bodyFont}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-muted-foreground">Visual motif</dt><dd className="mt-1 font-medium">{template.designInfo.motif}</dd></div></dl></div>
        <div className="mt-7"><h2 className="font-heading text-2xl">Included sections</h2><ol className="mt-3 space-y-2">{template.previewSections.map((section, index) => <li key={section.key} className="flex gap-3 rounded-2xl border border-border/80 bg-card/55 p-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-xs font-medium text-primary">{String(index + 1).padStart(2, "0")}</span><span><span className="block text-sm font-medium">{section.title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{section.description}</span></span></li>)}</ol></div>
        <div className="mt-7"><h2 className="font-heading text-2xl">Personalize your way</h2><p className="mt-2 text-sm text-muted-foreground">This template supports:</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{template.supportedCustomization.map((option) => <li key={option} className="flex items-center gap-2 text-sm"><Check aria-hidden="true" className="size-4 text-brand-botanical" />{customizationLabels[option]}</li>)}</ul></div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={builderHref} className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-elegant transition hover:brightness-110">Use this template</Link><button type="button" onClick={() => void toggleFavorite()} disabled={saving} aria-pressed={template.isFavorite} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium transition hover:bg-secondary disabled:opacity-60"><Heart aria-hidden="true" className={`size-4 ${template.isFavorite ? "fill-current text-primary" : ""}`} />{saving ? "Saving…" : template.isFavorite ? "Saved" : "Save"}</button></div>
        {favoriteError && <p role="alert" className="mt-3 text-sm text-destructive">{favoriteError}{favoriteError.includes("Authentication") && <> <Link href={`/login?callbackURL=${encodeURIComponent(`/templates/${template.slug}`)}`} className="underline">Sign in</Link></>}</p>}
        <p className="mt-4 text-xs leading-5 text-muted-foreground">Use this template passes its stable template ID to the builder. Opening this preview does not create or save an invitation.</p>
      </aside>
    </div>
  </main>;
}
