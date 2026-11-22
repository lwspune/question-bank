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


def hb_9_2023_q3():
    """Q3: cross-section of a reservoir in a cold region (the retype's pasted
    scan, label बर्फ written as Ice). Copied from the print: an ice band at the
    top (0 °C), -1 °C in the air at the right bank, layer lines with 1 °C, 2 °C,
    3 °C and 4 °C beside them on the right, and arrows P (ice), S, Q, R, T from
    the left into successively deeper layers. Bank weeds left out (decoration).
    Coordinates follow the scan (478 x 279 px, y downward)."""
    fig, ax = plt.subplots(figsize=(6.4, 3.9))
    left = [(0, 40), (95, 42), (108, 58), (125, 85), (140, 112), (158, 140), (172, 158), (188, 168),
            (198, 190), (212, 210), (230, 228), (240, 248), (252, 262), (275, 268)]
    right = [(275, 268), (295, 262), (305, 240), (318, 218), (334, 192), (352, 163), (372, 138),
             (400, 110), (424, 80), (438, 58), (446, 40), (462, 22), (478, 20)]
    xs, ys = zip(*(left + right[1:]))
    ax.plot(xs, ys, color="black", lw=1.8)

    def span(y):
        """x of the left and right wall at height y."""
        def cross(pts):
            for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
                if min(y0, y1) <= y <= max(y0, y1) and y0 != y1:
                    return x0 + (x1 - x0) * (y - y0) / (y1 - y0)
            raise ValueError(y)
        return cross(left[1:]), cross(right[:-1])

    a, b = span(58), span(70)
    ax.fill([a[0], a[1], b[1], b[0]], [58, 58, 70, 70], color="#9a9a9a", lw=0)
    ax.plot([a[0], a[1]], [58, 58], color="black", lw=1.2)
    ax.plot([b[0], b[1]], [70, 70], color="black", lw=1.2)
    for y in (112, 163, 218):
        l, r = span(y)
        ax.plot([l, r], [y, y], color="black", lw=1.4)
    for t, y in (("P", 64), ("S", 97), ("Q", 145), ("R", 192), ("T", 244)):
        lx = 30
        ax.text(lx, y, t, ha="center", va="center", fontsize=14, fontweight="bold")
        wall = span(y)[0]
        ax.annotate("", xy=(wall + (8 if t == "T" else 18), y), xytext=(lx + 12, y),
                    arrowprops=dict(arrowstyle="-|>", mutation_scale=12, lw=1.1, color="black", shrinkA=0, shrinkB=0))
    ax.text(270, 46, "Ice", ha="center", va="bottom", fontsize=13, fontweight="bold")
    for t, x, y in (("−1 °C", 455, 12), ("0 °C", 418, 50), ("1 °C", 382, 104), ("2 °C", 338, 155),
                    ("3 °C", 312, 192), ("4 °C", 284, 244)):
        ax.text(x, y, t, ha="center", va="center", fontsize=12, fontweight="bold")
    ax.set_xlim(0, 485)
    ax.set_ylim(278, 0)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig


def hb_9_2023_q55():
    """Q55: Venn diagram of oxides. Copied from the print: a rectangle M (label
    outside its top-right corner) holding two overlapping circles, P (left
    circle only), R (overlap), Q (right circle only), and S inside the
    rectangle outside both circles."""
    fig, ax = plt.subplots(figsize=(5.2, 3.6))
    ax.add_patch(plt.Rectangle((0, 0), 10, 6.6, fill=False, lw=1.6, color="black"))
    ax.text(10.25, 6.75, "M", ha="left", va="bottom", fontsize=16, fontweight="bold")
    for x in (3.4, 5.2):
        ax.add_patch(Circle((x, 3.3), 1.9, fill=False, lw=1.6, color="black"))
    for t, x in (("P", 2.4), ("R", 4.3), ("Q", 6.2)):
        ax.text(x, 3.3, t, ha="center", va="center", fontsize=17, fontweight="bold")
    ax.text(8.5, 3.3, "S", ha="center", va="center", fontsize=17, fontweight="bold")
    ax.set_xlim(-0.3, 11.2)
    ax.set_ylim(-0.3, 7.4)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig


