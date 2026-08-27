/**
 * Rasterise a CDS General Knowledge booklet's pages for the vision transcription pass.
 *
 *   npx tsx scripts/cds-gs/render.ts <paperId>          # every page (or englishPages)
 *   npx tsx scripts/cds-gs/render.ts <paperId> 4 5 6    # specific 0-based page indices
 *
 * Writes out/<paperId>/pNN.png at 2.6x. out/ is gitignored (regenerable).
 *
 * 2.6x is deliberate: the booklets are two-column with small option text, and at
 * the sibling pipeline's 2.2x the transcription agents had to re-crop constantly.
 * Where a glyph is still ambiguous the answer is a targeted crop at 6-10x from the
 * source PDF, not a higher whole-page render.
 *
 * BILINGUAL PAPERS. `2026-1` is the raw UPSC booklet with Hindi and English pages
 * ALTERNATING. Rendering it blind would feed ~half Devanagari pages to a
 * transcription agent, so its config carries `englishPages` and this script
 * honours it — and REFUSES if that list is still empty, rather than quietly
 * rendering the Hindi half.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { OUT, requirePaper } from "./config";

function main() {
  const paper = requirePaper(process.argv[2]);
  const explicit = process.argv.slice(3).map(Number).filter((n) => !Number.isNaN(n));

  let pages = explicit;
  if (!pages.length && paper.englishPages) {
    if (!paper.englishPages.length) {
      throw new Error(
        `${paper.id} is a bilingual booklet (Hindi and English pages alternate) and its ` +
          `englishPages list in config.ts is still empty.\n` +
          `  Do the page-selection pre-pass first, or pass explicit page indices:\n` +
          `    npx tsx scripts/cds-gs/render.ts ${paper.id} 2 4 6 ...`
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
idxs = pages if pages else list(range(d.page_count))
for i in idxs:
    d[i].get_pixmap(matrix=fitz.Matrix(2.6, 2.6)).save(f"{outdir}/p{i:02d}.png")
print(f"rendered {len(idxs)} of {d.page_count} pages to {outdir}")
`;
  const res = spawnSync("python", ["-c", py, paper.pdf, outDir, ...pages.map(String)], {
    encoding: "utf8",
    stdio: "inherit",
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
