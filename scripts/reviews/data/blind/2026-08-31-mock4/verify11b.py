"""Follow-up numeric cross-check for Q1227 (the bisect tolerance in verify11.py
was set tighter than mpmath's default step budget - a probe artifact, not a finding).

Also re-confirms Q426 roots numerically from a clean scan, independent of sympy.solve.
"""

import mpmath as mp

mp.mp.dps = 50

print("=" * 70)
print("Q1227 - independent numeric root scan on [0, 2pi)")
print("=" * 70)

f = lambda v: mp.cos(v) + mp.cos(2 * v) + mp.cos(3 * v)

roots = []
N = 4000
for i in range(N):
    a = 2 * mp.pi * mp.mpf(i) / N
    b = 2 * mp.pi * mp.mpf(i + 1) / N
    fa, fb = f(a), f(b)
    if fa == 0:
        roots.append(a)
    elif fa * fb < 0:
        # plain bisection, generous budget
        lo, hi = a, b
        flo = fa
        for _ in range(200):
            mid = (lo + hi) / 2
            fm = f(mid)
            if fm == 0:
                lo = hi = mid
                break
            if flo * fm < 0:
                hi = mid
            else:
                lo, flo = mid, fm
        roots.append((lo + hi) / 2)

# de-duplicate
uniq = []
for r in roots:
    if not any(abs(r - u) < mp.mpf(10) ** -20 for u in uniq):
        uniq.append(r)

print("all roots in [0,2pi):")
for r in uniq:
    print(f"   x = {mp.nstr(r, 20):<24} = {mp.nstr(r/mp.pi, 12)} * pi   cos x = {mp.nstr(mp.cos(r), 12)}"
          f"   |f(x)| = {mp.nstr(abs(f(r)), 5)}")

barred = [r for r in uniq if abs(mp.cos(r) + mp.mpf(1) / 2) < mp.mpf(10) ** -15]
kept = [r for r in uniq if abs(mp.cos(r) + mp.mpf(1) / 2) >= mp.mpf(10) ** -15]
print()
print("barred by the hypothesis cos x != -1/2 :", [mp.nstr(r / mp.pi, 10) + "*pi" for r in barred])
print("surviving solutions                    :", [mp.nstr(r / mp.pi, 10) + "*pi" for r in kept])
print("surviving as multiples of pi/4         :", [mp.nstr(r / (mp.pi / 4), 10) for r in kept])
print()
print("option A family 2n*pi +/- pi/4 restricted to [0,2pi) gives: pi/4 and 7pi/4")
covered = [mp.pi / 4, 7 * mp.pi / 4]
for r in kept:
    hit = any(abs(r - c) < mp.mpf(10) ** -20 for c in covered)
    print(f"   surviving root {mp.nstr(r/mp.pi, 10)}*pi covered by option A? {hit}")
print()
print("=> option A is a PROPER SUBSET: it captures 2 of the 4 solutions per 2pi period.")
print("=> options B (pi/3), C (pi/6), D (pi/2) contain NO solution at all:")
for lab, alpha in [("B", mp.pi / 3), ("C", mp.pi / 6), ("D", mp.pi / 2)]:
    print(f"   {lab}: f({lab}-value) = f({mp.nstr(alpha/mp.pi,6)}*pi) = {mp.nstr(f(alpha), 12)}")

print()
print("=" * 70)
print("Q426 - independent numeric scan for 5^x roots (no sympy.solve)")
print("=" * 70)
# 2*ln(5^x - 1) = ln 5 + ln(5^x - 11/5), valid only where both args > 0
g = lambda v: 2 * mp.log(mp.mpf(5) ** v - 1) - (mp.log(5) + mp.log(mp.mpf(5) ** v - mp.mpf(11) / 5))
lo_bound = mp.log(mp.mpf(11) / 5) / mp.log(5)  # where 5^x = 11/5
print("domain requires 5^x > 11/5, i.e. x >", mp.nstr(lo_bound, 12))
found = []
a = lo_bound + mp.mpf("1e-6")
N = 3000
hi_bound = mp.mpf(3)
prev_x, prev = a, g(a)
for i in range(1, N + 1):
    xv = a + (hi_bound - a) * mp.mpf(i) / N
    cur = g(xv)
    if prev * cur < 0:
        lo, hi, flo = prev_x, xv, prev
        for _ in range(200):
            mid = (lo + hi) / 2
            fm = g(mid)
            if fm == 0:
                lo = hi = mid
                break
            if flo * fm < 0:
                hi = mid
            else:
                lo, flo = mid, fm
        found.append((lo + hi) / 2)
    prev_x, prev = xv, cur
print("roots x:", [mp.nstr(r, 25) for r in found])
print("5^x at those roots:", [mp.nstr(mp.mpf(5) ** r, 20) for r in found])
print("log_5 3 =", mp.nstr(mp.log(3) / mp.log(5), 25))
print("log_5 4 =", mp.nstr(mp.log(4) / mp.log(5), 25))
