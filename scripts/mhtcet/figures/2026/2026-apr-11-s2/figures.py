"""Redrawn figures for MHT-CET 2026, 11 April Shift II. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q130: bridge ABCD. A-B 15 ohm, B-C 3 ohm, A-D 20 ohm, D-C 4 ohm; B-D holds a 6 ohm
# resistor in series with the galvanometer G. 2.1 A enters at A and leaves at C.
def q130(d, elm):
    # MeterA does not stretch with to(): place the B-D branch by direction, then wire to D.
    A, B, C, Dn = (0, 0), (4, 4), (8, 0), (4, -4)
    d += elm.Resistor().at(A).to(B).label(r"$15\ \Omega$", loc="top")
    d += elm.Resistor().at(B).to(C).label(r"$3\ \Omega$", loc="top")
    d += elm.Resistor().at(A).to(Dn).label(r"$20\ \Omega$", loc="bottom")
    d += elm.Resistor().at(Dn).to(C).label(r"$4\ \Omega$", loc="bottom")
    r6 = d.add(elm.Resistor().at(B).down().label(r"$6\ \Omega$", loc="bottom"))
    g = d.add(elm.Source().at(r6.end).down())  # plain circle; MeterA would print "A"
    d += elm.Label().at(g.center).label("$G$", loc="center", ofst=0)
    d += elm.Line().at(g.end).to(Dn)
    d += elm.Line().at((-2.4, 0)).to(A).label(r"$2.1\ A$", loc="bottom")
    d += elm.Arrow().at((-2.4, 0)).to((-1.0, 0))
    d += elm.Arrow().at(C).to((10, 0))
    for p, lab, loc in ((A, "A", "top"), (B, "B", "top"), (C, "C", "top"), (Dn, "D", "bottom")):
        d += elm.Dot().at(p).label(f"${lab}$", loc=loc)


circuit(f"{D}/q130.png", q130)


# Q132: wire CD (current C to D, rightwards) held a distance r directly above wire AB
# lying on the table (current B to A, leftwards).
def q132(ax, np):
    ax.plot([0, 8], [1.5, 1.5], color="black", lw=2)
    ax.plot([0, 8], [0, 0], color="black", lw=2)
    ax.annotate("", xy=(4.6, 1.5), xytext=(3.4, 1.5), arrowprops=dict(arrowstyle="-|>", color="black", lw=2, mutation_scale=22))
    ax.annotate("", xy=(3.4, 0), xytext=(4.6, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=2, mutation_scale=22))
    ax.annotate("", xy=(8.6, 1.5), xytext=(8.6, 0), arrowprops=dict(arrowstyle="<|-|>", color="black", lw=1.4))
    ax.text(8.8, 0.75, "$r$", fontsize=17, va="center")
    for x, y, lab in ((-0.15, 1.5, "C"), (8.15, 1.5, "D"), (-0.15, 0, "A"), (8.15, 0, "B")):
        ax.text(x, y, f"${lab}$", fontsize=17, va="center", ha="right" if x < 1 else "left")
    ax.set_xlim(-1, 9.8)
    ax.set_ylim(-0.6, 2.1)
    ax.axis("off")


graph(f"{D}/q132.png", q132, size=(6.0, 1.8))
