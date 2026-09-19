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
import type { PracticeSurface } from "@/lib/questions/practiceBatch";

/** Minimum users in EACH arm before a retention lift is reported. */
export const MIN_LIFT_N = 10;
/** Minimum students in a segment before its rates are reported. */
export const MIN_SEGMENT_N = 10;
/** Minimum NPS responses before the headline score is reported. */
export const MIN_NPS_RESPONSES = 10;

/**
 * Minimum share OPPORTUNITIES — attempts finished since the button existed —
 * before the share rate is reported. Below it the counts show and the rate is
 * withheld, like MIN_NPS_RESPONSES.
 */
export const MIN_SHARE_OPPORTUNITIES = 25;

/**
 * When the result-screen share affordance went live (commit 3205f652).
 *
 * THIS CONSTANT IS THE PANEL'S CORRECTNESS. `mock_attempts` holds hundreds of
 * attempts that finished before the button existed, and dividing intents by all
 * of them reports ~0% forever — a dead-feature reading of a feature nobody has
 * had the chance to use. Only attempts submitted at or after this instant are
 * opportunities.
 *
 * It is the COMMIT time, because the deploy time is not recoverable from the
 * repo. That can only over-count opportunities and therefore under-state the
 * rate, which is the same under-claim-never-over-claim direction as
 * src/lib/seo/lastmod.ts.
 */
export const SHARE_LIVE_SINCE = "2026-09-18T05:52:55Z";

/**
 * How the panel names the metric, and the caveat it must carry.
 *
 * A share_events row records that a student tapped the affordance. It does NOT
 * record that anything was sent: navigator.share() resolves when the OS sheet is
 * dismissed and never reports the chosen app, and a wa.me tap can be abandoned
 * in WhatsApp. The honest name is INTENT TO SHARE. These live here rather than
 * in the page because a caveat only does its job where the number is read, and
 * tests/pmf-snapshot.test.ts pins both.
 */
export const SHARE_LABEL = "Intent to share";
export const SHARE_CAVEAT =
  "A row records INTENT to share — a tap on the affordance, not a delivery: the OS sheet never reports whether anything was sent, and a WhatsApp hand-off can be abandoned. Read it alongside the inbound arrivals, never alone.";

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
 * once per QUESTION rather than once per sitting, so listing them beside
 * "Timed mocks" would compare a surface to its own internals.
 *
 * `answer_correct` is CONDITIONAL and must not be read as "questions answered
 * correctly": it fires only where the student had already missed that question,
 * so it measures RECOVERY. Its natural denominator is `answer_wrong`, never the
 * number of questions sat. See lib/mocks/correctEvents.ts.
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
  "question_practiced:board": "Board reader",
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

// ── Share loop (0109) ───────────────────────────────────────────────────────

export type ShareChannelCounts = {
  /** wa.me deep link. */
  whatsapp: number;
  /** navigator.share() — the OS sheet. Destination app UNKNOWN; not a synonym for whatsapp. */
  share: number;
  /** Clipboard copy. */
  copy: number;
};

export type ShareCounts = {
  /** share_events rows. */
  events: number;
  /** Rows where the student ticked "include my score". */
  withScore: number;
  byChannel: ShareChannelCounts;
  /** Per mock, most-shared first. */
  byMock: { slug: string; events: number }[];
  /**
   * Attempts SUBMITTED at or after SHARE_LIVE_SINCE. The only admissible
   * denominator — see that constant.
   */
  opportunities: number;
  /** Accounts created carrying acq_campaign='mock-result' (migration 0106). */
  inboundSignups: number;
};

export type ShareView = {
  counts: ShareCounts;
  /** Intents per opportunity, or null when below the floor. */
  sharePct: number | null;
  /** Share of intents that included the score, or null when there were no intents. */
  scoreOptInPct: number | null;
  /** Signups per intent, or null when nothing was shared. */
  signupsPerShare: number | null;
  reportable: boolean;
};

/**
 * Interpret the share loop.
 *
 * `opportunities` is an INPUT, not something derived here from a total: the
 * distinction between "attempts" and "attempts that could have seen the button"
 * is the one this panel exists to get right, and a core that recomputed it from
 * a grand total would be free to get it wrong.
 *
 * Note the asymmetry with the floor: a zero rate over a real sample IS reported.
 * The floor suppresses noise, not bad news — once enough students have seen the
 * button, "none of them tapped it" is a finding, not an absence of one.
 */
