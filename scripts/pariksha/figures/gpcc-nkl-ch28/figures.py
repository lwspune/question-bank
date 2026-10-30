"""Redraw the figures of GPCC NKL Physics Vol II Ch. 28 (Semiconductor Devices).

    python -P figures.py

Writes <ref with spaces as _>.png beside this file for every figure question in
drafts/ch28.A.json (42 figures). Circuits and gates use schemdraw, graphs and
waveforms matplotlib. Every value, label, battery polarity (long plate = +) and
diode direction is copied from the scan.
"""
import math
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import schemdraw
import schemdraw.elements as elm
import schemdraw.logic as logic
from matplotlib.patches import FancyArrowPatch, Polygon, Rectangle
from schemdraw.segments import SegmentArc

HERE = os.path.dirname(os.path.abspath(__file__))
INK = "#1f2937"
LW = 1.6
FS = 11
DPI = 160

schemdraw.config(lw=LW, fontsize=FS, color=INK, bgcolor="white", font="DejaVu Sans")


# ---------------------------------------------------------------- schemdraw helpers
def out(name):
    return os.path.join(HERE, name + ".png")


def save(d, name):
    d.save(out(name), transparent=False, dpi=DPI)
    plt.close("all")


SC = 1.25  # component size relative to schemdraw's default


def CD():
    """Drawing for a circuit: compact units so components and labels read at print size."""
    d = schemdraw.Drawing(show=False)
    d.config(inches_per_unit=0.36)
    return d


def LD():
    """Drawing for a gate network."""
    d = schemdraw.Drawing(show=False)
    d.config(inches_per_unit=0.45)
    return d


def W(d, *pts):
    """Wire through the points."""
    for a, b in zip(pts, pts[1:]):
        d.add(elm.Line().endpoints(a, b))


def R(d, a, b):
    d.add(elm.Resistor().scale(SC).endpoints(a, b))


def D(d, anode, cathode):
    """Diode: triangle points from anode to cathode (bar at cathode)."""
    d.add(elm.Diode().scale(SC).endpoints(anode, cathode))


def Z(d, anode, cathode):
    d.add(elm.Zener().scale(SC).endpoints(anode, cathode))


def CELL(d, plus, minus):
    """One cell: long plate at `plus`, short plate at `minus`."""
    d.add(elm.BatteryCell().scale(SC).endpoints(plus, minus))


def CAP(d, a, b):
    d.add(elm.Capacitor().scale(SC).endpoints(a, b))


def T(d, xy, s, ha="center", va="center", size=FS):
    d.add(elm.Label().at(xy).label(s, halign=ha, valign=va, fontsize=size))


def DOT(d, xy, open_=False):
    d.add(elm.Dot(open=open_).at(xy))


def ARR(d, at, direction, length=0.5):
    """Current arrow on a wire, head at `at` + half length in `direction` (r,l,u,d)."""
    dx, dy = {"r": (1, 0), "l": (-1, 0), "u": (0, 1), "d": (0, -1)}[direction]
    x, y = at
    h = length / 2
    d.add(elm.Arrow(arrowwidth=0.22, arrowlength=0.3).endpoints((x - dx * h, y - dy * h), (x + dx * h, y + dy * h)))


def DARR(d, a, b):
    d.add(elm.Arrow(double=True, arrowwidth=0.22, arrowlength=0.3).endpoints(a, b))


def GND(d, xy):
    d.add(elm.Ground().scale(SC).at(xy))


def HOP(d, xy, r=0.18):
    """Wire hop (semicircle) over a crossing wire at xy, for a horizontal wire."""
    e = elm.Element()
    e.segments.append(SegmentArc((0, 0), 2 * r, 2 * r, theta1=0, theta2=180))
    d.add(e.at(xy))


# ------------------------------------------------------------------ 28.1 circuits
def q28_1_q1():
    with CD() as d:
        W(d, (0, 0), (0, 1.5))
        CELL(d, (0, 2.5), (0, 1.5))
        W(d, (0, 2.5), (0, 4))
        R(d, (0, 4), (5, 4))
        T(d, (2.6, 4.55), "2 Ω")
        W(d, (5, 4), (7.5, 4))
        D(d, (5, 4), (5, 2.3))
        T(d, (4.4, 3.15), "$D_1$", ha="right")
        R(d, (5, 2.3), (5, 0))
        T(d, (4.45, 1.1), "3Ω", ha="right")
        D(d, (7.5, 2.3), (7.5, 4))
        T(d, (8.1, 3.15), "$D_2$", ha="left")
        R(d, (7.5, 2.3), (7.5, 0))
        T(d, (8.05, 1.1), "2Ω", ha="left")
        W(d, (0, 0), (7.5, 0))
        T(d, (-0.65, 1.85), "15 V", ha="right")
        save(d, "28.1_Q1")


def q28_1_q11():
    with CD() as d:
        W(d, (0, 0), (0, 2))
        D(d, (0, 2), (3, 2))
        R(d, (3, 2), (6, 2))
        T(d, (4.5, 2.55), "20 Ω")
        W(d, (6, 2), (7, 2), (7, 0))
        CELL(d, (0, 0), (4, 0))
        R(d, (4, 0), (7, 0))
        T(d, (2.0, -0.9), "10 V")
        T(d, (5.5, -0.9), "10 Ω")
        save(d, "28.1_Q11")


def q28_1_q12():
    with CD() as d:
        # both batteries: short plate (-) on top, long plate (+) below, + side grounded
        W(d, (0, 2.6), (0, 2.2))
        CELL(d, (0, 0.2), (0, 2.2))
        GND(d, (0, 0.2))
        T(d, (-0.6, 1.65), "2 V", ha="right")
        D(d, (0, 2.6), (3.0, 2.6))
        R(d, (3.0, 2.6), (6.5, 2.6))
        T(d, (4.75, 3.15), "200 Ω")
        W(d, (6.5, 2.6), (6.5, 2.2))
        CELL(d, (6.5, 0.2), (6.5, 2.2))
        GND(d, (6.5, 0.2))
        T(d, (7.1, 1.65), "4 V", ha="left")
        save(d, "28.1_Q12")


def q28_1_q14():
    with CD() as d:
        W(d, (0, 0), (0, 1.0))
        CELL(d, (0, 2.0), (0, 1.0))
        W(d, (0, 2.0), (0, 3))
        T(d, (-0.65, 1.3), "20 V", ha="right")
        W(d, (0, 3), (1.0, 3))
        ARR(d, (0.75, 3), "r")
        T(d, (0.75, 2.45), "$I$")
        R(d, (1.0, 3), (4, 3))
        T(d, (2.5, 3.55), "4 kΩ")
        D(d, (4, 3), (7, 3))
        ARR(d, (6.75, 3), "r", 0.4)
        T(d, (6.75, 3.55), "$I_2$")
        W(d, (7, 3), (9.5, 3))
        # 10 kΩ under the first node, with I1 flowing down
        W(d, (4, 3), (4, 2.3))
        ARR(d, (4, 2.65), "d", 0.4)
        T(d, (4.3, 2.55), "$I_1$", ha="left")
        R(d, (4, 2.3), (4, 0))
        T(d, (4.5, 1.15), "10 kΩ", ha="left")
        R(d, (7, 3), (7, 0))
        T(d, (7.5, 1.5), "10 kΩ", ha="left")
        D(d, (9.5, 3), (9.5, 0))
        W(d, (0, 0), (9.5, 0))
        save(d, "28.1_Q14")


