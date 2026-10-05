/**
 * Chapter tests — the first SECTIONAL mocks (migration 0088, `scope='sectional'`).
 *
 * A chapter test is a short timed sitting on one chapter, built from that
 * chapter's past-year questions and delivered by the same runner, grader,
 * review and findings card as a full paper. It exists because students open a
 * full paper and stop: on MHT-CET Paper II the median attempt answered 8% of
 * it (2026-09-30). It is an EXPERIMENT beside the past papers, not a
 * replacement for them.
 *
 * WHAT IS DECIDED HERE, and why each rule is in the pure core:
 *   - SIZE follows the chapter's pool (sectionalSize), so a thin chapter gets no
 *     test rather than a test that IS the chapter.
 *   - DURATION is the real paper's own rate (sectionalDurationSecs), so the test
 *     trains the pace the exam demands. MHT-CET has no negative marking, which
 *     makes pace the one skill a timed test can teach.
 *   - SELECTION (pickSectionalQuestions) keeps the chapter's difficulty mix and
 *     spreads across its subtopics, because the findings card reports per
 *     subtopic and a test drawn from one subtopic would diagnose nothing.
 *     Repeats with full papers are allowed on purpose: the questions are the
 *     exam's own, and meeting one twice is practice, not a defect.
 *   - NUMERIC questions (JEE Section B) ride in a chapter test at the paper's
 *     own share (numericShare), after the MCQs, as the paper prints them.
 *   - WHOLE SETS (pickSectionalSets) make the English tests: every English
 *     question belongs to a set sharing one passage or one set of directions,
 *     so a test there is built from complete sets, never from loose members.
 *   - Everything is DETERMINISTIC (sorted by id, no randomness), so a dry run
 *     prints exactly what --apply writes. The chosen ids are then COMMITTED as
 *     data by the builder, so a later ingest cannot reshuffle a test students
 *     have already sat.
 *
 * Pure — no I/O. Unit-tested in tests/mock-sectional.test.ts.
 */

import { totalQuestions, type MockPaperBlueprint } from "./blueprints";

export type SectionalDifficulty = "EASY" | "MODERATE" | "HARD";

/** One bank row that could go into a chapter test. */
export type SectionalCandidate = {
  id: string;
  difficulty: SectionalDifficulty | null;
  subtopic: string | null;
  /** Carries a set_id or a shared context — unusable alone. */
  setBound: boolean;
  format: string;
  /** How many options are marked correct. */
  correctCount: number;
  /** A numeric question carries its answer in `numeric_answer`. */
  hasNumericKey?: boolean;
};

/** Pool size at which a chapter carries a 20-question test. */
export const LONG_TEST_MIN_POOL = 60;
/** Pool size below which a chapter gets no test at all, unless the exam lowers it. */
export const SHORT_TEST_MIN_POOL = 30;

/**
 * The test length a chapter's eligible pool can carry; null = no test.
 *
 * `minPool` below 30 gives the chapters between it and 30 a 10-question test.
 * MHT-CET keeps the default; NDA, CDS and JEE lower it to 20 (2026-10-05), so a
 * thin GK chapter is still something a student can sit in ten minutes.
 */
export function sectionalSize(poolCount: number, minPool = SHORT_TEST_MIN_POOL): number | null {
  if (poolCount >= LONG_TEST_MIN_POOL) return 20;
  if (poolCount >= SHORT_TEST_MIN_POOL) return 15;
  if (poolCount >= minPool) return 10;
  return null;
}

/**
 * Seconds for an n-question test at the real paper's own rate, rounded UP to a
 * whole minute. Rounding down would make a chapter test stricter than the exam.
 */
export function sectionalDurationSecs(bp: MockPaperBlueprint, n: number): number {
  const perQuestion = bp.durationSecs / totalQuestions(bp);
  return Math.ceil((n * perQuestion) / 60) * 60;
}

/**
 * A one-section blueprint for a chapter test on `sectionKey` of the real paper.
 *
 * It keeps the real paper's code, label and marking, so the catalogue files the
 * test under the right paper and grading uses the exam's own scheme. The
 * section's `count` is the test length, which buildMockPaper enforces as a hard
 * contract — a test that builds is a test of exactly that size.
 */
