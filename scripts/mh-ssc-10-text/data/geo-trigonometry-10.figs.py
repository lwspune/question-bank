# -*- coding: utf-8 -*-
"""Crop the seven solved-example figures of geo-trigonometry-10 and build a
contact sheet for eyeballing. These are SOLUTION diagrams (the book prints them
beside its own worked solution), so they attach via attach-solution-image.ts,
not via the question-figure channel.
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "out")
PAGES = os.path.join(OUT, "geo-trigonometry-10")
DEST = os.path.join(HERE, "data", "figs", "geo-trigonometry-10")
os.makedirs(DEST, exist_ok=True)

# ref -> (page png, bbox as fractions [x0,y0,x1,y1], figure label)
FIGS = {
    # bboxes MEASURED with out/_geotrig_profile.py (blank-gutter column/row
    # profiling), not eyeballed: each left edge sits just inside the gutter that
    # separates the figure from the body text printed beside it.
    "Trigonometric identities SolvedEx.1": (137, [0.700, 0.610, 0.890, 0.730], "Fig. 6.4"),
    "Trigonometric identities SolvedEx.2": (138, [0.764, 0.085, 0.930, 0.312], "Fig. 6.5"),
    "Application of trigonometry SolvedEx.1": (142, [0.140, 0.645, 0.400, 0.908], "Fig. 6.9"),
    "Application of trigonometry SolvedEx.2": (143, [0.508, 0.170, 0.868, 0.330], "Fig. 6.10"),
    "Application of trigonometry SolvedEx.3": (143, [0.100, 0.710, 0.460, 0.902], "Fig. 6.11"),
    # 6.12 left edge keeps the "y" label whole; a one-glyph body-text fragment
    # at the left edge is accepted, because clipping a label the solution names
    # would break the answer while a neighbour fragment is only cosmetic.
    "Application of trigonometry SolvedEx.4": (144, [0.5480, 0.552, 0.905, 0.856], "Fig. 6.12"),
    "Application of trigonometry SolvedEx.5": (146, [0.575, 0.100, 0.900, 0.432], "Fig. 6.13"),
}

crops = []
for ref, (page, bbox, label) in FIGS.items():
    src = Image.open(os.path.join(PAGES, f"p-{page}.png"))
    W, H = src.size
    box = (int(bbox[0] * W), int(bbox[1] * H), int(bbox[2] * W), int(bbox[3] * H))
    c = src.crop(box)
    # upscale x2 so labels stay legible at web size
    c = c.resize((c.width * 2, c.height * 2), Image.LANCZOS).convert("RGB")
    slug = ref.replace(" ", "_").replace(".", "")
    p = os.path.join(DEST, f"{slug}.png")
    c.save(p, optimize=True)
    crops.append((ref, label, p, c.size, os.path.getsize(p)))
    print(f"{label:<10} {ref:<42} {c.size}  {os.path.getsize(p)//1024} KB  -> {p}")

# contact sheet
cols = 3
tw = max(c[3][0] for c in crops)
th = max(c[3][1] for c in crops)
rows = (len(crops) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw, rows * th), "white")
for i, (_, _, p, _, _) in enumerate(crops):
    im = Image.open(p)
    sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
sheet.thumbnail((1600, 1600), Image.LANCZOS)
sheet.save(os.path.join(OUT, "_geotrig_figsheet.png"))
print("contact sheet ->", os.path.join(OUT, "_geotrig_figsheet.png"))
