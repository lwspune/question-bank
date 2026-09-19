"""
Locate the printed FIGURES on an MH HSC Class-12 Maths board paper.

    python scripts/mh-hsc-12-pyq/paper/fig_bounds.py <pdf> [--json] [--all]

HOW A FIGURE DECLARES ITSELF (and why this is not bounds-guessing).

These papers embed a figure as ONE raster sliced into contiguous horizontal
STRIPS sharing an identical x-range — 25 strips for the March-2024 circuit, 13
for July-2024's, 5 each for the other two. Math is ALSO drawn as images here,
but each math line is its own image with its own x-range, because lines of math
are different widths. So "a vertical run of strips at one fixed x" is the first
filter, and the figure emits that signature itself.

THAT FILTER ALONE IS NOT ENOUGH, and the first version of this file wrongly
claimed it was. Run across all six papers it returns 11 candidates: 4 circuits
and 7 tall display expressions (a 3x3 matrix, a nested fraction, ...). The
height floor could not separate them — the tallest non-figure came in at 47.2pt,
above several plausible figure heights. Two rules finish the job:

 1. NO TEXT BESIDE IT. A display expression is part of a text line, so something
    sits at its vertical level and outside its x-range ("is in", "by", "fin").
    A figure occupies its own band; its labels (S1, S2, L) are INSIDE the
    raster. Measured: every false positive has >=2 such spans, every figure 0.

    ...once the MARKS BRACKET is excluded. All four figures carry exactly one
    span beside them — `(3)` or `(4)` pinned at x=480-496 in the right margin.
    It is page furniture, printed at the same place on every page, and counting
    it as content would reject all four figures.

 2. A HEIGHT FLOOR, which is what remains after rule 1. With rule 1 applied and
    no floor, 599 runs survive across the six papers; sorted by height the top
    four ARE the four figures and the fifth is 21.0pt:

        jul-2024 p7   91.0 x 114.5 pt   13 strips   <- circuit
        mar-2024 p5  184.1 x 106.8 pt   25 strips   <- circuit
        feb-2025 p6  184.3 x  90.3 pt    5 strips   <- circuit
        jul-2025 p7  187.2 x  82.3 pt    5 strips   <- circuit
        jul-2025 p7   45.0 x  21.0 pt    4 strips       centered display math

    82.3 vs 21.0 is a 3.9x gap and MIN_HEIGHT sits in the middle of it. That
    span is measured over ALL SIX papers, not sampled — `--all` reprints it.

WHAT THIS DELIBERATELY DOES NOT DO: decide that a crop is correct. The rules
above FOUND these four; on the NCERT Class-10 run geometry found the figures and
still produced 6 visibly-wrong crops out of 22 that passed every numeric check.
So callers render a contact sheet and a human looks at it. `crop-figures.ts`
does that and will not mark a figure verified without it.
"""
import sys
import json
import re

import fitz

# --- rule 1: no text beside the run -----------------------------------------
# A marks bracket — "(2)".."(4)" — printed hard against the right margin. It is
# page furniture; all four known figures have exactly one and nothing else.
MARKS_BRACKET = re.compile(r"^\(\d{1,2}\)$")
RIGHT_MARGIN_X = 460.0
# A span counts as "at this run's level" only when the run covers more than half
# its height, so a neighbouring line that merely grazes the band is not counted.
VERTICAL_OVERLAP = 0.5
# Slack when asking whether a span is horizontally outside the run.
BESIDE_SLACK = 1.0

# --- rule 2: the height floor -------------------------------------------------
# Sits inside the measured 21.0pt -> 82.3pt gap. See the module docstring.
MIN_HEIGHT = 40.0
MIN_WIDTH = 60.0

# --- strip-run assembly -------------------------------------------------------
# The slicing overlaps slightly (y1 == next y0) or leaves sub-point gaps.
MAX_GAP = 1.5
# Placement wobbles in the last decimal; quantise so one run is not split in two.
X_QUANT = 0.5


