// Build a paper's rows exactly as they are written to the bank: one definition
// shared by commit.ts (first write) and correct-in-place.ts (a later fix), so a
// corrected row's content_hash is the one a re-commit would compute.
import { existsSync, readFileSync } from "node:fs";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow, type ParsedRowPayload } from "../../src/lib/upload/validate";
import { dataPath, pattern, type Paper } from "./config";
import { buildRecords, buildWithdrawnRecords, validateRows, type Derivation, type TQ } from "../upsc/lib";
import { solvableWritten, validateWritten, writtenPayload, type WrittenItem } from "./lib";

const withdrawnNote = (provisional: boolean) =>
  `Dropped by NTA: its ${provisional ? "provisional " : "final "}answer key drops this question and it was not scored. ` +
  `No option is marked correct. In PYQ Vault mocks it is awarded to every candidate.`;

export type PaperRows = {
  questions: TQ[];
  answers: Derivation[];
  answersRaw: Record<string, unknown> & { handSolutions?: number[] };
  keyed: boolean;
  reconciled: Set<number>;
  dropped: number[];
  graceNumbers: number[];
  notices: Map<number, string>;
  builtCount: number;
  withdrawnCount: number;
  /** Validated rows (incl. withdrawn), each with its contentHash. */
  parsed: ParsedRowPayload[];
  errs: string[];
  /** The stored question_number of item n: "n" on an MCQ paper, the printed
   *  label ("1(a)") on a written one. Figures and grace are matched by it. */
  qnOf: (n: number) => string;
};

/** A written paper's answers file (crosstab-written.ts). */
type WrittenAnswers = {
  written: true;
  answers: { number: number; solution: string; finalAnswer?: string; notice?: string; grace?: boolean }[];
  reconciled?: number[];
  checked?: number[];
  open?: number[];
};

function buildWrittenRows(paper: Paper, questions: TQ[], raw: WrittenAnswers): PaperRows {
  const items = questions as unknown as WrittenItem[];
  const errs = validateWritten(items);
  const byN = new Map(raw.answers.map((a) => [a.number, a]));
  const reconciled = new Set(raw.reconciled ?? []);
  const notices = new Map<number, string>();
  const parsed: ParsedRowPayload[] = [];
  // Numbering is validated over the whole transcription (a held item keeps
  // its place); rows are built only for the items not held.
  solvableWritten(items, paper.held?.numbers).forEach((q, i) => {
    const a = byN.get(q.number);
    if (!a || !a.solution?.trim()) {
      errs.push(`Q${q.number} (${q.label}): no model answer`);
      return;
    }
    // No method note on the solution (owner rule, lib/questions/methodNotes): how
    // the answer was got stays in data/<paper>.answers.json and git, never in front of a student.
    let solution = a.solution.trim();
    if (a.notice) {
      notices.set(q.number, a.notice);
      solution = `**Note:** ${a.notice}\n\n${solution}`;
    }
    const row = writtenPayload(
      {
        ...q,
        stem: normalizeNewlines(q.stem),
        ...(q.context ? { context: normalizeNewlines(q.context) } : {}),
      },
      normalizeNewlines(solution),
      i + 1
    );
    parsed.push(row);
  });
  const labels = new Map(items.map((q) => [q.number, q.label]));
  return {
    questions,
    answers: [],
    answersRaw: raw as unknown as Record<string, unknown>,
    keyed: false,
    reconciled,
    dropped: [],
    graceNumbers: raw.answers.filter((a) => a.grace).map((a) => a.number),
    notices,
    builtCount: parsed.length,
    withdrawnCount: 0,
    parsed,
    errs,
    qnOf: (n) => labels.get(n) ?? String(n),
  };
}

