/**
 * Assemble a papers/<paperId>.json for a SAFE-key JEE paper (sequential /
 * by-number / positional-180 — where the extracted answer key is trustworthy)
 * from the classification+solution agent outputs.
 *
 *   npx tsx scripts/jee/assemble-safe.ts <paperId> <sourceFile> <pyqYear> "<pyqNote>"
 *
 * Reads out/<paperId>.records.json (Maths rows + extracted keys) + every
 * out/<paperId>_sol_*.json (agent output: {qn:{chapter,subtopic,solution,flag?}}).
 * Emits classification + answerOverrides (extracted MCQ key) + numericOverrides
 * (extracted NAT answer) + authoredSolutions. Reports flagged keys + any MCQ
 * with no extracted key (needs a manual answer) — resolve those by hand before commit.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { recordsPath, paperDataPath, requirePaperId } from "./config";
import { cleanSolution } from "./sol-clean";
import { parseSubjectArg, solFilesForSubject } from "./lib";

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  numericAnswer?: number | null;
  options: { label: string; text: string; isCorrect: boolean }[] | null;
};
type Sol = { chapter: string; subtopic: string; solution: string; flag?: string; answer?: string; skip?: boolean; skipReason?: string };

/**
 * Some classification agents double-escape their LaTeX (writing `\\(`, `\\frac`
 * for the inline delimiter/commands). The literal `\\(` is never valid LaTeX —
 * the inline delimiter is a single-backslash `\(` — so its presence is an
 * unambiguous signal the whole string is double-escaped; halve every run.
 * This correctly reduces command `\\frac`->`\frac` AND matrix row-sep `\\\\`->`\\`.
 */
export function normalizeEscaping(sol: string): string {
  if (sol.includes("\\\\(")) return sol.replace(/\\\\/g, "\\");
  return sol;
}

