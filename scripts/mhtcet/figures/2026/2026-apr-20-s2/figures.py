"""Redrawn figures for MHT-CET 2026, 20 April Shift II. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule, scheme  # noqa: E402

D = here(__file__)

# Q15: 4,4-diethyl-1-methoxycyclohexane, drawn with the methoxy group written out
molecule("COC1CCC(CC)(CC)CC1", f"{D}/q015.png", size=(460, 300), condensed=True)
# Q16 options: (A) CH2BrCl, (B) 1-iodoethanol, (C) 2-bromo-2-chloropropane, (D) 3-chloropentane
for lab, smi in zip("ABCD", ("ClCBr", "CC(O)I", "CC(C)(Cl)Br", "CCC(Cl)CC")):
    molecule(smi, f"{D}/q016-{lab}.png", size=(320, 240), condensed=False)
# Q40: phenol -> p-benzoquinone under condition A
scheme(f"{D}/q040.png", [("mol", "Oc1ccccc1", 0), ("arrow", "$A$", ""), ("mol", "O=C1C=CC(=O)C=C1", 0)])


# Q106: three blocks 2 kg, 8 kg, 12 kg in a row on a frictionless surface; string T2 joins
# 2 kg to 8 kg, T1 joins 8 kg to 12 kg; F pulls the 12 kg block to the right.
def q106(ax, np):
    ax.plot([-0.3, 9.3], [0, 0], color="black", lw=1.6)
    arr = dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16)
    for x0, lab in ((0, "2 kg"), (3, "8 kg"), (6, "12 kg")):
        ax.add_patch(Rectangle((x0, 0), 1.6, 1.0, fill=False, lw=1.6))
        ax.text(x0 + 0.8, 0.5, lab, ha="center", va="center", fontsize=13)
    ax.annotate("", xy=(3.0, 0.5), xytext=(1.6, 0.5), arrowprops=arr)
    ax.annotate("", xy=(6.0, 0.5), xytext=(4.6, 0.5), arrowprops=arr)
    ax.annotate("", xy=(8.9, 0.5), xytext=(7.6, 0.5), arrowprops=arr)
    ax.text(2.3, 0.7, "$T_2$", ha="center", fontsize=14)
    ax.text(5.3, 0.7, "$T_1$", ha="center", fontsize=14)
    ax.text(9.0, 0.5, "$F$", va="center", fontsize=14)
    ax.annotate("frictionless surface", xy=(0.4, 0), xytext=(0.2, -0.9), fontsize=12,
                arrowprops=dict(arrowstyle="-|>", color="black", lw=1.0))
    ax.set_aspect("equal")
    ax.set_xlim(-0.5, 9.8)
    ax.set_ylim(-1.2, 1.4)
    ax.axis("off")


graph(f"{D}/q106.png", q106, size=(5.6, 1.6))


# Q110: four velocity-time sketches: (a) horizontal line, (b) straight line rising from a
# positive intercept, (c) falling curve levelling off, (d) rising curve from 0 levelling off.
def q110(ax, np):
    kw = dict(color="black", lw=1.6)
    t = np.linspace(0, 1.6, 60)
    for i, (lab, ys) in enumerate((("a", 1.1 + 0 * t), ("b", 0.4 + 0.75 * t),
                                   ("c", 0.35 + 1.0 * np.exp(-3 * t)), ("d", 1.2 * (1 - np.exp(-2.5 * t))))):
        x0, y0 = (i % 2) * 2.6, -(i // 2) * 2.4
        ax.annotate("", xy=(x0 + 2.0, y0), xytext=(x0, y0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.annotate("", xy=(x0, y0 + 1.7), xytext=(x0, y0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.text(x0 - 0.08, y0 + 1.6, "$V$", ha="right", fontsize=12)
        ax.text(x0 + 1.95, y0 - 0.1, "$t$", va="top", fontsize=12)
        ax.text(x0 - 0.08, y0 - 0.05, "0", ha="right", va="top", fontsize=11)
        ax.plot(x0 + t, y0 + ys, **kw)
        ax.text(x0 + 0.9, y0 - 0.35, f"({lab})", ha="center", va="top", fontsize=12)
    ax.set_aspect("equal")
    ax.set_xlim(-0.5, 4.8)
    ax.set_ylim(-3.0, 1.9)
    ax.axis("off")


graph(f"{D}/q110.png", q110, size=(3.8, 3.6))


# Q129: potentiometer wire AB; driving circuit along the top: 5 V cell, 45 ohm resistor, key k.
# Below: from A, a 0.4 V cell and a galvanometer C lead to the jockey P on the wire.
def q129(d, elm):
    d += elm.Dot().at((0, 0)).label("$A$", loc="left")
    d += elm.Line().at((0, 0)).to((8, 0))
    d += elm.Dot().at((8, 0)).label("$B$", loc="right")
    d += elm.Line().at((0, 0)).to((0, 2.5))
    d += elm.BatteryCell().at((0, 2.5)).right(1.4).label("$5\\ V$", loc="bottom")
    d += elm.Line().at((1.4, 2.5)).to((2.4, 2.5))
    d += elm.Resistor().at((2.4, 2.5)).to((5.0, 2.5)).label(r"$45\ \Omega$", loc="bottom")
    d += elm.Line().at((5.0, 2.5)).to((5.6, 2.5))
    d += elm.Switch().at((5.6, 2.5)).right(1.4).label("$k$", loc="bottom")
    d += elm.Line().at((7.0, 2.5)).to((8, 2.5))
    d += elm.Line().at((8, 2.5)).to((8, 0))
    d += elm.Line().at((0, 0)).to((0, -2))
    d += elm.BatteryCell().at((0, -2)).right(1.4).label("$0.4\\ V$", loc="bottom")
    d += elm.Line().at((1.4, -2)).to((2.4, -2))
    g = d.add(elm.Source().at((2.4, -2)).right(1.2))
    d += elm.Label().at(g.center).label("$G$", loc="center", ofst=0)
    d += elm.Label().at((3.0, -2.8)).label("$C$", loc="center", ofst=0)
    d += elm.Line().at((3.6, -2)).to((4.4, -2))
    d += elm.Arrow().at((4.4, -2)).to((4.4, -0.05))
    d += elm.Label().at((4.4, 0.45)).label("$P$", loc="center", ofst=0)


circuit(f"{D}/q129.png", q129)


# Q130: junction J1 with 2 A in (from upper left) and 3 A in (from lower left); wire to J2 with
# 1 A out (up right); wire to J3 with 0.6 A out (up right), 1.3 A out (right) and i out (down).
def q130(ax, np):
    J1, J2, J3 = np.array([0.0, 0.0]), np.array([2.6, 0.0]), np.array([5.0, -0.6])
    kw = dict(color="black", lw=1.6)
    arr = dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16)
    ax.plot(*zip(J1, J2), **kw)
    ax.annotate("", xy=(1.5, 0), xytext=(1.0, 0), arrowprops=arr)
    ax.plot(*zip(J2, J3), **kw)

    def branch(p_from, p_to, label, lpos):
        ax.plot(*zip(p_from, p_to), **kw)
        ax.annotate("", xy=tuple(p_from + 0.8 * (p_to - p_from)), xytext=tuple(p_from + 0.55 * (p_to - p_from)),
                    arrowprops=arr)
        ax.text(*lpos, label, fontsize=13)

    branch(np.array([-1.4, 1.0]), J1, "2A", (-1.6, 1.15))
    branch(np.array([-1.4, -1.0]), J1, "3A", (-1.6, -1.45))
    branch(J2, np.array([3.6, 1.2]), "1A", (3.3, 1.3))
    branch(J3, np.array([6.2, 0.5]), "0.6A", (6.0, 0.6))
    branch(J3, np.array([6.8, -1.2]), "1.3A", (6.6, -1.0))
    branch(J3, np.array([5.0, -2.2]), "$iA$", (5.15, -2.3))
    ax.set_aspect("equal")
    ax.set_xlim(-2.0, 7.6)
    ax.set_ylim(-2.6, 1.6)
    ax.axis("off")


graph(f"{D}/q130.png", q130, size=(5.4, 2.4))


# Q138: circuit (A): 30 ohm resistor and a 210 V, 50 Hz source in a loop. Circuit (B): 30 ohm,
# 40 mH and 0.4 uF in series along the top with the same source along the bottom.
def q138(d, elm):
    d += elm.Resistor().at((0, 2.5)).to((2.6, 2.5)).label(r"$30\ \Omega$", loc="top")
    d += elm.Line().at((0, 2.5)).to((0, 0))
    d += elm.Line().at((2.6, 2.5)).to((2.6, 0))
    d += elm.Line().at((0, 0)).to((0.7, 0))
    s1 = d.add(elm.SourceSin().at((0.7, 0)).right(1.2))
    d += elm.Line().at(s1.end).to((2.6, 0))
    d += elm.Label().at((1.3, -0.9)).label("210 V, 50 Hz", loc="center", ofst=0)
    d += elm.Label().at((1.3, 1.25)).label("(A)", loc="center", ofst=0)
    x0 = 4.0
    d += elm.Resistor().at((x0, 2.5)).to((x0 + 2.4, 2.5)).label(r"$30\ \Omega$", loc="top")
    d += elm.Inductor2(loops=3).at((x0 + 2.4, 2.5)).to((x0 + 4.6, 2.5)).label("40 mH", loc="top")
    d += elm.Capacitor().at((x0 + 4.6, 2.5)).to((x0 + 6.4, 2.5)).label(r"$0.4\ \mu F$", loc="top")
    d += elm.Line().at((x0, 2.5)).to((x0, 0))
    d += elm.Line().at((x0 + 6.4, 2.5)).to((x0 + 6.4, 0))
    d += elm.Line().at((x0, 0)).to((x0 + 2.6, 0))
    s2 = d.add(elm.SourceSin().at((x0 + 2.6, 0)).right(1.2))
    d += elm.Line().at(s2.end).to((x0 + 6.4, 0))
    d += elm.Label().at((x0 + 3.2, -0.9)).label("210 V, 50 Hz", loc="center", ofst=0)
    d += elm.Label().at((x0 + 3.2, 1.25)).label("(B)", loc="center", ofst=0)


circuit(f"{D}/q138.png", q138)
