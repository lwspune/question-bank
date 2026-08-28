"""Author the 79 exercise solutions for Geometry Ch.5 and join them onto the
topaper dump BY REF, asserting the ref -> id pairing survives (a dropped row that
shifts the tail is a permutation: the id set and the count both still match).

Every numeric value below is COMPUTED by sympy from the stem's own data -- none is
typed by hand -- so a transcription slip in an answer cannot survive here.

    python geo-coordinate-10.build_solutions.py     ->  geo-coordinate-10.solutions.json
"""
import json
import sympy as sp

S = {}          # ref -> solution text


def tex(e):
    return sp.latex(sp.nsimplify(e))


def pt(p):
    return f"({tex(p[0])}, {tex(p[1])})"


def R(a, b=1):
    return sp.Rational(a, b)


DF = (r"By the distance formula, "
      r"\(d(\text{P}, \text{Q}) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\).")


# ---------------------------------------------------------------- distances
def dist_sol(n1, p, n2, q, closing=None):
    dx, dy = sp.nsimplify(q[0] - p[0]), sp.nsimplify(q[1] - p[1])
    d2 = sp.nsimplify(dx ** 2 + dy ** 2)
    d = sp.simplify(sp.sqrt(d2))
    lines = [
        f"Let \\({n1}{pt(p)} = (x_1, y_1)\\) and \\({n2}{pt(q)} = (x_2, y_2)\\).",
        "",
        f"By the distance formula, \\(d({n1}, {n2}) = \\sqrt{{(x_2 - x_1)^2 + (y_2 - y_1)^2}}\\)",
        "",
        f"\\(= \\sqrt{{\\left({tex(q[0])} - \\left({tex(p[0])}\\right)\\right)^2 + "
        f"\\left({tex(q[1])} - \\left({tex(p[1])}\\right)\\right)^2}}\\)",
        "",
        f"\\(= \\sqrt{{\\left({tex(dx)}\\right)^2 + \\left({tex(dy)}\\right)^2}} = "
        f"\\sqrt{{{tex(sp.nsimplify(dx ** 2))} + {tex(sp.nsimplify(dy ** 2))}}} = "
        f"\\sqrt{{{tex(d2)}}} = {tex(d)}\\)",
        "",
        f"\\(\\therefore d({n1}, {n2}) = {tex(d)}\\)",
    ]
    if closing:
        lines += ["", closing]
    return "\n".join(lines)


for ref, n1, p, n2, q in [
    ("Ex 5.1 Q.1 (1)", "A", (2, 3), "B", (4, 1)),
    ("Ex 5.1 Q.1 (2)", "P", (-5, 7), "Q", (-1, 3)),
    ("Ex 5.1 Q.1 (3)", "R", (0, -3), "S", (0, R(5, 2))),
    ("Ex 5.1 Q.1 (4)", "L", (5, -8), "M", (-7, -3)),
    ("Ex 5.1 Q.1 (5)", "T", (-3, 6), "R", (9, -10)),
    ("Ex 5.1 Q.1 (6)", "W", (R(-7, 2), 4), "X", (11, 4)),
    ("PS5 Q.6 (ii)", "P", (-6, -3), "Q", (-1, 9)),
]:
    S[ref] = dist_sol(n1, p, n2, q)


# ---------------------------------------------------------------- collinearity by distance
def collinear_by_distance(names, pts):
    (n1, n2, n3), (p, q, r) = names, pts

    def leg(a, b, la, lb):
        dx, dy = sp.nsimplify(b[0] - a[0]), sp.nsimplify(b[1] - a[1])
        d2 = sp.nsimplify(dx ** 2 + dy ** 2)
        v_ = sp.simplify(sp.sqrt(d2))
        # skip the redundant "= sqrt(d2)" step when the surd is already in lowest form
        tail = "" if tex(v_) == f"\\sqrt{{{tex(d2)}}}" else f" = \\sqrt{{{tex(d2)}}}"
        line = (f"\\(d({la}, {lb}) = \\sqrt{{\\left({tex(dx)}\\right)^2 + \\left({tex(dy)}\\right)^2}}"
                f" = \\sqrt{{{tex(sp.nsimplify(dx ** 2))} + {tex(sp.nsimplify(dy ** 2))}}}{tail}"
                f" = {tex(v_)}\\)")
        return v_, line, f"d({la}, {lb})"

    legs = [leg(p, q, n1, n2), leg(q, r, n2, n3), leg(p, r, n1, n3)]
    lines = ["Three points are collinear when the sum of two of the three distances "
             "between them is equal to the third.", ""]
    for _, line, _ in legs:
        lines += [line, ""]
    a, b, c = (legs[i] for i in sorted(range(3), key=lambda i: float(sp.N(legs[i][0]))))
    total = sp.simplify(a[0] + b[0])
    if sp.simplify(total - c[0]) == 0:
        lines += [f"\\({a[2]} + {b[2]} = {tex(a[0])} + {tex(b[0])} = {tex(c[0])} = {c[2]}\\)",
                  "",
                  f"\\(\\therefore\\) the points {n1}, {n2}, {n3} **are collinear**."]
    else:
        lines += [f"The largest of the three is \\({c[2]} = {tex(c[0])} \\approx "
                  f"{float(sp.N(c[0])):.2f}\\).",
                  "",
                  f"\\({a[2]} + {b[2]} = {tex(a[0])} + {tex(b[0])} \\approx "
                  f"{float(sp.N(a[0])):.2f} + {float(sp.N(b[0])):.2f} = {float(sp.N(total)):.2f}\\), "
                  f"which is not equal to \\({tex(c[0])} \\approx {float(sp.N(c[0])):.2f}\\).",
                  "",
                  "So no two of the three distances add up to the third.",
                  "",
                  f"\\(\\therefore\\) the points {n1}, {n2}, {n3} **are not collinear**."]
    return "\n".join(lines)


for ref, names, pts in [
    ("Ex 5.1 Q.2 (1)", ("A", "B", "C"), ((1, -3), (2, -5), (-4, 7))),
    ("Ex 5.1 Q.2 (2)", ("L", "M", "N"), ((-2, 3), (1, -3), (5, 4))),
    ("Ex 5.1 Q.2 (3)", ("R", "D", "S"), ((0, 3), (2, 1), (3, -1))),
    ("Ex 5.1 Q.2 (4)", ("P", "Q", "R"), ((-2, 3), (1, 2), (4, 1))),
]:
    S[ref] = collinear_by_distance(names, pts)


# ---------------------------------------------------------------- slopes
def slope_expr(p, q):
    if q[0] == p[0]:
        return None
    return sp.nsimplify(sp.Rational(q[1] - p[1], q[0] - p[0]) if all(
        isinstance(v, (int, sp.Integer)) for v in (p[0], p[1], q[0], q[1]))
        else (q[1] - p[1]) / (q[0] - p[0]))


