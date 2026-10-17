"""
Pixel geometry of the CGL 2025 Tier II sheet: the TCS print scanned to one picture per page,
with no text layer at all (not even the "Q.n" labels). raster.ts turns it into questions.

  python -P scripts/ssc-cgl/raster_extract.py <dayId> "<pdf>"   -> out/<dayId>/raster.json

Per page (pdf page 1 is AglaSem's cover and is skipped):
- icons: the tick (green) and cross (red) blobs in the icon column left of the option numbers.
  The keyed option is the tick; its number prints green beside it, so a tick blob is wider.
- panels: runs of ink lines in the right-hand panel column ("Question ID :" .. "Chosen
  Option :"), below each question's options. The panel names the candidate's chosen option,
  so it is never shown to a transcriber.
Coordinates are pixels of the page picture (1239 x 1754, 150 dpi).
"""
import json
import os
import sys

import fitz
import numpy as np

# The icon column: crosses start at x 157, ticks run to 191 with their green number.
ICON_X = (140, 200)
# The panel's labels and values sit in x ~760-1030; a stem line rarely reaches past 760.
PANEL_X = (790, 1150)
MIN_BLOB = 15  # pixels: a smaller coloured speck is scan noise


def page_array(doc, page):
    imgs = page.get_images(full=True)
    big = max(imgs, key=lambda im: im[2] * im[3])
    pix = fitz.Pixmap(doc, big[0])
    if pix.n > 3 or pix.colorspace.n != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    a = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)[:, :, :3].astype(int)
    return a


def runs(rows, gap):
    """Group sorted row indices into [first, last] runs whose members are at most `gap` apart."""
    out = []
    for y in rows:
        if out and y - out[-1][1] <= gap:
            out[-1][1] = y
        else:
            out.append([y, y])
    return out


def icons(a):
    col = a[:, ICON_X[0]:ICON_X[1]]
    r, g, b = col[..., 0], col[..., 1], col[..., 2]
    green = (g - r > 60) & (g - b > 40) & (g > 120)
    red = (r - g > 90) & (r - b > 90) & (r > 150)
    out = []
    for kind, mask in (("tick", green), ("cross", red)):
        rows = np.nonzero(mask.any(axis=1))[0]
        for y0, y1 in runs(rows, 3):
            band = mask[y0:y1 + 1]
            n = int(band.sum())
            if n < MIN_BLOB:
                continue
            xs = np.nonzero(band.any(axis=0))[0]
            out.append({"kind": kind, "y0": int(y0), "y1": int(y1), "x0": int(xs.min()) + ICON_X[0], "x1": int(xs.max()) + ICON_X[0], "n": n})
    return sorted(out, key=lambda i: i["y0"])


def panels(a):
    col = a[:, PANEL_X[0]:PANEL_X[1]]
    ink = col.sum(axis=2) < 450
    rows = np.nonzero(ink.sum(axis=1) >= 2)[0]
    out = []
    for y0, y1 in runs(rows, 14):
        lines = len(runs(np.nonzero(ink[y0:y1 + 1].sum(axis=1) >= 2)[0], 2))
        out.append({"y0": int(y0), "y1": int(y1), "lines": lines})
    return out


def main():
    if len(sys.argv) < 3:
        sys.exit('usage: raster_extract.py <dayId> "<pdf>"')
    day, pdf = sys.argv[1], sys.argv[2]
    base = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(base, "out", day)
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf)
    pages = []
    for i in range(1, len(doc)):  # page 0 is the cover
        a = page_array(doc, doc[i])
        pages.append({"page": i, "width": int(a.shape[1]), "height": int(a.shape[0]), "icons": icons(a), "panels": panels(a)})
    json.dump({"pdf": pdf, "pages": pages}, open(os.path.join(out_dir, "raster.json"), "w", encoding="utf8"), indent=1)
    n_icons = sum(len(p["icons"]) for p in pages)
    n_ticks = sum(1 for p in pages for i in p["icons"] if i["kind"] == "tick")
    n_panels = sum(1 for p in pages for b in p["panels"] if b["lines"] >= 5)
    print(f"{day}: {len(pages)} pages, {n_icons} icons ({n_ticks} ticks), {n_panels} panel-like blocks -> {out_dir}")


if __name__ == "__main__":
    main()
