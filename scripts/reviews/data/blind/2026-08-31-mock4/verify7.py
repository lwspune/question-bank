"""Exact-arithmetic verification for batch7 blind re-derivation.

Run:  python verify7.py
Uses sympy / Fraction throughout; no floats where an equality is at stake.
"""

from fractions import Fraction as F
import sympy as sp

out = []


def rec(tag, val):
    out.append("{0}: {1}".format(tag, val))


# ---------------------------------------------------------------- 1457
# line through (-1/2, 1) and (1, 2); find x-intercept
x1, y1 = F(-1, 2), F(1)
x2, y2 = F(1), F(2)
m = (y2 - y1) / (x2 - x1)
# y - y1 = m (x - x1); y = 0  =>  x = x1 - y1/m
xint = x1 - y1 / m
rec("1457 slope", m)
rec("1457 x-intercept", xint)
# sanity: both points satisfy y = m(x - xint)
rec("1457 check pt1", m * (x1 - xint) == y1)
rec("1457 check pt2", m * (x2 - xint) == y2)

# ---------------------------------------------------------------- 1489
# sides: y = sqrt(3) x, y = -sqrt(3) x, y = 1
s3 = sp.sqrt(3)
V0 = sp.Matrix([0, 0])                      # y=s3 x  ^  y=-s3 x
V1 = sp.Matrix([1 / s3, 1])                 # y=s3 x  ^  y=1
V2 = sp.Matrix([-1 / s3, 1])                # y=-s3 x ^ y=1
d01 = sp.simplify(sp.sqrt((V0 - V1).dot(V0 - V1)))
d02 = sp.simplify(sp.sqrt((V0 - V2).dot(V0 - V2)))
d12 = sp.simplify(sp.sqrt((V1 - V2).dot(V1 - V2)))
rec("1489 side lengths", (d01, d02, d12))
rec("1489 all equal", sp.simplify(d01 - d02) == 0 and sp.simplify(d01 - d12) == 0)
# angle at V0 between the two slant sides
u = V1 - V0
v = V2 - V0
cosang = sp.simplify(u.dot(v) / (sp.sqrt(u.dot(u)) * sp.sqrt(v.dot(v))))
rec("1489 cos(angle at origin)", cosang)  # expect 1/2 -> 60 deg

# ---------------------------------------------------------------- 1515
b, c = sp.symbols("b c")
bsol = sp.solve(sp.Eq(sp.Rational(13, 5) + 32 / b, 1), b)
rec("1515 b", bsol)
bb = bsol[0]
# L: x/5 + y/b = 1  ->  slope
xs, ys = sp.symbols("x y")
L = sp.Eq(xs / 5 + ys / bb, 1)
Lslope = sp.solve(L, ys)[0].diff(xs)
rec("1515 slope L", Lslope)
csol = sp.solve(sp.Eq(sp.solve(sp.Eq(xs / c + ys / 3, 1), ys)[0].diff(xs), Lslope), c)
rec("1515 c", csol)
cc = csol[0]
# put both in Ax+By+C=0 with same (A,B)
Lstd = sp.simplify(sp.expand((xs / 5 + ys / bb - 1) * 20))   # 4x - y - 20
Kstd = sp.simplify(sp.expand((xs / cc + ys / 3 - 1) * 3))    # -4x + y - 3
rec("1515 L std", Lstd)
rec("1515 K std", Kstd)
# normalise K to match L's leading coefficients
Kn = sp.simplify(-Kstd)   # 4x - y + 3
rec("1515 K normalised", Kn)
A_, B_ = sp.Poly(Lstd, xs, ys).coeff_monomial(xs), sp.Poly(Lstd, xs, ys).coeff_monomial(ys)
cL = sp.Poly(Lstd, xs, ys).coeff_monomial(1)
cK = sp.Poly(Kn, xs, ys).coeff_monomial(1)
dist = sp.simplify(sp.Abs(cL - cK) / sp.sqrt(A_ ** 2 + B_ ** 2))
rec("1515 distance", dist)
rec("1515 distance == 23/sqrt(17)", sp.simplify(dist - 23 / sp.sqrt(17)) == 0)
rec("1515 distance == 23/sqrt(15)", sp.simplify(dist - 23 / sp.sqrt(15)) == 0)
# independent check: distance from a point of L to line K
# pick point on L: x=5 -> y = 0 (since x/5 + y/b = 1)
px, py = 5, 0
rec("1515 pt on L?", sp.simplify(Lstd.subs({xs: px, ys: py})) == 0)
d2 = sp.simplify(sp.Abs(4 * px - py + 3) / sp.sqrt(17))
rec("1515 dist via point", d2)

