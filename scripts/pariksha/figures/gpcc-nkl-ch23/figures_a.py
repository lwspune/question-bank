"""Redraw the figures of GPCC NKL Physics Vol II Ch. 23 (Ray Optics), sections 23.1-23.3.

    python -P figures_a.py

Each figure is drawn in the pixel frame of a zoomed scan of the printed figure (y down), so
the layout, positions and labels follow the book. Angles that the book labels (30 deg, 37 deg,
45 deg ...) are drawn at their true value; everything else keeps the printed proportions.
PNGs land beside this file as <ref with spaces as _>.png.
"""
import math
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Ellipse, Polygon, Rectangle

HERE = os.path.dirname(os.path.abspath(__file__))
INK = "#1f2937"
GREY = "#d1d5db"
WATER = "#e5e7eb"
LW = 1.6
DPI = 160
FS = 1.3   # text scale
HS = 1.35  # arrowhead scale


# ---------------------------------------------------------------- helpers
class C:
    """A canvas in scan pixels (x right, y down). `px` = output pixels per scan pixel."""

    def __init__(self, w, h, px=1.0, x0=0, y0=0):
        self.px = px
        self.fig = plt.figure(figsize=(w * px / DPI, h * px / DPI), dpi=DPI)
        self.ax = self.fig.add_axes([0, 0, 1, 1])
        self.ax.set_xlim(x0, x0 + w)
        self.ax.set_ylim(y0 + h, y0)
        self.ax.set_aspect("equal")
        self.ax.axis("off")
        self.ox, self.oy = 0, 0

    def P(self, p):
        return (p[0] + self.ox, p[1] + self.oy)

    def s(self, n):  # n output pixels in scan units
        return n / self.px

    def line(self, *pts, ls="-", lw=LW, color=INK, z=3):
        pts = [self.P(p) for p in pts]
        xs, ys = zip(*pts)
        dash = {"-": "-", "--": (0, (4, 3)), ":": (0, (1.2, 2.2))}[ls]
        self.ax.plot(xs, ys, color=color, lw=lw, linestyle=dash, zorder=z,
                     solid_capstyle="round", dash_capstyle="butt")

    def curve(self, pts, ls="-", lw=LW, n=60):
        self.line(*catmull(pts, n), ls=ls, lw=lw)

    def head(self, at, toward, size=13):
        """Filled arrowhead with its tip at `at`, pointing from `toward`'s opposite side to `at`."""
        x, y = self.P(at)
        tx, ty = self.P(toward)
        d = math.hypot(x - tx, y - ty)
        ux, uy = (x - tx) / d, (y - ty) / d
        L, W = self.s(size * HS), self.s(size * HS * 0.42)
        bx, by = x - ux * L, y - uy * L
        self.ax.add_patch(Polygon([(x, y), (bx - uy * W, by + ux * W), (bx + uy * W, by - ux * W)],
                                  closed=True, fc=INK, ec=INK, lw=0.8, zorder=6))

    def arrow(self, a, b, ls="-", lw=LW, size=13):
        """Line a->b with a head at b."""
        self.line(a, b, ls=ls, lw=lw)
        self.head(b, a, size)

    def mid(self, a, b, f=0.5, size=13):
        """Arrowhead on the segment a->b at fraction f, pointing to b."""
        p = (a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f)
        q = (a[0] + (b[0] - a[0]) * (f - 0.05), a[1] + (b[1] - a[1]) * (f - 0.05))
        self.head(p, q, size)

    def text(self, p, s, size=11, ha="center", va="center", **kw):
        x, y = self.P(p)
        self.ax.text(x, y, s, fontsize=size * FS, ha=ha, va=va, color=INK, zorder=8, **kw)

    def arc(self, c, r, a1, a2, lw=1.2, ls="-"):
        """Arc about c, radius r, from math angle a1 to a2 (degrees, counter-clockwise on screen)."""
        t = np.radians(np.linspace(a1, a2, 40))
        pts = [(c[0] + r * math.cos(v), c[1] - r * math.sin(v)) for v in t]
        self.line(*pts, lw=lw, ls=ls)
        return pts

    def dim(self, a, b, label=None, at=None, size=11, ticks=True):
        """Double-headed dimension arrow a<->b, with end bars."""
        self.line(a, b, lw=1.2)
        self.head(a, b, 11)
        self.head(b, a, 11)
        if ticks:
            dx, dy = b[0] - a[0], b[1] - a[1]
            d = math.hypot(dx, dy)
            nx, ny = -dy / d * self.s(8), dx / d * self.s(8)
            for p in (a, b):
                self.line((p[0] - nx, p[1] - ny), (p[0] + nx, p[1] + ny), lw=1.2)
        if label:
            self.text(at or ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2), label, size=size,
                      bbox=dict(fc="white", ec="none", pad=1.5))

    def hatch(self, pts, side, step=14, L=12, slant=40):
        """Short slanted ticks along the polyline `pts`, on the side of point `side`."""
        pts = [np.array(p, float) for p in pts]
        seg = [np.linalg.norm(pts[i + 1] - pts[i]) for i in range(len(pts) - 1)]
        total, s, k = sum(seg), 0.0, 0
        step, L = self.s(step), self.s(L)
        pos = step / 2
        while pos < total:
            while s + seg[k] < pos:
                s += seg[k]
                k += 1
            t = (pos - s) / seg[k]
            p = pts[k] + (pts[k + 1] - pts[k]) * t
            u = (pts[k + 1] - pts[k]) / seg[k]
            n = np.array([-u[1], u[0]])
            if np.dot(np.array(side) - p, n) < 0:
                n = -n
            a = math.radians(slant)
            d = n * math.cos(a) + u * math.sin(a)
            self.line(tuple(p), tuple(p + d * L), lw=1.0)
            pos += step

    def save(self, ref):
        self.fig.savefig(os.path.join(HERE, ref.replace(" ", "_") + ".png"), facecolor="white")
        plt.close(self.fig)


