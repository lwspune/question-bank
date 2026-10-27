/**
 * V's "How's my progress" card (2026-10-27, owner). The button replaced "Plan
 * my week": 20 students tapped that in its first week, but 5 of the 63
 * chapter days their plans held were done and one student ever asked to see
 * a plan again. Students who tap a button in plain sight want to know where
 * they stand, so the card answers that, and its one next step is the drill.
 *
 * BUILT FROM NUMBERS, NEVER BY THE MODEL: no AI call, so no cost, nothing made
 * up, and no use of V's hourly message cap. Every number comes from a rule
 * that already exists:
 * - the week's answers: 0165's rule (an option picked, or a drill answer) for
 *   practice, plus the week's graded mock answers (verdictOfFact);
 * - mistakes fixed and due: the drill's own numbers (getOwnLadder);
 * - chapter bands: the mastery map's bandOf over buildPerformance, so the
 *   card, /me/map and /performance cannot disagree; "moved up" is the same
 *   rule run as of the week's start;
 * - exam covered: a chapter counts once it has CHAPTER_DONE_QUESTIONS answers
 *   (the week plan's own bar), weighed by recentChapterCounts, the weights
 *   V's exam_strategy quotes.
 *
 * A line with nothing in it is left out rather than shown as 0: a zero reads
 * as a failure, and the card is there to show what went well first.
 *
 * Pure. Spec: tests/chat-progress-card.test.ts.
 */
import { buildPerformance, selectAttempts, verdictOfFact, type Performance } from "@/lib/performance/compute";
import { bandOf, type Band } from "@/lib/performance/masteryMap";
import type { StudentPerformancePayload } from "@/lib/performance/types";
import { recentChapterCounts, type StrategyData } from "./examStrategy";
import { CHAPTER_DONE_QUESTIONS } from "./weekPlan";
import { istDayStart } from "./settings";
import type { NotesNavEntry } from "@/lib/notes/notesNavIndex";

const DAY_MS = 86_400_000;
/** Under this many answers in either week, a change in accuracy is noise. */
const MIN_ANSWERS_FOR_CHANGE = 10;
const RECENT_MOCKS = 3;
const MAX_MOVED_UP = 2;

export type Span = { answered: number; right: number };

export type ProgressExam = { slug: string; examName: string; displayName: string };

export type ProgressChapter = { id: string; name: string; subject: string; answered: number };

export type ProgressCardInput = {
  exam: ProgressExam;
  now: Date;
  daysLeft: number | null;
  /** Practice outside mocks in this exam, this week and the week before (0165's rule). */
  practice: { week: Span; prev: Span };
  /** The student's own mock payload, every exam (get_own_performance). Null when unread. */
  perf: StudentPerformancePayload | null;
  /** The drill's numbers, every exam: the drill is one queue. */
  drill: { fixed: number; due: number };
  /** Every chapter of the exam, with the distinct questions answered in it outside mocks. */
  chapters: ProgressChapter[];
  /** Past-year weights (lib/chat/examStrategyServer). Null or empty on an exam without past papers. */
  strategy: StrategyData | null;
  /** Notes chapters of this exam opened in the last 30 days. */
  notesChapters: number;
};

export type ProgressCard = {
  exam: ProgressExam;
  daysLeft: number | null;
  week: { answered: number; right: number; pct: number; changePoints: number | null } | null;
  fixed: number;
  due: number;
  covered: { kind: "share"; pct: number; started: number; total: number } | { kind: "chapters"; started: number; total: number } | null;
  mocks: { taken: number; recent: number[] } | null;
  chapters: { strong: number; mid: number; weak: number; movedUp: string[] } | null;
  notesChapters: number;
};

/** The last seven days in India, today included, and the seven before: 0165's week. */
export function weekWindows(now: Date): { weekStart: Date; prevStart: Date } {
  const weekStart = new Date(istDayStart(now).getTime() - 6 * DAY_MS);
  return { weekStart, prevStart: new Date(weekStart.getTime() - 7 * DAY_MS) };
}

const pctOf = (s: Span) => (s.answered > 0 ? (s.right / s.answered) * 100 : 0);

/** Graded mock answers in [from, to), by when the attempt was handed in. */
function mockSpan(payload: StudentPerformancePayload, examName: string, from: Date, to: Date): Span {
  const sel = selectAttempts(payload.attempts, payload.facts);
  const inWindow = new Set(
    sel.kept
      .filter((a) => a.examName === examName)
      .filter((a) => {
        const at = Date.parse(a.submittedAt ?? a.startedAt);
        return at >= from.getTime() && at < to.getTime();
      })
      .map((a) => a.attemptId)
  );
  const out: Span = { answered: 0, right: 0 };
  for (const f of payload.facts) {
    if (!inWindow.has(f.a)) continue;
    const v = verdictOfFact(f);
    if (v === 0) continue;
    out.answered++;
    if (v === 1) out.right++;
  }
  return out;
}

