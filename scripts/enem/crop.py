"""
Crop each question's figure from the paper into one PNG.

    python scripts/enem/crop.py <paper.pdf> <reviewed.json> <figures_dir> [--force]

A question gets ONE image (the bank's image_url): its `figure` box and, when
its options are drawn, its `option_figures` box below it, stacked with a white
gap. Boxes are in pixels of the 2x review pages (1 PDF point = 2 px) and are
rendered again from the PDF at 3x, so the crop is sharper than the review page.
A `figure` may hold a list of boxes (two figures printed apart); they stack in
order. Existing files are kept unless --force; --only=113,134 limits the run
to those questions. LOOK at every crop afterwards.

The bank's image bucket refuses a file over 1 MiB (src/lib/storage/images.ts
MAX_SIZE_BYTES; 2024 Q113 and Q134 hit it on 2026-11-15), so a crop that comes
out larger is rendered again at a lower scale until it fits.
"""
import json
import sys
from pathlib import Path

import fitz

SCALES = (3, 2.5, 2, 1.5)
# Under the bucket's 1 MiB with room to spare.
MAX_BYTES = 1_000_000


def boxes_of(v):
    if not v:
        return []
    if isinstance(v, list):
        return v
    if isinstance(v.get("box"), list) and v["box"] and isinstance(v["box"][0], list):
        return [{"page": v["page"], "box": b} for b in v["box"]]
    return [v]


def render(doc, page_no, box, scale):
    x0, y0, x1, y1 = (c / 2 for c in box)
    clip = fitz.Rect(x0, y0, x1, y1)
    return doc[page_no - 1].get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip)


def save_capped(doc, parts, path):
    """Save at the highest scale whose PNG fits under MAX_BYTES; return that scale."""
    for scale in SCALES:
        png = stack([render(doc, b["page"], b["box"], scale) for b in parts]).tobytes("png")
        if len(png) <= MAX_BYTES:
            path.write_bytes(png)
            return scale
    raise SystemExit(f"{path.name}: over {MAX_BYTES} bytes even at {SCALES[-1]}x; split the figure")


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
    only_arg = next((a for a in sys.argv if a.startswith("--only=")), None)
    only = {int(n) for n in only_arg.split("=", 1)[1].split(",")} if only_arg else None
    outdir.mkdir(parents=True, exist_ok=True)
    data = json.load(open(reviewed, encoding="utf-8"))
    year = data["year"]
    doc = fitz.open(pdf)
    made, kept = [], []
    for q in data["questions"]:
        parts = boxes_of(q.get("figure")) + boxes_of(q.get("option_figures"))
        if not parts or (only is not None and q["n"] not in only):
            continue
        path = outdir / f"{year}_q{q['n']}.png"
        if path.exists() and not force:
            kept.append(q["n"])
            continue
        scale = save_capped(doc, parts, path)
        made.append(q["n"] if scale == SCALES[0] else f"{q['n']}@{scale}x")
    print(f"{year}: cropped {len(made)} {made}; kept existing {kept}")


if __name__ == "__main__":
    main()
