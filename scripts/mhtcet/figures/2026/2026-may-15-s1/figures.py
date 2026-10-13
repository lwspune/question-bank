"""Redrawn figures for MHT-CET 2026, 15 May Shift I. See ../draw.py."""
import os
import sys

from matplotlib.patches import Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import graph, here, molecule, switch_network  # noqa: E402

D = here(__file__)

# Q12: N-methylaniline, 2-methylaniline, benzylamine (phenylmethanamine), diphenylamine.
molecule("CNc1ccccc1", f"{D}/q012-A.png", up=1)
molecule("Nc1ccccc1C", f"{D}/q012-B.png", up=0)
molecule("NCc1ccccc1", f"{D}/q012-C.png", size=(420, 260))
molecule("c1ccc(Nc2ccccc2)cc1", f"{D}/q012-D.png", size=(460, 260))

# Q62: three parallel branches S1-S2', S1'-S2, S1'-S2' with a battery and lamp L.
switch_network(
    f"{D}/q062.png",
    [["$S_1$", "$S_2'$"], ["$S_1'$", "$S_2$"], ["$S_1'$", "$S_2'$"]],
)


# Q114: P-V diagram, straight path from A (4 m^3, 5 kPa) to B (6 m^3, 2 kPa).
def q114(ax, np):
    ax.annotate("", xy=(7.6, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
    ax.annotate("", xy=(0, 6.6), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
    ax.plot([4, 6], [5, 2], color="black", lw=1.6)
    ax.annotate("", xy=(5.25, 3.125), xytext=(4.9, 3.65), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=16))
    ax.plot([4, 6], [5, 2], "o", color="black", ms=6)
    ax.plot([0, 4], [5, 5], color="black", lw=0.9, ls=":")
    ax.plot([4, 4], [0, 5], color="black", lw=0.9, ls=":")
    ax.plot([0, 6], [2, 2], color="black", lw=0.9, ls=":")
    ax.plot([6, 6], [0, 2], color="black", lw=0.9, ls=":")
    ax.text(4, 5.25, "A", ha="center", va="bottom", fontsize=14)
    ax.text(6.15, 2.2, "B", ha="left", va="bottom", fontsize=14)
    ax.text(-0.25, 5, "5", ha="right", va="center", fontsize=13)
    ax.text(-0.25, 2, "2", ha="right", va="center", fontsize=13)
    ax.text(-0.25, -0.25, "0", ha="right", va="top", fontsize=13)
    ax.text(4, -0.3, "4", ha="center", va="top", fontsize=13)
    ax.text(6, -0.3, "6", ha="center", va="top", fontsize=13)
    ax.text(7.7, -0.3, r"$V\ (\mathrm{m^3})$", ha="center", va="top", fontsize=13)
    ax.text(-0.2, 6.75, r"$P\ (\mathrm{kPa})$", ha="center", va="bottom", fontsize=13)
    ax.set_xlim(-1.2, 8.6)
    ax.set_ylim(-1.2, 7.5)
    ax.axis("off")


graph(f"{D}/q114.png", q114, size=(4.0, 3.4))


# Q126: square ABCD (A top left, B top right, C bottom right, D bottom left) with
# 10 uC at the centre and the 2 uC charge at corner A.
def q126(ax, np):
    ax.add_patch(Rectangle((0, 0), 4, 4, fill=False, lw=1.6, edgecolor="black"))
    ax.plot([2], [2], "o", color="black", ms=6)
    ax.text(2, 2.25, r"$10\,\mu\mathrm{C}$", ha="center", va="bottom", fontsize=14)
    ax.plot([0], [4], "o", color="black", ms=6)
    ax.text(-0.15, 4.15, "A", ha="right", va="bottom", fontsize=14)
    ax.text(4.15, 4.15, "B", ha="left", va="bottom", fontsize=14)
    ax.text(4.15, -0.15, "C", ha="left", va="top", fontsize=14)
    ax.text(-0.15, -0.15, "D", ha="right", va="top", fontsize=14)
    ax.text(-0.2, 3.3, r"$2\,\mu\mathrm{C}$", ha="right", va="center", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-1.8, 5.0)
    ax.set_ylim(-0.9, 5.0)
    ax.axis("off")


graph(f"{D}/q126.png", q126, size=(3.4, 3.0))


# Q134: rod AC in a field B into the paper (crosses); O divides it with AO = L, OC = 3L;
# the rod turns counter-clockwise (omega) about O.
def q134(ax, np):
    for y in (1.6, 0.7, -0.7, -1.6):
        for x in np.arange(0.6, 8.0, 1.0):
            ax.text(x, y, r"$\times$", ha="center", va="center", fontsize=13)
    ax.plot([0, 8], [0, 0], color="black", lw=2.6)
    ax.plot([2], [0], "o", color="black", ms=5)
    ax.text(-0.2, 0, "A", ha="right", va="center", fontsize=15)
    ax.text(8.2, 0, "C", ha="left", va="center", fontsize=15)
    ax.text(2.1, 0.18, "O", ha="center", va="bottom", fontsize=13)
    ax.text(1.1, 1.15, r"$\omega$", ha="center", va="center", fontsize=16)
    ax.text(8.3, 1.55, r"$\vec{B}$", ha="left", va="center", fontsize=16)
    ax.annotate("", xy=(0, -2.3), xytext=(2, -2.3), arrowprops=dict(arrowstyle="<->", color="black", lw=1.1))
    ax.annotate("", xy=(2, -2.3), xytext=(8, -2.3), arrowprops=dict(arrowstyle="<->", color="black", lw=1.1))
    ax.text(1, -2.45, "$L$", ha="center", va="top", fontsize=14)
    ax.text(5, -2.45, "$3L$", ha="center", va="top", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 9.4)
    ax.set_ylim(-3.2, 2.2)
    ax.axis("off")


graph(f"{D}/q134.png", q134, size=(5.6, 2.8))


# Q138: four X_L against omega sketches: (A) horizontal line, (B) straight line through
# the origin, (C) vertical line, (D) straight line falling to the omega axis.
def q138(ax, np):
    panels = {
        "(A)": ([0, 3.0], [1.8, 1.8]),
        "(B)": ([0, 3.0], [0, 2.6]),
        "(C)": ([1.8, 1.8], [0, 2.6]),
        "(D)": ([0, 3.0], [2.6, 0]),
    }
    for i, (lab, (xs, ys)) in enumerate(panels.items()):
        x0 = i * 4.4
        ax.annotate("", xy=(x0 + 3.5, 0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.annotate("", xy=(x0, 3.2), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1))
        ax.plot([x0 + v for v in xs], ys, color="black", lw=1.6)
        ax.text(x0 + 0.12, 3.25, "$X_L$", ha="left", va="bottom", fontsize=13)
        ax.text(x0 + 3.55, -0.12, r"$\omega$", ha="left", va="top", fontsize=13)
        ax.text(x0 + 1.7, -0.55, lab, ha="center", va="top", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 17.2)
    ax.set_ylim(-1.3, 3.9)
    ax.axis("off")


graph(f"{D}/q138.png", q138, size=(8.0, 2.4))