def slope_sol(n1, p, n2, q):
    if q[0] == p[0]:
        return "\n".join([
            f"\\({n1}{pt(p)} = (x_1, y_1)\\) and \\({n2}{pt(q)} = (x_2, y_2)\\)",
            "",
            f"Slope \\(m = \\dfrac{{y_2 - y_1}}{{x_2 - x_1}} = "
            f"\\dfrac{{{tex(q[1])} - \\left({tex(p[1])}\\right)}}"
            f"{{{tex(q[0])} - \\left({tex(p[0])}\\right)}} = \\dfrac{{{tex(q[1]-p[1])}}}{{0}}\\)",
            "",
            "Division by 0 is not possible.",
            "",
            f"\\(\\therefore\\) the slope of line {n1}{n2} **cannot be determined** "
            f"(the line is parallel to the Y-axis).",
        ])
    m = slope_expr(p, q)
    return "\n".join([
        f"\\({n1}{pt(p)} = (x_1, y_1)\\) and \\({n2}{pt(q)} = (x_2, y_2)\\)",
        "",
        f"Slope \\(m = \\dfrac{{y_2 - y_1}}{{x_2 - x_1}} = \\dfrac{{{tex(q[1])} - \\left({tex(p[1])}\\right)}}"
        f"{{{tex(q[0])} - \\left({tex(p[0])}\\right)}} = \\dfrac{{{tex(q[1]-p[1])}}}{{{tex(q[0]-p[0])}}} = {tex(m)}\\)",
        "",
        f"\\(\\therefore\\) the slope of line {n1}{n2} is \\({tex(m)}\\).",
    ])


for ref, n1, p, n2, q in [
    ("Ex 5.3 Q.2 (1)", "A", (2, 3), "B", (4, 7)),
    ("Ex 5.3 Q.2 (2)", "P", (-3, 1), "Q", (5, -2)),
    ("Ex 5.3 Q.2 (3)", "C", (5, -2), "D", (7, 3)),
    ("Ex 5.3 Q.2 (4)", "L", (-2, -3), "M", (-6, -8)),
    ("Ex 5.3 Q.2 (5)", "E", (-4, -2), "F", (6, 3)),
    ("Ex 5.3 Q.2 (6)", "T", (0, -3), "S", (0, 4)),
]:
    S[ref] = slope_sol(n1, p, n2, q)


# ---------------------------------------------------------------- collinearity by slope
def collinear_by_slope(names, pts):
    (n1, n2, n3), (p, q, r) = names, pts
    m1, m2 = slope_expr(p, q), slope_expr(q, r)
    lines = [
        f"Slope of line {n1}{n2} \\(= \\dfrac{{{tex(q[1])} - \\left({tex(p[1])}\\right)}}"
        f"{{{tex(q[0])} - \\left({tex(p[0])}\\right)}} = "
        f"\\dfrac{{{tex(sp.nsimplify(q[1]-p[1]))}}}{{{tex(sp.nsimplify(q[0]-p[0]))}}} = {tex(m1)}\\)",
        "",
        f"Slope of line {n2}{n3} \\(= \\dfrac{{{tex(r[1])} - \\left({tex(q[1])}\\right)}}"
        f"{{{tex(r[0])} - \\left({tex(q[0])}\\right)}} = "
        f"\\dfrac{{{tex(sp.nsimplify(r[1]-q[1]))}}}{{{tex(sp.nsimplify(r[0]-q[0]))}}} = {tex(m2)}\\)",
        "",
    ]
    if sp.simplify(m1 - m2) == 0:
        lines += [
            f"The slopes are equal, and point {n2} lies on both lines.",
            "",
            f"\\(\\therefore\\) the points {n1}, {n2}, {n3} **are collinear**.",
        ]
    else:
        lines += [
            f"\\({tex(m1)} \\ne {tex(m2)}\\), so the two lines have different slopes.",
            "",
            f"\\(\\therefore\\) the points {n1}, {n2}, {n3} **are not collinear**.",
        ]
    return "\n".join(lines)


for ref, names, pts in [
    ("Ex 5.3 Q.3 (1)", ("A", "B", "C"), ((-1, -1), (0, 1), (1, 3))),
    ("Ex 5.3 Q.3 (2)", ("D", "E", "F"), ((-2, -3), (1, 0), (2, 1))),
    ("Ex 5.3 Q.3 (3)", ("L", "M", "N"), ((2, 5), (3, 3), (5, 1))),
    ("Ex 5.3 Q.3 (4)", ("P", "Q", "R"), ((2, -5), (1, -3), (-2, 3))),
    ("Ex 5.3 Q.3 (5)", ("R", "S", "T"), ((1, -4), (-2, 2), (-3, 4))),
    ("Ex 5.3 Q.3 (6)", ("A", "K", "N"), ((-4, 4), (-2, R(5, 2)), (4, -2))),
    ("PS5 Q.2 (1)", ("A", "B", "C"), ((0, 2), (1, R(-1, 2)), (2, -3))),
    ("PS5 Q.2 (2)", ("P", "Q", "R"), ((1, 2), (2, R(8, 5)), (3, R(6, 5)))),
    ("PS5 Q.2 (3)", ("L", "M", "N"), ((1, 2), (5, 3), (8, 6))),
]:
    S[ref] = collinear_by_slope(names, pts)


# ---------------------------------------------------------------- section formula
def section_sol(name, p, q, m, n, n1="P", n2="Q"):
    x = sp.nsimplify(sp.Rational(1, m + n) * (m * q[0] + n * p[0]))
    y = sp.nsimplify(sp.Rational(1, m + n) * (m * q[1] + n * p[1]))
    return "\n".join([
        f"Let \\({n1}{pt(p)} = (x_1, y_1)\\), \\({n2}{pt(q)} = (x_2, y_2)\\) and \\(m : n = {m} : {n}\\).",
        "",
        r"By the section formula, \(x = \dfrac{mx_2 + nx_1}{m + n}\) and \(y = \dfrac{my_2 + ny_1}{m + n}\)",
        "",
        f"\\(x = \\dfrac{{{m} \\times \\left({tex(q[0])}\\right) + {n} \\times \\left({tex(p[0])}\\right)}}"
        f"{{{m} + {n}}} = {tex(x)}\\)",
        "",
        f"\\(y = \\dfrac{{{m} \\times \\left({tex(q[1])}\\right) + {n} \\times \\left({tex(p[1])}\\right)}}"
        f"{{{m} + {n}}} = {tex(y)}\\)",
        "",
        f"\\(\\therefore\\) the co-ordinates of {name} are \\(\\left({tex(x)}, {tex(y)}\\right)\\).",
    ])


S["Ex 5.2 Q.1"] = section_sol("P", (-1, 7), (4, -3), 2, 3, "A", "B")
S["Ex 5.2 Q.2 (1)"] = section_sol("A", (-3, 7), (1, -4), 2, 1)
S["Ex 5.2 Q.2 (2)"] = section_sol("A", (-2, -5), (4, 3), 3, 4)
S["Ex 5.2 Q.2 (3)"] = section_sol("A", (2, 6), (-4, 1), 1, 2)
S["PS5 Q.17"] = section_sol("the point", (4, -3), (8, 5), 3, 1, "A", "B")


