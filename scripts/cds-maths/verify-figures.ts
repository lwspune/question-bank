/**
 * Crop every derived figure bbox and build a contact sheet for visual review.
 *
 *   npx tsx scripts/cds-maths/verify-figures.ts <paperId>
 *
 * Writes out/<paperId>/figs/<ref>.png plus out/<paperId>/figs/_contact.png.
 * out/ is gitignored; these are regenerable.
 *
 * THIS STEP IS MANDATORY, and the shared core's README says why in two separate
 * places. `snap_crop` returning `ok: true` means only that the anchors sat in
 * whitespace and the crop cleared the ceiling — it is computed from the anchors,
 * not from the figure, so it cannot tell you the crop contains the whole diagram.
 * Separately the core bounds only pixels darker than INK=165, so pale line art is
 * invisible to it: it clips and still reports ok. Both have shipped clipped
 * figures in this repo.
 *
 * HOW TO READ THE OUTPUT, from a mistake made on the Class-9 geometry run: a
 * contact sheet's panel borders overlap the edge labels of a figure and read as a
 * slice. Verify a SUSPECTED clip against the individual <ref>.png, never against
 * the montage. And padding a bbox outward does not fix clipping — it captures the
 * neighbour; if a crop looks clipped, re-measure the anchors instead.
 *
 * On this paper the figure sits between the question number and the stem, so the
 * two things to check on every panel are: (a) is any part of the diagram cut off,
 * and (b) has any of the STEM text below it leaked in.
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, dataPath, requirePaper } from "./config";

type Fig = { ref: string; page: number; bbox: [number, number, number, number] };

function main() {
  const paper = requirePaper(process.argv[2]);
  const fPath = dataPath(paper.id, "fig");
  if (!existsSync(fPath)) throw new Error(`missing ${fPath} — run snap-crop.ts --write first`);
  const figs: Fig[] = JSON.parse(readFileSync(fPath, "utf8"));
  if (!figs.length) throw new Error(`${fPath} is empty`);

  const outDir = join(OUT, paper.id, "figs");
  mkdirSync(outDir, { recursive: true });

  const py = `
import fitz, json, sys
from PIL import Image, ImageDraw
pdf, outdir, figs_json = sys.argv[1], sys.argv[2], sys.argv[3]
figs = json.loads(figs_json)
doc = fitz.open(pdf)
ZOOM = 3.0
panels = []
for f in figs:
    pg = doc[f["page"]]
    r = pg.rect
    x0, y0, x1, y1 = f["bbox"]
    clip = fitz.Rect(r.width*x0, r.height*y0, r.width*x1, r.height*y1)
    pix = pg.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip)
    path = f"{outdir}/{f['ref']}.png"
    pix.save(path)
    im = Image.open(path).convert("RGB")
    panels.append((f["ref"], f["page"], im))
    print(f"{f['ref']:>6}  p{f['page']:02d}  {im.width}x{im.height}px")

# Contact sheet: uniform cells, each panel scaled to fit with its label.
CW, CH, COLS, LBL = 460, 400, 4, 22
rows = (len(panels) + COLS - 1)//COLS
sheet = Image.new("RGB", (COLS*CW, rows*(CH+LBL)), "white")
dr = ImageDraw.Draw(sheet)
for i, (ref, page, im) in enumerate(panels):
    s = min(CW/im.width, CH/im.height, 1.0)
    thumb = im.resize((max(1,int(im.width*s)), max(1,int(im.height*s))))
    x, y = (i % COLS)*CW, (i//COLS)*(CH+LBL)
    dr.text((x+4, y+5), f"{ref}  p{page:02d}  {im.width}x{im.height}", fill="black")
    sheet.paste(thumb, (x + (CW-thumb.width)//2, y + LBL))
    dr.rectangle([x, y, x+CW-1, y+CH+LBL-1], outline=(200,200,200))
sheet.save(f"{outdir}/_contact.png")
print("contact sheet:", f"{outdir}/_contact.png", sheet.size)
`;
  const res = spawnSync("python", ["-c", py, paper.pdf, outDir, JSON.stringify(figs)], {
    encoding: "utf8",
    stdio: "inherit",
  });
  if (res.status !== 0) process.exit(res.status ?? 1);

  console.log(
    `\nNow LOOK at every panel. Two failure modes on this paper:\n` +
      `  - the diagram is clipped (labels, arrowheads and vertex letters are the usual casualties);\n` +
      `  - the STEM text below the figure has leaked into the crop.\n` +
      `A panel that looks clipped must be checked against its own ${outDir}\\<ref>.png,\n` +
      `not against the contact sheet — panel borders overlap edge labels and read as slices.`
  );
}

main();
