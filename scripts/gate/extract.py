"""
GATE lane, step 1: render a paper's pages, dump its text layer, and draft its figures.

    python -I scripts/gate/extract.py 2026-cs1

Reads  <ROOT>/src/<paper>-paper.pdf  (the organising IIT's master question paper).
Writes <ROOT>/work/<paper>/
    pages/p<NN>.png      every page at 150 dpi, for the transcribers to read
    text/p<NN>.txt       the page's text layer, exact strings (code, numbers) to copy from
    anchors.json         {"<n>": [page, y]} where each question starts
    figures.json         every embedded picture: page, bbox, the question it sits under
    cand/Q<nn>_<k>.png   that picture cut from the RENDERED page (so labels drawn over it stay)
    contact.png          all candidates on one sheet, labelled. LOOK at it.

The candidates are drafts: a person decides which question carries which figure, and
whether a figure is a vector drawing the image scan cannot see (the transcription says
so with "figure": true and the crop is then made by hand from the page).

The GATE papers carry a full-page background image (2026: 1140x1600 on every page) and a
logo on every page; an image size that recurs on 5+ pages is page furniture, not a figure.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).parent))  # our own lane folder only (run with -P)
from pdfclean import clean_doc  # noqa: E402

ROOT = Path(r"C:\tmp\PYQPs\GATE\CS")
ANCHOR = re.compile(r"^Q\s*\.?\s*(\d{1,2})\b(?!\s*[–-]\s*Q)")
FURNITURE_PAGES = 5
MIN_SIDE = 40  # px; smaller images are bullets and rules


def line_texts(page):
    """(y0, x0, text) for every text line on the page, top to bottom."""
    out = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(span["text"] for span in line["spans"]).strip()
            if text:
                out.append((line["bbox"][1], line["bbox"][0], text))
    return sorted(out)


def find_anchors(doc):
    """Question starts in reading order. A line opening "Q.<n>" near the left margin, taken
    only when <n> moves forward by 1-3 (a section header "Q.1 – Q.5 carry ONE mark" and a
    repeated number in the text are skipped)."""
    anchors, expected = {}, 1
    for i, page in enumerate(doc):
        width = page.rect.width
        for y, x, text in line_texts(page):
            m = ANCHOR.match(text)
            if not m or x > 0.25 * width:
                continue
            n = int(m.group(1))
            if expected <= n <= expected + 2 and n not in anchors:
                anchors[n] = [i, round(y, 1)]
                expected = n + 1
    return anchors


def owner_of(anchors, page, y):
    """The question whose block holds (page, y): the last anchor at or before it."""
    best = None
    for n, (p, ay) in anchors.items():
        if (p, ay) <= (page, y + 2) and (best is None or (p, ay) > tuple(anchors[best])):
            best = n
    return best


def main(paper):
    src = ROOT / "src" / f"{paper}-paper.pdf"
    work = ROOT / "work" / paper
    for sub in ("pages", "text", "cand"):
        (work / sub).mkdir(parents=True, exist_ok=True)
    doc = fitz.open(src)

    for i, page in enumerate(doc):
        page.get_pixmap(dpi=150).save(work / "pages" / f"p{i + 1:02d}.png")
        (work / "text" / f"p{i + 1:02d}.txt").write_text(page.get_text(), encoding="utf-8")

    anchors = find_anchors(doc)
    missing = sorted(set(range(1, 66)) - set(anchors))
    (work / "anchors.json").write_text(json.dumps(anchors, indent=1), encoding="utf-8")

    sizes = Counter()
    for page in doc:
        for info in page.get_image_info():
            sizes[(info["width"], info["height"])] += 1
    furniture = {s for s, c in sizes.items() if c >= FURNITURE_PAGES}

    # Candidates are cut from a copy with the logo and watermarked background deleted.
    clean, _ = clean_doc(src)
    figures, per_q = [], Counter()
    for i, page in enumerate(doc):
        for info in page.get_image_info():
            w, h = info["width"], info["height"]
            if (w, h) in furniture or min(w, h) < MIN_SIDE:
                continue
            x0, y0, x1, y1 = info["bbox"]
            n = owner_of(anchors, i, y0)
            per_q[n] += 1
            name = f"Q{(n or 0):02d}_{per_q[n]}.png"
            clip = fitz.Rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4) & page.rect
            clean[i].get_pixmap(dpi=200, clip=clip).save(work / "cand" / name)
            figures.append({"question": n, "page": i + 1, "bbox": [round(v, 1) for v in (x0, y0, x1, y1)],
                            "pixels": [w, h], "file": name})
    (work / "figures.json").write_text(json.dumps(figures, indent=1), encoding="utf-8")
    contact_sheet(work, figures)
    print(f"{paper}: {doc.page_count} pages, {len(anchors)} anchors (missing {missing or 'none'}), "
          f"{len(figures)} picture(s) under {len(set(f['question'] for f in figures))} question(s), "
          f"furniture sizes {sorted(furniture)}")


def contact_sheet(work, figures, cell=320):
    if not figures:
        return
    cols = 4
    rows = (len(figures) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 24)), "white")
    draw = ImageDraw.Draw(sheet)
    for k, f in enumerate(figures):
        im = Image.open(work / "cand" / f["file"]).convert("RGB")
        im.thumbnail((cell - 8, cell - 8))
        x, y = (k % cols) * cell, (k // cols) * (cell + 24)
        sheet.paste(im, (x + 4, y + 24))
        draw.text((x + 4, y + 4), f"{f['file']}  p{f['page']}", fill="black")
    sheet.save(work / "contact.png")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: extract.py <year>-cs<set>, e.g. 2026-cs1")
    main(sys.argv[1])
