"""
Pixel geometry of a scanned challenge-module sheet (SSC CHSL 2025, PW's Google Drive PDFs):
every page is one picture with a partial OCR layer, so challenge.ts reads the pixels measured here.

  python -P scripts/ssc-cgl/challenge_extract.py <dir> "<pdf>"   -> out/<dir>/challenge.json

Per page (the page picture is the largest image; PW's cover, page 1, is skipped; PW's logo is a
separate small picture and never read):
- marks: the blue "Click Here to Challenge Question No." markers (a filled bar, or light blue text
  on the frameless first page) in the right-hand column;
- labels: dark ink in the left column ("Q.No: n");
- cells: green / yellow / red cells filling the left column (the key and the candidate's choice);
- rules: pale, thin horizontal table rules, measured at the table's right end, where text rarely
  reaches; a watermark is pale too but thick, so only runs of 1-4 rows count;
- lines: text lines in the option column (a frameless page has no rules);
- breaks: rows of PART buttons, where a new capture of the sheet begins (its header precedes them).
Coordinates are pixels of the page picture (about 1240 x 1754, 150 dpi).
"""
import json
import os
import sys

import fitz  # PyMuPDF
import numpy as np

MARK_X = (760, 1160)
LABEL_X = (28, 112)
CELL_X = (62, 120)
RULE_X = (700, 1080)
TEXT_X = (134, 1060)
MIN_CELL = 15  # rows: a key cell is a whole option row, 30+ px
INK = 450  # an RGB sum below this is print (light print sums ~350; the watermark ~540 and up)


LOGO = (255, 266)  # PW's logo, laid over every page as its own picture


def page_array(doc, page):
    """The page as a viewer shows it, rendered at the page pictures' scale (1240 px wide) with PW's
    logo removed first. Rendered, never the page picture pulled out alone: a capture's first page
    lays several pictures and a soft mask over its page picture, which alone prints washed out (its
    key cells too pale to read)."""
    imgs = page.get_images(full=True)
    big = max((x[2] for x in imgs), default=0)
    if big < 1000 and len(page.get_text().strip()) < 50:
        return None  # PW's cover, or a blank page
    for x in imgs:
        if (x[2], x[3]) == LOGO:
            page.delete_image(x[0])
    z = 1240 / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z))
    return np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width, pix.n)[..., :3].astype(int)


def page_picture(doc, page):
    """The page picture alone (unused by the reader; kept for comparing a render with its source)."""
    info = max(page.get_images(full=True), key=lambda x: x[2] * x[3])
    pix = fitz.Pixmap(doc, info[0])
    if pix.n - pix.alpha != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    if pix.alpha:
        pix = fitz.Pixmap(pix, 0)
    return np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width, 3).astype(int)


def runs(flags, min_len=1, gap=0):
    """[y0, y1) runs of True rows, merging gaps of up to `gap` rows."""
    out = []
    y = 0
    n = len(flags)
    while y < n:
        if flags[y]:
            y0 = y
            last = y
            while y < n and (flags[y] or (y - last <= gap and any(flags[y : last + gap + 1]))):
                if flags[y]:
                    last = y
                y += 1
            if last + 1 - y0 >= min_len:
                out.append([y0, last + 1])
        else:
            y += 1
    return out