function main() {
  const paperId = requirePaperId(process.argv, 2, 'assemble-safe.ts <paperId> [<sourceFile> <pyqYear> "<pyqNote>"]');

  // When a paper file already exists (it does for every paper whose Maths or
  // Physics block shipped first), reuse its identity rather than making the
  // caller retype it — a mistyped sourceFile would scope the commit to a
  // filename no other subject uses and silently create a parallel paper.
  let prior: Record<string, any> = {};
  try {
    prior = JSON.parse(readFileSync(paperDataPath(paperId), "utf8"));
  } catch {
    prior = {};
  }
  // Positionals only — a `--flag` sitting in argv[3] is NOT a sourceFile.
  // Without this, `assemble-safe <id> --subject=Chemistry` silently took
  // "--subject=Chemistry" as the source file and committed 100 rows under it.
  const positional = process.argv.slice(3).filter((a) => !a.startsWith("--"));
  const sourceFile = positional[0] ?? prior.sourceFile;
  const pyqYear = Number(positional[1] ?? prior.pyqYear);
  const pyqNote = positional[2] ?? prior.pyqNote;
  if (typeof sourceFile !== "string" || !/\.docx$/i.test(sourceFile)) {
    throw new Error(`sourceFile must be a .docx filename, got: ${String(sourceFile)}`);
  }
  if (!sourceFile || !pyqYear || !pyqNote) {
    throw new Error(
      `need <sourceFile> <pyqYear> <pyqNote> (no existing papers/${paperId}.json to inherit them from)`,
    );
  }

  // Defaults to Maths so every pre-existing invocation behaves identically.
  const subject = parseSubjectArg(process.argv) ?? "Maths";
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const maths = records.filter((r) => r.subject === subject);

  // Merge all agent sol files for this paper.
  const outDir = join("scripts/jee/out");
  const sols: Record<string, Sol> = {};
  // Scoped to THIS subject: an unscoped glob merges another subject's agent
  // output, and readdir order lets it overwrite real answers with that pass's
  // skip flags.
  for (const f of solFilesForSubject(readdirSync(outDir), paperId, subject)) {
    Object.assign(sols, JSON.parse(readFileSync(join(outDir, f), "utf8")));
  }

  const classification: Record<string, { subject: string; chapter: string; subtopic: string }> = {};
  const answerOverrides: Record<string, string> = {};
  const numericOverrides: Record<string, number> = {};
  const authoredSolutions: Record<string, string> = {};
  const flags: string[] = [];
  const noKey: string[] = [];
  const noClass: string[] = [];
  const skipped: number[] = [];

  for (const r of maths) {
    const k = String(r.questionNumber);
    const s = sols[k];
    if (!s) { noClass.push(k); continue; }
    // Honour the agent's skip. The brief tells agents to set it when a question
    // is unanswerable as extracted — typically the LIST a "how many of the
    // following" question counts is missing entirely. Ignoring it is dangerous
    // precisely BECAUSE the source key still exists: the row would ship with a
    // confident answer attached to a stem that cannot support it. assemble-blind
    // already honoured skip; this side did not.
    if (s.skip) { skipped.push(Number(k)); continue; }
    classification[k] = { subject, chapter: s.chapter, subtopic: s.subtopic };
    if (s.solution) authoredSolutions[k] = cleanSolution(s.solution);
    if (s.flag) flags.push(`Q${k}: ${s.flag}`);
    const hasOpts = Boolean(r.options && r.options.length >= 4);
    if (r.status === "numeric" || (!hasOpts && r.status !== "ok")) {
      // NAT — or a no_answer_key/needs_review row with NO options: treat as NAT
      // when we have a numeric answer (extracted or agent-derived). A no-option
      // row whose only answer is an MCQ LETTER can't be a clean 4-option MCQ, so
      // it's dropped (uncommittable) rather than shipped malformed.
      const raw = r.numericAnswer ?? (s.answer !== undefined ? Number(s.answer) : NaN);
      if (raw !== null && raw !== undefined && Number.isFinite(raw)) numericOverrides[k] = raw as number;
      else noKey.push(k + (hasOpts ? "(NAT)" : "(no-options, non-numeric — dropped)"));
    } else {
      const key = r.options?.find((o) => o.isCorrect)?.label ?? s.answer;
      if (key) answerOverrides[k] = key;
      else noKey.push(k + "(MCQ)");
    }
  }

  const note = `${pyqNote} — ${subject} only. Keys from the extracted source key; every key independently agent-verified (disagreements flagged + adjudicated). Solutions authored to the verified answer.`;

  // MERGE, never clobber — the same guard assemble-blind already carries. By the
  // time a second subject is ingested the file holds a SHIPPED block for another
  // one (Maths ran first, then Physics), and a fresh write would silently discard
  // its classification, overrides and authored solutions.
  const prevPath = paperDataPath(paperId);
  let prev: Record<string, any> = {};
  try {
    prev = JSON.parse(readFileSync(prevPath, "utf8"));
  } catch {
    prev = {};
  }
  const prevClass = (prev.classification ?? {}) as Record<string, { subject: string }>;
  const collisions = Object.keys(classification).filter(
    (k) => prevClass[k] && prevClass[k].subject !== subject,
  );
  if (collisions.length) {
    throw new Error(
      `${paperId}: question ${collisions.join(", ")} already classified as another subject — refusing to overwrite`,
    );
  }

  const paper = {
    ...prev,
    sourceFile,
    pyqYear,
    pyqNote,
    classification: { ...prevClass, ...classification },
    answerOverrides: { ...(prev.answerOverrides ?? {}), ...answerOverrides },
    numericOverrides: { ...(prev.numericOverrides ?? {}), ...numericOverrides },
    skip: [...new Set([...(prev.skip ?? []), ...skipped])],
    notes: prev.notes ? `${prev.notes}\n${note}` : note,
    authoredSolutions: { ...(prev.authoredSolutions ?? {}), ...authoredSolutions },
  };
  writeFileSync(prevPath, JSON.stringify(paper, null, 2) + "\n");
  const nMcq = Object.keys(answerOverrides).length, nNat = Object.keys(numericOverrides).length;
  console.log(`${paperId}: ${nMcq} MCQ + ${nNat} NAT = ${nMcq + nNat} classified; ${Object.keys(authoredSolutions).length} solutions.`);
  if (skipped.length) console.log(`  SKIPPED by agent (unanswerable as extracted): ${skipped.join(", ")}`);
  if (noClass.length) console.log(`  NO AGENT DATA (Qs missing from sol files): ${noClass.join(", ")}`);
  if (noKey.length) console.log(`  NO KEY (resolve manually): ${noKey.join(", ")}`);
  if (flags.length) { console.log(`  FLAGS (agent disagreed with extracted key):`); flags.forEach((f) => console.log(`    ${f}`)); }
}

main();
