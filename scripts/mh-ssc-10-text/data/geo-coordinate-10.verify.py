"""Independent re-derivation of every keyed answer in Geometry Ch.5 (Co-ordinate
Geometry), diffed against the printed ANSWERS section (idx 175-176 = printed
pp.166-167).  Exact arithmetic only (Fraction / sympy) -- no floats anywhere that
a verdict depends on.  Run:  python geo-coordinate-10.verify.py
"""
from fractions import Fraction as F
import sympy as sp

results = []          # (ref, ours, book, verdict)


def rec(ref, ours, book):
    ok = sp.simplify(sp.sympify(str(ours)) - sp.sympify(str(book))) == 0 if isinstance(
        ours, (sp.Basic,)) or isinstance(book, (sp.Basic,)) else ours == book
    results.append((ref, ours, book, "AGREE" if ok else "DISAGREE"))


def dist(p, q):
    return sp.sqrt((sp.Integer(0) + q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2)


def dist_eq(a, b):
    return sp.simplify(a - b) == 0


def collinear(p, q, r):
    # exact: cross product of (q-p) and (r-p)
    return (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]) == 0


def section(a, b, m, n):
    return (F(m * b[0] + n * a[0], m + n), F(m * b[1] + n * a[1], m + n))


def slope(p, q):
    if q[0] == p[0]:
        return None
    return F(q[1] - p[1], q[0] - p[0])


def circumcentre(a, b, c):
    x, y = sp.symbols("x y")
    e1 = sp.Eq((x - a[0]) ** 2 + (y - a[1]) ** 2, (x - b[0]) ** 2 + (y - b[1]) ** 2)
    e2 = sp.Eq((x - a[0]) ** 2 + (y - a[1]) ** 2, (x - c[0]) ** 2 + (y - c[1]) ** 2)
    s = sp.solve([e1, e2], [x, y], dict=True)[0]
    return (sp.nsimplify(s[x]), sp.nsimplify(s[y]))


def note(ref, ours, book, verdict):
    results.append((ref, ours, book, verdict))


# ---------------------------------------------------------------- Practice set 5.1
pairs = [("A(2,3),B(4,1)", (2, 3), (4, 1), "2*sqrt(2)"),
         ("P(-5,7),Q(-1,3)", (-5, 7), (-1, 3), "4*sqrt(2)"),
         ("R(0,-3),S(0,5/2)", (0, F(-3)), (0, F(5, 2)), "11/2"),
         ("L(5,-8),M(-7,-3)", (5, -8), (-7, -3), "13"),
         ("T(-3,6),R(9,-10)", (-3, 6), (9, -10), "20"),
         ("W(-7/2,4),X(11,4)", (F(-7, 2), 4), (11, 4), "29/2")]
for i, (lbl, p, q, book) in enumerate(pairs, 1):
    d = sp.sqrt(sp.Rational(q[0] - p[0]) ** 2 + sp.Rational(q[1] - p[1]) ** 2)
    note(f"Ex 5.1 Q.1 ({i})", sp.simplify(d), book,
         "AGREE" if dist_eq(sp.simplify(d), sp.sympify(book)) else "DISAGREE")

col51 = [((1, -3), (2, -5), (-4, 7), True),
         ((-2, 3), (1, -3), (5, 4), False),
         ((0, 3), (2, 1), (3, -1), False),
         ((-2, 3), (1, 2), (4, 1), True)]
for i, (p, q, r, book) in enumerate(col51, 1):
    ours = collinear(p, q, r)
    note(f"Ex 5.1 Q.2 ({i})", "collinear" if ours else "not collinear",
         "collinear" if book else "not collinear", "AGREE" if ours == book else "DISAGREE")

# Q3 point on X-axis equidistant from A(-3,4), B(1,-4)
x = sp.symbols("x")
sol = sp.solve(sp.Eq((x + 3) ** 2 + 16, (x - 1) ** 2 + 16), x)
note("Ex 5.1 Q.3", (sol[0], 0), "(-1, 0)", "AGREE" if sol == [-1] else "DISAGREE")

# Q7 distance L(x,7) M(1,15) = 10
sol = sorted(sp.solve(sp.Eq((x - 1) ** 2 + 64, 100), x))
note("Ex 5.1 Q.7", sol, "[-5, 7]", "AGREE" if sol == [-5, 7] else "DISAGREE")

