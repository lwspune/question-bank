"""Redraw the 4 figures of GPCC NKL Physics Vol II Ch. 27 (Nuclei).

    python -P figures.py

Writes <ref with spaces as _>.png beside this file.
"""
import os

import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, Circle
from scipy.interpolate import PchipInterpolator

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


def dot(ax, p, r=0.05, open_=False):
    ax.add_patch(Circle(p, r, fc="white" if open_ else INK, ec=INK, lw=1.3, zorder=5))


def txt(ax, x, y, s, fs=FS, **kw):
    kw.setdefault("ha", "center")
    kw.setdefault("va", "center")
    ax.text(x, y, s, color=INK, fontsize=fs, **kw)


def curve(ax, pts, lw=LW, n=300):
    """Smooth shape-preserving curve through printed points (x increasing)."""
    xs, ys = zip(*pts)
    f = PchipInterpolator(xs, ys)
    x = np.linspace(xs[0], xs[-1], n)
    line(ax, x, f(x), lw=lw)


def panels(n_rows, n_cols, w, h):
    fig, axes = plt.subplots(n_rows, n_cols, figsize=(w, h), dpi=160)
    axes = np.atleast_1d(axes).ravel()
    for a in axes:
        a.set_aspect("equal")
        a.axis("off")
    return fig, axes


def panel_label(ax, k, x=-0.45, y=0.45, fs=13):
    txt(ax, x, y, f"{k})", fs=fs, fontweight="bold")


def opt_axes(ax, xl, yl, heads=True, ylab="top", xlab="below", x1=1.15, y1=1.0, fs=12):
    """Option-panel axes. ylab: top (above the arrow tip) | topleft | side (rotated).
    xlab: end (beside the arrow tip) | below (under the right end)."""
    if heads:
        arrow(ax, (0, 0), (x1, 0), lw=1.4, ms=14)
        arrow(ax, (0, 0), (0, y1), lw=1.4, ms=14)
    else:
        line(ax, [0, x1], [0, 0], lw=1.4)
        line(ax, [0, 0], [0, y1], lw=1.4)
    if ylab == "top":
        txt(ax, -0.03, y1 + 0.08, yl, fs=fs, va="bottom")
    elif ylab == "topleft":
        txt(ax, -0.05, y1 - 0.08, yl, fs=fs, ha="right")
    else:
        txt(ax, -0.1, y1 * 0.5, yl, fs=fs, rotation=90, ha="right")
    if xlab == "end":
        txt(ax, x1 + 0.05, 0, xl, fs=fs, ha="left")
    else:
        txt(ax, x1 * 0.62, -0.1, xl, fs=fs, va="top")


def four(name, xl, yl, segs, **kw):
    fig, axes = panels(2, 2, 5.4, 4.6)
    for k, (a, seg) in enumerate(zip(axes, segs), start=1):
        opt_axes(a, xl, yl, **kw)
        line(a, *seg)
        panel_label(a, k)
        a.set_xlim(-0.65, 1.45)
        a.set_ylim(-0.3, 1.25)
    fig.tight_layout()
    save(fig, name)


# ---------- figures ----------
def q10():
    fig, ax = canvas(3.0, 2.9)
    line(ax, [0, 0], [0, 5.05], lw=1.4)
    line(ax, [0, 4.72], [0, 0], lw=1.4)
    line(ax, [0, 3.28], [3.1, 0])                                   # A: falls to the axis
    line(ax, [0, 4.22], [0, 3.95])                                  # B: straight rise
    curve(ax, [(0, 0), (0.3, 1.0), (0.7, 1.9), (1.22, 2.55), (2.22, 3.35), (3.0, 3.52),
               (3.62, 3.5), (4.67, 3.3)])                           # C: rises, flattens, dips
    curve(ax, [(0, 0), (0.3, 1.0), (0.7, 1.95), (1.22, 2.7), (2.22, 3.75), (3.22, 4.3)])  # D: keeps rising
    line(ax, [3.22, 3.4, 3.45], [4.3, 4.33, 4.42], lw=1.0)
    txt(ax, 3.5, 4.4, "D", fs=12, ha="left", style="italic")
    txt(ax, 4.38, 4.05, "B", fs=12, ha="left", style="italic")
    line(ax, [4.67, 4.85], [3.3, 3.22], lw=1.0)
    txt(ax, 4.9, 3.2, "C", fs=12, ha="left", style="italic")
    txt(ax, 3.4, 0.13, "A", fs=12, ha="left", style="italic")
    txt(ax, -0.25, 2.5, "Binding energy\nper nucleon", fs=11, rotation=90, ha="right")
    txt(ax, 2.35, -0.3, "Mass number", fs=11, va="top")
    ax.set_xlim(-1.1, 5.4)
    ax.set_ylim(-0.75, 5.2)
    save(fig, "27.1_Q10")


