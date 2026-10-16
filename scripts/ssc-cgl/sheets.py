"""Reading sheets for one shift: what the transcriber reads, and all they read.

    python scripts/ssc-cgl/sheets.py <shiftId> [first] [last]

For each question, stacks SSC's own images (stem, then options A-D) on a white page
and writes out/<shiftId>/sheets/qNNN.png (both languages), plus batches of consecutive
questions, English half only, as out/<shiftId>/sheets/batch-NNN-MMM.png. Built from the extracted image objects, so a
sheet carries neither the AglaSem watermark nor the key colour: the transcriber
derives every answer blind and build.ts compares with the key afterwards.
"""
import json
import os
import sys

import fitz  # PyMuPDF

SCALE = 2.0  # image pixels -> sheet points, so 11 px text reads at ~22 px
PAD = 8
LABEL_W = 34
WIDTH = 1500
BATCH_HEIGHT = 2400


def image_size(path):
    pix = fitz.Pixmap(path)
    return pix.width * SCALE, pix.height * SCALE


def english_half(q):
    """A bilingual question prints each cell English first, then Hindi. When every
    option has exactly two images the question is bilingual, so the first half of each
    cell is the English. Anything else (the English section, an odd stem) is kept whole."""
    if not all(len(o) == 2 for o in q["options"]) or len(q["stemImages"]) % 2:
        return q["stemImages"], q["options"]
    return q["stemImages"][: len(q["stemImages"]) // 2], [o[:1] for o in q["options"]]


def layout(q, img_dir, en_only=False):
    """[(kind, payload, height)] rows for one question."""
    stem, options = english_half(q) if en_only else (q["stemImages"], q["options"])
    rows = [("title", f"Q{q['number']}  (PART-{q['part']})", 26)]
    for name in stem:
        w, h = image_size(os.path.join(img_dir, name))
        rows.append(("img", (name, None, w, h), h + PAD))
    for i, opt in enumerate(options):
        first = True
        for name in opt:
            w, h = image_size(os.path.join(img_dir, name))
            rows.append(("img", (name, "ABCD"[i] + ")" if first else None, w, h), h + PAD))
            first = False
        rows.append(("gap", None, 6))
    return rows


def draw(rows, img_dir, out_path):
    height = sum(r[2] for r in rows) + 2 * PAD
    width = WIDTH
    for kind, p, _ in rows:
        if kind == "img":
            width = max(width, LABEL_W + p[2] + 2 * PAD)
    doc = fitz.open()
    page = doc.new_page(width=width, height=height)
    y = PAD
    for kind, p, h in rows:
        if kind == "title":
            page.draw_line((0, y), (width, y), color=(0.6, 0.6, 0.6), width=1)
            page.insert_text((PAD, y + 19), p, fontsize=16, color=(0.1, 0.1, 0.5))
        elif kind == "img":
            name, label, w, ih = p
            if label:
                page.insert_text((PAD, y + min(ih, 22) * 0.8 + 2), label, fontsize=16)
            page.insert_image(fitz.Rect(LABEL_W, y, LABEL_W + w, y + ih), filename=os.path.join(img_dir, name))
        y += h
    page.get_pixmap(dpi=72).save(out_path)


def main():
    shift = sys.argv[1]
    here = os.path.dirname(os.path.abspath(__file__))
    data = json.load(open(os.path.join(here, "out", shift, "questions.json"), encoding="utf8"))
    img_dir = data["imgDir"]
    first = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    last = int(sys.argv[3]) if len(sys.argv) > 3 else 100
    out = os.path.join(here, "out", shift, "sheets")
    os.makedirs(out, exist_ok=True)
    for f in os.listdir(out):  # batch boundaries move between runs; never mix two runs' batches
        if f.startswith("batch-"):
            os.remove(os.path.join(out, f))
    qs =[q for q in data["questions"] if first <= q["number"] <= last]
    batch, bh = [], 0
    for q in qs:
        draw(layout(q, img_dir), img_dir, os.path.join(out, f"q{q['number']:03d}.png"))
        rows = layout(q, img_dir, en_only=True)
        h = sum(r[2] for r in rows)
        if batch and bh + h > BATCH_HEIGHT:
            draw([r for b in batch for r in b[1]], img_dir, os.path.join(out, f"batch-{batch[0][0]:03d}-{batch[-1][0]:03d}.png"))
            batch, bh = [], 0
        batch.append((q["number"], rows))
        bh += h
    if batch:
        draw([r for b in batch for r in b[1]], img_dir, os.path.join(out, f"batch-{batch[0][0]:03d}-{batch[-1][0]:03d}.png"))
    print(f"{shift}: {len(qs)} sheets -> {out}")


if __name__ == "__main__":
    main()
