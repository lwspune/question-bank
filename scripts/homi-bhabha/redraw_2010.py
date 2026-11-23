"""Redrawn figures for hb-9-2010 (MSTA's 2010 Std IX booklet, hand-drawn art).

Each function copies only what the print shows. Option pictures the print
numbers (1)-(4) are lettered (A)-(D) here, because every such question's
options read "Figure (A)" ... "Figure (D)" (Q3, Q29)."""
import math

from redraw_lib import (Circle, FancyBboxPatch, Polygon, Rectangle, arrow, axes, box, canvas, line, mid_arrow,
                        text)

PAPER = "hb-9-2010"


def _walls(ax, x0, x1, y0, y1):
    line(ax, [(x0, y0), (x0, y1)])
    line(ax, [(x1, y0), (x1, y1)])


def q3():
    """Q3: sound inside a stethoscope tube, four options (print (1)-(4)):
    (A) zig-zag reflections between the two walls, arrows upward;
    (B) one straight ray up the middle;
    (C) a ray looping along the tube;
    (D) a Y-shaped tube with crossing reflected rays in the stem and both arms."""
    fig, ax = canvas(11.5, 3.3, (-0.6, 15.2), (-0.4, 4.5))
    h = 4.0
    # (A)
    x0, x1 = 0.9, 1.6
    _walls(ax, x0, x1, 0, h)
    ys = [0.25 + i * 0.45 for i in range(9)]
    pts = [((x0 if i % 2 == 0 else x1), y) for i, y in enumerate(ys)]
    line(ax, pts, lw=1.2)
    for a, b in zip(pts, pts[1:]):
        mid_arrow(ax, *a, *b, size=0.24)
    text(ax, 0.1, 2.0, "(A)", size=14)
    # (B)
    x0, x1 = 4.6, 5.4
    _walls(ax, x0, x1, 0, h)
    line(ax, [(5.0, 0), (5.0, h)], lw=1.2)
    mid_arrow(ax, 5.0, 0, 5.0, h, at=0.3, size=0.24)
    mid_arrow(ax, 5.0, 0, 5.0, h, at=0.7, size=0.24)
    text(ax, 3.8, 2.0, "(B)", size=14)
    # (C): a prolate trochoid, loops reaching the right wall
    x0, x1 = 8.3, 9.0
    _walls(ax, x0, x1, 0, h)
    pts = []
    for i in range(0, 601):
        t = i / 600 * (6 * math.pi) - math.pi / 2
        pts.append((x0 + 0.38 + 0.3 * math.cos(t), 0.2 + 0.19 * (t + math.pi / 2) + 0.25 * math.sin(t)))
    pts = [p for p in pts if p[1] <= h - 0.1]
    line(ax, pts, lw=1.2)
    # one arrow at the rightmost point of each arc (t = 2*pi*k: samples 42, 242, 442: the visible arcs peak there)
    for i in (42, 242, 442):
        if i + 3 < len(pts):
            mid_arrow(ax, *pts[i - 3], *pts[i + 3], size=0.24)
    text(ax, 7.5, 2.0, "(C)", size=14)
    # (D): Y tube
    sl, sr, top = 12.2, 12.9, 2.1
    outer_l = [(sl, 0), (sl, top), (11.2, h)]
    outer_r = [(sr, 0), (sr, top), (13.9, h)]
    crotch = [(11.9, h), (12.55, 2.95), (13.2, h)]
    line(ax, outer_l)
    line(ax, outer_r)
    line(ax, crotch)
    # stem: two interleaved zig-zags (the print's rays cross each other)
    for phase in (0, 1):
        ys = [0.15 + 0.3 * phase + i * 0.6 for i in range(4)]
        pts = [((sl if (i + phase) % 2 == 0 else sr), y) for i, y in enumerate(ys)]
        line(ax, pts, lw=1.1)
        for a, b in zip(pts, pts[1:]):
            mid_arrow(ax, *a, *b, size=0.24)
    # into the arms: each arm a zig-zag between its two walls
    def along(p, q, t):
        return (p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)
    for outer, inner in ((((sl, top), (11.2, h)), ((12.55, 2.95), (11.9, h))),
                         (((sr, top), (13.9, h)), ((12.55, 2.95), (13.2, h)))):
        pts = [((12.4 if outer[0][0] == sl else 12.7), 1.95)]
        for i, t in enumerate((0.15, 0.4, 0.62, 0.85)):
            pts.append(along(*(outer if i % 2 == 0 else inner), t))
        line(ax, pts, lw=1.1)
        for a, b in zip(pts, pts[1:]):
            mid_arrow(ax, *a, *b, size=0.24)
    text(ax, 10.7, 2.0, "(D)", size=14)
    return fig


