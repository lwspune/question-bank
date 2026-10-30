"""Redraw the figures of GPCC NKL Physics Vol II Ch. 23 (Ray Optics), sections 23.4-23.6.

    python -P figures_b.py

Writes <ref with spaces as _>.png beside this file for every figure question in ch23b.A.json.
Prisms of a few degrees (23.6 Q16, Q19) keep the book's exaggerated apex; elsewhere a
labelled angle is drawn at its labelled size.
"""
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Arc, Circle, FancyArrowPatch, Polygon

HERE = os.path.dirname(os.path.abspath(__file__))
INK = "#1f2937"
GREY = "#9ca3af"
LW = 1.6
plt.rcParams.update({"font.family": "serif", "font.serif": ["DejaVu Serif"],
                     "mathtext.fontset": "dejavuserif", "font.size": 11})


# ----------------------------------------------------------------- helpers
def fig_ax(w, h):
    fig, ax = plt.subplots(figsize=(w, h), dpi=160)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def save(fig, ref):
    fig.savefig(os.path.join(HERE, ref.replace(" ", "_") + ".png"), facecolor="white",
                bbox_inches="tight", pad_inches=0.12)
    plt.close(fig)


def line(ax, pts, ls="-", lw=LW, color=INK, z=3):
    xs, ys = zip(*pts)
    ax.plot(xs, ys, color=color, lw=lw, ls=ls, solid_capstyle="round", zorder=z)


def arrow(ax, p0, p1, lw=LW, style="-|>", ms=12, color=INK):
    ax.add_patch(FancyArrowPatch(p0, p1, arrowstyle=style, mutation_scale=ms, color=color,
                                 lw=lw, shrinkA=0, shrinkB=0, zorder=4))


def head(ax, p0, p1, at=0.5, ms=12):
    """Arrowhead on segment p0->p1 at fraction `at`, pointing p0->p1."""
    p0, p1 = np.array(p0, float), np.array(p1, float)
    d = (p1 - p0) / np.linalg.norm(p1 - p0)
    m = p0 + (p1 - p0) * at
    arrow(ax, tuple(m - d * 0.02), tuple(m + d * 0.02), ms=ms)


def ray(ax, p0, p1, at=0.5, ls="-"):
    line(ax, [p0, p1], ls=ls)
    if at is not None:
        head(ax, p0, p1, at)


def dim(ax, p0, p1, label=None, off=(0, -0.25), size=11):
    arrow(ax, p0, p1, style="<|-|>", lw=1.2, ms=10)
    if label:
        m = ((p0[0] + p1[0]) / 2 + off[0], (p0[1] + p1[1]) / 2 + off[1])
        ax.text(*m, label, ha="center", va="center", fontsize=size, color=INK)


def txt(ax, x, y, s, size=11, ha="center", va="center", **kw):
    ax.text(x, y, s, ha=ha, va=va, fontsize=size, color=INK, **kw)


def dot(ax, x, y, r=0.06):
    ax.add_patch(Circle((x, y), r, color=INK, zorder=5))


def sag(y, b, h):
    """Signed sag of a circular surface with bulge b at y=0 and zero at y=+-h."""
    if b == 0:
        return np.zeros_like(y)
    R = (h * h + b * b) / (2 * abs(b))
    return np.sign(b) * (np.sqrt(R * R - y * y) - (R - abs(b)))


def lens_pts(x0, h, bl, br, e=0.0, cy=0.0, n=80):
    """Closed outline: left surface x0-e-sag(bl), right x0+e+sag(br); bulge>0 = convex."""
    y = np.linspace(h, -h, n)
    left = [(x0 - e - s, cy + yy) for yy, s in zip(y, sag(y, bl, h))]
    y2 = y[::-1]
    right = [(x0 + e + s, cy + yy) for yy, s in zip(y2, sag(y2, br, h))]
    return left + right


def lens(ax, x0, h, bl, br, e=0.0, cy=0.0, ls="-", lw=LW, fc="none"):
    p = Polygon(lens_pts(x0, h, bl, br, e, cy), closed=True, fc=fc, ec=INK, lw=lw, ls=ls, zorder=3)
    ax.add_patch(p)
    return p


def hatch(ax, pts, out, n=12, L=0.16, ang=40):
    """Short ticks along a polyline on the side of the unit vector-ish `out` (sign chooses side)."""
    pts = np.array(pts, float)
    seg = np.cumsum(np.r_[0, np.linalg.norm(np.diff(pts, axis=0), axis=1)])
    for s in np.linspace(seg[-1] * 0.03, seg[-1] * 0.97, n):
        i = min(np.searchsorted(seg, s) - 1, len(pts) - 2)
        i = max(i, 0)
        t = (s - seg[i]) / (seg[i + 1] - seg[i])
        p = pts[i] + t * (pts[i + 1] - pts[i])
        tang = (pts[i + 1] - pts[i]) / np.linalg.norm(pts[i + 1] - pts[i])
        nrm = np.array([-tang[1], tang[0]])
        if np.dot(nrm, out) < 0:
            nrm = -nrm
        a = np.radians(ang)
        d = nrm * np.cos(a) + tang * np.sin(a)
        line(ax, [tuple(p), tuple(p + d * L)], lw=1.1)


def brace(ax, p0, p1, depth):
    """Curly brace from p0 to p1, tip bulging by `depth` to the left of p0->p1."""
    p0, p1 = np.array(p0, float), np.array(p1, float)
    t = np.linspace(0, 1, 301)
    u = np.minimum(t, 1 - t)
    a = 0.5 * np.sin(np.clip(u / 0.09, 0, 1) * np.pi / 2)
    b = 0.5 * np.cos(np.clip((0.5 - u) / 0.09, 0, 1) * np.pi / 2)
    f = depth * (a + b)
    d = (p1 - p0)
    nrm = np.array([-d[1], d[0]]) / np.linalg.norm(d)
    pts = p0[None, :] + t[:, None] * d[None, :] + f[:, None] * nrm[None, :]
    ax.plot(pts[:, 0], pts[:, 1], color=INK, lw=1.2, zorder=3)


def right_mark(ax, p, u, v, s=0.15):
    p, u, v = np.array(p, float), np.array(u, float), np.array(v, float)
    u, v = u / np.linalg.norm(u), v / np.linalg.norm(v)
    line(ax, [tuple(p + u * s), tuple(p + u * s + v * s), tuple(p + v * s)], lw=1.1)