def q28_1_q16():
    with CD() as d:
        W(d, (0, 0), (0, 4))
        W(d, (7, 0), (7, 4))
        D(d, (0, 4), (3.6, 4))
        T(d, (1.8, 4.6), "$\\mathbf{D_1}$")
        R(d, (3.6, 4), (7, 4))
        T(d, (5.3, 4.7), "150Ω")
        D(d, (3.6, 2), (0, 2))
        T(d, (1.8, 2.6), "$\\mathbf{D_2}$")
        R(d, (3.6, 2), (7, 2))
        T(d, (5.3, 2.7), "50Ω")
        CELL(d, (0, 0), (3.6, 0))
        T(d, (1.35, 0.6), "+")
        T(d, (2.3, 0.6), "−")
        T(d, (1.6, -0.8), "6V")
        R(d, (3.6, 0), (7, 0))
        T(d, (5.3, -0.8), "100Ω")
        save(d, "28.1_Q16")


def q28_1_q18():
    with CD() as d:
        # (a)
        T(d, (-0.6, 2.6), "(a)", ha="left")
        DOT(d, (0, 0), open_=True)
        T(d, (-0.3, -0.3), "+5V", ha="right")
        D(d, (1.9, 0), (0, 0))
        R(d, (1.9, 0), (3.6, 0))
        T(d, (2.75, 0.65), "R")
        W(d, (3.6, 0), (4.6, 0), (4.6, 2.0))
        DOT(d, (4.6, 2.0), open_=True)
        T(d, (4.85, 2.0), "+10V", ha="left")
        # (b)
        bx, by = 8.0, 1.6
        T(d, (bx - 0.6, 2.6), "(b)", ha="left")
        DOT(d, (bx, by), open_=True)
        T(d, (bx, by - 0.6), "−10V")
        R(d, (bx, by), (bx + 2.4, by))
        T(d, (bx + 1.2, by + 0.65), "R")
        D(d, (bx + 2.4, by), (bx + 4.0, by))
        W(d, (bx + 4.0, by), (bx + 4.6, by), (bx + 4.6, by - 1.8))
        GND(d, (bx + 4.6, by - 1.8))
        # (c)
        cy = -3.6
        T(d, (-0.6, cy + 0.9), "(c)", ha="left")
        DOT(d, (0, cy), open_=True)
        T(d, (0.1, cy - 0.6), "−12V")
        D(d, (1.9, cy), (0, cy))
        W(d, (1.9, cy), (4.6, cy))
        T(d, (2.9, cy + 0.45), "R")
        W(d, (4.6, cy), (4.6, cy - 0.5))
        R(d, (4.6, cy - 0.5), (4.6, cy - 2.4))
        T(d, (4.95, cy - 1.45), "R", ha="left")
        DOT(d, (4.6, cy - 2.6), open_=True)
        W(d, (4.6, cy - 2.4), (4.6, cy - 2.5))
        T(d, (4.85, cy - 2.65), "−5V", ha="left")
        # (d)
        dx = 8.0
        T(d, (dx - 0.6, cy + 0.9), "(d)", ha="left")
        W(d, (dx, cy - 0.7), (dx, cy))
        GND(d, (dx, cy - 0.7))
        W(d, (dx, cy), (dx + 1.2, cy))
        D(d, (dx + 1.2, cy), (dx + 2.6, cy))
        W(d, (dx + 2.6, cy), (dx + 4.6, cy), (dx + 4.6, cy - 0.5))
        R(d, (dx + 4.6, cy - 0.5), (dx + 4.6, cy - 2.4))
        T(d, (dx + 4.95, cy - 1.45), "R", ha="left")
        W(d, (dx + 4.6, cy - 2.4), (dx + 4.6, cy - 2.5))
        DOT(d, (dx + 4.6, cy - 2.6), open_=True)
        T(d, (dx + 4.85, cy - 2.65), "+5V", ha="left")
        save(d, "28.1_Q18")


def q28_1_q20():
    with CD() as d:
        W(d, (0, 0), (0, 1.5))
        CELL(d, (0, 2.5), (0, 1.5))
        T(d, (-0.65, 2.0), "V", ha="right")
        W(d, (0, 2.5), (0, 4))
        CAP(d, (0, 4), (2.4, 4))
        W(d, (2.4, 4), (3.5, 4))
        T(d, (1.6, 4.6), "$C_1$")
        D(d, (3.5, 0), (3.5, 4))
        D(d, (3.5, 4), (7, 4))
        CAP(d, (7, 4), (7, 0))
        T(d, (7.45, 2.0), "$C_2$", ha="left")
        W(d, (0, 0), (7, 0))
        save(d, "28.1_Q20")


def q28_1_q24():
    with CD() as d:
        W(d, (0, 0), (0, 2.6))
        CELL(d, (0, 3.6), (0, 2.6))
        W(d, (0, 3.6), (0, 6))
        T(d, (0.6, 3.0), "5 V", ha="left")
        W(d, (0, 6), (6, 6))
        W(d, (0, 0), (6, 0))
        D(d, (3, 6), (3, 3))
        D(d, (3, 0), (3, 3))
        R(d, (3, 3), (6, 3))
        T(d, (4.5, 2.3), "R = 50 Ω")
        D(d, (6, 3), (6, 6))
        D(d, (6, 3), (6, 0))
        save(d, "28.1_Q24")


def q28_1_q38():
    with CD() as d:
        W(d, (0, 0), (0, 4))
        W(d, (8, 0), (8, 4))
        D(d, (0, 4), (3.6, 4))
        T(d, (1.8, 4.75), "$D_1$")
        R(d, (3.6, 4), (8, 4))
        T(d, (5.8, 4.75), "$R_1$")
        D(d, (0, 2), (2.9, 2))
        T(d, (1.45, 2.75), "$D_2$")
        D(d, (5.0, 2), (2.9, 2))
        T(d, (3.95, 2.75), "$D_3$")
        R(d, (5.0, 2), (8, 2))
        T(d, (6.5, 1.25), "$R_2$")
        CELL(d, (0, 0), (3.2, 0))
        T(d, (1.6, -0.8), "6 V")
        R(d, (3.2, 0), (8, 0))
        T(d, (5.6, -0.8), "$R_3$")
        save(d, "28.1_Q38")


def q28_1_q40():
    with CD() as d:
        # left sub-loop: D2 + 3 Ω on the left, 3 Ω on the right
        W(d, (0, 4.4), (2.2, 4.4))
        W(d, (0, 1.0), (2.2, 1.0))
        D(d, (0, 2.9), (0, 4.4))
        T(d, (-0.55, 4.0), "$D_2$", ha="right")
        R(d, (0, 1.0), (0, 2.9))
        T(d, (-0.55, 1.95), "3 Ω", ha="right")
        R(d, (2.2, 1.0), (2.2, 4.4))
        T(d, (2.75, 2.7), "3 Ω", ha="left")
        # main loop
        W(d, (1.0, 4.4), (1.0, 5.4))
        R(d, (1.0, 5.4), (4.6, 5.4))
        T(d, (2.8, 6.1), "3 Ω")
        D(d, (7.0, 5.4), (4.6, 5.4))
        T(d, (5.9, 6.15), "$D_1$")
        W(d, (7.0, 5.4), (8, 5.4))
        R(d, (8, 5.4), (8, 0))
        T(d, (8.55, 2.7), "2 Ω", ha="left")
        W(d, (1.0, 1.0), (1.0, 0), (4.0, 0))
        CELL(d, (6.0, 0), (4.0, 0))
        T(d, (5.0, -0.8), "8 V")
        W(d, (6.0, 0), (8, 0))
        save(d, "28.1_Q40")


def q28_1_q43():
    with CD() as d:
        DOT(d, (0, 8.2), open_=True)
        T(d, (-0.4, 8.35), "P", ha="right")
        W(d, (0, 8.2), (0, 7.3))
        ARR(d, (0, 7.75), "d", 0.5)
        T(d, (0.35, 7.75), "0.4 mA", ha="left")
        R(d, (0, 7.3), (0, 5.3))
        T(d, (0.55, 6.3), "5 kΩ", ha="left")
        D(d, (0, 5.3), (0, 3.4))
        R(d, (0, 3.4), (0, 1.0))
        T(d, (0.55, 2.2), "10 kΩ", ha="left")
        W(d, (0, 1.0), (0, 0.6))
        DOT(d, (0, 0.6))
        T(d, (-0.4, 0.5), "Q", ha="right")
        save(d, "28.1_Q43")


