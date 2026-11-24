"use client";

import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";
import type { InvitationDraftData } from "@/components/builder/invitation-schema";

type BuilderForm = UseFormReturn<InvitationDraftData>;

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return <div className="space-y-2"><label className="block space-y-2"><span className="block text-sm font-medium">{label}</span>{children}</label>{hint && !error && <p className="text-xs leading-5 text-muted-foreground">{hint}</p>}{error && <p role="alert" className="text-xs leading-5 text-destructive">{error}</p>}</div>;
}

function TextInput({ registration, error, ...props }: { registration: UseFormRegisterReturn; error?: string; type?: string; placeholder?: string; autoComplete?: string; maxLength?: number; inputMode?: "text" | "email" | "url" | "numeric" | "decimal" | "tel" | "search" | "none" } ) {
  return <input {...registration} {...props} aria-invalid={Boolean(error)} className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive" />;
}

function TextArea({ registration, error, rows = 4, maxLength, placeholder }: { registration: UseFormRegisterReturn; error?: string; rows?: number; maxLength?: number; placeholder?: string }) {
  return <textarea {...registration} rows={rows} maxLength={maxLength} placeholder={placeholder} aria-invalid={Boolean(error)} className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-6 outline-none transition focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive" />;
}

export function BrideInformationSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="grid gap-5 sm:grid-cols-2"><Field label="First name" error={errors.bride?.firstName?.message}><TextInput registration={register("bride.firstName")} error={errors.bride?.firstName?.message} autoComplete="given-name" maxLength={80} /></Field><Field label="Last name" error={errors.bride?.lastName?.message}><TextInput registration={register("bride.lastName")} error={errors.bride?.lastName?.message} autoComplete="family-name" maxLength={80} /></Field><Field label="Preferred name" hint="Optional name to show in the invitation."><TextInput registration={register("bride.preferredName")} maxLength={80} /></Field><Field label="Parents or family names" hint="Optional."><TextInput registration={register("bride.parents")} maxLength={180} /></Field></div>;
}

export function GroomInformationSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="grid gap-5 sm:grid-cols-2"><Field label="First name" error={errors.groom?.firstName?.message}><TextInput registration={register("groom.firstName")} error={errors.groom?.firstName?.message} autoComplete="given-name" maxLength={80} /></Field><Field label="Last name" error={errors.groom?.lastName?.message}><TextInput registration={register("groom.lastName")} error={errors.groom?.lastName?.message} autoComplete="family-name" maxLength={80} /></Field><Field label="Preferred name" hint="Optional name to show in the invitation."><TextInput registration={register("groom.preferredName")} maxLength={80} /></Field><Field label="Parents or family names" hint="Optional."><TextInput registration={register("groom.parents")} maxLength={180} /></Field></div>;
}

export function FamilyInformationSection({ form }: { form: BuilderForm }) {
  const { register } = form;
  return <div className="space-y-5"><Field label="Hosting line" hint="For example, a short note from both families."><TextInput registration={register("family.hostLine")} maxLength={240} placeholder="Together with their families" /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Bride’s family"><TextArea registration={register("family.brideFamily")} rows={3} maxLength={240} placeholder="Parents, guardians, or family members" /></Field><Field label="Groom’s family"><TextArea registration={register("family.groomFamily")} rows={3} maxLength={240} placeholder="Parents, guardians, or family members" /></Field></div></div>;
}

export function WeddingDateTimeSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="grid gap-5 sm:grid-cols-2"><Field label="Wedding date" error={errors.dateTime?.weddingDate?.message}><TextInput registration={register("dateTime.weddingDate")} error={errors.dateTime?.weddingDate?.message} type="date" /></Field><Field label="Ceremony time" error={errors.dateTime?.weddingTime?.message}><TextInput registration={register("dateTime.weddingTime")} error={errors.dateTime?.weddingTime?.message} type="time" /></Field><Field label="Time zone" hint="Optional, used to describe local event times."><TextInput registration={register("dateTime.timeZone")} maxLength={80} placeholder="e.g. Asia/Dhaka" /></Field></div>;
}

