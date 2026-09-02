"""Blind re-derivation checks for batch5 (NDA Maths mock 5).

Run:  python verify5.py
No stored answers are read anywhere; this only recomputes from the stems.
"""

from fractions import Fraction
import sympy as sp

print("=" * 70)

# ---------------------------------------------------------------- Q198
# x^2 - (a-2)x - (a+1) = 0 ; alpha+beta = a-2 ; alpha*beta = -(a+1)
a = sp.symbols('a', real=True)
s = a - 2
p = -(a + 1)
expr198 = sp.expand(s**2 - 2*p)              # alpha^2 + beta^2
print("Q198 alpha^2+beta^2 =", expr198)
print("Q198 completed square:", sp.simplify(sp.factor(expr198 - 5)), "+ 5")
crit = sp.solve(sp.diff(expr198, a), a)
print("Q198 stationary a =", crit, " second deriv =", sp.diff(expr198, a, 2))
for av in [-1, 0, 1, 2]:
    print("   a =", av, "-> alpha^2+beta^2 =", expr198.subs(a, av))
disc = sp.expand((a - 2)**2 + 4*(a + 1))
print("Q198 discriminant =", disc, "-> always > 0 (a^2+8)")

print("-" * 70)

# ---------------------------------------------------------------- Q226
# (1+x+x^2)^n ; sum of a_0 + a_3 + a_6 + ...
x = sp.symbols('x')
for n in range(1, 8):
    poly = sp.Poly(sp.expand((1 + x + x**2)**n), x)
    coeffs = poly.all_coeffs()[::-1]         # ascending
    tot = sum(c for i, c in enumerate(coeffs) if i % 3 == 0)
    print(f"Q226 n={n}: sum a_(3k) = {tot}   3^(n-1) = {3**(n-1)}   3n = {3*n}   3^(n+1) = {3**(n+1)}")

print("-" * 70)

# ---------------------------------------------------------------- Q240
count = 0
for k in range(100, 1000):
    if '2' in str(k):
        count += 1
print("Q240 brute-force 3-digit numbers containing digit 2 =", count)
print("Q240 complement check: 900 - 8*9*9 =", 900 - 8 * 9 * 9)

print("-" * 70)

# ---------------------------------------------------------------- Q280
from itertools import permutations
word = "TRIANGLE"
print("Q280 letters:", sorted(word), "distinct?", len(set(word)) == len(word))
brute = sum(1 for p_ in permutations(word) if p_[0] == 'A' and p_[-1] == 'N')
print("Q280 brute-force count begin A end N =", brute, " (6! =", sp.factorial(6), ")")

print("-" * 70)

# ---------------------------------------------------------------- Q307
print("Q307 T_(n+1)-T_n for n=4..11:")
for n in range(4, 12):
    print("   n =", n, " C(n+1,3)-C(n,3) =", sp.binomial(n + 1, 3) - sp.binomial(n, 3),
          " (= C(n,2) =", sp.binomial(n, 2), ")")

print("-" * 70)

# ---------------------------------------------------------------- Q324
tot = sum(sp.binomial(15, k) for k in range(3, 16, 2))
print("Q324 sum C(15,k) k=3,5,...,15 =", tot)
print("Q324 options: 2^14 =", 2**14, " 2^14-15 =", 2**14 - 15,
      " 2^14+15 =", 2**14 + 15, " 2^14-1 =", 2**14 - 1)
print("Q324 all-odd sum =", sum(sp.binomial(15, k) for k in range(1, 16, 2)), " C(15,1) =", sp.binomial(15, 1))

print("-" * 70)

# ---------------------------------------------------------------- Q384
A_, B_, n = sp.symbols('A B n', positive=True)


def term(k, N, aa, bb):
    """T_k of (aa+bb)^N  (1-indexed: T_k = C(N,k-1) a^(N-k+1) b^(k-1))."""
    return sp.binomial(N, k - 1) * aa**(N - k + 1) * bb**(k - 1)


for nv in [3, 4, 5, 6]:
    r1 = sp.simplify(term(2, nv, A_, B_) / term(3, nv, A_, B_))
    r2 = sp.simplify(term(3, nv + 3, A_, B_) / term(4, nv + 3, A_, B_))
    print(f"Q384 n={nv}: T2/T3 = {r1}   T3/T4 (n+3) = {r2}   equal? {sp.simplify(r1 - r2) == 0}")

print("-" * 70)

# ---------------------------------------------------------------- Q478
# AP: a1=2, a10=3 ; HP: h1=2, h10=3
d = Fraction(3 - 2, 9)
a4 = 2 + 3 * d
D = (Fraction(1, 3) - Fraction(1, 2)) / 9
inv_h7 = Fraction(1, 2) + 6 * D
h7 = 1 / inv_h7
print("Q478 d =", d, " a4 =", a4, " 1/h7 =", inv_h7, " h7 =", h7)
print("Q478 a4*h7 =", a4 * h7)
print("Q478 general a_r * h_(11-r):")
for r in range(1, 11):
    ar = 2 + (r - 1) * d
    hs = 1 / (Fraction(1, 2) + (11 - r - 1) * D)
    print("   r =", r, " a_r*h_(11-r) =", ar * hs)

print("-" * 70)

# ---------------------------------------------------------------- Q542
xs = sp.symbols('x')
Amat = sp.Matrix([[2, 1], [0, xs]])
inv = sp.simplify(Amat.inv())
print("Q542 true A^-1 =", inv)
sols = sp.solve(sp.Eq(inv[0, 1], sp.Rational(1, 6)), xs)
print("Q542 solve (1,2)-entry = 1/6 ->", sols)
for cand in [-3, 3, -2, 6]:
    got = sp.Matrix([[2, 1], [0, cand]]).inv()
    target = sp.Matrix([[sp.Rational(1, 2), sp.Rational(1, 6)], [0, sp.Rational(1, cand)]])
    print("   x =", cand, " inv =", list(got), " matches printed A^-1?", sp.simplify(got - target) == sp.zeros(2, 2))

