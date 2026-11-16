"""Print a figure region's row-ink profile, to choose exact top/bottom cuts.

    python -P scripts/ras/figure-rows.py <paperId> <q> [pad]

The auto-trimmer (trim-figures.py) needs a blank band between a stem line and the
figure; on these scans a figure often sits flush under its stem, so a person picks
the cut. Prints one token per pixel row from `pad` above the region to `pad`
below it: '.' blank, '-' light (a thin line or a sliver), '#' dense (text or a
filled shape), with the fraction every 10 rows. Text lines show as '#' runs a
few rows tall; a figure's horizontal edge is a 1-3 row spike.
"""
import json
import os
import sys

from PIL import Image

LANE = os.path.dirname(os.path.abspath(__file__))
paper, num = sys.argv[1], int(sys.argv[2])
pad = float(sys.argv[3]) if len(sys.argv) > 3 else 0.02
merged = json.load(open(os.path.join(LANE, "data", f"{paper}.merged.json"), encoding="utf-8"))
q = next(q for q in merged["questions"] if q["number"] == num)
f = q["figure"]
im = Image.open(os.path.join(LANE, "out", paper, f"p{int(f['page']):02d}.png")).convert("L")
W, H = im.size
l, t, r, b = f["region"]
x0, x1 = int(l * W), int(r * W)
px = im.load()
y0, y1 = max(0, int((t - pad) * H)), min(H, int((b + pad) * H))
line = ""
for y in range(y0, y1):
    if (y - y0) % 10 == 0:
        line += f" {y / H:.4f}:"
    v = sum(1 for x in range(x0, x1) if px[x, y] < 140)
    line += "." if v <= 2 else ("-" if v < 0.08 * (x1 - x0) else "#")
print(f"Q{num} page {f['page']} region {f['region']} (x {l}-{r})")
print(line)
