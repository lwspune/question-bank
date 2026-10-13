"""Redrawn figures for MHT-CET 2026, 13 April Shift I. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecule, scheme  # noqa: E402,F401

D = here(__file__)

# Q38: 1-methylcyclohexene --(conc. H2SO4 / H2O)--> [A]
scheme(f"{D}/q038.png", [("mol", "CC1=CCCCC1", 0), ("arrow", r"Conc. $\mathrm{H_2SO_4}$", r"$\mathrm{H_2O}$"), ("text", "[A]")])
# options: (A) 2-methylcyclohexanol (B) 1-methylcyclohexanol (C) cyclohexylmethanol
#          (D) 2-(hydroxymethyl)cyclohexanol
molecule("OC1CCCCC1C", f"{D}/q038-A.png", up=0)
molecule("CC1(O)CCCCC1", f"{D}/q038-B.png", up=1)
molecule("OCC1CCCCC1", f"{D}/q038-C.png", up=1)
molecule("OCC1CCCCC1O", f"{D}/q038-D.png", up=1)


def _axes(ax, xlab, ylab, down=False):
    """Plain arrowed axes from the origin. down=True draws the y axis pointing DOWN with the
    x axis along the top, as the printed graphs B-D of Q134 do."""
    ax.axis("off")
    if down:
        ax.annotate("", xy=(1.1, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
        ax.annotate("", xy=(0, -1.1), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
        ax.text(1.0, 0.07, xlab, fontsize=14, ha="right")
        ax.text(-0.09, -0.45, ylab, fontsize=14, ha="right")
        ax.set_xlim(-0.25, 1.2)
        ax.set_ylim(-1.2, 0.25)
    else:
        ax.annotate("", xy=(1.1, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
        ax.annotate("", xy=(0, 1.1), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
        ax.text(1.12, -0.06, xlab, fontsize=14, ha="right", va="top")
        ax.text(-0.09, 1.0, ylab, fontsize=14, ha="right")
        ax.text(-0.09, -0.13, "$O$", fontsize=13, ha="right")
        ax.set_xlim(-0.25, 1.2)
        ax.set_ylim(-0.25, 1.2)


# Q134 options: induced emf e against dI/dt.
# (A) straight line rising from the origin; (B) e constant (axis drawn downward);
# (C) straight line from the origin, e growing downward; (D) curve bending down.
def q134a(ax, np):
    _axes(ax, r"$dI/dt$", "$e$")
    ax.plot([0, 0.95], [0, 0.95], color="black", lw=1.8)


def q134b(ax, np):
    _axes(ax, r"$dI/dt$", "$e$", down=True)
    ax.plot([0, 0.95], [-0.5, -0.5], color="black", lw=1.8)


def q134c(ax, np):
    _axes(ax, r"$dI/dt$", "$e$", down=True)
    ax.plot([0, 0.95], [0, -0.95], color="black", lw=1.8)


def q134d(ax, np):
    _axes(ax, r"$dI/dt$", "$e$", down=True)
    t = np.linspace(0, 0.9, 100)
    ax.plot(t, -(t / 0.9) ** 3 * 0.95, color="black", lw=1.8)


for lab, fn in zip("ABCD", (q134a, q134b, q134c, q134d)):
    graph(f"{D}/q134-{lab}.png", fn, size=(2.6, 2.3))


# Q145: E against I. P horizontal (above I axis); Q through the origin (steepest);
# R parallel to Q, starting on the I axis; S parallel to Q, starting further along.
def q145(ax, np):
    _axes(ax, "$I$", "$E$")
    ax.plot([0, 0.95], [0.3, 0.3], color="black", lw=1.6)
    ax.plot([0, 0.95], [0.3, 1.0], color="black", lw=1.6)
    ax.plot([0, 0.95], [0, 0.85], color="black", lw=1.6)
    ax.plot([0.3, 0.95], [0, 0.58], color="black", lw=1.6)
    for y, lab in ((0.3, "P"), (1.0, "Q"), (0.85, "R"), (0.58, "S")):
        ax.text(0.98, y, f"${lab}$", fontsize=15, va="center")


graph(f"{D}/q145.png", q145, size=(3.6, 3.2))


# Q148 options: resistivity rho against T.
# (A) straight line rising from O; (B) falling curve, concave up; (C) straight line falling;
# (D) curve rising, concave up.
def q148a(ax, np):
    _axes(ax, "$T$", r"$\rho$")
    ax.plot([0, 0.9], [0, 0.9], color="black", lw=1.8)


def q148b(ax, np):
    _axes(ax, "$T$", r"$\rho$")
    t = np.linspace(0.05, 0.95, 100)
    ax.plot(t, 0.05 / (t + 0.0) + 0.08, color="black", lw=1.8)


def q148c(ax, np):
    _axes(ax, "$T$", r"$\rho$")
    ax.plot([0, 0.85], [0.9, 0.05], color="black", lw=1.8)


def q148d(ax, np):
    _axes(ax, "$T$", r"$\rho$")
    t = np.linspace(0.05, 0.95, 100)
    ax.plot(t, 0.15 + 0.9 * (t - 0.05) ** 2.4, color="black", lw=1.8)


for lab, fn in zip("ABCD", (q148a, q148b, q148c, q148d)):
    graph(f"{D}/q148-{lab}.png", fn, size=(2.6, 2.3))
