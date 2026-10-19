"""Contact sheets for a solution-figure batch: each crop beside the questions it
will sit under, a few figures per image, so every crop AND every pairing is seen.

    python scripts/solution-figures/sheet.py <batch> [per_sheet]

Reads out/<batch>/pairing.json (written by run.ts's dry run) and writes
out/<batch>/sheet-<n>.png. A crop is judged on the sheet: complete (every label,
lead and arrow), clean (no caption, body text or neighbouring figure), and the
SAME CASE as each question listed beside it.
"""
import json
import os
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont

W = 1300
FIG_W = 560


def font(size, bold=False):
    for name in (("arialbd.ttf" if bold else "arial.ttf"), "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()


def tile(entry):
    f, fb = font(17), font(19, True)
    im = Image.open(entry["png"]).convert("RGB") if entry["png"] else Image.new("RGB", (FIG_W, 80), (255, 220, 220))
    im.thumbnail((FIG_W, 520))
    lines = [(entry["key"], fb)]
    for q in entry["questions"]:
        lines.append(("* " + q["tag"] + ("  [labels edited]" if q["edited"] else ""), font(16, True)))
        for part in textwrap.wrap(q["stem"], 78)[:2]:
            lines.append(("   " + part, f))
    text_h = 24 * len(lines) + 10
    h = max(im.height, text_h) + 20
    t = Image.new("RGB", (W, h), "white")
    t.paste(im, (10, 10))
    d = ImageDraw.Draw(t)
    y = 10
    for s, fo in lines:
        d.text((FIG_W + 30, y), s, fill=(20, 20, 20), font=fo)
        y += 24
    d.line([(0, h - 1), (W, h - 1)], fill=(180, 180, 180), width=2)
    return t


def main():
    batch = sys.argv[1]
    per = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    outdir = os.path.join(os.path.dirname(__file__), "out", batch)
    pairing = json.load(open(os.path.join(outdir, "pairing.json"), encoding="utf-8"))
    for n in range(0, len(pairing), per):
        tiles = [tile(e) for e in pairing[n:n + per]]
        sheet = Image.new("RGB", (W, sum(t.height for t in tiles)), "white")
        y = 0
        for t in tiles:
            sheet.paste(t, (0, y))
            y += t.height
        path = os.path.join(outdir, f"sheet-{n // per + 1}.png")
        sheet.save(path)
        print(path)


if __name__ == "__main__":
    main()
