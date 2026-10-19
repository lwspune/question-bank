"""Crop the NCERT book figures named in data/draw-figures.json.

    python scripts/cbse-12-pyq/crop_draw_figures.py

Each entry names a PDF in the NCERT Class 12 Biology folder (`book`) or, where
no book figure fits, a CBSE marking scheme under the PYQ source folder (`ms`,
a path relative to it: the official answer key draws the expected diagram), a
0-based page and a bbox in page FRACTIONS (and optionally `mask`, page-fraction rects to paint
white first). The crop is rendered at 3x and written to
out/draw-figures/<ref>.png, then attach-draw-figures.ts uploads it.

A crop over 900 KB is quantized to 256 colours: storage rejects PNGs over about
1.5 MB, and a textbook line figure loses nothing visible at 256 colours (the
Biology textbook lane's rule).
"""
import io
import json
import os

import sys

import fitz
from PIL import Image

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib", "figures"))
from crop_answer_figs import _signatures  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
OUT = os.path.join(HERE, "out", "draw-figures")
BOOKS = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books\12th\Biology"
MARKING_SCHEMES = r"C:\tmp\PYQPs\CBSE\XII\Biology"
ZOOM = 3.0
QUANTIZE_OVER = 900_000


def main():
    manifest = json.load(open(os.path.join(DATA, "draw-figures.json"), encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    for e in manifest:
        if e.get("none"):
            continue  # a recorded decision that no book figure fits
        src = os.path.join(MARKING_SCHEMES, e["ms"]) if e.get("ms") else os.path.join(BOOKS, e["book"])
        doc = fitz.open(src)
        page = doc[e["page"]]
        # NCERT's "(c) NCERT not to be republished" watermark is a page image
        # repeated on every page; blank it (crop_answer_figs.furniture_signatures).
        furniture = _signatures(src)
        for i in page.get_images(full=True):
            if (i[2], i[3], i[5]) in furniture:
                page.delete_image(i[0])
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
