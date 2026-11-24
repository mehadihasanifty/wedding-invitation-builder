import type { Metadata } from "next";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateNavigation } from "@/components/templates/template-navigation";

export const metadata: Metadata = {
  title: "Invitation Template Collection",
  description: "Explore and preview wedding invitation designs by style, category, and color.",
  openGraph: { title: "Invitation Template Collection | Everafter", description: "Explore and preview wedding invitation designs by style, category, and color.", type: "website" },
};

export default function TemplatesPage() {
  return <main className="min-h-screen bg-background text-foreground"><TemplateNavigation /><TemplateGallery /></main>;
}