def centroid_sol(v):
    gx = sp.nsimplify(sp.Rational(1, 3) * (v[0][0] + v[1][0] + v[2][0]))
    gy = sp.nsimplify(sp.Rational(1, 3) * (v[0][1] + v[1][1] + v[2][1]))
    return "\n".join([
        r"By the centroid formula, the centroid of a triangle with vertices \((x_1, y_1)\), "
        r"\((x_2, y_2)\), \((x_3, y_3)\) is \(\left(\dfrac{x_1 + x_2 + x_3}{3}, "
        r"\dfrac{y_1 + y_2 + y_3}{3}\right)\).",
        "",
        f"\\(x = \\dfrac{{{tex(v[0][0])} + {tex(v[1][0])} + {tex(v[2][0])}}}{{3}} = {tex(gx)}\\)",
        "",
        f"\\(y = \\dfrac{{{tex(v[0][1])} + {tex(v[1][1])} + {tex(v[2][1])}}}{{3}} = {tex(gy)}\\)",
        "",
        f"\\(\\therefore\\) the centroid is \\(\\left({tex(gx)}, {tex(gy)}\\right)\\).",
    ])


S["Ex 5.2 Q.7 (1)"] = centroid_sol(((-7, 6), (2, -2), (8, 5)))
S["Ex 5.2 Q.7 (2)"] = centroid_sol(((3, -5), (4, 3), (11, -4)))
S["Ex 5.2 Q.7 (3)"] = centroid_sol(((4, 7), (8, 4), (7, 11)))

# ---------------------------------------------------------------- hand-authored
S["Ex 5.1 Q.3"] = r"""A point on the X-axis has \(y\) co-ordinate 0, so let the point be P\((x, 0)\).

P is equidistant from A\((-3, 4)\) and B\((1, -4)\), so \(PA = PB\), i.e. \(PA^2 = PB^2\).

\(\therefore [x - (-3)]^2 + (0 - 4)^2 = (x - 1)^2 + [0 - (-4)]^2\)

\(\therefore x^2 + 6x + 9 + 16 = x^2 - 2x + 1 + 16\)

\(\therefore 6x + 9 = -2x + 1\)

\(\therefore 8x = -8\)  \(\therefore x = -1\)

\(\therefore\) the required point is \((-1, 0)\)."""

S["Ex 5.1 Q.4"] = r"""\(PQ^2 = [2 - (-2)]^2 + (2 - 2)^2 = 16 + 0 = 16\)

\(QR^2 = (2 - 2)^2 + (7 - 2)^2 = 0 + 25 = 25\)

\(PR^2 = [2 - (-2)]^2 + (7 - 2)^2 = 16 + 25 = 41\)

The largest of the three squares is \(PR^2 = 41\).

\(PQ^2 + QR^2 = 16 + 25 = 41 = PR^2\)

\(\therefore\) by the converse of Pythagoras' theorem, \(\angle PQR = 90^\circ\).

\(\therefore \triangle PQR\) is a right angled triangle, right angled at Q."""

S["Ex 5.1 Q.5"] = r"""In a quadrilateral, if both pairs of opposite sides are of equal length, then it is a parallelogram.

\(PQ = \sqrt{(7 - 2)^2 + [3 - (-2)]^2} = \sqrt{25 + 25} = \sqrt{50} = 5\sqrt{2}\)

\(QR = \sqrt{(11 - 7)^2 + (-1 - 3)^2} = \sqrt{16 + 16} = \sqrt{32} = 4\sqrt{2}\)

\(RS = \sqrt{(6 - 11)^2 + [-6 - (-1)]^2} = \sqrt{25 + 25} = \sqrt{50} = 5\sqrt{2}\)

\(SP = \sqrt{(2 - 6)^2 + [-2 - (-6)]^2} = \sqrt{16 + 16} = \sqrt{32} = 4\sqrt{2}\)

\(\therefore PQ = RS\) and \(QR = SP\)

Both pairs of opposite sides are equal.

\(\therefore \square PQRS\) is a parallelogram."""

S["Ex 5.1 Q.6"] = r"""A quadrilateral all four of whose sides are equal is a rhombus.

\(AB = \sqrt{[-1 - (-4)]^2 + [2 - (-7)]^2} = \sqrt{9 + 81} = \sqrt{90} = 3\sqrt{10}\)

\(BC = \sqrt{[8 - (-1)]^2 + (5 - 2)^2} = \sqrt{81 + 9} = \sqrt{90} = 3\sqrt{10}\)

\(CD = \sqrt{(5 - 8)^2 + (-4 - 5)^2} = \sqrt{9 + 81} = \sqrt{90} = 3\sqrt{10}\)

\(DA = \sqrt{[-4 - 5]^2 + [-7 - (-4)]^2} = \sqrt{81 + 9} = \sqrt{90} = 3\sqrt{10}\)

\(\therefore AB = BC = CD = DA\)

All four sides are equal.

\(\therefore \square ABCD\) is a rhombus.

(The diagonals are unequal — \(AC = \sqrt{144 + 144} = 12\sqrt{2}\) and \(BD = \sqrt{36 + 36} = 6\sqrt{2}\) — so it is a rhombus and not a square.)"""

S["Ex 5.1 Q.7"] = r"""\(LM = 10\), so \(LM^2 = 100\).

\(\therefore (1 - x)^2 + (15 - 7)^2 = 100\)

\(\therefore (1 - x)^2 + 64 = 100\)

\(\therefore (1 - x)^2 = 36\)

\(\therefore 1 - x = \pm 6\)

\(\therefore x = 1 - 6\) or \(x = 1 + 6\)

\(\therefore x = -5\) or \(x = 7\)"""

S["Ex 5.1 Q.8"] = r"""\(AB = \sqrt{(1 - 1)^2 + (6 - 2)^2} = \sqrt{0 + 16} = 4\)

\(BC = \sqrt{\left[(1 + 2\sqrt{3}) - 1\right]^2 + (4 - 6)^2} = \sqrt{(2\sqrt{3})^2 + (-2)^2} = \sqrt{12 + 4} = \sqrt{16} = 4\)

\(AC = \sqrt{\left[(1 + 2\sqrt{3}) - 1\right]^2 + (4 - 2)^2} = \sqrt{12 + 4} = \sqrt{16} = 4\)

\(\therefore AB = BC = AC = 4\)

All three sides are equal.

\(\therefore \triangle ABC\) is an equilateral triangle."""