def catmull(pts, n=60):
    """Smooth curve through the points (centripetal-free uniform Catmull-Rom)."""
    p = [np.array(q, float) for q in pts]
    p = [p[0] * 2 - p[1]] + p + [p[-1] * 2 - p[-2]]
    out = []
    for i in range(1, len(p) - 2):
        for t in np.linspace(0, 1, max(4, n // (len(pts) - 1)), endpoint=False):
            t2, t3 = t * t, t * t * t
            q = 0.5 * ((2 * p[i]) + (-p[i - 1] + p[i + 1]) * t + (2 * p[i - 1] - 5 * p[i] + 4 * p[i + 1] - p[i + 2]) * t2
                       + (-p[i - 1] + 3 * p[i] - 3 * p[i + 1] + p[i + 2]) * t3)
            out.append(tuple(q))
    out.append(tuple(p[-2]))
    return out


def circle3(a, b, c):
    """Centre and radius of the circle through three points."""
    ax, ay = a
    bx, by = b
    cx, cy = c
    d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d
    uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d
    return (ux, uy), math.hypot(ax - ux, ay - uy)


def arc3(a, b, c, n=60):
    """Points of the circular arc from a through b to c."""
    (ux, uy), r = circle3(a, b, c)
    ang = lambda p: math.atan2(p[1] - uy, p[0] - ux)
    t1, tm, t2 = ang(a), ang(b), ang(c)
    # pick the direction that passes through b
    def between(t1, tm, t2):
        tw = lambda t: (t - t1) % (2 * math.pi)
        return tw(tm) < tw(t2)
    if between(t1, tm, t2):
        span = (t2 - t1) % (2 * math.pi)
    else:
        span = -((t1 - t2) % (2 * math.pi))
    ts = np.linspace(t1, t1 + span, n)
    return [(ux + r * math.cos(t), uy + r * math.sin(t)) for t in ts]


def ray_end(p, deg, L):
    """Point at distance L from p in math direction `deg` (screen y down)."""
    return (p[0] + L * math.cos(math.radians(deg)), p[1] - L * math.sin(math.radians(deg)))


def axes_xy(c, o, xend, ytop, ylab, xlab, ylab_at=None, xlab_at=None, size=11, ybottom=None, xleft=None):
    """Graph axes with arrowheads; origin o, x to xend, y up to ytop."""
    c.arrow((xleft if xleft is not None else o[0], o[1]), (xend, o[1]), size=11)
    c.arrow((o[0], ybottom if ybottom is not None else o[1]), (o[0], ytop), size=11)
    if ylab:
        c.text(ylab_at or (o[0] - 25, ytop + 5), ylab, size=size)
    if xlab:
        c.text(xlab_at or (xend + 22, o[1]), xlab, size=size)


# ---------------------------------------------------------------- 23.1
def q23_1_10():
    c = C(900, 600, px=0.85)
    c.line((70, 297), (375, 297), ls=":")
    c.line((543, 297), (858, 297), ls=":")
    c.line(*arc3((780, 22), (875, 300), (790, 580)))
    # cube: front face and the visible receding edges
    c.ax.add_patch(Rectangle((375, 237), 168, 188, fc="white", ec=INK, lw=LW, zorder=4))
    c.line((292, 160), (475, 160))
    c.line((292, 160), (375, 237))
    c.line((475, 160), (543, 237))
    c.line((292, 160), (292, 348))
    c.line((292, 348), (375, 425))
    c.dim((300, 128), (478, 128), ticks=True)
    c.text((395, 92), "2 m", size=12, fontweight="bold")
    c.text((515, 130), "P", size=13, style="italic")
    c.dim((258, 165), (258, 355))
    c.text((165, 272), "2 m", size=12, fontweight="bold")
    c.text((333, 405), "Q", size=13, style="italic")
    c.arrow((640, 370), (578, 370))
    c.arrow((768, 370), (846, 370))
    c.text((704, 370), "3 m", size=12, fontweight="bold")
    c.save("23.1 Q10")


def q23_1_11():
    c = C(900, 750, px=0.85)
    c.line((65, 383), (855, 383))
    m2 = arc3((165, 140), (270, 383), (170, 605))
    c.line(*m2)
    c.hatch(m2, side=(0, 383), step=9, L=20)
    m1 = arc3((775, 150), (855, 383), (780, 612))
    c.line(*m1)
    c.hatch(m1, side=(900, 383), step=9, L=20)
    c.ax.plot([460], [383], "o", color=INK, ms=6, zorder=7)
    c.arrow((460, 383), (460, 238))
    c.text((505, 182), "Object", size=13)
    c.text((200, 95), "f = 10 cm", size=12, fontweight="bold")
    c.text((785, 105), "f = 20 cm", size=12, fontweight="bold")
    c.text((250, 628), "$M_2$", size=12, fontweight="bold")
    c.text((735, 630), "$M_1$", size=12, fontweight="bold")
    c.dim((188, 668), (468, 668))
    c.dim((468, 668), (805, 668))
    c.text((330, 712), "10 cm", size=12, fontweight="bold")
    c.text((640, 712), "30 cm", size=12, fontweight="bold")
    c.save("23.1 Q11")


def q23_1_33():
    c = C(1000, 640, px=0.85)
    # panel 1 (scan frame of q33 zoom), shifted
    def p1():
        axes_xy(c, (210, 325), 405, 180, "u + v", "u or v", (150, 182), (415, 362))
        c.line((210, 268), (365, 268), ls="--", lw=1.1)
        c.line((262, 268), (262, 325), ls="--", lw=1.1)
        c.curve([(230, 190), (247, 240), (262, 268), (285, 271), (320, 258), (368, 193)])
        c.text((185, 268), "4f", size=12)
        c.text((262, 357), "2f", size=12)

    def p2():
        axes_xy(c, (222, 597), 440, 432, "u + v", "u or v", (162, 434), (452, 632))
        c.line((222, 533), (393, 533), ls="--", lw=1.1)
        c.line((288, 533), (288, 597), ls="--", lw=1.1)
        c.curve([(248, 445), (270, 498), (288, 533), (330, 563), (370, 575), (402, 578)])
        c.text((197, 533), "4f", size=12)
        c.text((288, 632), "2f", size=12)

    def p3():
        axes_xy(c, (298, 300), 485, 150, "u + v", "u or v", (238, 152), (497, 335))
        c.line((312, 183), (430, 292))

    def p4():
        axes_xy(c, (298, 532), 482, 385, "u + v", "u or v", (238, 387), (494, 567))
        c.line((298, 478), (355, 478), ls="--", lw=1.1)
        c.line((355, 478), (355, 532), ls="--", lw=1.1)
        c.curve([(355, 478), (382, 463), (405, 437), (428, 398)])
        c.text((273, 478), "4f", size=12)
        c.text((355, 567), "2f", size=12)

    for (ox, oy), fn, lab in [((-90, -140), p1, "1"), ((420, -400), p2, "2"),
                              ((-170, 260), p3, "3"), ((330, 30), p4, "4")]:
        c.ox, c.oy = ox, oy
        fn()
    c.ox = c.oy = 0
    for p, lab in [((22, 185), "1"), ((525, 185), "2"), ((22, 545), "3"), ((525, 545), "4")]:
        c.text(p, lab, size=14, fontweight="bold")
    c.save("23.1 Q33")


def q23_1_36():
    c = C(900, 540, px=0.85)
    P = (408, 490)
    c.line((120, 490), (680, 490))
    c.hatch([(120, 490), (680, 490)], side=(400, 600), step=22, L=20, slant=-40)
    c.line((408, 50), P, ls="--", lw=1.4)
    tail = ray_end(P, 120, 380)
    end = ray_end(P, 60, 380)
    c.line(tail, P)
    c.mid(tail, P, 0.55)
    c.line(P, end)
    c.mid(P, end, 0.55)
    c.text((660, 128), "reflected ray", size=12, fontweight="bold")
    c.arc(P, 75, 90, 120)
    c.text(ray_end(P, 106, 165), "30°", size=12)
    # incident ray turned 10 deg clockwise; mirror turned 20 deg clockwise
    pts = c.arc(P, 415, 129, 117, lw=1.6)
    c.head(pts[-1], pts[-4], 12)
    c.text(ray_end(P, 133, 460), "10°", size=12)
    pts = c.arc(P, 300, 6, -7, lw=1.6)
    c.head(pts[-1], pts[-4], 12)
    c.text((752, 492), "20°", size=12)
    c.save("23.1 Q36")


def q23_1_37():
    c = C(533, 340, px=1.8)
    c.line((45, 157), (470, 157))
    c.line(*arc3((432, 20), (470, 157), (436, 292)), lw=3.2)
    c.ax.add_patch(Rectangle((120, 140), 137, 38, fc="white", ec=INK, lw=LW, zorder=4, hatch="////"))
    c.text((106, 128), "B", size=11, fontweight="bold")
    c.text((266, 128), "A", size=11, fontweight="bold")
    # 3f/2 from A to the mirror
    c.line((262, 199), (262, 217), lw=1.2)
    c.arrow((330, 208), (262, 208), size=10)
    c.line((402, 208), (468, 208), lw=1.2)
    c.text((366, 208), r"$\frac{3}{2}$f", size=15)
    # 2f from B to the mirror
    c.line((120, 290), (120, 310), lw=1.2)
    c.line((470, 290), (470, 310), lw=1.2)
    c.arrow((265, 300), (120, 300), size=10)
    c.arrow((315, 300), (470, 300), size=10)
    c.text((290, 300), "2f", size=12)
    c.save("23.1 Q37")


def q23_1_38():
    c = C(620, 440, px=1.5)

    def panel(o, kind):
        x0, y0 = o
        axes_xy(c, o, x0 + 75, y0 - 75, "v", "u", (x0 - 20, y0 - 72), (x0 + 88, y0),
                ybottom=y0 + 65, xleft=x0 - 70)
        if kind == 1:
            s = (x0, y0 - 25)
            e = ray_end(s, 45, 70)
            c.line(s, e)
            c.line(s, (x0 + 72, y0 - 25), ls="--", lw=1.0)
            c.arc(s, 20, 0, 45, lw=1.0)
            c.text((x0 + 50, y0 - 40), "45°", size=10)
        elif kind == 2:
            c.line(ray_end(o, 225, 70), ray_end(o, 45, 95))
            c.arc(o, 20, 0, 45, lw=1.0)
            c.text((x0 + 48, y0 - 20), "45°", size=10)
        elif kind == 3:
            c.line(ray_end(o, 135, 68), ray_end(o, 315, 68))
            c.arc(o, 16, 0, 135, lw=1.0)
            c.text((x0 + 26, y0 - 32), "135°", size=10)
        else:
            c.line(o, ray_end(o, 135, 68))
            c.arc(o, 16, 0, 135, lw=1.0)
            c.text((x0 + 30, y0 - 32), "135°", size=10)

    for o, k, lp in [((170, 120), 1, (75, 120)), ((478, 120), 2, (385, 120)),
                     ((170, 320), 3, (75, 320)), ((478, 320), 4, (385, 320))]:
        panel(o, k)
        c.text(lp, str(k), size=13, fontweight="bold")
    c.save("23.1 Q38")


def q23_1_39():
    c = C(300, 270, px=1.8)
    c.arrow((185, 40), (100, 40), size=12)
    c.line((200, 50), (200, 210))
    c.hatch([(200, 50), (200, 210)], side=(260, 130), step=8, L=9)
    c.ax.plot([100], [115], "o", color=INK, ms=6, zorder=7)
    c.text((100, 150), "Object", size=11)
    c.text((205, 245), "Mirror", size=11)
    c.save("23.1 Q39")


def q23_1_45():
    c = C(900, 620, px=0.85)
    # each panel: apex, solid plain end, solid arrow end, dotted plain end, dotted arrow end
    panels = [
        ("(I)", (65, 215), (185, 92), (352, 222), (170, 295), (378, 168), (110, 272)),
        ("(II)", (518, 215), (648, 90), (822, 247), (565, 275), (845, 185), (625, 292)),
        ("(III)", (82, 520), (225, 398), (403, 503), (366, 558), (203, 592), (140, 585)),
    ]
    for lab, lp, a, sp, sa, dp, da in panels:
        c.line(a, sp)
        c.arrow(a, sa, size=14)
        c.line(a, dp, ls=":", lw=2.0)
        c.arrow(a, da, ls=":", lw=2.0, size=14)
        c.text(lp, lab, size=13)
    c.save("23.1 Q45")


def q23_1_46():
    c = C(400, 300, px=1.8)
    m = arc3((95, 70), (63, 158), (92, 245))
    c.line(*m)
    c.hatch(m, side=(0, 158), step=6, L=10, slant=0)
    c.text((40, 158), "O", size=11)
    c.line((63, 158), (355, 160))
    c.ax.plot([298], [159.6], "o", color=INK, ms=5, zorder=7)
    c.head((255, 159.4), (275, 159.5), 11)
    c.text((285, 133), "object", size=11, fontweight="bold")
    c.save("23.1 Q46")


def q23_1_49():
    c = C(880, 470, px=0.9)
    c.line((60, 262), (825, 262))
    c.arrow((165, 262), (165, 130), ls="--")
    c.arrow((165, 262), (165, 400), ls="--")
    c.text((140, 215), "I", size=14)
    for x, lab, ly in [(255, "C", 320), (452, "B", 322), (655, "A", 318)]:
        c.ax.plot([x], [262], "o", color=INK, ms=7, zorder=7)
        c.text((x, ly), lab, size=14)
    c.line((370, 70), (370, 262))
    c.hatch([(370, 70), (370, 262)], side=(300, 160), step=22, L=30, slant=-45)
    c.arrow((550, 262), (550, 110))
    c.text((550, 298), "O", size=14)
    m = arc3((745, 85), (780, 262), (745, 420))
    c.line(*m)
    c.hatch(m, side=(900, 262), step=22, L=30, slant=40)
    c.ax.plot([780], [262], "o", color=INK, ms=7, zorder=7)
    c.text((752, 215), "P", size=14)
    c.save("23.1 Q49")


def q23_1_50():
    c = C(900, 350, px=0.85)
    C0 = (163, 180)
    c.line(C0, (690, 180), ls=":", lw=2.0)
    c.ax.plot([C0[0]], [C0[1]], "o", color=INK, ms=6, zorder=7)
    c.text((158, 222), "C", size=13)
    v = ray_end(C0, 37, 130)
    c.arrow(C0, v, size=15)
    c.text((245, 58), "5 m/s", size=13, fontweight="bold")
    c.arc(C0, 45, 0, 37)
    c.text((272, 160), "37°", size=13)
    m = arc3((475, 45), (535, 180), (475, 315))
    c.line(*m)
    c.hatch(m, side=(900, 180), step=24, L=22, slant=30)
    c.ax.plot([740], [180], "o", color=INK, ms=6, zorder=7)
    c.arrow((740, 180), (740, 75), size=15)
    c.arrow((740, 180), (845, 180), size=15)
    c.text((740, 45), "y", size=13)
    c.text((868, 180), "x", size=13)
    c.save("23.1 Q50")


def q23_1_51():
    c = C(880, 600, px=0.9)
    axes_xy(c, (97, 543), 660, 95, "v", "u", (55, 110), (705, 545), size=14,
            ybottom=580, xleft=45)
    c.line((97, 543), (445, 208))
    c.curve([(175, 135), (200, 262), (262, 385), (350, 458), (470, 490), (580, 480)])
    c.arrow((265, 383), (355, 347), size=14)
    c.text((360, 347), "(40 cm, 40 cm)", size=14, ha="left")
    c.text((395, 165), "slope (m = 1)", size=14, ha="left")
    c.save("23.1 Q51")


def q23_1_69():
    c = C(880, 900, px=0.85, y0=100)

    def box(x0, y0, x1, y1):
        c.ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, fc="white", ec=INK, lw=LW, zorder=2))

    box(365, 157, 550, 333)
    c.arrow((395, 305), (520, 188))
    c.arrow((460, 245), (518, 295))
    c.line((625, 120), (625, 380))
    c.hatch([(625, 120), (625, 380)], side=(700, 250), step=10, L=12)
    opts = [
        ("1", (55, 528), (87, 432, 297, 628), ((262, 465), (122, 592)), ((195, 527), (255, 582))),
        ("2", (585, 515), (618, 418, 843, 632), ((655, 597), (802, 457)), ((728, 520), (668, 460))),
        ("3", (55, 770), (83, 690, 293, 888), ((255, 857), (128, 727)), ((190, 790), (130, 850))),
        ("4", (585, 770), (615, 666, 830, 876), ((792, 697), (655, 840)), ((715, 772), (653, 712))),
    ]
    for lab, lp, b, lng, sht in opts:
        box(*b)
        c.arrow(*lng)
        c.arrow(*sht)
        c.text(lp, lab, size=15, fontweight="bold")
    c.save("23.1 Q69")


