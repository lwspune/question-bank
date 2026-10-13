"""Redrawn figures for MHT-CET 2026, 17 April Shift II. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Polygon

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q97: lines 2x + y = 12 (D(0,12) to C(6,0)), x + 2y = 12 (B(0,6) to A(12,0)) and
# x + 1.25y = 5 (F(0,4) to E(5,0)); they meet at P(4,4). Shaded: B-P-C-E-F.
def q97(ax, np):
    ax.annotate("", xy=(17.5, 0), xytext=(-1.5, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
    ax.annotate("", xy=(0, 15.5), xytext=(0, -2.5), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
    ax.text(17.6, -0.2, "$X$", fontsize=12, va="top")
    ax.text(0.3, 15.3, "$Y$", fontsize=12)
    ax.text(-0.4, -0.4, "$O$", fontsize=11, ha="right", va="top")
    for t in (2, 4, 6, 8, 10, 12, 14, 16):
        ax.plot([t, t], [-0.2, 0.2], color="black", lw=0.8)
        if t not in (6,):
            ax.text(t, -0.5, str(t), fontsize=9, ha="center", va="top")
    for t in (2, 4, 6, 8, 10, 12, 14):
        ax.plot([-0.2, 0.2], [t, t], color="black", lw=0.8)
        ax.text(-0.5, t, str(t), fontsize=9, ha="right", va="center")
    kw = dict(color="black", lw=1.2)
    x = np.linspace(-1, 7.2, 10)
    ax.plot(x, 12 - 2 * x, **kw)
    x = np.linspace(-1.5, 16, 10)
    ax.plot(x, (12 - x) / 2, **kw)
    x = np.linspace(-1.2, 6.2, 10)
    ax.plot(x, (5 - x) / 1.25, **kw)
    ax.add_patch(Polygon([(0, 6), (4, 4), (6, 0), (5, 0), (0, 4)], closed=True, facecolor="none",
                         edgecolor="black", hatch="xxx", lw=0))
    for (px, py), lab, (dx, dy) in (((0, 12), "D", (0.35, 0.1)), ((0, 6), "B", (0.35, 0.3)), ((0, 4), "F", (-1.1, -1.0)),
                                    ((4, 4), "P", (0.2, 0.35)), ((6, 0), "C", (0.25, 0.3)), ((5, 0), "E", (-0.3, 0.35)),
                                    ((12, 0), "A", (-0.3, 0.4))):
        ax.plot([px], [py], "ko", ms=3)
        ax.text(px + dx, py + dy, f"${lab}$", fontsize=11)
    for i, t in enumerate((r"$DC:\ 2x + y = 12$", r"$BA:\ x + 2y = 12$", r"$FE:\ x + 1.25y = 5$")):
        ax.text(8.0, 13.0 - 1.6 * i, t, fontsize=11)
    ax.set_aspect("equal")
    ax.set_xlim(-2.0, 18.5)
    ax.set_ylim(-3.0, 16.0)
    ax.axis("off")


graph(f"{D}/q097.png", q97, size=(5.6, 5.2))


# Q128: between A and a junction, 2C, 3C and 4C in parallel; from the junction, C' in series to B.
def q128(d, elm):
    d += elm.Dot(open=True).at((0, 0)).label("$A$", loc="left")
    d += elm.Line().at((0, 0)).to((1.2, 0))
    d += elm.Line().at((1.2, 1.8)).to((1.2, -1.8))
    d += elm.Line().at((5.2, 1.8)).to((5.2, -1.8))
    for y, lab in ((1.8, "$2C$"), (0, "$3C$"), (-1.8, "$4C$")):
        d += elm.Capacitor().at((1.2, y)).to((5.2, y)).label(lab, loc="top")
    d += elm.Dot().at((5.2, 0))
    d += elm.Capacitor().at((5.2, 0)).to((8.4, 0)).label("$C^1$", loc="top")
    d += elm.Dot(open=True).at((8.4, 0)).label("$B$", loc="right")


circuit(f"{D}/q128.png", q128)


# Q129: 9 A comes in through a resistor to P. Triangle PQR of 3 ohm wires: PR (current I2),
# PQ (current I1) and QR (I1 flowing up from Q to R); the current leaves upward at R.
def q129(d, elm):
    P, R, Q = (0, 0), (4.4, 2.6), (4.4, -2.6)
    d += elm.Resistor().at((-3.4, 0)).to(P).label("$9A$", loc="top")
    d += elm.Arrow().at((-4.4, 0)).to((-3.4, 0))
    d += elm.Dot().at(P).label("$P$", loc="top")
    d += elm.Resistor().at(P).to(R).label(r"$3\Omega$", loc="top")
    d += elm.Resistor().at(P).to(Q).label(r"$3\Omega$", loc="bottom")
    d += elm.Resistor().at(Q).to(R).label(r"$3\Omega$", loc="bottom")
    d += elm.Dot().at(R).label("$R$", loc="right")
    d += elm.Dot().at(Q).label("$Q$", loc="right")
    d += elm.Arrow().at(R).to((4.4, 3.8))
    d += elm.Arrow().at((0.5, 0.3)).to((1.3, 0.77)).label("$I_2$", loc="top")
    d += elm.Arrow().at((0.5, -0.3)).to((1.3, -0.77)).label("$I_1$", loc="bottom")
    d += elm.Arrow().at((5.0, -2.4)).to((5.0, -1.6)).label("$I_1$", loc="right")


circuit(f"{D}/q129.png", q129)


# Q148: upper NAND gate takes A and B; lower path: A through a NOT gate into a NOR gate with B;
# the two outputs go into a NOR gate whose output is Y.
def q148(d, elm):
    from schemdraw import logic

    nand = d.add(logic.Nand().at((2.5, 3.0)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, nand.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, nand.in1.y)).to(nand.in1))
    d.add(elm.Dot(open=True).at((0, nand.in2.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, nand.in2.y)).to(nand.in2))
    nor1 = d.add(logic.Nor().at((5.0, 0.0)).anchor("in1").right())
    nt = d.add(logic.Not().at((1.6, nor1.in1.y)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, nor1.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, nor1.in1.y)).to(nt.in1))
    d.add(elm.Line().at(nt.out).to(nor1.in1))
    d.add(elm.Dot(open=True).at((0, nor1.in2.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, nor1.in2.y)).to(nor1.in2))
    nor2 = d.add(logic.Nor().at((9.5, 1.9)).anchor("in1").right())
    d.add(elm.Wire("-|").at(nand.out).to(nor2.in1))
    d.add(elm.Wire("-|").at(nor1.out).to(nor2.in2))
    out = d.add(elm.Line().at(nor2.out).right(0.8))
    d.add(elm.Dot().at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q148.png", q148)


# Q150: semiconductor bar X | Y at the top; wires down both sides to a cell at the bottom whose
# long (positive) plate faces the X side.
def q150(d, elm):
    import schemdraw.elements as e

    d += e.Rect(corner1=(1.5, 3.5), corner2=(3.0, 4.5))
    d += e.Rect(corner1=(3.0, 3.5), corner2=(4.5, 4.5))
    d += elm.Label().at((2.25, 4.0)).label("$X$", loc="center", ofst=0)
    d += elm.Label().at((3.75, 4.0)).label("$Y$", loc="center", ofst=0)
    d += elm.Line().at((1.5, 4.0)).to((0, 4.0))
    d += elm.Line().at((0, 4.0)).to((0, 0))
    d += elm.Line().at((4.5, 4.0)).to((6, 4.0))
    d += elm.Line().at((6, 4.0)).to((6, 0))
    d += elm.Line().at((0, 0)).to((2.0, 0))
    bat = d.add(elm.BatteryCell().at((2.0, 0)).right(2.0))
    d += elm.Line().at(bat.end).to((6, 0))
    d += elm.Label().at((2.75, 0.75)).label("$+$", loc="center", ofst=0)
    d += elm.Label().at((3.35, 0.75)).label("$-$", loc="center", ofst=0)


circuit(f"{D}/q150.png", q150)