def angle_arc(ax, c, r, a0, a1, lw=1.1):
    ax.add_patch(Arc(c, 2 * r, 2 * r, theta1=a0, theta2=a1, color=INK, lw=lw, zorder=3))


def catmull(pts, n=30):
    pts = np.array(pts, float)
    P = np.vstack([2 * pts[0] - pts[1], pts, 2 * pts[-1] - pts[-2]])
    out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for t in np.linspace(0, 1, n, endpoint=False):
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    out.append(pts[-1])
    return np.array(out)


# ----------------------------------------------------------------- 23.4 spherical surfaces
def q23_4_4():
    fig, ax = fig_ax(3.4, 2.8)
    ax.add_patch(Circle((0, 0), 2, fill=False, ec=INK, lw=LW))
    ax.add_patch(Circle((1, 0), 1, fill=False, ec=INK, lw=LW))
    line(ax, [(-2.6, 0), (2.9, 0)])
    dot(ax, 0, 0, 0.09)
    dot(ax, 2, 0, 0.09)
    txt(ax, -0.18, -0.38, "O", 13)
    txt(ax, 2.25, 0.4, "P", 13)
    ax.set_xlim(-2.7, 3.0)
    ax.set_ylim(-2.1, 2.1)
    save(fig, "23.4 Q4")


def q23_4_5():
    fig, ax = fig_ax(4.2, 2.4)
    h = 1.0
    y = np.linspace(h, -h, 60)
    xs = sag(y, 0.25, h)
    line(ax, list(zip(xs, y)))
    line(ax, [(0, h), (3.0, h)])
    line(ax, [(0, -h), (3.0, -h)])
    line(ax, [(-1.8, 0), (3.6, 0)])
    dot(ax, -1.4, 0)
    txt(ax, -1.45, 0.32, "O", 13)
    brace(ax, (-1.25, -0.1), (0.12, -0.1), -0.14)
    txt(ax, -0.8, -0.55, "20 cm", 12)
    txt(ax, 0.48, -0.3, "P", 13)
    txt(ax, -0.1, 1.3, "A", 13)
    txt(ax, -0.05, -1.3, "B", 13)
    txt(ax, 2.2, -0.35, r"$\mu$= 4/3", 13)
    save(fig, "23.4 Q5")


def q23_4_8():
    fig, ax = fig_ax(4.4, 1.9)
    t = np.linspace(np.pi / 2, 3 * np.pi / 2, 60)
    ex, ey = 0.75 + 0.75 * np.cos(t), 1.15 * np.sin(t)
    line(ax, list(zip(ex, ey)))
    line(ax, [(0.75, 1.15), (4.2, 1.15)])
    line(ax, [(0.75, -1.15), (4.2, -1.15)])
    line(ax, [(-2.3, 0), (2.7, 0)], lw=1.3)
    for x in (-1.65, 2.4):
        line(ax, [(x, -0.12), (x, 0.12)], lw=1.3)
    txt(ax, -1.62, 0.33, "O", 13, style="italic")
    txt(ax, -0.85, 0.3, "Air", 13)
    txt(ax, 1.3, 0.35, "Glass", 13)
    dim(ax, (-1.65, -0.3), (0, -0.3), "15 cm", off=(0, -0.42), size=12)
    dim(ax, (0, -0.3), (2.4, -0.3), "30 cm", off=(0, -0.42), size=12)
    save(fig, "23.4 Q8")


def q23_4_9():
    fig, ax = fig_ax(4.2, 3.0)
    C, O, I = 1.9, 2.55, 3.15
    R = 3.0
    top, bot = 1.12, -1.1
    yA = np.linspace(top, bot, 80)
    line(ax, list(zip(C + np.sqrt(R * R - yA ** 2), yA)))
    A = (C + np.sqrt(R * R - top ** 2), top)
    line(ax, [(0.5, top), A])
    line(ax, [(0.5, bot), (C + np.sqrt(R * R - bot ** 2), bot)])
    P = C + R
    line(ax, [(0.5, 0), (P, 0)], lw=1.3)
    line(ax, [(C, 0), A], ls=(0, (3, 2)), lw=1.2)
    line(ax, [(I, 0), A], ls=(0, (3, 2)), lw=1.2)
    ray(ax, (O, 0), A, at=0.45)
    d = np.array(A) - np.array((I, 0))
    d /= np.linalg.norm(d)
    line(ax, [A, tuple(np.array(A) + d * 1.0)])
    for x in (C, O, I):
        dot(ax, x, 0, 0.07)
    txt(ax, C - 0.15, -0.3, "C", 13)
    txt(ax, O - 0.12, -0.3, "O", 13)
    txt(ax, I - 0.05, -0.35, "I", 13)
    txt(ax, P + 0.25, -0.05, "P", 13)
    txt(ax, A[0] - 0.3, A[1] + 0.3, "A", 13)
    txt(ax, 2.0, 0.72, r"$\mu$ = 1.5", 12)
    txt(ax, A[0] + 0.85, 0.95, r"$\mu$ = 1", 12)
    dl = (0, (3, 2))
    line(ax, [(C - 0.05, -0.5), (C - 0.05, -2.3)], ls=dl, lw=1.1)
    line(ax, [(O - 0.12, -0.5), (O - 0.12, -2.3)], ls=dl, lw=1.1)
    line(ax, [(P - 0.1, -0.4), (P - 0.1, -2.3)], ls=dl, lw=1.1)
    dim(ax, (O - 0.12, -1.45), (P - 0.1, -1.45), "3 cm", off=(0, -0.3), size=12)
    dim(ax, (C - 0.05, -2.2), (P - 0.1, -2.2), "5 cm", off=(0, -0.3), size=12)
    save(fig, "23.4 Q9")


def q23_4_10():
    fig, ax = fig_ax(3.2, 2.2)
    h = 1.15
    y = np.linspace(h, -h, 60)
    line(ax, list(zip(sag(y, 0.35, h), y)))
    line(ax, [(0, h), (2.4, h)])
    line(ax, [(0, -h), (2.4, -h)])
    line(ax, [(-1.6, 0), (2.8, 0)], ls=(0, (4, 3)), lw=1.4)
    dot(ax, 1.3, 0)
    txt(ax, 1.4, -0.5, "O", 16)
    txt(ax, 1.3, 0.72, "dense", 13)
    save(fig, "23.4 Q10")


