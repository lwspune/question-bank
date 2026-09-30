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
};

/** Pool size at which a chapter carries a 20-question test. */
export const LONG_TEST_MIN_POOL = 60;
/** Pool size below which a chapter gets no test at all. */
export const SHORT_TEST_MIN_POOL = 30;

/** The test length a chapter's eligible pool can carry; null = no test. */
export function sectionalSize(poolCount: number): number | null {
  if (poolCount >= LONG_TEST_MIN_POOL) return 20;
  if (poolCount >= SHORT_TEST_MIN_POOL) return 15;
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
  n: number
): MockPaperBlueprint {
  const section = bp.sections.find((s) => s.key === sectionKey);
  if (!section) {
    throw new Error(`${bp.examSlug}/${bp.code} has no section "${sectionKey}"`);
  }
  return {
    ...bp,
    durationSecs: sectionalDurationSecs(bp, n),
    sections: [{ key: section.key, label: section.label, subjects: section.subjects, count: n }],
  };
}

/** A single-answer MCQ, rated, and not tied to a shared context. */
export function isSectionalEligible(c: SectionalCandidate): boolean {
  return (
    !c.setBound &&
    c.format === "mcq" &&
    c.correctCount === 1 &&
    c.difficulty !== null
  );
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
  n: number
): SectionalCandidate[] | null {
  const eligible = pool.filter(isSectionalEligible);
  if (eligible.length < n) return null;

  const counts = { EASY: 0, MODERATE: 0, HARD: 0 };
  for (const c of eligible) counts[c.difficulty!] += 1;
  const quotas = difficultyQuotas(counts, n);

  return DIFFICULTIES.flatMap((d) =>
    roundRobin(
      eligible.filter((c) => c.difficulty === d),
      quotas[d]
    )
  );
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
