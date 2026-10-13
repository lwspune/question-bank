"""Redrawn figures for MHT-CET 2026, 17 April Shift I. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Circle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule  # noqa: E402

D = here(__file__)

# Q15: cycloheptanol with methyl and ethyl each two ring carbons away from C-OH (on opposite sides)
molecule("OC1CC(C)CCC(CC)C1", f"{D}/q015.png", size=(420, 360), up=0, condensed=False)


# Q98 options: the two lines y = x + 2 (rising) and x + y = 5 (falling) with x, y >= 0;
# (A) shaded between the y axis and both lines (the true region), (B) below both lines,
# (C) above both lines, (D) to the right of both lines.
def lp_axes(ax):
    ax.annotate("", xy=(6.2, 0), xytext=(-0.3, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
    ax.annotate("", xy=(0, 6.2), xytext=(0, -0.3), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
    ax.text(6.25, -0.1, "$X$", fontsize=12, va="top")
    ax.text(0.1, 6.15, "$Y$", fontsize=12)
    x = np.linspace(-1, 4, 10)
    ax.plot(x, x + 2, color="black", lw=1.2)
    x2 = np.linspace(-0.5, 5.5, 10)
    ax.plot(x2, 5 - x2, color="black", lw=1.2)
    ax.set_xlim(-1.2, 6.6)
    ax.set_ylim(-0.6, 6.6)
    ax.set_aspect("equal")
    ax.axis("off")


def hatch(ax, xs, lo, hi):
    ax.fill_between(xs, lo, hi, facecolor="none", edgecolor="black", hatch="---", lw=0)


def q98a(ax, np):
    lp_axes(ax)
    xs = np.linspace(0, 1.5, 50)
    hatch(ax, xs, xs + 2, 5 - xs)


def q98b(ax, np):
    lp_axes(ax)
    xs = np.linspace(0, 5, 100)
    hatch(ax, xs, 0, np.minimum(xs + 2, 5 - xs))


def q98c(ax, np):
    lp_axes(ax)
    xs = np.linspace(0, 4, 100)
    hatch(ax, xs, np.maximum(xs + 2, 5 - xs), 6)


def q98d(ax, np):
    lp_axes(ax)
    xs = np.linspace(1.5, 5.5, 100)
    hatch(ax, xs, np.maximum(5 - xs, 0), np.minimum(xs + 2, 5.5))


for lab, fn in zip("ABCD", (q98a, q98b, q98c, q98d)):
    graph(f"{D}/q098-{lab}.png", fn, size=(2.6, 2.6))


# Q104: three identical touching spheres with centres A, B, C on the X axis, A at the origin.
def q104(ax, np):
    for i, lab in enumerate("ABC"):
        ax.add_patch(Circle((2 * i, 0), 1, fill=False, lw=1.8))
        ax.plot([2 * i], [0], "ko", ms=3)
        ax.text(2 * i, -0.25, f"${lab}$", ha="center", va="top", fontsize=14)
    ax.annotate("", xy=(6.2, 0), xytext=(-1.6, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
    ax.annotate("", xy=(0, 2.4), xytext=(0, -2.2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
    ax.text(6.25, -0.15, "$X$", fontsize=14, va="top")
    ax.text(0.15, 2.3, "$Y$", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-1.8, 6.8)
    ax.set_ylim(-2.3, 2.6)
    ax.axis("off")


graph(f"{D}/q104.png", q104, size=(4.6, 2.8))


# Q106: five identical spheres about the vertical axis AA': one centred on the axis at the top,
# two side by side below it (each touching the axis, centres a distance r from it), then two
# more centred on the axis.
def q106(ax, np):
    for cx, cy in ((0, 4.4), (-1, 2.6), (1, 2.6), (0, 0.8), (0, -1.2)):
        ax.add_patch(Circle((cx, cy), 1, fill=False, lw=1.8))
    ax.plot([0, 0], [-2.6, 6.3], color="black", lw=1.2)
    ax.text(0, 6.45, "$A$", ha="center", fontsize=14)
    ax.text(0, -2.8, "$A'$", ha="center", va="top", fontsize=14)
    th = np.linspace(0.3, 2 * np.pi - 0.6, 60)
    ax.plot(0.35 * np.cos(th), 5.85 + 0.12 * np.sin(th), color="black", lw=1)
    ax.annotate("", xy=(0.33, 5.9), xytext=(0.3, 5.82), arrowprops=dict(arrowstyle="-|>", color="black", lw=1))
    ax.set_aspect("equal")
    ax.set_xlim(-2.4, 2.4)
    ax.set_ylim(-3.2, 6.9)
    ax.axis("off")


graph(f"{D}/q106.png", q106, size=(2.6, 5.0))


# Q127: C1 and C2 in parallel between two vertical wires; the bottom branch has C3 in series
# with the source V.
def q127(d, elm):
    d += elm.Capacitor().at((0, 4)).to((4, 4)).label("$C_1$", loc="top")
    d += elm.Capacitor().at((0, 2.5)).to((4, 2.5)).label("$C_2$", loc="top")
    d += elm.Line().at((0, 4)).to((0, 0))
    d += elm.Line().at((4, 4)).to((4, 0))
    d += elm.Capacitor().at((0, 0)).to((2, 0)).label("$C_3$", loc="top")
    d += elm.BatteryCell().at((2, 0)).to((4, 0)).label("$V$", loc="top")


circuit(f"{D}/q127.png", q127)


# Q129: junction network. Left junction J1: 4.5 A in (from upper left), 1.7 A in (from left),
# 2.3 A out (down). J1-J2 wire. J2: 2.6 A out (up-left), 3.2 A in (from upper right),
# 4.9 A in (from below). J2-J3 wire. J3: 1.9 A out (down-right), I out (up-right).
def q129(ax, np):
    J1, J2, J3 = np.array([0.0, 0.0]), np.array([3.0, 0.3]), np.array([7.5, -0.6])
    kw = dict(color="black", lw=1.6)
    ax.plot(*zip(J1, J2), **kw)
    ax.plot(*zip(J2, J3), **kw)

    def arrow(p_from, p_to, label, lpos):
        ax.plot(*zip(p_from, p_to), **kw)
        mid = p_from + 0.75 * (p_to - p_from)
        ax.annotate("", xy=tuple(mid), xytext=tuple(p_from + 0.55 * (p_to - p_from)),
                    arrowprops=dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16))
        ax.text(*lpos, label, fontsize=13)

    arrow(np.array([-1.2, 2.0]), J1, "4.5 A", (-2.0, 1.4))
    arrow(np.array([-2.6, -1.0]), J1, "1.7 A", (-2.9, -0.6))
    arrow(J1, np.array([-0.6, -2.4]), "2.3 A", (-0.2, -2.2))
    arrow(J2, np.array([1.6, 2.6]), "2.6 A", (1.2, 2.0))
    arrow(np.array([4.7, 2.5]), J2, "3.2 A", (3.8, 2.3))
    arrow(np.array([2.2, -2.6]), J2, "4.9 A", (2.7, -2.3))
    arrow(J3, np.array([8.9, -1.9]), "1.9 A", (7.0, -1.9))
    arrow(J3, np.array([9.0, 0.8]), "$I$", (8.4, 0.75))
    ax.set_aspect("equal")
    ax.set_xlim(-3.2, 9.6)
    ax.set_ylim(-3.0, 3.0)
    ax.axis("off")


graph(f"{D}/q129.png", q129, size=(5.4, 2.8))


# Q133: four ways to join L1, L2, L3 between A and B:
# (P) all three in series; (Q) all three in parallel; (R) L1 + L2 in series, that pair in
# parallel with L3; (S) L2 + L3 in series, that pair in parallel with L1.
def q133(d, elm):
    def ind():
        return elm.Inductor2(loops=4)

    # (P) top left: all three in series
    d += elm.Dot(open=True).at((0, 0)).label("$A$", loc="left")
    d += ind().at((0, 0)).to((1.8, 0)).label("$L_1$", loc="bottom")
    d += ind().at((1.8, 0)).to((3.6, 0)).label("$L_2$", loc="bottom")
    d += ind().at((3.6, 0)).to((5.4, 0)).label("$L_3$", loc="bottom")
    d += elm.Dot(open=True).at((5.4, 0)).label("$B$", loc="right")
    d += elm.Label().at((2.7, -1.3)).label("(P)", loc="center", ofst=0)
    # (Q) bottom left: all three in parallel
    y0 = -4.5
    d += elm.Dot(open=True).at((0, y0)).label("$A$", loc="left")
    d += elm.Line().at((0, y0)).to((0.8, y0))
    d += elm.Line().at((0.8, y0 + 1.3)).to((0.8, y0 - 1.3))
    d += elm.Line().at((4.0, y0 + 1.3)).to((4.0, y0 - 1.3))
    for dy, lab in ((1.3, "$L_1$"), (0, "$L_2$"), (-1.3, "$L_3$")):
        d += ind().at((0.8, y0 + dy)).to((4.0, y0 + dy)).label(lab, loc="top")
    d += elm.Line().at((4.0, y0)).to((4.8, y0))
    d += elm.Dot(open=True).at((4.8, y0)).label("$B$", loc="right")
    d += elm.Label().at((2.4, y0 - 2.4)).label("(Q)", loc="center", ofst=0)
    # (R) top right: L3 straight from A to B; L1 up the left side, wire across, L2 down the right
    x0, y1 = 9.0, -1.0
    d += elm.Dot(open=True).at((x0, y1)).label("$A$", loc="left")
    d += ind().at((x0, y1)).to((x0 + 3.4, y1)).label("$L_3$", loc="bottom")
    d += elm.Dot(open=True).at((x0 + 3.4, y1)).label("$B$", loc="right")
    d += ind().at((x0, y1)).to((x0, y1 + 2.6))
    d += elm.Label().at((x0 - 0.55, y1 + 1.3)).label("$L_1$", loc="center", ofst=0)
    d += elm.Line().at((x0, y1 + 2.6)).to((x0 + 3.4, y1 + 2.6))
    d += ind().at((x0 + 3.4, y1 + 2.6)).to((x0 + 3.4, y1))
    d += elm.Label().at((x0 + 3.95, y1 + 1.3)).label("$L_2$", loc="center", ofst=0)
    d += elm.Label().at((x0 + 1.7, y1 - 1.3)).label("(R)", loc="center", ofst=0)
    # (S) bottom right: L1 across the top from the A corner to B; L2 along the bottom, L3 up the right
    y2 = -6.0
    d += elm.Dot(open=True).at((x0, y2)).label("$A$", loc="left")
    d += elm.Line().at((x0, y2)).to((x0, y2 + 2.6))
    d += ind().at((x0, y2 + 2.6)).to((x0 + 3.4, y2 + 2.6)).label("$L_1$", loc="top")
    d += elm.Dot(open=True).at((x0 + 3.4, y2 + 2.6)).label("$B$", loc="right")
    d += ind().at((x0, y2)).to((x0 + 3.4, y2)).label("$L_2$", loc="bottom")
    d += ind().at((x0 + 3.4, y2)).to((x0 + 3.4, y2 + 2.6))
    d += elm.Label().at((x0 + 3.95, y2 + 1.3)).label("$L_3$", loc="center", ofst=0)
    d += elm.Label().at((x0 + 1.7, y2 - 1.3)).label("(S)", loc="center", ofst=0)


circuit(f"{D}/q133.png", q133)


# Q148: A goes to one input of an OR gate and also to gate G; B goes to G; G's output is the
# OR gate's second input; output Y.
def q148(d, elm):
    from schemdraw import logic

    orr = d.add(logic.Or().at((7, 1)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, orr.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, orr.in1.y)).to(orr.in1))
    g = d.add(elm.Ic(pins=[elm.IcPin(side="left", slot="1/2"), elm.IcPin(side="left", slot="2/2"), elm.IcPin(side="right")],
                     size=(1.4, 2.0), label="$G$").at((3.0, -1.2)).anchor("inL1"))
    top, bottom = sorted((g.inL1, g.inL2), key=lambda p: -p.y)
    d.add(elm.Dot().at((1.6, orr.in1.y)))
    d.add(elm.Wire("|-").at((1.6, orr.in1.y)).to(top))  # A also feeds G (upper input)
    d.add(elm.Dot(open=True).at((0, bottom.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, bottom.y)).to(bottom))
    d.add(elm.Wire("-|").at(g.inR1).to(orr.in2))
    out = d.add(elm.Line().at(orr.out).right(0.8))
    d.add(elm.Dot().at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q148.png", q148)


# Q150: four parallel branches between two vertical wires: D1 (pointing right) + 150 ohm;
# D2 (pointing right) + 50 ohm; D3 (pointing left) + 50 ohm; 5 V battery + 100 ohm.
def q150(d, elm):
    ys = (4.5, 3.0, 1.5, 0.0)
    for y, (kind, lab, r) in zip(ys, (("right", "$D_1$", r"$150\ \Omega$"), ("right", "$D_2$", r"$50\ \Omega$"),
                                      ("left", "$D_3$", r"$50\ \Omega$"), ("bat", r"$5\ V$", r"$100\ \Omega$"))):
        if kind == "right":
            d += elm.Diode().at((0, y)).to((2.2, y)).label(lab, loc="top")
        elif kind == "left":
            d += elm.Diode().at((2.2, y)).to((0, y)).label(lab, loc="top")
        else:
            d += elm.BatteryCell().at((0, y)).to((2.2, y)).label(lab, loc="bottom")
        d += elm.Resistor().at((2.2, y)).to((5, y)).label(r, loc="top")
    d += elm.Line().at((0, 4.5)).to((0, 0))
    d += elm.Line().at((5, 4.5)).to((5, 0))


circuit(f"{D}/q150.png", q150)
