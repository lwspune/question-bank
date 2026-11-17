// Build a paper's rows exactly as they are written to the bank: one definition
// shared by commit.ts (first write) and correct-in-place.ts (a later fix), so a
// corrected row's content_hash is the one a re-commit would compute.
import { existsSync, readFileSync } from "node:fs";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow, type ParsedRowPayload } from "../../src/lib/upload/validate";
import { dataPath, pattern, type Paper } from "./config";
import { buildRecords, buildWithdrawnRecords, validateRows, type Derivation, type TQ } from "../upsc/lib";

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
};

export function buildPaperRows(paper: Paper): PaperRows {
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

  const issuer = paper.exam.startsWith("aissee") ? "NTA" : paper.exam === "rimc" ? "RIMC" : "the Rashtriya Military Schools";
  const keyed = !!answersRaw.source; // keycheck.ts writes `source`; crosstab.ts does not

  const built = buildRecords(questions, answers, { reconciled });
  const working = new Map(answers.map((a) => [a.number, a.reasoning.trim()]));
  if (keyed) {
    // The key supplied the letter, so the shared "no official key" bracket is false.
    for (const r of built) r.solution = working.get(Number(r.questionNumber)) ?? r.solution;
  } else {
    // No key: say so plainly, and say which rows a person checked.
    const checked = new Set<number>(answersRaw.checked ?? []);
    const overruled = new Set<number>(answersRaw.overruled ?? []);
    const byNumber = new Map(questions.map((q) => [q.number, q]));
    for (const r of built) {
      const n = Number(r.questionNumber);
      // A question printed only in Hindi (RMS Class 9's Hindi section) gets the
      // note in Hindi, as MPSC Mains writes its note in the question's language.
      if (byNumber.get(n)?.subject === "Hindi") {
        const hiHow = overruled.has(n)
          ? "दो स्वतंत्र हलों का उत्तर एक था; उसे जाँचकर बदला गया।"
          : reconciled.has(n)
            ? "दो स्वतंत्र हलों के उत्तर अलग थे; उत्तर जाँचकर तय किया गया।"
            : checked.has(n)
              ? "दो स्वतंत्र हलों का उत्तर एक आया, और उसे जाँचा भी गया।"
              : "दो स्वतंत्र हलों का उत्तर एक आया।";
        r.solution = `${working.get(n) ?? ""} [उत्तर PYQ Vault ने निकाला है: इस प्रश्नपत्र की उत्तर-कुंजी प्रकाशित नहीं हुई है। ${hiHow}]`.trim();
        continue;
      }
      const how = overruled.has(n)
        ? "Two independent solutions agreed on another answer; it was corrected by hand."
        : reconciled.has(n)
          ? "Two independent solutions disagreed; the answer was settled by hand."
          : checked.has(n)
            ? "Two independent solutions agreed, and the answer was checked by hand."
            : "Two independent solutions agreed.";
      r.solution = `${working.get(n) ?? ""} [Answer worked out by PYQ Vault: ${issuer} has not published a key for this paper. ${how}]`.trim();
    }
  }
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
  };
}