def q7():
    """Q7: block A, 2 kg, moving at 10 m/s; block B, 4 kg, at 7 m/s (arrows to the right)."""
    fig, ax = canvas(7.0, 1.7, (-0.2, 12.6), (-0.2, 2.6))
    for x, name, kg, v in ((0, "A", "2 kg", "10 m/s"), (6.6, "B", "4 kg", "7 m/s")):
        box(ax, x, 0, 1.7, 1.7, kg, size=17, lw=1.6)
        text(ax, x + 0.85, 2.05, name, size=17)
        arrow(ax, x + 1.7, 0.85, x + 4.9, 0.85, lw=1.5, head=16)
        text(ax, x + 3.2, 1.15, v, size=15, va="bottom")
    return fig


def q9():
    """Q9: displacement-time graph A (0,0) -> B, horizontal B -> C, C -> D on the time axis."""
    fig, ax = canvas(5.2, 3.3, (-1.9, 9.6), (-1.1, 5.0))
    arrow(ax, 0, 0, 9.3, 0, head=12)
    arrow(ax, 0, 0, 0, 4.5, head=12)
    A, B, C, D = (0, 0), (2.4, 2.6), (6.0, 2.6), (8.4, 0)
    line(ax, [A, B, C, D], lw=1.8)
    text(ax, B[0], B[1] + 0.35, "B", size=15, va="bottom")
    text(ax, C[0], C[1] + 0.35, "C", size=15, va="bottom")
    text(ax, D[0], -0.3, "D", size=15, va="top")
    text(ax, -0.15, -0.3, "(0, 0) A", size=15, va="top", ha="right")
    text(ax, 4.6, -0.55, "Time →", size=15, va="top")
    text(ax, -0.7, 2.2, "Displacement →", size=15, rot=90)
    return fig


def q16():
    """Q16: a box on the ground; arrow F to the left, arrow S to the right. Key: F - Force, S - Displacement."""
    fig, ax = canvas(4.2, 2.9, (-0.3, 8.0), (-3.4, 2.6))
    line(ax, [(0, 0), (7.6, 0)])
    box(ax, 2.6, 0, 2.2, 1.9, lw=1.6)
    arrow(ax, 2.6, 1.0, 0.6, 1.0, lw=3.0, head=20)
    arrow(ax, 4.8, 1.0, 6.9, 1.0, lw=3.0, head=20)
    text(ax, 0.25, 1.75, "F", size=18)
    text(ax, 7.25, 1.75, "S", size=18)
    text(ax, 0.6, -1.0, "F  −  Force", size=16, ha="left")
    text(ax, 0.6, -2.3, "S  −  Displacement", size=16, ha="left")
    return fig


def q25():
    """Q25: a tank of water; plates A (shorter) and B (taller) dip into it, their
    whole lengths marked l1 (A) and l2 (B) by double arrows."""
    fig, ax = canvas(3.6, 4.0, (-0.6, 7.0), (-0.3, 6.5))
    W, top, lvl = 6.0, 4.0, 2.9
    line(ax, [(0, top), (0, 0), (W, 0), (W, top)], lw=1.8)
    for i, y in enumerate([0.35 + 0.5 * k for k in range(6)]):
        off = 0.25 if i % 2 else 0.0
        x = 0.25 + off
        while x < W - 0.4:
            line(ax, [(x, y), (x + 0.35, y)], lw=1.0, z=1)
            x += 0.6
    line(ax, [(0, lvl), (W, lvl)], lw=1.2, z=1)
    for x0, x1, y0, y1, name in ((1.4, 2.3, 0.95, 5.0, "A"), (3.6, 4.6, 0.9, 6.1, "B")):
        ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, facecolor="white", edgecolor="black", lw=1.6, zorder=3))
        text(ax, (x0 + x1) / 2, y1 - 0.75, name, size=16)
    arrow(ax, 1.1, 3.0, 1.1, 5.0, head=11, lw=1.2)
    arrow(ax, 1.1, 3.0, 1.1, 0.95, head=11, lw=1.2)
    text(ax, 0.62, 3.6, "$l_1$", size=17)
    arrow(ax, 4.9, 3.5, 4.9, 6.1, head=11, lw=1.2)
    arrow(ax, 4.9, 3.5, 4.9, 0.9, head=11, lw=1.2)
    text(ax, 5.35, 4.7, "$l_2$", size=17)
    return fig


