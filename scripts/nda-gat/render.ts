/**
 * Rasterise an NDA GAT booklet's ENGLISH pages for the vision pass.
 *
 *   npx tsx scripts/nda-gat/render.ts 2026-2              # the base series (A)
 *   npx tsx scripts/nda-gat/render.ts 2026-2 --series=D   # a sibling series
 *   npx tsx scripts/nda-gat/render.ts 2026-2 --pages=13,15
 *
 * Writes out/<paperId>[-<series>]/p<PRINTED>.png. out/ is gitignored.
 *
 * ONE script for the base and the variants, unlike the sibling nda-pyq pipeline
 * which has two near-copies. The `Booklet` type in config.ts already describes
 * rotation, spreads and the page list uniformly, so there is nothing left for a
 * second script to differ about.
 *
 * ## Files are named by the PRINTED page, not the PDF index
 *
 * `p47.png` is the page whose footer reads `( 47 - A )`. The index is an
 * accident of how the booklet was photographed -- Set A holds two printed pages
 * per image, Set D is missing four pages so its offset steps three times -- and
 * naming by it would make every agent instruction and every band report
 * translate between two numbering systems for no gain. The printed number is
 * also what the agent reads back off the footer as its coverage check.
 *
 * ## Resolution is a TARGET WIDTH, not a zoom factor
 *
 * These PDFs disagree about page size and about how much real image data backs a
 * page: Set A carries roughly 885x1184 pixels PER PRINTED PAGE (two pages share
 * one ~1200x1770 photograph) while Set D carries ~1150x1570 for one. A fixed
 * zoom would therefore hand an agent two very different renders from the same
 * line of code. Targeting ~2200px wide puts both in the same band.
 *
 * Upscaling past the source resolution adds no information, and that is
 * deliberate rather than overlooked: it is what a vision pass reads best, and
 * where a glyph is genuinely ambiguous the answer is a TARGETED CROP at 6-10x
 * from the source PDF, not a higher whole-page render.
 *
 * ## The spread crop overlaps the fold on purpose
 *
 * A photographed spread does not fold at exactly 50% -- the binding curves and
 * the camera is off-axis -- so a hard half clips the inner column on some
 * spreads. A 3% overlap costs a sliver of the facing page and cannot lose
 * content. Anything in Devanagari at the inner edge belongs to the facing page.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { requirePaper, requireVariant, outDir, type Booklet } from "./config";

const PY = `
import fitz, sys, json
pdf, outdir = sys.argv[1], sys.argv[2]
rot = int(sys.argv[3])
spread = sys.argv[4] == "yes"
refs = json.loads(sys.argv[5])
TARGET_W = 2200.0
d = fitz.open(pdf)
sizes = []
for ref in refs:
    p = d[ref["idx"]]
    if rot:
        p.set_rotation(rot)
    r = p.rect
    if spread:
        # 3% overlap past the fold -- see this script's header.
        clip = (fitz.Rect(0, 0, r.width * 0.53, r.height)
                if ref.get("half") == "L"
                else fitz.Rect(r.width * 0.47, 0, r.width, r.height))
    else:
        clip = r
    # Scale from the CLIP width, not the page width -- a half-spread would
    # otherwise render at half the intended resolution.
    z = TARGET_W / clip.width
    pix = p.get_pixmap(matrix=fitz.Matrix(z, z), clip=clip)
    pix.save(outdir + "/p" + str(ref["printed"]) + ".png")
    sizes.append((pix.width, pix.height))
w = sorted(s[0] for s in sizes)
h = sorted(s[1] for s in sizes)
print("rendered " + str(len(refs)) + " page(s) of " + str(d.page_count) + " to " + outdir)
print("  page size: " + str(w[0]) + "x" + str(h[0]) + " .. " + str(w[-1]) + "x" + str(h[-1]))
`;

function main() {
  const paper = requirePaper(process.argv[2]);
  const seriesArg = process.argv.find((a) => a.startsWith("--series="))?.split("=")[1];
  const series = (seriesArg ?? paper.base.series).toUpperCase();
  const booklet: Booklet =
    series === paper.base.series.toUpperCase() ? paper.base : requireVariant(paper, series);

  const only = process.argv
    .find((a) => a.startsWith("--pages="))
    ?.split("=")[1]
    .split(",")
    .map(Number)
    .filter((n) => !Number.isNaN(n));

  const refs = only?.length ? booklet.pages.filter((p) => only.includes(p.printed)) : booklet.pages;
  if (!refs.length) {
    throw new Error(
      `no pages selected for ${paper.id}-${series}` +
        (only?.length ? ` -- --pages=${only.join(",")} matches none of the configured pages` : "")
    );
  }

  const dir = outDir(paper.id, series);
  // Only ever clears THIS series' directory. The sibling stateboard pipeline
  // once destroyed a text dump by clearing a shared parent; per-series
  // directories make that structurally impossible here.
  if (!only?.length) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  console.log(`${paper.id} series ${series}: ${refs.length} English page(s)`);
  if (booklet.missing?.printed.length) {
    console.log(`  ! printed pages absent from this scan: ${booklet.missing.printed.join(", ")}`);
  }

  const res = spawnSync(
    "python",
    ["-c", PY, booklet.pdf, dir, String(booklet.rotate ?? 0), booklet.spread ? "yes" : "no", JSON.stringify(refs)],
    { encoding: "utf8", stdio: "inherit" }
  );
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
