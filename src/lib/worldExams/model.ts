/**
 * The world-exams master list (migration 0260): the fixed value lists, the
 * screening rules, and the zod schemas that check a database row before the
 * page shows it and the loader's file before it is written.
 *
 * The CONTENT lives only in the database (the repo is public, and the list
 * carries rights analysis and revenue estimates). What lives here is shape.
 * Pure: no server imports, so the loader script and the tests share it.
 */
import { z } from "zod";

export const REGIONS = [
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "americas", label: "Americas" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" },
  { id: "global", label: "Global (private setters)" },
] as const;

export const CATEGORIES = [
  { id: "entrance", label: "Entrance" },
  { id: "school", label: "School-leaving" },
  { id: "civil_service", label: "Civil service" },
  { id: "licensing", label: "Professional licensing" },
  { id: "driving", label: "Driving theory" },
  { id: "language", label: "Language" },
  { id: "other", label: "Other" },
] as const;

export const RIGHTS = [
  { id: "free", label: "Free", meaning: "Official act, government work outside copyright, or an open licence" },
  { id: "same_as_india", label: "Same as India", meaning: "Setter publishes the papers; the law is silent; we already do this for Indian PYQs" },
  { id: "licensable", label: "Licensable", meaning: "Setter sells or licenses the bank for a fee or royalty" },
  { id: "original_only", label: "Original-only", meaning: "No papers released, or reuse refused; we can only write our own questions" },
  { id: "reject", label: "Reject", meaning: "Setter refuses publishers, or the market is closed to us" },
  { id: "not_checked", label: "Not checked", meaning: "Rights not yet researched" },
] as const;

export const VERDICTS = [
  { id: "live", label: "Live" },
  { id: "in_progress", label: "In progress" },
  { id: "shortlist", label: "Shortlist" },
  { id: "lead", label: "Lead" },
  { id: "park", label: "Park" },
  { id: "skip", label: "Skip" },
  { id: "declined", label: "Declined" },
] as const;

/** The four screening rules. An exam qualifies only when it passes all four. */
export const RULES = [
  { title: "MCQ", body: "Machine-gradeable: single answer, select-all or a numeric answer. Written papers are out." },
  {
    title: "Legal past papers",
    body: "The setter publishes full papers and keys, and the law or a licence lets us republish them. Original-only exams are listed but not ranked.",
  },
  { title: "Size", body: "At least 2,000 candidates a year." },
  {
    title: "A paying audience we can reach",
    body: "Students who pay for prep, in a language and payment system we can serve, ideally reachable through ChatGPT or Google.",
  },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];
export type CategoryId = (typeof CATEGORIES)[number]["id"];
export type RightsId = (typeof RIGHTS)[number]["id"];
export type VerdictId = (typeof VERDICTS)[number]["id"];

const ids = <T extends readonly { id: string }[]>(list: T) => list.map((x) => x.id) as [T[number]["id"], ...T[number]["id"][]];

const regionSchema = z.enum(ids(REGIONS));
const categorySchema = z.enum(ids(CATEGORIES));
const rightsSchema = z.enum(ids(RIGHTS));
const verdictSchema = z.enum(ids(VERDICTS));

const sourceSchema = z.object({
  label: z.string().min(1).max(200),
  url: z.string().url().refine((u) => u.startsWith("https://"), { message: "url must be https" }),
});

const levelSchema = z.object({
  share: z.number().min(0).max(1, { message: "share must be a fraction between 0 and 1" }),
  price: z.number().nonnegative(),
  usd: z.number().int().nonnegative(),
});

const revenueSchema = z.object({
  currency: z.enum(["USD", "EUR", "INR", "KRW"]),
  low: levelSchema,
  mid: levelSchema,
  high: levelSchema,
});

const idSchema = z.string().regex(/^[a-z0-9][a-z0-9-]{1,79}$/, { message: "id must be lowercase letters, digits and dashes" });

/** One exam row as stored (snake_case, the table's columns). */
const examRowSchema = z
  .object({
    id: idSchema,
    region: regionSchema,
    country: z.string().min(2).max(80),
    exam: z.string().min(2).max(200),
    category: categorySchema,
    format: z.string().max(300).default(""),
    candidates: z.string().max(200).default(""),
    candidates_n: z.number().int().nonnegative().nullable().default(null),
    papers_released: z.string().max(300).default(""),
    rights: rightsSchema,
    rights_note: z.string().max(400).default(""),
    language: z.string().max(120).default(""),
    verdict: verdictSchema,
    note: z.string().max(600).default(""),
    approximate: z.boolean().default(false),
    shortlist_rank: z.number().int().min(1).max(50).nullable().default(null),
    why_passes: z.string().max(600).nullable().default(null),
    main_risk: z.string().max(400).nullable().default(null),
    next_step: z.string().max(400).nullable().default(null),
    revenue: revenueSchema.nullable().default(null),
    sources: z.array(sourceSchema).default([]),
  })
  .refine((r) => r.shortlist_rank === null || (r.why_passes && r.main_risk && r.next_step), {
    message: "a shortlist row needs why_passes, main_risk and next_step",
    path: ["shortlist_rank"],
  });

