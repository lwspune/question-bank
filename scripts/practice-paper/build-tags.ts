/**
 * Emit the nda-tracker tagged-enrichment XLSX for an LWS test paper.
 *
 *   npx tsx scripts/practice-paper/build-tags.ts <slug>
 *
 * ALL questions are emitted in printed (n) order for OMR Q-number parity — even
 * questions excluded from the practice bank (semantic dups + flawed-option ones).
 * Records flow through the SAME buildTagRows/tagRowsToAoa as /api/export?kind=tags,
 * so the sheet is byte-identical to a UI download. See config.ts + the
 * lws-test-ingest skill.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import { buildTagRows, tagRowsToAoa } from "@/lib/export/tagsSheet";
import { findLatexImbalance } from "../practice/lib";
import { requirePaper, loadRecords, validateRecords, recToQuestionRow, statusOf } from "./config";

function main() {
  const spec = requirePaper(process.argv[2]);
  const recs = loadRecords(spec);
  validateRecords(spec, recs);

  // LaTeX delimiter sanity across every emitted field.
  const latexErrors: string[] = [];
  for (const r of recs) {
    for (const [name, val] of [["stem", r.stem], ["solution", r.solution], ["optA", r.optA], ["optB", r.optB], ["optC", r.optC], ["optD", r.optD]] as const) {
      const bad = findLatexImbalance(val);
      if (bad) latexErrors.push(`Q${r.n} ${name}: ${bad}`);
    }
  }
  if (latexErrors.length) {
    for (const e of latexErrors) console.log(`  ${e}`);
    throw new Error(`refusing to build: ${latexErrors.length} LaTeX imbalance(s).`);
  }

  // Concept tags flow through ONLY when a record carries them (an all-duplicate paper
  // mirrored from bank rows that already have question_concept_tags). Hand-transcribed
  // papers carry none, so the map is empty and the two slug columns emit "" as before.
  const rows = recs.map((r) => recToQuestionRow(spec, r));
  const conceptTags = new Map(
    recs.flatMap((r, i) =>
      r.subtopicSlug && r.conceptSlug
        ? [[rows[i].id, { subtopicSlug: r.subtopicSlug, conceptSlug: r.conceptSlug }] as const]
        : [],
    ),
  );
  const tagRows = buildTagRows(rows, conceptTags);
  for (const tr of tagRows) {
    if (!["A", "B", "C", "D"].includes(tr.answer)) throw new Error(`Q${tr.q}: no answer letter`);
  }

  const aoa = tagRowsToAoa(tagRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), "Tags");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;

  const outDir = join(process.cwd(), "generated-papers");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${spec.outName}.xlsx`);
  writeFileSync(outPath, buf);

  const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const tr of tagRows) dist[tr.answer]++;
  const flawed = recs.filter((r) => statusOf(r) === "flawed").map((r) => r.n);
  console.log(`rows: ${tagRows.length}  answer dist: ${JSON.stringify(dist)}`);
  console.log(`subjects: ${[...new Set(tagRows.map((r) => r.subject))].join(", ")}`);
  console.log(`chapters: ${[...new Set(tagRows.map((r) => r.chapter))].join(", ")}`);
  if (flawed.length) console.log(`flawed-option questions (best-guess key, verify vs LWS key): ${flawed.join(", ")}`);
  console.log(`wrote ${outPath}`);
}

main();