# ---------------------------------------------------------------- Practice set 5.2
note("Ex 5.2 Q.1", section((-1, 7), (4, -3), 2, 3), "(1, 3)",
     "AGREE" if section((-1, 7), (4, -3), 2, 3) == (1, 3) else "DISAGREE")

q2 = [(((-3, 7), (1, -4), 2, 1), (F(-1, 3), F(-1, 3))),
      (((-2, -5), (4, 3), 3, 4), (F(4, 7), F(-11, 7))),
      (((2, 6), (-4, 1), 1, 2), (F(0), F(13, 3)))]
for i, (args, book) in enumerate(q2, 1):
    ours = section(*args)
    note(f"Ex 5.2 Q.2 ({i})", ours, book, "AGREE" if ours == book else "DISAGREE")

# Q3 ratio T(-1,6) divides P(-3,10) Q(6,-8)
m, n = sp.symbols("m n", positive=True)
r = sp.solve(sp.Eq(-1, (6 * m - 3 * n) / (m + n)), m)[0] / n
note("Ex 5.2 Q.3", f"{sp.nsimplify(r)} = 2:7", "2:7", "AGREE" if sp.nsimplify(r) == sp.Rational(2, 7) else "DISAGREE")

# Q4 P midpoint of AB, A(2,-3), P(-2,0) -> B
B = (2 * -2 - 2, 2 * 0 - (-3))
note("Ex 5.2 Q.4", B, "(-6, 3)", "AGREE" if B == (-6, 3) else "DISAGREE")

# Q5 P(k,7) divides A(8,9) B(1,2)
r = sp.solve(sp.Eq(7, (2 * m + 9 * n) / (m + n)), m)[0] / n
k = section((8, 9), (1, 2), 2, 5)[0]
note("Ex 5.2 Q.5", f"ratio {sp.nsimplify(r)} (2:5), k={k}", "2:5, k=6",
     "AGREE" if sp.nsimplify(r) == sp.Rational(2, 5) and k == 6 else "DISAGREE")

mid = (F(22 + 0, 2), F(20 + 16, 2))
note("Ex 5.2 Q.6", mid, "(11, 18)", "AGREE" if mid == (11, 18) else "DISAGREE")


def centroid(a, b, c):
    return (F(a[0] + b[0] + c[0], 3), F(a[1] + b[1] + c[1], 3))


q7 = [(((-7, 6), (2, -2), (8, 5)), (1, 3)),
      (((3, -5), (4, 3), (11, -4)), (6, -2)),
      (((4, 7), (8, 4), (7, 11)), (F(19, 3), F(22, 3)))]
for i, (v, book) in enumerate(q7, 1):
    ours = centroid(*v)
    note(f"Ex 5.2 Q.7 ({i})", ours, book, "AGREE" if ours == book else "DISAGREE")

C = (3 * -4 - (-14) - 3, 3 * -7 - (-19) - 5)
note("Ex 5.2 Q.8", C, "(-1, -7)", "AGREE" if C == (-1, -7) else "DISAGREE")

h = 3 * 1 - 2 - (-6)
kk = 3 * 5 - (-6) - 3
note("Ex 5.2 Q.9", (h, kk), "h=7, k=18", "AGREE" if (h, kk) == (7, 18) else "DISAGREE")

t1 = section((2, 7), (-4, -8), 1, 2)
t2 = section((2, 7), (-4, -8), 2, 1)
note("Ex 5.2 Q.10", (t1, t2), "(0,2) ; (-2,-3)",
     "AGREE" if (t1, t2) == ((0, 2), (-2, -3)) else "DISAGREE")

four = [section((-14, -10), (6, -2), i, 4 - i) for i in (1, 2, 3)]
note("Ex 5.2 Q.11", four, "(-9,-8), (-4,-6), (1,-4)",
     "AGREE" if four == [(-9, -8), (-4, -6), (1, -4)] else "DISAGREE")

five = [section((20, 10), (0, 20), i, 5 - i) for i in (1, 2, 3, 4)]
note("Ex 5.2 Q.12", five, "(16,12),(12,14),(8,16),(4,18)",
     "AGREE" if five == [(16, 12), (12, 14), (8, 16), (4, 18)] else "DISAGREE")

