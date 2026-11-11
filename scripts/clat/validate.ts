/**
 * Check one CLAT year without showing a single answer.
 *
 *   npx tsx scripts/clat/validate.ts <year>              # the paper (+ fixes) and, if present, every derivation
 *   npx tsx scripts/clat/validate.ts <year> <slice>      # one solver's slice: what a solver runs
 *   npx tsx scripts/clat/validate.ts <year> --payloads   # MAIN SESSION: write the solvers' key-free payloads
 *
 * Slices (one solver each): "english", "ca" (Current Affairs), "legal" (Legal
 * Reasoning), "logic" (Logical Reasoning + Quantitative Techniques).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { styleIssues } from "../ugc-net/lib";
import { textIssues } from "../cisce-pyq/lib";
import { blindDir, yearCfg } from "./config";
import { loadDerived, loadPaper } from "./io";
import { blindPayload, derivedIssues, paperIssues, type ClatPaper } from "./lib";

export const SLICES: Record<string, string[]> = {
  english: ["English Language"],
  ca: ["Current Affairs including General Knowledge"],
  legal: ["Legal Reasoning"],
  logic: ["Logical Reasoning", "Quantitative Techniques"],
};

export function slicePaper(paper: ClatPaper, slice: string): ClatPaper {
  const sections = SLICES[slice];
  if (!sections) throw new Error(`no slice "${slice}"; slices: ${Object.keys(SLICES).join(", ")}`);
  const rows = paper.rows.filter((r) => sections.includes(r.section));
  const used = new Set(rows.map((r) => r.passage));
  const refs = new Set(rows.map((r) => r.ref));
  return {
    ...paper,
    rows,
    passages: paper.passages.filter((p) => used.has(p.id)),
    directions: paper.directions.filter((d) => refs.has(d.beforeRef)),
  };
}

function main() {
  const args = process.argv.slice(2);
  const year = Number(args[0]);
  if (!year) throw new Error("usage: validate.ts <year> [slice | --payloads]");
  const slice = args.find((a, i) => i > 0 && !a.startsWith("--"));
  const full = loadPaper(year);
  const issues = paperIssues(full, yearCfg(year).sections);

  if (args.includes("--payloads")) {
    if (issues.length) throw new Error(`fix the paper first:\n  ${issues.join("\n  ")}`);
    mkdirSync(blindDir(year), { recursive: true });
    for (const s of Object.keys(SLICES)) {
      const p = slicePaper(full, s);
      writeFileSync(join(blindDir(year), `${s}.payload.json`), JSON.stringify(blindPayload(p), null, 1) + "\n");
      console.log(`${year} ${s}: ${p.rows.length} questions, ${p.passages.length} passages -> ${s}.payload.json`);
    }
    return;
  }

  const paper = slice ? slicePaper(full, slice) : full;
  const derived = loadDerived(year).filter((d) => paper.rows.some((r) => r.ref === d.ref));
  if (derived.length) {
    issues.push(...derivedIssues(paper, derived));
    for (const d of derived) {
      issues.push(...textIssues(`Q${d.ref} working`, d.working), ...styleIssues(`Q${d.ref} working`, d.working ?? ""));
      if (!d.working?.trim()) issues.push(`Q${d.ref}: empty working`);
    }
  }
  const scope = slice ? `${year} ${slice}` : String(year);
  for (const i of issues.slice(0, 40)) console.log(`  ! ${i}`);
  console.log(
    `${scope}: ${paper.rows.length} questions, ${paper.passages.length} passages, ${derived.length} derived, ` +
      `${issues.length ? `${issues.length} ISSUE(S)` : "OK"}`
  );
  if (issues.length) process.exit(1);
}

if (require.main === module) main();
