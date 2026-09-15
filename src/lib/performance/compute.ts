/**
 * The student-performance pure core. NO I/O — every number the
 * /dashboard/students/[id]/performance page shows is computed here, from the
 * payload get_student_performance (0099) returns.
 *
 * WHY PURE, AND WHY AUTHORIZATION IS NOT IN HERE. The superadmin gate lives on
 * the route. That is what makes the later student-facing version a new page
 * calling this same core with the anon client, rather than a refactor of it.
 *
 * WHAT IS IMPORTED FROM nda-tracker, and what is not. The METHOD comes from
 * src/lib/analytics there — recency weighting, attempt quality, consistency
 * sigma, trend, the expected-marks projection. The NUMBERS do not: its
 * NDA_FREQ_BY_SUBJECT is a hand-transcribed copy of this bank frozen at
 * 2026-05-17, so weightage is derived live from `payload.weightage` instead.
 *
 * WHAT THIS CORE DOES NOT DECIDE: whether an answer is right. That is
 * verdictFor (src/lib/mocks/answers.ts), the same helper gradeMock and the
 * review page call. A second implementation here is precisely the drift this
 * repo has paid for twice.
 */
import { verdictFor, type MockAnswerKey, type SavedResponse } from "@/lib/mocks/answers";
import {
  factRef,
  type PerfAttempt,
  type PerfDifficulty,
  type PerfFact,
  type StudentPerformancePayload,
} from "./types";

export type PerfInput = StudentPerformancePayload;

/**
 * Below this share of a paper answered, the attempt is abandonment, not
 * evidence. Same constant and same reasoning as scripts/itemstats/rollup-vault.ts:
 * 45 graded attempts on production answered ZERO questions.
 */
export const ENGAGEMENT_FLOOR = 0.2;

/** Recency: full weight today, half at 30 days, floored at 0.2 from 60 on. */
const RECENCY_SPAN_DAYS = 60;
const MIN_RECENCY = 0.2;

/** A skip is weaker evidence than an attempt, so it carries half the weight. */
const SKIP_WEIGHT = 0.5;

/** Mastery bands, shared by the chapter bars and the concept-graph focus list. */
export const WEAK_BELOW = 0.5;
export const MASTERED_AT = 0.7;

/**
 * Below this many JUDGED questions, a row's accuracy is a number but not yet a
 * finding, and every consumer must say so.
 *
 * This is the single biggest difference between this bank and the OMR sittings
 * nda-tracker reads. There a proctored student attempts most of the paper; here
 * the median attempt answers 36% of it, so chapter rows routinely rest on one
 * or two questions. Measured on the heaviest student in production: 6 answered
 * of 173 NDA History questions (a confident-looking "33%"), and an NDA
 * Economics lane reading "100%" off two. The row still renders — hiding it
 * would lose the fact that they skipped everything — but it is marked `thin`
 * and the UI shows the denominator next to the percentage.
 */
export const MIN_JUDGED_FOR_CLAIM = 3;

const DAY_MS = 86_400_000;

// ── primitives ──────────────────────────────────────────────────────────────

/**
 * How much a sitting from `daysSince` ago counts.
 *
 * Clamped at BOTH ends. The floor keeps an old attempt as weak evidence rather
 * than no evidence; the ceiling matters because `started_at` is stamped by the
 * server but compared against the render clock, and an unclamped future date
 * would weight one attempt above every other.
 */
export function recencyWeight(daysSince: number): number {
  if (!Number.isFinite(daysSince)) return MIN_RECENCY;
  return Math.min(1, Math.max(MIN_RECENCY, 1 - daysSince / RECENCY_SPAN_DAYS));
}

/** Population sigma — matching nda-tracker's `stdDev`. The sample form (n-1)
 *  shifts real students across a label boundary; see the pinned test. */
export function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export type Trend = "improving" | "declining" | "volatile" | "stable" | "unknown";

/**
 * Direction of travel across sittings, oldest first.
 *
 * "unknown" below two points rather than "stable": one sitting is not a flat
 * trend, it is no trend, and rendering it as stable asserts something we have
 * not measured. Volatility needs three points — two far-apart scores are a
 * step, not a pattern.
 */
