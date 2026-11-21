/**
 * V's "Your day" card (2026-11-15, owner). The first time a student opens V on
 * a new day (India time), this card stands in for V's greeting: what they did
 * on their last day, what went well, and one thing for today. Later opens that
 * day show the plain greeting.
 *
 * WHY: "How's my progress" (0191) was opened by 31 students in 18 days and 55%
 * of them took a next step, but only 7 opened it on a second day. A card the
 * student has to ask for does not become a habit; one waiting for them when
 * they open V might. Measured as growth experiment "v-day-card".
 *
 * Rules (ENGAGEMENT_SPEC.md principles gate):
 * - Built from numbers, never by the model: no AI call, nothing made up.
 * - What went well first, then the next step. A line with nothing in it is
 *   left out, never shown as 0.
 * - After a gap it says "Since your last visit" with the date. It never counts
 *   the days missed and keeps no streak: this cohort studies in bursts.
 * - On the board plan, today's task is the plan's own (lib/path), so V and
 *   Home cannot disagree.
 * - The exam countdown (owner, 2026-11-21): in the last COUNTDOWN_DAYS days
 *   before the exam, one row names the big chapters (most marks a paper,
 *   lib/me/startNext's measure) where the student still has mistakes
 *   waiting, and the day's step is to fix the first; with none waiting there,
 *   the big chapters themselves; in the last week, a full paper under exam
 *   time. Every first visit of those days, not only on milestone days: 63% of
 *   students come on one day only, so a milestone day would mostly be missed.
 *
 * Pure. Spec: tests/chat-day-card.test.ts.
 */
import { DRILL_SIZE, questionState, type DrillEvent } from "@/lib/drill/select";
import { drillChapterHref, drillHref } from "@/lib/drill/from";
import { goPracticeHref } from "@/lib/performance/links";
import { buildCheckIn, CHECKIN_QUESTION, type CheckIn, type CheckInChapter } from "./checkIn";
import { drillTimeLine } from "@/lib/push/core";
import type { Band } from "@/lib/performance/masteryMap";

/** A last visit older than this is not "your day" any more. */
export const DAY_LOOKBACK_DAYS = 30;

/** The countdown row shows in the last this-many days before the exam. */
export const COUNTDOWN_DAYS = 60;
/** In the last this-many days the step is a full paper, not new chapters. */
export const COUNTDOWN_MOCK_DAYS = 7;
/** The chapters counted as "big": the most marks a paper, this many. */
export const BIG_CHAPTERS = 5;
/** Chapters named in the row, at most. */
export const COUNTDOWN_NAMED = 3;

const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 5.5 * 3_600_000;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** One India day's graded answers. `day` is YYYY-MM-DD in India time. */
export type DaySpan = {
  day: string;
  answered: number;
  right: number;
  topChapter: { name: string; answered: number } | null;
};

export type DayPlanTask = { title: string; detail: string; href: string; minutes: number; done: boolean };

export type DayPlan = {
  /** "Solutions: chapter sheet done", for the last visit's day (planDoneOn). */
  doneOnDay: string[];
  chaptersDone: number;
  chaptersOf: number;
  /** Today's card, as the plan shows it on Home. */
  tasks: DayPlanTask[];
};

/** One chapter's weight in the exam's published papers (lib/me/startNext ChapterWeight, cut down). */
export type BigChapter = {
  chapterId: string;
  chapter: string;
  subject: string;
  /** The exam by name, as the practice link takes it. */
  examName: string;
  qPerPaper: number;
  marksPerPaper: number;
};

/** The exam date as lib/exam/calendar resolveExamDate gives it. */
export type DayCountdown = { label: string; date: string; official: boolean; daysLeft: number };

export type DayCardInput = {
  exam: { slug: string; displayName: string };
  now: Date;
  daysLeft: number | null;
  /** Answers per India day (practice and mocks, mergeDays). Any order. */
  days: DaySpan[];
  /** Mistakes that became fixed on the last visit's day (fixedBetween). */
  fixedOnDay: number;
  /** Mistakes fixed in all (the drill's own count). */
  fixedTotal: number;
  /** One chapter name per mistake waiting in Fix. */
  dueChapters: string[];
  /** Chapters whose band went up since the start of the last visit's day. */
  movedUp: { chapter: string; band: Band }[];
  plan: DayPlan | null;
  /** The exam countdown (2026-11-21). Absent or null = no countdown row. */
  countdown?: DayCountdown | null;
  /** Chapter weights of the card's exam, any order; one chapter may appear once per paper. */
  bigChapters?: BigChapter[];
  /** Mistakes waiting in Fix per chapter id (lib/drill/select dueByChapter). */
  dueByChapter?: Record<string, number>;
  /** The card exam's chapters with mistakes waiting, with their links, for V's check-in (2026-11-21). */
  stuckChapters?: CheckInChapter[];
};

