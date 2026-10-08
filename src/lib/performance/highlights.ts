/**
 * The plain-English layer of the performance page (2026-10-08).
 *
 * The diagnosis underneath (compute.ts) is unchanged. What changed is how it
 * speaks: the page used to print "σ 10%", "correct ÷ attempted" and notes about
 * wall-clock dwell to a student. Each function here turns one part of the
 * computed diagnosis into a sentence a student can act on, and each one says
 * NOTHING when the data does not support the sentence. A line that appears only
 * when it is true is the point; a line that always appears is decoration.
 *
 * `viewer` changes the PERSON only ("your" vs "their"), never which facts
 * appear: the staff page renders the same diagnosis (see PerformanceBody).
 *
 * Pure. Spec: tests/performance-highlights.test.ts.
 */
import type { Consistency, Coverage, Lane, Summary, Trend } from "./compute";

export type Viewer = "self" | "staff";

/** A sentence with its lead in bold: `strong` is the finding, `rest` the context. */
export type Phrase = { strong: string; rest: string };

export type FixItem = {
  kind: "mistakes" | "chapter" | "speed";
  title: string;
  detail: string;
  /** The chapter the item is about (mistakes and chapter items). */
  chapter?: string;
  /** The exact questions to practise (mistakes only). */
  questionIds?: string[];
};

/** A real share of the paper left unreached: the bar for calling speed a problem. */
const UNREACHED_SHARE = 0.15;
/** A chapter this accurate is a strength worth naming. */
const STRONG_ACCURACY = 70;
/** Hard questions need this many answers before their accuracy means anything. */
const HARD_MIN_ANSWERED = 10;
const HARD_GOOD_ACCURACY = 60;
const MAX_ITEMS = 3;

const your = (v: Viewer) => (v === "self" ? "your" : "their");
const Your = (v: Viewer) => (v === "self" ? "Your" : "Their");
const You = (v: Viewer) => (v === "self" ? "You" : "They");
const you = (v: Viewer) => (v === "self" ? "you" : "they");
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const secs = (s: number) => `${Math.round(s * 10) / 10} s`;

/** The band's headline: a rise only. A drop is never the headline (owner, 2026-10-08). */
export function trendLine(summary: Summary, viewer: Viewer): string | null {
  const d = summary.deltaPoints;
  if (d === null || d <= 0) return null;
  return `${plural(d, "point")} up on ${your(viewer)} last paper`;
}

/** "±10": how far the score moves between papers, in percentage points. */
export function steadiness(consistency: Consistency | null): string | null {
  if (!consistency) return null;
  return `±${Math.round(consistency.sd * 100)}`;
}

/** The chapter trend in everyday words; null when there is no trend to show. */
export function trendLabel(trend: Trend): string | null {
  switch (trend) {
    case "improving":
      return "improving";
    case "declining":
      return "slipping";
    case "volatile":
      return "up and down";
    case "stable":
      return "steady";
    default:
      return null;
  }
}

/**
 * What went well, at most three things, each one true and measured: the
 * strongest chapters, a chapter that is improving, and hard questions. A thin
 * chapter is never called strong, and hard questions are praised only on
 * enough answers. Empty when nothing qualifies; the page then shows no card.
 */
export function wentWell(lane: Lane): Phrase[] {
  const items: Phrase[] = [];
  const measured = lane.chapters.filter((c) => !c.thin && c.accuracy !== null);

  const strong = measured
    .filter((c) => (c.accuracy ?? 0) >= STRONG_ACCURACY)
    .sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0) || b.judged - a.judged)
    .slice(0, 2);
  for (const c of strong) {
    items.push({ strong: `${c.chapter}: ${c.accuracy}% right`, rest: ` across ${c.judged} questions.` });
  }

  const improving = measured.find((c) => c.trend === "improving" && !strong.includes(c));
  if (improving) {
    items.push({ strong: `${improving.chapter}: improving`, rest: `, now ${improving.accuracy}% right.` });
  }

  const hard = lane.difficulty.find((d) => d.difficulty === "HARD");
  if (hard && hard.accuracy !== null && hard.answered >= HARD_MIN_ANSWERED && hard.accuracy >= HARD_GOOD_ACCURACY) {
    const easy = lane.difficulty.find((d) => d.difficulty === "EASY");
    const ahead = easy?.accuracy != null && hard.accuracy > easy.accuracy;
    items.push({
      strong: `Hard questions: ${hard.accuracy}% right`,
      rest: ahead ? `, better than easy ones (${hard.answered} answered).` : ` (${hard.answered} answered).`,
    });
  }

  return items.slice(0, MAX_ITEMS);
}