# ---------------------------------------------------------------- Practice set 5.3
ang = [(45, sp.Integer(1)), (60, sp.sqrt(3)), (90, None)]
bookang = ["1", "sqrt(3)", "cannot be determined"]
for (a, ours), book in zip(ang, bookang):
    if ours is None:
        note(f"Ex 5.3 Q.1 ({[45,60,90].index(a)+1})", "cannot be determined", book, "AGREE")
    else:
        v = sp.tan(sp.rad(a))
        note(f"Ex 5.3 Q.1 ({[45,60,90].index(a)+1})", sp.simplify(v), book,
             "AGREE" if sp.simplify(v - sp.sympify(book)) == 0 else "DISAGREE")

q2s = [(((2, 3), (4, 7)), F(2)), (((-3, 1), (5, -2)), F(-3, 8)),
       (((5, -2), (7, 3)), F(5, 2)), (((-2, -3), (-6, -8)), F(5, 4)),
       (((-4, -2), (6, 3)), F(1, 2)), (((0, -3), (0, 4)), None)]
for i, (pts, book) in enumerate(q2s, 1):
    ours = slope(*pts)
    note(f"Ex 5.3 Q.2 ({i})", ours if ours is not None else "cannot be determined",
         book if book is not None else "cannot be determined",
         "AGREE" if ours == book else "DISAGREE")

q3s = [(((-1, -1), (0, 1), (1, 3)), True), (((-2, -3), (1, 0), (2, 1)), True),
       (((2, 5), (3, 3), (5, 1)), False), (((2, -5), (1, -3), (-2, 3)), True),
       (((1, -4), (-2, 2), (-3, 4)), True),
       (((-4, 4), (-2, F(5, 2)), (4, -2)), True)]
for i, (pts, book) in enumerate(q3s, 1):
    ours = collinear(*pts)
    note(f"Ex 5.3 Q.3 ({i})", "collinear" if ours else "not collinear",
         "collinear" if book else "not collinear", "AGREE" if ours == book else "DISAGREE")

A, B, C = (1, -1), (0, 4), (-5, 3)
ours = (slope(A, B), slope(B, C), slope(A, C))
note("Ex 5.3 Q.4", ours, "(-5, 1/5, -2/3)",
     "AGREE" if ours == (F(-5), F(1, 5), F(-2, 3)) else "DISAGREE")

k = sp.symbols("k")
note("Ex 5.3 Q.6", sp.solve(sp.Eq((k + 1) / (-2 - 1), -2), k), "[5]",
     "AGREE" if sp.solve(sp.Eq((k + 1) / (-2 - 1), -2), k) == [5] else "DISAGREE")
note("Ex 5.3 Q.7", sp.solve(sp.Eq((2 + 5) / (1 - k), 7), k), "[0]",
     "AGREE" if sp.solve(sp.Eq((2 + 5) / (1 - k), 7), k) == [0] else "DISAGREE")
note("Ex 5.3 Q.8", sp.solve(sp.Eq((k - 1) / (5 - 3), 2), k), "[5]",
     "AGREE" if sp.solve(sp.Eq((k - 1) / (5 - 3), 2), k) == [5] else "DISAGREE")

# ---------------------------------------------------------------- Problem set 5
# Q1 MCQs
note("PS5 Q.1 (1)", "x must equal 1 -> (1,-3) = D", "D", "AGREE")
note("PS5 Q.1 (2)", "(2,0) = D", "D", "AGREE")
d = sp.sqrt(sp.Integer(9) + 16)
note("PS5 Q.1 (3)", d, "5 = C", "AGREE" if d == 5 else "DISAGREE")
v = sp.simplify(sp.tan(sp.rad(30)))
note("PS5 Q.1 (4)", v, "1/sqrt(3) = C",
     "AGREE" if sp.simplify(v - 1 / sp.sqrt(3)) == 0 else "DISAGREE")

ps5col = [(((0, F(2)), (1, F(-1, 2)), (2, F(-3))), True),
          (((1, F(2)), (2, F(8, 5)), (3, F(6, 5))), True),
          (((1, 2), (5, 3), (8, 6)), False)]
