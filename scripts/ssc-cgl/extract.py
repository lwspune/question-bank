"""Dump the geometry of one SSC CGL exam-day PDF (every shift of that day).

    python scripts/ssc-cgl/extract.py <dayId>          # dayId from DAYS in config.ts, e.g. t1-2025-09-18

Reads the day's PDF (path passed by run.ts, or the default in DAYS) and writes, under
scripts/ssc-cgl/out/<dayId>/ (gitignored):
  img/pPPP_NN.png   every image placed on a page, as SSC rendered it (the AglaSem
                    watermark is page TEXT drawn over the images, so it is not in them)
  geometry.json     {cells: [...], markers: [...]} for lib.ts assembleQuestions

Judgement lives in lib.ts (tested). This only measures:
  cell    one row's narrow LEFT cell (x0 76-86, x1 116-142: each question is its own
          table, so the column width varies), its key FILL and the images whose
          midpoint lies inside the row. Rows with no image are the gaps between tables.
  marker  "Q.No: n", "PART-X (...)" and the "(Shift-n)" header, with page + y.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

BORDER = (0.83, 0.79, 0.71)
FILLS = {(0.0, 0.5, 0.0): "G", (1.0, 1.0, 0.0): "Y", (1.0, 0.0, 0.0): "R", (0.5, 0.5, 0.5): "N"}
X0_BAND = (76.0, 86.0)
X1_BAND = (116.0, 142.0)
Q_RE = re.compile(r"Q\.No:\s*(\d+)")
PART_RE = re.compile(r"PART-([A-D])\s*\(")
SHIFT_RE = re.compile(r"\(Shift-(\d)\)")


def rgb(c):
    return tuple(round(x, 2) for x in c) if c else None


def in_left_column(r):
    return X0_BAND[0] <= r.x0 <= X0_BAND[1] and X1_BAND[0] <= r.x1 <= X1_BAND[1]


def page_images(page, pno, img_dir):
    """Every image block on the page, saved as PNG, with its bbox."""
    out = []
    blocks = [b for b in page.get_text("dict")["blocks"] if b["type"] == 1]
    for i, b in enumerate(blocks):
        name = f"p{pno:03d}_{i:02d}.png"
        path = os.path.join(img_dir, name)
        if not os.path.exists(path):
            pix = fitz.Pixmap(b["image"])
            if pix.n - pix.alpha > 3:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            pix.save(path)
        out.append((name, b["bbox"]))
    return out


def cells_of(page, pno, images):
    ys, fills = [], []
    for dr in page.get_drawings():
        r = dr["rect"]
        if not in_left_column(r):
            continue
        f = rgb(dr.get("fill"))
        if f == BORDER and r.height < 1.5:
            ys += [r.y0, r.y1]
        elif f in FILLS and r.height > 8:
            fills.append((r.y0, r.y1, FILLS[f]))
    edges = []
    for y in sorted(ys):
        if not edges or y - edges[-1] > 1.2:
            edges.append(y)
    cells = []
    for a, b in zip(edges, edges[1:]):
        if b - a <= 6:
            continue
        mid = (a + b) / 2
        imgs = [n for n, bb in images if a <= (bb[1] + bb[3]) / 2 <= b]
        if not imgs:
            continue
        hit = [c for (y0, y1, c) in fills if y0 < mid < y1]
        cells.append({"page": pno, "y0": round(a, 1), "y1": round(b, 1), "fill": hit[0] if hit else None, "images": imgs})
    return cells


def markers_of(page, pno):
    out = []
    for b in page.get_text("dict")["blocks"]:
        if b["type"] != 0:
            continue
        text = " ".join(s["text"] for l in b["lines"] for s in l["spans"])
        x0, y0 = b["bbox"][0], b["bbox"][1]
        m = Q_RE.search(text)
        if m and x0 < 90:
            out.append({"kind": "q", "page": pno, "y": round(y0, 1), "n": int(m.group(1))})
        m = PART_RE.search(text)
        if m:
            out.append({"kind": "part", "page": pno, "y": round(y0, 1), "part": m.group(1)})
        m = SHIFT_RE.search(text)
        if m and "Test Time" in text:
            out.append({"kind": "shift", "page": pno, "y": round(y0, 1), "shift": int(m.group(1))})
    return out


def main():
    if len(sys.argv) < 3:
        sys.exit("usage: extract.py <dayId> <pdfPath>")
    day, pdf = sys.argv[1], sys.argv[2]
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", day)
    img_dir = os.path.join(out_dir, "img")
    os.makedirs(img_dir, exist_ok=True)
    doc = fitz.open(pdf)
    cells, markers = [], []
    for pno, page in enumerate(doc):
        images = page_images(page, pno, img_dir)
        cells += cells_of(page, pno, images)
        markers += markers_of(page, pno)
    with open(os.path.join(out_dir, "geometry.json"), "w", encoding="utf8") as f:
        json.dump({"pdf": os.path.basename(pdf), "pages": doc.page_count, "cells": cells, "markers": markers}, f, indent=1)
    shifts = sorted({m["shift"] for m in markers if m["kind"] == "shift"})
    qs = sum(1 for m in markers if m["kind"] == "q")
    print(f"{day}: {doc.page_count} pages, shifts {shifts}, {qs} question labels, {len(cells)} cells -> {out_dir}")


if __name__ == "__main__":
    main()