export type DayRowItem = { name: string; note: string };

export type DayRow = { label: string; value: string; detail?: string; items?: DayRowItem[]; tone?: "good" | "today" | "exam" };

export type DayAction = { label: string; href: string; action: "drill" | "performance" | "plan" | "exam" };

export type DayCard = {
  kind: "yesterday" | "since" | "fresh";
  greeting: string;
  title: string;
  subtitle: string;
  rows: DayRow[];
  primary: DayAction;
  secondary: DayAction | null;
  /** Which countdown showed, for the card's view row; null = none. */
  countdown: "fix" | "top" | "mock" | null;
  /**
   * V's check-in (lib/chat/checkIn), asked in place of the card after 4+ days
   * away; the card stays behind "Going well". Null = show the card.
   */
  checkIn: CheckIn | null;
};

/** YYYY-MM-DD in India time. */
export function istDay(d: Date | string): string {
  const t = typeof d === "string" ? Date.parse(d) : d.getTime();
  return new Date(t + IST_OFFSET_MS).toISOString().slice(0, 10);
}

function addDays(day: string, n: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from India day `a` to India day `b`. */
function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY_MS);
}

/** "Wed 11 Nov". */
function dateLabel(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** The latest day before today with an answer, within the lookback; else null. */
export function lastVisit(days: readonly DaySpan[], now: Date): DaySpan | null {
  const today = istDay(now);
  const oldest = addDays(today, -DAY_LOOKBACK_DAYS);
  let best: DaySpan | null = null;
  for (const d of days) {
    if (d.answered <= 0 || d.day >= today || d.day < oldest) continue;
    if (!best || d.day > best.day) best = d;
  }
  return best;
}

/** Practice and mock answers of the same day added up; the bigger top chapter kept. Sorted by day. */
export function mergeDays(a: readonly DaySpan[], b: readonly DaySpan[]): DaySpan[] {
  const out = new Map<string, DaySpan>();
  for (const d of [...a, ...b]) {
    const had = out.get(d.day);
    if (!had) {
      out.set(d.day, { ...d });
      continue;
    }
    const top =
      had.topChapter && d.topChapter
        ? d.topChapter.answered > had.topChapter.answered
          ? d.topChapter
          : had.topChapter
        : (had.topChapter ?? d.topChapter);
    out.set(d.day, { day: d.day, answered: had.answered + d.answered, right: had.right + d.right, topChapter: top });
  }
  return [...out.values()].sort((x, y) => x.day.localeCompare(y.day));
}

/** Fixed questions among events up to (not including) `cut`. Same fold as the drill. */
function fixedBefore(events: readonly DrillEvent[], cut: number): number {
  const byQuestion = new Map<string, DrillEvent[]>();
  for (const e of events) {
    if (Date.parse(e.at) >= cut) continue;
    const list = byQuestion.get(e.questionId);
    if (list) list.push(e);
    else byQuestion.set(e.questionId, [e]);
  }
  let n = 0;
  for (const list of byQuestion.values()) if (questionState(list, new Date(cut)) === "retired") n += 1;
  return n;
}

/** Questions that became fixed during India day `day` (net, never below 0). */
export function fixedBetween(events: readonly DrillEvent[], day: string): number {
  const start = Date.parse(`${day}T00:00:00Z`) - IST_OFFSET_MS;
  return Math.max(0, fixedBefore(events, start + DAY_MS) - fixedBefore(events, start));
}

/** The plan's chapter steps finished on `day`: done, else the test, else the sheet. */
export function planDoneOn(
  day: string,
  chapters: readonly { id: string; name: string }[],
  facts: { sheetAt: ReadonlyMap<string, string>; testAt: ReadonlyMap<string, string>; doneAt: ReadonlyMap<string, string> }
): string[] {
  const on = (at: string | undefined) => at !== undefined && istDay(at) === day;
  const out: string[] = [];
  for (const c of chapters) {
    if (on(facts.doneAt.get(c.id))) out.push(`${c.name}: chapter done`);
    else if (on(facts.testAt.get(c.id))) out.push(`${c.name}: chapter test done`);
    else if (on(facts.sheetAt.get(c.id))) out.push(`${c.name}: chapter sheet done`);
  }
  return out;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

const BAND_WORDS: Record<Band, string> = { mastered: "strong", mid: "getting there", weak: "weak", unknown: "" };

function answersText(d: DaySpan): string {
  const pct = d.answered > 0 ? Math.round((d.right / d.answered) * 100) : 0;
  return `${plural(d.answered, "question")}, ${d.right} right (${pct}%)`;
}

/** Under this many answers, "Mostly <chapter>" says nothing. */
const MAIN_CHAPTER_MIN_ANSWERS = 3;

/** The chapter that held half the day's answers or more, else null. */
function mainChapter(d: DaySpan): string | null {
  if (d.answered < MAIN_CHAPTER_MIN_ANSWERS) return null;
  return d.topChapter && d.topChapter.answered * 2 >= d.answered ? d.topChapter.name : null;
}

const PERFORMANCE: DayAction = { label: "My full progress", href: "/performance", action: "performance" };

/** One drill at most: the drill serves DRILL_SIZE at a time, so "Fix 472" would promise what it does not do. */
function fixAction(due: number): DayAction {
  return { label: `Fix ${plural(Math.min(due, DRILL_SIZE), "mistake")}`, href: drillHref("v_day"), action: "drill" };
}

/** "14 Jan". */
function dayMonth(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** The big chapters, biggest first, each once (a chapter two papers weigh keeps its larger weight). */
function bigChapters(all: readonly BigChapter[]): BigChapter[] {
  const best = new Map<string, BigChapter>();
  for (const c of all) {
    if (!(c.marksPerPaper > 0)) continue;
    const had = best.get(c.chapterId);
    if (!had || c.marksPerPaper > had.marksPerPaper) best.set(c.chapterId, c);
  }
  return [...best.values()]
    .sort((a, b) => b.marksPerPaper - a.marksPerPaper || a.chapter.localeCompare(b.chapter))
    .slice(0, BIG_CHAPTERS);
}

type Countdown = { kind: "fix" | "top" | "mock"; row: DayRow; today: string; action: DayAction };

/** The countdown row, today's step and its button; null outside the window or with nothing to name. */
function countdownOf(input: DayCardInput): Countdown | null {
  const c = input.countdown;
  if (!c || c.daysLeft < 1 || c.daysLeft > COUNTDOWN_DAYS) return null;
  const label = !c.official
    ? `${c.label} is expected around ${dayMonth(c.date)}`
    : c.daysLeft === 1
      ? `${c.label} is tomorrow`
      : `${c.label} is ${plural(c.daysLeft, "day")} away`;
  const about = c.official ? "" : `About ${plural(c.daysLeft, "day")}. `;

  if (c.daysLeft <= COUNTDOWN_MOCK_DAYS) {
    return {
      kind: "mock",
      row: { label, value: `${about}One full paper under exam time this week is worth more than new chapters now.`, tone: "exam" },
      today: "A full paper, under exam time",
      action: { label: "Start a full mock", href: `/mock/exam/${input.exam.slug}`, action: "exam" },
    };
  }

  const big = bigChapters(input.bigChapters ?? []);
  if (big.length === 0) return null;
  const due = input.dueByChapter ?? {};
  const weak = big.filter((b) => (due[b.chapterId] ?? 0) > 0).slice(0, COUNTDOWN_NAMED);
  if (weak.length > 0) {
    const first = weak[0];
    return {
      kind: "fix",
      row: {
        label,
        value: `${about}Big chapters where you still lose marks:`,
        items: weak.map((b, i) => ({
          name: b.chapter,
          note: i === 0 ? `${plural(due[b.chapterId], "mistake")} to fix` : `${due[b.chapterId]} to fix`,
        })),
        tone: "exam",
      },
      today: `Fix ${first.chapter} (${due[first.chapterId]})`,
      action: { label: `Fix ${first.chapter}`, href: drillChapterHref("v_day", first.chapterId), action: "exam" },
    };
  }
  const top = big.slice(0, COUNTDOWN_NAMED);
  const q = (b: BigChapter) => Math.max(1, Math.round(b.qPerPaper));
  return {
    kind: "top",
    row: {
      label,
      value: `${about}The chapters that carry the most marks:`,
      items: top.map((b, i) => ({
        name: b.chapter,
        note: i === 0 ? `about ${plural(q(b), "question")} a paper` : `about ${q(b)} a paper`,
      })),
      tone: "exam",
    },
    today: `Start with ${top[0].chapter}`,
    action: {
      label: `Practise ${top[0].chapter}`,
      href: goPracticeHref(top[0].examName, top[0].subject, top[0].chapter),
      action: "exam",
    },
  };
}

/** The card, or null when there is nothing to say (V keeps its greeting). */
export function buildDayCard(input: DayCardInput): DayCard | null {
  const last = lastVisit(input.days, input.now);
  const yesterday = addDays(istDay(input.now), -1);
  const kind: DayCard["kind"] = !last ? "fresh" : last.day === yesterday ? "yesterday" : "since";
  const due = input.dueChapters.length;
  const rows: DayRow[] = [];

  // 1. The last visit: plan work first on the plan, else the answers.
  const main = last ? mainChapter(last) : null;
  if (last) {
    const label = kind === "yesterday" ? "Yesterday" : "Last time";
    const planWork = input.plan?.doneOnDay ?? [];
    if (planWork.length > 0) rows.push({ label, value: planWork.join(" · "), detail: answersText(last), tone: "good" });
    else rows.push({ label, value: answersText(last), ...(main ? { detail: `Mostly ${main}` } : {}) });
  }

  // 2. Fixes: that day's, else the running total.
  if (last && input.fixedOnDay > 0) rows.push({ label: "Fixed", value: `${plural(input.fixedOnDay, "mistake")} cleared`, tone: "good" });
  else if (input.fixedTotal > 0) rows.push({ label: "So far", value: `${plural(input.fixedTotal, "mistake")} fixed in total`, tone: "good" });

  // 3. Chapters that moved up.
  const moved = input.movedUp.filter((m) => BAND_WORDS[m.band]);
  if (moved.length > 0) {
    rows.push({ label: "Moved up", value: moved.map((m) => `${m.chapter}: now ${BAND_WORDS[m.band]}`).join(" · "), tone: "good" });
  }

  // 4. The plan, and today.
  const plan = input.plan;
  if (plan && plan.chaptersDone > 0) rows.push({ label: "Plan", value: `${plan.chaptersDone} of ${plural(plan.chaptersOf, "chapter")} done` });
  const next = plan?.tasks.find((t) => !t.done) ?? null;
  if (plan && plan.tasks.length > 0) {
    rows.push(
      next
        ? {
            label: "Today on your plan",
            value: next.detail ? `${next.title}: ${next.detail}` : next.title,
            detail: `About ${plural(next.minutes, "minute")}.`,
            tone: "today",
          }
        : { label: "Today on your plan", value: "Today's plan is done", tone: "good" }
    );
  }
  // 5. The exam countdown (2026-11-21): its row, and with no plan task, the day's step.
  const countdown = countdownOf(input);
  if (countdown) rows.push(countdown.row);
  if (countdown && !next) {
    rows.push({ label: "Today", value: countdown.today, tone: "today" });
  } else if (due > 0 && !next) {
    // A backlog bigger than one drill starts with one drill (real data: up to 472 waiting).
    const sameChapter = main ? input.dueChapters.filter((c) => c === main).length : 0;
    const detail =
      due > DRILL_SIZE
        ? `Start with ${DRILL_SIZE}: ${drillTimeLine(DRILL_SIZE).charAt(0).toLowerCase()}${drillTimeLine(DRILL_SIZE).slice(1)}`
        : sameChapter >= 2 && sameChapter < due
          ? `${sameChapter} of them are from ${main}.`
          : drillTimeLine(due);
    rows.push({ label: "Today", value: `${plural(due, "mistake")} waiting`, detail, tone: "today" });
  }

  if (rows.length === 0) return null;

  let primary: DayAction;
  let secondary: DayAction | null;
  if (next) {
    primary = { label: "Start today's plan", href: next.href, action: "plan" };
    secondary = countdown ? countdown.action : due > 0 ? fixAction(due) : PERFORMANCE;
  } else if (countdown) {
    primary = countdown.action;
    // A chapter's Fix already is a Fix; otherwise all mistakes stay one tap away.
    secondary = countdown.kind !== "fix" && due > 0 ? fixAction(due) : countdown.kind === "mock" ? null : PERFORMANCE;
  } else if (due > 0) {
    primary = fixAction(due);
    secondary = PERFORMANCE;
  } else {
    primary = PERFORMANCE;
    secondary = null;
  }

  const left =
    input.daysLeft === null ? "" : input.daysLeft === 0 ? " · exam today" : ` · ${plural(input.daysLeft, "day")} to go`;
  // V's check-in (2026-11-21): after 4+ days away, a question first.
  const biggest = bigChapters(input.bigChapters ?? [])[0];
  const checkIn = buildCheckIn({
    daysAway: last ? daysBetween(last.day, istDay(input.now)) : null,
    due,
    stuck: input.stuckChapters ?? [],
    top: biggest ? { chapter: biggest.chapter, practiceHref: goPracticeHref(biggest.examName, biggest.subject, biggest.chapter) } : null,
  });
  return {
    kind,
    greeting: checkIn
      ? CHECKIN_QUESTION
      : kind === "since"
        ? "Good to see you again. Here's where you left off."
        : "Welcome back. Here's your day.",
    title: kind === "yesterday" ? "Since yesterday" : kind === "since" ? "Since your last visit" : "Your day",
    subtitle: kind === "since" && last ? `${dateLabel(last.day)} · ${input.exam.displayName}` : `${input.exam.displayName}${left}`,
    rows,
    primary,
    secondary,
    countdown: countdown?.kind ?? null,
    checkIn,
  };
}