export function computeTrend(scores: number[]): Trend {
  if (scores.length < 2) return "unknown";
  if (scores.length >= 3 && stdDev(scores) > 0.2) return "volatile";
  const diff = scores[scores.length - 1] - scores[scores.length - 2];
  if (diff > 0.1) return "improving";
  if (diff < -0.1) return "declining";
  return "stable";
}

export type Consistency = { sd: number; label: "Consistent" | "Moderate" | "Volatile" };

/** Spread of percent-of-max across sittings. Null below two — see computeTrend. */
export function consistency(pcts: number[]): Consistency | null {
  if (pcts.length < 2) return null;
  const sd = stdDev(pcts);
  if (sd < 0.1) return { sd, label: "Consistent" };
  if (sd < 0.2) return { sd, label: "Moderate" };
  return { sd, label: "Volatile" };
}

// ── which attempts count ────────────────────────────────────────────────────

export type AttemptSelection = {
  kept: PerfAttempt[];
  inProgress: number;
  retakesDropped: number;
  belowFloor: number;
};

/**
 * The intake filter, and the whole reason these numbers are comparable.
 *
 *   1. In-progress attempts are not evidence — they are not graded yet.
 *   2. FIRST sitting of each paper only. A retake is contaminated by
 *      construction: the review screen shows the answers. 23% of graded
 *      attempts on production are retakes.
 *   3. An attempt answering less than ENGAGEMENT_FLOOR of its paper is an
 *      abandoned tab, not a student skipping hard items.
 *
 * Every exclusion is COUNTED, not just applied — the page owes the reader the
 * line "2 retakes excluded" rather than quietly showing different totals from
 * the roster.
 */
export function selectAttempts(attempts: PerfAttempt[], facts: PerfFact[]): AttemptSelection {
  const answeredByAttempt = new Map<string, number>();
  for (const f of facts) {
    if (isAnsweredFact(f)) answeredByAttempt.set(f.a, (answeredByAttempt.get(f.a) ?? 0) + 1);
  }

  const graded: PerfAttempt[] = [];
  let inProgress = 0;
  for (const a of attempts) {
    if (a.status === "in_progress" || a.score === null) inProgress++;
    else graded.push(a);
  }

  // Earliest per mock. Sorting a copy — never the caller's array.
  const byDate = [...graded].sort((x, y) => x.startedAt.localeCompare(y.startedAt));
  const seen = new Set<string>();
  const firsts: PerfAttempt[] = [];
  let retakesDropped = 0;
  for (const a of byDate) {
    if (seen.has(a.mockSlug)) {
      retakesDropped++;
      continue;
    }
    seen.add(a.mockSlug);
    firsts.push(a);
  }

  const kept: PerfAttempt[] = [];
  let belowFloor = 0;
  for (const a of firsts) {
    const answered = answeredByAttempt.get(a.attemptId) ?? 0;
    const share = a.totalQuestions > 0 ? answered / a.totalQuestions : 0;
    if (share < ENGAGEMENT_FLOOR) belowFloor++;
    else kept.push(a);
  }

  return { kept, inProgress, retakesDropped, belowFloor };
}

// ── fact helpers ────────────────────────────────────────────────────────────

/** The saved response in the shape verdictFor expects. */
function responseOf(f: PerfFact): SavedResponse {
  return { selectedLabel: f.r, numericResponse: f.rn };
}

/** The key in the shape verdictFor expects, or null when the bank lost it. */
function keyOf(f: PerfFact): MockAnswerKey | null {
  if (f.f === "numeric") return f.kn === null ? null : { kind: "numeric", value: f.kn };
  return f.k === null ? null : { kind: "mcq", label: f.k };
}

function isAnsweredFact(f: PerfFact): boolean {
  return f.r !== null || f.rn !== null;
}