# ---------------------------------------------------------------- 1577
sol = sp.solve([sp.Eq(2 * xs - 3 * ys, 5), sp.Eq(3 * xs - 4 * ys, 7)], [xs, ys])
rec("1577 centre", sol)
cx, cy = sol[xs], sol[ys]
# area 154 with pi = 22/7 (NDA convention) -> r^2
r2_22_7 = sp.Rational(154) / sp.Rational(22, 7)
rec("1577 r^2 (pi=22/7)", r2_22_7)
rec("1577 r^2 (true pi)", sp.N(154 / sp.pi, 12))
r2 = r2_22_7
circ = sp.expand((xs - cx) ** 2 + (ys - cy) ** 2 - r2)
rec("1577 circle expanded", circ)
opts_1577 = {
    "A": xs**2 + ys**2 - 2*xs + 2*ys + 47,
    "B": xs**2 + ys**2 + 2*xs - 2*ys - 47,
    "C": xs**2 + ys**2 - 2*xs + 2*ys - 47,
    "D": xs**2 + ys**2 - 2*xs - 2*ys + 47,
}
for k, v in opts_1577.items():
    rec("1577 opt " + k + " matches", sp.simplify(sp.expand(v) - circ) == 0)

# ---------------------------------------------------------------- 1584
# x - 4y + 7 = 0 ; 3x - 12y + 11 = 0  -> x - 4y + 11/3 = 0
d = sp.Abs(7 - sp.Rational(11, 3)) / sp.sqrt(1 + 16)
rec("1584 distance between lines", sp.simplify(d))
rad = sp.simplify(d / 2)
rec("1584 radius", rad)
for lab, val in [("A", 10/(3*sp.sqrt(17))), ("B", 5/(3*sp.sqrt(7))),
                 ("C", 5/sp.sqrt(17)), ("D", 5/(3*sp.sqrt(17)))]:
    rec("1584 opt " + lab, sp.simplify(rad - val) == 0)

# ---------------------------------------------------------------- 1657
a_, t_ = sp.symbols("a t", positive=True)
cands = {
    "A": (-a_ * t_**2, 2 * a_ * t_),
    "B": (a_ * sp.sin(t_)**2, -2 * a_ * sp.sin(t_)),
    "C": (-a_ * t_**2, -2 * a_ * t_),
    "D": (a_ * sp.sin(t_), -2 * a_ * sp.sin(t_)),
}
for k, (X, Y) in cands.items():
    resid = sp.simplify(Y**2 - 4 * a_ * X)
    rec("1657 opt " + k + " residual y^2-4ax", resid)

# ---------------------------------------------------------------- 1738
# 9x^2+16y^2=144 -> x^2/16 + y^2/9 = 1
A2, B2 = 16, 9
a_e = sp.sqrt(A2)
rec("1738 a (semi-major)", a_e)
rec("1738 sum of focal distances 2a", 2 * a_e)
# brute check: e, foci, and sum at a couple of discriminating points
e = sp.sqrt(1 - sp.Rational(B2, A2))
f = a_e * e
rec("1738 focus x", f)
for th in [sp.pi / 7, sp.Rational(1, 3)]:
    P = (a_e * sp.cos(th), sp.sqrt(B2) * sp.sin(th))
    s = sp.sqrt((P[0] - f)**2 + P[1]**2) + sp.sqrt((P[0] + f)**2 + P[1]**2)
    rec("1738 sum at theta=" + str(th), sp.simplify(sp.nsimplify(sp.N(s, 30))))

# ---------------------------------------------------------------- 1831
va = sp.Matrix([1, 1, -1])
vb = sp.Matrix([2, -3, 1])
d1 = va + vb
d2v = va - vb
rec("1831 a+b", d1.T)
rec("1831 a-b", d2v.T)
rec("1831 |a+b|", sp.sqrt(d1.dot(d1)))
rec("1831 |a-b|", sp.sqrt(d2v.dot(d2v)))
# parallelogram law sanity: |d1|^2+|d2|^2 = 2(|a|^2+|b|^2)
rec("1831 parallelogram law",
    sp.simplify(d1.dot(d1) + d2v.dot(d2v) - 2 * (va.dot(va) + vb.dot(vb))) == 0)

# ---------------------------------------------------------------- 1870
A_pt = sp.Matrix([1, 2, 3])
P_pt = sp.Matrix([2, 4, 5])
Q_pt = sp.Matrix([3, 3, 1])
u2 = P_pt - A_pt
v2 = Q_pt - A_pt
rec("1870 AP", u2.T)
rec("1870 AQ", v2.T)
rec("1870 dot", u2.dot(v2))
cos2 = sp.simplify(u2.dot(v2) / (sp.sqrt(u2.dot(u2)) * sp.sqrt(v2.dot(v2))))
rec("1870 cos", cos2)
rec("1870 angle deg", sp.deg(sp.acos(cos2)))

# ---------------------------------------------------------------- 1893
# |axb|^2 + (a.b)^2 = |a|^2|b|^2
dot2 = sp.Rational(2)**2 * sp.Rational(5)**2 - sp.Rational(8)**2
rec("1893 (a.b)^2", dot2)
rec("1893 |a.b|", sp.sqrt(dot2))
# discriminating construction: a=(2,0,0), b=(bx,by,0) with |b|=5, |axb|=8
bx, by = sp.symbols("bx by", real=True)
s = sp.solve([sp.Eq(bx**2 + by**2, 25), sp.Eq(sp.Abs(2 * by), 8)], [bx, by], dict=True)
rec("1893 explicit b solutions", s)
for ss in s:
    rec("1893 explicit a.b", sp.simplify(2 * ss[bx]))