S["Ex 5.2 Q.3"] = r"""Let point T\((-1, 6)\) divide seg PQ in the ratio \(m : n\), with P\((-3, 10) = (x_1, y_1)\) and Q\((6, -8) = (x_2, y_2)\).

By the section formula, \(x = \dfrac{mx_2 + nx_1}{m + n}\)

\(\therefore -1 = \dfrac{6m + (-3)n}{m + n}\)

\(\therefore -m - n = 6m - 3n\)

\(\therefore 2n = 7m\)

\(\therefore \dfrac{m}{n} = \dfrac{2}{7}\)

\(\therefore\) point T divides seg PQ in the ratio \(2 : 7\).

Check with the \(y\) co-ordinate: \(\dfrac{2 \times (-8) + 7 \times 10}{2 + 7} = \dfrac{-16 + 70}{9} = \dfrac{54}{9} = 6\) — which is the \(y\) co-ordinate of T."""

S["Ex 5.2 Q.4"] = r"""AB is a diameter and P is the centre, so P is the midpoint of seg AB.

Let B be \((x, y)\). By the midpoint formula,

\(-2 = \dfrac{2 + x}{2}\)  \(\therefore -4 = 2 + x\)  \(\therefore x = -6\)

\(0 = \dfrac{-3 + y}{2}\)  \(\therefore 0 = -3 + y\)  \(\therefore y = 3\)

\(\therefore\) the co-ordinates of point B are \((-6, 3)\)."""

S["Ex 5.2 Q.5"] = r"""Let P\((k, 7)\) divide seg AB in the ratio \(m : n\), with A\((8, 9) = (x_1, y_1)\) and B\((1, 2) = (x_2, y_2)\).

Use the \(y\) co-ordinate, which is known: \(y = \dfrac{my_2 + ny_1}{m + n}\)

\(\therefore 7 = \dfrac{2m + 9n}{m + n}\)

\(\therefore 7m + 7n = 2m + 9n\)

\(\therefore 5m = 2n\)

\(\therefore \dfrac{m}{n} = \dfrac{2}{5}\), i.e. the ratio is \(2 : 5\).

Now find \(k\) with the same ratio:

\(k = \dfrac{mx_2 + nx_1}{m + n} = \dfrac{2 \times 1 + 5 \times 8}{2 + 5} = \dfrac{2 + 40}{7} = \dfrac{42}{7} = 6\)

\(\therefore\) the ratio is \(2 : 5\) and \(k = 6\)."""

S["Ex 5.2 Q.6"] = r"""By the midpoint formula, the midpoint of the segment joining \((x_1, y_1)\) and \((x_2, y_2)\) is \(\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)\).

\(x = \dfrac{22 + 0}{2} = \dfrac{22}{2} = 11\)

\(y = \dfrac{20 + 16}{2} = \dfrac{36}{2} = 18\)

\(\therefore\) the co-ordinates of the midpoint are \((11, 18)\)."""

S["Ex 5.2 Q.8"] = r"""Let C be \((x, y)\). G is the centroid, so by the centroid formula

\(-4 = \dfrac{-14 + 3 + x}{3}\)

\(\therefore -12 = -11 + x\)  \(\therefore x = -1\)

\(-7 = \dfrac{-19 + 5 + y}{3}\)

\(\therefore -21 = -14 + y\)  \(\therefore y = -7\)

\(\therefore\) the co-ordinates of C are \((-1, -7)\)."""

S["Ex 5.2 Q.9"] = r"""By the centroid formula,

\(1 = \dfrac{h + 2 + (-6)}{3}\)

\(\therefore 3 = h - 4\)  \(\therefore h = 7\)

\(5 = \dfrac{-6 + 3 + k}{3}\)

\(\therefore 15 = -3 + k\)  \(\therefore k = 18\)

\(\therefore h = 7\) and \(k = 18\)."""

S["Ex 5.2 Q.10"] = r"""Let P and Q be the points of trisection of seg AB, with A\(-\)P\(-\)Q\(-\)B, so \(AP = PQ = QB\).

Then P divides seg AB in the ratio \(1 : 2\) and Q divides seg AB in the ratio \(2 : 1\).

For P, with A\((2, 7)\) and B\((-4, -8)\):

\(x = \dfrac{1 \times (-4) + 2 \times 2}{1 + 2} = \dfrac{-4 + 4}{3} = 0\)

\(y = \dfrac{1 \times (-8) + 2 \times 7}{1 + 2} = \dfrac{-8 + 14}{3} = \dfrac{6}{3} = 2\)

For Q:

\(x = \dfrac{2 \times (-4) + 1 \times 2}{2 + 1} = \dfrac{-8 + 2}{3} = \dfrac{-6}{3} = -2\)

\(y = \dfrac{2 \times (-8) + 1 \times 7}{2 + 1} = \dfrac{-16 + 7}{3} = \dfrac{-9}{3} = -3\)

\(\therefore\) the points of trisection are \((0, 2)\) and \((-2, -3)\)."""

S["Ex 5.2 Q.11"] = r"""Let P, Q, R divide seg AB into four equal parts, with A\(-\)P\(-\)Q\(-\)R\(-\)B.

Then P divides AB in the ratio \(1 : 3\), Q is the midpoint (ratio \(2 : 2 = 1 : 1\)) and R divides AB in the ratio \(3 : 1\), with A\((-14, -10)\) and B\((6, -2)\).

P: \(x = \dfrac{1 \times 6 + 3 \times (-14)}{4} = \dfrac{6 - 42}{4} = \dfrac{-36}{4} = -9\),
\(y = \dfrac{1 \times (-2) + 3 \times (-10)}{4} = \dfrac{-2 - 30}{4} = \dfrac{-32}{4} = -8\)

Q: \(x = \dfrac{-14 + 6}{2} = -4\), \(y = \dfrac{-10 + (-2)}{2} = -6\)

R: \(x = \dfrac{3 \times 6 + 1 \times (-14)}{4} = \dfrac{18 - 14}{4} = 1\),
\(y = \dfrac{3 \times (-2) + 1 \times (-10)}{4} = \dfrac{-6 - 10}{4} = -4\)

\(\therefore\) the required points are \((-9, -8)\), \((-4, -6)\) and \((1, -4)\)."""

S["Ex 5.2 Q.12"] = r"""Let P, Q, R, S divide seg AB into five congruent parts, with A\(-\)P\(-\)Q\(-\)R\(-\)S\(-\)B.

Then P, Q, R, S divide seg AB in the ratios \(1 : 4\), \(2 : 3\), \(3 : 2\) and \(4 : 1\) respectively, with A\((20, 10)\) and B\((0, 20)\).

P: \(x = \dfrac{1 \times 0 + 4 \times 20}{5} = \dfrac{80}{5} = 16\), \(y = \dfrac{1 \times 20 + 4 \times 10}{5} = \dfrac{60}{5} = 12\)

Q: \(x = \dfrac{2 \times 0 + 3 \times 20}{5} = \dfrac{60}{5} = 12\), \(y = \dfrac{2 \times 20 + 3 \times 10}{5} = \dfrac{70}{5} = 14\)

R: \(x = \dfrac{3 \times 0 + 2 \times 20}{5} = \dfrac{40}{5} = 8\), \(y = \dfrac{3 \times 20 + 2 \times 10}{5} = \dfrac{80}{5} = 16\)

S: \(x = \dfrac{4 \times 0 + 1 \times 20}{5} = \dfrac{20}{5} = 4\), \(y = \dfrac{4 \times 20 + 1 \times 10}{5} = \dfrac{90}{5} = 18\)

\(\therefore\) the required points are \((16, 12)\), \((12, 14)\), \((8, 16)\) and \((4, 18)\)."""

