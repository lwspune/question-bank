"""Exact verification for blind batch2 (NDA Maths, 15 MCQs).
Uses Fraction / sympy exact arithmetic; no floats where equality matters.
Run:  python verify2.py
"""
from fractions import Fraction as F
import sympy as sp

out = []


def rep(tag, msg):
    out.append("[{}] {}".format(tag, msg))


# ---------------- Q36  (f+g)(x) with f=x, g=|x| ----------------
x = sp.Symbol('x', real=True)
fg = x + sp.Abs(x)
tests = [-5, -1, sp.Rational(-1, 2), 0, sp.Rational(1, 2), 1, 5]
vals = [(t, sp.simplify(fg.subs(x, t))) for t in tests]
rep("Q36", "x+|x| at {} -> {}".format([str(t) for t in tests], [str(v) for _, v in vals]))
rep("Q36", "matches C (2x for x>=0, 0 for x<0)? {}".format(
    all(v == (2 * t if t >= 0 else 0) for t, v in vals)))
rep("Q36", "matches B (2x everywhere)? {}".format(all(v == 2 * t for t, v in vals)))
rep("Q36", "matches D (0 for x>=0, 2x for x<0)? {}".format(
    all(v == (0 if t >= 0 else 2 * t) for t, v in vals)))

# ---------------- Q37  a^2+4b^2=12ab  =>  log(a+2b) ----------------
a, b = sp.symbols('a b', positive=True)
# solve a in terms of b from the constraint, take both roots
sols = sp.solve(sp.Eq(a**2 + 4 * b**2, 12 * a * b), a)
rep("Q37", "roots a = {}".format(sols))
for s in sols:
    lhs = sp.log(s + 2 * b)
    A = sp.Rational(1, 2) * (sp.log(s) + sp.log(b) - sp.log(2))
    B = sp.log(s / 2) + sp.log(b / 2) + sp.log(2)
    C = sp.Rational(1, 2) * (sp.log(s) + sp.log(b) + 4 * sp.log(2))
    D = sp.Rational(1, 2) * (sp.log(s) - sp.log(b) + 4 * sp.log(2))
    for nm, cand in (("A", A), ("B", B), ("C", C), ("D", D)):
        # numeric discriminating test at b=1 and b=3 (avoid symmetric coincidences)
        eqs = []
        for bv in (1, 3, sp.Rational(7, 5)):
            d = sp.N((lhs - cand).subs(b, bv), 40)
            eqs.append(abs(d) < sp.Float('1e-30'))
        rep("Q37", "root {}: option {} equal at b=1,3,7/5 -> {}".format(sp.simplify(s / b), nm, eqs))

# ---------------- Q43a skew-symmetric ----------------
A3 = sp.Matrix(3, 3, lambda i, j: 0)
p, q, r = sp.symbols('p q r')
A3 = sp.Matrix([[0, p, q], [-p, 0, r], [-q, -r, 0]])
rep("Q43a", "A skew? {}".format(sp.simplify(A3.T + A3) == sp.zeros(3)))
rep("Q43a", "A^2 symmetric? {}".format(sp.simplify((A3**2).T - A3**2) == sp.zeros(3)))
rep("Q43a", "trace(A) (odd order 3) = {}".format(sp.simplify(A3.trace())))
A4 = sp.Matrix([[0, 1, 2, 3], [-1, 0, 4, 5], [-2, -4, 0, 6], [-3, -5, -6, 0]])
rep("Q43a", "trace of 4x4 skew = {} (trace is 0 for ANY order)".format(A4.trace()))

# ---------------- Q43b ordered pairs x+y<=4, x,y positive integers ----------------
pairs = [(i, j) for i in range(1, 10) for j in range(1, 10) if i + j <= 4]
rep("Q43b", "pairs = {} count = {}".format(pairs, len(pairs)))
# sanity: if zero were allowed (non-negative) the count would be
pairs0 = [(i, j) for i in range(0, 10) for j in range(0, 10) if i + j <= 4]
rep("Q43b", "if x,y>=0 allowed count would be {} (not an option shape)".format(len(pairs0)))

