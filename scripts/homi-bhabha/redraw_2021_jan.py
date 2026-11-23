"""Redrawn figures for hb-9-2021-jan (MSTA's January 2021 print-out: pencil
drawings, labels in Marathi and English). Labels are English only (owner,
2026-11-22: the stems are English, and matplotlib cannot shape Devanagari);
a Marathi edition will need its own figures."""
import math

from redraw_lib import Circle, Ellipse, Polygon, Rectangle, arrow, box, canvas, line, mid_arrow, text

PAPER = "hb-9-2021-jan"


def q8():
    """Q8: three identical vessels with the same water level; blocks of the
    same mass and different densities, so different sizes (sizes as printed):
    A (largest) floating at the surface, B suspended in the middle, C
    (smallest) resting on the base."""
    fig, ax = canvas(7.2, 2.9, (-0.3, 14.3), (-1.1, 4.8))
    W, H, lvl = 3.6, 4.2, 3.2
    for k, (name, bw, bh, by) in enumerate((("A", 1.45, 0.75, lvl - 0.62), ("B", 1.15, 0.7, 1.55),
                                             ("C", 0.85, 0.6, 0.0))):
        x0 = k * 4.9
        line(ax, [(x0 - 0.12, H + 0.15), (x0, H), (x0, 0), (x0 + W, 0), (x0 + W, H), (x0 + W + 0.12, H + 0.15)], lw=1.6)
        ax.add_patch(Rectangle((x0, 0), W, lvl, facecolor="#e8e8e8", edgecolor="none", zorder=0))
        line(ax, [(x0, lvl), (x0 + W, lvl)], lw=1.2)
        bx = x0 + (W - bw) / 2
        ax.add_patch(Rectangle((bx, by), bw, bh, facecolor="#8a8a8a", edgecolor="black", lw=1.4, zorder=3))
        text(ax, x0 + W / 2, -0.6, name, size=16)
    return fig


def q9():
    """Q9: Venn diagram of three circles: Sonic wave (upper left), Ultrasonic
    sound wave (upper right), Infrasonic sound wave (below). Region I in Sonic
    only, II where Sonic and Ultrasonic overlap, III where Sonic and Infrasonic
    overlap (as printed)."""
    fig, ax = canvas(6.6, 3.3, (-0.2, 12.4), (-0.4, 5.9))
    L, R, B = (5.0, 3.7, 1.25), (6.55, 3.75, 1.3), (5.75, 2.2, 1.3)
    for c in (L, R, B):
        ax.add_patch(Circle(c[:2], c[2], fill=False, lw=1.5, color="black"))
    text(ax, 4.4, 3.9, "I", size=16)
    text(ax, 5.85, 4.15, "II", size=16)
    text(ax, 5.1, 2.75, "III", size=13)
    text(ax, 1.85, 3.8, "Sonic\nwave", size=14)
    arrow(ax, 2.7, 3.8, 3.72, 3.8, head=12)
    text(ax, 10.15, 4.3, "Ultrasonic\nsound wave", size=14)
    arrow(ax, 9.0, 4.3, 7.82, 4.05, head=12)
    text(ax, 10.15, 1.6, "Infrasonic\nsound wave", size=14)
    arrow(ax, 9.0, 1.6, 7.07, 1.95, head=12)
    return fig


def _hatch_line(ax, p, q, side, n=18, size=0.18):
    """A mirror line from p to q with short hatch strokes on `side` (a unit normal)."""
    line(ax, [p, q], lw=2.0)
    for i in range(n + 1):
        x = p[0] + (q[0] - p[0]) * i / n
        y = p[1] + (q[1] - p[1]) * i / n
        line(ax, [(x, y), (x + side[0] * size + (q[0] - p[0]) / n * 0.6, y + side[1] * size + (q[1] - p[1]) / n * 0.6)],
             lw=0.9)


def q13():
    """Q13: plane mirrors M1 (vertical) and M2 (horizontal) at a right angle,
    hatched on their backs; point P 3 cm from each, with the two 3 cm
    distances drawn. The print names neither mirror; the stem does, so the
    labels are added beside them."""
    fig, ax = canvas(3.4, 3.0, (-1.2, 5.4), (-1.0, 5.0))
    _hatch_line(ax, (0, 0), (0, 4.4), (-1, 0), n=16)
    _hatch_line(ax, (0, 0), (5.0, 0), (0, -1), n=18)
    ax.add_patch(Rectangle((0, 0), 0.3, 0.3, fill=False, lw=1.0, color="black"))
    line(ax, [(0, 3.0), (3.0, 3.0)], lw=1.3)
    line(ax, [(3.0, 3.0), (3.0, 0)], lw=1.3)
    ax.add_patch(Circle((3.0, 3.0), 0.09, color="black", zorder=4))
    text(ax, 3.35, 3.2, "P", size=16)
    text(ax, 1.5, 3.3, "3 cm", size=14)
    text(ax, 2.65, 1.5, "3 cm", size=14, rot=90)
    text(ax, -0.75, 4.2, "$M_1$", size=15)
    text(ax, 4.7, -0.6, "$M_2$", size=15)
    return fig


