/**
 * "How to raise your score" (owner, 2026-11-10): what one fair, full-paper
 * attempt says about where the next marks are, each finding valued in marks.
 * It replaces "What to fix next" on the mock result page for full papers; a
 * chapter test, a custom test, a rushed or an abandoned attempt keeps that card
 * (buildScorePlan returns null).
 *
 * Built by code, never by V: every figure is arithmetic on the attempt
 * (answers, the per-question timer, each question's own marks and penalty,
 * difficulty), how other students did on a question (PeerMap), and how often a
 * typical paper of the exam asks a chapter (get_chapter_paper_weights, 0242).
 *
 * Rules that came out of reading real attempts before building it:
 * - A RUSHED attempt is not evidence of how the student sits a paper: a JEE
 *   paper submitted after 24 of 180 minutes scored 105 with Physics 18 of 18.
 *   Under 40% of the time used, the plain card stays. A re-sit is kept.
 * - Difficulty labels are not reliable everywhere: all 75 questions of a JEE
 *   paper are MODERATE. Where a paper has one label, "easy" means 60%+ of other
 *   students got it right; without that evidence the easy section is skipped.
 * - Guessing advice follows the exam's own marking. A guess pays when right
 *   more often than penalty / (marks + penalty): 1 in 5 for SSC, JEE and MPSC,
 *   1 in 4 for NDA and CDS. With no penalty (MHT-CET), never leave a blank.
 * - The headline counts only gains it can show: half the easy misses, and what
 *   quick answers below break-even cost. Time saved is never turned into marks.
 * - A timer reading of 0 means "not measured", not an instant answer
 *   (compute.ts isTimed): left out of every time and quick-answer figure.
 *
 * Pure. Spec: tests/score-plan.test.ts.
 */
import { ENGAGEMENT_FLOOR, verdictOfFact } from "@/lib/performance/compute";
import { factRef, type PerfAttempt, type PerfFact, type StudentPerformancePayload } from "@/lib/performance/types";
import type { PeerMap } from "@/lib/email/mockReport";
import type { ChapterWeight } from "@/lib/me/startNext";

/** Submitted in under this share of the paper's time: rushed, so no plan. */
export const RUSHED_SHARE = 0.4;
/** With one difficulty label on the paper, "easy" is this share of other students right (or more). */
export const EASY_PEER_PCT = 60;
/** Fewer easy misses than this is not a finding. */
export const MIN_EASY = 2;
/** A section must take this many times its share of questions in time to be named. */
export const TIME_SHARE_FACTOR = 1.3;
/** Slow = more than this many times the paper's average time per question. */
export const SLOW_FACTOR = 2;
/** Quick = less than this share of the paper's average time per question. */
export const FAST_FACTOR = 0.4;
/** The time finding needs this many slow wrong answers, and this much time in them. */
export const MIN_SLOW_WRONG = 2;
export const MIN_SLOW_WRONG_SECS = 180;
/** Quick-answer advice needs at least this many quick answers. */
export const MIN_FAST = 10;
/** A chapter needs this many wrong answers to be named. */
export const MIN_TOPIC_WRONG = 2;
export const MAX_TOPICS = 3;
/** "What went well" needs a section with this many answers and this accuracy. */
export const MIN_WELL_ANSWERED = 5;
export const MIN_WELL_PCT = 60;

export type ScorePlanInput = {
  payload: StudentPerformancePayload;
  attemptId: string;
  peer: PeerMap;
  /** The exam's chapter weights in its published papers; [] when unknown. */
  weights: readonly ChapterWeight[];
};

export type ScorePlan = {
  attemptId: string;
  examName: string;
  score: number;
  maxScore: number;
  /** Marks the plan can show are within reach; 0 means no headline number. */
  headlineGain: number;
  wentWell: { section: string; right: number; answered: number; mins: number } | null;
  easy: { count: number; valueEach: number; gain: number; bySection: { section: string; count: number }[] } | null;
  time: { section: string; mins: number; totalMins: number; secsPerQ: number; paperSecsPerQ: number; slowWrong: number; slowWrongMins: number; capSecs: number } | null;
  topics: { subject: string; chapter: string; right: number; asked: number; marksLost: number; qPerPaper: number | null }[];
  strategy:
    | { kind: "keep" | "attempt_more" | "fewer_guesses"; breakEvenOneIn: number; accuracyPct: number; fastTotal: number; fastRight: number; fastNet: number; seenBlank: number; perAnswer: number; marksAtStake: number }
    | { kind: "never_blank"; breakEvenOneIn: null; blanks: number; marksAtStake: number }
    | null;
  progress: { kind: "same_paper" | "same_exam"; previous: number; delta: number; sections: { section: string; delta: number }[] } | null;
  sections: { section: string; questions: number; right: number; wrong: number; blank: number; mins: number }[];
  /** Every wrong answer in this paper, for the Fix list link. */
  wrong: number;
};

