"""Redrawn figures for MHT-CET 2026, 15 April Shift II. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q125: four E-against-d graphs side by side, labelled (A)-(D): (A) a line rising from O,
# (B) a line falling to the d axis, (C) a horizontal line, (D) a vertical line at one d.
def q125(ax, np):
    for i, lab in enumerate("ABCD"):
        x0 = i * 1.8
        ax.annotate("", xy=(x0 + 1.2, 0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
        ax.annotate("", xy=(x0, 1.15), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
        ax.text(x0 - 0.06, 1.1, "$E$", ha="right", fontsize=12)
        ax.text(x0 - 0.06, -0.08, "$O$", ha="right", va="top", fontsize=11)
        ax.text(x0 + 1.22, -0.05, "$d$", fontsize=12, va="top")
        ax.text(x0 + 0.55, -0.22, f"({lab})", ha="center", va="top", fontsize=12)
    ax.plot([0, 1.0], [0, 0.9], color="black", lw=1.6)
    ax.plot([1.8, 2.8], [0.9, 0], color="black", lw=1.6)
    ax.plot([3.6, 4.6], [0.65, 0.65], color="black", lw=1.6)
    ax.plot([5.9, 5.9], [0, 0.95], color="black", lw=1.6)
    ax.set_xlim(-0.3, 6.8)
    ax.set_ylim(-0.5, 1.25)
    ax.set_aspect("equal")
    ax.axis("off")


graph(f"{D}/q125.png", q125, size=(6.6, 2.0))


# Q148: A, B -> NOR -> NOT -> Y1; C, D -> AND -> Y2; Y1, Y2 -> NOR -> Y3.
def q148(d, elm):
    from schemdraw import logic

    g1 = d.add(logic.Nor().at((1, 3)).anchor("in1").right())
    d.add(elm.Line().at((0, g1.in1.y)).to(g1.in1).label("$A$", loc="left"))
    d.add(elm.Line().at((0, g1.in2.y)).to(g1.in2).label("$B$", loc="left"))
    n1 = d.add(logic.Not().at(g1.out).right())
    d.add(elm.Label().at(n1.out).label("$Y_1$", loc="top", ofst=0.1))
    g2 = d.add(logic.And().at((1, 0)).anchor("in1").right())
    d.add(elm.Line().at((0, g2.in1.y)).to(g2.in1).label("$C$", loc="left"))
    d.add(elm.Line().at((0, g2.in2.y)).to(g2.in2).label("$D$", loc="left"))
    d.add(elm.Label().at(g2.out).label("$Y_2$", loc="bottom", ofst=0.1))
    g3 = d.add(logic.Nor().at((8, 1.6)).anchor("out").right())
    d.add(elm.Wire("-|").at(n1.out).to(g3.in1))
    d.add(elm.Wire("-|").at(g2.out).to(g3.in2))
    out = d.add(elm.Line().at(g3.out).right(0.6))
    d.add(elm.Label().at(out.end).label("$Y_3$", loc="right", ofst=0.1))


circuit(f"{D}/q148.png", q148)


# Q149: between A and B, two parallel branches: top = 30 ohm in series with an ideal diode D
# (arrow from A's side towards B's side); bottom = 30 ohm.
def q149(d, elm):
    d += elm.Line().at((-1.5, 0)).to((0, 0))
    d += elm.Dot(open=True).at((-1.5, 0)).label("$A$", loc="left")
    d += elm.Line().at((0, 0)).to((0, 1.5))
    d += elm.Line().at((0, 0)).to((0, -1.5))
    d += elm.Resistor().at((0, 1.5)).to((3, 1.5)).label(r"$30\ \Omega$", loc="bottom")
    d += elm.Diode().at((3, 1.5)).to((6, 1.5)).label("$D$", loc="bottom").label("ideal diode", loc="top")
    d += elm.Resistor().at((0, -1.5)).to((6, -1.5)).label(r"$30\ \Omega$", loc="bottom")
    d += elm.Line().at((6, 1.5)).to((6, -1.5))
    d += elm.Line().at((6, 0)).to((7.5, 0))
    d += elm.Dot(open=True).at((7.5, 0)).label("$B$", loc="right")


circuit(f"{D}/q149.png", q149)
