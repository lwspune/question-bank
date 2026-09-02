"""Supplementary checks: Q1640 centre by completing the square, and pairwise option distinctness."""
import sympy as sp
import itertools

x, y = sp.symbols('x y', real=True)

print("=" * 60)
print("Q1640 centre by completing the square (my earlier 'centre on circle' check was ill-posed)")
eq = 3 * x ** 2 + 3 * y ** 2 - 6 * x - 18 * y - 7
mon = sp.expand(eq / 3)
print("  monic form:", mon)
# x^2 - 2x + y^2 - 6y - 7/3 = (x-1)^2 + (y-3)^2 - 1 - 9 - 7/3
cx, cy = sp.Rational(1), sp.Rational(3)
r2 = sp.simplify(cx ** 2 + cy ** 2 + sp.Rational(7, 3))
print("  centre =", (cx, cy), " r^2 =", r2, " r =", sp.sqrt(r2))
resid = sp.simplify(sp.expand(mon - ((x - cx) ** 2 + (y - cy) ** 2 - r2)))
print("  residual of (x-1)^2+(y-3)^2-r^2 vs monic form (must be 0):", resid)
# A diameter must pass through the centre; confirm each candidate line does for its c value
for name, (A, B) in {"3x+y": (3, 1), "x-3y": (1, -3)}.items():
    c = A * cx + B * cy
    print(f"   {name} = {c}  (line through centre: {A}*{cx} + {B}*{cy} = {c})")
print("  c1*c2 =", (3 * cx + 1 * cy) * (1 * cx - 3 * cy))

print("=" * 60)
print("Pairwise DISTINCTNESS of numeric/expression options (guard against two-equal-options defect)")

def sweep(tag, opts, symbolic_free=True):
    keys = sorted(opts)
    dupes = []
    for u, v in itertools.combinations(keys, 2):
        d = sp.simplify(opts[u] - opts[v])
        if d == 0:
            dupes.append((u, v))
    print(f"  {tag}: duplicates =", dupes if dupes else "none")

sweep("Q1637 chord", {'A': 12 / sp.sqrt(13), 'B': sp.Integer(2), 'C': sp.Integer(5), 'D': sp.Integer(8)})
sweep("Q1640 c1c2", {'A': sp.Integer(-48), 'B': sp.Integer(80), 'C': sp.Integer(-72), 'D': sp.Integer(54)})
sweep("Q1692 focus x", {'A': sp.sqrt(5) / 3, 'B': sp.sqrt(5) / 2, 'C': sp.sqrt(3) / 2, 'D': sp.sqrt(5) / 6})
sweep("Q1829 lambda", {'A': sp.Integer(4), 'B': sp.Integer(8), 'C': sp.Integer(12), 'D': sp.Integer(22)})
sweep("Q1852 dot sum", {'A': sp.Rational(-3, 2), 'B': sp.Rational(3, 2), 'C': sp.Integer(2), 'D': sp.Integer(-1)})

a, b, al = sp.symbols('a b alpha', positive=True)
sweep("Q1519 distance", {
    'A': a * b / sp.sqrt(a ** 2 * sp.cos(al) ** 2 - b ** 2 * sp.sin(al) ** 2),
    'B': a * b / sp.sqrt(a ** 2 * sp.cos(al) ** 2 + b ** 2 * sp.sin(al) ** 2),
    'C': a * b / sp.sqrt(a ** 2 * sp.sin(al) ** 2 - b ** 2 * sp.cos(al) ** 2),
    'D': a * b / sp.sqrt(a ** 2 * sp.sin(al) ** 2 + b ** 2 * sp.cos(al) ** 2),
})

ys = sp.symbols('y', positive=True)
sweep("Q2179 inverse", {
    'A': (ys + sp.sqrt(ys ** 2 - 4)) / 2,
    'B': ys / (1 + ys ** 2),
    'C': (2 * ys - sp.sqrt(ys ** 2 - 4)) / 2,
    'D': 1 + sp.sqrt(ys ** 2 - 4),
})
print("   Q2179 NOTE: A and D coincide at y=2 only -> y=2 is a NON-discriminating test point")
for yv in [sp.Integer(2), sp.Rational(5, 2), sp.Integer(5)]:
    A_ = sp.simplify(((ys + sp.sqrt(ys ** 2 - 4)) / 2).subs(ys, yv))
    D_ = sp.simplify((1 + sp.sqrt(ys ** 2 - 4)).subs(ys, yv))
    print(f"     y={yv}: A={A_}  D={D_}  equal={sp.simplify(A_ - D_) == 0}")

print("=" * 60)
print("Q2188 set equality {4,4w,4w^2} vs actual cube roots of 64")
w = sp.Rational(-1, 2) + sp.sqrt(3) / 2 * sp.I
mine = {sp.nsimplify(sp.expand(4 * w ** n)) for n in (0, 1, 2)}
actual = {sp.nsimplify(sp.expand(r)) for r in sp.solve(sp.Symbol('z') ** 3 - 64, sp.Symbol('z'))}
print("  option A set == true preimage:", mine == actual)
print("  |preimage| =", len(actual), " so {4} and {4,4w} are PROPER SUBSETS, phi is empty")

print("=" * 60)
print("Q1805 exclusive vs inclusive 'isosceles'")
print("  all three sides^2 = 38 -> equilateral; right-angle test failed;")
print("  under INCLUSIVE isosceles (>=2 equal) option C would also read true,")
print("  but the presence of 'equilateral' as its own option forces the EXCLUSIVE reading.")

print("=" * 60)
print("Q2163 truth of each option for f(x)=x^3-1 on R->R")
print("  one-one: TRUE (strictly increasing)")
print("  onto:    TRUE (cube root exists for every real)")
print("  bijection: TRUE and is the only option that captures BOTH")
print("  neither: FALSE")