def _vt(ax, x0, y0, label, curve):
    w, h = 2.6, 2.4
    line(ax, [(x0, y0 + h), (x0, y0), (x0 + w, y0)], lw=1.4)
    text(ax, x0 - 0.3, y0 + h / 2, "VELOCITY →", size=11, rot=90)
    text(ax, x0 + w - 0.8, y0 - 0.25, "TIME →", size=11, va="top")
    text(ax, x0 + 1.3, y0 - 0.95, label, size=15, va="top")
    line(ax, [(x0 + u, y0 + v) for u, v in curve], lw=1.7)


def q29():
    """Q29: a displacement-time graph, a straight line at 45 degrees to the time
    axis; then four velocity-time options (print (1)-(4)): (A) a horizontal
    line, (B) a curve bending upward from the origin, (C) a curve rising
    steeply from the origin and levelling off, (D) a straight line from the
    origin. The print repeats the question sentence between the graphs; the
    stem already carries it, so it is left out."""
    fig, ax = canvas(9.0, 6.0, (-1.0, 15.6), (-1.9, 8.9))
    gx, gy = 6.2, 4.6
    line(ax, [(gx, gy + 3.6), (gx, gy), (gx + 3.7, gy)], lw=1.4)
    line(ax, [(gx, gy), (gx + 3.1, gy + 3.1)], lw=1.7)
    t = [i / 40 * math.pi / 4 for i in range(41)]
    line(ax, [(gx + 0.7 * math.cos(a), gy + 0.7 * math.sin(a)) for a in t], lw=1.0)
    text(ax, gx + 1.15, gy + 0.32, "45°", size=13)
    text(ax, gx - 0.35, gy + 1.8, "Displacement →", size=13, rot=90)
    text(ax, gx + 2.6, gy - 0.3, "Time →", size=13, va="top")
    n = 40
    flat = [(0, 1.1), (2.4, 1.1)]
    up = [(2.3 * i / n, 2.0 * (i / n) ** 2.2) for i in range(n + 1)]
    sat = [(2.4 * i / n, 1.85 * (1 - math.exp(-4.2 * i / n))) for i in range(n + 1)]
    straight = [(0, 0), (2.3, 2.0)]
    for k, (lab, c) in enumerate((("(A)", flat), ("(B)", up), ("(C)", sat), ("(D)", straight))):
        _vt(ax, 0.6 + k * 3.75, 0.0, lab, c)
    return fig


def q34():
    """Q34: classification chart: 'Elements' branching to 'Metals', a blank box,
    'Nonmetals' (the print misspells it 'Nonmentals')."""
    fig, ax = canvas(5.2, 2.0, (-0.2, 10.6), (-0.2, 3.7))
    box(ax, 3.6, 2.5, 2.8, 1.0, "Elements", size=14)
    line(ax, [(5.0, 2.5), (5.0, 1.9)], lw=1.3)
    line(ax, [(1.4, 1.9), (8.8, 1.9)], lw=1.3)
    for x, lab in ((1.4, "Metals"), (5.0, None), (8.8, "Nonmetals")):
        line(ax, [(x, 1.9), (x, 1.0)], lw=1.3)
        box(ax, x - 1.4, 0, 2.8, 1.0, lab, size=14)
    return fig


