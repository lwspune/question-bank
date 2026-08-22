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
import { groupExamFamilies } from "@/lib/exam/examFamily";
import type { ChipOption } from "@/components/ProfileChips";

/**
 * Ungrouped chips first, then each board's classes in numeric order.
 *
 * The ungrouped-first ordering matters: the chips render as one unlabelled row
 * followed by a labelled row per board, so interleaving would split the
 * entrance exams across two separate blocks.
 */
export const EXAM_CHIP_OPTIONS: readonly ChipOption[] = (() => {
  const nodes = groupExamFamilies<ExamEntry>(EXAM_REGISTRY, (e) => e);
  const flat: ChipOption[] = [];
  const grouped: ChipOption[] = [];

  for (const node of nodes) {
    if (node.kind === "flat") {
      flat.push({ value: node.item.slug, label: node.item.displayName });
      continue;
    }
    for (const cls of node.classes) {
      grouped.push({
        value: cls.item.slug,
        label: cls.label,
        group: node.label,
      });
    }
  }

  return [...flat, ...grouped];
})();
