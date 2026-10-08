"""
Crop each question's figure from its paper, using the PDF's own drawings.

    python scripts/imat/crop_figures.py <year>            # write missing figures
    python scripts/imat/crop_figures.py <year> --force    # rewrite all of them

For every question in data/<year>.questions.json with a `figure`, the
question's area is its page from its margin number down to the next one.
The crop is the union of the visible drawings and images in that area,
padded slightly. Where the options are pictures (option text "Pattern A",
"Option A", ...), the A-E letters are included so the options can be told
apart. Output: C:\\Vilas\\LWS_Pune\\IMAT\\figures\\<year>_q<n>.png.

Look at every crop before committing a paper: an area can hold a stray rule
or miss a label printed as text.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCE_DIR = r"C:\Vilas\LWS_Pune\IMAT\source"
FIGURE_DIR = r"C:\Vilas\LWS_Pune\IMAT\figures"


def inked(c):
    return c is not None and any(v < 0.9 for v in c[:3])


def question_area(page, n):
    words = page.get_text("words")
    nums = sorted((w for w in words if re.fullmatch(r"\d{1,2}\.?", w[4]) and w[0] < 70), key=lambda w: w[1])
    mine = [w for w in nums if int(w[4].rstrip(".")) == n]
    if not mine:
        raise ValueError(f"Q{n}: number not found on page {page.number + 1}")
    top = mine[0][1] - 2
    below = [w for w in nums if w[1] > top + 5]
    bottom = below[0][1] - 4 if below else page.rect.y1 - 50
    return top, bottom, words


def trim_edges(page, box):
    """A line the top or bottom edge cuts through (the stem's last line just
    above a figure) is trimmed off rather than shown half-cut."""
    for b in page.get_text("dict")["blocks"]:
        for line in b.get("lines", []):
            r = fitz.Rect(line["bbox"])
            if r.x1 < box.x0 or r.x0 > box.x1:
                continue
            if r.y0 < box.y0 < r.y1:
                box.y0 = r.y1 + 0.5
            if r.y0 < box.y1 < r.y1:
                box.y1 = r.y0 - 0.5
    return box


def watermarks(doc):
    """Images on more than half the pages: a provider's watermark or logo (2022's
    copy carries one on every page). Never part of a figure."""
    from collections import Counter
    seen = Counter(x[0] for p in doc for x in {im[0]: im for im in p.get_images(full=True)}.values())
    return {x for x, n in seen.items() if n > doc.page_count / 2}


def figure_box(page, top, bottom, words, with_labels, skip=frozenset()):
    box = None
    for d in page.get_drawings():
        r = d["rect"]
        if not (inked(d.get("fill")) or inked(d.get("color"))) or r.height > page.rect.height:
            continue
        if r.y1 > top and r.y0 < bottom:
            box = r if box is None else box | r
    for img in page.get_images(full=True):
        if img[0] in skip:
            continue
        for r in page.get_image_rects(img[0]):
            if r.y1 > top and r.y0 < bottom and r.height > 10:
                box = r if box is None else box | r
    if box is not None:
        # A text line the crop runs through is taken whole, so no sentence is
        # cut off at the crop's edge (the line between a figure and its options).
        for b in page.get_text("dict")["blocks"]:
            for line in b.get("lines", []):
                r = fitz.Rect(line["bbox"])
                if r.y0 >= box.y0 - 1 and r.y1 <= box.y1 + 1 and r.intersects(box) and not box.contains(r):
                    box |= r
    if with_labels:
        for w in words:
            if re.fullmatch(r"[A-E]", w[4]) and top < w[1] < bottom and box is not None and box.y0 - 20 < w[1] < box.y1 + 20:
                box |= fitz.Rect(w[:4])
    return box


def main(year, force):
    data = json.load(open(os.path.join(HERE, "data", f"{year}.questions.json"), encoding="utf-8"))
    doc = fitz.open(os.path.join(SOURCE_DIR, data["sourceFile"]))
    os.makedirs(FIGURE_DIR, exist_ok=True)
    marks = watermarks(doc)
    # Measure every crop BEFORE blanking the watermark: blanking gives the
    # image a new xref, so the watermark would no longer be skipped by number
    # and its area would be pulled into the crop.
    jobs = []
    for q in data["questions"]:
        fig = q.get("figure")
        if not fig:
            continue
        out = os.path.join(FIGURE_DIR, f"{year}_q{q['n']}.png")
        if os.path.exists(out) and not force:
            print(f"Q{q['n']}: exists, kept")
            continue
        page = doc[fig["page"] - 1]
        top, bottom, words = question_area(page, q["n"])
        picture_options = all(re.fullmatch(r"\w+ [A-E]", o) for o in q["options"])
        box = figure_box(page, top, bottom, words, picture_options, marks)
        if box is None:
            print(f"Q{q['n']}: NO graphics found on page {fig['page']}; crop it by hand")
            continue
        jobs.append((q["n"], fig["page"] - 1, trim_edges(page, (box + (-4, -4, 4, 4)) & page.rect), out))
    if marks:
        # Blank the watermark in this in-memory copy before rendering any crop.
        for page in doc:
            for x in marks:
                if any(im[0] == x for im in page.get_images(full=True)):
                    page.delete_image(x)
        print(f"blanked watermark image(s) {sorted(marks)} (in memory only)")
    for n, pno, box, out in jobs:
        doc[pno].get_pixmap(dpi=200, clip=box).save(out)
        print(f"Q{n}: {out}  {[round(v) for v in box]}")


if __name__ == "__main__":
    main(int(sys.argv[1]), "--force" in sys.argv)
