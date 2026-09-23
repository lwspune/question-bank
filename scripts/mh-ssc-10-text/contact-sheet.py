"""
Contact sheet for a chapter's derived figure boxes — the mandatory review step.

  python scripts/mh-ssc-10-text/contact-sheet.py <pdf> <chapterId> [per_sheet]

Reads every data/<chapterId>.*fig.json manifest and writes
out/<chapterId>-sheet-N.png: each figure rendered WITH ITS SURROUNDINGS and the
stored box drawn on top in red.

WHY CONTEXT AND NOT THE CROP ITSELF. A crop shown alone looks fine when it is
wrong — you cannot see what was left outside it. Two failures only the context
view catches: a DETACHED vertex label sitting just past the edge with whitespace
in between (and that label is often the thing the question asks about), and a
box that has quietly swallowed the neighbouring figure or a line of the solution.
Rendering the box against the page shows both.

Geometry being confident is not the same as the box being right — on the NCERT
Class-10 run geometry was equally confident and 6 of 22 crops were visibly wrong.
This sheet is what stands between that and a student.

Pages here are 0-BASED, matching config.ts and the manifests. The shared
scripts/lib/figures/context_montage.py takes 1-based pages and sorts refs
numerically, neither of which holds in this pipeline.
"""
import glob
import json
import os
import sys

import fitz
from PIL import Image, ImageDraw

PAD_X, PAD_Y = 0.035, 0.030
CELL_W = 560
COLS = 3


def main():
    pdf_path, chapter = sys.argv[1], sys.argv[2]
    per_sheet = int(sys.argv[3]) if len(sys.argv) > 3 else 12
    here = os.path.dirname(os.path.abspath(__file__))
    data, out = os.path.join(here, "data"), os.path.join(here, "out")

    # Review the CANDIDATES, not the signed-off manifest. Rendering the manifest
    # would only ever show boxes that had already been accepted, which is not a
    # review. Falls back to the data/ manifests for chapters anchored by hand.
    entries = []
    cand = os.path.join(out, f"{chapter}.candidates.json")
    sources = [cand] if os.path.exists(cand) else sorted(glob.glob(os.path.join(data, f"{chapter}.*fig.json")))
    for path in sources:
        for e in json.load(open(path, encoding="utf-8")):
            if e.get("bbox"):
                entries.append(e)
    if not entries:
        print(f"no boxed entries for {chapter}")
        return
    entries.sort(key=lambda e: (e["page"], e["bbox"][1]))

    doc = fitz.open(pdf_path)
    cells = []
    for e in entries:
        x0, y0, x1, y1 = e["bbox"]
        rx0, ry0 = max(0.0, x0 - PAD_X), max(0.0, y0 - PAD_Y)
        rx1, ry1 = min(1.0, x1 + PAD_X), min(1.0, y1 + PAD_Y)
        pg = doc[e["page"]]
        pw, ph = pg.rect.width, pg.rect.height
        pix = pg.get_pixmap(matrix=fitz.Matrix(2.4, 2.4), clip=fitz.Rect(rx0 * pw, ry0 * ph, rx1 * pw, ry1 * ph))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("RGB")
        d = ImageDraw.Draw(im)
        bx0 = (x0 - rx0) / (rx1 - rx0) * im.width
        bx1 = (x1 - rx0) / (rx1 - rx0) * im.width
        by0 = (y0 - ry0) / (ry1 - ry0) * im.height
        by1 = (y1 - ry0) / (ry1 - ry0) * im.height
        d.rectangle([bx0, by0, bx1, by1], outline=(255, 0, 0), width=3)
        scale = CELL_W / im.width
        cells.append((e.get("ref") or f"Fig {e.get('fig')}", im.resize((CELL_W, max(1, int(im.height * scale))))))

    label_h, pad = 16, 5
    n = 0
    for start in range(0, len(cells), per_sheet):
        chunk = cells[start : start + per_sheet]
        rows = [chunk[i : i + COLS] for i in range(0, len(chunk), COLS)]
        row_h = [max(im.height for _, im in r) + label_h + pad for r in rows]
        canvas = Image.new("RGB", (COLS * (CELL_W + pad) + pad, sum(row_h) + pad), "white")
        d = ImageDraw.Draw(canvas)
        y = pad
        for r, h in zip(rows, row_h):
            x = pad
            for ref, im in r:
                d.text((x, y), ref[:62], fill=(200, 0, 0))
                canvas.paste(im, (x, y + label_h))
                x += CELL_W + pad
            y += h
        path = os.path.join(out, f"{chapter}-sheet-{n}.png")
        canvas.save(path)
        print(f"{len(chunk)} figures -> {path} ({canvas.size[0]}x{canvas.size[1]})")
        n += 1


if __name__ == "__main__":
    main()