const add = (a: Span, b: Span): Span => ({ answered: a.answered + b.answered, right: a.right + b.right });

function weekLine(input: ProgressCardInput, weekStart: Date, prevStart: Date): ProgressCard["week"] {
  const mockWeek = input.perf ? mockSpan(input.perf, input.exam.examName, weekStart, input.now) : { answered: 0, right: 0 };
  const mockPrev = input.perf ? mockSpan(input.perf, input.exam.examName, prevStart, weekStart) : { answered: 0, right: 0 };
  const week = add(input.practice.week, mockWeek);
  if (week.answered === 0) return null;
  const prev = add(input.practice.prev, mockPrev);
  const comparable = week.answered >= MIN_ANSWERS_FOR_CHANGE && prev.answered >= MIN_ANSWERS_FOR_CHANGE;
  return {
    answered: week.answered,
    right: week.right,
    pct: Math.round(pctOf(week)),
    changePoints: comparable ? Math.round(pctOf(week) - pctOf(prev)) : null,
  };
}

function mocksLine(payload: StudentPerformancePayload, examName: string): ProgressCard["mocks"] {
  const kept = selectAttempts(payload.attempts, payload.facts)
    .kept.filter((a) => a.examName === examName)
    .sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  if (kept.length === 0) return null;
  const recent = kept
    .filter((a) => a.score !== null && a.maxScore !== null && a.maxScore > 0)
    .slice(-RECENT_MOCKS)
    .map((a) => Math.round(((a.score as number) / (a.maxScore as number)) * 100));
  return { taken: kept.length, recent };
}

const RANK: Record<Band, number> = { weak: 0, mid: 1, mastered: 2, unknown: -1 };

/** Each chapter's band in this exam, keyed "subject|chapter". Unknown bands are left out. */
function bands(perf: Performance, examName: string): Map<string, { chapter: string; band: Band }> {
  const out = new Map<string, { chapter: string; band: Band }>();
  for (const lane of perf.lanes) {
    if (lane.exam !== examName) continue;
    for (const c of lane.chapters) {
      const band = bandOf(c);
      if (band !== "unknown") out.set(`${lane.subject}|${c.chapter}`, { chapter: c.chapter, band });
    }
  }
  return out;
}

function chaptersLine(payload: StudentPerformancePayload, examName: string, now: Date, weekStart: Date): ProgressCard["chapters"] {
  const nowBands = bands(buildPerformance(payload, now), examName);
  if (nowBands.size === 0) return null;
  const before = { ...payload, attempts: payload.attempts.filter((a) => Date.parse(a.startedAt) < weekStart.getTime()) };
  const thenBands = bands(buildPerformance(before, weekStart), examName);

  const counts = { strong: 0, mid: 0, weak: 0 };
  const moved: { chapter: string; by: number }[] = [];
  for (const [key, { chapter, band }] of nowBands) {
    if (band === "mastered") counts.strong++;
    else if (band === "mid") counts.mid++;
    else counts.weak++;
    const then = thenBands.get(key);
    if (then && RANK[band] > RANK[then.band]) moved.push({ chapter, by: RANK[band] - RANK[then.band] });
  }
  const movedUp = moved
    .sort((a, b) => b.by - a.by || a.chapter.localeCompare(b.chapter))
    .slice(0, MAX_MOVED_UP)
    .map((m) => m.chapter);
  return { ...counts, movedUp };
}

/** Graded mock answers per chapter of this exam, keyed "subject|chapter". */
function mockAnswersByChapter(payload: StudentPerformancePayload, examName: string): Map<string, number> {
  const kept = new Set(
    selectAttempts(payload.attempts, payload.facts).kept.filter((a) => a.examName === examName).map((a) => a.attemptId)
  );
  const out = new Map<string, number>();
  for (const f of payload.facts) {
    if (!kept.has(f.a) || verdictOfFact(f) === 0) continue;
    const key = `${payload.dims.subjects[f.s] ?? ""}|${payload.dims.chapters[f.c] ?? ""}`;
    out.set(key, (out.get(key) ?? 0) + 1);
  }
  return out;
}

function coveredLine(input: ProgressCardInput): ProgressCard["covered"] {
  const mock = input.perf ? mockAnswersByChapter(input.perf, input.exam.examName) : new Map<string, number>();
  const practised = input.chapters.filter(
    (c) => c.answered + (mock.get(`${c.subject}|${c.name}`) ?? 0) >= CHAPTER_DONE_QUESTIONS
  );
  if (practised.length === 0) return null;

  const strategy = input.strategy;
  // A board student sits some subjects, not all: weigh only the ones they practise.
  const subjects = strategy?.board ? [...new Set(practised.map((c) => c.subject))] : null;
  const pool = subjects ? input.chapters.filter((c) => subjects.includes(c.subject)) : input.chapters;
  const weights = strategy ? recentChapterCounts(strategy, subjects) : new Map<string, number>();
  const total = [...weights.values()].reduce((n, v) => n + v, 0);
  if (total === 0) return { kind: "chapters", started: practised.length, total: pool.length };
  const held = practised.reduce((n, c) => n + (weights.get(c.id) ?? 0), 0);
  return { kind: "share", pct: Math.round((held / total) * 100), started: practised.length, total: pool.length };
}

