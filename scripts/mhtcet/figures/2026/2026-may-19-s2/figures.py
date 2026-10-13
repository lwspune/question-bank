"""Redrawn figures for MHT-CET 2026, 19 May Shift II. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402
from matplotlib.patches import Arc, Circle, Ellipse, FancyArrowPatch, Polygon  # noqa: E402

D = here(__file__)

# Q106: a horizontal ring (seen in perspective) spinning about the vertical axis through its
# centre O; two light rods run from O to the ring, each carrying a point mass.
def q106(ax, np):
    ax.add_patch(Ellipse((0, 0), 6.0, 2.4, fill=False, lw=1.8))
    ax.add_patch(Ellipse((0, 0), 5.4, 2.0, fill=False, lw=1.8))
    # axis
    ax.plot([0, 0], [0, 2.6], color="black", lw=1.4)
    ax.plot([0, 0], [0, -1.3], color="black", lw=1.2, ls=(0, (2, 2)))
    ax.add_patch(Arc((0, 2.1), 0.7, 0.25, theta1=200, theta2=520, lw=1.3))
    ax.annotate("", xy=(0.33, 2.16), xytext=(0.36, 2.06), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2, mutation_scale=12))
    ax.text(0.25, 2.55, r"$\omega$", fontsize=16, va="bottom")
    # rods from O to the inner ring
    for end in ((-2.3, 0.52), (1.75, 0.72)):
        ax.plot([0, end[0]], [0, end[1]], color="black", lw=1.4)
    ax.plot(*(-1.0, 0.226), "o", color="black", ms=8)
    ax.plot(*(0.75, 0.31), "o", color="black", ms=8)
    ax.plot(0, 0, "o", color="black", ms=4)
    ax.text(-0.35, -0.3, "$O$", fontsize=15, ha="center", va="top")
    ax.set_aspect("equal")
    ax.set_xlim(-3.3, 3.3)
    ax.set_ylim(-1.6, 3.0)
    ax.axis("off")


graph(f"{D}/q106.png", q106, size=(5.0, 3.5))


# Q107: rod BA pivoted at B, starting vertical (A above B) and turned through angle theta.
def q107(ax, np):
    th = np.radians(42)
    L = 4.0
    ax.plot([0, 0], [0, L], color="black", lw=2.2)
    ax.plot([0, L * np.sin(th)], [0, L * np.cos(th)], color="black", lw=2.2)
    ax.add_patch(Arc((0, 0), 1.6, 1.6, theta1=90 - 42, theta2=90, lw=1.2))
    ax.text(0.28, 1.05, r"$\theta$", fontsize=16)
    ax.text(-0.1, L + 0.1, "$A$", fontsize=16, ha="right", va="bottom")
    ax.text(-0.1, -0.1, "$B$", fontsize=16, ha="right", va="top")
    ax.add_patch(FancyArrowPatch((0.15, L + 0.25), (L * np.sin(th) + 0.25, L * np.cos(th) + 0.15),
                                 connectionstyle="arc3,rad=-0.35", arrowstyle="-|>", mutation_scale=16, lw=1.4, color="black"))
    ax.text(1.4, L + 0.75, r"$\omega$", fontsize=16, ha="center")
    ax.plot(0, 0, "o", color="black", ms=5)
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 3.6)
    ax.set_ylim(-0.7, 5.3)
    ax.axis("off")


graph(f"{D}/q107.png", q107, size=(3.0, 3.8))


# Q108: three equal rings in one plane. A sits on the axis YY'; B and C sit either side,
# each touching the axis, their centres at distance R from it.
def q108(ax, np):
    R = 1.0
    for c in ((0, 2 * R * np.sin(np.radians(60))), (-R, 0), (R, 0)):
        ax.add_patch(Circle(c, R, fill=False, lw=1.6))
    ax.plot([0, 0], [-1.7, 3.4], color="black", lw=1.2)
    ax.plot([-R, R], [0, 0], color="black", lw=1.0)
    ax.text(-R / 2, 0.08, "$R$", fontsize=13, ha="center", va="bottom")
    ax.text(R / 2, 0.08, "$R$", fontsize=13, ha="center", va="bottom")
    ax.text(1.12, 2.1, "$A$", fontsize=14)
    ax.text(-2.35, 0, "$B$", fontsize=14, va="center")
    ax.text(2.15, 0, "$C$", fontsize=14, va="center")
    ax.text(0, 3.45, "$Y$", fontsize=14, ha="center", va="bottom")
    ax.text(0, -1.75, "$Y'$", fontsize=14, ha="center", va="top")
    ax.set_aspect("equal")
    ax.set_xlim(-2.4, 2.4)
    ax.set_ylim(-2.1, 3.9)
    ax.axis("off")


graph(f"{D}/q108.png", q108, size=(3.0, 3.8))


# Q114: P-V cycle. AB vertical (isochoric), BC adiabatic curve down to C, CA horizontal (isobaric).
def q114(ax, np):
    ax.annotate("", xy=(0, 4.2), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.annotate("", xy=(5.6, 0), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.text(-0.1, 4.2, "$P$", fontsize=14, ha="right", va="top")
    ax.text(5.6, -0.1, "$V$", fontsize=14, ha="left", va="top")
    ax.text(-0.15, -0.15, "$0$", fontsize=13, ha="right", va="top")
    va, vc, pa, pb = 1.0, 4.0, 1.1, 3.3
    gamma = np.log(pb / pa) / np.log(vc / va)
    v = np.linspace(va, vc, 100)
    ax.plot(v, pb * (va / v) ** gamma, color="black", lw=1.5)
    ax.plot([va, va], [pa, pb], color="black", lw=1.5)
    ax.plot([va, vc], [pa, pa], color="black", lw=1.5)
    for x, y in ((va, pa), (va, pb), (vc, pa)):
        ax.plot(x, y, "o", color="black", ms=5)
    ax.text(va - 0.05, pb + 0.15, "B (800 K)", fontsize=12, va="bottom")
    ax.text(va - 0.2, pa - 0.15, "A (400 K)", fontsize=12, va="top")
    ax.text(vc - 0.4, pa - 0.15, "C (600 K)", fontsize=12, va="top")
    ax.set_xlim(-0.5, 6.0)
    ax.set_ylim(-0.5, 4.5)
    ax.axis("off")


graph(f"{D}/q114.png", q114, size=(4.2, 3.2))


# Q130: a ladder network. Battery 9 V on the left; top rail 3, 2, 2 ohm; bottom rail
# 2, 2, 2 ohm; rungs 8, 8 and 4 ohm.
def q130(d, elm):
    W = 3.0
    H = 3.0
    xs = [0, W, 2 * W, 3 * W]
    d += elm.Battery().at((0, 0)).to((0, H)).label(r"$9\ \mathrm{V}$", loc="bottom", ofst=0.25)
    for (a, b), (rt, rb) in zip(zip(xs, xs[1:]), ((r"$3\ \Omega$", r"$2\ \Omega$"), (r"$2\ \Omega$", r"$2\ \Omega$"), (r"$2\ \Omega$", r"$2\ \Omega$"))):
        d += elm.Resistor().at((a, H)).to((b, H)).label(rt, loc="top")
        d += elm.Resistor().at((a, 0)).to((b, 0)).label(rb, loc="bottom")
    for x, r in zip(xs[1:], (r"$8\ \Omega$", r"$8\ \Omega$", r"$4\ \Omega$")):
        d += elm.Resistor().at((x, H)).to((x, 0)).label(r, loc="bottom")
    for x in xs[1:3]:
        d += elm.Dot().at((x, H))
        d += elm.Dot().at((x, 0))


circuit(f"{D}/q130.png", q130)


# Q136: current I splits into I1 through L1 (upper branch) and I2 through L2 (lower branch).
def q136(d, elm):
    d += elm.Line().at((-1.8, 0)).to((0, 0)).label("$I$", loc="top")
    d += elm.Arrow().at((-1.4, 0)).to((-0.6, 0))
    d += elm.Dot().at((0, 0))
    d += elm.Line().at((0, 0)).to((0, 1.4))
    d += elm.Line().at((0, 0)).to((0, -1.4))
    d += elm.Line().at((0, 1.4)).to((1.6, 1.4)).label("$I_1$", loc="bottom")
    d += elm.Arrow().at((0.4, 1.4)).to((1.2, 1.4))
    d += elm.Line().at((0, -1.4)).to((1.6, -1.4)).label("$I_2$", loc="top")
    d += elm.Arrow().at((0.4, -1.4)).to((1.2, -1.4))
    d += elm.Inductor2(loops=5).at((1.6, 1.4)).to((4.0, 1.4)).label("$L_1$", loc="top")
    d += elm.Inductor2(loops=5).at((1.6, -1.4)).to((4.0, -1.4)).label("$L_2$", loc="bottom")
    d += elm.Line().at((4.0, 1.4)).to((5.4, 1.4))
    d += elm.Line().at((4.0, -1.4)).to((5.4, -1.4))
    d += elm.Line().at((5.4, 1.4)).to((5.4, -1.4))
    d += elm.Dot().at((5.4, 0))
    d += elm.Line().at((5.4, 0)).to((7.2, 0)).label("$I$", loc="top")
    d += elm.Arrow().at((6.0, 0)).to((6.8, 0))


circuit(f"{D}/q136.png", q136)


# Q140: right-angled isosceles prism PQR (right angle at Q). A ray XO enters face PQ normally,
# meets face PR at O with 45 degrees incidence, and leaves through QR towards Y.
def q140(ax, np):
    P, Q, R = (0, 4), (0, 0), (4, 0)
    ax.add_patch(Polygon([P, Q, R], closed=True, fill=False, lw=1.6))
    O = (2, 2)
    ax.annotate("", xy=(0.9, 2), xytext=(-1.2, 2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.plot([-1.2, 2], [2, 2], color="black", lw=1.3)
    ax.plot([2, 2], [2, -0.9], color="black", lw=1.3)
    ax.annotate("", xy=(2, -1.0), xytext=(2, -0.3), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.plot(*O, "o", color="black", ms=4)
    ax.text(-1.35, 2, "X", fontsize=14, ha="right", va="center")
    ax.text(2, -1.15, "Y", fontsize=14, ha="center", va="top")
    ax.text(2.15, 2.15, "O", fontsize=14)
    ax.text(-0.15, 4.05, "P", fontsize=14, ha="right")
    ax.text(-0.15, -0.1, "Q", fontsize=14, ha="right", va="top")
    ax.text(4.1, -0.1, "R", fontsize=14, va="top")
    ax.add_patch(Arc(P, 1.2, 1.2, theta1=270, theta2=315, lw=1.0))
    ax.text(0.25, 3.15, r"$45^\circ$", fontsize=11)
    ax.add_patch(Arc(R, 1.2, 1.2, theta1=135, theta2=180, lw=1.0))
    ax.text(2.85, 0.25, r"$45^\circ$", fontsize=11)
    ax.add_patch(Arc(O, 0.9, 0.9, theta1=135, theta2=180, lw=1.0))
    ax.text(1.0, 2.15, r"$45^\circ$", fontsize=11)
    ax.add_patch(Arc(O, 1.2, 1.2, theta1=225, theta2=270, lw=1.0))
    ax.text(1.25, 1.15, r"$45^\circ$", fontsize=11)
    ax.plot([0, 0.3, 0.3], [0.3, 0.3, 0], color="black", lw=1.0)
    ax.text(0.4, 0.35, r"$90^\circ$", fontsize=11)
    ax.set_aspect("equal")
    ax.set_xlim(-1.8, 4.6)
    ax.set_ylim(-1.6, 4.5)
    ax.axis("off")


graph(f"{D}/q140.png", q140, size=(3.8, 3.8))


# Q142: a ray in glass meets the glass-water boundary at incidence i1, refracts at r, then
# meets the water-air surface at incidence i2 and runs along that surface (refraction 90 deg).
def q142(ax, np):
    ax.plot([0, 6], [3, 3], color="black", lw=1.6)
    ax.plot([0, 6], [1, 1], color="black", lw=1.6)
    for x0 in np.arange(-2.0, 6.0, 0.4):
        x1, y1 = x0 + 1.0, 0.0
        xs, ys = [x0, x1], [1.0, y1]
        ax.plot(xs, ys, color="black", lw=0.5)
    ax.set_xlim(0, 6)
    a, b, c = (2.2, 3.0), (3.6, 1.0), (4.15, -0.2)
    ax.plot([a[0], b[0], c[0]], [a[1], b[1], c[1]], color="black", lw=1.5)
    ax.annotate("", xy=(4.0, 0.12), xytext=(4.15, -0.2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.3, mutation_scale=14))
    ax.annotate("", xy=(0.6, 3.0), xytext=(2.2, 3.0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.5, mutation_scale=16))
    ax.plot([2.2, 2.2], [3.0, 3.7], color="black", lw=1.0)
    ax.plot([2.2, 1.95, 1.95], [3.25, 3.25, 3.0], color="black", lw=0.9)
    ax.text(1.75, 3.35, r"$90^\circ$", fontsize=11, ha="right")
    ax.plot([2.2, 2.2], [3.0, 2.3], color="black", lw=0.9)
    ax.text(2.3, 2.35, "$i_2$", fontsize=13)
    ax.plot([3.6, 3.6], [1.0, 1.9], color="black", lw=0.9)
    ax.text(3.35, 1.45, "$r$", fontsize=13, ha="right")
    ax.plot([3.6, 3.6], [1.0, 0.0], color="black", lw=0.9)
    ax.text(3.62, 0.08, "$i_1$", fontsize=11, bbox=dict(facecolor="white", edgecolor="none", pad=0.5))
    ax.text(0.2, 3.25, "Air", fontsize=13)
    ax.text(0.2, 2.2, "Water", fontsize=13)
    ax.text(4.7, 2.0, r"$\mu_w = \dfrac{4}{3}$", fontsize=13)
    ax.text(0.2, 0.4, "Glass", fontsize=13, bbox=dict(facecolor="white", edgecolor="none", pad=1))
    ax.set_ylim(-0.3, 3.9)
    ax.set_aspect("equal")
    ax.axis("off")


graph(f"{D}/q142.png", q142, size=(4.6, 3.2))


# Q150: C = A AND B; NOT A feeds a second AND with B to give D; E = C OR D.
def q150(d, elm):
    from schemdraw import logic

    g1 = d.add(logic.And().at((4.0, 4.5)).anchor("in1").right())
    g2 = d.add(logic.And().at((4.0, 0.0)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, g1.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, g1.in1.y)).to(g1.in1))
    d.add(elm.Dot().at((1.0, g1.in1.y)))
    d.add(elm.Line().at((1.0, g1.in1.y)).down(0.4))
    nt = d.add(logic.Not().down())
    d.add(elm.Wire("|-").at(nt.out).to(g2.in1))
    d.add(elm.Dot(open=True).at((0, g2.in2.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, g2.in2.y)).to(g2.in2))
    d.add(elm.Dot().at((2.6, g2.in2.y)))
    d.add(elm.Wire("|-").at((2.6, g2.in2.y)).to(g1.in2))
    org = d.add(logic.Or().at((8.0, 2.25)).anchor("in1").right())
    d.add(elm.Wire("-|").at(g1.out).to(org.in1).label("$C$", loc="top"))
    d.add(elm.Wire("-|").at(g2.out).to(org.in2).label("$D$", loc="bottom"))
    out = d.add(elm.Line().at(org.out).right(0.8))
    d.add(elm.Dot(open=True).at(out.end).label("$E$", loc="right"))


circuit(f"{D}/q150.png", q150)
