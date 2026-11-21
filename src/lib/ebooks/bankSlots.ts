/**
 * A Chapter-wise PYQs book read straight from the bank (2026-11-21). PURE.
 * Spec: tests/ebook-bank-slots.test.ts.
 *
 * For an exam with no homework plan and no stored papers (Homi Bhabha Class
 * 9): every PUBLIC past question of the book's subjects becomes a slot,
 * newest sitting first and then in the paper's own numbering, a passage and
 * its questions as one slot under its first part's chapter. Chapters follow a
 * pinned order, the subjects in turn; a chapter the order does not name stops
 * the build rather than drop out of a paid book.
 */
import type { ChapterwiseSlot } from "./chapterwise";

export type BankRow = {
  id: string;
  setId: string | null;
  /** subjects.name. */
  subject: string;
  chapterId: string;
  chapterName: string;
  year: number | null;
  /** questions.pyq_note: "Homi Bhabha Std IX (30 November 2024)". */
  note: string | null;
  questionNumber: string | null;
};

export type BankOrder = {
  /** Subjects in print order. */
  subjects: readonly string[];
  /** Per subject, chapters.name in print order. */
  chapterOrder: Readonly<Record<string, readonly string[]>>;
};

/** The line over a question: what the note's last brackets hold, else the note, else the year. */
export function bankSittingLabel(note: string | null, year: number | null): string {
  const inner = note?.match(/\(([^()]*)\)\s*$/)?.[1]?.trim();
  if (inner) return inner;
  if (note?.trim()) return note.trim();
  return year == null ? "" : String(year);
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** A sitting's place in time: year, then the month its note names (0 when none), then the day. */
function sittingKey(r: BankRow): number {
  const note = (r.note ?? "").toLowerCase();
  const month = MONTHS.findIndex((m) => note.includes(m)) + 1;
  const day = month ? Number(note.match(/(\d{1,2})\s+[a-z]+\s+\d{4}/)?.[1] ?? 0) : 0;
  return (r.year ?? 0) * 10_000 + month * 100 + day;
}

const numberOf = (r: BankRow) => Number.parseFloat(r.questionNumber ?? "") || 0;

export function bankSlots(rows: readonly BankRow[], order: BankOrder): ChapterwiseSlot[] {
  const subjectAt = new Map(order.subjects.map((s, i) => [s, i]));
  const placeOf = (r: BankRow): number => {
    const s = subjectAt.get(r.subject);
    if (s === undefined) throw new Error(`subject "${r.subject}" is not one this book reads (${order.subjects.join(", ")})`);
    const c = order.chapterOrder[r.subject]?.indexOf(r.chapterName) ?? -1;
    if (c < 0) throw new Error(`chapter "${r.chapterName}" (${r.subject}) is missing from the pinned order`);
    return s * 1000 + c;
  };
  // Every row is checked, not only a slot's first part: an unnamed chapter is a taxonomy change to look at.
  for (const r of rows) placeOf(r);
  const sorted = [...rows].sort(
    (a, b) =>
      sittingKey(b) - sittingKey(a) ||
      (a.note ?? "").localeCompare(b.note ?? "") ||
      numberOf(a) - numberOf(b) ||
      a.id.localeCompare(b.id)
  );
  const slots: { first: BankRow; parts: BankRow[] }[] = [];
  const bySet = new Map<string, { first: BankRow; parts: BankRow[] }>();
  for (const r of sorted) {
    const open = r.setId ? bySet.get(r.setId) : undefined;
    if (open) {
      open.parts.push(r);
      continue;
    }
    const slot = { first: r, parts: [r] };
    slots.push(slot);
    if (r.setId) bySet.set(r.setId, slot);
  }
  return slots.map((s, i) => ({
    order: i,
    marks: null,
    note: bankSittingLabel(s.first.note, s.first.year),
    chapterId: s.first.chapterId,
    chapterName: s.first.chapterName,
    chapterOrder: placeOf(s.first),
    parts: s.parts.map((p) => p.id),
  }));
}
