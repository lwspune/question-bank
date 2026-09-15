/**
 * The (exam, subject) navigation for the student-performance page. Pure.
 *
 * A lane is one (exam, subject) pair, and `buildPerformance` returns them in a
 * single list sorted by how much the student answered. That is the right order
 * WITHIN an exam and the wrong shape ACROSS exams: on the heaviest multi-exam
 * student in production the row interleaves as NDA·English, NDA·Physics, …,
 * CDS·Chemistry, CDS·Physics, CDS·Biology, NDA·History, … — 18 pills in which
 * you cannot scan one exam as a group.
 *
 * So the axis is split in two, and the default changes with it:
 *
 *   OLD  default lane = the one with the most answered questions.
 *   NEW  default exam = the exam of their most recent counted attempt.
 *
 * That is not cosmetic. Of the 12 students in production who span more than one
 * exam, 3 would land on the wrong exam under the old rule — their most recent
 * sitting is a different exam from their busiest one.
 *
 * Spec: tests/performance-lane-nav.test.ts.
 */
import type { Lane } from "./compute";

export type ExamTab = {
  exam: string;
  /** Judged (correct + wrong) across every lane of this exam — the same
   *  denominator the subject pills show, so the two rows are comparable. */
  judged: number;
  answered: number;
};

export type LaneNav = {
  /** One entry per exam, busiest first. Empty when the student has no lanes. */
  exams: ExamTab[];
  /** The selected exam's lanes, in the core's own answered-first order. */
  subjects: Lane[];
  selected: Lane | null;
  selectedExam: string | null;
};

/**
 * @param lanes        every lane, as `buildPerformance` returned them
 * @param latestExam   exam of the most recent COUNTED attempt (`summary.latest`),
 *                     or null. Counted matters: the summary's latest has already
 *                     survived the first-attempt-only and engagement-floor
 *                     filters, so it can never name an exam that has no lane —
 *                     except via a stale caller, which is why the fallback below
 *                     exists anyway.
 * @param want         `exam` / `subject` from the URL, each optional
 */
export function buildLaneNav(
  lanes: Lane[],
  latestExam: string | null,
  want: { exam?: string; subject?: string }
): LaneNav {
  if (lanes.length === 0) {
    return { exams: [], subjects: [], selected: null, selectedExam: null };
  }

  const byExam = new Map<string, ExamTab>();
  for (const lane of lanes) {
    const tab = byExam.get(lane.exam) ?? { exam: lane.exam, judged: 0, answered: 0 };
    tab.judged += lane.judged;
    tab.answered += lane.coverage.answered;
    byExam.set(lane.exam, tab);
  }

  // Busiest first, and INDEPENDENT of which exam is selected. A row that
  // reordered itself on each click would move the target the reader just aimed
  // at — the same reason the subject row keeps its order across selections.
  const exams = [...byExam.values()].sort(
    (a, b) => b.answered - a.answered || a.exam.localeCompare(b.exam)
  );

  // An exam from the URL wins, then recency, then busiest. Each candidate is
  // checked against the real lanes rather than trusted: an unknown ?exam= must
  // fall through to a real page, not render an empty one.
  const selectedExam =
    [want.exam, latestExam].find((e) => e && byExam.has(e)) ?? exams[0].exam;

  const subjects = lanes.filter((l) => l.exam === selectedExam);

  // The subject is matched WITHIN the exam, never across it: ?exam=NDA&subject=Physics
  // on a student whose only Physics is CDS must not hand back the CDS lane
  // under an NDA heading.
  //
  // And the default subject stays busiest-first rather than most-recent:
  // recency picks the EXAM, but it cannot rank subjects, because one paper
  // spans many of them at once.
  const selected = subjects.find((l) => l.subject === want.subject) ?? subjects[0] ?? null;

  return { exams, subjects, selected, selectedExam };
}
