/**
 * A student's state on each path chapter, folded from timestamped records
 * (MENTOR_SPEC.md §2, §7), as of now or as of any earlier moment. Phase 2's
 * weekly review compares the chapters at a week's start with its end, so the
 * fold takes a moment; Phase 1's reads pass none and get everything.
 *
 * The records (read by stateRead.ts):
 *   marks   each Top 10 question's answers and self-marks (homework rule)
 *   sheetAt the first view of the chapter's Revision tab
 *   testAt  the first finished chapter test (1+ answer)
 *   doneAt  the `path_chapter_done` event, which keeps done done
 *
 * Moments are compared as instants: Postgres writes "+00:00" and JavaScript
 * writes "Z", and as text those two sort wrongly against each other.
 *
 * Pure. Spec: tests/path-phase2.test.ts.
 */
import type { ProgressEvent } from "@/lib/homework/progress";
import { topWorked } from "./done";
import type { ChapterState, PathChapter } from "./model";

export type ChapterFacts = {
  marks: ReadonlyMap<string, readonly ProgressEvent[]>;
  sheetAt: ReadonlyMap<string, string>;
  testAt: ReadonlyMap<string, string>;
  doneAt: ReadonlyMap<string, string>;
};

export const NO_FACTS: ChapterFacts = { marks: new Map(), sheetAt: new Map(), testAt: new Map(), doneAt: new Map() };

/** Is `at` at or before `asOf`? No moment means "everything counts". */
function by(at: string | undefined, asOf: number | null): boolean {
  if (at === undefined) return false;
  return asOf === null || Date.parse(at) <= asOf;
}

export function foldStates(chapters: readonly PathChapter[], facts: ChapterFacts, asOf?: string): Map<string, ChapterState> {
  const cut = asOf === undefined ? null : Date.parse(asOf);
  const states = new Map<string, ChapterState>();
  for (const c of chapters) {
    const events = (facts.marks.get(c.id) ?? []).filter((e) => cut === null || Date.parse(e.at) <= cut);
    states.set(c.id, {
      sheet: by(facts.sheetAt.get(c.id), cut),
      topWorked: topWorked(c.top, events).worked,
      test: by(facts.testAt.get(c.id), cut),
      recordedDone: by(facts.doneAt.get(c.id), cut),
    });
  }
  return states;
}

/** Keep the earliest moment per chapter. */
export function keepEarliest(map: Map<string, string>, chapterId: string, at: string): void {
  const prev = map.get(chapterId);
  if (prev === undefined || Date.parse(at) < Date.parse(prev)) map.set(chapterId, at);
}