def q23_1_74():
    c = C(900, 900, px=0.85)

    def ticks(o, xs, labs, ly=None):
        for x, s in zip(xs, labs):
            c.line((x, o[1] - 7), (x, o[1] + 7), lw=1.2)
            c.text((x, ly or o[1] + 40), s, size=13)

    def one(o, y1, lab_x):
        c.line((o[0] - 7, y1), (o[0] + 7, y1), lw=1.2)
        c.text((lab_x, y1), "1", size=13)

    # panels 1 and 2 (scan frame of the first zoom)
    o = (200, 383)
    axes_xy(c, o, 452, 135, "m", "x", (203, 108), (467, 385), size=13)
    one(o, 220, 172)
    ticks(o, [280, 382], ["f", "2f"])
    c.curve([(200, 383), (222, 340), (250, 305), (300, 265), (350, 240), (400, 225)])
    o = (633, 390)
    axes_xy(c, o, 868, 175, "m", "x", (633, 150), (882, 390), size=13)
    one(o, 255, 608)
    ticks(o, [706, 800], ["f", "2f"])
    c.curve([(657, 195), (680, 240), (706, 275), (750, 315), (800, 340), (845, 350)])
    # panels 3 and 4 (scan frame of the second zoom), moved down
    c.ox, c.oy = 15, 440
    o = (185, 365)
    axes_xy(c, o, 400, 160, "m", "x", (185, 135), (415, 368), size=13)
    one(o, 228, 158)
    ticks(o, [255, 345], ["f", "2f"])
    c.line((345, 365), (345, 188), ls="--", lw=1.1)
    c.curve([(185, 365), (230, 345), (270, 320), (300, 290), (325, 250), (341, 192)])
    o = (578, 370)
    axes_xy(c, o, 775, 170, "m", "x", (578, 145), (790, 372), size=13)
    one(o, 265, 552)
    ticks(o, [640, 708], ["f", "2f"])
    c.line((640, 370), (640, 180), ls="--", lw=1.1)
    c.line((578, 265), (708, 265), ls="--", lw=1.1)
    c.line((708, 265), (708, 370), ls="--", lw=1.1)
    c.curve([(655, 180), (675, 215), (708, 265), (740, 295), (780, 320)])
    c.ox = c.oy = 0
    for p, lab in [((110, 330), "1"), ((555, 330), "2"), ((110, 760), "3"), ((540, 760), "4")]:
        c.text(p, lab, size=15, fontweight="bold")
    c.save("23.1 Q74")


