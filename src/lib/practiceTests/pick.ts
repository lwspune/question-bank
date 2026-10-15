/**
 * Which questions go into a practice test (V's "Build a practice test",
 * 2026-10-15).
 *
 * A chapter test (../mocks/sectional.ts) is planned once and frozen as data,
 * because everyone sits the same one. A practice test is built for one student
 * at the moment they ask, so three rules differ:
 *   - a SEED varies it: two tests on the same chapter should not be the same
 *     test. The route passes a random seed; tests pass a fixed one.
 *   - the student picks a DIFFICULTY lean (Mixed keeps the pool's own mix).
 *   - a student who asks to skip answered questions gets only new ones while
 *     there are enough, and otherwise every new one plus answered ones to fill.
 * What stays the same: spread across the chosen chapters and their subtopics,
 * because the findings card reports per subtopic; sit easy to hard; numeric
 * questions last at the paper's share (JEE).
 *
 * The pool reaching here is already filtered to questions the grader can mark
 * (../mocks/sectional.ts isSectionalEligible). Pure: no I/O. Spec:
 * tests/practice-tests-pick.test.ts.
 */

export type PracticeLevel = "EASY" | "MODERATE" | "HARD";
export type PracticeDifficulty = "mixed" | "easier" | "harder";

export type PracticeCandidate = {
  id: string;
  chapterId: string;
  subtopic: string | null;
  difficulty: PracticeLevel;
  format: "mcq" | "numeric";
};

/** The test lengths V offers. */
export const PRACTICE_LENGTHS = [10, 20, 30] as const;

/** The lengths the chosen chapters can fill. */
export function practiceLengths(available: number): number[] {
  return PRACTICE_LENGTHS.filter((n) => n <= available);
}

const LEVELS: readonly PracticeLevel[] = ["EASY", "MODERATE", "HARD"];

const WEIGHTS: Record<PracticeDifficulty, Record<PracticeLevel, number>> = {
  mixed: { EASY: 1, MODERATE: 1, HARD: 1 },
  easier: { EASY: 3, MODERATE: 2, HARD: 1 },
  harder: { EASY: 1, MODERATE: 2, HARD: 3 },
};

/** Where a level's spare seats go when it runs out, nearest level first. */
const SPILL: Record<PracticeLevel, readonly PracticeLevel[]> = {
  EASY: ["MODERATE", "HARD"],
  MODERATE: ["EASY", "HARD"],
  HARD: ["MODERATE", "EASY"],
};

/**
 * Seats per level for an n-question test: the pool's counts weighted by the
 * lean, shared by largest remainder (a tie goes to the easier level), then
 * capped at what the pool holds, with the overflow moved to the nearest level
 * that has room.
 */
export function difficultySeats(
  counts: Record<PracticeLevel, number>,
  n: number,
  difficulty: PracticeDifficulty
): Record<PracticeLevel, number> {
  const w = WEIGHTS[difficulty];
  const weighted = LEVELS.map((l) => counts[l] * w[l]);
  const total = weighted.reduce((s, x) => s + x, 0);
  const seats: Record<PracticeLevel, number> = { EASY: 0, MODERATE: 0, HARD: 0 };
  if (total === 0 || n === 0) return seats;

  const exact = weighted.map((x) => (n * x) / total);
  const floors = exact.map(Math.floor);
  let left = n - floors.reduce((s, x) => s + x, 0);
  const byRemainder = LEVELS.map((_, i) => i).sort(
    (a, b) => exact[b] - floors[b] - (exact[a] - floors[a]) || a - b
  );
  for (const i of byRemainder) {
    if (left === 0) break;
    floors[i] += 1;
    left -= 1;
  }
  LEVELS.forEach((l, i) => (seats[l] = floors[i]));

  for (const l of LEVELS) {
    let over = seats[l] - counts[l];
    if (over <= 0) continue;
    seats[l] = counts[l];
    for (const to of SPILL[l]) {
      const room = counts[to] - seats[to];
      const moved = Math.min(room, over);
      seats[to] += moved;
      over -= moved;
      if (over === 0) break;
    }
  }
  return seats;
}

/** mulberry32: a small seeded generator, so a seed reproduces a test. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(xs: readonly T[], rand: () => number): T[] {
  const out = [...xs];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Take one from each queue in turn until k are taken or all are empty. */
function interleave<T>(queues: T[][], k: number): T[] {
  const out: T[] = [];
  for (let round = 0; out.length < k; round++) {
    let took = false;
    for (const q of queues) {
      if (out.length === k) break;
      if (round < q.length) {
        out.push(q[round]);
        took = true;
      }
    }
    if (!took) break;
  }
  return out;
}

/**
 * k of `rows`, spread across chapters first and each chapter's subtopics
 * second. Within a subtopic the order is the seed's shuffle, so a different
 * seed takes different questions.
 */
