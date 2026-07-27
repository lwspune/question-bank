/**
 * The written-paper correctness gate.
 *
 * One invariant does the heavy lifting: sum(attempt x marksEach) === maxMarks.
 * A paper that fails it is wrong on its face — the marks printed against the
 * questions don't add up to the marks printed in the header — so this runs over
 * the whole registry in tests AND live behind the custom-template editor.
 *
 * Pure. No I/O.
 */
import type { WrittenBlueprint, WrittenSlot } from "./types";

/** Marks a slot contributes: the ATTEMPTED count, never the printed count. */
export function slotMarks(slot: WrittenSlot): number {
  return slot.attempt * slot.marksEach;
}

export function blueprintTotalMarks(bp: WrittenBlueprint): number {
  return bp.slots.reduce((sum, s) => sum + slotMarks(s), 0);
}

export type BlueprintValidation = {
  valid: boolean;
  errors: string[];
  /**
   * Always computed, even when invalid — the custom-template editor shows a live
   * "32 / 40" meter while the teacher is still assembling slots.
   */
  totalMarks: number;
};

export function validateBlueprint(bp: WrittenBlueprint): BlueprintValidation {
  const errors: string[] = [];
  const totalMarks = blueprintTotalMarks(bp);

  if (bp.slots.length === 0) errors.push("Paper has no slots.");
  if (bp.subjects.length === 0) errors.push("Blueprint serves no subject.");
  if (bp.maxMarks <= 0) errors.push("Max marks must be greater than zero.");
  if (bp.durationMins <= 0) errors.push("Duration must be greater than zero.");

  const seen = new Set<string>();
  for (const s of bp.slots) {
    const at = s.code || s.key || "(unnamed slot)";
    if (seen.has(s.key)) errors.push(`Duplicate slot key "${s.key}" at ${at}.`);
    seen.add(s.key);

    if (!s.key) errors.push(`${at}: slot key is required.`);
    if (!s.code) errors.push(`${s.key}: slot code is required.`);
    if (s.print < 1) errors.push(`${at}: must print at least one question.`);
    if (s.attempt < 1) errors.push(`${at}: must attempt at least one question.`);
    if (s.marksEach <= 0) errors.push(`${at}: marks per question must be positive.`);
    if (s.attempt > s.print) {
      errors.push(
        `${at}: cannot attempt ${s.attempt} of only ${s.print} printed questions.`
      );
    }
  }

  if (bp.slots.length > 0 && totalMarks !== bp.maxMarks) {
    errors.push(
      `Slot marks total ${totalMarks} but the paper is set to ${bp.maxMarks} marks.`
    );
  }

  return { valid: errors.length === 0, errors, totalMarks };
}