# ---------------------------------------------------------------- 23.2
def q23_2_9():
    c = C(300, 240, px=1.9, y0=60)
    o = (75, 243)
    axes_xy(c, o, 243, 100, None, None)
    c.text((80, 80), "sin r", size=11, fontweight="bold")
    c.text((215, 268), "sin i", size=11, fontweight="bold")
    c.line(o, ray_end(o, 30, 160))
    c.arc(o, 30, 0, 30)
    c.text((130, 226), "30°", size=11)
    c.save("23.2 Q9")


def bird(c, cx, cy):
    """A simple bird outline (wings raised), centred near (cx, cy)."""
    body = Ellipse(c.P((cx, cy + 20)), 70, 32, angle=-15, fc="white", ec=INK, lw=1.3, zorder=5)
    c.ax.add_patch(body)
    c.ax.add_patch(Polygon([c.P(p) for p in [(cx - 5, cy + 10), (cx - 40, cy - 40), (cx - 10, cy - 20),
                                             (cx + 5, cy + 8)]], closed=True, fc="white", ec=INK, lw=1.3, zorder=6))
    c.ax.add_patch(Polygon([c.P(p) for p in [(cx + 5, cy + 8), (cx + 30, cy - 60), (cx + 45, cy - 20),
                                             (cx + 20, cy + 12)]], closed=True, fc="white", ec=INK, lw=1.3, zorder=6))
    c.ax.add_patch(Ellipse(c.P((cx - 38, cy + 12)), 22, 20, fc="white", ec=INK, lw=1.3, zorder=6))
    c.ax.add_patch(Polygon([c.P(p) for p in [(cx - 48, cy + 10), (cx - 60, cy + 15), (cx - 47, cy + 17)]],
                           closed=True, fc=INK, ec=INK, lw=1, zorder=7))
    c.ax.add_patch(Polygon([c.P(p) for p in [(cx + 30, cy + 25), (cx + 58, cy + 22), (cx + 52, cy + 40)]],
                           closed=True, fc="white", ec=INK, lw=1.3, zorder=4))


