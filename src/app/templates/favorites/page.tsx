import type { Metadata } from "next";
import { SavedTemplates } from "@/components/templates/saved-templates";
import { TemplateNavigation } from "@/components/templates/template-navigation";

export const metadata: Metadata = { title: "Saved invitation designs", robots: { index: false, follow: false } };

export default function FavoriteTemplatesPage() {
  return <main className="min-h-screen bg-background text-foreground"><TemplateNavigation /><SavedTemplates /></main>;
}
