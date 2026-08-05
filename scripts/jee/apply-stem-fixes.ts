/**
 * Copy every agent-supplied `suggestedStem` into a paper's `stemOverrides`.
 *
 *   npx tsx scripts/jee/apply-stem-fixes.ts <paperId> [--subject=Chemistry] [--apply]
 *
 * Extraction routinely drops a leading digit, a coefficient or a whole clause,
 * and the agents hand back a corrected stem. Retyping those by hand is pure
 * transcription risk with no upside — a single eaten backslash silently breaks
 * the math — so they are copied verbatim, never re-keyed.
 *
 * Guards, because a bad stem is worse than a damaged one:
 *   - delimiters must balance (a repair that leaves `\(` unclosed fails KaTeX
 *     and `scan-flip` will refuse to publish the row anyway)
 *   - no surviving `$` (the scramble the repair usually exists to fix)
 *   - a row the agent SKIPPED is never given a stem — it is not shipping
 *   - an existing override is never overwritten; a hand-authored fix outranks
 *     an agent's, and silently clobbering it would undo an adjudication
 *
 * Run this BEFORE commit. For a row already committed, use resync.ts instead.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { paperDataPath, requirePaperId } from "./config";
import { parseSubjectArg } from "./lib";

type Sol = {
  suggestedStem?: string;
  stemIssue?: string;
  skip?: boolean;
};

export function stemFixIssues(stem: string): string[] {
  const out: string[] = [];
  const open = (stem.match(/\\\(/g) ?? []).length;
  const close = (stem.match(/\\\)/g) ?? []).length;
  if (open !== close) out.push(`inline delimiters unbalanced (${open} open, ${close} close)`);
  const dOpen = (stem.match(/\\\[/g) ?? []).length;
  const dClose = (stem.match(/\\\]/g) ?? []).length;
  if (dOpen !== dClose) out.push(`display delimiters unbalanced (${dOpen} open, ${dClose} close)`);
  if (stem.includes("$")) out.push("still contains a '$' (the scramble it should have fixed)");
  if (!stem.trim()) out.push("empty");
  return out;
}

function main() {
  const paperId = requirePaperId(process.argv, 2, "apply-stem-fixes.ts <paperId> [--apply]");
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const apply = process.argv.includes("--apply");

  const solPath = join("scripts/jee/out", `${paperId}_sol_${subject.slice(0, 4).toLowerCase()}.json`);
  const sols: Record<string, Sol> = JSON.parse(readFileSync(solPath, "utf8"));
  const paperPath = paperDataPath(paperId);
  const paper = JSON.parse(readFileSync(paperPath, "utf8"));

  const applied: string[] = [];
  const skippedRows: string[] = [];
  const alreadySet: string[] = [];
  const rejected: string[] = [];

  for (const [qn, e] of Object.entries(sols)) {
    const stem = e?.suggestedStem;
    if (typeof stem !== "string" || !stem.trim()) continue;
    if (e.skip) { skippedRows.push(qn); continue; }
    if (paper.stemOverrides?.[qn]) { alreadySet.push(qn); continue; }
    const issues = stemFixIssues(stem);
    if (issues.length) { rejected.push(`Q${qn}: ${issues.join("; ")}`); continue; }
    paper.stemOverrides = { ...(paper.stemOverrides ?? {}), [qn]: stem };
    paper.notes =
      (paper.notes ?? "") +
      `\n[${subject} stem repair] Q${qn}: ${String(e.stemIssue ?? "(no reason given)").slice(0, 350)}`;
    applied.push(qn);
  }

  if (rejected.length) {
    console.error(`REFUSING ${paperId} — ${rejected.length} suggestedStem(s) failed their guards:`);
    for (const r of rejected) console.error(`  ${r}`);
    process.exit(1);
  }

  console.log(`${paperId} [${subject}]: ${apply ? "applied" : "would apply"} ${applied.length} stem repair(s)`);
  if (applied.length) console.log(`  Q${applied.join(", Q")}`);
  if (skippedRows.length) console.log(`  ignored (row is skipped): Q${skippedRows.join(", Q")}`);
  if (alreadySet.length) console.log(`  left alone (override already present): Q${alreadySet.join(", Q")}`);

  if (apply) writeFileSync(paperPath, JSON.stringify(paper, null, 2) + "\n");
}

if (require.main === module) main();