# ---------------- Q43c  sum A + A^2 + ... + A^(n-1) ----------------
M = sp.Matrix([[1, 1], [0, 1]])
for n in (2, 3, 4, 5, 7):
    S = sp.zeros(2, 2)
    for k in range(1, n):
        S += M**k
    n_s = sp.Integer(n)
    optA = n_s * sp.Matrix([[1, sp.Rational(n - 1, 2)], [0, 1]])
    optB = (n_s - 1) * sp.Matrix([[1, sp.Rational(n - 1, 2)], [1, 0]])
    optC = (n_s - 1) * sp.Matrix([[1, sp.Rational(n, 2)], [0, 1]])
    optD = (n_s - 1) * sp.Matrix([[1, sp.Rational(n, 2)], [1, 0]])
    rep("Q43c", "n={} S={} | A?{} B?{} C?{} D?{}".format(
        n, S.tolist(), S == optA, S == optB, S == optC, S == optD))

# ---------------- Q50  cos 3C, a=4 b=3 c=2 ----------------
aa, bb, cc = F(4), F(3), F(2)
cosC = (aa**2 + bb**2 - cc**2) / (2 * aa * bb)
cos3C = 4 * cosC**3 - 3 * cosC
rep("Q50", "cosC = {}  cos3C = {}".format(cosC, cos3C))
# independent route: C = acos(7/8), cos(3C) numerically at 40 dps
Cang = sp.acos(sp.Rational(7, 8))
rep("Q50", "sympy cos(3*acos(7/8)) = {} (= {})".format(
    sp.nsimplify(sp.simplify(sp.cos(3 * Cang))), sp.N(sp.cos(3 * Cang), 30)))
rep("Q50", "options 7/128={} 11/128={} 7/64={} 11/64={}".format(
    F(7, 128), F(11, 128), F(7, 64), F(11, 64)))
# triangle validity
rep("Q50", "triangle inequality ok? {}".format(aa < bb + cc and bb < aa + cc and cc < aa + bb))

# ---------------- Q53 max of sqrt3 cos x + sin x ----------------
expr = sp.sqrt(3) * sp.cos(x) + sp.sin(x)
for deg in (30, 45, 60, 90):
    v = sp.N(expr.subs(x, sp.rad(deg)), 30)
    rep("Q53", "x={}deg -> {}".format(deg, v))
crit = sp.solve(sp.diff(expr, x), x)
rep("Q53", "critical points {} (deg {})".format(crit, [sp.N(sp.deg(c), 20) for c in crit]))
rep("Q53", "amplitude sqrt(3+1) = 2")

# ---------------- Q57 independent events ----------------
pp, qq = sp.symbols('p q')
sol = sp.solve([sp.Eq(pp * (1 - qq), sp.Rational(3, 25)),
                sp.Eq((1 - pp) * qq, sp.Rational(8, 25))], [pp, qq], dict=True)
rep("Q57", "solutions {}".format(sol))
for s in sol:
    P, Q = s[pp], s[qq]
    ok = (0 <= P <= 1) and (0 <= Q <= 1)
    rep("Q57", "P(A)={} P(B)={} valid probs? {} | check AnB'={} A'nB={}".format(
        P, Q, ok, sp.simplify(P * (1 - Q)), sp.simplify((1 - P) * Q)))
rep("Q57", "options 1/5, 3/8, 4/5, 1/2")

# ---------------- Q58 coin 16 tosses ----------------
from math import comb
rep("Q58", "C(16,7)={} C(16,9)={} equal? {}".format(comb(16, 7), comb(16, 9),
                                                    comb(16, 7) == comb(16, 9)))
p3 = F(comb(16, 3), 2**16)
rep("Q58", "P(3 heads) = {}/{} = {}".format(comb(16, 3), 2**16, p3))
rep("Q58", "35/2^12 = {} | 35/2^16 = {} | 16/2^12 = {} | 7/2^10 = {}".format(
    F(35, 2**12), F(35, 2**16), F(16, 2**12), F(7, 2**10)))

