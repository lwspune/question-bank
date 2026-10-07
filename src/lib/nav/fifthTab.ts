/**
 * The fifth nav tab: Board for most viewers, Fix for graduate students.
 *
 * WHY (2026-10-07): graduates (CDS, UPSC, MPSC, or stage "College / other")
 * are past school. Measured that day, 31 of them had revealed ZERO
 * board-textbook answers, while 19 had mistakes waiting in /drill and 3 had
 * ever opened it. Board was one of their five phone tabs and led nowhere they
 * go; Fix is the page their mistakes are waiting on.
 *
 * WHY A SWAP AND NOT A SIXTH TAB: the phone bar is a fixed five (see
 * mobileTabs). Swapping keeps the count and the position, so when the session
 * arrives a moment after the cached header renders, only the fifth label and
 * icon change and nothing moves.
 *
 * The tier is the exam feed's own (resolveStudentTier), so "graduate" means the
 * same thing here as on /mock, /notes and /guide: a stated stage wins (a
 * dropper is SENIOR, re-sitting a Class 11-12 exam), else the exams decide.
 * Org staff keep Board: they teach from it, and their profile is not a
 * student's. Pure; spec tests/nav-fifth-tab.test.ts.
 */
import { EXAM_REGISTRY, type ExamSlug } from "@/lib/exam/examContext";
import { resolveStudentTier } from "@/lib/exam/examFeed";
import { drillHref } from "@/lib/drill/from";
import type { Stage } from "@/lib/profile/onboarding";

export type FifthTab = "board" | "fix";

/** Where the Fix tab goes. Tagged so its visits are counted apart from the rest. */
export const FIX_TAB_HREF = drillHref("nav");

export function fifthTabFor(
  viewer: { isStaff: boolean; stage: Stage | null; targetExams: readonly ExamSlug[] } | null
): FifthTab {
  if (!viewer || viewer.isStaff) return "board";
  const tier = resolveStudentTier(
    { stage: viewer.stage, targetExams: viewer.targetExams },
    EXAM_REGISTRY
  );
  return tier === "graduate" ? "fix" : "board";
}
