/**
 * Rasterise a scanned MH-SSC-10 board paper's pages to per-page PNGs for VISION
 * transcription (the source has no text layer — 1 full-page image per page).
 *
 *   npx tsx scripts/mh-ssc-10/render.ts <paperId>
 *
 * Writes out/<id>/p-<page>.png. PNGs are gitignored; the transcription JSON in
 * data/ is the committed source of truth.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requirePaper } from "./config";

function render(id: string) {
  const paper = requirePaper(id);
  const dir = join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const py = `
import fitz, sys
pdf = sys.argv[1]; outdir = sys.argv[2]
d = fitz.open(pdf)
ZOOM = 3.0
n = len(d)
for p in range(n):
    pix = d[p].get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM))
    pix.save(outdir + "/p-" + str(p).zfill(2) + ".png")
d.close(); print("rendered", n, "pages")
`;
  mkdirSync(OUT, { recursive: true });
  const pyFile = join(OUT, `_render_${id}.py`);
  writeFileSync(pyFile, py);
  const res = spawnSync("python", [pyFile, paper.pdf, dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
if (!id) {
  console.error("usage: tsx scripts/mh-ssc-10/render.ts <paperId>");
  process.exit(1);
}
render(id);
