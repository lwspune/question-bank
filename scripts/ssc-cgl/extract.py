"""Dump the geometry of one SSC CGL exam-day PDF (every shift of that day).

    python scripts/ssc-cgl/extract.py <dayId>          # dayId from DAYS in config.ts, e.g. t1-2025-09-18

Reads the day's PDF (path passed by run.ts, or the default in DAYS) and writes, under
scripts/ssc-cgl/out/<dayId>/ (gitignored):
  img/pPPP_NN.png   every image placed on a page, as SSC rendered it (the AglaSem
                    watermark is page TEXT drawn over the images, so it is not in them)
  geometry.json     {cells: [...], markers: [...]} for lib.ts assembleQuestions

Judgement lives in lib.ts (tested). This only measures:
  cell    one row's narrow LEFT cell, its key FILL and the images whose midpoint lies
          inside the row. Rows with no image are the gaps between tables. The cell is
          found in bands measured from the page's own TABLE EDGE (the leftmost border
          rule), never from fixed coordinates: each question is its own table, so the
          column width varies (43-51 pt), and days are printed on different page sizes
          (18/19 Sep at 842 pt wide with the edge at x=78-82, 16 Sep at 1224 pt with it
          at x=104).
  marker  "Q.No: n", "PART-X (...)" and the "(Shift-n)" header, with page + y.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

BORDER = (0.83, 0.79, 0.71)
WHITE = (1.0, 1.0, 1.0)
FILLS = {(0.0, 0.5, 0.0): "G", (1.0, 1.0, 0.0): "Y", (1.0, 0.0, 0.0): "R", (0.5, 0.5, 0.5): "N"}
# Bands relative to the table edge L (see table_edge). Measured: x0 within L-4..L+6, the
# column's right edge 36..62 pt to the right of L.
X0_BAND = (-4.0, 6.0)
X1_BAND = (20.0, 62.0)  # key cell widths seen: 41-53 pt, 35 pt (23 Sep 2025), 24 pt (24 Sep landscape)
COLUMN_GAP = 200.0  # BORDER x0s further apart than this are separate columns
LABEL_BAND = 10.0  # a "Q.No: n" label starts within this many points of L
Q_RE = re.compile(r"Q\.No:\s*(\d+)")
PART_RE = re.compile(r"PART-([A-D])\s*\(")
SHIFT_RE = re.compile(r"\(Shift-(\d)\)")


def rgb(c):
    return tuple(round(x, 2) for x in c) if c else None


def table_edge(page):
    """x of the page's leftmost border rule: where every question table starts. None on a
    page with no table (the cover)."""
    xs = [dr["rect"].x0 for dr in page.get_drawings() if rgb(dr.get("fill")) == BORDER]
    return min(xs) if xs else None


def table_edges(page):
    """x of each column's table edge, left to right. One on a normal page; two on a 24 Sep
    2025 Shift 1 page, which prints two A4 pages side by side on one landscape sheet."""
    xs = sorted(dr["rect"].x0 for dr in page.get_drawings() if rgb(dr.get("fill")) == BORDER)
    if not xs:
        return []
    if page.rect.width <= page.rect.height:
        return [xs[0]]  # a portrait page is one column, whatever else is drawn on it
    edges = []
    for x in xs:
        if not edges or x - edges[-1] > COLUMN_GAP:
            edges.append(x)
    return edges


def in_left_column(r, edge):
    return edge + X0_BAND[0] <= r.x0 <= edge + X0_BAND[1] and edge + X1_BAND[0] <= r.x1 <= edge + X1_BAND[1]


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


def cells_of(page, pno, images, edge, right=float("inf")):
    ys, boxes, fills = [], [], []
    if edge is None:
        return []
    # On a two-column page an image belongs to the column its midpoint falls in.
    images = [(n, bb) for n, bb in images if edge - 6 <= (bb[0] + bb[2]) / 2 < right]
    for dr in page.get_drawings():
        r = dr["rect"]
        if not in_left_column(r, edge):
            continue
        f = rgb(dr.get("fill"))
        if f == BORDER and r.height < 1.5:
            ys += [r.y0, r.y1]
        elif f == WHITE and r.height > 6:
            boxes += [r.y0, r.y1]
        elif f in FILLS and r.height > 8:
            fills.append((r.y0, r.y1, FILLS[f]))
    if not ys:
        # 23 Sep 2025 render: no BORDER rules between rows; each left cell is a white box
        # drawn over a BORDER-filled table, so the boxes' own edges bound the rows. Only a
        # fallback: the older render has white boxes too, and its rules already split it.
        ys = boxes
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


def markers_of(page, pno, edge, left=float("-inf"), right=float("inf")):
    out = []
    for b in page.get_text("dict")["blocks"]:
        if b["type"] != 0:
            continue
        text = " ".join(s["text"] for l in b["lines"] for s in l["spans"])
        x0, y0 = b["bbox"][0], b["bbox"][1]
        if not left <= x0 < right:
            continue
        m = Q_RE.search(text)
        if m and edge is not None and x0 < edge + LABEL_BAND:
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
        sys.exit("usage: extract.py <dayId> <pdfPath> [--pages=FROM-TO]")
    day, pdf = sys.argv[1], sys.argv[2]
    # --pages=2-5 (1-based, inclusive) reads only part of a file: 20 Sep 2025 holds a
    # readable Shift 1 on pages 2-5 and, after it, renders this reader cannot use yet.
    span = next((a.split("=", 1)[1] for a in sys.argv[3:] if a.startswith("--pages=")), None)
    first, last = (int(x) for x in span.split("-")) if span else (1, 10**9)
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", day)
    img_dir = os.path.join(out_dir, "img")
    os.makedirs(img_dir, exist_ok=True)
    doc = fitz.open(pdf)
    cells, markers = [], []
    for pno, page in enumerate(doc):
        if not first - 1 <= pno <= last - 1:
            continue
        images = page_images(page, pno, img_dir)
        edges = table_edges(page)
        if len(edges) <= 1:
            edge = edges[0] if edges else None
            cells += cells_of(page, pno, images, edge)
            markers += markers_of(page, pno, edge)
        else:
            # Two pages side by side: read the left column, then the right, as if each were
            # its own page (page numbers pno and pno + 0.5 keep that reading order).
            bounds = edges[1:] + [float("inf")]
            for k, (e, r) in enumerate(zip(edges, bounds)):
                vpage = pno if k == 0 else pno + k / len(edges)
                left = e - 8 if k else float("-inf")
                cells += cells_of(page, vpage, images, e, r - 8)
                markers += markers_of(page, vpage, e, left, r - 8)
    with open(os.path.join(out_dir, "geometry.json"), "w", encoding="utf8") as f:
        json.dump({"pdf": os.path.basename(pdf), "pages": doc.page_count, "cells": cells, "markers": markers}, f, indent=1)
    shifts = sorted({m["shift"] for m in markers if m["kind"] == "shift"})
    qs = sum(1 for m in markers if m["kind"] == "q")
    print(f"{day}: {doc.page_count} pages, shifts {shifts}, {qs} question labels, {len(cells)} cells -> {out_dir}")


if __name__ == "__main__":
    main()
