/**
 * The panel the repeat line's "See all" opens on the same page (owner,
 * 2026-11-15): every paper's version of the question, so a student can try
 * them without leaving the card they were on. The student's own question is not
 * shown again in full; one line at the top says which paper it was and how
 * they did. Pure. Spec: tests/repeat-panel.test.ts.
 */
import type { HomeworkSlot } from "@/lib/homework/dayView";

/** The group's slots without the student's own question, and that question's paper. */
export function panelSlots<Q extends { id: string }>(
  slots: readonly HomeworkSlot<Q>[],
  ownId: string
): { slots: HomeworkSlot<Q>[]; ownSitting: string | null } {
  let ownSitting: string | null = null;
  const out: HomeworkSlot<Q>[] = [];
  for (const s of slots) {
    if (s.questions.some((q) => q.id === ownId)) ownSitting = s.note || null;
    const questions = s.questions.filter((q) => q.id !== ownId);
    if (questions.length > 0) out.push({ ...s, questions });
  }
  return { slots: out, ownSitting };
}

/** The line about the student's own question, or null when it is not in the group. */
export function yourQuestionLine(input: { sitting: string | null; correct: boolean | null }): string | null {
  if (!input.sitting) return null;
  if (input.correct === true) return `Your question (${input.sitting}): you got it right.`;
  if (input.correct === false) return `Your question (${input.sitting}): you missed it. Try the others below.`;
  return `Your question was asked in ${input.sitting}.`;
}
