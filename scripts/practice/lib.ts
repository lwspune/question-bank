// Pure helpers for the NDA Maths practice ingestion pipeline.
// Unit-tested in tests/practice-extract.test.ts. No IO here.
import { contentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

/** One question as transcribed (by vision) from a rendered page image. */
export type TranscribedQuestion = {
  number: number;
  subtopic: string; // must be one of the topic's canonical DB subtopics
  difficulty: string; // vision estimate, validated to EASY|MODERATE|HARD
  stem: string; // LaTeX-bearing question text (\(...\) inline math)
  options: { label: string; text: string }[]; // exactly A,B,C,D
};

export type TranscribedSolution = { number: number; solution: string };

export type Flag = { number: number; reason: string };
export type BuildResult = { rows: ParsedRowPayload[]; flags: Flag[] };

export type BuildTopic = {
  chapterName: string;
  qFrom: number;
  qTo: number;
  subtopics: string[];
  subjectName?: string; // default "Mathematics" — set for non-Maths practice topics
};

/**
 * Parse the whole-Algebra answer-letter list (PDF text layer) into a map of
 * question number → correct letters, scoped to [from, to]. Handles the source's
 * loose formatting: `406. b`, `406.\nb`, `936 d` (missing dot), and multi-key
 * `972. b,c` / `987. a,b,c,d`. A number with no following letter (e.g. a blank
 * key, or a stray header number) simply doesn't appear in the map.
 */
export function parseAnswerKey(text: string, from: number, to: number): Map<number, string[]> {
  const out = new Map<number, string[]>();
  const re = /(\d{1,4})\.?\s*([a-dA-D](?:\s*,\s*[a-dA-D])*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const n = Number(m[1]);
    if (n < from || n > to) continue;
    const letters = m[2]
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s.length === 1);
    // First occurrence wins (the source never re-keys within a range).
    if (!out.has(n)) out.set(n, letters);
  }
  return out;
}

/**
 * Returns a reason string if the text has unbalanced KaTeX delimiters, else null.
 * Checks inline \( \) and display \[ \] are balanced and correctly nested/ordered.
 * A lightweight guard against transcription typos before they reach the renderer.
 */
export function findLatexImbalance(text: string): string | null {
  let inInline = false;
  let inDisplay = false;
  for (let i = 0; i < text.length - 1; i++) {
    if (text[i] !== "\\") continue;
    const d = text[i + 1];
    if (d === "(") {
      if (inInline || inDisplay) return "nested or unclosed \\(";
      inInline = true;
      i++;
    } else if (d === ")") {
      if (!inInline) return "\\) without matching \\(";
      inInline = false;
      i++;
    } else if (d === "[") {
      if (inInline || inDisplay) return "nested or unclosed \\[";
      inDisplay = true;
      i++;
    } else if (d === "]") {
      if (!inDisplay) return "\\] without matching \\[";
      inDisplay = false;
      i++;
    }
  }
  if (inInline) return "unclosed \\(";
  if (inDisplay) return "unclosed \\[";
  return null;
}

/** Numbers in [from,to] absent from the transcription (coverage gaps). */
export function missingNumbers(questions: TranscribedQuestion[], from: number, to: number): number[] {
  const have = new Set(questions.map((q) => q.number));
  const gaps: number[] = [];
  for (let n = from; n <= to; n++) if (!have.has(n)) gaps.push(n);
  return gaps;
}

function normalizeOptions(q: TranscribedQuestion): { label: OptionLabel; text: string }[] {
  const byLabel = new Map(q.options.map((o) => [o.label.trim().toUpperCase(), o.text]));
  if (q.options.length !== 4 || !LABELS.every((l) => byLabel.has(l))) {
    throw new Error(`Q${q.number}: options must be exactly A,B,C,D (got ${q.options.map((o) => o.label).join(",")})`);
  }
  return LABELS.map((l) => ({ label: l, text: byLabel.get(l) as string }));
}

/**
 * Merge transcribed questions + parsed answer key + transcribed solutions into
 * commit-ready rows. Hard errors (bad options / unknown subtopic / bad
 * difficulty / answer-letter with no matching option) throw — they mean a
 * transcription mistake to fix. Soft conditions become flags:
 *   - no answer key (and no override) → skip the row + flag
 *   - multi-key (>1 correct) → emit the row (multiple isCorrect) + flag for review
 *   - missing solution → flag (note)
 * `answerOverrides` supplies a key for a question the source left blank.
 */
export function buildRecords(
  topic: BuildTopic,
  questions: TranscribedQuestion[],
  answers: Map<number, string[]>,
  solutions: Map<number, string>,
  answerOverrides: Record<number, string[]> = {}
): BuildResult {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const subtopicSet = new Set(topic.subtopics);

  const inRange = questions
    .filter((q) => q.number >= topic.qFrom && q.number <= topic.qTo)
    .sort((a, b) => a.number - b.number);

  for (const q of inRange) {
    if (!subtopicSet.has(q.subtopic)) {
      throw new Error(`Q${q.number}: subtopic "${q.subtopic}" not one of [${topic.subtopics.join(", ")}]`);
    }
    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`Q${q.number}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }
    const opts = normalizeOptions(q);

    const letters = answerOverrides[q.number] ?? answers.get(q.number);
    if (!letters || letters.length === 0) {
      flags.push({ number: q.number, reason: "no answer key — supply an answerOverride or set PRIVATE-for-review" });
      continue;
    }
    const correct = new Set(letters.map((l) => l.toUpperCase()));
    for (const l of correct) {
      if (!LABELS.includes(l as OptionLabel)) throw new Error(`Q${q.number}: answer letter "${l}" invalid`);
    }
    const options = opts.map((o) => ({ ...o, isCorrect: correct.has(o.label) }));
    if (!options.some((o) => o.isCorrect)) {
      throw new Error(`Q${q.number}: answer key [${[...correct].join(",")}] matched no option`);
    }
    if (correct.size > 1) {
      flags.push({ number: q.number, reason: `multi-key (${[...correct].sort().join(",")}) — review before PUBLIC` });
    }

    const solution = solutions.get(q.number);
    if (!solution) flags.push({ number: q.number, reason: "no solution in source" });

    rows.push({
      sourceRow: q.number,
      questionNumber: String(q.number),
      subjectName: topic.subjectName ?? "Mathematics",
      chapterName: topic.chapterName,
      subtopicName: q.subtopic,
      text: q.stem,
      difficulty,
      solution: solution ?? undefined,
      options,
      contentHash: contentHash(
        q.stem,
        options.map((o) => o.text),
        [...correct].sort().join(",")
      ),
    });
  }

  return { rows, flags };
}
