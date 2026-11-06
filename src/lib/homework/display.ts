/**
 * What the homework page shows for a day. Pure.
 * Spec: tests/homework-display.test.ts.
 */

/** The plan builder's note, cut to a chip ("asked 6×"). */
export function shortNote(note: string): string {
  const type = /^This type asked (\d+) times/.exec(note);
  if (type) return `type asked ${type[1]}×`;
  const again = /^Asked (\d+) times/.exec(note);
  if (again) return `asked ${again[1]}×`;
  if (note.startsWith("Asked once")) return "asked once";
  return note;
}

/** "most" = repeats and types, ranked together by count; "once" = asked once. */
export type DaySection<D> = { kind: "most" | "once"; from: number; to: number; days: D[] };

/**
 * Consecutive days grouped by their first question: asked most often (parts 1
 * and 2, which interleave since repeats and types are ranked together,
 * 2026-11-04) or asked once (part 3).
 */
export function sectionsOf<D extends { day: number; items: { part: 1 | 2 | 3 }[] }>(days: D[]): DaySection<D>[] {
  const out: DaySection<D>[] = [];
  for (const d of days) {
    const kind = (d.items[0]?.part ?? 3) === 3 ? "once" : "most";
    const last = out[out.length - 1];
    if (last && last.kind === kind) {
      last.days.push(d);
      last.to = d.day;
    } else {
      out.push({ kind, from: d.day, to: d.day, days: [d] });
    }
  }
  return out;
}

/**
 * The link under a slot's note to every question of its group (2026-11-04),
 * worded from the note the plan builder wrote. Null when there is no group to show.
 */
export function seeAllLabel(note: string): string | null {
  const type = /^This type asked (\d+) times/.exec(note) ?? /same type asked (\d+) times/.exec(note);
  if (type) return `See all ${type[1]} of this type`;
  const again = /^Asked (\d+) times/.exec(note);
  if (again) return `See all ${again[1]} times it was asked`;
  return null;
}

type PlanWording = { asker: string; questions: string; papers: string; answers: string };

/**
 * Plans whose papers no board sets (2026-11-04 on): UPSC sets NDA and CDS, the
 * State CET Cell sets MHT-CET (2026-11-06; its plans said "board" until then),
 * SSC sets SSC CGL (2026-11-06).
 */
const NOT_BOARD: Readonly<Record<string, PlanWording>> = {
  NDA: { asker: "UPSC", questions: "past questions", papers: "Past", answers: "worked solutions" },
  CDS: { asker: "UPSC", questions: "past questions", papers: "Past", answers: "worked solutions" },
  "MHT-CET": { asker: "the CET Cell", questions: "past questions", papers: "Past", answers: "worked solutions" },
  "SSC CGL": { asker: "SSC", questions: "past questions", papers: "Past", answers: "worked solutions" },
  "SSC CGL Tier II": { asker: "SSC", questions: "past questions", papers: "Past", answers: "worked solutions" },
};

const BOARD: PlanWording = { asker: "the board", questions: "board questions", papers: "Board", answers: "model answers" };

/** True for a plan whose papers a board sets, so its questions are "board" questions. */
export function isBoardPlanExam(examName: string | undefined): boolean {
  return examName === undefined || !(examName in NOT_BOARD);
}

/**
 * Who set a plan's papers, what to call its questions, its papers (a page
 * title's "Past Papers") and its answers (2026-11-04). The plans were all board
 * subjects until NDA Maths.
 */
export function planWording(examName: string): PlanWording {
  return NOT_BOARD[examName] ?? BOARD;
}
