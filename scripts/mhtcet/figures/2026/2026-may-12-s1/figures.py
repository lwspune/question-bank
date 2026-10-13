"""Redrawn figures for MHT-CET 2026, 12 May Shift I. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Arc, Ellipse, Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, switch_network  # noqa: E402

D = here(__file__)

# Q64: three branches in parallel: S1 alone; S1' with S2'; S1 with S2.
switch_network(f"{D}/q064.png", [["$S_1$"], ["$S_1'$", "$S_2'$"], ["$S_1$", "$S_2$"]])


# Q104: aeroplane A moving along a line at 30 deg to the horizontal; aeroplane B along a line
# at 60 deg, starting further right on the same horizontal.
def q104(ax, np):
    ax.plot([-0.3, 6.2], [0, 0], color="black", lw=1.4)
    a30, a60 = np.radians(30), np.radians(60)
    arr = dict(arrowstyle="-|>", color="black", lw=1.4, mutation_scale=14, linestyle="--")
    ax.annotate("", xy=(4.6 * np.cos(a30), 4.6 * np.sin(a30)), xytext=(0, 0), arrowprops=arr)
    ax.annotate("", xy=(4.8 + 1.4 * np.cos(a60), 1.4 * np.sin(a60)), xytext=(4.8, 0), arrowprops=arr)
    ax.plot([4.6 * np.cos(a30)], [4.6 * np.sin(a30)], "ko", ms=7)
    ax.plot([4.8 + 1.4 * np.cos(a60)], [1.4 * np.sin(a60)], "ko", ms=7)
    ax.text(4.6 * np.cos(a30) + 0.15, 4.6 * np.sin(a30) + 0.1, "$A$", fontsize=15)
    ax.text(4.8 + 1.4 * np.cos(a60) + 0.15, 1.4 * np.sin(a60) + 0.05, "$B$", fontsize=15)
    ax.add_patch(Arc((0, 0), 1.6, 1.6, theta1=0, theta2=30, lw=1.1))
    ax.text(0.95, 0.2, r"$30^\circ$", fontsize=13)
    ax.add_patch(Arc((4.8, 0), 0.9, 0.9, theta1=0, theta2=60, lw=1.1))
    ax.text(5.3, 0.15, r"$60^\circ$", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 6.4)
    ax.set_ylim(-0.3, 2.8)
    ax.axis("off")


graph(f"{D}/q104.png", q104, size=(4.6, 2.2))


# Q113: three identical rods meeting at a junction: one runs left to an end at 0 C, the other
# two run up-right and down-right to ends at 90 C.
def q113(ax, np):
    kw = dict(color="black", lw=4, solid_capstyle="round")
    J = np.array([0.0, 0.0])
    for end, lab, off in ((np.array([-2.0, 0.0]), r"$0^\circ$C", (-0.1, 0.25)),
                          (np.array([1.414, 1.414]), r"$90^\circ$C", (0.15, 0.05)),
                          (np.array([1.414, -1.414]), r"$90^\circ$C", (0.15, -0.25))):
        ax.plot(*zip(J, end), **kw)
        ax.plot(*zip(J, end), color="white", lw=2)
        ax.plot([end[0]], [end[1]], "o", color="black", ms=6, mfc="white")
        ax.text(end[0] + off[0], end[1] + off[1], lab, fontsize=13, ha="right" if end[0] < 0 else "left")
    ax.set_aspect("equal")
    ax.set_xlim(-2.6, 2.6)
    ax.set_ylim(-1.8, 1.8)
    ax.axis("off")


graph(f"{D}/q113.png", q113, size=(3.6, 2.6))


# Q115: P-V cycle ABCDA: A(3V, 3p) -> B(1V, 3p) -> C(1V, 1p) -> D(9V, 1p) -> along a curve
# (pV = 9) back to A.
def q115(ax, np):
    ax.annotate("", xy=(10.5, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
    ax.annotate("", xy=(0, 4.0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
    ax.text(-0.2, 3.9, "$p$", ha="right", fontsize=14)
    ax.text(10.6, -0.1, "$V$", va="center", fontsize=14)
    ax.text(-0.2, -0.2, "0", ha="right", va="top", fontsize=12)
    kw = dict(color="black", lw=1.6)
    arr = dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16)
    ax.plot([3, 1], [3, 3], **kw)
    ax.annotate("", xy=(1.8, 3), xytext=(2.4, 3), arrowprops=arr)
    ax.plot([1, 1], [3, 1], **kw)
    ax.annotate("", xy=(1, 1.8), xytext=(1, 2.4), arrowprops=arr)
    ax.plot([1, 9], [1, 1], **kw)
    ax.annotate("", xy=(5.5, 1), xytext=(4.5, 1), arrowprops=arr)
    v = np.linspace(3, 9, 80)
    ax.plot(v, 9 / v, **kw)
    ax.annotate("", xy=(4.6, 9 / 4.6), xytext=(5.4, 9 / 5.4), arrowprops=arr)
    dash = dict(color="black", lw=0.8, ls=":")
    for x in (1, 3, 9):
        ax.plot([x, x], [0, 3.6], **dash)
    for y in (1, 3):
        ax.plot([0, 9.6], [y, y], **dash)
    for (x, y), t in (((3, 3), "A"), ((1, 3), "B"), ((1, 1), "C"), ((9, 1), "D")):
        ax.plot([x], [y], "ko", ms=4)
    ax.text(3.15, 3.15, "$A$", fontsize=13)
    ax.text(0.65, 3.15, "$B$", fontsize=13)
    ax.text(1.15, 0.6, "$C$", fontsize=13)
    ax.text(9.15, 0.6, "$D$", fontsize=13)
    ax.text(-0.2, 3, "$3p$", ha="right", va="center", fontsize=12)
    ax.text(-0.2, 1, "$1p$", ha="right", va="center", fontsize=12)
    for x, t in ((1, "$1V$"), (3, "$3V$"), (9, "$9V$")):
        ax.text(x, -0.15, t, ha="center", va="top", fontsize=12)
    ax.set_xlim(-1.2, 11.0)
    ax.set_ylim(-0.8, 4.2)
    ax.axis("off")


graph(f"{D}/q115.png", q115, size=(4.6, 2.6))


# Q119: four identical springs k crossing in an X between the ceiling and a block of mass m:
# two from the ceiling corners meet at a central point, and two run from there to the block.
def q119(ax, np):
    def spring(p0, p1, turns=9, amp=0.12):
        p0, p1 = np.array(p0, float), np.array(p1, float)
        d = p1 - p0
        L = np.linalg.norm(d)
        u = d / L
        n = np.array([-u[1], u[0]])
        s = np.linspace(0.12, 0.88, turns * 2 + 1)
        pts = [p0 + u * L * 0.12] + [p0 + u * L * t + n * amp * (1 if i % 2 else -1) for i, t in enumerate(s[1:-1], 1)] + [p0 + u * L * 0.88]
        xs = [p0[0]] + [q[0] for q in pts] + [p1[0]]
        ys = [p0[1]] + [q[1] for q in pts] + [p1[1]]
        ax.plot(xs, ys, color="black", lw=1.2)

    ax.plot([-0.2, 4.2], [4, 4], color="black", lw=1.6)
    for x in np.arange(-0.2, 4.2, 0.18):
        ax.plot([x, x + 0.15], [4, 4.15], color="black", lw=0.8)
    C = (2.0, 2.0)
    for p, lab, lp in (((0.3, 4), "$k$", (0.45, 2.75)), ((3.7, 4), "$k$", (3.35, 2.75)),
                       ((0.3, 0.4), "$k$", (0.45, 1.45)), ((3.7, 0.4), "$k$", (3.35, 1.45))):
        spring(p, C)
        ax.text(*lp, lab, fontsize=15)
    ax.plot([C[0]], [C[1]], "o", color="black", ms=5, mfc="white")
    ax.add_patch(Rectangle((0.0, -0.4), 4.0, 0.8, fill=False, lw=1.6))
    ax.text(2.0, 0.0, "$m$", ha="center", va="center", fontsize=16)
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 4.4)
    ax.set_ylim(-0.6, 4.4)
    ax.axis("off")


graph(f"{D}/q119.png", q119, size=(3.0, 3.0))


# Q141: a biconvex lens made of two plano-convex halves joined along a flat face (dashed);
# left half n = 1.5, right half n = 1.2; both curved faces have R = 14 cm.
def q141(ax, np):
    ax.add_patch(Ellipse((0, 0), 1.0, 5.0, fill=False, lw=1.8))
    ax.plot([0, 0], [-2.5, 2.5], color="black", lw=1.0, ls="--")
    arr = dict(arrowstyle="-|>", color="black", lw=1.1)
    ax.annotate("", xy=(-0.25, 1.4), xytext=(-1.2, 2.3), arrowprops=arr)
    ax.text(-1.3, 2.4, "$n = 1.5$", ha="right", fontsize=14)
    ax.annotate("", xy=(0.25, 1.4), xytext=(1.2, 2.3), arrowprops=arr)
    ax.text(1.3, 2.4, "$n = 1.2$", fontsize=14)
    ax.annotate("", xy=(-0.4, -1.9), xytext=(-0.9, -2.9), arrowprops=arr)
    ax.annotate("", xy=(0.4, -1.9), xytext=(0.9, -2.9), arrowprops=arr)
    ax.text(0, -3.2, "$R = 14$ cm", ha="center", va="top", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-3.0, 3.0)
    ax.set_ylim(-3.8, 3.0)
    ax.axis("off")


graph(f"{D}/q141.png", q141, size=(3.0, 3.4))


# Q148: four NAND gates: G1(A, B); G2(A, G1); G3(G1, B); G4(G2, G3) -> Y.
def q148(d, elm):
    from schemdraw import logic

    g1 = d.add(logic.Nand().at((2.0, 1.5)).anchor("in1").right())
    g2 = d.add(logic.Nand().at((5.5, 3.3)).anchor("in1").right())
    g3 = d.add(logic.Nand().at((5.5, 0.0)).anchor("in1").right())
    yA, yB = g2.in1.y, g3.in2.y
    d.add(elm.Dot(open=True).at((0, yA)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, yA)).to(g2.in1))
    d.add(elm.Dot().at((1.0, yA)))
    d.add(elm.Wire("|-").at((1.0, yA)).to(g1.in1))
    d.add(elm.Dot(open=True).at((0, yB)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, yB)).to(g3.in2))
    d.add(elm.Dot().at((1.0, yB)))
    d.add(elm.Wire("|-").at((1.0, yB)).to(g1.in2))
    d.add(elm.Line().at(g1.out).right(0.4))
    jx = g1.out.x + 0.4
    d.add(elm.Dot().at((jx, g1.out.y)))
    d.add(elm.Wire("|-").at((jx, g1.out.y)).to(g2.in2))
    d.add(elm.Wire("|-").at((jx, g1.out.y)).to(g3.in1))
    g4 = d.add(logic.Nand().at((9.5, 2.3)).anchor("in1").right())
    d.add(elm.Wire("-|").at(g2.out).to(g4.in1))
    d.add(elm.Wire("-|").at(g3.out).to(g4.in2))
    out = d.add(elm.Line().at(g4.out).right(0.8))
    d.add(elm.Dot().at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q148.png", q148)
