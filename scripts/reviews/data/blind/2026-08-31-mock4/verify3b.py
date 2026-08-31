"""Fix-ups for two blocks of verify3.py that had script bugs.

  Q74b : the earlier check declared x positive, so Abs(x) collapsed to x.
  Q100 : sp.simplify() was handed a list.
Run:  python verify3b.py
"""

import sympy as sp

print("=" * 70)
print("Q74b  d/dx [ x/|x| ] on x < 0   (unrestricted symbol this time)")
t = sp.Symbol('t')                       # NO assumptions
g = t / sp.Abs(t)
print("  g(-3), g(-0.5), g(-100)  :", g.subs(t, -3), g.subs(t, sp.Rational(-1, 2)), g.subs(t, -100))
print("  g(2), g(0.5)             :", g.subs(t, 2), g.subs(t, sp.Rational(1, 2)))
tn = sp.Symbol('tn', negative=True)
gn = sp.simplify(tn / sp.Abs(tn))
print("  simplified on t<0        :", gn, "  -> constant")
print("  d/dt                     :", sp.diff(tn / sp.Abs(tn), tn), " = ",
      sp.simplify(sp.diff(tn / sp.Abs(tn), tn)))
# difference quotient at a negative point, exact
for p in (sp.Rational(-3), sp.Rational(-1, 2)):
    for hh in (sp.Rational(1, 1000), sp.Rational(-1, 1000)):
        q = ((p + hh) / sp.Abs(p + hh) - p / sp.Abs(p)) / hh
        print("   diff quotient at %s, h=%s : %s" % (p, hh, q))
print("  options -1, 0, 1, x -> the DERIVATIVE is 0; -1 is the VALUE of the function")

print("=" * 70)
print("Q100  tower h; A due South (elev x); B due East of A (elev y); AB = z")
h, z, xa, ya = sp.symbols('h z xa ya', positive=True)
d_A = h * sp.cot(xa)                     # horizontal distance A -> foot of tower
d_B = sp.sqrt(z**2 + d_A**2)             # B is due East of A, so OAB is right-angled at A
sols = sp.solve(sp.Eq(d_B**2, (h * sp.cot(ya))**2), z**2)
print("  from d_B = h*cot(y):  z^2 =", [sp.simplify(s) for s in sols])
print("  i.e.  z^2 = h^2( cot^2 y - cot^2 x )   -> option A form")

print("  --- concrete numeric instance (exact) ---")
hv = sp.Integer(10)
xv = sp.rad(60)
zv = sp.Integer(4)
dAv = hv * sp.cot(xv)
dBv = sp.sqrt(zv**2 + dAv**2)
yv = sp.atan(hv / dBv)
print("   h=10, x=60deg, z=4  ->  dA=%s  dB=%s  y=%s deg"
      % (sp.nsimplify(dAv), sp.N(dBv, 10), sp.N(sp.deg(yv), 10)))
resid = {
    "A: h^2(cot^2 y - cot^2 x) - z^2": hv**2 * (sp.cot(yv)**2 - sp.cot(xv)**2) - zv**2,
    "B: z^2(cot^2 y - cot^2 x) - h^2": zv**2 * (sp.cot(yv)**2 - sp.cot(xv)**2) - hv**2,
    "C: h^2(tan^2 y - tan^2 x) - z^2": hv**2 * (sp.tan(yv)**2 - sp.tan(xv)**2) - zv**2,
    "D: z^2(tan^2 y - tan^2 x) - h^2": zv**2 * (sp.tan(yv)**2 - sp.tan(xv)**2) - hv**2,
}
for k, v in resid.items():
    s = sp.simplify(v)
    print("   %-34s = %-22s  holds? %s" % (k, sp.N(s, 12), sp.simplify(s) == 0))

print("  --- second, DISCRIMINATING instance (different h, x, z) ---")
hv2, xv2, zv2 = sp.Integer(7), sp.rad(45), sp.Integer(9)
dAv2 = hv2 * sp.cot(xv2)
dBv2 = sp.sqrt(zv2**2 + dAv2**2)
yv2 = sp.atan(hv2 / dBv2)
for k, expr in (("A", hv2**2 * (sp.cot(yv2)**2 - sp.cot(xv2)**2) - zv2**2),
                ("B", zv2**2 * (sp.cot(yv2)**2 - sp.cot(xv2)**2) - hv2**2),
                ("C", hv2**2 * (sp.tan(yv2)**2 - sp.tan(xv2)**2) - zv2**2),
                ("D", zv2**2 * (sp.tan(yv2)**2 - sp.tan(xv2)**2) - hv2**2)):
    print("   option %s residual = %-22s holds? %s"
          % (k, sp.N(sp.simplify(expr), 12), sp.simplify(expr) == 0))

print("=" * 70)
print("Q92  is any option universally true?  (extra pathological sets)")


def power_set(s):
    from itertools import product as pr
    s = list(s)
    return frozenset(frozenset(e for e, b in zip(s, bits) if b)
                     for bits in pr([0, 1], repeat=len(s)))


e = frozenset()
cases = {
    "{1}": frozenset({1}),
    "{1,2,3}": frozenset({1, 2, 3}),
    "{a,b}": frozenset({'a', 'b'}),
    "empty set": e,
    "{ {} }": frozenset({e}),
    "{ {}, {{}} }": frozenset({e, frozenset({e})}),
}
for name, A in cases.items():
    P = power_set(A)
    print("  A = %-14s (a) %-5s (b) %-5s (c) %-5s (d) %-5s"
          % (name, (A | P) == P, (A & P) == A, (A - P) == A, (P - {A}) == P))
print("  -> (c) A - P(A) = A holds for every ORDINARY set (elements are not subsets of A);")
print("     it fails only for sets built from their own subsets, e.g. A = { {} }.")
print("     (d) is false for EVERY A because A is always an element of P(A).")
print("=" * 70)
