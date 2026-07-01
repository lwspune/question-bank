/**
 * Render a NEET booklet PDF to per-page (or per-column) PNGs for vision transcription.
 *
 *   npx tsx scripts/neet/render.ts <paperId> [firstPage] [lastPage]
 *
 * Single-column booklets (2025 code 45, 2026 code 11) → one full-page PNG per page.
 * Two-column booklets (Re-NEET code 50) → a LEFT and RIGHT half per page (the column
 * gutter split — a full-page crop would interleave the two columns' lines). Pages are
 * 1-indexed to match the printed booklet; PNGs land in out/<paperId>/.
 *
 * Uses PyMuPDF via a spawned python (the CDS/JEE/Foundation precedent) since the
 * project has no node PDF-raster dep. Zoom = 3.0 (≈216 DPI) — enough for sub/superscripts.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { requirePaper, OUT } from "./config";

function main() {
  const paperId = process.argv[2];
  const paper = requirePaper(paperId);
  const first = process.argv[3] ? Number(process.argv[3]) : 1;
  const last = process.argv[4] ? Number(process.argv[4]) : 0; // 0 = to end
  const outDir = join(OUT, paper.id);
  mkdirSync(outDir, { recursive: true });

  const py = `
import fitz, sys, os
pdf = r"${paper.pdf.replace(/\\/g, "\\\\")}"
out = r"${outDir.replace(/\\/g, "\\\\")}"
first, last = ${first}, ${last}
layout = "${paper.layout}"
d = fitz.open(pdf)
end = d.page_count if last == 0 else min(last, d.page_count)
zoom = fitz.Matrix(3.0, 3.0)
for i in range(first - 1, end):
    pg = d[i]
    n = i + 1
    if layout == "two-column":
        r = pg.rect
        mid = r.x0 + r.width / 2 + 6  # small overlap past the gutter
        for tag, clip in (("L", fitz.Rect(r.x0, r.y0, mid, r.y1)), ("R", fitz.Rect(mid - 12, r.y0, r.x1, r.y1))):
            pg.get_pixmap(matrix=zoom, clip=clip).save(os.path.join(out, "p%03d_%s.png" % (n, tag)))
    else:
        pg.get_pixmap(matrix=zoom).save(os.path.join(out, "p%03d.png" % n))
    print("rendered p%d" % n)
print("DONE ->", out)
`;
  const res = spawnSync("python", ["-c", py], { stdio: "inherit" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
