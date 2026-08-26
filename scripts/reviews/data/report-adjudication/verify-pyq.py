"""Independent re-derivation of the four NDA PYQ rows, from the PRINTED stems.

Every stem below was read off the scanned UPSC test booklet, not from our bank
and not from the LWS Excel. The point of this script is to reach an answer
WITHOUT consulting the stored key, and to test at discriminating points rather
than convenient ones.
"""
from fractions import Fraction
import math
import sympy as sp

FAIL = []


def check(label, cond, detail=""):
    mark = "ok " if cond else "FAIL"
    if not cond:
        FAIL.append(label)
    print("  [%s] %s %s" % (mark, label, detail))


print("=" * 78)
print("Q34 (NDA 2022-I): tower + flagstaff h; elevations theta (bottom) and 2theta (top).")
print("  printed options: (a) h cos t  (b) h sin t  (c) h cos 2t  (d) h sin 2t")
theta, d, h, T = sp.symbols("theta d h T", positive=True)
# tan(theta) = T/d  and  tan(2theta) = (T+h)/d
sol = sp.solve([sp.Eq(sp.tan(theta), T / d), sp.Eq(sp.tan(2 * theta), (T + h) / d)], [T, d], dict=True)
Texpr = sp.simplify(sol[0][T])
print("  symbolic tower height T =", sp.simplify(sp.trigsimp(Texpr)))
ratio = sp.simplify(sp.trigsimp(Texpr / h))
print("  T/h =", ratio)
# sympy leaves tan(t)/(tan(2t)-tan(t)) alone; rewrite in sin/cos before asserting.
# A CAS returning "not simplified" is a question, never a verdict.
ratio_sc = sp.simplify(sp.expand_trig(ratio.rewrite(sp.cos)))
print("  T/h rewritten =", ratio_sc)
check("Q34 T/h == cos(2*theta) symbolically",
      sp.simplify(ratio_sc - sp.cos(2 * theta)) == 0)
# Discriminating numeric check: avoid theta=45 (cos2t=0) and any angle where
# cos t and cos 2t could coincide. cos t = cos 2t only at t=0, so any t in
# (0, pi/4) separates the two candidate options cleanly.
for tv in [0.2, 0.35, 0.5, 0.7]:
    dv = 1.0
    Tv = math.tan(tv) * dv
    hv = math.tan(2 * tv) * dv - Tv
    cand_c = hv * math.cos(2 * tv)
    cand_a = hv * math.cos(tv)
    check("Q34 theta=%.2f  (c) h*cos2t matches T" % tv, abs(cand_c - Tv) < 1e-12,
          "T=%.6f  hcos2t=%.6f  hcos t=%.6f" % (Tv, cand_c, cand_a))
    check("Q34 theta=%.2f  (a) h*cos t does NOT match" % tv, abs(cand_a - Tv) > 1e-6)

print()
print("=" * 78)
print("Q57 (NDA 2022-I): degree of  1 + (y')^2 = (y'')^(4/3).")
print("  printed options: (a) 4/3  (b) 2  (c) 3  (d) 4")
yp, ypp = sp.symbols("yp ypp", positive=True)
lhs = 1 + yp ** 2
rhs = ypp ** sp.Rational(4, 3)
# Degree is defined only once the equation is polynomial in the derivatives.
# Cubing is the smallest power that clears the 1/3.
poly_lhs = sp.expand(lhs ** 3)
poly_rhs = sp.expand(rhs ** 3)
print("  cubed:  (1+(y')^2)^3 =", poly_lhs, "   (y'')^(4/3*3) =", poly_rhs)
deg = sp.degree(sp.Poly(poly_rhs, ypp), ypp)
print("  power of the highest-order derivative y'' after clearing =", deg)
check("Q57 degree is 4", deg == 4)
check("Q57 cubing is minimal (denominator of 4/3 is 3)", sp.Rational(4, 3).q == 3)

print()
print("=" * 78)
print("Q77 (NDA 2022-I): f(x) = m/x + 2nx + 1, f'(2) = 0. Find m + 8n.")
print("  printed options: (a) -2  (b) 0  (c) 2  (d) Cannot be determined")
x, m, n = sp.symbols("x m n")
f = m / x + 2 * n * x + 1
fp = sp.diff(f, x)
cond = sp.Eq(fp.subs(x, 2), 0)
print("  f'(x) =", sp.simplify(fp))
print("  f'(2) = 0  =>", sp.solve(cond, m))
msol = sp.solve(cond, m)[0]
print("  m =", msol)
check("Q77 the condition gives m - 8n = 0", sp.simplify((msol - 8 * n)) == 0)
val = sp.simplify((m + 8 * n).subs(m, msol))
print("  m + 8n =", val, " (a free multiple of n)")
check("Q77 m+8n is NOT a constant", val.free_symbols == {n})
# Two admissible (m, n) pairs giving different m+8n -> not determined.
for nv in [1, 3]:
    mv = 8 * nv
    fpv = sp.diff((mv / x + 2 * nv * x + 1), x).subs(x, 2)
    check("Q77 (m,n)=(%d,%d) satisfies f'(2)=0, m+8n=%d" % (mv, nv, mv + 8 * nv),
          sp.simplify(fpv) == 0)
check("Q77 two admissible pairs give DIFFERENT m+8n (16 vs 48)", 16 != 48)

print()
print("=" * 78)
print("Q91 (NDA 2017-II): f(x) = (g(x))^2 - g(x^2), g = greatest integer. Discontinuous at?")
print("  printed options: (a) all integers  (b) all int except 0 and 1")
print("                   (c) all int except 0  (d) all int except 1")


def f_at(xq: Fraction) -> Fraction:
    """f evaluated exactly at a rational, so no float ever decides an integer part."""
    gx = math.floor(xq)
    gx2 = math.floor(xq * xq)
    return Fraction(gx * gx - gx2)


eps = Fraction(1, 10 ** 6)
disc = []
for k in range(-4, 5):
    kq = Fraction(k)
    left = f_at(kq - eps)
    right = f_at(kq + eps)
    here = f_at(kq)
    is_cont = (left == here == right)
    if not is_cont:
        disc.append(k)
    print("  x=%3d : left=%s  f=%s  right=%s  -> %s"
          % (k, left, here, right, "continuous" if is_cont else "DISCONTINUOUS"))
print("  discontinuous at:", disc)
check("Q91 discontinuous at 0", 0 in disc)
check("Q91 CONTINUOUS at 1", 1 not in disc)
check("Q91 every other tested integer is discontinuous",
      all(k in disc for k in range(-4, 5) if k != 1))
# f is identically 1 on (-1, 0) while f(0)=0 — the fact that kills option (b).
vals = {f_at(Fraction(a, 10)) for a in range(-9, 0)}
print("  f on (-1,0) takes values:", vals, " and f(0) =", f_at(Fraction(0)))
check("Q91 f == 1 on all of (-1,0) but f(0) == 0", vals == {Fraction(1)} and f_at(Fraction(0)) == 0)

print()
print("=" * 78)
print("FAILURES:", FAIL if FAIL else "none")
