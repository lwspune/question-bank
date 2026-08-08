/**
 * Pure record-building for the NDA mock-test ingestion.
 * Unit-tested in tests/nda-mock-build.test.ts. No IO here.
 *
 * Differs from scripts/practice/lib.ts in one structural way: a practice TOPIC
 * is one chapter, but a MOCK PAPER spans the whole syllabus (~25 chapters over
 * 120 questions), so `chapter` is a PER-QUESTION field validated against a
 * catalog — the same shape mh-ssc-10 needed when one printed paper carried two
 * bank subjects. Crucially a question's subtopic is validated against ITS OWN
 * chapter's list, never the union, so a subtopic filed under the wrong chapter
 * fails loudly instead of silently passing.
 */
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";

export { findLatexImbalance } from "../practice/lib";

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

/** chapter name -> its allowed subtopic names, as they exist in the DB. */
export type Catalog = Record<string, string[]>;

export type MockQuestion = {
  number: number;
  /**
   * What to STORE as question_number. Defaults to `number`. It exists because a
   * paper can print the same number twice (Mock 10 has two "96"s), so the
   * internal key has to stay unique while the stored label stays faithful to the
   * printed paper.
   */
  numberLabel?: string;
  stem: string;
  options: { label: string; text: string }[];
  context?: string;
  setLabel?: string;
  solution?: string | null;
  /** The settled answer letter. A question with none is skipped, never guessed. */
  answer: string | null;
  chapter: string;
  subtopic: string;
  difficulty: string;
};

export type Flag = { number: number; reason: string };
export type BuildResult = { rows: ParsedRowPayload[]; flags: Flag[] };

function normalizeOptions(q: MockQuestion): { label: OptionLabel; text: string }[] {
  const byLabel = new Map(q.options.map((o) => [o.label.trim().toUpperCase(), o.text]));
  if (q.options.length !== 4 || !LABELS.every((l) => byLabel.has(l))) {
    throw new Error(
      `Q${q.number}: options must be exactly A,B,C,D (got ${q.options.map((o) => o.label).join(",")})`,
    );
  }
  return LABELS.map((l) => ({ label: l, text: byLabel.get(l) as string }));
}

/**
 * Merge settled questions into commit-ready rows.
 *
 * Hard errors (unknown chapter, subtopic not in THAT chapter, bad difficulty,
 * malformed options, an answer letter matching no option) throw: each means a
 * classification or transcription mistake that must be fixed, not shipped.
 * A question with no settled answer is skipped with a flag — the paper's key
 * is not trusted blindly, so an unresolved question stays out of the bank.
 */
export function buildRecords(
  questions: MockQuestion[],
  catalog: Catalog,
  opts: { subjectName?: string } = {},
): BuildResult {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];

  for (const q of [...questions].sort((a, b) => a.number - b.number)) {
    const allowed = catalog[q.chapter];
    if (!allowed) {
      throw new Error(`Q${q.number}: chapter "${q.chapter}" is not in the live NDA Mathematics catalog`);
    }
    if (!allowed.includes(q.subtopic)) {
      throw new Error(
        `Q${q.number}: subtopic "${q.subtopic}" does not belong to chapter "${q.chapter}" ` +
          `(allowed: ${allowed.join(", ")})`,
      );
    }

    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`Q${q.number}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }

    const opts4 = normalizeOptions(q);

    if (!q.answer) {
      flags.push({
        number: q.number,
        reason: "no settled answer — left out of the commit",
      });
      continue;
    }
    const letter = q.answer.trim().toUpperCase();
    if (!LABELS.includes(letter as OptionLabel)) {
      throw new Error(`Q${q.number}: answer letter "${q.answer}" invalid`);
    }
    const options = opts4.map((o) => ({ ...o, isCorrect: o.label === letter }));
    if (!options.some((o) => o.isCorrect)) {
      throw new Error(`Q${q.number}: answer ${letter} matched no option`);
    }

    if (!q.solution) flags.push({ number: q.number, reason: "no solution in source" });

    // Normalise before hashing so the stored text IS the hash's preimage —
    // commitStaged rejects a literal backslash-n rather than repairing it.
    const text = normalizeNewlines(q.stem);
    const context = q.context ? normalizeNewlines(q.context) : undefined;
    const solution = q.solution ? normalizeNewlines(q.solution) : undefined;

    rows.push({
      sourceRow: q.number,
      questionNumber: q.numberLabel ?? String(q.number),
      subjectName: opts.subjectName ?? "Mathematics",
      chapterName: q.chapter,
      subtopicName: q.subtopic,
      ...(context ? { context } : {}),
      ...(q.setLabel ? { setLabel: q.setLabel } : {}),
      text,
      difficulty,
      ...(solution ? { solution } : {}),
      options,
      contentHash: contentHash(
        text,
        options.map((o) => o.text),
        letter,
      ),
    });
  }

  return { rows, flags };
}
