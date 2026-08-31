"""Independent verification for blind batch3 (NDA Maths, 15 MCQs).

Exact arithmetic (Fraction / sympy) wherever an equality or boundary is at stake.
Run:  python verify3.py
"""

from fractions import Fraction
from itertools import product

import sympy as sp
import mpmath as mp

mp.mp.dps = 50

print("=" * 70)
print("Q74a  lim_{x->a} (x^-1 - a^-1)/(x-a)")
x, a = sp.symbols('x a', positive=True)
L = sp.limit((1/x - 1/a) / (x - a), x, a)
print("  symbolic limit           :", sp.simplify(L))
print("  candidates 1/a, -1/a, 1/a^2, -1/a^2 ->",
      [sp.simplify(L - c) == 0 for c in (1/a, -1/a, 1/a**2, -1/a**2)])
# discriminating numeric check: a=2 -> 1/a=0.5, -1/a=-0.5, 1/a^2=0.25, -1/a^2=-0.25 (all distinct)
f = sp.lambdify(x, (1/x - sp.Rational(1, 2)) / (x - 2))
print("  numeric a=2, x=2+1e-8    :", f(2 + 1e-8), " (expect -0.25)")

print("=" * 70)
print("Q74b  d/dx [ x/|x| ] for x < 0")
g = x / sp.Abs(x)
print("  value on x<0             :", sp.simplify(g.subs(x, -3)), sp.simplify(g.subs(x, -0.5)))
d = sp.diff(sp.simplify(-x / x), x)   # on x<0, |x| = -x  =>  x/|x| = -1
print("  derivative of constant -1:", d)

print("=" * 70)
print("Q76   sqrt(5 sqrt(5 sqrt(5 ...)))")
v = mp.mpf(1)
for _ in range(400):
    v = mp.sqrt(5 * v)
print("  fixed-point iterate      :", v)
# closed form: exponent sum 1/2+1/4+... = 1  =>  5^1
print("  partial exponents        :", [str(sum(Fraction(1, 2**k) for k in range(1, n + 1)))
                                       for n in (1, 2, 3, 10)])
print("  options 5, sqrt5, 1, 5^.25:", [float(c) for c in (5, mp.sqrt(5), 1, mp.mpf(5)**0.25)])

print("=" * 70)
print("Q79a  int_{pi/6}^{pi/3} dx/(1+sqrt(tan x))")
I = mp.quad(lambda t: 1 / (1 + mp.sqrt(mp.tan(t))), [mp.pi / 6, mp.pi / 3])
print("  numeric integral         :", I)
for name, val in (("pi/12", mp.pi / 12), ("pi/2", mp.pi / 2),
                  ("pi/6", mp.pi / 6), ("pi/4", mp.pi / 4)):
    print("   vs %-6s = %s   diff = %s" % (name, mp.nstr(val, 20), mp.nstr(I - val, 5)))
# King's property check: f(t) + f(pi/2 - t) == 1 identically?
for t in (mp.mpf('0.55'), mp.mpf('0.7'), mp.mpf('0.95')):
    s = 1 / (1 + mp.sqrt(mp.tan(t))) + 1 / (1 + mp.sqrt(mp.tan(mp.pi / 2 - t)))
    print("   f(t)+f(pi/2-t) at t=%s : %s" % (t, mp.nstr(s, 20)))

print("=" * 70)
print("Q79b  X^2 - 2X + 3I  with X = [[1,-2],[0,3]]")
X = sp.Matrix([[1, -2], [0, 3]])
Iden = sp.eye(2)
expr = X * X - 2 * X + 3 * Iden
print("  X^2                      :", X * X)
print("  X^2-2X+3I                :", expr)
print("  -I                       :", -Iden, " equal?", expr == -Iden)
print("  -2X                      :", -2 * X, " equal?", expr == -2 * X)
print("  2X                       :", 2 * X, " equal?", expr == 2 * X)

print("=" * 70)
print("Q82a  AM / Median / GM defined for a set of discrete numbers")
# GM of a set containing a negative number, even count -> product negative, even root undefined in R
import math
data = [-4, 9]
prod = data[0] * data[1]
print("  data", data, " product =", prod, " -> real square root exists?", prod >= 0)
data2 = [-2, 0, 5]
print("  data", data2, " product =", data2[0] * data2[1] * data2[2],
      " -> GM = 0 (defined, but degenerate)")
print("  AM and Median: always defined on a finite numeric set")

print("=" * 70)
print("Q82b  lim_{x->e} (log x - 1)/(x - e)")
L2 = sp.limit((sp.log(x) - 1) / (x - sp.E), x, sp.E)
print("  symbolic limit           :", sp.simplify(L2), " = ", sp.nsimplify(L2), float(L2))
print("  options e, 1/e, 1        :", float(sp.E), float(1 / sp.E), 1.0)

print("=" * 70)
print("Q85   aRb iff |a-b| > 0   (i.e. a != b)")
S = [1, 2, 3]
R = {(p, q) for p in S for q in S if abs(p - q) > 0}
refl = all((p, p) in R for p in S)
symm = all((q, p) in R for (p, q) in R)
trans = all((p, r) in R for (p, q) in R for (q2, r) in R if q == q2)
print("  reflexive  :", refl, "   (|a-a| = 0, not > 0)")
print("  symmetric  :", symm)
print("  transitive :", trans)
bad = [(p, q, r) for (p, q) in R for (q2, r) in R if q == q2 and (p, r) not in R]
print("  transitivity counterexample (a,b,c):", bad[0] if bad else None)

