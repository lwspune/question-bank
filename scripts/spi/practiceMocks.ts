/**
 * SPI practice mocks (owner, 2026-11-17): every SPI practice paper served whole as a timed mock
 * at the 2026 pattern (SPI_PRACTICE_PAPER, +4 / -1). Pure: the CLI (practice-mocks.ts) hashes
 * each transcript the way commit.ts does, finds each row's id, and writes the committed list
 * scripts/mocks/data/spi-practice.json that build-practice-mocks.ts builds from.
 *
 * Why by hash, not by source_file + number: an LWS mock re-prints questions of an earlier mock,
 * and content_hash (unique per exam) kept ONE row under the earlier mock's source_file. Hashing
 * the transcript finds that row wherever it lives.
 *
 * Unit-tested in tests/spi-practice-mocks.test.ts.
 */
import type { PracticeQuestionRef } from "../mocks/practiceSittings";

/** A mock: its printed halves in order, each numbered from `offset` (GAT files print 1-75). */
export type PracticeMockSpec = {
  key: string;
  slug: string;
  title: string;
  parts: { paperId: string; offset: number }[];
};

/** Provenance stamped on each mock (pyq_note-style): an assembled paper, not a sitting. */
export const SPI_PRACTICE_NOTE = "SPI practice paper served whole (not a past sitting)";

const pair = (id: string, slug: string, title: string): PracticeMockSpec => ({
  key: id,
  slug,
  title,
  parts: [
    { paperId: `${id}-maths`, offset: 0 },
    { paperId: `${id}-gat`, offset: 75 },
  ],
});

// Titles name the exam and the kind of test, never the source's internal label (no "LWS").
export const SPI_PRACTICE_MOCKS: PracticeMockSpec[] = [
  pair("sample", "spi-practice-sample", "SPI Sample Paper"),
  pair("qp1", "spi-practice-paper-1", "SPI Practice Paper 1"),
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    key: `mock-${n}`,
    slug: `spi-practice-mock-${n}`,
    title: `SPI Practice Mock ${n}`,
    parts: [{ paperId: `mock-${n}`, offset: 0 }],
  })),
];

/** One transcript block, hashed the way commit.ts hashes it. */
export type NumberedRow = { paperId: string; number: number; hash: string; flawed: boolean };

/**
 * The mock's question list in printed order. A row the bank does not hold is refused (a mock
 * must be the paper or nothing); a question the paper prints twice is left out and reported,
 * since one mock cannot show one question twice.
 */
export function assemblePracticeMock(
  spec: PracticeMockSpec,
  rows: NumberedRow[],
  idByHash: Map<string, string>
): { questions: PracticeQuestionRef[]; dropped: string[] } {
  const questions: PracticeQuestionRef[] = [];
  const dropped: string[] = [];
  const seen = new Map<string, number>();
  for (const part of spec.parts) {
    const own = rows.filter((r) => r.paperId === part.paperId).sort((a, b) => a.number - b.number);
    for (const r of own) {
      const id = idByHash.get(r.hash);
      if (!id) throw new Error(`${r.paperId} Q${r.number}: no bank row has its content_hash`);
      const n = part.offset + r.number;
      const first = seen.get(id);
      if (first !== undefined) {
        dropped.push(`${r.paperId} Q${r.number} repeats n=${first}`);
        continue;
      }
      seen.set(id, n);
      questions.push({ n, kind: "bank", questionId: id, ...(r.flawed ? { grace: true as const } : {}) });
    }
  }
  return { questions, dropped };
}
