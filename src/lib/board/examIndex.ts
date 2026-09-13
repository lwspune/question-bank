/**
 * The node list the `/board` index renders — board families with their classes
 * in ascending order, plus any board exam that cannot be grouped.
 *
 * WHY THIS IS A MODULE AND NOT A LINE INSIDE THE PAGE: the page is a Server
 * Component and this repo has no DOM-test harness, so anything computed inline
 * there is unreachable by a test. The risk worth guarding is not the grouping
 * itself (tests/exam-family covers that) but a future edit that renders only
 * `kind === "family"` and drops the flat branch — which would make a board exam
 * VANISH from the index with no error and no empty state, the same shape as a
 * stale `hasMocks` hiding published mocks site-wide.
 *
 * `exams` is a parameter ONLY so that flat branch is testable. All six board
 * exams group into families today, so a test over the real registry cannot tell
 * a dropped flat branch from a correct one — measured, not assumed: injecting
 * `.filter(n => n.kind === "family")` here leaves tests/board-index fully green.
 * Passing a synthetic ungroupable exam is what makes that case fail. The page
 * calls this with no arguments.
 *
 * Presentation only: every class still links to `/board/<its own slug>`, so no
 * URL appears or disappears.
 */
import { BOARD_EXAMS, getExamBySlug, type ExamEntry } from "@/lib/exam/examContext";
import { groupExamFamilies, type ExamFamilyNode } from "@/lib/exam/examFamily";

export function boardIndexNodes(
  exams: readonly ExamEntry[] = BOARD_EXAMS
): ExamFamilyNode<ExamEntry>[] {
  return groupExamFamilies(exams, (e) => getExamBySlug(e.slug));
}
