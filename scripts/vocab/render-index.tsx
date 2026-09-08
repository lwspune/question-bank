/**
 * Render the back-of-book index to HTML, so its PAGE COUNT can be measured
 * rather than estimated.
 *
 *   npx tsx --tsconfig scripts/vocab/tsconfig.render.json scripts/vocab/render-index.tsx
 *   ... --planned            # the whole planned book, from the extracts
 *   ... --planned --scale=3407   # project to the full corpus incl. option words
 *
 * `--scale` pads the row list with synthetic entries to a target size. The index
 * is uniform — one short line per word — so page count scales linearly with row
 * count, and this is the honest way to answer "how big will it be" before the
 * remaining 1,900 words exist. Synthetic rows are marked so nobody mistakes the
 * output for the real index.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CADET_VOCAB, chapterFor, indexTagFor } from "../../src/lib/vocab/registry";
import type { IndexRow } from "../../src/lib/vocab/index";
import type { BankWord } from "./extract-bank";
import { placementOf } from "./commit-entries";
import type { SchoolWord } from "./extract-docx";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
require.extensions[".css"] = () => {};

const DATA = join(__dirname, "data");
const read = <T,>(f: string): T => JSON.parse(readFileSync(join(DATA, f), "utf8")) as T;
const arg = (n: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);

function plannedRows(): IndexRow[] {
  const bank = read<BankWord[]>("bank-words.json");
  const school = read<SchoolWord[]>("school-words.json");
  const bankSet = new Set(bank.map((w) => w.word));
  const rows: IndexRow[] = [];
  for (const w of bank) {
    const { part, section } = placementOf(w);
    if (!chapterFor(CADET_VOCAB, part, w.word, section)) continue;
    rows.push({
      word: w.word,
      partTag: indexTagFor(CADET_VOCAB, part, section),
      timesAsked: w.appearances.filter((a) => a.kind === "pyq").length,
    });
  }
  for (const w of school) {
    if (bankSet.has(w.word)) continue;
    if (!chapterFor(CADET_VOCAB, "school", w.word, null)) continue;
    rows.push({ word: w.word, partTag: indexTagFor(CADET_VOCAB, "school", null), timesAsked: 0 });
  }
  return rows;
}

/**
 * Pad to `target` with synthetic rows, distributed across letters in the SAME
 * proportion as the real ones so the letter headings (which cost a line each)
 * stay realistic.
 */
function scaleTo(rows: IndexRow[], target: number): IndexRow[] {
  if (target <= rows.length) return rows;
  const out = [...rows];
  let i = 0;
  while (out.length < target) {
    const seed = rows[i % rows.length];
    out.push({
      word: `${seed.word}·${Math.floor(i / rows.length) + 1}`,
      partTag: seed.partTag,
      timesAsked: 0,
    });
    i++;
  }
  return out;
}

async function main() {
  const { default: VocabIndexPrint } = await import(
    "../../src/app/books/vocab/_print/VocabIndexPrint"
  );

  let rows = plannedRows();
  const scale = Number(arg("scale") ?? 0);
  const scaled = scale > rows.length;
  if (scaled) rows = scaleTo(rows, scale);

  const title = CADET_VOCAB.title + (scaled ? " (projected)" : "");
  const body = renderToStaticMarkup(React.createElement(VocabIndexPrint, { rows, title }));
  const html =
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>${title} — Index</title>` +
    `<style>body{margin:0;background:#f4f4f5}</style></head><body>${body}</body></html>`;

  const out = join(process.cwd(), "generated-papers");
  mkdirSync(out, { recursive: true });
  const file = join(out, scaled ? `vocab-index-${scale}.html` : "vocab-index.html");
  writeFileSync(file, html);
  console.log(`${rows.length} index rows${scaled ? "  (padded with synthetic entries)" : ""}`);
  console.log(`wrote ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