def q23_4_14():
    fig, ax = fig_ax(2.6, 2.6)
    ax.add_patch(Circle((0, 0), 1.6, fill=False, ec=INK, lw=LW))
    line(ax, [(-1.6, 0), (0, 0)], ls=(0, (1, 1.5)), lw=1.3)
    dot(ax, 0, 0)
    txt(ax, 0.25, 0, "O", 13)
    txt(ax, -0.8, -0.22, "4 cm", 11)
    txt(ax, 0, 1.82, "A", 13, style="italic")
    save(fig, "23.4 Q14")


def q23_4_15():
    fig, ax = fig_ax(3.8, 2.0)
    R = 1.0
    ax.add_patch(Circle((0, 0), R, fill=False, ec=INK, lw=LW))
    for y in (0.62, -0.62):
        x = -np.sqrt(R * R - y * y)
        line(ax, [(-3.0, y), (x, y)])
        line(ax, [(x, y), (R, 0)])
        dot(ax, x, y, 0.04)
    line(ax, [(-3.0, 0), (R, 0)], ls=(0, (3, 2)), lw=1.3)
    dot(ax, -R, 0, 0.04)
    save(fig, "23.4 Q15")


def q23_4_17():
    fig, ax = fig_ax(4.8, 2.6)
    h, xc, b = 0.62, 1.92, 0.2
    y = np.linspace(h, -h, 60)
    curve = list(zip(xc - sag(y, b, h), y))
    line(ax, curve)
    xm = 3.72
    line(ax, [(xc, h), (xm, h)])
    line(ax, [(xc, -h), (xm, -h)])
    line(ax, [(xm, 0.78), (xm, -0.78)])
    hatch(ax, [(xm, 0.78), (xm, -0.78)], (1, 0), n=12, L=0.12)
    line(ax, [(0, 0), (xm, 0)], ls=(0, (2, 2)), lw=1.2)
    dot(ax, 0, 0, 0.07)
    txt(ax, 0.05, 0.27, "O", 13)
    txt(ax, 2.75, 0.3, r"$\mu$ = 1.5", 12)
    ax.add_patch(FancyArrowPatch((xc - 0.16, 0.3), (xc - 0.05, 1.0), connectionstyle="arc3,rad=-0.35",
                                 arrowstyle="-|>", mutation_scale=11, color=INK, lw=1.2))
    txt(ax, xc + 0.2, 1.25, "R = 10 cm", 12)
    arrow(ax, (xm + 0.08, -0.05), (xm + 0.45, 0.07), lw=1.2, ms=11)
    txt(ax, xm + 0.55, 0.12, "Mirror", 12, ha="left")
    dim(ax, (0, -0.32), (xc - b, -0.32), "x", off=(-0.15, -0.25), size=12)
    dim(ax, (xc + 0.05, -0.9), (xm - 0.05, -0.9), "90 cm", off=(0, -0.27), size=12)
    save(fig, "23.4 Q17")


# ----------------------------------------------------------------- 23.5 lenses
def half_lens(ax, xflat, h, bulge, side, cy=0.0):
    """Plano-convex piece: flat face at x=xflat, curved face on `side` (+1 right, -1 left)."""
    y = np.linspace(h, -h, 60)
    pts = [(xflat + side * s, cy + yy) for yy, s in zip(y, sag(y, bulge, h))]
    ax.add_patch(Polygon(pts, closed=True, fill=False, ec=INK, lw=LW, zorder=3))


def q23_5_4():
    fig, ax = fig_ax(5.6, 1.9)
    h, b = 1.0, 0.38
    # 1: plane faces outward, curved faces touching
    half_lens(ax, -b, h, b, +1)
    half_lens(ax, b, h, b, -1)
    # 2: plane faces in contact
    half_lens(ax, 2.6 - 0.03, h, b, -1)
    half_lens(ax, 2.6 + 0.03, h, b, +1)
    # 3: both the same way
    half_lens(ax, 4.9, h, b, +1)
    half_lens(ax, 4.9 + b + 0.02, h, b, +1)
    ax.set_xlim(-0.8, 5.8)
    ax.set_ylim(-1.1, 1.1)
    save(fig, "23.5 Q4")


def q23_5_9():
    fig, ax = fig_ax(4.0, 2.4)
    h, w = 1.2, 0.45
    lens(ax, 0, h, w, w)
    dl = (0, (2.5, 2))
    line(ax, [(0, h), (0, -h)], ls=dl, lw=1.2)
    line(ax, [(-w, 0), (w, 0)], ls=dl, lw=1.2)
    hq = 0.8   # pieces: half-height of the (uncut) lens they came from
    wq = 0.32
    y = np.linspace(0, hq, 40)
    s = sag(y, wq, hq)
    cut, base = 2.75, 0.35
    # L2: top-left quarter, L3: top-right quarter
    pts2 = [(cut - 0.25 - v, base + yy) for yy, v in zip(y, s)] + [(cut - 0.25, base + hq), (cut - 0.25, base)]
    pts3 = [(cut + 0.25 + v, base + yy) for yy, v in zip(y, s)] + [(cut + 0.25, base + hq), (cut + 0.25, base)]
    for p in (pts2, pts3):
        ax.add_patch(Polygon(p, closed=True, fill=False, ec=INK, lw=LW))
    # L1: bottom half
    top = -0.3
    yb = np.linspace(0, -hq, 40)
    sb = sag(yb, wq, hq)
    pts1 = [(cut - v, top + yy) for yy, v in zip(yb, sb)] + [(cut + v, top + yy) for yy, v in zip(yb[::-1], sb[::-1])]
    ax.add_patch(Polygon(pts1, closed=True, fill=False, ec=INK, lw=LW))
    txt(ax, cut - 0.75, base + hq - 0.05, r"$L_2$", 13)
    txt(ax, cut + 0.75, base + hq - 0.05, r"$L_3$", 13)
    txt(ax, cut + 0.5, top - hq + 0.05, r"$L_1$", 13)
    save(fig, "23.5 Q9")


def q23_5_11():
    fig, ax = fig_ax(2.4, 3.2)
    h, w = 2.6, 0.62
    edge = lens(ax, 0, h, w, w)
    bands = [(2.6, 1.75, "h"), (1.75, 0.85, "v"), (0.85, 0.0, "h"),
             (0.0, -0.85, "v"), (-0.85, -1.75, "h"), (-1.75, -2.6, "v")]
    step = 0.075
    for y0, y1, kind in bands:
        if kind == "h":
            for yy in np.arange(y1 + step / 2, y0, step):
                ln, = ax.plot([-w, w], [yy, yy], color=INK, lw=0.8)
                ln.set_clip_path(edge)
        else:
            for xx in np.arange(-w + step / 2, w, step):
                ln, = ax.plot([xx, xx], [y1, y0], color=INK, lw=0.8)
                ln.set_clip_path(edge)
        ln, = ax.plot([-w, w], [y1, y1], color=INK, lw=1.2)
        ln.set_clip_path(edge)
    line(ax, [(-2.2, 0), (2.2, 0)])
    save(fig, "23.5 Q11")