def q23_2_14():
    c = C(900, 600, px=0.85)
    c.ax.add_patch(Rectangle((52, 240), 576, 315, fc=WATER, ec="none", zorder=1))
    c.line((52, 240), (628, 240), lw=2.6)
    for y in range(268, 556, 29):
        c.line((58, y), (622, y), ls="--", lw=1.3)
    bird(c, 340, 70)
    c.line((318, 125), (318, 440))
    c.head((318, 125), (318, 160), 15)
    c.head((318, 440), (318, 400), 15)
    c.ax.add_patch(Ellipse((318, 472), 80, 34, fc="#6b7280", ec=INK, lw=1.2, zorder=6))
    c.ax.add_patch(Polygon([(282, 472), (262, 455), (262, 490)], closed=True, fc="#6b7280", ec=INK, lw=1.2, zorder=6))
    c.ax.plot([342], [466], "o", color="white", ms=2.5, zorder=7)
    c.arrow((405, 488), (405, 378), size=15)
    c.text((210, 357), "+3 cm/s", size=13, bbox=dict(fc="white", ec="none", pad=1.5))
    c.arrow((690, 350), (590, 375), size=14)
    c.text((765, 350), "Water", size=13)
    c.text((770, 405), r"($\mu_w$=4/3)", size=13)
    c.save("23.2 Q14")


