"""Check that each REPAIRED practice stem actually reaches its stored key.

This is the acceptance criterion for apply-report-fixes-practice.ts: the point
of the repair is that the printed stem yields the printed answer. Run BEFORE
applying, so an error in my transcription of the repair is caught on paper
rather than in the database.
"""
from fractions import Fraction
import math
import sympy as sp

FAIL = []


def check(label, cond, detail=""):
    if not cond:
        FAIL.append(label)
    print("  [%s] %s %s" % ("ok " if cond else "FAIL", label, detail))


print("Q2007  angle between (2,5,-3) and (-1,8,4); key D = 26/(9*sqrt38)")
a, b = sp.Matrix([2, 5, -3]), sp.Matrix([-1, 8, 4])
check("|a| = sqrt(38)", sp.sqrt(a.dot(a)) == sp.sqrt(38))
check("|b| = 9", sp.sqrt(b.dot(b)) == 9)
check("a.b = 26", a.dot(b) == 26)
check("cos = 26/(9 sqrt38) matches option D", sp.simplify(sp.Rational(a.dot(b), 1) / (9 * sp.sqrt(38)) - 26 / (9 * sp.sqrt(38))) == 0)

print("\nQ2010  (4L+1,4,-18) || (-3,5M-3,6); key C = (2, 1/3)")
L, M = sp.symbols("L M")
d1 = sp.Matrix([4 * L + 1, 4, -18])
d2 = sp.Matrix([-3, 5 * M - 3, 6])
t = sp.Rational(-18, 6)
sol = sp.solve([sp.Eq(4 * L + 1, t * -3), sp.Eq(4, t * (5 * M - 3))], [L, M], dict=True)[0]
print("   solved:", sol)
check("lambda = 2", sol[L] == 2)
check("mu = 1/3", sol[M] == sp.Rational(1, 3))
check("cross product is zero (genuinely parallel)",
      d1.subs(sol).cross(d2.subs(sol)) == sp.Matrix([0, 0, 0]))

print("\nQ2013  x-1 = (2y+3)/3 = (z-5)/2  vs  x=3r+2, y=-2r-1, z=2; key D = pi/2")
p = sp.symbols("p")
L1 = sp.Matrix([p + 1, (3 * p - 3) / 2, 2 * p + 5])
r = sp.symbols("r")
L2 = sp.Matrix([3 * r + 2, -2 * r - 1, 2])
v1 = sp.Matrix([sp.diff(c, p) for c in L1])
v2 = sp.Matrix([sp.diff(c, r) for c in L2])
print("   directions:", v1.T, v2.T)
check("first line satisfies its own equations",
      sp.simplify((L1[0] - 1) - (2 * L1[1] + 3) / 3) == 0 and sp.simplify((L1[0] - 1) - (L1[2] - 5) / 2) == 0)
check("dot product = 0 -> angle is pi/2", sp.simplify(v1.dot(v2)) == 0)

print("\nQ2023  line (x+1)/2=(y+1)/3=(z+1)/4 meets x+2y+3z=14; key A = sqrt(14)")
tt = sp.symbols("tt")
P = sp.Matrix([2 * tt - 1, 3 * tt - 1, 4 * tt - 1])
tv = sp.solve(sp.Eq(P[0] + 2 * P[1] + 3 * P[2], 14), tt)[0]
Pt = P.subs(tt, tv)
print("   t =", tv, " P =", Pt.T)
check("P = (1,2,3)", list(Pt) == [1, 2, 3])
check("OP = sqrt(14)", sp.sqrt(Pt.dot(Pt)) == sp.sqrt(14))

print("\nQ1803  P(-2,-1) Q(4,0) R(3,3) S(-3,2); key A = parallelogram, not rhombus/rectangle")
P4, Q4, R4, S4 = sp.Matrix([-2, -1]), sp.Matrix([4, 0]), sp.Matrix([3, 3]), sp.Matrix([-3, 2])
PQ, SR, QR = Q4 - P4, R4 - S4, R4 - Q4
check("PQ == SR -> parallelogram", PQ == SR, "PQ=%s SR=%s" % (PQ.T, SR.T))
check("|PQ| != |QR| -> not a rhombus", PQ.dot(PQ) != QR.dot(QR), "37 vs 10")
check("PQ.QR != 0 -> not a rectangle", PQ.dot(QR) != 0, "= %s" % PQ.dot(QR))
check("Q is UNIQUELY forced by P,R,S + parallelogram", (P4 + (R4 - S4)) == Q4)

print("\nQ1831  u=(1,1,-1) v=(2,-3,1); key A = sqrt21, sqrt13")
u, v = sp.Matrix([1, 1, -1]), sp.Matrix([2, -3, 1])
d_plus, d_minus = u + v, u - v
check("|u+v| = sqrt(13)", sp.sqrt(d_plus.dot(d_plus)) == sp.sqrt(13))
check("|u-v| = sqrt(21)", sp.sqrt(d_minus.dot(d_minus)) == sp.sqrt(21))