/**
 * Fix next, at most three actions: the most-missed topic (with its exact
 * questions), the weakest chapter that is not that topic's chapter, and speed
 * when a real share of the paper went unreached.
 */
export function fixNext(lane: Lane, viewer: Viewer): FixItem[] {
  const items: FixItem[] = [];

  const missed = lane.wrongAudit.find((r) => r.wrong > 0);
  if (missed) {
    items.push({
      kind: "mistakes",
      title: missed.subtopic,
      chapter: missed.chapter,
      detail: `${missed.wrong} wrong, ${your(viewer)} most-missed topic`,
      questionIds: missed.wrongQuestionIds,
    });
  }

  // Chapters arrive weakest first (compute.ts sorts them).
  const weakest = lane.chapters.find(
    (c) => !c.thin && c.accuracy !== null && c.chapter !== missed?.chapter
  );
  if (weakest) {
    const gap = lane.projection?.rows.find((r) => r.chapter === weakest.chapter)?.gap ?? 0;
    items.push({
      kind: "chapter",
      title: weakest.chapter,
      chapter: weakest.chapter,
      detail: `${weakest.accuracy}% right${gap >= 1 ? `, up to ${Math.round(gap)} marks to win` : ""}`,
    });
  }

  if (unreachedShare(lane.coverage) >= UNREACHED_SHARE) {
    items.push({
      kind: "speed",
      title: "Speed",
      detail: `${lane.coverage.neverReached} questions ${you(viewer)} never reached`,
    });
  }

  return items.slice(0, MAX_ITEMS);
}

/**
 * One sentence about the clock, or nothing. It speaks when a real share of the
 * paper went unreached, and adds the move-on advice only when wrong answers
 * really did take longer than right ones.
 */
export function clockAdvice(lane: Lane, viewer: Viewer): Phrase | null {
  const { coverage, time } = lane;
  const unreached = unreachedShare(coverage) >= UNREACHED_SHARE;
  const slowWrong =
    time.medianWrongSecs !== null &&
    time.medianCorrectSecs !== null &&
    time.medianWrongSecs > time.medianCorrectSecs;
  const compare = slowWrong
    ? `spend longer on wrong answers (${secs(time.medianWrongSecs!)}) than right ones (${secs(time.medianCorrectSecs!)})`
    : "";

  if (unreached) {
    return {
      strong: `${You(viewer)} ran out of time on ${coverage.neverReached} questions.`,
      rest: ` That's about speed, not knowledge.${slowWrong ? ` ${You(viewer)} ${compare}: when a question stalls, move on.` : ""}`,
    };
  }
  if (slowWrong) {
    return { strong: `${You(viewer)} ${compare}.`, rest: " When a question stalls, moving on saves time." };
  }
  return null;
}

/** Pace at both ends of a paper, printing only the numbers that exist. */
export function paceLine(cov: Coverage): string | null {
  const { headMedianSecs: head, tailMedianSecs: tail } = cov;
  if (head === null && tail === null) return null;
  if (tail === null) return `About ${secs(head!)} a question at the start of a paper.`;
  if (head === null) return `About ${secs(tail)} a question at the end of a paper.`;
  const rushed = head >= 2 * tail;
  return `About ${secs(head)} a question at the start of a paper, ${secs(tail)} at the end.${rushed ? " The end was rushed." : ""}`;
}

/** What the numbers are based on, and what was left out, in one line. */
export function countingNote(summary: Summary, viewer: Viewer): string {
  let note = `${Your(viewer)} first try at ${plural(summary.graded, "paper")}.`;
  if (summary.retakesDropped + summary.belowFloor > 0) {
    note += ` Retakes and papers ${you(viewer)} left early aren't counted.`;
  }
  if (summary.inProgress > 0) note += ` ${summary.inProgress} still in progress.`;
  return note;
}

function unreachedShare(cov: Coverage): number {
  return cov.inPaper > 0 ? cov.neverReached / cov.inPaper : 0;
}
