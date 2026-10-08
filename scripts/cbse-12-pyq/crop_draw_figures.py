"""Crop the NCERT book figures named in data/draw-figures.json.

    python scripts/cbse-12-pyq/crop_draw_figures.py

Each entry names a PDF in the NCERT Class 12 Biology folder, a 0-based page and
a bbox in page FRACTIONS (and optionally `mask`, page-fraction rects to paint
white first). The crop is rendered at 3x and written to
out/draw-figures/<ref>.png, then attach-draw-figures.ts uploads it.

A crop over 900 KB is quantized to 256 colours: storage rejects PNGs over about
1.5 MB, and a textbook line figure loses nothing visible at 256 colours (the
Biology textbook lane's rule).
"""
import io
import json
import os

import fitz
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
OUT = os.path.join(HERE, "out", "draw-figures")
BOOKS = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books\12th\Biology"
ZOOM = 3.0
QUANTIZE_OVER = 900_000


def main():
    manifest = json.load(open(os.path.join(DATA, "draw-figures.json"), encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    for e in manifest:
        if e.get("none"):
            continue  # a recorded decision that no book figure fits
        doc = fitz.open(os.path.join(BOOKS, e["book"]))
        page = doc[e["page"]]
        w, h = page.rect.width, page.rect.height
        x0, y0, x1, y1 = e["bbox"]
        clip = fitz.Rect(x0 * w, y0 * h, x1 * w, y1 * h)
        # `mask`: page-fraction rects painted over before rendering, for page
        # furniture (a page-number tab) that sits inside the figure's box.
        # White unless the rect carries an RGB (0-255) matching the background.
        for m in e.get("mask", []):
            fill = tuple(c / 255 for c in m[4:7]) if len(m) >= 7 else (1, 1, 1)
            page.draw_rect(fitz.Rect(m[0] * w, m[1] * h, m[2] * w, m[3] * h), color=None, fill=fill, overlay=True)
        pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip)
        png = pix.tobytes("png")
        if len(png) > QUANTIZE_OVER:
            im = Image.open(io.BytesIO(png)).convert("RGB").quantize(colors=256)
            buf = io.BytesIO()
            im.save(buf, format="PNG", optimize=True)
            png = buf.getvalue()
        path = os.path.join(OUT, e["ref"].replace(":", "_") + ".png")
        open(path, "wb").write(png)
        print(f"{e['ref']}  {e['fig']:<28} {len(png):>8} B  -> {path}")


if __name__ == "__main__":
    main()
