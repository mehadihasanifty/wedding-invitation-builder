import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { InvitationBuilder } from "@/components/builder/invitation-builder";
import { getTemplateById } from "@/lib/templates-api";
import { getServerUser } from "@/lib/auth-server";

export const metadata: Metadata = { title: "Invitation Builder", robots: { index: false, follow: false } };

type BuilderStartProps = { searchParams: Promise<{ templateId?: string; draftId?: string }> };

export default function BuilderStartPage({ searchParams }: BuilderStartProps) {
  return <Suspense fallback={<BuilderStartSkeleton />}><SelectedTemplate searchParams={searchParams} /></Suspense>;
}

async function SelectedTemplate({ searchParams }: BuilderStartProps) {
  const { templateId, draftId } = await searchParams;
  if (!templateId || !/^[a-f\d]{24}$/i.test(templateId)) notFound();
  if (draftId && !/^[a-f\d]{24}$/i.test(draftId)) notFound();
  const callbackQuery = new URLSearchParams({ templateId, ...(draftId ? { draftId } : {}) });
  const callbackURL = `/builder/new?${callbackQuery.toString()}`;
  if (!await getServerUser()) redirect(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);

  let template;
  try { template = await getTemplateById(templateId); }
  catch { notFound(); }

  return <InvitationBuilder template={template} initialDraftId={draftId} />;
}

function BuilderStartSkeleton() {
  return <main className="min-h-screen px-page py-12"><Skeleton className="mx-auto h-12 max-w-6xl rounded-2xl" /><div className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-[270px_1fr]"><Skeleton className="hidden h-[42rem] rounded-3xl lg:block" /><Skeleton className="h-[42rem] rounded-3xl" /></div></main>;
}