def q23_5_12():
    fig, ax = fig_ax(3.2, 3.2)
    line(ax, [(0, 1.9), (0, -1.9)])
    half_lens(ax, 0, 1.2, 0.5, -1)
    hatch(ax, [(0, 1.2), (0, -1.2)], (1, 0), n=14, L=0.13)
    line(ax, [(-2.6, 0), (2.6, 0)], ls=(0, (3, 2.5)), lw=1.3)
    arrow(ax, (-2.25, 0), (-2.25, 0.25), lw=1.2, ms=9)
    txt(ax, -2.25, -0.22, "O", 11, fontweight="bold")
    txt(ax, 0.22, -0.25, "L", 11, fontweight="bold")
    txt(ax, 0.17, 1.82, "A", 11, fontweight="bold")
    txt(ax, 0.17, -1.85, "B", 11, fontweight="bold")
    arrow(ax, (0.05, 1.05), (0.4, 1.22), lw=1.3, ms=10)
    txt(ax, 0.47, 1.28, "15 cm", 11, ha="left", fontweight="bold")
    dim(ax, (-2.25, -0.8), (0, -0.8), "20 cm", off=(-0.2, -0.27), size=11)
    save(fig, "23.5 Q12")


def q23_5_19():
    fig, ax = fig_ax(3.2, 1.6)
    lens(ax, 0, 0.85, 0.2, 0.2)
    lens(ax, 2.2, 0.85, 0.2, 0.2)
    line(ax, [(-0.6, 0), (3.0, 0)])
    save(fig, "23.5 Q19")


def q23_5_21():
    fig, ax = fig_ax(2.0, 2.8)
    lens(ax, 0, 1.3, 0.33, 0.33)
    line(ax, [(0, 1.6), (0, -1.6)])
    line(ax, [(-0.85, 0), (0.85, 0)])
    txt(ax, 0.2, 1.62, "P", 13)
    txt(ax, 0.2, -1.65, "Q", 13)
    txt(ax, -0.8, -0.27, "R", 13)
    txt(ax, 0.8, -0.27, "S", 13)
    save(fig, "23.5 Q21")


def top_half(ax, xc, h, w, base=0.0):
    y = np.linspace(0, h, 40)
    s = sag(y, w, h)
    pts = [(xc - v, base + yy) for yy, v in zip(y, s)] + [(xc + v, base + yy) for yy, v in zip(y[::-1], s[::-1])]
    ax.add_patch(Polygon(pts, closed=True, fill=False, ec=INK, lw=LW))


def q23_5_27():
    fig, axs = plt.subplots(2, 2, figsize=(4.6, 3.4), dpi=160)
    for a, lab in zip(axs.flat, "ABCD"):
        a.set_aspect("equal")
        a.axis("off")
        a.set_xlim(-1.4, 1.0)
        a.set_ylim(-0.72, 0.72)
        a.text(-1.35, 0.4, lab + ")", fontsize=13, color=INK, ha="left", va="center")
    A, B, C, D = axs.flat
    half_lens(A, 0.1, 0.6, 0.38, -1)                  # A: cut along the vertical: plano-convex
    top_half(B, 0.0, 1.1, 0.35, base=-0.55)           # B: cut along the principal axis
    top_half(C, -0.37, 1.1, 0.35, base=-0.55)         # C: two such halves side by side
    top_half(C, 0.37, 1.1, 0.35, base=-0.55)
    half_lens(D, -0.33, 0.6, 0.33, +1)                # D: |)(|
    half_lens(D, 0.33, 0.6, 0.33, -1)
    fig.tight_layout()
    save(fig, "23.5 Q27")


def q23_5_31():
    fig, ax = fig_ax(4.6, 2.2)
    lens(ax, 0, 1.25, 0.3, 0.3)
    line(ax, [(-3.4, 0), (3.6, 0)])
    for x in (-2.7, 2.7):
        txt(ax, x, 1.35, "Water", 12, fontweight="bold")
        txt(ax, x, 0.65, r"$\left(\mu=\frac{4}{3}\right)$", 13)
    arrow(ax, (0.05, -0.32), (0.65, -0.25), lw=1.4, ms=11)
    txt(ax, 1.05, -0.72, r"$\mu$ = 1.5", 12, fontweight="bold")
    save(fig, "23.5 Q31")


def graph_axes(ax, ulabel_left=False):
    arrow(ax, (-1.0, 0), (1.0, 0), style="<|-|>", lw=1.4, ms=10)
    arrow(ax, (0, -0.85), (0, 0.85), style="<|-|>", lw=1.4, ms=10)
    txt(ax, 0.15, 0.85, "v", 12)
    if ulabel_left:
        txt(ax, -1.12, 0.05, "u", 12)
    else:
        txt(ax, 1.12, 0.05, "u", 12)


def q23_5_33():
    fig, axs = plt.subplots(2, 2, figsize=(5.6, 4.0), dpi=160)
    k, c = 0.203, 0.081
    x = np.linspace(0.26, 0.92, 50)
    y = c - k / x
    for a, n in zip(axs.flat, "1234"):
        a.set_aspect("equal")
        a.axis("off")
        a.set_xlim(-1.6, 1.25)
        a.set_ylim(-0.95, 0.95)
        a.text(-1.55, 0.0, n + ")", fontsize=13, color=INK, va="center")
    graph_axes(axs[0, 0])
    axs[0, 0].plot(x, y, color=INK, lw=LW)
    graph_axes(axs[0, 1], ulabel_left=True)
    axs[0, 1].plot(-x, -y, color=INK, lw=LW)
    graph_axes(axs[1, 0])
    axs[1, 0].plot([-0.6, -0.11], [0.11, 0.56], color=INK, lw=LW)
    graph_axes(axs[1, 1])
    axs[1, 1].plot([0.22, 0.76], [-0.66, -0.13], color=INK, lw=LW)
    fig.tight_layout()
    save(fig, "23.5 Q33")