# ---------------- Q61 sphere touching plane ----------------
num = abs(6 * 1 - 3 * (-2) + 2 * 3 - 4)
den2 = 36 + 9 + 4
rep("Q61", "|6-(-6)+6-4| = {} ; sqrt(36+9+4) = {}".format(num, sp.sqrt(den2)))
radius = sp.Rational(num, 1) / sp.sqrt(den2)
rep("Q61", "radius = {} diameter = {}".format(sp.nsimplify(radius), sp.nsimplify(2 * radius)))

# ---------------- Q63 monotonicity ----------------
f = 1 / (x + 1) - sp.log(1 + x)
fp = sp.simplify(sp.diff(f, x))
rep("Q63", "f'(x) = {}".format(fp))
rep("Q63", "f' at x=0.001,1,10,1000 -> {}".format(
    [sp.N(fp.subs(x, v), 20) for v in (sp.Rational(1, 1000), 1, 10, 1000)]))
rep("Q63", "f'<0 for all x>0 ? numerator/denominator sign: {}".format(
    sp.simplify(sp.together(fp))))

# ---------------- Q66a binomial mean 4 var 3 ----------------
nn, ppr = sp.symbols('n p', positive=True)
bs = sp.solve([sp.Eq(nn * ppr, 4), sp.Eq(nn * ppr * (1 - ppr), 3)], [nn, ppr], dict=True)
rep("Q66a", "solutions {}".format(bs))
N_, P_ = 16, F(1, 4)
px1 = comb(16, 1) * P_**1 * (1 - P_)**15
rep("Q66a", "P(X=1) exact = {} = {}".format(px1, sp.nsimplify(sp.Rational(px1.numerator, px1.denominator))))
optA = 16 * sp.Rational(3, 4)**15
optB = 4 * sp.Rational(1, 4)**15
target = 4 * sp.Rational(3, 4)**15
rep("Q66a", "target 4*(3/4)^15 = {} ; equals P(X=1)? {}".format(
    target, sp.simplify(target - sp.Rational(px1.numerator, px1.denominator)) == 0))
rep("Q66a", "optA 16*(3/4)^15 == target? {} | optB 4*(1/4)^15 == target? {}".format(
    sp.simplify(optA - target) == 0, sp.simplify(optB - target) == 0))
rep("Q66a", "numeric: target={} A={} B={}".format(sp.N(target, 20), sp.N(optA, 20), sp.N(optB, 20)))

# ---------------- Q66b integral ----------------
I1 = sp.integrate((1 - x)**9, (x, 0, 1))
rep("Q66b", "int_0^1 (1-x)^9 dx = {}".format(I1))

# ---------------- Q69 collinearity ----------------
k = sp.Symbol('k')
P1 = sp.Matrix([k, 1, 3])
Q1 = sp.Matrix([1, -2, k + 1])
R1 = sp.Matrix([15, 2, -4])
cr = (R1 - P1).cross(Q1 - P1)
rep("Q69", "cross product = {}".format(sp.expand(cr.T)))
sysol = sp.solve([sp.expand(cr[0]), sp.expand(cr[1]), sp.expand(cr[2])], k, dict=True)
rep("Q69", "simultaneous solutions for k: {}".format(sysol))
for i in range(3):
    rep("Q69", "component {} zero at k = {}".format(i, sp.solve(sp.expand(cr[i]), k)))
# also check degenerate coincidences
rep("Q69", "P==Q possible? {} ; P==R? {} ; Q==R? {}".format(
    sp.solve([k - 1, sp.Integer(1) + 2, sp.Integer(3) - (k + 1)], k),
    sp.solve([k - 15, sp.Integer(1) - 2], k),
    sp.solve([sp.Integer(1) - 15, sp.Integer(-2) - 2], k)))

# ---------------- Q73 integral ----------------
integ = (sp.sin(x) + sp.cos(x))**2 / sp.sqrt(1 + sp.sin(2 * x))
val = sp.integrate(sp.simplify(sp.sin(x) + sp.cos(x)), (x, 0, sp.pi / 2))
rep("Q73", "sin x + cos x >= 0 on [0,pi/2]; integrand simplifies to sin x + cos x")
rep("Q73", "closed form = {}".format(val))
num_val = sp.N(sp.Integral(integ, (x, 0, sp.pi / 2)).evalf(30, maxn=50))
rep("Q73", "numeric integral (30 dps) = {}".format(num_val))

print("\n".join(out))
