import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TemplateNavigation } from "@/components/templates/template-navigation";
import { getTemplateById } from "@/lib/templates-api";
import { getServerUser } from "@/lib/auth-server";

export const metadata: Metadata = { title: "Start with a template", robots: { index: false, follow: false } };

type BuilderStartProps = { searchParams: Promise<{ templateId?: string }> };

export default function BuilderStartPage({ searchParams }: BuilderStartProps) {
  return <div className="min-h-screen bg-background text-foreground"><TemplateNavigation /><Suspense fallback={<BuilderStartSkeleton />}><SelectedTemplate searchParams={searchParams} /></Suspense></div>;
}

async function SelectedTemplate({ searchParams }: BuilderStartProps) {
  const { templateId } = await searchParams;
  if (!templateId || !/^[a-f\d]{24}$/i.test(templateId)) notFound();
  const callbackURL = `/builder/new?templateId=${encodeURIComponent(templateId)}`;
  if (!await getServerUser()) redirect(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);

  let template;
  try { template = await getTemplateById(templateId); }
  catch { notFound(); }

  return <main className="mx-auto max-w-6xl px-page py-10 sm:py-16"><Link href={`/templates/${encodeURIComponent(template.slug)}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"><ArrowLeft aria-hidden="true" className="size-4" /> Back to preview</Link><div className="mt-8 grid items-center gap-9 rounded-[2rem] border border-border bg-card/75 p-5 shadow-soft sm:p-8 lg:grid-cols-[minmax(280px,0.8fr)_1.2fr] lg:gap-12"><div className="relative mx-auto aspect-[0.78/1] w-full max-w-sm overflow-hidden rounded-[1.6rem] bg-secondary"><Image src={template.previewImageUrl} alt={`${template.name} selected invitation design`} fill sizes="(max-width: 1024px) 90vw, 35vw" className="object-cover" /></div><section><span className="inline-flex items-center gap-2 rounded-full bg-brand-botanical/10 px-3 py-1.5 text-xs font-medium text-brand-botanical"><Check aria-hidden="true" className="size-3.5" /> Template selected</span><p className="mt-6 text-xs tracking-[0.18em] text-brand-botanical">YOUR STARTING DESIGN</p><h1 className="mt-2 text-4xl sm:text-5xl">{template.name}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">This design has been passed to your builder by its stable template ID. Your invitation has not been created or saved yet.</p><div className="mt-6 flex flex-wrap gap-2">{template.styles.map((style) => <span key={style} className="rounded-full border border-border px-3 py-1.5 text-xs">{style.replaceAll("-", " ")}</span>)}</div><p className="mt-8 rounded-2xl border border-border bg-background/75 p-4 text-sm leading-6 text-muted-foreground">The invitation editor will open in the next builder phase. This handoff confirms the selected design without creating a draft record.</p><Link href={`/templates/${encodeURIComponent(template.slug)}`} className="mt-6 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-medium transition hover:bg-secondary">Return to template preview</Link></section></div></main>;
}

function BuilderStartSkeleton() {
  return <main className="mx-auto max-w-6xl px-page py-12"><Skeleton className="h-5 w-36" /><div className="mt-8 grid gap-8 lg:grid-cols-2"><Skeleton className="aspect-[0.78/1] rounded-[1.6rem]" /><div className="space-y-5 py-8"><Skeleton className="h-6 w-36" /><Skeleton className="h-12 w-3/4" /><Skeleton className="h-24 w-full" /></div></div></main>;
}
