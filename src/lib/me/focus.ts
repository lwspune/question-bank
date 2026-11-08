/**
 * The exam focus (2026-11-08): which exam a student's Home (/me) and
 * Performance tabs are about. Pure. Spec: tests/me-focus.test.ts.
 *
 * WHO GETS A SWITCH. Only a student with two or more exams on www. A one-exam
 * or no-exam student is never filtered: with one chip there would be no way to
 * reach a mistake from another exam, and 24 of 331 one-exam students with
 * recent mistakes had some in another exam (2026-11-08). For them the page is
 * what it was.
 *
 * THE DEFAULT. The student's own tap (an exam, or "All"), saved on their
 * profile (migration 0231). Without one, the exam they practised most recently,
 * so a student studying for the exam that is near sees that one. Else the
 * first exam they chose.
 */
import { getExamBySlug, type ExamSlug } from "@/lib/exam/examContext";
import { sanitizeTargetExams } from "@/lib/profile/onboarding";

/** The saved value for "show every exam". Never an exam slug. */
export const FOCUS_ALL = "all";
export type FocusChoice = ExamSlug | typeof FOCUS_ALL;

export type Focus = {
  /** The student's exams on www, in the order they chose them: the chips. */
  options: ExamSlug[];
  /** Two or more exams: the chips switch the focus and "All" is offered. */
  switchable: boolean;
  /** The exam in focus; null is "All" (or no exam at all). */
  selected: ExamSlug | null;
  source: "chosen" | "recent" | "first" | "only" | "none";
  /** The exam's name in the database, to filter rows by. Null: no filter. */
  filterExamName: string | null;
};

/** The student's exams that can be focused here: known, on www, once each. */
function focusOptions(targets: readonly string[]): ExamSlug[] {
  return sanitizeTargetExams([...targets]).filter((s) => getExamBySlug(s)?.site !== "intl");
}

export function resolveFocus(input: {
  targets: readonly string[];
  /** The saved choice (profile `focus_exam`), as stored. */
  saved: string | null;
  /** The exam of their most recent practice, when it was read. */
  recent: string | null;
}): Focus {
  const options = focusOptions(input.targets);
  if (options.length < 2) {
    const only = options[0] ?? null;
    return {
      options,
      switchable: false,
      selected: only,
      source: only ? "only" : "none",
      filterExamName: null,
    };
  }

  const pick = (selected: ExamSlug | null, source: Focus["source"]): Focus => ({
    options,
    switchable: true,
    selected,
    source,
    filterExamName: selected ? (getExamBySlug(selected)?.examName ?? null) : null,
  });

  if (input.saved === FOCUS_ALL) return pick(null, "chosen");
  const saved = options.find((s) => s === input.saved);
  if (saved) return pick(saved, "chosen");
  const recent = options.find((s) => s === input.recent);
  if (recent) return pick(recent, "recent");
  return pick(options[0], "first");
}

/** Whether resolving needs the "most recently practised" read at all. */
export function needsRecentRead(input: { targets: readonly string[]; saved: string | null }): boolean {
  const options = focusOptions(input.targets);
  if (options.length < 2) return false;
  return input.saved !== FOCUS_ALL && !options.some((s) => s === input.saved);
}

/** A focus the student may save: one of their exams, or All, and only with a switch. */
export function parseFocusChoice(raw: unknown, targets: readonly string[]): FocusChoice | null {
  if (typeof raw !== "string") return null;
  const options = focusOptions(targets);
  if (options.length < 2) return null;
  if (raw === FOCUS_ALL) return FOCUS_ALL;
  return options.find((s) => s === raw) ?? null;
}

/**
 * How /performance follows the focus. A link that names an exam wins and keeps
 * the page's own exam row. Otherwise the focus picks the exam and the row goes
 * (the header chips do its job); a focus exam with no marked paper says so.
 */
export function performanceFocus(input: {
  /** Exams (by database name) the student has a marked paper in. */
  satExams: readonly string[];
  filterExamName: string | null;
  urlExam: string | undefined;
}): { exam: string | undefined; showExamRow: boolean; noPaperFor: string | null } {
  if (input.urlExam || !input.filterExamName) {
    return { exam: input.urlExam, showExamRow: true, noPaperFor: null };
  }
  if (input.satExams.includes(input.filterExamName)) {
    return { exam: input.filterExamName, showExamRow: false, noPaperFor: null };
  }
  return { exam: undefined, showExamRow: false, noPaperFor: input.filterExamName };
}