def q23_5_39():
    fig, ax = fig_ax(4.0, 2.2)
    line(ax, [(0.35, 0), (3.65, 0)])
    dot(ax, 0.85, 0)
    lens(ax, 1.85, 0.78, 0.22, 0.22)
    line(ax, [(3.65, 0.9), (3.65, -0.8)])
    hatch(ax, [(3.65, 0.9), (3.65, -0.8)], (1, 0), n=13, L=0.13)
    txt(ax, 0.85, -0.3, "O", 13)
    txt(ax, 1.95, -1.0, "L", 13)
    txt(ax, 3.62, -1.05, "M", 13)
    arrow(ax, (2.3, -0.45), (1.99, -0.45), lw=1.2, ms=10)
    arrow(ax, (3.2, -0.45), (3.63, -0.45), lw=1.2, ms=10)
    txt(ax, 2.75, -0.36, "20 cm", 12)
    save(fig, "23.5 Q39")


def q23_5_41():
    fig, ax = fig_ax(4.6, 2.4)
    line(ax, [(0.42, 0), (3.95, 0)])
    dot(ax, 0.42, 0, 0.07)
    lens(ax, 1.45, 0.8, 0.22, 0.22)
    # L2: plano-concave, plane face on the left
    y = np.linspace(0.72, -0.72, 50)
    right = [(2.37 - v, yy) for yy, v in zip(y, sag(y, 0.08, 0.72))]
    ax.add_patch(Polygon([(2.15, 0.72)] + right + [(2.15, -0.72)], closed=True, fill=False, ec=INK, lw=LW))
    lens(ax, 3.25, 0.8, 0.2, 0.2)
    txt(ax, 0.45, 0.32, "O", 13)
    txt(ax, 1.4, 1.05, "f = 10 cm", 12)
    txt(ax, 2.3, 1.0, r"$L_2$", 13)
    txt(ax, 3.3, 1.05, "f = 30 cm", 12)
    txt(ax, 3.62, 0.72, r"$L_3$", 13)
    arrow(ax, (0.78, -0.4), (0.44, -0.4), lw=1.3, ms=10)
    arrow(ax, (1.08, -0.4), (1.42, -0.4), lw=1.3, ms=10)
    txt(ax, 0.92, -0.68, "30 cm", 12)
    arrow(ax, (1.7, -1.02), (1.48, -1.02), lw=1.2, ms=9)
    arrow(ax, (1.9, -1.02), (2.13, -1.02), lw=1.2, ms=9)
    txt(ax, 1.8, -1.02, "x", 12)
    save(fig, "23.5 Q41")


def q23_5_43():
    fig, ax = fig_ax(1.8, 2.8)
    h, w = 1.3, 0.42
    lens(ax, 0, h, w, w)
    for yy in (0.62, -0.62):
        xx = sag(np.array([yy]), w, h)[0]
        line(ax, [(-xx, yy), (xx, yy)])
    txt(ax, 0.55, 0.72, "A", 13)
    txt(ax, 0, 0, "B", 13)
    txt(ax, 0.55, -0.9, "C", 13)
    save(fig, "23.5 Q43")


def q23_5_45():
    fig, ax = fig_ax(3.2, 3.2)
    h, b = 1.9, 0.58
    y = np.linspace(h, -h, 80)
    xl = 0.27 - sag(y, b, h)
    xr = 0.92 - sag(y, b, h)
    pts = list(zip(xl, y)) + list(zip(xr[::-1], y[::-1]))
    ax.add_patch(Polygon(pts, closed=True, fill=False, ec=INK, lw=LW))
    line(ax, [(-1.5, 0), (2.5, 0)])
    for yy in (1.15, -1.15):
        x_hit = 0.27 - sag(np.array([yy]), b, h)[0]
        ray(ax, (-1.5, yy), (x_hit, yy), at=0.55)
    txt(ax, -0.65, 0.2, r"$\mu_1$", 13)
    txt(ax, 0.0, 0.2, r"$\mu_2$", 13)
    txt(ax, 0.75, 0.2, r"$\mu_3$", 13)
    txt(ax, 0.98, 1.72, r"$\mu_1<\mu_2<\mu_3$", 13, ha="left")
    txt(ax, -0.08, -1.72, "R", 13, style="italic")
    txt(ax, 1.08, -1.95, "R", 13, style="italic")
    save(fig, "23.5 Q45")


def q23_5_47():
    fig, ax = fig_ax(4.2, 2.0)
    f1, f2, h1 = 1.45, 1.1, 0.47
    x2 = f1 + f2
    h2 = -h1 * f2 / f1
    lens(ax, 0, 0.8, 0.12, 0.12)
    lens(ax, x2, 0.8, 0.12, 0.12)
    line(ax, [(-1.3, 0), (4.0, 0)], ls=(0, (3, 2.5)), lw=1.2)
    ray(ax, (-1.3, h1), (0, h1), at=0.5)
    ray(ax, (0, h1), (x2, h2), at=0.3)
    ray(ax, (x2, h2), (4.0, h2), at=0.65)
    txt(ax, 0, -1.05, r"$L_1$", 13)
    txt(ax, x2, -1.05, r"$L_2$", 13)
    save(fig, "23.5 Q47")


def q23_5_48():
    fig, ax = fig_ax(3.6, 2.4)
    w = 0.28
    lens(ax, 0, 1.4, w, w)
    lens(ax, 2 * w, 1.4, w, w)
    line(ax, [(-1.6, 0), (2.9, 0)])
    dot(ax, 2.5, 0, 0.06)
    txt(ax, 2.5, -0.32, "P", 11, style="italic")
    txt(ax, 0, 1.62, "A", 11, style="italic")
    txt(ax, 2 * w, 1.62, "B", 11, style="italic")
    save(fig, "23.5 Q48")