def q23_2_15():
    c = C(900, 430, px=0.85)
    panels = [
        # interface ends, lower-medium shade, incident start, point, refracted end, labels
        (((105, 140), (235, 265)), [(105, 140), (235, 265), (178, 335), (45, 210)],
         (175, 318), (170, 203), (205, 62), [((105, 100), "n = 1.6"), ((88, 205), "n = 1.4")], ((130, 405), "(i)")),
        (((380, 150), (538, 238)), [(380, 150), (538, 238), (470, 330), (335, 245)],
         (462, 315), (462, 192), (548, 70), [((435, 105), "n = 1.8"), ((395, 237), "n = 1.6")], ((450, 405), "(ii)")),
        (((680, 248), (820, 130)), None,
         (630, 197), (740, 199), (838, 160), [((688, 158), "n = 1.5"), ((815, 228), "n = 1.6")], ((765, 405), "(iii)")),
    ]
    for (a, b), shade, s, p, e, labs, (lp, lab) in panels:
        if shade:
            c.ax.add_patch(Polygon(shade, closed=True, fc=WATER, ec="none", zorder=1))
        c.line(a, b, lw=2.0)
        c.line(s, p)
        c.mid(s, p, 0.55, 15)
        c.line(p, e)
        c.mid(p, e, 0.62, 15)
        for q, t in labs:
            c.text(q, t, size=10, bbox=dict(fc="white", ec="none", pad=0.3, alpha=0.85))
        c.text(lp, lab, size=13)
    c.save("23.2 Q15")


def q23_2_17():
    c = C(465, 240, px=1.8, y0=65)
    c.ax.add_patch(Rectangle((38, 87), 319, 201, fc="white", ec=INK, lw=LW, zorder=2))
    c.line((38, 187), (357, 187))
    for y in [100, 112, 133, 157, 170]:
        c.line((48, y), (347, y), ls="--", lw=1.0)
    for x in range(52, 350, 16):
        c.line((x, 197), (x, 282), ls="--", lw=1.0)
    c.text((210, 147), "4/3", size=12, bbox=dict(fc="white", ec="none", pad=1.5))
    c.text((198, 240), "1.5", size=12, bbox=dict(fc="white", ec="none", pad=1.5))
    c.text((400, 133), "6 cm", size=12)
    c.text((400, 222), "6 cm", size=12)
    c.save("23.2 Q17")


def q23_2_22():
    c = C(820, 440, px=0.95, x0=90, y0=290)
    for x, top in [(268, 330), (518, 330), (772, 315)]:
        c.line((x, top), (x, 714))
    p1 = (268, 600)
    s = ray_end(p1, 225, 160)
    c.line(s, p1)
    c.mid(s, p1, 0.6, 15)
    th2 = math.degrees(math.asin(math.sin(math.radians(45)) / 2))
    p2 = (518, p1[1] - 250 * math.tan(math.radians(th2)))
    c.line(p1, p2)
    c.mid(p1, p2, 0.6, 15)
    e = ray_end(p2, 60, 190)
    c.line(p2, e)
    c.mid(p2, e, 0.6, 15)
    c.line((165, p1[1]), (420, p1[1]), ls="--", lw=1.3)
    c.line((p2[0], p2[1]), (670, p2[1]), ls="--", lw=1.3)
    c.arc(p1, 35, 180, 225)
    c.text((150, 655), "45°", size=13)
    c.arc(p2, 35, 0, 60)
    c.text((572, p2[1] - 28), "r", size=14)
    c.text((165, 385), r"$\mu$ = 1", size=13)
    c.text((378, 362), r"$\mu$ = 2", size=13)
    c.text((698, 325), r"$\mu$ = $\sqrt{2}$", size=11)
    c.save("23.2 Q22")


def q23_2_23():
    c = C(301, 260, px=2.0, y0=60)
    c.ax.add_patch(Rectangle((52, 115), 213, 130, fc="white", ec=INK, lw=LW, zorder=2))
    c.line((148, 75), (148, 305), ls="--", lw=1.2)
    P = (148, 245)
    a = ray_end(P, 115, 80)
    c.line(a, P)
    c.mid(a, P, 0.45, 11)
    b = ray_end(P, -32, 100)
    c.line(P, b)
    c.head(b, P, 12)
    c.arc(P, 22, 90, 115, lw=1.0)
    c.arc(P, 22, -90, -32, lw=1.0)
    c.text((195, 160), "denser", size=11)
    c.text((240, 262), "rarer", size=11)
    c.text((75, 215), "(1)", size=11)
    c.text((75, 268), "(2)", size=11)
    c.text((164, 210), "$i_1$", size=11)
    c.text((156, 288), "$i_2$", size=11)
    c.save("23.2 Q23")


