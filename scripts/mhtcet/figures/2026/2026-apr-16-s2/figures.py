"""Redrawn figures for MHT-CET 2026, 16 April Shift II. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Circle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q107: vertical axis; a sphere whose centre is 10 cm from the axis.
def q107(ax, np):
    ax.plot([0, 0], [-2.2, 2.2], color="black", lw=2)
    ax.add_patch(Circle((3.3, 0), 0.5, fill=False, lw=2))
    ax.annotate("", xy=(3.3, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.text(1.65, -0.35, "10 cm", ha="center", va="top", fontsize=15)
    ax.set_aspect("equal")
    ax.set_xlim(-0.5, 4.2)
    ax.set_ylim(-2.3, 2.3)
    ax.axis("off")


graph(f"{D}/q107.png", q107, size=(3.6, 3.6))


# Q127: q1 at A, q2 at B (AB = 30 cm, on the line to D); C 40 cm above A; quarter circle of
# radius 40 cm about A from C to D.
def q127(ax, np):
    th = np.linspace(0, np.pi / 2, 60)
    ax.plot(40 * np.cos(th), 40 * np.sin(th), color="black", lw=1.2, ls="--")
    ax.plot([0, 0], [0, 40], color="black", lw=1.6)
    ax.plot([0, 40], [0, 0], color="black", lw=1.6)
    for x, y in ((0, 0), (30, 0), (40, 0), (0, 40)):
        ax.plot([x], [y], "ko", ms=6)
    ax.text(-2, 41, "$C$", ha="right", fontsize=15)
    ax.text(1.5, 36, "$q_3$", fontsize=14)
    ax.text(-2, 20, "40 cm", ha="right", va="center", fontsize=13)
    ax.text(1.5, 2, "$q_1$", fontsize=14)
    ax.text(29, 2, "$q_2$", fontsize=14)
    ax.text(0, -3, "$A$", ha="center", va="top", fontsize=15)
    ax.text(30, -3, "$B$", ha="center", va="top", fontsize=15)
    ax.text(40, -3, "$D$", ha="center", va="top", fontsize=15)
    ax.text(15, -3, "30 cm", ha="center", va="top", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-14, 46)
    ax.set_ylim(-9, 46)
    ax.axis("off")


graph(f"{D}/q127.png", q127, size=(4.0, 3.8))


# Q130: diamond bridge. Left vertex to B: 6 ohm || 3 ohm; B to right vertex: x ohm || 1 ohm;
# left vertex to D: 1 ohm and 2 ohm in series; D to right vertex: x ohm.
def q130(d, elm):
    L, B, R, Dn = (0, 0), (4, 4), (8, 0), (4, -4)

    def par(a, b, top, bot):
        a, b = np.array(a, float), np.array(b, float)
        u = (b - a) / np.linalg.norm(b - a)
        n = np.array([-u[1], u[0]]) * 0.6
        p, q = a + 0.15 * (b - a), a + 0.85 * (b - a)
        d.add(elm.Line().at(tuple(a)).to(tuple(p)))
        d.add(elm.Line().at(tuple(q)).to(tuple(b)))
        for s, lab in ((1, top), (-1, bot)):
            d.add(elm.Line().at(tuple(p)).to(tuple(p + s * n)))
            d.add(elm.Line().at(tuple(q)).to(tuple(q + s * n)))
            d.add(elm.Resistor().at(tuple(p + s * n)).to(tuple(q + s * n)).label(lab, loc="top" if s > 0 else "bottom"))

    par(L, B, r"$6\ \Omega$", r"$3\ \Omega$")
    par(B, R, r"$x\ \Omega$", r"$1\ \Omega$")
    d += elm.Resistor().at(L).to((2, -2)).label(r"$1\ \Omega$", loc="bottom")
    d += elm.Resistor().at((2, -2)).to(Dn).label(r"$2\ \Omega$", loc="bottom")
    d += elm.Resistor().at(Dn).to(R).label(r"$x\ \Omega$", loc="bottom")
    d += elm.Dot().at(L)
    d += elm.Dot().at(R)
    d += elm.Dot().at(B).label("$B$", loc="top")
    d += elm.Dot().at(Dn).label("$D$", loc="bottom")


circuit(f"{D}/q130.png", q130)


# Q132: wire A -> B (rightward) then B -> C (downward); wire D -> E (leftward) then E -> T
# (upward). B and E are a apart on the same horizontal line; O is midway between them.
def q132(ax, np):
    kw = dict(color="black", lw=2)
    ax.plot([-3, 0], [0, 0], **kw)
    ax.plot([0, 0], [0, -3], **kw)
    ax.plot([2, 5], [0, 0], **kw)
    ax.plot([2, 2], [0, 3], **kw)
    for xs, ys in (([-3.8, -3], [0, 0]), ([5, 5.8], [0, 0]), ([0, 0], [-3, -3.7]), ([2, 2], [3, 3.7])):
        ax.plot(xs, ys, color="black", lw=1, ls=":")
    arr = dict(arrowstyle="-|>", color="black", lw=1.8, mutation_scale=18)
    ax.annotate("", xy=(-1.3, 0), xytext=(-2.0, 0), arrowprops=arr)
    ax.annotate("", xy=(0, -2.0), xytext=(0, -1.3), arrowprops=arr)
    ax.annotate("", xy=(3.3, 0), xytext=(4.0, 0), arrowprops=arr)
    ax.annotate("", xy=(2, 2.0), xytext=(2, 1.3), arrowprops=arr)
    ax.plot([1], [0], "ko", ms=4)
    for x, y, t in ((-3.2, 0.2, "A"), (-0.35, 0.25, "B"), (0.25, -3.2, "C"), (5.1, 0.2, "D"), (2.2, -0.45, "E"), (2.25, 3.2, "T"), (0.85, -0.55, "O")):
        ax.text(x, y, f"${t}$", fontsize=15)
    for x, y in ((-1.7, 0.25), (-0.55, -1.7), (3.6, 0.25), (2.2, 1.6)):
        ax.text(x, y, "$I$", fontsize=14)
    ax.annotate("", xy=(2, 1.0), xytext=(0, 1.0), arrowprops=dict(arrowstyle="<|-|>", color="black", lw=1))
    ax.text(1.0, 1.15, "$a$", ha="center", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-4, 6)
    ax.set_ylim(-4, 4)
    ax.axis("off")


graph(f"{D}/q132.png", q132, size=(4.6, 3.8))


# Q135: phi against I for inductors A, B, C, D: straight lines from O, A steepest, D shallowest.
def q135(ax, np):
    ax.annotate("", xy=(4.3, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.annotate("", xy=(0, 3.6), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    for (x, y), lab in zip(((1.3, 3.2), (2.1, 2.8), (2.6, 2.2), (3.1, 1.6)), "ABCD"):
        ax.plot([0, x], [0, y], color="black", lw=1.6)
        ax.text(x + 0.05, y + 0.05, f"${lab}$", fontsize=15)
    ax.text(-0.15, 3.3, r"$\phi$", ha="right", fontsize=16)
    ax.text(4.2, -0.15, "$I$", va="top", fontsize=15)
    ax.text(-0.12, -0.12, "$0$", ha="right", va="top", fontsize=13)
    ax.set_xlim(-0.6, 4.6)
    ax.set_ylim(-0.6, 3.8)
    ax.axis("off")


graph(f"{D}/q135.png", q135, size=(3.8, 3.4))


# Q136: from A: 6 ohm resistor (current 2 A flowing away from A), then a 3 H inductor, down the
# left side, along the bottom through a 6 V battery to B.
def q136(d, elm):
    d += elm.Dot().at((8, 3)).label("$A$", loc="right")
    d += elm.Resistor().at((8, 3)).to((5, 3)).label(r"$6\ \Omega$", loc="bottom").label(r"$2\ A$", loc="top")
    d += elm.Inductor2(loops=5).at((5, 3)).to((1.2, 3)).label(r"$3\ H$", loc="bottom")
    d += elm.Line().at((1.2, 3)).to((0, 3))
    d += elm.Line().at((0, 3)).to((0, 0))
    # the printed cell has its long (positive) plate on the left, towards the inductor
    bat = d.add(elm.BatteryCell().at((0, 0)).right(3).label(r"$6\ V$", loc="bottom"))
    d += elm.Label().at((1.1, 0.55)).label("$+$", loc="center", ofst=0)
    d += elm.Label().at((1.9, 0.55)).label("$-$", loc="center", ofst=0)
    d += elm.Line().at(bat.end).to((8, 0))
    d += elm.Dot().at((8, 0)).label("$B$", loc="right")
    d += elm.Arrow().at((7.4, 3.9)).to((5.6, 3.9))


circuit(f"{D}/q136.png", q136)


# Q143: slits A1 (top) and A2 (below, separation a); screen at distance D; P on the screen
# level with A1; dashed A1P and A2P.
def q143(ax, np):
    ax.plot([0, 0], [-2, 2], color="black", lw=2)
    ax.plot([5, 5], [-2, 2], color="black", lw=2)
    ax.plot([0, 5], [1.2, 1.2], color="black", lw=1.2, ls="--")
    ax.plot([0, 5], [0.0, 1.2], color="black", lw=1.2, ls="--")
    for x, y in ((0, 1.2), (0, 0), (5, 1.2)):
        ax.plot([x], [y], "ko", ms=5)
    ax.text(-0.15, 1.25, "$A_1$", ha="right", fontsize=15)
    ax.text(-0.15, -0.05, "$A_2$", ha="right", fontsize=15)
    ax.text(5.15, 1.2, "$P$", fontsize=15, va="center")
    ax.annotate("", xy=(-0.9, 1.2), xytext=(-0.9, 0), arrowprops=dict(arrowstyle="<|-|>", color="black", lw=1))
    ax.text(-1.05, 0.6, "$a$", ha="right", va="center", fontsize=15)
    ax.annotate("", xy=(5, -1.5), xytext=(0, -1.5), arrowprops=dict(arrowstyle="<|-|>", color="black", lw=1))
    ax.text(2.5, -1.35, "$D$", ha="center", fontsize=15)
    ax.set_aspect("equal")
    ax.set_xlim(-1.8, 5.8)
    ax.set_ylim(-2.1, 2.1)
    ax.axis("off")


graph(f"{D}/q143.png", q143, size=(4.4, 2.6))
