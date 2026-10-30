"""Redraw the 14 figures of GPCC NKL Physics Vol II Ch. 24 (Wave Optics).

    python -P figures.py

Writes <ref with spaces as _>.png beside this file.
"""
import os

import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, Circle, Ellipse

HERE = os.path.dirname(os.path.abspath(__file__))
INK = "#1f2937"
LW = 1.6
FS = 11


# ---------- shared helpers ----------
def canvas(w, h):
    fig, ax = plt.subplots(figsize=(w, h), dpi=160)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def save(fig, name):
    fig.savefig(os.path.join(HERE, name + ".png"), facecolor="white", bbox_inches="tight", pad_inches=0.12)
    plt.close(fig)


def line(ax, xs, ys, ls="-", lw=LW, z=2):
    ax.plot(xs, ys, color=INK, lw=lw, ls=ls, zorder=z, solid_capstyle="round")


def arrow(ax, p, q, both=False, lw=1.3, ms=12):
    ax.annotate("", xy=q, xytext=p, arrowprops=dict(arrowstyle="<|-|>" if both else "-|>", color=INK,
                                                   lw=lw, mutation_scale=ms, shrinkA=0, shrinkB=0))


def ray(ax, p, q, frac=0.55, lw=LW):
    """Segment p->q with an arrowhead part-way along it."""
    line(ax, [p[0], q[0]], [p[1], q[1]], lw=lw)
    m = (p[0] + frac * (q[0] - p[0]), p[1] + frac * (q[1] - p[1]))
    arrow(ax, p, m, lw=lw)


def dot(ax, p, r=0.05, open_=False):
    ax.add_patch(Circle(p, r, fc="white" if open_ else INK, ec=INK, lw=1.3, zorder=5))


def txt(ax, x, y, s, fs=FS, **kw):
    kw.setdefault("ha", "center")
    kw.setdefault("va", "center")
    ax.text(x, y, s, color=INK, fontsize=fs, **kw)


def brace(ax, x, y0, y1, w=0.12, side=1):
    """Vertical curly brace at x from y0 to y1, tip pointing to side (+1 right, -1 left)."""
    L = abs(y1 - y0)
    beta = 60.0 / L
    t = np.linspace(0, L / 2, 150)
    half = 1 / (1 + np.exp(-beta * t)) + 1 / (1 + np.exp(-beta * (t - L / 2)))
    off = np.concatenate((half, half[-2::-1])) - 0.5
    ys = np.linspace(min(y0, y1), max(y0, y1), off.size)
    ax.plot(x + side * w * off, ys, color=INK, lw=1.2)


def otimes(ax, p, r=0.09):
    ax.add_patch(Circle(p, r, fc="white", ec=INK, lw=1.3, zorder=5))
    d = r * 0.7
    ax.plot([p[0] - d, p[0] + d], [p[1] - d, p[1] + d], color=INK, lw=1.0, zorder=6)
    ax.plot([p[0] - d, p[0] + d], [p[1] + d, p[1] - d], color=INK, lw=1.0, zorder=6)


def graph_axes(ax, x1=1.0, y1=1.0, xl="", yl="", heads=True, xl_pos="end", yl_pos="top", fs=13):
    if heads:
        arrow(ax, (0, 0), (x1, 0), lw=1.4, ms=14)
        arrow(ax, (0, 0), (0, y1), lw=1.4, ms=14)
    else:
        line(ax, [0, x1], [0, 0], lw=1.4)
        line(ax, [0, 0], [0, y1], lw=1.4)
    if xl_pos == "end":
        txt(ax, x1 + 0.04, 0, xl, fs=fs, ha="left")
    else:
        txt(ax, x1 * 0.7, -0.14, xl, fs=fs, va="top")
    if yl_pos == "top":
        txt(ax, -0.03, y1, yl, fs=fs, ha="right", va="center")
    else:
        txt(ax, -0.1, y1 * 0.5, yl, fs=fs, rotation=90, ha="right")


def panels(n_rows, n_cols, w, h):
    fig, axes = plt.subplots(n_rows, n_cols, figsize=(w, h), dpi=160)
    axes = np.atleast_1d(axes).ravel()
    for a in axes:
        a.set_aspect("equal")
        a.axis("off")
    return fig, axes


def panel_label(ax, k, x=-0.35, y=0.45, fs=13):
    txt(ax, x, y, f"{k})", fs=fs, fontweight="bold")


