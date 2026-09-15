/**
 * The shape of `get_student_performance` (migration 0099) on the TypeScript
 * side. Pure types — no I/O, no logic.
 *
 * The RPC deliberately makes NO judgement: it joins and projects. Everything
 * that decides right-vs-wrong, which attempt counts, or how a subtopic is
 * weighted lives in compute.ts, so the rules are unit-testable and there is
 * exactly one implementation of each.
 */
import type { OptionLabel } from "@/lib/mocks/answers";

export type PerfDifficulty = "EASY" | "MODERATE" | "HARD";

/** One sitting. Includes in-progress attempts — the page reports them as a
 *  count — which is why `score` is nullable here and not merely optional. */
export type PerfAttempt = {
  attemptId: string;
  mockSlug: string;
  mockTitle: string;
  examName: string;
  paperCode: string;
  pyqYear: number | null;
  source: "pyq" | "practice";
  scope: "full" | "sectional";
  sections: { key: string; label: string; count: number }[];
  totalQuestions: number;
  totalMarks: number;
  durationSecs: number;
  status: "in_progress" | "submitted" | "expired";
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  maxScore: number | null;
};

/**
 * One question of one attempt's paper — EVERY question, not only the answered
 * ones, because the absence of an answer row is itself the datum.
 *
 * Short keys mirror the RPC payload verbatim: this array is ~95% of a payload
 * that reaches 1 MB for the heaviest student, and expanding the keys here would
 * mean renaming 4,500 objects per request for no reader's benefit. `factRef`
 * below is the readable accessor.
 *
 *   a  attemptId            s/c/t  index into dims.subjects/chapters/subtopics
 *   p  position in paper    d      difficulty      f   question_format
 *   q  questionId           k/kn   the KEY  (label / numeric)
 *   g  grace (awarded all)  r/rn   the RESPONSE (label / numeric)
 *   ts seconds on question  rc     REACHED — an attempt_answers row exists
 *   m  marks for correct    nm     marks for wrong, SIGNED (-0.83, or 0 on CET)
 *
 * `nm` is a signed addend, matching gradeMock's `score += q.negMarks`. That is
 * what lets MHT-CET's zero fall out of the projection arithmetic for free
 * instead of needing a special case.
 */
export type PerfFact = {
  a: string;
  p: number;
  q: string;
  s: number;
  c: number;
  t: number;
  d: PerfDifficulty;
  f: "mcq" | "subjective" | "numeric";
  k: OptionLabel | null;
  kn: number | null;
  r: OptionLabel | null;
  rn: number | null;
  g: boolean;
  m: number;
  nm: number;
  ts: number;
  rc: boolean;
};

/** Interned taxonomy names. A fact's s/c/t are indices into these. */
export type PerfDims = { subjects: string[]; chapters: string[]; subtopics: string[] };

/**
 * Live bank weightage — how many PUBLIC PYQs each SUBTOPIC holds, for the
 * (exam, subject) pairs this student has touched.
 *
 * Derived per request rather than stored. nda-tracker's NDA_FREQ_BY_SUBJECT and
 * NDA_SUBTOPIC_SHARES are hand-transcribed copies of these same counts frozen at
 * 2026-05-17 — and the subtopic table covers NDA Mathematics alone. The bank has
 * grown since (NDA Maths 2,160 -> 2,280); importing either would bake in a
 * number with an expiry date.
 *
 * GRAIN IS SUBTOPIC, and chapter totals are SUMMED from it (migration 0100).
 * Never the reverse: a pooled figure is derivable from per-row detail and a
 * per-row figure is not recoverable from a pool — the same rule
 * question_item_stats follows.
 */
export type PerfWeightRow = {
  exam: string;
  subject: string;
  chapter: string;
  /** `(unclassified)` where a bank row carries no subtopic. Today that is zero
   *  of 34,676 PUBLIC PYQs, but a label keeps a future null VISIBLE instead of
   *  silently removing its marks from the pool. */
  subtopic: string;
  q: number;
};

export type StudentPerformancePayload = {
  userId: string;
  attempts: PerfAttempt[];
  dims: PerfDims;
  facts: PerfFact[];
  weightage: PerfWeightRow[];
};

/** The empty payload, for a student who has never started a mock. Every list is
 *  present and empty — an absent key would make "no data" and "read failed"
 *  indistinguishable downstream. */
export const EMPTY_PERFORMANCE: Omit<StudentPerformancePayload, "userId"> = {
  attempts: [],
  dims: { subjects: [], chapters: [], subtopics: [] },
  facts: [],
  weightage: [],
};

/** Readable view of a fact's taxonomy. Throws nothing: an index the dims array
 *  doesn't cover yields "" rather than undefined, so a payload/dims mismatch
 *  surfaces as a blank label instead of a render crash. */
export function factRef(fact: PerfFact, dims: PerfDims) {
  return {
    subject: dims.subjects[fact.s] ?? "",
    chapter: dims.chapters[fact.c] ?? "",
    subtopic: dims.subtopics[fact.t] ?? "",
  };
}
