"""Redrawn figures for hb-9-2021-nov (blurred pastes in MSTA's print-out)."""
import math

from redraw_lib import Circle, arrow, canvas, line, resistor, text

PAPER = "hb-9-2021-nov"


def q11():
    """Q11: velocity-time graph. Copied from the print: axes 'Velocity (V) m/s'
    (10 to 60 in tens) and 'Time (Seconds)' (5 to 30 in fives), a straight line
    from the origin, arrowed past (30, 60); dotted guides from the points
    (5, 10) and (30, 60) to both axes, each point marked."""
    fig, ax = canvas(6.0, 4.6, (-2.0, 9.0), (-1.9, 7.6))
    sx, sy = 1 / 5 * 1.1, 1 / 10  # 5 s -> 1.1 units, 10 m/s -> 1 unit
    arrow(ax, 0, 0, 7.6, 0, head=12)
    arrow(ax, 0, 0, -0.7, 0, head=12)
    arrow(ax, 0, 0, 0, 7.0, head=12)
    arrow(ax, 0, 0, 0, -0.9, head=12)
    for t in range(5, 35, 5):
        line(ax, [(t * sx, -0.1), (t * sx, 0.1)], lw=1.2)
        text(ax, t * sx, -0.4, str(t), size=13)
    for v in range(10, 70, 10):
        line(ax, [(-0.1, v * sy), (0.1, v * sy)], lw=1.2)
        text(ax, -0.25, v * sy, str(v), size=13, ha="right")
    line(ax, [(0, 0), (32 * sx, 64 * sy)], lw=1.7)
    arrow(ax, 31 * sx, 62 * sy, 33 * sx, 66 * sy, head=12, lw=1.7)
    for t, v, ls in ((5, 10, ":"), (30, 60, "--")):
        line(ax, [(t * sx, 0), (t * sx, v * sy)], lw=1.2, ls=ls)
        line(ax, [(0, v * sy), (t * sx, v * sy)], lw=1.2, ls=ls)
        ax.add_patch(Circle((t * sx, v * sy), 0.09, color="black", zorder=4))
    text(ax, 0.25, 7.25, "Y-Axis", size=12, ha="left")
    text(ax, 7.75, 0, "X-Axis", size=12, ha="left")
    text(ax, 3.0, -1.2, "Time (Seconds)", size=14)
    text(ax, -1.3, 3.5, "Velocity (V) m/s", size=14, rot=90)
    return fig


def _terminals(ax, a, b):
    for p in (a, b):
        ax.add_patch(Circle(p, 0.07, color="black", zorder=4))