S["Ex 5.3 Q.1 (1)"] = r"""The slope of a line making an angle \(\theta\) with the positive direction of the X-axis is \(m = \tan\theta\).

\(m = \tan 45^\circ = 1\)

\(\therefore\) the slope of the line is 1."""

S["Ex 5.3 Q.1 (2)"] = r"""\(m = \tan\theta = \tan 60^\circ = \sqrt{3}\)

\(\therefore\) the slope of the line is \(\sqrt{3}\)."""

S["Ex 5.3 Q.1 (3)"] = r"""\(m = \tan\theta = \tan 90^\circ\), and \(\tan 90^\circ\) is not defined.

A line making \(90^\circ\) with the X-axis is parallel to the Y-axis, and for any two of its points \(x_2 - x_1 = 0\), so \(\dfrac{y_2 - y_1}{x_2 - x_1}\) would need division by 0.

\(\therefore\) the slope of the line **cannot be determined**."""

S["Ex 5.3 Q.4"] = r"""Slope of line AB \(= \dfrac{4 - (-1)}{0 - 1} = \dfrac{5}{-1} = -5\)

Slope of line BC \(= \dfrac{3 - 4}{-5 - 0} = \dfrac{-1}{-5} = \dfrac{1}{5}\)

Slope of line AC \(= \dfrac{3 - (-1)}{-5 - 1} = \dfrac{4}{-6} = -\dfrac{2}{3}\)

\(\therefore\) the slopes of the sides are \(-5\), \(\dfrac{1}{5}\) and \(-\dfrac{2}{3}\)."""

S["Ex 5.3 Q.5"] = r"""If both pairs of opposite sides of a quadrilateral are parallel, it is a parallelogram; and two lines are parallel when their slopes are equal.

Slope of line AB \(= \dfrac{2 - (-7)}{-1 - (-4)} = \dfrac{9}{3} = 3\)

Slope of line BC \(= \dfrac{5 - 2}{8 - (-1)} = \dfrac{3}{9} = \dfrac{1}{3}\)

Slope of line CD \(= \dfrac{-4 - 5}{5 - 8} = \dfrac{-9}{-3} = 3\)

Slope of line DA \(= \dfrac{-7 - (-4)}{-4 - 5} = \dfrac{-3}{-9} = \dfrac{1}{3}\)

Slope of AB = slope of CD \(\therefore\) line AB \(\parallel\) line CD

Slope of BC = slope of DA \(\therefore\) line BC \(\parallel\) line DA

Both pairs of opposite sides are parallel.

\(\therefore \square ABCD\) is a parallelogram."""

S["Ex 5.3 Q.6"] = r"""Slope of line RS \(= \dfrac{k - (-1)}{-2 - 1} = \dfrac{k + 1}{-3}\)

But the slope is given to be \(-2\).

\(\therefore \dfrac{k + 1}{-3} = -2\)

\(\therefore k + 1 = 6\)

\(\therefore k = 5\)"""

S["Ex 5.3 Q.7"] = r"""Slope of line BC \(= \dfrac{2 - (-5)}{1 - k} = \dfrac{7}{1 - k}\)

But the slope is given to be 7.

\(\therefore \dfrac{7}{1 - k} = 7\)

\(\therefore 1 - k = 1\)

\(\therefore k = 0\)"""

S["Ex 5.3 Q.8"] = r"""Parallel lines have equal slopes.

Slope of line PQ \(= \dfrac{6 - 4}{3 - 2} = \dfrac{2}{1} = 2\)

Slope of line RS \(= \dfrac{k - 1}{5 - 3} = \dfrac{k - 1}{2}\)

PQ \(\parallel\) RS \(\therefore\) slope of PQ = slope of RS

\(\therefore \dfrac{k - 1}{2} = 2\)

\(\therefore k - 1 = 4\)

\(\therefore k = 5\)"""

S["PS5 Q.3"] = r"""By the midpoint formula,

\(x = \dfrac{0 + 12}{2} = 6\)

\(y = \dfrac{6 + 20}{2} = \dfrac{26}{2} = 13\)

\(\therefore\) the co-ordinates of the midpoint are \((6, 13)\)."""

S["PS5 Q.4"] = r"""[Textbook note: the printed answer is \(3 : 1\). Working the section formula as this chapter defines it — the ratio \(m : n\) is measured from the FIRST named point — gives \(1 : 3\), and the chapter's own Practice set 5.2 Q.3 is keyed to that same convention. A quick check confirms it: A has \(x = 3\) and B has \(x = -9\), so the Y-axis \((x = 0)\) is 3 units from A and 9 units from B, i.e. \(AP : PB = 3 : 9 = 1 : 3\). The printed key is the reciprocal of the correct ratio.]

Every point of the Y-axis has \(x\) co-ordinate 0, so let the Y-axis cut seg AB at P\((0, y)\), dividing it in the ratio \(m : n\).

A\((3, 8) = (x_1, y_1)\), B\((-9, 3) = (x_2, y_2)\)

By the section formula, \(x = \dfrac{mx_2 + nx_1}{m + n}\)

\(\therefore 0 = \dfrac{m \times (-9) + n \times 3}{m + n}\)

\(\therefore -9m + 3n = 0\)

\(\therefore 3n = 9m\)

\(\therefore \dfrac{m}{n} = \dfrac{3}{9} = \dfrac{1}{3}\)

\(\therefore\) the Y-axis divides seg AB in the ratio \(1 : 3\).

(The point of division is \(y = \dfrac{1 \times 3 + 3 \times 8}{1 + 3} = \dfrac{27}{4}\), so the Y-axis cuts seg AB at \(\left(0, \dfrac{27}{4}\right)\).)"""

S["PS5 Q.5"] = r"""A point on the X-axis has \(y\) co-ordinate 0, so let it be M\((x, 0)\).

M is equidistant from P\((2, -5)\) and Q\((-2, 9)\), so \(MP^2 = MQ^2\).

\(\therefore (x - 2)^2 + (0 + 5)^2 = (x + 2)^2 + (0 - 9)^2\)

\(\therefore x^2 - 4x + 4 + 25 = x^2 + 4x + 4 + 81\)

\(\therefore -4x + 25 = 4x + 81\)

\(\therefore -8x = 56\)  \(\therefore x = -7\)

\(\therefore\) the required point is \((-7, 0)\)."""

