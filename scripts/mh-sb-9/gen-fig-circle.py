"""Generate circle-9.fig.json from MEASURED ink bounds.

Question-side figures only (`image_url`). The SEVEN construction diagrams are a
different artifact entirely — they are authored answers and live in
`circle-9.solution-images.json` (`solution_image_url`, migration 0042).

The bounds below come from two probes, not from eyeballing: a vertical ink
profile to find each figure's band, then a per-band HORIZONTAL gutter scan to
find where the question text stops and the figure starts. A fixed column
boundary does not work on these pages — the text column's right edge varies line
by line, so a boundary tight enough to exclude text above one figure clips the
left edge of another. Measured gutters (text-right -> figure-left):
    Fig 6.19  1011 -> 1117   (106 px)
    Fig 6.20   996 -> 1074   ( 78 px)
    Fig 6.21   890 -> 1044   (154 px)
PAD is 14, so the smallest clearance left is 64 px — a crop cannot reach text.

Each figure's band INCLUDES its "Fig. N.M" caption: every one of these stems
cites its figure by number, so a cropped-off caption breaks the reference the
question depends on. On p-96 the caption is a SEPARATE column group from the
drawing (it sits to the right), which is why the x-range spans both.

Run from the repo root:  python scripts/mh-sb-9/gen-fig-circle.py
"""
import json
import os

W, H = 1786, 2526
PAD = 14

# (figure, page, x0, y0, x1, y1 measured ink, [refs])
FIGURES = [
    # p-88: Practice set 6.1 Q5 — two concentric circles, chord AB of the bigger
    # cutting the smaller at P and Q. The stem names the points but not their
    # ORDER along AB, which is what the figure supplies.
    # y runs to 1872, NOT 1813: the drawing ends at 1813 and the "Fig. 6.9"
    # caption is a SEPARATE ink run at 1837-1872, 24 px below it. The first
    # crop stopped at the drawing and silently dropped the caption — and the
    # stem cites the figure BY NUMBER, so that crop broke the reference the
    # question depends on. Caught by eyeballing the contact sheet, not by any
    # geometric check: a crop that loses a caption is still a valid rectangle.
    ("Fig. 6.9",  88, 1279, 1588, 1529, 1872, ["Ex 6.1 Q5"]),
    # p-96: Problem set 6. Drawing and caption are separate column groups here.
    ("Fig. 6.19", 96, 1117,  546, 1579,  861, ["Prob Q4"]),
    ("Fig. 6.20", 96, 1074,  974, 1575, 1308, ["Prob Q5"]),
    ("Fig. 6.21", 96, 1044, 1367, 1583, 1784, ["Prob Q6"]),
]

entries = []
print(f"{'figure':<10} {'page':>4}  bbox (fractional)                      px w x h   refs")
for name, page, x0, y0, x1, y1, refs in FIGURES:
    bx0, by0 = max(0, x0 - PAD), max(0, y0 - PAD)
    bx1, by1 = min(W, x1 + PAD), min(H, y1 + PAD)
    bbox = [round(bx0 / W, 4), round(by0 / H, 4), round(bx1 / W, 4), round(by1 / H, 4)]
    print(f"{name:<10} {page:>4}  {str(bbox):<38} {bx1-bx0:>4}x{by1-by0:<4}  {refs}")
    for ref in refs:
        entries.append({"ref": ref, "page": page, "bbox": bbox, "_figure": name})

# No two figures on a page may overlap vertically, or a crop shows its neighbour
# and "which figure is this?" becomes ambiguous.
for page in {f[1] for f in FIGURES}:
    bands = sorted((f[3] - PAD, f[5] + PAD, f[0]) for f in FIGURES if f[1] == page)
    for (a0, a1, an), (b0, b1, bn) in zip(bands, bands[1:]):
        assert a1 <= b0, f"OVERLAP on page {page}: {an} ends {a1}, {bn} starts {b0}"
    print(f"page {page}: {len(bands)} figure(s), no vertical overlap")

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "circle-9.fig.json")
with open(out, "w", encoding="utf-8") as fh:
    json.dump(entries, fh, indent=1)
    fh.write("\n")
print(f"\nwrote {len(entries)} entries ({len(FIGURES)} figures) -> {os.path.basename(out)}")
