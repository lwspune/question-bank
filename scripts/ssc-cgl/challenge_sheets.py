"""
Masked reading sheets for a scanned challenge-module shift (SSC CHSL 2025): one picture per
question and batches of several, with nothing that reveals SSC's key.

  python -P scripts/ssc-cgl/challenge_sheets.py <shiftId>      (after assemble-challenge.ts)

The sheet carries the key in ONE place, the narrow left column of each option row (green: correct
and chosen; yellow: correct, not chosen; red: the candidate's wrong choice), where the "Q.No: n"
label also prints. That whole column is painted white, and plain "1." to "4." are stamped beside
the options instead. The run then checks the painted column holds no key colour at all; a key
colour elsewhere (a coloured chart) is reported for a look, never hidden.
Writes out/<shiftId>/sheets/qNNN.png (its number on top) and batch-NNN-MMM.png.
"""
import json
import os
import sys

import fitz  # PyMuPDF
import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from challenge_extract import page_array  # noqa: E402

CROP_X = (40, 1200)
COLUMN_TO = 142  # the left column (key cells, Q.No label) ends at its rule, x ~128-140 by page
GUARD = 30  # no key colour may sit within this many px right of the painted column
BLANK_RUN = 40  # a run of blank (white or beige filler) rows longer than this is cut to BLANK_KEEP
BLANK_KEEP = 16
STAMP_X = 88
BATCH_HEIGHT = 2600


def key_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = (g - r > 40) & (g - b > 40) & (g < 210)
    yellow = (r > 200) & (g > 200) & (b < 150)
    red = (r - g > 80) & (r - b > 80)
    return green | yellow | red


def squeeze(a):
    """Cut long runs of blank rows (white, or the capture's beige page filler) to a short gap."""
    s = a.astype(int).sum(axis=2)
    m = np.median(a.astype(int), axis=1)
    beige = (abs(m[:, 0] - 215) < 15) & (abs(m[:, 1] - 202) < 15) & (abs(m[:, 2] - 182) < 15)
    blank = (s.min(axis=1) > 700) | beige
    keep = np.ones(len(blank), bool)
    y = 0
    while y < len(blank):
        if blank[y]:
            y0 = y
            while y < len(blank) and blank[y]:
                y += 1
            if y - y0 > BLANK_RUN:
                keep[y0 + BLANK_KEEP : y] = False
        else:
            y += 1
    return a[keep]


def font(size):
    for f in ("arial.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(f, size)
        except OSError:
            pass
    return ImageFont.load_default()


def main():
    shift = sys.argv[1]
    here = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(here, "out", shift)
    data = json.load(open(os.path.join(out_dir, "questions.json"), encoding="utf8"))
    doc = fitz.open(data["pdf"])
    pages = {}

    def page(n):
        if n not in pages:
            pages[n] = page_array(doc, doc[n - 1]).astype(np.uint8)
        return pages[n]

    sheets = os.path.join(out_dir, "sheets")
    os.makedirs(sheets, exist_ok=True)
    big, small = font(30), font(20)
    tiles = []
    stray = []
    for q in data["questions"]:
        parts = []
        carry = None
        for r in q["regions"]:
            a = page(r["page"])[r["y0"] : r["y1"], CROP_X[0] : CROP_X[1]].copy()
            col = COLUMN_TO - CROP_X[0]
            # paint the column, then any key-coloured run that continues it to the right (a page
            # whose table sits further right draws its cells past the usual edge)
            km = key_mask(a.astype(int))
            for y in range(a.shape[0]):
                # a cell's border can print one px inside its colour: paint to the right-most key
                # pixel near the edge, skipping any gap
                hits = np.nonzero(km[y, : col + 12])[0]
                a[y, : max(col, int(hits[-1]) + 2 if len(hits) else 0)] = 255
            if key_mask(a[:, : col + GUARD].astype(int)).any():
                sys.exit(f"{shift} Q{q['number']}: a key colour survives at the masked column's edge")
            n_stray = int(key_mask(a.astype(int)).sum())
            if n_stray > 400:
                stray.append(f"Q{q['number']} ({n_stray} px)")
            img = Image.fromarray(a)
            d = ImageDraw.Draw(img)
            # an option row whose part on this page is blank (the capture's filler: its text starts
            # overleaf) is numbered where its text starts, at the top of the next region
            if carry is not None:
                d.text((STAMP_X - CROP_X[0], 10), f"{carry}.", fill=(30, 30, 30), font=small)
                carry = None
            for k, row in enumerate(q["optionRows"]):
                if row["page"] == r["page"] and r["y0"] <= row["y0"] < r["y1"]:
                    y0 = row["y0"] - r["y0"]
                    y1 = min(row["y1"], r["y1"]) - r["y0"]
                    body = a[y0 + 3 : max(y0 + 4, y1 - 3), col + 10 :].astype(int).sum(axis=2)
                    if body.size and (body < 450).sum() < 20:
                        carry = k + 1
                        continue
                    d.text((STAMP_X - CROP_X[0], y0 + 10), f"{k + 1}.", fill=(30, 30, 30), font=small)
            # stamped first, then squeezed: the stamps sit on option rows, never on a blank run
            parts.append(Image.fromarray(squeeze(np.asarray(img))))
        h = sum(p.height for p in parts) + 44
        w = CROP_X[1] - CROP_X[0]
        tile = Image.new("RGB", (w, h), "white")
        ImageDraw.Draw(tile).text((8, 4), f"Q{q['number']}", fill=(190, 0, 0), font=big)
        y = 44
        for p in parts:
            tile.paste(p, (0, y))
            y += p.height
        tile.save(os.path.join(sheets, f"q{q['number']:03d}.png"))
        tiles.append((q["number"], tile))

    batch, start, height = [], None, 0
    def flush():
        if not batch:
            return
        h = sum(t.height for _, t in batch)
        img = Image.new("RGB", (batch[0][1].width, h), "white")
        y = 0
        for _, t in batch:
            img.paste(t, (0, y))
            y += t.height
        img.save(os.path.join(sheets, f"batch-{batch[0][0]:03d}-{batch[-1][0]:03d}.png"))
    for n, t in tiles:
        if batch and height + t.height > BATCH_HEIGHT:
            flush()
            batch, height = [], 0
        batch.append((n, t))
        height += t.height
    flush()
    print(f"{shift}: {len(tiles)} question sheets + batches -> {sheets}")
    if stray:
        print(f"  key colours outside the masked column (a coloured figure? look): {', '.join(stray)}")


if __name__ == "__main__":
    main()
