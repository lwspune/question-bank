"""
Figures for a CHSL 2025 challenge-module scan, cut from SSC's own scanned page: the scan has no
picture objects to extract (figures.ts serves the TCS prints, raster_figures.py the CGL 2025
Tier II raster). Every crop is SSC's pixels, never a drawing.

  python -P scripts/ssc-cgl/challenge_figures.py <shiftId> <n>:<stem|options|stem+options> ...
      -> figures/<shiftId>/qNNN.png and qNNN-A.png .. -D.png, and out/<shiftId>/figure-review.png
  <n>:stem@Y0-Y1 crops ALL ink between rows Y0-Y1 of the stem's first band instead of the first
  figure, for a stem picture in several rows (find the rows by eye; stem rows are band-relative)

The sheet prints each picture once per language (English, Hindi, sometimes Kannada), one under
another, so a figure is the FIRST cluster of tall ink shapes in its band:
- the stem's band runs from the question's top to its first option row;
- an option's band is its option row (questions.json optionRows); a row whose part on its page
  holds no figure continues at the top of the next page.
The key column is painted out first (challenge_sheets.column_edge), the blue challenge marker
is never ink, Oliveboard's pale watermark is whitened, and a crop holding any key colour stops
the run, so no picture can carry the key.
"""
import json
import os
import sys

import fitz
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from challenge_extract import page_array  # noqa: E402
from challenge_sheets import CROP_X, GUARD, column_edge, font, key_mask  # noqa: E402

LABELS = "ABCD"
X_MAX = 1120  # the question frame's right-hand edge; the challenge marker sits right of 760
INK = 450  # print; the watermark sums ~540 and up
TALL = 34  # a text line is under ~30 px tall; a figure's shape is taller
PAD = 6
WATERMARK = 540


def band_ink(a, col):
    """Ink mask of a band (page x), the key column and anything coloured excluded."""
    s = a.sum(axis=2)
    sat = a.max(axis=2) - a.min(axis=2)
    ink = (s < INK) & (sat < 60)
    ink[:, :col] = False
    ink[:, X_MAX:] = False
    return ink


def first_figure(a, col):
    """(x0, y0, x1, y1) of the first cluster of tall ink shapes in the band, or None."""
    ink = band_ink(a, col)
    lab, n = ndimage.label(ink, structure=np.ones((3, 3)))
    if not n:
        return None
    boxes = ndimage.find_objects(lab)
    tall = sorted((b for b in boxes if b[0].stop - b[0].start >= TALL), key=lambda b: b[0].start)
    if not tall:
        return None
    y0, y1 = tall[0][0].start, tall[0][0].stop
    for b in tall[1:]:  # shapes overlapping the cluster's rows belong to the same copy
        if b[0].start < y1:
            y1 = max(y1, b[0].stop)
    cl = [b for b in tall if b[0].start < y1]
    x0, x1 = min(b[1].start for b in cl), max(b[1].stop for b in cl)
    # small shapes inside the cluster's box (letters in a grid, the dots of "(:)") join it
    for b in boxes:
        if b[0].start >= y0 - 3 and b[0].stop <= y1 + 3 and b[1].start >= x0 - 40 and b[1].stop <= x1 + 40:
            x0, x1 = min(x0, b[1].start), max(x1, b[1].stop)
    # ...and so do shapes TOUCHING it from above or below, repeated until nothing more joins: a
    # mirror line's hatching and its "M"/"N" labels sit on the figure's top edge (CPO 9 Dec 2025
    # S1 Q18 lost them). Four px is under any gap between a figure and the text or copy beside it.
    # The mirror line is wider than the figure, so a touching shape need only overlap it sideways,
    # up to three times its width (never a page-wide frame rule: 600 px at most)
    grown = True
    while grown:
        grown = False
        for b in boxes:
            if b[0].start >= y0 and b[0].stop <= y1 and b[1].start >= x0 and b[1].stop <= x1:
                continue
            w = b[1].stop - b[1].start
            beside = b[1].start >= x0 - 40 and b[1].stop <= x1 + 40
            over = b[1].start < x1 and b[1].stop > x0 and w <= min(3 * (x1 - x0), 600)
            if b[0].stop >= y0 - 4 and b[0].start <= y1 + 4 and (beside or over):
                y0, y1 = min(y0, b[0].start), max(y1, b[0].stop)
                x0, x1 = min(x0, b[1].start), max(x1, b[1].stop)
                grown = True
    return x0, y0, x1, y1


def cut(a, box, what="", whiten=True):
    x0, y0, x1, y1 = box
    c = a[max(0, y0 - PAD) : y1 + PAD, max(0, x0 - PAD) : x1 + PAD].copy()
    # whiten the pale watermark on a line drawing; a photo (a quarter or more of it dark) keeps
    # its light tones, which whitening would burn out (25 Nov S1 Q90, Saturn). A crop chosen by
    # eye (stem@Y0-Y1) is not whitened: its thin lines can print as pale as the watermark (10 Dec
    # 2025 S1 Q29's diagonals broke into dashes), so look at it for a watermark instead
    if whiten and (c.sum(axis=2) < INK).mean() < 0.25:
        s = c.sum(axis=2)
        pale = (s >= WATERMARK) & (s < 700)
        # ...but a figure's own pale RULED line is as light as the watermark (CPO 9 Dec 2025 S2
        # Q34's middle line, sum ~560, was erased and the count changed): keep pale pixels in a
        # column or row that pale ink covers for half the crop or more; the watermark is diagonal
        # text and never fills one
        ruled = np.zeros_like(pale)
        ruled[:, pale.mean(axis=0) >= 0.5] = True
        ruled[pale.mean(axis=1) >= 0.5, :] = True
        c[(s >= WATERMARK) & ~(ruled & pale)] = 255
    if key_mask(c.astype(int)).any():
        km = key_mask(c.astype(int))
        ys, xs = np.nonzero(km)
        raise SystemExit(f"{what}: {len(ys)} key-coloured px inside the figure crop (box {box}, first at x {xs.min() + x0 - PAD}, y {ys.min() + y0 - PAD})")
    return c.astype(np.uint8)


