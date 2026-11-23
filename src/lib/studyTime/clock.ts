/**
 * The study clock (2026-11-21, owner): how long a signed-in student spends
 * studying, by chapter, measured in the browser and stored per India day
 * (migration 0277, `study_time`). Shown back to the student on /me and in V
 * (Branch 2), never as a target.
 *
 * A 30-second tick COUNTS only while the tab is visible and the student
 * tapped, scrolled or typed in the last minute, so an open tab left alone
 * adds nothing. Where it goes:
 * - a question answered in the last 90 seconds: practice, on that question
 *   (the server turns a question into its chapter);
 * - a reading page (notes, board, chapter pages, formula sheets, Learn, past
 *   papers): reading, on the chapter the page declares (StudyContext);
 * - a practice page (bank, drill, review): practice on the last question
 *   touched there, or unassigned until the first one, which then claims it;
 * - the mock runner: nothing, because attempt_answers already records every
 *   second of a mock, and counting both would count it twice;
 * - any other page (home, pricing, the store, games): nothing.
 *
 * What a flush sends is bounded here AND on the server (add_study_time caps a
 * call at the time since the student's last one), so two open tabs cannot
 * double a minute.
 *
 * Pure. Spec: tests/study-clock.test.ts.
 */
import { readingViewFor } from "@/lib/activity/views";

export const TICK_SECS = 30;
export const IDLE_AFTER_MS = 60_000;
export const PRACTICE_WINDOW_MS = 90_000;
export const FLUSH_EVERY_MS = 120_000;
/** One place's most seconds in one call; the server enforces the same. */
export const MAX_ITEM_SECS = 300;
/** Most places in one call; the server enforces the same. */
export const MAX_ITEMS = 20;

export type PageKind = "reading" | "practice" | "mock" | "other";

export type ClockState = {
  visible: boolean;
  lastInteractionAt: number | null;
  page: { kind: PageKind; chapterId: string | null };
  /** The question last answered or shown on THIS page (reset on navigation). */
  lastQuestion: { id: string; at: number } | null;
};

/** Where a tick goes: practice or reading, on a chapter, a question, or neither. */
export type Bucket = { kind: "p" | "r"; c?: string; q?: string };

/** One place's seconds, in the shape add_study_time takes. */
export type StudyItem = { k: "p" | "r"; c?: string; q?: string; s: number };

const PRACTICE_SECTIONS = new Set(["browse", "drill", "review", "saved", "homework", "practice"]);
const MOCK_RUNNER = /^\/mock\/attempt\/[^/]+$/;

/** What kind of study a page address is. */
export function pageKindFor(pathname: string): PageKind {
  const path = pathname.split(/[?#]/)[0].replace(/(.)\/$/, "$1");
  if (MOCK_RUNNER.test(path)) return "mock";
  const section = path.split("/")[1] ?? "";
  if (PRACTICE_SECTIONS.has(section)) return "practice";
  const view = readingViewFor(path);
  if (view && view.surface !== "store") return "reading";
  return "other";
}

/** Where the tick ending at `now` goes, or null when it does not count. */
export function tickTarget(s: ClockState, now: number): Bucket | null {
  if (!s.visible) return null;
  if (s.lastInteractionAt === null || now - s.lastInteractionAt > IDLE_AFTER_MS) return null;
  if (s.page.kind === "mock" || s.page.kind === "other") return null;
  if (s.lastQuestion && now - s.lastQuestion.at <= PRACTICE_WINDOW_MS) return { kind: "p", q: s.lastQuestion.id };
  if (s.page.kind === "reading") return s.page.chapterId ? { kind: "r", c: s.page.chapterId } : { kind: "r" };
  return s.lastQuestion ? { kind: "p", q: s.lastQuestion.id } : { kind: "p" };
}

/** The whole seconds of a tick that ran before the tab was hidden. */
export function partialSecs(lastTickAt: number, now: number): number {
  return Math.max(0, Math.min(TICK_SECS, Math.floor((now - lastTickAt) / 1000)));
}

function samePlace(item: StudyItem, b: Bucket): boolean {
  return item.k === b.kind && item.c === b.c && item.q === b.q;
}

function itemFor(b: Bucket, s: number): StudyItem {
  const item: StudyItem = { k: b.kind, s };
  if (b.c) item.c = b.c;
  if (b.q) item.q = b.q;
  return item;
}

/** Add seconds to a place, merging with time already waiting there. */
export function addSeconds(items: readonly StudyItem[], b: Bucket, secs: number): StudyItem[] {
  if (secs <= 0) return [...items];
  const i = items.findIndex((it) => samePlace(it, b));
  if (i < 0) return [...items, itemFor(b, secs)];
  return items.map((it, j) => (j === i ? { ...it, s: it.s + secs } : it));
}

/** Unassigned practice time joins the first question the student touches. */
export function claimUnassigned(items: readonly StudyItem[], questionId: string): StudyItem[] {
  const loose = items.find((it) => it.k === "p" && !it.c && !it.q);
  if (!loose) return [...items];
  const rest = items.filter((it) => it !== loose);
  return addSeconds(rest, { kind: "p", q: questionId }, loose.s);
}

/** What one call sends, and what waits for the next. */
export function takeBatch(items: readonly StudyItem[]): { batch: StudyItem[]; rest: StudyItem[] } {
  const batch: StudyItem[] = [];
  const rest: StudyItem[] = [];
  for (const it of items) {
    if (batch.length >= MAX_ITEMS) {
      rest.push(it);
      continue;
    }
    if (it.s > MAX_ITEM_SECS) {
      batch.push({ ...it, s: MAX_ITEM_SECS });
      rest.push({ ...it, s: it.s - MAX_ITEM_SECS });
    } else {
      batch.push(it);
    }
  }
  return { batch, rest };
}
