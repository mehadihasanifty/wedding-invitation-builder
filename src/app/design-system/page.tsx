import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const swatches = [
  { name: "Soft ivory", variable: "--brand-ivory", className: "bg-brand-ivory" },
  { name: "Warm parchment", variable: "--brand-parchment", className: "bg-brand-parchment" },
  { name: "Champagne", variable: "--brand-champagne", className: "bg-brand-champagne" },
  { name: "Rose gold", variable: "--brand-rose-gold", className: "bg-brand-rose-gold" },
  { name: "Burgundy", variable: "--brand-burgundy", className: "bg-brand-burgundy" },
  { name: "Botanical", variable: "--brand-botanical", className: "bg-brand-botanical" },
];

const typeSamples = [
  { label: "Display / Playfair Display", className: "font-heading text-4xl sm:text-5xl", text: "A day to remember" },
  { label: "Section heading / Playfair Display", className: "font-heading text-2xl sm:text-3xl", text: "Made for your story" },
  { label: "Body / Geist Sans", className: "font-sans text-base leading-7", text: "Warm, clear typography that lets every important detail feel effortless to read." },
  { label: "Small / Geist Sans", className: "font-sans text-sm leading-6 text-muted-foreground", text: "Thoughtful details, calm spacing, and a little room to breathe." },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-page py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Heart aria-hidden="true" className="size-4" /></span>
            <div><p className="font-heading text-lg leading-none">Everafter</p><p className="mt-1 text-xs tracking-[0.16em] text-muted-foreground">DESIGN SYSTEM</p></div>
          </div>
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowLeft aria-hidden="true" className="size-4" /><span className="hidden xs:inline">Foundation page</span><span className="xs:hidden">Back</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-page pb-20">
        <section className="py-section">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1"><Sparkles aria-hidden="true" /> Interface foundations</Badge>
            <h1 className="text-5xl leading-[1.05] sm:text-7xl">Quietly <span className="italic text-primary">romantic.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A shared visual language for invitations that feel personal, polished, and easy to use.
            </p>
          </div>
          <nav aria-label="Design system sections" className="mt-10 flex flex-wrap gap-2 border-b border-border/70 pb-5">
            <a href="#palette" className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent">Color</a>
            <a href="#type" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Typography</a>
            <a href="#components" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Components</a>
            <a href="#forms" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Forms</a>
            <a href="#principles" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Principles</a>
          </nav>
        </section>

        <section id="palette" aria-labelledby="palette-title" className="scroll-mt-8 pb-16">
          <SectionHeading eyebrow="01 / Color" title="A warm, grounded palette" description="Ivory and parchment create a gentle canvas; burgundy, rose gold, and botanical green provide measured accents." />
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map((swatch) => (
              <Card key={swatch.variable} className="group transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
                <div role="img" aria-label={swatch.name} className={`mx-3 mt-3 h-24 rounded-xl border border-foreground/10 ${swatch.className}`} />
                <CardContent className="pt-3">
                  <p className="text-sm font-medium">{swatch.name}</p>
                  <code className="mt-1 block text-xs text-muted-foreground">{swatch.variable}</code>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="type" aria-labelledby="type-title" className="scroll-mt-8 pb-16">
          <SectionHeading eyebrow="02 / Typography" title="Expressive, never ornate" description="Playfair Display brings the editorial voice. Geist keeps supporting copy and controls clear at every size." />
          <Card className="mt-7">
            <CardContent className="divide-y divide-border/70 py-2">
              {typeSamples.map((sample) => (
                <div key={sample.label} className="grid gap-3 py-5 sm:grid-cols-[13rem_1fr] sm:items-center">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{sample.label}</p>
                  <p className={sample.className}>{sample.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="components" aria-labelledby="components-title" className="scroll-mt-8 pb-16">
          <SectionHeading eyebrow="03 / Components" title="Small details, one system" description="Reusable controls inherit color, focus, radius, and surface tokens so the interface stays consistent." />
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Buttons & badges</CardTitle><CardDescription>Clear hierarchy, comfortable targets, and visible focus states.</CardDescription></CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button type="button"><Heart aria-hidden="true" /> Create invitation</Button>
                <Button type="button" variant="secondary">Secondary</Button>
                <Button type="button" variant="outline">Quiet action</Button>
                <Button type="button" variant="ghost">Ghost</Button>
                <Button type="button" variant="destructive">Remove</Button>
                <Badge>Published</Badge><Badge variant="secondary">Draft</Badge><Badge variant="outline">New</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Surface & dialog</CardTitle><CardDescription>Soft elevation keeps actions and information easy to scan.</CardDescription></CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="gap-1"><Check aria-hidden="true" /> Saved</Badge>
                <Dialog>
                  <DialogTrigger render={<Button type="button" variant="outline">Open dialog preview</Button>} />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save your design</DialogTitle>
                      <DialogDescription>Your invitation changes are ready to save as a draft.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button type="button" variant="outline">Cancel</Button>
                      <Button type="button">Save draft</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="forms" aria-labelledby="forms-title" className="scroll-mt-8 pb-16">
          <SectionHeading eyebrow="04 / Forms" title="Comfortable, accessible controls" description="Labels stay visible, hints are connected to their controls, and errors have a clear semantic role." />
          <Card className="mt-7">
            <CardHeader><CardTitle>Form elements</CardTitle><CardDescription>A compact example using the shared field, input, select, and choice controls.</CardDescription></CardHeader>
            <CardContent className="grid gap-7 pb-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="couple-name">Couple names</FieldLabel>
                <Input id="couple-name" aria-describedby="couple-name-hint" placeholder="e.g. Maya & Arif" />
                <FieldDescription id="couple-name-hint">This appears as the invitation title.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="celebration-style">Celebration style</FieldLabel>
                <Select>
                  <SelectTrigger id="celebration-style" aria-describedby="celebration-style-hint" className="w-full">
                    <SelectValue placeholder="Choose a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garden">Garden evening</SelectItem>
                    <SelectItem value="classic">Classic ceremony</SelectItem>
                    <SelectItem value="modern">Modern minimal</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription id="celebration-style-hint">Choose the tone that feels most like you.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="sample-email">Email address</FieldLabel>
                <Input id="sample-email" type="email" value="guest@" aria-invalid="true" aria-describedby="sample-email-error" readOnly />
                <FieldError id="sample-email-error">Enter a complete email address.</FieldError>
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="welcome-note">Welcome note</FieldLabel>
                <Textarea id="welcome-note" aria-describedby="welcome-note-hint" placeholder="Write a short note for your guests…" />
                <FieldDescription id="welcome-note-hint">Keep it warm and easy for everyone to read.</FieldDescription>
              </Field>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:col-span-2">
                <div className="flex items-center gap-3"><Checkbox id="rsvp-enabled" /><Label htmlFor="rsvp-enabled">Enable RSVP</Label></div>
                <div className="flex items-center gap-3"><Switch id="music-enabled" aria-label="Enable background music" /><Label htmlFor="music-enabled">Background music</Label></div>
                <Button type="button" variant="secondary">Preview controls <ChevronDown aria-hidden="true" /></Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="principles" aria-labelledby="principles-title" className="scroll-mt-8 pb-10">
          <SectionHeading eyebrow="05 / Foundations" title="Tokens that guide the details" description="Spacing, shape, and motion are kept consistent from the smallest field to the largest page section." />
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <TokenCard title="Spacing" detail="A calm 4px-based rhythm with responsive page and section gutters." sample={<div className="flex items-end gap-2"><span className="h-2 w-2 rounded-sm bg-brand-rose-gold" /><span className="h-4 w-4 rounded-sm bg-brand-rose-gold/80" /><span className="h-6 w-6 rounded-sm bg-brand-rose-gold/60" /><span className="h-10 w-10 rounded-sm bg-brand-rose-gold/40" /></div>} />
            <TokenCard title="Radius & elevation" detail="Rounded corners soften surfaces; restrained shadows preserve hierarchy." sample={<div className="h-14 w-24 rounded-2xl border border-border bg-card shadow-soft" />} />
            <TokenCard title="Responsive & motion" detail="Mobile-first layouts, a 30rem compact breakpoint, and reduced-motion support." sample={<div className="motion-safe:animate-pulse motion-reduce:animate-none grid size-12 place-items-center rounded-full bg-brand-champagne text-brand-burgundy"><Sparkles aria-hidden="true" className="size-5" /></div>} />
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-botanical">{eyebrow}</p><h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p></div>;
}

function TokenCard({ title, detail, sample }: { title: string; detail: string; sample: React.ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{detail}</CardDescription></CardHeader><CardContent className="flex min-h-20 items-center">{sample}</CardContent></Card>;
}