def q28_1_q44():
    with CD() as d:
        W(d, (0, 0), (0, 4.6))
        CELL(d, (0, 5.4), (0, 4.6))
        T(d, (-0.65, 5.0), "20V", ha="right")
        W(d, (0, 5.4), (0, 7))
        ARR(d, (0, 6.3), "u", 0.5)
        T(d, (-0.35, 6.4), "$I$", ha="right")
        W(d, (0, 7), (4, 7))
        R(d, (4, 7), (4, 4.1))
        T(d, (4.55, 5.6), "10Ω", ha="left")
        W(d, (3, 4.1), (5, 4.1))
        W(d, (3, 1.2), (5, 1.2))
        R(d, (3, 4.1), (3, 1.2))
        T(d, (2.45, 2.6), "10Ω", ha="right")
        D(d, (5, 2.7), (5, 4.1))
        R(d, (5, 2.7), (5, 1.2))
        T(d, (5.55, 1.9), "10Ω", ha="left")
        W(d, (4, 1.2), (4, 0), (0, 0))
        save(d, "28.1_Q44")


def q28_1_q46():
    with CD() as d:
        d.add(elm.SourceSin().scale(SC).endpoints((0, 0), (0, 3.5)))
        W(d, (0, 3.5), (1.0, 3.5))
        DOT(d, (1.0, 3.5))
        T(d, (1.0, 4.0), "A")
        D(d, (1.0, 3.5), (5, 3.5))
        W(d, (5, 3.5), (7, 3.5))
        DOT(d, (7, 3.5))
        CAP(d, (5, 3.5), (5, 0))
        T(d, (4.35, 1.75), "C", ha="right")
        W(d, (0, 0), (1.0, 0))
        DOT(d, (1.0, 0))
        T(d, (1.0, -0.5), "B")
        W(d, (1.0, 0), (7, 0))
        DOT(d, (7, 0))
        DARR(d, (7.4, 0.4), (7.4, 3.1))
        T(d, (7.65, 1.9), "$V_0$", ha="left")
        save(d, "28.1_Q46")


def q28_1_q47():
    with CD() as d:
        DOT(d, (0, 3.0))
        T(d, (0, 3.5), "$V_1$")
        R(d, (0, 3.0), (3.4, 3.0))
        T(d, (1.9, 3.6), "10 kΩ")
        T(d, (3.4, 3.3), "+6V", ha="left")
        D(d, (0, 0), (0, 3.0))
        T(d, (0.55, 1.6), "$D_2$", ha="left")
        DOT(d, (-4.0, 0))
        T(d, (-4.0, -0.5), "+6 V")
        D(d, (-4.0, 0), (0, 0))
        T(d, (-2.0, -0.8), "$D_1$")
        W(d, (0, 0), (2.0, 0))
        DOT(d, (2.0, 0))
        T(d, (2.25, 0), "$V_2$", ha="left")
        R(d, (0, 0), (0, -3.0))
        DOT(d, (0, -3.0))
        T(d, (0.3, -3.0), "+3V", ha="left")
        save(d, "28.1_Q47")


def q28_1_q48():
    with CD() as d:
        DOT(d, (0, 0))
        T(d, (0, 0.5), "A")
        W(d, (0, 0), (0.8, 0))
        ARR(d, (0.6, 0), "r", 0.6)
        T(d, (0.8, -0.6), "0.2 mA")
        R(d, (0.8, 0), (3.8, 0))
        T(d, (2.3, 0.7), "5 kΩ")
        W(d, (3.8, 0), (3.8, -1.0))
        CAP(d, (3.8, -1.0), (3.8, -3.6))
        T(d, (4.1, -3.55), "C", ha="left")
        D(d, (3.8, 0), (6.3, 0))
        R(d, (6.3, 0), (9.4, 0))
        T(d, (7.85, 0.7), "5 kΩ")
        W(d, (9.4, 0), (10, 0))
        DOT(d, (10, 0))
        T(d, (10, 0.5), "B")
        save(d, "28.1_Q48")


def q28_1_q49():
    with CD() as d:
        W(d, (0, 0), (0, 3.1))
        CELL(d, (0, 4.1), (0, 3.1))
        T(d, (-0.65, 3.1), "30 V", ha="right")
        W(d, (0, 4.1), (0, 6), (3.4, 6))
        R(d, (3.4, 6), (3.4, 3.0))
        T(d, (3.95, 4.5), "10 Ω", ha="left")
        R(d, (3.4, 3.0), (3.4, 0))
        T(d, (3.95, 1.5), "10 Ω", ha="left")
        D(d, (3.4, 3.0), (7.0, 3.0))
        W(d, (7.0, 3.0), (8, 3.0))
        R(d, (8, 3.0), (8, 0))
        T(d, (8.55, 1.5), "10 Ω", ha="left")
        W(d, (0, 0), (8, 0))
        DARR(d, (2.8, 0.25), (2.8, 2.85))
        T(d, (2.45, 1.6), "$V_{AB}$", ha="right")
        save(d, "28.1_Q49")


def q28_1_q56():
    """The scan labels the bottom-branch resistor "20 V": drawn as 20 Ω (a misprint)."""
    with CD() as d:
        W(d, (0, 0), (0, 3))
        ARR(d, (0, 0.75), "u", 0.5)
        T(d, (-0.35, 0.75), "I", ha="right")
        ARR(d, (0, 2.25), "u", 0.5)
        T(d, (-0.35, 2.3), "$I_2$", ha="right")
        W(d, (6, 0), (6, 3))
        R(d, (0, 3), (3.2, 3))
        T(d, (1.6, 3.7), "10 Ω")
        D(d, (6, 3), (3.2, 3))
        T(d, (4.6, 3.6), "$D_2$")
        W(d, (0, 1.5), (0.4, 1.5))
        ARR(d, (0.75, 1.5), "r", 0.5)
        T(d, (0.75, 0.95), "$I_1$")
        D(d, (0.4, 1.5), (3.2, 1.5))
        T(d, (1.8, 2.1), "$D_1$")
        R(d, (3.2, 1.5), (6, 1.5))
        T(d, (4.6, 0.8), "30 Ω")
        R(d, (0, 0), (3.2, 0))
        T(d, (1.6, -0.8), "20 Ω")
        CELL(d, (3.2, 0), (6, 0))
        T(d, (4.6, -0.8), "5 V")
        save(d, "28.1_Q56")


