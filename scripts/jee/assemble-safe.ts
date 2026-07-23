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

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  numericAnswer?: number | null;
  options: { label: string; text: string; isCorrect: boolean }[] | null;
};
type Sol = { chapter: string; subtopic: string; solution: string; flag?: string; answer?: string };

function main() {
  const paperId = requirePaperId(process.argv, 2, 'assemble-safe.ts <paperId> <sourceFile> <pyqYear> "<pyqNote>"');
  const sourceFile = process.argv[3];
  const pyqYear = Number(process.argv[4]);
  const pyqNote = process.argv[5];
  if (!sourceFile || !pyqYear || !pyqNote) throw new Error("need <sourceFile> <pyqYear> <pyqNote>");

  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const maths = records.filter((r) => r.subject === "Maths");

  // Merge all agent sol files for this paper.
  const outDir = join("scripts/jee/out");
  const sols: Record<string, Sol> = {};
  for (const f of readdirSync(outDir)) {
    if (f.startsWith(`${paperId}_sol_`) && f.endsWith(".json")) {
      Object.assign(sols, JSON.parse(readFileSync(join(outDir, f), "utf8")));
    }
  }

  const classification: Record<string, { subject: string; chapter: string; subtopic: string }> = {};
  const answerOverrides: Record<string, string> = {};
  const numericOverrides: Record<string, number> = {};
  const authoredSolutions: Record<string, string> = {};
  const flags: string[] = [];
  const noKey: string[] = [];
  const noClass: string[] = [];

  for (const r of maths) {
    const k = String(r.questionNumber);
    const s = sols[k];
    if (!s) { noClass.push(k); continue; }
    classification[k] = { subject: "Maths", chapter: s.chapter, subtopic: s.subtopic };
    if (s.solution) authoredSolutions[k] = s.solution;
    if (s.flag) flags.push(`Q${k}: ${s.flag}`);
    if (r.status === "numeric") {
      if (r.numericAnswer !== null && r.numericAnswer !== undefined) numericOverrides[k] = r.numericAnswer;
      else if (s.answer !== undefined) numericOverrides[k] = Number(s.answer);
      else noKey.push(k + "(NAT)");
    } else {
      const key = r.options?.find((o) => o.isCorrect)?.label ?? s.answer;
      if (key) answerOverrides[k] = key;
      else noKey.push(k + "(MCQ)");
    }
  }

  const paper = {
    sourceFile,
    pyqYear,
    pyqNote,
    classification,
    answerOverrides,
    numericOverrides,
    notes: `${pyqNote} — Maths only. Keys from the extracted source key; every key independently agent-verified (disagreements flagged + adjudicated). Solutions authored to the verified answer.`,
    authoredSolutions,
  };
  writeFileSync(paperDataPath(paperId), JSON.stringify(paper, null, 2) + "\n");
  const nMcq = Object.keys(answerOverrides).length, nNat = Object.keys(numericOverrides).length;
  console.log(`${paperId}: ${nMcq} MCQ + ${nNat} NAT = ${nMcq + nNat} classified; ${Object.keys(authoredSolutions).length} solutions.`);
  if (noClass.length) console.log(`  NO AGENT DATA (Qs missing from sol files): ${noClass.join(", ")}`);
  if (noKey.length) console.log(`  NO KEY (resolve manually): ${noKey.join(", ")}`);
  if (flags.length) { console.log(`  FLAGS (agent disagreed with extracted key):`); flags.forEach((f) => console.log(`    ${f}`)); }
}

main();
