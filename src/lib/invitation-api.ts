import { clientEnv } from "@/lib/env";
import type { InvitationDraftData } from "@/components/builder/invitation-schema";

export interface InvitationDraft {
  id: string;
  templateId: string;
  data: InvitationDraftData;
  currentStep: number;
  status: "draft";
  updatedAt: string;
}

interface ApiEnvelope<T> { success: boolean; message: string; data?: T }

async function invitationRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(new URL(path, clientEnv.NEXT_PUBLIC_API_URL), {
    ...init,
    credentials: "include",
    headers: { ...(init?.body ? { "content-type": "application/json" } : {}), ...init?.headers },
  });
  let body: ApiEnvelope<T>;
  try { body = await response.json() as ApiEnvelope<T>; }
  catch { throw new Error("The invitation service returned an unreadable response."); }
  if (!response.ok || !body.success) throw new Error(body.message || "The invitation draft could not be saved.");
  if (!body.data) throw new Error("The invitation service returned no draft data.");
  return body.data;
}

export function getInvitationDraft(id: string, signal?: AbortSignal) {
  return invitationRequest<InvitationDraft>(`/api/invitations/drafts/${encodeURIComponent(id)}`, { signal, cache: "no-store" });
}

export function createInvitationDraft(input: { templateId: string; data: InvitationDraftData; currentStep: number }) {
  return invitationRequest<InvitationDraft>("/api/invitations/drafts", { method: "POST", body: JSON.stringify(input) });
}

export function updateInvitationDraft(id: string, input: { data: InvitationDraftData; currentStep: number }) {
  return invitationRequest<InvitationDraft>(`/api/invitations/drafts/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(input) });
}