def q28_1_q23():
    fig, ax = plt.subplots(figsize=(5.4, 3.9), dpi=DPI)
    ax.set_aspect("equal")
    ax.axis("off")
    kw = dict(color=INK, lw=LW)
    ax.add_patch(FancyArrowPatch((-150, 0), (165, 0), arrowstyle="<|-|>", mutation_scale=12, **kw))
    ax.add_patch(FancyArrowPatch((0, -120), (0, 150), arrowstyle="<|-|>", mutation_scale=12, **kw))
    # forward branch: passes 10 mA at 0.5 V and 15 mA at 0.8 V (positions as printed)
    x = np.linspace(0, 140, 200)
    ax.plot(x, 0.003845 * x ** 2 + 0.342 * x, **kw)
    for xv, yv, lab, ylab in [(80, 52, "0.5 V", "10"), (122, 99, "0.8 V", "15")]:
        ax.plot([0, xv], [yv, yv], ls=(0, (3, 2)), color=INK, lw=1.0)
        ax.plot([xv, xv], [0, yv], ls=(0, (3, 2)), color=INK, lw=1.0)
        ax.plot([-4, 0], [yv, yv], color=INK, lw=1.0)
        ax.text(-6, yv, ylab, ha="right", va="center", fontsize=11, color=INK)
        ax.text(xv + (-6 if xv < 100 else 6), -6, lab, ha="center", va="top", fontsize=9, color=INK)
    # reverse branch: about -2 μA (μA scale below the axis)
    xr = np.linspace(-148, 0, 200)
    ax.plot(xr, -43 * (1 - np.exp(xr / 7.0)), **kw)
    ax.plot([-4, 4], [-43, -43], color=INK, lw=1.0)
    ax.text(6, -52, "−2 μA", ha="left", va="center", fontsize=11, color=INK)
    ax.plot([-88, -88], [-4, 4], color=INK, lw=1.0)
    ax.text(-88, 8, "−20V", ha="center", va="bottom", fontsize=11, color=INK)
    ax.text(0, 158, "I(mA)", ha="center", va="bottom", fontsize=11, color=INK)
    ax.text(0, -128, "I(μA)", ha="center", va="top", fontsize=11, color=INK)
    ax.text(-156, 0, "V(volt)", ha="right", va="center", fontsize=11, color=INK)
    ax.text(170, 0, "V(volt)", ha="left", va="center", fontsize=11, color=INK)
    ax.set_xlim(-215, 230)
    ax.set_ylim(-150, 180)
    fig.savefig(out("28.1_Q23"), facecolor="white", bbox_inches="tight", pad_inches=0.1)
    plt.close(fig)


# ------------------------------------------------------------------ 28.2
def q28_2_q2():
    with CD() as d:
        DARR(d, (0, 0), (0, 3))
        T(d, (-0.35, 1.5), "100 V", ha="right")
        R(d, (0, 3), (3.9, 3))
        T(d, (2.0, 3.7), "$R_S$")
        W(d, (3.9, 3), (6, 3), (6, 0))
        ARR(d, (5.1, 3), "r", 0.5)
        T(d, (5.1, 3.55), "$I_L$")
        W(d, (3.9, 3), (3.9, 2.3))
        ARR(d, (3.9, 2.55), "d", 0.5)
        T(d, (3.6, 2.6), "$I_Z$", ha="right")
        Z(d, (3.9, 0), (3.9, 2.3))
        R(d, (6, 3), (6, 0))
        T(d, (6.55, 1.5), "$R_L$ = 8KΩ", ha="left")
        W(d, (0, 0), (6, 0))
        save(d, "28.2_Q2")


def q28_2_q5():
    with CD() as d:
        W(d, (0, 0), (0, 1.0))
        CELL(d, (0, 2.0), (0, 1.0))
        T(d, (-0.65, 1.25), "18 V", ha="right")
        W(d, (0, 2.0), (0, 3))
        R(d, (0, 3), (4.2, 3))
        T(d, (2.3, 3.7), "1 kΩ")
        W(d, (4.2, 3), (7.2, 3))
        Z(d, (4.2, 0), (4.2, 3))
        T(d, (3.7, 1.45), "6 V", ha="right")
        R(d, (7.2, 3), (7.2, 0))
        T(d, (7.75, 1.5), "1 kΩ", ha="left")
        W(d, (0, 0), (7.2, 0))
        save(d, "28.2_Q5")


def q28_2_q13():
    with CD() as d:
        # two-cell battery, long plate on top
        W(d, (0, 0), (0, 0.6))
        d.add(elm.Battery().scale(SC).endpoints((0, 3.0), (0, 0.6)))
        T(d, (-0.65, 1.0), "60 V", ha="right")
        W(d, (0, 3.0), (0, 3.4))
        R(d, (0, 3.4), (4.9, 3.4))
        T(d, (2.7, 4.1), "4 kΩ")
        W(d, (4.9, 3.4), (8, 3.4))
        # zener as printed: triangle points DOWN, bent bar at the bottom
        Z(d, (4.9, 3.4), (4.9, 0))
        R(d, (8, 3.4), (8, 0))
        T(d, (8.55, 1.9), "$R_L$ = 2kΩ", ha="left")
        W(d, (0, 0), (8, 0))
        save(d, "28.2_Q13")


def axes_arrows(ax, x0, y0, x1, y1, xl="V", yl="I", lw=LW):
    ax.add_patch(FancyArrowPatch((x0, y0), (x1, y0), arrowstyle="-|>", mutation_scale=11, color=INK, lw=lw))
    ax.add_patch(FancyArrowPatch((x0, y0), (x0, y1), arrowstyle="-|>", mutation_scale=11, color=INK, lw=lw))
    if xl:
        ax.text(x1 + 0.04, y0, xl, ha="left", va="center", fontsize=12, color=INK)
    if yl:
        ax.text(x0 - 0.06, y1, yl, ha="right", va="center", fontsize=12, color=INK)


def q28_2_q3():
    fig, ax = plt.subplots(figsize=(3.4, 2.8), dpi=DPI)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.plot([-1.0, 1.25], [0, 0], color=INK, lw=LW)
    ax.plot([0, 0], [-0.85, 0.65], color=INK, lw=LW)
    x = np.linspace(-1.0, 0, 200)
    for L, s in [(0.42, 0.30), (0.70, 0.28), (0.93, 0.26)]:
        y = -L * (1 - np.exp(x / s)) - 0.05 * (np.exp(x / 0.05))
        ax.plot(x, y, color=INK, lw=LW)
    ax.text(-0.12, 0.55, "i", ha="right", va="center", fontsize=12, color=INK)
    ax.text(0.95, -0.12, "V", ha="center", va="top", fontsize=12, color=INK)
    ax.set_xlim(-1.1, 1.35)
    ax.set_ylim(-0.95, 0.75)
    fig.savefig(out("28.2_Q3"), facecolor="white", bbox_inches="tight", pad_inches=0.1)
    plt.close(fig)


def diode_sym(ax, cx, cy, s=0.35, fill="white"):
    """Diode symbol pointing right, centred at (cx, cy); returns the bar x."""
    tri = Polygon([(cx - s, cy - s), (cx - s, cy + s), (cx + s * 0.9, cy)], closed=True,
                  fc=fill, ec=INK, lw=LW, zorder=3)
    ax.add_patch(tri)
    bx = cx + s * 0.9
    return bx


def q28_2_q4():
    fig, axes = plt.subplots(2, 2, figsize=(5.2, 2.9), dpi=DPI)
    for k, ax in enumerate(axes.flat):
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_xlim(-0.5, 4.5)
        ax.set_ylim(-0.9, 1.9)
        ax.text(-0.4, 0, f"{k + 1})", ha="left", va="center", fontsize=12, color=INK)
        cx, cy, s = 2.0, 0.0, 0.36
        bx = diode_sym(ax, cx, cy, s)
        ax.plot([0.3, cx - s], [cy, cy], color=INK, lw=LW)
        if k == 0:  # bar bent at the top end (Zener-style)
            ax.plot([bx, bx], [cy - s - 0.12, cy + s], color=INK, lw=LW)
            ax.plot([bx, bx + 0.28], [cy + s, cy + s + 0.28], color=INK, lw=LW)
            ax.plot([bx, 3.7], [cy, cy], color=INK, lw=LW)
        elif k == 1:  # bar, second plate, diagonal arrow through
            ax.plot([bx, bx], [cy - s, cy + s], color=INK, lw=LW)
            p2 = bx + 0.22
            ax.plot([p2, p2], [cy - s, cy + s], color=INK, lw=LW)
            ax.plot([bx, p2], [cy, cy], color=INK, lw=LW)
            ax.plot([p2, 3.7], [cy, cy], color=INK, lw=LW)
            ax.add_patch(FancyArrowPatch((bx - 0.25, cy - s - 0.12), (p2 + 0.3, cy + s + 0.35),
                                         arrowstyle="-|>", mutation_scale=10, color=INK, lw=1.3))
        else:  # three parallel arrows above: towards (3) or away from (4) the diode
            ax.plot([bx, bx], [cy - s, cy + s], color=INK, lw=LW)
            ax.plot([bx, 3.7], [cy, cy], color=INK, lw=LW)
            for j in range(3):
                ox = cx - 0.55 + j * 0.3
                near, far = (ox + 0.25, cy + s + 0.18), (ox - 0.1, cy + s + 0.85)
                a, b = (far, near) if k == 2 else (near, far)
                ax.add_patch(FancyArrowPatch(a, b, arrowstyle="-|>", mutation_scale=10, color=INK, lw=1.6))
    fig.tight_layout()
    fig.savefig(out("28.2_Q4"), facecolor="white")
    plt.close(fig)