export function sectionalBlueprint(
  bp: MockPaperBlueprint,
  sectionKey: string,
  n: number,
  /**
   * The section's name on this test. The catalogue groups chapter tests by it,
   * so a GK chapter passes its subject ("Physics") instead of the paper's
   * "General Knowledge". The key, and with it the marking, stays the paper's.
   */
  label?: string
): MockPaperBlueprint {
  const section = bp.sections.find((s) => s.key === sectionKey);
  if (!section) {
    throw new Error(`${bp.examSlug}/${bp.code} has no section "${sectionKey}"`);
  }
  return {
    ...bp,
    durationSecs: sectionalDurationSecs(bp, n),
    sections: [{ key: section.key, label: label ?? section.label, subjects: section.subjects, count: n }],
  };
}

/** The grader can mark it: one correct option, or a numeric answer. */
function isMarkable(c: SectionalCandidate): boolean {
  if (c.format === "mcq") return c.correctCount === 1;
  if (c.format === "numeric") return c.hasNumericKey === true;
  return false;
}

/** Markable, rated, and not tied to a shared context. */
export function isSectionalEligible(c: SectionalCandidate): boolean {
  return !c.setBound && isMarkable(c) && c.difficulty !== null;
}

const DIFFICULTIES: readonly SectionalDifficulty[] = ["EASY", "MODERATE", "HARD"];

/**
 * Seats per difficulty, proportional to the pool (largest remainder). Ties in
 * the remainder go to the earlier difficulty, so the split is stable.
 */
function difficultyQuotas(
  counts: Record<SectionalDifficulty, number>,
  n: number
): Record<SectionalDifficulty, number> {
  const total = DIFFICULTIES.reduce((s, d) => s + counts[d], 0);
  const exact = DIFFICULTIES.map((d) => (n * counts[d]) / total);
  const seats = exact.map(Math.floor);
  let left = n - seats.reduce((s, x) => s + x, 0);
  const byRemainder = DIFFICULTIES.map((_, i) => i).sort(
    (a, b) => exact[b] - seats[b] - (exact[a] - seats[a]) || a - b
  );
  for (const i of byRemainder) {
    if (left === 0) break;
    seats[i] += 1;
    left -= 1;
  }
  return { EASY: seats[0], MODERATE: seats[1], HARD: seats[2] };
}

/**
 * Take `k` from one difficulty, one subtopic at a time in turn, so the test
 * touches as many of the chapter's subtopics as it has seats for. Subtopics
 * are visited largest first; within one, by id.
 */
function roundRobin(rows: SectionalCandidate[], k: number): SectionalCandidate[] {
  const bySub = new Map<string, SectionalCandidate[]>();
  for (const r of rows) {
    const key = r.subtopic ?? "";
    const list = bySub.get(key) ?? [];
    list.push(r);
    bySub.set(key, list);
  }
  const queues = [...bySub.entries()]
    .map(([name, list]) => ({ name, list: [...list].sort((a, b) => a.id.localeCompare(b.id)) }))
    .sort((a, b) => b.list.length - a.list.length || a.name.localeCompare(b.name));

  const out: SectionalCandidate[] = [];
  for (let round = 0; out.length < k; round++) {
    let took = false;
    for (const q of queues) {
      if (out.length === k) break;
      const next = q.list[round];
      if (next) {
        out.push(next);
        took = true;
      }
    }
    if (!took) break;
  }
  return out;
}

/**
 * The n questions of a chapter test, in sitting order: easy, then moderate,
 * then hard. Null when the eligible pool is smaller than n.
 */
export function pickSectionalQuestions(
  pool: SectionalCandidate[],
  n: number,
  /**
   * The share of the test given to numeric questions — 0.2 for JEE, whose
   * paper prints 20 MCQs and 5 numeric per subject. Rounded; when the chapter
   * is short of one format, the other fills the gap.
   */
  opts: { numericShare?: number } = {}
): SectionalCandidate[] | null {
  const eligible = pool.filter(isSectionalEligible);
  if (eligible.length < n) return null;

  const mcq = eligible.filter((c) => c.format === "mcq");
  const numeric = eligible.filter((c) => c.format === "numeric");
  let numericSeats = Math.min(Math.round(n * (opts.numericShare ?? 0)), numeric.length);
  let mcqSeats = n - numericSeats;
  if (mcqSeats > mcq.length) {
    numericSeats += mcqSeats - mcq.length;
    mcqSeats = mcq.length;
  }

  // MCQs first, then numeric: the order the paper prints them in.
  return [...pickByDifficulty(mcq, mcqSeats), ...pickByDifficulty(numeric, numericSeats)];
}

