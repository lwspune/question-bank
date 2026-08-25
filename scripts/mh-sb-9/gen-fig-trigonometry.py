"""Generate trigonometry-9.fig.json from MEASURED ink bounds.

The bboxes attach-images.ts wants are fractional, but the trustworthy input is
pixel ink-extents measured off the rendered page (a column-profile probe), not
eyeballed fractions — eyeballing a downscaled render is how earlier chapters in
this pipeline shipped clipped crops (Geography clipped a point label and a
caption; Parallel Lines caught a pink banner). So the pixel numbers below are the
source of record and the fractions are derived here.

Each figure's `ink` is the measured extent of its drawing PLUS its "Fig. N.M"
caption — the caption is kept deliberately, because every one of these stems
refers to its figure BY NUMBER, so a cropped-off caption breaks the reference the
question depends on.

PAD is symmetric and small; the gaps between adjacent figures were measured at
30px+, so padding cannot bleed one figure into its neighbour.

Run from the repo root:  python scripts/mh-sb-9/gen-fig-trigonometry.py

Lives OUTSIDE data/ deliberately: .gitignore excludes `scripts/*/data/_*`, so a
generator parked beside its output would be untracked and the measured pixel
bounds -- the only record of WHY each bbox is what it is -- would be lost, leaving
only the derived fractions in fig.json with nothing to justify them.
"""
import json
import os

W, H = 1786, 2526          # 3x render of the source page
PAD = 14

# (figure, page, x0, y0, x1, y1 of measured ink, [refs sharing this figure])
FIGURES = [
    # ── p-113, Practice set 8.1. Left column; question text is in the right
    #    column, so nothing here can capture a stem.
    ("Fig. 8.12", 113,  357, 1091,  606, 1274, ["Ex 8.1 Q1(i)", "Ex 8.1 Q1(ii)", "Ex 8.1 Q1(iii)", "Ex 8.1 Q1(iv)"]),
    ("Fig. 8.13", 113,  391, 1325,  546, 1612, ["Ex 8.1 Q2(i)", "Ex 8.1 Q2(ii)", "Ex 8.1 Q2(iii)", "Ex 8.1 Q2(iv)"]),
    ("Fig. 8.14", 113,  349, 1673,  598, 1911, ["Ex 8.1 Q3(i)", "Ex 8.1 Q3(ii)", "Ex 8.1 Q3(iii)", "Ex 8.1 Q3(iv)"]),
    ("Fig. 8.15", 113,  280, 1951,  636, 2192, ["Ex 8.1 Q4(i)", "Ex 8.1 Q4(ii)"]),
    # ── p-122, Problem set 8. RIGHT column. The left column carries the question
    #    text out to x~1046, so the crop must start well right of that; and the
    #    end-of-chapter ornament at y 2171..2205 is deliberately excluded.
    ("Fig. 8.26", 122, 1207, 1030, 1524, 1299, ["Prob Q2"]),
    ("Fig. 8.27", 122, 1170, 1329, 1536, 1586, ["Prob Q3"]),
    ("Fig. 8.28", 122, 1174, 1620, 1558, 1882, ["Prob Q4"]),
]

entries = []
print(f"{'figure':<10} {'page':>4}  bbox (fractional)                     px w x h   refs")
for name, page, x0, y0, x1, y1, refs in FIGURES:
    bx0, by0 = max(0, x0 - PAD), max(0, y0 - PAD)
    bx1, by1 = min(W, x1 + PAD), min(H, y1 + PAD)
    bbox = [round(bx0 / W, 4), round(by0 / H, 4), round(bx1 / W, 4), round(by1 / H, 4)]
    print(f"{name:<10} {page:>4}  {str(bbox):<38} {bx1-bx0:>4}x{by1-by0:<4}  {len(refs)}")
    for ref in refs:
        entries.append({"ref": ref, "page": page, "bbox": bbox, "_figure": name})

# Sanity: no two figures on a page may overlap vertically, or a crop shows its
# neighbour and the "which figure is this?" reference silently becomes ambiguous.
for page in {f[1] for f in FIGURES}:
    bands = sorted((f[3] - PAD, f[5] + PAD, f[0]) for f in FIGURES if f[1] == page)
    for (a0, a1, an), (b0, b1, bn) in zip(bands, bands[1:]):
        assert a1 <= b0, f"OVERLAP on page {page}: {an} ends {a1}, {bn} starts {b0}"
    print(f"page {page}: {len(bands)} figures, no vertical overlap")

# Anchored to THIS file, never os.getcwd(): a manifest whose paths depend on the
# directory you happened to run from silently rewrites itself (see SUGGESTIONS.md).
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "trigonometry-9.fig.json")
with open(out, "w", encoding="utf-8") as fh:
    json.dump(entries, fh, indent=1)
    fh.write("\n")
print(f"\nwrote {len(entries)} entries ({len(FIGURES)} distinct figures) -> {os.path.basename(out)}")
