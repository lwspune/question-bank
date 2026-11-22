"""
Drawing helpers shared by the redraw_<paper>.py modules (see redraw.py).

Every figure is drawn in data units on an equal-aspect, axis-free matplotlib
canvas, black on white, Times New Roman, so a redrawn figure looks like the
others already in the bank (2018 Q10/Q21/Q72, 2023 Q3/Q55/Q88).
"""
import math

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.patches import Arc, Circle, Ellipse, FancyBboxPatch, Polygon, Rectangle  # noqa: E402,F401

plt.rcParams["font.family"] = "Times New Roman"
plt.rcParams["mathtext.fontset"] = "stix"

LW = 1.6  # main stroke
INK = "black"


def canvas(w: float, h: float, xlim, ylim):
    """A figure of w x h inches showing xlim x ylim in equal-aspect data units."""
    fig, ax = plt.subplots(figsize=(w, h))
    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_aspect("equal")
    ax.axis("off")
    return fig, ax


def line(ax, pts, lw=LW, ls="-", color=INK, z=2):
    xs, ys = zip(*pts)
    ax.plot(xs, ys, color=color, lw=lw, ls=ls, solid_capstyle="round", zorder=z)


def arrow(ax, x0, y0, x1, y1, lw=1.4, head=14, color=INK, style="-|>"):
    """An arrow from (x0, y0) with its head at (x1, y1)."""
    ax.annotate("", xy=(x1, y1), xytext=(x0, y0),
                arrowprops=dict(arrowstyle=style, mutation_scale=head, lw=lw, color=color, shrinkA=0, shrinkB=0))


def mid_arrow(ax, x0, y0, x1, y1, at=0.5, size=0.18, color=INK):
    """A filled arrowhead on the segment (x0, y0)-(x1, y1), pointing towards (x1, y1)."""
    mx, my = x0 + (x1 - x0) * at, y0 + (y1 - y0) * at
    d = math.hypot(x1 - x0, y1 - y0)
    ux, uy = (x1 - x0) / d, (y1 - y0) / d
    px, py = -uy, ux
    tip = (mx + ux * size * 0.6, my + uy * size * 0.6)
    back = (mx - ux * size * 0.6, my - uy * size * 0.6)
    ax.add_patch(Polygon([tip, (back[0] + px * size * 0.45, back[1] + py * size * 0.45),
                          (back[0] - px * size * 0.45, back[1] - py * size * 0.45)],
                         closed=True, color=color, lw=0, zorder=3))


def text(ax, x, y, s, size=14, ha="center", va="center", bold=False, rot=0, italic=False, bg=False):
    """bg: a white patch behind the text, so a line or fill under it cannot hide it."""
    ax.text(x, y, s, ha=ha, va=va, fontsize=size, fontweight="bold" if bold else "normal",
            rotation=rot, fontstyle="italic" if italic else "normal", zorder=5,
            bbox=dict(facecolor="white", edgecolor="none", pad=1.5) if bg else None)


def box(ax, x, y, w, h, label=None, size=13, lw=1.3, bold=False):
    """A rectangle with its lower-left corner at (x, y), label centred."""
    ax.add_patch(Rectangle((x, y), w, h, fill=False, lw=lw, color=INK, zorder=2))
    if label is not None:
        text(ax, x + w / 2, y + h / 2, label, size=size, bold=bold)


def axes(ax, x0, y0, x1, y1, xlabel=None, ylabel=None, size=12, neg_x=0.0, neg_y=0.0, lw=1.4):
    """Two arrowed axes meeting at (x0, y0), reaching x1 and y1; labels beside the arrowheads."""
    arrow(ax, x0 - neg_x, y0, x1, y0, lw=lw, head=12)
    arrow(ax, x0, y0 - neg_y, x0, y1, lw=lw, head=12)
    if xlabel:
        text(ax, (x0 + x1) / 2, y0 - 0.45, xlabel, size=size, va="top")
    if ylabel:
        text(ax, x0 - 0.45, (y0 + y1) / 2, ylabel, size=size, rot=90, ha="right")


def resistor(ax, x0, y, x1, peaks=7, amp=0.16, lw=1.4):
    """A horizontal zig-zag resistor from x0 to x1 at height y."""
    n = peaks * 2
    pts = [(x0, y)]
    for i in range(1, n):
        pts.append((x0 + (x1 - x0) * i / n, y + (amp if i % 2 else -amp)))
    pts.append((x1, y))
    line(ax, pts, lw=lw)


def cell(ax, x, y, gap=0.16, long=0.42, short=0.22, vertical_wire=False, lw=1.6, signs=True, size=13):
    """A cell on a horizontal wire: long plate (+) at x - gap/2, short (-) at x + gap/2.
    The caller draws the wire up to x - gap/2 and from x + gap/2."""
    line(ax, [(x - gap / 2, y - long / 2), (x - gap / 2, y + long / 2)], lw=lw)
    line(ax, [(x + gap / 2, y - short / 2), (x + gap / 2, y + short / 2)], lw=lw + 1.4)
    if signs:
        text(ax, x - gap / 2 - 0.2, y + long / 2 + 0.05, "+", size=size, va="bottom")
        text(ax, x + gap / 2 + 0.2, y + long / 2 + 0.05, "−", size=size, va="bottom")


def key_plug(ax, x, y, r=0.2):
    """A plug key: a small circle with a dot (the CBSE/MSTA symbol)."""
    ax.add_patch(Circle((x, y), r, fill=False, lw=1.4, color=INK, zorder=3))
    ax.add_patch(Circle((x, y), r * 0.35, color=INK, zorder=3))


def meter(ax, x, y, r, label, size=14):
    """A circled meter letter (A, V, G) with white fill so the wire stops at its rim."""
    ax.add_patch(Circle((x, y), r, facecolor="white", edgecolor=INK, lw=1.5, zorder=3))
    text(ax, x, y, label, size=size)


def save(fig, lane: str, paper: str, n: int) -> str:
    import os

    out = os.path.join(lane, "redrawn", paper)
    os.makedirs(out, exist_ok=True)
    path = os.path.join(out, f"q{n:03d}.png")
    fig.savefig(path, dpi=200, bbox_inches="tight", pad_inches=0.08, facecolor="white")
    plt.close(fig)
    return path
