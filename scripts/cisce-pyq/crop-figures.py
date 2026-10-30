"""
Crop each row's figure out of its page render.

    python scripts/isc-12-pyq/crop-figures.py 2025 Physics            # every figure
    python scripts/isc-12-pyq/crop-figures.py 2025 Physics 9 12(i)    # just these refs
    python scripts/isc-12-pyq/crop-figures.py 2025 Physics --sheet    # + one contact sheet to eyeball

Reads `figure.page` + `figure.region` (or `figure.regions`, stacked) ([left, top, right, bottom] as fractions
of the page) from data/<year>-<Subject>.questions.json and writes
C:\\tmp\\PYQPs\\ISC\\XII\\figures\\<year>-<Subject>\\<ref>.png, then trims the
white margin. Regions come from a transcriber's estimate, so EVERY crop is
looked at before it is used: fix a bad one by editing `region` in the data file
and re-running for that ref. Pages are rasters (no vector drawings anywhere in
these sources), so cropping the render is the only extraction there is.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(r"C:\tmp\PYQPs\ISC\XII")
DATA = Path(__file__).resolve().parent / "data"


def figure_file(ref: str) -> str:
    s = re.sub(r"[()]", "-", ref)
    s = re.sub(r"-+$", "", s)
    return re.sub(r"-+", "-", s) + ".png"


def trim(img: Image.Image, pad: int = 12) -> Image.Image:
    bg = Image.new(img.mode, img.size, (255, 255, 255))
    box = ImageChops.difference(img, bg).convert("L").point(lambda v: 255 if v > 40 else 0).getbbox()
    if not box:
        return img
    l, t, r, b = box
    return img.crop((max(0, l - pad), max(0, t - pad), min(img.width, r + pad), min(img.height, b + pad)))


def stack(parts: list[Image.Image], gap: int = 24) -> Image.Image:
    width = max(p.width for p in parts)
    out = Image.new("RGB", (width, sum(p.height for p in parts) + gap * (len(parts) - 1)), "white")
    y = 0
    for p in parts:
        out.paste(p, ((width - p.width) // 2, y))
        y += p.height + gap
    return out


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    sheet = "--sheet" in sys.argv
    year, subject, only = args[0], args[1], set(args[2:])
    stem = f"{year}-{subject}"
    paper = json.loads((DATA / f"{stem}.questions.json").read_text(encoding="utf8"))
    out = ROOT / "figures" / stem
    out.mkdir(parents=True, exist_ok=True)
    made: list[tuple[str, Image.Image]] = []
    for row in paper["rows"]:
        fig = row.get("figure")
        if not fig or (only and row["ref"] not in only):
            continue
        # `regions` (a list) cuts several boxes off the same page and stacks
        # them top to bottom: for a figure split by question text, such as a
        # circuit printed above a sentence and then a graph.
        regions = fig.get("regions") or ([fig["region"]] if fig.get("region") else [])
        if not regions:
            print(f"  {row['ref']}: no region, skipped")
            continue
        page = Image.open(ROOT / "render" / stem / f"{fig['page']}.png").convert("RGB")
        w, h = page.size
        parts = [trim(page.crop((int(l * w), int(t * h), int(r * w), int(b * h)))) for l, t, r, b in regions]
        crop = parts[0] if len(parts) == 1 else stack(parts)
        crop.save(out / figure_file(row["ref"]), optimize=True)
        made.append((row["ref"], crop))
    print(f"{len(made)} crop(s) -> {out}")
    if sheet and made:
        cols, cell = 3, 520
        rows = (len(made) + cols - 1) // cols
        board = Image.new("RGB", (cols * cell, rows * (cell + 30)), "white")
        draw = ImageDraw.Draw(board)
        for i, (ref, im) in enumerate(made):
            im = im.copy()
            im.thumbnail((cell - 10, cell - 10))
            x, y = (i % cols) * cell, (i // cols) * (cell + 30)
            board.paste(im, (x + 5, y + 25))
            draw.text((x + 5, y + 5), ref, fill="red")
        board.save(out / "_sheet.png")
        print(f"sheet -> {out / '_sheet.png'}")


if __name__ == "__main__":
    main()
