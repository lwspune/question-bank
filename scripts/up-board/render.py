"""Render one UP Board paper's pages for transcription.

    py scripts/up-board/render.py <paperId> [--dpi=150]
    py scripts/up-board/render.py --all

Writes scripts/up-board/out/<paperId>/pNN.png (1-based page numbers) and
contact.png, a labelled thumbnail sheet of the whole scan: one look shows which
pages are Hindi and which English, and whether the scan skipped pages.

The scans have no text layer, so everything is read from these images. The
paper id is "<year>-<code>-<series>" (scripts/up-board/lib.ts parsePaperFile).
Uses `py` (PyMuPDF lives in the user site-packages), so run it as
`py scripts/up-board/render.py`, never `python -I`.
"""
import os
import re
import sys

import pymupdf
from PIL import Image, ImageDraw

SOURCE_ROOT = r"C:\Vilas\LWS_Pune\UP_Board\PYQPs"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
SUBJECT_WORD = {"822": ("10", "mathematics"), "824": ("10", "science"), "324": ("12", "mathematics"),
                "346": ("12", "physics"), "347": ("12", "chemistry"), "348": ("12", "biology")}


def pdf_for(paper_id: str) -> str:
    m = re.fullmatch(r"(20\d\d)-(\d{3})-([A-Z]{2})", paper_id)
    if not m:
        sys.exit(f"bad paper id {paper_id!r}: want e.g. 2025-822-BW")
    year, code, series = m.groups()
    cls, word = SUBJECT_WORD[code]
    return os.path.join(SOURCE_ROOT, f"up-board-class-{cls}-{word}-{code}-{series.lower()}-{year}.pdf")


def render(paper_id: str, dpi: int) -> None:
    src = pdf_for(paper_id)
    out = os.path.join(OUT, paper_id)
    os.makedirs(out, exist_ok=True)
    doc = pymupdf.open(src)
    thumbs = []
    for i, page in enumerate(doc, start=1):
        pix = page.get_pixmap(dpi=dpi)
        pix.save(os.path.join(out, f"p{i:02d}.png"))
        t = page.get_pixmap(dpi=36)
        img = Image.frombytes("RGB", (t.width, t.height), t.samples)
        ImageDraw.Draw(img).text((6, 6), f"p{i}", fill=(220, 0, 0))
        thumbs.append(img)
    cols = 6
    w = max(t.width for t in thumbs)
    h = max(t.height for t in thumbs)
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (w * cols, h * rows), "white")
    for k, t in enumerate(thumbs):
        sheet.paste(t, ((k % cols) * w, (k // cols) * h))
    sheet.save(os.path.join(out, "contact.png"))
    print(f"{paper_id}: {doc.page_count} pages -> {out}")


def all_ids() -> list:
    ids = []
    for f in sorted(os.listdir(SOURCE_ROOT)):
        m = re.fullmatch(r"up-board-class-(?:10|12)-[a-z]+-(\d{3})-([a-z]{2})-(20\d\d)\.pdf", f)
        if m:
            ids.append(f"{m.group(3)}-{m.group(1)}-{m.group(2).upper()}")
    return ids


if __name__ == "__main__":
    args = sys.argv[1:]
    dpi = next((int(a.split("=")[1]) for a in args if a.startswith("--dpi=")), 150)
    ids = all_ids() if "--all" in args else [a for a in args if not a.startswith("--")]
    if not ids:
        sys.exit(__doc__)
    for pid in ids:
        render(pid, dpi)