const roundTo = (n: number, step: number) => Math.max(step, Math.round(n / step) * step);
const r1 = (n: number) => Math.round(n * 10) / 10;

function modal(values: readonly number[]): number {
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]?.[0] ?? 0;
}

const answered = (f: PerfFact) => f.r !== null || f.rn !== null;
const timed = (f: PerfFact) => f.rc && f.ts > 0;

/** Marks this fact earned in its paper. */
function earned(f: PerfFact): number {
  const v = verdictOfFact(f);
  return v === 1 ? f.m : v === -1 ? -Math.abs(f.nm) : 0;
}

function fair(attempt: PerfAttempt, mine: readonly PerfFact[]): boolean {
  if (attempt.scope !== "full") return false;
  if (attempt.status === "in_progress" || attempt.score === null || attempt.maxScore === null || !attempt.submittedAt) return false;
  const used = (Date.parse(attempt.submittedAt) - Date.parse(attempt.startedAt)) / 1000;
  if (!(used >= RUSHED_SHARE * attempt.durationSecs)) return false;
  const total = attempt.totalQuestions || mine.length;
  return total > 0 && mine.filter(answered).length / total >= ENGAGEMENT_FLOOR;
}

export function buildScorePlan(input: ScorePlanInput): ScorePlan | null {
  const { payload, attemptId, peer, weights } = input;
  const attempt = payload.attempts.find((a) => a.attemptId === attemptId);
  if (!attempt) return null;
  // Multiple-select questions are left out, as in the report (one letter per fact).
  const mine = payload.facts.filter((f) => f.a === attemptId && f.f !== "msq");
  if (!fair(attempt, mine)) return null;

  const subjectOf = (f: PerfFact) => factRef(f, payload.dims).subject;
  const chapterOf = (f: PerfFact) => factRef(f, payload.dims).chapter;
  const m = modal(mine.map((f) => f.m));
  const pen = modal(mine.map((f) => Math.abs(f.nm)));
  const paperSecsPerQ = attempt.durationSecs / Math.max(1, attempt.totalQuestions || mine.length);

  // ── sections: the paper's own (SSC's General Awareness spans five subjects), by
  // position, since every published full mock numbers its questions section by
  // section in the stored order (528 of 528 checked, 2026-11-10). A one-section
  // paper (NDA Paper I) groups by subject instead.
  const ranges: { label: string; last: number }[] = [];
  const counted = attempt.sections.reduce((n, x) => n + x.count, 0);
  if (attempt.sections.length > 1 && counted === attempt.totalQuestions) {
    let last = 0;
    for (const x of attempt.sections) {
      last += x.count;
      ranges.push({ label: x.label, last });
    }
  }
  const sectionOf = (f: PerfFact) => (ranges.length ? (ranges.find((r) => f.p <= r.last)?.label ?? subjectOf(f)) : subjectOf(f));
  const sectionNames = [...new Set(mine.map(sectionOf))];
  const sections = sectionNames.map((section) => {
    const fs = mine.filter((f) => sectionOf(f) === section);
    return {
      section,
      questions: fs.length,
      right: fs.filter((f) => verdictOfFact(f) === 1).length,
      wrong: fs.filter((f) => verdictOfFact(f) === -1).length,
      blank: fs.filter((f) => !answered(f) && !f.g).length,
      secs: fs.filter(timed).reduce((s, f) => s + f.ts, 0),
    };
  });

  const right = sections.reduce((s, x) => s + x.right, 0);
  const wrong = sections.reduce((s, x) => s + x.wrong, 0);

  // ── what went well: only between sections (on a one-section paper it named the whole
  // paper, "Mathematics 35 out of 120 right"), and worded by what was answered ──
  const well = sections.length < 2 ? undefined : sections
    .filter((x) => x.right + x.wrong >= MIN_WELL_ANSWERED && (100 * x.right) / (x.right + x.wrong) >= MIN_WELL_PCT)
    .sort((a, b) => b.right / (b.right + b.wrong) - a.right / (a.right + a.wrong) || b.right - a.right)[0];
  const wentWell = well ? { section: well.section, right: well.right, answered: well.right + well.wrong, mins: well.secs / 60 } : null;

  // ── easy marks ──
  const labels = new Set(mine.map((f) => f.d));
  const isEasy = (f: PerfFact) => (labels.size > 1 ? f.d === "EASY" : (peer.get(f.q) ?? -1) >= EASY_PEER_PCT);
  const easyWrong = mine.filter((f) => verdictOfFact(f) === -1 && isEasy(f));
  let easy: ScorePlan["easy"] = null;
  if (easyWrong.length >= MIN_EASY) {
    const valueEach = m + pen;
    const by = new Map<string, number>();
    for (const f of easyWrong) by.set(sectionOf(f), (by.get(sectionOf(f)) ?? 0) + 1);
    easy = {
      count: easyWrong.length,
      valueEach,
      gain: Math.round((easyWrong.length * valueEach) / 2),
      bySection: [...by.entries()].map(([section, count]) => ({ section, count })).sort((a, b) => b.count - a.count),
    };
  }

  // ── time ──
  const capSecs = roundTo(SLOW_FACTOR * paperSecsPerQ, 15);
  const totalSecs = sections.reduce((s, x) => s + x.secs, 0);
  let time: ScorePlan["time"] = null;
  if (totalSecs > 0) {
    const candidates = sections
      .map((x) => {
        const slow = mine.filter((f) => sectionOf(f) === x.section && timed(f) && f.ts > capSecs && verdictOfFact(f) === -1);
        return { x, slow, slowSecs: slow.reduce((s, f) => s + f.ts, 0) };
      })
      .filter(
        ({ x, slow, slowSecs }) =>
          x.secs / totalSecs >= TIME_SHARE_FACTOR * (x.questions / mine.length) && slow.length >= MIN_SLOW_WRONG && slowSecs >= MIN_SLOW_WRONG_SECS
      )
      .sort((a, b) => b.slowSecs - a.slowSecs);
    const top = candidates[0];
    if (top) {
      const timedCount = mine.filter((f) => sectionOf(f) === top.x.section && timed(f)).length;
      time = {
        section: top.x.section,
        mins: top.x.secs / 60,
        totalMins: totalSecs / 60,
        secsPerQ: Math.round(top.x.secs / Math.max(1, timedCount)),
        paperSecsPerQ: Math.round(paperSecsPerQ),
        slowWrong: top.slow.length,
        slowWrongMins: top.slowSecs / 60,
        capSecs,
      };
    }
  }

  // ── topics ──
  const byChapter = new Map<string, { subject: string; chapter: string; right: number; asked: number; marksLost: number; wrong: number }>();
  for (const f of mine) {
    const key = `${subjectOf(f)}||${chapterOf(f)}`;
    const row = byChapter.get(key) ?? { subject: subjectOf(f), chapter: chapterOf(f), right: 0, asked: 0, marksLost: 0, wrong: 0 };
    row.asked += 1;
    const v = verdictOfFact(f);
    if (v === 1) row.right += 1;
    if (v === -1) {
      row.wrong += 1;
      row.marksLost += f.m + Math.abs(f.nm);
    }
    byChapter.set(key, row);
  }
  const weightOf = (subject: string, chapter: string) =>
    weights.find((w) => w.subject === subject && w.chapter === chapter && w.paperCode === attempt.paperCode)?.qPerPaper ?? null;
  const topics = [...byChapter.values()]
    .filter((t) => t.wrong >= MIN_TOPIC_WRONG && t.chapter)
    .map((t) => ({ subject: t.subject, chapter: t.chapter, right: t.right, asked: t.asked, marksLost: r1(t.marksLost), qPerPaper: weightOf(t.subject, t.chapter) }))
    .sort((a, b) => b.marksLost - a.marksLost || (b.qPerPaper ?? 0) - (a.qPerPaper ?? 0))
    .slice(0, MAX_TOPICS);

  // ── attempt strategy, by the exam's own marking ──
  const reachedBlank = mine.filter((f) => f.rc && !answered(f) && !f.g).length;
  const neverReached = mine.filter((f) => !f.rc).length;
  let strategy: ScorePlan["strategy"] = null;
  if (pen === 0) {
    const blanks = reachedBlank + neverReached;
    if (blanks > 0) strategy = { kind: "never_blank", breakEvenOneIn: null, blanks, marksAtStake: 0 };
  } else if (right + wrong > 0) {
    const breakEven = pen / (m + pen);
    const accuracy = right / (right + wrong);
    const fastCap = roundTo(FAST_FACTOR * paperSecsPerQ, 5);
    const fast = mine.filter((f) => timed(f) && answered(f) && f.ts < fastCap && verdictOfFact(f) !== 0);
    const fastRight = fast.filter((f) => verdictOfFact(f) === 1).length;
    const fastNet = fast.reduce((s, f) => s + earned(f), 0);
    const perAnswer = r1(accuracy * m - (1 - accuracy) * pen);
    const base = {
      breakEvenOneIn: Math.round(1 / breakEven),
      accuracyPct: Math.round(accuracy * 100),
      fastTotal: fast.length,
      fastRight,
      fastNet: r1(fastNet),
      seenBlank: reachedBlank,
      perAnswer,
    };
    if (fast.length >= MIN_FAST && fastRight / fast.length < breakEven && fastNet < 0) {
      strategy = { kind: "fewer_guesses", ...base, marksAtStake: r1(-fastNet) };
    } else if (accuracy < breakEven) {
      strategy = { kind: "fewer_guesses", ...base, marksAtStake: r1(wrong * pen - right * m > 0 ? wrong * pen - right * m : 0) };
    } else if (reachedBlank >= 5 && accuracy >= 2 * breakEven) {
      strategy = { kind: "attempt_more", ...base, marksAtStake: 0 };
    } else {
      strategy = { kind: "keep", ...base, marksAtStake: 0 };
    }
  }

  // ── progress: the same paper first, else the last paper of the same exam and part ──
  const before = payload.attempts
    .filter(
      (a) =>
        a.attemptId !== attemptId &&
        a.examName === attempt.examName &&
        a.paperCode === attempt.paperCode &&
        a.scope === "full" &&
        a.status !== "in_progress" &&
        a.score !== null &&
        a.maxScore !== null &&
        Number(a.maxScore) === Number(attempt.maxScore) &&
        a.submittedAt !== null &&
        attempt.submittedAt !== null &&
        a.submittedAt < attempt.submittedAt
    )
    .sort((a, b) => (b.submittedAt! < a.submittedAt! ? -1 : 1));
  const prev = before.find((a) => a.mockSlug === attempt.mockSlug) ?? before[0];
  let progress: ScorePlan["progress"] = null;
  if (prev) {
    const marksBy = (id: string) => {
      const out = new Map<string, number>();
      for (const f of payload.facts.filter((x) => x.a === id && x.f !== "msq")) out.set(sectionOf(f), (out.get(sectionOf(f)) ?? 0) + earned(f));
      return out;
    };
    const now = marksBy(attemptId);
    const then = marksBy(prev.attemptId);
    progress = {
      kind: prev.mockSlug === attempt.mockSlug ? "same_paper" : "same_exam",
      previous: Number(prev.score),
      delta: r1(Number(attempt.score) - Number(prev.score)),
      sections: [...now.entries()]
        .filter(([s]) => then.has(s))
        .map(([section, v]) => ({ section, delta: r1(v - (then.get(section) ?? 0)) }))
        .filter((x) => x.delta !== 0)
        .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)),
    };
  }

  const headlineGain = Math.round((easy?.gain ?? 0) + (strategy && strategy.kind === "fewer_guesses" ? strategy.marksAtStake : 0));

  return {
    attemptId,
    examName: attempt.examName,
    score: Number(attempt.score),
    maxScore: Number(attempt.maxScore),
    headlineGain,
    wentWell,
    easy,
    time,
    topics,
    strategy,
    progress,
    sections: sections.map(({ secs, ...x }) => ({ ...x, mins: secs / 60 })),
    wrong,
  };
}
