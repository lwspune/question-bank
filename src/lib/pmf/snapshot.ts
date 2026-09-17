/**
 * Pure interpretation layer for the PMF readout (/dashboard/pmf).
 *
 * The SQL RPC get_pmf_snapshot (migration 0103) returns the raw counters; this
 * module turns them into rates and — the load-bearing part — REFUSES to report
 * any rate the data cannot carry. Three refusals, each earned:
 *
 *  1. CENSORING. A cohort that signed up 3 days ago has not had 28 days to come
 *     back, so its d28 cell is `null`, never 0%. An uncensored retention table
 *     reads "recent cohorts collapsed" when it actually means "we asked too
 *     early" — the single easiest way to misread a retention curve.
 *  2. SAMPLE FLOORS. A retention lift computed over 3 users, or an NPS over 6
 *     responses, is noise wearing a number's clothes. Below the floor the count
 *     is shown and the RATE is withheld.
 *  3. HONEST LABELS. Step 2 of the funnel is "recorded a signal", NOT
 *     "activated". Even after the 2026-09-17 instrumentation pass, coverage is
 *     partial by design: bank practice is recorded only for SIGNED-IN students,
 *     so an anonymous visitor can read for an hour and register as nothing at
 *     all, and acquisition exists only for accounts created from that date on.
 *     SURFACE_COVERAGE puts those limits on the page instead of in a footnote,
 *     because a number whose denominator is partly invisible must say so where
 *     it is read.
 *
 * Same discipline as lib/dbhealth/delta.ts, which refuses to extrapolate a rate
 * from a window too short to support one.
 *
 * Pure (no DB, no server-only) so it is unit-testable; the read lives in
 * adminStats.ts. Spec: tests/pmf-snapshot.test.ts.
 */
import { computeNps, type NpsRollup } from "@/lib/feedback/nps";
import type { ActivityKind } from "@/lib/activity/events";

/** Minimum users in EACH arm before a retention lift is reported. */
export const MIN_LIFT_N = 10;
/** Minimum students in a segment before its rates are reported. */
export const MIN_SEGMENT_N = 10;
/** Minimum NPS responses before the headline score is reported. */
export const MIN_NPS_RESPONSES = 10;

/** Retention horizons, in days since signup. */
export const HORIZONS = [1, 7, 28] as const;

function pct(num: number, den: number): number {
  if (den <= 0) return 0;
  return Math.round((num / den) * 100);
}

// ── Cohort retention ────────────────────────────────────────────────────────

export type CohortRow = {
  /** ISO date of the cohort's week start (IST). */
  week: string;
  signups: number;
  /** Signed up AND left at least one recorded signal, ever. */
  signalled: number;
  /**
   * Days elapsed since the LAST possible signup in this week (week start + 7d).
   * Conservative on purpose: the horizon must be reachable for every member of
   * the cohort, not just the earliest joiner.
   */
  daysSinceClose: number;
  retD1: number;
  retD7: number;
  retD28: number;
};

export type RetentionCell = {
  /** Retained users, or null when the horizon is not yet observable. */
  value: number | null;
  pct: number | null;
  censored: boolean;
};

export type CohortView = {
  week: string;
  signups: number;
  signalled: number;
  signalPct: number;
  d1: RetentionCell;
  d7: RetentionCell;
  d28: RetentionCell;
};

function cell(retained: number, signups: number, daysSinceClose: number, horizon: number): RetentionCell {
  if (daysSinceClose < horizon) return { value: null, pct: null, censored: true };
  return { value: retained, pct: pct(retained, signups), censored: false };
}

export function viewCohort(row: CohortRow): CohortView {
  return {
    week: row.week,
    signups: row.signups,
    signalled: row.signalled,
    signalPct: pct(row.signalled, row.signups),
    d1: cell(row.retD1, row.signups, row.daysSinceClose, 1),
    d7: cell(row.retD7, row.signups, row.daysSinceClose, 7),
    d28: cell(row.retD28, row.signups, row.daysSinceClose, 28),
  };
}

