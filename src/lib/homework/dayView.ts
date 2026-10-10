/**
 * One homework day as a page shows it (2026-10-10): its slots in order, each a
 * question or a case study's parts, with the passage printed once on the slot.
 *
 * Shares the download's rules (dayExport.ts): a case study's parts stay
 * together in part order, and a paper's own Assertion-Reason directions ("For
 * Questions 13 to 16") give way to the general wording, since the day is not
 * that paper. Pure; spec tests/homework-day-view.test.ts.
 */
import { chapterTestContext } from "@/lib/mocks/instructionContext";
import type { HomeworkDayItem } from "./dayExport";

export type HomeworkSlot<Q> = {
  position: number;
  chapter: string;
  note: string;
  /** Shown once above the slot: the case study's passage, or a question's directions. */
  passage: string | null;
  /** In part order. A part keeps its own context only when the parts do not share one. */
  questions: Q[];
};

export type HomeworkDayView<Q> = { ok: true; slots: HomeworkSlot<Q>[] } | { ok: false; missing: string[] };

export function homeworkDayView<Q extends { id: string; context: string | null }>(
  items: readonly HomeworkDayItem[],
  questions: readonly Q[]
): HomeworkDayView<Q> {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const missing = items.map((it) => it.questionId).filter((id) => !byId.has(id));
  if (items.length === 0 || missing.length > 0) return { ok: false, missing };

  const positions = [...new Set(items.map((it) => it.position))].sort((a, b) => a - b);
  const slots = positions.map((position) => {
    const parts = items.filter((it) => it.position === position).sort((a, b) => a.sub - b.sub);
    const qs = parts.map((it) => {
      const q = byId.get(it.questionId)!;
      return { ...q, context: chapterTestContext(q.context, "sectional") };
    });
    const first = qs[0].context;
    const shared = first !== null && qs.every((x) => x.context === first);
    return {
      position,
      chapter: parts[0].chapter,
      note: parts[0].note,
      passage: shared ? first : null,
      questions: shared ? qs.map((x) => ({ ...x, context: null })) : qs,
    };
  });
  return { ok: true, slots };
}

export function adjacentDays(day: number, days: number): { prev: number | null; next: number | null } {
  return { prev: day > 1 ? day - 1 : null, next: day < days ? day + 1 : null };
}
