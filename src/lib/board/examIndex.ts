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
 * calls `boardIndexGroups`, which calls this with no arguments.
 *
 * Presentation only: every class still links to `/board/<its own slug>`, so no
 * URL appears or disappears.
 */
import { BOARD_EXAMS, getExamBySlug, type ExamEntry, type ExamSlug } from "@/lib/exam/examContext";
import { groupExamFamilies, type ExamFamilyNode } from "@/lib/exam/examFamily";

export function boardIndexNodes(
  exams: readonly ExamEntry[] = BOARD_EXAMS
): ExamFamilyNode<ExamEntry>[] {
  return groupExamFamilies(exams, (e) => getExamBySlug(e.slug));
}

/**
 * One class on the /board index, as plain data. The page hands these to a
 * client component, which may only receive serialisable props (a function or
 * component crosses `next dev` and throws under `next start`).
 */
export type BoardIndexCard = {
  slug: ExamSlug;
  label: string;
  /** Present inside a family, where the visible label ("Class 9") drops the board. */
  ariaLabel?: string;
};

export type BoardIndexGroup =
  | { kind: "family"; key: string; label: string; classes: BoardIndexCard[] }
  | { kind: "flat"; key: string; card: BoardIndexCard };

/** `boardIndexNodes` as card data, in the same order with the same labels. */
export function boardIndexGroups(exams: readonly ExamEntry[] = BOARD_EXAMS): BoardIndexGroup[] {
  return boardIndexNodes(exams).map((node) =>
    node.kind === "family"
      ? {
          kind: "family",
          key: node.key,
          label: node.label,
          classes: node.members.map((cls) => ({
            slug: cls.item.slug,
            label: cls.label,
            ariaLabel: `${node.label} ${cls.label}`,
          })),
        }
      : { kind: "flat", key: node.item.slug, card: { slug: node.item.slug, label: node.item.displayName } }
  );
}

function slugsOf(group: BoardIndexGroup): ExamSlug[] {
  return group.kind === "family" ? group.classes.map((c) => c.slug) : [group.card.slug];
}

/**
 * Split the index for a signed-in student: the board(s) holding a class they
 * chose come first, the rest fold away. Null means "show the page unchanged",
 * which is the answer for every student who chose no board class.
 *
 * WHY NOT `splitByFeed`, which /mock, /notes and /guide use: that one ranks by
 * TIER, and both board families have a class in every tier (CBSE 10 is school,
 * CBSE 11-12 senior), so it put both boards first for everyone and changed
 * nothing. Only the student's chosen classes say which board is theirs.
 *
 * `mine` follows the order the student chose their exams in; `other` keeps the
 * page's order. `other` may be empty (a class picked on each board): the
 * classes are still marked, there is just nothing to fold.
 */
export function splitBoardIndex(
  groups: readonly BoardIndexGroup[],
  targetExams: readonly ExamSlug[]
): { mine: BoardIndexGroup[]; other: BoardIndexGroup[]; yourClasses: ExamSlug[] } | null {
  const listed = new Set(groups.flatMap(slugsOf));
  const yourClasses = targetExams.filter((s, i) => listed.has(s) && targetExams.indexOf(s) === i);
  if (yourClasses.length === 0) return null;

  const rank = new Map(yourClasses.map((s, i) => [s, i]));
  const ranked: { group: BoardIndexGroup; rank: number }[] = [];
  const other: BoardIndexGroup[] = [];
  for (const group of groups) {
    const best = Math.min(...slugsOf(group).map((s) => rank.get(s) ?? Infinity));
    if (best === Infinity) other.push(group);
    else ranked.push({ group, rank: best });
  }
  ranked.sort((a, b) => a.rank - b.rank);
  return { mine: ranked.map((r) => r.group), other, yourClasses };
}