function spread(rows: PracticeCandidate[], k: number, rand: () => number): PracticeCandidate[] {
  const byChapter = new Map<string, Map<string, PracticeCandidate[]>>();
  for (const r of [...rows].sort((a, b) => a.id.localeCompare(b.id))) {
    const subs = byChapter.get(r.chapterId) ?? new Map<string, PracticeCandidate[]>();
    const key = r.subtopic ?? "";
    subs.set(key, [...(subs.get(key) ?? []), r]);
    byChapter.set(r.chapterId, subs);
  }
  const chapterQueues = [...byChapter.keys()].sort().map((id) => {
    const subs = byChapter.get(id)!;
    const subQueues = shuffled([...subs.keys()].sort(), rand).map((key) => shuffled(subs.get(key)!, rand));
    return interleave(subQueues, Infinity);
  });
  return interleave(shuffled(chapterQueues, rand), k);
}

function countLevels(rows: PracticeCandidate[]): Record<PracticeLevel, number> {
  const counts: Record<PracticeLevel, number> = { EASY: 0, MODERATE: 0, HARD: 0 };
  for (const r of rows) counts[r.difficulty] += 1;
  return counts;
}

/** k of one format, by the seats of the lean, easy to hard. */
function pickFormat(
  rows: PracticeCandidate[],
  k: number,
  difficulty: PracticeDifficulty,
  rand: () => number
): PracticeCandidate[] {
  if (k === 0) return [];
  const seats = difficultySeats(countLevels(rows), k, difficulty);
  return LEVELS.flatMap((l) =>
    spread(
      rows.filter((r) => r.difficulty === l),
      seats[l],
      rand
    )
  );
}

/** n of `pool` split into MCQs then numeric at the paper's share. */
function pickFrom(
  pool: PracticeCandidate[],
  n: number,
  difficulty: PracticeDifficulty,
  numericShare: number,
  rand: () => number
): PracticeCandidate[] {
  const mcq = pool.filter((c) => c.format === "mcq");
  const numeric = pool.filter((c) => c.format === "numeric");
  let numericSeats = Math.min(Math.round(n * numericShare), numeric.length);
  let mcqSeats = n - numericSeats;
  if (mcqSeats > mcq.length) {
    numericSeats += mcqSeats - mcq.length;
    mcqSeats = mcq.length;
  }
  return [
    ...pickFormat(mcq, mcqSeats, difficulty, rand),
    ...pickFormat(numeric, numericSeats, difficulty, rand),
  ];
}

const LEVEL_RANK: Record<PracticeLevel, number> = { EASY: 0, MODERATE: 1, HARD: 2 };

/** Sitting order: MCQs then numeric, each easy to hard, stable otherwise. */
function sittingOrder(rows: PracticeCandidate[]): PracticeCandidate[] {
  const at = new Map(rows.map((r, i) => [r.id, i]));
  return [...rows].sort(
    (a, b) =>
      Number(a.format === "numeric") - Number(b.format === "numeric") ||
      LEVEL_RANK[a.difficulty] - LEVEL_RANK[b.difficulty] ||
      at.get(a.id)! - at.get(b.id)!
  );
}

/**
 * The n questions of a practice test, in sitting order, and how many of them
 * the student has not answered before. Null when the pool holds fewer than n.
 */
export function pickPracticeQuestions(
  pool: PracticeCandidate[],
  n: number,
  opts: {
    difficulty: PracticeDifficulty;
    seed: number;
    /** Questions the student has answered; empty unless they asked to skip them. */
    seen?: ReadonlySet<string>;
    /** Share of the test given to numeric questions (JEE: 0.2). */
    numericShare?: number;
  }
): { ids: string[]; newToYou: number } | null {
  if (pool.length < n) return null;
  const rand = rng(opts.seed);
  const seen = opts.seen ?? new Set<string>();
  const share = opts.numericShare ?? 0;
  const fresh = pool.filter((c) => !seen.has(c.id));

  let picked: PracticeCandidate[];
  if (fresh.length >= n) {
    picked = pickFrom(fresh, n, opts.difficulty, share, rand);
  } else {
    const answered = pool.filter((c) => seen.has(c.id));
    picked = [...fresh, ...pickFrom(answered, n - fresh.length, opts.difficulty, share, rand)];
  }
  const ordered = sittingOrder(picked);
  return { ids: ordered.map((c) => c.id), newToYou: ordered.filter((c) => !seen.has(c.id)).length };
}

/** How many chapters "Most-asked chapters" chooses. */
export const MOST_ASKED_COUNT = 3;

/**
 * The chapters with the most past-year questions in recent years, for the
 * "Most-asked chapters" choice. A chapter with nothing to test, or never asked
 * recently, is skipped.
 */
export function mostAskedChapters(
  chapters: readonly { id: string; recentPyq: number; available: number }[],
  k = MOST_ASKED_COUNT
): string[] {
  return chapters
    .filter((c) => c.recentPyq > 0 && c.available > 0)
    .sort((a, b) => b.recentPyq - a.recentPyq || b.available - a.available || a.id.localeCompare(b.id))
    .slice(0, k)
    .map((c) => c.id);
}