print("=" * 70)
print("Q88   min of f(a) = (2a^2 - 3) + 3(3 - a) + 4")
A = sp.symbols('A')
fa = (2 * A**2 - 3) + 3 * (3 - A) + 4
print("  expanded                 :", sp.expand(fa))
crit = sp.solve(sp.diff(fa, A), A)
print("  critical point           :", crit, "  second deriv =", sp.diff(fa, A, 2))
mn = sp.simplify(fa.subs(A, crit[0]))
print("  minimum value            :", mn, "=", sp.nsimplify(mn), float(mn))
print("  options 15/2, 11/2, -13/2, 71/8:",
      [float(sp.Rational(n, d)) for n, d in ((15, 2), (11, 2), (-13, 2), (71, 8))])
print("  matches 71/8?            :", sp.simplify(mn - sp.Rational(71, 8)) == 0)

print("=" * 70)
print("Q92   power-set identities  (P(A) = power set of A)")


def power_set(s):
    s = list(s)
    out = []
    for bits in product([0, 1], repeat=len(s)):
        out.append(frozenset(e for e, b in zip(s, bits) if b))
    return frozenset(out)


for A_set in (frozenset({1}), frozenset({1, 2}), frozenset(), frozenset({frozenset()})):
    P = power_set(A_set)
    a_ok = (A_set | P) == P                 # (a) A u P(A) = P(A)
    b_ok = (A_set & P) == A_set             # (b) A n P(A) = A
    c_ok = (A_set - P) == A_set             # (c) A - P(A) = A
    d_ok = (P - {A_set}) == P               # (d) P(A) - {A} = P(A)
    print("  A =", set(A_set) if A_set else "{}",
          " (a)", a_ok, " (b)", b_ok, " (c)", c_ok, " (d)", d_ok)
print("  note: A is ALWAYS an element of P(A), so (d) is false for every A")

print("=" * 70)
print("Q96a  a+b+c=0, |a|=3 |b|=5 |c|=7 -> angle(a,b)")
th = sp.symbols('th')
eq = sp.Eq(7**2, 3**2 + 5**2 + 2 * 3 * 5 * sp.cos(th))
sol = sp.solve(eq, th)
print("  equation |c|^2=|a|^2+|b|^2+2ab.cos :", eq)
print("  cos(theta)               :", sp.solve(sp.Eq(49, 34 + 30 * sp.Symbol('c')), sp.Symbol('c')))
print("  theta (deg)              :", [sp.deg(s) for s in sol])
# concrete construction
av = sp.Matrix([3, 0])
bv = sp.Matrix([5 * sp.Rational(1, 2), 5 * sp.sqrt(3) / 2])
cv = -(av + bv)
print("  |a|,|b|,|c| for 60 deg   :", av.norm(), bv.norm(), sp.simplify(cv.norm()))

print("=" * 70)
print("Q96b  area under y = x^2+2 from x=1 to x=2")
ar = sp.integrate(x**2 + 2, (x, 1, 2))
print("  integral                 :", ar, "=", float(ar))
print("  options 16/3,17/3,13/3,20/3:",
      [float(sp.Rational(n, 3)) for n in (16, 17, 13, 20)])

print("=" * 70)
print("Q100  tower h; A due South, elev x; B due East of A, elev y; AB = z")
h, zz, xa, ya = sp.symbols('h z xa ya', positive=True)
# coords: east = 1st, north = 2nd. A at origin, tower foot O due north at (0, h*cot(xa))
d_A = h * sp.cot(xa)
d_B = sp.sqrt(zz**2 + d_A**2)
rel = sp.Eq(d_B, h * sp.cot(ya))
print("  relation                 :", rel)
derived = sp.simplify(sp.solve(sp.Eq(d_B**2, (h * sp.cot(ya))**2), zz**2))
print("  z^2 =                    :", derived)
# numeric instance
hv, xv = sp.Rational(10), sp.rad(60)
dAv = hv * sp.cot(xv)
zv = sp.Rational(4)
dBv = sp.sqrt(zv**2 + dAv**2)
yv = sp.atan(hv / dBv)
optA = sp.simplify(hv**2 * (sp.cot(yv)**2 - sp.cot(xv)**2) - zv**2)
optB = sp.simplify(zv**2 * (sp.cot(yv)**2 - sp.cot(xv)**2) - hv**2)
optC = sp.simplify(hv**2 * (sp.tan(yv)**2 - sp.tan(xv)**2) - zv**2)
optD = sp.simplify(zv**2 * (sp.tan(yv)**2 - sp.tan(xv)**2) - hv**2)
print("  numeric residuals (0 = holds): A=%s B=%s C=%s D=%s"
      % (sp.nsimplify(optA), sp.N(optB, 8), sp.N(optC, 8), sp.N(optD, 8)))

print("=" * 70)
print("Q102  three dice, P(total = 17 or 18)")
outcomes = list(product(range(1, 7), repeat=3))
good = [o for o in outcomes if sum(o) in (17, 18)]
p = Fraction(len(good), len(outcomes))
print("  favourable outcomes      :", sorted(set(tuple(sorted(o)) for o in good)),
      " count =", len(good), "of", len(outcomes))
print("  probability (exact)      :", p, "=", float(p))
print("  options 1/9, 1/72, 1/54  :",
      [str(Fraction(1, k)) + " -> match " + str(p == Fraction(1, k)) for k in (9, 72, 54)])
print("=" * 70)
