/**
 * Dump a transcribed paper's MCQs WITHOUT their answers, for a blind re-derivation.
 *
 *   npx tsx scripts/mh-ssc-10/dump-mcq-blind.ts <paperId> [<paperId> ...]
 *
 * Writes out/_blind/<id>.mcq.md: ref, context, stem and options only. The key and
 * the solution are withheld BY THE TOOL, not by the reader's discipline: once a
 * deriver has seen the stored answer, its check is no longer blind, and a
 * non-blind agreement is guaranteed rather than measured. Hand these files to a
 * FRESH agent that did not transcribe the paper; the transcriber already derived
 * these keys, so it cannot check them independently.
 *
 * The agent writes data/<id>.blind.json ([{ref, answer, working}]); compare with
 * `npx tsx scripts/mh-ssc-10/compare-blind.ts <id>`.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT, questionsJsonPath, requirePaper } from "./config";
import type { PaperQuestion } from "./lib";

const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error("usage: tsx scripts/mh-ssc-10/dump-mcq-blind.ts <paperId> [...]");
  process.exit(1);
}
const dir = join(OUT, "_blind");
mkdirSync(dir, { recursive: true });

for (const id of ids) {
  requirePaper(id);
  const qs: PaperQuestion[] = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));
  const mcqs = qs.filter((q) => q.format === "mcq");
  const out = [`# ${id}: ${mcqs.length} MCQs (answers withheld)`, ""];
  for (const q of mcqs) {
    out.push(`## ${q.ref}`);
    if (q.context) out.push(`CONTEXT: ${q.context}`);
    out.push(`STEM: ${q.stem}`);
    if (q.hasFigure) out.push(`FIGURE: printed in the paper (${q.figureNote ?? "see page"}); page images at out/${id}/`);
    for (const o of q.options ?? []) out.push(`  (${o.label}) ${o.text}`);
    out.push("");
  }
  writeFileSync(join(dir, `${id}.mcq.md`), out.join("\n"), "utf8");
  console.log(`${id}: ${mcqs.length} MCQs → out/_blind/${id}.mcq.md`);
}