def q23_2_28():
    c = C(300, 190, px=2.1, x0=60, y0=88)
    c.arrow((160, 262), (160, 100), size=10)
    c.text((150, 97), "y", size=11)
    c.line((118, 157), (345, 157))
    c.line((118, 243), (345, 243))
    c.curve([(160, 242.6), (182.3, 236.5), (203.2, 226.1), (218, 214.2), (229.9, 201.7)])
    c.line((229.9, 201.7), (267.1, 157.6), ls="--", lw=1.4)
    c.head((200, 227.6), (194, 230.2), 10)
    c.arc((160, 243), 12, 180, 270, lw=1.0)
    c.text((105, 268), r"$\theta \cong 90°$", size=11)
    c.save("23.2 Q28")


def q23_2_35():
    c = C(600, 470, px=1.4, y0=70)

    def panel(o, rise, fall, rise_curve, fall_curve, dash_top):
        ux, uy = 115, 118
        f = lambda p: (o[0] + p[0] * ux, o[1] - p[1] * uy)
        axes_xy(c, o, o[0] + 115, o[1] - 118, r"$\delta$", "i", (o[0] - 18, o[1] - 113), (o[0] + 128, o[1]))
        c.line(f((0.5, 0)), f((0.5, dash_top)), ls="--", lw=1.0)
        pts = [f(p) for p in rise]
        c.curve(pts) if rise_curve else c.line(*pts)
        pts = [f(p) for p in fall]
        c.curve(pts) if fall_curve else c.line(*pts)
        c.text((o[0] + 0.52 * ux, o[1] + 22), r"$i = \theta_c$", size=11)

    up = [(0, 0), (0.2, 0.04), (0.35, 0.14), (0.44, 0.28), (0.5, 0.43)]
    panel((75, 218), [(0, 0), (0.5, 0.42)], [(0.52, 0.86), (0.76, 0.0)], False, False, 0.85)
    panel((380, 218), [(0, 0), (0.5, 0.42)], [(0.52, 0.84), (0.555, 0.5), (0.6, 0.29), (0.68, 0.11), (0.80, 0.0)],
          False, True, 0.84)
    panel((75, 470), up, [(0.51, 0.67), (0.545, 0.4), (0.59, 0.22), (0.67, 0.08), (0.80, 0.0)], True, True, 0.67)
    panel((380, 470), up, [(0.52, 0.70), (0.79, 0.0)], True, False, 0.70)
    for p, lab in [((35, 170), "1"), ((340, 170), "2"), ((35, 420), "3"), ((340, 420), "4")]:
        c.text(p, lab, size=13, fontweight="bold")
    c.save("23.2 Q35")


def q23_2_39():
    c = C(330, 245, px=1.9, x0=20, y0=110)
    c.line((50, 193), (300, 193))
    c.line((50, 286), (300, 286))
    p1 = (166, 193)
    a = ray_end(p1, 45, 55)
    c.line(a, p1)
    c.mid(a, p1, 0.5, 11)
    dy = 286 - 193
    p2 = (p1[0] - dy * math.tan(math.radians(30)), 286)
    c.line(p1, p2)
    c.mid(p1, p2, 0.55, 11)
    e = ray_end(p2, 180 + 30, 70)
    c.line(p2, e)
    c.mid(p2, e, 0.6, 11)
    c.line((p1[0], 145), p1, ls="--", lw=1.1)
    c.line(p1, (p1[0], 240), ls="--", lw=1.1)
    c.line((p2[0], 248), (p2[0], 335), ls="--", lw=1.1)
    c.arc(p1, 13, 45, 90, lw=1.0)
    c.text(ray_end(p1, 68, 40), "45°", size=9)
    c.arc(p1, 18, 240, 270, lw=1.0)
    c.text(ray_end(p1, 258, 58), "30°", size=9)
    c.arc(p2, 14, 210, 270, lw=1.0)
    c.text(ray_end(p2, 242, 42), "60°", size=9)
    c.text((245, 172), r"$\mu_1$", size=12)
    c.text((245, 240), r"$\mu_2$", size=12)
    c.text((245, 318), r"$\mu_3$", size=12)
    c.save("23.2 Q39")


def q23_2_41():
    c = C(482, 230, px=1.8, y0=70)
    for y, top, lab, name, h in [(128, 97, "1", "Air", 48), (245, 215, "2", "Glass", 50)]:
        c.line((40, y), (130, y))
        c.mid((40, y), (130, y), 0.62, 11)
        c.ax.add_patch(Rectangle((130, top), 200, h, fc="white", ec=INK, lw=LW, zorder=2))
        c.text((230, top + h / 2), name, size=12)
        c.line((330, y), (440, y))
        c.mid((330, y), (440, y), 0.55, 11)
        c.text((47, y - 22), lab, size=12)
    c.dim((132, 200), (328, 200), ticks=False)
    c.text((230, 200), r"$4\lambda_0$", size=12, bbox=dict(fc="white", ec="none", pad=1))
    c.save("23.2 Q41")


def q23_2_46():
    c = C(380, 260, px=1.9, y0=85)
    c.ax.add_patch(Rectangle((172, 128), 33, 210, fc="white", ec=INK, lw=LW, zorder=2))
    c.dim((172, 117), (205, 117), ticks=False)
    c.text((188, 100), "t", size=11)
    c.text((188, 320), r"$\mu$", size=12)
    c.ax.plot([75], [240], "o", color=INK, ms=5, zorder=7)
    c.text((60, 240), "O", size=11)
    c.text((80, 263), "object", size=11)
    c.line((75, 240), (172, 240))
    c.head((103, 240), (90, 240), 11)
    c.head((133, 240), (120, 240), 11)
    c.text((95, 212), "2 cm/s", size=11)
    c.line((205, 240), (300, 242))
    c.head((240, 240.7), (225, 240.4), 11)
    c.ax.plot([300], [242], "o", color=INK, ms=5, zorder=7)
    c.text((305, 212), "eye", size=11)
    for r in (8, 13):
        c.arc((306, 242), r, -50, 50, lw=1.2)
    c.save("23.2 Q46")


