"""Redrawn figures for MHT-CET 2026, 18 April Shift I. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Circle, Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule  # noqa: E402

D = here(__file__)

# Q36 options: (A) benzoic acid, (B) benzyl alcohol, (C) benzaldehyde, (D) 2-hydroxybenzyl alcohol
molecule("OC(=O)c1ccccc1", f"{D}/q036-A.png", up=1)
molecule("OCc1ccccc1", f"{D}/q036-B.png", up=1)
molecule("O=Cc1ccccc1", f"{D}/q036-C.png", up=1)
molecule("OCc1ccccc1O", f"{D}/q036-D.png", up=2)


# Q107: hollow sphere, centre C; axis AB through C; parallel axis XY a distance h away.
def q107(ax, np):
    ax.add_patch(Circle((0, 0), 1.0, fill=False, lw=2))
    ax.plot([0, 0], [-1.3, 1.3], color="black", lw=1.8)
    ax.plot([0.45, 0.45], [-1.25, 1.25], color="black", lw=1.8)
    ax.annotate("", xy=(0.45, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="<|-|>", color="black", lw=1.2))
    ax.plot([0], [0], "ko", ms=3)
    ax.text(-0.08, 0.05, "$C$", ha="right", fontsize=14)
    ax.text(0.22, -0.18, "$h$", ha="center", va="top", fontsize=14)
    ax.text(-0.08, 1.3, "$A$", ha="right", fontsize=14)
    ax.text(-0.08, -1.42, "$B$", ha="right", fontsize=14)
    ax.text(0.55, 1.2, "$X$", fontsize=14)
    ax.text(0.55, -1.38, "$Y$", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-1.3, 1.4)
    ax.set_ylim(-1.6, 1.5)
    ax.axis("off")


graph(f"{D}/q107.png", q107, size=(3.0, 3.4))


# Q116: four P-V sketches: (A) straight line from the origin, (B) vertical line, (C) curve
# rising and levelling off, (D) horizontal line.
def q116(ax, np):
    def axes(x0):
        ax.annotate("", xy=(x0 + 2.0, 0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.annotate("", xy=(x0, 2.0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.text(x0 - 0.05, 2.0, "$P$", ha="right", fontsize=12)
        ax.text(x0 + 2.0, -0.1, "$V$", va="top", fontsize=12)

    kw = dict(color="black", lw=1.6)
    for i, lab in enumerate("ABCD"):
        x0 = 2.8 * i
        axes(x0)
        ax.text(x0 + 1.0, -0.45, f"({lab})", ha="center", va="top", fontsize=12)
    ax.plot([0.15, 1.6], [0.15, 1.5], **kw)
    ax.plot([2.8 + 0.8, 2.8 + 0.8], [0.3, 1.6], **kw)
    t = np.linspace(0, 1.6, 50)
    ax.plot(5.6 + 0.1 + t, 1.35 * (1 - np.exp(-2.2 * t)) + 0.05, **kw)
    ax.plot([8.4 + 0.3, 8.4 + 1.7], [1.0, 1.0], **kw)
    ax.set_aspect("equal")
    ax.set_xlim(-0.5, 10.8)
    ax.set_ylim(-1.0, 2.3)
    ax.axis("off")


graph(f"{D}/q116.png", q116, size=(6.4, 2.0))


# Q119: (a) one spring from the ceiling to mass m; (b) two springs end to end; (c) two springs
# side by side, both from the ceiling to the same mass.
def q119(ax, np):
    def ceiling(x0, x1, y):
        ax.plot([x0, x1], [y, y], color="black", lw=1.6)
        for x in np.arange(x0, x1, 0.12):
            ax.plot([x, x + 0.1], [y, y + 0.12], color="black", lw=0.9)

    def spring(x, y_top, y_bot, turns=8):
        ys = np.linspace(y_top - 0.25, y_bot + 0.25, turns * 2 + 1)
        xs = [x + (0.12 if i % 2 else -0.12) for i in range(len(ys))]
        xs[0] = xs[-1] = x
        ax.plot([x, x], [y_top, ys[0]], color="black", lw=1.2)
        ax.plot(xs, ys, color="black", lw=1.2)
        ax.plot([x, x], [ys[-1], y_bot], color="black", lw=1.2)

    def mass(xc, y):
        ax.add_patch(Rectangle((xc - 0.35, y - 0.45), 0.7, 0.45, fill=False, lw=1.4))
        ax.text(xc, y - 0.225, "$m$", ha="center", va="center", fontsize=13)

    top = 4.0
    ceiling(-0.4, 0.4, top)
    spring(0, top, 1.0)
    mass(0, 1.0)
    ax.text(0, 0.2, "Fig.(a)", ha="center", fontsize=12)
    ceiling(1.6, 2.4, top)
    spring(2.0, top, 2.5, turns=7)
    spring(2.0, 2.5, 1.0, turns=7)
    mass(2.0, 1.0)
    ax.text(2.0, 0.2, "Fig.(b)", ha="center", fontsize=12)
    ceiling(3.55, 4.45, top)
    spring(3.75, top, 1.0)
    spring(4.25, top, 1.0)
    ax.plot([3.75, 4.25], [1.0, 1.0], color="black", lw=1.4)
    mass(4.0, 1.0)
    ax.text(4.0, 0.2, "Fig.(c)", ha="center", fontsize=12)
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 4.9)
    ax.set_ylim(0.0, 4.4)
    ax.axis("off")


graph(f"{D}/q119.png", q119, size=(4.4, 3.4))


# Q126: regular hexagon ABCDEF (A at the top, going anticlockwise: B upper left, C lower left,
# D bottom, E lower right, F upper right), centre O with dashed diagonals.
def q126(ax, np):
    names = "ABCDEF"
    angs = [90, 150, 210, 270, 330, 30]
    pts = {n: np.array([np.cos(np.radians(a)), np.sin(np.radians(a))]) for n, a in zip(names, angs)}
    ring = [pts[n] for n in names] + [pts["A"]]
    ax.plot([p[0] for p in ring], [p[1] for p in ring], color="black", lw=1.8)
    for a, b in (("A", "D"), ("B", "E"), ("C", "F")):
        ax.plot(*zip(pts[a], pts[b]), color="black", lw=1.0, ls="--")
    ax.plot([0], [0], "ko", ms=3)
    ax.text(0.1, -0.32, "$O$", fontsize=13)
    charge = {"A": "+q", "B": "-q", "C": "-q", "D": "+q", "E": "+Q", "F": "-q"}
    for n in names:
        p = pts[n]
        ax.text(*(p * 1.17), f"${n}$", ha="center", va="center", fontsize=13)
        ax.text(*(p * 1.62), f"${charge[n]}$", ha="center", va="center", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-1.95, 1.95)
    ax.set_ylim(-1.95, 1.95)
    ax.axis("off")


graph(f"{D}/q126.png", q126, size=(3.4, 3.4))


# Q133: current I comes down the straight wire from A to B; from B it follows a quarter circle
# of radius r centred at O (O is r to the right of B) down to C (r below O); from C it runs
# straight to the right towards D. O-B, O-C and one more radius are drawn and marked r.
def q133(ax, np):
    kw = dict(color="black", lw=1.8)
    O = np.array([0.0, 0.0])
    B, C = np.array([-1.0, 0.0]), np.array([0.0, -1.0])
    ax.plot([-1, -1], [1.6, 0], **kw)
    th = np.linspace(np.pi, 1.5 * np.pi, 60)
    ax.plot(np.cos(th), np.sin(th), **kw)
    ax.plot([0, 1.6], [-1, -1], **kw)
    thin = dict(color="black", lw=1.0)
    ax.plot(*zip(B, O), **thin)
    ax.plot(*zip(O, C), **thin)
    m = np.array([np.cos(1.25 * np.pi), np.sin(1.25 * np.pi)])
    ax.plot(*zip(O, m), **thin)
    arr = dict(arrowstyle="-|>", color="black", lw=1.8, mutation_scale=16)
    ax.annotate("", xy=(-1, 0.9), xytext=(-1, 1.3), arrowprops=arr)
    ax.annotate("", xy=tuple(m + np.array([0.04, -0.06])), xytext=tuple(m + np.array([-0.06, 0.06])), arrowprops=arr)
    ax.annotate("", xy=(1.2, -1), xytext=(0.8, -1), arrowprops=arr)
    for (x, y), t in (((-1.1, 1.6), "A"), ((-1.18, 0.0), "B"), ((0.08, 0.06), "O"), ((-0.05, -1.25), "C"),
                      ((1.62, -1.12), "D")):
        ax.text(x, y, f"${t}$", fontsize=14, ha="center" if t in "CD" else "left", va="bottom" if t == "O" else "center")
    ax.text(-0.5, 0.06, "$r$", ha="center", va="bottom", fontsize=13)
    ax.text(0.08, -0.5, "$r$", va="center", fontsize=13)
    ax.text(-0.42, -0.2, "$r$", fontsize=13)
    ax.text(-1.15, 1.1, "$I$", ha="right", fontsize=13)
    ax.text(-0.85, -0.85, "$I$", ha="right", fontsize=13)
    ax.text(1.0, -1.12, "$I$", ha="center", va="top", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-1.6, 1.9)
    ax.set_ylim(-1.5, 1.9)
    ax.axis("off")


graph(f"{D}/q133.png", q133, size=(3.4, 3.4))


# Q135: R and L in series along the top; the left wire comes up from terminal A (current i
# flowing up), the right wire goes down to terminal B.
def q135(d, elm):
    d += elm.Dot(open=True).at((0, 0)).label("$A$", loc="bottom")
    d += elm.Line().at((0, 0)).to((0, 3))
    d += elm.Resistor().at((0, 3)).to((3, 3)).label("$R$", loc="bottom")
    d += elm.Line().at((3, 3)).to((4, 3))
    d += elm.Inductor2(loops=3).at((4, 3)).to((6, 3)).label("$L$", loc="bottom")
    d += elm.Line().at((6, 3)).to((7, 3))
    d += elm.Line().at((7, 3)).to((7, 0))
    d += elm.Dot(open=True).at((7, 0)).label("$B$", loc="bottom")
    d += elm.Arrow().at((0, 1.0)).to((0, 1.9)).label("$i$", loc="right")


circuit(f"{D}/q135.png", q135)


# Q149: (A) NAND with inputs 1, 1; (B) NAND with inputs 1, 0; (C) NOR with inputs 0, 1;
# (D) XOR with inputs 0, 0.
def q149(d, elm):
    from schemdraw import logic

    for i, (gate, a, b, lab) in enumerate(((logic.Nand, "1", "1", "(A)"), (logic.Nand, "1", "0", "(B)"),
                                           (logic.Nor, "0", "1", "(C)"), (logic.Xor, "0", "0", "(D)"))):
        x0 = 4.2 * i
        g = d.add(gate().at((x0 + 0.8, 0)).anchor("in1").right())
        d.add(elm.Line().at((x0, g.in1.y)).to(g.in1).label(a, loc="left"))
        d.add(elm.Line().at((x0, g.in2.y)).to(g.in2).label(b, loc="left"))
        d.add(elm.Line().at(g.out).right(0.5))
        d.add(elm.Label().at((x0 + 1.8, g.in2.y - 0.9)).label(lab, loc="center", ofst=0))


circuit(f"{D}/q149.png", q149)


# Q150: Fig.1: terminal at -5 V, diode D1 pointing right, resistor R1, terminal at -3 V.
# Fig.2: terminal at 0 V, diode D2 pointing right, resistor R2, terminal at -4 V.
def q150(d, elm):
    for y, dl, rl, vin, vout, fig in ((2.5, "$D_1$", "$R_1$", "$-5V$", "$-3V$", "Fig.1"),
                                      (0, "$D_2$", "$R_2$", "$0V$", "$-4V$", "Fig.2")):
        d += elm.Dot(open=True).at((0, y)).label(vin, loc="bottom")
        d += elm.Diode().at((0, y)).to((2.2, y)).label(dl, loc="top")
        d += elm.Resistor().at((2.2, y)).to((4.6, y)).label(rl, loc="top")
        d += elm.Dot(open=True).at((4.6, y)).label(vout, loc="bottom")
        d += elm.Label().at((2.3, y - 0.9)).label(fig, loc="center", ofst=0)


circuit(f"{D}/q150.png", q150)
