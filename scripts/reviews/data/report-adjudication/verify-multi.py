"""Are the 11 two-correct rows genuinely multi-answer, or is the second mark spurious?

If the second marked option is genuinely TRUE, the transcription was right and
the defect is that the bank's MCQ model allows only one correct option. If it is
false, the mark is spurious and should simply be dropped. That is the whole
question, and it has to be settled per row by solving, not by pattern.
"""
from fractions import Fraction as F
import sympy as sp

FAIL = []


def check(label, cond, detail=""):
    if not cond:
        FAIL.append(label)
    print("  [%s] %s %s" % ("ok " if cond else "FAIL", label, detail))


print("Q60  rho on R: x rho y iff xy > 0.  marked B,C  printed B")
# reflexive needs x*x > 0 for ALL real x; x = 0 breaks it.
check("NOT reflexive (x=0 gives 0*0 = 0, not > 0)", not (0 * 0 > 0))
check("symmetric (xy>0 <=> yx>0)", True, "multiplication commutes")
# transitive: xy>0 and yz>0 force x,y,z the same sign (y != 0), so xz>0.
tr = all((x * z > 0) for x in (-3, -1, 1, 3) for y in (-2, 2) for z in (-3, -1, 1, 3)
         if x * y > 0 and y * z > 0)
check("transitive", tr)
check("(B) 'symmetric but not reflexive' is TRUE", True)
check("(C) 'symmetric and transitive' is TRUE", True)
print("  -> BOTH B and C are true; the stem itself says 'is/are'.")

print("\nQ656  adj(P) given; marked A(-2), D(2)  printed A")
adjP = sp.Matrix([[1, 4, 4], [2, 1, 7], [1, 1, 3]])
d = adjP.det()
print("   det(adj P) =", d)
# For n = 3, det(adj P) = det(P)^(n-1) = det(P)^2
roots = sp.solve(sp.Eq(sp.Symbol("dP") ** 2, d), sp.Symbol("dP"))
print("   det(P) =", roots)
check("det(P) = +/-2, so BOTH -2 and 2 are possible", set(roots) == {-2, 2})

print("\nQ687  Vandermonde system; marked B,C  printed B")
a, b, g = sp.symbols("a b g")
M = sp.Matrix([[1, 1, 1], [a, b, g], [a ** 2, b ** 2, g ** 2]])
det = sp.factor(M.det())
print("   det =", det)
check("(C) distinct -> det != 0 -> unique (trivial) solution",
      sp.simplify(det.subs({a: 1, b: 2, g: 3})) != 0)
check("(B) two equal -> det = 0 -> infinitely many (homogeneous)",
      sp.simplify(det.subs({a: 1, b: 1, g: 3})) == 0)
print("  -> BOTH B and C are true; stem is a classic multi-answer.")

print("\nQ734  P(A)=0.7 P(B)=0.6; necessarily-false intersections. marked C,D  printed C")
lo, hi = max(F(0), F(7, 10) + F(6, 10) - 1), min(F(7, 10), F(6, 10))
print("   feasible P(A and B) in [%s, %s]" % (lo, hi))
for lbl, v in [("A", F(35, 100)), ("B", F(45, 100)), ("C", F(65, 100)), ("D", F(28, 100))]:
    feasible = lo <= v <= hi
    print("     (%s) %s -> %s" % (lbl, v, "possible" if feasible else "IMPOSSIBLE"))
check("(C) 0.65 > 0.6 is impossible", not (lo <= F(65, 100) <= hi))
check("(D) 0.28 < 0.3 is impossible", not (lo <= F(28, 100) <= hi))
check("(A) and (B) ARE possible", (lo <= F(35, 100) <= hi) and (lo <= F(45, 100) <= hi))

print("\nQ807  P(X)=1/3, P(X|Y)=1/2, P(Y|X)=2/5.  marked B,C  printed B")
PX = F(1, 3)
PXY = F(2, 5) * PX                      # P(Y|X) * P(X)
PY = PXY / F(1, 2)                      # P(X and Y) / P(X|Y)
print("   P(X and Y) = %s, P(Y) = %s" % (PXY, PY))
check("(C) P(Y) = 4/15", PY == F(4, 15))
check("(B) P(X'|Y) = 1 - 1/2 = 1/2", 1 - F(1, 2) == F(1, 2))
check("(A) P(X and Y) = 2/5 is FALSE", PXY != F(2, 5), "actual %s" % PXY)
check("(D) P(X or Y) = 2/5 is FALSE", PX + PY - PXY != F(2, 5), "actual %s" % (PX + PY - PXY))

print("\nQ819  P(X|Y)=1/2, P(Y|X)=1/3, P(X and Y)=1/6.  marked A,B  printed A")
PXY2 = F(1, 6)
PY2 = PXY2 / F(1, 2)
PX2 = PXY2 / F(1, 3)
print("   P(X) = %s, P(Y) = %s" % (PX2, PY2))
check("(B) independent: P(X)P(Y) == P(X and Y)", PX2 * PY2 == PXY2)
check("(A) P(X or Y) = 2/3", PX2 + PY2 - PXY2 == F(2, 3))
check("(C) 'not independent' is FALSE", PX2 * PY2 == PXY2)
check("(D) P(Xc and Y) = 1/6, not 1/5", PY2 - PXY2 == F(1, 6))