/** 1 right, -1 wrong, 0 blank — delegated, never re-derived. */
export function verdictOfFact(f: PerfFact): 1 | -1 | 0 {
  return verdictFor(keyOf(f), responseOf(f), f.g);
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Percent, or null when the denominator is zero. NEVER 0 for "no data": a zero
 *  asserts they got everything wrong and sorts them last. */
function pct(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return Math.round((numerator / denominator) * 100);
}

// ── roll-up shapes ──────────────────────────────────────────────────────────

type Tally = {
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  seenBlank: number;
  neverReached: number;
  weightedSum: number;
  weightTotal: number;
  secs: number[];
  /** Ids of the questions answered WRONG, for the audit's drill-down link. */
  wrongIds: string[];
  /** per attempt, oldest first: share correct of the questions in this bucket */
  perAttempt: Map<string, { correct: number; total: number; at: string }>;
};

const emptyTally = (): Tally => ({
  total: 0, answered: 0, correct: 0, wrong: 0, seenBlank: 0, neverReached: 0,
  weightedSum: 0, weightTotal: 0, secs: [], wrongIds: [], perAttempt: new Map(),
});

function addToTally(t: Tally, f: PerfFact, verdict: 1 | -1 | 0, weight: number, at: string) {
  t.total++;
  if (!f.rc) {
    t.neverReached++;
  } else if (!isAnsweredFact(f) && !f.g) {
    t.seenBlank++;
    // A skip is evidence, at half weight — the student saw it and passed.
    t.weightTotal += weight * SKIP_WEIGHT;
    t.secs.push(f.ts);
  } else {
    t.answered++;
    if (verdict === 1) t.correct++;
    else if (verdict === -1) {
      t.wrong++;
      t.wrongIds.push(f.q);
    }
    t.weightedSum += (verdict === 1 ? 1 : 0) * weight;
    t.weightTotal += weight;
    t.secs.push(f.ts);
  }

  // Trend is measured over ATTEMPTED questions only. Including unreached ones
  // would read "declining" for a student who simply ran out of time.
  if (f.rc && (isAnsweredFact(f) || f.g)) {
    const row = t.perAttempt.get(f.a) ?? { correct: 0, total: 0, at };
    row.total++;
    if (verdict === 1) row.correct++;
    t.perAttempt.set(f.a, row);
  }
}

function trendOf(t: Tally): Trend {
  const rows = [...t.perAttempt.values()].sort((a, b) => a.at.localeCompare(b.at));
  // A single question in a sitting is noise, not a data point on a trend line.
  const usable = rows.filter((r) => r.total >= 2);
  if (usable.length < 2) return "unknown";
  return computeTrend(usable.map((r) => r.correct / r.total));
}

export type SubtopicRow = {
  chapter: string;
  subtopic: string;
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  seenBlank: number;
  neverReached: number;
  /** Questions with a usable verdict: correct + wrong. THE DENOMINATOR behind
   *  `accuracy`, carried so no surface can print a percentage without it. */
  judged: number;
  /** True when `judged` is below MIN_JUDGED_FOR_CLAIM — a number, not a finding. */
  thin: boolean;
  /** correct / judged, 0-100. Null when nothing was judged. */
  accuracy: number | null;
  /** recency-weighted 0-1, folding skips in at half weight */
  weightedScore: number;
  trend: Trend;
  medianSecs: number | null;
  /** The questions they got wrong here, so the audit can open exactly those on
   *  /browse rather than a filter that merely approximates them. */
  wrongQuestionIds: string[];
};

export type ChapterRow = Omit<SubtopicRow, "subtopic"> & { subtopics: SubtopicRow[] };

function finishRow(t: Tally, chapter: string, subtopic: string): SubtopicRow {
  return {
    chapter,
    subtopic,
    total: t.total,
    answered: t.answered,
    correct: t.correct,
    wrong: t.wrong,
    seenBlank: t.seenBlank,
    neverReached: t.neverReached,
    judged: t.correct + t.wrong,
    thin: t.correct + t.wrong < MIN_JUDGED_FOR_CLAIM,
    // correct / (correct + wrong), NOT correct / answered. A question the
    // student answered but whose key the bank has lost scores verdict 0, and
    // leaving it in the denominator would penalise them for OUR defect —
    // the same reasoning that makes verdictFor return 0 rather than -1.
    accuracy: pct(t.correct, t.correct + t.wrong),
    weightedScore: t.weightTotal > 0 ? t.weightedSum / t.weightTotal : 0,
    trend: trendOf(t),
    medianSecs: median(t.secs),
    wrongQuestionIds: t.wrongIds,
  };
}

// ── coverage + difficulty ───────────────────────────────────────────────────

export type Coverage = {
  inPaper: number;
  reached: number;
  answered: number;
  seenBlank: number;
  neverReached: number;
  medianSecs: number | null;
  /** Median seconds over the first vs last fifth of each paper. The pair is the
   *  rushed-the-tail readout; both null when too little of the paper was timed. */
  headMedianSecs: number | null;
  tailMedianSecs: number | null;
};

export type DifficultyRow = {
  difficulty: PerfDifficulty;
  answered: number;
  correct: number;
  accuracy: number | null;
};

const DIFFICULTIES: PerfDifficulty[] = ["EASY", "MODERATE", "HARD"];

// ── projection ──────────────────────────────────────────────────────────────

export type ProjectionRow = {
  chapter: string;
  marksAtStake: number;
  projected: number;
  gap: number;
  accuracy: number | null;
  wrongRate: number | null;
  /** False when the student has never been tested on this chapter — the row
   *  stays, carrying its full marks as gap, because an untested chapter worth
   *  150 marks is the largest gap there is. */
  tested: boolean;
};

export type Projection = { total: number; ceiling: number; rows: ProjectionRow[] };

/**
 * Expected marks from an accuracy + wrong-rate against a marks pool.
 *
 * `penaltyRatio` is |negMarks| / marks for the questions actually sat, so it is
 * 0.332 on NDA, 0.25 on NEET, and ZERO on MHT-CET. nda-tracker hardcodes 0.33 —
 * correct for its single exam, wrong for four of the five schemes that appear
 * in one production payload here.
 */
function expectedMarks(
  marksAtStake: number,
  accuracy: number,
  wrongRate: number,
  penaltyRatio: number
): number {
  return Math.max(0, accuracy * marksAtStake - wrongRate * marksAtStake * penaltyRatio);
}

// ── the whole page ──────────────────────────────────────────────────────────

export type Lane = {
  exam: string;
  subject: string;
  attempts: number;
  /** correct + wrong across the lane — the denominator behind `accuracy`. */
  judged: number;
  /** True when the whole lane rests on fewer than MIN_JUDGED_FOR_CLAIM answers. */
  thin: boolean;
  /** correct / judged across the lane, 0-100. Null when nothing was judged. */
  accuracy: number | null;
  coverage: Coverage;
  difficulty: DifficultyRow[];
  chapters: ChapterRow[];
  /** Subtopics with at least one wrong answer, worst first. */
  wrongAudit: SubtopicRow[];
  /** Subtopics SEEN and left blank, worst first. Deliberately excludes
   *  never-reached: a question the student never got to says nothing about
   *  the subtopic, only about the clock. */
  skipAudit: SubtopicRow[];
  projection: Projection | null;
};

export type Summary = {
  graded: number;
  inProgress: number;
  retakesDropped: number;
  belowFloor: number;
  latest: {
    attemptId: string;
    title: string;
    slug: string;
    at: string;
    score: number;
    maxScore: number;
    pct: number;
  } | null;
  /** Change vs the previous sitting in percentage POINTS. Never raw marks:
   *  papers run 100/300/600 maxima, so a raw difference can inverts its sign. */
  deltaPoints: number | null;
  attemptQuality: number | null;
  consistency: Consistency | null;
};

export type Performance = { summary: Summary; lanes: Lane[] };

export function buildPerformance(payload: PerfInput, now: Date): Performance {
  const sel = selectAttempts(payload.attempts, payload.facts);
  const keptById = new Map(sel.kept.map((a) => [a.attemptId, a]));
  const facts = payload.facts.filter((f) => keptById.has(f.a));

  // ── summary ──
  const ordered = [...sel.kept].sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  const scored = ordered.filter(
    (a) => a.score !== null && a.maxScore !== null && a.maxScore > 0
  );
  const pcts = scored.map((a) => (a.score as number) / (a.maxScore as number));
  const last = scored[scored.length - 1];
  const prev = scored[scored.length - 2];

  // Attempt quality is correct / (correct + wrong) — the tracker's definition.
  // A skipped question is not a wrong answer, and an unjudgeable one (key lost
  // upstream) is neither; both stay out of the denominator.
  let correct = 0;
  let wrongTotal = 0;
  for (const f of facts) {
    const v = verdictOfFact(f);
    if (v === 1) correct++;
    else if (v === -1) wrongTotal++;
  }

  const summary: Summary = {
    graded: sel.kept.length,
    inProgress: sel.inProgress,
    retakesDropped: sel.retakesDropped,
    belowFloor: sel.belowFloor,
    latest: last
      ? {
          attemptId: last.attemptId,
          title: last.mockTitle,
          slug: last.mockSlug,
          at: last.startedAt,
          score: last.score as number,
          maxScore: last.maxScore as number,
          pct: Math.round(((last.score as number) / (last.maxScore as number)) * 100),
        }
      : null,
    deltaPoints:
      last && prev
        ? Math.round(
            ((last.score as number) / (last.maxScore as number) -
              (prev.score as number) / (prev.maxScore as number)) *
              100
          )
        : null,
    attemptQuality: pct(correct, correct + wrongTotal),
    consistency: consistency(pcts),
  };

  // ── lanes: (exam, subject). Exam comes from the ATTEMPT, subject from the
  //    FACT — which is what splits an NDA GAT paper's lumped 100-question
  //    "General Knowledge" section into the eight subjects it really holds. ──
  const lanes = new Map<string, { exam: string; subject: string; facts: PerfFact[] }>();
  for (const f of facts) {
    const a = keptById.get(f.a)!;
    const subject = payload.dims.subjects[f.s] ?? "";
    const key = `${a.examName} ${subject}`;
    const lane = lanes.get(key) ?? { exam: a.examName, subject, facts: [] };
    lane.facts.push(f);
    lanes.set(key, lane);
  }

  const out: Lane[] = [];
  for (const lane of lanes.values()) {
    out.push(buildLane(lane.exam, lane.subject, lane.facts, keptById, payload, now));
  }
  out.sort((a, b) => b.coverage.answered - a.coverage.answered || a.subject.localeCompare(b.subject));

  return { summary, lanes: out };
}

function buildLane(
  exam: string,
  subject: string,
  laneFacts: PerfFact[],
  keptById: Map<string, PerfAttempt>,
  payload: PerfInput,
  now: Date
): Lane {
  const byChapter = new Map<string, { tally: Tally; subs: Map<string, Tally> }>();
  const cov = { inPaper: 0, reached: 0, answered: 0, seenBlank: 0, neverReached: 0 };
  const secs: number[] = [];
  const headSecs: number[] = [];
  const tailSecs: number[] = [];
  const diff = new Map<PerfDifficulty, { answered: number; correct: number }>();
  let marksSum = 0;
  let negSum = 0;
  let markedQuestions = 0;

  for (const f of laneFacts) {
    const attempt = keptById.get(f.a)!;
    const days = (now.getTime() - Date.parse(attempt.startedAt)) / DAY_MS;
    const weight = recencyWeight(days);
    const verdict = verdictOfFact(f);
    const ref = factRef(f, payload.dims);

    const chap = byChapter.get(ref.chapter) ?? { tally: emptyTally(), subs: new Map() };
    const sub = chap.subs.get(ref.subtopic) ?? emptyTally();
    addToTally(chap.tally, f, verdict, weight, attempt.startedAt);
    addToTally(sub, f, verdict, weight, attempt.startedAt);
    chap.subs.set(ref.subtopic, sub);
    byChapter.set(ref.chapter, chap);

    cov.inPaper++;
    const answered = isAnsweredFact(f);
    if (!f.rc) {
      cov.neverReached++;
    } else {
      cov.reached++;
      if (answered) cov.answered++;
      else cov.seenBlank++;
      secs.push(f.ts);
      // Position within the WHOLE paper, not within the lane — pacing is a fact
      // about the sitting, and a GAT subject can sit anywhere in the 150.
      const share = attempt.totalQuestions > 0 ? f.p / attempt.totalQuestions : 0;
      if (share <= 0.2) headSecs.push(f.ts);
      if (share > 0.8) tailSecs.push(f.ts);
    }

    if (answered || f.g) {
      const d = diff.get(f.d) ?? { answered: 0, correct: 0 };
      d.answered++;
      if (verdict === 1) d.correct++;
      diff.set(f.d, d);
      // The real marking scheme of the questions actually sat.
      marksSum += f.m;
      negSum += Math.abs(f.nm);
      markedQuestions++;
    }
  }

  const chapters: ChapterRow[] = [...byChapter.entries()]
    .map(([name, { tally, subs }]) => {
      const row = finishRow(tally, name, name);
      const subtopics = [...subs.entries()]
        .map(([sName, sTally]) => finishRow(sTally, name, sName))
        .sort(
          (a, b) =>
            Number(a.judged === 0) - Number(b.judged === 0) ||
            a.weightedScore - b.weightedScore
        );
      const { subtopic: _drop, ...rest } = row;
      return { ...rest, subtopics };
    })
    // Weakest MEASURED chapter first; chapters with no judged answer at all sink
    // to the bottom. Sorting purely by weightedScore floats a never-attempted
    // chapter to the top as "0%", which reads as the student's worst topic when
    // it is really a coverage gap — that belongs to the skip audit, not here.
    .sort(
      (a, b) =>
        Number(a.judged === 0) - Number(b.judged === 0) ||
        a.weightedScore - b.weightedScore
    );

  const allSubs = chapters.flatMap((c) => c.subtopics);
  const laneCorrect = chapters.reduce((s, c) => s + c.correct, 0);
  const laneWrong = chapters.reduce((s, c) => s + c.wrong, 0);

  const penaltyRatio = markedQuestions > 0 && marksSum > 0 ? negSum / marksSum : 0;

  return {
    exam,
    subject,
    attempts: new Set(laneFacts.map((f) => f.a)).size,
    judged: laneCorrect + laneWrong,
    thin: laneCorrect + laneWrong < MIN_JUDGED_FOR_CLAIM,
    accuracy: pct(laneCorrect, laneCorrect + laneWrong),
    coverage: {
      ...cov,
      medianSecs: median(secs),
      headMedianSecs: median(headSecs),
      tailMedianSecs: median(tailSecs),
    },
    difficulty: DIFFICULTIES.map((d) => {
      const row = diff.get(d);
      return {
        difficulty: d,
        answered: row?.answered ?? 0,
        correct: row?.correct ?? 0,
        accuracy: pct(row?.correct ?? 0, row?.answered ?? 0),
      };
    }),
    chapters,
    wrongAudit: allSubs.filter((r) => r.wrong > 0).sort((a, b) => b.wrong - a.wrong),
    skipAudit: allSubs.filter((r) => r.seenBlank > 0).sort((a, b) => b.seenBlank - a.seenBlank),
    projection: buildProjection(exam, subject, chapters, keptById, laneFacts, payload, penaltyRatio),
  };
}

function buildProjection(
  exam: string,
  subject: string,
  chapters: ChapterRow[],
  keptById: Map<string, PerfAttempt>,
  laneFacts: PerfFact[],
  payload: PerfInput,
  penaltyRatio: number
): Projection | null {
  const shares = payload.weightage.filter((w) => w.exam === exam && w.subject === subject);
  if (shares.length === 0) return null;
  const bankTotal = shares.reduce((s, w) => s + w.q, 0);
  if (bankTotal <= 0) return null;

  // The lane's marks ceiling: what this subject is worth in the real paper.
  // Derived from the marks of the questions actually sat in it, scaled to the
  // full paper — a GAT subject is a slice of 600, not the whole of it.
  const attemptIds = new Set(laneFacts.map((f) => f.a));
  let ceiling = 0;
  for (const id of attemptIds) {
    const attempt = keptById.get(id);
    if (!attempt) continue;
    const inLane = laneFacts.filter((f) => f.a === id);
    const perQuestion = inLane.reduce((s, f) => s + f.m, 0);
    ceiling = Math.max(ceiling, perQuestion);
  }
  if (ceiling <= 0) return null;

  const byName = new Map(chapters.map((c) => [c.chapter, c]));
  const rows: ProjectionRow[] = shares.map((w) => {
    const marksAtStake = (w.q / bankTotal) * ceiling;
    const c = byName.get(w.chapter);
    if (!c || c.correct + c.wrong === 0) {
      return {
        chapter: w.chapter,
        marksAtStake,
        projected: 0,
        gap: marksAtStake,
        accuracy: null,
        wrongRate: null,
        tested: false,
      };
    }
    const accuracy = c.weightedScore;
    const judged = c.correct + c.wrong;
    const wrongRate = judged > 0 ? c.wrong / judged : 0;
    const projected = expectedMarks(marksAtStake, accuracy, wrongRate, penaltyRatio);
    return {
      chapter: w.chapter,
      marksAtStake,
      projected,
      gap: marksAtStake - projected,
      accuracy: Math.round(accuracy * 100),
      wrongRate: Math.round(wrongRate * 100),
      tested: true,
    };
  });

  rows.sort((a, b) => b.gap - a.gap);
  return {
    total: Math.round(rows.reduce((s, r) => s + r.projected, 0)),
    ceiling: Math.round(ceiling),
    rows,
  };
}
