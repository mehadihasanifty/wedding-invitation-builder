"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Save } from "lucide-react";
import { useForm, type FieldPath } from "react-hook-form";
import { getInvitationDraft, createInvitationDraft, updateInvitationDraft } from "@/lib/invitation-api";
import type { TemplateCardData } from "@/lib/templates-api";
import { AdditionalDetailsSection, BrideInformationSection, EventScheduleSection, FamilyInformationSection, GallerySection, GroomInformationSection, MessageSection, MusicSection, VenueSection, WeddingDateTimeSection } from "@/components/builder/builder-sections";
import { emptyInvitationDraft, invitationDraftDataSchema, validateBuilderSection, type BuilderSectionKey, type InvitationDraftData } from "@/components/builder/invitation-schema";

const steps: { key: BuilderSectionKey; title: string; description: string }[] = [
  { key: "bride", title: "Bride information", description: "Names and family details for the bride." },
  { key: "groom", title: "Groom information", description: "Names and family details for the groom." },
  { key: "family", title: "Family information", description: "Add a family hosting note if you would like." },
  { key: "dateTime", title: "Wedding date & time", description: "Set the main celebration date and time." },
  { key: "eventSchedule", title: "Event schedule", description: "Share the events your guests should know about." },
  { key: "venue", title: "Venue & address", description: "Help guests find where you will celebrate." },
  { key: "message", title: "Invitation message", description: "Write a personal welcome for your guests." },
  { key: "gallery", title: "Gallery & media", description: "Add Cloudinary photo links for your invitation." },
  { key: "music", title: "Background music", description: "Add an optional Cloudinary audio track." },
  { key: "additionalDetails", title: "Additional details", description: "Include attire, gifts, lodging, and other notes." },
];

function StepFields({ step, form }: { step: BuilderSectionKey; form: ReturnType<typeof useForm<InvitationDraftData>> }) {
  switch (step) {
    case "bride": return <BrideInformationSection form={form} />;
    case "groom": return <GroomInformationSection form={form} />;
    case "family": return <FamilyInformationSection form={form} />;
    case "dateTime": return <WeddingDateTimeSection form={form} />;
    case "eventSchedule": return <EventScheduleSection form={form} />;
    case "venue": return <VenueSection form={form} />;
    case "message": return <MessageSection form={form} />;
    case "gallery": return <GallerySection form={form} />;
    case "music": return <MusicSection form={form} />;
    case "additionalDetails": return <AdditionalDetailsSection form={form} />;
  }
}