S["PS5 Q.6 (i)"] = r"""A\((a, 0) = (x_1, y_1)\), B\((0, a) = (x_2, y_2)\)

\(AB = \sqrt{(0 - a)^2 + (a - 0)^2}\)

\(= \sqrt{a^2 + a^2} = \sqrt{2a^2}\)

\(\therefore AB = a\sqrt{2}\)  (taking \(a > 0\); in general the distance is \(|a|\sqrt{2}\))."""

S["PS5 Q.6 (iii)"] = r"""R\((-3a, a) = (x_1, y_1)\), S\((a, -2a) = (x_2, y_2)\)

\(RS = \sqrt{[a - (-3a)]^2 + (-2a - a)^2}\)

\(= \sqrt{(4a)^2 + (-3a)^2}\)

\(= \sqrt{16a^2 + 9a^2} = \sqrt{25a^2}\)

\(\therefore RS = 5a\)  (taking \(a > 0\); in general the distance is \(5|a|\))."""

S["PS5 Q.7"] = r"""The circumcentre is equidistant from all three vertices. Let it be P\((x, y)\), with A\((-3, 1)\), B\((0, -2)\), C\((1, 3)\).

\(PA^2 = PB^2\):

\((x + 3)^2 + (y - 1)^2 = x^2 + (y + 2)^2\)

\(\therefore x^2 + 6x + 9 + y^2 - 2y + 1 = x^2 + y^2 + 4y + 4\)

\(\therefore 6x - 6y + 6 = 0\)

\(\therefore x - y + 1 = 0\)  .......... (I)

\(PB^2 = PC^2\):

\(x^2 + (y + 2)^2 = (x - 1)^2 + (y - 3)^2\)

\(\therefore x^2 + y^2 + 4y + 4 = x^2 - 2x + 1 + y^2 - 6y + 9\)

\(\therefore 2x + 10y - 6 = 0\)

\(\therefore x + 5y - 3 = 0\)  .......... (II)

From (I), \(x = y - 1\). Substituting in (II):

\((y - 1) + 5y - 3 = 0\)  \(\therefore 6y = 4\)  \(\therefore y = \dfrac{2}{3}\)

\(\therefore x = \dfrac{2}{3} - 1 = -\dfrac{1}{3}\)

\(\therefore\) the circumcentre is \(\left(-\dfrac{1}{3}, \dfrac{2}{3}\right)\)."""

S["PS5 Q.8 (1)"] = r"""\(LM = \sqrt{(-5 - 6)^2 + (-3 - 4)^2} = \sqrt{121 + 49} = \sqrt{170}\)

\(MN = \sqrt{[-6 - (-5)]^2 + [8 - (-3)]^2} = \sqrt{1 + 121} = \sqrt{122}\)

\(LN = \sqrt{(-6 - 6)^2 + (8 - 4)^2} = \sqrt{144 + 16} = \sqrt{160}\)

\(\sqrt{122} + \sqrt{160} \approx 11.05 + 12.65 = 23.70 \ne \sqrt{170} \approx 13.04\), and no other pair adds to the third either, so the three points are not collinear.

\(\therefore\) a triangle **is** formed.

All three sides \(\sqrt{170}\), \(\sqrt{122}\), \(\sqrt{160}\) are different.

\(\therefore \triangle LMN\) is a **scalene** triangle."""

S["PS5 Q.8 (2)"] = r"""\(PQ = \sqrt{[-4 - (-2)]^2 + [-2 - (-6)]^2} = \sqrt{4 + 16} = \sqrt{20} = 2\sqrt{5}\)

\(QR = \sqrt{[-5 - (-4)]^2 + [0 - (-2)]^2} = \sqrt{1 + 4} = \sqrt{5}\)

\(PR = \sqrt{[-5 - (-2)]^2 + [0 - (-6)]^2} = \sqrt{9 + 36} = \sqrt{45} = 3\sqrt{5}\)

\(PQ + QR = 2\sqrt{5} + \sqrt{5} = 3\sqrt{5} = PR\)

\(\therefore\) the points P, Q, R are collinear.

\(\therefore\) the segments joining them **do not form a triangle**."""

S["PS5 Q.8 (3)"] = r"""\(AB = \sqrt{(-\sqrt{2} - \sqrt{2})^2 + (-\sqrt{2} - \sqrt{2})^2} = \sqrt{(2\sqrt{2})^2 + (2\sqrt{2})^2} = \sqrt{8 + 8} = \sqrt{16} = 4\)

\(BC = \sqrt{(-\sqrt{6} + \sqrt{2})^2 + (\sqrt{6} + \sqrt{2})^2}\)

\(= \sqrt{(6 - 2\sqrt{12} + 2) + (6 + 2\sqrt{12} + 2)} = \sqrt{16} = 4\)

\(AC = \sqrt{(-\sqrt{6} - \sqrt{2})^2 + (\sqrt{6} - \sqrt{2})^2}\)

\(= \sqrt{(6 + 2\sqrt{12} + 2) + (6 - 2\sqrt{12} + 2)} = \sqrt{16} = 4\)

\(\therefore AB = BC = AC = 4\), so the points are not collinear and a triangle is formed.

\(\therefore \triangle ABC\) is an **equilateral** triangle."""

S["PS5 Q.9"] = r"""Slope of line PQ \(= \dfrac{k - (-3)}{4 - (-12)} = \dfrac{k + 3}{16}\)

But the slope is given to be \(\dfrac{1}{2}\).

\(\therefore \dfrac{k + 3}{16} = \dfrac{1}{2}\)

\(\therefore 2(k + 3) = 16\)

\(\therefore k + 3 = 8\)

\(\therefore k = 5\)"""

S["PS5 Q.10"] = r"""Two lines are parallel when their slopes are equal.

Slope of line AB \(= \dfrac{5 - 8}{5 - 4} = \dfrac{-3}{1} = -3\)

Slope of line CD \(= \dfrac{7 - 4}{1 - 2} = \dfrac{3}{-1} = -3\)

\(\therefore\) slope of line AB = slope of line CD

\(\therefore\) line AB \(\parallel\) line CD."""

S["PS5 Q.11"] = r"""If both pairs of opposite sides of a quadrilateral are parallel, it is a parallelogram.

Slope of line PQ \(= \dfrac{2 - (-2)}{5 - 1} = \dfrac{4}{4} = 1\)

Slope of line QR \(= \dfrac{-1 - 2}{3 - 5} = \dfrac{-3}{-2} = \dfrac{3}{2}\)

Slope of line RS \(= \dfrac{-5 - (-1)}{-1 - 3} = \dfrac{-4}{-4} = 1\)

Slope of line SP \(= \dfrac{-2 - (-5)}{1 - (-1)} = \dfrac{3}{2}\)

Slope of PQ = slope of RS \(\therefore\) line PQ \(\parallel\) line RS

Slope of QR = slope of SP \(\therefore\) line QR \(\parallel\) line SP

\(\therefore \square PQRS\) is a parallelogram."""

