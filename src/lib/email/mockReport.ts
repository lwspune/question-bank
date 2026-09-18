/**
 * The per-attempt mock report: what ONE sitting can honestly say about a
 * student, and the one thing it cannot.
 *
 * Pure — no I/O. Unit-tested in tests/email-mock-report.test.ts. Everything
 * here is derived from the `get_student_performance` payload (migration 0099),
 * so the email costs ONE round trip and shares its judgement with the
 * performance page rather than re-deriving it: correctness comes from
 * verdictOfFact, which delegates to the same verdictFor that grades the mock.
 *
 * THE GRAIN SPLIT IS THE WHOLE DESIGN, and it is what the 2026-09-18 numbers
 * argued for:
 *
 *  - A QUESTION is a fact. "You got this EASY question wrong" rests on one
 *    answer and needs no sample size, so the per-question sections are scoped
 *    to THIS attempt. Measured over 300 production attempts: 5.7 easy-wrong per
 *    sitting, and only 1.0% of attempts yield nothing at all.
 *
 *  - A SUBTOPIC is not. One paper gives a subtopic 1-3 questions (median 3 per
 *    CHAPTER, and 29% of chapters carry exactly one), which is at or under
 *    compute.ts's MIN_JUDGED_FOR_CLAIM. So "the subtopics that will move your
 *    score" is POOLED across the student's whole history, taken straight from
 *    the projection the performance page already computes. It is the one
 *    section that gets better the more papers they sit.
 *
 * NEVER-REACHED IS NOT SKIPPED, and conflating them would make this email read
 * as broken. Of 7,389 easy-skipped instances in production, only 19% were
 * actually looked at; the rest are questions the student never got to. Showing
 * one of those as "you skipped this" shows them a question they have never
 * seen. They become the PACING line instead, which is the more useful finding
 * for that student anyway.
 */
import { buildPerformance, verdictOfFact } from "@/lib/performance/compute";
import { factRef } from "@/lib/performance/types";
import type { PerfAttempt, PerfFact, StudentPerformancePayload } from "@/lib/performance/types";

/** How many questions / subtopics each section names. Three is the brief, and
 *  it is also about what a person reads on a phone before deciding to tap. */
export const PICK = 3;

/**
 * Below this, unreached questions are not a finding. A student who ran out of
 * road on the last two questions paced the paper fine; saying so would invent a
 * problem, and an email that manufactures findings stops being read.
 */
export const PACING_FLOOR = 5;

export type ReportQuestion = {
  questionId: string;
  /** 1-based position in the paper — what the student will recognise. */
  position: number;
  chapter: string;
  subtopic: string;
  /** Seconds spent. 0 means the timer recorded nothing, NOT an instant answer. */
  secs: number;
  /** Share of other students who got it right, 0-100, when
   *  question_item_stats has evidence for it — 36% of mock questions today.
   *  Null is "we have no peer evidence", never "nobody got it right". */
  peerPct: number | null;
};

export type ReportSubtopic = {
  chapter: string;
  subtopic: string;
  /** Recoverable marks — the projection's own gap, pooled across their papers. */
  gap: number;
  accuracy: number | null;
  judged: number;
};

export type MockReport = {
  attemptId: string;
  mockSlug: string;
  mockTitle: string;
  examName: string;
  score: number;
  maxScore: number;
  pct: number;
  correct: number;
  wrong: number;
  /** Reached and left blank. Excludes never-reached, which is `pacing`. */
  seenBlank: number;
  easyWrong: ReportQuestion[];
  easyLeft: ReportQuestion[];
  /** Null below PACING_FLOOR — see the const. */
  pacing: { neverReached: number; marksLeft: number } | null;
  subtopics: ReportSubtopic[];
  /** False when this sitting produced no section worth sending. The send path
   *  skips those rather than mailing a score the result screen already showed. */
  hasFindings: boolean;
};

/** Peer accuracy by question id, 0-100. */
export type PeerMap = Map<string, number>;

function isAnswered(f: PerfFact): boolean {
  return f.r !== null || f.rn !== null;
}

/**
 * Rank a WRONG answer: the strongest peer evidence first, so the lead question
 * is the one most other students got right — that is what makes it worth a
 * student's attention. No evidence sorts LAST (never first: an absent
 * measurement must not outrank a real one). Ties break on time spent,
 * descending — a question they invested in and still lost is more fixable than
 * one they guessed — then on position, so the output is deterministic.
 */
function rankWrong(a: ReportQuestion, b: ReportQuestion): number {
  const ap = a.peerPct ?? -1;
  const bp = b.peerPct ?? -1;
  if (ap !== bp) return bp - ap;
  if (a.secs !== b.secs) return b.secs - a.secs;
  return a.position - b.position;
}

/**
 * Rank a BLANK: by dwell, descending — the opposite priority.
 *
 * `rc` (an answer row exists) is the established definition of "reached", and
 * this deliberately does NOT fork it with a dwell threshold: compute.ts's
 * skipAudit uses the same rule, and two definitions of seen-blank is exactly
 * the drift this repo has paid for. But within that set the reading order
 * matters — a question they spent 90 seconds on and abandoned is a decision
 * they made, while one they passed in a second is barely a glance. Dwell-first
 * puts the real hesitations at the top and lets the 1-second ones fall off the
 * end of a 3-item list.
 */