def q22():
    """Q22: key 'Total energy -> T.E., Height -> h'; four graphs of T.E. against
    h: (A) a line falling from the T.E. axis to the h axis; (B) a line rising
    from the origin (arrowed); (C) a curve rising from the origin and bending
    over (arrowed); (D) a horizontal line (arrowed)."""
    fig, ax = canvas(8.4, 3.0, (-1.2, 18.6), (-1.9, 5.6))
    text(ax, 8.6, 5.15, "Total energy → T.E. ,    Height → h", size=14)
    w, h = 3.2, 3.6
    for k, lab in enumerate("ABCD"):
        x0 = k * 4.7
        arrow(ax, x0, 0, x0 + w + 0.3, 0, head=11)
        arrow(ax, x0, 0, x0, h + 0.3, head=11)
        text(ax, x0 - 0.45, h / 2, "T.E.", size=13, rot=90)
        arrow(ax, x0 - 0.45, h / 2 + 0.55, x0 - 0.45, h - 0.1, head=8, lw=1.0)
        arrow(ax, x0 - 0.45, h / 2 - 0.55, x0 - 0.45, 0.2, head=8, lw=1.0)
        text(ax, x0 + w - 0.6, -0.5, "h →", size=13)
        text(ax, x0 + w / 2, -1.4, lab, size=15)
        if lab == "A":
            line(ax, [(x0, 2.6), (x0 + 2.3, 0)], lw=1.7)
        elif lab == "B":
            line(ax, [(x0, 0), (x0 + 2.7, 3.0)], lw=1.7)
            arrow(ax, x0 + 2.5, 2.78, x0 + 2.8, 3.11, head=11, lw=1.7)
        elif lab == "C":
            pts = [(x0 + 2.8 * t, 2.6 * (1 - (1 - t) ** 2.2)) for t in (i / 40 for i in range(41))]
            line(ax, pts, lw=1.7)
            arrow(ax, *pts[-3], x0 + 2.95, 2.62, head=11, lw=1.7)
        else:
            line(ax, [(x0, 2.1), (x0 + 3.0, 2.1)], lw=1.7)
            arrow(ax, x0 + 2.7, 2.1, x0 + 3.1, 2.1, head=11, lw=1.7)
    return fig


def _sine_panel(ax, x0, period, amp, marks, caption, w=4.6):
    arrow(ax, x0, 0, x0 + w + 0.3, 0, head=11)
    arrow(ax, x0, 0, x0, 1.6, head=11)
    arrow(ax, x0, 0, x0, -1.6, head=11)
    text(ax, x0 - 0.35, 0.1, "Displacement →", size=13, rot=90)
    text(ax, x0 + w + 0.45, 0, "Time", size=13, ha="left")
    pts = [(x0 + w * i / 400, amp * math.sin(2 * math.pi * (w * i / 400) / period)) for i in range(401)]
    line(ax, pts, lw=1.6)
    for t, lab in marks:
        ax.add_patch(Circle((x0 + t, 0), 0.06, color="black", zorder=4))
        text(ax, x0 + t + 0.08, -0.12, lab, size=14, ha="left", va="top")
    text(ax, x0 + w / 2, -2.1, caption, size=15)


def q23():
    """Q23: two displacement-time sound waves on axes of the same length. Copied
    from the labels the print carries: wave X completes one wave at the mark
    T; wave Y is marked T/2 after one wave and T after two, so Y's period is
    half X's; Y's amplitude is about half X's. (The pencil drawing does not
    keep Y's spacing exactly; the labels settle it.)"""
    fig, ax = canvas(9.0, 2.9, (-1.0, 13.6), (-2.6, 2.0))
    _sine_panel(ax, 0, 2.2, 1.0, [(2.2, "T")], "Wave X")
    _sine_panel(ax, 7.4, 1.1, 0.5, [(1.1, "T/2"), (2.2, "T")], "Wave Y")
    return fig