/** Newest cohort first — the one you actually want to read. */
export function viewCohorts(rows: readonly CohortRow[]): CohortView[] {
  return rows
    .map(viewCohort)
    .sort((a, b) => (a.week < b.week ? 1 : a.week > b.week ? -1 : 0));
}

// ── Feature adoption + retention lift ───────────────────────────────────────

/**
 * Per-question telemetry, not features. `answer_wrong`/`answer_correct` fire
 * once per QUESTION inside a mock, so listing them beside "Timed mocks" would
 * compare a surface to its own internals.
 */
export const TELEMETRY_KINDS: readonly string[] = [
  "answer_wrong",
  "answer_correct",
  // mock_started is a LIFECYCLE state of the mock feature, not a second feature.
  // Listing it beside "Timed mocks" would show the same surface twice and make
  // mocks look twice as adopted; where it earns its keep is the abandonment
  // figure, which is computed from attempt statuses.
  "mock_started",
];

export const FEATURE_LABELS: Partial<Record<ActivityKind, string>> = {
  mock_submitted: "Timed mocks",
  question_practiced: "Bank practice",
  note_checkpoint: "Notes checkpoints",
  chapter_mastered: "Notes mastery",
  question_bookmarked: "Saved questions",
  quiz_taken: "Daily quiz",
  drill_completed: "Weak-area drills",
};

/**
 * Feature keys that are a KIND PLUS A SURFACE, not a bare activity kind.
 *
 * get_pmf_snapshot splits `question_practiced` by the surface recorded in
 * metadata (migration 0107), because revealing an answer on /browse and
 * revealing one inside a /guide worked example are the same act on two
 * different products — and a merged row cannot answer whether the guides
 * contribute to retention, which is the only reason to measure them.
 *
 * The bare `question_practiced` key keeps its FEATURE_LABELS entry and means
 * the bank, which is also what every row written before 2026-09-17 was.
 */
export const SURFACE_FEATURE_LABELS: Record<string, string> = {
  "question_practiced:guide": "Guide worked examples",
};

export type FeatureRow = {
  kind: string;
  /** Distinct students who ever used it. */
  users: number;
  events: number;
  /** Mature + signalled students who used it, and how many were still active at d28. */
  usedEligible: number;
  usedRetained: number;
  /** Mature + signalled students who did NOT use it — the baseline arm. */
  unusedEligible: number;
  unusedRetained: number;
};

export type FeatureVerdict = "ok" | "thin" | "dead";

export type FeatureView = {
  kind: string;
  label: string;
  users: number;
  events: number;
  usedRate: number | null;
  unusedRate: number | null;
  /** Percentage-point difference in d28 retention, used minus unused. */
  liftPp: number | null;
  verdict: FeatureVerdict;
};

export function viewFeature(row: FeatureRow): FeatureView {
  const label =
    FEATURE_LABELS[row.kind as ActivityKind] ?? SURFACE_FEATURE_LABELS[row.kind] ?? row.kind;
  const base: FeatureView = {
    kind: row.kind,
    label,
    users: row.users,
    events: row.events,
    usedRate: null,
    unusedRate: null,
    liftPp: null,
    verdict: "ok",
  };

  // Nobody has ever used it. Either there is no emitter or nobody found it —
  // both mean "no signal here", and neither is a verdict on the feature.
  if (row.users === 0) return { ...base, verdict: "dead" };

  // A lift needs both arms. Below the floor we show adoption and withhold rates.
  if (row.usedEligible < MIN_LIFT_N || row.unusedEligible < MIN_LIFT_N) {
    return { ...base, verdict: "thin" };
  }

  const usedRate = pct(row.usedRetained, row.usedEligible);
  const unusedRate = pct(row.unusedRetained, row.unusedEligible);
  return { ...base, usedRate, unusedRate, liftPp: usedRate - unusedRate, verdict: "ok" };
}

export function viewFeatures(rows: readonly FeatureRow[]): FeatureView[] {
  return rows
    .filter((r) => !TELEMETRY_KINDS.includes(r.kind))
    .map(viewFeature)
    .sort((a, b) => b.users - a.users || b.events - a.events);
}

// ── Exam segments ───────────────────────────────────────────────────────────

