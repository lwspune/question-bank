# List the figures on a book page: clusters of vector drawings (and embedded
# images) big enough to be a diagram, with their bounding boxes in PDF points.
# The transcript records a question's figure as {page, bbox}; attach-figures
# crops exactly that box, so a figure is the book's own drawing, never redrawn.
#
#   python scripts/afcat/figure-boxes.py <pdf> <page> [--min=40]
#
# Fraction bars and table rules are thin lines and are filtered out by size:
# a cluster must be at least --min points in BOTH width and height.
import sys

import fitz  # PyMuPDF

pdf, pno = sys.argv[1], int(sys.argv[2])
min_side = float(next((a[6:] for a in sys.argv[3:] if a.startswith("--min=")), 40))
page = fitz.open(pdf)[pno - 1]
rects = [fitz.Rect(d["rect"]) for d in page.get_drawings()]
rects += [fitz.Rect(info["bbox"]) for info in page.get_image_info() if fitz.Rect(info["bbox"]).width < page.rect.width * 0.9]

clusters: list[fitz.Rect] = []
for r in rects:
    grown = fitz.Rect(r.x0 - 4, r.y0 - 4, r.x1 + 4, r.y1 + 4)
    hit = [c for c in clusters if c.intersects(grown)]
    merged = fitz.Rect(r)
    for c in hit:
        merged |= c
        clusters.remove(c)
    clusters.append(merged)
# merging can make two clusters overlap; repeat until stable
changed = True
while changed:
    changed = False
    for i in range(len(clusters)):
        for j in range(i + 1, len(clusters)):
            if clusters[i].intersects(clusters[j]):
                clusters[i] |= clusters[j]
                del clusters[j]
                changed = True
                break
        if changed:
            break
mid = page.rect.width / 2
for c in sorted(clusters, key=lambda c: (c.x0 >= mid, c.y0)):
    if c.width >= min_side and c.height >= min_side:
        print(f"{'L' if c.x0 < mid else 'R'} bbox=[{c.x0:.0f}, {c.y0:.0f}, {c.x1:.0f}, {c.y1:.0f}] size {c.width:.0f}x{c.height:.0f}")