# ---------- figures ----------
def q22():
    fig, ax = canvas(3.0, 2.2)
    P, Q, M, B = (0, 0), (2.2, 0), (1.1, 0), (1.1, 1.2)
    line(ax, [P[0], Q[0]], [0, 0])
    line(ax, [M[0], B[0]], [M[1], B[1]])
    for p in (P, Q, B):
        dot(ax, p)
    txt(ax, 0, -0.25, "P", fs=12)
    txt(ax, 2.2, -0.25, "Q", fs=12)
    txt(ax, 1.25, 1.22, "B", fs=12, ha="left")
    ax.set_xlim(-0.3, 2.5)
    ax.set_ylim(-0.5, 1.45)
    save(fig, "24.1_Q22")


def q24():
    fig, ax = canvas(3.6, 2.6)
    S1, S2, O, P = (0, 0), (1.25, 0), (2.6, 0), (2.6, 1.6)
    line(ax, [0, 2.6], [0, 0])
    line(ax, [2.6, 2.6], [-0.35, 1.75])
    otimes(ax, S1)
    otimes(ax, S2)
    otimes(ax, P)
    txt(ax, -0.15, -0.08, r"S$_1$", fs=12, ha="right")
    txt(ax, 1.33, -0.12, r"S$_2$", fs=12, ha="left")
    txt(ax, 0.62, -0.13, r"d = 4$\lambda$", fs=11)
    txt(ax, 2.68, -0.05, "O", fs=12, ha="left")
    txt(ax, 2.7, 1.7, "P", fs=12, ha="left")
    brace(ax, 2.72, 0.05, 1.5, w=0.1, side=1)
    txt(ax, 2.95, 0.78, "y", fs=12, ha="left")
    arrow(ax, (0, -0.42), (2.6, -0.42), both=True)
    txt(ax, 1.3, -0.62, "D", fs=12)
    ax.set_xlim(-0.5, 3.2)
    ax.set_ylim(-0.8, 1.9)
    save(fig, "24.1_Q24")


def q26():
    fig, ax = canvas(4.2, 3.0)
    S, S1, S2, P, O = (0, 0), (3.35, 1.38), (3.35, -1.45), (7.6, 2.25), (7.6, 0)
    bx = 3.35
    # barrier with slits at S1 and S2
    line(ax, [bx, bx], [3.3, 1.5])
    line(ax, [bx, bx], [1.28, -1.33])
    line(ax, [bx, bx], [-1.45, -2.9])
    # screen
    line(ax, [7.75, 7.75], [2.55, -2.55])
    # paths
    line(ax, [S[0], S1[0], P[0]], [S[1], S1[1], P[1]], lw=1.4)
    line(ax, [S[0], S2[0], P[0]], [S[1], S2[1], P[1]], lw=1.4)
    line(ax, [0, bx], [0, 0], lw=1.4)
    line(ax, [bx, 7.75], [0, 0], ls=(0, (3, 3)), lw=1.3)
    arrow(ax, (3.75, 0.85), (3.75, -0.8), both=True)
    arrow(ax, (8.05, 2.1), (8.05, 0.1), both=True)
    txt(ax, -0.12, 0, "S", fs=12, ha="right")
    txt(ax, 3.1, 1.6, r"S$_1$", fs=12, ha="right")
    txt(ax, 3.15, -1.75, r"S$_2$", fs=12, ha="right")
    txt(ax, 3.95, 0.25, "d", fs=12, ha="left")
    txt(ax, 7.65, 2.5, "P", fs=12, ha="right")
    txt(ax, 7.6, -0.3, "O", fs=12, ha="right")
    txt(ax, 7.6, 1.05, "x", fs=12, ha="right")
    ax.set_xlim(-0.6, 8.5)
    ax.set_ylim(-3.0, 3.4)
    save(fig, "24.1_Q26")


def q28():
    fig, ax = canvas(2.6, 2.8)
    R = 1.0
    ax.add_patch(Circle((0, 0), R, fc="none", ec=INK, lw=LW))
    dash = (0, (3, 3))
    line(ax, [0, 0], [-1.15, 1.15], ls=dash, lw=1.1)
    line(ax, [-1.15, -0.4], [0, 0], ls=dash, lw=1.1)
    line(ax, [0.4, 1.15], [0, 0], ls=dash, lw=1.1)
    line(ax, [-0.4, 0.4], [0, 0], lw=1.8)
    dot(ax, (0, 0), r=0.06)
    arrow(ax, (-0.42, -0.22), (0.42, -0.22), both=True)
    txt(ax, 0, -0.42, r"d = 2$\lambda$", fs=11)
    txt(ax, 0, 1.3, "B", fs=12)
    txt(ax, 0, -1.3, "D", fs=12)
    txt(ax, -1.25, 0, "C", fs=12, ha="right")
    txt(ax, 1.25, 0, "A", fs=12, ha="left")
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.5, 1.5)
    save(fig, "24.1_Q28")


