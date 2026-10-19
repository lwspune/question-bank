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

# PAGE FURNITURE. Every NCERT page carries its own copy of a 1894x1894 greyscale
# image, the diagonal "(c) NCERT not to be republished" watermark, plus a full
# page greyscale image; both showed through every crop (2026-10-19). A figure is
# never repeated on most pages of a book, so an image whose size and colourspace
# recur on at least FURNITURE_SHARE of the pages is furniture and is blanked
# before rendering. Below FURNITURE_MIN_PAGES the rule is off: in a short file
# every image is "on most pages".
FURNITURE_SHARE = 0.8
FURNITURE_MIN_PAGES = 5
_furniture = {}


def furniture_signatures(pages, share=FURNITURE_SHARE, min_pages=FURNITURE_MIN_PAGES):
    """pages: one set of (width, height, colourspace) per page -> the signatures
    present on at least `share` of the pages (none for a short document)."""
    if len(pages) < min_pages:
        return set()
    counts = {}
    for sigs in pages:
        for s in sigs:
            counts[s] = counts.get(s, 0) + 1
    return {s for s, n in counts.items() if n >= share * len(pages)}


def _signatures(pdf):
    if pdf not in _furniture:
        doc = fitz.open(pdf)
        _furniture[pdf] = furniture_signatures([{(i[2], i[3], i[5]) for i in p.get_images(full=True)} for p in doc])
    return _furniture[pdf]


def render(pdf, page_no, bbox, mask=()):
    # A fresh document per part: a mask painted on the page must not reach
    # another part cropped from the same page.
    page = fitz.open(pdf)[page_no]
    furniture = _signatures(pdf)
    for i in page.get_images(full=True):
        if (i[2], i[3], i[5]) in furniture:
            page.delete_image(i[0])
    w, h = page.rect.width, page.rect.height
    # The crop's clip rounds outward by a pixel, so a mask that stops exactly on
    # the crop's edge leaves a one-pixel strip of what it hid (the top of an
    # NCERT "(d)" sub-label showed as a row of dots, 2026-10-19). A mask edge
    # at or past the crop's edge is pushed 2 pt further out.
    pad_x, pad_y = 2 / w, 2 / h
    mask = [[m[0] - pad_x if m[0] <= bbox[0] else m[0], m[1] - pad_y if m[1] <= bbox[1] else m[1],
             m[2] + pad_x if m[2] >= bbox[2] else m[2], m[3] + pad_y if m[3] >= bbox[3] else m[3]] for m in mask]
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


def selftest():
    wm, page_img, fig = (1894, 1894, "DeviceGray"), (2480, 3508, "DeviceGray"), (446, 502, "DeviceCMYK")
    book = [{wm, page_img}] * 9 + [{wm, page_img, fig}]
    assert furniture_signatures(book) == {wm, page_img}, "repeated page images are furniture, a figure is not"
    assert furniture_signatures([{wm}] * 7 + [set()] * 3) == set(), "70% of pages is below the share"
    assert furniture_signatures([{fig}] * 3) == set(), "a short file has no furniture"
    print("selftest ok")


def main():
    if sys.argv[1:] == ["--selftest"]:
        selftest()
        return
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
