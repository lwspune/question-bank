"""Exact verification for batch7 blind re-derivation. No floats where equality matters."""
from fractions import Fraction as F
import sympy as sp

print("=" * 60)
print("Q1490 lines through (1,1) at 45 deg to x+y=0")
x, y, m = sp.symbols('x y m', real=True)
# angle between slope m and slope -1
sols_p = sp.solve(sp.Eq((m + 1), (1 - m)), m)   # tan = +1
sols_n = sp.solve(sp.Eq((m + 1), -(1 - m)), m)  # tan = -1
print("  finite-slope solutions m: case+ =", sols_p, " case- =", sols_n, "(case- empty => second line is vertical)")
# check the vertical line x=1 explicitly: direction (0,1) vs line x+y=0 direction (1,-1)
import math
cosang = abs(0 * 1 + 1 * (-1)) / (1 * math.sqrt(2))
print("  vertical line angle with x+y=0 =", round(math.degrees(math.acos(cosang)), 6))
# verify each option's two lines
def ang_with_xy0(a, b):
    # line ax+by+c=0 ; direction (-b, a) ; x+y=0 direction (1,-1)
    num = abs(-b * 1 + a * (-1))
    den = math.hypot(b, a) * math.sqrt(2)
    return round(math.degrees(math.acos(min(1, num / den))), 6)
opts1490 = {
    'A': [(1, 0, -1), (1, -1, 0)],
    'B': [(1, -1, 0), (0, 1, -1)],
    'C': [(1, 1, -2), (0, 1, -1)],
    'D': [(1, 0, -1), (0, 1, -1)],
}
for k, ls in opts1490.items():
    thru = all(a * 1 + b * 1 + c == 0 for a, b, c in ls)
    angs = [ang_with_xy0(a, b) for a, b, c in ls]
    print(f"  {k}: through(1,1)={thru} angles={angs}")

print("=" * 60)
print("Q1519 perpendicular distance from origin")
a, b, al = sp.symbols('a b alpha', positive=True)
d = sp.Abs(-1) / sp.sqrt((sp.sin(al) / b) ** 2 + (sp.cos(al) / a) ** 2)
d = sp.simplify(d)
print("  derived d =", d)
cand = {
    'A': sp.Abs(a * b) / sp.sqrt(a ** 2 * sp.cos(al) ** 2 - b ** 2 * sp.sin(al) ** 2),
    'B': sp.Abs(a * b) / sp.sqrt(a ** 2 * sp.cos(al) ** 2 + b ** 2 * sp.sin(al) ** 2),
    'C': sp.Abs(a * b) / sp.sqrt(a ** 2 * sp.sin(al) ** 2 - b ** 2 * sp.cos(al) ** 2),
    'D': sp.Abs(a * b) / sp.sqrt(a ** 2 * sp.sin(al) ** 2 + b ** 2 * sp.cos(al) ** 2),
}
# discriminating test point: a=2,b=3,alpha=pi/6 (a!=b, sin!=cos)
sub = {a: 2, b: 3, al: sp.pi / 6}
print("  d at a=2,b=3,al=pi/6 =", sp.nsimplify(sp.simplify(d.subs(sub))), "=", sp.N(d.subs(sub), 30))
for k, v in cand.items():
    try:
        print(f"   {k} ->", sp.N(v.subs(sub), 30))
    except Exception as e:
        print(f"   {k} -> err {e}")

print("=" * 60)
print("Q1524 intersection line through origin")
aa, bb = sp.symbols('a b', nonzero=True)
sol = sp.solve([sp.Eq(x / aa + y / bb, 1), sp.Eq(x / bb + y / aa, 1)], [x, y], dict=True)
print("  intersection =", sol)
# numeric discriminating check a=2,b=5
s = sp.solve([sp.Eq(x / 2 + y / 5, 1), sp.Eq(x / 5 + y / 2, 1)], [x, y], dict=True)[0]
print("  a=2,b=5 point =", s)
px, py = s[x], s[y]
print("   A ax+by =", sp.simplify(2 * px + 5 * py))
print("   B bx+ay =", sp.simplify(5 * px + 2 * py))
print("   C y-x   =", sp.simplify(py - px))
print("   D x+y   =", sp.simplify(px + py))

