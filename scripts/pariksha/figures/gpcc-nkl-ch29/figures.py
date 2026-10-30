"""Redraw the two figures of GPCC NKL Physics Vol II Ch. 29 (Experimental Skills).

    python scripts/pariksha/figures/gpcc-nkl-ch29/figures.py

The scan is a phone photo of a printed page, so its figures are redrawn from their
content (the MHT-CET 2026 precedent) rather than cropped:
  q16.png  29.2 Q8  screw gauge: circular scale reads 5 with the jaws closed, 25 with the sphere
  q34.png  29.6 Q3  capillary tubes 1-4: flat, convex, concave, depressed-convex surfaces
PNGs land beside this file and are committed with it.
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, Circle, Polygon, Rectangle

HERE = os.path.dirname(os.path.abspath(__file__))
INK = "#1f2937"
WATER = "#cfe3f7"
LW = 1.6


RED = "#b91c1c"


def screw_gauge(ax, title, circ_on_line, msr_half_mm, sphere):
    """One gauge: C frame, anvil, spindle, sleeve with main scale, thimble with circular scale."""
    ax.set_aspect("equal")
    ax.axis("off")
    ref_y = 2.8
    # C frame with the spindle housing on its right arm
    ax.add_patch(Polygon([(0, 3.1), (0, 0.4), (3.6, 0.4), (3.6, 2.5), (3.0, 2.5), (3.0, 0.9),
                          (0.5, 0.9), (0.5, 3.1)], closed=True, fc="white", ec=INK, lw=LW))
    ax.add_patch(Rectangle((3.0, 2.5), 0.6, 0.6, fc="white", ec=INK, lw=LW))
    # anvil, then the spindle up to the object (or the anvil)
    ax.add_patch(Rectangle((0.5, ref_y - 0.2), 0.45, 0.4, fc="white", ec=INK, lw=LW))
    r = 0.27
    start = 0.95 + 2 * r if sphere else 0.95
    if sphere:
        ax.add_patch(Circle((0.95 + r, ref_y), r, fc="#e5e7eb", ec=INK, lw=LW))
    ax.add_patch(Rectangle((start, ref_y - 0.15), 3.0 - start, 0.3, fc="white", ec=INK, lw=LW))
    # sleeve: reference line, mm ticks above, half-mm ticks below
    ax.add_patch(Rectangle((3.6, ref_y - 0.3), 2.8, 0.6, fc="white", ec=INK, lw=LW, zorder=2))
    ax.plot([3.6, 6.4], [ref_y, ref_y], color=INK, lw=1.2, zorder=3)
    x0, step = 3.85, 0.3  # main-scale zero, one half-millimetre division
    for k in range(0, 9):
        x = x0 + k * step
        dy = 0.2 if k % 2 == 0 else -0.2
        ax.plot([x, x], [ref_y, ref_y + dy], color=INK, lw=1.1, zorder=3)
    ax.text(x0 + 0.03, ref_y + 0.34, "0", ha="right", va="bottom", fontsize=9, color=INK, zorder=3)
    # thimble covers the sleeve from its bevelled edge onward
    tx = x0 + msr_half_mm * step + 0.07
    h = 0.68
    ax.add_patch(Polygon([(tx, ref_y - h + 0.12), (tx + 0.2, ref_y - h), (8.6, ref_y - h), (8.6, ref_y + h),
                          (tx + 0.2, ref_y + h), (tx, ref_y + h - 0.12)], closed=True,
                         fc="white", ec=INK, lw=LW, zorder=5))
    ax.add_patch(Rectangle((8.6, ref_y - 0.45), 0.4, 0.9, fc="white", ec=INK, lw=LW, zorder=5))
    # circular scale on the bevelled edge: `circ_on_line` sits on the reference line (red)
    d = 0.105
    for j in range(-5, 6):
        div = circ_on_line + j
        y = ref_y + j * d
        long = div % 5 == 0
        c = RED if j == 0 else INK
        ax.plot([tx, tx + (0.3 if long else 0.17)], [y, y], color=c, lw=1.4 if j == 0 else 1.0, zorder=6)
        if long:
            ax.text(tx + 0.38, y, str(div % 50), ha="left", va="center", fontsize=9,
                    color=c, fontweight="bold" if j == 0 else "normal", zorder=6)
    ax.text(4.5, -0.1, title, ha="center", va="top", fontsize=11, color=INK)
    ax.set_xlim(-0.3, 9.2)
    ax.set_ylim(-0.6, 3.8)


def draw_q16():
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.2), dpi=160)
    screw_gauge(axes[0], "Jaws closed: circular scale reads 5", 5, 0, sphere=False)
    screw_gauge(axes[1], "Sphere between the jaws: circular scale reads 25", 25, 2, sphere=True)
    fig.tight_layout()
    fig.savefig(os.path.join(HERE, "q16.png"), facecolor="white")
    plt.close(fig)


def capillary(ax, label, kind):
    """A tube dipped in a trough. kind: flat | convex | concave | depressed."""
    ax.set_aspect("equal")
    ax.axis("off")
    trough_top = 1.0
    ax.add_patch(Rectangle((0.0, 0.0), 3.0, trough_top, fc=WATER, ec="none"))
    ax.plot([0.0, 0.0, 3.0, 3.0], [1.6, 0.0, 0.0, 1.6], color=INK, lw=LW)
    ax.plot([0.0, 1.25], [trough_top, trough_top], color=INK, lw=1.0)
    ax.plot([1.75, 3.0], [trough_top, trough_top], color=INK, lw=1.0)
    l, r = 1.25, 1.75
    level = 0.55 if kind == "depressed" else 2.6
    ax.add_patch(Rectangle((l, 0.25), r - l, level - 0.25, fc=WATER, ec="none"))
    if kind == "convex" or kind == "depressed":
        ax.add_patch(Arc(((l + r) / 2, level), r - l, 0.36, theta1=0, theta2=180, color=INK, lw=1.2))
        ax.add_patch(Polygon([(l, level)] + [((l + r) / 2 + (r - l) / 2 * c, level + 0.18 * s)
                              for c, s in [(-1, 0), (-0.7, 0.71), (0, 1), (0.7, 0.71), (1, 0)]] + [(r, level)],
                             closed=True, fc=WATER, ec="none"))
    elif kind == "concave":
        ax.add_patch(Polygon([(l, level)] + [((l + r) / 2 + (r - l) / 2 * c, level - 0.18 * s)
                              for c, s in [(-1, 0), (-0.7, 0.71), (0, 1), (0.7, 0.71), (1, 0)]] + [(r, level)],
                             closed=True, fc="white", ec="none"))
        ax.add_patch(Arc(((l + r) / 2, level), r - l, 0.36, theta1=180, theta2=360, color=INK, lw=1.2))
    else:
        ax.plot([l, r], [level, level], color=INK, lw=1.2)
    ax.plot([l, l], [0.25, 3.4], color=INK, lw=LW)
    ax.plot([r, r], [0.25, 3.4], color=INK, lw=LW)
    ax.text(1.5, -0.25, label, ha="center", va="top", fontsize=13, color=INK, fontweight="bold")
    ax.set_xlim(-0.2, 3.2)
    ax.set_ylim(-0.7, 3.6)


def draw_q34():
    fig, axes = plt.subplots(1, 4, figsize=(9, 3.0), dpi=160)
    for ax, (label, kind) in zip(axes, [("1", "flat"), ("2", "convex"), ("3", "concave"), ("4", "depressed")]):
        capillary(ax, label, kind)
    fig.tight_layout()
    fig.savefig(os.path.join(HERE, "q34.png"), facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    draw_q16()
    draw_q34()
    print("wrote", os.path.join(HERE, "q16.png"), "and q34.png")