def measure(a):
    h, w = a.shape[:2]
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    s = r + g + b

    blue = (b - r > 60) & (r < 170) & (b > 150)
    # A challenge marker is right-aligned; the first page's "Click Here for PART-A .. PART-D" row is
    # the same blue but spans the page, so a row with blue on the left is not a marker.
    left_blue = blue[:, 30:700].sum(axis=1) >= 6
    mark_rows = (blue[:, MARK_X[0] : MARK_X[1]].sum(axis=1) >= 6) & ~left_blue
    marks = [{"y0": y0, "y1": y1} for y0, y1 in runs(mark_rows, 8, 3)]
    # The PART buttons (four filled blue buttons across the page): each capture in PW's file opens
    # with them, under the sheet's header, so they end the question before them.
    breaks = [y0 for y0, y1 in runs(blue[:, 30:700].sum(axis=1) >= 100, 8, 3)]

    cx = slice(*CELL_X)
    green = (g - r > 40) & (g - b > 40) & (g < 210)
    yellow = (r > 200) & (g > 200) & (b < 150)
    red = (r - g > 80) & (r - b > 80)
    cells = []
    for kind, m in (("green", green), ("yellow", yellow), ("red", red)):
        full = m[:, cx].mean(axis=1) > 0.6
        cells += [{"kind": kind, "y0": y0, "y1": y1} for y0, y1 in runs(full, MIN_CELL, 1)]
    cells.sort(key=lambda c: c["y0"])

    coloured = green | yellow | red
    dark = (s < INK) & ~coloured
    labels = [{"y0": y0, "y1": y1} for y0, y1 in runs(dark[:, LABEL_X[0] : LABEL_X[1]].any(axis=1), 6, 2)]

    # A rule is a row darker than the rows two above and two below across most of the table's
    # right half. Rules differ in how pale they print, so this is relative, never a fixed shade; a
    # text line is too sparse to fill 80% of the width, and the watermark changes too gradually.
    seg = s[:, RULE_X[0] : RULE_X[1]]
    up = np.vstack([seg[:2], seg[:-2]])
    dn = np.vstack([seg[2:], seg[-2:]])
    darker = (seg < np.minimum(up, dn) - 12) & (seg > 300)
    rules = [int((y0 + y1 - 1) // 2) for y0, y1 in runs(darker.mean(axis=1) >= 0.8, 1, 4)]

    # The capture tool breaks pages between rows and fills the rest with a beige band: its top ends
    # the row above it (the row after starts on the next page), and its own edges are no boundary.
    # An unanswered question ends in a grey "Not Answered" bar: its top ends option D.
    med = np.median(a[:, 200:1000], axis=1)
    mr, mg, mb = med[:, 0], med[:, 1], med[:, 2]
    beige = (abs(mr - 215) < 15) & (abs(mg - 202) < 15) & (abs(mb - 182) < 15)
    grey = (mr > 105) & (mr < 165) & (abs(mr - mb) < 15) & (abs(mr - mg) < 15)
    fillers = runs(beige, 6, 2)
    bars = runs(grey, 8, 2)
    rules = [y for y in rules if not any(f0 - 3 <= y <= f1 + 3 for f0, f1 in fillers)]
    # the status bar likewise: its top is the boundary (added below); its own edges are not (a
    # rule read at its bottom edge had added a phantom row and shifted the key one letter up)
    rules = [y for y in rules if not any(b0 - 3 <= y <= b1 + 6 for b0, b1 in bars)]
    rules = sorted(rules + [f0 for f0, _ in fillers] + [b0 for b0, _ in bars])

    ink = (s[:, TEXT_X[0] : TEXT_X[1]] < INK).any(axis=1)
    # whether the page's first rule has nothing printed above it, and whether the page ends on a
    # boundary (nothing printed below its last rule): main() drops such a top rule only after such an end
    top_bare = bool(rules) and not ink[: rules[0]].any() and not any(c["y0"] < rules[0] for c in cells)
    end_bare = bool(rules) and not ink[rules[-1] + 3 :].any() and not any(c["y0"] > rules[-1] + 3 for c in cells)

    lines = [{"y0": y0, "y1": y1} for y0, y1 in runs(ink, 6, 2)]
    return {"height": h, "width": w, "top_bare": top_bare, "end_bare": end_bare, "breaks": breaks, "marks": marks, "labels": labels, "cells": cells, "rules": rules, "lines": lines}


def main():
    d, pdf = sys.argv[1], sys.argv[2]
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", d)
    os.makedirs(out, exist_ok=True)
    doc = fitz.open(pdf)
    pages = []
    for pno in range(1, doc.page_count):
        a = page_array(doc, doc[pno])
        if a is None:
            continue
        # each capture's first page was saved with a real text layer (rendered, not scanned, or a page
        # picture with the text laid over it): it colours only the candidate's own choice
        imgs = doc[pno].get_images(full=True)
        vector = not imgs or max(x[2] for x in imgs) < 1000 or len(doc[pno].get_text().strip()) > 200
        m = measure(a)
        # The page before ended on a boundary (a rule, or its filler's top, with nothing printed
        # below): a rule at this page's top with nothing above it prints that boundary again, so it
        # is dropped. After a page that ends mid-row, that top rule is a real boundary and stays.
        if pages and pages[-1]["end_bare"] and m["top_bare"]:
            m["rules"] = m["rules"][1:]
        pages.append({"page": pno + 1, "vector": vector, **m})
    with open(os.path.join(out, "challenge.json"), "w", encoding="utf8") as f:
        json.dump({"pdf": pdf, "pages": pages}, f)
    print(f"{d}: {len(pages)} pages, {sum(len(p['marks']) for p in pages)} markers, "
          f"{sum(1 for p in pages for c in p['cells'] if c['kind'] in ('green', 'yellow'))} key cells, "
          f"{sum(len(p['rules']) for p in pages)} rules -> {out}")


if __name__ == "__main__":
    main()