def q36():
    fig = plt.figure(figsize=(4.0, 5.0), dpi=160)
    gs = fig.add_gridspec(3, 2, height_ratios=[1.05, 1.15, 1.15])
    top = fig.add_subplot(gs[0, :])
    top.set_aspect("equal")
    top.axis("off")
    # incident plane wavefront ABC and the beam to the lens
    line(top, [0, 0], [-1, 1])
    dot(top, (0, 1), r=0.045)
    dot(top, (0, -1), r=0.045)
    ray(top, (0, 1), (3.0, 1), frac=0.55)
    ray(top, (0, -1), (3.0, -1), frac=0.55)
    top.add_patch(Ellipse((3.15, 0), 0.32, 2.0, fc="white", ec=INK, lw=LW))
    txt(top, 0, 1.25, "A", fs=13)
    txt(top, -0.12, 0.1, "B", fs=12, ha="right")
    txt(top, 0, -1.3, "C", fs=13)
    arrow(top, (3.32, -0.95), (3.8, -0.95))
    txt(top, 3.88, -0.95, "Biconvex lens", fs=12, ha="left")
    top.set_xlim(-1.4, 6.6)
    top.set_ylim(-1.6, 1.5)

    def opt(ax, k):
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_xlim(-1.4, 1.4)
        ax.set_ylim(-1.35, 1.35)
        panel_label(ax, k, x=-1.1, y=0)

    def arc(phi_deg, side):
        """Circular arc of chord 2 (vertical); side +1 bulges right, -1 left."""
        phi = np.radians(phi_deg)
        R = 1 / np.sin(phi)
        t = np.linspace(-phi, phi, 100)
        return side * (R * np.cos(t) - R * np.cos(phi)), R * np.sin(t)

    # 1) bulging to the right: ")"  (bottom end printed as B', see report)
    a = fig.add_subplot(gs[1, 0]); opt(a, 1)
    xs, ys = arc(45, 1)
    xs = xs - 0.15
    line(a, xs, ys)
    dot(a, (xs[-1], ys[-1]), 0.045); dot(a, (xs[0], ys[0]), 0.045)
    txt(a, xs[-1] + 0.12, ys[-1] + 0.05, "A'", ha="left", fs=13)
    txt(a, xs.max() + 0.1, 0.1, "B'", ha="left", fs=13)
    txt(a, xs[0] + 0.12, ys[0] - 0.12, "B'", ha="left", fs=13)
    # 2) bulging to the left: "("
    a = fig.add_subplot(gs[1, 1]); opt(a, 2)
    xs, ys = arc(62, -1)
    xs = xs + 0.3
    line(a, xs, ys)
    dot(a, (xs[-1], ys[-1]), 0.045); dot(a, (xs[0], ys[0]), 0.045); dot(a, (xs.min(), 0), 0.04)
    txt(a, xs[-1] + 0.12, ys[-1] + 0.02, "A'", ha="left", fs=13)
    txt(a, xs.min() + 0.1, 0.0, "B'", ha="left", fs=13)
    txt(a, xs[0] + 0.12, ys[0] - 0.02, "C'", ha="left", fs=13)
    # 3) vertical plane wavefront
    a = fig.add_subplot(gs[2, 0]); opt(a, 3)
    line(a, [0, 0], [-1, 1])
    for y, s in ((1, "A'"), (0, "B'"), (-1, "C'")):
        dot(a, (0, y), 0.045)
        txt(a, 0.12, y, s, ha="left", fs=13)
    # 4) inclined plane wavefront
    a = fig.add_subplot(gs[2, 1]); opt(a, 4)
    line(a, [-0.35, 0.4], [-1, 1])
    for (x, y), s in (((0.4, 1), "A'"), ((0.02, 0), "B'"), ((-0.35, -1), "C'")):
        dot(a, (x, y), 0.045)
        txt(a, x + 0.12, y - 0.05, s, ha="left", fs=13)
    fig.tight_layout()
    save(fig, "24.1_Q36")


