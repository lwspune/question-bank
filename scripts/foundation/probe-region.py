"""
Render a slice of a worksheet page with a PDF-point grid drawn over it, so a
figure bbox can be READ OFF the page instead of guessed at.

    python probe-region.py <pdf> <page0> <x0> <y0> <x1> <y1> <out.png> [zoom]

Grid lines every 10pt (light) and 50pt (labelled). Coordinates are PDF points in
the page's own space, which is exactly what data/<id>.figures.json stores, so a
value read off this image can be typed straight into the manifest.

Use it in pairs: probe a generous region to choose the bbox, then render the
chosen bbox alone and LOOK at it. The second step is not optional — a geometric
check can be satisfied by a crop that is visibly wrong, which is how a numbered
answer statement ended up inside a figure on this corpus.
"""
import sys

import fitz

pdf, page0 = sys.argv[1], int(sys.argv[2])
x0, y0, x1, y1 = (float(v) for v in sys.argv[3:7])
out = sys.argv[7]
zoom = float(sys.argv[8]) if len(sys.argv) > 8 else 3.0

doc = fitz.open(pdf)
page = doc[page0]
pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=fitz.Rect(x0, y0, x1, y1))
pix.save(out)

from PIL import Image, ImageDraw

img = Image.open(out).convert("RGB")
d = ImageDraw.Draw(img)


def sx(v):
    return (v - x0) * zoom


def sy(v):
    return (v - y0) * zoom


v = int(x0 // 10 * 10)
while v <= x1:
    if v >= x0:
        major = v % 50 == 0
        d.line([(sx(v), 0), (sx(v), img.height)],
               fill=(255, 0, 0) if major else (255, 190, 190), width=2 if major else 1)
        if major:
            d.text((sx(v) + 2, 2), str(v), fill=(255, 0, 0))
    v += 10

v = int(y0 // 10 * 10)
while v <= y1:
    if v >= y0:
        major = v % 50 == 0
        d.line([(0, sy(v)), (img.width, sy(v))],
               fill=(0, 0, 255) if major else (190, 190, 255), width=2 if major else 1)
        if major:
            d.text((2, sy(v) + 2), str(v), fill=(0, 0, 255))
    v += 10

img.save(out)
print(f"{out}  region x[{x0},{x1}] y[{y0},{y1}]  zoom {zoom}")