def q23_5_52():
    fig, ax = fig_ax(5.2, 2.9)
    xc, xd = 2.65, 3.7
    lens(ax, xc, 1.17, 0.28, 0.28)
    lens(ax, xd, 1.22, -0.15, -0.15, e=0.38)
    Rm = (1.35 ** 2 + 0.65 ** 2) / (2 * 0.65)
    cx = 5.25 - Rm
    ym = np.linspace(1.35, -1.35, 80)
    mir = list(zip(cx + np.sqrt(Rm ** 2 - ym ** 2), ym))
    line(ax, mir)
    hatch(ax, mir, (1, 0), n=11, L=0.16)
    line(ax, [(0.95, 0), (6.4, 0)], ls=(0, (3, 2.5)), lw=1.2)
    yi, yo = 0.85, 0.70
    xm = cx + np.sqrt(Rm ** 2 - yo ** 2)
    ray(ax, (1.4, yi), (xc, yi), at=0.5)
    ray(ax, (xc, yi), (xd, yo), at=0.5)
    ray(ax, (xd, yo), (xm, yo), at=0.6)
    ray(ax, (xm, yo), (xd, 0.45), at=0.5)
    ray(ax, (xd, 0.45), (xc, 0.25), at=0.5)
    ray(ax, (xc, 0.25), (1.5, 0.0), at=0.5)
    ray(ax, (1.5, 0.0), (1.22, -0.42), at=0.95)
    dot(ax, 1.5, 0, 0.06)
    txt(ax, 0.05, -0.85, "focus of\nconvex lens", 12, ha="left", linespacing=1.3)
    xb = cx + np.sqrt(Rm ** 2 - 1.35 ** 2)
    dim(ax, (xc - 0.1, -1.6), (xd, -1.6), r"$d_1$", off=(0, -0.3), size=14)
    dim(ax, (xd, -1.6), (xb, -1.6), r"$d_2$", off=(0, -0.3), size=14)
    save(fig, "23.5 Q52")


def q23_5_53():
    fig, ax = fig_ax(3.6, 2.4)
    wl, hl = 1.4, 0.48
    xs = np.linspace(-wl, wl, 80)
    top = [(x, sag(np.array([x]), hl, wl)[0]) for x in xs]
    bot = [(x, -sag(np.array([x]), hl, wl)[0]) for x in xs[::-1]]
    ax.add_patch(Polygon(top + bot, closed=True, fill=False, ec=INK, lw=LW))
    line(ax, [(-1.9, -hl), (1.9, -hl)])
    hatch(ax, [(1.9, -hl), (-1.9, -hl)], (0, -1), n=16, L=0.15, ang=35)
    dot(ax, -0.2, 1.3, 0.05)
    txt(ax, 0.1, 1.28, "O & I", 12, ha="left")
    brace(ax, (-0.55, 0.0), (-0.55, 1.3), 0.12)
    txt(ax, -0.7, 0.7, "40 cm", 12, ha="right")
    p = (0.85, sag(np.array([0.85]), hl, wl)[0])
    arrow(ax, p, (1.15, 0.7), lw=1.3, ms=10)
    txt(ax, 1.22, 0.72, "R = 20 cm", 12, ha="left")
    save(fig, "23.5 Q53")


def q23_5_58():
    fig, axs = plt.subplots(1, 2, figsize=(6.0, 2.6), dpi=160)
    for a in axs:
        a.set_aspect("equal")
        a.axis("off")
        a.set_xlim(-1.7, 1.3)
        a.set_ylim(-1.55, 1.35)
    a = axs[0]
    lens(a, 0, 0.95, 0.18, 0.18)
    for y, end in ((0.35, (0.95, 0.85)), (-0.35, (0.95, -0.85))):
        ray(a, (-1.6, y), (0, y), at=0.4)
        line(a, [(0, y), end])
        arrow(a, (end[0] - 0.05 * (end[0]), end[1] - 0.05 * (end[1] - y) / 0.95 * 0.95), end, lw=LW, ms=11)
    a.text(-1.3, 0.55, r"$\mu_1$", fontsize=12, color=INK)
    a.text(0.62, 1.0, r"$\mu_1$", fontsize=12, color=INK)
    arrow(a, (-0.55, -1.2), (-0.06, -0.55), lw=1.4, ms=11)
    a.text(-0.65, -1.5, r"$\mu$", fontsize=12, color=INK, ha="center")
    b = axs[1]
    lens(b, 0, 0.85, 0.2, 0.2, ls=(0, (1.5, 1.5)))
    for y in (0.82, 0.0, -0.82):
        line(b, [(-1.1, y), (1.15, y)])
        head(b, (-1.1, y), (1.15, y), at=0.15)
        head(b, (-1.1, y), (1.15, y), at=0.85)
    b.text(-1.1, 0.98, r"$\mu_2$", fontsize=12, color=INK)
    b.text(0.55, 0.98, r"$\mu_2$", fontsize=12, color=INK)
    line(b, [(0.02, 0.6), (0.22, 1.15)], lw=1.3)
    b.text(0.24, 1.2, r"$\mu$", fontsize=12, color=INK)
    fig.tight_layout()
    save(fig, "23.5 Q58")


def q23_5_62():
    fig, ax = fig_ax(3.8, 2.4)
    lens(ax, 0, 0.75, 0.2, 0.2)
    xm = 1.6
    line(ax, [(xm, 0.85), (xm, -0.85)])
    hatch(ax, [(xm, 0.85), (xm, -0.85)], (1, 0), n=13, L=0.12)
    line(ax, [(-1.8, 0), (xm, 0)])
    for y0, y1 in ((0.92, 0.66), (-0.93, -0.62)):
        x1 = -0.05 if y1 > 0 else 0.0
        ray(ax, (-1.8, y0), (x1, y1), at=0.5)
        line(ax, [(x1, y1), (xm, 0)], ls=(0, (3, 2.5)), lw=1.3)
    txt(ax, 0.2, 1.0, "f = 36 cm", 12)
    dim(ax, (0.05, -0.95), (xm, -0.95), "12 cm", off=(0, -0.27), size=12)
    save(fig, "23.5 Q62")


# ----------------------------------------------------------------- 23.6 prisms
def poly(ax, pts, fc="none"):
    ax.add_patch(Polygon(pts, closed=True, fc=fc, ec=INK, lw=LW, zorder=2))


def q23_6_14():
    fig, ax = fig_ax(3.8, 2.6)
    poly(ax, [(0, 0), (0, 2.3), (2.3, 0)])
    right_mark(ax, (0, 0), (1, 0), (0, 1), 0.17)
    angle_arc(ax, (2.3, 0), 0.32, 135, 180)
    txt(ax, 1.83, 0.14, "45°", 10, fontweight="bold")
    for y, lab, ang in ((1.87, "B", "43°"), (1.25, "G", "44°"), (0.63, "R", "46°")):
        arrow(ax, (-1.35, y), (-0.04, y), lw=LW, ms=12)
        txt(ax, -1.55, y - 0.03, lab, 11, fontweight="bold")
        txt(ax, -0.72, y + 0.2, ang, 10, fontweight="bold")
    save(fig, "23.6 Q14")


