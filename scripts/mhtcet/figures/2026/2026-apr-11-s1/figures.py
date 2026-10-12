"""Redrawn figures for MHT-CET 2026, 11 April Shift I. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import axes_through_origin, circuit, graph, here, molecule  # noqa: E402,F401

D = here(__file__)


# Q83: y = sin x and y = cos x between x = 2pi and 5pi/2; they cross at 9pi/4. The shaded
# region lies under sin x from 2pi to 9pi/4 and under cos x from 9pi/4 to 5pi/2.
def q083(ax, np):
    p = np.pi
    x = np.linspace(2 * p - 0.25, 5 * p / 2 + 0.25, 400)
    ax.plot(x, np.sin(x), color="black", lw=1.5)
    ax.plot(x, np.cos(x), color="black", lw=1.5, ls="--")
    xs = np.linspace(2 * p, 5 * p / 2, 300)
    ax.fill_between(xs, 0, np.minimum(np.sin(xs), np.cos(xs)), facecolor="none", edgecolor="black", hatch="|||", lw=0)
    ax.axhline(0, color="black", lw=1)
    for v in (2 * p, 9 * p / 4, 5 * p / 2):
        ax.axvline(v, color="0.6", lw=0.8, ls=":")
    ax.set_xticks([2 * p, 9 * p / 4, 5 * p / 2], [r"$2\pi$", r"$\frac{9\pi}{4}$", r"$\frac{5\pi}{2}$"])
    ax.set_yticks([])
    # each label beside its own curve: cos x is high near 2pi, sin x is high near 5pi/2
    ax.text(2 * p - 0.2, 1.06, r"$y = \cos x$", fontsize=13)
    ax.text(5 * p / 2 - 0.55, 1.06, r"$y = \sin x$", fontsize=13)
    ax.tick_params(axis="x", labelsize=15)
    ax.set_xlim(2 * p - 0.25, 5 * p / 2 + 0.25)
    ax.set_ylim(-0.3, 1.25)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_position("zero")


graph(f"{D}/q083.png", q083)


# Q112: three identical rods in series between walls at 3T (left) and T (right);
# conductivities 2K, K, 2K; junction temperatures T1 (left) and T2 (right).
def q112(ax, np):
    from matplotlib.patches import Rectangle

    for i, k in enumerate(["2K", "K", "2K"]):
        ax.add_patch(Rectangle((i * 3, 0), 3, 1.2, fill=False, lw=1.6))
        ax.text(i * 3 + 1.5, 0.6, f"${k}$", ha="center", va="center", fontsize=16)
    for x, side in ((0, -1), (9, 1)):
        ax.plot([x, x], [-0.6, 1.8], color="black", lw=2)
        for y in np.linspace(-0.6, 1.6, 9):
            ax.plot([x, x + side * 0.35], [y, y + 0.25], color="black", lw=1)
    ax.text(-0.6, 0.6, "$3T$", ha="right", va="center", fontsize=16)
    ax.text(9.6, 0.6, "$T$", ha="left", va="center", fontsize=16)
    for x, lab in ((3, "$T_1$"), (6, "$T_2$")):
        ax.plot([x, x], [0, -0.35], color="black", lw=1.2)
        ax.text(x, -0.55, lab, ha="center", va="top", fontsize=16)
    ax.set_xlim(-1.8, 10.8)
    ax.set_ylim(-1.3, 2.0)
    ax.set_aspect("equal")
    ax.axis("off")


graph(f"{D}/q112.png", q112, size=(6.4, 2.2))


# Q115: cyclic process ABCDA, A(3V0, 2P0) -> B(5V0, 2P0) -> C(5V0, 4P0) -> D(3V0, 4P0) -> A.
def q115(ax, np):
    pts = {"A": (3, 2), "B": (5, 2), "C": (5, 4), "D": (3, 4)}
    order = ["A", "B", "C", "D", "A"]
    for a, b in zip(order, order[1:]):
        (x0, y0), (x1, y1) = pts[a], pts[b]
        ax.plot([x0, x1], [y0, y1], color="black", lw=1.6)
        ax.annotate("", xy=((x0 + x1) / 2 + (x1 - x0) * 0.05, (y0 + y1) / 2 + (y1 - y0) * 0.05),
                    xytext=((x0 + x1) / 2, (y0 + y1) / 2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    offs = {"A": (-0.28, -0.32), "B": (0.12, -0.32), "C": (0.12, 0.08), "D": (-0.28, 0.08)}
    for k, (x, y) in pts.items():
        ax.text(x + offs[k][0], y + offs[k][1], f"${k}$", fontsize=15)
    for y, lab in ((2, "$2P_0$"), (4, "$4P_0$")):
        ax.plot([0, 3], [y, y], color="0.45", lw=0.9, ls="--")
        ax.text(-0.12, y, lab, ha="right", va="center", fontsize=14)
    for x, lab in ((3, "$3V_0$"), (5, "$5V_0$")):
        ax.plot([x, x], [0, 2], color="0.45", lw=0.9, ls="--")
        ax.text(x, -0.15, lab, ha="center", va="top", fontsize=14)
    ax.annotate("", xy=(6.3, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.annotate("", xy=(0, 5.1), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.text(6.35, -0.05, "$V$", fontsize=15, va="center")
    ax.text(0.1, 5.05, "$P$", fontsize=15)
    ax.set_xlim(-1.1, 6.8)
    ax.set_ylim(-0.8, 5.4)
    ax.axis("off")


graph(f"{D}/q115.png", q115, size=(5.0, 3.8))


# Q126: V against x through four regions. A-B flat, B-C rising, C-D flat, D-E falling to zero;
# the fall D-E is steeper than the rise B-C (slopes measured off the printed graph: 1.5 vs 4.1).
def q126(ax, np):
    xs = [0, 0.65, 1.31, 2.61, 3.23]
    vs = [1.56, 1.56, 2.56, 2.56, 0]
    ax.plot(xs, vs, color="black", lw=1.8)
    ax.plot(xs, vs, "o", color="black", ms=5)
    for x, v, lab, dx in zip(xs, vs, "ABCDE", (-0.22, -0.05, -0.12, -0.05, 0.08)):
        ax.text(x + dx, v + 0.12, f"${lab}$", fontsize=15)
    for x in xs[1:4]:
        ax.plot([x, x], [0, 2.56 if x > 1 else 1.56], color="0.45", lw=0.9, ls="--")
    for x, lab in zip((0.33, 0.98, 1.96, 2.92), "1234"):
        ax.text(x, 0.18, lab, ha="center", fontsize=15)
    ax.annotate("", xy=(3.75, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.annotate("", xy=(0, 3.3), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.text(3.8, -0.05, "$x$", fontsize=15, va="center")
    ax.text(0.08, 3.25, "$V$", fontsize=15)
    ax.set_xlim(-0.4, 4.0)
    ax.set_ylim(-0.3, 3.5)
    ax.axis("off")


graph(f"{D}/q126.png", q126, size=(4.6, 3.6))


# Q130 options: chi against T.
#  (A) chi starts at a finite value and falls in an S-shaped curve towards zero
#  (B) chi falls as 1/T (Curie)  (C) chi a negative constant  (D) chi a positive constant
def chi_axes(ax, np, low=0.0):
    ax.annotate("", xy=(1.15, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
    ax.annotate("", xy=(0, 1.1), xytext=(0, low), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3))
    ax.text(1.12, -0.12, "$T$", fontsize=15)
    ax.text(-0.11, 1.0, r"$\chi$", fontsize=15)
    ax.text(-0.1, -0.12, "$O$", fontsize=14)
    ax.set_xlim(-0.2, 1.25)
    ax.set_ylim(min(low, -0.2) - 0.05, 1.15)
    ax.axis("off")


def q130a(ax, np):
    t = np.linspace(0, 1, 200)
    ax.plot(t, 0.9 / (1 + np.exp((t - 0.35) * 12)) + 0.02, color="black", lw=1.8)
    chi_axes(ax, np)


def q130b(ax, np):
    t = np.linspace(0.04, 1, 200)
    ax.plot(t, 0.04 / (t + 0.005), color="black", lw=1.8)
    chi_axes(ax, np)


def q130c(ax, np):
    ax.plot([0, 1], [-0.45, -0.45], color="black", lw=1.8)
    chi_axes(ax, np, low=-0.7)


def q130d(ax, np):
    ax.plot([0, 1], [0.45, 0.45], color="black", lw=1.8)
    chi_axes(ax, np, low=-0.7)


for lab, fn in zip("ABCD", (q130a, q130b, q130c, q130d)):
    graph(f"{D}/q130-{lab}.png", fn, size=(2.8, 2.4))


# Q135: R in series with bulb B1, and L in series with bulb B2, form two parallel branches;
# the switch S and the battery are in the common line that feeds both.
def q135(d, elm):
    # Lamp and Switch are not two-terminal "to()" elements in schemdraw: place them by
    # direction, then join their ends with wires.
    d += elm.Resistor().at((0, 4)).to((2.6, 4)).label("$R$", loc="bottom")
    b1 = d.add(elm.Lamp().at((2.6, 4)).right().label("$B_1$", loc="top"))
    d += elm.Line().at(b1.end).to((6, 4))
    d += elm.Inductor2(loops=5).at((0, 2)).to((2.6, 2)).label("$L$", loc="bottom")
    b2 = d.add(elm.Lamp().at((2.6, 2)).right().label("$B_2$", loc="bottom"))
    d += elm.Line().at(b2.end).to((6, 2))
    d += elm.Line().at((6, 2)).to((6, 4))
    sw = d.add(elm.Switch().at((6, 4)).right().label("$S$", loc="top"))
    d += elm.Line().at(sw.end).to((9, 4))
    d += elm.Line().at((9, 4)).to((9, 0))
    d += elm.Battery().at((9, 0)).to((0, 0))
    d += elm.Line().at((0, 0)).to((0, 4))
    d += elm.Dot().at((0, 2))
    d += elm.Dot().at((6, 4))


circuit(f"{D}/q135.png", q135)


# Q138: series circuit: ac source, 6 ohm resistor, 50 uF capacitor, and a coil of 5 mH with 4 ohm resistance.
def q138(d, elm):
    src = d.add(elm.SourceSin().at((0, 3)).right())
    d += elm.Line().at(src.end).to((4, 3))
    d += elm.Resistor().at((4, 3)).to((7, 3)).label(r"$6\ \Omega$", loc="top")
    d += elm.Line().at((7, 3)).to((7, 0))
    d += elm.Capacitor().at((7, 0)).to((4, 0)).label(r"$50\ \mu F$", loc="bottom")
    d += elm.Inductor2(loops=4).at((4, 0)).to((0, 0)).label(r"$5\ mH,\ 4\ \Omega$", loc="bottom")
    d += elm.Line().at((0, 0)).to((0, 3))


circuit(f"{D}/q138.png", q138)


# Q148: A -> NOT (G1) and B -> NOT (G2) feed a NOR gate (G3), whose output goes through NOT (G4) to Y.
def q148(d, elm):
    from schemdraw import logic

    g1 = d.add(logic.Not().at((1, 3)).right().label("$G_1$", loc="top"))
    d.add(elm.Line().at((0, 3)).to(g1.in1).label("$A$", loc="left"))
    g2 = d.add(logic.Not().at((1, 0)).right().label("$G_2$", loc="bottom"))
    d.add(elm.Line().at((0, 0)).to(g2.in1).label("$B$", loc="left"))
    g3 = d.add(logic.Nor().at((5.5, 1.5)).anchor("out").right().label("$G_3$", loc="top", ofst=0.25))
    d.add(elm.Wire("-|").at(g1.out).to(g3.in1))
    d.add(elm.Wire("-|").at(g2.out).to(g3.in2))
    g4 = d.add(logic.Not().at(g3.out).right().label("$G_4$", loc="top"))
    out = d.add(elm.Line().at(g4.out).right(0.8))
    d.add(elm.Label().at(out.end).label("$Y$", loc="right", ofst=0.15))


circuit(f"{D}/q148.png", q148)
