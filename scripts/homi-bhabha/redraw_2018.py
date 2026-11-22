"""Redrawn figures for hb-9-2018 (2018 Q10, Q21, Q72 are in redraw.py)."""
import math

from redraw_lib import (Circle, Ellipse, Polygon, Rectangle, arrow, canvas, cell, key_plug, line, mid_arrow,
                        resistor, text)

PAPER = "hb-9-2018"


def q9():
    """Q9: two simple pendulums hanging from supports: P, string 25 cm, bob
    40 gm; Q, string 20 cm, bob 50 gm (Q's bob drawn larger, as printed)."""
    fig, ax = canvas(3.6, 3.9, (-0.3, 7.6), (-1.6, 7.2))
    for x0, name, L, r, length_lab, mass in ((0, "P", 5.0, 0.55, "25 cm", "40 gm"), (4.3, "Q", 3.9, 0.68, "20 cm", "50 gm")):
        cx = x0 + 1.5
        ax.add_patch(Rectangle((x0, 6.0), 3.0, 0.22, facecolor="#444444", edgecolor="black", lw=1.0))
        text(ax, cx, 6.6, name, size=17)
        line(ax, [(cx, 6.0), (cx, 6.0 - L)], lw=1.3)
        ax.add_patch(Circle((cx, 6.0 - L - r), r, fill=False, lw=1.6, color="black"))
        text(ax, cx + 0.35, 6.0 - L / 2, length_lab, size=14, rot=90)
        text(ax, cx, 6.0 - L - 2 * r - 0.45, mass, size=15)
    return fig


def _mirror(ax, ox, oy, R=4.0, half=32):
    """Concave mirror, pole at (ox, oy), centre of curvature R to the left; hatched on the back."""
    pts = []
    for i in range(61):
        a = math.radians(-half + 2 * half * i / 60)
        pts.append((ox - R + R * math.cos(a), oy + R * math.sin(a)))
    line(ax, pts, lw=1.8)
    for i in range(0, 61, 3):
        a = math.radians(-half + 2 * half * i / 60)
        x, y = ox - R + R * math.cos(a), oy + R * math.sin(a)
        line(ax, [(x, y), (x + 0.22 * math.cos(a) + 0.12, y + 0.22 * math.sin(a) - 0.12)], lw=0.9)


def _hit(ox, oy, y, R=4.0):
    """The point of the mirror at height y above the axis."""
    return (ox - R + math.sqrt(R * R - y * y), oy + y)


def _ray(ax, p, q, arrow_at=0.45, end_arrow=False):
    line(ax, [p, q], lw=1.3)
    mid_arrow(ax, *p, *q, at=arrow_at, size=0.26)
    if end_arrow:
        arrow(ax, p[0] + (q[0] - p[0]) * 0.9, p[1] + (q[1] - p[1]) * 0.9, *q, head=11, lw=1.3)


def _extend(p, q, t):
    return (p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)


def q12():
    """Q12: four ray diagrams for a concave mirror, C, F and P on the axis:
    (A) a ray parallel to the axis (below it) reflected through F;
    (B) a ray through F reflected parallel to the axis;
    (C) a ray through C, sent back along itself;
    (D) a ray through F reflected back through C."""
    fig, ax = canvas(9.0, 5.0, (-7.6, 10.9), (-3.5, 6.4))
    R = 4.0
    for (ox, oy), lab in (((0, 3.6), "(A)"), ((9.9, 3.6), "(B)"), ((0, -1.2), "(C)"), ((9.9, -1.2), "(D)")):
        _mirror(ax, ox, oy, R)
        line(ax, [(ox - 6.7, oy), (ox, oy)], lw=1.1)
        C, F = (ox - R, oy), (ox - R / 2, oy)
        for (px, py), name in ((C, "C"), (F, "F")):
            ax.add_patch(Circle((px, py), 0.07, color="black", zorder=4))
            text(ax, px, py + 0.45, name, size=14)
        text(ax, ox + 0.7, oy, "P", size=14)
        text(ax, ox - 7.25, oy, lab, size=14)
        if lab == "(A)":
            h = _hit(ox, oy, -1.3)
            _ray(ax, (ox - 6.7, h[1]), h, arrow_at=0.55)
            _ray(ax, h, _extend(h, F, 2.45), arrow_at=0.3, end_arrow=True)
        elif lab == "(B)":
            h = _hit(ox, oy, -0.9)
            _ray(ax, _extend(h, F, 2.75), h, arrow_at=0.35)
            _ray(ax, h, (ox - 6.7, h[1]), arrow_at=0.4, end_arrow=True)
        elif lab == "(C)":
            h = _hit(ox, oy, 1.7)
            start = _extend(h, C, 1.55)
            line(ax, [start, h], lw=1.3)
            mid_arrow(ax, *start, *h, at=0.2, size=0.26)
            mid_arrow(ax, *h, *start, at=0.25, size=0.26)
        else:
            h = _hit(ox, oy, -1.3)
            _ray(ax, _extend(h, F, 2.45), h, arrow_at=0.3)
            _ray(ax, h, _extend(h, C, 1.4), arrow_at=0.45, end_arrow=True)
    return fig