def _rod(ax, x, y, length, r, area_lab, len_lab, name):
    ax.add_patch(Ellipse((x, y), 0.5 * r, 2 * r, facecolor="white", edgecolor="black", lw=1.3, hatch="////", zorder=3))
    line(ax, [(x, y + r), (x + length, y + r)], lw=1.3)
    line(ax, [(x, y - r), (x + length, y - r)], lw=1.3)
    line(ax, [(x + length + 0.25 * r * math.cos(t), y + r * math.sin(t))
              for t in [math.radians(-90 + 180 * i / 30) for i in range(31)]], lw=1.3)
    arrow(ax, x - 1.0, y, x - 0.15, y, head=10, lw=1.1)
    text(ax, x - 1.1, y, area_lab, size=15, ha="right")
    text(ax, x + length / 2, y + r + 0.4, len_lab, size=15)
    ax.add_patch(Circle((x + length / 2, y - r - 0.6), 0.28, fill=False, lw=1.1, color="black"))
    text(ax, x + length / 2, y - r - 0.6, name, size=12)


def q25():
    """Q25: four pieces of the same metal, each marked with its cross-section
    area (arrowed to the end face) and length: P (A, L), Q (2A, 3L), R (2A, L),
    S (A/2, L). Thickness follows the area, length the marked length."""
    fig, ax = canvas(8.2, 3.0, (-0.4, 18.8), (-0.8, 5.6))
    L, r = 3.0, 0.38
    _rod(ax, 2.0, 4.0, L, r, "$A$", "$L$", "P")
    _rod(ax, 9.2, 4.0, 3 * L, r * math.sqrt(2), "$2A$", "$3L$", "Q")
    _rod(ax, 2.0, 1.2, L, r * math.sqrt(2), "$2A$", "$L$", "R")
    _rod(ax, 9.2, 1.2, L, r / math.sqrt(2), "$A/2$", "$L$", "S")
    return fig


def q30():
    """Q30: a reflecting telescope. Copied from the print: two parallel rays
    come in from the right (arrowed left), meet a concave mirror on the left,
    are reflected to a small plane mirror set at an angle, which sends them up,
    crossing, through a convex lens and into the human eye, where they meet on
    the retina (labelled Human Eye)."""
    fig, ax = canvas(5.6, 4.4, (0.6, 11.6), (-0.1, 6.6))
    top, bot = 1.95, 0.4
    # concave mirror (centre of curvature to the right), hatched on its left
    cx, R = 6.3, 4.8
    half = math.degrees(math.asin(0.78 / R))  # mirror spans the axis +-0.78, plus a margin
    pts = [(cx - R * math.cos(math.radians(a)), 1.175 + R * math.sin(math.radians(a)))
           for a in [-half - 3 + (2 * half + 6) * i / 40 for i in range(41)]]
    line(ax, pts, lw=1.8)
    for p in pts[::3]:
        line(ax, [p, (p[0] - 0.2, p[1] - 0.1)], lw=0.9)

    def mirror_x(y):
        return cx - math.sqrt(R * R - (y - 1.175) ** 2)
    m_top, m_bot = (mirror_x(top), top), (mirror_x(bot), bot)
    # plane mirror, hatched below-right
    pa, pb = (5.8, 0.68), (7.0, 1.65)
    line(ax, [pa, pb], lw=1.8)
    for i in range(13):
        x = pa[0] + (pb[0] - pa[0]) * i / 12
        y = pa[1] + (pb[1] - pa[1]) * i / 12
        line(ax, [(x, y), (x + 0.15, y - 0.2)], lw=0.9)

    def on_plane(t):
        return (pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t)
    h_top, h_bot = on_plane(0.78), on_plane(0.22)
    # incoming rays
    for y, m in ((top, m_top), (bot, m_bot)):
        line(ax, [(10.6, y), m], lw=1.2)
        mid_arrow(ax, 10.6, y, *m, at=0.18, size=0.22)
        mid_arrow(ax, 10.6, y, *m, at=0.7, size=0.22)
    # to the plane mirror
    for m, hpt in ((m_top, h_top), (m_bot, h_bot)):
        line(ax, [m, hpt], lw=1.2)
        mid_arrow(ax, *m, *hpt, at=0.75, size=0.22)
    # up, crossing, to the lens
    lens = (6.2, 3.25)
    l_left, l_right = (5.9, lens[1]), (6.5, lens[1])
    for hpt, lp in ((h_top, l_left), (h_bot, l_right)):
        line(ax, [hpt, lp], lw=1.2)
        mid_arrow(ax, *hpt, *lp, at=0.75, size=0.22)
    ax.add_patch(Ellipse(lens, 1.3, 0.62, fill=False, lw=1.4, color="black", zorder=3))
    # eye
    eye_c, eye_r = (6.2, 5.35), 0.75
    ax.add_patch(Circle(eye_c, eye_r, fill=False, lw=1.4, color="black"))
    ax.add_patch(Ellipse((6.2, 4.72), 0.85, 0.32, fill=False, lw=1.2, color="black"))
    retina = (6.2, eye_c[1] + eye_r)
    for lp in (l_left, l_right):
        line(ax, [lp, retina], lw=1.2)
        mid_arrow(ax, *lp, *retina, at=0.35, size=0.22)
        mid_arrow(ax, *lp, *retina, at=0.8, size=0.22)
    arrow(ax, 8.3, 5.5, 7.05, 5.5, head=11)
    text(ax, 8.4, 5.5, "Human Eye", size=14, ha="left")
    return fig