export function buildPaperRows(paper: Paper): PaperRows {
  if (paper.format === "written") {
    for (const f of [dataPath(paper.id, "merged"), dataPath(paper.id, "answers")]) {
      if (!existsSync(f)) throw new Error(`${f} not found — run merge.ts / crosstab-written.ts --apply first.`);
    }
    const qs: TQ[] = JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions;
    const raw = JSON.parse(readFileSync(dataPath(paper.id, "answers"), "utf8"));
    if (!raw.written) throw new Error(`${paper.id}: answers file is not a written paper's (run crosstab-written.ts)`);
    return buildWrittenRows(paper, qs, raw);
  }
  const pat = pattern(paper);
  const mergedFile = dataPath(paper.id, "merged");
  const answersFile = dataPath(paper.id, "answers");
  for (const f of [mergedFile, answersFile]) {
    if (!existsSync(f)) throw new Error(`${f} not found — run merge.ts / keycheck.ts / crosstab.ts --apply first.`);
  }

  const questions: TQ[] = JSON.parse(readFileSync(mergedFile, "utf8")).questions;
  const answersRaw = JSON.parse(readFileSync(answersFile, "utf8"));
  const answers: Derivation[] = answersRaw.answers;
  const reconciled = new Set<number>(answersRaw.reconciled ?? []);
  // Questions the key WITHDREW. They carry no correct answer, so they are absent
  // from the rows on purpose and must not read as a coverage failure.
  const dropped: number[] = answersRaw.dropped ?? [];

  const keyed = !!answersRaw.source; // keycheck.ts writes `source`; crosstab.ts does not
  const built = buildRecords(questions, answers, { reconciled });
  // The solution is the working alone, keyed paper or not: how the answer was
  // got (two blind passes, a hand check) stays in data/ and git, never in front
  // of a student (owner rule, lib/questions/methodNotes).
  const working = new Map(answers.map((a) => [a.number, a.reasoning.trim()]));
  for (const r of built) r.solution = working.get(Number(r.questionNumber)) ?? r.solution;
  // A notice (a defective or ambiguous item) goes above the solution, the same
  // "**Note:**" form the other lanes use; `grace` items go to flawed.json.
  const notices = new Map<number, string>(
    answers.filter((a) => (a as { notice?: string }).notice).map((a) => [a.number, (a as { notice?: string }).notice!])
  );
  const hindi = new Set(questions.filter((q) => q.subject === "Hindi").map((q) => q.number));
  for (const r of built) {
    const n = Number(r.questionNumber);
    const note = notices.get(n);
    if (note) r.solution = `${hindi.has(n) ? "**टिप्पणी:**" : "**Note:**"} ${note}\n\n${r.solution}`;
  }
  const graceNumbers = answers.filter((a) => (a as { grace?: boolean }).grace).map((a) => a.number);
  const withdrawn = dropped.length ? buildWithdrawnRecords(questions, dropped, withdrawnNote(!paper.key?.final)) : [];
  // Normalise long-form text at the write boundary, mirroring the upload parser.
  // `commitStaged` REJECTS a literal "\n" rather than repairing it, because
  // content_hash is computed by the caller from the pre-normalisation text.
  for (const r of [...built, ...withdrawn]) {
    r.question = normalizeNewlines(r.question);
    if (r.context) r.context = normalizeNewlines(r.context);
    if (r.solution) r.solution = normalizeNewlines(r.solution);
  }

  // Run each row through the SAME validator the Excel upload path uses.
  const errs = validateRows(built, 1, pat.questions, { exclude: [...dropped, ...(paper.held?.numbers ?? [])] });
  const parsed: ParsedRowPayload[] = [];
  // Withdrawn rows carry answer CANCELLED, which validateRows (A-D only) would
  // reject, so they go through validateRow alone.
  for (const r of [...built, ...withdrawn]) {
    const v = validateRow(r);
    if (v.errors.length) errs.push(`Q${r.questionNumber}: ${v.errors.join("; ")}`);
    else parsed.push(v.parsed!);
  }

  return {
    questions,
    answers,
    answersRaw,
    keyed,
    reconciled,
    dropped,
    graceNumbers,
    notices,
    builtCount: built.length,
    withdrawnCount: withdrawn.length,
    parsed,
    errs,
    qnOf: (n) => String(n),
  };
}
