"""Redrawn figures for MHT-CET 2026, 14 May Shift I. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import graph, here, molecule, scheme  # noqa: E402

D = here(__file__)

# Q16: benzenediazonium chloride, with H3PO2 / H2O, gives product A.
scheme(
    f"{D}/q016.png",
    [("mol", "[Cl-].N#[N+]c1ccccc1"), ("arrow", r"$\mathrm{H_3PO_2}$", r"$\mathrm{H_2O}$"), ("text", "A")],
)
molecule("N#Cc1ccccc1", f"{D}/q016-A.png", up=1)
molecule("Clc1ccccc1", f"{D}/q016-B.png", up=0)
molecule("O=[N+]([O-])c1ccccc1", f"{D}/q016-C.png", up=1)
molecule("c1ccccc1", f"{D}/q016-D.png", size=(230, 200))


# Q46: glucopyranose drawn two ways. A and B are Haworth rings (ring O at the back right,
# C-1 on the right); C and D are Fischer projections with the ring O bridging C-1 and C-5.
# `c1_up` is the group drawn above C-1 in the Haworth ring; `c1_left` the one on the left
# of C-1 in the Fischer projection.
def haworth(c1_up, c1_down):
    def build(ax, np):
        ring = {"O": (3.2, 1.9), "1": (4.3, 1.0), "2": (3.3, 0.0), "3": (1.5, 0.0), "4": (0.5, 1.0), "5": (1.6, 1.9)}
        order = ["5", "O", "1", "2", "3", "4", "5"]
        for a, b in zip(order, order[1:]):
            lw = 3.2 if (a, b) in (("1", "2"), ("2", "3"), ("3", "4")) else 1.4
            ax.plot([ring[a][0], ring[b][0]], [ring[a][1], ring[b][1]], color="black", lw=lw, solid_capstyle="round")
        ax.text(*ring["O"], "O", ha="center", va="center", fontsize=14, bbox=dict(facecolor="white", edgecolor="none", pad=1))
        subs = {
            "1": (c1_up, c1_down),
            "2": ("H", "OH"),
            "3": ("OH", "H"),
            "4": ("H", "HO"),
            "5": (None, "H"),
        }
        # inner stubs (they point into the ring's middle) are kept short so labels do not meet
        short = {("5", "down"), ("3", "up"), ("2", "up")}
        nums = {"1": (0.15, 0.0), "2": (0.15, -0.3), "3": (-0.3, -0.3), "4": (-0.3, 0.0), "5": (-0.3, 0.05)}
        for c, (up, down) in subs.items():
            x, y = ring[c]
            if up:
                h = 0.35 if (c, "up") in short else 0.55
                ax.plot([x, x], [y, y + h], color="black", lw=1.1)
                ax.text(x, y + h + 0.05, up, ha="center", va="bottom", fontsize=13)
            if down:
                h = 0.35 if (c, "down") in short else 0.55
                ax.plot([x, x], [y, y - h], color="black", lw=1.1)
                ax.text(x, y - h - 0.05, down, ha="center", va="top", fontsize=13)
            dx, dy = nums[c]
            ax.text(x + dx, y + dy, c, fontsize=9)
        x, y = ring["5"]
        ax.plot([x, x], [y, y + 0.55], color="black", lw=1.1)
        ax.text(x, y + 0.6, r"$\mathrm{CH_2OH}$", ha="center", va="bottom", fontsize=13)
        ax.text(x - 0.05, y + 1.15, "6", fontsize=9, ha="center")
        ax.set_aspect("equal")
        ax.set_xlim(-0.3, 5.0)
        ax.set_ylim(-1.1, 3.2)
        ax.axis("off")

    return build


def fischer(c1_left, c1_right):
    def build(ax, np):
        rows = [
            ("1", c1_left, c1_right),
            ("2", "H", "OH"),
            ("3", "HO", "H"),
            ("4", "H", "OH"),
            ("5", "H", None),
        ]
        top, step = 5.0, 1.0
        ax.plot([0, 0], [top + 0.4, top - 4 * step - 1.0], color="black", lw=1.4)
        for i, (n, left, right) in enumerate(rows):
            y = top - i * step
            ax.plot([-0.9, 0], [y, y], color="black", lw=1.2)
            ax.text(-0.95, y, left, ha="right", va="center", fontsize=12)
            if right:
                ax.plot([0, 0.9], [y, y], color="black", lw=1.2)
                ax.text(0.95, y, right, ha="left", va="center", fontsize=12)
            ax.text(0.08, y + 0.1, n, fontsize=8)
        y5 = top - 4 * step
        # ring oxygen: from C-5 out to the right, up past the column, and over to the top of C-1
        ax.plot([0, 2.0], [y5, y5], color="black", lw=1.2)
        ax.plot([2.0, 2.0], [y5, top + 0.4], color="black", lw=1.2)
        ax.plot([0, 2.0], [top + 0.4, top + 0.4], color="black", lw=1.2)
        ax.text(2.0, (y5 + top) / 2, "O", ha="center", va="center", fontsize=13, bbox=dict(facecolor="white", edgecolor="none", pad=1))
        ax.text(0, top - 4 * step - 1.1, r"$\mathrm{CH_2OH}$", ha="center", va="top", fontsize=12)
        ax.text(0.08, top - 4 * step - 0.9, "6", fontsize=8)
        ax.set_aspect("equal")
        ax.set_xlim(-2.2, 2.6)
        ax.set_ylim(-0.9, 5.8)
        ax.axis("off")

    return build


graph(f"{D}/q046-A.png", haworth("OH", "H"), size=(3.6, 3.0))
graph(f"{D}/q046-B.png", haworth("H", "OH"), size=(3.6, 3.0))
graph(f"{D}/q046-C.png", fischer("H", "OH"), size=(2.6, 3.4))
graph(f"{D}/q046-D.png", fischer("HO", "H"), size=(2.6, 3.4))


# Q131: three long parallel wires A, C, B, all with current upward: A 15 A, C 50 A, B 10 A.
# A to C is x, C to B is 15 - x.
def q131(ax, np):
    for x, name, cur in ((0, "A", "15 A"), (2.0, "C", "50 A"), (4.6, "B", "10 A")):
        ax.annotate("", xy=(x, 4.2), xytext=(x, 0), arrowprops=dict(arrowstyle="-", lw=1.8))
        ax.annotate("", xy=(x, 3.0), xytext=(x, 2.5), arrowprops=dict(arrowstyle="-|>", lw=1.8, mutation_scale=16, color="black"))
        ax.text(x, 4.35, name, ha="center", va="bottom", fontsize=15)
        ax.text(x - 0.3, 2.75, cur, ha="right", va="center", fontsize=13)
    ax.annotate("", xy=(0, 0.6), xytext=(2.0, 0.6), arrowprops=dict(arrowstyle="<->", lw=1))
    ax.annotate("", xy=(2.0, 0.6), xytext=(4.6, 0.6), arrowprops=dict(arrowstyle="<->", lw=1))
    ax.text(1.0, 0.45, "$x$", ha="center", va="top", fontsize=14)
    ax.text(3.3, 0.45, "$15 - x$", ha="center", va="top", fontsize=14)
    ax.set_xlim(-1.6, 5.2)
    ax.set_ylim(-0.2, 4.9)
    ax.axis("off")


graph(f"{D}/q131.png", q131, size=(3.8, 3.0))
