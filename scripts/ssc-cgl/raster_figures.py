"""
Figures for the raster sheet (CGL 2025 Tier II): cut from SSC's own scanned page, since the
scan has no picture objects to extract (figures.ts serves the TCS prints).

  python -P scripts/ssc-cgl/raster_figures.py <shiftId> --ruler=<n>   (a page crop with pixel rulers)
  python -P scripts/ssc-cgl/raster_figures.py <shiftId>               (writes figures/<shiftId>/)

The STEM figure's box is read off the ruler crop by eye and kept in
figures/<shiftId>/boxes.json: {"<n>": {"stem": [page, x0, y0, x1, y1], "options": true}}.
OPTION figures need no box: each option row's band (raster_sheets.bands) is cut from the
MASKED page (icon and option number painted out, rows realigned), trimmed to its ink, so an
option picture can carry no key. Every crop is SSC's pixels, never a drawing.
"""
import json
import os
import sys

import fitz
import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from raster_sheets import COLUMN, TEXT_TO, bands, mask_question, page_array  # noqa: E402

LABELS = "ABCD"
PAD = 6
FRAME_X = 1120  # the question frame's right-hand rule runs from x ~1145: never part of a figure


def ink_box(a, x0=COLUMN[1], x1=TEXT_TO):
    """The bounding box of print in an array crop (x from x0), or None."""
    ink = a[:, x0:x1].sum(axis=2) < 600
    ys, xs = np.nonzero(ink)
    if not len(ys):
        return None
    return int(xs.min()) + x0, int(ys.min()), int(xs.max()) + x0 + 1, int(ys.max()) + 1


def save(a, path):
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGB").save(path)


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: raster_figures.py <shiftId> [--ruler=<n>]")
    shift = sys.argv[1]
    ruler = next((int(a.split("=", 1)[1]) for a in sys.argv[2:] if a.startswith("--ruler=")), None)
    base = os.path.dirname(os.path.abspath(__file__))
    data = json.load(open(os.path.join(base, "out", shift, "questions.json"), encoding="utf8"))
    if data.get("format") != "raster":
        sys.exit(f"{shift} is not a raster shift")
    doc = fitz.open(data["pdf"])
    byn = {q["number"]: q for q in data["questions"]}
    pages = {}

    def masked(p):
        if p not in pages:
            a = page_array(doc, p)
            for q in data["questions"]:
                if q["optionRows"][0]["page"] == p:
                    mask_question(a, q, f"{shift} Q{q['number']}")
            pages[p] = a
        return pages[p]

    if ruler is not None:
        q = byn[ruler]
        font = ImageFont.load_default(size=16)
        for r in q["regions"]:
            a = masked(r["page"])[r["y0"]:r["y1"] + 1]
            img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGB")
            d = ImageDraw.Draw(img)
            for y in range(0, img.height, 50):
                d.line([(0, y), (12, y)], fill=(220, 0, 0))
                d.text((14, y - 8), str(r["y0"] + y), fill=(220, 0, 0), font=font)
            for x in range(100, img.width, 100):
                d.line([(x, 0), (x, 10)], fill=(0, 0, 220))
                d.text((x + 2, 10), str(x), fill=(0, 0, 220), font=font)
            out = os.path.join(base, "out", shift, f"ruler-q{ruler:03d}-p{r['page']}.png")
            img.save(out)
            print(out)
        return

    fig_dir = os.path.join(base, "figures", shift)
    boxes = json.load(open(os.path.join(fig_dir, "boxes.json"), encoding="utf8"))
    for n, spec in sorted(boxes.items(), key=lambda kv: int(kv[0])):
        q = byn[int(n)]
        stem = f"q{int(n):03d}"
        if "stem" in spec:
            p, x0, y0, x1, y1 = spec["stem"]
            save(masked(p)[y0:y1, x0:x1], os.path.join(fig_dir, f"{stem}.png"))
        if spec.get("options"):
            rows = q["optionRows"]
            a = masked(rows[0]["page"])
            for lab, (b0, b1) in zip(LABELS, bands(rows, a.shape[0])):
                band = a[b0:b1]
                box = ink_box(band, x1=FRAME_X)
                if box is None:
                    sys.exit(f"Q{n} option {lab}: no print in its band")
                x0, y0, x1, y1 = box
                save(band[max(0, y0 - PAD):y1 + PAD, max(0, x0 - PAD):x1 + PAD], os.path.join(fig_dir, f"{stem}-{lab}.png"))
        print(f"Q{n}: {'stem ' if 'stem' in spec else ''}{'options' if spec.get('options') else ''}")


if __name__ == "__main__":
    main()
