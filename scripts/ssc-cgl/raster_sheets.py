"""
Masked reading sheets for the raster sheet (CGL 2025 Tier II): one picture per question, and
batches of several, with nothing that reveals SSC's key.

  python -P scripts/ssc-cgl/raster_sheets.py <shiftId>      (after assemble-raster.ts)

The scan carries the key three ways, and each is removed and then checked:
- the tick and cross in the icon column, and the option NUMBER beside them, printed in the key
  colours: the column is painted white and plain numbers "1." to "4." are stamped at one x;
- the LAYOUT: the tick is wider than the cross, so the keyed option's text starts ~2-3 px right
  of the others. Each option row (a band halfway to its neighbours, so a tall option moves whole)
  is shifted so all four start at the same x, re-measured, and the run stops if they still differ;
- the panel (Question ID .. Chosen Option): never cropped, a question ends above its own panel.
Any key-coloured pixel left in the option column stops the run; elsewhere it is reported (a
coloured chart) for a look.
"""
import json
import os
import sys

import fitz
import numpy as np
from PIL import Image, ImageDraw, ImageFont

COLUMN = (140, 203)  # icon + option number; the option text starts at x >= 205
TEXT_TO = 1150  # right edge of anything an option row can print
CROP_X = (40, 1200)
BATCH_HEIGHT = 2600
STAMP_X = 172
INK = 450  # an RGB sum below this is print, not the light watermark
PANEL_BOX = (560, 1170)  # x span of the panel's box, border included
PANEL_PAD = 40  # the box's border stands this far above and below its text
CONTENT_X = (60, 1000)  # crop columns inside the question frame's rules, for trimming


def key_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return ((g - r > 60) & (g - b > 40) & (g > 120)) | ((r - g > 90) & (r - b > 90) & (r > 150))


def page_array(doc, p):
    page = doc[p]
    imgs = page.get_images(full=True)
    big = max(imgs, key=lambda im: im[2] * im[3])
    pix = fitz.Pixmap(doc, big[0])
    if pix.n > 3 or pix.colorspace.n != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    return np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)[:, :, :3].astype(np.int16).copy()


def bands(rows, height):
    """Each option row's band: halfway to its neighbours, at least 10 px either side of the icon."""
    centres = [(r["y0"] + r["y1"]) / 2 for r in rows]
    gaps = [b - a for a, b in zip(centres, centres[1:])] or [40]
    out = []
    for i, c in enumerate(centres):
        up = (c - centres[i - 1]) / 2 if i > 0 else min(gaps) / 2
        down = (centres[i + 1] - c) / 2 if i + 1 < len(centres) else min(gaps) / 2
        up = max(up, c - rows[i]["y0"] + 10)
        down = max(down, rows[i]["y1"] - c + 10)
        out.append((max(0, int(c - up)), min(height, int(c + down))))
    return out


def text_start(a, band):
    y0, y1 = band
    ink = (a[y0:y1, COLUMN[1]:TEXT_TO].sum(axis=2) < INK).any(axis=0)
    xs = np.nonzero(ink)[0]
    return int(xs[0]) + COLUMN[1] if len(xs) else None


def mask_question(a, q, where):
    rows = q["optionRows"]
    bs = bands(rows, a.shape[0])
    # The icon's own LINE carries the icon, the key-coloured number and the keyed indent. A long
    # option can wrap onto lines below it that start further LEFT (x ~152, Q88 option 2): those
    # are text and must not be painted, so only the icon's line is painted and measured, while
    # the whole band still moves so a tall option shifts in one piece.
    lines = [(max(0, r["y0"] - 8), r["y1"] + 8) for r in rows]
    for y0, y1 in lines:
        a[y0:y1, COLUMN[0]:COLUMN[1]] = 255
    starts = [text_start(a, ln) for ln in lines]
    found = [s for s in starts if s is not None]
    if found:
        base = min(found)
        for (y0, y1), s in zip(bs, starts):
            if s is None or s <= base:
                continue
            d = s - base
            a[y0:y1, base:TEXT_TO - d] = a[y0:y1, s:TEXT_TO].copy()
            a[y0:y1, TEXT_TO - d:TEXT_TO] = 255
        after = {text_start(a, ln) for ln in lines} - {None}
        if after and max(after) - min(after) > 1:
            sys.exit(f"{where}: option rows still start at different x after realigning: {sorted(after)}")
    top, bottom = bs[0][0], bs[-1][1]
    # The panel's box: the crop stops above its text, but the box's top border and a speck below
    # its last line can remain. Paint the whole box, never above the last option's band.
    pn = q["panel"]
    if pn["page"] == rows[0]["page"]:
        a[max(bottom, pn["y0"] - PANEL_PAD):pn["y1"] + PANEL_PAD, PANEL_BOX[0]:PANEL_BOX[1]] = 255
    left = key_mask(a[top:bottom, COLUMN[0] - 40:COLUMN[1] + 60])
    if left.sum() > 0:
        sys.exit(f"{where}: {int(left.sum())} key-coloured pixels left in the option column")
    return bs


