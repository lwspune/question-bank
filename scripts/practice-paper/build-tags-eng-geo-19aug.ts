/**
 * Emit the nda-tracker tagged XLSX for the LWS "Eng & Geo Final D Test" (19 Aug),
 * with the PAPER'S OWN OFFICIAL KEY applied to the 13 questions where it disagrees
 * with the answer we derived at ingest, and those questions' Solution cells BLANK.
 *
 *   npx tsx scripts/practice-paper/build-tags-eng-geo-19aug.ts [--apply]
 *
 * WHY THIS EXISTS AS ITS OWN SCRIPT
 *  - The sheet grades a REAL OMR scan. The students sat this paper and were marked
 *    against the teacher's printed key, so the sheet must reproduce that key exactly,
 *    even where we believe it is wrong. Shipping our letter would silently re-mark
 *    100 answer sheets.
 *  - But a solution that derives one letter sitting beside a different keyed letter
 *    is worse than no solution at all — it reads as a contradiction to any teacher
 *    who opens the file. So for exactly those rows the Solution cell is emptied
 *    rather than reworded. Nothing is invented and nothing self-contradicts.
 *  - The DB is deliberately NOT touched: the bank keeps our derived answers, this
 *    sheet carries the official ones, and the divergence is reported below so it
 *    stays visible instead of being quietly reconciled in one direction.
 *
 * Records are read from git commit 329573d (where this paper was ingested) rather
 * than the working tree, because the spec + records live on `main` and the current
 * branch may be elsewhere mid-session. That also pins the provenance: the sheet is
 * built from the committed source of record, not from whatever is on disk.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import { buildTagRows, tagRowsToAoa } from "@/lib/export/tagsSheet";
import { findLatexImbalance } from "../practice/lib";
import { validateRecords, recToQuestionRow, statusOf, type PaperSpec, type PaperRec } from "./config";

const COMMIT = "329573d";
const RECORDS_PATH = "scripts/practice-paper/data/eng-geo-final-d-19aug.records.json";
const KEY_CSV = "C:/Users/vilas/Downloads/AnswerkeyGAT Geo Final D 19.csv";

/** The paper's spec. Inlined (not imported from PAPERS) because it lives on `main`
 *  and this script must run from any branch without touching config.ts. */
const SPEC: PaperSpec = {
  slug: "eng-geo-final-d-19aug",
  title: "NDA GAT — LWS Eng & Geo Final D Test (19 Aug)",
  recordsFile: "eng-geo-final-d-19aug.records.json",
  outName: "Tags_NDA_Eng_Geo_Final_D_Test_19Aug",
  sourceFile: "Eng_Geo_Final_D_Test_19_Aug.docx",
  subjects: {
    English: {
      Grammar: ["Active and Passive Voice", "Direct and Indirect Speech"],
      "Idioms and Phrases": ["Idiom Meaning"],
      "Reading Comprehension": ["Inferential Comprehension", "Literal Comprehension"],
      "Sentence Rearrangement": ["Paragraph Sequencing (S1–S6)"],
      Vocabulary: ["Antonyms", "Word Definition"],
    },
    Geography: {
      "Climatology, Atmosphere and Weather": [
        "Atmospheric Layers, Composition and Aurora", "Climate Classification and Zones",
      ],
      "Earth in Space, Maps and Coordinates": [
        "Earth's Shape, Rotation and Motion", "Planets and Solar System",
      ],
      "Earth's Structure, Landforms and Geological Time": [
        "Earth's Interior, Crust and Plate Tectonics", "Earthquakes and Seismic Waves",
        "Landforms and Mass Movements", "Rocks, Minerals and Geological Time", "Soils",
        "Volcanoes and Igneous Activity", "Weathering and Denudation",
      ],
      "Indian Geography — Economy, Resources and Transport": [
        "Energy and Industries — Power, Petroleum, Iron and Steel",
        "Ports and Maritime Infrastructure",
      ],
      "Indian Geography — Physical Features": ["Indian Soils and Climate-Agriculture"],
      Oceanography: ["Ocean Currents"],
      "World and Human Geography": [
        "World — Coordinates, Time and Place", "World — Rivers, Canals and Water Bodies",
      ],
    },
  },
  pyqNote: "NDA GAT practice — LWS Eng & Geo Final D Test, 19 Aug",
  examName: "NDA",
  section: { key: "eng-geo-final-d-19aug", label: "Eng & Geo Final D Test" },
  bankAdd: true,
  createPaper: true,
};

