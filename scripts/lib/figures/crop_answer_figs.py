"""Crop answer figures off a book PDF; stack a question's parts into one PNG.

    python crop_answer_figs.py <jobs.json>

jobs.json = {"pdf": <path>, "outdir": <dir>, "jobs": [{"ref", "parts": [{"page", "bbox"}]}]}
(the plan from answerFigures.ts; a part may carry `mask`, page boxes painted
white first). Each part is rendered at 3x; parts are stacked
top to bottom with a thin rule between them. A PNG over 900 KB is quantized to
256 colours, because storage rejects PNGs over about 1.5 MB and a textbook
figure loses nothing visible at 256 colours (crop_draw_figures.py's rule).
Prints {ref: path} as JSON.
"""
import io
import json
import os
import re
import sys

import fitz
from PIL import Image, ImageDraw

ZOOM = 3.0
GAP = 36
QUANTIZE_OVER = 900_000


def render(pdf, page_no, bbox, mask=()):
    # A fresh document per part: a mask painted on the page must not reach
    # another part cropped from the same page.
    page = fitz.open(pdf)[page_no]
    w, h = page.rect.width, page.rect.height
    for m in mask:
        # Fill with the page colour just right of the mask, so a mask on a
        # tinted panel does not leave a white notch.
        probe = page.get_pixmap(clip=fitz.Rect(m[2] * w + 1, (m[1] + m[3]) / 2 * h, m[2] * w + 3, (m[1] + m[3]) / 2 * h + 2))
        fill = tuple(c / 255 for c in probe.pixel(0, 0)[:3])
        page.draw_rect(fitz.Rect(m[0] * w, m[1] * h, m[2] * w, m[3] * h), color=None, fill=fill, overlay=True)
    x0, y0, x1, y1 = bbox
    pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=fitz.Rect(x0 * w, y0 * h, x1 * w, y1 * h))
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")


def stack(images):
    if len(images) == 1:
        return images[0]
    width = max(im.width for im in images)
    height = sum(im.height for im in images) + GAP * (len(images) - 1)
    out = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(out)
    y = 0
    for i, im in enumerate(images):
        out.paste(im, ((width - im.width) // 2, y))
        y += im.height
        if i < len(images) - 1:
            draw.line([(width // 10, y + GAP // 2), (width - width // 10, y + GAP // 2)], fill=(190, 190, 190), width=2)
            y += GAP
    return out


def encode(im):
    buf = io.BytesIO()
    im.save(buf, format="PNG", optimize=True)
    if buf.tell() > QUANTIZE_OVER:
        buf = io.BytesIO()
        im.quantize(colors=256).save(buf, format="PNG", optimize=True)
    return buf.getvalue()


def main():
    spec = json.load(open(sys.argv[1], encoding="utf-8"))
    os.makedirs(spec["outdir"], exist_ok=True)
    out = {}
    for job in spec["jobs"]:
        png = encode(stack([render(spec["pdf"], p["page"], p["bbox"], p.get("mask", ())) for p in job["parts"]]))
        slug = re.sub(r"[^A-Za-z0-9]+", "_", job["ref"]).strip("_")
        path = os.path.join(spec["outdir"], "ans-" + slug + ".png")
        open(path, "wb").write(png)
        out[job["ref"]] = path
    print(json.dumps(out))


if __name__ == "__main__":
    main()
