/**
 * A student's mock history read per SUBJECT (2026-10-11): the result page's
 * "+N marks since your last try", and the My attempts subject filter and marks
 * trend. Pure. Spec: tests/attempt-history.test.ts.
 *
 * A SUBJECT IS EXAM + PAPER CODE. mock_tests has no subject column; NDA's two
 * papers ("maths", "gat") are its two subjects, CDS has three. The readable
 * name comes from the paper blueprint, so nothing new is stored.
 *
 * COMPARISONS USE FULL PAPERS WITH THE SAME TOTAL. Chapter tests share their
 * paper's code (NDA 3D Geometry is code "maths") but cover different chapters
 * with different totals, so "+12 since last time" between two of them measures
 * the chapters, not the student. NEET sat as 720 and as 800 marks, and a few
 * MPSC papers vary too; across those a difference is not a change either. Where
 * nothing comparable exists the page says nothing rather than something false.
 */
import { ENGAGEMENT_FLOOR } from "@/lib/performance/compute";
import { getBlueprint } from "./blueprints";
import type { UserAttempt } from "./query";

export type HistoryAttempt = Pick<
  UserAttempt,
  | "attemptId"
  | "examSlug"
  | "examName"
  | "paperCode"
  | "scope"
  | "status"
  | "score"
  | "maxScore"
  | "correct"
  | "wrong"
  | "skipped"
  | "startedAt"
>;

export type SubjectOption = { key: string; label: string; count: number };

export function subjectKey(a: Pick<HistoryAttempt, "examSlug" | "paperCode">): string {
  return `${a.examSlug}:${a.paperCode}`;
}

/** "NDA Mathematics" from "Paper I — Mathematics"; the exam alone when the paper is named after it. */
export function subjectLabel(examSlug: string, examName: string, paperCode: string): string {
  const paper = getBlueprint(examSlug, paperCode)?.paperLabel;
  if (!paper || paper.startsWith(examName)) return paper && paper !== examName ? paper : examName;
  const dash = paper.lastIndexOf("— ");
  const tail = dash >= 0 ? paper.slice(dash + 2).trim() : paper;
  return `${examName} ${tail}`;
}

/**
 * A finished full paper the student actually sat: at least ENGAGEMENT_FLOOR of
 * it answered, the same floor the report email and /performance use. Measured
 * 2026-10-11 (attempts:smoke): heavy students' lines ran 25, 18, 53, 0, 164,
 * -1.33, with papers left after one minute, and "+164 since your last try"
 * against an abandoned zero is not progress.
 */
function countable(a: HistoryAttempt): boolean {
  if (a.scope !== "full" || a.status === "in_progress" || a.score === null || a.maxScore === null) return false;
  const total = (a.correct ?? 0) + (a.wrong ?? 0) + (a.skipped ?? 0);
  return total > 0 && ((a.correct ?? 0) + (a.wrong ?? 0)) / total >= ENGAGEMENT_FLOOR;
}

const byStartAsc = (a: HistoryAttempt, b: HistoryAttempt) => a.startedAt.localeCompare(b.startedAt);
/** Marks keep two decimals, as the paper prints them (NDA wrong = -0.83). */
const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The finished full paper this attempt is compared with: the most recent one
 * before it, same subject, same total. Null for a chapter test, a first try,
 * or when every earlier paper had a different total.
 */
export function previousComparable(
  attempts: readonly HistoryAttempt[],
  attemptId: string
): { attemptId: string; score: number; delta: number } | null {
  const current = attempts.find((a) => a.attemptId === attemptId);
  if (!current || !countable(current)) return null;
  const key = subjectKey(current);
  const earlier = attempts
    .filter(
      (a) =>
        a.attemptId !== attemptId &&
        countable(a) &&
        subjectKey(a) === key &&
        a.maxScore === current.maxScore &&
        a.startedAt < current.startedAt
    )
    .sort(byStartAsc);
  const prev = earlier[earlier.length - 1];
  if (!prev) return null;
  return { attemptId: prev.attemptId, score: prev.score!, delta: round2(current.score! - prev.score!) };
}

/** Each subject the student has attempted, most attempts first, then by name. */
export function subjectOptions(attempts: readonly HistoryAttempt[]): SubjectOption[] {
  const byKey = new Map<string, SubjectOption>();
  for (const a of attempts) {
    const key = subjectKey(a);
    const o = byKey.get(key);
    if (o) o.count += 1;
    else byKey.set(key, { key, label: subjectLabel(a.examSlug, a.examName, a.paperCode), count: 1 });
  }
  return [...byKey.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** The subject with the most finished full papers: what the trend shows under "All". */
export function defaultTrendSubject(attempts: readonly HistoryAttempt[]): string | null {
  const counts = new Map<string, number>();
  for (const a of attempts) if (countable(a)) counts.set(subjectKey(a), (counts.get(subjectKey(a)) ?? 0) + 1);
  let best: string | null = null;
  for (const [key, n] of counts) if (best === null || n > counts.get(best)!) best = key;
  return best;
}

export const TREND_POINTS = 6;
export const TREND_MIN_POINTS = 3;

/**
 * The last few finished full papers of one subject, oldest first, for a marks
 * line. Only papers with the NEWEST one's total, so one line never mixes a 720
 * and an 800 paper. Null below three points: two dots are not a trend.
 */
export function trendFor(
  attempts: readonly HistoryAttempt[],
  key: string
): { maxScore: number; points: { attemptId: string; score: number; startedAt: string }[] } | null {
  const full = attempts.filter((a) => countable(a) && subjectKey(a) === key).sort(byStartAsc);
  const newest = full[full.length - 1];
  if (!newest) return null;
  const same = full.filter((a) => a.maxScore === newest.maxScore).slice(-TREND_POINTS);
  if (same.length < TREND_MIN_POINTS) return null;
  return {
    maxScore: newest.maxScore!,
    points: same.map((a) => ({ attemptId: a.attemptId, score: a.score!, startedAt: a.startedAt })),
  };
}

function hm(totalMins: number): string {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h === 0) return `${m} m`;
  return m === 0 ? `${h} h` : `${h} h ${m} m`;
}

/**
 * "1 h 52 m of 2 h 30 m". Capped at the paper's time: an attempt the expiry
 * sweep graded is backdated to its own end, and a clock skew must not claim a
 * student overran a timed paper.
 */
export function formatElapsed(startedAt: string, submittedAt: string | null, durationSecs: number): string | null {
  if (!submittedAt) return null;
  const secs = Math.max(0, (Date.parse(submittedAt) - Date.parse(startedAt)) / 1000);
  const used = Math.round(Math.min(secs, durationSecs) / 60);
  return `${hm(used)} of ${hm(Math.round(durationSecs / 60))}`;
}

/**
 * Plot positions for a marks line in a width x height box with `pad` inside
 * each edge: evenly spread left to right, the highest score at the top. Equal
 * scores draw a flat line through the middle rather than dividing by zero.
 */
export function sparkline(scores: readonly number[], width: number, height: number, pad: number): { x: number; y: number }[] {
  const lo = Math.min(...scores);
  const hi = Math.max(...scores);
  const span = hi - lo;
  const step = scores.length > 1 ? (width - 2 * pad) / (scores.length - 1) : 0;
  return scores.map((s, i) => ({
    x: Math.round((pad + i * step) * 10) / 10,
    y: span === 0 ? height / 2 : Math.round((pad + ((hi - s) / span) * (height - 2 * pad)) * 10) / 10,
  }));
}
