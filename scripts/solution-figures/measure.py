"""Find and measure a book figure, for a solution-figure batch (run.ts).

  python measure.py find <pdf> <regex>                    pages + boxes of text blocks matching (e.g. "Fig\\.? ?9\\.4")
  python measure.py page <pdf> <page> <out.png>           page render with a labelled 0.05 grid, so a box is READ
                                                          off the grid rather than eyeballed off a bare render
  python measure.py ink <pdf> <page> <x0> <y0> <x1> <y1>  inside that region: the union of vector drawings and images
                                                          (the figure's ink) and every text line, in page fractions
  python measure.py crop <pdf> <page> <x0> <y0> <x1> <y1> <out.png> [--mask x0,y0,x1,y1 ...]
                                                          the crop exactly as run.ts will make it

Pages are 0-based; every box is page FRACTIONS [x0, y0, x1, y1], top-left origin.
Measuring on a bare render cost the pilot: boxes read off a downscaled image were
a tenth of the page out. Read the grid, tighten with `ink`, check with `crop`.
Two traps the pilot met:
  * a union over a whole region also catches page furniture (running heads,
    page-number ornaments): keep the region to the figure's column and band;
  * a mask is filled with the colour just right of it, so end a mask on paper,
    not on coloured caption text.
"""
import io
import os
import re
import sys

import fitz
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "lib", "figures"))
from crop_answer_figs import render, _signatures  # noqa: E402  the same crop run.ts makes


def frac(r, page):
    w, h = page.rect.width, page.rect.height
    return [round(r.x0 / w, 4), round(r.y0 / h, 4), round(r.x1 / w, 4), round(r.y1 / h, 4)]


def cmd_find(pdf, pattern):
    rx = re.compile(pattern, re.I)
    doc = fitz.open(pdf)
    hits = 0
    for i, page in enumerate(doc):
        for b in page.get_text("blocks"):
            t = " ".join(b[4].split())
            if rx.search(t):
                print(f"p{i} {frac(fitz.Rect(b[:4]), page)} {t[:90]}")
                hits += 1
    if not hits:
        print("no text match: the caption may be drawn, not text. Use `page` and read the grid.")


def cmd_page(pdf, page_no, out):
    page = fitz.open(pdf)[page_no]
    pix = page.get_pixmap(dpi=100)
    im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    d = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype("arial.ttf", 11)
    except OSError:
        font = ImageFont.load_default()
    for k in range(1, 20):
        f = k / 20
        x, y = int(f * im.width), int(f * im.height)
        col = (230, 0, 0) if k % 2 == 0 else (255, 160, 160)
        d.line([(x, 0), (x, im.height)], fill=col, width=1)
        d.line([(0, y), (im.width, y)], fill=col, width=1)
        if k % 2 == 0:
            d.text((x + 2, 2), f"{f:.1f}", fill=(200, 0, 0), font=font)
            d.text((2, y + 1), f"{f:.1f}", fill=(200, 0, 0), font=font)
    im.save(out)
    print(f"{out} ({im.width}x{im.height}); red lines every 0.1, pink every 0.05")


def cmd_ink(pdf, page_no, box):
    page = fitz.open(pdf)[page_no]
    w, h = page.rect.width, page.rect.height
    region = fitz.Rect(box[0] * w, box[1] * h, box[2] * w, box[3] * h)
    ink = None
    for dr in page.get_drawings():
        r = fitz.Rect(dr["rect"])
        if r.is_empty or not region.contains(r):
            continue
        ink = r if ink is None else ink | r
    # Page furniture (NCERT's watermark and full-page grey image, the crop step
    # blanks them) would otherwise make the ink fill the whole region.
    furniture = _signatures(pdf)
    skip = {i[0] for i in page.get_images(full=True) if (i[2], i[3], i[5]) in furniture}
    for info in page.get_image_info(xrefs=True):
        r = fitz.Rect(info["bbox"]) & region
        if info.get("xref") in skip or r.is_empty:
            continue
        ink = r if ink is None else ink | r
    print("ink", frac(ink, page) if ink else None)
    for b in page.get_text("dict")["blocks"]:
        for line in b.get("lines", []):
            r = fitz.Rect(line["bbox"])
            if region.intersects(r):
                t = "".join(s["text"] for s in line["spans"]).strip()
                if t:
                    print("text", frac(r, page), t[:60])


def cmd_crop(pdf, page_no, box, out, masks):
    im = render(pdf, page_no, box, masks)
    im.save(out)
    print(f"{out} ({im.width}x{im.height})")


def main():
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        return
    cmd = a[0]
    if cmd == "find":
        cmd_find(a[1], a[2])
    elif cmd == "page":
        cmd_page(a[1], int(a[2]), a[3])
    elif cmd == "ink":
        cmd_ink(a[1], int(a[2]), [float(v) for v in a[3:7]])
    elif cmd == "crop":
        masks = [[float(v) for v in a[i + 1].split(",")] for i in range(8, len(a)) if a[i] == "--mask"]
        cmd_crop(a[1], int(a[2]), [float(v) for v in a[3:7]], a[7], masks)
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