/** `k` of `rows`, keeping their difficulty mix, easy to hard. */
function pickByDifficulty(rows: SectionalCandidate[], k: number): SectionalCandidate[] {
  if (k === 0) return [];
  const counts = { EASY: 0, MODERATE: 0, HARD: 0 };
  for (const c of rows) counts[c.difficulty!] += 1;
  const quotas = difficultyQuotas(counts, k);
  return DIFFICULTIES.flatMap((d) =>
    roundRobin(
      rows.filter((c) => c.difficulty === d),
      quotas[d]
    )
  );
}

/** One set of an English chapter: a passage or a block of shared directions. */
export type SectionalSet = {
  setId: string;
  /** Orders sets newest first, e.g. year * 100 + month. */
  sitting: number;
  /** Every member of the set, in printed order. */
  members: SectionalCandidate[];
};

/** How long a test built from whole sets may run: at least 15, aim 20, at most 25. */
export const SET_TEST_SIZE = { min: 15, target: 20, max: 25 } as const;

/**
 * An English chapter test made of WHOLE sets, newest sitting first, in printed
 * order. A set is taken while it keeps the test within 25 questions, until the
 * test reaches 20; a set with any member the grader cannot mark is skipped
 * whole. Null when whole sets cannot reach 15. Difficulty plays no part: a set
 * is sat in the order it was printed.
 */
export function pickSectionalSets(
  sets: SectionalSet[],
  size: { min: number; target: number; max: number } = SET_TEST_SIZE
): SectionalCandidate[] | null {
  const usable = sets
    .filter((s) => s.members.length > 0 && s.members.length <= size.max && s.members.every(isMarkable))
    .sort((a, b) => b.sitting - a.sitting || a.setId.localeCompare(b.setId));

  const out: SectionalCandidate[] = [];
  for (const s of usable) {
    if (out.length >= size.target) break;
    if (out.length + s.members.length <= size.max) out.push(...s.members);
  }
  return out.length >= size.min ? out : null;
}

/**
 * Catalogue order for a subject's chapters: the chapters with a measured
 * recent weight first (questions per paper, heaviest first), then the rest by
 * pool size, then by name. The order is frozen into each slug, so a student
 * sees the chapters that carry the most marks at the top of the list.
 */
export function orderChapters<T extends { name: string; pyq: number }>(
  chapters: T[],
  weights: Map<string, number>
): T[] {
  return [...chapters].sort((a, b) => {
    const wa = weights.get(a.name);
    const wb = weights.get(b.name);
    if (wa !== undefined && wb !== undefined) return wb - wa || a.name.localeCompare(b.name);
    if (wa !== undefined) return -1;
    if (wb !== undefined) return 1;
    return b.pyq - a.pyq || a.name.localeCompare(b.name);
  });
}

/**
 * Book order for a board's chapter tests: a school student reads the catalogue
 * against the textbook, so chapter 1 lists first. Chapters with no number go
 * last, by name. Boards have no recent-weight grid to order by in any case.
 */
export function orderChaptersByBook<T extends { name: string; orderIndex: number | null }>(
  chapters: T[]
): T[] {
  return [...chapters].sort((a, b) => {
    if (a.orderIndex !== null && b.orderIndex !== null) {
      return a.orderIndex - b.orderIndex || a.name.localeCompare(b.name);
    }
    if (a.orderIndex !== null) return -1;
    if (b.orderIndex !== null) return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * The `source` a chapter test is stored with, from its questions' kinds. The
 * catalogue badges a sectional test "Past paper" for `pyq`, so one textbook
 * question makes the whole test `practice`: the badge may undersell a test,
 * never overclaim one. An empty test is refused rather than labelled.
 */
export function sectionalSource(kinds: string[]): "pyq" | "practice" {
  if (kinds.length === 0) throw new Error("sectionalSource: a test with no questions has no source");
  return kinds.every((k) => k === "pyq") ? "pyq" : "practice";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * `mht-cet-chapter-maths-01-vectors`. The `chapter` segment keeps these out of
 * the past-paper namespace (a sitting key never reads "chapter"), so
 * slugToUuid() cannot collide with a real paper's id. The order number is what
 * the catalogue sorts on.
 */
export function sectionalSlug(
  examSlug: string,
  subjectCode: string,
  seq: number,
  chapter: string
): string {
  return `${examSlug}-chapter-${subjectCode}-${String(seq).padStart(2, "0")}-${slugify(chapter)}`;
}

/** "MHT-CET Vectors — Chapter test". Names the exam, since a shared link has no other context. */
export function sectionalTitle(examName: string, chapter: string): string {
  return `${examName} ${chapter} — Chapter test`;
}