def q23_6_15():
    fig, ax = fig_ax(2.6, 2.0)
    poly(ax, [(0, 1.6), (0, 0), (0.95, 0)], fc=GREY)
    poly(ax, [(-0.95, 0), (0.95, 0), (0, 1.6)])
    ray(ax, (-1.45, 0.25), (-0.42, 0.9), at=0.3)
    save(fig, "23.6 Q15")


def q23_6_16():
    fig, ax = fig_ax(4.0, 2.6)
    poly(ax, [(0, 0), (0, 2.5), (2.65, 0)])
    ax.add_patch(Arc((0, 2.5), 0.6, 0.6, theta1=270, theta2=360 + np.degrees(np.arctan2(-2.5, 2.65)), color=INK, lw=1.1))
    txt(ax, 0.17, 1.95, "4°", 10, fontweight="bold")
    yr = 1.22
    ray(ax, (-1.55, yr), (0, yr), at=0.8)
    right_mark(ax, (0, yr), (-1, 0), (0, 1), 0.17)
    txt(ax, -0.4, 1.53, "90°", 10, fontweight="bold")
    line(ax, [(3.65, 2.55), (3.65, 0)], lw=5)
    save(fig, "23.6 Q16")


def q23_6_18():
    fig, ax = fig_ax(3.8, 2.6)
    A, B = np.array([0.0, 0.0]), np.array([3.4, 0.0])
    C = B + 1.7 * np.array([-np.cos(np.radians(60)), -np.sin(np.radians(60))])
    poly(ax, [tuple(A), tuple(B), tuple(C)])
    right_mark(ax, C, A - C, B - C, 0.17)
    angle_arc(ax, tuple(B), 0.38, 180, 240)
    txt(ax, B[0] - 0.62, -0.14, "60°", 11)
    u_ac = (C - A) / np.linalg.norm(C - A)
    n_in = np.array([-u_ac[1], u_ac[0]])
    if np.dot(n_in, B - A) < 0:
        n_in = -n_in
    P = A + 0.42 * (C - A)
    ray(ax, tuple(P - 1.25 * n_in), tuple(P), at=0.3)
    right_mark(ax, P, -u_ac, -n_in, 0.17)
    txt(ax, -0.2, 0.12, "A", 13, fontweight="bold", style="italic")
    txt(ax, B[0] + 0.18, 0.05, "B", 13, fontweight="bold", style="italic")
    txt(ax, C[0] + 0.02, C[1] - 0.27, "C", 13, fontweight="bold", style="italic")
    txt(ax, 2.05, -0.42, r"prism ($\mu$)", 12)
    txt(ax, 1.7, 0.55, r"Medium $\left(\mu=\frac{\sqrt{3}}{2}\right)$", 11)
    save(fig, "23.6 Q18")


def q23_6_19():
    fig, ax = fig_ax(3.4, 2.6)
    W, H = 2.0, 2.34
    poly(ax, [(0, 0), (0, H), (W, 0)])
    ang = np.degrees(np.arctan2(-H, W))
    ax.add_patch(Arc((0, H), 0.8, 0.8, theta1=270, theta2=360 + ang, color=INK, lw=1.1))
    txt(ax, 0.27, 1.62, "4°", 13)
    y = 1.1
    xh = W * (1 - y / H)
    ray(ax, (-1.15, y), (xh, y), at=0.3)
    ray(ax, (xh, y), (xh + 1.7, y - 0.36), at=0.55)
    right_mark(ax, (0, y), (-1, 0), (0, -1), 0.15)
    save(fig, "23.6 Q19")


def q23_6_21():
    fig, ax = fig_ax(3.8, 1.9)
    s = np.sqrt(3)
    poly(ax, [(0, 0), (2, 0), (1, s)])
    poly(ax, [(1, s), (3, s), (2, 0)])
    poly(ax, [(2, 0), (4, 0), (3, s)])
    txt(ax, 1.0, 0.45, "P", 13, fontweight="bold")
    txt(ax, 2.0, 1.25, "Q", 13, fontweight="bold")
    txt(ax, 3.05, 0.5, "R", 13, fontweight="bold")
    ax.set_xlim(-0.1, 4.1)
    ax.set_ylim(-0.1, s + 0.1)
    save(fig, "23.6 Q21")


def q23_6_29():
    fig, ax = fig_ax(3.0, 3.2)
    H = 3.0
    W = H * np.tan(np.radians(30))
    poly(ax, [(0, 0), (0, H), (W, 0)])
    hatch(ax, [(0, H), (W, 0)], (1, 1), n=14, L=0.18)
    angle_arc(ax, (0, H), 0.35, 270, 300)
    txt(ax, 0.75, H + 0.12, "A = 30°", 12)
    yn = 1.6
    line(ax, [(-1.0, yn), (0.95, yn)], ls=(0, (3, 2.5)), lw=1.2)
    d = np.array([np.cos(np.radians(60)), np.sin(np.radians(60))])
    start = np.array([0, yn]) - 1.35 * d
    ray(ax, tuple(start), (0, yn), at=0.55)
    angle_arc(ax, (0, yn), 0.3, 180, 240)
    txt(ax, -0.62, 1.27, "60°", 11)
    save(fig, "23.6 Q29")


def q23_6_30():
    fig, ax = fig_ax(3.2, 3.0)
    S = 3.0
    poly(ax, [(0, 0), (0, S), (S, S)])
    y = 1.3
    ray(ax, (-1.0, y), (y, y), at=0.32)
    line(ax, [(y, y), (y, S + 0.75)])
    arrow(ax, (y, S + 0.4), (y, S + 0.78), ms=12)
    txt(ax, y + 0.25, S + 0.7, "T", 13, fontweight="bold")
    txt(ax, -0.72, y + 0.25, "I", 13, fontweight="bold")
    line(ax, [(y - 0.5, y + 0.5), (y + 0.65, y - 0.65)], ls=(0, (1, 1.6)), lw=1.4)
    ax.add_patch(FancyArrowPatch((y - 0.38, y), (y - 0.27, y + 0.27), connectionstyle="arc3,rad=-0.4",
                                 arrowstyle="-|>", mutation_scale=8, color=INK, lw=1.0))
    txt(ax, y - 0.62, y + 0.22, r"$\theta$", 13)
    save(fig, "23.6 Q30")


