"""Author the model solutions for alg-linear-equations-10 and emit
data/alg-linear-equations-10.solutions.json.

Joins on `ref` against the topaper dump and ASSERTS that every emitted row's id
still pairs with its own ref (a dropped row that shifts the tail is a permutation
the id-set and the count both survive).
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = HERE
CHID = "alg-linear-equations-10"


def L(*lines):
    return "\n\n".join(lines)


KEY_OK = r"This agrees with the answer printed in the book's ANSWERS section."

S = {}

# ── Practice set 1.1 ──────────────────────────────────────────────────────
S["Ex 1.1 Q1"] = L(
    r"\(5x + 3y = 9\) . . . (I)",
    r"\(2x - 3y = 12\) . . . (II)",
    r"Adding equations (I) and (II) the \(y\)-terms cancel:",
    r"\(7x = 21\) \(\therefore x = 3\)",
    r"Place \(x = 3\) in equation (I):",
    r"\(5 \times 3 + 3y = 9\) \(\therefore 15 + 3y = 9\) \(\therefore 3y = 9 - 15 = -6\)",
    r"\(\therefore y = \dfrac{-6}{3} = -2\)",
    r"\(\therefore\) Solution is \((x, y) = (3, -2)\).",
    r"[Note: the book's ANSWERS section prints no entry for this item — its Practice set 1.1 key begins at question 2 — because this question is a guided activity whose steps are printed on the page.]",
)


def elim(e1, e2, work, ans):
    return L(e1 + " . . . (I)", e2 + " . . . (II)", work, ans, KEY_OK)


S["Ex 1.1 Q2(1)"] = elim(
    r"\(3a + 5b = 26\)", r"\(a + 5b = 22\)",
    L(r"Subtracting equation (II) from equation (I) the \(5b\) terms cancel:",
      r"\((3a - a) + (5b - 5b) = 26 - 22\) \(\therefore 2a = 4\) \(\therefore a = 2\)",
      r"Placing \(a = 2\) in equation (II): \(2 + 5b = 22\) \(\therefore 5b = 20\) \(\therefore b = 4\)"),
    r"\(\therefore (a, b) = (2, 4)\).")

S["Ex 1.1 Q2(2)"] = elim(
    r"\(x + 7y = 10\)", r"\(3x - 2y = 7\)",
    L(r"From equation (I), \(x = 10 - 7y\). Substituting in equation (II):",
      r"\(3(10 - 7y) - 2y = 7\) \(\therefore 30 - 21y - 2y = 7\) \(\therefore -23y = -23\) \(\therefore y = 1\)",
      r"\(\therefore x = 10 - 7 \times 1 = 3\)"),
    r"\(\therefore (x, y) = (3, 1)\).")

S["Ex 1.1 Q2(3)"] = elim(
    r"\(2x - 3y = 9\)", r"\(2x + y = 13\)",
    L(r"Subtracting equation (II) from equation (I) the \(2x\) terms cancel:",
      r"\(-3y - y = 9 - 13\) \(\therefore -4y = -4\) \(\therefore y = 1\)",
      r"Placing \(y = 1\) in equation (II): \(2x + 1 = 13\) \(\therefore 2x = 12\) \(\therefore x = 6\)"),
    r"\(\therefore (x, y) = (6, 1)\).")

S["Ex 1.1 Q2(4)"] = elim(
    r"\(5m - 3n = 19\)", r"\(m - 6n = -7\)",
    L(r"Multiplying equation (I) by 2: \(10m - 6n = 38\) . . . (III)",
      r"Subtracting equation (II) from equation (III): \(9m = 45\) \(\therefore m = 5\)",
      r"Placing \(m = 5\) in equation (II): \(5 - 6n = -7\) \(\therefore -6n = -12\) \(\therefore n = 2\)"),
    r"\(\therefore (m, n) = (5, 2)\).")

S["Ex 1.1 Q2(5)"] = elim(
    r"\(5x + 2y = -3\)", r"\(x + 5y = 4\)",
    L(r"From equation (II), \(x = 4 - 5y\). Substituting in equation (I):",
      r"\(5(4 - 5y) + 2y = -3\) \(\therefore 20 - 25y + 2y = -3\) \(\therefore -23y = -23\) \(\therefore y = 1\)",
      r"\(\therefore x = 4 - 5 \times 1 = -1\)"),
    r"\(\therefore (x, y) = (-1, 1)\).")

S["Ex 1.1 Q2(6)"] = elim(
    r"\(\dfrac{1}{3}x + y = \dfrac{10}{3}\)", r"\(2x + \dfrac{1}{4}y = \dfrac{11}{4}\)",
    L(r"Multiplying equation (I) by 3 and equation (II) by 4 to clear the fractions:",
      r"\(x + 3y = 10\) . . . (III)",
      r"\(8x + y = 11\) . . . (IV)",
      r"From equation (IV), \(y = 11 - 8x\). Substituting in equation (III):",
      r"\(x + 3(11 - 8x) = 10\) \(\therefore x + 33 - 24x = 10\) \(\therefore -23x = -23\) \(\therefore x = 1\)",
      r"\(\therefore y = 11 - 8 = 3\)"),
    r"\(\therefore (x, y) = (1, 3)\).")

S["Ex 1.1 Q2(7)"] = elim(
    r"\(99x + 101y = 499\)", r"\(101x + 99y = 501\)",
    L(r"The coefficients of \(x\) and \(y\) are interchanged, so add and subtract the equations.",
      r"Adding: \(200x + 200y = 1000\) \(\therefore x + y = 5\) . . . (III)",
      r"Subtracting equation (II) from equation (I): \(-2x + 2y = -2\) \(\therefore -x + y = -1\) . . . (IV)",
      r"Adding equations (III) and (IV): \(2y = 4\) \(\therefore y = 2\), and then \(x = 5 - 2 = 3\)"),
    r"\(\therefore (x, y) = (3, 2)\).")

S["Ex 1.1 Q2(8)"] = elim(
    r"\(49x - 57y = 172\)", r"\(57x - 49y = 252\)",
    L(r"The coefficients of \(x\) and \(y\) are interchanged (with signs), so add and subtract.",
      r"Adding: \(106x - 106y = 424\) \(\therefore x - y = 4\) . . . (III)",
      r"Subtracting equation (II) from equation (I): \(-8x - 8y = -80\) \(\therefore x + y = 10\) . . . (IV)",
      r"Adding equations (III) and (IV): \(2x = 14\) \(\therefore x = 7\), and then \(y = 10 - 7 = 3\)"),
    r"\(\therefore (x, y) = (7, 3)\).")

# ── Practice set 1.2 ──────────────────────────────────────────────────────
S["Ex 1.2 Q1(I)"] = L(
    r"For \(x + y = 3\), each missing entry follows from the given one.",
    r"When \(x = 3\): \(3 + y = 3\) \(\therefore y = 0\).",
    r"When \(y = 5\): \(x + 5 = 3\) \(\therefore x = -2\).",
    r"When \(y = 3\): \(x + 3 = 3\) \(\therefore x = 0\).",
    "| \\(x\\) | 3 | \\(-2\\) | 0 |\n|---|---|---|---|\n| \\(y\\) | 0 | 5 | 3 |\n| \\((x, y)\\) | (3, 0) | (\\(-2\\), 5) | (0, 3) |",
    KEY_OK,
)

S["Ex 1.2 Q1(II)"] = L(
    r"For \(x - y = 4\), each missing entry follows from the given one.",
    r"When \(y = 0\): \(x - 0 = 4\) \(\therefore x = 4\).",
    r"When \(x = -1\): \(-1 - y = 4\) \(\therefore y = -5\).",
    r"When \(x = 0\): \(0 - y = 4\) \(\therefore y = -4\).",
    "| \\(x\\) | 4 | \\(-1\\) | 0 |\n|---|---|---|---|\n| \\(y\\) | 0 | \\(-5\\) | \\(-4\\) |\n| \\((x, y)\\) | (4, 0) | (\\(-1\\), \\(-5\\)) | (0, \\(-4\\)) |",
    KEY_OK,
)


def graphical(eq1, pairs1, eq2, pairs2, meet, extra=None):
    parts = [
        r"Find ordered pairs for each equation, plot them and draw the two lines on one co-ordinate plane; the point of intersection is the solution.",
        "For " + eq1 + " : " + pairs1,
        "For " + eq2 + " : " + pairs2,
        r"The two lines intersect at " + meet + r", so the solution is " + meet + ".",
    ]
    if extra:
        parts.insert(3, extra)
    parts.append(KEY_OK)
    return L(*parts)


S["Ex 1.2 Q2(1)"] = graphical(
    r"\(x + y = 6\)", r"\((0, 6), (6, 0), (2, 4), (4, 2)\)",
    r"\(x - y = 4\)", r"\((4, 0), (0, -4), (5, 1), (6, 2)\)",
    r"\((5, 1)\)")
S["Ex 1.2 Q2(2)"] = graphical(
    r"\(x + y = 5\)", r"\((0, 5), (5, 0), (2, 3), (4, 1)\)",
    r"\(x - y = 3\)", r"\((3, 0), (0, -3), (4, 1), (5, 2)\)",
    r"\((4, 1)\)")
S["Ex 1.2 Q2(3)"] = graphical(
    r"\(x + y = 0\)", r"\((0, 0), (1, -1), (3, -3), (-2, 2)\)",
    r"\(2x - y = 9\)", r"\((0, -9), (4.5, 0), (3, -3), (5, 1)\)",
    r"\((3, -3)\)")
S["Ex 1.2 Q2(4)"] = graphical(
    r"\(3x - y = 2\)", r"\((0, -2), (1, 1), (2, 4), (-1, -5)\)",
    r"\(2x - y = 3\)", r"\((0, -3), (1.5, 0), (2, 1), (-1, -5)\)",
    r"\((-1, -5)\)")
S["Ex 1.2 Q2(5)"] = graphical(
    r"\(3x - 4y = -7\)", r"\((-1, 1), (1, 2.5), (3, 4), (-5, -2)\)",
    r"\(5x - 2y = 0\)", r"\((0, 0), (2, 5), (1, 2.5), (-2, -5)\)",
    r"\((1, 2.5)\)")
S["Ex 1.2 Q2(6)"] = graphical(
    r"\(2x - 3y = 4\)", r"\((2, 0), (8, 4), (-1, -2), (5, 2)\)",
    r"\(3y - x = 4\)", r"\((-4, 0), (8, 4), (2, 2), (-1, 1)\)",
    r"\((8, 4)\)")

# ── Practice set 1.3 ──────────────────────────────────────────────────────
S["Ex 1.3 Q1"] = L(
    r"For a determinant \(\begin{vmatrix} a & b \\ c & d \end{vmatrix}\) the value is \(ad - bc\), so here \(a = 3\), \(b = 2\), \(c = 4\), \(d = 5\).",
    r"\(\begin{vmatrix} 3 & 2 \\ 4 & 5 \end{vmatrix} = 3 \times 5 - 2 \times 4 = 15 - 8 = 7\)",
    r"\(\therefore\) the four blanks are 5, 2, 15 and 7 in that order.",
    KEY_OK,
)
S["Ex 1.3 Q2(1)"] = L(
    r"\(\begin{vmatrix} -1 & 7 \\ 2 & 4 \end{vmatrix} = (-1)(4) - (7)(2) = -4 - 14 = -18\)",
    r"\(\therefore\) the value of the determinant is \(-18\).", KEY_OK)
S["Ex 1.3 Q2(2)"] = L(
    r"\(\begin{vmatrix} 5 & 3 \\ -7 & 0 \end{vmatrix} = (5)(0) - (3)(-7) = 0 + 21 = 21\)",
    r"\(\therefore\) the value of the determinant is 21.", KEY_OK)
S["Ex 1.3 Q2(3)"] = L(
    r"\(\begin{vmatrix} \dfrac{7}{3} & \dfrac{5}{3} \\ \dfrac{3}{2} & \dfrac{1}{2} \end{vmatrix} = \dfrac{7}{3} \times \dfrac{1}{2} - \dfrac{5}{3} \times \dfrac{3}{2} = \dfrac{7}{6} - \dfrac{15}{6} = \dfrac{-8}{6}\)",
    r"\(\therefore\) the value of the determinant is \(-\dfrac{4}{3}\).", KEY_OK)


def cramer(e1, e2, D, Dx, Dy, xv, yv, xn="x", yn="y", note=None):
    parts = [
        r"Write the equations in the form \(ax + by = c\):" if note is None else note,
        e1 + " . . . (I)",
        e2 + " . . . (II)",
        r"\(\mathrm{D} = " + D + r"\)",
        r"\(\mathrm{D}_" + xn + " = " + Dx + r"\)",
        r"\(\mathrm{D}_" + yn + " = " + Dy + r"\)",
        r"By Cramer's rule, \(" + xn + r" = \dfrac{\mathrm{D}_" + xn + r"}{\mathrm{D}} = " + xv +
        r"\) and \(" + yn + r" = \dfrac{\mathrm{D}_" + yn + r"}{\mathrm{D}} = " + yv + r"\)",
    ]
    parts.append(KEY_OK)
    return L(*parts)


S["Ex 1.3 Q3(1)"] = cramer(
    r"\(3x - 4y = 10\)", r"\(4x + 3y = 5\)",
    r"\begin{vmatrix} 3 & -4 \\ 4 & 3 \end{vmatrix} = 9 - (-16) = 25",
    r"\begin{vmatrix} 10 & -4 \\ 5 & 3 \end{vmatrix} = 30 - (-20) = 50",
    r"\begin{vmatrix} 3 & 10 \\ 4 & 5 \end{vmatrix} = 15 - 40 = -25",
    r"\dfrac{50}{25} = 2", r"\dfrac{-25}{25} = -1") + "\n\n" + r"\(\therefore (x, y) = (2, -1)\)."
S["Ex 1.3 Q3(2)"] = cramer(
    r"\(4x + 3y = 4\)", r"\(6x + 5y = 8\)",
    r"\begin{vmatrix} 4 & 3 \\ 6 & 5 \end{vmatrix} = 20 - 18 = 2",
    r"\begin{vmatrix} 4 & 3 \\ 8 & 5 \end{vmatrix} = 20 - 24 = -4",
    r"\begin{vmatrix} 4 & 4 \\ 6 & 8 \end{vmatrix} = 32 - 24 = 8",
    r"\dfrac{-4}{2} = -2", r"\dfrac{8}{2} = 4",
    note=r"Rewrite both equations in the form \(ax + by = c\): \(4x + 3y - 4 = 0\) becomes \(4x + 3y = 4\), and \(6x = 8 - 5y\) becomes \(6x + 5y = 8\).",
) + "\n\n" + r"\(\therefore (x, y) = (-2, 4)\)."
S["Ex 1.3 Q3(3)"] = cramer(
    r"\(x + 2y = -1\)", r"\(2x - 3y = 12\)",
    r"\begin{vmatrix} 1 & 2 \\ 2 & -3 \end{vmatrix} = -3 - 4 = -7",
    r"\begin{vmatrix} -1 & 2 \\ 12 & -3 \end{vmatrix} = 3 - 24 = -21",
    r"\begin{vmatrix} 1 & -1 \\ 2 & 12 \end{vmatrix} = 12 + 2 = 14",
    r"\dfrac{-21}{-7} = 3", r"\dfrac{14}{-7} = -2") + "\n\n" + r"\(\therefore (x, y) = (3, -2)\)."
S["Ex 1.3 Q3(4)"] = cramer(
    r"\(6x - 4y = -12\)", r"\(8x - 3y = -2\)",
    r"\begin{vmatrix} 6 & -4 \\ 8 & -3 \end{vmatrix} = -18 + 32 = 14",
    r"\begin{vmatrix} -12 & -4 \\ -2 & -3 \end{vmatrix} = 36 - 8 = 28",
    r"\begin{vmatrix} 6 & -12 \\ 8 & -2 \end{vmatrix} = -12 + 96 = 84",
    r"\dfrac{28}{14} = 2", r"\dfrac{84}{14} = 6") + "\n\n" + r"\(\therefore (x, y) = (2, 6)\)."
S["Ex 1.3 Q3(5)"] = cramer(
    r"\(4m + 6n = 54\)", r"\(3m + 2n = 28\)",
    r"\begin{vmatrix} 4 & 6 \\ 3 & 2 \end{vmatrix} = 8 - 18 = -10",
    r"\begin{vmatrix} 54 & 6 \\ 28 & 2 \end{vmatrix} = 108 - 168 = -60",
    r"\begin{vmatrix} 4 & 54 \\ 3 & 28 \end{vmatrix} = 112 - 162 = -50",
    r"\dfrac{-60}{-10} = 6", r"\dfrac{-50}{-10} = 5", xn="m", yn="n") + "\n\n" + r"\(\therefore (m, n) = (6, 5)\)."
S["Ex 1.3 Q3(6)"] = cramer(
    r"\(2x + 3y = 2\)", r"\(x - \dfrac{1}{2}y = \dfrac{1}{2}\)",
    r"\begin{vmatrix} 2 & 3 \\ 1 & -\dfrac{1}{2} \end{vmatrix} = -1 - 3 = -4",
    r"\begin{vmatrix} 2 & 3 \\ \dfrac{1}{2} & -\dfrac{1}{2} \end{vmatrix} = -1 - \dfrac{3}{2} = -\dfrac{5}{2}",
    r"\begin{vmatrix} 2 & 2 \\ 1 & \dfrac{1}{2} \end{vmatrix} = 1 - 2 = -1",
    r"\dfrac{-5/2}{-4} = \dfrac{5}{8}", r"\dfrac{-1}{-4} = \dfrac{1}{4}",
    note=r"Write the second equation as \(x - \dfrac{1}{2}y = \dfrac{1}{2}\), so \(a_2 = 1\), \(b_2 = -\dfrac{1}{2}\), \(c_2 = \dfrac{1}{2}\).",
) + "\n\n" + r"\(\therefore (x, y) = \left(\dfrac{5}{8},\ \dfrac{1}{4}\right)\)."

# ── Practice set 1.4 ──────────────────────────────────────────────────────
S["Ex 1.4 Q1(1)"] = L(
    r"Put \(m = \dfrac{1}{x}\) and \(n = \dfrac{1}{y}\).",
    r"\(2m - 3n = 15\) . . . (I)",
    r"\(8m + 5n = 77\) . . . (II)",
    r"Multiplying equation (I) by 4: \(8m - 12n = 60\) . . . (III)",
    r"Subtracting equation (III) from equation (II): \(17n = 17\) \(\therefore n = 1\)",
    r"From equation (I): \(2m = 15 + 3 = 18\) \(\therefore m = 9\)",
    r"\(m = \dfrac{1}{x} = 9\) \(\therefore x = \dfrac{1}{9}\); \(n = \dfrac{1}{y} = 1\) \(\therefore y = 1\)",
    r"\(\therefore (x, y) = \left(\dfrac{1}{9},\ 1\right)\).", KEY_OK)

S["Ex 1.4 Q1(2)"] = L(
    r"Put \(m = \dfrac{1}{x + y}\) and \(n = \dfrac{1}{x - y}\).",
    r"\(10m + 2n = 4\), i.e. \(5m + n = 2\) . . . (I)",
    r"\(15m - 5n = -2\) . . . (II)",
    r"From equation (I), \(n = 2 - 5m\). Substituting in equation (II):",
    r"\(15m - 5(2 - 5m) = -2\) \(\therefore 15m - 10 + 25m = -2\) \(\therefore 40m = 8\) \(\therefore m = \dfrac{1}{5}\)",
    r"\(\therefore n = 2 - 1 = 1\)",
    r"\(\dfrac{1}{x + y} = \dfrac{1}{5}\) \(\therefore x + y = 5\); \(\dfrac{1}{x - y} = 1\) \(\therefore x - y = 1\)",
    r"Adding: \(2x = 6\) \(\therefore x = 3\), \(y = 2\)",
    r"\(\therefore (x, y) = (3, 2)\).", KEY_OK)

S["Ex 1.4 Q1(3)"] = L(
    r"Put \(a = \dfrac{1}{x - 2}\) and \(b = \dfrac{1}{y + 3}\).",
    r"\(27a + 31b = 85\) . . . (I)",
    r"\(31a + 27b = 89\) . . . (II)",
    r"The coefficients are interchanged, so add and subtract.",
    r"Adding: \(58a + 58b = 174\) \(\therefore a + b = 3\) . . . (III)",
    r"Subtracting equation (I) from equation (II): \(4a - 4b = 4\) \(\therefore a - b = 1\) . . . (IV)",
    r"From (III) and (IV): \(a = 2\), \(b = 1\)",
    r"\(\dfrac{1}{x - 2} = 2\) \(\therefore x - 2 = \dfrac{1}{2}\) \(\therefore x = \dfrac{5}{2}\)",
    r"\(\dfrac{1}{y + 3} = 1\) \(\therefore y + 3 = 1\) \(\therefore y = -2\)",
    r"\(\therefore (x, y) = \left(\dfrac{5}{2},\ -2\right)\).", KEY_OK)

S["Ex 1.4 Q1(4)"] = L(
    r"Put \(m = \dfrac{1}{3x + y}\) and \(n = \dfrac{1}{3x - y}\).",
    r"\(m + n = \dfrac{3}{4}\) . . . (I)",
    r"\(\dfrac{m}{2} - \dfrac{n}{2} = -\dfrac{1}{8}\), i.e. \(m - n = -\dfrac{1}{4}\) . . . (II)",
    r"Adding: \(2m = \dfrac{1}{2}\) \(\therefore m = \dfrac{1}{4}\); then \(n = \dfrac{3}{4} - \dfrac{1}{4} = \dfrac{1}{2}\)",
    r"\(\dfrac{1}{3x + y} = \dfrac{1}{4}\) \(\therefore 3x + y = 4\)",
    r"\(\dfrac{1}{3x - y} = \dfrac{1}{2}\) \(\therefore 3x - y = 2\)",
    r"Adding: \(6x = 6\) \(\therefore x = 1\), \(y = 1\)",
    r"\(\therefore (x, y) = (1, 1)\).", KEY_OK)

# ── Practice set 1.5 ──────────────────────────────────────────────────────
S["Ex 1.5 Q2"] = L(
    r"In a rectangle the opposite sides are equal, so the two lengths are equal and the two breadths are equal.",
    r"\(2x + y + 8 = 4x - y\) \(\therefore 2x - 2y = 8\) \(\therefore x - y = 4\) . . . (I)",
    r"\(x + 4 = 2y\) \(\therefore x - 2y = -4\) . . . (II)",
    r"Subtracting equation (II) from equation (I): \(y = 8\); then from equation (I) \(x = 12\).",
    r"\(\therefore x = 12\), \(y = 8\).",
    r"Length \(= 4x - y = 48 - 8 = 40\) units and breadth \(= x + 4 = 16\) units (check: \(2y = 16\) and \(2x + y + 8 = 40\)).",
    r"Perimeter \(= 2(40 + 16) = 112\) units.",
    r"Area \(= 40 \times 16 = 640\) sq. units.", KEY_OK)

S["Ex 1.5 Q3"] = L(
    r"Let the father's present age be \(x\) years and the son's present age be \(y\) years.",
    r"From the first condition: \(x + 2y = 70\) . . . (I)",
    r"From the second condition: \(2x + y = 95\) . . . (II)",
    r"Multiplying equation (I) by 2: \(2x + 4y = 140\) . . . (III)",
    r"Subtracting equation (II) from equation (III): \(3y = 45\) \(\therefore y = 15\)",
    r"From equation (I): \(x = 70 - 30 = 40\)",
    r"\(\therefore\) the father is 40 years old and the son is 15 years old.", KEY_OK)

S["Ex 1.5 Q4"] = L(
    r"Let the numerator be \(x\) and the denominator be \(y\).",
    r"From the first condition: \(y = 2x + 4\) . . . (I)",
    r"From the second condition: \(y - 6 = 12(x - 6)\) . . . (II)",
    r"Substituting equation (I) in equation (II):",
    r"\(2x + 4 - 6 = 12x - 72\) \(\therefore 2x - 2 = 12x - 72\) \(\therefore 70 = 10x\) \(\therefore x = 7\)",
    r"\(\therefore y = 2 \times 7 + 4 = 18\)",
    r"\(\therefore\) the fraction is \(\dfrac{7}{18}\).", KEY_OK)

S["Ex 1.5 Q5"] = L(
    r"Let the weight of one box of type A be \(x\) kg and of one box of type B be \(y\) kg. The truck's capacity is 10 tons \(= 10000\) kg.",
    r"From the first condition: \(150x + 100y = 10000\), i.e. \(3x + 2y = 200\) . . . (I)",
    r"From the second condition: \(260x + 40y = 10000\), i.e. \(13x + 2y = 500\) . . . (II)",
    r"Subtracting equation (I) from equation (II): \(10x = 300\) \(\therefore x = 30\)",
    r"From equation (I): \(2y = 200 - 90 = 110\) \(\therefore y = 55\)",
    r"\(\therefore\) a box of type A weighs 30 kg and a box of type B weighs 55 kg.", KEY_OK)

S["Ex 1.5 Q6"] = L(
    r"Let the distance travelled by bus be \(x\) km. Then the distance travelled by aeroplane is \((1900 - x)\) km.",
    r"Time \(= \dfrac{\text{distance}}{\text{speed}}\), and the total time is 5 hours.",
    r"\(\dfrac{x}{60} + \dfrac{1900 - x}{700} = 5\)",
    r"Multiplying throughout by 4200 (the L.C.M. of 60 and 700):",
    r"\(70x + 6(1900 - x) = 21000\) \(\therefore 70x + 11400 - 6x = 21000\) \(\therefore 64x = 9600\) \(\therefore x = 150\)",
    r"\(\therefore\) Vishal travelled 150 km by bus (and 1750 km by aeroplane).", KEY_OK)

# ── Problem set 1 ─────────────────────────────────────────────────────────
S["PS1 Q2"] = L(
    r"For \(2x - 6y = 3\):",
    r"When \(x = -5\): \(2(-5) - 6y = 3\) \(\therefore -10 - 6y = 3\) \(\therefore -6y = 13\) \(\therefore y = -\dfrac{13}{6}\).",
    r"When \(y = 0\): \(2x = 3\) \(\therefore x = \dfrac{3}{2}\).",
    "| \\(x\\) | \\(-5\\) | \\(\\dfrac{3}{2}\\) |\n|---|---|---|\n| \\(y\\) | \\(-\\dfrac{13}{6}\\) | 0 |\n| \\((x, y)\\) | \\(\\left(-5,\\ -\\dfrac{13}{6}\\right)\\) | \\(\\left(\\dfrac{3}{2},\\ 0\\right)\\) |",
    KEY_OK,
)

S["PS1 Q3(1)"] = graphical(
    r"\(2x + 3y = 12\)", r"\((0, 4), (6, 0), (3, 2), (-3, 6)\)",
    r"\(x - y = 1\)", r"\((1, 0), (0, -1), (3, 2), (4, 3)\)", r"\((3, 2)\)")
S["PS1 Q3(2)"] = graphical(
    r"\(x - 3y = 1\)", r"\((1, 0), (4, 1), (-2, -1), (-5, -2)\)",
    r"\(3x - 2y = -4\)", r"\((0, 2), (-2, -1), (2, 5), (-4, -4)\)", r"\((-2, -1)\)",
    extra=r"Write the second equation as \(3x - 2y = -4\).")
S["PS1 Q3(3)"] = graphical(
    r"\(5x - 6y = -30\)", r"\((-6, 0), (0, 5), (6, 10), (-12, -5)\)",
    r"\(5x + 4y = 20\)", r"\((4, 0), (0, 5), (-4, 10), (8, -5)\)", r"\((0, 5)\)",
    extra=r"Write the equations as \(5x - 6y = -30\) and \(5x + 4y = 20\).")
S["PS1 Q3(4)"] = graphical(
    r"\(3x - y = 2\)", r"\((0, -2), (1, 1), (2, 4), (-1, -5)\)",
    r"\(2x + y = 8\)", r"\((0, 8), (4, 0), (2, 4), (3, 2)\)", r"\((2, 4)\)",
    extra=r"Write the first equation as \(3x - y = 2\).")
S["PS1 Q3(5)"] = graphical(
    r"\(3x + y = 10\)", r"\((0, 10), (2, 4), (3, 1), (4, -2)\)",
    r"\(x - y = 2\)", r"\((2, 0), (0, -2), (3, 1), (5, 3)\)", r"\((3, 1)\)")

S["PS1 Q4(1)"] = L(r"\(\begin{vmatrix} 4 & 3 \\ 2 & 7 \end{vmatrix} = (4)(7) - (3)(2) = 28 - 6 = 22\)",
                   r"\(\therefore\) the value of the determinant is 22.", KEY_OK)
S["PS1 Q4(2)"] = L(r"\(\begin{vmatrix} 5 & -2 \\ -3 & 1 \end{vmatrix} = (5)(1) - (-2)(-3) = 5 - 6 = -1\)",
                   r"\(\therefore\) the value of the determinant is \(-1\).", KEY_OK)
S["PS1 Q4(3)"] = L(r"\(\begin{vmatrix} 3 & -1 \\ 1 & 4 \end{vmatrix} = (3)(4) - (-1)(1) = 12 + 1 = 13\)",
                   r"\(\therefore\) the value of the determinant is 13.", KEY_OK)

S["PS1 Q5(1)"] = cramer(
    r"\(6x - 3y = -10\)", r"\(3x + 5y = 8\)",
    r"\begin{vmatrix} 6 & -3 \\ 3 & 5 \end{vmatrix} = 30 + 9 = 39",
    r"\begin{vmatrix} -10 & -3 \\ 8 & 5 \end{vmatrix} = -50 + 24 = -26",
    r"\begin{vmatrix} 6 & -10 \\ 3 & 8 \end{vmatrix} = 48 + 30 = 78",
    r"\dfrac{-26}{39} = -\dfrac{2}{3}", r"\dfrac{78}{39} = 2",
    note=r"Write \(3x + 5y - 8 = 0\) as \(3x + 5y = 8\).",
) + "\n\n" + r"\(\therefore (x, y) = \left(-\dfrac{2}{3},\ 2\right)\)."
S["PS1 Q5(2)"] = cramer(
    r"\(4m - 2n = -4\)", r"\(4m + 3n = 16\)",
    r"\begin{vmatrix} 4 & -2 \\ 4 & 3 \end{vmatrix} = 12 + 8 = 20",
    r"\begin{vmatrix} -4 & -2 \\ 16 & 3 \end{vmatrix} = -12 + 32 = 20",
    r"\begin{vmatrix} 4 & -4 \\ 4 & 16 \end{vmatrix} = 64 + 16 = 80",
    r"\dfrac{20}{20} = 1", r"\dfrac{80}{20} = 4", xn="m", yn="n") + "\n\n" + r"\(\therefore (m, n) = (1, 4)\)."
S["PS1 Q5(3)"] = cramer(
    r"\(3x - 2y = \dfrac{5}{2}\)", r"\(\dfrac{1}{3}x + 3y = -\dfrac{4}{3}\)",
    r"\begin{vmatrix} 3 & -2 \\ \dfrac{1}{3} & 3 \end{vmatrix} = 9 + \dfrac{2}{3} = \dfrac{29}{3}",
    r"\begin{vmatrix} \dfrac{5}{2} & -2 \\ -\dfrac{4}{3} & 3 \end{vmatrix} = \dfrac{15}{2} - \dfrac{8}{3} = \dfrac{29}{6}",
    r"\begin{vmatrix} 3 & \dfrac{5}{2} \\ \dfrac{1}{3} & -\dfrac{4}{3} \end{vmatrix} = -4 - \dfrac{5}{6} = -\dfrac{29}{6}",
    r"\dfrac{29/6}{29/3} = \dfrac{1}{2}", r"\dfrac{-29/6}{29/3} = -\dfrac{1}{2}",
) + "\n\n" + r"\(\therefore (x, y) = \left(\dfrac{1}{2},\ -\dfrac{1}{2}\right)\)."
S["PS1 Q5(4)"] = cramer(
    r"\(7x + 3y = 15\)", r"\(-5x + 12y = 39\)",
    r"\begin{vmatrix} 7 & 3 \\ -5 & 12 \end{vmatrix} = 84 + 15 = 99",
    r"\begin{vmatrix} 15 & 3 \\ 39 & 12 \end{vmatrix} = 180 - 117 = 63",
    r"\begin{vmatrix} 7 & 15 \\ -5 & 39 \end{vmatrix} = 273 + 75 = 348",
    r"\dfrac{63}{99} = \dfrac{7}{11}", r"\dfrac{348}{99} = \dfrac{116}{33}",
    note=r"Write \(12y - 5x = 39\) as \(-5x + 12y = 39\).",
) + "\n\n" + r"\(\therefore (x, y) = \left(\dfrac{7}{11},\ \dfrac{116}{33}\right)\)."
S["PS1 Q5(5)"] = L(
    r"The single chain gives two equations.",
    r"From \(\dfrac{x + y - 8}{2} = \dfrac{x + 2y - 14}{3}\): \(3(x + y - 8) = 2(x + 2y - 14)\)",
    r"\(\therefore 3x + 3y - 24 = 2x + 4y - 28\) \(\therefore x - y = -4\) . . . (I)",
    r"From \(\dfrac{x + 2y - 14}{3} = \dfrac{3x - y}{4}\): \(4(x + 2y - 14) = 3(3x - y)\)",
    r"\(\therefore 4x + 8y - 56 = 9x - 3y\) \(\therefore -5x + 11y = 56\) . . . (II)",
    r"\(\mathrm{D} = \begin{vmatrix} 1 & -1 \\ -5 & 11 \end{vmatrix} = 11 - 5 = 6\)",
    r"\(\mathrm{D}_x = \begin{vmatrix} -4 & -1 \\ 56 & 11 \end{vmatrix} = -44 + 56 = 12\)",
    r"\(\mathrm{D}_y = \begin{vmatrix} 1 & -4 \\ -5 & 56 \end{vmatrix} = 56 - 20 = 36\)",
    r"\(x = \dfrac{12}{6} = 2\), \(y = \dfrac{36}{6} = 6\)",
    r"\(\therefore (x, y) = (2, 6)\).", KEY_OK)

S["PS1 Q6(1)"] = L(
    r"Put \(m = \dfrac{1}{x}\) and \(n = \dfrac{1}{y}\).",
    r"\(2m + \dfrac{2}{3}n = \dfrac{1}{6}\) . . . (I)",
    r"\(3m + 2n = 0\) . . . (II)",
    r"From equation (II), \(n = -\dfrac{3m}{2}\). Substituting in equation (I):",
    r"\(2m + \dfrac{2}{3}\left(-\dfrac{3m}{2}\right) = \dfrac{1}{6}\) \(\therefore 2m - m = \dfrac{1}{6}\) \(\therefore m = \dfrac{1}{6}\)",
    r"\(\therefore n = -\dfrac{3}{2} \times \dfrac{1}{6} = -\dfrac{1}{4}\)",
    r"\(\dfrac{1}{x} = \dfrac{1}{6}\) \(\therefore x = 6\); \(\dfrac{1}{y} = -\dfrac{1}{4}\) \(\therefore y = -4\)",
    r"\(\therefore (x, y) = (6, -4)\).", KEY_OK)

S["PS1 Q6(2)"] = L(
    r"Put \(a = \dfrac{1}{2x + 1}\) and \(b = \dfrac{1}{y + 2}\).",
    r"\(7a + 13b = 27\) . . . (I)",
    r"\(13a + 7b = 33\) . . . (II)",
    r"The coefficients are interchanged, so add and subtract.",
    r"Adding: \(20a + 20b = 60\) \(\therefore a + b = 3\) . . . (III)",
    r"Subtracting equation (I) from equation (II): \(6a - 6b = 6\) \(\therefore a - b = 1\) . . . (IV)",
    r"From (III) and (IV): \(a = 2\), \(b = 1\)",
    r"\(\dfrac{1}{2x + 1} = 2\) \(\therefore 2x + 1 = \dfrac{1}{2}\) \(\therefore 2x = -\dfrac{1}{2}\) \(\therefore x = -\dfrac{1}{4}\)",
    r"\(\dfrac{1}{y + 2} = 1\) \(\therefore y + 2 = 1\) \(\therefore y = -1\)",
    r"\(\therefore (x, y) = \left(-\dfrac{1}{4},\ -1\right)\).", KEY_OK)

S["PS1 Q6(3)"] = L(
    r"Multiply both equations throughout by \(xy\) (\(x \neq 0\), \(y \neq 0\)).",
    r"\(148y + 231x = 527\) . . . (I)",
    r"\(231y + 148x = 610\) . . . (II)",
    r"Adding: \(379x + 379y = 1137\) \(\therefore x + y = 3\) . . . (III)",
    r"Subtracting equation (II) from equation (I): \(83x - 83y = -83\) \(\therefore x - y = -1\) . . . (IV)",
    r"From (III) and (IV): \(2x = 2\) \(\therefore x = 1\), \(y = 2\)",
    r"\(\therefore (x, y) = (1, 2)\).", KEY_OK)

S["PS1 Q6(4)"] = L(
    r"Split each fraction: \(\dfrac{7x - 2y}{xy} = \dfrac{7}{y} - \dfrac{2}{x}\) and \(\dfrac{8x + 7y}{xy} = \dfrac{8}{y} + \dfrac{7}{x}\).",
    r"Put \(m = \dfrac{1}{x}\) and \(n = \dfrac{1}{y}\).",
    r"\(-2m + 7n = 5\) . . . (I)",
    r"\(7m + 8n = 15\) . . . (II)",
    r"Multiplying equation (I) by 7 and equation (II) by 2:",
    r"\(-14m + 49n = 35\) . . . (III)",
    r"\(14m + 16n = 30\) . . . (IV)",
    r"Adding: \(65n = 65\) \(\therefore n = 1\); then from equation (I) \(-2m = 5 - 7 = -2\) \(\therefore m = 1\)",
    r"\(\dfrac{1}{x} = 1\) \(\therefore x = 1\); \(\dfrac{1}{y} = 1\) \(\therefore y = 1\)",
    r"\(\therefore (x, y) = (1, 1)\).", KEY_OK)

S["PS1 Q6(5)"] = L(
    r"Put \(p = \dfrac{1}{3x + 4y}\) and \(q = \dfrac{1}{2x - 3y}\).",
    r"\(\dfrac{p}{2} + \dfrac{q}{5} = \dfrac{1}{4}\); multiplying by 10: \(5p + 2q = \dfrac{5}{2}\) . . . (I)",
    r"\(5p - 2q = -\dfrac{3}{2}\) . . . (II)",
    r"Adding: \(10p = 1\) \(\therefore p = \dfrac{1}{10}\); then \(2q = \dfrac{5}{2} - \dfrac{1}{2} = 2\) \(\therefore q = 1\)",
    r"\(\dfrac{1}{3x + 4y} = \dfrac{1}{10}\) \(\therefore 3x + 4y = 10\) . . . (III)",
    r"\(\dfrac{1}{2x - 3y} = 1\) \(\therefore 2x - 3y = 1\) . . . (IV)",
    r"Multiplying (III) by 3 and (IV) by 4 and adding: \(9x + 12y + 8x - 12y = 30 + 4\) \(\therefore 17x = 34\) \(\therefore x = 2\)",
    r"From equation (III): \(4y = 10 - 6 = 4\) \(\therefore y = 1\)",
    r"\(\therefore (x, y) = (2, 1)\).", KEY_OK)

S["PS1 Q7(1)"] = L(
    r"Let the digit in unit's place be \(x\) and the digit in the ten's place be \(y\).",
    r"\(\therefore\) the number is \(10y + x\), and the number with digits interchanged is \(10x + y\).",
    r"From the first condition: \((10y + x) + (10x + y) = 143\)",
    r"\(\therefore 11x + 11y = 143\) \(\therefore x + y = 13\) . . . (I)",
    r"From the second condition: \(x = y + 3\) \(\therefore x - y = 3\) . . . (II)",
    r"Adding equations (I) and (II): \(2x = 16\) \(\therefore x = 8\)",
    r"Putting \(x = 8\) in equation (I): \(8 + y = 13\) \(\therefore y = 5\)",
    r"\(\therefore\) the original number is \(10y + x = 50 + 8 = 58\).",
    r"[Note: the book's ANSWERS section prints no entry for this item — its Problem set 1 key for question 7 begins at (2) — because the guided activity prints its own final answer, 58, on the page.]")

S["PS1 Q7(2)"] = L(
    r"Let the rate of tea be ₹ \(x\) per kg and the rate of sugar be ₹ \(y\) per kg.",
    r"In the shop Kantabai spent ₹ 700 in all, of which ₹ 50 was the rickshaw fare, so the goods cost \(700 - 50 = 650\) rupees.",
    r"\(\dfrac{3}{2}x + 5y = 650\), i.e. \(3x + 10y = 1300\) . . . (I)",
    r"Online there is no fare, so \(2x + 7y = 880\) . . . (II)",
    r"Multiplying equation (I) by 2 and equation (II) by 3:",
    r"\(6x + 20y = 2600\) . . . (III)",
    r"\(6x + 21y = 2640\) . . . (IV)",
    r"Subtracting equation (III) from equation (IV): \(y = 40\)",
    r"From equation (II): \(2x = 880 - 280 = 600\) \(\therefore x = 300\)",
    r"\(\therefore\) tea costs ₹ 300 per kg and sugar costs ₹ 40 per kg.", KEY_OK)

S["PS1 Q7(3)"] = L(
    r"Suppose Anushka had \(x\) notes of ₹ 100 and \(y\) notes of ₹ 50.",
    r"Equation I (the amount she actually got): \(100x + 50y = 2500\), i.e. \(2x + y = 50\) . . . (I)",
    r"Equation II (the amount with the number of notes interchanged, which is ₹ 500 less): \(100y + 50x = 2000\), i.e. \(x + 2y = 40\) . . . (II)",
    r"Multiplying equation (I) by 2: \(4x + 2y = 100\) . . . (III)",
    r"Subtracting equation (II) from equation (III): \(3x = 60\) \(\therefore x = 20\)",
    r"From equation (I): \(y = 50 - 40 = 10\)",
    r"\(\therefore\) Anushka had 20 notes of ₹ 100 and 10 notes of ₹ 50.", KEY_OK)

S["PS1 Q7(4)"] = L(
    r"Let Manish's present age be \(x\) years and Savita's present age be \(y\) years.",
    r"From the first condition: \(x + y = 31\) . . . (I)",
    r"Three years ago their ages were \((x - 3)\) and \((y - 3)\).",
    r"From the second condition: \(x - 3 = 4(y - 3)\) \(\therefore x - 4y = -9\) . . . (II)",
    r"Subtracting equation (II) from equation (I): \(5y = 40\) \(\therefore y = 8\)",
    r"From equation (I): \(x = 31 - 8 = 23\)",
    r"\(\therefore\) Manish is 23 years old and Savita is 8 years old.",
    r"[Textbook note: the question names the boy 'Manish' while the book's ANSWERS section answers it as 'Manisha's age 23 years'. Only the name differs; both figures are correct.]")

S["PS1 Q7(5)"] = L(
    r"The salaries are in the ratio \(5 : 3\), so let the skilled worker's daily wage be ₹ \(5k\) and the unskilled worker's daily wage be ₹ \(3k\).",
    r"\(5k + 3k = 720\) \(\therefore 8k = 720\) \(\therefore k = 90\)",
    r"\(\therefore\) the skilled worker's daily wage is \(5 \times 90 =\) ₹ 450 and the unskilled worker's is \(3 \times 90 =\) ₹ 270.", KEY_OK)

S["PS1 Q7(6)"] = L(
    r"Let Hamid's speed be \(x\) km/hr and Joseph's speed be \(y\) km/hr.",
    r"Moving towards each other they close the 30 km gap at \((x + y)\) km/hr and meet after 20 minutes \(= \dfrac{1}{3}\) hour.",
    r"\((x + y) \times \dfrac{1}{3} = 30\) \(\therefore x + y = 90\) . . . (I)",
    r"Moving in the same direction Hamid closes the 30 km gap at \((x - y)\) km/hr and catches Joseph after 3 hours.",
    r"\((x - y) \times 3 = 30\) \(\therefore x - y = 10\) . . . (II)",
    r"Adding: \(2x = 100\) \(\therefore x = 50\); then \(y = 40\)",
    r"\(\therefore\) Hamid's speed is 50 km/hr and Joseph's speed is 40 km/hr.", KEY_OK)


def main():
    topaper = json.load(open(os.path.join(DATA, CHID + ".all.topaper.json"), encoding="utf-8"))
    by_ref = {}
    for r in topaper:
        assert r["ref"] not in by_ref, "duplicate ref in topaper: " + r["ref"]
        by_ref[r["ref"]] = r

    missing = [ref for ref in by_ref if ref not in S]
    extra = [ref for ref in S if ref not in by_ref]
    if missing:
        print("NO SOLUTION AUTHORED for:", missing)
    if extra:
        print("AUTHORED but not in dump:", extra)
    if missing or extra:
        sys.exit(1)

    out = []
    for ref, sol in S.items():
        row = by_ref[ref]
        # the pairing gate: this id must still belong to THIS ref
        assert row["ref"] == ref, "pairing broken for " + ref
        out.append({"id": row["id"], "ref": ref, "solution": sol})

    # second, independent pairing assertion against the dump order
    ids = {r["id"] for r in out}
    assert len(ids) == len(out) == len(topaper), (len(ids), len(out), len(topaper))
    for o in out:
        assert by_ref[o["ref"]]["id"] == o["id"]

    path = os.path.join(DATA, CHID + ".solutions.json")
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print("wrote", len(out), "solutions ->", path)


if __name__ == "__main__":
    main()
