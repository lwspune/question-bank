"""Redrawn figures for MHT-CET 2026, 18 April Shift II. See ../draw.py."""
import os
import sys

import numpy as np
from matplotlib.patches import Circle, Ellipse, Rectangle

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, switch_network  # noqa: E402

D = here(__file__)

# Q61: three branches in parallel: S1 with S2, S1' with S2, S3 with S2'.
switch_network(f"{D}/q061.png", [["$S_1$", "$S_2$"], ["$S_1'$", "$S_2$"], ["$S_3$", "$S_2'$"]])


# Q105: seven identical rings, one in the middle and six around it, each touching its neighbours;
# the radius R of the central ring is marked.
def q105(ax, np):
    ax.add_patch(Circle((0, 0), 1, fill=False, lw=1.8))
    for k in range(6):
        a = np.radians(90 + 60 * k)
        c = (2 * np.cos(a), 2 * np.sin(a))
        ax.add_patch(Circle(c, 1, fill=False, lw=1.8))
        ax.plot([c[0]], [c[1]], "ko", ms=2)
    ax.plot([0, 0], [0, 1], color="black", lw=1.2)
    ax.plot([0], [0], "ko", ms=2)
    ax.text(-0.1, 0.5, "$R$", ha="right", va="center", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-3.2, 3.2)
    ax.set_ylim(-3.2, 3.2)
    ax.axis("off")


graph(f"{D}/q105.png", q105, size=(3.4, 3.4))


# Q109: a tube widening from a small end P (area A_P) to a large end Q (area A_Q); the fluid
# flows from P to Q.
def q109(ax, np):
    t = np.linspace(0, 1, 60)
    top = 0.35 + 1.15 * t**1.6
    x = 6 * t
    ax.plot(x, top, color="black", lw=1.6)
    ax.plot(x, -top, color="black", lw=1.6)
    ax.add_patch(Ellipse((0, 0), 0.25, 0.7, fill=False, lw=1.6))
    ax.add_patch(Ellipse((6, 0), 0.6, 3.0, fill=False, lw=1.6))
    ax.annotate("", xy=(7.0, 0), xytext=(6.1, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.4))
    ax.text(7.1, 0, "$Q$", va="center", fontsize=14)
    ax.text(-0.3, 0, "$P$", ha="right", va="center", fontsize=14)
    ax.text(-0.3, 0.6, "$A_P$", ha="right", fontsize=13)
    ax.text(6.1, 1.65, "$A_Q$", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-1.2, 7.8)
    ax.set_ylim(-2.0, 2.2)
    ax.axis("off")


graph(f"{D}/q109.png", q109, size=(4.4, 2.4))