def q23_6_32():
    fig, ax = fig_ax(3.0, 2.8)
    arrow(ax, (0, 0), (0, 2.45), ms=13)
    arrow(ax, (0, 0), (2.25, 0), ms=13)
    pts = [(0.04, 2.13), (0.20, 1.56), (0.47, 1.23), (0.92, 0.85), (1.40, 1.23), (1.65, 1.56), (1.84, 2.0)]
    cv = catmull(pts)
    ax.plot(cv[:, 0], cv[:, 1], color=INK, lw=LW)
    dl = (0, (3, 2.5))
    d, d1 = 1.56, 1.23
    line(ax, [(0, d), (1.65, d)], ls=dl, lw=1.2)
    line(ax, [(0, d1), (1.40, d1)], ls=dl, lw=1.2)
    for x, y in ((0.20, d), (0.47, d1), (1.40, d1), (1.65, d)):
        line(ax, [(x, y), (x, 0)], ls=dl, lw=1.2)
    txt(ax, -0.2, d, r"$\delta$", 14)
    txt(ax, -0.22, d1, r"$\delta_1$", 14)
    txt(ax, 0.22, -0.2, "37°", 12)
    txt(ax, 1.33, -0.2, "50", 12)
    txt(ax, 1.74, -0.2, "53", 12)
    save(fig, "23.6 Q32")


def q23_6_33():
    fig, ax = fig_ax(3.0, 3.6)
    apex, bl, br = np.array([0, 2.1]), np.array([-1.04, 0]), np.array([1.04, 0])
    poly(ax, [tuple(apex), tuple(bl), tuple(br)])
    u1 = (apex - bl) / np.linalg.norm(apex - bl)
    n1 = np.array([u1[1], -u1[0]])            # inward normal of face 1
    E = bl + 0.64 * (apex - bl)
    u2 = (br - apex) / np.linalg.norm(br - apex)
    # E + t n1 = apex + s u2
    t, s = np.linalg.solve(np.column_stack([n1, -u2]), apex - E)
    Hp = E + t * n1
    ray(ax, tuple(E - 1.15 * n1), tuple(E), at=None)
    line(ax, [tuple(E), tuple(Hp)])
    right_mark(ax, E, -u1 * -1, -n1, 0.14)
    line(ax, [tuple(Hp), (Hp[0], -0.95)])
    arrow(ax, (Hp[0], -0.7), (Hp[0], -0.98), ms=13)
    n2 = np.array([u2[1], -u2[0]])
    line(ax, [tuple(Hp - 0.75 * n2), tuple(Hp + 0.75 * n2)], ls=(0, (3, 2.5)), lw=1.2)
    ang1 = np.degrees(np.arctan2(*(bl - apex)[::-1]))
    ang2 = np.degrees(np.arctan2(*(br - apex)[::-1]))
    angle_arc(ax, tuple(apex), 0.28, ang1, ang2)
    txt(ax, 0, 1.6, r"$\theta$", 13)
    txt(ax, 0.55, 1.6, "(2)", 12)
    txt(ax, -1.12, 0.75, "(1)", 12)
    txt(ax, -0.2, -0.27, "(3)", 12)
    save(fig, "23.6 Q33")


def q23_6_35():
    fig, ax = fig_ax(3.0, 3.2)
    A, B, C = np.array([0, 2.83]), np.array([-1.19, 0]), np.array([1.28, 0])
    poly(ax, [tuple(A), tuple(B), tuple(C)])
    y = 1.47
    xin = B[0] * (1 - y / A[1])
    xout = C[0] * (1 - y / A[1])
    ray(ax, (-1.47, 0.9), (xin, y), at=0.45)
    ray(ax, (xin, y), (xout, y), at=0.55)
    yg = 0.95
    xg = C[0] * (1 - yg / A[1])
    line(ax, [(xout, y), (xg, yg)], lw=2.6)
    arrow(ax, (xout + 0.75 * (xg - xout), y + 0.75 * (yg - y)), (xg, yg), lw=2.0, ms=13)
    line(ax, [(0.85, 1.87), (0.27, 1.87), (0.27, 1.72)], lw=1.4)
    arrow(ax, (0.27, 1.75), (0.27, 1.53), lw=1.4, ms=11)
    arrow(ax, (1.15, 1.72), (0.93, 1.2), lw=1.4, ms=11)
    txt(ax, 0.9, 1.88, "Green", 11, ha="left", fontweight="bold")
    txt(ax, -1.62, 1.45, "White\nlight", 11, ha="left", fontweight="bold", linespacing=1.0)
    txt(ax, 0, 3.02, "A", 12, fontweight="bold")
    txt(ax, -1.3, -0.17, "B", 12, fontweight="bold")
    txt(ax, 1.4, -0.17, "C", 12, fontweight="bold")
    save(fig, "23.6 Q35")


def q23_6_36():
    fig, ax = fig_ax(2.8, 2.6)
    arrow(ax, (0, 0), (0, 2.1), ms=13)
    arrow(ax, (0, 0), (2.25, 0), ms=13)
    line(ax, [(0.73, 0), (1.63, 1.62)])
    txt(ax, -0.4, 1.7, r"$\delta$", 14, fontweight="bold")
    arrow(ax, (-0.2, 1.55), (-0.2, 1.88), lw=1.6, ms=10)
    txt(ax, -0.1, -0.25, "O", 12, fontweight="bold")
    txt(ax, 0.73, -0.25, "P", 12, fontweight="bold")
    txt(ax, 1.75, 1.78, "Q", 12, fontweight="bold")
    txt(ax, 1.75, -0.28, r"$\mu$", 14)
    arrow(ax, (1.9, -0.28), (2.2, -0.28), lw=1.6, ms=10)
    save(fig, "23.6 Q36")


ALL = [q23_4_4, q23_4_5, q23_4_8, q23_4_9, q23_4_10, q23_4_14, q23_4_15, q23_4_17,
       q23_5_4, q23_5_9, q23_5_11, q23_5_12, q23_5_19, q23_5_21, q23_5_27, q23_5_31, q23_5_33,
       q23_5_39, q23_5_41, q23_5_43, q23_5_45, q23_5_47, q23_5_48, q23_5_52, q23_5_53, q23_5_58,
       q23_5_62,
       q23_6_14, q23_6_15, q23_6_16, q23_6_18, q23_6_19, q23_6_21, q23_6_29, q23_6_30, q23_6_32,
       q23_6_33, q23_6_35, q23_6_36]

if __name__ == "__main__":
    for f in ALL:
        f()
    print("wrote", len(ALL), "figures to", HERE)