def _wave_panel(ax, x0, y0, lab, fn, w=4.5, h=1.45, big_labels=False):
    arrow(ax, x0, y0, x0 + w + 0.4, y0, head=10, lw=1.2)
    arrow(ax, x0, y0, x0, y0 + h + 0.2, head=10, lw=1.2)
    arrow(ax, x0, y0, x0, y0 - h - 0.2, head=10, lw=1.2)
    for k in (-3, -2, -1, 1, 2, 3):
        ax.add_patch(Circle((x0, y0 + k * h / 3.2), 0.035, color="black"))
    text(ax, x0 - 0.18, y0 + 0.14, "0", size=13, ha="right")
    text(ax, x0 + w + 0.5, y0, "Time", size=13, ha="left")
    text(ax, x0 - 0.55, y0, "Displacement", size=13, rot=90)
    text(ax, x0 - 1.35, y0, lab, size=16)
    n = 600
    pts = [(x0 + w * i / n, y0 + fn(w * i / n)) for i in range(n)]
    line(ax, pts, lw=1.5)


def q15():
    """Q15: four displacement-time waves on axes of the same size. Copied from
    the print: (A) about 1.9 waves of SMALL amplitude (about two thirds of the
    others), starting near a trough; (B) about 4.7 waves, large amplitude,
    flat-topped; (C) about 2.3 waves, large amplitude; (D) a rising staircase
    ramp with sharp drops (an irregular, noisy wave). Every crest and trough
    sits where the print puts it, to the nearest tenth of the axis."""
    fig, ax = canvas(11.2, 5.4, (-1.6, 15.5), (-2.9, 4.8))

    def wave_a(x):
        return 0.75 * math.sin(2 * math.pi * (x - 0.46) / 2.32)

    def wave_b(x):
        s = math.sin(2 * math.pi * (x - 0.09) / 0.95)
        return 1.1 * math.tanh(2.2 * s) / math.tanh(2.2)

    def wave_c(x):
        return 1.15 * math.sin(2 * math.pi * (x - 0.05) / 1.95)

    drops = (0.54, 2.27, 4.0)

    def wave_d(x):
        if x < drops[0]:
            u = x / drops[0]
            return 0.15 + 0.2 * u + 0.8 * u ** 8
        for a, b in zip(drops, drops[1:]):
            if a <= x < b:
                u = (x - a) / (b - a)
                return -1.05 + 2.2 * u + 0.07 * math.sin(2 * math.pi * 6 * u)
        return -1.0
    _wave_panel(ax, 0.5, 2.6, "(A)", wave_a)
    _wave_panel(ax, 9.0, 2.6, "(B)", wave_b)
    _wave_panel(ax, 0.5, -1.2, "(C)", wave_c)
    _wave_panel(ax, 9.0, -1.2, "(D)", wave_d, w=4.0)
    for x in drops:  # the print's sharp drops are vertical strokes
        line(ax, [(9.0 + x, -1.2 + 1.15), (9.0 + x, -1.2 - 1.05)], lw=1.5)
    return fig


