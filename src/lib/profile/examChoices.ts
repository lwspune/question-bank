/**
 * The exam chips shared by the post-signup onboarding (/welcome) and the
 * /account profile form. Both built this list independently and identically
 * before, which is exactly how two copies drift — so it lives here once.
 *
 * GROUPING IS PRESENTATION ONLY. The `value` of every chip is still the exam
 * slug persisted to `student_profiles.target_exams`, so no stored profile
 * changes meaning and no migration is involved. What changes is that the six
 * (board, class) exams stop reading as six unrelated entries with inconsistent
 * names — "MH State Board 9 / MH SSC 10 / MH State Board 11 / MH HSC 12" — and
 * render as classes under their board.
 *
 * This stays a flat multi-select rather than the two-step control /browse uses:
 * a student may legitimately target CBSE Class 11 AND Class 12, so there is
 * nothing to nest and no single selection to resolve.
 */
import { EXAM_REGISTRY, type ExamEntry } from "@/lib/exam/examContext";
import { classLabelFor, groupExamFamilies } from "@/lib/exam/examFamily";
import type { ChipOption } from "@/components/ProfileChips";
import { tierOfStage, type Stage } from "@/lib/profile/onboarding";

/**
 * Ungrouped chips first, then each board's classes in numeric order.
 *
 * The ungrouped-first ordering matters: the chips render as one unlabelled row
 * followed by a labelled row per board, so interleaving would split the
 * entrance exams across two separate blocks.
 *
 * AN EXAM WITH NO PUBLIC CONTENT IS DROPPED FIRST, before grouping. What a
 * student picks here is persisted to `student_profiles.target_exams` and then
 * steers `/drill`, the mock recommendations and the report email, so offering
 * an empty exam sets a target that resolves to nothing everywhere — which is
 * exactly what `isc-12` did until it was flagged. See `noPublicContent` in the
 * registry for why the fact is declared rather than counted.
 *
 * FILTERING BEFORE GROUPING IS LOAD-BEARING, not tidiness. Drop a member after
 * `groupExamFamilies` has run and its rule 2 — a family of one degrades to a
 * flat chip — has already been decided on the unfiltered list, so a board left
 * with one live class would render as a one-option group.
 *
 * Takes the registry as an argument so the guard is testable against a
 * synthetic list: asserting only against the real registry would pass
 * vacuously whenever nothing happens to be flagged.
 */
export function buildExamChips(entries: readonly ExamEntry[]): ChipOption[] {
  const nodes = groupExamFamilies<ExamEntry>(
    entries.filter((e) => !e.noPublicContent),
    (e) => e
  );
  const flat: ChipOption[] = [];
  const grouped: ChipOption[] = [];

  for (const node of nodes) {
    if (node.kind === "flat") {
      flat.push({ value: node.item.slug, label: node.item.displayName });
      continue;
    }
    for (const cls of node.members) {
      grouped.push({
        value: cls.item.slug,
        label: cls.label,
        // A family with a stage level (MPSC) groups per stage, so the chips
        // read "MPSC · Prelims" and "MPSC · Mains" rather than one mixed row.
        group: node.stages.length && cls.stage ? `${node.label} · ${cls.stage}` : node.label,
      });
    }
  }

  return [...flat, ...grouped];
}

export const EXAM_CHIP_OPTIONS: readonly ChipOption[] = buildExamChips(EXAM_REGISTRY);

/** The classes whose board exams fit each stage; null = no narrowing. */
const BOARD_STDS: Record<Stage, readonly number[]> = {
  "class-9-10": [9, 10],
  "class-11": [11],
  "class-12": [12],
  dropper: [], // boards are done; they are re-sitting an entrance exam
  college: [],
};

/** "Maharashtra State Board (HSC)", "CBSE": the board, and the name students
 *  use for that year where there is one, without the class number. */
function boardOnlyLabel(e: ExamEntry): string {
  const year = e.classLabel?.match(/\(([^)]+)\)/)?.[1];
  return year ? `${e.board} (${year})` : String(e.board);
}