export function viewShare(counts: ShareCounts): ShareView {
  const reportable = counts.opportunities >= MIN_SHARE_OPPORTUNITIES;
  return {
    counts,
    sharePct: reportable ? pct(counts.events, counts.opportunities) : null,
    scoreOptInPct: counts.events > 0 ? pct(counts.withScore, counts.events) : null,
    signupsPerShare: counts.events > 0 ? pct(counts.inboundSignups, counts.events) : null,
    reportable,
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
  /**
   * For a surface that records answer reveals: the PracticeSurface its rows are
   * written under, and therefore which feature row it lands in.
   *
   * It exists to be ASSERTED, not rendered. Twice now a surface has shared the
   * bank's value and been measured as the bank — /guide until 2026-09-17,
   * /board until 2026-09-18 — and in both cases everything visible from outside
   * looked correct: the events were written, the coverage row claimed tracking,
   * and only the call site showed the argument was missing. The spec now
   * requires a bijection between the rows claiming `question_practiced` and
   * PRACTICE_SURFACES, so a fourth reveal surface cannot repeat it.
   */
  practiceSurface?: PracticeSurface;
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
    surface: "Share the paper (mock result screen)",
    via: "share_events (0109) + acq_campaign='mock-result' (0106)",
    // A distribution act, not a learning one, so it is deliberately NOT a
    // user_activity kind — see the 0109 header. It still belongs on this map:
    // it is a product surface a student uses, and the map answers "what do we
    // know when they do?".
    kinds: [],
    tracked: "partial",
    lost: "Whether anything was actually SENT. navigator.share() resolves when the OS sheet is dismissed and never reports the chosen app, and a WhatsApp hand-off can be abandoned — so the outbound number is intent, not delivery. Delivery is only ever visible as a tagged inbound arrival.",
  },
  {
    surface: "Weak-area drills (/drill)",
    via: "user_activity — server-graded, one row per answer plus one per drill",
    kinds: ["drill_completed", "answer_correct", "answer_wrong"],
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
    via: "user_activity via the reveal beacon (surface='bank')",
    kinds: ["question_practiced"],
    practiceSurface: "bank",
    tracked: "partial",
    lost: "Only a SIGNED-IN student's answer reveals are recorded. Anonymous visitors — most of the traffic, and the whole point of the 317 landing pages — leave nothing, by design: attributing them over time would need a persistent device id, on an audience that is largely under 18.",
  },
  {
    surface: "Board reader (/board)",
    via: "user_activity via the reveal beacon (surface='board', migration 0108)",
    kinds: ["question_practiced"],
    practiceSurface: "board",
    tracked: "partial",
    lost: "Answer reveals are recorded (signed-in only); opening or reading a chapter is not. The reader is reported separately only from 2026-09-18: it shared the bank's reveal hook and wrote no surface of its own, so every earlier reveal is indistinguishable from a /browse one and stays in the bank's row. Not backfillable — the distinction was never recorded.",
  },
  {
    surface: "Notes (/notes)",
    via: "user_activity + notes_progress",
    kinds: ["note_checkpoint", "chapter_mastered"],
    tracked: "partial",
    lost: "notes_progress is a STATE row, not an event log: last_viewed_at is overwritten, so reading history is lost — we know THAT a subtopic was read, never when it was read before.",
  },
  {
    surface: "Daily quiz (/quiz)",
    via: "user_activity on submit (signed-in) + quiz_leads by mobile (anon)",
    kinds: ["quiz_taken"],
    tracked: "partial",
    lost: "Two populations that do not reconcile, by construction. A SIGNED-IN student's submit writes a quiz_taken row; an ANONYMOUS one — the majority, and the entire purpose of a cold-traffic funnel — is captured as a quiz_leads row keyed by MOBILE, an identity space with no auth.users to attach activity to. Neither can be converted into the other, so quiz adoption below counts signed-in takers only and is a floor, not a total. Recorded from 2026-09-18: quiz_taken was in the allowlist and the DB CHECK from the start with no emitter anywhere, so every earlier attempt is unrecoverable.",
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
    via: "user_activity via the reveal beacon (surface='guide', migration 0107)",
    kinds: ["question_practiced"],
    practiceSurface: "guide",
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