const noteRowSchema = z.object({
  id: idSchema,
  title: z.string().min(2).max(120),
  sort: z.number().int().default(0),
  paragraphs: z.array(z.string().min(1)).default([]),
  bullets: z.array(z.string().min(1)).default([]),
  sources: z.array(sourceSchema).default([]),
});

export type Source = z.infer<typeof sourceSchema>;
export type Revenue = z.infer<typeof revenueSchema>;
export type ExamRowInput = z.input<typeof examRowSchema>;
export type NoteRowInput = z.input<typeof noteRowSchema>;

export type WorldExam = {
  id: string;
  region: RegionId;
  country: string;
  exam: string;
  category: CategoryId;
  format: string;
  candidates: string;
  candidatesN: number | null;
  papersReleased: string;
  rights: RightsId;
  rightsNote: string;
  language: string;
  verdict: VerdictId;
  note: string;
  approximate: boolean;
  shortlistRank: number | null;
  whyPasses: string | null;
  mainRisk: string | null;
  nextStep: string | null;
  revenue: Revenue | null;
  sources: Source[];
};

export type WorldExamNote = {
  id: string;
  title: string;
  sort: number;
  paragraphs: string[];
  bullets: string[];
  sources: Source[];
};

function fail(what: string, error: z.ZodError): never {
  const first = error.issues[0];
  throw new Error(`${what}: ${first.path.join(".")}: ${first.message}`);
}

/** Check one database row (or one loader-file entry) and map it to the page's shape. */
export function parseExamRow(input: unknown): WorldExam {
  const parsed = examRowSchema.safeParse(input);
  if (!parsed.success) fail(`world exam ${String((input as { id?: unknown })?.id ?? "?")}`, parsed.error);
  const r = parsed.data;
  return {
    id: r.id,
    region: r.region,
    country: r.country,
    exam: r.exam,
    category: r.category,
    format: r.format,
    candidates: r.candidates,
    candidatesN: r.candidates_n,
    papersReleased: r.papers_released,
    rights: r.rights,
    rightsNote: r.rights_note,
    language: r.language,
    verdict: r.verdict,
    note: r.note,
    approximate: r.approximate,
    shortlistRank: r.shortlist_rank,
    whyPasses: r.why_passes,
    mainRisk: r.main_risk,
    nextStep: r.next_step,
    revenue: r.revenue,
    sources: r.sources,
  };
}

export function parseNoteRow(input: unknown): WorldExamNote {
  const parsed = noteRowSchema.safeParse(input);
  if (!parsed.success) fail(`world exam note ${String((input as { id?: unknown })?.id ?? "?")}`, parsed.error);
  return parsed.data;
}

export type LoadFile = { exams: ExamRowInput[]; notes: NoteRowInput[] };

/**
 * Check the loader's whole file: every row as above, plus what only shows
 * across rows (duplicate ids, two rows on one shortlist rank). Returns the
 * rows in the table's own column names, ready to upsert.
 */
export function parseLoadFile(input: unknown): {
  exams: z.output<typeof examRowSchema>[];
  notes: z.output<typeof noteRowSchema>[];
} {
  const file = z.object({ exams: z.array(z.unknown()), notes: z.array(z.unknown()).default([]) }).safeParse(input);
  if (!file.success) fail("load file", file.error);

  const exams = file.data.exams.map((e) => {
    const parsed = examRowSchema.safeParse(e);
    if (!parsed.success) fail(`world exam ${String((e as { id?: unknown })?.id ?? "?")}`, parsed.error);
    return parsed.data;
  });
  const notes = file.data.notes.map((n) => {
    const parsed = noteRowSchema.safeParse(n);
    if (!parsed.success) fail(`world exam note ${String((n as { id?: unknown })?.id ?? "?")}`, parsed.error);
    return parsed.data;
  });

  // A fact with no source must say it came from memory. Checked at load, not
  // at read, so an old row never breaks the page.
  const unsourced = exams.find((e) => e.sources.length === 0 && !e.approximate);
  if (unsourced) throw new Error(`load file: ${unsourced.id} has no source; add one or mark it approximate`);

  const dup = (list: string[]) => list.find((x, i) => list.indexOf(x) !== i);
  const dupExam = dup(exams.map((e) => e.id));
  if (dupExam) throw new Error(`load file: duplicate id ${dupExam}`);
  const dupNote = dup(notes.map((n) => n.id));
  if (dupNote) throw new Error(`load file: duplicate id ${dupNote} (notes)`);
  const ranks = exams.map((e) => e.shortlist_rank).filter((r): r is number => r !== null);
  const dupRank = dup(ranks.map(String));
  if (dupRank) throw new Error(`load file: two rows share shortlist rank ${dupRank}`);

  return { exams, notes };
}
