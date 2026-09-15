/**
 * Render a chapter's SGIMA booklet pages to per-column PNGs for vision transcription.
 *
 *   npx tsx scripts/jee-practice/render.ts <chapterId>
 *
 * The booklets are TWO-COLUMN scanned images (no text layer), so each page is split
 * into a LEFT and RIGHT half at the gutter — a full-page crop interleaves the two
 * columns' lines. PNGs land in out/<chapterId>/p<PDFidx>_<L|R>.png (PDF index = the
 * 0-based page index from config.pdfPages, so it matches the printed footer + 1).
 *
 * PyMuPDF via a spawned python (the NEET/CDS/Foundation precedent — no node PDF dep).
 * Zoom 3.0 (~216 DPI on the ~200-DPI scan) — enough for sub/superscripts.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT } from "./config";

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  const outDir = join(OUT, ch.id);
  mkdirSync(outDir, { recursive: true });

  const py = `
import fitz, os
pdf = r"${ch.pdf.replace(/\\/g, "\\\\")}"
out = r"${outDir.replace(/\\/g, "\\\\")}"
pages = [${ch.pdfPages.join(", ")}]
d = fitz.open(pdf)
zoom = fitz.Matrix(3.0, 3.0)
for i in pages:
    pg = d[i]
    r = pg.rect
    mid = r.x0 + r.width / 2 + 6  # small overlap past the gutter
    for tag, clip in (("L", fitz.Rect(r.x0, r.y0, mid, r.y1)), ("R", fitz.Rect(mid - 12, r.y0, r.x1, r.y1))):
        pg.get_pixmap(matrix=zoom, clip=clip).save(os.path.join(out, "p%03d_%s.png" % (i, tag)))
    print("rendered p%d" % i)
print("DONE ->", out)
`;
  const res = spawnSync("python", ["-c", py], { stdio: "inherit" });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
