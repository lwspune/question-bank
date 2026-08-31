"""Independent blind verification for batch1 (NDA Maths Mock 4).

Exact arithmetic only (Fraction / sympy). No floats where an equality matters.
Run:  python verify1.py
"""

from fractions import Fraction
import sympy as sp

results = []


def report(tag, ok, msg):
    results.append((tag, ok, msg))
    print(("PASS " if ok else "FAIL ") + tag + ": " + msg)


# ---------------------------------------------------------------- Q1  lines
# L1: (1,-1,1) + t(2,3,4)   L2: (3,k,0) + s(1,2,1)
t, s, k = sp.symbols("t s k")
eq_x = sp.Eq(1 + 2 * t, 3 + s)
eq_z = sp.Eq(1 + 4 * t, 0 + s)
sol = sp.solve([eq_x, eq_z], [t, s], dict=True)
print("Q1 t,s solution:", sol)
tv = sol[0][t]
sv = sol[0][s]
kv = sp.simplify((-1 + 3 * tv) - 2 * sv)
report("Q1", kv == sp.Rational(9, 2), "t=%s s=%s -> k=%s" % (tv, sv, kv))
# independent check: with k = 9/2 the two lines really do share a point
P1 = [1 + 2 * tv, -1 + 3 * tv, 1 + 4 * tv]
P2 = [3 + sv, kv + 2 * sv, 0 + sv]
report("Q1-point", [sp.simplify(a - b) == 0 for a, b in zip(P1, P2)] == [True] * 3,
       "P1=%s P2=%s" % (P1, P2))
# coplanarity determinant must vanish only at k = 9/2
d1 = sp.Matrix([2, 3, 4])
d2 = sp.Matrix([1, 2, 1])
w = sp.Matrix([3 - 1, k - (-1), 0 - 1])
det = sp.Matrix.hstack(w, d1, d2).det()
report("Q1-unique", sp.solve(sp.Eq(det, 0), k) == [sp.Rational(9, 2)],
       "det=%s roots=%s" % (sp.expand(det), sp.solve(sp.Eq(det, 0), k)))

# ---------------------------------------------------------------- Q3  binomials
tot = sum(sp.binomial(10, i) for i in (1, 3, 5, 7, 9))
report("Q3", tot == 2 ** 9, "sum=%s  2^9=%s  2^10=%s  2^10-1=%s" % (tot, 2 ** 9, 2 ** 10, 2 ** 10 - 1))

# ---------------------------------------------------------------- Q03-28 binary
num = int("11000", 2)
den = int("11", 2)
report("Q03-28", num % den == 0 and num // den == 8,
       "%d / %d = %d = %s_2 ; opts A=%d B=%d C=%d D=%d"
       % (num, den, num // den, bin(num // den)[2:],
          int("110", 2), int("111", 2), int("1010", 2), int("1000", 2)))

# ---------------------------------------------------------------- Q7  planes
n1 = sp.Matrix([3, 1, 1])
cand = {"A": (1, 2, 1), "B": (1, -2, 1), "C": (1, 2, -1), "D": (1, -2, -1)}
dots = {lbl: int(n1.dot(sp.Matrix(list(v)))) for lbl, v in cand.items()}
perp = [lbl for lbl, d in dots.items() if d == 0]
report("Q7", perp == ["D"], "dot products %s -> perpendicular %s" % (dots, perp))

# ---------------------------------------------------------------- Q9  equal roots
x = sp.symbols("x")
ks = sp.solve(sp.Eq(sp.discriminant(2 * x ** 2 - k * x + x + 8, x), 0), k)
report("Q9", sorted(ks) == [-7, 9], "k roots = %s" % sorted(ks))
for kk in ks:  # confirm the roots really are equal AND real
    r = sp.roots(2 * x ** 2 - kk * x + x + 8, x)
    print("   k=%s -> roots %s" % (kk, r))

# ---------------------------------------------------------------- Q12 union
C, H, F = 21, 26, 29
HC, HF, FC, ALL = 14, 15, 12, 8
union = C + H + F - HC - HF - FC + ALL
regions = [ALL, HC - ALL, HF - ALL, FC - ALL,
           C - (HC - ALL) - (FC - ALL) - ALL,
           H - (HC - ALL) - (HF - ALL) - ALL,
           F - (HF - ALL) - (FC - ALL) - ALL]
report("Q12", union == 43 and all(r >= 0 for r in regions) and sum(regions) == union,
       "union=%d regions=%s sum=%d" % (union, regions, sum(regions)))

# ---------------------------------------------------------------- Q13 complex
i = sp.I
val = sp.simplify(((1 + i) / (1 - i)) ** 4 + ((1 - i) / (1 + i)) ** 4)
report("Q13", val == 2, "value = %s   ((1+i)/(1-i)) = %s" % (val, sp.simplify((1 + i) / (1 - i))))

# ---------------------------------------------------------------- Q20 derangement-ish
from itertools import permutations
perms = list(permutations(range(4)))
all_correct = sum(1 for p in perms if all(p[j] == j for j in range(4)))
none_correct = sum(1 for p in perms if all(p[j] != j for j in range(4)))
report("Q20", Fraction(all_correct, len(perms)) == Fraction(1, 24),
       "P(all correct)=%s  P(none correct)=%s  (opts 11/12, 23/24, 1/24)"
       % (Fraction(all_correct, len(perms)), Fraction(none_correct, len(perms))))

