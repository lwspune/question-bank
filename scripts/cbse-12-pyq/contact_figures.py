"""
Contact sheet of every cropped figure, for the verification gate.

    python scripts/cbse-12-pyq/contact_figures.py          # out/figures/contact-N.png

Every sibling pipeline that attaches figures learned the same thing: a crop that
the tooling is happy with can still be wrong — clipped labels, the neighbouring
question's figure, a caption sliced in half — and the ONLY way to find that is to
look at it. So this is not optional polish; it is the gate.

Each tile carries the crop plus the group hash and the stem it will be attached
to, because "is this the right figure" is a question about the pairing, not about
the image on its own.
"""

import json
import math
import os
import sys

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
OUT = os.path.join(HERE, "out", "figures")

COLS = 3
TILE_W = 560
IMG_H = 300
CAPTION_H = 74
PAGE_ROWS = 4          # 12 tiles a sheet: big enough to read at a glance


def font(size):
    for p in (r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def wrap(draw, text, fnt, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= width:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def main():
    manifest = json.load(open(os.path.join(DATA, "figures.json"), encoding="utf-8"))
    groups = {g["hash"]: g for g in json.load(open(os.path.join(DATA, "figure-groups.json"), encoding="utf-8"))}
    f_title, f_body = font(15), font(13)

    per = COLS * PAGE_ROWS
    sheets = math.ceil(len(manifest) / per)
    for s in range(sheets):
        chunk = manifest[s * per:(s + 1) * per]
        rows = math.ceil(len(chunk) / COLS)
        sheet = Image.new("RGB", (COLS * TILE_W, rows * (IMG_H + CAPTION_H)), "white")
        d = ImageDraw.Draw(sheet)
        for i, e in enumerate(chunk):
            cx, cy = (i % COLS) * TILE_W, (i // COLS) * (IMG_H + CAPTION_H)
            im = Image.open(os.path.join(OUT, e["file"]))
            sc = min((TILE_W - 16) / im.width, IMG_H / im.height, 1.0)
            im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.LANCZOS)
            sheet.paste(im, (cx + (TILE_W - im.width) // 2, cy + (IMG_H - im.height) // 2))
            d.rectangle([cx + 1, cy + 1, cx + TILE_W - 2, cy + IMG_H + CAPTION_H - 2], outline="#bbb")
            g = groups[e["hash"]]
            head = f"{e['hash'][:8]}  {e['from']} p{e['page']}"
            if e.get("picked"):
                head += "  [PICKED]"
            d.text((cx + 8, cy + IMG_H + 4), head, font=f_title, fill="#0a0a0a")
            stem = " ".join(g["stem"].split())
            for j, line in enumerate(wrap(d, stem, f_body, TILE_W - 20)[:3]):
                d.text((cx + 8, cy + IMG_H + 24 + j * 16), line, font=f_body, fill="#444")
        path = os.path.join(OUT, f"contact-{s + 1}.png")
        sheet.save(path)
        print(f"wrote {path}  ({len(chunk)} tiles)")
    print(f"\n{len(manifest)} crops across {sheets} sheet(s) - LOOK AT EVERY ONE.")


if __name__ == "__main__":
    main()