def q19():
    """Q19: four symbols, then a circuit with four gaps. Copied from the print:
    1 a resistor, 2 an ammeter (+ A -), 3 a voltmeter (+ V -), 4 a filled
    circle between two arcs; the circuit has gap P in the left side, the cell
    (+ on the left) and gap Q in the bottom wire, gap S in the top wire and gap
    R in a branch above it, joined to the top wire on both sides of S."""
    fig, ax = canvas(6.4, 4.6, (-0.4, 11.0), (-0.9, 7.2))
    # symbol key
    y1, y2 = 6.5, 5.5
    text(ax, 0.1, y1, "1.", size=14)
    line(ax, [(0.6, y1), (1.6, y1)], lw=1.3)
    resistor(ax, 1.6, y1, 3.4, peaks=7, amp=0.14)
    line(ax, [(3.4, y1), (4.4, y1)], lw=1.3)
    text(ax, 5.6, y1, "2.", size=14)
    for y, num, letter, x0 in ((y1, None, "A", 6.1), (y2, "3.", "V", 0.6)):
        if num:
            text(ax, 0.1, y, num, size=14)
        line(ax, [(x0, y), (x0 + 1.4, y)], lw=1.3)
        ax.add_patch(Circle((x0 + 1.85, y), 0.42, facecolor="white", edgecolor="black", lw=1.4, zorder=3))
        text(ax, x0 + 1.85, y, letter, size=14)
        line(ax, [(x0 + 2.3, y), (x0 + 3.7, y)], lw=1.3)
        text(ax, x0 + 1.15, y + 0.3, "+", size=13)
        text(ax, x0 + 2.55, y + 0.3, "−", size=13)
    text(ax, 5.6, y2, "4.", size=14)
    line(ax, [(6.1, y2), (7.5, y2)], lw=1.3)
    ax.add_patch(Circle((7.95, y2), 0.24, color="#555555", zorder=3))
    for a0 in (125, -55):
        t = [math.radians(a0 + 110 * i / 20) for i in range(21)]
        line(ax, [(7.95 + 0.42 * math.cos(u), y2 + 0.42 * math.sin(u)) for u in t], lw=1.3)
    line(ax, [(8.4, y2), (9.8, y2)], lw=1.3)
    # circuit
    L, Rt, top, bot, up = 0.9, 9.4, 3.0, 0.0, 4.2
    line(ax, [(L, 1.75), (L, top), (5.0, top)])
    _terminals(ax, (5.0, top), (5.9, top))
    text(ax, 5.45, top - 0.45, "S", size=15)
    line(ax, [(5.9, top), (Rt, top), (Rt, bot), (6.3, bot)])
    _terminals(ax, (6.3, bot), (5.4, bot))
    text(ax, 5.85, bot - 0.45, "Q", size=15)
    line(ax, [(5.4, bot), (3.1, bot)])
    line(ax, [(3.0, bot - 0.4), (3.0, bot + 0.4)], lw=1.6)
    line(ax, [(3.2, bot - 0.2), (3.2, bot + 0.2)], lw=3.0)
    text(ax, 2.6, bot + 0.35, "+", size=13)
    text(ax, 3.6, bot + 0.35, "−", size=13)
    line(ax, [(2.9, bot), (L, bot), (L, 1.0)])
    _terminals(ax, (L, 1.75), (L, 1.0))
    text(ax, L - 0.45, 1.38, "P", size=15)
    line(ax, [(3.0, top), (3.0, up), (5.0, up)])
    _terminals(ax, (5.0, up), (5.9, up))
    text(ax, 5.45, up + 0.4, "R", size=15)
    line(ax, [(5.9, up), (8.0, up), (8.0, top)])
    return fig


def q23():
    """Q23: four sketch graphs of v (up) against m (across): (A) a curve falling
    steeply near the v-axis and flattening out, touching neither axis; (B) a
    straight line from the origin (arrowed); (C) a curve rising from the origin
    and bending over; (D) a straight line falling from the v-axis to the m-axis."""
    fig, ax = canvas(5.6, 4.4, (-0.9, 9.4), (-1.0, 7.0))
    w, h = 3.0, 2.3
    for (x0, y0), lab in (((0.5, 3.9), "(A)"), ((5.6, 3.9), "(B)"), ((0.5, 0.2), "(C)"), ((5.6, 0.2), "(D)")):
        arrow(ax, x0, y0, x0 + w + 0.3, y0, head=10)
        arrow(ax, x0, y0, x0, y0 + h + 0.3, head=10)
        text(ax, x0 - 0.25, y0 + h + 0.3, "v", size=13)
        text(ax, x0 + w + 0.45, y0 - 0.05, "m", size=13, ha="left")
        text(ax, x0 - 0.75, y0 + 0.25, lab, size=13)
        if lab == "(A)":
            pts = [(x0 + m, y0 + min(h, 0.32 / m)) for m in [0.14 + 2.7 * i / 80 for i in range(81)]]
            line(ax, pts, lw=1.6)
        elif lab == "(B)":
            line(ax, [(x0, y0), (x0 + 2.3, y0 + 2.1)], lw=1.6)
            arrow(ax, x0 + 2.1, y0 + 1.92, x0 + 2.4, y0 + 2.19, head=10, lw=1.6)
        elif lab == "(C)":
            pts = [(x0 + 2.8 * t, y0 + 1.9 * math.sqrt(t)) for t in (i / 60 for i in range(61))]
            line(ax, pts, lw=1.6)
        else:
            line(ax, [(x0, y0 + 1.9), (x0 + 2.6, y0)], lw=1.6)
    return fig


FIGURES = {(PAPER, 11): q11, (PAPER, 19): q19, (PAPER, 23): q23}