# ---------------------------------------------------------------- Q21 averages
owner = Fraction(110 * 10) - Fraction(76 * 9)
report("Q21", owner == 416, "total(10 people)=1100, 9 workers=684, owner=%s" % owner)

# ---------------------------------------------------------------- Q22 ODE
y = sp.Function("y")
xx = sp.symbols("x")
gen = sp.dsolve(sp.Eq(sp.Derivative(y(xx), xx), 2 * xx), y(xx), ics={y(0): 0})
report("Q22", sp.simplify(gen.rhs - xx ** 2) == 0, "solution %s" % gen)

# ---------------------------------------------------------------- Q25 triangle
A = sp.rad(75)
B = sp.rad(45)
Cang = sp.pi - A - B
R = sp.symbols("R", positive=True)
a = 2 * R * sp.sin(A)
b = 2 * R * sp.sin(B)
c = 2 * R * sp.sin(Cang)
lhs = sp.simplify(sp.expand_trig(2 * a - b))
opts25 = {"A": c, "B": sp.sqrt(2) * c, "C": 2 * c, "D": 2 * sp.sqrt(2) * c}
match25 = [lbl for lbl, v in opts25.items() if sp.simplify(sp.radsimp(lhs - v)) == 0]
report("Q25", match25 == ["B"], "C=%s deg; 2a-b=%s ; c=%s ; matches %s"
       % (sp.deg(Cang), sp.nsimplify(sp.simplify(lhs)), sp.simplify(c), match25))
# numeric cross-check at high precision, R=1
import mpmath as mp
mp.mp.dps = 50
Rn = mp.mpf(1)
an = 2 * Rn * mp.sin(mp.pi * 75 / 180)
bn = 2 * Rn * mp.sin(mp.pi * 45 / 180)
cn = 2 * Rn * mp.sin(mp.pi * 60 / 180)
print("   numeric 2a-b = %s ; c=%s ; sqrt2*c=%s ; 2c=%s"
      % (mp.nstr(2 * an - bn, 30), mp.nstr(cn, 30), mp.nstr(mp.sqrt(2) * cn, 30), mp.nstr(2 * cn, 30)))

# ---------------------------------------------------------------- Q28a cos(x^2)
# test candidate periods numerically at discriminating points (not multiples that coincide)
mp.mp.dps = 40


def is_period(T, f, pts):
    return all(abs(f(p + T) - f(p)) < mp.mpf(10) ** -25 for p in pts)


f28 = lambda u: mp.cos(u ** 2)
pts = [mp.mpf("0.37"), mp.mpf("1.234"), mp.mpf("2.71"), mp.mpf("5.5")]
cands = {"A 2pi": 2 * mp.pi, "B sqrt(2pi)": mp.sqrt(2 * mp.pi), "D pi": mp.pi}
res28 = {name: is_period(T, f28, pts) for name, T in cands.items()}
# also confirm cos^2 x (the rival reading) WOULD have period pi, i.e. the reading matters
g28 = lambda u: mp.cos(u) ** 2
res28b = {name: is_period(T, g28, pts) for name, T in cands.items()}
report("Q28a", not any(res28.values()),
       "cos(x^2) periodic? %s ;  (rival reading cos^2 x: %s)" % (res28, res28b))

# ---------------------------------------------------------------- Q28b AP
aa, dd, m, n = sp.symbols("a d m n")
solap = sp.solve([sp.Eq(aa + (m - 1) * dd, 1 / n), sp.Eq(aa + (n - 1) * dd, 1 / m)], [aa, dd], dict=True)
av, dv = sp.simplify(solap[0][aa]), sp.simplify(solap[0][dd])
report("Q28b", sp.simplify(av - dv) == 0, "a=%s d=%s a-d=%s" % (av, dv, sp.simplify(av - dv)))
# concrete instance m=3,n=5
mm, nn = 3, 5
d0 = Fraction(1, mm * nn)
a0 = Fraction(1, nn) - (mm - 1) * d0
print("   m=3,n=5 -> a=%s d=%s ; a_3=%s (want 1/5) a_5=%s (want 1/3)"
      % (a0, d0, a0 + 2 * d0, a0 + 4 * d0))

# ---------------------------------------------------------------- Q29 AP
a1, d1s = sp.symbols("a1 d1")
term = lambda nn_: a1 + (nn_ - 1) * d1s
solq = sp.solve(sp.Eq(100 * term(100), 50 * term(50)), a1)
a_val = solq[0]
t150 = sp.simplify(term(150).subs(a1, a_val))
report("Q29", t150 == 0, "a = %s ; a_150 = %s (d nonzero)" % (a_val, t150))
# concrete: d = 2 -> a = -298
dtest = Fraction(2)
atest = Fraction(-149) * dtest
print("   d=2 -> a=%s ; 100*a100=%s ; 50*a50=%s ; a150=%s"
      % (atest, 100 * (atest + 99 * dtest), 50 * (atest + 49 * dtest), atest + 149 * dtest))

# ---------------------------------------------------------------- Q33 common terms
s1 = set(3 + 4 * j for j in range(0, 20000))
s2 = set(1 + 5 * j for j in range(0, 20000))
common = sorted(s1 & s2)[:20]
report("Q33", sum(common) == 4020,
       "first 20 common = %s ... sum = %d" % (common[:5], sum(common)))

print("\n--- SUMMARY ---")
for tag, ok, msg in results:
    print(("OK   " if ok else "BAD  ") + tag)
print("all pass:", all(ok for _, ok, _ in results))
