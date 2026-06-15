/**
 * Render a CDS English paper's pages to PNGs for the vision section-map +
 * transcription passes.
 *
 *   npx tsx scripts/cds/render.ts <paperId>            # all pages
 *   npx tsx scripts/cds/render.ts <paperId> 0 1 2 3    # specific 0-based page indices
 *
 * Writes out/<paperId>/pNN.png at 2.2x. out/ is gitignored (regenerable).
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { OUT, requirePaper } from "./config";

function main() {
  const paper = requirePaper(process.argv[2]);
  const pages = process.argv.slice(3).map(Number).filter((n) => !Number.isNaN(n));
  const outDir = join(OUT, paper.id);
  mkdirSync(outDir, { recursive: true });
  const py = `
import fitz, sys
pdf, outdir = sys.argv[1], sys.argv[2]
pages = [int(x) for x in sys.argv[3:]]
d = fitz.open(pdf)
idxs = pages if pages else range(d.page_count)
for i in idxs:
    d[i].get_pixmap(matrix=fitz.Matrix(2.2, 2.2)).save(f"{outdir}/p{i:02d}.png")
print(f"rendered {len(list(idxs))} pages of {d.page_count} to {outdir}")
`;
  const res = spawnSync("python", ["-c", py, paper.pdf, outDir, ...pages.map(String)], { encoding: "utf8", stdio: "inherit" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