# ---------------------------------------------------------------- 1903
# (7a+5b) x (8a+11b) = (7*11 - 5*8)(a x b)
coef = 7 * 11 - 5 * 8
rec("1903 coefficient", coef)
rec("1903 area", coef * 20)
# explicit check with concrete vectors of cross-magnitude 20
ea = sp.Matrix([4, 0, 0])
eb = sp.Matrix([0, 5, 0])
rec("1903 base |axb|", sp.sqrt((ea.cross(eb)).dot(ea.cross(eb))))
n1 = (7 * ea + 5 * eb).cross(8 * ea + 11 * eb)
rec("1903 explicit area", sp.sqrt(n1.dot(n1)))

# ---------------------------------------------------------------- 1991
c2 = 1 - sp.cos(sp.pi / 3)**2 - sp.cos(sp.pi / 4)**2
rec("1991 cos^2(gamma)", sp.simplify(c2))
rec("1991 gamma options (deg)",
    [sp.deg(sp.acos(sp.sqrt(c2))), sp.deg(sp.acos(-sp.sqrt(c2)))])
rec("1991 sum check",
    sp.simplify(sp.cos(sp.pi/3)**2 + sp.cos(sp.pi/4)**2 + sp.cos(sp.pi/3)**2) == 1)
# is pi/4 or pi/2 or pi/6 possible?
for name, ang in [("pi/4", sp.pi/4), ("pi/2", sp.pi/2), ("pi/6", sp.pi/6), ("pi/3", sp.pi/3)]:
    tot = sp.simplify(sp.cos(sp.pi/3)**2 + sp.cos(sp.pi/4)**2 + sp.cos(ang)**2)
    rec("1991 total with gamma=" + name, tot)

# ---------------------------------------------------------------- 2165
# f(n) = 1 + n^2 on N
vals = {}
inj = True
for n in range(1, 200):
    v = 1 + n * n
    if v in vals:
        inj = False
    vals[v] = n
rec("2165 injective on 1..199", inj)
missing = [k for k in range(1, 100) if k not in vals]
rec("2165 first few naturals NOT in range", missing[:8])
# also with 0 included
vals0 = set(1 + n * n for n in range(0, 200))
rec("2165 with 0 in N, 3 attained?", 3 in vals0)

# ---------------------------------------------------------------- 2173
xv = sp.symbols("x", real=True)
pairs = {
    "A": (sp.sin(xv), sp.Abs(xv)),
    "B": (xv**2, sp.sin(sp.sqrt(xv))),
    "D": (sp.sin(xv)**2, sp.sqrt(xv)),
}
target_gf = sp.Abs(sp.sin(xv))
target_fg = sp.sin(sp.sqrt(xv))**2
for k, (fe, ge) in pairs.items():
    gf = ge.subs(xv, fe)
    fg = fe.subs(xv, ge)
    ok1 = sp.simplify(gf - target_gf) == 0
    # numeric fallback on a discriminating grid (x>0 so sqrt real)
    grid = [sp.Rational(1, 7), sp.Rational(3, 2), sp.Rational(5), sp.Rational(11, 3), sp.Rational(20)]
    ok1n = all(sp.N(sp.Abs(gf.subs(xv, g) - target_gf.subs(xv, g)), 30) < 1e-25 for g in grid)
    ok2n = all(sp.N(sp.Abs(fg.subs(xv, g) - target_fg.subs(xv, g)), 30) < 1e-25 for g in grid)
    rec("2173 opt " + k + " g(f(x))", gf)
    rec("2173 opt " + k + " f(g(x))", fg)
    rec("2173 opt " + k + " g(f)==|sin x| (sym/num)", (ok1, ok1n))
    rec("2173 opt " + k + " f(g)==sin^2(sqrt x) (num)", ok2n)
# negative-x discriminator for A vs D on g(f(x)) is fine; the split is f(g(x))
rec("2173 A f(g) at x=4: sin|4|", sp.N(sp.sin(4), 20))
rec("2173 target f(g) at x=4: sin^2(2)", sp.N(sp.sin(2)**2, 20))

# ---------------------------------------------------------------- 2189
fexpr = sp.sin(xv) + sp.cos(xv)
gexpr = xv**2
fog = fexpr.subs(xv, gexpr)
rec("2189 (f o g)(x)", fog)
optC = sp.sin(xv**2) + sp.cos(xv**2)
optD = sp.sin(xv**2) + sp.cos(xv)**2
rec("2189 == optC", sp.simplify(fog - optC) == 0)
rec("2189 == optD", sp.simplify(fog - optD) == 0)
rec("2189 optD at x=1 vs fog", (sp.N(optD.subs(xv, 1), 20), sp.N(fog.subs(xv, 1), 20)))
rec("2189 is it constant 1?", sp.N(fog.subs(xv, sp.Rational(1, 2)), 20))

print("\n".join(str(o) for o in out))
