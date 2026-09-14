/**
 * Rasterise a SIBLING SERIES booklet's English pages for the matching pass.
 *
 *   npx tsx scripts/nda-pyq/render-variant.ts 2026-2 B
 *   npx tsx scripts/nda-pyq/render-variant.ts 2026-2 C
 *
 * Writes out/<paperId>-<series>/pNN.png. out/ is gitignored (regenerable).
 *
 * These are PHOTOGRAPHS of a booklet, not flatbed scans, which is a different
 * problem from the base paper and drives every choice here:
 *
 *  - **Rotation.** Set C was shot sideways. `rotate` is applied BEFORE the
 *    pixmap is taken so the agent is handed upright text. It is 270 and not 90:
 *    at 90 the page renders upside down, which is legible enough to fool a
 *    glance and useless to read.
 *  - **Spreads.** One Set C image holds TWO printed pages. Only the English half
 *    is cropped out, so an agent never sees the Devanagari page at all and the
 *    base pipeline's "you should never see Devanagari" rule still holds.
 *  - **Resolution is a TARGET WIDTH, not a zoom factor**, and that is not a
 *    detail. These PDFs disagree wildly about page size: Set B and D pages are
 *    3000x4000 POINTS while Set C's are ordinary A4-ish. A fixed 3.0x zoom —
 *    which is what the base pipeline uses on uniform scans — produced a
 *    9000x12000 (108 megapixel) image for Set B and a 1340-wide one for Set C
 *    from the same line of code. The first is unreadable in practice and the
 *    second is thin. Targeting ~2200px wide puts every set in the same band,
 *    comparable to the base paper's 2.6x on A4.
 *
 * The crop keeps a 3% overlap past the centre fold. A photographed spread does
 * not fold at exactly 50% — the binding curves and the camera is off-axis — so a
 * hard half would clip the inner column of the English page on some spreads.
 * Overlapping costs a sliver of the facing page and cannot lose content.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { OUT, requirePaper, requireVariant } from "./config";

function main() {
  const paper = requirePaper(process.argv[2]);
  const series = (process.argv[3] ?? "").toUpperCase();
  const v = requireVariant(paper.id, series);

  if (!v.englishPages.length) {
    throw new Error(
      `variant ${paper.id}-${series} has an empty englishPages list.\n` +
        `  Read the printed page numbers off the footers first — the index list is\n` +
        `  NOT a formula (Set C carries duplicate spreads).`
    );
  }

  const outDir = join(OUT, `${paper.id}-${series}`);
  mkdirSync(outDir, { recursive: true });

  const py = `
import fitz, sys
pdf, outdir, rot, spread, half = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4], sys.argv[5]
pages = [int(x) for x in sys.argv[6:]]
TARGET_W = 2200.0
d = fitz.open(pdf)
sizes = []
for i in pages:
    p = d[i]
    if rot: p.set_rotation(rot)
    r = p.rect
    if spread == "yes":
        clip = fitz.Rect(r.width * 0.47, 0, r.width, r.height) if half == "second"                else fitz.Rect(0, 0, r.width * 0.53, r.height)
    else:
        clip = r
    # Scale from the CLIP width, not the page width — a half-spread would
    # otherwise render at half the intended resolution.
    z = TARGET_W / clip.width
    pix = p.get_pixmap(matrix=fitz.Matrix(z, z), clip=clip)
    pix.save(f"{outdir}/p{i:02d}.png")
    sizes.append((pix.width, pix.height))
w = sorted(s[0] for s in sizes); h = sorted(s[1] for s in sizes)
print(f"rendered {len(pages)} page(s) to {outdir}")
print(f"  page size: {w[0]}x{h[0]} .. {w[-1]}x{h[-1]} (target width {int(TARGET_W)})")
`;
  const res = spawnSync(
    "python",
    [
      "-c",
      py,
      v.pdf,
      outDir,
      String(v.rotate ?? 0),
      v.spread ? "yes" : "no",
      v.spreadHalf ?? "second",
      ...[...v.englishPages, ...(v.hindiFallbackPages ?? [])].map(String),
    ],
    { encoding: "utf8", stdio: "inherit" }
  );
  if (res.status !== 0) process.exit(res.status ?? 1);
}

main();