function loadOfficialKey(): Map<number, string> {
  const key = new Map<number, string>();
  const text = readFileSync(KEY_CSV, "utf-8").replace(/^\uFEFF/, "");
  for (const line of text.split(/\r?\n/).slice(1)) {
    const m = line.match(/^"?(\d+)"?\s*,\s*"?([A-Da-d])"?/);
    if (m) key.set(Number(m[1]), m[2].toUpperCase());
  }
  return key;
}

function main() {
  const apply = process.argv.includes("--apply");

  const raw = execFileSync("git", ["show", `${COMMIT}:${RECORDS_PATH}`], {
    encoding: "utf-8", maxBuffer: 32 * 1024 * 1024,
  });
  const recs: PaperRec[] = JSON.parse(raw).sort((a: PaperRec, b: PaperRec) => a.n - b.n);
  validateRecords(SPEC, recs);

  const key = loadOfficialKey();
  const missing = recs.filter((r) => !key.has(r.n)).map((r) => r.n);
  if (missing.length) throw new Error(`official key has no entry for Q${missing.join(", Q")} — refusing`);

  // Apply the official key where it differs, and blank ONLY those solutions.
  const overridden: { n: number; ours: string; official: string }[] = [];
  const out = recs.map((r) => {
    const official = key.get(r.n)!;
    if (official === r.answer) return r;
    overridden.push({ n: r.n, ours: r.answer, official });
    return { ...r, answer: official as PaperRec["answer"], solution: "" };
  });

  // Re-validate AFTER the override: an override must never produce an invalid record.
  validateRecords(SPEC, out);

  const latexErrors: string[] = [];
  for (const r of out) {
    for (const [name, val] of [["stem", r.stem], ["solution", r.solution], ["optA", r.optA],
      ["optB", r.optB], ["optC", r.optC], ["optD", r.optD]] as const) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) latexErrors.push(`Q${r.n} ${name}: ${bad}`);
    }
  }
  if (latexErrors.length) {
    for (const e of latexErrors) console.log(`  ${e}`);
    throw new Error(`refusing to build: ${latexErrors.length} LaTeX imbalance(s).`);
  }

  const rows = out.map((r) => recToQuestionRow(SPEC, r));
  const tagRows = buildTagRows(rows, new Map());

  // Every row must carry a key letter, and it must be the OFFICIAL one.
  for (const tr of tagRows) {
    const want = key.get(tr.q);
    if (!["A", "B", "C", "D"].includes(tr.answer)) throw new Error(`Q${tr.q}: no answer letter`);
    if (tr.answer !== want) throw new Error(`Q${tr.q}: sheet says ${tr.answer}, official key says ${want}`);
  }
  // Solutions: blank on exactly the overridden rows, present on every other row.
  const overriddenNums = new Set(overridden.map((o) => o.n));
  for (const tr of tagRows) {
    const blank = !tr.solution || !tr.solution.trim();
    if (overriddenNums.has(tr.q) && !blank) throw new Error(`Q${tr.q}: expected a blank Solution cell`);
    if (!overriddenNums.has(tr.q) && blank) throw new Error(`Q${tr.q}: Solution cell unexpectedly blank`);
  }

  const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const tr of tagRows) dist[tr.answer]++;

  console.log(`records: ${out.length} (from ${COMMIT})`);
  console.log(`answer column = OFFICIAL key throughout; dist ${JSON.stringify(dist)}`);
  console.log(`\nofficial key applied over our derived answer on ${overridden.length} question(s):`);
  for (const o of overridden) console.log(`  Q${String(o.n).padStart(3)}  ours ${o.ours} -> official ${o.official}   (Solution cell blanked)`);
  const flawed = out.filter((r) => statusOf(r) === "flawed").map((r) => r.n);
  console.log(`\nsolutions present: ${tagRows.length - overridden.length} | blank: ${overridden.length}`);
  if (flawed.length) console.log(`flawed-option questions: ${flawed.join(", ")}`);
  console.log(`subjects: ${[...new Set(tagRows.map((r) => r.subject))].join(", ")}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write generated-papers/${SPEC.outName}.xlsx`);
    return;
  }
  const aoa = tagRowsToAoa(tagRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), "Tags");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  const outDir = join(process.cwd(), "generated-papers");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${SPEC.outName}.xlsx`);
  writeFileSync(outPath, buf);
  console.log(`\nwrote ${outPath}`);
}

main();
