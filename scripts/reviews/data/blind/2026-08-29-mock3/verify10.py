"""Independent verification for blind batch10 (NDA Maths).
Exact arithmetic only (Fraction / sympy) where equality or a boundary is at stake.
"""
from fractions import Fraction
from itertools import combinations, product
import sympy as sp

print("=" * 70)
print("Q6  set identity: C = (A n B') u (A' n B)")
print("=" * 70)
# Brute force over ALL subsets A,B of a universe X of size 4.
X = set(range(4))
subsets = []
for r in range(len(X) + 1):
    for s in combinations(sorted(X), r):
        subsets.append(set(s))

def comp(S):
    return X - S

opts = {
    "A": lambda A, B: (A | comp(B)) - (A & comp(B)),
    "B": lambda A, B: (comp(A) | B) - (comp(A) & B),
    "C": lambda A, B: (A | B) - (A & B),
    "D": lambda A, B: (comp(A) | comp(B)) - (comp(A) & comp(B)),
}
results = {}
for lab, f in opts.items():
    ok = True
    counter = None
    for A in subsets:
        for B in subsets:
            C = (A & comp(B)) | (comp(A) & B)
            if f(A, B) != C:
                ok = False
                counter = (sorted(A), sorted(B), sorted(C), sorted(f(A, B)))
                break
        if not ok:
            break
    results[lab] = (ok, counter)
    print(f"  option {lab}: always equal? {ok}   counterexample={counter}")
print("  matching options:", [k for k, v in results.items() if v[0]])

print()
print("=" * 70)
print("Q69  d/dx (|x-1| + |x-3|) at x=2")
print("=" * 70)
x = sp.Symbol("x", real=True)
f = sp.Abs(x - 1) + sp.Abs(x - 3)
# On the open interval (1,3): |x-1| = x-1, |x-3| = 3-x  => f = 2 (constant)
for t in [sp.Rational(3, 2), sp.Rational(2), sp.Rational(5, 2), sp.Rational(19, 10)]:
    print(f"  f({t}) = {sp.simplify(f.subs(x, t))}")
# exact one-sided difference quotients at x=2 using Fractions
def fval(v):
    v = Fraction(v)
    return abs(v - 1) + abs(v - 3)
for h in [Fraction(1, 10), Fraction(1, 1000), Fraction(-1, 10), Fraction(-1, 1000)]:
    q = (fval(Fraction(2) + h) - fval(Fraction(2))) / h
    print(f"  h={h}: difference quotient = {q}")
print("  symbolic derivative at 2:", sp.diff(f, x).subs(x, 2))

print()
print("=" * 70)
print("Q71  i^(4n+1)")
print("=" * 70)
I = sp.I
for n in range(1, 8):
    print(f"  n={n}: i^{4*n+1} = {sp.simplify(I ** (4 * n + 1))}")

print()
print("=" * 70)
print("Q110  mode of 1,2,1,1,2,1,4,6,5,4")
print("=" * 70)
data = [1, 2, 1, 1, 2, 1, 4, 6, 5, 4]
counts = {v: data.count(v) for v in sorted(set(data))}
print("  counts:", counts)
mx = max(counts.values())
print("  max frequency:", mx, " value(s):", [k for k, v in counts.items() if v == mx])

print()
print("=" * 70)
print("Q161  (1-w+w^2)(1-w^2+w^4)(1-w^4+w^8)(1-w^8+w^16), w imaginary cube root of 1")
print("=" * 70)
for w in [sp.Rational(-1, 2) + sp.sqrt(3) * sp.I / 2, sp.Rational(-1, 2) - sp.sqrt(3) * sp.I / 2]:
    print("  w =", sp.simplify(w), " w^3 =", sp.simplify(sp.expand(w ** 3)))
    f1 = sp.expand(1 - w + w ** 2)
    f2 = sp.expand(1 - w ** 2 + w ** 4)
    f3 = sp.expand(1 - w ** 4 + w ** 8)
    f4 = sp.expand(1 - w ** 8 + w ** 16)
    print("    factors:", [sp.simplify(t) for t in (f1, f2, f3, f4)])
    prod = sp.simplify(sp.expand(f1 * f2 * f3 * f4))
    print("    PRODUCT =", prod)

print()
print("=" * 70)
print("Q304  T_n = C(n,3);  T_(n+1) - T_n = 36")
print("=" * 70)
n = sp.Symbol("n", integer=True, positive=True)
expr = sp.binomial(n + 1, 3) - sp.binomial(n, 3)
print("  T_(n+1)-T_n simplifies to:", sp.simplify(sp.expand(sp.functions.combinatorial.factorials.binomial(n + 1, 3).rewrite(sp.factorial) - sp.binomial(n, 3).rewrite(sp.factorial))))
for cand in [2, 5, 6, 9]:
    val = sp.binomial(cand + 1, 3) - sp.binomial(cand, 3)
    print(f"  n={cand}: T_{cand+1}-T_{cand} = {val}")
