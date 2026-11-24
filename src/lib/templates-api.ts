import { clientEnv } from "@/lib/env";

export interface TemplateCardData {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  styles: string[];
  colors: string[];
  tags: string[];
  previewImageUrl: string;
  previewSections: { key: string; title: string; description: string }[];
  designInfo: { layout: string; headingFont: string; bodyFont: string; motif: string };
  supportedCustomization: ("copy" | "color-palette" | "typography" | "photos" | "section-visibility" | "section-order")[];
  publishedAt: string;
  popularityCount: number;
  isFavorite: boolean;
}

export interface TemplateFacets { categories: string[]; styles: string[]; colors: string[] }
export interface TemplatePagination { page: number; limit: number; total: number; pages: number; hasNextPage: boolean; hasPreviousPage: boolean }
export interface TemplateListMeta {
  timestamp: string;
  pagination: TemplatePagination;
  facets: TemplateFacets;
  sortOptions: { newest: boolean; popular: boolean };
  appliedSort: "newest" | "popular";
}
interface ApiEnvelope<T, M = unknown> { success: boolean; message: string; data?: T; meta?: M }
export interface TemplateListResult { templates: TemplateCardData[]; meta: TemplateListMeta }

async function apiRequest<T, M = unknown>(path: string, init?: RequestInit): Promise<ApiEnvelope<T, M>> {
  const response = await fetch(new URL(path, clientEnv.NEXT_PUBLIC_API_URL), {
    ...init,
    credentials: "include",
    headers: { ...(init?.body ? { "content-type": "application/json" } : {}), ...init?.headers },
  });
  let body: ApiEnvelope<T, M>;
  try { body = await response.json() as ApiEnvelope<T, M>; }
  catch { throw new Error("The template service returned an unreadable response."); }
  if (!response.ok || !body.success) throw new Error(body.message || "The template request could not be completed.");
  return body;
}

export async function getTemplates(filters: { q?: string; category?: string; style?: string; color?: string; sort?: string; page?: number; limit?: number }, signal?: AbortSignal): Promise<TemplateListResult> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) if (value !== undefined && value !== "") query.set(key, String(value));
  const result = await apiRequest<TemplateCardData[], TemplateListMeta>(`/api/templates${query.size ? `?${query}` : ""}`, { signal, cache: "no-store" });
  if (!result.data || !result.meta) throw new Error("The template service returned incomplete catalog data.");
  return { templates: result.data, meta: result.meta };
}

export async function getTemplate(slug: string, signal?: AbortSignal) {
  const result = await apiRequest<TemplateCardData>(`/api/templates/${encodeURIComponent(slug)}`, { signal, cache: "no-store" });
  if (!result.data) throw new Error("Template data is missing from the response.");
  return result.data;
}

export async function getTemplateById(id: string, signal?: AbortSignal) {
  const result = await apiRequest<TemplateCardData>(`/api/templates/by-id/${encodeURIComponent(id)}`, { signal, cache: "no-store" });
  if (!result.data) throw new Error("Template data is missing from the response.");
  return result.data;
}

export async function getSavedTemplates(signal?: AbortSignal) {
  const result = await apiRequest<TemplateCardData[]>("/api/templates/favorites", { signal, cache: "no-store" });
  return result.data ?? [];
}

export async function setTemplateSaved(id: string, saved: boolean) {
  const result = await apiRequest<{ templateId: string; isFavorite: boolean }>(`/api/templates/${encodeURIComponent(id)}/favorite`, { method: saved ? "POST" : "DELETE" });
  if (!result.data) throw new Error("The save status could not be confirmed.");
  return result.data.isFavorite;
}