print("\nQ820  E,F independent; P(exactly one)=11/25, P(none)=2/25.  marked A,D  printed A")
p, q = sp.symbols("p q")
sols = sp.solve([sp.Eq((1 - p) * (1 - q), sp.Rational(2, 25)),
                 sp.Eq(p * (1 - q) + q * (1 - p), sp.Rational(11, 25))], [p, q], dict=True)
print("   solutions:", sols)
pairs = {(s[p], s[q]) for s in sols}
check("both orderings (4/5,3/5) and (3/5,4/5) solve it",
      (sp.Rational(4, 5), sp.Rational(3, 5)) in pairs and (sp.Rational(3, 5), sp.Rational(4, 5)) in pairs)

print("\nQ972  log_k(x)*log_5(k) = log_x(5).  marked B(1/5), C(5)  printed B")
x = sp.Symbol("x", positive=True)
k = sp.Symbol("k", positive=True)
expr = sp.Eq(sp.log(x) / sp.log(k) * (sp.log(k) / sp.log(5)), sp.log(5) / sp.log(x))
sol972 = sp.solve(expr, x)
print("   x =", sol972)
check("both 5 and 1/5 solve it", set(sp.nsimplify(s) for s in sol972) == {5, sp.Rational(1, 5)})

print("\nQ1097  f(cos4t) = 2/(2 - sec^2 t); find f(1/3). marked A,B  printed A")
t = sp.Symbol("t")
c = sp.Symbol("c")   # c = cos 2t
# 2/(2 - sec^2 t) = 2cos^2 t/(2cos^2 t - 1) = (1 + c)/c
fc = (1 + c) / c
cs = sp.solve(sp.Eq(2 * c ** 2 - 1, sp.Rational(1, 3)), c)   # cos4t = 2c^2 - 1 = 1/3
vals = sorted([sp.simplify(fc.subs(c, cv)) for cv in cs], key=lambda v: float(v))
print("   cos2t =", cs, " -> f =", vals)
check("f(1/3) = 1 - sqrt(3/2) and 1 + sqrt(3/2)",
      sp.simplify(vals[0] - (1 - sp.sqrt(sp.Rational(3, 2)))) == 0 and
      sp.simplify(vals[1] - (1 + sp.sqrt(sp.Rational(3, 2)))) == 0)

print("\nQ1498  point on x+y+1=0 at distance 1/5 from 3x+4y+2=0. marked B,D  printed B")
tt = sp.Symbol("tt", real=True)  # Abs() is unsolvable without this
P = (tt, -tt - 1)
dist = sp.Abs(3 * P[0] + 4 * P[1] + 2) / 5
ts = sp.solve(sp.Eq(dist, sp.Rational(1, 5)), tt)
pts = sorted([(int(v), int(-v - 1)) for v in ts])
print("   t =", ts, " -> points", pts)
check("both (-3,2) and (-1,0) are at distance 1/5", set(pts) == {(-3, 2), (-1, 0)})

print("\nQ650  matrix statements NOT correct. marked C,D  printed C")
# A counterexample must be DISCRIMINATING: [[1,2],[2,3]] x [[0,1],[1,1]] happens
# to come out symmetric, so it would "prove" the statement true. Search instead.
import itertools
cex = None
for a1, b1, c1, a2, b2, c2 in itertools.product([0, 1, 2], repeat=6):
    Ms = sp.Matrix([[a1, b1], [b1, c1]])
    Ns = sp.Matrix([[a2, b2], [b2, c2]])
    if (Ms * Ns).T != Ms * Ns:
        cex = (Ms, Ns)
        break
check("(C) MN symmetric for all symmetric M,N is FALSE",
      cex is not None, "counterexample M=%s N=%s -> MN=%s" %
      (cex[0].tolist(), cex[1].tolist(), (cex[0] * cex[1]).tolist()) if cex else "none found")
# adj(MN) = adj(N)adj(M), so (adj M)(adj N) = adj(MN) is false in general
A3 = sp.Matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
B3 = sp.Matrix([[2, 0, 1], [1, 3, 0], [0, 1, 1]])
check("(D) (adjM)(adjN) = adj(MN) is FALSE",
      A3.adjugate() * B3.adjugate() != (A3 * B3).adjugate())
check("   ... while adj(N)adj(M) = adj(MN) DOES hold",
      B3.adjugate() * A3.adjugate() == (A3 * B3).adjugate())
# (A) and (B) are correct statements, so they are NOT answers
Msym = sp.Matrix([[1, 2], [2, 3]])
Nany = sp.Matrix([[0, 1], [1, 1]])
check("(A) N^T M N symmetric when M symmetric -> (A) IS correct, not an answer",
      (Nany.T * Msym * Nany).T == Nany.T * Msym * Nany)
S1 = sp.Matrix([[1, 2], [2, 3]])
S2 = sp.Matrix([[4, 5], [5, 6]])
check("(B) MN-NM skew for symmetric M,N -> (B) IS correct, not an answer",
      (S1 * S2 - S2 * S1).T == -(S1 * S2 - S2 * S1))

print("\n" + "=" * 70)
print("FAILURES:", FAIL if FAIL else "none")
