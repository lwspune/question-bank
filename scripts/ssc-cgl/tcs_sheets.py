"""Reading sheets for one TCS shift (2022-2024 response sheets): what the transcriber reads.

    python -P scripts/ssc-cgl/tcs_sheets.py <shiftId>

Reads out/<shiftId>/questions.json (assemble-tcs.ts) for each question's printed regions,
and renders them from a MASKED copy of the PDF page:
- the option text's key colours (green = correct, red = wrong) are repainted the body's dark
  grey in the content stream, so every option prints alike;
- the tick and cross icons beside the options are painted over in white;
- the right-hand panel (Question ID, Status, Chosen Option: the candidate's own answer) is
  painted over in white.
It then checks the masked page: any text left in a key colour inside a region aborts the run.
Writes out/<shiftId>/sheets/qNNN.png (one question, its GLOBAL number on top; a sheet prints
the number within its section) and batch-NNN-MMM.png (consecutive questions). text.txt, the
text layer, is written beside them by assemble-tcs.ts.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF
from PIL import Image, ImageDraw, ImageFont

ZOOM = 2.0
PAD = 4  # points around a region
BATCH_HEIGHT = 2600
DARK = b"0.14502 0.14502 0.14502 rg"
KEY_FILLS = [b"0.964844 0.0939941 0.0939941 rg", b"0.250977 0.777344 0.293945 rg"]
KEY_COLORS = {0xF61818, 0x40C64B}
PANEL_LABEL = re.compile(r"^(Question ID|Option \d ID|Status|Chosen Option)\s*:")
LEFT = 25


def mask_page(doc, page):
    """Repaint key colours, white out icons and the panel. Returns the panel's left edge."""
    for xref in page.get_contents():
        stream = doc.xref_stream(xref)
        for fill in KEY_FILLS:
            stream = stream.replace(fill, DARK)
        doc.update_stream(xref, stream)
    spans = [s for b in page.get_text("dict")["blocks"] if b["type"] == 0 for l in b["lines"] for s in l["spans"]]
    labels = [s for s in spans if PANEL_LABEL.match(s["text"].strip())]
    panel = min((s["bbox"][0] for s in labels), default=380.0) - 1
    for s in spans:
        if s["bbox"][0] >= panel or s["text"].strip().startswith("Chosen Option"):
            page.draw_rect(fitz.Rect(s["bbox"]) + (-1, -1, 1, 1), color=None, fill=(1, 1, 1), overlay=True)
    for info in page.get_image_info():
        x0, y0, x1, y1 = info["bbox"]
        if x1 - x0 < 20 and y1 - y0 < 16:
            page.draw_rect(fitz.Rect(x0, y0, x1, y1) + (-1, -1, 1, 1), color=None, fill=(1, 1, 1), overlay=True)
    return panel


def check_masked(page, clip, where):
    for b in page.get_text("dict", clip=clip)["blocks"]:
        if b["type"] != 0:
            continue
        for l in b["lines"]:
            for s in l["spans"]:
                if s["color"] in KEY_COLORS and s["text"].strip():
                    sys.exit(f"{where}: key colour survived masking: {s['text'][:40]!r}")


def label(img, text):
    font = ImageFont.load_default(size=30)
    head = Image.new("RGB", (img.width, 44), "white")
    ImageDraw.Draw(head).text((8, 6), text, fill=(180, 0, 0), font=font)
    out = Image.new("RGB", (img.width, img.height + 44), "white")
    out.paste(head, (0, 0))
    out.paste(img, (0, 44))
    return out


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: tcs_sheets.py <shiftId>")
    shift = sys.argv[1]
    base = os.path.dirname(os.path.abspath(__file__))
    qfile = os.path.join(base, "out", shift, "questions.json")
    data = json.load(open(qfile, encoding="utf8"))
    if data.get("format") != "tcs":
        sys.exit(f"{qfile} is not a TCS shift: use sheets.py")
    out_dir = os.path.join(base, "out", shift, "sheets")
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(data["pdf"])
    panels = {}
    crops = []
    for q in data["questions"]:
        parts = []
        for r in q["regions"]:
            page = doc[r["page"]]
            if r["page"] not in panels:
                panels[r["page"]] = mask_page(doc, page)
            clip = fitz.Rect(LEFT, r["y0"] - PAD, page.rect.width - 20, r["y1"] + PAD)
            check_masked(page, clip, f"{shift} Q{q['number']}")
            pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip)
            parts.append(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
        img = Image.new("RGB", (max(p.width for p in parts), sum(p.height for p in parts)), "white")
        y = 0
        for p in parts:
            img.paste(p, (0, y))
            y += p.height
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