def _needle_meter(ax, x, y, r=0.34):
    """The print's meter symbol: a circle with a needle; no letter (naming it is the question)."""
    ax.add_patch(Circle((x, y), r, facecolor="white", edgecolor="black", lw=1.5, zorder=3))
    arrow(ax, x - 0.12, y - 0.22, x + 0.08, y + 0.24, head=8, lw=1.2)


def q19():
    """Q19: Ohm's law circuit. Copied from the print: cell Q (+ on the left) in
    the top wire; a resistance wire in the bottom wire with meter P across it
    (+ left, - right); then meter S (+ left, - right) and key R (a circle with
    a filled dot) in series; arrows on the wires as printed (anticlockwise:
    left along the top, down the left side, right along the bottom, up the
    right side)."""
    fig, ax = canvas(5.6, 3.6, (-0.4, 9.6), (-2.4, 4.2))
    top, bot = 3.0, 1.0
    # top wire with the cell
    line(ax, [(0, top), (3.4, top)])
    line(ax, [(3.6, top), (9.0, top)])
    cell(ax, 3.5, top, gap=0.2, long=0.7, short=0.35, signs=False)
    text(ax, 3.15, top + 0.3, "+", size=12)
    text(ax, 3.9, top + 0.3, "−", size=12)
    text(ax, 3.5, top + 0.75, "Q", size=15)
    mid_arrow(ax, 3.4, top, 0, top, at=0.5, size=0.2)
    mid_arrow(ax, 9.0, top, 3.6, top, at=0.5, size=0.2)
    # sides
    line(ax, [(0, top), (0, bot)])
    mid_arrow(ax, 0, top, 0, bot, at=0.5, size=0.2)
    line(ax, [(9.0, bot), (9.0, top)])
    mid_arrow(ax, 9.0, bot, 9.0, top, at=0.5, size=0.2)
    # bottom wire: resistance wire, meter S, key R
    line(ax, [(0, bot), (2.1, bot)])
    mid_arrow(ax, 0, bot, 1.4, bot, at=0.6, size=0.2)
    resistor(ax, 2.1, bot, 4.5, peaks=11, amp=0.13)
    line(ax, [(4.5, bot), (9.0, bot)])
    _needle_meter(ax, 6.2, bot)
    text(ax, 5.7, bot + 0.38, "+", size=12)
    text(ax, 6.72, bot + 0.38, "−", size=12)
    text(ax, 6.2, bot - 0.8, "S", size=15)
    key_plug(ax, 7.8, bot, r=0.24)
    text(ax, 7.8, bot - 0.8, "R", size=15)
    # meter P across the resistance wire
    jl, jr, low = 1.6, 5.0, -0.6
    line(ax, [(jl, bot), (jl, low), (jr, low), (jr, bot)])
    mid_arrow(ax, jl, bot, jl, low, at=0.5, size=0.2)
    mid_arrow(ax, 3.7, low, jr, low, at=0.6, size=0.2)
    _needle_meter(ax, 3.3, low)
    text(ax, 2.8, low + 0.38, "+", size=12)
    text(ax, 3.82, low + 0.38, "−", size=12)
    text(ax, 3.3, low - 0.8, "P", size=15)
    for x in (jl, jr):
        ax.add_patch(Circle((x, bot), 0.06, color="black", zorder=4))
    return fig


def _rod(ax, x, y, length, r, area_lab, len_lab, lab):
    """A wire piece drawn as a cylinder: hatched end face on the left."""
    ax.add_patch(Ellipse((x, y), 0.5 * r, 2 * r, facecolor="white", edgecolor="black", lw=1.3, hatch="////", zorder=3))
    line(ax, [(x, y + r), (x + length, y + r)], lw=1.3)
    line(ax, [(x, y - r), (x + length, y - r)], lw=1.3)
    pts = [(x + length + 0.25 * r * math.cos(t), y + r * math.sin(t))
           for t in [math.radians(-90 + 180 * i / 30) for i in range(31)]]
    line(ax, pts, lw=1.3)
    text(ax, x - 0.45, y, area_lab, size=17, ha="right")
    text(ax, x + length / 2, y + r + 0.45, len_lab, size=17)
    text(ax, x - 1.75, y, lab, size=16, ha="right")


