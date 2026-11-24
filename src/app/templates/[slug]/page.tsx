import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TemplateNavigation } from "@/components/templates/template-navigation";
import { TemplatePreview } from "@/components/templates/template-preview";

export const metadata: Metadata = {
  title: "Invitation Design Preview",
  description: "Preview an invitation design from the Everafter collection.",
};

export default function TemplatePreviewPage() {
  return <div className="min-h-screen bg-background text-foreground"><TemplateNavigation /><Suspense fallback={<div className="mx-auto grid max-w-7xl gap-8 px-page py-12 lg:grid-cols-2"><Skeleton className="aspect-[0.86/1] rounded-[2rem]" /><div className="space-y-5 py-8"><Skeleton className="h-4 w-32" /><Skeleton className="h-12 w-3/4" /><Skeleton className="h-24 w-full" /></div></div>}><TemplatePreview /></Suspense></div>;
}
