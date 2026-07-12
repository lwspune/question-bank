/**
 * Pure interpretation layer for the A3 usage-shape readout (the "measure before
 * you build a mechanic" step). The SQL RPC get_activity_shape (migration 0053)
 * returns the raw numbers; this module labels them and — the load-bearing part —
 * classifies the usage as daily vs burst so we pick the RIGHT engagement
 * mechanic instead of copying Duolingo's daily streak blind (the sibling AI
 * Tutor shipped daily streaks and they fired 0× because students study in
 * bursts). Pure + unit-tested; the DB/service layer lives in adminStats.ts.
 */
import type { ActivityKind } from "./events";

export const KIND_LABELS: Record<ActivityKind, string> = {
  mock_submitted: "Mock completed",
  answer_wrong: "Mock question missed",
  answer_correct: "Mock question correct",
  chapter_mastered: "Chapter mastered",
  note_checkpoint: "Notes checkpoint",
  question_bookmarked: "Question saved",
  quiz_taken: "Quiz taken",
  drill_completed: "Drill completed",
};

export type KindStat = { kind: string; events: number; users: number };
export type DayStat = { day: string; users: number; events: number };
export type GapBuckets = {
  sameNext: number; // consecutive active days (gap = 1)
  d2_3: number;
  d4_7: number;
  d8_14: number;
  d15plus: number;
};

export type ActivityShape = {
  windowDays: number;
  totalEvents: number;
  activeUsers: number;
  active7d: number;
  active30d: number;
  avgEventsPerUser: number;
  byKind: KindStat[];
  sessions: {
    avgActiveDays: number; // avg distinct active calendar days (IST) per active user
    multiDayUsers: number; // users active on >= 2 distinct days
    medianGapDays: number | null; // median gap between consecutive active days
    gapBuckets: GapBuckets;
  };
  recency: {
    d0_1: number; // users whose last activity was 0–1 days ago
    d2_7: number;
    d8_30: number;
    d31plus: number;
  };
  dailyActive: DayStat[];
};

export function emptyShape(windowDays: number): ActivityShape {
  return {
    windowDays,
    totalEvents: 0,
    activeUsers: 0,
    active7d: 0,
    active30d: 0,
    avgEventsPerUser: 0,
    byKind: [],
    sessions: {
      avgActiveDays: 0,
      multiDayUsers: 0,
      medianGapDays: null,
      gapBuckets: { sameNext: 0, d2_3: 0, d4_7: 0, d8_14: 0, d15plus: 0 },
    },
    recency: { d0_1: 0, d2_7: 0, d8_30: 0, d31plus: 0 },
    dailyActive: [],
  };
}

export type UsageVerdict = "insufficient" | "daily" | "burst" | "mixed";

export type UsageClassification = {
  verdict: UsageVerdict;
  headline: string;
  recommendation: string;
};

// Below this many repeat-visit students, gap statistics aren't trustworthy.
const MIN_MULTI_DAY_USERS = 3;
const DAILY_MAX_GAP = 1.5; // median gap ≤ this ⇒ genuinely daily
const BURST_MIN_GAP = 3; // median gap ≥ this ⇒ burst-shaped

/**
 * Decide whether the cohort's usage is daily or burst-shaped — the input to the
 * streak-vs-goal-progress decision. Deliberately conservative: it says
 * "insufficient" rather than guess from a handful of users.
 */
export function classifyUsageShape(s: ActivityShape): UsageClassification {
  const { multiDayUsers, medianGapDays } = s.sessions;

  if (s.activeUsers < MIN_MULTI_DAY_USERS || multiDayUsers < MIN_MULTI_DAY_USERS || medianGapDays == null) {
    return {
      verdict: "insufficient",
      headline: "Not enough repeat-visit data yet",
      recommendation:
        "Keep collecting activity before committing to a returning-habit mechanic. Ship value surfaces (progress cockpit, weak-area drills) that don't depend on visit cadence first.",
    };
  }

  const gap = medianGapDays;
  const headline = `Median gap between study days: ${gap} day${gap === 1 ? "" : "s"} (${multiDayUsers} repeat students)`;

  if (gap <= DAILY_MAX_GAP) {
    return {
      verdict: "daily",
      headline,
      recommendation:
        "Usage is genuinely daily — a daily streak mechanic is defensible here. Still cap it kindly (no punish-on-break) and celebrate at the trigger surface.",
    };
  }
  if (gap >= BURST_MIN_GAP) {
    return {
      verdict: "burst",
      headline,
      recommendation:
        "Usage is burst-shaped — students study in clusters, not every day. Prefer a weekly-goal or exam-deadline progress mechanic; a daily-visit habit counter would show zero to most students and silently demotivate (the AI Tutor's exact failure).",
    };
  }
  return {
    verdict: "mixed",
    headline,
    recommendation:
      "Usage sits between daily and burst. Lead with a weekly-goal / days-to-exam progress mechanic (works for both), and revisit a streak only if the gap tightens toward daily.",
  };
}