def smooth(pts, n=20):
    """Catmull-Rom curve through the points."""
    p = [pts[0]] + list(pts) + [pts[-1]]
    xs, ys = [], []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = (np.array(q, float) for q in p[i - 1:i + 3])
        for t in np.linspace(0, 1, n, endpoint=False):
            c = 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t ** 2
                       + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3)
            xs.append(c[0]); ys.append(c[1])
    xs.append(pts[-1][0]); ys.append(pts[-1][1])
    return xs, ys


def q28_2_q6():
    fig, axes = plt.subplots(2, 2, figsize=(4.0, 2.9), dpi=DPI)
    t = np.linspace(0, 1, 200)
    curves = [
        (t, 0.95 * t ** 2.2),
        (t, 0.95 * t),
        None,
        (t, 0.8 * (1 - np.exp(-t / 0.3)) / (1 - math.exp(-1 / 0.3))),
    ]
    for k, ax in enumerate(axes.flat):
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_xlim(-0.55, 1.35)
        ax.set_ylim(-0.15, 1.15)
        axes_arrows(ax, 0, 0, 1.2, 1.05)
        ax.text(-0.5, 0.55, f"{k + 1})", ha="left", va="center", fontsize=12, color=INK)
        if k == 2:  # straight rise, a rounded peak, a fall, then a small upturn
            pts = [(0, 0), (0.3, 0.45), (0.45, 0.68), (0.6, 0.78), (0.72, 0.7), (0.8, 0.52),
                   (0.86, 0.42), (0.92, 0.45), (0.95, 0.52)]
            xs, ys = smooth(pts)
            ax.plot(xs, ys, color=INK, lw=LW)
        else:
            x, y = curves[k]
            ax.plot(x, y, color=INK, lw=LW)
    fig.tight_layout()
    fig.savefig(out("28.2_Q6"), facecolor="white")
    plt.close(fig)


def mpl_resistor_v(ax, x, y0, y1, n=6, w=0.07):
    ys = np.linspace(y0, y1, 2 * n + 1)
    xs = [x] + [x + (w if i % 2 else -w) for i in range(1, 2 * n)] + [x]
    ax.plot(xs, ys, color=INK, lw=LW)


def q28_2_q8():
    fig = plt.figure(figsize=(4.2, 5.4), dpi=DPI)
    # AC input
    a0 = fig.add_axes([0.25, 0.79, 0.55, 0.19])
    a0.axis("off")
    a0.set_xlim(-0.3, 2.5)
    a0.set_ylim(-1.3, 1.3)
    a0.plot([0, 0], [-1.25, 1.25], color=INK, lw=1.2)
    a0.add_patch(FancyArrowPatch((0, 0), (2.4, 0), arrowstyle="-|>", mutation_scale=10, color=INK, lw=1.2))
    tt = np.linspace(0, 2.0, 200)
    a0.plot(tt, np.sin(math.pi * tt), color=INK, lw=LW)
    a0.text(-0.08, 0, "O", ha="right", va="center", fontsize=10, color=INK, fontweight="bold")
    a0.text(-0.08, 0.75, "AC input", ha="right", va="center", fontsize=10, color=INK, fontweight="bold")
    a0.text(2.45, 0, "t", ha="left", va="center", fontsize=10, color=INK, style="italic", fontweight="bold")
    # block diagram
    a1 = fig.add_axes([0.05, 0.52, 0.9, 0.25])
    a1.axis("off")
    a1.set_xlim(0, 6.2)
    a1.set_ylim(-0.4, 2.4)
    for yv in (0.3, 1.7):
        a1.plot([0.3, 1.6], [yv, yv], color=INK, lw=LW)
        a1.plot(0.3, yv, "o", ms=4, mfc="white", mec=INK)
        a1.plot([2.8, 5.6], [yv + (0.15 if yv > 1 else -0.1), yv + (0.15 if yv > 1 else -0.1)], color=INK, lw=LW)
        a1.plot(5.6, yv + (0.15 if yv > 1 else -0.1), "o", ms=4, mfc="white", mec=INK)
    a1.add_patch(Rectangle((1.6, -0.1), 1.2, 2.1, fc="white", ec=INK, lw=LW))
    a1.text(2.2, 1.0, "Full wave\n\nRectifier", ha="center", va="center", fontsize=9.5, color=INK, fontweight="bold")
    a1.text(1.0, 1.0, "AC", ha="center", va="center", fontsize=10, color=INK, fontweight="bold")
    top, bot = 1.85, 0.2
    a1.plot([3.6, 3.6], [bot, 1.1], color=INK, lw=LW)
    a1.plot([3.6, 3.6], [0.9, top], color=INK, lw=LW)
    a1.plot([3.4, 3.8], [1.1, 1.1], color=INK, lw=LW)
    a1.plot([3.4, 3.8], [0.9, 0.9], color=INK, lw=LW)
    a1.text(3.9, 1.0, "C", ha="left", va="center", fontsize=10, color=INK, fontweight="bold")
    a1.plot([4.3, 4.3], [top, 1.6], color=INK, lw=LW)
    mpl_resistor_v(a1, 4.3, 1.6, 0.6)
    a1.plot([4.3, 4.3], [0.6, bot], color=INK, lw=LW)
    a1.text(4.45, 1.45, "$R_L$", ha="left", va="center", fontsize=10, color=INK)
    a1.text(4.45, 0.9, "Output", ha="left", va="center", fontsize=9.5, color=INK, fontweight="bold")
    # options
    x = np.linspace(0, 1, 300)
    opts = [
        np.where(x < 0.42, 0.75 * np.sin(math.pi * x / 0.42), -0.32 + 0.32 * np.exp(-(x - 0.42) / 0.05)) ,
        -0.42 * (1 - np.exp(-x / 0.03)),
        np.where(x < 0.4, -0.5 * np.sin(math.pi * x / 0.4), 0.5 * (1 - np.exp(-(x - 0.4) / 0.06))),
        0.42 * (1 - np.exp(-x / 0.04)) + 0.05 * np.exp(-((x - 0.12) / 0.06) ** 2) + 0.025 * np.sin(2 * math.pi * x / 0.35),
    ]
    pos = [[0.08, 0.27, 0.4, 0.2], [0.55, 0.27, 0.4, 0.2], [0.08, 0.03, 0.4, 0.2], [0.55, 0.03, 0.4, 0.2]]
    for k, (y, p) in enumerate(zip(opts, pos)):
        ax = fig.add_axes(p)
        ax.axis("off")
        ax.set_xlim(-0.25, 1.15)
        ax.set_ylim(-0.75, 0.9)
        ax.plot([0, 0], [-0.7, 0.85], color=INK, lw=1.0)
        ax.add_patch(FancyArrowPatch((0, 0), (1.05, 0), arrowstyle="-|>", mutation_scale=10, color=INK, lw=1.2))
        ax.plot(x, y, color=INK, lw=LW)
        ax.text(-0.04, 0.12, "O", ha="right", va="bottom", fontsize=11, color=INK)
        ax.text(1.08, 0, "t", ha="left", va="center", fontsize=11, color=INK)
        ax.text(-0.22, -0.55, f"{k + 1})", ha="left", va="center", fontsize=12, color=INK)
    fig.savefig(out("28.2_Q8"), facecolor="white")
    plt.close(fig)


