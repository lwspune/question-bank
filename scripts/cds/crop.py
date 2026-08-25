"""Full-width hi-DPI page/region renderer for CDS match-list verification.

    python scripts/cds/crop.py <pdf> <outdir> <pageIndex> <zoom> [y0frac y1frac]

Renders the FULL WIDTH of a page (never per-column: match-list tables are
two-column blocks and a column crop splits them at the gutter). Optional
y0frac/y1frac clip a vertical band of the page so a dense block can be read at
6-8x without producing an unusably large image.
"""
import sys
import fitz

pdf, outdir, page_i, zoom = sys.argv[1], sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
y0f = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
y1f = float(sys.argv[6]) if len(sys.argv) > 6 else 1.0

doc = fitz.open(pdf)
page = doc[page_i]
r = page.rect
clip = fitz.Rect(r.x0, r.y0 + (r.y1 - r.y0) * y0f, r.x1, r.y0 + (r.y1 - r.y0) * y1f)
pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip)
name = "%s/p%02d_z%s_%s-%s.png" % (outdir, page_i, str(zoom).replace(".", ""), y0f, y1f)
pix.save(name)
print("%s  %dx%d  pages=%d" % (name, pix.width, pix.height, doc.page_count))
