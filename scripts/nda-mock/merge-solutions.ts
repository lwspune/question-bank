/**
 * Merge the per-range solution transcriptions into one file the extract reads.
 *
 *   npx tsx scripts/nda-mock/merge-solutions.ts m9           # dry-run
 *   npx tsx scripts/nda-mock/merge-solutions.ts m9 --apply   # write data/<id>.solutions.json
 *
 * Reads every data/<id>.solutions.<range>.json and writes data/<id>.solutions.json.
 *
 * REFUSES rather than resolves on a conflict. If two ranges both carry a number
 * and disagree, that is a finding — two agents read the same page differently —
 * and picking one silently would bury it. Overlapping ranges are expected here
 * (each agent is told to read a page either side of its span so a solution
 * straddling a page break is captured whole), so agreement is the normal case
 * and disagreement is the signal.
 *
 * Also refuses text that would corrupt the bank on arrival: a control character
 * (the signature of authoring through a shell heredoc, which eats a backslash
 * and leaves \frac as TAB+"rac"), a literal two-character \n, or unbalanced
 * \(...\) delimiters.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { requirePaper, DATA } from "./config";
import { findLatexImbalance } from "./lib";

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const files = readdirSync(DATA)
    .filter((f) => f.startsWith(`${paper.id}.solutions.`) && f.endsWith(".json") && f !== `${paper.id}.solutions.json`)
    .sort();
  if (!files.length) throw new Error(`no ${paper.id}.solutions.<range>.json files in ${DATA}`);

  const merged = new Map<number, string>();
  const nulls: number[] = [];
  const owner = new Map<number, string>();
  const conflicts: string[] = [];
  const rejected: string[] = [];

  for (const f of files) {
    const raw = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Record<string, string | null>;
    for (const [k, v] of Object.entries(raw)) {
      const n = Number(k);
      if (!Number.isInteger(n) || n < 1 || n > paper.questionCount) {
        throw new Error(`${f}: "${k}" is not a question number of this paper`);
      }
      if (v === null || (typeof v === "string" && !v.trim())) {
        if (!merged.has(n)) nulls.push(n);
        continue;
      }
      const text = String(v).trim();

      // TAB is included DELIBERATELY. It is not merely unlikely in prose --
      // it is one of the two commonest signatures of the corruption this
      // guards against: a shell heredoc eats the backslash, so \\tfrac
      // arrives as TAB+"frac" and \\vec as VT+"ec". Nothing in a worked
      // solution needs a tab, so excluding it to be permissive would disarm
      // the check on half the cases it exists for. LF and CR stay legal.
      // eslint-disable-next-line no-control-regex
      if (/[\u0000-\u0009\u000b\u000c\u000e-\u001f]/.test(text)) {
        rejected.push(`${f} Q${n}: control character (a backslash eaten by a shell heredoc)`);
        continue;
      }
      if (text.includes("\\n")) {
        rejected.push(`${f} Q${n}: literal two-character \\n — the DB rejects these at the write boundary`);
        continue;
      }
      const imbalance = findLatexImbalance(text);
      if (imbalance) {
        rejected.push(`${f} Q${n}: ${imbalance}`);
        continue;
      }

      const prev = merged.get(n);
      if (prev !== undefined && prev !== text) {
        conflicts.push(
          `Q${n}: ${owner.get(n)} and ${f} disagree\n` +
            `    A: ${prev.slice(0, 120)}\n` +
            `    B: ${text.slice(0, 120)}`,
        );
        continue;
      }
      merged.set(n, text);
      owner.set(n, f);
    }
  }

  const stillNull = nulls.filter((n) => !merged.has(n)).sort((a, b) => a - b);
  console.log(`\n=== ${paper.label} — merge solutions ===`);
  console.log(`files: ${files.length}`);
  console.log(`transcribed: ${merged.size}/${paper.questionCount}`);
  if (stillNull.length) console.log(`deliberately null (no matching printed solution): ${stillNull.join(", ")}`);
  const missing: number[] = [];
  for (let n = 1; n <= paper.questionCount; n++) if (!merged.has(n) && !stillNull.includes(n)) missing.push(n);
  if (missing.length) console.log(`NOT COVERED by any file: ${missing.join(", ")}`);

  if (rejected.length) {
    console.log(`\nREJECTED ${rejected.length} entr(y/ies) — fix the source file and re-run:`);
    for (const r of rejected) console.log("  " + r);
  }
  if (conflicts.length) {
    console.log(`\nCONFLICT on ${conflicts.length} number(s) — two ranges disagree. Resolve by hand:`);
    for (const c of conflicts) console.log("  " + c);
  }
  if (rejected.length || conflicts.length) {
    console.log("\nrefusing to write.");
    process.exitCode = 1;
    return;
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write data/" + paper.id + ".solutions.json");
    return;
  }
  const out: Record<string, string> = {};
  for (const n of [...merged.keys()].sort((a, b) => a - b)) out[String(n)] = merged.get(n)!;
  const dest = join(DATA, `${paper.id}.solutions.json`);
  writeFileSync(dest, JSON.stringify(out, null, 1) + "\n", "utf8");
  console.log(`\nwrote ${dest} (${merged.size} solutions)`);
  if (existsSync(dest)) console.log("re-run extract-vision, then resync --apply to update the bank in place.");
}

main();