export function buildProgressCard(input: ProgressCardInput): ProgressCard {
  const { weekStart, prevStart } = weekWindows(input.now);
  return {
    exam: input.exam,
    daysLeft: input.daysLeft,
    week: weekLine(input, weekStart, prevStart),
    fixed: input.drill.fixed,
    due: input.drill.due,
    covered: coveredLine(input),
    mocks: input.perf ? mocksLine(input.perf, input.exam.examName) : null,
    chapters: input.perf ? chaptersLine(input.perf, input.exam.examName, input.now, weekStart) : null,
    notesChapters: input.notesChapters,
  };
}

/** Nothing to show yet: the window says so and points to a first step instead. */
export function isEmptyCard(card: ProgressCard): boolean {
  return progressRows(card).length === 0;
}

export type ProgressRow = { label: string; value: string; detail?: string; bar?: number };

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** The card's lines in plain words, in its order. A line with nothing in it is left out. */
export function progressRows(card: ProgressCard): ProgressRow[] {
  const rows: ProgressRow[] = [];
  if (card.week) {
    const w = card.week;
    let change = "";
    if (w.changePoints !== null) {
      if (w.changePoints > 0) change = `, up ${w.changePoints} points on last week`;
      else if (w.changePoints < 0) change = `, down ${-w.changePoints} points on last week`;
      else change = ", same as last week";
    }
    rows.push({ label: "This week", value: `${w.answered} answered, ${w.pct}% right${change}` });
  }
  if (card.fixed > 0) rows.push({ label: "Mistakes fixed", value: `${card.fixed} you got wrong, now right` });
  if (card.covered) {
    const c = card.covered;
    rows.push(
      c.kind === "share"
        ? {
            label: "Exam covered",
            value: `Chapters you've practised carry ${c.pct}% of recent ${card.exam.displayName} questions`,
            detail: `${c.started} of ${plural(c.total, "chapter")} started`,
            bar: c.pct,
          }
        : {
            label: "Exam covered",
            value: `${c.started} of ${plural(c.total, "chapter")} started`,
            bar: c.total > 0 ? Math.round((c.started / c.total) * 100) : 0,
          }
    );
  }
  if (card.mocks) {
    const m = card.mocks;
    const scores = m.recent.map((p) => `${p}%`).join(", ");
    let value = plural(m.taken, "taken", "taken");
    if (scores) value += m.recent.length === m.taken ? `: ${scores}` : `. Last ${m.recent.length}: ${scores}`;
    rows.push({ label: "Mocks", value });
  }
  if (card.chapters) {
    const c = card.chapters;
    rows.push({
      label: "Chapters",
      value: `Strong ${c.strong}, getting there ${c.mid}, weak ${c.weak}`,
      detail: c.movedUp.length > 0 ? `Moved up this week: ${c.movedUp.join(", ")}` : undefined,
    });
  }
  if (card.notesChapters > 0) rows.push({ label: "Notes read", value: `${plural(card.notesChapters, "chapter")} in the last 30 days` });
  return rows;
}

/**
 * Notes chapters of this exam among those opened ('<subjectRoute>/<chapterSlug>',
 * from get_own_progress_card). The database cannot tell a notes route's exam;
 * the nav index can. A path no longer in the index (a renamed chapter) drops out.
 */
export function notesChaptersOf(opened: readonly string[], examName: string, index: readonly NotesNavEntry[]): number {
  const mine = new Set(index.filter((e) => e.examName === examName).map((e) => `${e.subjectRoute}/${e.chapterSlug}`));
  return new Set(opened.filter((p) => mine.has(p))).size;
}

/**
 * Which exam the card is for, and the student's others to switch to. `asked`
 * is a slug the window sent; it is used only when it is one of the student's.
 * With no exam on the profile, their latest mock's; with neither, null: the
 * database picks the exam they practise most.
 */
export function pickProgressExams(input: {
  asked: string | null;
  targetExams: readonly string[];
  latestMockExam: string | null;
}): { exam: string | null; exams: string[] } {
  const exams = input.targetExams.length > 0 ? [...input.targetExams] : input.latestMockExam ? [input.latestMockExam] : [];
  const exam = input.asked && exams.includes(input.asked) ? input.asked : exams[0] ?? null;
  return { exam, exams };
}
