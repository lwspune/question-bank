/**
 * V plans a student's week (2026-10-19, study-partner Phase 3). "Plan my week",
 * "give a timetable", "how do I prepare in 2 months" were asks V could only
 * answer with links. Now plan_week builds one task a day for the next seven
 * days and saves it (study_plans, migration 0169); my_plan reads it back.
 *
 * WHAT GOES IN, in this order (deliberate practice first):
 * 1. the student's weak chapters, by the mastery map's bands (the same rule
 *    as /me/map and my_progress);
 * 2. the exam's biggest chapters by share of recent papers (exam_strategy's
 *    numbers, examStrategy.ts rankChapters), never one already planned;
 * 3. one day for the drill when questions are due (two when many are);
 * 4. a timed mock to end the week, on an exam with mocks, when the week has
 *    four or more days or the exam is within 30 days.
 * The number of days is what the student asks for, else their weekly goal,
 * else 5. With too few chapters the plan has fewer days: a chapter is never
 * repeated to fill a slot.
 *
 * SUBJECTS. An entrance paper covers all its subjects, so its whole exam is
 * ranked. A board student takes some subjects, not all (PCM or PCB): with
 * none named, V asks which (2026-10-19 replay: a CBSE 12 plan held Biology).
 *
 * TICKS ARE NOT STORED. A task is done when the log says so (tickPlan): a
 * drill finished, a mock submitted, 5 questions practised in the chapter,
 * anywhere in the plan's week. A stored tick would be a second copy of
 * user_activity, free to disagree with it (the 0113 rule).
 *
 * The exam date: a future date on the profile or in the exam calendar
 * (lib/exam/calendar.ts resolveExamDate) is used as it is; with neither, V
 * asks once, saves the answer to the profile, and plans without a date if
 * the student does not know.
 *
 * Pure apart from the injected loaders. Spec: tests/chat-week-plan.test.ts.
 */
import type { VTool } from "./anthropic";
import { chapterPath, examsNamed, type ChapterSearchRow } from "./chapterSearch";
import { rankChapters, subjectNamed, subjectsOf, type StrategyData } from "./examStrategy";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { daysUntilIst, resolveExamDate, sanitizeExamDate } from "@/lib/exam/calendar";
import { bandOf } from "@/lib/performance/masteryMap";

export type PlanItem =
  | { day: number; kind: "chapter"; chapterId: string; chapter: string; path: string; why: "weak" | "share"; share?: number }
  | { day: number; kind: "drill"; path: "/drill"; due: number }
  | { day: number; kind: "mock"; path: "/mock" };

export type SavedPlan = { startsOn: string; examSlug: string; subject: string | null; items: PlanItem[] };

/** What the student did in the plan's week, counted from user_activity. */
export type PlanActivity = { drills: number; mocks: number; chapterQuestions: Record<string, number> };

export type TickedItem = PlanItem & { done: boolean };

type PlanChapter = { chapterId: string; chapter: string; path: string };
/** Distributive: a plain Omit over the union keeps only the fields every kind shares. */
type WithoutDay<T> = T extends unknown ? Omit<T, "day"> : never;

export const DEFAULT_PLAN_DAYS = 5;
/** Questions practised in a chapter that make its day done. */
export const CHAPTER_DONE_QUESTIONS = 5;
/** Due questions above which the week gets a second drill day (with 6+ days). */
const MANY_DUE = 20;
/** Within this many days of the exam, even a short week ends with a mock. */
const MOCK_CLOSE_DAYS = 30;

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const clampDays = (n: number) => Math.min(7, Math.max(1, Math.round(Number.isFinite(n) ? n : DEFAULT_PLAN_DAYS)));

/** `n` sessions spread over the seven days, first day today. */
export function spreadDays(n: number): number[] {
  const k = clampDays(n);
  return Array.from({ length: k }, (_, i) => Math.round((i * 7) / k));
}