def q36():
    """Q36: a separating funnel (stopper, stopcock, stem) holding two liquid
    layers: A on top (stippled in the print), B below."""
    fig, ax = canvas(2.4, 4.2, (-1.7, 1.9), (-0.2, 6.2))
    neck_y, wide_y, cock_y = 4.9, 3.3, 1.25
    left = [(-0.32, neck_y), (-1.3, wide_y), (-0.3, cock_y)]
    right = [(0.32, neck_y), (1.3, wide_y), (0.3, cock_y)]

    def x_at(side, y):
        (xa, ya), (xb, yb), (xc, yc) = side
        if y >= yb:
            return xa + (xb - xa) * (ya - y) / (ya - yb)
        return xb + (xc - xb) * (yb - y) / (yb - yc)
    a_top, a_bot = 3.75, 2.65
    ys = [a_top] + ([wide_y] if a_bot < wide_y < a_top else []) + [a_bot]
    poly = [(x_at(left, y), y) for y in ys] + [(x_at(right, y), y) for y in reversed(ys)]
    ax.add_patch(Polygon(poly, closed=True, facecolor="#e4e4e4", edgecolor="none", hatch="..", zorder=1))
    line(ax, left)
    line(ax, right)
    for y in (a_top, a_bot):
        line(ax, [(x_at(left, y), y), (x_at(right, y), y)], lw=1.3)
    text(ax, 0, (a_top + a_bot) / 2, "A", size=16, bg=True)
    text(ax, 0, (a_bot + cock_y) / 2 + 0.05, "B", size=16)
    # stopper
    ax.add_patch(Rectangle((-0.34, neck_y), 0.68, 0.38, facecolor="#555555", edgecolor="black", lw=1.3, zorder=2))
    ax.add_patch(FancyBboxPatch((-0.26, neck_y + 0.38), 0.52, 0.28, boxstyle="round,pad=0,rounding_size=0.14",
                                facecolor="white", edgecolor="black", lw=1.3, zorder=2))
    # stopcock and stem
    ax.add_patch(Rectangle((-0.55, cock_y - 0.32), 1.1, 0.32, facecolor="#333333", edgecolor="black", lw=1.2, zorder=2))
    ax.add_patch(Rectangle((0.55, cock_y - 0.27), 0.22, 0.22, facecolor="#333333", edgecolor="black", lw=1.0, zorder=2))
    line(ax, [(-0.12, cock_y - 0.32), (-0.12, 0.0), (0.12, 0.12), (0.12, cock_y - 0.32)], lw=1.4)
    return fig


def _closed_spline(pts, per=24):
    """Catmull-Rom through pts as a closed curve."""
    out = []
    n = len(pts)
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        for k in range(per):
            t = k / per
            t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in (0, 1)))
    return out


def q81():
    """Q81: outline of the tongue: B a patch at the back (top), A a patch on each
    side, C a patch at the tip."""
    fig, ax = canvas(3.2, 3.4, (-3.6, 3.7), (-1.1, 5.0))
    outline = _closed_spline([(-2.9, 4.3), (-1.4, 4.5), (0.1, 4.25), (1.6, 4.6), (3.05, 4.35), (3.15, 3.0),
                              (2.65, 1.6), (1.55, 0.3), (0.35, -0.65), (-0.65, -0.4), (-1.85, 0.7),
                              (-2.75, 1.9), (-3.05, 3.1)])
    shape = Polygon(outline, closed=True, fill=False, lw=1.8, edgecolor="black", zorder=3)
    ax.add_patch(shape)
    for cx, cy, r, lab, lx, ly in ((-2.95, 2.0, 0.8, "A", -2.5, 2.0), (3.0, 2.55, 0.8, "A", 2.55, 2.55),
                                   (0.05, -0.75, 1.05, "C", 0.05, -0.05)):
        c = Circle((cx, cy), r, fill=False, lw=1.4, edgecolor="black", zorder=2)
        ax.add_patch(c)
        c.set_clip_path(shape)
        text(ax, lx, ly, lab, size=15)
    ax.add_patch(FancyBboxPatch((-0.9, 3.35), 2.2, 0.65, boxstyle="round,pad=0,rounding_size=0.32",
                                fill=False, lw=1.5, edgecolor="black", zorder=2))
    text(ax, 0.2, 3.67, "B", size=15)
    return fig


FIGURES = {(PAPER, n): fn for n, fn in ((3, q3), (7, q7), (9, q9), (16, q16), (25, q25), (29, q29), (34, q34),
                                        (36, q36), (81, q81))}