export function InvitationBuilder({ template, initialDraftId }: { template: TemplateCardData; initialDraftId?: string }) {
  const router = useRouter();
  const [defaultValues] = useState(() => structuredClone(emptyInvitationDraft));
  const form = useForm<InvitationDraftData>({ resolver: zodResolver(invitationDraftDataSchema), defaultValues, mode: "onTouched" });
  const { reset } = form;
  const [activeStep, setActiveStep] = useState(0);
  const [draftId, setDraftId] = useState<string | undefined>(initialDraftId);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [completed, setCompleted] = useState<Set<BuilderSectionKey>>(() => new Set());
  const [draftLoad, setDraftLoad] = useState<{ id: string; error?: string }>();
  const currentStep = steps[activeStep];

  useEffect(() => {
    if (!initialDraftId) return;
    const controller = new AbortController();
    void getInvitationDraft(initialDraftId, controller.signal).then((draft) => {
      if (draft.templateId !== template.id) {
        setDraftLoad({ id: initialDraftId, error: "This draft belongs to a different template." });
        return;
      }
      reset(draft.data);
      setDraftId(draft.id);
      setActiveStep(Math.max(0, Math.min(draft.currentStep, steps.length - 1)));
      setDraftLoad({ id: initialDraftId });
    }).catch((cause: unknown) => {
      if (!controller.signal.aborted) setDraftLoad({ id: initialDraftId, error: cause instanceof Error ? cause.message : "This draft could not be loaded." });
    });
    return () => controller.abort();
  }, [initialDraftId, template.id, reset]);

  const draftIsLoading = Boolean(initialDraftId && draftLoad?.id !== initialDraftId);
  const draftLoadError = initialDraftId && draftLoad?.id === initialDraftId ? draftLoad.error : undefined;

  function goToStep(index: number) {
    setActiveStep(Math.max(0, Math.min(index, steps.length - 1)));
    setSaveMessage(""); setSaveError("");
  }

  function nextStep() {
    const issues = validateBuilderSection(currentStep.key, form.getValues());
    form.clearErrors(currentStep.key);
    if (issues.length > 0) {
      for (const issue of issues) form.setError(issue.path as FieldPath<InvitationDraftData>, { type: "manual", message: issue.message });
      return;
    }
    setCompleted((previous) => new Set(previous).add(currentStep.key));
    goToStep(activeStep + 1);
  }

  async function saveDraft(data: InvitationDraftData) {
    setSaving(true); setSaveMessage(""); setSaveError("");
    try {
      const payload = { data, currentStep: activeStep };
      const saved = draftId
        ? await updateInvitationDraft(draftId, payload)
        : await createInvitationDraft({ templateId: template.id, ...payload });
      setDraftId(saved.id);
      setSaveMessage("Draft saved. You can safely return and continue editing.");
      const query = new URLSearchParams({ templateId: template.id, draftId: saved.id });
      router.replace(`/builder/new?${query.toString()}`, { scroll: false });
    } catch (cause) { setSaveError(cause instanceof Error ? cause.message : "Your draft could not be saved. Please try again."); }
    finally { setSaving(false); }
  }

  function handleDraftValidationFailure() {
    const firstInvalidStep = steps.findIndex((step) => Boolean(form.formState.errors[step.key]));
    if (firstInvalidStep >= 0) setActiveStep(firstInvalidStep);
    setSaveError("Please fix the highlighted field values before saving your draft.");
  }

  const saveCurrentDraft = form.handleSubmit(saveDraft, handleDraftValidationFailure);
  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

  return <main className="min-h-screen bg-[linear-gradient(180deg,var(--brand-ivory),var(--brand-parchment))] text-foreground">
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-page py-3"><div className="min-w-0"><Link href={`/templates/${encodeURIComponent(template.slug)}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:underline"><ArrowLeft aria-hidden="true" className="size-3.5" /> Template preview</Link><p className="mt-1 truncate text-sm font-medium">Starting with {template.name}</p></div><button type="button" onClick={() => void saveCurrentDraft()} disabled={saving || draftIsLoading || Boolean(draftLoadError)} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-110 disabled:cursor-wait disabled:opacity-55 sm:px-5"><Save aria-hidden="true" className="size-4" />{saving ? "Saving…" : "Save draft"}</button></div></header>
    <div className="mx-auto max-w-[90rem] px-page py-7 sm:py-10"><div className="mb-7"><div className="flex items-end justify-between gap-4"><div><p className="text-xs tracking-[0.18em] text-brand-botanical">INVITATION BUILDER</p><h1 className="mt-2 text-3xl sm:text-4xl">Bring your celebration together.</h1></div><span className="shrink-0 text-sm font-medium text-muted-foreground">{activeStep + 1} <span className="font-normal">of {steps.length}</span></span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label="Builder progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="h-full rounded-full bg-brand-rose-gold transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div></div>
      <div className="mb-6 overflow-x-auto rounded-2xl border border-border bg-card/85 p-2 lg:hidden"><nav aria-label="Builder sections" className="flex min-w-max gap-1">{steps.map((step, index) => <button key={step.key} type="button" aria-current={index === activeStep ? "step" : undefined} onClick={() => goToStep(index)} className={`flex h-10 items-center gap-2 rounded-xl px-3 text-xs transition ${index === activeStep ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}><span className="grid size-5 place-items-center rounded-full border border-current text-[0.6rem]">{completed.has(step.key) ? <Check aria-hidden="true" className="size-3" /> : index + 1}</span>{step.title}</button>)}</nav></div>
      <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)] xl:gap-8">
        <aside className="hidden rounded-3xl border border-border bg-card/85 p-3 shadow-soft lg:block"><p className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Your invitation</p><nav aria-label="Builder sections" className="space-y-1">{steps.map((step, index) => <button key={step.key} type="button" aria-current={index === activeStep ? "step" : undefined} onClick={() => goToStep(index)} className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${index === activeStep ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}><span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-current text-xs">{completed.has(step.key) ? <Check aria-hidden="true" className="size-3.5" /> : index + 1}</span><span><span className="block text-sm font-medium">{step.title}</span><span className={`mt-1 block text-xs leading-4 ${index === activeStep ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{step.description}</span></span></button>)}</nav></aside>
        <section className="min-w-0 rounded-[1.8rem] border border-border bg-card/90 p-5 shadow-soft sm:p-8 lg:p-10" aria-labelledby="builder-step-title"><div className="mb-7 flex flex-col justify-between gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-start"><div><p className="text-xs tracking-[0.16em] text-brand-botanical">STEP {String(activeStep + 1).padStart(2, "0")}</p><h2 id="builder-step-title" className="mt-2 font-heading text-3xl sm:text-4xl">{currentStep.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{currentStep.description}</p></div><span className="w-fit rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">{template.name}</span></div>
          {draftIsLoading && <div role="status" className="mb-5 rounded-2xl bg-secondary/70 p-4 text-sm text-muted-foreground">Loading your saved draft…</div>}
          {draftLoadError && <div role="alert" className="mb-5 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">{draftLoadError}<p className="mt-2"><Link href={`/templates/${encodeURIComponent(template.slug)}`} className="underline">Return to template preview</Link></p></div>}
          {saveMessage && <p role="status" className="mb-5 rounded-2xl bg-brand-botanical/10 px-4 py-3 text-sm text-brand-botanical">{saveMessage}</p>}
          {saveError && <p role="alert" className="mb-5 rounded-2xl bg-destructive/5 px-4 py-3 text-sm text-destructive">{saveError}</p>}
          <form onSubmit={(event) => event.preventDefault()}><fieldset disabled={saving || draftIsLoading || Boolean(draftLoadError)} className="min-w-0 space-y-6 disabled:opacity-70"><StepFields step={currentStep.key} form={form} /></fieldset><div className="mt-9 flex flex-col-reverse justify-between gap-3 border-t border-border/80 pt-6 sm:flex-row"><button type="button" onClick={() => goToStep(activeStep - 1)} disabled={activeStep === 0 || saving || draftIsLoading} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45"><ArrowLeft aria-hidden="true" className="size-4" /> Previous</button>{activeStep < steps.length - 1 ? <button type="button" onClick={nextStep} disabled={saving || draftIsLoading || Boolean(draftLoadError)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-110 disabled:opacity-55">Next step <ArrowRight aria-hidden="true" className="size-4" /></button> : <button type="button" onClick={() => void saveCurrentDraft()} disabled={saving || draftIsLoading || Boolean(draftLoadError)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-110 disabled:opacity-55"><Save aria-hidden="true" className="size-4" /> {saving ? "Saving draft…" : "Save draft"}</button>}</div></form>
        </section>
      </div>
    </div>
  </main>;
}