def q37():
    fig, ax = canvas(3.6, 3.4)
    A, C = np.array([0.0, 0.0]), np.array([1.35, 0.0])
    pA, pC = np.array([-0.7, 1.82]), np.array([0.55, 1.87])
    line(ax, [-0.75, 2.2], [0, 0], lw=1.8)
    line(ax, [pA[0], A[0]], [pA[1], A[1]])
    line(ax, [pC[0], C[0]], [pC[1], C[1]])
    # dashed incident wavefront from A up to the right-hand ray (as printed)
    W = pC + (C - pC) * (1.87 - 1.02) / 1.87
    line(ax, [A[0], W[0]], [A[1], W[1]], ls=(0, (3, 2.5)), lw=1.3)
    # normals and angles i
    line(ax, [0, 0], [0, 1.62], ls=(0, (2, 2.5)), lw=1.1)
    line(ax, [1.35, 1.35], [0, 1.27], ls=(0, (2, 2.5)), lw=1.1)
    for P0, Pt in ((A, pA), (C, pC)):
        ang = np.degrees(np.arctan2(Pt[1] - P0[1], Pt[0] - P0[0]))
        ax.add_patch(Arc(tuple(P0), 0.5, 0.5, theta1=90, theta2=ang, color=INK, lw=1.1))
        txt(ax, P0[0] - 0.05, 0.45, "i", fs=11, ha="right")
    dot(ax, A, 0.04)
    dot(ax, C, 0.04)
    # curved pointer up toward the label
    ax.annotate("", xy=(0.4, 1.32), xytext=(0.32, 0.37),
                arrowprops=dict(arrowstyle="-|>", color=INK, lw=1.3, mutation_scale=12,
                                connectionstyle="arc3,rad=-0.3", shrinkA=0, shrinkB=0))
    txt(ax, 0.12, 2.05, "Incident\nwave front", fs=9.5)
    txt(ax, -1.0, 0.85, "medium\n(1)", fs=11)
    txt(ax, -0.75, -0.6, "medium\n(2)", fs=11)
    txt(ax, 0, -0.17, "A", fs=11)
    txt(ax, 1.25, -0.17, "C", fs=11)
    ax.set_xlim(-1.5, 2.3)
    ax.set_ylim(-1.0, 2.35)
    save(fig, "24.1_Q37")


def q44():
    fig, ax = canvas(3.2, 2.7)
    P, S1, S2, Q = (0, 0), (1.03, 0.35), (1.03, -0.6), (1.95, -0.4)
    # slit plane: dashed with the two short slit jaws
    line(ax, [1.03, 1.03], [0.78, -1.08], ls=(0, (3, 3)), lw=1.1)
    line(ax, [1.03, 1.03], [0.45, 0.8], lw=1.6)
    line(ax, [1.03, 1.03], [-0.5, -0.3], lw=1.6)
    # screen with hatching on its right
    line(ax, [2.05, 2.05], [0.9, -1.0], lw=1.8)
    for y in np.arange(-0.98, 0.9, 0.07):
        line(ax, [2.05, 2.17], [y, y + 0.06], lw=0.9)
    line(ax, [P[0], S1[0], Q[0]], [P[1], S1[1], Q[1]])
    line(ax, [P[0], S2[0], Q[0]], [P[1], S2[1], Q[1]])
    dot(ax, P, 0.05)
    ax.add_patch(Circle(Q, 0.06, fc="white", ec=INK, lw=1.3, zorder=5))
    txt(ax, -0.12, 0, "P", fs=12, ha="right")
    txt(ax, 0.98, 0.58, r"S$_1$", fs=12, ha="right")
    txt(ax, 0.98, -0.72, r"S$_2$", fs=12, ha="right")
    txt(ax, 0.45, 0.35, r"$\ell_1$", fs=12)
    txt(ax, 0.45, -0.48, r"$\ell_2$", fs=12)
    txt(ax, 1.6, 0.15, r"$\ell_3$", fs=12)
    txt(ax, 1.5, -0.72, r"$\ell_4$", fs=12)
    txt(ax, 1.9, -0.6, "Q", fs=12, ha="right")
    ax.set_xlim(-0.35, 2.3)
    ax.set_ylim(-1.15, 1.0)
    save(fig, "24.1_Q44")