def q23():
    """Q23: four copper wire pieces, each marked with its cross-section area and
    length: (A) A, l; (B) A/2, 2l; (C) 2A, l/2; (D) A/3, 2l. Thicknesses follow
    the areas (radius ~ the square root of the area), lengths follow the
    marked lengths."""
    fig, ax = canvas(8.0, 2.6, (-0.2, 19.6), (-0.4, 5.6))
    L, r = 3.4, 0.42
    _rod(ax, 2.4, 3.9, L, r, "$A$", "$l$", "(A)")
    _rod(ax, 12.0, 3.9, 2 * L, r / math.sqrt(2), "$A/2$", "$2l$", "(B)")
    _rod(ax, 2.4, 1.0, L / 2, r * math.sqrt(2), "$2A$", "$l/2$", "(C)")
    _rod(ax, 12.0, 1.0, 2 * L, r / math.sqrt(3), "$A/3$", "$2l$", "(D)")
    return fig


def q49():
    """Q49: electrolysis of CuCl2 solution. Copied from the print: two electrode
    plates in a beaker of solution, P marked + (left) and Q marked - (right);
    P's lead runs up through a switch (shown open) and a meter to the + side of
    a cell; Q's lead runs to the - side; label 'CuCl2 solution' arrowed into the
    liquid."""
    fig, ax = canvas(4.6, 3.9, (-0.6, 9.6), (-0.4, 8.0))
    # beaker and solution
    line(ax, [(-0.15, 3.9), (0, 3.75), (0, 0), (4.6, 0), (4.6, 3.75), (4.75, 3.9)], lw=1.6)
    for i, y in enumerate([0.3 + 0.38 * k for k in range(7)]):
        x = 0.15 + (0.2 if i % 2 else 0)
        while x < 4.35:
            line(ax, [(x, y), (x + 0.2, y)], lw=0.9, z=1)
            x += 0.42
    line(ax, [(0, 2.85), (4.6, 2.85)], lw=0.9, z=1)
    for x0, sign, name in ((0.95, "+", "P"), (2.65, "−", "Q")):
        ax.add_patch(Rectangle((x0, 0.6), 0.55, 4.3 if name == "P" else 4.45, facecolor="white", edgecolor="black",
                               lw=1.5, zorder=3))
    text(ax, 0.35, 5.25, "P", size=15)
    text(ax, 0.75, 5.55, "+", size=15)
    text(ax, 2.35, 5.55, "−", size=16)
    text(ax, 3.3, 5.5, "Q", size=15)
    # P: up, switch, meter, right, down to the cell's + plate
    line(ax, [(1.22, 4.9), (1.22, 7.3), (2.4, 7.3)])
    line(ax, [(2.4, 7.3), (3.1, 7.65)], lw=1.5)
    ax.add_patch(Circle((2.4, 7.3), 0.06, color="black", zorder=4))
    line(ax, [(3.2, 7.3), (4.45, 7.3)])
    ax.add_patch(Circle((3.2, 7.3), 0.06, color="black", zorder=4))
    ax.add_patch(Circle((4.85, 7.3), 0.4, facecolor="white", edgecolor="black", lw=1.5, zorder=3))
    arrow(ax, 5.05, 7.05, 4.67, 7.55, head=9, lw=1.2)
    line(ax, [(5.25, 7.3), (7.2, 7.3), (7.2, 6.0), (6.45, 6.0)])
    # Q: up, right, to the cell's - plate
    line(ax, [(2.92, 5.05), (2.92, 6.0), (6.05, 6.0)])
    line(ax, [(6.1, 5.8), (6.1, 6.2)], lw=3.0)
    line(ax, [(6.4, 5.6), (6.4, 6.4)], lw=1.6)
    text(ax, 5.8, 6.4, "−", size=14)
    text(ax, 6.75, 6.4, "+", size=14)
    arrow(ax, 6.0, 1.3, 3.7, 1.3, head=11, lw=1.2)
    text(ax, 6.1, 1.3, "CuCl$_2$ solution", size=15, ha="left")
    return fig


FIGURES = {(PAPER, n): fn for n, fn in ((9, q9), (12, q12), (15, q15), (19, q19), (23, q23), (49, q49))}
