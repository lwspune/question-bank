"""Render each figure with its SURROUNDINGS and the bbox drawn on top.

The clip probe only catches ink that CONTINUES across a bbox edge. It cannot catch a
DETACHED label (the "P"/"Q" on a wheel, a "C" junction) that sits just outside the
crop with a whitespace gap in between — and those labels are often exactly what the
question asks about. Seeing the box against its context is the only reliable check.

usage: python context_montage.py <pdf> <out.png> <figs.json> [<figs.json> ...]
"""
import json
import sys

import fitz
from PIL import Image, ImageDraw

pdf_path, out_path = sys.argv[1], sys.argv[2]
figs = {}
for m in sys.argv[3:]:
    figs.update(json.load(open(m)))
doc = fitz.open(pdf_path)

PAD_Y, PAD_X, CELL_W = 0.045, 0.05, 820
cells = []

for q, e in sorted(figs.items(), key=lambda kv: int(kv[0])):
    x0, y0, x1, y1 = e["bbox"]
    rx0, ry0 = max(0.0, x0 - PAD_X), max(0.0, y0 - PAD_Y)
    rx1, ry1 = min(1.0, x1 + PAD_X), min(1.0, y1 + PAD_Y)
    pg = doc[e["page"] - 1]
    pw, ph = pg.rect.width, pg.rect.height
    pix = pg.get_pixmap(matrix=fitz.Matrix(2.6, 2.6),
                        clip=fitz.Rect(rx0 * pw, ry0 * ph, rx1 * pw, ry1 * ph))
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("RGB")
    d = ImageDraw.Draw(im)
    # the stored bbox, in this region's pixel space
    bx0 = (x0 - rx0) / (rx1 - rx0) * im.width
    bx1 = (x1 - rx0) / (rx1 - rx0) * im.width
    by0 = (y0 - ry0) / (ry1 - ry0) * im.height
    by1 = (y1 - ry0) / (ry1 - ry0) * im.height
    d.rectangle([bx0, by0, bx1, by1], outline=(255, 0, 0), width=3)
    scale = CELL_W / im.width
    cells.append((q, im.resize((CELL_W, max(1, int(im.height * scale))))))

pad, label_h = 6, 18
H = sum(im.height + label_h + pad for _, im in cells) + pad
canvas = Image.new("RGB", (CELL_W + 2 * pad, H), "white")
d = ImageDraw.Draw(canvas)
y = pad
for q, im in cells:
    d.text((pad, y), f"Q{q}   (red = stored crop)", fill="red")
    canvas.paste(im, (pad, y + label_h))
    y += im.height + label_h + pad
canvas.save(out_path)
print(f"{len(cells)} figures -> {out_path} ({canvas.size[0]}x{canvas.size[1]})")