print("=" * 60)
print("Q1637 orthogonal circles, common chord")
k = sp.symbols('k')
g1, f1, c1 = F(-1), F(-1), F(-7)
g2, f2 = F(2), F(1)
kk = sp.solve(sp.Eq(2 * g1 * g2 + 2 * f1 * f2, c1 + k), k)[0]
print("  k =", kk)
r1 = sp.sqrt(g1 ** 2 + f1 ** 2 - c1)
r2 = sp.sqrt(g2 ** 2 + f2 ** 2 - kk)
dcen = sp.sqrt((1 - (-2)) ** 2 + (1 - (-1)) ** 2)
print("  r1,r2,d =", r1, r2, dcen, " orth check r1^2+r2^2==d^2 ->", sp.simplify(r1**2 + r2**2 - dcen**2) == 0)
# radical axis S1-S2
# S1: x^2+y^2-2x-2y-7 ; S2: x^2+y^2+4x+2y+k
ra = sp.expand((-2 * x - 2 * y - 7) - (4 * x + 2 * y + kk))
print("  radical axis:", ra, "= 0")
A_, B_, C_ = ra.coeff(x), ra.coeff(y), ra.subs({x: 0, y: 0})
dist1 = sp.Abs(A_ * 1 + B_ * 1 + C_) / sp.sqrt(A_ ** 2 + B_ ** 2)
chord = 2 * sp.sqrt(sp.simplify(r1 ** 2 - dist1 ** 2))
print("  chord from circle1 =", sp.simplify(sp.radsimp(chord)), "=", sp.N(chord, 30))
dist2 = sp.Abs(A_ * (-2) + B_ * (-1) + C_) / sp.sqrt(A_ ** 2 + B_ ** 2)
chord2 = 2 * sp.sqrt(sp.simplify(r2 ** 2 - dist2 ** 2))
print("  chord from circle2 =", sp.N(chord2, 30), " (must agree)")
print("  formula 2*r1*r2/d =", sp.N(2 * r1 * r2 / dcen, 30))
print("  option A 12/sqrt13 =", sp.N(12 / sp.sqrt(13), 30))

print("=" * 60)
print("Q1640 diameters")
# 3x^2+3y^2-6x-18y-7=0 -> x^2+y^2-2x-6y-7/3=0 -> centre (1,3)
cx, cy = 1, 3
c1v = 3 * cx + cy
c2v = cx - 3 * cy
print("  centre =", (cx, cy), " c1 =", c1v, " c2 =", c2v, " product =", c1v * c2v)
# sanity: centre satisfies original equation form
print("  check 3x^2+3y^2-6x-18y-7 at centre:", 3 * cx ** 2 + 3 * cy ** 2 - 6 * cx - 18 * cy - 7)

print("=" * 60)
print("Q1642 tangent perpendicular to 2x+y-5=0")
xx = sp.symbols('x', positive=True)
fy = sp.sqrt(xx - 1)
dydx = sp.diff(fy, xx)
sol = sp.solve(sp.Eq(dydx, F(1, 2)), xx)
print("  dy/dx =", dydx, " solve =1/2 ->", sol)
for s_ in sol:
    print("   point:", (s_, sp.sqrt(s_ - 1)))
for lbl, (pxv, pyv) in {'A': (2, -1), 'B': (10, 3), 'C': (2, 1), 'D': (5, -2)}.items():
    on = sp.simplify(sp.sqrt(sp.Rational(pxv) - 1) - pyv) == 0
    slope = sp.N(dydx.subs(xx, pxv), 20) if pxv > 1 else None
    print(f"   {lbl} on-curve={on} slope_there={slope}")

print("=" * 60)
print("Q1692 foci of 4x^2+9y^2=1")
a2, b2 = F(1, 4), F(1, 9)
print("  a^2 =", a2, " b^2 =", b2, " a>b:", a2 > b2)
c2 = a2 - b2
print("  c^2 =", c2, " c =", sp.sqrt(sp.Rational(c2)), "=", sp.N(sp.sqrt(sp.Rational(c2)), 30))
for lbl, v in {'A': sp.sqrt(5) / 3, 'B': sp.sqrt(5) / 2, 'C': sp.sqrt(3) / 2, 'D': sp.sqrt(5) / 6}.items():
    print(f"   {lbl} =", sp.N(v, 30))

print("=" * 60)
print("Q1805 triangle from position vectors")
import itertools
P = {'A': sp.Matrix([3, 1, 2]), 'B': sp.Matrix([1, -2, 7]), 'C': sp.Matrix([-2, 3, 5])}
sides = {}
for u, v in itertools.combinations('ABC', 2):
    d2 = sum((P[u] - P[v]).applyfunc(lambda t: t ** 2))
    sides[u + v] = d2
    print(f"  |{u}{v}|^2 =", d2)
vals = list(sides.values())
print("  all equal:", len(set(vals)) == 1)
# right angle test: largest^2 == sum of other two
sv = sorted(vals)
print("  pythag check:", sv[0] + sv[1] == sv[2])

print("=" * 60)
print("Q1829 collinear points")
lam = sp.symbols('lambda')
p1 = sp.Matrix([10, 3]); p2 = sp.Matrix([12, -5]); p3 = sp.Matrix([lam, 11])
cross = (p2 - p1)[0] * (p3 - p1)[1] - (p2 - p1)[1] * (p3 - p1)[0]
print("  cross =", sp.expand(cross), " -> lambda =", sp.solve(cross, lam))

