/**
 * One day of a homework plan as a download (2026-10-09). Pure.
 *
 * The day's questions in position order, each headed by its chapter and the
 * line saying how often the board asked it. Both paper builders print a
 * `sectionOf` heading whenever it changes, so every question gets its own.
 * Spec: tests/homework-day-export.test.ts.
 */

export type HomeworkDayItem = { position: number; questionId: string; chapter: string; note: string };

export type HomeworkDayExport =
  | { ok: true; title: string; questionIds: string[]; sectionOf: Map<string, string> }
  | { ok: false; reason: string };

export function homeworkDayExport(planTitle: string, day: number, items: HomeworkDayItem[]): HomeworkDayExport {
  if (items.length === 0) return { ok: false, reason: "That day is not in this plan." };
  const ordered = [...items].sort((a, b) => a.position - b.position);
  // A gap would print the wrong question numbers against the page.
  if (ordered.some((it, i) => it.position !== i + 1)) {
    return { ok: false, reason: "This day can't be downloaded right now. Please try again later." };
  }
  return {
    ok: true,
    title: `Daily Homework #${day}: ${planTitle}`,
    questionIds: ordered.map((it) => it.questionId),
    sectionOf: new Map(ordered.map((it) => [it.questionId, `${it.chapter} | ${it.note}`])),
  };
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** `{ slug, day }` from an untrusted request body, or null. */
export function parseHomeworkTarget(raw: unknown): { slug: string; day: number } | null {
  if (!raw || typeof raw !== "object") return null;
  const { slug, day } = raw as { slug?: unknown; day?: unknown };
  if (typeof slug !== "string" || slug.length > 80 || !SLUG_RE.test(slug)) return null;
  if (typeof day !== "number" || !Number.isInteger(day) || day < 1 || day > 10_000) return null;
  return { slug, day };
}
