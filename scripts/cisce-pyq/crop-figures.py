"""
Crop each row's figure out of its page render.

    python scripts/cisce-pyq/crop-figures.py icse-10 2025 Physics            # every figure
    python scripts/cisce-pyq/crop-figures.py icse-10 2025 Physics 9 12(i)    # just these refs
    python scripts/cisce-pyq/crop-figures.py isc-12 2025 Physics --sheet     # + one contact sheet to eyeball

Reads `figure.page` + `figure.region` (or `figure.regions` on that page, or
`figure.parts` = [{page, region}] across pages; several boxes are stacked) ([left, top, right, bottom] as fractions
of the page) from data/<exam>/<year>-<Subject>.questions.json and writes
<sourceRoot>\\figures\\<year>-<Subject>\\<ref>.png, then trims the
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

import numpy as np
from PIL import Image, ImageChops, ImageDraw

# Mirrors CISCE_EXAMS[*].sourceRoot in exams.ts.
ROOTS = {"isc-12": Path(r"C:\tmp\PYQPs\ISC\XII"), "icse-10": Path(r"C:\tmp\PYQPs\ICSE\X")}
DATA_ROOT = Path(__file__).resolve().parent / "data"


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


def dewatermark(img: Image.Image) -> Image.Image:
    """
    Remove the light-blue diagonal serial-number watermark the 2026 question
    papers print across every page (ISC and ICSE alike). It must never reach a
    published figure: it is a candidate-booklet serial, not part of the paper.

    Rule, measured on the 2026 scans: the watermark is LIGHT and BLUE, roughly
    RGB (160-220, 200-240, 220-240). The figures are black, grey or (on graph
    paper) GREEN. So a pixel becomes white when blue clearly exceeds red, blue is
    at least green, and it is light. Green grid lines fail `b >= g` and stay;
    a black line crossing the watermark is dark and stays.
    """
    a = np.asarray(img.convert("RGB")).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    hit = (b - r > 18) & (b >= g) & (b > 150)
    # Only where a watermark is actually printed. The ICSE 2026 papers carry
    # none, and the near-white rule below would erase real light shading there
    # (the liquid in a shaded cylinder is an answer-bearing grey). Measured: an
    # ISC 2026 crop has thousands of watermark-blue pixels, a clean one ~0.
    if hit.sum() < 0.002 * hit.size:
        return img
    # The watermark also leaves a faint near-white ghost (RGB 230-250, often
    # slightly cyan) where it was printed lightest, and the scan's paper is
    # off-white. Anything that light is not figure ink in these scans, so it
    # goes white too; lines and their anti-aliased edges are well below 215.
    hit |= a.min(axis=-1) >= 215
    a[hit] = 255
    return Image.fromarray(a.astype(np.uint8), "RGB")


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
    # The 2026 question papers carry the serial-number watermark; 2025 comes
    # from CISCE's typeset report and has none. --keep-watermark turns it off.
    clean = args[1] == "2026" and "--keep-watermark" not in sys.argv
    exam, year, subject, only = args[0], args[1], args[2], set(args[3:])
    if exam not in ROOTS:
        sys.exit(f"unknown exam {exam!r}; known: {', '.join(ROOTS)}")
    ROOT = ROOTS[exam]
    stem = f"{year}-{subject}"
    paper = json.loads((DATA_ROOT / exam / f"{stem}.questions.json").read_text(encoding="utf8"))
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
        boxes = [(p["page"], p["region"]) for p in fig.get("parts", [])] or [
            (fig["page"], reg) for reg in (fig.get("regions") or ([fig["region"]] if fig.get("region") else []))
        ]
        if not boxes:
            print(f"  {row['ref']}: no region, skipped")
            continue
        # `mask` = [{page, region}]: white out printed text that sits INSIDE a
        # figure's box and cannot be cropped around (a question line printed
        # level with part of a structure). Only ever blanks; never draws.
        masks = fig.get("mask", [])
        parts = []
        for page_name, (l, t, r, b) in boxes:
            page = Image.open(ROOT / "render" / stem / f"{page_name}.png").convert("RGB")
            w, h = page.size
            draw = ImageDraw.Draw(page)
            for m in masks:
                if m["page"] == page_name:
                    ml, mt, mr, mb = m["region"]
                    draw.rectangle((int(ml * w), int(mt * h), int(mr * w), int(mb * h)), fill="white")
            box = page.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
            parts.append(trim(dewatermark(box) if clean else box))
        crop = parts[0] if len(parts) == 1 else stack(parts)
        target = out / figure_file(row["ref"])
        crop.save(target, optimize=True)
        # Storage refuses objects over ~1 MB, and graph paper scanned in full
        # colour runs 1.3-1.4 MB (2026-10-30). A 256-colour palette keeps the
        # drawing sharp at a fraction of the size.
        if target.stat().st_size > 800_000:
            crop.convert("RGB").quantize(colors=256, method=Image.Quantize.MEDIANCUT).save(target, optimize=True)
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
