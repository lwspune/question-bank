"""Redrawn figures for MHT-CET 2026, 19 April Shift I. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Polygon

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, switch_network  # noqa: E402

D = here(__file__)


# Q62: upper branch: S1 in series with (S2 parallel S3); lower branch: S3', S2', S1 in series;
# the two branches in parallel, closed by a battery and lamp L along the bottom.
def q62(d, elm):
    def sw(x, y, lab):
        s = d.add(elm.Switch().at((x, y)).right(1.6).label(lab, loc="bottom"))
        return s

    yU, yL, yB = 0.0, -2.2, -4.0
    W = 7.8
    # upper branch
    d += elm.Line().at((0, yU)).to((0.5, yU))
    sw(0.5, yU, "$S_1$")
    d += elm.Line().at((2.1, yU)).to((3.0, yU))
    d += elm.Line().at((3.0, yU + 0.8)).to((3.0, yU - 0.8))
    d += elm.Line().at((6.6, yU + 0.8)).to((6.6, yU - 0.8))
    for dy, lab in ((0.8, "$S_2$"), (-0.8, "$S_3$")):
        d += elm.Line().at((3.0, yU + dy)).to((4.0, yU + dy))
        sw(4.0, yU + dy, lab)
        d += elm.Line().at((5.6, yU + dy)).to((6.6, yU + dy))
    d += elm.Line().at((6.6, yU)).to((W, yU))
    # lower branch
    x = 0.0
    for lab in ("$S_3'$", "$S_2'$", "$S_1$"):
        d += elm.Line().at((x, yL)).to((x + 0.5, yL))
        sw(x + 0.5, yL, lab)
        d += elm.Line().at((x + 2.1, yL)).to((x + 2.6, yL))
        x += 2.6
    d += elm.Line().at((0, yU)).to((0, yL))
    d += elm.Line().at((W, yU)).to((W, yL))
    # battery and lamp
    d += elm.Line().at((0, yL)).to((-0.9, yL))
    d += elm.Line().at((-0.9, yL)).to((-0.9, yB))
    d += elm.Line().at((W, yL)).to((W + 0.9, yL))
    d += elm.Line().at((W + 0.9, yL)).to((W + 0.9, yB))
    bat = d.add(elm.Battery().at((-0.9, yB)).right(1.6))
    lamp = d.add(elm.Source().at((W + 0.9 - 1.6, yB)).right(1.6))
    d += elm.Label().at(lamp.center).label("$L$", loc="center", ofst=0)
    d += elm.Line().at(bat.end).to(lamp.start)
    d += elm.Line().at(lamp.end).to((W + 0.9, yB))


circuit(f"{D}/q062.png", q62)
switch_network(f"{D}/q062-A.png", [["$S_1$"]])
switch_network(f"{D}/q062-B.png", [["$S_2$"]])
switch_network(f"{D}/q062-C.png", [["$S_1$"], ["$S_2$"]])
switch_network(f"{D}/q062-D.png", [["$S_1$", "$S_2$"]])


# Q97: lines 2x + y = 2 (through E(0,2) and A(1,0)), x - y = 1 (through A(1,0) and B(10/3,7/3)),
# x + 2y = 8 (through D(0,4), B and C(8,0)). Shaded: D-E-A-B.
def q97(ax, np):
    ax.annotate("", xy=(9.2, 0), xytext=(-1.2, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
    ax.annotate("", xy=(0, 6.0), xytext=(0, -1.2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
    ax.text(9.3, -0.05, "$X$", va="center", fontsize=13)
    ax.text(0.15, 5.9, "$Y$", fontsize=13)
    kw = dict(color="black", lw=1.3)
    x = np.linspace(-0.6, 1.7, 10)
    ax.plot(x, 2 - 2 * x, **kw)
    x = np.linspace(0.3, 5.5, 10)
    ax.plot(x, x - 1, **kw)
    x = np.linspace(-0.8, 9.0, 10)
    ax.plot(x, (8 - x) / 2, **kw)
    ax.add_patch(Polygon([(0, 4), (0, 2), (1, 0), (10 / 3, 7 / 3)], closed=True, facecolor="none",
                         edgecolor="black", hatch="///", lw=0))
    for (px, py), lab, (dx, dy), ha in (((0, 4), "$D\\,(0,4)$", (0.2, 0.25), "left"),
                                        ((0, 2), "$E\\,(0,2)$", (-0.2, 0.0), "right"),
                                        ((1, 0), "$A\\,(1,0)$", (0.25, -0.45), "left"),
                                        ((10 / 3, 7 / 3), "$B\\,(\\frac{10}{3},\\frac{7}{3})$", (0.3, -0.1), "left"),
                                        ((8, 0), "$C$", (0.0, -0.45), "center"),
                                        ((0, 0), "$O\\,(0,0)$", (-0.2, -0.45), "right")):
        ax.plot([px], [py], "ko", ms=3)
        ax.text(px + dx, py + dy, lab, fontsize=12, ha=ha, va="center")
    ax.set_aspect("equal")
    ax.set_xlim(-3.0, 10.0)
    ax.set_ylim(-1.6, 6.3)
    ax.axis("off")


graph(f"{D}/q097.png", q97, size=(5.4, 3.4))