# ---------------------------------------------------------------- 23.3
def q23_3_2():
    c = C(860, 760, px=0.9, y0=100)
    B = (415, 462)
    c.line((40, 462), (780, 462))
    c.line((415, 145), (415, 780))
    a = ray_end(B, 130, 360)
    c.line(a, B)
    c.mid(a, B, 0.4, 16)
    cc = ray_end(B, 50, 360)
    c.line(B, cc)
    d = ray_end(B, -40, 410)
    c.line(B, d)
    c.mid(B, d, 0.6, 16)
    c.arc(B, 40, 90, 130)
    c.arc(B, 50, 50, 90)
    c.arc(B, 40, -90, -40)
    c.text(ray_end(B, 133, 400), "A", size=15, style="italic", fontweight="bold")
    c.text(ray_end(B, 47, 400), "C", size=15, style="italic", fontweight="bold")
    c.text(ray_end(B, -37, 440), "D", size=15, style="italic", fontweight="bold")
    c.text((395, 145), "N", size=15, style="italic", fontweight="bold")
    c.text((443, 800), "N'", size=15, style="italic", fontweight="bold")
    c.text((365, 505), "B", size=15, style="italic", fontweight="bold")
    c.text((382, 380), "i", size=15, style="italic", fontweight="bold")
    c.text((440, 378), "r", size=15, style="italic", fontweight="bold")
    c.text((440, 555), "r'", size=15, style="italic", fontweight="bold")
    c.text((190, 433), "DENSER", size=14)
    c.text((170, 503), "RARER", size=14)
    c.save("23.3 Q2")


def q23_3_12():
    c = C(880, 240, px=0.95, x0=20)
    for cx, cy in [(205, 95), (722, 113)]:
        c.ax.add_patch(Ellipse((cx, cy), 65, 125, fc="white", ec=INK, lw=LW, zorder=3))
    c.line((205, 32.5), (722, 50.5))
    c.line((205, 157.5), (722, 175.5))
    c.line((65, 92), (825, 125), ls="--", lw=1.4)
    c.line((38, 205), (310, 32.5))
    c.mid((38, 205), (310, 32.5), 0.25, 16)
    c.mid((38, 205), (310, 32.5), 0.85, 16)
    c.line((310, 33), (435, 37), lw=2.8)
    c.head((395, 35.8), (370, 35), 16)
    c.arc((205, 96), 62, 180, 211, lw=1.2)
    c.text((110, 122), r"$\theta$", size=15)
    c.save("23.3 Q12")


def q23_3_19():
    c = C(850, 720, px=0.9, y0=170)
    c.line((40, 308), (818, 308))
    c.line((35, 705), (818, 705))
    p1 = (265, 308)
    p2 = (553, 705)
    c.line((265, 200), (265, 415))
    c.line((553, 590), (553, 810))
    c.line(p1, p2)
    c.line(p2, (628, 808))
    c.head((610, 783), (640, 824), 16)
    c.line((40, 308), p1)
    c.head((100, 308), (150, 308), 16)
    c.line((222, 308), (222, 278), lw=1.3)
    c.line((222, 278), (265, 278), lw=1.3)
    ang = math.degrees(math.atan2(-(p2[1] - p1[1]), p2[0] - p1[0]))
    c.arc(p1, 45, ang, -90)
    c.arc(p2, 45, 90, 180 + ang)
    c.arc(p2, 45, ang, -90)
    c.text((290, 410), "r", size=15, style="italic", fontweight="bold")
    c.text((532, 600), "r", size=15, style="italic", fontweight="bold")
    c.text((560, 800), "i", size=15, style="italic", fontweight="bold")
    c.text((112, 268), "Air", size=15, fontweight="bold")
    c.text((255, 495), "Water", size=15, fontweight="bold")
    c.text((245, 790), "Glass", size=15, fontweight="bold")
    c.text((540, 465), r"$\mu_w = 4/3$", size=15, fontweight="bold")
    c.save("23.3 Q19")


def q23_3_27():
    c = C(900, 560, px=0.85, y0=40)
    O = (500, 375)
    R = 210
    t = np.radians(np.linspace(0, 360, 200))
    c.line(*[(O[0] + R * math.cos(v), O[1] + R * math.sin(v)) for v in t])
    A = ray_end(O, 135, R)
    B = ray_end(O, 45, R)
    c.ax.plot([O[0]], [O[1]], "o", color=INK, ms=9, zorder=7)
    c.line(O, ray_end(O, 135, R + 145), ls=":", lw=2.0)
    c.line((140, O[1]), (830, O[1]), ls=":", lw=2.0)
    s = (60, 418)
    c.line(s, A)
    c.mid(s, A, 0.5, 16)
    c.line(A, B)
    c.mid(A, B, 0.47, 16)
    c.text((A[0] - 48, A[1] - 8), "A", size=15)
    c.text((B[0] + 40, B[1] + 5), "B", size=15)
    c.save("23.3 Q27")


FIGS = [q23_1_10, q23_1_11, q23_1_33, q23_1_36, q23_1_37, q23_1_38, q23_1_39, q23_1_45, q23_1_46,
        q23_1_49, q23_1_50, q23_1_51, q23_1_69, q23_1_74,
        q23_2_9, q23_2_14, q23_2_15, q23_2_17, q23_2_22, q23_2_23, q23_2_28, q23_2_35, q23_2_39,
        q23_2_41, q23_2_46,
        q23_3_2, q23_3_12, q23_3_19, q23_3_27]

if __name__ == "__main__":
    for f in FIGS:
        f()
    print("wrote", len(FIGS), "figures")
