/**
 * Regenerate the two pythagoras-10 figures that need a PRE-MADE image.
 *
 *   npx tsx scripts/mh-ssc-10-text/mask-figs.ts
 *
 * WHY THESE TWO ARE NOT PLAIN BBOX CROPS
 * On printed pp.37 and 38 the prose column runs UNDERNEATH the figure's own
 * left-edge vertex labels, so there is no rectangle that contains the diagram
 * and excludes the text:
 *
 *   Fig. 2.14 (Solved Ex.4) — the label `z` sits left of where
 *     "(theorem of geometric mean)" ends, so the crop catches a stray ")".
 *   Fig. 2.16 (Solved Ex.7) — vertex `B` sits left of where
 *     "………from I and II" ends, so the crop catches "nd II", plus a stray "C"
 *     from the `AC²` on the row of the C vertex label.
 *
 * Moving x0 right to exclude the prose would cut vertex B off Fig. 2.16 — and
 * that question is about triangle ABC, so losing B is far worse than a stray
 * glyph. Instead the normal 4x crop is taken and ONLY those prose fragments are
 * painted white. Diagrams, vertex labels, right-angle marks and captions are
 * untouched.
 *
 * SELF-CONTAINED BY DESIGN. It crops from the PDF itself rather than reading
 * attach-images.ts's output, because the moment these two refs became `file`
 * entries in the fig manifest attach-images STOPPED producing crops for them —
 * so depending on that output would leave this script working only while a stale
 * crop happened to survive in out/, and silently breaking the first time out/ was
 * cleared. The page + bbox below are the ORIGINAL manifest values those two refs
 * carried before they were switched to `file`.
 *
 * The mask rects are in CROP pixel space at 4x (the same scale attach-images
 * uses), not page space, so the script asserts the crop dimensions it gets are
 * the ones the rects were measured against.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, requireChapter } from "./config";

const DEST = join(DATA, "figs");

/** Each entry: the crop basename, the white-out rects, and a row band that MUST
 *  still carry ink afterwards — the guard that a mask never eats a vertex label. */
const JOBS = [
  {
    name: "fig-Solved_Ex_7", // Fig. 2.16
    page: 47,
    bbox: [0.588, 0.27, 0.87, 0.462],
    size: [672, 647], // asserted: the rects below were measured at this size
    rects: [
      [0, 88, 32, 172], // stray "C" from AC² on the C-vertex row
      [0, 540, 85, 625], // "nd II" from "………from I and II"
    ],
    mustKeep: { y0: 480, y1: 520, label: "vertex B" },
  },
  {
    name: "fig-Solved_Ex_4", // Fig. 2.14
    page: 46,
    bbox: [0.738, 0.117, 0.93, 0.344],
    size: [458, 765],
    rects: [[0, 100, 30, 205]], // ")" from "(theorem of geometric mean)"
    mustKeep: { y0: 0, y1: 76, label: "vertex P" },
  },
];

function main() {
  const ch = requireChapter("pythagoras-10");
  mkdirSync(DEST, { recursive: true });

  const py = `
import sys, json, os, io
import fitz
from PIL import Image, ImageDraw
import numpy as np
pdf, dst, jobs = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
d = fitz.open(pdf)
for j in jobs:
    pg = d[j["page"]]; w, h = pg.rect.width, pg.rect.height
    fx0, fy0, fx1, fy1 = j["bbox"]
    clip = fitz.Rect(fx0*w, fy0*h, fx1*w, fy1*h)
    pix = pg.get_pixmap(matrix=fitz.Matrix(4.0, 4.0), clip=clip)
    im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    want = tuple(j["size"])
    if im.size != want:
        raise SystemExit("SIZE DRIFT in %s: cropped %s but the mask rects were measured at %s - refusing, remeasure the rects" % (j["name"], im.size, want))
    dr = ImageDraw.Draw(im)
    for r in j["rects"]:
        dr.rectangle(tuple(r), fill=(255, 255, 255))
    out = os.path.join(dst, j["name"] + ".png")
    im.save(out)
    a = np.array(im.convert("L"))
    mk = j["mustKeep"]
    ink = int((a[mk["y0"]:mk["y1"], :120] < 128).sum())
    if ink == 0:
        raise SystemExit("MASK ATE " + mk["label"] + " in " + j["name"] + " - refusing")
    print("  %-22s %5d KB   %s kept (%d dark px)" % (j["name"], os.path.getsize(out)//1024, mk["label"], ink))
print("ok")
`;
  const res = spawnSync("python", ["-c", py, ch.pdf, DEST, JSON.stringify(JOBS)], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`mask failed: ${res.stderr || res.stdout}`);
  console.log(res.stdout.trim());
  console.log(`\nmasked figures → ${DEST}`);
}

main();