# Q114: P-V diagram, rectangle A(V0, P0) -> B(3V0, P0) -> C(3V0, 2P0) -> D(V0, 2P0) -> A.
def q114(ax, np):
    ax.annotate("", xy=(4.2, 0), xytext=(-0.2, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
    ax.annotate("", xy=(0, 3.0), xytext=(0, -0.2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
    ax.text(4.25, -0.05, "$V$", va="center", fontsize=14)
    ax.text(0.08, 2.95, "$P$", fontsize=14)
    ax.text(-0.1, -0.1, "$O$", ha="right", va="top", fontsize=13)
    for x in (1, 2, 3):
        ax.plot([x, x], [-0.07, 0.07], color="black", lw=1)
    ax.text(1, -0.15, "$V_0$", ha="center", va="top", fontsize=13)
    ax.text(3, -0.15, "$3V_0$", ha="center", va="top", fontsize=13)
    for y, lab in ((1, "$P_0$"), (2, "$2P_0$")):
        ax.plot([-0.07, 0.07], [y, y], color="black", lw=1)
        ax.text(-0.12, y, lab, ha="right", va="center", fontsize=13)
    kw = dict(color="black", lw=1.6)
    for (x0, y0), (x1, y1) in (((1, 1), (3, 1)), ((3, 1), (3, 2)), ((3, 2), (1, 2)), ((1, 2), (1, 1))):
        ax.plot([x0, x1], [y0, y1], **kw)
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2
        ax.annotate("", xy=(mx + 0.12 * (x1 - x0) / max(abs(x1 - x0), 1e-9) if x1 != x0 else mx,
                            my + 0.12 * np.sign(y1 - y0)),
                    xytext=(mx, my), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16))
    for (x, y), lab, (dx, dy) in (((1, 1), "A", (-0.05, -0.12)), ((3, 1), "B", (0.08, -0.12)),
                                  ((3, 2), "C", (0.08, 0.08)), ((1, 2), "D", (-0.05, 0.08))):
        ax.text(x + dx, y + dy, f"${lab}$", fontsize=14, ha="right" if dx < 0 else "left",
                va="top" if dy < 0 else "bottom")
    ax.set_xlim(-0.8, 4.6)
    ax.set_ylim(-0.6, 3.2)
    ax.axis("off")


graph(f"{D}/q114.png", q114, size=(3.8, 2.8))


# Q118: a spring hanging from a rigid support carrying three stacked blocks: 100 g, 300 g, 500 g.
def q118(ax, np):
    ax.plot([-0.5, 0.5], [5, 5], color="black", lw=1.6)
    for x in np.arange(-0.5, 0.5, 0.12):
        ax.plot([x, x + 0.1], [5, 5.12], color="black", lw=0.9)
    ys = np.linspace(4.6, 3.0, 17)
    xs = [0.18 if i % 2 else -0.18 for i in range(len(ys))]
    xs[0] = xs[-1] = 0
    ax.plot([0, 0], [5, 4.6], color="black", lw=1.2)
    ax.plot(xs, ys, color="black", lw=1.2)
    ax.plot([0, 0], [3.0, 2.6], color="black", lw=1.2)
    for i, lab in enumerate(("100 g", "300 g", "500 g")):
        y = 2.6 - 0.6 * (i + 1)
        ax.add_patch(Rectangle((-0.55, y), 1.1, 0.6, fill=False, lw=1.4))
        ax.text(0, y + 0.3, lab, ha="center", va="center", fontsize=12)
    ax.set_aspect("equal")
    ax.set_xlim(-1.0, 1.0)
    ax.set_ylim(0.6, 5.3)
    ax.axis("off")


graph(f"{D}/q118.png", q118, size=(2.0, 3.8))


# Q125: right-angled isosceles triangle: Q at the right angle (bottom left), 2q at the top,
# q at the bottom right; both legs sqrt(2) a.
def q125(ax, np):
    ax.plot([0, 0, 3, 0], [3, 0, 0, 3], color="black", lw=1.8)
    ax.plot([0, 0.3, 0.3], [0.3, 0.3, 0], color="black", lw=1.2)
    ax.text(-0.15, -0.1, "$Q$", ha="right", va="top", fontsize=14)
    ax.text(0, 3.15, "$2q$", ha="center", fontsize=14)
    ax.text(3.15, 0, "$q$", va="center", fontsize=14)
    ax.text(-0.15, 1.5, r"$\sqrt{2}a$", ha="right", va="center", fontsize=13)
    ax.text(1.5, -0.2, r"$\sqrt{2}a$", ha="center", va="top", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-1.2, 3.6)
    ax.set_ylim(-0.9, 3.6)
    ax.axis("off")


graph(f"{D}/q125.png", q125, size=(3.0, 3.0))


# Q127: left node L and right node R joined by a 2C capacitor along the bottom line and by the
# supply V below; top node T joined to L through 3C (top left) and 3C (vertical), and to R
# through 1C (vertical) and 2C (vertical at the right).
def q127(d, elm):
    yT, yB = 4.0, 0.0
    d += elm.Line().at((0, yB)).to((0, yT))
    d += elm.Capacitor().at((0, yT)).to((2.4, yT)).label("$3C$", loc="top")
    d += elm.Line().at((2.4, yT)).to((8, yT))
    d += elm.Capacitor().at((2.4, yT)).to((2.4, yB)).label("$3C$", loc="bottom")
    d += elm.Capacitor().at((5.2, yT)).to((5.2, yB)).label("$1C$", loc="bottom")
    d += elm.Capacitor().at((8, yT)).to((8, yB)).label("$2C$", loc="bottom")
    d += elm.Line().at((0, yB)).to((2.4, yB))
    d += elm.Capacitor().at((2.4, yB)).to((5.2, yB)).label("$2C$", loc="top")
    d += elm.Line().at((5.2, yB)).to((8, yB))
    for x in (0, 2.4, 5.2, 8):
        d += elm.Dot().at((x, yB))
    d += elm.Line().at((0, yB)).to((0, -2))
    d += elm.Line().at((0, -2)).to((3.2, -2))
    d += elm.BatteryCell().at((3.2, -2)).to((4.8, -2)).label("$V$", loc="top")
    d += elm.Line().at((4.8, -2)).to((8, -2))
    d += elm.Line().at((8, -2)).to((8, yB))


circuit(f"{D}/q127.png", q127)


# Q130: rectangle with a semicircle on its right side. Left side carries I5 upward; top carries
# I6 to the right towards the top-right node TR; from TR a diagonal goes down to the bottom-left
# corner (I3), a vertical goes down to the bottom-right node BR (I2) and the semicircle bulges
# out to the right down to BR (I1); the bottom carries I4 to the left.
def q130(ax, np):
    kw = dict(color="black", lw=1.8)
    TL, TR, BR, BL = (0, 3), (4, 3), (4, 0), (0, 0)
    ax.plot([0, 0, 4], [0, 3, 3], **kw)
    ax.plot([0, 4], [0, 0], **kw)
    ax.plot([4, 4], [3, 0], **kw)
    ax.plot([0, 4], [0, 3], **kw)
    th = np.linspace(np.pi / 2, -np.pi / 2, 60)
    ax.plot(4 + 1.5 * np.cos(th), 1.5 + 1.5 * np.sin(th), **kw)
    arr = dict(arrowstyle="-|>", color="black", lw=1.8, mutation_scale=16)
    ax.annotate("", xy=(0, 1.75), xytext=(0, 1.25), arrowprops=arr)
    ax.annotate("", xy=(2.25, 3), xytext=(1.75, 3), arrowprops=arr)
    ax.annotate("", xy=(1.6, 1.2), xytext=(2.0, 1.5), arrowprops=arr)
    ax.annotate("", xy=(4, 1.25), xytext=(4, 1.75), arrowprops=arr)
    ax.annotate("", xy=(5.5, 1.25), xytext=(5.5, 1.75), arrowprops=arr)
    ax.annotate("", xy=(1.75, 0), xytext=(2.25, 0), arrowprops=arr)
    for (x, y), t in (((-0.15, 1.5), "I_5"), ((2.0, 3.15), "I_6"), ((1.55, 1.75), "I_3"), ((4.15, 1.5), "I_2"),
                      ((5.65, 1.5), "I_1"), ((2.0, -0.2), "I_4")):
        ax.text(x, y, f"${t}$", fontsize=14, ha="right" if t == "I_5" else ("center" if t in ("I_6", "I_4") else "left"),
                va="top" if t == "I_4" else ("bottom" if t == "I_6" else "center"))
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 6.4)
    ax.set_ylim(-0.7, 3.6)
    ax.axis("off")


graph(f"{D}/q130.png", q130, size=(4.2, 2.8))


# Q133: circular loop P (seen at an angle, as an ellipse) threaded by two vertical wires, 3 A
# upward and 1.5 A downward; a third wire carrying 1 A downward runs outside the loop.
def q133(ax, np):
    ax.add_patch(Ellipse((1.5, 0), 3.6, 1.6, fill=False, lw=1.8))
    kw = dict(color="black", lw=1.6)
    for x in (1.0, 1.8):
        ax.plot([x, x], [0.75, 2.6], **kw)
        ax.plot([x, x], [-0.8, -2.6], **kw)
        ax.plot([x, x], [0.75, 0.0], **kw)
    ax.plot([3.8, 3.8], [-2.6, 2.6], **kw)
    arr = dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=16)
    ax.annotate("", xy=(1.0, 2.3), xytext=(1.0, 1.8), arrowprops=arr)
    ax.annotate("", xy=(1.8, 1.8), xytext=(1.8, 2.3), arrowprops=arr)
    ax.annotate("", xy=(3.8, 1.8), xytext=(3.8, 2.3), arrowprops=arr)
    ax.text(0.75, 2.05, "3A", ha="right", va="center", fontsize=13)
    ax.text(2.0, 2.05, "1.5A", va="center", fontsize=13)
    ax.text(4.0, 2.05, "1A", va="center", fontsize=13)
    ax.text(0.15, 0, "$P$", ha="left", va="center", fontsize=14)
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 4.9)
    ax.set_ylim(-2.8, 2.8)
    ax.axis("off")


