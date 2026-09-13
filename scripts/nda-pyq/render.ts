/**
 * Rasterise an NDA Mathematics booklet's ENGLISH pages for the vision pass.
 *
 *   npx tsx scripts/nda-pyq/render.ts 2026-2           # the englishPages list
 *   npx tsx scripts/nda-pyq/render.ts 2026-2 4 6 8     # specific 0-based indices
 *
 * Writes out/<paperId>/pNN.png at 2.6x. out/ is gitignored (regenerable).
 *
 * 2.6x is a floor, not a target: the page is two-column with small option text
 * and carries stacked fractions, vector hats and surds where a half-height glyph
 * decides the answer. Where a glyph is still ambiguous the answer is a TARGETED
 * CROP at 6-10x from the source PDF, not a higher whole-page render — at 4x+ the
 * whole page is slower to read and no clearer on the character that matters.
 *
 * IT REFUSES AN EMPTY englishPages LIST rather than rendering the whole booklet.
 * These are RAW bilingual UPSC booklets: Hindi and English alternate page by
 * page, so rendering blind feeds half a transcription agent's band in Devanagari
 * and the agent reports a short page instead of an error. The usual detector
 * cannot help — the file has NO TEXT LAYER, so scripts/upsc/classify-pages.py
 * has nothing to count and the pre-pass has to be done from images.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { OUT, requirePaper } from "./config";

function main() {
  const paper = requirePaper(process.argv[2]);
  const explicit = process.argv
    .slice(3)
    .map(Number)
    .filter((n) => !Number.isNaN(n));

  let pages = explicit;
  if (!pages.length) {
    if (!paper.englishPages?.length) {
      throw new Error(
        `${paper.id} has an empty englishPages list in config.ts.\n` +
          `  These booklets are BILINGUAL — do the page-selection pre-pass first,\n` +
          `  or pass explicit 0-based page indices:\n` +
          `    npx tsx scripts/nda-pyq/render.ts ${paper.id} 2 4 6 ...`
      );
    }
    pages = paper.englishPages;
  }

  const outDir = join(OUT, paper.id);
  mkdirSync(outDir, { recursive: true });

  const py = `
import fitz, sys
pdf, outdir = sys.argv[1], sys.argv[2]
pages = [int(x) for x in sys.argv[3:]]
d = fitz.open(pdf)
for i in pages:
    d[i].get_pixmap(matrix=fitz.Matrix(2.6, 2.6)).save(f"{outdir}/p{i:02d}.png")
print(f"rendered {len(pages)} of {d.page_count} pages to {outdir}")
`;
  const res = spawnSync("python", ["-c", py, paper.pdf, outDir, ...pages.map(String)], {
    encoding: "utf8",
    stdio: "inherit",
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