# ------------------------------------------------------------------ 28.3 logic
def NOTG(d, a, b, scale=0.7):
    """NOT gate drawn on the wire from a to b (body centred, no stray leads)."""
    d.add(logic.Not(scale=scale).endpoints(a, b))


def g(d, G, at, anchor="in1", **kw):
    e = G(**kw).right().at(at).anchor(anchor)
    d.add(e)
    return e


def q28_3_q7():
    with LD() as d:
        DOT(d, (0, 0)); T(d, (-0.2, 0.05), "A", ha="right")
        DOT(d, (0, -0.5)); T(d, (-0.2, -0.45), "B", ha="right")
        n = g(d, logic.Nor, (1.0, 0))
        W(d, (0, 0), (1.0, 0)); W(d, (0, -0.5), (1.0, -0.5))
        o = g(d, logic.Or, (n.out[0] + 0.6, n.out[1]))
        W(d, n.out, o.in1)
        cx = n.out[0] - 0.2
        W(d, (cx, -0.75), (o.in2[0], -0.75), o.in2)
        T(d, (cx - 0.05, -1.0), "C", ha="right")
        W(d, o.out, (o.out[0] + 1.2, o.out[1]))
        DOT(d, (o.out[0] + 1.2, o.out[1]))
        T(d, (o.out[0] + 1.4, o.out[1]), "Y", ha="left")
        save(d, "28.3_Q7")


def q28_3_q10():
    with LD() as d:
        DOT(d, (0, 0), open_=True); T(d, (-0.3, 0.0), "$\\mathbf{A}$", ha="right")
        DOT(d, (0, -0.5), open_=True); T(d, (-0.3, -0.5), "$\\mathbf{B}$", ha="right")
        o = g(d, logic.Or, (0.7, 0))
        W(d, (0, 0), o.in1); W(d, (0, -0.5), o.in2)
        n = g(d, logic.Nand, (3.6, o.out[1]), scale=1.8)
        W(d, o.out, n.in1)
        y2 = n.in2[1]
        W(d, (0.35, -0.5), (0.35, y2))
        NOTG(d, (0.35, y2), n.in2, scale=0.6)
        W(d, n.out, (n.out[0] + 0.6, n.out[1]))
        T(d, (n.out[0] + 0.7, n.out[1]), "$\\mathbf{C}$", ha="left")
        save(d, "28.3_Q10")


def q28_3_q12():
    with LD() as d:
        T(d, (0.15, 0.22), "$\\mathbf{A}$", ha="left", size=10)
        T(d, (0.15, -0.75), "$\\mathbf{B}$", ha="left", size=10)
        o = g(d, logic.Or, (1.4, 0))
        W(d, (0, 0), o.in1); W(d, (0, -0.5), o.in2)
        T(d, (o.out[0] - 0.7, -0.95), "$\\mathbf{OR}$", size=9)
        a = g(d, logic.And, (4.1, 0.45))
        W(d, (0.6, 0), (0.6, 0.95), (3.6, 0.95), (3.6, a.in1[1]), a.in1)
        W(d, o.out, (3.8, o.out[1]), (3.8, a.in2[1]), a.in2)
        T(d, (a.in1[0] + 0.9, a.in2[1] - 0.6), "$\\mathbf{AND}$", size=9)
        W(d, a.out, (a.out[0] + 0.6, a.out[1]))
        T(d, (a.out[0] + 0.6, a.out[1] + 0.35), "$\\mathbf{Y}$", size=10)
        save(d, "28.3_Q12")


def q28_3_q13():
    with LD() as d:
        for y, s in [(0, "A"), (-0.5, "B"), (-1.2, "C")]:
            T(d, (-0.1, y), f"$\\mathbf{{{s}}}$", ha="right", size=10)
        o = g(d, logic.Or, (0.7, 0))
        W(d, (0, 0), o.in1); W(d, (0, -0.5), o.in2)
        a = g(d, logic.And, (o.out[0] + 0.8, -0.5))
        W(d, o.out, (o.out[0] + 0.35, o.out[1]), (o.out[0] + 0.35, a.in1[1]), a.in1)
        W(d, (0, -1.2), (o.out[0] + 0.35, -1.2), (o.out[0] + 0.35, a.in2[1]), a.in2)
        W(d, a.out, (a.out[0] + 0.4, a.out[1]))
        DOT(d, (a.out[0] + 0.4, a.out[1]))
        T(d, (a.out[0] + 0.4, a.out[1] + 0.35), "$\\mathbf{Y}$", size=10)
        save(d, "28.3_Q13")


def q28_3_q15():
    with LD() as d:
        DOT(d, (0, 0)); T(d, (-0.2, 0.05), "A", ha="right")
        DOT(d, (0, -0.5)); T(d, (-0.2, -0.45), "B", ha="right")
        a = g(d, logic.And, (1.0, 0))
        W(d, (0, 0), a.in1); W(d, (0, -0.5), a.in2)
        DOT(d, (0, -2.4)); T(d, (-0.2, -2.35), "C", ha="right")
        NOTG(d, (0, -2.4), (3.4, -2.4), scale=0.9)
        n = g(d, logic.Nand, (4.2, -1.1))
        W(d, a.out, (3.4, a.out[1]), (3.4, n.in1[1]), n.in1)
        W(d, (3.4, -2.4), (3.4, n.in2[1]), n.in2)
        W(d, n.out, (n.out[0] + 0.8, n.out[1]))
        DOT(d, (n.out[0] + 0.8, n.out[1]))
        T(d, (n.out[0] + 0.8, n.out[1] + 0.4), "Y")
        save(d, "28.3_Q15")


def q28_3_q22():
    with LD() as d:
        T(d, (-0.1, 0.05), "A", ha="right"); T(d, (-0.1, -0.55), "B", ha="right")
        n1 = g(d, logic.Nor, (1.0, 0))
        W(d, (0, 0), n1.in1); W(d, (0, -0.5), n1.in2)
        n2 = g(d, logic.Nor, (n1.out[0] + 1.6, 0))
        # NOR output feeds BOTH inputs of the second NOR (drawn as a box, as printed)
        jx = n1.out[0] + 0.7
        W(d, n1.out, (jx, n1.out[1]))
        W(d, (jx, 0), (jx, -0.5))
        W(d, (jx, 0), n2.in1); W(d, (jx, -0.5), n2.in2)
        end = (n2.out[0] + 2.2, n2.out[1])
        NOTG(d, n2.out, end, scale=0.9)
        DOT(d, end)
        T(d, (end[0] + 0.2, end[1]), "Y", ha="left")
        save(d, "28.3_Q22")


def q28_3_q23():
    with LD() as d:
        specs = [((0, 0), logic.Nand, ("0", "1")), ((5, 0), logic.Nor, ("0", "1")),
                 ((0, -2), logic.Nand, ("1", "1")), ((5, -2), logic.Xnor, ("0", "0"))]
        for k, ((x, y), G, (i1, i2)) in enumerate(specs):
            T(d, (x - 1.3, y - 0.25), f"{k + 1})", ha="left", size=12)
            e = g(d, G, (x + 0.6, y))
            W(d, (x, y), e.in1); W(d, (x, y - 0.5), e.in2)
            T(d, (x - 0.15, y), i1, ha="right", size=10)
            T(d, (x - 0.15, y - 0.5), i2, ha="right", size=10)
            W(d, e.out, (e.out[0] + 0.7, e.out[1]))
        save(d, "28.3_Q23")


def q28_3_q24():
    with CD() as d:
        DOT(d, (0, 5.1)); T(d, (-0.25, 5.1), "A", ha="right")
        DOT(d, (0, 2.9)); T(d, (-0.25, 2.9), "B", ha="right")
        D(d, (0, 5.1), (3.6, 5.1))
        D(d, (0, 2.9), (3.6, 2.9))
        W(d, (3.6, 5.1), (3.6, 2.9))
        W(d, (3.6, 3.9), (5.8, 3.9))
        DOT(d, (5.8, 3.9)); T(d, (5.8, 4.4), "C")
        R(d, (4.5, 3.9), (4.5, 0.6))
        GND(d, (4.5, 0.6))
        save(d, "28.3_Q24")