def main():
    shift = sys.argv[1]
    want = {int(n): k for n, k in (x.split(":") for x in sys.argv[2:])}
    here = os.path.dirname(os.path.abspath(__file__))
    data = json.load(open(os.path.join(here, "out", shift, "questions.json"), encoding="utf8"))
    doc = fitz.open(data["pdf"])
    cache = {}

    def page(n):
        if n not in cache:
            cache[n] = page_array(doc, doc[n - 1])
        return cache[n]

    def painted(p, y0, y1):
        """A band (page rows y0..y1) with the key column painted out, as the sheets do (a cell
        can run up to the column rule), and that column's edge."""
        a = page(p)[y0:y1].copy()
        col = column_edge(a[:, CROP_X[0] : CROP_X[1]]) + CROP_X[0]
        km = key_mask(a[:, : col + GUARD])
        for y in range(a.shape[0]):
            hits = np.nonzero(km[y])[0]
            a[y, : max(col, int(hits[-1]) + 2 if len(hits) else 0)] = 255
        return a, col

    def find(bands):
        """The first figure in a list of (page, y0, y1) bands: (band array, box) or None."""
        for p, y0, y1 in bands:
            a, col = painted(p, y0, y1)
            box = first_figure(a, col)
            if box:
                return a, box
        return None

    def rows_of(bands, rows):
        """A stem picture made of SEVERAL figure rows (a "Figure 1" row and a "Figure 2" row of
        answers, CPO 10 Dec 2025 S1 Q29): every ink pixel between rows Y0-Y1 of the first band,
        chosen by eye from `stem@Y0-Y1`, since the next language's copy starts right below it."""
        p, b0, b1 = bands[0]
        a, col = painted(p, b0, b1)
        lo, hi = (int(v) for v in rows.split("-"))
        ys, xs = np.nonzero(band_ink(a, col)[lo:hi])
        if not len(ys):
            return None
        return a, (int(xs.min()), lo + int(ys.min()), int(xs.max()) + 1, lo + int(ys.max()) + 1)

    out = os.path.join(here, "figures", shift)
    os.makedirs(out, exist_ok=True)
    review = []
    qs = {q["number"]: q for q in data["questions"]}
    for n, kind in sorted(want.items()):
        q = qs[n]
        rows = q["optionRows"]
        regions = q["regions"]
        crops = []
        kind, _, stem_rows = kind.partition("@")
        if kind in ("stem", "stem+options"):
            first = rows[0]
            bands = []
            for r in regions:
                if (r["page"], r["y0"]) >= (first["page"], first["y0"]):
                    break
                end = first["y0"] if r["page"] == first["page"] else r["y1"]
                bands.append((r["page"], r["y0"], end))
            got = rows_of(bands, stem_rows) if stem_rows else find(bands)
            if not got:
                raise SystemExit(f"Q{n}: no stem figure found")
            c = cut(*got, f"Q{n} stem", whiten=not stem_rows)
            Image.fromarray(c).save(os.path.join(out, f"q{n:03d}.png"))
            crops.append(("stem", c))
        if kind in ("options", "stem+options"):
            for k, r in enumerate(rows):
                bands = [(r["page"], r["y0"], r["y1"])]
                if r["y1"] >= page(r["page"]).shape[0] - 2:  # the row runs on overleaf
                    nxt = rows[k + 1] if k + 1 < len(rows) else None
                    over = [g for g in regions if g["page"] == r["page"] + 1]
                    if over:
                        end = nxt["y0"] if nxt and nxt["page"] == r["page"] + 1 else over[0]["y1"]
                        bands.append((r["page"] + 1, 0, end))
                got = find(bands)
                if not got:
                    raise SystemExit(f"Q{n}: no figure in option {LABELS[k]}")
                c = cut(*got, f"Q{n} option {LABELS[k]}")
                Image.fromarray(c).save(os.path.join(out, f"q{n:03d}-{LABELS[k]}.png"))
                crops.append((LABELS[k], c))
        review.append((n, crops))

    # one review sheet: each question's crops in a row, labelled
    f = font(22)
    rows_img = []
    for n, crops in review:
        h = max(c.shape[0] for _, c in crops) + 34
        w = sum(c.shape[1] + 30 for _, c in crops) + 90
        im = Image.new("RGB", (w, h), "white")
        d = ImageDraw.Draw(im)
        d.text((8, 8), f"Q{n}", fill=(200, 0, 0), font=f)
        x = 80
        for lab, c in crops:
            d.text((x, 4), lab, fill=(0, 0, 160), font=f)
            im.paste(Image.fromarray(c), (x, 30))
            d.rectangle([x - 1, 29, x + c.shape[1], 30 + c.shape[0]], outline=(180, 180, 180))
            x += c.shape[1] + 30
        rows_img.append(im)
    W = max(i.width for i in rows_img)
    sheet = Image.new("RGB", (W, sum(i.height + 10 for i in rows_img)), (235, 235, 235))
    y = 0
    for i in rows_img:
        sheet.paste(i, (0, y))
        y += i.height + 10
    path = os.path.join(here, "out", shift, "figure-review.png")
    sheet.save(path)
    print(f"{shift}: {sum(len(c) for _, c in review)} figure(s) for {len(review)} question(s) -> {out}; review {path}")


if __name__ == "__main__":
    main()
