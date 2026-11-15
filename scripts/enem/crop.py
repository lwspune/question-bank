"""
Crop each question's figure from the paper into one PNG.

    python scripts/enem/crop.py <paper.pdf> <reviewed.json> <figures_dir> [--force]

A question gets ONE image (the bank's image_url): its `figure` box and, when
its options are drawn, its `option_figures` box below it, stacked with a white
gap. Boxes are in pixels of the 2x review pages (1 PDF point = 2 px) and are
rendered again from the PDF at 3x, so the crop is sharper than the review page.
A `figure` may hold a list of boxes (two figures printed apart); they stack in
order. Existing files are kept unless --force. LOOK at every crop afterwards.
"""
import json
import sys
from pathlib import Path

import fitz

SCALE = 3


def boxes_of(v):
    if not v:
        return []
    if isinstance(v, list):
        return v
    if isinstance(v.get("box"), list) and v["box"] and isinstance(v["box"][0], list):
        return [{"page": v["page"], "box": b} for b in v["box"]]
    return [v]


def render(doc, page_no, box):
    x0, y0, x1, y1 = (c / 2 for c in box)
    clip = fitz.Rect(x0, y0, x1, y1)
    return doc[page_no - 1].get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), clip=clip)


def stack(pixmaps, gap=24):
    w = max(p.width for p in pixmaps)
    h = sum(p.height for p in pixmaps) + gap * (len(pixmaps) - 1)
    out = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, w, h), False)
    out.set_rect(out.irect, (255, 255, 255))
    y = 0
    for p in pixmaps:
        if p.alpha or p.colorspace != fitz.csRGB:
            p = fitz.Pixmap(fitz.csRGB, p)
            if p.alpha:
                p = fitz.Pixmap(p, 0)
        p.set_origin(0, y)
        out.copy(p, p.irect)
        y += p.height + gap
    return out


def main():
    pdf, reviewed, outdir = sys.argv[1], sys.argv[2], Path(sys.argv[3])
    force = "--force" in sys.argv
    outdir.mkdir(parents=True, exist_ok=True)
    data = json.load(open(reviewed, encoding="utf-8"))
    year = data["year"]
    doc = fitz.open(pdf)
    made, kept = [], []
    for q in data["questions"]:
        parts = boxes_of(q.get("figure")) + boxes_of(q.get("option_figures"))
        if not parts:
            continue
        path = outdir / f"{year}_q{q['n']}.png"
        if path.exists() and not force:
            kept.append(q["n"])
            continue
        stack([render(doc, b["page"], b["box"]) for b in parts]).save(path)
        made.append(q["n"])
    print(f"{year}: cropped {len(made)} {made}; kept existing {kept}")


if __name__ == "__main__":
    main()
