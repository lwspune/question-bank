# Crop book figures to PNG: the book's own drawing, never redrawn.
#
#   python scripts/afcat/crop-figures.py <jobs.json>
#
# jobs.json is a list of {pdf, page, bbox: [x0, y0, x1, y1], out}; bbox is in
# PDF points (find it with figure-boxes.py). A 6-point margin keeps labels that
# sit just outside the drawing's own lines.
import json
import sys

import fitz  # PyMuPDF

PAD = 6  # default margin; a job may set its own "pad"
DPI = 200

docs: dict[str, fitz.Document] = {}
for job in json.load(open(sys.argv[1], encoding="utf8")):
    doc = docs.setdefault(job["pdf"], fitz.open(job["pdf"]))
    page = doc[job["page"] - 1]
    x0, y0, x1, y1 = job["bbox"]
    pad = job.get("pad", PAD)
    clip = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad) & page.rect
    page.get_pixmap(clip=clip, dpi=DPI).save(job["out"])
    print(f"{job['out']}  {clip.width:.0f}x{clip.height:.0f} pt")
