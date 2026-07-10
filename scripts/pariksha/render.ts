/**
 * Render a Pariksha (ParikshaGruh) test PDF to per-logical-page PNGs for vision
 * transcription.
 *
 *   npx tsx scripts/pariksha/render.ts <testId> [firstPdfPage] [lastPdfPage]
 *
 * These PDFs use a TWO-UP layout: each physical PDF page holds two logical print-pages
 * side by side (footer "1/11", "2/11"). We split every PDF page at the mid gutter into a
 * LEFT and RIGHT logical page (a full-page crop would interleave the two columns' lines).
 * PNGs land in out/<testId>/ as p<NNN>_L.png / p<NNN>_R.png (NNN = 1-indexed PDF page).
 *
 * Uses PyMuPDF via a spawned python (the NEET/CDS/Foundation precedent). Zoom = 3.0
 * (≈216 DPI) — enough for sub/superscripts + small option math.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { requireTest, OUT } from "./config";

function main() {
  const testId = process.argv[2];
  const test = requireTest(testId);
  const first = process.argv[3] ? Number(process.argv[3]) : 1;
  const last = process.argv[4] ? Number(process.argv[4]) : 0; // 0 = to end
  const outDir = join(OUT, test.id);
  mkdirSync(outDir, { recursive: true });

  const py = `
import fitz, os
pdf = r"${test.pdf.replace(/\\/g, "\\\\")}"
out = r"${outDir.replace(/\\/g, "\\\\")}"
first, last = ${first}, ${last}
d = fitz.open(pdf)
end = d.page_count if last == 0 else min(last, d.page_count)
zoom = fitz.Matrix(3.0, 3.0)
for i in range(first - 1, end):
    pg = d[i]
    n = i + 1
    r = pg.rect
    mid = r.x0 + r.width / 2
    for tag, clip in (("L", fitz.Rect(r.x0, r.y0, mid + 4, r.y1)), ("R", fitz.Rect(mid - 4, r.y0, r.x1, r.y1))):
        pg.get_pixmap(matrix=zoom, clip=clip).save(os.path.join(out, "p%03d_%s.png" % (n, tag)))
    print("rendered PDF page %d -> logical L/R" % n)
print("DONE ->", out)
`;
  const res = spawnSync("python", ["-c", py], { stdio: "inherit" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