def stamp(img, rows, top):
    font = ImageFont.load_default(size=22)
    d = ImageDraw.Draw(img)
    for i, r in enumerate(rows):
        yc = (r["y0"] + r["y1"]) / 2 - top
        d.text((STAMP_X - CROP_X[0], yc - 12), f"{i + 1}.", fill=(37, 37, 37), font=font)


def trim(img):
    """Drop blank rows above and below, judged inside the frame's rules (they run every row)."""
    a = np.asarray(img.convert("L"))[:, CONTENT_X[0]:CONTENT_X[1]]
    ink = np.nonzero((a < 200).any(axis=1))[0]
    if not len(ink):
        return None
    return img.crop((0, max(0, ink[0] - 6), img.width, min(img.height, ink[-1] + 7)))


def label(img, text):
    font = ImageFont.load_default(size=30)
    out = Image.new("RGB", (img.width, img.height + 44), "white")
    ImageDraw.Draw(out).text((8, 6), text, fill=(180, 0, 0), font=font)
    out.paste(img, (0, 44))
    return out


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: raster_sheets.py <shiftId>")
    shift = sys.argv[1]
    base = os.path.dirname(os.path.abspath(__file__))
    data = json.load(open(os.path.join(base, "out", shift, "questions.json"), encoding="utf8"))
    if data.get("format") != "raster":
        sys.exit(f"{shift} is not a raster shift")
    out_dir = os.path.join(base, "out", shift, "sheets")
    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(out_dir):
        if f.endswith(".png"):
            os.remove(os.path.join(out_dir, f))
    doc = fitz.open(data["pdf"])
    pages = {}

    def page(p):
        if p not in pages:
            pages[p] = page_array(doc, p)
        return pages[p]

    # Mask every question's options on its page first: a crop can reach onto the next page.
    for q in data["questions"]:
        mask_question(page(q["optionRows"][0]["page"]), q, f"{shift} Q{q['number']}")
        pn = q["panel"]
        if pn["page"] != q["optionRows"][0]["page"]:  # a panel pushed onto the next page
            page(pn["page"])[max(0, pn["y0"] - PANEL_PAD):pn["y1"] + PANEL_PAD, PANEL_BOX[0]:PANEL_BOX[1]] = 255

    crops = []
    for q in data["questions"]:
        parts = []
        for r in q["regions"]:
            a = page(r["page"])[r["y0"]:r["y1"] + 1, CROP_X[0]:CROP_X[1]]
            img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGB")
            mine = [o for o in q["optionRows"] if o["page"] == r["page"]]
            if mine:
                stamp(img, mine, r["y0"])
            img = trim(img)
            if img is not None:
                parts.append(img)
        img = Image.new("RGB", (max(p.width for p in parts), sum(p.height for p in parts)), "white")
        y = 0
        for p in parts:
            img.paste(p, (0, y))
            y += p.height
        stray = int(key_mask(np.asarray(img).astype(np.int16)).sum())
        if stray > 40:
            print(f"  ! {shift} Q{q['number']}: {stray} key-coloured pixels outside the option column (a coloured chart?): look")
        img = label(img, f"Q{q['number']}")
        img.save(os.path.join(out_dir, f"q{q['number']:03d}.png"))
        crops.append((q["number"], img))

    batch, height = [], 0

    def flush():
        if not batch:
            return
        w = max(i.width for _, i in batch)
        sheet = Image.new("RGB", (w, sum(i.height + 12 for _, i in batch)), "white")
        y = 0
        for _, i in batch:
            sheet.paste(i, (0, y))
            y += i.height + 12
        sheet.save(os.path.join(out_dir, f"batch-{batch[0][0]:03d}-{batch[-1][0]:03d}.png"))

    for n, img in crops:
        if batch and height + img.height > BATCH_HEIGHT:
            flush()
            batch, height = [], 0
        batch.append((n, img))
        height += img.height + 12
    flush()
    print(f"{shift}: {len(crops)} question sheets + batches -> {out_dir}")


if __name__ == "__main__":
    main()
