/**
 * Pure views and verdicts behind /dashboard/growth.
 *
 * THE SAME REFUSALS AS /dashboard/pmf, because the same mistakes are available:
 *  · a rate under the sample floor (MIN_LIFT_N) is withheld, not printed;
 *  · a 7-day return is counted only for students who have had all 7 days;
 *  · nothing is called keep or kill before its check date — an early read is
 *    labelled as one.
 *
 * Every number arrives as a COUNT from get_growth_snapshot (migration 0129);
 * every rate is made here, so the rounding and the floors are tested once.
 * Spec: tests/growth-snapshot.test.ts.
 */
import { INSTRUMENT_CHANGED_SINCE, MIN_LIFT_N } from "@/lib/pmf/snapshot";
import type { OnboardingArm } from "@/lib/education/howItWorks";
import {
  CHAPTER_SHARE_KEEP,
  EMAIL_DAILY_CAP,
  INDEXING_GOAL,
  ONBOARDING_KEEP_POINTS,
  checkOn,
  type Reading,
} from "./registry";

export { CHAPTER_SHARE_KEEP, EMAIL_DAILY_CAP, INDEXING_GOAL, ONBOARDING_KEEP_POINTS };

export type VerdictStatus =
  | "too-early"
  | "early-read"
  | "running"
  | "keep"
  | "kill"
  | "no-difference"
  | "holding"
  | "failing"
  | "tracking";

export type Verdict = { status: VerdictStatus; reason: string };

