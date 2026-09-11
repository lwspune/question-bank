/**
 * Pure helpers over an authored {@link SessionPlan}. No I/O — the live spine is
 * joined in `query.ts`, so everything here is testable without a database.
 */
import type { PlannedChapter, PlannedSession, SessionPlan } from "./types";

export type NumberedSession = { number: number; session: PlannedSession };

/**
 * Attach the DISPLAY number to each session.
 *
 * Derived from position, never from the id — that split is the reason teaching
 * notes stay attached across an edit. See the header of `types.ts`.
 */
export function numberSessions(chapter: PlannedChapter): NumberedSession[] {
  return chapter.sessions.map((session, i) => ({ number: i + 1, session }));
}

/** Every book section a session cites, subtopics first. */
export function sessionRefs(session: PlannedSession): string[] {
  return [...session.subtopics, ...session.concepts];
}

export type DanglingRef = { chapterNo: number | null; sessionId: string; ref: string };

/**
 * Refs the live spine no longer has.
 *
 * A dangling ref renders as a BLANK CELL rather than an error, so nothing at
 * runtime would report it — hence the standing test. Every offender is
 * returned, not the first: a plan that reports one dangling ref at a time
 * invites a fix-and-rerun loop that reads as progress while the rest rot.
 */
export function findDanglingRefs(plan: SessionPlan, known: Set<string>): DanglingRef[] {
  const out: DanglingRef[] = [];
  for (const chapter of plan.chapters) {
    for (const session of chapter.sessions) {
      for (const ref of sessionRefs(session)) {
        if (!known.has(ref)) {
          out.push({ chapterNo: chapter.chapterNo, sessionId: session.id, ref });
        }
      }
    }
  }
  return out;
}

/**
 * Session ids used more than once, ACROSS the whole plan.
 *
 * Plan-wide rather than per-chapter because an id is what a teaching note will
 * key on; two sessions sharing one would silently show the same notes in two
 * different classes. Each offender is listed once however often it recurs.
 */
export function findDuplicateIds(plan: SessionPlan): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const chapter of plan.chapters) {
    for (const session of chapter.sessions) {
      if (seen.has(session.id)) dupes.add(session.id);
      seen.add(session.id);
    }
  }
  return [...dupes];
}

export type ChapterTotals = {
  sessions: number;
  /** Sessions teaching the book itself. */
  core: number;
  /** Sessions that exist only to close an NDA or CBSE gap. */
  extra: number;
  extraPyq: number;
};

/**
 * Core and extra are counted separately on purpose: "this chapter is 10 hours"
 * and "8 of the book plus 2 the board never teaches" are different facts, and a
 * teacher deciding what to cut needs the second one.
 */
export function chapterTotals(chapter: PlannedChapter): ChapterTotals {
  let core = 0;
  let extra = 0;
  let extraPyq = 0;
  for (const session of chapter.sessions) {
    if (session.extra) {
      extra += 1;
      extraPyq += session.extra.pyq ?? 0;
    } else {
      core += 1;
    }
  }
  return { sessions: chapter.sessions.length, core, extra, extraPyq };
}

export type PlanTotals = ChapterTotals & {
  chapters: number;
  nda: number;
  cbse: number;
};

export function planTotals(plan: SessionPlan): PlanTotals {
  const totals: PlanTotals = {
    chapters: plan.chapters.length,
    sessions: 0,
    core: 0,
    extra: 0,
    nda: 0,
    cbse: 0,
    extraPyq: 0,
  };
  for (const chapter of plan.chapters) {
    const t = chapterTotals(chapter);
    totals.sessions += t.sessions;
    totals.core += t.core;
    totals.extra += t.extra;
    totals.extraPyq += t.extraPyq;
    for (const session of chapter.sessions) {
      if (session.extra?.source === "NDA") totals.nda += 1;
      if (session.extra?.source === "CBSE") totals.cbse += 1;
    }
  }
  return totals;
}
