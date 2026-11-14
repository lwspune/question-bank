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


def blank_rows(a):
    """Rows that hold nothing: white, or the capture's beige page filler."""
    s = a.astype(int).sum(axis=2)
    m = np.median(a.astype(int), axis=1)
    beige = (abs(m[:, 0] - 215) < 15) & (abs(m[:, 1] - 202) < 15) & (abs(m[:, 2] - 182) < 15)
    return (s.min(axis=1) > 700) | beige


def column_edge(a, frame=False):
    """Where the left column ends in this crop (crop x): just right of its vertical rule (page x
    ~128-152, by page), or, on a frameless page, x 121 (the key cells end at 120, text starts 124).

    The FIRST rule in the window, never the last: on the three-language print (20 Nov) text
    starts at x 146 and a figure's tall line at x 149 also reads as a rule, so the last one
    painted over first letters and the left of every figure. The window reaches x 156 because
    that print's rule can sit at x 150 (outside it, the frameless default left the "Q.No: 100"
    label half painted, and a sliver of key colour beside it)."""
    s = a.astype(int).sum(axis=2)
    # the CPO 2025 browser print (--page-frame) draws its column rule at page x ~159, and a
    # question's crop runs on into blank page, so the rule fills only a third of its rows (text
    # columns there reach an eighth): a lower bar for that print
    lo, hi = 112 - CROP_X[0], (176 if frame else 156) - CROP_X[0]
    frac = ((s[:, lo:hi] > 300) & (s[:, lo:hi] < 720)).mean(axis=0)
    if frame:
        # count only rows that hold something: a capture's last page can be two option rows and
        # then blank paper (9 Dec 2025 S2 Q100), which drowns the rule in empty rows
        used = s.min(axis=1) < 700
        if used.any():
            frac = ((s[used, lo:hi] > 300) & (s[used, lo:hi] < 720)).mean(axis=0)
        # ...and a shaded row band can lift every column to a quarter, so the rule is the column
        # that stands out: the strongest, at least twice the band's median, and its neighbours
        peak = int(np.argmax(frac))
        if frac[peak] < 0.12 or frac[peak] < 2 * float(np.median(frac)):
            return 121 - CROP_X[0]
        end = peak
        while end + 1 < len(frac) and frac[end + 1] >= 0.6 * frac[peak]:
            end += 1
        return lo + end + 2
    grey = frac > 0.5
    xs = np.nonzero(grey)[0]
    if not len(xs):
        return 121 - CROP_X[0]
    end = int(xs[0])
    while end + 1 < len(grey) and grey[end + 1]:
        end += 1
    return lo + end + 2


def squeeze(a):
    """Cut long runs of blank rows (white, or the capture's beige page filler) to a short gap."""
    blank = blank_rows(a)
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
    frame = "--page-frame" in sys.argv[2:]
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
            # on the browser print the rule stands at one x down the whole page, but a short crop
            # at a page break is mostly key cell and hides it: read it off the full page there
            # (whichever reads further right: a capture's header page has grey shapes of its own;
            # the text starts right of x 165, so painting to either rule never reaches it)
            col = max(column_edge(a, True), column_edge(page(r["page"])[:, CROP_X[0] : CROP_X[1]], True)) if frame else column_edge(a)
            # paint the column, then any key-coloured run that continues it to the right (a page
            # whose table sits further right draws its cells past the usual edge)
            km = key_mask(a.astype(int))
            for y in range(a.shape[0]):
                # a cell's border can print one px inside its colour: paint to the right-most key
                # pixel near the edge, skipping any gap
                hits = np.nonzero(km[y, : col + GUARD])[0]
                a[y, : max(col, int(hits[-1]) + 2 if len(hits) else 0)] = 255
            # checked 30 px past where the painting may reach, so a cell wider than expected fails
            if key_mask(a[:, : col + GUARD + 30].astype(int)).any():
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
                    if blank_rows(a[y0 + 3 : max(y0 + 4, y1 - 3), col + 10 :]).mean() > 0.97:
                        carry = k + 1
                        continue
                    # beside the row's first line: centred on a one-line (frameless) row
                    d.text((STAMP_X - CROP_X[0], y0 + (max(0, (y1 - y0 - 22) // 2) if y1 - y0 < 30 else 10)), f"{k + 1}.", fill=(30, 30, 30), font=small)
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
