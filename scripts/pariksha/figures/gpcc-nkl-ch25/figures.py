"""Redraw the 11 figures of GPCC NKL Physics Vol II Ch. 25 (Dual Nature of Matter and Radiation).

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
KE_SEGS = [([0, 0.75], [0.85, 0]),        # falls from the KE axis to the frequency axis
           ([0.2, 0.85], [0.2, 0.72]),    # rising, touches neither axis
           ([0, 0.72], [0, 0.78]),        # through the origin
           ([0.3, 0.92], [0, 0.78])]      # from an intercept on the frequency axis


def q14():
    fig, ax = canvas(3.6, 2.4)
    arrow(ax, (-1.75, 0), (1.75, 0), lw=1.4)
    arrow(ax, (0, 0), (0, 1.85), lw=1.4)
    curve(ax, [(-1.45, 0), (-1.0, 0.12), (-0.5, 0.55), (0, 1.08), (0.5, 1.4), (0.75, 1.43), (1.0, 1.43)])
    curve(ax, [(-0.72, 0), (-0.4, 0.1), (0, 0.38), (0.3, 0.95), (0.6, 1.38), (0.75, 1.43), (1.0, 1.43)])
    dot(ax, (-1.45, 0), 0.04)
    dot(ax, (-0.72, 0), 0.04)
    txt(ax, -1.45, -0.15, r"-V$_2$", fs=12, va="top")
    txt(ax, -0.72, -0.15, r"-V$_1$", fs=12, va="top")
    txt(ax, -0.62, 0.98, r"$\lambda_2$", fs=13)
    txt(ax, 0.45, 0.72, r"$\lambda_1$", fs=13)
    txt(ax, -0.08, 1.8, "I", fs=12, ha="right")
    txt(ax, 1.8, 0, "V", fs=12, ha="left")
    ax.set_xlim(-1.9, 2.0)
    ax.set_ylim(-0.5, 2.0)
    save(fig, "25.1_Q14")


def q18():
    four("25.1_Q18", "frequency", "KE", KE_SEGS)


def q28():
    four("25.2_Q28", "Frequency", "Kinetic energy", KE_SEGS, ylab="side")


def q23():
    fig, ax = canvas(2.6, 3.0)
    arrow(ax, (0, -0.8), (0, 2.1), lw=1.4)
    arrow(ax, (0, 0), (2.2, 0), lw=1.4)
    A, B = (0.52, 0), (0, -0.68)
    k = (A[1] - B[1]) / (A[0] - B[0])
    line(ax, [B[0], 1.75], [B[1], B[1] + k * 1.75])
    dot(ax, B, 0.05)
    txt(ax, -0.1, 2.05, r"V$_0$", fs=12, ha="right")
    txt(ax, -0.1, 0.06, "O", fs=12, ha="right")
    txt(ax, 0.58, -0.2, "A", fs=12, va="top")
    txt(ax, 0.1, -0.8, "B", fs=12, ha="left")
    txt(ax, 2.27, 0, r"$\nu$", fs=13, ha="left")
    ax.set_xlim(-0.4, 2.5)
    ax.set_ylim(-1.05, 2.3)
    save(fig, "25.1_Q23")


def q25():
    fig, ax = canvas(3.8, 2.6)
    arrow(ax, (0, 0), (0, 2.15), lw=1.4)
    arrow(ax, (0, 0), (2.2, 0), lw=1.4)
    dx = 0.62
    for x0 in (0.32, 1.0, 1.75):
        line(ax, [x0, x0 + dx], [0, 1.8])
    txt(ax, 0.98, 2.0, "Metal I", fs=11)
    txt(ax, 1.75, 2.0, "Metal II", fs=11)
    txt(ax, 2.55, 2.0, "Metal III", fs=11)
    ang = np.degrees(np.arctan2(1.8, dx))
    ax.add_patch(Arc((0.32, 0), 0.3, 0.3, theta1=0, theta2=ang, color=INK, lw=1.1))
    txt(ax, 0.55, 0.2, r"$\theta$", fs=12)
    txt(ax, 0.32, -0.12, "0.001", fs=10, va="top")
    txt(ax, 1.0, -0.12, "0.002", fs=10, va="top")
    txt(ax, 1.55, -0.12, r"0.004 (1/$\lambda$)", fs=10, va="top", ha="left")
    txt(ax, 2.25, 0.08, r"nm$^{-1}$", fs=11, ha="left")
    txt(ax, -0.05, 2.12, "V", fs=12, ha="right")
    ax.set_xlim(-0.3, 3.1)
    ax.set_ylim(-0.4, 2.25)
    save(fig, "25.1_Q25")


def q51():
    fig, ax = canvas(3.4, 3.4)
    arrow(ax, (0, 0), (0, 1.55), lw=1.4)
    arrow(ax, (0, 0), (2.0, 0), lw=1.4)
    k = 2.4
    ang = np.degrees(np.arctan(k))
    for x0, top, nm in ((0.62, 1.62, "metal (1)"), (0.97, 1.5, "metal (2)"), (1.28, 1.38, "metal (3)")):
        tx = x0 + top / k
        line(ax, [x0, tx], [0, top])
        txt(ax, tx + 0.03, top + 0.04, nm, fs=10, ha="left", va="bottom", rotation=ang, rotation_mode="anchor")
    ax.add_patch(Arc((0.62, 0), 0.3, 0.3, theta1=0, theta2=ang, color=INK, lw=1.1))
    txt(ax, 0.84, 0.2, r"$\theta$", fs=12)
    for x0, s in ((0.62, "0.001"), (0.97, "0.002"), (1.28, "0.004")):
        txt(ax, x0 + 0.03, -0.06, s, fs=9.5, rotation=60, ha="right", va="top", rotation_mode="anchor")
    txt(ax, 2.05, 0, r"$\frac{1}{\lambda}$nm$^{-1}$", fs=12, ha="left")
    txt(ax, -0.05, 1.5, r"V$_0$", fs=12, ha="right")
    ax.set_xlim(-0.35, 2.7)
    ax.set_ylim(-0.55, 2.45)
    save(fig, "25.1_Q51")


def q35():
    fig, ax = canvas(2.8, 2.4)
    arrow(ax, (0, 0), (0, 1.87), lw=1.4)
    arrow(ax, (0, 0), (2.2, 0), lw=1.4)
    line(ax, [0.57, 1.14], [0, 1.37])
    line(ax, [1.3, 1.87], [0, 1.37])
    txt(ax, 1.17, 1.52, r"M$_1$", fs=12)
    txt(ax, 1.95, 1.52, r"M$_2$", fs=12)
    txt(ax, 0.02, 1.98, r"V$_\mathrm{S}$", fs=12, va="bottom")
    txt(ax, 2.27, 0, r"$\nu$", fs=13, ha="left")
    ax.set_xlim(-0.3, 2.5)
    ax.set_ylim(-0.2, 2.25)
    save(fig, "25.1_Q35")


def q41():
    fig, ax = canvas(3.6, 2.6)
    arrow(ax, (-3.15, 0), (2.1, 0), lw=1.4)
    arrow(ax, (0, -0.15), (0, 3.2), lw=1.4)
    curve(ax, [(-2.98, 0), (-2.4, 0.25), (-1.6, 1.0), (-0.9, 1.8), (-0.3, 2.07), (0.3, 2.09), (1.55, 2.09)])
    curve(ax, [(-2.15, 0), (-1.6, 0.3), (-1.0, 1.0), (-0.4, 1.7), (0.0, 1.95), (0.6, 2.08), (0.9, 2.09)])
    curve(ax, [(-2.15, 0), (-1.5, 0.15), (-0.95, 0.6), (-0.55, 1.05), (-0.25, 1.15), (0.3, 1.16), (1.95, 1.17)])
    txt(ax, -1.5, 1.5, "C", fs=12)
    txt(ax, -0.1, 1.5, "B", fs=12, ha="right")
    txt(ax, -0.1, 0.8, "A", fs=12, ha="right")
    txt(ax, -0.1, 2.75, "I", fs=12, ha="right")
    txt(ax, 2.05, -0.22, "V", fs=12, va="top")
    ax.set_xlim(-3.3, 2.4)
    ax.set_ylim(-0.6, 3.3)
    save(fig, "25.1_Q41")


def q56():
    fig, ax = canvas(3.6, 3.2)
    arrow(ax, (-5.7, 0), (6.6, 0), lw=1.4)
    arrow(ax, (0, 0), (0, 7.0), lw=1.4)
    curve(ax, [(-3.42, 0), (-2.6, 1.6), (-1.6, 2.95), (-0.7, 3.8), (0, 4.25), (0.9, 4.6), (1.75, 4.85)])
    curve(ax, [(-1.8, 0), (-1.3, 1.65), (-0.75, 2.95), (-0.3, 3.8), (0, 4.25)])
    curve(ax, [(-1.8, 0), (-1.35, 1.0), (-0.75, 1.95), (0, 2.85), (0.9, 3.4), (1.75, 3.75)])
    arrow(ax, (-5.4, 0.9), (-3.0, 0.9), lw=1.2)
    txt(ax, -5.55, 0.9, "c", fs=13, ha="right", style="italic", fontweight="bold")
    arrow(ax, (-3.0, 2.2), (-1.12, 2.2), lw=1.2)
    txt(ax, -3.15, 2.2, "b", fs=13, ha="right", style="italic", fontweight="bold")
    arrow(ax, (0.75, 1.55), (-1.2, 1.55), lw=1.2)
    txt(ax, 0.9, 1.55, "a", fs=13, ha="left", style="italic", fontweight="bold")
    txt(ax, 0.2, 7.0, "photo current", fs=11, ha="left", fontweight="bold")
    txt(ax, -2.8, -0.5, "Retarding\npotential", fs=11, va="top", fontweight="bold")
    txt(ax, 3.9, -0.5, "Anode\npotential", fs=11, va="top", fontweight="bold")
    ax.set_xlim(-6.6, 7.0)
    ax.set_ylim(-2.6, 7.6)
    save(fig, "25.1_Q56")


def q29():
    fig, ax = canvas(2.8, 2.6)
    arrow(ax, (0, 0), (0, 1.75), lw=1.4)
    arrow(ax, (0, 0), (1.85, 0), lw=1.4)
    for (x, y), s in (((0.65, 1.32), "B"), ((1.13, 1.02), "C"), ((1.45, 0.65), "A")):
        line(ax, [0, x], [0, y], lw=1.4)
        txt(ax, x + 0.08, y + 0.08, s, fs=12, ha="left")
    txt(ax, -0.02, -0.12, "O", fs=12, va="top")
    txt(ax, 0, 1.85, r"$\lambda$", fs=12, va="bottom")
    txt(ax, 1.95, 0.05, r"$\frac{1}{\sqrt{V}}$", fs=14, ha="left")
    ax.set_xlim(-0.3, 2.4)
    ax.set_ylim(-0.35, 2.05)
    save(fig, "25.2_Q29")


def q35_2():
    segs = [([0, 0.72], [0, 0.85]),       # through the origin
            ([0.42, 1.0], [0, 0.85]),     # from an intercept on the log E axis
            ([0, 0.85], [0.8, 0]),        # falling from the log-lambda axis to the log E axis
            ([0, 0.75], [0.38, 0.8])]     # from an intercept on the log-lambda axis
    four("25.2_Q35", "log E", r"log $\lambda$", segs, heads=False, ylab="topleft")


if __name__ == "__main__":
    for f in (q14, q18, q23, q25, q35, q41, q51, q56, q28, q29, q35_2):
        f()
    print("ch25 done")