print("-" * 70)

# ---------------------------------------------------------------- Q574
al = sp.symbols('alpha')
M = sp.Matrix([[5, 5 * al, al], [0, al, 5 * al], [0, 0, 5]])
detM = sp.simplify(M.det())
print("Q574 |A| =", detM, "  |A^2| = |A|^2 =", sp.expand(detM**2))
print("Q574 solve |A|^2 = 25 ->", sp.solve(sp.Eq(detM**2, 25), al))

print("-" * 70)

# ---------------------------------------------------------------- Q575
xx = sp.symbols('x')
F = sp.Matrix([[xx, 1 + sp.sin(xx), sp.cos(xx)],
               [1, sp.log(1 + xx), 2],
               [xx**2, 1 + xx**2, 0]])
f = sp.simplify(F.det())
ser = sp.series(f, xx, 0, 4).removeO()
ser = sp.expand(ser)
print("Q575 f(x) =", f)
print("Q575 series to x^3:", ser)
print("Q575 coefficient of x^0 =", ser.coeff(xx, 0))
print("Q575 coefficient of x^1 =", ser.coeff(xx, 1))
print("Q575 f'(0) via derivative =", sp.simplify(sp.diff(f, xx).subs(xx, 0)))

print("-" * 70)

# ---------------------------------------------------------------- Q587
aa, bb, cc = sp.symbols('a b c', nonzero=True)
Dm = sp.Matrix([[4, 4, 4],
                [(aa + 1 / aa)**2, (bb + 1 / bb)**2, (cc + 1 / cc)**2],
                [(aa - 1 / aa)**2, (bb - 1 / bb)**2, (cc - 1 / cc)**2]])
print("Q587 symbolic det =", sp.simplify(Dm.det()))
print("Q587 identity (a+1/a)^2 - (a-1/a)^2 =", sp.simplify((aa + 1 / aa)**2 - (aa - 1 / aa)**2))
for trial in [(2, 3, 5), (Fraction(1, 2), 7, -3), (11, -2, Fraction(3, 4))]:
    sub = {aa: sp.nsimplify(trial[0]), bb: sp.nsimplify(trial[1]), cc: sp.nsimplify(trial[2])}
    print("   a,b,c =", trial, " det =", sp.simplify(Dm.subs(sub).det()),
          " 4abc =", 4 * sp.nsimplify(trial[0]) * sp.nsimplify(trial[1]) * sp.nsimplify(trial[2]))

print("-" * 70)

# ---------------------------------------------------------------- Q609
def lg(base, arg):
    return sp.log(arg) / sp.log(base)


D1 = sp.Matrix([[lg(5, 729), lg(3, 5)],
                [lg(5, 27), lg(9, 25)]]).det()
D2 = sp.Matrix([[lg(3, 5), lg(27, 5)],
                [lg(5, 9), lg(5, 9)]]).det()
D1s, D2s = sp.simplify(D1), sp.simplify(D2)
prod = sp.simplify(D1s * D2s)
print("Q609 D1 =", D1s, " D2 =", D2s, " product =", prod, " float =", sp.N(prod, 30))
optC = sp.simplify(lg(5, 9))
optD = sp.simplify(lg(3, 5) * lg(5, 81))
print("Q609 option A = 1 ; B = 6 ; C = log_5 9 =", sp.N(optC, 20), "; D = log_3 5 * log_5 81 =", sp.simplify(optD))
print("Q609 product == option D ?", sp.simplify(prod - optD) == 0)
print("Q609 product == option C ?", sp.simplify(prod - optC) == 0)
print("Q609 pairwise option equality (A,B,C,D):")
opts609 = {'A': sp.Integer(1), 'B': sp.Integer(6), 'C': optC, 'D': sp.simplify(optD)}
keys = list(opts609)
for i in range(len(keys)):
    for j in range(i + 1, len(keys)):
        eq = sp.simplify(opts609[keys[i]] - opts609[keys[j]]) == 0
        if eq:
            print("   EQUAL:", keys[i], keys[j])
print("   (no EQUAL lines above => all distinct)")

print("-" * 70)

# ---------------------------------------------------------------- Q644
A644 = sp.Matrix([[2, 3], [5, -2]])
print("Q644 A^2 =", list(A644**2), " det =", A644.det())
inv644 = A644.inv()
print("Q644 A^-1 =", list(inv644))
k = sp.symbols('k')
sol = sp.solve([sp.Eq(inv644[i, j], k * A644[i, j]) for i in range(2) for j in range(2)], k, dict=True)
print("Q644 solve A^-1 = k A ->", sol)
print("Q644 check k=1/19:", sp.simplify(inv644 - sp.Rational(1, 19) * A644) == sp.zeros(2, 2))

print("-" * 70)

# ---------------------------------------------------------------- Q755
tot = 0
fav = 0
for p_ in permutations(range(7)):
    tot += 1
    i, j = p_.index(0), p_.index(1)
    if abs(i - j) == 1:
        fav += 1
print("Q755 brute force:", fav, "/", tot, "=", Fraction(fav, tot))
print("Q755 formula 2*6!/7! =", Fraction(2 * 720, 5040))
print("Q755 options 1/7,2/7,6/7,1/4 =", [Fraction(1, 7), Fraction(2, 7), Fraction(6, 7), Fraction(1, 4)])

print("=" * 70)
