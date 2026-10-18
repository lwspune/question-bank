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
import { OUT, officialPdf, marathiPdf, requirePaper } from "./config";

// --official renders the board's born-digital copy of a March paper into
// out/<id>/official/ (config.ts officialPdf), for the official cross-check.
// --marathi renders the Marathi-medium print into out/<id>/marathi/ (marathi.ts).
function render(id: string, variant: "scan" | "official" | "marathi") {
  const paper = requirePaper(id);
  const dir = variant === "scan" ? join(OUT, id) : join(OUT, id, variant);
  const pdf = variant === "official" ? officialPdf(paper) : variant === "marathi" ? marathiPdf(paper) : paper.pdf;
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
  const pyFile = join(OUT, `_render_${id}_${variant}.py`);
  writeFileSync(pyFile, py);
  const res = spawnSync("python", [pyFile, pdf, dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
if (!id) {
  console.error("usage: tsx scripts/mh-ssc-10/render.ts <paperId> [--official|--marathi]");
  process.exit(1);
}
render(id, process.argv.includes("--official") ? "official" : process.argv.includes("--marathi") ? "marathi" : "scan");
