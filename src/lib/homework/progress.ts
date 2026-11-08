/**
 * A student's progress through a homework plan (2026-11-05, the owner's call).
 *
 * NO "COMPLETED" BUTTON. A day is done when the student has dealt with every
 * question on it, read from rows the pages already write, so a day cannot be
 * ticked without being attempted (a tick on its own is the vanity milestone the
 * engagement rules forbid):
 *   - a written question is MARKED by Understood / Review later (`self_mark`,
 *     or the drill's `answer_wrong` / `answer_correct` for the same question);
 *     opening its model answer alone is not a mark;
 *   - an MCQ is marked once its answer is revealed or an option picked
 *     (`question_practiced`, or a drill row). It has no buttons, so the reveal
 *     is the only act there is;
 *   - a numeric question (JEE Section B, 2026-11-06) is marked like a written
 *     one: the readers show it as written, with Understood / Review later.
 * A mark made anywhere counts (the bank, /board, the drill): it is the same
 * question. "To review" is the drill's own rule (lib/drill/select
 * questionState), so the plan page and the drill cannot disagree.
 *
 * A slot (one numbered question of the day) is done when every part is: a
 * case study is one question however many parts it has.
 *
 * Pure: no DB, no clock. Spec: tests/homework-progress.test.ts.
 */
import { LADDER_KINDS, questionState, type DrillEvent } from "@/lib/drill/select";

export type QuestionFormat = "mcq" | "subjective" | "numeric";

export type ProgressItem = { day: number; position: number; questionId: string; format: QuestionFormat };

export type ProgressEvent = {
  questionId: string;
  /** v_not_understood: a No to V's explanation (2026-11-08). On the ladder
   *  (isDue), never a mark: the student answered nothing. */
  kind: "self_mark" | "question_practiced" | "answer_wrong" | "answer_correct" | "v_not_understood";
  /** ISO timestamp. */
  at: string;
  /** self_mark only. */
  mark?: "understood" | "review";
};

export type QuestionMark = "understood" | "review" | "answered" | null;

export type DaySummary = { total: number; done: number; toReview: number; complete: boolean };
export type DayProgress = DaySummary & { day: number };

export type PlanProgress = {
  days: DayProgress[];
  /** Days with every question marked (in any order, not only from day 1). */
  doneDays: number;
  /** Questions of this plan waiting in the drill. */
  toReview: number;
  /** The day to continue: the lowest day started but not finished, else the
   *  lowest day not done. Null when every day is done. */
  nextDay: number | null;
  started: boolean;
};

const byTime = (a: ProgressEvent, b: ProgressEvent) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0);

/** One question's mark from everything recorded about it. */
export function markOf(format: QuestionFormat, all: readonly ProgressEvent[]): QuestionMark {
  const events = all.filter((e) => e.kind !== "v_not_understood");
  if (format === "mcq") return events.length > 0 ? "answered" : null;
  let mark: QuestionMark = null;
  for (const e of [...events].sort(byTime)) {
    if (e.kind === "self_mark" && e.mark) mark = e.mark;
    else if (e.kind === "answer_wrong") mark = "review";
    else if (e.kind === "answer_correct") mark = "understood";
  }
  return mark;
}

/** Is the question waiting in the drill? */
export function isDue(events: readonly ProgressEvent[]): boolean {
  const drill: DrillEvent[] = events
    .filter((e) => (LADDER_KINDS as readonly string[]).includes(e.kind))
    .map((e) => ({ questionId: e.questionId, correct: e.kind === "answer_correct", at: e.at }));
  return questionState(drill, new Date(0)) === "due";
}

/** One day: `slots` holds each numbered question's parts, in order. */
export function summarizeDay(
  slots: readonly (readonly { id: string; format: QuestionFormat }[])[],
  marks: Readonly<Record<string, QuestionMark | undefined>>,
  due: ReadonlySet<string>
): DaySummary {
  let done = 0;
  let toReview = 0;
  for (const parts of slots) {
    if (parts.length > 0 && parts.every((p) => marks[p.id])) done++;
    for (const p of parts) if (due.has(p.id)) toReview++;
  }
  return { total: slots.length, done, toReview, complete: slots.length > 0 && done === slots.length };
}

/** Each question's mark and the set waiting in the drill, for the plan's questions. */
export function marksFor(
  items: readonly ProgressItem[],
  events: readonly ProgressEvent[]
): { marks: Record<string, QuestionMark>; due: Set<string> } {
  const byQuestion = new Map<string, ProgressEvent[]>();
  for (const e of events) {
    const list = byQuestion.get(e.questionId);
    if (list) list.push(e);
    else byQuestion.set(e.questionId, [e]);
  }
  const marks: Record<string, QuestionMark> = {};
  const due = new Set<string>();
  for (const it of items) {
    const evs = byQuestion.get(it.questionId) ?? [];
    marks[it.questionId] = markOf(it.format, evs);
    if (isDue(evs)) due.add(it.questionId);
  }
  return { marks, due };
}

/** Items grouped day → slot → parts, days in order. */
export function slotsByDay(items: readonly ProgressItem[]): Map<number, { id: string; format: QuestionFormat }[][]> {
  const days = new Map<number, Map<number, { id: string; format: QuestionFormat }[]>>();
  for (const it of items) {
    const day = days.get(it.day) ?? new Map();
    const parts = day.get(it.position) ?? [];
    parts.push({ id: it.questionId, format: it.format });
    day.set(it.position, parts);
    days.set(it.day, day);
  }
  return new Map(
    [...days.entries()]
      .sort(([a], [b]) => a - b)
      .map(([d, slots]) => [d, [...slots.entries()].sort(([a], [b]) => a - b).map(([, parts]) => parts)])
  );
}

export function planProgress(items: readonly ProgressItem[], events: readonly ProgressEvent[]): PlanProgress {
  const { marks, due } = marksFor(items, events);
  const touched = new Set<number>();
  const days: DayProgress[] = [...slotsByDay(items)].map(([day, slots]) => {
    // Started = any PART marked, so one answered part of a case study counts.
    if (slots.some((parts) => parts.some((p) => marks[p.id]))) touched.add(day);
    return { day, ...summarizeDay(slots, marks, due) };
  });
  const started = touched.size > 0;
  const partial = days.find((d) => touched.has(d.day) && !d.complete);
  const nextDay = partial?.day ?? days.find((d) => !d.complete)?.day ?? null;
  return {
    days,
    doneDays: days.filter((d) => d.complete).length,
    toReview: days.reduce((n, d) => n + d.toReview, 0),
    nextDay,
    started,
  };
}

// ── the route's input ────────────────────────────────────────────────────────

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,79}$/;
/** Well past the longest plan (548 days on 2026-11-05). */
const MAX_DAY = 10_000;

export type ProgressQuery = { ok: true; slug: string; day?: number } | { ok: false; error: string };

/** GET /api/homework/progress?plan=<slug>[&day=<n>]. */
export function parseProgressQuery(params: URLSearchParams): ProgressQuery {
  const slug = params.get("plan") ?? "";
  if (!SLUG_RE.test(slug)) return { ok: false, error: "plan must be a plan slug." };
  const rawDay = params.get("day");
  if (rawDay === null) return { ok: true, slug };
  if (!/^\d+$/.test(rawDay)) return { ok: false, error: "day must be a whole number." };
  const day = Number(rawDay);
  if (day < 1 || day > MAX_DAY) return { ok: false, error: "day is out of range." };
  return { ok: true, slug, day };
}
