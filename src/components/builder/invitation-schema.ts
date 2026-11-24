import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const dateValue = z.string().refine((value) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, "Enter a real calendar date.");
const timeValue = z.string().refine((value) => !value || /^([01]\d|2[0-3]):[0-5]\d$/.test(value), "Enter a valid time.");
const cloudinaryImageUrl = text(2048).refine((value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com" && /^\/[a-zA-Z0-9_-]+\/image\/upload\/.+/.test(url.pathname);
  } catch { return false; }
}, "Use a Cloudinary image URL or leave this blank.");
const cloudinaryAudioUrl = text(2048).refine((value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com" && /^\/[a-zA-Z0-9_-]+\/(?:video|raw)\/upload\/.+/.test(url.pathname);
  } catch { return false; }
}, "Use a Cloudinary audio URL or leave this blank.");
const webUrl = text(2048).refine((value) => {
  if (!value) return true;
  try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:"; }
  catch { return false; }
}, "Enter a valid web address or leave this blank.");

export const brideSectionSchema = z.object({ firstName: text(80), lastName: text(80), preferredName: text(80), parents: text(180) }).strict();
export const groomSectionSchema = z.object({ firstName: text(80), lastName: text(80), preferredName: text(80), parents: text(180) }).strict();
export const familySectionSchema = z.object({ hostLine: text(240), brideFamily: text(240), groomFamily: text(240) }).strict();
export const dateTimeSectionSchema = z.object({ weddingDate: dateValue, weddingTime: timeValue, timeZone: text(80) }).strict();
const eventSchema = z.object({ title: text(100), date: dateValue, time: timeValue, venueName: text(120), address: text(240) }).strict();
export const eventScheduleSectionSchema = z.object({ events: z.array(eventSchema).max(20) }).strict();
export const venueSectionSchema = z.object({ name: text(140), addressLine1: text(180), addressLine2: text(180), city: text(100), region: text(100), postalCode: text(24), country: text(100), mapUrl: webUrl }).strict();
export const messageSectionSchema = z.object({ headline: text(140), body: text(3000) }).strict();
export const gallerySectionSchema = z.object({ photos: z.array(z.object({ url: cloudinaryImageUrl.refine(Boolean, "Add a photo URL or remove this row."), altText: text(160), caption: text(180) }).strict()).max(30) }).strict();
export const musicSectionSchema = z.object({ trackTitle: text(120), trackUrl: cloudinaryAudioUrl }).strict();
export const additionalDetailsSectionSchema = z.object({ dressCode: text(160), giftNote: text(500), accommodation: text(800), parking: text(500), otherNotes: text(1200) }).strict();

export const invitationDraftDataSchema = z.object({
  bride: brideSectionSchema,
  groom: groomSectionSchema,
  family: familySectionSchema,
  dateTime: dateTimeSectionSchema,
  eventSchedule: eventScheduleSectionSchema,
  venue: venueSectionSchema,
  message: messageSectionSchema,
  gallery: gallerySectionSchema,
  music: musicSectionSchema,
  additionalDetails: additionalDetailsSectionSchema,
}).strict();

export type InvitationDraftData = z.infer<typeof invitationDraftDataSchema>;
export type BuilderSectionKey = keyof InvitationDraftData;
export interface BuilderIssue { path: string; message: string }

export const emptyInvitationDraft: InvitationDraftData = {
  bride: { firstName: "", lastName: "", preferredName: "", parents: "" },
  groom: { firstName: "", lastName: "", preferredName: "", parents: "" },
  family: { hostLine: "", brideFamily: "", groomFamily: "" },
  dateTime: { weddingDate: "", weddingTime: "", timeZone: "" },
  eventSchedule: { events: [] },
  venue: { name: "", addressLine1: "", addressLine2: "", city: "", region: "", postalCode: "", country: "", mapUrl: "" },
  message: { headline: "", body: "" },
  gallery: { photos: [] },
  music: { trackTitle: "", trackUrl: "" },
  additionalDetails: { dressCode: "", giftNote: "", accommodation: "", parking: "", otherNotes: "" },
};

function sectionIssues(step: BuilderSectionKey, result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }): BuilderIssue[] {
  if (result.success || !result.error) return [];
  return result.error.issues.map((issue) => ({ path: [step, ...issue.path].join("."), message: issue.message }));
}

const requiredName = (label: string) => text(80).min(1, `${label} is required.`);

export function validateBuilderSection(step: BuilderSectionKey, data: InvitationDraftData): BuilderIssue[] {
  switch (step) {
    case "bride": return sectionIssues(step, z.object({ ...brideSectionSchema.shape, firstName: requiredName("First name"), lastName: requiredName("Last name") }).strict().safeParse(data.bride));
    case "groom": return sectionIssues(step, z.object({ ...groomSectionSchema.shape, firstName: requiredName("First name"), lastName: requiredName("Last name") }).strict().safeParse(data.groom));
    case "family": return sectionIssues(step, familySectionSchema.safeParse(data.family));
    case "dateTime": return sectionIssues(step, z.object({ weddingDate: dateValue.refine(Boolean, "Wedding date is required."), weddingTime: timeValue.refine(Boolean, "Wedding time is required."), timeZone: text(80) }).strict().safeParse(data.dateTime));
    case "eventSchedule": return sectionIssues(step, z.object({ events: z.array(z.object({ ...eventSchema.shape, title: text(100).min(1, "Event name is required."), time: timeValue.refine(Boolean, "Event time is required.") }).strict()).min(1, "Add at least one event to continue.").max(20) }).strict().safeParse(data.eventSchedule));
    case "venue": return sectionIssues(step, z.object({ ...venueSectionSchema.shape, name: text(140).min(1, "Venue name is required."), addressLine1: text(180).min(1, "Street address is required."), city: text(100).min(1, "City is required."), country: text(100).min(1, "Country is required.") }).strict().safeParse(data.venue));
    case "message": return sectionIssues(step, messageSectionSchema.safeParse(data.message));
    case "gallery": return sectionIssues(step, gallerySectionSchema.safeParse(data.gallery));
    case "music": return sectionIssues(step, musicSectionSchema.safeParse(data.music));
    case "additionalDetails": return sectionIssues(step, additionalDetailsSectionSchema.safeParse(data.additionalDetails));
  }
}