function rankBlank(a: ReportQuestion, b: ReportQuestion): number {
  if (a.secs !== b.secs) return b.secs - a.secs;
  const ap = a.peerPct ?? -1;
  const bp = b.peerPct ?? -1;
  if (ap !== bp) return bp - ap;
  return a.position - b.position;
}

function toQuestion(f: PerfFact, payload: StudentPerformancePayload, peer: PeerMap): ReportQuestion {
  const ref = factRef(f, payload.dims);
  return {
    questionId: f.q,
    position: f.p,
    chapter: ref.chapter,
    subtopic: ref.subtopic,
    secs: f.ts,
    peerPct: peer.get(f.q) ?? null,
  };
}

/**
 * Build the report for one graded attempt, or null when there is nothing to
 * report on.
 *
 * `now` is injected rather than read, so the pooled projection is reproducible
 * in a test — buildPerformance weights recent sittings more heavily.
 */
export function buildMockReport(
  payload: StudentPerformancePayload,
  attemptId: string,
  peer: PeerMap,
  now: Date
): MockReport | null {
  const attempt: PerfAttempt | undefined = payload.attempts.find((a) => a.attemptId === attemptId);
  if (!attempt) return null;
  // An ungraded attempt has no result to report. status is the authority, not a
  // non-null score: an expired attempt can carry both.
  if (attempt.status === "in_progress") return null;
  if (attempt.score === null || attempt.maxScore === null) return null;

  const mine = payload.facts.filter((f) => f.a === attemptId);

  let correct = 0;
  let wrong = 0;
  let seenBlank = 0;
  let neverReached = 0;
  let marksLeft = 0;
  const easyWrong: ReportQuestion[] = [];
  const easyLeft: ReportQuestion[] = [];

  for (const f of mine) {
    const verdict = verdictOfFact(f);
    if (!f.rc) {
      neverReached++;
      marksLeft += f.m;
      continue;
    }
    if (!isAnswered(f) && !f.g) {
      seenBlank++;
      if (f.d === "EASY") easyLeft.push(toQuestion(f, payload, peer));
      continue;
    }
    if (verdict === 1) correct++;
    else if (verdict === -1) {
      wrong++;
      if (f.d === "EASY") easyWrong.push(toQuestion(f, payload, peer));
    }
  }

  easyWrong.sort(rankWrong);
  easyLeft.sort(rankBlank);

  /**
   * POOLED across sittings, but scoped to the SUBJECTS THIS PAPER CONTAINED.
   *
   * Scoping by exam alone is not enough and the first live sample proved it: a
   * report on NDA Paper I (Mathematics) recommended Synonyms, Antonyms and
   * Idioms, because NDA's lanes span Paper II's nine GAT subjects and that is
   * genuinely where the student's recoverable marks were. Arithmetically true,
   * and still the wrong thing to say at the end of a maths report — it reads as
   * a non-sequitur and costs the email its credibility.
   *
   * The pooling claim in the copy ("across every paper you've sat, not just
   * this one") is about SITTINGS, not subjects, and stays honest: this still
   * draws on every paper they have sat in these subjects. Cross-subject
   * prioritisation belongs on the performance page, which has the room to show
   * the whole picture and is linked from every one of these emails.
   */
  const subjects = new Set(mine.map((f) => payload.dims.subjects[f.s] ?? ""));

  /**
   * A gap smaller than ONE QUESTION is below the resolution of the exam itself
   * — there is no move the student can make that realises it, because marks are
   * only awarded a question at a time. The first live sample ranked a subtopic
   * worth "about 0.8 marks" third, which is noise wearing the costume of
   * advice.
   *
   * The floor is the paper's OWN per-question marks rather than a constant:
   * this bank spans schemes from NDA's 2.5 to MHT-CET's 1, and a hardcoded
   * number would be wrong for four of the five. Modal, not mean — an NDA GAT
   * paper mixes 4-mark and 2-mark sections, and the mean of those is a value no
   * question is actually worth.
   */
  const markCounts = new Map<number, number>();
  for (const f of mine) markCounts.set(f.m, (markCounts.get(f.m) ?? 0) + 1);
  const minGap = [...markCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;

  // Thin rows are dropped rather than labelled: an email has no room for the
  // caveat a thin row needs, and the performance page is one tap away.
  const perf = buildPerformance(payload, now);
  const subtopics: ReportSubtopic[] = perf.lanes
    .filter((l) => l.exam === attempt.examName && subjects.has(l.subject))
    .flatMap((l) => l.projection?.subtopicRows ?? [])
    .filter((r) => !r.thin && r.tested && r.gap >= minGap && r.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, PICK)
    .map((r) => ({
      chapter: r.chapter,
      subtopic: r.subtopic,
      gap: r.gap,
      accuracy: r.accuracy,
      judged: r.judged,
    }));

  const pacing = neverReached >= PACING_FLOOR ? { neverReached, marksLeft } : null;

  const score = Number(attempt.score);
  const maxScore = Number(attempt.maxScore);

  return {
    attemptId,
    mockSlug: attempt.mockSlug,
    mockTitle: attempt.mockTitle,
    examName: attempt.examName,
    score,
    maxScore,
    pct: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    correct,
    wrong,
    seenBlank,
    easyWrong: easyWrong.slice(0, PICK),
    easyLeft: easyLeft.slice(0, PICK),
    pacing,
    subtopics,
    hasFindings:
      easyWrong.length > 0 || easyLeft.length > 0 || subtopics.length > 0 || pacing !== null,
  };
}