/**
 * Declared target exam (student_profiles.target_exams). NOTE: the column is a
 * text[], so a student declaring two exams appears in BOTH segments. Segments
 * therefore overlap and do NOT sum to the roster — nothing here divides by a
 * roster total, and the page says so.
 */
export type SegmentRow = {
  exam: string;
  students: number;
  signalled: number;
  retD28: number;
};

export type SegmentView = {
  exam: string;
  students: number;
  signalled: number;
  signalPct: number | null;
  d28Pct: number | null;
  thin: boolean;
};

export function viewSegment(row: SegmentRow): SegmentView {
  const thin = row.students < MIN_SEGMENT_N;
  return {
    exam: row.exam,
    students: row.students,
    signalled: row.signalled,
    signalPct: thin ? null : pct(row.signalled, row.students),
    d28Pct: thin ? null : pct(row.retD28, row.students),
    thin,
  };
}

export function viewSegments(rows: readonly SegmentRow[]): SegmentView[] {
  return rows.map(viewSegment).sort((a, b) => b.students - a.students);
}

// ── Mock abandonment ────────────────────────────────────────────────────────

export type AttemptCounts = {
  started: number;
  submitted: number;
  /** status = 'expired'. */
  expired: number;
  /** status = 'in_progress' but the timer has run out — abandoned in practice. */
  stranded: number;
  /** status = 'in_progress' and still inside its window — not yet resolved. */
  live: number;
};

export type AbandonmentView = {
  started: number;
  submitted: number;
  /** Attempts that have had their chance: everything except the still-live ones. */
  resolved: number;
  abandoned: number;
  pct: number;
};

export function abandonment(c: AttemptCounts): AbandonmentView {
  const resolved = c.started - c.live;
  const abandoned = c.expired + c.stranded;
  return { started: c.started, submitted: c.submitted, resolved, abandoned, pct: pct(abandoned, resolved) };
}

// ── Perceived difficulty ────────────────────────────────────────────────────

export type DifficultyCounts = {
  tooEasy: number;
  justRight: number;
  tooHard: number;
  responses: number;
};

export type DifficultyView = {
  counts: DifficultyCounts;
  /** Shares OF RESPONDENTS — never of submissions, which most respondents skip. */
  tooEasyPct: number;
  justRightPct: number;
  tooHardPct: number;
  /** Responses as a share of submitted attempts; null when nothing was submitted. */
  responseRate: number | null;
};

export function viewDifficulty(input: {
  counts: DifficultyCounts;
  submitted: number;
}): DifficultyView {
  const { counts, submitted } = input;
  return {
    counts,
    tooEasyPct: pct(counts.tooEasy, counts.responses),
    justRightPct: pct(counts.justRight, counts.responses),
    tooHardPct: pct(counts.tooHard, counts.responses),
    responseRate: submitted > 0 ? pct(counts.responses, submitted) : null,
  };
}

// ── NPS ─────────────────────────────────────────────────────────────────────

export type NpsView = {
  rollup: NpsRollup;
  /** Students who met the prompt's engagement gate (>= 2 completed mocks). */
  eligible: number;
  responseRate: number | null;
  reportable: boolean;
};

export function viewNps(input: { scores: readonly number[]; eligible: number }): NpsView {
  const rollup = computeNps(input.scores.map((score) => ({ score })));
  return {
    rollup,
    eligible: input.eligible,
    responseRate: input.eligible > 0 ? pct(rollup.count, input.eligible) : null,
    reportable: rollup.count >= MIN_NPS_RESPONSES,
  };
}

// ── Funnel ──────────────────────────────────────────────────────────────────

export type FunnelCounts = {
  students: number;
  /** Left ANY persisted signal: activity event, mock attempt, notes row, bookmark. */
  signalled: number;
  /** Active on >= 2 distinct IST days, counted from append-only signals only. */
  returned: number;
  /** Submitted >= 2 mocks. */
  habit: number;
};

export type FunnelStep = { label: string; count: number; pctOfPrev: number };

