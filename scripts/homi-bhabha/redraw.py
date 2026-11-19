"""
Redraw figures whose scan stays unreadable after clean-up, from what the print
itself settles (labels, values, arrangement). Never adds information the
print does not carry.

    python scripts/homi-bhabha/redraw.py            # every figure below
    python scripts/homi-bhabha/redraw.py hb-9-2018  # one paper

Writes scripts/homi-bhabha/redrawn/<paper>/qNNN.png. A figure's `redrawn` field
in its band file points crop.py at the PNG instead of the scan crop; then
refigure.ts replaces the stored image. Each function names what it copies.
"""
import os
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.patches import Circle  # noqa: E402

LANE = os.path.dirname(os.path.abspath(__file__))
plt.rcParams["font.family"] = "Times New Roman"


def save(fig, paper: str, n: int) -> None:
    out = os.path.join(LANE, "redrawn", paper)
    os.makedirs(out, exist_ok=True)
    path = os.path.join(out, f"q{n:03d}.png")
    fig.savefig(path, dpi=200, bbox_inches="tight", pad_inches=0.08, facecolor="white")
    plt.close(fig)
    print(f"redrawn: {paper} Q{n} -> {path}")


def venn(circles, regions, labels, size=(6.4, 4.2)):
    """circles: [(x, y, r)], regions: [(text, x, y)], labels: [(text, tx, ty, ax, ay)]
    where (tx, ty) is the label and (ax, ay) the arrow tip on the circle."""
    fig, ax = plt.subplots(figsize=size)
    for x, y, r in circles:
        ax.add_patch(Circle((x, y), r, fill=False, lw=1.6, color="black"))
    for t, x, y in regions:
        ax.text(x, y, t, ha="center", va="center", fontsize=17, fontweight="bold")
    for t, tx, ty, axx, ayy in labels:
        ax.text(tx, ty, t, ha="center", va="center", fontsize=15, fontweight="bold")
        # The arrow runs from just beside the label to the circle: its start is
        # 55% of the way from the label's centre to the tip, so it never sits
        # under the text and is never a stub.
        sx, sy = tx + (axx - tx) * 0.55, ty + (ayy - ty) * 0.55
        ax.annotate(
            "", xy=(axx, ayy), xytext=(sx, sy),
            arrowprops=dict(arrowstyle="-|>", mutation_scale=16, lw=1.4, color="black", shrinkA=0, shrinkB=1),
        )
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def hb_9_2018_q21():
    """Q21: three mirrors' image properties. Plane (left), Concave (right),
    Convex (below). R = Plane and Concave only, P = all three, Q = Plane and
    Convex only, S = Concave and Convex only (as printed)."""
    fig, ax = venn(
        # Wider overlaps (the Q72 proportions) so each letter sits clear of
        # every line; each letter checked to lie in its printed overlap only.
        circles=[(3.6, 3.0, 1.5), (5.4, 3.0, 1.5), (4.5, 1.55, 1.5)],
        regions=[("R", 4.5, 3.85), ("P", 4.5, 2.65), ("Q", 3.75, 2.05), ("S", 5.25, 2.05)],
        labels=[
            ("Plane\nmirror", 0.4, 3.3, 1.95, 3.3),
            ("Concave\nmirror", 8.8, 3.3, 6.9, 3.3),
            ("Convex\nmirror", 8.2, 0.5, 6.1, 0.9),
        ],
    )
    ax.set_xlim(-0.6, 9.9)
    ax.set_ylim(-0.2, 4.6)
    return fig


def hb_9_2018_q72():
    """Q72: consumers. Primary (left), Secondary (right), Top (below).
    W = Primary only, X = all three, Y = Secondary and Top only, Z = Top only
    (as printed)."""
    fig, ax = venn(
        circles=[(3.6, 3.0, 1.5), (5.4, 3.0, 1.5), (4.7, 1.55, 1.5)],
        regions=[("W", 3.0, 3.9), ("X", 4.6, 2.6), ("Y", 5.55, 2.1), ("Z", 4.7, 0.85)],
        labels=[
            ("Primary\nConsumer", 0.3, 3.0, 2.1, 3.0),
            ("Secondary\nConsumer", 8.8, 3.9, 6.75, 3.65),
            ("Top\nConsumer", 8.5, 1.3, 6.2, 1.45),
        ],
    )
    ax.set_xlim(-0.8, 9.9)
    ax.set_ylim(-0.1, 4.7)
    return fig


def hb_9_2018_q10():
    """Q10: velocity-time graph of a train, drawn on 1 cm graph paper. Copied
    from the print: scale 1 cm = 1 hour (x) and 1 cm = 10 km/hr (y); a
    horizontal line at 60 km/hr; points A and B on it at t1 = 2 h and t2 = 5 h
    with dashed drops to the time axis. The scan shows only some tick numbers
    (0, 1, 7, 9; 10, 70, 80); every tick here follows the printed scale."""
    fig, ax = plt.subplots(figsize=(6.4, 6.0))
    for x in range(0, 11):
        ax.plot([x, x], [0, 9], color="#bbbbbb", lw=0.6, zorder=0)
    for y in range(0, 10):
        ax.plot([0, 10], [y, y], color="#bbbbbb", lw=0.6, zorder=0)
    ax.annotate("", xy=(10.4, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", lw=1.4, color="black"))
    ax.annotate("", xy=(0, 9.4), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", lw=1.4, color="black"))
    for x in range(0, 10):
        ax.text(x, -0.35, str(x), ha="center", va="top", fontsize=12)
    for y in range(1, 9):
        ax.text(-0.25, y, str(y * 10), ha="right", va="center", fontsize=12)
    ax.plot([0, 9.6], [6, 6], color="black", lw=2)
    for name, t, sub in (("A", 2, "1"), ("B", 5, "2")):
        ax.plot([t], [6], "o", color="black", ms=6)
        ax.text(t, 6.3, name, ha="center", va="bottom", fontsize=15, fontweight="bold")
        ax.plot([t, t], [0, 6], color="black", lw=1.3, ls="--")
        ax.text(t + 0.15, 0.25, f"$t_{sub}$", ha="left", va="bottom", fontsize=15)
    ax.text(10.5, -0.35, "X", ha="center", va="top", fontsize=12)
    ax.text(0, 9.6, "Y", ha="center", va="bottom", fontsize=12)
    ax.text(5, -1.15, "Time (Hour)", ha="center", va="top", fontsize=14, fontweight="bold")
    ax.text(-1.3, 4.5, "Velocity (Km/Hr)", ha="center", va="center", rotation=90, fontsize=14, fontweight="bold")
    ax.text(1.2, 8.6, "Scale:\nOn X-Axis 1 cm = 1 Hour\nOn Y-Axis 1 cm = 10 Km/Hr", ha="left", va="top", fontsize=12,
            bbox=dict(facecolor="white", edgecolor="none", pad=2))
    ax.set_xlim(-1.8, 10.8)
    ax.set_ylim(-1.7, 10.1)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig


FIGURES = {
    ("hb-9-2018", 10): hb_9_2018_q10,
    ("hb-9-2018", 21): hb_9_2018_q21,
    ("hb-9-2018", 72): hb_9_2018_q72,
}


def main() -> None:
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for (paper, n), fn in FIGURES.items():
        if only and paper != only:
            continue
        save(fn(), paper, n)


if __name__ == "__main__":
    main()
