"""Redrawn figures for MHT-CET 2026, 19 April Shift II. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Circle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule  # noqa: E402

D = here(__file__)

# Q15 options: (A) phenylacetaldehyde, (B) cinnamaldehyde, (C) cyclohexanecarbaldehyde,
# (D) 2-methylbenzaldehyde
for lab, smi in zip("ABCD", ("O=CCc1ccccc1", "O=C/C=C/c1ccccc1", "O=CC1CCCCC1", "O=Cc1ccccc1C")):
    molecule(smi, f"{D}/q015-{lab}.png", condensed=False)

# Q16: 3,7-dimethylnon-5-en-4-ol, drawn skeletal
molecule("CCC(C)C(O)/C=C/C(C)CC", f"{D}/q016.png", size=(460, 300), condensed=False)

# Q19 options: (A) pent-2-ene, (B) buta-1,3-diene, (C) but-1-yne, (D) propyne
for lab, smi in zip("ABCD", ("C/C=C/CC", "C=CC=C", "C#CCC", "C#CC")):
    molecule(smi, f"{D}/q019-{lab}.png", size=(320, 200), condensed=False)

# Q20 options: (A) 2-nitrophenol, (B) 2-naphthol, (C) 2-bromophenol, (D) benzyl alcohol
for lab, smi in zip("ABCD", ("Oc1ccccc1[N+](=O)[O-]", "Oc1ccc2ccccc2c1", "Oc1ccccc1Br", "OCc1ccccc1")):
    molecule(smi, f"{D}/q020-{lab}.png")


# Q125: a spherical shell made of two hemispheres (dashed line where they meet), pressed
# together by a force F from each side.
def q125(ax, np):
    ax.add_patch(Circle((0, 0), 1.5, fill=False, lw=2))
    ax.plot([0, 0], [-1.5, 1.5], color="black", lw=1.6, ls="--")
    arr = dict(arrowstyle="-|>", color="black", lw=2, mutation_scale=20)
    ax.annotate("", xy=(-1.5, 0), xytext=(-3.0, 0), arrowprops=arr)
    ax.annotate("", xy=(1.5, 0), xytext=(3.0, 0), arrowprops=arr)
    ax.text(-2.5, 0.25, "$F$", fontsize=16, ha="center")
    ax.text(2.5, 0.25, "$F$", fontsize=16, ha="center")
    ax.set_aspect("equal")
    ax.set_xlim(-3.2, 3.2)
    ax.set_ylim(-1.7, 1.7)
    ax.axis("off")


graph(f"{D}/q125.png", q125, size=(4.0, 2.2))


# Q137: four phasor sketches of the current I_c and the emf e_c: (A) both to the right;
# (B) I_c up, e_c right; (C) e_c right, I_c down; (D) I_c left, e_c right.
def q137(ax, np):
    arr = dict(arrowstyle="-|>", color="black", lw=1.8, mutation_scale=16)

    def vec(x0, y0, dx, dy, lab, lx, ly):
        ax.annotate("", xy=(x0 + dx, y0 + dy), xytext=(x0, y0), arrowprops=arr)
        ax.text(x0 + lx, y0 + ly, lab, fontsize=13)

    vec(0, 0, 0.9, 0, "$I_c$", 0.1, 0.12)
    vec(0.9, 0, 0.9, 0, "$e_c$", 0.3, 0.12)
    vec(2.6, 0, 0, 1.0, "$I_c$", -0.35, 0.6)
    vec(2.6, 0, 1.0, 0, "$e_c$", 0.7, -0.35)
    vec(4.7, 0, 1.0, 0, "$e_c$", 0.7, 0.12)
    vec(4.7, 0, 0, -1.0, "$I_c$", -0.35, -0.7)
    vec(7.4, 0, -0.9, 0, "$I_c$", -0.7, 0.12)
    vec(7.4, 0, 0.9, 0, "$e_c$", 0.5, 0.12)
    ax.plot([7.4], [0], "ko", ms=4)
    for x, lab in ((0.9, "(A)"), (3.0, "(B)"), (5.1, "(C)"), (7.4, "(D)")):
        ax.text(x, -1.45, lab, ha="center", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-0.3, 8.6)
    ax.set_ylim(-1.7, 1.3)
    ax.axis("off")


graph(f"{D}/q137.png", q137, size=(6.0, 2.2))


# Q148: A and B into an AND gate; C through a NOT gate; both outputs into an OR gate -> Y.
def q148(d, elm):
    from schemdraw import logic

    andg = d.add(logic.And().at((1.5, 3.0)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, andg.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, andg.in1.y)).to(andg.in1))
    d.add(elm.Dot(open=True).at((0, andg.in2.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, andg.in2.y)).to(andg.in2))
    nt = d.add(logic.Not().at((1.5, 0.5)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, 0.5)).label("$C$", loc="left"))
    d.add(elm.Line().at((0, 0.5)).to(nt.in1))
    orr = d.add(logic.Or().at((6.0, 2.4)).anchor("in1").right())
    d.add(elm.Wire("-|").at(andg.out).to(orr.in1))
    d.add(elm.Wire("-|").at(nt.out).to(orr.in2))
    out = d.add(elm.Line().at(orr.out).right(0.8))
    d.add(elm.Dot().at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q148.png", q148)


# Q150: Si diode (pointing right) and 200 ohm along the top; milliammeter down the right side;
# 5 V cell along the bottom with its positive plate on the left; wire up the left side.
def q150(d, elm):
    d += elm.Diode().at((0, 3)).to((2.4, 3)).label("Si diode", loc="bottom")
    d += elm.Resistor().at((2.4, 3)).to((5.4, 3)).label(r"$200\ \Omega$", loc="top")
    d += elm.Line().at((5.4, 3)).to((5.4, 2.2))
    m = d.add(elm.MeterA().at((5.4, 2.2)).down(1.4))
    d += elm.Label().at((6.3, 1.5)).label("mA", loc="center", ofst=0)
    d += elm.Line().at(m.end).to((5.4, 0))
    d += elm.Line().at((5.4, 0)).to((3.2, 0))
    bat = d.add(elm.BatteryCell().at((3.2, 0)).left(1.6))
    d += elm.Label().at((2.0, -0.6)).label("$+$", loc="center", ofst=0)
    d += elm.Label().at((2.8, -0.6)).label("$-$", loc="center", ofst=0)
    d += elm.Label().at((2.4, -1.2)).label("5V", loc="center", ofst=0)
    d += elm.Line().at(bat.end).to((0, 0))
    d += elm.Line().at((0, 0)).to((0, 3))


circuit(f"{D}/q150.png", q150)