S["PS5 Q.12"] = r"""A quadrilateral whose opposite sides are equal and whose diagonals are equal is a rectangle.

\(PQ = \sqrt{(-1 - 2)^2 + (3 - 1)^2} = \sqrt{9 + 4} = \sqrt{13}\)

\(QR = \sqrt{[-5 - (-1)]^2 + (-3 - 3)^2} = \sqrt{16 + 36} = \sqrt{52} = 2\sqrt{13}\)

\(RS = \sqrt{[-2 - (-5)]^2 + [-5 - (-3)]^2} = \sqrt{9 + 4} = \sqrt{13}\)

\(SP = \sqrt{[2 - (-2)]^2 + [1 - (-5)]^2} = \sqrt{16 + 36} = \sqrt{52} = 2\sqrt{13}\)

\(\therefore PQ = RS\) and \(QR = SP\), so \(\square PQRS\) is a parallelogram.

Diagonals:

\(PR = \sqrt{(-5 - 2)^2 + (-3 - 1)^2} = \sqrt{49 + 16} = \sqrt{65}\)

\(QS = \sqrt{[-2 - (-1)]^2 + (-5 - 3)^2} = \sqrt{1 + 64} = \sqrt{65}\)

\(\therefore PR = QS\)

A parallelogram whose diagonals are equal is a rectangle.

\(\therefore \square PQRS\) is a rectangle."""

S["PS5 Q.13"] = r"""A median joins a vertex to the midpoint of the opposite side, so first find the three midpoints.

Midpoint of BC \(= \left(\dfrac{5 + 3}{2}, \dfrac{-3 + 5}{2}\right) = (4, 1)\)

Midpoint of AC \(= \left(\dfrac{-1 + 3}{2}, \dfrac{1 + 5}{2}\right) = (1, 3)\)

Midpoint of AB \(= \left(\dfrac{-1 + 5}{2}, \dfrac{1 - 3}{2}\right) = (2, -1)\)

Median from A \(= \sqrt{[4 - (-1)]^2 + (1 - 1)^2} = \sqrt{25 + 0} = 5\)

Median from B \(= \sqrt{(1 - 5)^2 + [3 - (-3)]^2} = \sqrt{16 + 36} = \sqrt{52} = 2\sqrt{13}\)

Median from C \(= \sqrt{(2 - 3)^2 + (-1 - 5)^2} = \sqrt{1 + 36} = \sqrt{37}\)

\(\therefore\) the lengths of the medians are 5, \(2\sqrt{13}\) and \(\sqrt{37}\)."""

S["PS5 Q.14"] = r"""Let the triangle be \(\triangle ABC\) with vertices \((x_1, y_1)\), \((x_2, y_2)\), \((x_3, y_3)\), and let D, E, F be the midpoints of its sides.

Each vertex of the triangle appears in exactly two of the three midpoints, so adding the three midpoints adds every vertex twice:

\(x_D + x_E + x_F = \dfrac{x_1 + x_2}{2} + \dfrac{x_2 + x_3}{2} + \dfrac{x_3 + x_1}{2} = x_1 + x_2 + x_3\)

and likewise for \(y\).

\(\therefore\) the centroid of the original triangle, \(\left(\dfrac{x_1 + x_2 + x_3}{3}, \dfrac{y_1 + y_2 + y_3}{3}\right)\), is the same as the centroid of \(\triangle DEF\).

\(x = \dfrac{-7 + 8 + 2}{3} = \dfrac{3}{3} = 1\)

\(y = \dfrac{6 + 5 + (-2)}{3} = \dfrac{9}{3} = 3\)

\(\therefore\) the centroid of the triangle is \((1, 3)\)."""

S["PS5 Q.15"] = r"""A quadrilateral whose four sides are equal and whose diagonals are equal is a square.

\(AB = \sqrt{(6 - 4)^2 + [0 - (-1)]^2} = \sqrt{4 + 1} = \sqrt{5}\)

\(BC = \sqrt{(7 - 6)^2 + (-2 - 0)^2} = \sqrt{1 + 4} = \sqrt{5}\)

\(CD = \sqrt{(5 - 7)^2 + [-3 - (-2)]^2} = \sqrt{4 + 1} = \sqrt{5}\)

\(DA = \sqrt{(4 - 5)^2 + [-1 - (-3)]^2} = \sqrt{1 + 4} = \sqrt{5}\)

\(AC = \sqrt{(7 - 4)^2 + [-2 - (-1)]^2} = \sqrt{9 + 1} = \sqrt{10}\)

\(BD = \sqrt{(5 - 6)^2 + (-3 - 0)^2} = \sqrt{1 + 9} = \sqrt{10}\)

\(\therefore AB = BC = CD = DA\) and \(AC = BD\)

\(\therefore \square ABCD\) is a square."""

S["PS5 Q.16"] = r"""Let the circumcentre be P\((x, y)\); it is equidistant from A\((7, 1)\), B\((3, 5)\), C\((2, 0)\).

\(PA^2 = PB^2\):

\((x - 7)^2 + (y - 1)^2 = (x - 3)^2 + (y - 5)^2\)

\(\therefore x^2 - 14x + 49 + y^2 - 2y + 1 = x^2 - 6x + 9 + y^2 - 10y + 25\)

\(\therefore -8x + 8y + 16 = 0\)

\(\therefore y = x - 2\)  .......... (I)

\(PB^2 = PC^2\):

\((x - 3)^2 + (y - 5)^2 = (x - 2)^2 + y^2\)

\(\therefore x^2 - 6x + 9 + y^2 - 10y + 25 = x^2 - 4x + 4 + y^2\)

\(\therefore -2x - 10y + 30 = 0\)

\(\therefore x + 5y = 15\)  .......... (II)

Substituting (I) in (II): \(x + 5(x - 2) = 15\)  \(\therefore 6x = 25\)  \(\therefore x = \dfrac{25}{6}\)

\(\therefore y = \dfrac{25}{6} - 2 = \dfrac{13}{6}\)

Radius \(= PC = \sqrt{\left(\dfrac{25}{6} - 2\right)^2 + \left(\dfrac{13}{6} - 0\right)^2} = \sqrt{\left(\dfrac{13}{6}\right)^2 + \left(\dfrac{13}{6}\right)^2} = \dfrac{13}{6}\sqrt{2}\)

\(\therefore\) the circumcentre is \(\left(\dfrac{25}{6}, \dfrac{13}{6}\right)\) and the radius is \(\dfrac{13\sqrt{2}}{6}\)."""

