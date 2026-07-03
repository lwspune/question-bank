// Pure helpers for the Maharashtra State Board textbook ingestion pipeline.
// Unit-tested in tests/stateboard-lib.test.ts. No IO here.
//
// State Board chapters mix MCQ and SUBJECTIVE (free-response) questions, and the
// textbook groups many exercise questions as one instruction (`Q.1`) with sub-
// items (`i) ii) iii)`). We model that with the bank-native SET model: the
// shared instruction goes in `context`, each sub-item is its own row, and
// siblings share a `setLabel` (commit turns it into a set_id).
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { findLatexImbalance } from "../practice/lib";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

/** Which part of the textbook a question came from. Drives the PUBLIC flip:
 *  only `solved` (worked examples with the book's authoritative solution) ship
 *  PUBLIC in the first pass; exercises stay PRIVATE pending answer work. */
export type Bucket = "solved" | "exercise-mcq" | "exercise-subjective";

/** One question as transcribed from the rendered textbook pages. */
export type SBQuestion = {
  /** Human-facing provenance ref → questions.question_number, e.g. "Solved Ex.2",
   *  "Ex 1.1 Q.1 (iii)", "Misc I (iv)". Must be unique within the chapter. */
  ref: string;
  bucket: Bucket;
  /** 'mcq' → has options (+ derived answer); 'subjective' → free-response, no options. */
  format: "mcq" | "subjective";
  subtopic: string; // one of the chapter's canonical DB subtopics
  difficulty: string; // vision estimate, validated to EASY|MODERATE|HARD
  stem: string; // LaTeX-bearing question text (\(...\) inline math; GFM pipe-tables allowed)
  /** Shared instruction for a set of sub-items — rides on `context`; siblings
   *  share the same `setLabel`. Omit for standalone questions. */
  context?: string;
  setLabel?: string;
  /** MCQ only: exactly A,B,C,D. */
  options?: { label: string; text: string }[];
  /** MCQ only: the (derived) correct letter A/B/C/D. Absent → flagged, row kept
   *  with no correct option (stays PRIVATE until answered). */
  answer?: string;
  /** solved: the book's model answer/solution (may contain GFM pipe-tables for
   *  truth tables). exercise-subjective: usually absent (answer pending). */
  solution?: string;
};

export type Flag = { ref: string; reason: string };
export type BuildResult = { rows: ParsedRowPayload[]; flags: Flag[] };

export type BuildChapter = {
  chapterName: string;
  subjectName: string;
  subtopics: string[];
};

function normalizeMcqOptions(q: SBQuestion): { label: OptionLabel; text: string }[] {
  const opts = q.options ?? [];
  const byLabel = new Map(opts.map((o) => [o.label.trim().toUpperCase(), o.text]));
  if (opts.length !== 4 || !LABELS.every((l) => byLabel.has(l))) {
    throw new Error(`${q.ref}: MCQ options must be exactly A,B,C,D (got ${opts.map((o) => o.label).join(",") || "none"})`);
  }
  return LABELS.map((l) => ({ label: l, text: byLabel.get(l) as string }));
}

/**
 * Merge transcribed questions into commit-ready rows. Hard errors (bad options /
 * unknown subtopic / bad difficulty / answer with no matching option / a
 * subjective question carrying options) throw — they mean a transcription
 * mistake to fix. Soft conditions become flags (an MCQ with no derived answer;
 * a solved example with no solution).
 */
export function buildRecords(chapter: BuildChapter, questions: SBQuestion[]): BuildResult {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const subtopicSet = new Set(chapter.subtopics);
  const seenRefs = new Set<string>();

  let sourceRow = 0;
  for (const q of questions) {
    sourceRow++;
    if (seenRefs.has(q.ref)) throw new Error(`duplicate ref "${q.ref}"`);
    seenRefs.add(q.ref);

    if (!subtopicSet.has(q.subtopic)) {
      throw new Error(`${q.ref}: subtopic "${q.subtopic}" not one of [${chapter.subtopics.join(", ")}]`);
    }
    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`${q.ref}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }

    const base = {
      sourceRow,
      questionNumber: q.ref,
      subjectName: chapter.subjectName,
      chapterName: chapter.chapterName,
      subtopicName: q.subtopic,
      context: q.context,
      setLabel: q.setLabel,
      text: q.stem,
      difficulty,
      solution: q.solution ?? undefined,
    };

    if (q.format === "subjective") {
      if (q.options && q.options.length > 0) {
        throw new Error(`${q.ref}: subjective question must not carry options`);
      }
      if (q.bucket === "solved" && !q.solution) {
        flags.push({ ref: q.ref, reason: "solved example has no solution — should carry the book's answer" });
      }
      rows.push({
        ...base,
        questionFormat: "subjective",
        options: [],
        contentHash: subjectiveContentHash(q.stem, q.context ?? null),
      });
      continue;
    }

    // MCQ
    const opts = normalizeMcqOptions(q);
    const answer = q.answer?.trim().toUpperCase();
    if (answer && !LABELS.includes(answer as OptionLabel)) {
      throw new Error(`${q.ref}: answer "${q.answer}" invalid (must be A/B/C/D)`);
    }
    const options = opts.map((o) => ({ ...o, isCorrect: !!answer && o.label === answer }));
    if (!answer) {
      flags.push({ ref: q.ref, reason: "MCQ has no derived answer — kept PRIVATE, no correct option set" });
    } else if (!options.some((o) => o.isCorrect)) {
      throw new Error(`${q.ref}: answer ${answer} matched no option`);
    }

    rows.push({
      ...base,
      questionFormat: "mcq",
      options,
      contentHash: contentHash(q.stem, options.map((o) => o.text), answer ?? ""),
    });
  }

  return { rows, flags };
}

/** Collect LaTeX-delimiter imbalances across every text field of every row —
 *  a pre-commit guard against transcription typos before they hit the renderer. */
export function latexImbalances(rows: ParsedRowPayload[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const fields: [string, string | undefined][] = [
      ["stem", r.text],
      ["context", r.context],
      ["solution", r.solution],
      ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, val] of fields) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) out.push(`${r.questionNumber} ${name}: ${bad}`);
    }
  }
  return out;
}
