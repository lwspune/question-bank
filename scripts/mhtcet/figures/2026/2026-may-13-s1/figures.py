"""Redrawn figures for MHT-CET 2026, 13 May Shift I. See ../draw.py."""
import os
import sys

from matplotlib.patches import Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule  # noqa: E402

D = here(__file__)

# Q50: four substituted phenols (C = chloroxylenol, 4-chloro-3,5-dimethylphenol).
molecule("Oc1cc(Cl)c(Br)c(Br)c1", f"{D}/q050-A.png", up=0)
molecule("Oc1cc(C)c(O)c(Cl)c1", f"{D}/q050-B.png", up=0)
molecule("Oc1cc(C)c(Cl)c(C)c1", f"{D}/q050-C.png", up=0)
molecule("Oc1cc(C)c(Br)c(Cl)c1", f"{D}/q050-D.png", up=0)


# Q106: a rod AB of length L with a mass m at each end; axis XX' through its centre O,
# perpendicular to the rod.
def q106(ax, np):
    ax.plot([0, 4], [0, 0], color="black", lw=3)
    ax.plot([0, 4], [0, 0], "o", color="black", ms=9)
    ax.plot([2, 2], [-1.8, 1.8], color="black", lw=1, ls="--")
    ax.text(0, 0.3, "$m$", ha="center", fontsize=15)
    ax.text(4, 0.3, "$m$", ha="center", fontsize=15)
    ax.text(0, -0.45, "$A$", ha="center", va="top", fontsize=14)
    ax.text(4, -0.45, "$B$", ha="center", va="top", fontsize=14)
    ax.text(2.12, -0.45, "$O$", va="top", fontsize=14)
    ax.text(2, 1.9, "$X$", ha="center", va="bottom", fontsize=14)
    ax.text(2, -1.9, "$X'$", ha="center", va="top", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-0.5, 4.5)
    ax.set_ylim(-2.4, 2.4)
    ax.axis("off")


graph(f"{D}/q106.png", q106, size=(3.2, 3.0))


# Q119: a mass m between two fixed walls, joined to the left wall by spring S1 (end A)
# and to the right wall by spring S2 (end B).
def q119(ax, np):
    def spring(x0, x1, y=0.0, turns=8, amp=0.18):
        L = x1 - x0
        xs = [x0, x0 + 0.1 * L]
        ys = [y, y]
        s = np.linspace(0.1, 0.9, turns * 2 + 1)
        for i, t in enumerate(s[1:-1], 1):
            xs.append(x0 + t * L)
            ys.append(y + amp * (1 if i % 2 else -1))
        xs += [x0 + 0.9 * L, x1]
        ys += [y, y]
        ax.plot(xs, ys, color="black", lw=1.3)

    for x, sgn in ((0, -1), (7, 1)):
        ax.plot([x, x], [-0.9, 0.9], color="black", lw=2)
        for yy in np.arange(-0.85, 0.9, 0.2):
            ax.plot([x, x + 0.15 * sgn], [yy, yy + 0.15], color="black", lw=0.8)
    spring(0, 2.9)
    ax.add_patch(Rectangle((2.9, -0.5), 1.2, 1.0, fill=False, lw=1.6))
    ax.text(3.5, 0, "$m$", ha="center", va="center", fontsize=16)
    spring(4.1, 7)
    ax.text(1.45, 0.4, "$A$", ha="center", fontsize=14)
    ax.text(5.55, 0.4, "$B$", ha="center", fontsize=14)
    ax.text(1.45, -0.45, "$S_1$", ha="center", va="top", fontsize=14)
    ax.text(5.55, -0.45, "$S_2$", ha="center", va="top", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 7.4)
    ax.set_ylim(-1.1, 1.1)
    ax.axis("off")


graph(f"{D}/q119.png", q119, size=(5.0, 1.6))


# Q128: parallel plate capacitor, plate separation d; a dielectric slab of constant k and
# thickness d/2 between the plates, covering the full plate area.
def q128(ax, np):
    ax.plot([0, 0], [-1.6, 1.6], color="black", lw=2.5)
    ax.plot([4, 4], [-1.6, 1.6], color="black", lw=2.5)
    ax.plot([-1.2, 0], [0, 0], color="black", lw=1.4)
    ax.plot([4, 5.2], [0, 0], color="black", lw=1.4)
    ax.add_patch(Rectangle((0.6, -1.6), 2.0, 3.2, facecolor="white", edgecolor="black", hatch="///", lw=1.4))
    ax.text(1.6, 0, "$k$", ha="center", va="center", fontsize=18, bbox=dict(facecolor="white", edgecolor="none", pad=1))
    ax.annotate("", xy=(0.6, 1.95), xytext=(2.6, 1.95), arrowprops=dict(arrowstyle="<->", lw=1))
    ax.text(1.6, 2.1, "$d/2$", ha="center", fontsize=14)
    ax.annotate("", xy=(0, -2.1), xytext=(4, -2.1), arrowprops=dict(arrowstyle="<->", lw=1))
    ax.text(2, -2.25, "$d$", ha="center", va="top", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-1.4, 5.4)
    ax.set_ylim(-2.8, 2.6)
    ax.axis("off")


graph(f"{D}/q128.png", q128, size=(3.6, 3.0))


# Q149: an emitter E and a collector C joined through two diodes that meet at the base B.
# Each option is a different pair of diode directions.
def transistor(left_to_b, c_to_b):
    """left_to_b: the E-side diode points from E towards B; c_to_b: the C-side diode
    points from C towards B."""

    def build(d, elm):
        E, J, C = (0, 0), (4, 0), (8, 0)
        d += elm.Dot(open=False).at(E).label("$E$", loc="left")
        if left_to_b:
            d += elm.Diode().at(E).to(J)
        else:
            d += elm.Diode().at(J).to(E)
        if c_to_b:
            d += elm.Diode().at(C).to(J)
        else:
            d += elm.Diode().at(J).to(C)
        d += elm.Dot().at(J)
        d += elm.Line().at(J).to((4, -1.6))
        d += elm.Dot().at((4, -1.6)).label("$B$", loc="bottom")
        d += elm.Dot().at(C).label("$C$", loc="right")

    return build


circuit(f"{D}/q149-A.png", transistor(True, False))
circuit(f"{D}/q149-B.png", transistor(False, False))
circuit(f"{D}/q149-C.png", transistor(True, True))
circuit(f"{D}/q149-D.png", transistor(False, True))