def q28_3_q25():
    with CD() as d:
        DOT(d, (0, 7.6), open_=True)
        T(d, (-0.35, 7.75), "$\\mathbf{A}$", ha="right")
        W(d, (0, 7.6), (0, 6.9))
        ARR(d, (0, 7.2), "d", 0.5)
        T(d, (0.35, 7.1), "$\\mathbf{0.2\\ mA}$", ha="left")
        R(d, (0, 6.9), (0, 3.9))
        T(d, (0.4, 5.4), "$\\mathbf{5\\ k\\Omega}$", ha="left")
        W(d, (0, 3.9), (0.6, 3.9))
        CAP(d, (0.6, 3.9), (2.2, 3.9))
        D(d, (0, 3.9), (0, 2.2))
        R(d, (0, 2.2), (0, -0.6))
        T(d, (0.4, 0.8), "$\\mathbf{5\\ k\\Omega}$", ha="left")
        DOT(d, (0, -0.6), open_=True)
        T(d, (-0.35, -0.7), "$\\mathbf{B}$", ha="right")
        save(d, "28.3_Q25")


def q28_3_q27():
    with LD() as d:
        # A: NAND(1,1) -> NOT -> OR, whose other input is 0
        y = 0
        T(d, (-1.1, y + 0.2), "A.", ha="left")
        a = g(d, logic.Nand, (0.6, y), scale=1.2)
        for yy in (a.in1[1], a.in2[1]):
            DOT(d, (0, yy)); W(d, (0, yy), (0.6, yy)); T(d, (-0.2, yy), "1", ha="right", size=10)
        nend = (a.out[0] + 1.6, a.out[1])
        NOTG(d, a.out, nend, scale=0.8)
        o = g(d, logic.Or, nend, scale=1.2)
        DOT(d, (o.in2[0] - 0.7, o.in2[1])); W(d, (o.in2[0] - 0.7, o.in2[1]), o.in2)
        T(d, (o.in2[0] - 0.9, o.in2[1]), "0", ha="right", size=10)
        W(d, o.out, (o.out[0] + 0.7, o.out[1])); DOT(d, (o.out[0] + 0.7, o.out[1]))
        # B and C: a NOT on each input, then NAND (B) or AND (C)
        for lab, y, G in [("B.", -1.9, logic.Nand), ("C.", -3.6, logic.And)]:
            T(d, (-1.1, y + 0.2), lab, ha="left")
            e = g(d, G, (1.8, y), scale=1.4)
            for yy, v in [(e.in1[1], "0"), (e.in2[1], "1")]:
                DOT(d, (0, yy)); T(d, (-0.2, yy), v, ha="right", size=10)
                NOTG(d, (0, yy), (1.8, yy), scale=0.55)
            W(d, e.out, (e.out[0] + 0.7, e.out[1])); DOT(d, (e.out[0] + 0.7, e.out[1]))
        save(d, "28.3_Q27")


def q28_3_q28():
    with LD() as d:
        s = 1.4
        DOT(d, (0, 0)); T(d, (-0.2, 0), "A", ha="right")
        DOT(d, (0, -2.7)); T(d, (-0.2, -2.7), "B", ha="right")
        a = g(d, logic.And, (2.5, 0), scale=s)
        o = g(d, logic.Or, (2.5, -2.0), scale=s)
        W(d, (0, 0), a.in1)
        W(d, (0, -2.7), o.in2)
        # A runs down into the OR's upper input, hopping over B's branch at x = 1.6
        W(d, (0.9, 0), (0.9, -2.0), (1.42, -2.0))
        HOP(d, (1.6, -2.0))
        W(d, (1.78, -2.0), o.in1)
        # B runs up into the AND's lower input
        W(d, (1.6, -2.7), (1.6, a.in2[1]), a.in2)
        nend = (a.out[0] + 1.8, a.out[1])
        NOTG(d, a.out, nend, scale=0.7)
        jx = nend[0] + 0.4
        a2 = g(d, logic.And, (jx + 0.6, -0.9), scale=s)
        W(d, nend, (jx, nend[1]), (jx, a2.in1[1]), a2.in1)
        W(d, o.out, (jx + 0.2, o.out[1]), (jx + 0.2, a2.in2[1]), a2.in2)
        W(d, a2.out, (a2.out[0] + 0.9, a2.out[1])); DOT(d, (a2.out[0] + 0.9, a2.out[1]))
        T(d, (a2.out[0] + 1.1, a2.out[1]), "Y", ha="left")
        save(d, "28.3_Q28")


def q28_3_q29():
    with LD() as d:
        # stem: OR(A, NOT B) -> NOT -> C
        DOT(d, (0, 0)); T(d, (-0.2, 0), "A", ha="right")
        DOT(d, (0, -1.0)); T(d, (-0.2, -1.0), "B", ha="right")
        o = g(d, logic.Or, (2.8, 0), scale=2.0)
        W(d, (0, 0), o.in1)
        NOTG(d, (0, -1.0), (1.6, -1.0), scale=0.6)
        W(d, (1.6, -1.0), o.in2)
        cend = (o.out[0] + 1.9, o.out[1])
        NOTG(d, o.out, cend, scale=0.6)
        DOT(d, cend)
        T(d, (cend[0], cend[1] - 0.4), "C")
        # options
        specs = [(logic.Nand, "B"), (logic.Nor, None), (logic.Nand, "A"), (logic.And, "A")]
        for k, (G, inv) in enumerate(specs):
            y = -2.6 - 1.5 * k
            T(d, (-1.4, y - 0.4), f"{k + 1})", ha="left", size=12)
            e = g(d, G, (2.4, y), scale=1.3)
            for yy, nm in [(e.in1[1], "A"), (e.in2[1], "B")]:
                DOT(d, (0, yy)); T(d, (-0.2, yy), nm, ha="right", size=11)
                if inv == nm:
                    NOTG(d, (0, yy), (1.4, yy), scale=0.5)
                    W(d, (1.4, yy), (2.4, yy))
                else:
                    W(d, (0, yy), (2.4, yy))
            W(d, e.out, (e.out[0] + 0.6, e.out[1])); DOT(d, (e.out[0] + 0.6, e.out[1]))
            T(d, (e.out[0] + 0.6, e.out[1] - 0.4), "C", size=11)
        save(d, "28.3_Q29")


def q28_3_q8():
    with CD() as d:
        # +6V through a resistor onto the right rail
        DOT(d, (5.5, 7.95))
        T(d, (5.8, 7.95), "+6V", ha="left")
        R(d, (5.5, 7.95), (5.5, 5.4))
        W(d, (5.5, 5.4), (5.5, 2.4), (6.8, 2.4))
        d.add(elm.Lamp().scale(0.8).endpoints((6.8, 2.4), (6.8, 1.1)))
        T(d, (7.3, 1.75), "LED (Y)", ha="left")
        W(d, (6.8, 1.1), (3.6, 1.1))
        R(d, (3.6, 1.1), (1.2, 1.1))
        T(d, (2.4, 0.6), "R")
        W(d, (1.2, 1.1), (0, 1.1))
        # left rail to ground
        W(d, (0, 4.55), (0, 0.4))
        GND(d, (0, 0.4))
        # switch A (shown at 0), contact 1 wired to the right rail
        for yw, y0, lab, labxy, l0, l1 in [
            (4.55, 5.4, "A", (1.4, 5.0), (3.4, 6.0), (3.55, 4.15)),
            (2.75, 3.55, "B", (1.45, 3.15), (2.75, 3.95), (3.25, 2.2)),
        ]:
            W(d, (0, yw), (2.2, yw), (3.0, y0 - 0.1))
            DOT(d, (3.1, y0), open_=True)
            DOT(d, (3.1, yw), open_=True)
            W(d, (3.2, yw), (5.5, yw))
            T(d, labxy, lab)
            T(d, l0, "0")
            T(d, l1, "1")
        save(d, "28.3_Q8")


