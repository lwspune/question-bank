# Render a paper's question pages for transcription: each page whole, plus its top and
# bottom halves (overlapping by 10%, so no question is cut in both) at a higher DPI,
# because a scanned booklet's small print is hard to read from a whole-page image.
#
#   python scripts/spi/render-pages.py <pdf> <outdir> [--columns] <page> [<page> ...]
#
# Writes pNN.png, pNN-top.png and pNN-bottom.png per page (pages are 1-based). With
# --columns (a two-column layout, the LWS mocks) the halves are cut per column instead:
# pNN-L-top, pNN-L-bottom, pNN-R-top, pNN-R-bottom, each column overlapping the
# middle by 3% so a line of the left column is never split.
import sys

import fitz  # PyMuPDF

WHOLE_DPI = 130
HALF_DPI = 220

args = sys.argv[1:]
columns = "--columns" in args
args = [a for a in args if a != "--columns"]
pdf, out, pages = args[0], args[1], [int(p) for p in args[2:]]
doc = fitz.open(pdf)


def halves(page, x0, x1, prefix):
    r = page.rect
    top = fitz.Rect(x0, r.y0, x1, r.y0 + r.height * 0.55)
    bottom = fitz.Rect(x0, r.y0 + r.height * 0.45, x1, r.y1)
    page.get_pixmap(dpi=HALF_DPI, clip=top).save(f"{prefix}-top.png")
    page.get_pixmap(dpi=HALF_DPI, clip=bottom).save(f"{prefix}-bottom.png")


for n in pages:
    page = doc[n - 1]
    r = page.rect
    page.get_pixmap(dpi=WHOLE_DPI).save(f"{out}/p{n:02d}.png")
    if columns:
        mid = r.x0 + r.width / 2
        halves(page, r.x0, mid + r.width * 0.03, f"{out}/p{n:02d}-L")
        halves(page, mid - r.width * 0.03, r.x1, f"{out}/p{n:02d}-R")
    else:
        halves(page, r.x0, r.x1, f"{out}/p{n:02d}")
    print(f"p{n:02d}")