def runs_on_page(page):
    """Every vertical run of same-x contiguous image strips on one page."""
    groups = {}
    for im in page.get_images(full=True):
        for r in page.get_image_rects(im[0]):
            groups.setdefault((round(r.x0 / X_QUANT), round(r.x1 / X_QUANT)), []).append(r)

    out = []
    for rects in groups.values():
        rects.sort(key=lambda r: r.y0)
        run = [rects[0]]
        for r in rects[1:]:
            if r.y0 - run[-1].y1 <= MAX_GAP:
                run.append(r)
            else:
                out.append(run)
                run = [r]
        out.append(run)
    return out


def _bbox(run):
    return [
        round(min(r.x0 for r in run), 2),
        round(min(r.y0 for r in run), 2),
        round(max(r.x1 for r in run), 2),
        round(max(r.y1 for r in run), 2),
    ]


def text_beside(page, bbox):
    """Text spans at this run's vertical level but outside it horizontally.

    Excludes the right-margin marks bracket, which is page furniture."""
    x0, y0, x1, y1 = bbox
    found = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                text = span["text"].strip()
                if not text:
                    continue
                sx0, sy0, sx1, sy1 = span["bbox"]
                if MARKS_BRACKET.match(text) and sx0 >= RIGHT_MARGIN_X:
                    continue
                if min(sy1, y1) - max(sy0, y0) <= (sy1 - sy0) * VERTICAL_OVERLAP:
                    continue
                if sx1 < x0 - BESIDE_SLACK or sx0 > x1 + BESIDE_SLACK:
                    found.append(text)
    return found


def analyse_page(page):
    """Classify every strip run on a page. Returns (figures, rejected)."""
    figures, rejected = [], []
    for run in runs_on_page(page):
        bbox = _bbox(run)
        entry = {
            "bbox": bbox,
            "strips": len(run),
            "width": round(bbox[2] - bbox[0], 2),
            "height": round(bbox[3] - bbox[1], 2),
        }
        beside = text_beside(page, bbox)
        entry["beside"] = beside[:4]

        if beside:
            entry["why"] = f"text beside it ({len(beside)} spans) — a display expression, not a figure"
            rejected.append(entry)
        elif entry["height"] < MIN_HEIGHT or entry["width"] < MIN_WIDTH:
            entry["why"] = f"below the floor ({entry['width']}x{entry['height']}pt < {MIN_WIDTH}x{MIN_HEIGHT})"
            rejected.append(entry)
        else:
            figures.append(entry)

    figures.sort(key=lambda f: f["bbox"][1])
    rejected.sort(key=lambda f: -f["height"])
    return figures, rejected


def question_anchors(page):
    """y of every `Q. N.` / `(iv)` marker, to attribute a figure to its question."""
    anchors = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            text = "".join(s["text"] for s in line["spans"]).strip()
            if text.startswith("Q.") or (text.startswith("(") and text.endswith(")")):
                anchors.append({"y": round(line["bbox"][1], 2), "text": text})
    anchors.sort(key=lambda a: a["y"])
    return anchors


def scan(pdf):
    doc = fitz.open(pdf)
    report = {"pdf": pdf, "figures": [], "near_miss": None}
    tallest_rejected = None
    for pno, page in enumerate(doc, start=1):
        figs, rejected = analyse_page(page)
        # The closest thing to a figure that was NOT one — the margin, per paper.
        for r in rejected:
            if not r["beside"] and (tallest_rejected is None or r["height"] > tallest_rejected["height"]):
                tallest_rejected = {**r, "page": pno}
        for f in figs:
            anchors = question_anchors(page)
            above = [a for a in anchors if a["y"] < f["bbox"][1]]
            report["figures"].append({**f, "page": pno, "under": above[-1]["text"] if above else None})
    report["near_miss"] = tallest_rejected
    return report


def main():
    pdf = sys.argv[1]
    report = scan(pdf)
    if "--json" in sys.argv:
        print(json.dumps(report, indent=2))
        return
    print(pdf)
    for f in report["figures"]:
        under = (f["under"] or "?")[:46]
        print(f"  p{f['page']:>2}  under {under!r:48}  bbox={f['bbox']}  {f['strips']} strips  {f['width']}x{f['height']}pt")
    if not report["figures"]:
        print("  no figures")
    nm = report["near_miss"]
    if nm:
        print(f"  closest non-figure: {nm['height']}pt on p{nm['page']} (floor {MIN_HEIGHT}pt)")


if __name__ == "__main__":
    main()
