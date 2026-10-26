"""Cut a review-sheet screenshot into 1700 px parts, trimming the blank tail.

    python split-sheet.py <dir> <tag> <batch> [<batch> ...]

Reads <dir>/<batch>.png, writes <dir>/<batch>-<tag>-p<n>.png. Called by
sheet-shots.ps1. Needs Pillow.
"""
import os
import sys

from PIL import Image

out, tag, batches = sys.argv[1], sys.argv[2], sys.argv[3:]
for b in batches:
    im = Image.open(os.path.join(out, b + ".png")).convert("RGB")
    w, h = im.size
    px = im.load()
    last = h - 1
    while last > 0 and all(px[x, last] == (255, 255, 255) for x in range(0, w, 20)):
        last -= 1
    n = 0
    for top in range(0, last + 1, 1700):
        n += 1
        im.crop((0, top, w, min(top + 1700, last + 10))).save(os.path.join(out, f"{b}-{tag}-p{n}.png"))
    print(b, n)
