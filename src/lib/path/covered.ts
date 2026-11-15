/**
 * The board plan follows the class (MENTOR_SPEC.md §18, 2026-11-15).
 *
 * A week after launch, 94% of the questions plan students practised on plan
 * days were on chapters the plan had not picked: it began at chapter 1 in book
 * order, and students study the chapter their class is on. So:
 *
 *   - "What has your class covered?": the student ticks the chapters taught
 *     (study_path_covered, migration 0261). An unticked chapter with no work in
 *     it WAITS (it joins the "Not taught yet" set the picker already skips).
 *     No ticks at all = book order, as before.
 *   - Work in a chapter (any practice on its questions, a sheet, its test) ends
 *     the wait, and work in the last FOLLOW_DAYS puts it first (today.ts).
 *   - "Switch chapter": 3 a day, because each switch lifts that chapter's Top
 *     10 from the free answer limit for the day.
 *
 * Pure. Spec: tests/path-follow.test.ts.
 */
import { PATH_SUBJECTS, SUBJECT_LABEL, type PathChapter, type PathSubject } from "./model";

/** Work this recent puts a chapter first on the card. */
export const FOLLOW_DAYS = 7;
/** How far back practice counts as "worked on" (the checklist's pre-ticks, the wait). */
export const WORK_LOOKBACK_DAYS = 120;
/** Switches a day: each one lifts a chapter's Top 10 from the free limit. */
export const SWITCHES_PER_DAY = 3;

const DAY_MS = 86_400_000;

/** Chapter ids that wait: not ticked and never worked on. Nothing waits without ticks. */
export function waitingChapters(
  chapterIds: readonly string[],
  ticked: ReadonlySet<string>,
  worked: ReadonlySet<string>
): Set<string> {
  if (ticked.size === 0) return new Set();
  return new Set(chapterIds.filter((id) => !ticked.has(id) && !worked.has(id)));
}

/** Two "chapter -> latest moment" maps as one, keeping the later moment. */
export function mergeWork(...maps: readonly ReadonlyMap<string, string>[]): Map<string, string> {
  const out = new Map<string, string>();
  for (const m of maps) {
    for (const [id, at] of m) {
      const prev = out.get(id);
      if (!prev || Date.parse(at) > Date.parse(prev)) out.set(id, at);
    }
  }
  return out;
}

/** Work within the last FOLLOW_DAYS. */
export function recentWork(work: ReadonlyMap<string, string>, now: Date): Map<string, string> {
  const since = now.getTime() - FOLLOW_DAYS * DAY_MS;
  return new Map([...work].filter(([, at]) => Date.parse(at) >= since));
}

export function switchesLeft(usedToday: number): number {
  return Math.max(0, SWITCHES_PER_DAY - usedToday);
}

export type CoverChapter = { id: string; name: string; ticked: boolean; practised: boolean };
export type CoverSubject = { subject: PathSubject; label: string; chapters: CoverChapter[] };

/**
 * The checklist: each subject's chapters in book order. The first time it is
 * asked, chapters the student already worked on come ticked; after that it
 * shows their own ticks.
 */
export function coverList(p: {
  chapters: readonly PathChapter[];
  subjects: readonly PathSubject[];
  asked: boolean;
  ticked: ReadonlySet<string>;
  practised: ReadonlySet<string>;
}): CoverSubject[] {
  const order = PATH_SUBJECTS.filter((s) => p.subjects.includes(s));
  return order.map((subject) => ({
    subject,
    label: SUBJECT_LABEL[subject],
    chapters: p.chapters
      .filter((c) => c.subject === subject)
      .sort((a, b) => a.queue.localeCompare(b.queue) || a.rank - b.rank)
      .map((c) => ({
        id: c.id,
        name: c.name,
        ticked: p.asked ? p.ticked.has(c.id) : p.practised.has(c.id),
        practised: p.practised.has(c.id),
      })),
  }));
}
