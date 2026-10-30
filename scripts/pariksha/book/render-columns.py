"""Render a scanned two-column book chapter into column images for the agents.

    python -P scripts/pariksha/book/render-columns.py "<chapter.pdf>" <WORK> <testId>

Writes <WORK>/render/<testId>/pNNN_L.jpg and pNNN_R.jpg (each page split down the middle,
the same split render.ts uses, so a figure's bbox fractions mean the same thing), JPEG at
zoom 2.6 to keep a 40-page chapter near 15 MB. Prints one line per chapter.
"""
import os
import sys

import fitz

pdf, work, test_id = sys.argv[1], sys.argv[2], sys.argv[3]
out = os.path.join(work, "render", test_id)
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
zoom = fitz.Matrix(2.6, 2.6)
for i, page in enumerate(doc):
    r = page.rect
    mid = r.x0 + r.width / 2
    for tag, clip in (("L", fitz.Rect(r.x0, r.y0, mid + 4, r.y1)), ("R", fitz.Rect(mid - 4, r.y0, r.x1, r.y1))):
        page.get_pixmap(matrix=zoom, clip=clip).save(os.path.join(out, "p%03d_%s.jpg" % (i + 1, tag)), jpg_quality=85)
print(f"{test_id}: {len(doc)} pages -> {out}")