/** Today's date in India, ISO — the day boundary every count here uses. */
export function todayIst(now: Date = new Date()): string {
  return new Date(now.getTime() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function pct(n: number, d: number): number {
  return Math.round((100 * n) / d);
}

/* ── North Star ─────────────────────────────────────────────────────────── */

export type NorthStarWeek = { weekStart: string; learners: number; learnersTwoPlus: number };

export type NorthStarWeekView = {
  weekStart: string;
  learners: number;
  twoPlus: number;
  /** The week containing today: still filling up. */
  partial: boolean;
  /** Starts before practice tracking began (2026-09-17), so it counts low. */
  undercounted: boolean;
};

export type NorthStarView = {
  weeks: NorthStarWeekView[];
  thisWeek: NorthStarWeekView | null;
  lastFullWeek: NorthStarWeekView | null;
  peak: { weekStart: string; twoPlus: number } | null;
};

export function viewNorthStar(rows: readonly NorthStarWeek[], today: string): NorthStarView {
  const weeks = [...rows]
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
    .map((r) => ({
      weekStart: r.weekStart,
      learners: r.learners,
      twoPlus: r.learnersTwoPlus,
      partial: r.weekStart <= today && today < addDays(r.weekStart, 7),
      undercounted: r.weekStart < INSTRUMENT_CHANGED_SINCE,
    }));
  const full = weeks.filter((w) => !w.partial);
  const peakWeek = full.reduce<NorthStarWeekView | null>(
    (best, w) => (best === null || w.twoPlus > best.twoPlus ? w : best),
    null
  );
  return {
    weeks,
    thisWeek: weeks.find((w) => w.partial) ?? null,
    lastFullWeek: full.at(-1) ?? null,
    peak: peakWeek ? { weekStart: peakWeek.weekStart, twoPlus: peakWeek.twoPlus } : null,
  };
}

/* ── Funnel by signup week ──────────────────────────────────────────────── */

export type SignupWeek = {
  weekStart: string;
  signups: number;
  /** Did any learning act at all. */
  signalled: number;
  /** Signed up 8+ days ago, so all of days 1-7 have happened. */
  matured: number;
  /** Of the matured: a learning act on day 1-7 after signup. */
  returned7: number;
  /** Paid passes bought that week. */
  paid: number;
};

export type SignupWeekView = SignupWeek & {
  signalRate: number | null;
  /** Null below the sample floor. */
  returnRate: number | null;
};

export function viewFunnelWeek(row: SignupWeek): SignupWeekView {
  return {
    ...row,
    signalRate: row.signups > 0 ? pct(row.signalled, row.signups) : null,
    returnRate: row.matured >= MIN_LIFT_N ? pct(row.returned7, row.matured) : null,
  };
}

/* ── Practice-first onboarding ──────────────────────────────────────────── */

export type ArmCounts = {
  arm: OnboardingArm;
  /** Onboarded since the experiment went live, with a mock exam first. */
  onboarded: number;
  /** Of those, onboarded 8+ days ago. */
  matured: number;
  /** Of the matured: a learning act on day 1-7 after onboarding. */
  returned7: number;
  /** Of the matured: learning acts on 2+ days in days 0-6. */
  twoPlus: number;
  /** Their first learning act was a practice reveal — did the arm take? */
  firstPractice: number;
  /** Their first learning act was a mock. */
  firstMock: number;
};

const EMPTY_ARM = { onboarded: 0, matured: 0, returned7: 0, twoPlus: 0, firstPractice: 0, firstMock: 0 };

export type OnboardingVerdict = Verdict & {
  arms: Record<OnboardingArm, ArmCounts>;
  /** Each half's 7-day return, or null below the floor. */
  rates: Record<OnboardingArm, number | null>;
  /** practice-first minus control, in points; null below the floor. */
  diffPoints: number | null;
  checkOn: string;
};

export function onboardingVerdict(
  rows: readonly ArmCounts[],
  today: string,
  liveSince: string
): OnboardingVerdict {
  const get = (arm: OnboardingArm): ArmCounts =>
    rows.find((r) => r.arm === arm) ?? { arm, ...EMPTY_ARM };
  const practice = get("practice-first");
  const control = get("mock-first");
  const rate = (a: ArmCounts) => (a.matured >= MIN_LIFT_N ? (100 * a.returned7) / a.matured : null);
  const rp = rate(practice);
  const rc = rate(control);
  const due = checkOn(liveSince);
  const base = {
    arms: { "practice-first": practice, "mock-first": control },
    rates: {
      "practice-first": rp === null ? null : Math.round(rp),
      "mock-first": rc === null ? null : Math.round(rc),
    },
    checkOn: due,
  };

  if (rp === null || rc === null) {
    return {
      ...base,
      diffPoints: null,
      status: "too-early",
      reason: `Needs ${MIN_LIFT_N} students per half with 7 full days; has ${practice.matured} practice-first and ${control.matured} control.`,
    };
  }

  const diff = Math.round(rp - rc);
  if (today < due) {
    return {
      ...base,
      diffPoints: diff,
      status: "early-read",
      reason: `Early read only: decided on ${due}.`,
    };
  }
  if (diff >= ONBOARDING_KEEP_POINTS) {
    return { ...base, diffPoints: diff, status: "keep", reason: `Practice-first is ${diff} points higher.` };
  }
  if (diff <= -ONBOARDING_KEEP_POINTS) {
    return { ...base, diffPoints: diff, status: "kill", reason: `Practice-first is ${-diff} points lower: revert it.` };
  }
  return {
    ...base,
    diffPoints: diff,
    status: "no-difference",
    reason: `A ${Math.abs(diff)}-point gap is within what this sample cannot tell apart.`,
  };
}

/* ── Chapter share ──────────────────────────────────────────────────────── */

export function chapterShareVerdict(signups: number, today: string, liveSince: string): Verdict {
  const due = checkOn(liveSince);
  if (today < due) {
    return { status: "running", reason: `${signups} so far; decided on ${due} (keep at ${CHAPTER_SHARE_KEEP}+).` };
  }
  return signups >= CHAPTER_SHARE_KEEP
    ? { status: "keep", reason: `${signups} signups, at or above ${CHAPTER_SHARE_KEEP}.` }
    : { status: "kill", reason: `${signups} signups, below ${CHAPTER_SHARE_KEEP}: remove the card.` };
}

/* ── Email cap ──────────────────────────────────────────────────────────── */

export type EmailDay = { day: string; sent: number; failed: number };

export type EmailCapVerdict = Verdict & {
  failed7: number;
  busiest: { day: string; total: number } | null;
  cap: number;
};

/**
 * Only days since the cap went live count: the 2026-09-28 failures are why the
 * cap exists, and holding them against it would call it failing on day one.
 */
export function emailCapVerdict(
  days: readonly EmailDay[],
  today: string,
  liveSince: string
): EmailCapVerdict {
  const since = days.filter((d) => d.day >= liveSince && d.day <= today);
  const weekStart = addDays(today, -6);
  const failed7 = since.filter((d) => d.day >= weekStart).reduce((n, d) => n + d.failed, 0);
  const window = liveSince > weekStart ? `since ${liveSince}` : "in the last 7 days";
  const busiest = since.reduce<{ day: string; total: number } | null>((best, d) => {
    const total = d.sent + d.failed;
    return best === null || total > best.total ? { day: d.day, total } : best;
  }, null);
  return {
    failed7,
    busiest,
    cap: EMAIL_DAILY_CAP,
    ...(failed7 === 0
      ? { status: "holding" as const, reason: `No failed sends ${window}.` }
      : { status: "failing" as const, reason: `${failed7} failed sends ${window}.` }),
  };
}

/* ── Indexing (hand readings) ───────────────────────────────────────────── */

export type IndexingView = Verdict & {
  latest: Reading | null;
  change: number | null;
  goal: number;
};

export function indexingView(entries: readonly Reading[]): IndexingView {
  const latest = entries.at(-1) ?? null;
  const previous = entries.length >= 2 ? entries[entries.length - 2] : null;
  return {
    latest,
    change: latest && previous ? latest.value - previous.value : null,
    goal: INDEXING_GOAL,
    status: "tracking",
    reason: latest
      ? `${latest.value} of ${INDEXING_GOAL} on ${latest.on}.`
      : "No reading yet: read Search Console → Pages.",
  };
}
