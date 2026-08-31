"""Independent blind verification for batch11 (NDA Mathematics).

Exact arithmetic only: itertools enumeration, fractions.Fraction, sympy.
No database, no answer key consulted.
"""

from fractions import Fraction
from itertools import permutations

import sympy as sp

print("=" * 70)
print("Q99  three-digit even numbers from {1,2,3,4,5}, no repetition")
print("=" * 70)

digits = [1, 2, 3, 4, 5]
found = sorted(
    100 * a + 10 * b + c
    for a, b, c in permutations(digits, 3)
    if c % 2 == 0
)
print("count (brute force, no repetition):", len(found))
print("first 10:", found[:10])
print("last  10:", found[-10:])
# closed form cross-check: 2 choices for units, then 4*3 for the rest
print("closed form 2 * 4 * 3 =", 2 * 4 * 3)
# sanity: what WOULD repetition allowed give? (to be sure we answered the right question)
allowed = [
    100 * a + 10 * b + c
    for a in digits
    for b in digits
    for c in digits
    if c % 2 == 0
]
print("(if repetition WERE allowed it would be", len(allowed), "- not asked)")
print("options: A=36 B=30 C=24 D=12")
print()

print("=" * 70)
print("Q426  log 5, log(5^x - 1), log(5^x - 11/5) in A.P.")
print("=" * 70)

x = sp.symbols("x", real=True)
t = sp.symbols("t", positive=True)

# AP condition: 2*middle = first + last
# 2 log(t-1) = log 5 + log(t - 11/5)  ->  (t-1)^2 = 5(t - 11/5)
poly = sp.expand((t - 1) ** 2 - 5 * (t - sp.Rational(11, 5)))
print("polynomial in t = 5^x :", sp.factor(poly))
roots = sp.solve(sp.Eq(poly, 0), t)
print("roots for t:", roots)

for r in roots:
    # domain: both log arguments must be strictly positive
    arg2 = r - 1
    arg3 = r - sp.Rational(11, 5)
    print(f"  t={r}: 5^x-1={arg2} (>0? {arg2 > 0}), 5^x-11/5={arg3} (>0? {arg3 > 0})")
    # verify AP exactly with symbolic logs
    a1 = sp.log(5)
    a2 = sp.log(arg2)
    a3 = sp.log(arg3)
    diff = sp.simplify((a2 - a1) - (a3 - a2))
    print(f"    AP check  (a2-a1)-(a3-a2) = {sp.simplify(diff)} -> {sp.nsimplify(sp.N(diff, 40))}")

xs = [sp.log(r, 5) for r in roots]
print("x values:", xs)
print("numeric :", [sp.N(v, 30) for v in xs])

# Now evaluate every option numerically at 30 dps and compare as SETS
opts = {
    "A": [sp.log(4, 5), sp.log(3, 5)],
    "B": [sp.log(4, 3), sp.log(3, 4)],
    "C": [sp.log(4, 3), sp.log(5, 3)],
    "D": [sp.log(6, 5), sp.log(7, 5)],
}
target = sorted(sp.N(v, 40) for v in xs)
print("target set (sorted, 40 dps):", target)
for lab, vals in opts.items():
    got = sorted(sp.N(v, 40) for v in vals)
    match = all(abs(a - b) < sp.Float("1e-30") for a, b in zip(target, got))
    print(f"  {lab}: {got}  match={match}")

# Direct substitution check on the winning candidates
print("  direct substitution into the original equation:")
for name, val in [("log_5 3", sp.log(3, 5)), ("log_5 4", sp.log(4, 5))]:
    tv = 5 ** val
    lhs = 2 * sp.log(tv - 1)
    rhs = sp.log(5) + sp.log(tv - sp.Rational(11, 5))
    print(f"    x={name}: 2*log(5^x-1) - [log5 + log(5^x-11/5)] = {sp.N(sp.simplify(lhs - rhs), 40)}")
print()

print("=" * 70)
print("Q659  P = 2*I_3 ;  det(adj P) = ?")
print("=" * 70)

P = sp.Matrix([[2, 0, 0], [0, 2, 0], [0, 0, 2]])
detP = P.det()
adjP = P.adjugate()
print("P =", P.tolist())
print("det P =", detP)
print("adj P =", adjP.tolist())
det_adj = adjP.det()
print("det(adj P) =", det_adj, "   <-- a SCALAR")
print("cross-check (det P)^(n-1) = 8^2 =", detP ** 2)
print("as a power of 2:", sp.factorint(det_adj))

