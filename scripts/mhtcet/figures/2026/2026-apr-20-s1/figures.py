"""Redrawn figures for MHT-CET 2026, 20 April Shift I. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule  # noqa: E402

D = here(__file__)

# Q15: 2-methylbenzoic acid
molecule("OC(=O)c1ccccc1C", f"{D}/q015.png")
# Q17 options: (A) benzyl alcohol, (B) 1-phenylpropan-1-ol, (C) 1-phenylethanol, (D) 2-phenylpropan-2-ol
for lab, smi in zip("ABCD", ("OCc1ccccc1", "CCC(O)c1ccccc1", "CC(O)c1ccccc1", "CC(C)(O)c1ccccc1")):
    molecule(smi, f"{D}/q017-{lab}.png", condensed=False)
# Q18: pent-3-en-2-amine, skeletal
molecule("C/C=C/C(C)N", f"{D}/q018.png", size=(380, 240), condensed=False)
# Q37 options: (A) butan-2-ol, (B) butane, (C) sec-butylmagnesium hydroxide, (D) 3,4-dimethylhexane
for lab, smi in zip("ABCD", ("CCC(C)O", "CCCC", "CCC(C)[Mg]O", "CCC(C)C(C)CC")):
    molecule(smi, f"{D}/q037-{lab}.png", size=(340, 240), condensed=False)


# Q113: fig (1) two identical rods side by side; fig (2) the same two rods joined end to end.
def q113(ax, np):
    kw = dict(fill=False, lw=1.6)
    ax.add_patch(Rectangle((0, 0.6), 2.0, 0.5, **kw))
    ax.add_patch(Rectangle((0, 0.0), 2.0, 0.5, **kw))
    ax.add_patch(Rectangle((2.8, 0.3), 2.0, 0.5, **kw))
    ax.add_patch(Rectangle((4.8, 0.3), 2.0, 0.5, **kw))
    ax.text(1.0, -0.45, "(fig 1)", ha="center", fontsize=13)
    ax.text(4.8, -0.45, "(fig 2)", ha="center", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-0.3, 7.1)
    ax.set_ylim(-0.7, 1.3)
    ax.axis("off")


graph(f"{D}/q113.png", q113, size=(5.0, 1.6))


# Q118: mass m between two walls, spring 2k to the left wall and spring k to the right wall.
def q118(ax, np):
    def wall(x, side):
        ax.plot([x, x], [0, 2], color="black", lw=1.8)
        for y in np.arange(0.1, 2.0, 0.25):
            ax.plot([x, x + side * 0.2], [y, y + 0.2], color="black", lw=0.9)

    def spring(x0, x1, y):
        xs = np.linspace(x0 + 0.3, x1 - 0.3, 17)
        ys = [y + (0.18 if i % 2 else -0.18) for i in range(len(xs))]
        ys[0] = ys[-1] = y
        ax.plot([x0, xs[0]], [y, y], color="black", lw=1.3)
        ax.plot(xs, ys, color="black", lw=1.3)
        ax.plot([xs[-1], x1], [y, y], color="black", lw=1.3)

    wall(0, -1)
    wall(7, 1)
    ax.plot([0, 7], [0, 0], color="black", lw=1.6)
    ax.add_patch(Rectangle((2.9, 0), 1.2, 1.2, fill=False, lw=1.6))
    ax.text(3.5, 0.6, "$m$", ha="center", va="center", fontsize=16)
    spring(0, 2.9, 0.6)
    spring(4.1, 7, 0.6)
    ax.text(1.45, 1.0, "$2k$", ha="center", fontsize=14)
    ax.text(5.55, 1.0, "$k$", ha="center", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 7.4)
    ax.set_ylim(-0.2, 2.1)
    ax.axis("off")


graph(f"{D}/q118.png", q118, size=(4.6, 1.5))


# Q130: terminal A, cell E1 (long plate towards A), terminal B, cell E2 (long plate towards C),
# terminal C, all in one line.
def q130(d, elm):
    d += elm.Dot(open=True).at((0, 0)).label("$A$", loc="bottom")
    d += elm.Line().at((0, 0)).to((1.0, 0))
    d += elm.BatteryCell().at((1.0, 0)).right(1.4).label("$E_1$", loc="bottom")
    d += elm.Line().at((2.4, 0)).to((3.4, 0))
    d += elm.Dot(open=True).at((3.4, 0)).label("$B$", loc="bottom")
    d += elm.Line().at((3.4, 0)).to((4.4, 0))
    d += elm.BatteryCell().at((5.8, 0)).left(1.4).label("$E_2$", loc="bottom")
    d += elm.Line().at((5.8, 0)).to((6.8, 0))
    d += elm.Dot(open=True).at((6.8, 0)).label("$C$", loc="bottom")


circuit(f"{D}/q130.png", q130)


# Q132: long straight wire XY (current I2 upward); square loop ABCD of side L, its near side AB
# parallel to the wire at a distance L/3; current I1 runs A -> B -> C -> D -> A.
def q132(ax, np):
    arr = dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=14)
    ax.plot([0, 0], [-0.4, 3.4], color="black", lw=1.8)
    ax.annotate("", xy=(0, 1.9), xytext=(0, 1.4), arrowprops=arr)
    ax.text(-0.15, 1.6, "$I_2$", ha="right", fontsize=14)
    ax.text(0.1, 3.3, "$Y$", fontsize=13)
    ax.text(0.1, -0.35, "$X$", fontsize=13)
    a, b = 1.0, 4.0
    ax.plot([a, a, b, b, a], [0, 3, 3, 0, 0], color="black", lw=1.8)
    ax.annotate("", xy=(a, 2.0), xytext=(a, 1.5), arrowprops=arr)
    ax.annotate("", xy=(2.8, 3), xytext=(2.3, 3), arrowprops=arr)
    ax.annotate("", xy=(b, 1.0), xytext=(b, 1.5), arrowprops=arr)
    ax.annotate("", xy=(2.2, 0), xytext=(2.7, 0), arrowprops=arr)
    for (x, y), t in (((a - 0.15, 3.1), "B"), ((b + 0.1, 3.1), "C"), ((a - 0.15, -0.3), "A"), ((b + 0.1, -0.3), "D")):
        ax.text(x, y, f"${t}$", fontsize=13, ha="right" if t in "AB" else "left")
    ax.text(2.5, 3.15, "$I_1$", ha="center", fontsize=13)
    dim = dict(arrowstyle="<|-|>", color="black", lw=1.0, mutation_scale=10)
    ax.annotate("", xy=(a, 0.8), xytext=(0, 0.8), arrowprops=dim)
    ax.text(0.5, 0.9, "$L/3$", ha="center", fontsize=12)
    ax.annotate("", xy=(b, -0.7), xytext=(a, -0.7), arrowprops=dim)
    ax.text(2.5, -0.65, "$L$", ha="center", fontsize=12)
    ax.annotate("", xy=(b + 0.6, 0), xytext=(b + 0.6, 3), arrowprops=dim)
    ax.text(b + 0.7, 1.5, "$L$", fontsize=12, va="center")
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 5.2)
    ax.set_ylim(-1.1, 3.6)
    ax.axis("off")


graph(f"{D}/q132.png", q132, size=(3.8, 3.0))


# Q137: four sketches of r.m.s. current i against frequency f: (P) a smooth peak, (Q) a smooth
# dip, (R) a peak with a small notch at the top, (S) a dip with a small bump at the bottom.
def q137(ax, np):
    for i, lab in enumerate("PQRS"):
        x0 = 2.6 * i
        ax.annotate("", xy=(x0 + 2.0, 0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.annotate("", xy=(x0, 1.8), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.text(x0 - 0.08, 1.7, "$i$", ha="right", fontsize=12)
        ax.text(x0 + 1.95, -0.12, "$f$", va="top", fontsize=12)
        ax.text(x0 + 1.0, -0.5, f"({lab})", ha="center", va="top", fontsize=12)
    t = np.linspace(0, 1.6, 80)
    kw = dict(color="black", lw=1.6)
    ax.plot(0.15 + t, 0.1 + 1.3 * np.exp(-((t - 0.8) ** 2) / 0.08), **kw)
    ax.plot(2.75 + t, 0.15 + 1.3 * (1 - np.exp(-((t - 0.8) ** 2) / 0.08)), **kw)
    ax.plot(5.2 + np.array([0.15, 0.8, 0.9, 1.0, 1.65]), [0.1, 1.3, 1.15, 1.3, 0.1], **kw)
    ax.plot(7.8 + np.array([0.15, 0.8, 0.9, 1.0, 1.65]), [1.4, 0.2, 0.35, 0.2, 1.4], **kw)
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 10.2)
    ax.set_ylim(-1.0, 2.0)
    ax.axis("off")


graph(f"{D}/q137.png", q137, size=(6.4, 2.0))


# Q139: A, capacitor 4 F (+ plate towards A), inductor 0.5 H, resistor 2 ohm, B, in series.
def q139(d, elm):
    d += elm.Dot().at((0, 0)).label("$A$", loc="left")
    d += elm.Capacitor().at((0, 0)).to((2.0, 0)).label("$4\\ F$", loc="bottom")
    d += elm.Label().at((0.55, 0.5)).label("$+$", loc="center", ofst=0)
    d += elm.Label().at((1.45, 0.5)).label("$-$", loc="center", ofst=0)
    d += elm.Label().at((1.0, 1.0)).label("$q$", loc="center", ofst=0)
    d += elm.Inductor2(loops=3).at((2.0, 0)).to((4.4, 0)).label("$0.5\\ H$", loc="bottom")
    d += elm.Resistor().at((4.4, 0)).to((7.0, 0)).label(r"$2\ \Omega$", loc="bottom")
    d += elm.Dot().at((7.0, 0)).label("$B$", loc="right")


circuit(f"{D}/q139.png", q139)


# Q148: A through a NOT gate into an OR gate; B and C into an AND gate whose output is the OR
# gate's other input; output Y.
def q148(d, elm):
    from schemdraw import logic

    nt = d.add(logic.Not().at((1.5, 3.0)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, 3.0)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, 3.0)).to(nt.in1))
    andg = d.add(logic.And().at((1.5, 0.5)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, andg.in1.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, andg.in1.y)).to(andg.in1))
    d.add(elm.Dot(open=True).at((0, andg.in2.y)).label("$C$", loc="left"))
    d.add(elm.Line().at((0, andg.in2.y)).to(andg.in2))
    orr = d.add(logic.Or().at((5.5, 2.4)).anchor("in1").right())
    d.add(elm.Wire("-|").at(nt.out).to(orr.in1))
    d.add(elm.Wire("-|").at(andg.out).to(orr.in2))
    out = d.add(elm.Line().at(orr.out).right(0.8))
    d.add(elm.Dot().at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q148.png", q148)