graph(f"{D}/q133.png", q133, size=(3.2, 3.4))


# Q136: along the middle line: A - 1H - N1 - 3H - N2 - 4H - B. A top wire from A runs across and
# drops to N2; a 2H coil hangs from the top wire down to N1; a bottom wire runs from N1 down,
# across and up to B.
def q136(d, elm):
    def ind(loops=3):
        return elm.Inductor2(loops=loops)

    d += elm.Dot().at((0, 0)).label("$A$", loc="left")
    d += ind().at((0, 0)).to((3, 0)).label("$1H$", loc="top")
    d += ind().at((3, 0)).to((6.5, 0)).label("$3H$", loc="bottom")
    d += ind().at((6.5, 0)).to((10, 0)).label("$4H$", loc="bottom")
    d += elm.Dot().at((10, 0)).label("$B$", loc="right")
    d += elm.Line().at((0, 0)).to((0, 2.4))
    d += elm.Line().at((0, 2.4)).to((6.5, 2.4))
    d += elm.Line().at((6.5, 2.4)).to((6.5, 0))
    d += ind().at((3, 2.4)).to((3, 0)).label("$2H$", loc="bottom")
    d += elm.Line().at((3, 0)).to((3, -2.2))
    d += elm.Line().at((3, -2.2)).to((10, -2.2))
    d += elm.Line().at((10, -2.2)).to((10, 0))
    for p in ((3, 0), (6.5, 0), (3, 2.4)):
        d += elm.Dot().at(p)