export function signalFunnel(c: FunnelCounts): FunnelStep[] {
  const steps: { label: string; count: number }[] = [
    { label: "Student accounts", count: c.students },
    { label: "Left a recorded signal", count: c.signalled },
    { label: "Came back a second day", count: c.returned },
    { label: "Sat 2+ mocks", count: c.habit },
  ];
  return steps.map((s, i) => ({
    ...s,
    pctOfPrev: i === 0 ? 100 : pct(s.count, steps[i - 1].count),
  }));
}

// ── Instrumentation coverage ────────────────────────────────────────────────

export type Tracked = "full" | "partial" | "none";

export type SurfaceCoverage = {
  surface: string;
  /** Activity kinds this surface emits (validated against ACTIVITY_KINDS in the spec). */
  kinds: ActivityKind[];
  tracked: Tracked;
  /**
   * WHAT does the recording — the table or mechanism, named so a reader can go
   * check. Not every tracked surface writes to user_activity (exports have their
   * own table, acquisition is a profile column), so `kinds` alone cannot answer
   * "how do we know this?" and a map that cannot answer it rots silently.
   */
  via: string;
  /** What a PMF read cannot see because of this gap. */
  lost: string;
};

/**
 * What each product surface records when a student uses it. This is on the page
 * because every rate above has a partly-invisible denominator, and the reader
 * needs to know which parts. Audited 2026-09-17 against the route handlers.
 */
export const SURFACE_COVERAGE: SurfaceCoverage[] = [
  {
    surface: "Timed mocks (/mock)",
    via: "user_activity + mock_attempts",
    kinds: ["mock_started", "mock_submitted", "answer_wrong"],
    tracked: "full",
    lost: "",
  },
  {
    surface: "Saved questions (/saved)",
    via: "user_activity + question_bookmarks",
    kinds: ["question_bookmarked"],
    tracked: "full",
    lost: "",
  },
  {
    surface: "Paper download / export",
    via: "export_events (migration 0104)",
    kinds: [],
    tracked: "full",
    lost: "",
  },
  {
    surface: "Question bank (/browse, /questions)",
    via: "user_activity via the reveal beacon (0105)",
    kinds: ["question_practiced"],
    tracked: "partial",
    lost: "Only a SIGNED-IN student's answer reveals are recorded. Anonymous visitors — most of the traffic, and the whole point of the 317 landing pages — leave nothing, by design: attributing them over time would need a persistent device id, on an audience that is largely under 18.",
  },
  {
    surface: "Board reader (/board)",
    via: "user_activity via the reveal beacon (0105)",
    kinds: ["question_practiced"],
    tracked: "partial",
    lost: "Answer reveals are recorded (signed-in only); opening or reading a chapter is not.",
  },
  {
    surface: "Notes (/notes)",
    via: "user_activity + notes_progress",
    kinds: ["note_checkpoint", "chapter_mastered"],
    tracked: "partial",
    lost: "notes_progress is a STATE row, not an event log: last_viewed_at is overwritten, so reading history is lost — we know THAT a subtopic was read, never when it was read before.",
  },
  {
    surface: "Acquisition / signup source",
    via: "student_profiles.acq_* (migration 0106)",
    kinds: [],
    tracked: "partial",
    lost: "First-touch channel is captured for signups from 2026-09-17 onward. The 330 existing accounts have NULL and are not backfillable — the information was never collected, so 'unknown' must stay its own bucket and never be folded into 'direct'.",
  },
  {
    surface: "Guides (/guide)",
    via: "user_activity via the reveal beacon (surface='guide')",
    kinds: ["question_practiced"],
    tracked: "partial",
    lost: "Answer reveals inside a worked example are recorded (signed-in only); reading the prose — a playbook, a trap page, a strategy page — is not. Until 2026-09-17 this row claimed guides were a read-only surface that emits nothing, which was never true: the worked-example card has always had the same three-stage reveal as /browse, and the beacon had simply not been wired into it.",
  },
  {
    surface: "Blog (/blog)",
    via: "nothing",
    kinds: [],
    tracked: "none",
    lost: "The one genuinely unmeasurable surface: a post contains no discrete act, so the only available event is 'viewed' — which clears no learning bar and would outnumber every real signal above. Aggregate volume is approximated by Vercel Analytics instead.",
  },
];

