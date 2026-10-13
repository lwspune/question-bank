"""Redrawn figures for MHT-CET 2026, 19 May Shift I. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q15: keto-enol tautomerism written as open-chain fragments:
# -C(alpha)(H)-C(=O)-  <=>  -C=C(-O-H)-
def q015(ax, np):
    def atom(x, y, s, **kw):
        ax.text(x, y, s, ha="center", va="center", fontsize=17, bbox=dict(facecolor="white", edgecolor="none", pad=0.5), zorder=3, **kw)

    def bond(x1, y1, x2, y2):
        ax.plot([x1, x2], [y1, y2], color="black", lw=1.5, zorder=1)

    # keto form
    bond(-0.8, 0, 1.2, 0)
    bond(1.2, 0, 2.0, 0)
    bond(0, 0, 0, 0.7)
    bond(0, 0, 0, -0.9)
    for dx in (-0.07, 0.07):
        bond(1.2 + dx, 0, 1.2 + dx, -0.9)
    atom(0, 0, "C")
    atom(1.2, 0, "C")
    atom(0, -1.05, "H")
    atom(1.2, -1.05, "O")
    ax.text(0.18, 0.45, r"$\alpha$", fontsize=14, ha="left", va="center")

    # equilibrium arrows
    ax.annotate("", xy=(3.6, 0.12), xytext=(2.5, 0.12), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4, mutation_scale=14))
    ax.annotate("", xy=(2.5, -0.12), xytext=(3.6, -0.12), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4, mutation_scale=14))

    # enol form
    bond(4.0, 0, 4.6, 0)
    for dy in (-0.07, 0.07):
        bond(4.6, dy, 5.8, dy)
    bond(5.8, 0, 6.5, 0)
    bond(4.6, 0, 4.6, 0.7)
    bond(5.8, 0, 5.8, -0.9)
    bond(5.8, -1.05, 6.7, -1.05)
    atom(4.6, 0, "C")
    atom(5.8, 0, "C")
    atom(5.8, -1.05, "O")
    atom(6.85, -1.05, "H")

    ax.set_aspect("equal")
    ax.set_xlim(-1.0, 7.2)
    ax.set_ylim(-1.5, 1.0)
    ax.axis("off")


graph(f"{D}/q015.png", q015, size=(6.4, 2.2))


# Q106: pendulum of length 2 m held horizontal at P; it swings down a quarter circle to Q,
# directly below the point of suspension.
def q106(ax, np):
    ax.plot([0, 2], [2, 2], color="black", lw=1.6)
    ax.plot([0, 0], [2, 0], color="black", lw=1.2, ls="--")
    t = np.linspace(0, -np.pi / 2, 60)
    ax.plot(2 * np.cos(t), 2 + 2 * np.sin(t), color="black", lw=1.2, ls="--")
    ax.plot([2], [2], "o", color="black", ms=9)
    ax.plot([0], [0], "o", color="black", ms=9)
    ax.text(2.15, 2.05, "P", fontsize=15, ha="left", va="center")
    ax.text(-0.15, -0.05, "Q", fontsize=15, ha="right", va="center")
    ax.text(-0.12, 1.1, r"$h = 2\ \mathrm{m}$", fontsize=14, ha="right", va="center")
    ax.set_aspect("equal")
    ax.set_xlim(-1.4, 2.6)
    ax.set_ylim(-0.4, 2.4)
    ax.axis("off")


graph(f"{D}/q106.png", q106, size=(3.6, 2.8))


# Q129: 4 ohm (current I1 = 1.2 A) in parallel with 3 ohm (I2); the pair in series with
# 6 ohm; a cell and a key close the loop along the bottom. Total current I.
def q129(d, elm):
    d += elm.Line().at((-1.5, 0)).to((0, 0))
    d += elm.Arrow().at((-1.3, 0)).to((-0.6, 0)).label("$I$", loc="top")
    d += elm.Line().at((0, -1)).to((0, 1))
    d += elm.Line().at((0, 1)).to((1.0, 1))
    d += elm.Arrow().at((0.2, 1)).to((0.9, 1)).label(r"$I_1 = 1.2\ \mathrm{A}$", loc="top", ofst=0.15)
    d += elm.Resistor().at((1.0, 1)).to((3.5, 1)).label(r"$4\,\Omega$", loc="top", ofst=0.15)
    d += elm.Line().at((3.5, 1)).to((4.5, 1))
    d += elm.Line().at((0, -1)).to((1.0, -1))
    d += elm.Arrow().at((0.2, -1)).to((0.9, -1)).label("$I_2$", loc="bottom")
    d += elm.Resistor().at((1.0, -1)).to((3.5, -1)).label(r"$3\,\Omega$", loc="bottom", ofst=0.15)
    d += elm.Line().at((3.5, -1)).to((4.5, -1))
    d += elm.Line().at((4.5, -1)).to((4.5, 1))
    d += elm.Line().at((4.5, 0)).to((5.5, 0))
    d += elm.Arrow().at((4.6, 0)).to((5.3, 0)).label("$I$", loc="top")
    d += elm.Resistor().at((5.5, 0)).to((8.0, 0)).label(r"$6\,\Omega$", loc="top", ofst=0.15)
    d += elm.Line().at((8.0, 0)).to((8.8, 0))
    d += elm.Line().at((8.8, 0)).to((8.8, -3))
    d += elm.Line().at((8.8, -3)).to((6.0, -3))
    d += elm.Switch().at((6.0, -3)).to((4.2, -3)).label("$K$", loc="bottom")
    d += elm.Line().at((4.2, -3)).to((2.8, -3))
    d += elm.Battery().at((2.8, -3)).to((1.0, -3))
    d += elm.Line().at((1.0, -3)).to((-1.5, -3))
    d += elm.Line().at((-1.5, -3)).to((-1.5, 0))
    d += elm.Dot().at((0, 0))
    d += elm.Dot().at((4.5, 0))


circuit(f"{D}/q129.png", q129)


# Q144: stopping potential V0 against frequency: a straight line cutting the X (frequency)
# axis at A and the negative Y axis at B; O is the origin.
def q144(ax, np):
    ax.annotate("", xy=(4.2, 0), xytext=(-0.2, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.annotate("", xy=(0, 2.6), xytext=(0, -2.3), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.plot([0, 3.0], [-2.0, 2.4], color="black", lw=1.6)
    a = 2.0 * 3.0 / 4.4
    ax.text(4.3, 0, "$X$", fontsize=14, ha="left", va="center")
    ax.text(0, 2.75, "$Y$", fontsize=14, ha="center", va="bottom")
    ax.text(-0.15, 0.2, "$O$", fontsize=14, ha="right", va="bottom")
    ax.text(a - 0.15, 0.2, "$A$", fontsize=14, ha="right", va="bottom")
    ax.text(-0.15, -2.0, "$B$", fontsize=14, ha="right", va="center")
    ax.text(-0.9, 0.7, "$V_0$", fontsize=14, ha="center", va="center")
    ax.annotate("", xy=(-0.9, 1.6), xytext=(-0.9, 1.0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.1, mutation_scale=12))
    ax.text(3.6, -0.25, r"$\nu$", fontsize=14, ha="center", va="top")
    ax.set_aspect("equal")
    ax.set_xlim(-1.4, 4.7)
    ax.set_ylim(-2.5, 3.1)
    ax.axis("off")


graph(f"{D}/q144.png", q144, size=(3.6, 3.4))


# Q148: an 18 V cell drives current I through R1 = 800 ohm; below R1 the circuit splits into
# R2 = 1800 ohm and a reverse-biased Zener diode (Vz = 9 V) in parallel.
def q148(d, elm):
    d += elm.BatteryCell().at((0, 3.8)).to((0, 1.2)).label(r"$18\ \mathrm{V}$", loc="top", ofst=0.3)
    d += elm.Line().at((0, 3.8)).to((0, 6))
    d += elm.Line().at((0, 6)).to((3, 6))
    d += elm.Arrow().at((0.8, 6)).to((1.8, 6)).label("$I$", loc="top")
    d += elm.Resistor().at((3, 6)).to((3, 3.5)).label(r"$R_1$", loc="bottom").label(r"$800\ \Omega$", loc="top")
    d += elm.Resistor().at((3, 3.5)).to((3, 1)).label(r"$R_2$", loc="bottom").label(r"$1800\ \Omega$", loc="top")
    d += elm.Line().at((3, 1)).to((3, 0))
    d += elm.Line().at((3, 3.5)).to((6, 3.5))
    d += elm.Zener().at((6, 1)).to((6, 3.5)).label(r"$V_z = 9\ \mathrm{V}$", loc="bottom", ofst=0.3)
    d += elm.Line().at((6, 1)).to((6, 0))
    d += elm.Line().at((6, 0)).to((0, 0))
    d += elm.Line().at((0, 0)).to((0, 1.2))
    d += elm.Dot().at((3, 3.5))
    d += elm.Dot().at((3, 0))
    d += elm.Label().at((0.45, 3.0)).label("$+$", loc="center", ofst=0)
    d += elm.Label().at((0.45, 2.0)).label("$-$", loc="center", ofst=0)


circuit(f"{D}/q148.png", q148)


# Q150: three band diagrams, conduction band C on top and valence band V below; the Fermi
# level E_F (dashed) is midway in (1), just above V in (2) and just below C in (3).
def q150(ax, np):
    for i, (ef, lab) in enumerate(((0.5, "(1)"), (0.12, "(2)"), (0.88, "(3)"))):
        x0 = i * 3.2
        ax.plot([x0 + 0.4, x0 + 2.4], [1, 1], color="black", lw=1.6)
        ax.plot([x0 + 0.4, x0 + 2.4], [0, 0], color="black", lw=1.6)
        ax.plot([x0 + 0.4, x0 + 2.4], [ef, ef], color="black", lw=1.3, ls="--")
        ax.text(x0 + 0.25, 1, "C", fontsize=14, ha="right", va="center")
        ax.text(x0 + 0.25, 0, "V", fontsize=14, ha="right", va="center")
        ax.text(x0 + 2.5, ef, "$E_F$", fontsize=13, ha="left", va="center")
        ax.text(x0 + 1.4, -0.35, lab, fontsize=14, ha="center", va="top")
    ax.set_xlim(-0.3, 9.6)
    ax.set_ylim(-0.75, 1.25)
    ax.axis("off")


graph(f"{D}/q150.png", q150, size=(7.0, 2.2))