def hb_9_2023_q88():
    """Q88: Venn diagram in a frame. Copied from the print: two overlapping
    circles, 'Herbivores' (arrow to the left circle) and 'Carnivores' (arrow to
    the right circle; the scan reads 'Camivores'); P in the left circle only, R
    (circled) in the overlap, Q in the right circle only; bottom left T in a
    square labelled Decomposer, bottom right S in a triangle labelled
    Scavengers. The options table under the scan is left out: the options
    carry it."""
    fig, ax = plt.subplots(figsize=(5.6, 4.0))
    ax.add_patch(plt.Rectangle((0, 0), 10, 7, fill=False, lw=1.6, color="black"))
    for x in (4.1, 5.9):
        ax.add_patch(Circle((x, 4.2), 1.5, fill=False, lw=1.6, color="black"))
    ax.text(3.35, 4.2, "P", ha="center", va="center", fontsize=16, fontweight="bold")
    ax.text(6.65, 4.2, "Q", ha="center", va="center", fontsize=16, fontweight="bold")
    ax.add_patch(Circle((5.0, 4.2), 0.36, fill=False, lw=1.3, color="black"))
    ax.text(5.0, 4.2, "R", ha="center", va="center", fontsize=14, fontweight="bold")
    for t, tx, ty, axx, ayy in (("Herbivores", 2.3, 6.4, 3.3, 5.45), ("Carnivores", 7.6, 6.4, 6.6, 5.5)):
        ax.text(tx, ty, t, ha="center", va="center", fontsize=13, fontweight="bold")
        ax.annotate("", xy=(axx, ayy), xytext=(tx + (axx - tx) * 0.35, ty - 0.3),
                    arrowprops=dict(arrowstyle="-|>", mutation_scale=13, lw=1.2, color="black", shrinkA=0, shrinkB=1))
    ax.add_patch(plt.Rectangle((1.2, 1.35), 0.75, 0.75, fill=False, lw=1.4, color="black"))
    ax.text(1.575, 1.72, "T", ha="center", va="center", fontsize=14, fontweight="bold")
    ax.text(1.575, 0.65, "Decomposer", ha="center", va="center", fontsize=12, fontweight="bold")
    ax.add_patch(plt.Polygon([(7.75, 1.35), (8.75, 1.35), (8.25, 2.2)], fill=False, lw=1.4, color="black"))
    ax.text(8.25, 1.65, "S", ha="center", va="center", fontsize=13, fontweight="bold")
    ax.text(8.25, 0.65, "Scavengers", ha="center", va="center", fontsize=12, fontweight="bold")
    ax.set_xlim(-0.2, 10.2)
    ax.set_ylim(-0.2, 7.2)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig


FIGURES = {
    ("hb-9-2023", 3): hb_9_2023_q3,
    ("hb-9-2023", 55): hb_9_2023_q55,
    ("hb-9-2023", 88): hb_9_2023_q88,
    ("hb-9-2018", 10): hb_9_2018_q10,
    ("hb-9-2018", 21): hb_9_2018_q21,
    ("hb-9-2018", 72): hb_9_2018_q72,
}


# The 2026-11-22 review redrew every hand-drawn or blurred schematic of the
# MSTA papers; those live one module per paper beside this file.
sys.path.insert(0, LANE)
for _mod in ("redraw_2010", "redraw_2017", "redraw_2018", "redraw_2021_jan", "redraw_2021_nov", "redraw_2021_dec"):
    if os.path.exists(os.path.join(LANE, f"{_mod}.py")):
        FIGURES.update(__import__(_mod).FIGURES)


def main() -> None:
    """redraw.py [paper] [--q=N,...]"""
    args = sys.argv[1:]
    only = next((a for a in args if not a.startswith("--")), None)
    q_arg = next((a for a in args if a.startswith("--q=")), None)
    nums = {int(x) for x in q_arg[4:].split(",")} if q_arg else None
    for (paper, n), fn in FIGURES.items():
        if only and paper != only:
            continue
        if nums and n not in nums:
            continue
        save(fn(), paper, n)


if __name__ == "__main__":
    main()
