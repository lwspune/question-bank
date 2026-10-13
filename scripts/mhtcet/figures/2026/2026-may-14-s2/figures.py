"""Redrawn figures for MHT-CET 2026, 14 May Shift II. See ../draw.py."""
import os
import sys

from matplotlib.patches import Circle, Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q105: three identical blocks A, B, C in a row on a smooth floor; A moves towards B.
def q105(ax, np):
    ax.plot([-0.3, 9.3], [0, 0], color="black", lw=1.6)
    for x, lab in ((0.0, "A"), (3.8, "B"), (7.0, "C")):
        ax.add_patch(Rectangle((x, 0), 1.8, 1.4, fill=False, lw=1.8))
        ax.text(x + 0.9, 0.7, f"$\\mathrm{{{lab}}}$", ha="center", va="center", fontsize=20)
    ax.annotate("", xy=(3.4, 0.7), xytext=(2.1, 0.7), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16))
    ax.set_aspect("equal")
    ax.set_xlim(-0.4, 9.4)
    ax.set_ylim(-0.2, 1.6)
    ax.axis("off")


graph(f"{D}/q105.png", q105, size=(5.6, 1.3))


# Q113: four P-V diagrams, each from A to B: (a) a gentle hyperbola (isothermal),
# (b) a horizontal line (isobaric), (c) a vertical line (isochoric), (d) a steep curve
# (adiabatic).
def q113(ax, np):
    panels = ["a", "b", "c", "d"]
    w = 3.7
    for i, lab in enumerate(panels):
        x0 = i * w
        ax.annotate("", xy=(x0, 2.6), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2, mutation_scale=12))
        ax.annotate("", xy=(x0 + 2.8, 0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2, mutation_scale=12))
        ax.text(x0 - 0.12, 2.6, "$P$", ha="right", va="center", fontsize=13)
        ax.text(x0 + 2.8, -0.12, "$V$", ha="center", va="top", fontsize=13)
        ax.text(x0 - 0.1, -0.1, "$0$", ha="right", va="top", fontsize=11)
        ax.text(x0 + 1.4, -0.5, f"({lab})", ha="center", va="top", fontsize=13)
        if lab == "a":
            v = np.linspace(0.5, 2.2, 100)
            p = 1.1 / v
            pts = ((0.5, 2.2), (2.2, 0.5))
        elif lab == "d":
            v = np.linspace(0.6, 2.2, 100)
            p = 0.3 + 1.8 * (0.6 / v) ** 2.5
            pts = ((0.6, 2.1), (2.2, 0.3 + 1.8 * (0.6 / 2.2) ** 2.5))
        if lab in ("a", "d"):
            ax.plot(x0 + v, p, color="black", lw=1.5)
        elif lab == "b":
            pts = ((0.5, 1.7), (2.1, 1.7))
            ax.plot([x0 + 0.5, x0 + 2.1], [1.7, 1.7], color="black", lw=1.5)
        else:
            pts = ((1.4, 2.1), (1.4, 0.6))
            ax.plot([x0 + 1.4, x0 + 1.4], [2.1, 0.6], color="black", lw=1.5)
        for (vx, py), name in zip(pts, ("A", "B")):
            ax.plot(x0 + vx, py, "o", color="black", ms=4)
            ax.text(x0 + vx + 0.08, py + 0.08, f"$\\mathrm{{{name}}}$", ha="left", va="bottom", fontsize=11)
    ax.set_aspect("equal")
    ax.set_xlim(-0.6, 4 * w)
    ax.set_ylim(-1.0, 2.9)
    ax.axis("off")


graph(f"{D}/q113.png", q113, size=(8.0, 2.4))


# Q125: q1 = 8q (positive) at the origin, q2 = -2q (negative) on the x-axis at distance L.
def q125(ax, np):
    ax.annotate("", xy=(5.2, 0), xytext=(-1.2, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2, mutation_scale=12))
    ax.annotate("", xy=(0, 2.4), xytext=(0, -2.0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2, mutation_scale=12))
    ax.text(5.3, 0, "$x$", ha="left", va="center", fontsize=15)
    ax.text(0, 2.5, "$y$", ha="center", va="bottom", fontsize=15)
    for x, sign, lab in ((0, "$+$", "$q_1$"), (3.6, "$-$", "$q_2$")):
        ax.add_patch(Circle((x, 0), 0.3, facecolor="white", edgecolor="black", lw=1.5, zorder=3))
        ax.text(x, 0, sign, ha="center", va="center", fontsize=15, zorder=4)
        ax.text(x - 0.35 if x == 0 else x, 0.5, lab, ha="right" if x == 0 else "center", va="bottom", fontsize=15)
    ax.plot([3.6, 3.6], [-0.3, -1.6], color="black", lw=0.9)
    ax.annotate("", xy=(0, -1.3), xytext=(3.6, -1.3), arrowprops=dict(arrowstyle="<|-|>", color="black", lw=1.1, mutation_scale=12))
    ax.text(1.8, -1.2, "$L$", ha="center", va="bottom", fontsize=15, bbox=dict(facecolor="white", edgecolor="none", pad=1))
    ax.set_aspect("equal")
    ax.set_xlim(-1.4, 5.8)
    ax.set_ylim(-2.1, 3.0)
    ax.axis("off")


graph(f"{D}/q125.png", q125, size=(4.2, 3.0))


# Q149: an AND gate on two inputs feeds a NAND gate whose other input is the third input.
def q149(d, elm):
    from schemdraw import logic

    g1 = d.add(logic.And().at((1.5, 0)).anchor("in1").right())
    g2 = d.add(logic.Nand().at((g1.out.x + 1.2, g1.out.y - 0.6)).anchor("in1").right())
    d.add(elm.Line().at(g1.out).to((g1.out.x + 0.6, g1.out.y)))
    d.add(elm.Wire("|-").at((g1.out.x + 0.6, g1.out.y)).to(g2.in1))
    for pin in (g1.in1, g1.in2):
        d.add(elm.Dot().at((0, pin.y)))
        d.add(elm.Line().at((0, pin.y)).to(pin))
    y3 = g2.in2.y
    d.add(elm.Dot().at((0, y3)))
    d.add(elm.Line().at((0, y3)).to(g2.in2))
    out = d.add(elm.Line().at(g2.out).right(0.8))
    d.add(elm.Label().at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q149.png", q149)