/** A board's everyday short name, for chips that also carry the class. */
function shortBoard(e: ExamEntry): string {
  return e.board === "Maharashtra State Board" ? "Maharashtra" : String(e.board);
}

/** Entrance exams (with their families, IPMAT and MPSC) before board exams. */
function entranceFirst(list: readonly ExamEntry[]): ChipOption[] {
  return [...buildExamChips(list.filter((e) => !e.board)), ...buildExamChips(list.filter((e) => e.board))];
}

/**
 * The /welcome and /account exam chips for a stated class (2026-10-05).
 * Spec: tests/exam-choices.test.ts.
 *
 * - The class question already says the class, so for Class 11 and 12 the
 *   board chips show the BOARD only, in a "Board exam" row ("Maharashtra State
 *   Board (HSC)", "CBSE") instead of asking "Class 11 · Class 12" again. Class
 *   9-10 keeps the class on the chip, since 9 and 10 share one answer. Someone
 *   repeating a year, or at college, gets no board chips.
 * - Entrance exams come first, IPMAT and MPSC rows included (IPMAT used to
 *   sit below the boards); everything outside the class sits behind "Show all
 *   exams" (`hidden`), and a pick outside the class stays in `shown`.
 * - Worksheet banks (registry `course`) are listed apart as `courses`, never
 *   as exam chips.
 */
export function examChipsForStage(
  stage: Stage | null,
  selected: readonly string[],
  entries: readonly ExamEntry[]
): { shown: ChipOption[]; hidden: ChipOption[]; courses: ChipOption[] } {
  const live = entries.filter((e) => !e.noPublicContent);
  const allCourses = live.filter((e) => e.course);
  const exams = live.filter((e) => !e.course);
  if (stage === null) {
    return { shown: entranceFirst(exams), hidden: [], courses: buildExamChips(allCourses) };
  }

  const picked = new Set(selected);
  const tier = tierOfStage(stage);
  const stds = BOARD_STDS[stage];
  const fits = (e: ExamEntry) => (e.board ? stds.includes(Number(e.std)) : e.tier === tier);
  const inView = (e: ExamEntry) => fits(e) || picked.has(e.slug);

  const entrance = buildExamChips(exams.filter((e) => !e.board && inView(e)));
  const boards = exams.filter((e) => e.board && inView(e));
  // One class (11 or 12): the board alone. Class 9-10: board + class, since
  // the answer covers two classes. Either way all of them share one row.
  const oneClass = stds.length === 1;
  const boardChips = [
    ...boards
      .filter(fits)
      // By board, then class number: the same order for every class (registry
      // order put CBSE first for 11, last for 12), and Class 9 before 10.
      .sort((a, b) => String(a.board).localeCompare(String(b.board)) || Number(a.std) - Number(b.std))
      .map((e) => ({
        value: e.slug,
        // Two classes share one chip row, so the class stays; the board is
        // shortened so "Maharashtra Class 10 (SSC)" fits one line on a phone.
        label: oneClass ? boardOnlyLabel(e) : `${shortBoard(e)} ${classLabelFor(e)}`,
        group: "Board exam",
      })),
    // A pick from another class keeps its class on the chip.
    ...buildExamChips(boards.filter((e) => !fits(e))),
  ];

  // Only the class's own course shows; the other waits under "Show all exams",
  // labelled as a course (a Class 9-10 student was offered "Worksheets 11+12").
  const courseInView = (e: ExamEntry) => e.tier === tier || picked.has(e.slug);
  const otherCourses = buildExamChips(allCourses.filter((e) => !courseInView(e))).map((c) => ({
    ...c,
    group: "Practice courses",
  }));

  return {
    shown: [...entrance, ...boardChips],
    hidden: [...entranceFirst(exams.filter((e) => !inView(e))), ...otherCourses],
    courses: buildExamChips(allCourses.filter(courseInView)),
  };
}