def q15():
    fig, axes = panels(2, 2, 5.4, 4.6)
    for k, a in enumerate(axes, start=1):
        opt_axes(a, "A", "d", ylab="topleft", xlab="end")
        panel_label(a, k)
        a.set_xlim(-0.65, 1.45)
        a.set_ylim(-0.2, 1.15)
    line(axes[0], [0, 0.85], [0, 0.78])                                   # linear from O
    x = np.linspace(0, 0.92, 200)
    line(axes[1], x, 0.02 + 1.0 * x ** 2.2)                               # upward-curving
    line(axes[2], [0, 0.85], [0.55, 0.55])                                # constant
    curve(axes[3], [(0, 0), (0.12, 0.45), (0.3, 0.72), (0.5, 0.8), (0.7, 0.72), (0.85, 0.48)])  # rise, max, fall
    fig.tight_layout()
    save(fig, "27.1_Q15")


def q23():
    """Printed step graph; step edges and the y-axis sit where the book draws them,
    measured against its own 40-unit tick spacing."""
    fig, ax = plt.subplots(figsize=(4.0, 2.8), dpi=160)
    ax.axis("off")
    x0 = -13.0                                    # the printed y-axis sits left of A = 0
    line(ax, [x0, x0], [0, 9.0], lw=1.4)
    line(ax, [x0, 246], [0, 0], lw=1.4)
    xs = [x0, 8.1, 8.1, 35.1, 35.1, 72.5, 72.5, 113.2, 113.2, 195.8, 195.8, 247]
    ys = [2, 2, 4, 4, 8, 8, 6, 6, 4, 4, 2, 2]
    line(ax, xs, ys)
    dots = (0, (2, 2.5))
    line(ax, [x0, 35.1], [8, 8], ls=dots, lw=1.2)
    line(ax, [x0, 8.1], [4, 4], ls=dots, lw=1.2)
    line(ax, [35.1, 219.5], [4, 4], ls=dots, lw=1.2)
    for a in (40, 80, 120, 160, 200, 240):
        line(ax, [a, a], [0, 0.35], lw=1.2)
        if a < 240:
            txt(ax, a, -0.45, str(a), fs=11, va="top", fontweight="bold")
    for b in (2, 4, 6, 8):
        line(ax, [x0, x0 + 4], [b, b], lw=1.2)
        txt(ax, x0 - 4, b, str(b), fs=11, ha="right", fontweight="bold")
    txt(ax, x0 - 4, -0.2, "0", fs=11, ha="right", fontweight="bold")
    txt(ax, 120, -1.9, "A", fs=12, va="top", fontweight="bold")
    txt(ax, x0 - 42, 4.55, "B.E.", fs=11, fontweight="bold")
    line(ax, [x0 - 51, x0 - 33], [4.0, 4.0], lw=1.0)
    txt(ax, x0 - 42, 3.45, "A", fs=11, fontweight="bold")
    ax.set_xlim(-72, 255)
    ax.set_ylim(-3.2, 9.3)
    save(fig, "27.1_Q23")


def q43():
    fig, axes = panels(2, 2, 5.4, 5.2)
    for k, a in enumerate(axes, start=1):
        arrow(a, (0, 0), (1.1, 0), lw=1.4, ms=14)
        arrow(a, (0, 0), (0, 1.05), lw=1.4, ms=14)
        arrow(a, (0, 0), (0, -0.95), lw=1.4, ms=14)
        txt(a, 1.15, 0.0, "r", fs=13, ha="left")
        txt(a, -0.05, 1.18, "U", fs=13)
        txt(a, -0.07, -0.95, "-U", fs=13, ha="right")
        txt(a, -0.08, 0.15, "O", fs=13, ha="right")
        panel_label(a, k, x=-0.55, y=-0.05)
        a.set_xlim(-0.75, 1.35)
        a.set_ylim(-1.1, 1.35)
    x = np.linspace(0.13, 0.8, 200)
    line(axes[0], x, 0.06 + 0.11 / (x - 0.01) - 0.05)                     # positive, decreasing
    xh = np.linspace(0.08, 0.76, 200)
    line(axes[1], xh, 0.08 + 0.77 * np.sin(np.pi * (xh - 0.08) / 0.68) ** 2)  # one hump
    curve(axes[2], [(0.12, 0.95), (0.16, 0.5), (0.2, 0.1), (0.25, -0.3), (0.32, -0.52), (0.4, -0.56),
                    (0.5, -0.42), (0.62, -0.24), (0.78, -0.1), (0.98, -0.03)])   # negative minimum
    curve(axes[3], [(0.1, 0.95), (0.13, 0.6), (0.17, 0.3), (0.23, 0.14), (0.3, 0.1), (0.38, 0.15),
                    (0.48, 0.3), (0.58, 0.45), (0.7, 0.55), (0.84, 0.6), (0.98, 0.62)])  # minimum above zero
    fig.tight_layout()
    save(fig, "27.1_Q43")


if __name__ == "__main__":
    for f in (q10, q15, q23, q43):
        f()
    print("ch27 done")
