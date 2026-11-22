"""Redrawn figures for hb-9-2021-dec (small blurred pastes in MSTA's print-out)."""
import math

from redraw_lib import Circle, arrow, canvas, line, text

PAPER = "hb-9-2021-dec"


def q7():
    """Q7: displacement-time graph of a body in S.H.M. on graph paper. Copied
    from the print: 'Distance (cm)' from -25 to 25 in fives, 'Time (t) Seconds'
    marked 1 to 6; the curve rises from 0 to 10 at t = 1, crosses 0 at 2, falls
    to -10 at 3, crosses at 4, rises to 10 at 5 and returns to 0 at 6."""
    fig, ax = canvas(4.6, 4.4, (-2.2, 7.6), (-6.4, 6.8))
    for x in [i / 2 for i in range(-2, 15)]:
        line(ax, [(x, -5.9), (x, 5.9)], lw=0.4, color="#cfcfcf", z=0)
    for y in [i / 2 for i in range(-12, 13)]:
        line(ax, [(-1.0, y), (7.0, y)], lw=0.4, color="#cfcfcf", z=0)
    sy = 1 / 5  # 5 cm -> 1 unit
    arrow(ax, 0, 0, 7.1, 0, head=11)
    arrow(ax, 0, 0, 0, 5.9, head=11)
    arrow(ax, 0, 0, 0, -5.9, head=11)
    for t in range(1, 7):
        line(ax, [(t, -0.12), (t, 0.12)], lw=1.2)
        # beside each tick on whichever side the curve leaves clear (it dips just after t = 2)
        text(ax, t + 0.16, 0.32 if t == 2 else -0.42, str(t), size=12)
    for d in range(-25, 30, 5):
        if d == 0:
            continue
        line(ax, [(-0.12, d * sy), (0.12, d * sy)], lw=1.2)
        text(ax, -0.25, d * sy, str(d), size=11, ha="right", bg=True)
    text(ax, -0.25, 0.05, "0", size=11, ha="right")
    pts = [(6 * i / 300, 10 * sy * math.sin(math.pi * (6 * i / 300) / 2)) for i in range(301)]
    line(ax, pts, lw=1.8)
    text(ax, 3.4, -3.1, "Time (t) Seconds", size=13, bg=True)
    arrow(ax, 1.6, -3.1, 0.6, -3.1, head=10, lw=1.1)
    arrow(ax, 5.2, -3.1, 6.3, -3.1, head=10, lw=1.1)
    text(ax, -1.65, 0, "Distance (cm)", size=13, rot=90, bg=True)
    return fig


def q19():
    """Q19: Venn diagram of three circles: Plane Mirror (upper left), Concave
    Mirror (upper right), Convex Mirror (below). Q where Plane and Concave
    overlap only, P where all three overlap, S where Concave and Convex
    overlap only, R in Convex only (as printed)."""
    fig, ax = canvas(5.6, 3.2, (-0.2, 11.0), (-0.4, 5.8))
    PL, CC, CV = (4.6, 3.5, 1.5), (6.4, 3.5, 1.5), (5.5, 2.0, 1.5)
    for c in (PL, CC, CV):
        ax.add_patch(Circle(c[:2], c[2], fill=False, lw=1.5, color="black"))
    text(ax, 5.5, 4.05, "Q", size=16)
    text(ax, 5.5, 3.05, "P", size=16)
    text(ax, 6.45, 2.45, "S", size=16)
    text(ax, 5.5, 1.1, "R", size=16)
    text(ax, 1.3, 4.6, "Plane\nMirror", size=14)
    arrow(ax, 2.2, 4.5, 3.4, 4.35, head=12)
    text(ax, 9.7, 4.6, "Concave\nMirror", size=14)
    arrow(ax, 8.6, 4.5, 7.65, 4.3, head=12)
    text(ax, 1.6, 1.4, "Convex\nMirror", size=14)
    arrow(ax, 2.6, 1.4, 4.12, 1.4, head=12)
    return fig


def q23():
    """Q23: velocity-time graph. Copied from the print: 'Velocity (v) m/s' marked
    20 to 100 in twenties, 'Time (t) Seconds' marked 1 to 6, a straight line
    from O through the marked point (5 s, 80 m/s), arrowed beyond; axes labelled
    Y-Axis and X-Axis."""
    fig, ax = canvas(4.8, 4.2, (-2.0, 8.4), (-1.8, 7.0))
    sy = 1 / 20 * 1.1
    arrow(ax, 0, 0, 7.0, 0, head=11)
    arrow(ax, 0, 0, -0.6, 0, head=11)
    arrow(ax, 0, 0, 0, 6.5, head=11)
    arrow(ax, 0, 0, 0, -0.9, head=11)
    for t in range(1, 7):
        line(ax, [(t, -0.1), (t, 0.1)], lw=1.2)
        text(ax, t, -0.4, str(t), size=13)
    for v in range(20, 120, 20):
        line(ax, [(-0.1, v * sy), (0.1, v * sy)], lw=1.2)
        text(ax, -0.25, v * sy, str(v), size=13, ha="right")
    text(ax, -0.35, -0.4, "O", size=13)
    line(ax, [(0, 0), (6.1, 6.1 * 16 * sy)], lw=1.7)
    arrow(ax, 5.9, 5.9 * 16 * sy, 6.3, 6.3 * 16 * sy, head=12, lw=1.7)
    ax.add_patch(Circle((5, 80 * sy), 0.1, color="black", zorder=4))
    text(ax, 0.25, 6.75, "Y-Axis", size=12, ha="left")
    text(ax, 7.1, -0.4, "X-Axis", size=12, ha="left")
    text(ax, 3.3, -1.2, "Time (t) Seconds", size=14)
    text(ax, -1.35, 3.0, "Velocity (v) m/s", size=14, rot=90)
    return fig


FIGURES = {(PAPER, 7): q7, (PAPER, 19): q19, (PAPER, 23): q23}