# ------------------------------------------------------------------ waveforms
def square(ax, y0, h, edges, start, end, lw=LW):
    """Square wave from `start` to `end`, low at y0, high at y0+h; edges = toggle times; starts low."""
    xs, ys, lvl, x = [start], [y0], 0, start
    for e in edges:
        xs += [e, e]
        ys += [y0 + lvl * h, y0 + (1 - lvl) * h]
        lvl = 1 - lvl
    xs.append(end)
    ys.append(y0 + lvl * h)
    ax.plot(xs, ys, color=INK, lw=lw)


def q28_3_q3():
    fig, ax = plt.subplots(figsize=(4.6, 3.9), dpi=DPI)
    ax.axis("off")
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 8.6)
    for y, s in [(7.6, "A"), (6.9, "B")]:
        ax.plot(0.5, y, "o", ms=4, color=INK)
        ax.text(0.35, y, s, ha="right", va="center", fontsize=12, color=INK, fontweight="bold", style="italic")
        ax.plot([0.5, 3.7], [y, y], color=INK, lw=LW)
    ax.add_patch(Rectangle((3.7, 6.6), 2.9, 1.3, fc="white", ec=INK, lw=LW))
    ax.text(5.15, 7.25, "Logic gate\ncircuit", ha="center", va="center", fontsize=11, color=INK)
    ax.plot([6.6, 8.5], [7.25, 7.25], color=INK, lw=LW)
    ax.plot(8.5, 7.25, "o", ms=4, color=INK)
    ax.text(8.65, 7.25, "C", ha="left", va="center", fontsize=12, color=INK, fontweight="bold", style="italic")
    x0, x1 = 1.4, 6.1  # time span of the waveforms
    t = lambda f: x0 + f * (x1 - x0)
    rows = [("A.", 4.7, [0.245, 0.51, 0.755]), ("B.", 2.75, [0.245, 0.76]), ("C.", 0.8, [0.245, 0.51])]
    for lab, y, ed in rows:
        ax.text(0.3, y + 0.55, lab, ha="left", va="center", fontsize=10, color=INK)
        square(ax, y, 1.35, [t(e) for e in ed], x0, x1)
    fig.savefig(out("28.3_Q3"), facecolor="white", bbox_inches="tight", pad_inches=0.08)
    plt.close(fig)


def q28_3_q4():
    fig, ax = plt.subplots(figsize=(3.9, 2.7), dpi=DPI)
    ax.axis("off")
    # pixel geometry of the scan (y flipped)
    Y = lambda p: -p
    ts = [135, 190, 250, 305]
    def wave(levels, edges, lo, hi):
        xs, ys, x = [70], [], 70
        pts = [70] + edges + [365]
        for i, lv in enumerate(levels):
            yy = Y(hi if lv else lo)
            ax.plot([pts[i], pts[i + 1]], [yy, yy], color=INK, lw=LW)
            if i + 1 < len(levels):
                ax.plot([pts[i + 1], pts[i + 1]], [Y(lo), Y(hi)], color=INK, lw=LW)
    wave([0, 1, 0, 1, 0], ts, 133, 88)        # A
    wave([0, 1, 0], [190, 305], 210, 158)      # B
    wave([1, 0, 1], [135, 305], 290, 240)      # C (low = 290, high = 240)
    for x in ts:
        ax.plot([x, x], [Y(88), Y(290)], color=INK, lw=0.9, ls=(0, (1.5, 1.5)))
    ax.plot([365, 365], [Y(133), Y(240)], color=INK, lw=0.9, ls=(0, (1.5, 1.5)))
    for y, s in [(133, "A"), (210, "B"), (240, "C")]:
        ax.text(55, Y(y), s, ha="right", va="center", fontsize=11, color=INK, fontweight="bold", style="italic")
    ax.set_xlim(30, 375)
    ax.set_ylim(-300, -78)
    ax.set_aspect("equal")
    fig.savefig(out("28.3_Q4"), facecolor="white", bbox_inches="tight", pad_inches=0.08)
    plt.close(fig)


def q28_3_q26():
    fig, axes = plt.subplots(3, 1, figsize=(3.4, 3.6), dpi=DPI)
    T_ = [1.0, 2.0, 3.0, 4.0]
    rows = [("(A)", [2.0, 4.0]), ("(B)", [1.0, 2.0, 3.0, 4.0]), ("(Y)", [3.0, 4.0])]
    for ax, (lab, ed) in zip(axes, rows):
        ax.axis("off")
        ax.set_xlim(-0.8, 5.3)
        ax.set_ylim(-0.75, 1.25)
        ax.plot([0, 0], [0.05, 1.1], color=INK, lw=1.0, ls=(0, (1.5, 1.8)))
        ax.add_patch(FancyArrowPatch((0, 0), (4.85, 0), arrowstyle="-|>", mutation_scale=10, color=INK, lw=LW))
        square(ax, 0, 0.85, ed, 0, 4.25)
        for x in [0] + T_:
            ax.plot(x, 0, "o", ms=3.5, color=INK, zorder=4)
        ax.text(-0.05, -0.35, "O", ha="center", va="center", fontsize=11, color=INK)
        for i, x in enumerate(T_):
            ax.text(x, -0.38, f"$T_{i + 1}$", ha="center", va="center", fontsize=11, color=INK)
        ax.text(5.0, -0.32, "$t$", ha="center", va="center", fontsize=11, color=INK)
        ax.text(-0.35, 0.95, lab, ha="right", va="center", fontsize=11, color=INK, style="italic")
    fig.tight_layout()
    fig.savefig(out("28.3_Q26"), facecolor="white")
    plt.close(fig)


def q28_3_q16():
    with CD() as d:
        W(d, (0, 0), (0, 2.0))
        R(d, (0, 2.0), (3.9, 2.0))
        T(d, (2.3, 2.7), "2.5 Ω")
        W(d, (3.9, 2.0), (3.9, 3.1))
        D(d, (3.9, 3.1), (6.6, 3.1))
        R(d, (6.6, 3.1), (9, 3.1))
        T(d, (7.8, 3.8), "30 Ω")
        R(d, (3.9, 2.0), (9, 2.0))
        T(d, (6.3, 1.25), "10 Ω")
        W(d, (9, 3.1), (9, 0))
        CELL(d, (0, 0), (5.0, 0))
        T(d, (2.9, -0.75), "30 V", ha="left")
        W(d, (5.0, 0), (9, 0))
        save(d, "28.3_Q16")


ALL = [
    q28_1_q1, q28_1_q11, q28_1_q12, q28_1_q14, q28_1_q16, q28_1_q18, q28_1_q20, q28_1_q23,
    q28_1_q24, q28_1_q38, q28_1_q40, q28_1_q43, q28_1_q44, q28_1_q46, q28_1_q47, q28_1_q48,
    q28_1_q49, q28_1_q56,
    q28_2_q2, q28_2_q3, q28_2_q4, q28_2_q5, q28_2_q6, q28_2_q8, q28_2_q13,
    q28_3_q3, q28_3_q4, q28_3_q7, q28_3_q8, q28_3_q10, q28_3_q12, q28_3_q13, q28_3_q15,
    q28_3_q16, q28_3_q22, q28_3_q23, q28_3_q24, q28_3_q25, q28_3_q26, q28_3_q27, q28_3_q28,
    q28_3_q29,
]

if __name__ == "__main__":
    for f in ALL:
        f()
    print(f"wrote {len(ALL)} figures to {HERE}")
