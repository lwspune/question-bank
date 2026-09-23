"""
Render a page with every candidate figure OUTLINED AND NUMBERED, so anchoring is
a choice rather than a transcription.

  python scripts/lib/figures/pick.py <pdf> <page> <out.png>
      -> writes <out.png> and <out.png>.json  ({"1": [x0,y0,x1,y1], ...})

WHY THIS AND NOT A COORDINATE GRID. The previous authoring aid drew a 0.05 grid
over the page and a human read four fractions off it. That splits the job badly:
the human does the part machines are good at (measuring edges) and does it worse
— eyeballed regions needed a second pass on six of the first eleven anchors, and
on a half-resolution composite one region was misread badly enough to crop the
NEIGHBOURING figure, which is the one failure mode that actually harms a student.

Here the split is the right way round. The machine enumerates candidate regions
and knows their exact extents; the human answers the only question that needs
judgement — WHICH of these is the figure this question reads. The answer is a
NUMBER, so there is nothing to mistype and no resolution-dependent estimate.

Candidates come from the same clustering `derive.py` uses, minus the filters that
make it REFUSE: a cluster is offered even when it contains prose or has no
caption, because refusing is right for an automatic pass and wrong here — the
whole point is that a person is about to look at it.
"""
import json
import os
import sys

import fitz
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util

_spec = importlib.util.spec_from_file_location("derive", os.path.join(os.path.dirname(os.path.abspath(__file__)), "derive.py"))
derive = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(derive)

SCALE = 1.8
MIN_AREA_FRAC = 0.0012  # a real figure is at least this much of the page (low: the sheet is read by a person, so offering too many beats offering none)
MAX_AREA_FRAC = 0.60    # ignore a box that is basically the whole page
# A SINGLE PATH THIS LARGE IS A BACKGROUND PANEL, NOT A FIGURE STROKE. NCERT
# tints the whole example block, and that one fill (42% of the page on Class-11
# Physics p12) touches every drawing on it, so ANY proximity threshold merges the
# page into one cluster. Figures are made of many small strokes; a lone huge rect
# is a fill behind them.
MAX_PATH_FRAC = 0.15


def candidates(page):
    W, H = page.rect.width, page.rect.height
    ink = [g["rect"] for g in page.get_drawings()]
    for im in page.get_images():
        ink.extend(page.get_image_rects(im[0]))
    keep = [
        r for r in ink
        if (r.x1 - r.x0) < derive.FULL_WIDTH * W
        and max(r.x1 - r.x0, r.y1 - r.y0) >= derive.MIN_EXTENT
        and not derive.is_rule(r, W, H)
        and r.y0 >= derive.HEADER_Y * H
        and r.y1 <= derive.FOOTER_Y * H
        and r.get_area() < MAX_PATH_FRAC * W * H
    ]
    # SEVERAL PROXIMITY LEVELS, NOT ONE. At the derivation's JOIN the strokes of
    # two figures a few points apart merge into a single page-spanning cluster —
    # on the NCERT Class-11 Physics page that defeated the last attempt, the whole
    # page came back as ONE candidate. A tighter join splits them; a looser one
    # keeps a figure whole that a tight join would shatter. Neither is right for
    # every page, so all of them are offered and the person picks. Overlapping
    # near-duplicates are dropped so the sheet stays readable.
    page_area = W * H
    found = []
    original = derive.JOIN
    try:
        for j in (4.0, 9.0, 14.0, 22.0):
            derive.JOIN = j
            for c in derive.cluster(keep):
                f = c.get_area() / page_area
                if MIN_AREA_FRAC <= f <= MAX_AREA_FRAC:
                    found.append(c)
    finally:
        derive.JOIN = original

    out = []
    for c in sorted(found, key=lambda r: -r.get_area()):
        if any(abs(c.x0 - k.x0) < 6 and abs(c.y0 - k.y0) < 6 and abs(c.x1 - k.x1) < 6 and abs(c.y1 - k.y1) < 6 for k in out):
            continue
        out.append(c)
    out.sort(key=lambda r: (round(r.y0 / 10), r.x0))
    return out


def main():
    pdf, page_no, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    doc = fitz.open(pdf)
    page = doc[page_no]
    W, H = page.rect.width, page.rect.height
    cands = candidates(page)

    pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE))
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("RGB")
    d = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype("arialbd.ttf", 34)
    except Exception:
        font = None

    index = {}
    for n, c in enumerate(cands, start=1):
        x0, y0, x1, y1 = c.x0 * SCALE, c.y0 * SCALE, c.x1 * SCALE, c.y1 * SCALE
        d.rectangle([x0, y0, x1, y1], outline=(230, 0, 0), width=3)
        tag = str(n)
        # A filled chip so the number is readable over a dark drawing.
        d.rectangle([x0, max(0, y0 - 34), x0 + 40, y0], fill=(230, 0, 0))
        d.text((x0 + 8, max(0, y0 - 32)), tag, fill=(255, 255, 255), font=font)
        index[tag] = [round(c.x0 / W, 4), round(c.y0 / H, 4), round(c.x1 / W, 4), round(c.y1 / H, 4)]

    im.save(out)
    with open(out + ".json", "w", encoding="utf-8") as f:
        json.dump({"pdf": pdf, "page": page_no, "boxes": index}, f, indent=2)
    print(f"page {page_no}: {len(cands)} candidate(s) -> {out}")
    for k, v in index.items():
        print(f"   [{k}] {v}")


if __name__ == "__main__":
    main()


def union_of(index_path, picks):
    """Union of chosen candidate boxes, for a figure printed in several parts.

    The picks are resolved to a bbox HERE and the bbox is what gets written to
    overrides.json — never the numbers. Candidate numbering is an artefact of the
    current clustering, so a stored "box 5" would silently mean a different
    region the next time the algorithm changed; a stored rectangle means the same
    thing forever.
    """
    import json as _json
    boxes = _json.load(open(index_path, encoding="utf-8"))["boxes"]
    sel = [boxes[str(p)] for p in picks]
    return [
        round(min(b[0] for b in sel), 4),
        round(min(b[1] for b in sel), 4),
        round(max(b[2] for b in sel), 4),
        round(max(b[3] for b in sel), 4),
    ]