def q47():
    fig, ax = canvas(4.2, 3.2)
    A1, A2, P = (0, 0.82), (0, 0.05), (2.5, 0.82)
    line(ax, [0, 0], [1.55, -1.0])
    line(ax, [2.5, 2.5], [1.85, -1.0])
    for y in (0.9, 0.3, -0.28):
        arrow(ax, (-1.07, y), (-0.72, y))
    txt(ax, -1.3, 1.6, "Source P", fs=10, ha="left")
    txt(ax, -1.1, 1.12, "800 nm", fs=10, ha="left")
    dot(ax, A1, 0.03)
    dot(ax, A2, 0.03)
    dot(ax, P, 0.03)
    dots = (0, (1.5, 2.5))
    line(ax, [A1[0], P[0]], [A1[1], P[1]], ls=dots, lw=1.4)
    line(ax, [A2[0], P[0]], [A2[1], P[1]], ls=dots, lw=1.4)
    # foot of the perpendicular from A1 onto A2P
    d = np.array(P) - np.array(A2)
    d = d / np.linalg.norm(d)
    F = np.array(A2) + np.dot(np.array(A1) - np.array(A2), d) * d
    line(ax, [A1[0] + 0.03, F[0]], [A1[1] - 0.03, F[1]], ls=(0, (2.5, 2.5)), lw=1.0)
    txt(ax, -0.1, 0.82, r"A$_1$", fs=10, ha="right")
    txt(ax, -0.1, 0.05, r"A$_2$", fs=10, ha="right")
    brace(ax, -0.12, 0.2, 0.68, w=0.07, side=-1)
    txt(ax, -0.27, 0.44, "a", fs=11, ha="right")
    line(ax, [-0.12, -0.12], [0.24, 0.64], lw=1.0)
    txt(ax, 2.58, 0.82, "P", fs=11, ha="left")
    arrow(ax, (0, -0.7), (2.5, -0.7), both=True)
    ax.add_patch(plt.Rectangle((1.1, -0.82), 0.3, 0.24, fc="white", ec="none", zorder=4))
    ax.text(1.25, -0.7, "D", color=INK, fontsize=11, ha="center", va="center", zorder=5)
    ax.set_xlim(-1.4, 2.9)
    ax.set_ylim(-1.1, 1.9)
    save(fig, "24.1_Q47")


def q49():
    fig, ax = canvas(2.6, 2.6)
    arrow(ax, (0, 0), (0, 1.7), lw=1.4)
    arrow(ax, (0, 0), (2.0, 0), lw=1.4)
    dot(ax, (0, 0), 0.055, open_=True)
    dot(ax, (0, 1.05), 0.055, open_=True)
    dot(ax, (1.05, 0), 0.055, open_=True)
    txt(ax, -0.1, 0, "B", fs=12, ha="right")
    txt(ax, -0.1, 1.05, "A", fs=12, ha="right")
    txt(ax, 1.05, 0.2, "D", fs=12)
    txt(ax, 0.12, 1.72, "y", fs=12, ha="left")
    txt(ax, 2.07, 0, "x", fs=12, ha="left")
    ax.set_xlim(-0.4, 2.3)
    ax.set_ylim(-0.25, 1.9)
    save(fig, "24.1_Q49")


def q56():
    fig, ax = canvas(4.0, 3.2)
    line(ax, [0, 0], [3.5, 1.4])      # above slit S1
    line(ax, [0, 0], [0.95, -0.95])   # between the slits
    line(ax, [0, 0], [-1.45, -3.4])   # below slit S2
    line(ax, [4.85, 4.85], [3.35, -3.1])
    dash = (0, (2.5, 2.5))
    for y in (1.1, 0.25, -0.42, -1.37):
        line(ax, [-5.05, -0.6], [y, y], ls=dash, lw=1.1)
        arrow(ax, (-3.2, y), (-2.6, y), lw=1.3, ms=12)
    line(ax, [0.25, 4.85], [0.0, 0.0], ls=dash, lw=1.1)
    arrow(ax, (-0.45, 0.85), (-0.45, -0.9), both=True, lw=1.2, ms=11)
    txt(ax, -0.65, -0.1, "d", fs=12, ha="right")
    txt(ax, -4.4, 1.6, r"$\lambda$", fs=13)
    txt(ax, -0.15, 1.75, r"S$_1$", fs=12, ha="right")
    txt(ax, -0.15, -1.95, r"S$_2$", fs=12, ha="right")
    txt(ax, 5.0, 0.0, "O", fs=12, ha="left")
    txt(ax, 5.0, -2.85, "Screen", fs=11, ha="left")
    arrow(ax, (0.05, -3.65), (4.8, -3.65), both=True)
    txt(ax, 2.42, -4.2, "(D >> d)", fs=11)
    ax.set_xlim(-5.3, 6.6)
    ax.set_ylim(-4.6, 3.6)
    save(fig, "24.1_Q56")


