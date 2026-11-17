/**
 * Cross-tab TWO blind solutions of a WRITTEN paper (RIMC Maths and English),
 * then write the answers file commit.ts reads.
 *
 *   npx tsx scripts/milschool/crosstab-written.ts rimc-2023-jun-maths            # report
 *   npx tsx scripts/milschool/crosstab-written.ts rimc-2023-jun-maths --apply    # write answers.json
 *
 * Reads   derived/<id>.a.p*.json and derived/<id>.b.p*.json, each
 *         { "answers": [{ number, label, finalAnswer, solution, confidence, open? }] }
 *         (contract: WRITTEN_DERIVATION_BRIEF.md)
 *         data/<id>.adjudicated.json  { "<n>": { pick?: "a"|"b", finalAnswer?, solution?, why, notice?, grace?, verified? } }
 * Writes  data/<id>.answers.json  { written: true, answers, reconciled, checked, open }
 *
 * RIMC publishes no key, so the published answer rests on the two solutions
 * agreeing (compareWritten, on the final answer only) and on a person ruling
 * on every disagreement and every agreed answer below HIGH. An OPEN item (an
 * essay, a letter, a story) has no single right answer: it is not compared,
 * and ships one sample answer (pass A's unless a ruling picks B or rewrites it).
 * --apply refuses while any ruling is missing.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DERIVED, dataPath, requirePaper } from "./config";
import { compareWritten, solvableWritten, type WrittenItem } from "./lib";

type Solved = { number: number; label?: string; finalAnswer?: string; solution: string; confidence?: string; open?: boolean };
type Ruling = { pick?: "a" | "b"; finalAnswer?: string; solution?: string; why: string; notice?: string; grace?: boolean; verified?: boolean };

function loadPass(id: string, pass: "a" | "b"): Map<number, Solved> {
  const re = new RegExp(`^${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.${pass}\\.p\\d+\\.json$`);
  const out = new Map<number, Solved>();
  for (const f of readdirSync(DERIVED).filter((x) => re.test(x)).sort()) {
    const raw = JSON.parse(readFileSync(join(DERIVED, f), "utf8"));
    const list: Solved[] = Array.isArray(raw) ? raw : raw.answers;
    if (!Array.isArray(list)) throw new Error(`${f}: no "answers" array`);
    for (const s of list) {
      if (out.has(s.number)) throw new Error(`${f}: Q${s.number} answered twice in pass ${pass}`);
      out.set(s.number, s);
    }
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  if (paper.format !== "written") throw new Error(`${paper.id} is an MCQ paper: use crosstab.ts`);
  const apply = args.includes("--apply");

  const items: WrittenItem[] = solvableWritten(
    JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions as WrittenItem[],
    paper.held?.numbers
  );
  const A = loadPass(paper.id, "a");
  const B = loadPass(paper.id, "b");
  const adjFile = dataPath(paper.id, "adjudicated");
  const adj: Record<string, Ruling> = existsSync(adjFile) ? JSON.parse(readFileSync(adjFile, "utf8")) : {};

  const tally = { AGREE: 0, DISPUTE: 0, MISSING: 0, OPEN: 0 };
  const needs: string[] = [];
  const weak: string[] = [];
  const answers: { number: number; solution: string; finalAnswer?: string; notice?: string; grace?: boolean }[] = [];
  const reconciled: number[] = [];
  const checked: number[] = [];
  const open: number[] = [];
  const unruled: number[] = [];

  for (const q of items) {
    const a = A.get(q.number);
    const b = B.get(q.number);
    const verdict = compareWritten(a?.finalAnswer, b?.finalAnswer, !!q.open);
    tally[verdict]++;
    const r = adj[String(q.number)];
    const weakConf = [a?.confidence, b?.confidence].some((c) => c && c.toUpperCase() !== "HIGH");
    const line = `Q${q.number} ${q.label} [${q.marks}m]`;

    if (verdict === "OPEN") {
      open.push(q.number);
      const base = r?.pick === "b" ? b : a;
      const solution = r?.solution ?? base?.solution;
      if (!solution) unruled.push(q.number);
      else answers.push({ number: q.number, solution, ...(r?.notice ? { notice: r.notice, grace: r.grace } : {}) });
      continue;
    }
    if (verdict !== "AGREE") {
      needs.push(`${line}  ${verdict}${r ? "" : "  [UNRESOLVED]"}\n    A: ${a?.finalAnswer ?? "(none)"} (${a?.confidence ?? "?"})\n    B: ${b?.finalAnswer ?? "(none)"} (${b?.confidence ?? "?"})`);
      if (!r) {
        unruled.push(q.number);
        continue;
      }
      reconciled.push(q.number);
    } else if (weakConf) {
      weak.push(`${line}  ${a?.finalAnswer} (${a?.confidence}/${b?.confidence})${r ? "" : "  [not yet checked]"}`);
      if (!r) {
        unruled.push(q.number);
        continue;
      }
      if (r.verified !== false) checked.push(q.number);
    }
    const base = r?.pick === "b" ? b : a;
    const solution = r?.solution ?? base?.solution;
    if (!solution) {
      unruled.push(q.number);
      continue;
    }
    answers.push({
      number: q.number,
      solution,
      finalAnswer: r?.finalAnswer ?? base?.finalAnswer,
      ...(r?.notice ? { notice: r.notice, grace: r.grace } : {}),
    });
  }

  console.log(`${paper.id}  ${items.length} items  (pass A ${A.size}, pass B ${B.size})\n`);
  console.log(`  AGREE    ${tally.AGREE}\n  DISPUTE  ${tally.DISPUTE}\n  MISSING  ${tally.MISSING}\n  OPEN     ${tally.OPEN} (one sample answer each, not compared)`);
  if (needs.length) console.log(`\n--- ${needs.length} row(s) needing a human ---\n${needs.join("\n")}`);
  if (weak.length) console.log(`\n--- ${weak.length} agreed row(s) below HIGH: hand check ---\n${weak.join("\n")}`);

  if (unruled.length) {
    console.log(`\n[${apply ? "REFUSED" : "dry-run"}] ${unruled.length} row(s) still need a ruling in ${adjFile}: Q${unruled.join(", Q")}`);
    if (apply) process.exit(1);
    return;
  }
  if (!apply) {
    console.log(`\n[dry-run] every row is settled. Pass --apply to write the answers file.`);
    return;
  }
  const out = dataPath(paper.id, "answers");
  writeFileSync(out, JSON.stringify({ paper: paper.id, written: true, answers, reconciled, checked, open }, null, 2) + "\n");
  console.log(`\nwrote ${out}  (${answers.length} answers, ${reconciled.length} settled by hand, ${checked.length} checked by hand, ${open.length} open)`);
}

main();