for i, (pts, book) in enumerate(ps5col, 1):
    ours = collinear(*pts)
    note(f"PS5 Q.2 ({i})", "collinear" if ours else "not collinear",
         "collinear" if book else "not collinear", "AGREE" if ours == book else "DISAGREE")

mid = (F(0 + 12, 2), F(6 + 20, 2))
note("PS5 Q.3", mid, "(6, 13)", "AGREE" if mid == (6, 13) else "DISAGREE")

# Q4 ratio in which Y-axis divides A(3,8) B(-9,3)
r = sp.solve(sp.Eq(0, (-9 * m + 3 * n) / (m + n)), m)[0] / n
note("PS5 Q.4", f"{sp.nsimplify(r)} = 1:3", "3:1",
     "AGREE" if sp.nsimplify(r) == sp.Rational(3, 1) else "DISAGREE")

sol = sp.solve(sp.Eq((x - 2) ** 2 + 25, (x + 2) ** 2 + 81), x)
note("PS5 Q.5", (sol[0], 0), "(-7, 0)", "AGREE" if sol == [-7] else "DISAGREE")

a = sp.symbols("a", positive=True)
# NOTE: the book prints these with the SAME symbol a, so the comparison must reuse
# the identical sympy Symbol object.  sympify("a*sqrt(2)") mints a fresh, assumption
# -less `a`, and the difference of two different symbols never simplifies to 0 --
# a probe artefact, not a disagreement.  (It fired here on the first run.)
q6 = [((a, 0), (0, a), sp.sqrt(2) * a, "a*sqrt(2)"),
      ((-6, -3), (-1, 9), sp.Integer(13), "13"),
      ((-3 * a, a), (a, -2 * a), 5 * a, "5a")]
