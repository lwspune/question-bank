"""Redrawn figures for hb-9-2017.

Left as the cleaned scan on purpose: Q3 (the mirror images of
INFRASTRUCTURE: at the print's resolution the flip of each hand-lettered
glyph cannot be settled, and that flip IS the question) and Q7 (several of
the circuit symbols in rows B-D are non-standard and cannot be named for
certain)."""
from redraw_lib import Circle, arrow, canvas, line, text

PAPER = "hb-9-2017"


def q11():
    """Q11: velocity-time graph on 1 cm graph paper. Copied from the print:
    scale 1 cm = 5 s (x) and 1 cm = 8 m/s (y); only alternate lines numbered,
    as printed (5, 15, 25, 35; 8, 24, 40, 56); a straight line from O through
    P (2 cm, 2 cm), Q (4, 4), R (6, 6), arrowed past R; axes run on past O
    (X' left, Y' down)."""
    fig, ax = canvas(6.4, 6.4, (-2.6, 11.3), (-2.4, 10.4))
    for x in range(-2, 12):
        line(ax, [(x, -2), (x, 10)], lw=0.5, color="#c4c4c4", z=0)
    for y in range(-2, 11):
        line(ax, [(-2, y), (11, y)], lw=0.5, color="#c4c4c4", z=0)
    arrow(ax, 0, 0, 10.7, 0, head=12)
    arrow(ax, 0, 0, -1.7, 0, head=12)
    arrow(ax, 0, 0, 0, 9.8, head=12)
    arrow(ax, 0, 0, 0, -1.4, head=12)
    text(ax, 10.75, -0.45, "X", size=13)
    text(ax, -1.95, 0.4, "X′", size=13)
    text(ax, 0.35, 9.8, "Y", size=13)
    text(ax, -0.35, -1.55, "Y′", size=13)
    text(ax, -0.4, -0.45, "O", size=13)
    for cm, lab in ((1, "5"), (3, "15"), (5, "25"), (7, "35")):
        line(ax, [(cm, -0.12), (cm, 0.12)], lw=1.2)
        text(ax, cm, -0.45, lab, size=13)
    for cm, lab in ((1, "8"), (3, "24"), (5, "40"), (7, "56")):
        line(ax, [(-0.12, cm), (0.12, cm)], lw=1.2)
        text(ax, -0.25, cm, lab, size=13, ha="right")
    line(ax, [(0, 0), (7.6, 7.6)], lw=1.6)
    arrow(ax, 7.4, 7.4, 7.9, 7.9, head=12, lw=1.6)
    for name, c, dx in (("P", 2, -0.5), ("Q", 4, -0.5), ("R", 6, -0.5)):
        ax.add_patch(Circle((c, c), 0.09, color="black", zorder=4))
        text(ax, c + dx, c + 0.45, name, size=15, bg=True)
    text(ax, 3.9, -1.45, "Time (s)", size=14, bg=True)
    text(ax, -1.45, 4.3, "Velocity (m/s)", size=14, rot=90, bg=True)
    text(ax, 10.85, 9.75, "Scale:\nOn X-axis: 1 cm = 5 s\nOn Y-axis: 1 cm = 8 m/s", size=12, ha="right", va="top",
         bg=True)
    return fig


def q43():
    """Q43: electron-dot overlap diagram of B2A2: four circles in a row, A, B,
    B, A; one pair of dots in each A-B overlap and three pairs (six dots, in a
    column) in the B-B overlap."""
    fig, ax = canvas(5.0, 1.9, (-0.1, 9.1), (0.1, 3.5))
    for x, r, lab in ((1.2, 1.0, "A"), (3.25, 1.5, "B"), (5.75, 1.5, "B"), (7.8, 1.0, "A")):
        ax.add_patch(Circle((x, 1.8), r, fill=False, lw=1.4, color="black"))
        text(ax, x - (0.15 if lab == "A" and x < 4 else -0.15 if lab == "A" else 0), 1.8, lab, size=17)
    for x in (1.975, 7.025):  # the middle of each A-B lens
        for y in (1.55, 2.05):
            ax.add_patch(Circle((x, y), 0.06, color="black"))
    for k in range(6):  # the B-B lens, centred at x = 4.5
        ax.add_patch(Circle((4.5, 1.2 + k * 0.24), 0.06, color="black"))
    return fig


FIGURES = {(PAPER, 11): q11, (PAPER, 43): q43}
