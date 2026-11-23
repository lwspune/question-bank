"""Crop every figure a UP Board paper's transcription names.

    py scripts/up-board/crop.py <paperId> [--pad=0.01]

Reads scripts/up-board/data/<paperId>.questions.json; for each question with a
`figure` {page, region: [left, top, right, bottom] as page fractions}, renders
that page at 220 dpi and writes scripts/up-board/figures/<paperId>/<ref>.png.
Also writes out/<paperId>/_figures.png, every crop on one sheet with its ref:
LOOK at it every time. A crop that clips a label is worse than one with a
sliver of text, and the hoster's address or a student's pen mark must not be
inside the box (move the region and re-run).
"""
import json
import os
import sys

import pymupdf
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from render import pdf_for  # noqa: E402


def main() -> None:
    args = sys.argv[1:]
    ids = [a for a in args if not a.startswith("--")]
    if len(ids) != 1:
        sys.exit(__doc__)
    paper_id = ids[0]
    pad = next((float(a.split("=")[1]) for a in args if a.startswith("--pad=")), 0.01)
    data = json.load(open(os.path.join(HERE, "data", f"{paper_id}.questions.json"), encoding="utf-8"))
    doc = pymupdf.open(pdf_for(paper_id))
    out_dir = os.path.join(HERE, "figures", paper_id)
    os.makedirs(out_dir, exist_ok=True)
    crops = []
    for q in data["questions"]:
        fig = q.get("figure")
        if not fig:
            continue
        if not fig.get("region"):
            print(f"{q['ref']}: figure has no region; add one")
            continue
        page = doc[fig["page"] - 1]
        pix = page.get_pixmap(dpi=220)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        l, t, r, b = fig["region"]
        box = (max(0, l - pad) * img.width, max(0, t - pad) * img.height,
               min(1, r + pad) * img.width, min(1, b + pad) * img.height)
        crop = img.crop(tuple(int(v) for v in box))
        crop.save(os.path.join(out_dir, f"{q['ref']}.png"))
        crops.append((q["ref"], crop))
        print(f"{q['ref']}: {crop.width}x{crop.height}")
    if not crops:
        print("no figures")
        return
    w = max(c.width for _, c in crops)
    h = sum(c.height + 30 for _, c in crops)
    sheet = Image.new("RGB", (w, h), "white")
    y = 0
    for ref, c in crops:
        ImageDraw.Draw(sheet).text((4, y + 6), ref, fill=(220, 0, 0))
        sheet.paste(c, (0, y + 30))
        y += c.height + 30
    sheet_dir = os.path.join(HERE, "out", paper_id)
    os.makedirs(sheet_dir, exist_ok=True)
    sheet.save(os.path.join(sheet_dir, "_figures.png"))
    print(f"sheet: {os.path.join(sheet_dir, '_figures.png')}")


if __name__ == "__main__":
    main()