print("options as PRINTED denote matrices P^k:")
for k in (27, 17, 6):
    Pk = P ** k
    print(f"  P^{k} is a 3x3 MATRIX, diag entries 2^{k} = {2**k}; det(P^{k}) = {Pk.det()}")
    print(f"    is the matrix P^{k} equal to the scalar {det_adj}?  False (type mismatch)")
print("alternative reading, if 'P' in the options is a typo for the scalar 2:")
for k in (27, 17, 6):
    print(f"  2^{k} = {2**k}   equals 64? {2**k == det_adj}")
print("alternative reading, if 'P' means |P| = 8:")
for k in (27, 17, 6):
    print(f"  8^{k} equals 64? {8**k == det_adj}")
print()

print("=" * 70)
print("Q1227  cos x + cos 2x + cos 3x = 0 , given cos x != -1/2")
print("=" * 70)

X = sp.symbols("X", real=True)
expr = sp.cos(X) + sp.cos(2 * X) + sp.cos(3 * X)
print("factorisation:", sp.factor(sp.simplify(sp.expand_trig(expr))))
# cos x + cos 3x = 2 cos 2x cos x  =>  cos2x (2cos x + 1) = 0
factored = sp.cos(2 * X) * (2 * sp.cos(X) + 1)
print("claimed factored form matches? ",
      sp.simplify(sp.expand_trig(expr - factored)) == 0)

print("With cos x != -1/2 the surviving branch is cos 2x = 0  ->  x = (2k+1)*pi/4")
full = [sp.Rational(2 * k + 1, 4) * sp.pi for k in range(0, 8)]
print("full solution set on [0, 4pi):", [sp.nsimplify(v) for v in full])
for v in full[:4]:
    val = sp.simplify(expr.subs(X, v))
    cx = sp.simplify(sp.cos(v))
    print(f"  x={v}: sum={val}, cos x={cx}, cos x = -1/2? {sp.simplify(cx + sp.Rational(1,2)) == 0}")

print()
print("Test each printed option family (n = -2..2), exact:")
families = {
    "A": sp.pi / 4,
    "B": sp.pi / 3,
    "C": sp.pi / 6,
    "D": sp.pi / 2,
}
for lab, alpha in families.items():
    ok_all = True
    excluded = False
    samples = []
    for n in range(-2, 3):
        for sign in (1, -1):
            xv = 2 * n * sp.pi + sign * alpha
            s = sp.simplify(expr.subs(X, xv))
            cx = sp.simplify(sp.cos(xv))
            if sp.simplify(cx + sp.Rational(1, 2)) == 0:
                excluded = True
            if sp.simplify(s) != 0:
                ok_all = False
            if n == 0:
                samples.append((sp.nsimplify(xv), s, cx))
    print(f"  {lab}: 2n*pi +/- {alpha}  -> every member solves the equation? {ok_all}"
          f"   any member barred by cos x = -1/2? {excluded}")
    for xv, s, cx in samples:
        print(f"       x={xv}: cos x+cos2x+cos3x = {s}, cos x = {cx}")

print()
print("Completeness: is family A the WHOLE solution set?")
inA = lambda v: any(sp.simplify(v - (2 * n * sp.pi + s * sp.pi / 4)) == 0
                    for n in range(-4, 5) for s in (1, -1))
for v in full:
    print(f"  x={sp.nsimplify(v)} is a genuine solution; covered by 2n*pi +/- pi/4 ? {inA(v)}")

print()
print("Numeric sweep over [0, 2pi) for ALL roots with cos x != -1/2 (mpmath-grade):")
import mpmath as mp
mp.mp.dps = 40
f = lambda v: mp.cos(v) + mp.cos(2 * v) + mp.cos(3 * v)
roots_found = []
N = 20000
prev = f(mp.mpf(0))
for i in range(1, N + 1):
    a = mp.mpf(2) * mp.pi * (i - 1) / N
    b = mp.mpf(2) * mp.pi * i / N
    fa, fb = f(a), f(b)
    if fa == 0:
        roots_found.append(a)
    elif fa * fb < 0:
        r = mp.findroot(f, (a, b), solver="bisect", tol=mp.mpf(10) ** -35)
        roots_found.append(r)
kept = [r for r in roots_found if abs(mp.cos(r) + mp.mpf(1) / 2) > mp.mpf(10) ** -20]
dropped = [r for r in roots_found if abs(mp.cos(r) + mp.mpf(1) / 2) <= mp.mpf(10) ** -20]
print("  roots in [0,2pi):", [mp.nstr(r, 12) for r in roots_found])
print("  dropped by cos x != -1/2:", [mp.nstr(r, 12) for r in dropped])
print("  surviving roots        :", [mp.nstr(r, 12) for r in kept])
print("  as multiples of pi/4   :", [mp.nstr(r / (mp.pi / 4), 12) for r in kept])