/** Today's date in India, YYYY-MM-DD: the plan's first day. */
export function planStartIst(now: Date): string {
  return new Date(now.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** "Tue 20 Oct" for a day of the plan. */
export function dayLabel(startsOn: string, day: number): string {
  const d = new Date(Date.parse(`${startsOn}T00:00:00Z`) + day * DAY_MS);
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

export function buildWeekPlan(input: {
  sessions: number;
  due: number;
  weak: readonly PlanChapter[];
  top: readonly (PlanChapter & { share: number })[];
  hasMocks: boolean;
  daysLeft: number | null;
}): PlanItem[] {
  const n = clampDays(input.sessions);
  const mock = input.hasMocks && (n >= 4 || (input.daysLeft !== null && input.daysLeft <= MOCK_CLOSE_DAYS && n >= 2));
  const drills = input.due > 0 ? (input.due > MANY_DUE && n >= 6 ? 2 : 1) : 0;
  const slots = Math.max(0, n - drills - (mock ? 1 : 0));

  type Task = WithoutDay<PlanItem>;
  const chapters: Task[] = [];
  const seen = new Set<string>();
  for (const c of input.weak) {
    if (chapters.length >= slots || seen.has(c.chapterId)) continue;
    seen.add(c.chapterId);
    chapters.push({ kind: "chapter", chapterId: c.chapterId, chapter: c.chapter, path: c.path, why: "weak" });
  }
  for (const c of input.top) {
    if (chapters.length >= slots || seen.has(c.chapterId)) continue;
    seen.add(c.chapterId);
    chapters.push({ kind: "chapter", chapterId: c.chapterId, chapter: c.chapter, path: c.path, why: "share", share: c.share });
  }

  const tasks: Task[] = [...chapters];
  const drill: Task = { kind: "drill", path: "/drill", due: input.due };
  if (drills >= 1) tasks.splice(Math.ceil(tasks.length / 2), 0, drill);
  if (drills >= 2) tasks.push({ ...drill });
  if (mock) tasks.push({ kind: "mock", path: "/mock" });

  const days = tasks.length > 0 ? spreadDays(tasks.length) : [];
  return tasks.map((t, i) => ({ ...t, day: days[i] }) as PlanItem);
}

export function tickPlan(items: readonly PlanItem[], activity: PlanActivity): TickedItem[] {
  let drills = activity.drills;
  let mocks = activity.mocks;
  return items.map((item) => {
    if (item.kind === "drill") return { ...item, done: drills-- > 0 };
    if (item.kind === "mock") return { ...item, done: mocks-- > 0 };
    return { ...item, done: (activity.chapterQuestions[item.chapterId] ?? 0) >= CHAPTER_DONE_QUESTIONS };
  });
}

export type PlanDayView = { label: string; title: string; path: string; done: boolean };

/** One line per day, as the chat card and V both show it. */
export function planView(plan: SavedPlan, ticked: readonly TickedItem[]): { days: PlanDayView[]; done: number; total: number } {
  const days = ticked.map((item) => {
    let title: string;
    if (item.kind === "chapter") {
      title = `Practise ${item.chapter} (${item.why === "weak" ? "needs work in your mocks" : `${item.share}% of recent papers`})`;
    } else if (item.kind === "drill") {
      title = `Fix the questions waiting in your drill (${item.due} due)`;
    } else {
      title = "Sit one timed mock";
    }
    return { label: dayLabel(plan.startsOn, item.day), title, path: item.path, done: item.done };
  });
  return { days, done: days.filter((d) => d.done).length, total: days.length };
}

export function planText(plan: SavedPlan, ticked: readonly TickedItem[]): string {
  const view = planView(plan, ticked);
  return [
    ...view.days.map((d) => `${d.label}: ${d.title} ${d.path}${d.done ? " (done)" : ""}`),
    `${view.done} of ${view.total} done.`,
  ].join("\n");
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isDay = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 6;

/** The stored items, checked on the way in and out: anything malformed is dropped. */
export function parsePlanItems(raw: unknown): PlanItem[] {
  if (!Array.isArray(raw)) return [];
  const out: PlanItem[] = [];
  for (const v of raw) {
    if (!isObj(v) || !isDay(v.day)) continue;
    if (v.kind === "drill" && v.path === "/drill" && Number.isInteger(v.due) && (v.due as number) >= 0) {
      out.push({ day: v.day, kind: "drill", path: "/drill", due: v.due as number });
    } else if (v.kind === "mock" && v.path === "/mock") {
      out.push({ day: v.day, kind: "mock", path: "/mock" });
    } else if (
      v.kind === "chapter" &&
      typeof v.chapterId === "string" &&
      typeof v.chapter === "string" &&
      typeof v.path === "string" &&
      v.path.startsWith("/questions/") &&
      (v.why === "weak" || v.why === "share")
    ) {
      const item: PlanItem = { day: v.day, kind: "chapter", chapterId: v.chapterId, chapter: v.chapter, path: v.path, why: v.why };
      if (typeof v.share === "number" && Number.isFinite(v.share)) item.share = v.share;
      out.push(item);
    }
  }
  return out;
}

type LaneLike = { exam: string; subject: string; chapters: readonly { chapter: string; judged: number; weightedScore: number }[] };

/** The exam's weak chapters from the student's mocks, worst first, by the mastery map's bands. */
export function weakFromPerformance(perf: { lanes: readonly LaneLike[] }, examName: string): { subject: string; chapter: string }[] {
  return perf.lanes
    .filter((l) => l.exam === examName)
    .flatMap((l) => l.chapters.filter((c) => bandOf(c) === "weak").map((c) => ({ subject: l.subject, chapter: c.chapter, score: c.weightedScore })))
    .sort((a, b) => a.score - b.score)
    .map(({ subject, chapter }) => ({ subject, chapter }));
}

export type PlanDeps = {
  signedIn: boolean;
  now: () => Date;
  loadChapters: () => Promise<readonly ChapterSearchRow[]>;
  loadProfile: () => Promise<{ targetExams: string[]; examDate: string | null; weeklyGoal: number | null }>;
  /** Saves the student's exam date to their profile (student_profiles.exam_date). */
  saveExamDate: (date: string) => Promise<void>;
  loadStrategy: (examSlug: string) => Promise<StrategyData | null>;
  /** The exam's weak chapters from the student's mocks (weakFromPerformance). */
  loadWeak: (examName: string) => Promise<{ subject: string; chapter: string }[]>;
  loadDue: () => Promise<number>;
  savePlan: (plan: SavedPlan) => Promise<void>;
  /** The latest plan whose week includes today, or null. */
  loadPlan: () => Promise<SavedPlan | null>;
  loadPlanActivity: (plan: SavedPlan) => Promise<PlanActivity>;
  /** The plan is shown as a card in the chat under this reply. */
  onPlan: () => void;
};

const SIGN_IN = "The student is signed out. Tell them to sign in (free, /signup) and V will plan their week.";
const SHOWN =
  "It is shown below this reply in the chat, and each day ticks itself when they do the task: there is nothing to tick by hand. Tell them in one or two sentences; do not list the days again, and do not promise a different or fuller plan.";

async function softly<T>(what: string, load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load();
  } catch (err) {
    console.error(`V: plan ${what} unavailable`, err);
    return fallback;
  }
}

export function planTools(deps: PlanDeps): [VTool, VTool] {
  const planWeek: VTool = {
    name: "plan_week",
    logResult: true,
    description:
      "Make and save the signed-in student's study plan for the next 7 days: one task a day from their weak chapters, the exam's biggest chapters, their due drill questions and a timed mock. Use it when they ask for a plan, a timetable, or how to prepare this week or before their exam.",
    input_schema: {
      type: "object",
      properties: {
        exam: { type: "string", description: "The exam if the student named one; otherwise their profile's exam is used." },
        subject: { type: "string", description: "One subject if they want the week on it alone." },
        subjects: {
          type: "array",
          items: { type: "string" },
          description: "The subjects to cover, when they named several (a board student's own subjects, e.g. ['Physics', 'Chemistry', 'Maths'])." },
        all_subjects: { type: "boolean", description: "True when they want every subject of the exam." },
        exam_date: { type: "string", description: "Their exam date as YYYY-MM-DD, when they told you; it is saved to their profile." },
        date_unknown: { type: "boolean", description: "True when they said they do not know their exam date." },
        days_per_week: { type: "number", description: "How many days this week they can study, if they said (1 to 7)." },
      },
    },
    run: async (input) => {
      if (!deps.signedIn) return SIGN_IN;
      const i = (input ?? {}) as Record<string, unknown>;
      const now = deps.now();
      const [rows, profile] = await Promise.all([deps.loadChapters(), deps.loadProfile()]);

      let slug: string | null = null;
      const examAsked = typeof i.exam === "string" ? i.exam.trim() : "";
      if (examAsked) {
        const exams = examsNamed(rows, examAsked);
        if (exams.length === 0) return `No exam matched "${examAsked}". Ask which exam they are preparing for.`;
        if (exams.length > 1) return `That fits ${exams.map((e) => e.name).join(" or ")}. Ask which one they mean.`;
        slug = exams[0].slug;
      } else {
        slug = profile.targetExams.find((s) => EXAM_REGISTRY.some((e) => e.slug === s)) ?? null;
      }
      if (!slug) return "Ask which exam they are preparing for, then call again with it.";
      const entry = EXAM_REGISTRY.find((e) => e.slug === slug)!;

      let examDate = profile.examDate;
      if (typeof i.exam_date === "string" && i.exam_date.trim()) {
        const d = sanitizeExamDate(i.exam_date);
        if (!d || daysUntilIst(d, now) < 0) return `"${i.exam_date}" is not a future date. Ask for their exam date again.`;
        await deps.saveExamDate(d);
        examDate = d;
      }
      const countdown = resolveExamDate({ targetExams: [slug], examDate }, now);
      if (!countdown && i.date_unknown !== true) {
        return "Ask the student when their exam is (a date, or the month) so the plan can count down to it, then call again with exam_date. If they do not know, call again with date_unknown true.";
      }

      const strategy = await softly("strategy", () => deps.loadStrategy(slug!), null);
      // The subjects the student named, each matched to one of the exam's.
      const asked = [
        ...(typeof i.subject === "string" && i.subject.trim() ? [i.subject.trim()] : []),
        ...(Array.isArray(i.subjects) ? i.subjects.filter((s): s is string => typeof s === "string" && s.trim() !== "").map((s) => s.trim()) : []),
      ];
      const all = strategy ? subjectsOf(strategy.chapters) : [];
      const chosen: string[] = [];
      for (const a of asked) {
        const s = strategy ? subjectNamed(strategy, a) : null;
        if (!s) return `No past-year chapters for "${a}" in ${entry.displayName}. Its subjects: ${[...all].sort().join(", ")}. Ask which they mean.`;
        if (!chosen.includes(s)) chosen.push(s);
      }
      // A board student takes some subjects, not all (PCM or PCB): ask rather than plan Biology for a Maths student.
      if (chosen.length === 0 && entry.boardExam === true && all.length > 1 && i.all_subjects !== true) {
        return `Ask which subjects the plan should cover (${[...all].sort().join(", ")}), then call again with subjects, or all_subjects true for every one.`;
      }
      const subject = chosen.length > 0 ? chosen.join(", ") : null;

      const inExam = rows.filter((r) => r.examSlug === slug && r.chapterId);
      const byName = new Map(inExam.map((r) => [`${r.subjectName}|${r.chapterName}`, r]));
      const byId = new Map(inExam.map((r) => [r.chapterId as string, r]));
      const weak = (await softly("weak chapters", () => deps.loadWeak(entry.examName), []))
        .filter((w) => chosen.length === 0 || chosen.includes(w.subject))
        .flatMap((w) => {
          const r = byName.get(`${w.subject}|${w.chapter}`);
          return r ? [{ chapterId: r.chapterId as string, chapter: r.chapterName, path: chapterPath(r) }] : [];
        });
      const top = (strategy ? rankChapters(strategy, chosen.length > 0 ? chosen : null) : []).flatMap((c) => {
        const r = byId.get(c.id);
        return r ? [{ chapterId: c.id, chapter: c.name, path: chapterPath(r), share: c.share }] : [];
      });
      const due = await softly("due count", deps.loadDue, 0);
      const days = typeof i.days_per_week === "number" ? i.days_per_week : null;

      const items = buildWeekPlan({
        sessions: days ?? profile.weeklyGoal ?? DEFAULT_PLAN_DAYS,
        due,
        weak,
        top,
        hasMocks: entry.hasMocks === true,
        daysLeft: countdown?.daysLeft ?? null,
      });
      if (items.length === 0) {
        return `There is nothing to plan from yet for ${entry.displayName}. Suggest a first timed mock at /mock or a chapter at /questions.`;
      }
      const plan: SavedPlan = { startsOn: planStartIst(now), examSlug: slug, subject, items };
      await deps.savePlan(plan);
      deps.onPlan();
      const when = countdown ? `, ${countdown.daysLeft} days to ${countdown.label}${countdown.official ? "" : " (expected date)"}` : "";
      return [
        `Plan saved for ${dayLabel(plan.startsOn, 0)} to ${dayLabel(plan.startsOn, 6)}, ${entry.displayName}${subject ? ` ${subject}` : ""}${when}:`,
        planText(plan, tickPlan(items, { drills: 0, mocks: 0, chapterQuestions: {} })),
        SHOWN,
      ].join("\n");
    },
  };

  const myPlan: VTool = {
    name: "my_plan",
    logResult: true,
    description:
      "Read the signed-in student's plan for this week with what they have done so far. Use it when they ask about their plan, what to do today, or how their week is going. Takes no input.",
    input_schema: { type: "object", properties: {} },
    run: async () => {
      if (!deps.signedIn) return SIGN_IN;
      const plan = await deps.loadPlan();
      if (!plan) return "No plan this week yet. Offer to make one.";
      const activity = await softly("activity", () => deps.loadPlanActivity(plan), { drills: 0, mocks: 0, chapterQuestions: {} });
      deps.onPlan();
      const name = EXAM_REGISTRY.find((e) => e.slug === plan.examSlug)?.displayName ?? plan.examSlug;
      return [
        `Plan for ${dayLabel(plan.startsOn, 0)} to ${dayLabel(plan.startsOn, 6)}, ${name}${plan.subject ? ` ${plan.subject}` : ""}. Today is ${dayLabel(planStartIst(deps.now()), 0)}.`,
        planText(plan, tickPlan(plan.items, activity)),
        "It is shown below this reply in the chat. Say what is done first, then today's task.",
      ].join("\n");
    },
  };

  return [planWeek, myPlan];
}
