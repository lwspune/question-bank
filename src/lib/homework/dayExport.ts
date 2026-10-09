/**
 * One day of a homework plan as a download (2026-10-09). Pure.
 *
 * The day's questions in position order, each headed by its chapter and the
 * line saying how often the board asked it. Both paper builders print a
 * `sectionOf` heading whenever it changes, so every question gets its own.
 * Spec: tests/homework-day-export.test.ts.
 */
import type { QuestionRow } from "@/lib/questions/query";
import { chapterTestContext } from "@/lib/mocks/instructionContext";

/** One bank row of a day. A case study's parts share a position, numbered by `sub`. */
export type HomeworkDayItem = { position: number; sub: number; questionId: string; chapter: string; note: string };

export type HomeworkDayExport =
  | {
      ok: true;
      title: string;
      questionIds: string[];
      sectionOf: Map<string, string>;
      /** A case study's parts -> one set key, so both builders print the passage once. */
      setOf: Map<string, string>;
    }
  | { ok: false; reason: string };

export function homeworkDayExport(planTitle: string, day: number, items: HomeworkDayItem[]): HomeworkDayExport {
  if (items.length === 0) return { ok: false, reason: "That day is not in this plan." };
  const ordered = [...items].sort((a, b) => a.position - b.position || a.sub - b.sub);
  // A gap in the slots or in a slot's parts would print the wrong numbers.
  const slots = new Map<number, HomeworkDayItem[]>();
  for (const it of ordered) slots.set(it.position, [...(slots.get(it.position) ?? []), it]);
  const positions = [...slots.keys()];
  const broken =
    positions.some((p, i) => p !== i + 1) ||
    [...slots.values()].some((parts) => parts.some((it, i) => it.sub !== i + 1));
  if (broken) return { ok: false, reason: "This day can't be downloaded right now. Please try again later." };
  const setOf = new Map<string, string>();
  for (const [p, parts] of slots) {
    if (parts.length > 1) for (const it of parts) setOf.set(it.questionId, `homework-${day}-${p}`);
  }
  return {
    ok: true,
    title: `Daily Homework #${day}: ${planTitle}`,
    questionIds: ordered.map((it) => it.questionId),
    sectionOf: new Map(ordered.map((it) => [it.questionId, `${it.chapter} | ${it.note}`])),
    setOf,
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

/**
 * A day's loaded questions, ready to print. A case study's parts share one set
 * key, so both builders print the passage once; and a paper's Assertion-Reason
 * directions ("For Questions number 13 to 16 ...") name that paper's numbers,
 * which are wrong on a homework sheet, so they become the general sentence
 * chapter tests already use (lib/mocks/instructionContext).
 */
export function homeworkQuestions(questions: QuestionRow[], setOf: ReadonlyMap<string, string>): QuestionRow[] {
  return questions.map((q) => ({
    ...q,
    ...(setOf.has(q.id) ? { setId: setOf.get(q.id)! } : {}),
    context: chapterTestContext(q.context, "sectional"),
  }));
}
