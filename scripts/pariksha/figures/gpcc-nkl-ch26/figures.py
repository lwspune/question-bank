"""Redraw the 4 figures of GPCC NKL Physics Vol II Ch. 26 (Atoms).

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
def q29():
    """26.1 Q29 has no stem figure: four option graphs of d against Ze^2."""
    fig, axes = panels(2, 2, 5.4, 4.6)
    x = np.linspace(0.15, 0.85, 200)
    for k, a in enumerate(axes, start=1):
        opt_axes(a, r"Ze$^2$", "d", ylab="topleft", xlab="below")
        panel_label(a, k)
        a.set_xlim(-0.65, 1.45)
        a.set_ylim(-0.35, 1.15)
    line(axes[0], x, 0.1 + 0.105 / (x - 0.04))                            # falls and flattens
    line(axes[1], [0.03, 0.3], [0.03, 0.32], ls=(0, (3, 2.5)), lw=1.4)     # dashed near O ...
    line(axes[1], [0.3, 0.82], [0.32, 0.85])                               # ... then a straight rise
    xc = np.linspace(0, 0.75, 200)
    line(axes[2], xc, 0.04 + 1.65 * xc ** 2.2 + 0.08 * xc)               # rises ever more steeply
    line(axes[3], [0.05, 0.75], [0.95, 0.1])                               # straight fall
    fig.tight_layout()
    save(fig, "26.1_Q29")


def q10():
    fig, ax = canvas(4.2, 2.9)
    levels = {4: 5.6, 3: 4.75, 2: 2.9, 1: 0.0}
    for n, y in levels.items():
        line(ax, [0.4, 8.1], [y, y], lw=1.4)
        txt(ax, 8.3, y, f"n = {n}", fs=11, ha="left")
    arrow(ax, (1.4, 5.6), (1.4, 0.0))
    arrow(ax, (2.6, 2.9), (2.6, 0.0))
    arrow(ax, (4.1, 4.75), (4.1, 2.9))
    arrow(ax, (5.65, 5.6), (5.65, 4.75))
    txt(ax, 6.05, 4.98, "A", fs=12, ha="left")
    txt(ax, 4.45, 3.4, "B", fs=12, ha="left")
    txt(ax, 2.85, 1.35, "C", fs=12, ha="left")
    txt(ax, 1.65, 1.45, "D", fs=12, ha="left")
    ax.set_xlim(0.2, 10.0)
    ax.set_ylim(-0.4, 6.1)
    save(fig, "26.2_Q10")


def q41():
    fig, ax = canvas(3.6, 2.6)
    labels = ["-2E", ("-5E", "2"), "-3E", ("-7E", "2")]
    for i, s in enumerate(labels):
        y = -float(i)
        line(ax, [0, 5.5], [y, y], lw=1.4)
        if isinstance(s, tuple):  # printed as a stacked fraction
            txt(ax, -0.58, y + 0.19, s[0], fs=12)
            line(ax, [-0.92, -0.24], [y, y], lw=1.0)
            txt(ax, -0.55, y - 0.22, s[1], fs=12)
        else:
            txt(ax, -0.05, y, s, fs=12, ha="right")
    arrow(ax, (1.2, 0), (1.2, -1.0))
    arrow(ax, (3.06, 0), (3.06, -3.0))
    txt(ax, 1.4, -0.42, r"$\lambda_2$", fs=13, ha="left")
    txt(ax, 3.25, -2.55, r"$\lambda_1$", fs=13, ha="left")
    ax.set_xlim(-1.3, 5.7)
    ax.set_ylim(-3.5, 0.4)
    save(fig, "26.2_Q41")


def q52():
    fig, ax = canvas(3.2, 2.0)
    for y, s in ((2.13, "3 E"), (1.0, "5E/3"), (0.0, "E")):
        line(ax, [0, 3.9], [y, y], lw=1.4)
        txt(ax, 4.0, y, s, fs=13, ha="left")
    ax.set_xlim(-0.2, 5.2)
    ax.set_ylim(-0.4, 2.5)
    save(fig, "26.2_Q52")


if __name__ == "__main__":
    for f in (q29, q10, q41, q52):
        f()
    print("ch26 done")
