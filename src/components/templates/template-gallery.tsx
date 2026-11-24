"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TemplateCard } from "@/components/templates/template-card";
import { getTemplates, type TemplateFacets, type TemplatePagination, type TemplateListResult } from "@/lib/templates-api";

const emptyFacets: TemplateFacets = { categories: [], styles: [], colors: [] };
const emptyPagination: TemplatePagination = { page: 1, limit: 12, total: 0, pages: 0, hasNextPage: false, hasPreviousPage: false };
interface GalleryRequestState { key: string; result?: TemplateListResult; error?: string }

function humanize(value: string) { return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "); }

function GallerySkeleton() {
  return <div aria-label="Loading invitation templates" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="overflow-hidden rounded-[1.65rem] border border-border bg-card"><Skeleton className="aspect-[0.9/1] rounded-none" /><div className="space-y-3 p-6"><Skeleton className="h-3 w-28" /><Skeleton className="h-7 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div></div>)}</div>;
}

export function TemplateGallery() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [requestState, setRequestState] = useState<GalleryRequestState>();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const key = JSON.stringify([debouncedSearch, category, style, color, sort, page]);
    void getTemplates({ q: debouncedSearch, category, style, color, sort, page, limit: 12 }, controller.signal)
      .then((result) => {
        setRequestState({ key, result });
        if (result.meta.appliedSort !== sort) setSort(result.meta.appliedSort);
      })
      .catch((cause: unknown) => { if (!controller.signal.aborted) setRequestState({ key, error: cause instanceof Error ? cause.message : "Templates could not be loaded." }); });
    return () => controller.abort();
  }, [debouncedSearch, category, style, color, sort, page, reload]);

  function updateFilter(setter: (value: string) => void, value: string) { setter(value); setPage(1); }
  const requestKey = JSON.stringify([debouncedSearch, category, style, color, sort, page]);
  const currentRequest = requestState?.key === requestKey ? requestState : undefined;
  const result = currentRequest?.result;
  const templates = result?.templates ?? [];
  const facets = result?.meta.facets ?? emptyFacets;
  const pagination = result?.meta.pagination ?? emptyPagination;
  const sortOptions = result?.meta.sortOptions ?? { newest: true, popular: false };
  const loading = !currentRequest;
  const error = currentRequest?.error ?? "";
  function onFavoriteChange(id: string, saved: boolean) {
    setRequestState((current) => current?.key === requestKey && current.result
      ? { ...current, result: { ...current.result, templates: current.result.templates.map((template) => template.id === id ? { ...template, isFavorite: saved } : template) } }
      : current);
  }
  const hasFilters = Boolean(search || category || style || color);

  return <>
    <section className="border-b border-border/70 bg-[radial-gradient(ellipse_at_70%_12%,color-mix(in_oklch,var(--brand-champagne),transparent_58%),transparent_50%),linear-gradient(180deg,var(--brand-ivory),var(--brand-parchment))]">
      <div className="mx-auto max-w-7xl px-page pb-12 pt-12 sm:pb-16 sm:pt-16"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"><ArrowLeft aria-hidden="true" className="size-4" /> Home</Link><p className="mt-8 text-xs tracking-[0.2em] text-brand-botanical">THE INVITATION COLLECTION</p><div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h1 className="text-4xl sm:text-6xl">Find your feeling.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Explore considered invitation designs and find a style that feels like your celebration.</p></div><Link href="/templates/favorites" className="shrink-0 rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-medium shadow-sm transition hover:bg-card">Your saved designs <span aria-hidden="true">♡</span></Link></div></div>
    </section>
    <section className="mx-auto max-w-7xl px-page py-10 sm:py-14" aria-label="Invitation templates">
      <div className="mb-8 grid gap-3 rounded-3xl border border-border/80 bg-card/75 p-4 shadow-soft sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(140px,1fr))_minmax(145px,0.9fr)]">
        <label className="relative block sm:col-span-2 lg:col-span-1"><span className="sr-only">Search invitation templates</span><Search aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search designs…" maxLength={100} className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
        <label className="block"><span className="sr-only">Filter by category</span><select aria-label="Filter by category" value={category} onChange={(event) => updateFilter(setCategory, event.target.value)} className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">All categories</option>{facets.categories.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}</select></label>
        <label className="block"><span className="sr-only">Filter by style</span><select aria-label="Filter by style" value={style} onChange={(event) => updateFilter(setStyle, event.target.value)} className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">All styles</option>{facets.styles.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}</select></label>
        <label className="block"><span className="sr-only">Filter by color</span><select aria-label="Filter by color" value={color} onChange={(event) => updateFilter(setColor, event.target.value)} className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="">All colors</option>{facets.colors.map((value) => <option key={value} value={value}>{value.toUpperCase()}</option>)}</select></label>
        <label className="relative block"><SlidersHorizontal aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Sort templates</span><select aria-label="Sort templates" value={sort} onChange={(event) => updateFilter(setSort, event.target.value)} className="h-12 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="newest">Newest</option>{sortOptions.popular && <option value="popular">Most popular</option>}</select></label>
      </div>
      <div className="mb-5 flex min-h-7 items-center justify-between gap-4"><p aria-live="polite" className="text-sm text-muted-foreground">{loading ? "Finding your designs…" : `${pagination.total} ${pagination.total === 1 ? "design" : "designs"}`}</p>{hasFilters && <button type="button" onClick={() => { setSearch(""); setCategory(""); setStyle(""); setColor(""); setSort("newest"); setPage(1); }} className="text-sm font-medium text-primary underline-offset-4 hover:underline">Clear filters</button>}</div>
      {error && <div role="alert" className="rounded-3xl border border-destructive/20 bg-destructive/5 p-7 text-sm text-destructive"><p>{error}</p><button type="button" onClick={() => setReload((value) => value + 1)} className="mt-4 rounded-full border border-destructive/25 px-4 py-2 font-medium hover:bg-destructive/10">Try again</button></div>}
      {!error && loading && <GallerySkeleton />}
      {!error && !loading && templates.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{templates.map((template) => <TemplateCard key={template.id} template={template} onFavoriteChange={onFavoriteChange} />)}</div>}
      {!error && !loading && templates.length === 0 && <div className="rounded-[2rem] border border-dashed border-border bg-card/55 px-6 py-16 text-center sm:px-12"><span aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-xl text-primary">✧</span><h2 className="mt-5 font-heading text-3xl">{hasFilters ? "No designs found" : "A collection in the making"}</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{hasFilters ? "Try a different search or clear a filter to explore the full collection." : "New invitation designs will appear here as they are added to the collection."}</p>{hasFilters && <button type="button" onClick={() => { setSearch(""); setCategory(""); setStyle(""); setColor(""); setPage(1); }} className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Clear filters</button>}</div>}
      {!error && !loading && pagination.pages > 1 && <nav aria-label="Template pages" className="mt-10 flex items-center justify-center gap-4"><button type="button" disabled={!pagination.hasPreviousPage} onClick={() => setPage((value) => value - 1)} className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-45"><ArrowLeft aria-hidden="true" className="size-4" /> Previous</button><span aria-live="polite" className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.pages}</span><button type="button" disabled={!pagination.hasNextPage} onClick={() => setPage((value) => value + 1)} className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-45">Next <ArrowRight aria-hidden="true" className="size-4" /></button></nav>}
    </section>
  </>;
}