circuit(f"{D}/q136.png", q136)


# Q138: series loop: 1 H inductor, 20 uF capacitor and 300 ohm resistor along the top; the
# a.c. source (50 V, 50/pi Hz) along the bottom.
def q138(d, elm):
    d += elm.Inductor2(loops=3).at((0, 3)).to((2.6, 3)).label("$1H$", loc="bottom")
    d += elm.Capacitor().at((2.6, 3)).to((5.0, 3)).label(r"$20\ \mu F$", loc="bottom")
    d += elm.Resistor().at((5.0, 3)).to((8, 3)).label(r"$300\ \Omega$", loc="bottom")
    d += elm.Line().at((8, 3)).to((8, 0))
    d += elm.Line().at((8, 0)).to((4.8, 0))
    src = d.add(elm.SourceSin().at((4.8, 0)).left(1.6))
    d += elm.Label().at((3.0, 0.9)).label(r"$50\ V,\ \frac{50}{\pi}\ Hz$", loc="center", ofst=0)
    d += elm.Line().at(src.end).to((0, 0))
    d += elm.Line().at((0, 0)).to((0, 3))


circuit(f"{D}/q138.png", q138)


# Q142: plane wavefront of width x meets the air-water interface between A and B (incidence
# angle i); the refracted wavefront has width y (refraction angle r). z is the further distance
# the incident wave travels (in air) to reach B; w is the distance the refracted wave travels
# (in water) from A in that time.
def q142(ax, np):
    i, r = np.radians(42), np.radians(28)
    A, B = np.array([0.0, 0.0]), np.array([4.0, 0.0])
    ax.plot([-1.5, 5.5], [0, 0], color="black", lw=1.4)
    for y in np.arange(-0.4, -3.4, -0.45):
        ax.plot([-1.5, 5.5], [y, y], color="black", lw=0.6, ls=(0, (4, 4)))
    d_in = np.array([np.sin(i), -np.cos(i)])
    d_out = np.array([np.sin(r), -np.cos(r)])
    L = 4.0
    z = L * np.sin(i)
    w = L * np.sin(r)
    P = B - z * d_in  # incident wavefront meets the ray to B here
    kw = dict(color="black", lw=1.4)
    arr = dict(arrowstyle="-|>", color="black", lw=1.4, mutation_scale=14)
    ax.annotate("", xy=tuple(A), xytext=tuple(A - 2.6 * d_in), arrowprops=arr)
    ax.annotate("", xy=tuple(B), xytext=tuple(P - 1.2 * d_in), arrowprops=arr)
    ax.plot(*zip(A, P), **kw)
    Wp = A + w * d_out
    ax.annotate("", xy=tuple(A + (w + 1.0) * d_out), xytext=tuple(A), arrowprops=arr)
    ax.annotate("", xy=tuple(B + 1.4 * d_out), xytext=tuple(B), arrowprops=arr)
    ax.plot(*zip(Wp, B), **kw)
    dim = dict(arrowstyle="<|-|>", color="black", lw=1.0, mutation_scale=10)
    n_in = np.array([-np.cos(i), -np.sin(i)]) * 0.25
    ax.annotate("", xy=tuple(B + n_in), xytext=tuple(P + n_in), arrowprops=dim)
    ax.text(*((B + P) / 2 + 2.2 * n_in), "$z$", fontsize=13, ha="center", va="center")
    ax.annotate("", xy=tuple(P - 0.3 * d_in), xytext=tuple(A - 0.3 * d_in), arrowprops=dim)
    ax.text(*((A + P) / 2 - 0.65 * d_in), "$x$", fontsize=13, ha="center", va="center")
    n_out = np.array([-np.cos(r), -np.sin(r)]) * 0.25
    ax.annotate("", xy=tuple(Wp + n_out), xytext=tuple(A + n_out), arrowprops=dim)
    ax.text(*((A + Wp) / 2 + 2.2 * n_out), "$w$", fontsize=13, ha="center", va="center")
    ax.annotate("", xy=tuple(B + 0.3 * d_out), xytext=tuple(Wp + 0.3 * d_out), arrowprops=dim)
    ax.text(*((Wp + B) / 2 + 0.65 * d_out), "$y$", fontsize=13, ha="center", va="center")
    ax.text(A[0] - 0.35, -0.05, "$A$", ha="right", va="top", fontsize=13)
    ax.text(B[0] + 0.1, 0.08, "$B$", fontsize=13)
    ax.text(0.35, 0.45, "$i$", fontsize=13)
    ax.text(3.2, -0.45, "$r$", fontsize=13)
    ax.text(4.6, 1.2, "air", fontsize=12)
    ax.text(4.6, -0.7, "water", fontsize=12)
    ax.set_aspect("equal")
    ax.set_xlim(-2.2, 6.0)
    ax.set_ylim(-4.6, 3.6)
    ax.axis("off")


