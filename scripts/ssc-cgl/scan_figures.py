"""Figures for a question on a 2023 scan's raster first page, which has no image objects to map.

    python -P scripts/ssc-cgl/scan_figures.py <shiftId> <number> <stem|options|stem+options> <outBase>

Writes <outBase>.png (stem) and/or <outBase>-A.png .. -D.png (options), cropped from the page:
- the stem figure lies in the largest vertical gap between the question's OCR sentence lines
  (spans wider than 120 pt) and its first option row, trimmed to its ink;
- each option figure is its option row (halfway to the neighbouring rows), right of the option
  number, trimmed to its ink.
Key-coloured pixels are turned grey in every crop, so no picture can carry the key.
"""
import json
import os
import sys

import fitz  # PyMuPDF
from PIL import Image

Z = 3.0
X_LEFT, X_RIGHT = 60, 560  # inside the frame
OPTION_X = 99  # right of the option number ("1." ends ~97 pt)
INK = 3 * 170  # darker than the faint watermark


def is_key(r, g, b):
    return (g >= 120 and g - r >= 60 and g - b >= 60) or (r >= 180 and r - g >= 120 and r - b >= 120)


def render(page, x0, y0, x1, y1):
    pix = page.get_pixmap(matrix=fitz.Matrix(Z, Z), clip=fitz.Rect(x0, y0, x1, y1))
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            if is_key(*px[x, y]):
                px[x, y] = (60, 60, 60)
    return img


def trim(img, pad=6):
    px = img.load()
    xs, ys = [], []
    for y in range(img.height):
        for x in range(img.width):
            if sum(px[x, y]) < INK:
                xs.append(x)
                ys.append(y)
    if not xs:
        return None
    return img.crop((max(0, min(xs) - pad), max(0, min(ys) - pad), min(img.width, max(xs) + pad + 1), min(img.height, max(ys) + pad + 1)))


def main():
    shift, number, kind, out_base = sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4]
    base = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    data = json.load(open(os.path.join(base, shift, "questions.json"), encoding="utf8"))
    g = json.load(open(os.path.join(os.path.dirname(data["imgDir"]), "geometry.json"), encoding="utf8"))
    q = next(x for x in data["questions"] if int(x["number"]) == number)
    r = q["regions"][0]
    if not r.get("raster"):
        sys.exit(f"Q{number} is not on a raster page")
    page = fitz.open(data["pdf"])[r["page"]]
    marks = sorted((m for m in g["marks"] if m["page"] == r["page"] and r["y0"] <= m["y0"] and m["y1"] <= r["y1"]), key=lambda m: m["y0"])
    if len(marks) != 4:
        sys.exit(f"Q{number}: {len(marks)} option rows on the raster page, expected 4")
    centres = [(m["y0"] + m["y1"]) / 2 for m in marks]
    gap = min(b - a for a, b in zip(centres, centres[1:]))

    if "stem" in kind:
        top, bottom = r["y0"], centres[0] - gap / 2
        lines = sorted(
            (s["y0"], s["y1"]) for s in g["spans"]
            if s["page"] == r["page"] and s["x1"] - s["x0"] > 120 and top <= s["y0"] and s["y1"] <= bottom
        )
        edges = [top] + [y for l in lines for y in l] + [bottom]
        # gaps between consecutive sentence lines (and the region's top / the first option row)
        spans = [(edges[i], edges[i + 1]) for i in range(1, len(edges) - 1, 2)] if lines else [(top, bottom)]
        if lines:
            spans = [(top, lines[0][0])] + [(lines[i][1], lines[i + 1][0]) for i in range(len(lines) - 1)] + [(lines[-1][1], bottom)]
        y0, y1 = max(spans, key=lambda s: s[1] - s[0])
        fig = trim(render(page, X_LEFT, y0 + 1, X_RIGHT, y1 - 1))
        if fig is None:
            sys.exit(f"Q{number}: no stem figure found between the sentence lines")
        fig.save(out_base + ".png")

    if "options" in kind:
        for i, c in enumerate(centres):
            up = (c - centres[i - 1]) / 2 if i else gap / 2
            down = (centres[i + 1] - c) / 2 if i + 1 < len(centres) else gap / 2
            fig = trim(render(page, OPTION_X, c - up, X_RIGHT, c + down))
            if fig is None:
                sys.exit(f"Q{number}: option {'ABCD'[i]} has no picture")
            fig.save(f"{out_base}-{'ABCD'[i]}.png")
    print(f"Q{number}: {kind} cropped from the raster page")


if __name__ == "__main__":
    main()
