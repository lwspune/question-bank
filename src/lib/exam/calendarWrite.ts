/**
 * Writing the exam calendar (public.exam_sittings, migration 0281): the checks
 * `npm run calendar` applies before any write, and the insert / update / same
 * plan it prints. The checks mirror the table's CHECKs (so a dry run catches
 * what the INSERT would refuse) and add the two only code can make: the exam
 * is in EXAM_REGISTRY, and it is not a course (practice-only and not a board:
 * there is no sitting to count down to). The daily live test runs the same
 * checks over every stored row.
 *
 * Pure. Spec: tests/exam-calendar-write.test.ts.
 */
import { EXAM_REGISTRY, type ExamSlug } from "./examContext";
import { sanitizeExamDate, type SittingEntry } from "./calendar";

/** The table's own patterns (0281). */
const SITTING_RE = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/;
const DASH_RE = /(—|–|\s--\s)/;
const URL_RE = /^https:\/\/\S+$/;

/** A course: practice-only and not a board, so no sitting exists. */
export function isCourse(e: { practiceOnly?: boolean; boardExam?: boolean }): boolean {
  return e.practiceOnly === true && e.boardExam !== true;
}

export type SittingCheck = { ok: true; value: SittingEntry } | { ok: false; errors: string[] };

export function checkSittingInput(raw: unknown): SittingCheck {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, errors: ["a sitting must be an object"] };
  const r = raw as Record<string, unknown>;
  const who = `${typeof r.exam === "string" ? r.exam : "?"} ${typeof r.sitting === "string" ? r.sitting : "?"}:`;
  const errors: string[] = [];

  const entry = typeof r.exam === "string" ? EXAM_REGISTRY.find((e) => e.slug === r.exam) : undefined;
  if (!entry) errors.push(`${who} exam is not in EXAM_REGISTRY`);
  else if (isCourse(entry)) errors.push(`${who} ${entry.slug} is a course with no sitting`);

  if (typeof r.sitting !== "string" || !SITTING_RE.test(r.sitting) || r.sitting.length > 20)
    errors.push(`${who} sitting must be letters/digits joined by hyphens, at most 20 (e.g. 2027-I)`);

  if (typeof r.label !== "string" || r.label.trim().length === 0 || r.label.length > 80)
    errors.push(`${who} label must be 1-80 characters`);
  else if (DASH_RE.test(r.label)) errors.push(`${who} label has a dash; write it without one`);

  const date = sanitizeExamDate(r.date);
  if (!date) errors.push(`${who} date must be a real YYYY-MM-DD`);

  if (typeof r.official !== "boolean") errors.push(`${who} official must be true or false`);

  if (typeof r.source !== "string" || r.source.trim().length === 0 || r.source.length > 400)
    errors.push(`${who} source must be 1-400 characters`);

  const rawUrl = r.sourceUrl;
  const sourceUrl = rawUrl === undefined || rawUrl === null ? null : rawUrl;
  if (sourceUrl !== null && (typeof sourceUrl !== "string" || !URL_RE.test(sourceUrl)))
    errors.push(`${who} sourceUrl must be an https link`);
  if (r.official === true && (sourceUrl === null || sourceUrl === ""))
    errors.push(`${who} an official date needs the notice's https link in sourceUrl`);

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      exam: entry!.slug as ExamSlug,
      sitting: r.sitting as string,
      label: r.label as string,
      date: date!,
      official: r.official as boolean,
      source: r.source as string,
      sourceUrl: sourceUrl as string | null,
    },
  };
}

export type CalendarWrite = {
  action: "insert" | "update" | "same";
  entry: SittingEntry;
  /** "date 2027-05-02 -> 2027-05-03", one per changed field. */
  changes: string[];
  warning?: string;
};

const FIELDS = ["label", "date", "official", "source", "sourceUrl"] as const;

export function planCalendarWrite(inputs: readonly SittingEntry[], existing: readonly SittingEntry[]): CalendarWrite[] {
  const key = (e: SittingEntry) => `${e.exam}|${e.sitting}`;
  const seen = new Set<string>();
  for (const e of inputs) {
    if (seen.has(key(e))) throw new Error(`${e.exam} ${e.sitting} is in the file twice`);
    seen.add(key(e));
  }
  const byKey = new Map(existing.map((e) => [key(e), e]));
  return inputs.map((entry) => {
    const old = byKey.get(key(entry));
    if (!old) return { action: "insert", entry, changes: [] };
    const show = (v: unknown) => (v === null || v === undefined || v === "" ? "none" : String(v));
    const changes = FIELDS.filter((f) => (old[f] ?? null) !== (entry[f] ?? null)).map(
      (f) => `${f} ${show(old[f])} -> ${show(entry[f])}`
    );
    const write: CalendarWrite = { action: changes.length ? "update" : "same", entry, changes };
    if (old.official && !entry.official) write.warning = "this moves an official date back to expected: is that right?";
    return write;
  });
}

/** The table's column names. */
export function sittingToRow(e: SittingEntry) {
  return {
    exam: e.exam,
    sitting: e.sitting,
    label: e.label,
    date: e.date,
    official: e.official,
    source: e.source,
    source_url: e.sourceUrl,
  };
}