graph(f"{D}/q142.png", q142, size=(4.4, 4.2))


# Q149: A and B into a NAND gate; B and C into a NOR gate; the two outputs into an OR gate
# giving Y.
def q149(d, elm):
    from schemdraw import logic

    nand = d.add(logic.Nand().at((2.5, 3.0)).anchor("in1").right())
    nor = d.add(logic.Nor().at((2.5, 0.0)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, nand.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, nand.in1.y)).to(nand.in1))
    d.add(elm.Dot(open=True).at((0, nand.in2.y)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, nand.in2.y)).to(nand.in2))
    d.add(elm.Dot().at((1.4, nand.in2.y)))
    d.add(elm.Wire("|-").at((1.4, nand.in2.y)).to(nor.in1))
    d.add(elm.Dot(open=True).at((0, nor.in2.y)).label("$C$", loc="left"))
    d.add(elm.Line().at((0, nor.in2.y)).to(nor.in2))
    orr = d.add(logic.Or().at((7.0, 1.9)).anchor("in1").right())
    d.add(elm.Wire("-|").at(nand.out).to(orr.in1))
    d.add(elm.Wire("-|").at(nor.out).to(orr.in2))
    out = d.add(elm.Line().at(orr.out).right(0.8))
    d.add(elm.Dot(open=True).at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q149.png", q149)