print("=" * 60)
print("Q1852 unit vectors summing to zero")
s = sp.symbols('s')
# |a+b+c|^2 = 3 + 2S = 0
print("  S =", sp.solve(sp.Eq(3 + 2 * s, 0), s))
# concrete realisation: three unit vectors at 120 deg
av = sp.Matrix([1, 0]); bv = sp.Matrix([sp.Rational(-1, 2), sp.sqrt(3) / 2]); cv = sp.Matrix([sp.Rational(-1, 2), -sp.sqrt(3) / 2])
print("  sum check:", sp.simplify(av + bv + cv).T)
S = sp.simplify(av.dot(bv) + bv.dot(cv) + cv.dot(av))
print("  concrete S =", S)

print("=" * 60)
print("Q1939 vector of magnitude 12 perpendicular to plane")
u = sp.Matrix([4, 6, -1]); v = sp.Matrix([3, 8, 1])
cr = u.cross(v)
print("  u x v =", cr.T, " |u x v| =", sp.sqrt(cr.dot(cr)))
w = 12 * cr / sp.sqrt(cr.dot(cr))
print("  12 * unit =", sp.simplify(w).T, "  (and its negative)")
for lbl, vec in {'A': sp.Matrix([-8, 4, 8]), 'B': sp.Matrix([8, 4, 8]), 'C': sp.Matrix([8, -4, 8]), 'D': sp.Matrix([8, -4, -8])}.items():
    mag = sp.sqrt(vec.dot(vec))
    perp = (vec.dot(u) == 0) and (vec.dot(v) == 0)
    print(f"   {lbl} mag={mag} perp_to_both={perp} dot_u={vec.dot(u)} dot_v={vec.dot(v)}")

print("=" * 60)
print("Q1975 direction cosines")
g = sp.symbols('gamma')
cg2 = sp.Rational(1, 1) - sp.cos(sp.rad(45)) ** 2 - sp.cos(sp.rad(60)) ** 2
print("  cos^2(gamma) =", sp.simplify(cg2))
print("  cos(gamma) =", [sp.simplify(sp.sqrt(cg2)), -sp.simplify(sp.sqrt(cg2))])
print("  gamma =", sp.deg(sp.acos(sp.Rational(1, 2))), ",", sp.deg(sp.acos(sp.Rational(-1, 2))))
# check l^2+m^2+n^2 = 1 for both
for n in [F(1, 2), F(-1, 2)]:
    tot = F(1, 2) + F(1, 4) + n * n
    print(f"   n={n}: l^2+m^2+n^2 =", tot)

print("=" * 60)
print("Q2163 f(x)=x^3-1 on R->R")
t = sp.symbols('t', real=True)
print("  derivative:", sp.diff(t ** 3 - 1, t), " zero only at t=0, strictly increasing overall")
print("  injective test x1^3-1 = x2^3-1 => x1=x2 :", sp.solve(sp.Eq(t ** 3 - 1, sp.Symbol('u', real=True) ** 3 - 1), t))
yv = sp.Symbol('y', real=True)
print("  surjective: preimage of y is", sp.real_roots(sp.Poly(t ** 3 - 1 - 5, t)), "(example y=5)")

print("=" * 60)
print("Q2179 inverse of x + 1/x")
xs = sp.symbols('x', positive=True)
ys = sp.symbols('y', positive=True)
roots = sp.solve(sp.Eq(xs + 1 / xs, ys), xs)
print("  roots:", roots)
optA = (ys + sp.sqrt(ys ** 2 - 4)) / 2
optB = ys / (1 + ys ** 2)
optC = (2 * ys - sp.sqrt(ys ** 2 - 4)) / 2
optD = 1 + sp.sqrt(ys ** 2 - 4)
# discriminating test: y = 5/2 -> x should be 2 (since f(2)=2.5) with x>=1 branch
for lbl, e in {'A': optA, 'B': optB, 'C': optC, 'D': optD}.items():
    val = sp.nsimplify(sp.simplify(e.subs(ys, sp.Rational(5, 2))))
    back = sp.simplify(val + 1 / val) if val != 0 else None
    print(f"   {lbl}: f^-1(2.5)={val}  f(that)={back}")
print("  also y=2 (boundary):", {lbl: sp.simplify(e.subs(ys, 2)) for lbl, e in {'A': optA, 'B': optB, 'C': optC, 'D': optD}.items()})

print("=" * 60)
print("Q2188 f(x)=x^3 over C, preimage of 64")
z = sp.symbols('z')
rs = sp.solve(sp.Eq(z ** 3, 64), z)
print("  roots:", rs)
w = sp.Rational(-1, 2) + sp.sqrt(3) / 2 * sp.I
print("  omega =", w, " omega^3 =", sp.simplify(sp.expand(w ** 3)))
print("  {4, 4w, 4w^2} =", [sp.simplify(sp.expand(4 * w ** n)) for n in (0, 1, 2)])
