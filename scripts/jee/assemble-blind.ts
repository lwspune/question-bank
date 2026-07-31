/**
 * Assemble a papers/<paperId>.json for a BROKEN-key JEE paper (positional block
 * count << 180, or hybrid numbering — the extracted answer key is UNTRUSTWORTHY).
 * Unlike assemble-safe, the answer comes from the blind agent's DERIVED `answer`
 * (never the extracted key). Ships MCQ-letter + integer-NAT; drops anything the
 * agent couldn't resolve to a clean answer.
 *
 *   npx tsx scripts/jee/assemble-blind.ts <paperId> <sourceFile> <pyqYear> "<pyqNote>" [--subject=Physics]
 *
 * Agent output shape (out/<paperId>_sol_*.json): {qn:{chapter,subtopic,answer,solution,skip?}}
 * where `answer` is an MCQ letter A-D OR a numeric value; set `skip:true` for a
 * question the agent judges corrupted/ambiguous.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { recordsPath, paperDataPath, requirePaperId } from "./config";
import { parseSubjectArg } from "./lib";
import { cleanSolution } from "./sol-clean";

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  numericAnswer?: number | null;
  options: { label: string; text: string; isCorrect: boolean }[] | null;
};
type Sol = { chapter: string; subtopic: string; solution: string; answer?: string | number; skip?: boolean };

const LETTER = /^[A-D]$/;

function main() {
  const paperId = requirePaperId(process.argv, 2, 'assemble-blind.ts <paperId> <sourceFile> <pyqYear> "<pyqNote>"');
  const sourceFile = process.argv[3];
  const pyqYear = Number(process.argv[4]);
  const pyqNote = process.argv[5];
  if (!sourceFile || !pyqYear || !pyqNote) throw new Error("need <sourceFile> <pyqYear> <pyqNote>");

  const subject = parseSubjectArg(process.argv) ?? "Maths";
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const rows = records.filter((r) => r.subject === subject);
  const outDir = join("scripts/jee/out");
  const sols: Record<string, Sol> = {};
  for (const f of readdirSync(outDir)) {
    if (f.startsWith(`${paperId}_sol_`) && f.endsWith(".json")) Object.assign(sols, JSON.parse(readFileSync(join(outDir, f), "utf8")));
  }

  const classification: Record<string, { subject: string; chapter: string; subtopic: string }> = {};
  const answerOverrides: Record<string, string> = {};
  const numericOverrides: Record<string, number> = {};
  const authoredSolutions: Record<string, string> = {};
  const dropped: string[] = [];

  for (const r of rows) {
    const k = String(r.questionNumber);
    const s = sols[k];
    if (!s || s.skip || s.answer === undefined || s.answer === null) { dropped.push(k + (s?.skip ? "(skip)" : "(no-answer)")); continue; }
    const hasOpts = Boolean(r.options && r.options.length >= 4);
    const ans = s.answer;
    if (hasOpts && typeof ans === "string" && LETTER.test(ans.trim())) {
      answerOverrides[k] = ans.trim();
    } else if (!hasOpts && Number.isFinite(Number(ans))) {
      numericOverrides[k] = Number(ans);
    } else {
      dropped.push(k + (hasOpts ? "(MCQ non-letter)" : "(no-opts non-numeric)"));
      continue;
    }
    classification[k] = { subject, chapter: s.chapter, subtopic: s.subtopic };
    if (s.solution) authoredSolutions[k] = cleanSolution(s.solution);
  }

  const droppedNums = dropped.map((d) => Number(d.replace(/\D.*$/, ""))).filter((n) => Number.isFinite(n));
  const note = `${pyqNote} — ${subject}. BROKEN-numbering paper: source key untrustworthy, every answer BLIND-derived by an independent solver (compilation playbook). Shipped MCQ-letter + integer-NAT; dropped ambiguous.`;

  // MERGE, never clobber. Most of these files already carry a SHIPPED block for
  // another subject (the Maths ingest ran first), and overwriting would discard
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
    skip: [...new Set([...(prev.skip ?? []), ...droppedNums])],
    notes: prev.notes ? `${prev.notes}\n${note}` : note,
    authoredSolutions: { ...(prev.authoredSolutions ?? {}), ...authoredSolutions },
  };
  writeFileSync(prevPath, JSON.stringify(paper, null, 2) + "\n");
  const nMcq = Object.keys(answerOverrides).length, nNat = Object.keys(numericOverrides).length;
  console.log(`${paperId}: ${nMcq} MCQ + ${nNat} NAT = ${nMcq + nNat} shipped; ${authoredSolutions ? Object.keys(authoredSolutions).length : 0} solutions.`);
  if (dropped.length) console.log(`  DROPPED (${dropped.length}): ${dropped.join(", ")}`);
}

main();