def q36():
    """Q36: concept map: 'Gamma Rays' in the middle, arrows up to '1. Use', down
    to '2. Velocity', left to '3. Ionization Power', right to '4. Penetrating
    Power'."""
    fig, ax = canvas(7.6, 2.4, (-0.2, 16.4), (-0.2, 5.0))
    box(ax, 6.4, 2.0, 3.2, 1.0, "Gamma Rays", size=14)
    box(ax, 6.7, 3.95, 2.6, 0.9, "1. Use", size=14)
    box(ax, 6.7, 0.05, 2.6, 0.9, "2. Velocity", size=14)
    box(ax, 0.0, 2.0, 4.6, 1.0, "3. Ionization Power", size=14)
    box(ax, 11.4, 2.0, 4.8, 1.0, "4. Penetrating Power", size=14)
    arrow(ax, 8.0, 3.0, 8.0, 3.95, head=12)
    arrow(ax, 8.0, 2.0, 8.0, 0.95, head=12)
    arrow(ax, 6.4, 2.5, 4.6, 2.5, head=12)
    arrow(ax, 9.6, 2.5, 11.4, 2.5, head=12)
    return fig


def q66():
    """Q66: a triangle 'Simple permanent Tissue' joined to three circles: X Tissue
    (upper left) by a line labelled 'Lignified cell wall', Y Tissue (upper
    right) by 'thin cell wall', Z Tissue (below) by 'Thick cell wall'."""
    fig, ax = canvas(5.0, 4.4, (-0.3, 9.9), (-0.4, 8.6))
    tri = [(3.2, 3.9), (6.4, 3.9), (4.8, 6.9)]
    ax.add_patch(Polygon(tri, closed=True, fill=False, lw=1.6, color="black"))
    text(ax, 4.8, 4.75, "Simple\npermanent\nTissue", size=12)
    for (cx, cy), name in (((1.0, 7.3), "X"), ((8.6, 7.3), "Y"), ((4.8, 0.7), "Z")):
        ax.add_patch(Circle((cx, cy), 0.9, fill=False, lw=1.5, color="black"))
        text(ax, cx, cy + 0.25, name, size=16)
        text(ax, cx, cy - 0.35, "Tissue", size=11)
    line(ax, [(1.82, 6.95), (4.15, 5.75)], lw=1.3)
    text(ax, 3.1, 6.85, "Lignified", size=12, rot=-27)
    text(ax, 2.75, 5.85, "cell wall", size=12, rot=-27)
    line(ax, [(5.45, 5.75), (7.78, 6.95)], lw=1.3)
    text(ax, 6.35, 6.85, "thin", size=12, rot=27)
    text(ax, 6.85, 5.85, "cell wall", size=12, rot=27)
    line(ax, [(4.8, 3.9), (4.8, 1.6)], lw=1.3)
    text(ax, 4.35, 2.75, "Thick", size=12, rot=90)
    text(ax, 5.25, 2.75, "cell wall", size=12, rot=90)
    return fig


def q72():
    """Q72: Venn diagram: two overlapping circles, Plant cell (left, arrowed) and
    Animal cell (right, arrowed); L in the left circle only, M in the overlap,
    N in the right circle only."""
    fig, ax = canvas(6.4, 1.9, (-0.2, 12.4), (0.2, 3.5))
    for x in (5.4, 6.8):
        ax.add_patch(Circle((x, 1.85), 1.3, fill=False, lw=1.5, color="black"))
    text(ax, 4.75, 1.85, "L", size=16)
    text(ax, 6.1, 1.85, "M", size=16)
    text(ax, 7.45, 1.85, "N", size=16)
    text(ax, 1.4, 1.85, "Plant cell", size=14)
    arrow(ax, 2.75, 1.85, 4.08, 1.85, head=12)
    text(ax, 10.75, 1.85, "Animal cell", size=14)
    arrow(ax, 9.3, 1.85, 8.12, 1.85, head=12)
    return fig


FIGURES = {(PAPER, n): fn for n, fn in ((8, q8), (9, q9), (13, q13), (22, q22), (23, q23), (25, q25), (30, q30),
                                        (36, q36), (66, q66), (72, q72))}
