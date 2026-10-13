"""Redrawn figures for MHT-CET 2026, 15 May Shift II. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q114: the p-V curve P = constant/V from state 1 to state 2 (top), and four candidate T-p
# diagrams (a) to (d) below it.
def q114(ax, np):
    k = dict(color="black", lw=1.4)
    arrow = dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=12)

    def axes(x0, y0, w, h, xl, yl):
        ax.annotate("", xy=(x0 + w, y0), xytext=(x0, y0), arrowprops=arrow)
        ax.annotate("", xy=(x0, y0 + h), xytext=(x0, y0), arrowprops=arrow)
        ax.text(x0 + w + 0.1, y0, xl, ha="left", va="center", fontsize=13)
        ax.text(x0 - 0.12, y0 + h, yl, ha="right", va="center", fontsize=13)

    # p-V diagram
    axes(2.0, 3.6, 4.2, 2.7, "$V$", "$P$")
    ax.text(1.85, 3.45, "0", ha="right", va="top", fontsize=12)
    v = np.linspace(1.6, 4.6, 100)
    ax.plot(v + 1.0, 3.6 + 2.6 / (v - 0.7) - 0.15, **k)
    p1 = (2.6, 3.6 + 2.6 / 0.9 - 0.15)
    p2 = (5.6, 3.6 + 2.6 / 3.9 - 0.15)
    ax.text(p1[0] - 0.05, p1[1] + 0.08, "1", ha="right", va="bottom", fontsize=12)
    ax.text(p2[0] + 0.1, p2[1], "2", ha="left", va="center", fontsize=12)
    ax.text(4.6, 5.6, r"$P = \dfrac{\mathrm{constant}}{V}$", ha="center", va="center", fontsize=13)

    # four T-p diagrams
    panels = {
        "(a)": [((0.3, 0.45), "1", "right"), ((1.2, 1.4), "2", "right")],
        "(b)": [((0.6, 0.35), "1", "right"), ((0.6, 1.4), "2", "right")],
        "(c)": [((1.3, 0.85), "1", "above"), ((0.3, 0.85), "2", "above")],
        "(d)": [((0.3, 0.85), "1", "above"), ((1.3, 0.85), "2", "above")],
    }
    for i, (cap, pts) in enumerate(panels.items()):
        x0 = 0.4 + i * 2.5
        y0 = 0.6
        axes(x0, y0, 1.6, 1.9, "$P$", "$T$")
        (a, la, pa), (b, lb, pb) = pts
        A = (x0 + a[0], y0 + a[1])
        B = (x0 + b[0], y0 + b[1])
        ax.plot([A[0], B[0]], [A[1], B[1]], **k)
        for pt, lab, pos in ((A, la, pa), (B, lb, pb)):
            ax.plot(*pt, "o", color="black", ms=4.5)
            dx, dy, ha, va = {"below": (0, -0.12, "center", "top"), "right": (0.1, 0, "left", "center"), "above": (0, 0.12, "center", "bottom")}[pos]
            ax.text(pt[0] + dx, pt[1] + dy, lab, ha=ha, va=va, fontsize=12)
        ax.text(x0 + 0.8, 0.2, cap, ha="center", va="center", fontsize=13)

    ax.set_xlim(-0.1, 10.2)
    ax.set_ylim(0.0, 6.6)
    ax.set_aspect("equal")
    ax.axis("off")


graph(f"{D}/q114.png", q114, size=(7.0, 6.0))


# Q127: four capacitors C (16 microfarad each) in a row. The top wire joins the left end of
# the first to the right end of the fourth, which runs on to B. The junctions after the first
# and after the third capacitor are joined below, and A hangs off that lower wire.
def q127(d, elm):
    xs = [0, 2.5, 5, 7.5, 10]
    for a, b in zip(xs, xs[1:]):
        d += elm.Capacitor().at((a, 0)).to((b, 0)).label("$C$", loc="top")
    d += elm.Line().at((0, 0)).to((0, 2))
    d += elm.Line().at((0, 2)).to((10, 2))
    d += elm.Line().at((10, 2)).to((10, 0))
    d += elm.Line().at((10, 2)).to((11.3, 2))
    d += elm.Line().at((11.3, 2)).to((11.3, 0.4))
    d += elm.Dot().at((11.3, 0.4)).label("$B$", loc="right")
    d += elm.Line().at((2.5, 0)).to((2.5, -1.8))
    d += elm.Line().at((7.5, 0)).to((7.5, -1.8))
    d += elm.Line().at((2.5, -1.8)).to((7.5, -1.8))
    d += elm.Line().at((5, -1.8)).to((5, -3.0))
    d += elm.Dot().at((5, -3.0)).label("$A$", loc="bottom")
    for x in (2.5, 7.5, 10):
        d += elm.Dot().at((x, 0))
    d += elm.Dot().at((10, 2))


circuit(f"{D}/q127.png", q127)


# Q130: a 2 ohm resistor along the top; three identical cells in series, all the same way
# round, along the bottom.
def q130(d, elm):
    d += elm.Resistor().at((0, 3)).to((6, 3)).label(r"$2\,\Omega$", loc="top")
    d += elm.Line().at((0, 3)).to((0, 0))
    d += elm.Line().at((6, 3)).to((6, 0))
    d += elm.Line().at((0, 0)).to((1.2, 0))
    d += elm.BatteryCell().at((1.2, 0)).to((2.4, 0))
    d += elm.Line().at((2.4, 0)).to((2.4, 0))
    d += elm.BatteryCell().at((2.4, 0)).to((3.6, 0))
    d += elm.BatteryCell().at((3.6, 0)).to((4.8, 0))
    d += elm.Line().at((4.8, 0)).to((6, 0))


circuit(f"{D}/q130.png", q130)
