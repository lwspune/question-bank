# Render a paper's question pages for transcription: each page whole, plus its top and
# bottom halves (overlapping by 10%, so no question is cut in both) at a higher DPI,
# because a scanned booklet's small print is hard to read from a whole-page image.
#
#   python scripts/spi/render-pages.py <pdf> <outdir> <page> [<page> ...]
#
# Writes pNN.png, pNN-top.png and pNN-bottom.png per page (pages are 1-based).
import sys

import fitz  # PyMuPDF

WHOLE_DPI = 130
HALF_DPI = 220

pdf, out, pages = sys.argv[1], sys.argv[2], [int(p) for p in sys.argv[3:]]
doc = fitz.open(pdf)
for n in pages:
    page = doc[n - 1]
    r = page.rect
    page.get_pixmap(dpi=WHOLE_DPI).save(f"{out}/p{n:02d}.png")
    top = fitz.Rect(r.x0, r.y0, r.x1, r.y0 + r.height * 0.55)
    bottom = fitz.Rect(r.x0, r.y0 + r.height * 0.45, r.x1, r.y1)
    page.get_pixmap(dpi=HALF_DPI, clip=top).save(f"{out}/p{n:02d}-top.png")
    page.get_pixmap(dpi=HALF_DPI, clip=bottom).save(f"{out}/p{n:02d}-bottom.png")
    print(f"p{n:02d}")