sols = [k for k in range(1, 60) if sp.binomial(k + 1, 3) - sp.binomial(k, 3) == 36]
print("  all n in 1..59 giving 36:", sols)

print()
print("=" * 70)
print("Q1572  common chord of x^2+y^2-4y=0 and x^2+y^2-8x-4y+11=0")
print("=" * 70)
xs, ys = sp.symbols("x y", real=True)
c1 = xs ** 2 + ys ** 2 - 4 * ys
c2 = xs ** 2 + ys ** 2 - 8 * xs - 4 * ys + 11
radical = sp.simplify(sp.expand(c1 - c2))
print("  radical axis (c1-c2=0):", sp.Eq(radical, 0), "->", sp.solve(sp.Eq(radical, 0), xs))
pts = sp.solve([sp.Eq(c1, 0), sp.Eq(c2, 0)], [xs, ys], dict=True)
print("  intersection points:", pts)
if len(pts) == 2:
    p, q = pts
    d2 = sp.simplify((p[xs] - q[xs]) ** 2 + (p[ys] - q[ys]) ** 2)
    L = sp.simplify(sp.sqrt(d2))
    print("  chord length exact =", sp.radsimp(L), " = ", sp.nsimplify(L), " numeric:", sp.N(L, 30))
    for lab, val in [
        ("A", sp.sqrt(11) / 2),
        ("B", sp.sqrt(135)),
        ("C", sp.sqrt(135) / 4),
        ("D", sp.sqrt(145) / 4),
    ]:
        print(f"    option {lab} = {sp.N(val, 30)}   equal? {sp.simplify(val - L) == 0}")
# verify both points lie on both circles exactly
for p in pts:
    print("   check on c1:", sp.simplify(c1.subs(p)), " on c2:", sp.simplify(c2.subs(p)))

print()
print("=" * 70)
print("Q1892  unit a,b ; (a+3b) perp (7a-5b) ; find angle")
print("=" * 70)
t = sp.Symbol("t", real=True)
# |a|=|b|=1, a.b = cos t
dot = 7 * 1 - 5 * sp.cos(t) + 21 * sp.cos(t) - 15 * 1
print("  (a+3b).(7a-5b) = 7|a|^2 +16 a.b -15|b|^2 =", sp.simplify(dot))
sol = sp.solve(sp.Eq(sp.simplify(dot), 0), t)
print("  solutions for t in R:", sol)
c = sp.solve(sp.Eq(7 + 16 * sp.Symbol("c") - 15, 0), sp.Symbol("c"))
print("  cos(theta) =", c, "-> theta =", sp.acos(c[0]))
# explicit numeric check with concrete unit vectors at pi/3
th = sp.pi / 3
a_v = sp.Matrix([1, 0, 0])
b_v = sp.Matrix([sp.cos(th), sp.sin(th), 0])
print("  check at pi/3: (a+3b).(7a-5b) =", sp.simplify(((a_v + 3 * b_v).T * (7 * a_v - 5 * b_v))[0]))
for name, th2 in [("pi/6", sp.pi / 6), ("2pi/3", 2 * sp.pi / 3)]:
    b2 = sp.Matrix([sp.cos(th2), sp.sin(th2), 0])
    print(f"  check at {name}: =", sp.simplify(((a_v + 3 * b2).T * (7 * a_v - 5 * b2))[0]))

print()
print("=" * 70)
print("Q1912  (b+c) . a x {(b+c) x a}")
print("=" * 70)
av = sp.Matrix([1, 2, 3])
bv = sp.Matrix([-1, 2, 3])
cv = sp.Matrix([2, -2, -3])
u = bv + cv
print("  b+c =", u.T)
inner = u.cross(av)          # (b+c) x a
outer = av.cross(inner)      # a x {(b+c) x a}
val = (u.T * outer)[0]
print("  (b+c) x a =", inner.T)
print("  a x [(b+c) x a] =", outer.T)
print("  RESULT (b+c).(a x [(b+c) x a]) =", sp.simplify(val))
print("  identity check |a|^2|u|^2 - (a.u)^2 =",
      sp.simplify(av.dot(av) * u.dot(u) - av.dot(u) ** 2))
print("  |a x u|^2 =", sp.simplify(av.cross(u).dot(av.cross(u))))
# alternative (wrong) grouping: ((b+c).a) x ... is not defined; check [(b+c) . a] * ... n/a
print("  note: scalar triple [u, a, u x a] =", sp.simplify(u.dot(av.cross(inner))))
