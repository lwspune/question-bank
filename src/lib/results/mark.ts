/**
 * "Mark result" on a student's dashboard page (2026-10-10): staff who know a
 * student cleared, and have their consent, publish the name in one step.
 * Pure: the check run before anything is written.
 */
import { getExamBySlug, type ExamSlug } from "@/lib/exam/examContext";
import { isShowableName } from "./check";
import type { ResultStage } from "./summary";

export type MarkTarget =
  | { kind: "existing"; id: string }
  | { kind: "new"; examSlug: ExamSlug; sitting: string; stage: ResultStage };

export type StaffMark = { userId: string; target: MarkTarget; displayName: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STAGES: readonly ResultStage[] = ["written", "ssb", "final"];
const tidy = (s: string) => s.trim().replace(/\s+/g, " ");

export function validateStaffMark(input: unknown): { ok: true; value: StaffMark } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Send the result to mark." };
  const b = input as Record<string, unknown>;
  if (typeof b.userId !== "string" || !UUID.test(b.userId)) return { ok: false, error: "Unknown student." };
  if (b.consent !== true) return { ok: false, error: "Tick that the student agreed to be shown." };
  if (typeof b.displayName !== "string" || !isShowableName(b.displayName)) {
    return { ok: false, error: "Enter the name as it should appear: letters and spaces only." };
  }

  let target: MarkTarget;
  if (b.announcementId !== undefined) {
    if (typeof b.announcementId !== "string" || !UUID.test(b.announcementId)) return { ok: false, error: "Unknown result." };
    target = { kind: "existing", id: b.announcementId };
  } else if (b.newResult && typeof b.newResult === "object") {
    const n = b.newResult as Record<string, unknown>;
    const exam = typeof n.examSlug === "string" ? getExamBySlug(n.examSlug) : null;
    if (!exam) return { ok: false, error: "Pick an exam." };
    const sitting = typeof n.sitting === "string" ? tidy(n.sitting) : "";
    if (sitting.length < 1 || sitting.length > 40) return { ok: false, error: 'Enter the sitting, e.g. "CDS 2 2026".' };
    const stage = n.stage as ResultStage;
    if (!STAGES.includes(stage)) return { ok: false, error: "Pick written, SSB or final." };
    target = { kind: "new", examSlug: exam.slug, sitting, stage };
  } else {
    return { ok: false, error: "Pick a result, or add a new one." };
  }
  return { ok: true, value: { userId: b.userId, target, displayName: tidy(b.displayName) } };
}
