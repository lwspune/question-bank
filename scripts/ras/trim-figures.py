"""Propose tighter figure regions: drop a text sliver at the top or bottom of a crop.

usage: python -P scripts/ras/trim-figures.py <paperId> <q> [<q> ...]   (after merge.ts --apply)

Within the region, a row is "blank" when it has <=2 dark pixels. If the region
OPENS with ink followed by a blank run of >=3 rows inside its top 18%, the top
moves to the middle of that blank run (a sliver of stem text sat above the
figure). The same from the bottom. Prints the proposed region; edits nothing.
"""
import json
import os
import sys

from PIL import Image

LANE = r"C:\Users\vilas\Downloads\qb-ras\scripts\ras"
paper = sys.argv[1]
want = {int(x) for x in sys.argv[2:]}
merged = json.load(open(os.path.join(LANE, "data", f"{paper}.merged.json"), encoding="utf-8"))
for q in merged["questions"]:
    if q["number"] not in want or not q.get("figure"):
        continue
    f = q["figure"]
    im = Image.open(os.path.join(LANE, "out", paper, f"p{int(f['page']):02d}.png")).convert("L")
    W, H = im.size
    l, t, r, b = f["region"]
    x0, x1, y0, y1 = int(l * W), int(r * W), int(t * H), int(b * H)
    px = im.load()
    rows = [sum(1 for x in range(x0, x1) if px[x, y] < 140) for y in range(y0, y1)]
    n = len(rows)

    def blank_runs(seq):
        runs, s = [], None
        for i, v in enumerate(seq + [99]):
            if v <= 2 and s is None:
                s = i
            if v > 2 and s is not None:
                if i - s >= 3:
                    runs.append((s, i))
                s = None
        return runs

    runs = blank_runs(rows)
    new_t, new_b = y0, y1
    if rows and rows[0] > 2:
        top = [rn for rn in runs if rn[1] <= n * 0.18]
        if top:
            new_t = y0 + (top[0][0] + top[0][1]) // 2
    if rows and rows[-1] > 2:
        bot = [rn for rn in runs if rn[0] >= n * 0.82]
        if bot:
            new_b = y0 + (bot[-1][0] + bot[-1][1]) // 2
    prop = [l, round(new_t / H, 4), r, round(new_b / H, 4)]
    print(q["number"], "page", f["page"], f["region"], "->", prop)
