# Render PDF pages to PNG for transcription (Group C: published book chapters,
# whose stacked fractions break the text layer, so they are read from images).
#
#   python scripts/afcat/render-pages.py <pdf> <outdir> [--dpi=170] [--pages=1-3,5]
#
# Writes <outdir>/p<N>.png (1-based page numbers) and prints each path.
import os
import sys

import fitz  # PyMuPDF

pdf, out = sys.argv[1], sys.argv[2]
dpi = 170
pages = None
for a in sys.argv[3:]:
    if a.startswith("--dpi="):
        dpi = int(a[6:])
    elif a.startswith("--pages="):
        pages = set()
        for part in a[8:].split(","):
            lo, _, hi = part.partition("-")
            pages.update(range(int(lo), int(hi or lo) + 1))

os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
for i, page in enumerate(doc, start=1):
    if pages and i not in pages:
        continue
    dest = os.path.join(out, f"p{i}.png")
    page.get_pixmap(dpi=dpi).save(dest)
    print(dest)