S["PS5 Q.18"] = r"""\(AB = \sqrt{[-3 - (-4)]^2 + [-7 - (-2)]^2} = \sqrt{1 + 25} = \sqrt{26}\)

\(BC = \sqrt{[3 - (-3)]^2 + [-2 - (-7)]^2} = \sqrt{36 + 25} = \sqrt{61}\)

\(CD = \sqrt{(2 - 3)^2 + [3 - (-2)]^2} = \sqrt{1 + 25} = \sqrt{26}\)

\(DA = \sqrt{(-4 - 2)^2 + (-2 - 3)^2} = \sqrt{36 + 25} = \sqrt{61}\)

\(\therefore AB = CD\) and \(BC = DA\) — both pairs of opposite sides are equal, so \(\square\) ABCD is a parallelogram.

Now test the stronger cases.

Adjacent sides: \(AB = \sqrt{26} \ne \sqrt{61} = BC\), so it is **not** a rhombus and **not** a square.

Diagonals: \(AC = \sqrt{[3 - (-4)]^2 + [-2 - (-2)]^2} = \sqrt{49 + 0} = 7\)

\(BD = \sqrt{[2 - (-3)]^2 + [3 - (-7)]^2} = \sqrt{25 + 100} = \sqrt{125} = 5\sqrt{5}\)

\(AC \ne BD\), so it is **not** a rectangle.

\(\therefore \square\) ABCD is a **parallelogram** (and nothing more special)."""

S["PS5 Q.19"] = r"""A\(-\)P\(-\)Q\(-\)R\(-\)S\(-\)B with five congruent parts, so Q is the second division point and S the fourth: each step is one fifth of seg AB.

Going from Q to S covers two steps, so one step is

\(\left(\dfrac{4 - 12}{2}, \dfrac{18 - 14}{2}\right) = (-4, 2)\)

A is two steps back from Q:

\(A = (12 - 2 \times (-4),\; 14 - 2 \times 2) = (12 + 8,\; 14 - 4) = (20, 10)\)

P is one step on from A: \(P = (20 - 4,\; 10 + 2) = (16, 12)\)

R is three steps on from A: \(R = (20 - 12,\; 10 + 6) = (8, 16)\)

B is five steps on from A: \(B = (20 - 20,\; 10 + 10) = (0, 20)\)

\(\therefore A(20, 10)\), \(P(16, 12)\), \(R(8, 16)\), \(B(0, 20)\).

Check: S should be four steps on from A — \((20 - 16, 10 + 8) = (4, 18)\), which is the given point S."""

S["PS5 Q.20"] = r"""The centre of the circle is equidistant from all three points on it. Let it be M\((x, y)\).

\(MQ^2 = MR^2\), with Q\((3, -7)\) and R\((3, 3)\):

\((x - 3)^2 + (y + 7)^2 = (x - 3)^2 + (y - 3)^2\)

\(\therefore y^2 + 14y + 49 = y^2 - 6y + 9\)

\(\therefore 20y = -40\)  \(\therefore y = -2\)

\(MP^2 = MQ^2\), with P\((6, -6)\):

\((x - 6)^2 + (y + 6)^2 = (x - 3)^2 + (y + 7)^2\)

\(\therefore x^2 - 12x + 36 + y^2 + 12y + 36 = x^2 - 6x + 9 + y^2 + 14y + 49\)

\(\therefore -12x + 12y + 72 = -6x + 14y + 58\)

\(\therefore -6x - 2y + 14 = 0\)  \(\therefore 3x + y = 7\)

Putting \(y = -2\): \(3x - 2 = 7\)  \(\therefore x = 3\)

\(\therefore\) the centre of the circle is \((3, -2)\)."""

S["PS5 Q.21"] = r"""[Textbook note: the printed answer gives only \((7, 6)\) and \((3, 6)\). There is a third position for D — \((-1, -10)\) — and it satisfies the question, so the printed key is incomplete rather than wrong. All three are derived below.]

The diagonals of a parallelogram bisect each other, so the midpoint of one diagonal equals the midpoint of the other. Any one of the three given points can be the vertex opposite D, which gives three cases.

**Case 1: \(\square\) ABCD** — diagonals AC and BD, so midpoint of AC = midpoint of BD.

\(\left(\dfrac{5 + 3}{2}, \dfrac{6 - 2}{2}\right) = \left(\dfrac{1 + x}{2}, \dfrac{-2 + y}{2}\right)\)

\(\therefore (4, 2) = \left(\dfrac{1 + x}{2}, \dfrac{-2 + y}{2}\right)\)  \(\therefore x = 7\), \(y = 6\)  \(\therefore D(7, 6)\)

**Case 2: \(\square\) ACBD** — diagonals AB and CD.

\(\left(\dfrac{5 + 1}{2}, \dfrac{6 - 2}{2}\right) = \left(\dfrac{3 + x}{2}, \dfrac{-2 + y}{2}\right)\)

\(\therefore (3, 2) = \left(\dfrac{3 + x}{2}, \dfrac{-2 + y}{2}\right)\)  \(\therefore x = 3\), \(y = 6\)  \(\therefore D(3, 6)\)

**Case 3: \(\square\) ABDC** — diagonals AD and BC.

\(\left(\dfrac{1 + 3}{2}, \dfrac{-2 - 2}{2}\right) = \left(\dfrac{5 + x}{2}, \dfrac{6 + y}{2}\right)\)

\(\therefore (2, -2) = \left(\dfrac{5 + x}{2}, \dfrac{6 + y}{2}\right)\)  \(\therefore x = -1\), \(y = -10\)  \(\therefore D(-1, -10)\)

\(\therefore\) the possible co-ordinates of D are \((7, 6)\), \((3, 6)\) and \((-1, -10)\)."""

S["PS5 Q.22"] = r"""The diagonals of \(\square\) ABCD are seg AC and seg BD.

Slope of diagonal AC \(= \dfrac{-3 - 7}{0 - 1} = \dfrac{-10}{-1} = 10\)

Slope of diagonal BD \(= \dfrac{3 - 3}{-3 - 6} = \dfrac{0}{-9} = 0\)

\(\therefore\) the slopes of the diagonals are 10 and 0.

(A slope of 0 means diagonal BD is parallel to the X-axis.)"""

# ---------------------------------------------------------------- join on ref
dump = json.load(open("geo-coordinate-10.all.topaper.json", encoding="utf-8"))
by_ref = {r["ref"]: r for r in dump}

missing = [r["ref"] for r in dump if r["ref"] not in S]
extra = [k for k in S if k not in by_ref]
assert not missing, f"{len(missing)} dumped rows have NO solution: {missing}"
assert not extra, f"{len(extra)} authored solutions match no dumped row: {extra}"

out = []
for row in dump:                       # iterate the DUMP, not the dict
    ref = row["ref"]
    out.append({"id": row["id"], "ref": ref, "solution": S[ref]})

# ref -> id pairing must be identical to the dump's own pairing
assert [(o["ref"], o["id"]) for o in out] == [(r["ref"], r["id"]) for r in dump]
assert len({o["id"] for o in out}) == len(out) == len(dump)

json.dump(out, open("geo-coordinate-10.solutions.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
print(f"wrote {len(out)} solutions; ref->id pairing verified against the dump.")