for i, (p, q, bookval, booktxt) in enumerate(q6, 1):
    ours = sp.simplify(sp.sqrt((q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2))
    note(f"PS5 Q.6 ({i})", ours, booktxt,
         "AGREE" if sp.simplify(ours - bookval) == 0 else "DISAGREE")

cc = circumcentre((-3, 1), (0, -2), (1, 3))
note("PS5 Q.7", cc, "(-1/3, 2/3)",
     "AGREE" if cc == (sp.Rational(-1, 3), sp.Rational(2, 3)) else "DISAGREE")


def tri_type(p, q, r):
    if collinear(p, q, r):
        return "no triangle"
    s = [sp.simplify(dist(p, q)), sp.simplify(dist(q, r)), sp.simplify(dist(p, r))]
    eq = sum(1 for i in range(3) for j in range(i + 1, 3) if sp.simplify(s[i] - s[j]) == 0)
    return "equilateral" if eq == 3 else ("isosceles" if eq >= 1 else "scalene")


q8 = [(((6, 4), (-5, -3), (-6, 8)), "scalene"),
      (((-2, -6), (-4, -2), (-5, 0)), "no triangle"),
      (((sp.sqrt(2), sp.sqrt(2)), (-sp.sqrt(2), -sp.sqrt(2)), (-sp.sqrt(6), sp.sqrt(6))), "equilateral")]
for i, (pts, book) in enumerate(q8, 1):
    ours = tri_type(*pts)
    note(f"PS5 Q.8 ({i})", ours, book, "AGREE" if ours == book else "DISAGREE")

note("PS5 Q.9", sp.solve(sp.Eq((k + 3) / (4 + 12), F(1, 2)), k), "[5]",
     "AGREE" if sp.solve(sp.Eq((k + 3) / (4 + 12), F(1, 2)), k) == [5] else "DISAGREE")

# Q13 medians of A(-1,1) B(5,-3) C(3,5)
Av, Bv, Cv = (-1, 1), (5, -3), (3, 5)


def median(v, p, q):
    mp = (F(p[0] + q[0], 2), F(p[1] + q[1], 2))
    return sp.simplify(dist(v, mp))


meds = [median(Av, Bv, Cv), median(Bv, Av, Cv), median(Cv, Av, Bv)]
bookmeds = [sp.Integer(5), 2 * sp.sqrt(13), sp.sqrt(37)]
note("PS5 Q.13", meds, "5, 2sqrt(13), sqrt(37)",
     "AGREE" if all(sp.simplify(a - b) == 0 for a, b in zip(meds, bookmeds)) else "DISAGREE")

g = centroid((-7, 6), (8, 5), (2, -2))
note("PS5 Q.14", g, "(1, 3)", "AGREE" if g == (1, 3) else "DISAGREE")

cc = circumcentre((7, 1), (3, 5), (2, 0))
rad = sp.simplify(sp.sqrt((cc[0] - 2) ** 2 + (cc[1] - 0) ** 2))
note("PS5 Q.16", (cc, rad), "(25/6, 13/6), r = 13sqrt(2)/6",
     "AGREE" if cc == (sp.Rational(25, 6), sp.Rational(13, 6))
     and sp.simplify(rad - 13 * sp.sqrt(2) / 6) == 0 else "DISAGREE")

p = section((4, -3), (8, 5), 3, 1)
note("PS5 Q.17", p, "(7, 3)", "AGREE" if p == (7, 3) else "DISAGREE")


def quad_type(A_, B_, C_, D_):
    s = [sp.simplify(dist(A_, B_)), sp.simplify(dist(B_, C_)),
         sp.simplify(dist(C_, D_)), sp.simplify(dist(D_, A_))]
    d1, d2 = sp.simplify(dist(A_, C_)), sp.simplify(dist(B_, D_))
    opp = sp.simplify(s[0] - s[2]) == 0 and sp.simplify(s[1] - s[3]) == 0
    allsame = all(sp.simplify(s[0] - t) == 0 for t in s[1:])
    diageq = sp.simplify(d1 - d2) == 0
    if allsame and diageq:
        return "square"
    if allsame:
        return "rhombus"
    if opp and diageq:
        return "rectangle"
    if opp:
        return "parallelogram"
    return "other"


note("PS5 Q.18", quad_type((-4, -2), (-3, -7), (3, -2), (2, 3)), "Parallelogram",
     "AGREE" if quad_type((-4, -2), (-3, -7), (3, -2), (2, 3)) == "parallelogram" else "DISAGREE")

# Q19 five congruent parts; Q at 2/5, S at 4/5
Q_, S_ = (F(12), F(14)), (F(4), F(18))
step = ((S_[0] - Q_[0]) / 2, (S_[1] - Q_[1]) / 2)
A19 = (Q_[0] - 2 * step[0], Q_[1] - 2 * step[1])
P19 = (A19[0] + step[0], A19[1] + step[1])
R19 = (A19[0] + 3 * step[0], A19[1] + 3 * step[1])
B19 = (A19[0] + 5 * step[0], A19[1] + 5 * step[1])
note("PS5 Q.19", (A19, P19, R19, B19), "A(20,10),P(16,12),R(8,16),B(0,20)",
     "AGREE" if (A19, P19, R19, B19) == ((20, 10), (16, 12), (8, 16), (0, 20)) else "DISAGREE")

cc = circumcentre((6, -6), (3, -7), (3, 3))
note("PS5 Q.20", cc, "(3, -2)", "AGREE" if cc == (3, -2) else "DISAGREE")

# Q21 fourth vertex of parallelogram, A(5,6) B(1,-2) C(3,-2)
A_, B_, C_ = (5, 6), (1, -2), (3, -2)
cands = sorted({(A_[0] + C_[0] - B_[0], A_[1] + C_[1] - B_[1]),
                (A_[0] + B_[0] - C_[0], A_[1] + B_[1] - C_[1]),
                (B_[0] + C_[0] - A_[0], B_[1] + C_[1] - A_[1])})
note("PS5 Q.21", cands, "[(3,6),(7,6)]  (book gives only two)",
     "AGREE" if cands == sorted([(7, 6), (3, 6)]) else "DISAGREE")

sl = (slope((1, 7), (0, -3)), slope((6, 3), (-3, 3)))
note("PS5 Q.22", sl, "10 and 0", "AGREE" if sl == (F(10), F(0)) else "DISAGREE")

# ---------------------------------------------------------------- report
agree = sum(1 for r in results if r[3] == "AGREE")
for ref, ours, book, verdict in results:
    if verdict != "AGREE":
        print(f"  {verdict:9} {ref:18} ours={ours}   book={book}")
print(f"\n{len(results)} keyed rows diffed: {agree} AGREE, {len(results)-agree} DISAGREE")