export function EventScheduleSection({ form }: { form: BuilderForm }) {
  const { control, register, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "eventSchedule.events" });
  return <div className="space-y-4">{errors.eventSchedule?.events?.message && <p role="alert" className="text-sm text-destructive">{errors.eventSchedule.events.message}</p>}{fields.map((event, index) => <fieldset key={event.id} className="rounded-2xl border border-border p-4 sm:p-5"><legend className="px-2 text-sm font-medium">Event {index + 1}</legend><div className="grid gap-4 sm:grid-cols-2"><Field label="Event name" error={errors.eventSchedule?.events?.[index]?.title?.message}><TextInput registration={register(`eventSchedule.events.${index}.title`)} error={errors.eventSchedule?.events?.[index]?.title?.message} maxLength={100} placeholder="Ceremony, reception…" /></Field><Field label="Date"><TextInput registration={register(`eventSchedule.events.${index}.date`)} type="date" /></Field><Field label="Time" error={errors.eventSchedule?.events?.[index]?.time?.message}><TextInput registration={register(`eventSchedule.events.${index}.time`)} error={errors.eventSchedule?.events?.[index]?.time?.message} type="time" /></Field><Field label="Venue name"><TextInput registration={register(`eventSchedule.events.${index}.venueName`)} maxLength={120} /></Field><div className="sm:col-span-2"><Field label="Address"><TextInput registration={register(`eventSchedule.events.${index}.address`)} maxLength={240} /></Field></div></div><button type="button" onClick={() => remove(index)} className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground transition hover:bg-destructive/5 hover:text-destructive"><Trash2 aria-hidden="true" className="size-3.5" /> Remove event</button></fieldset>)}<button type="button" onClick={() => append({ title: "", date: "", time: "", venueName: "", address: "" })} disabled={fields.length >= 20} className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition hover:bg-secondary disabled:opacity-50"><Plus aria-hidden="true" className="size-4" /> Add an event</button></div>;
}

export function VenueSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="grid gap-5 sm:grid-cols-2"><Field label="Venue name" error={errors.venue?.name?.message}><TextInput registration={register("venue.name")} error={errors.venue?.name?.message} maxLength={140} autoComplete="organization" /></Field><Field label="Street address" error={errors.venue?.addressLine1?.message}><TextInput registration={register("venue.addressLine1")} error={errors.venue?.addressLine1?.message} maxLength={180} autoComplete="address-line1" /></Field><Field label="Address line 2"><TextInput registration={register("venue.addressLine2")} maxLength={180} autoComplete="address-line2" /></Field><Field label="City" error={errors.venue?.city?.message}><TextInput registration={register("venue.city")} error={errors.venue?.city?.message} maxLength={100} autoComplete="address-level2" /></Field><Field label="State or region"><TextInput registration={register("venue.region")} maxLength={100} autoComplete="address-level1" /></Field><Field label="Postal code"><TextInput registration={register("venue.postalCode")} maxLength={24} autoComplete="postal-code" /></Field><Field label="Country" error={errors.venue?.country?.message}><TextInput registration={register("venue.country")} error={errors.venue?.country?.message} maxLength={100} autoComplete="country-name" /></Field><Field label="Map link" error={errors.venue?.mapUrl?.message} hint="Optional HTTPS or HTTP map URL."><TextInput registration={register("venue.mapUrl")} error={errors.venue?.mapUrl?.message} type="url" maxLength={2048} placeholder="https://maps.example/…" /></Field></div>;
}

export function MessageSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="space-y-5"><Field label="Invitation heading" error={errors.message?.headline?.message}><TextInput registration={register("message.headline")} error={errors.message?.headline?.message} maxLength={140} placeholder="A celebration of love" /></Field><Field label="Your message" error={errors.message?.body?.message} hint="Share a personal welcome or invitation note."><TextArea registration={register("message.body")} error={errors.message?.body?.message} rows={8} maxLength={3000} placeholder="Write a message for your guests…" /></Field></div>;
}

export function GallerySection({ form }: { form: BuilderForm }) {
  const { control, register, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "gallery.photos" });
  return <div className="space-y-4"><p className="text-sm leading-6 text-muted-foreground">Add Cloudinary image links for now. Direct media upload is not connected in this editor yet.</p>{fields.map((photo, index) => <fieldset key={photo.id} className="rounded-2xl border border-border p-4"><legend className="px-2 text-sm font-medium">Photo {index + 1}</legend><div className="grid gap-4"><Field label="Image URL" error={errors.gallery?.photos?.[index]?.url?.message}><TextInput registration={register(`gallery.photos.${index}.url`)} error={errors.gallery?.photos?.[index]?.url?.message} type="url" maxLength={2048} placeholder="https://res.cloudinary.com/…" /></Field><Field label="Alt text" error={errors.gallery?.photos?.[index]?.altText?.message} hint="Describe the image for guests using a screen reader."><TextInput registration={register(`gallery.photos.${index}.altText`)} error={errors.gallery?.photos?.[index]?.altText?.message} maxLength={160} /></Field><Field label="Caption"><TextInput registration={register(`gallery.photos.${index}.caption`)} maxLength={180} /></Field></div><button type="button" onClick={() => remove(index)} className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground hover:bg-destructive/5 hover:text-destructive"><Trash2 aria-hidden="true" className="size-3.5" /> Remove photo</button></fieldset>)}<button type="button" onClick={() => append({ url: "", altText: "", caption: "" })} disabled={fields.length >= 30} className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition hover:bg-secondary disabled:opacity-50"><Plus aria-hidden="true" className="size-4" /> Add a photo</button></div>;
}

export function MusicSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="grid gap-5 sm:grid-cols-2"><Field label="Track title" hint="Optional."><TextInput registration={register("music.trackTitle")} maxLength={120} /></Field><Field label="Cloudinary audio URL" error={errors.music?.trackUrl?.message} hint="Use a Cloudinary audio asset link. Music will not autoplay in this editor."><TextInput registration={register("music.trackUrl")} error={errors.music?.trackUrl?.message} type="url" maxLength={2048} placeholder="https://res.cloudinary.com/…" /></Field></div>;
}

export function AdditionalDetailsSection({ form }: { form: BuilderForm }) {
  const { register, formState: { errors } } = form;
  return <div className="space-y-5"><Field label="Dress code"><TextInput registration={register("additionalDetails.dressCode")} maxLength={160} placeholder="Optional attire guidance" /></Field><Field label="Gift note"><TextArea registration={register("additionalDetails.giftNote")} rows={3} maxLength={500} /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Accommodation"><TextArea registration={register("additionalDetails.accommodation")} rows={4} maxLength={800} /></Field><Field label="Parking"><TextArea registration={register("additionalDetails.parking")} rows={4} maxLength={500} /></Field></div><Field label="Additional notes" error={errors.additionalDetails?.otherNotes?.message}><TextArea registration={register("additionalDetails.otherNotes")} error={errors.additionalDetails?.otherNotes?.message} rows={4} maxLength={1200} /></Field></div>;
}