print("\nQ2406  intended y = asin(2x*sqrt(1-x^2)) on [-1/sqrt2, 1/sqrt2]; key C = 2/sqrt(1-x^2)")
xs = sp.symbols("xs", real=True)
y_int = sp.asin(2 * xs * sp.sqrt(1 - xs ** 2))
for xv in [sp.Rational(-3, 10), sp.Rational(1, 5), sp.Rational(1, 2)]:
    lhs = float(sp.diff(y_int, xs).subs(xs, xv))
    rhs = float(2 / sp.sqrt(1 - xv ** 2))
    check("Q2406 derivative at x=%s matches 2/sqrt(1-x^2)" % xv, abs(lhs - rhs) < 1e-12,
          "%.10f vs %.10f" % (lhs, rhs))
# and the PRINTED (minus) form is not even real on the stated domain
arg = float((2 * xs - sp.sqrt(1 - xs ** 2)).subs(xs, sp.Rational(-2, 5)))
check("printed minus-form leaves [-1,1] at x=-0.4 (book defect)", arg < -1, "arg = %.4f" % arg)

print("\nQ1163  intended cos2A = (3cos2B-1)/(3-cos2B); key A = sqrt2 tanB")
A_, B_ = sp.symbols("A_ B_")
tA, tB = sp.symbols("tA tB", positive=True)
lhs = (1 - tA ** 2) / (1 + tA ** 2)
rhs_int = (3 * ((1 - tB ** 2) / (1 + tB ** 2)) - 1) / (3 - (1 - tB ** 2) / (1 + tB ** 2))
sol_int = sp.solve(sp.Eq(lhs, sp.simplify(rhs_int)), tA)
print("   intended ->", sol_int)
check("intended gives tanA = sqrt2 tanB", any(sp.simplify(s - sp.sqrt(2) * tB) == 0 for s in sol_int))
rhs_pr = (2 * ((1 - tB ** 2) / (1 + tB ** 2)) - 1) / (3 - (1 - tB ** 2) / (1 + tB ** 2))
sol_pr = sp.solve(sp.Eq(lhs, sp.simplify(rhs_pr)), tA)
print("   printed  ->", [sp.simplify(s ** 2) for s in sol_pr])
check("printed gives tan^2A = (1+7tan^2B)/(3+tan^2B), NOT 2tan^2B",
      any(sp.simplify(sp.simplify(s ** 2) - (1 + 7 * tB ** 2) / (3 + tB ** 2)) == 0 for s in sol_pr))
# the trap: the two agree at exactly one point, and it is beta = 45 degrees
agree = sp.solve(sp.Eq(2 * tB ** 2, (1 + 7 * tB ** 2) / (3 + tB ** 2)), tB)
print("   they agree only at tanB =", agree)
check("printed and intended agree ONLY at tanB = 1 (i.e. beta = 45 deg)",
      [s for s in agree if s.is_real and s > 0] == [1])

print("\nQ741  3 questions p=1/4, 2 questions p=1/2; key D = 3/64")
p5 = Fraction(1, 4) ** 3 * Fraction(1, 2) ** 2
p4a = 3 * Fraction(1, 4) ** 2 * Fraction(3, 4) * Fraction(1, 2) ** 2
p4b = 2 * Fraction(1, 4) ** 3 * Fraction(1, 2) * Fraction(1, 2)
tot = p5 + p4a + p4b
print("   all5=%s  one4opt-wrong=%s  one TF-wrong=%s  total=%s" % (p5, p4a, p4b, tot))
check("total = 3/64", tot == Fraction(3, 64))
# and the OLD (three-option) reading gives 7/288, which is no option
old = (Fraction(1, 4) ** 3 * Fraction(1, 3) ** 2
       + 3 * Fraction(1, 4) ** 2 * Fraction(3, 4) * Fraction(1, 3) ** 2
       + 2 * Fraction(1, 4) ** 3 * Fraction(1, 3) * Fraction(2, 3))
check("old three-option reading gave %s, which is no option" % old,
      old not in {Fraction(5, 32), Fraction(3, 128), Fraction(3, 256), Fraction(3, 64)})

print("\nQ447  (1/6)sin, cos, tan in GP; key B = 2n*pi +/- pi/3")
th = sp.symbols("th")
c = sp.symbols("c")
cubic = sp.expand(6 * c ** 3 + c ** 2 - 1)
print("   cubic:", cubic, " factors:", sp.factor(cubic))
check("cos(theta)=1/2 is a root", cubic.subs(c, sp.Rational(1, 2)) == 0)
quad = sp.factor(cubic).args
check("the cubic factors as (2c-1)(3c^2+2c+1)",
      sp.simplify(cubic - (2 * c - 1) * (3 * c ** 2 + 2 * c + 1)) == 0)
check("3c^2+2c+1 has no real root (disc = -8)", sp.discriminant(3 * c ** 2 + 2 * c + 1, c) == -8)
# verify the GP condition holds at theta = pi/3
t0 = sp.pi / 3
check("GP condition holds at theta = pi/3",
      sp.simplify(sp.cos(t0) ** 2 - (sp.sin(t0) / 6) * sp.tan(t0)) == 0)
# and does NOT hold for the OLD stem (1 - sin) at pi/3
check("old stem (1 - sin) FAILS at pi/3 (so the repair was necessary)",
      sp.simplify((1 - sp.sin(t0)) * sp.tan(t0) - sp.cos(t0) ** 2) != 0)

print("\n" + "=" * 70)
print("FAILURES:", FAIL if FAIL else "none")
