"""Mechanically detect CLIPPED figure crops.

A crop is clipped when the figure's ink runs right up to a bbox edge AND continues
immediately outside it. That is a deterministic test the current verify gate lacks
(figureFlags only checks bbox height), and it is exactly the defect class the
reports describe ("letter C is trimmed").

For each edge: measure ink density in a thin band just INSIDE the bbox and a thin
band just OUTSIDE. If both are inked, the figure was cut at that edge.

usage: python clip_probe.py <pdf> <manifest.json> [<manifest.json> ...]
"""
import json
import sys

import fitz
import numpy as np
from PIL import Image

INK = 165
BAND = 0.004      # thickness of the inside/outside test bands, page fractions
MIN_DENSITY = 0.02  # fraction of the band that must be ink to count as "content"

pdf_path = sys.argv[1]
manifests = sys.argv[2:]

figs = {}
for m in manifests:
    figs.update(json.load(open(m)))

doc = fitz.open(pdf_path)
page_cache = {}


def mask_for(page1):
    if page1 not in page_cache:
        pg = doc[page1 - 1]
        pix = pg.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        page_cache[page1] = np.asarray(im.convert("L")) < INK
    return page_cache[page1]


def density(mask, x0, y0, x1, y1):
    H, W = mask.shape
    a, b = max(0, int(y0 * H)), min(H, int(y1 * H))
    c, d = max(0, int(x0 * W)), min(W, int(x1 * W))
    if b <= a or d <= c:
        return 0.0
    return float(mask[a:b, c:d].mean())


results = []
for q, e in sorted(figs.items(), key=lambda kv: int(kv[0])):
    x0, y0, x1, y1 = e["bbox"]
    m = mask_for(e["page"])
    cuts = []
    # top / bottom edges: compare full-width bands
    for name, inside, outside in [
        ("TOP", (x0, y0, x1, y0 + BAND), (x0, y0 - BAND, x1, y0)),
        ("BOTTOM", (x0, y1 - BAND, x1, y1), (x0, y1, x1, y1 + BAND)),
        ("LEFT", (x0, y0, x0 + BAND, y1), (x0 - BAND, y0, x0, y1)),
        ("RIGHT", (x1 - BAND, y0, x1, y1), (x1, y0, x1 + BAND, y1)),
    ]:
        din = density(m, *inside)
        dout = density(m, *outside)
        if din > MIN_DENSITY and dout > MIN_DENSITY:
            cuts.append(f"{name}(in={din:.3f},out={dout:.3f})")
    results.append((q, e["page"], cuts, e["bbox"]))

bad = [r for r in results if r[2]]
print(f"{len(figs)} figures, {len(bad)} show ink continuing past an edge (CLIPPED):\n")
for q, page, cuts, bbox in bad:
    print(f"  Q{q:>4}  p{page:<3} {bbox}  ->  {'; '.join(cuts)}")
print("\nclean:", " ".join(f"Q{q}" for q, _, c, _ in results if not c))
