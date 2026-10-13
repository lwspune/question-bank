"""Redrawn figures for MHT-CET 2026, 13 May Shift II. See ../draw.py."""
import os
import sys

from matplotlib.patches import Circle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, scheme  # noqa: E402

D = here(__file__)

# Q38: benzenediazonium chloride + phenol, in alkali (OH-), gives p-hydroxyazobenzene + HCl.
scheme(
    f"{D}/q038.png",
    [
        ("mol", "[Cl-].N#[N+]c1ccccc1"),
        ("text", "$+$"),
        ("mol", "Oc1ccccc1"),
        ("arrow", r"$\mathrm{OH^-}$", ""),
        ("mol", "Oc1ccc(cc1)N=Nc1ccccc1"),
        ("text", r"$+\ \mathrm{HCl}$"),
    ],
)


# Q105: an L of two uniform rods: length 2L along the y-axis and length L along the x-axis,
# joined at the origin O.
def q105(ax, np):
    ax.annotate("", xy=(2.2, 0), xytext=(-0.5, 0), arrowprops=dict(arrowstyle="-|>", lw=1))
    ax.annotate("", xy=(0, 2.6), xytext=(0, -0.6), arrowprops=dict(arrowstyle="-|>", lw=1))
    ax.plot([0, 0], [0, 2.0], color="black", lw=4)
    ax.plot([0, 1.0], [0, 0], color="black", lw=4)
    ax.text(-0.15, 1.0, "$2L$", ha="right", va="center", fontsize=15)
    ax.text(0.5, -0.15, "$L$", ha="center", va="top", fontsize=15)
    ax.text(-0.12, -0.12, "$O$", ha="right", va="top", fontsize=14)
    ax.text(2.25, 0, "$x$", va="center", fontsize=14)
    ax.text(0.08, 2.6, "$y$", va="center", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 2.5)
    ax.set_ylim(-0.7, 2.8)
    ax.axis("off")


graph(f"{D}/q105.png", q105, size=(3.0, 3.0))


# Q106: a circular loop of radius R and centre O; the axis XX' is the tangent at the top,
# in the plane of the loop.
def q106(ax, np):
    ax.add_patch(Circle((0, 0), 1.0, fill=False, lw=1.8))
    ax.plot([-1.5, 1.5], [1.0, 1.0], color="black", lw=1.4)
    ax.plot([0, 0], [0, 1.0], color="black", lw=1.0)
    ax.plot([-1.0, 1.0], [0, 0], color="black", lw=0.9, ls="--")
    ax.plot([0], [0], "o", color="black", ms=6)
    ax.text(0.08, 0.5, "$R$", fontsize=15, va="center")
    ax.text(0.05, -0.12, "$O$", fontsize=15, va="top")
    ax.text(-1.6, 1.0, "$X$", ha="right", va="center", fontsize=15)
    ax.text(1.6, 1.0, "$X'$", ha="left", va="center", fontsize=15)
    ax.set_aspect("equal")
    ax.set_xlim(-1.9, 1.9)
    ax.set_ylim(-1.15, 1.25)
    ax.axis("off")


graph(f"{D}/q106.png", q106, size=(3.4, 2.4))


# Q149: A and B into a NOR gate; its output into both inputs of a NAND gate; then a NOT
# gate gives Y. Each gate is labelled with its name.
def q149(d, elm):
    from schemdraw import logic

    nor = d.add(logic.Nor().at((1.5, 0)).anchor("in1").right().label("NOR", loc="top"))
    d.add(elm.Dot(open=True).at((0, nor.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, nor.in1.y)).to(nor.in1))
    d.add(elm.Dot(open=True).at((0, nor.in2.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, nor.in2.y)).to(nor.in2))
    nand = d.add(logic.Nand().at((nor.out.x + 1.2, nor.out.y + 0.5)).anchor("in1").right().label("NAND", loc="top"))
    j = (nor.out.x + 0.6, nor.out.y)
    d.add(elm.Line().at(nor.out).to(j))
    d.add(elm.Dot().at(j))
    d.add(elm.Wire("|-").at(j).to(nand.in1))
    d.add(elm.Wire("|-").at(j).to(nand.in2))
    nt = d.add(logic.Not().at((nand.out.x + 0.6, nand.out.y)).anchor("in1").right().label("NOT", loc="top"))
    d.add(elm.Line().at(nand.out).to(nt.in1))
    out = d.add(elm.Line().at(nt.out).right(0.8))
    d.add(elm.Dot(open=True).at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q149.png", q149)


# Q150: a diode (pointing right) in series with a resistor; the potentials at the two ends
# are written above them. Options differ only in the potentials.
def diode_resistor(left, right):
    def build(d, elm):
        d += elm.Line().at((0, 0)).to((0.8, 0)).label(left, loc="top", ofst=0.3)
        d += elm.Diode().at((0.8, 0)).to((3.0, 0))
        d += elm.Line().at((3.0, 0)).to((4.0, 0))
        d += elm.Resistor().at((4.0, 0)).to((6.6, 0))
        d += elm.Line().at((6.6, 0)).to((7.4, 0)).label(right, loc="top", ofst=0.3)

    return build


circuit(f"{D}/q150-A.png", diode_resistor("$+2\\,\\mathrm{V}$", "$-2\\,\\mathrm{V}$"))
circuit(f"{D}/q150-B.png", diode_resistor("$2\\,\\mathrm{V}$", "$4\\,\\mathrm{V}$"))
circuit(f"{D}/q150-C.png", diode_resistor("$-3\\,\\mathrm{V}$", "$-3\\,\\mathrm{V}$"))
circuit(f"{D}/q150-D.png", diode_resistor("$-2\\,\\mathrm{V}$", "$+2\\,\\mathrm{V}$"))
