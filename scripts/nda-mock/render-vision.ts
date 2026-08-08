/**
 * Render a VISION-LANE paper's PDFs to page PNGs.
 *
 *   npx tsx scripts/nda-mock/render-vision.ts m9
 *
 * Mock 9 is the one paper the pandoc lane cannot read: its equations are legacy
 * MS-Equation `.wmf` objects, so `pandoc` emits an image reference and nothing
 * else. Its PDFs DO carry a text layer, but Word exported each formula as
 * individually-positioned glyphs, so the reading order is shredded —
 * `(2x^2 - x + 1)^35` comes out as `35 2 )1 2 ( +-x x`, and every exponent is
 * flattened into the baseline. Prose survives; math does not.
 *
 * So: render the pages and transcribe them by eye, the same lane the NEET and
 * State Board ingestions use. The pages are born-digital renders rather than
 * scans, so they are sharp at modest DPI.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { requirePaper, OUT } from "./config";

const PY = `
import sys, fitz
src, outdir, dpi, tag = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
doc = fitz.open(src)
zoom = dpi / 72
for i in range(doc.page_count):
    pix = doc[i].get_pixmap(matrix=fitz.Matrix(zoom, zoom))
    pix.save(f"{outdir}/{tag}-p{i + 1:02d}.png")
print(f"{tag}: {doc.page_count} page(s)")
`;

function main() {
  const paper = requirePaper(process.argv[2]);
  if (!paper.visionPdfs) {
    throw new Error(`${paper.id} is not a vision-lane paper (no visionPdfs in config)`);
  }
  const dir = join(OUT, paper.id, "pages");
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  for (const [tag, pdf] of Object.entries(paper.visionPdfs)) {
    const out = execFileSync("python", ["-c", PY, pdf, dir, "200", tag], { encoding: "utf8" });
    process.stdout.write(out);
  }
  console.log(`\nwrote page PNGs to ${dir}`);
}

if (require.main === module) main();
