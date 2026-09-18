/**
 * "Where to focus" — the actionable head of the diagnosis.
 *
 * Bridges the concept graph (chapter-level root cause + sequencing) to the
 * vault's own /notes and /browse surfaces. Adapted from
 * nda-tracker/src/lib/focusAreas.js, with one difference that matters: there the
 * links are cross-origin guesses at pyqvault.com URLs, here they are internal
 * redirects we own (/go/learn, /go/practice), so they resolve against the live
 * taxonomy and degrade to a real page rather than a dead end.
 *
 * NDA MATHEMATICS ONLY — the prerequisite graph exists for no other subject.
 * Every other lane gets null and the page omits the card, rather than inventing
 * prerequisites nobody authored.
 *
 * Pure: no I/O, no DB. Unit-tested in tests/performance-concept-graph.test.ts.
 */
import {
  getRootCauseChain,
  getReadyToLearn,
  type AccuracyByChapter,
  type ConceptGraph,
  CHAPTER_PREREQS,
} from "./conceptGraph";
import { MIN_JUDGED_FOR_CLAIM, WEAK_BELOW, MASTERED_AT, type ChapterRow } from "./compute";
import { goPracticeHref } from "./links";

/** The one (exam, subject) pair with an authored prerequisite graph. */
export const GRAPH_EXAM = "NDA";
export const GRAPH_SUBJECT = "Mathematics";

export type FocusChapter = {
  chapter: string;
  /** 0-100, or null when we have too little evidence to say. */
  accuracy: number | null;
  /** Weak chapters that resolve to THIS chapter as their root cause. */
  unlocks: string[];
  learnHref: string;
  practiceHref: string;
};

export type FocusAreas = {
  /** Root causes, weakest first — the highest-leverage place to start. */
  startHere: FocusChapter[];
  /** Not yet mastered, but every prerequisite is. The frontier. */
  readyToLearn: { chapter: string; accuracy: number | null; learnHref: string }[];
};

function learnHref(chapter: string): string {
  return `/go/learn?chapter=${encodeURIComponent(chapter)}`;
}

/** Chapter-level Link C. The subtopic-bearing form is the shared helper's job;
 *  this card is deliberately chapter-grained (a root cause is a chapter). */
function practiceHref(exam: string, subject: string, chapter: string): string {
  return goPracticeHref(exam, subject, chapter);
}

/**
 * Chapter accuracy in the 0..1 shape the graph expects.
 *
 * A chapter below MIN_JUDGED_FOR_CLAIM answers maps to NULL, not to its
 * measured ratio. The graph treats null as untested, so a chapter resting on
 * one answer can neither be called weak nor be named as somebody's root cause.
 * This is a DEPARTURE from nda-tracker, and a necessary one: its data comes
 * from proctored OMR sittings where a student attempts most of the paper, while
 * the median attempt here answers 36% of it.
 */
export function accuracyMapFor(chapters: ChapterRow[]): AccuracyByChapter {
  const map: AccuracyByChapter = {};
  for (const c of chapters) {
    map[c.chapter] = c.judged >= MIN_JUDGED_FOR_CLAIM ? c.weightedScore : null;
  }
  return map;
}

export function buildFocusAreas(
  exam: string,
  subject: string,
  chapters: ChapterRow[],
  graph: ConceptGraph = CHAPTER_PREREQS
): FocusAreas | null {
  if (exam !== GRAPH_EXAM || subject !== GRAPH_SUBJECT) return null;

  const acc = accuracyMapFor(chapters);
  const pctOf = (v: number | null | undefined) =>
    v === null || v === undefined ? null : Math.round(v * 100);

  // Group weak chapters under their root cause so the list is "fix this one
  // thing" rather than a flat restatement of every weak chapter.
  const byRoot = new Map<string, { rootAccuracy: number | null; from: string[] }>();
  for (const { chapter, root, rootAccuracy } of getRootCauseChain(acc, {
    threshold: WEAK_BELOW,
    graph,
  })) {
    const entry = byRoot.get(root) ?? { rootAccuracy, from: [] };
    if (chapter !== root) entry.from.push(chapter);
    byRoot.set(root, entry);
  }

  const startHere: FocusChapter[] = [...byRoot.entries()]
    .sort((a, b) => (a[1].rootAccuracy ?? 1) - (b[1].rootAccuracy ?? 1))
    .map(([chapter, { rootAccuracy, from }]) => ({
      chapter,
      accuracy: pctOf(rootAccuracy),
      unlocks: from.sort(),
      learnHref: learnHref(chapter),
      practiceHref: practiceHref(exam, subject, chapter),
    }));

  const readyToLearn = getReadyToLearn(acc, { masteredThreshold: MASTERED_AT, graph })
    .sort((a, b) => {
      // Closest to mastery first; never-tested chapters last — they are a
      // bigger ask than one the student is already most of the way through.
      if (a.accuracy === null && b.accuracy === null) return a.chapter.localeCompare(b.chapter);
      if (a.accuracy === null) return 1;
      if (b.accuracy === null) return -1;
      return b.accuracy - a.accuracy;
    })
    .map((r) => ({
      chapter: r.chapter,
      accuracy: pctOf(r.accuracy),
      learnHref: learnHref(r.chapter),
    }));

  return { startHere, readyToLearn };
}