def graph4(name, xl, yl, curves, extra=None, heads=True, w=5.2, h=4.0):
    fig, axes = panels(2, 2, w, h)
    for k, (a, c) in enumerate(zip(axes, curves), start=1):
        graph_axes(a, 1.15, 1.0, xl, yl, heads=heads)
        xs, ys = c
        line(a, xs, ys)
        panel_label(a, k, x=-0.42, y=0.4)
        a.set_xlim(-0.6, 1.4)
        a.set_ylim(-0.12, 1.12)
    fig.tight_layout()
    save(fig, name)


def q70():
    x = np.linspace(0.08, 0.85, 100)
    curves = [
        ([0.05, 0.75], [0.95, 0.15]),                     # falls linearly
        (x, 0.12 + 0.07 / (x - 0.0)),                     # hyperbola-like fall
        ([0, 0.78], [0, 0.88]),                           # linear rise from O
        (np.linspace(0, 0.85, 100), 0.82 * np.sin(np.linspace(0, 0.85, 100) / 0.85 * np.pi / 2) ** 0.8),
    ]
    xs, ys = curves[1]
    keep = ys <= 1.0
    curves[1] = (xs[keep], ys[keep])
    graph4("24.1_Q70", "d", r"$\beta$", curves)


def q83():
    t = np.linspace(0, 1, 200)
    arch = np.linspace(0, 0.9, 300)
    curves = [
        ([0, 0.75], [0, 0.95]),                                    # linear from O
        (0.02 + 0.85 * t, 0.92 - 1.4 * t + 0.9 * t ** 2),          # falls, shallow dip, slight rise at the end
        (arch, 0.42 * np.abs(np.sin(arch / 0.45 * np.pi)) ** 0.75),  # two arches
        ([0, 0.75], [0.62, 0.62]),                                 # constant
    ]
    graph4("24.1_Q83", "y", r"$\Delta\phi$", curves)


def q79():
    fig, ax = canvas(3.0, 2.4)
    S1, S2, P = (0, 0), (0, 1.3), (1.25, 0)
    line(ax, [0, 0], [0, 1.3])
    line(ax, [0, 2.05], [0, 0], ls=(0, (3, 3)), lw=1.2)
    for p in (S1, S2, P):
        dot(ax, p, 0.06)
    arrow(ax, (-0.45, 1.3), (-0.45, 0.0), both=True)
    txt(ax, -0.55, 0.65, r"4$\lambda$", fs=12, ha="right")
    txt(ax, -0.12, -0.22, r"S$_1$", fs=12)
    txt(ax, 0.0, 1.55, r"S$_2$", fs=12)
    txt(ax, 1.25, -0.24, "P", fs=12)
    ax.set_xlim(-1.0, 2.15)
    ax.set_ylim(-0.45, 1.75)
    save(fig, "24.1_Q79")


def q11_24_2():
    fig, ax = canvas(3.0, 3.6)
    A, B, C, D = (0, 1.0), (0, 0.17), (0, -0.17), (0, -1.0)
    P = (1.7, 1.9)
    line(ax, [0, 0], [1.0, 2.4])
    line(ax, [0, 0], [-1.0, -1.75])
    line(ax, [1.75, 1.75], [2.4, -1.75])
    for p in (A, B, C, D):
        ray(ax, (-1.35, p[1]), p, frac=0.6, lw=1.4)
        line(ax, [p[0], P[0]], [p[1], P[1]], lw=1.3)
    line(ax, [-1.35, 1.75], [0, 0], ls=(0, (3, 3)), lw=1.1)
    txt(ax, -0.15, 1.2, "A", fs=12, ha="right")
    txt(ax, -0.1, 0.35, "B", fs=12, ha="right")
    txt(ax, -0.05, -0.42, "C", fs=12, ha="right")
    txt(ax, -0.1, -1.2, "D", fs=12, ha="right")
    txt(ax, 1.83, 2.0, "P", fs=12, ha="left")
    ax.set_xlim(-1.5, 2.2)
    ax.set_ylim(-1.85, 2.5)
    save(fig, "24.2_Q11")


if __name__ == "__main__":
    for f in (q22, q24, q26, q28, q36, q37, q44, q47, q49, q56, q70, q79, q83, q11_24_2):
        if f:
            f()
    print("ch24 done")
