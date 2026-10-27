"""Three-circle Venn counting diagrams redrawn from the numbers SSC printed in their regions
(venns.json), because SSC's pictures are ~180 px tall with small print, and the site shows a stem
picture at its own size. The numbers are the question's data, so this is the same exception as
redraw_charts.py. tests/ssc-cgl-venns.test.ts re-solves every question from venns.json and checks
SSC's key, so a number in the wrong region fails before it is drawn.

    python -P scripts/ssc-cgl/redraw_venns.py <outDir>        # writes <outDir>/<shift>/qNNN.png

Then refigure.ts <shift> <n> --from=<outDir>/<shift> puts each on its live row.

Layout follows SSC's: circle a top left, b top right, c below. A label SSC did not print stays
blank unless the question itself names it ("added" in venns.json).
"""
import json
import os
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
from matplotlib.patches import Circle  # noqa: E402

DPI = 200
SIZE = 2.56  # inches: the site shows a stem picture at most 256 px tall; 512 px is sharp at 2x
R = 1.0
CENTRES = {"a": (-0.55, 0.32), "b": (0.55, 0.32), "c": (0.0, -0.62)}
MEMBERS = {"a": "a", "b": "b", "c": "c", "ab": "ab", "ac": "ac", "bc": "bc", "abc": "abc"}


def anchors():
    """Each region's number goes at the point inside it farthest from every circle's edge."""
    xs, ys = np.meshgrid(np.linspace(-1.6, 1.6, 641), np.linspace(-1.7, 1.4, 621))
    dist = {k: np.hypot(xs - cx, ys - cy) for k, (cx, cy) in CENTRES.items()}
    inside = {k: d < R for k, d in dist.items()}
    clearance = np.min([np.abs(d - R) for d in dist.values()], axis=0)
    out = {}
    for region, members in MEMBERS.items():
        mask = np.ones_like(xs, dtype=bool)
        for k in "abc":
            mask &= inside[k] if k in members else ~inside[k]
        score = np.where(mask, clearance, -1)
        i = np.unravel_index(np.argmax(score), score.shape)
        out[region] = (xs[i], ys[i])
    return out


def draw(v, spots, path):
    fig, ax = plt.subplots(figsize=(SIZE, SIZE), dpi=DPI)
    for cx, cy in CENTRES.values():
        ax.add_patch(Circle((cx, cy), R, fill=False, linewidth=1.4, edgecolor="black"))
    for region, (x, y) in spots.items():
        ax.text(x, y, str(v["regions"][region]), ha="center", va="center", fontsize=11)
    a, b, c = v["labels"]
    # Top labels sit at the outer edges, as SSC prints them, so two long names never meet.
    ax.text(-1.6, 1.42, a, ha="left", va="bottom", fontsize=9.5, fontweight="bold")
    ax.text(1.6, 1.42, b, ha="right", va="bottom", fontsize=9.5, fontweight="bold")
    if c:
        ax.text(0.0, -1.70, c, ha="center", va="top", fontsize=9.5, fontweight="bold")
    ax.set_xlim(-1.75, 1.75)
    ax.set_ylim(-2.0, 1.75)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.subplots_adjust(0, 0, 1, 1)
    fig.savefig(path, dpi=DPI, facecolor="white")
    plt.close(fig)


def main():
    out = sys.argv[1]
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "venns.json"), encoding="utf8") as f:
        venns = json.load(f)
    spots = anchors()
    for v in venns:
        d = os.path.join(out, v["shift"])
        os.makedirs(d, exist_ok=True)
        draw(v, spots, os.path.join(d, f"q{v['n']:03d}.png"))
        print(f"{v['shift']} Q{v['n']}: {' / '.join(l or '(no label)' for l in v['labels'])}")


if __name__ == "__main__":
    main()
