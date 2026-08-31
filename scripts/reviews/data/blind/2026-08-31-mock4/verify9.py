# Blind verification for batch9 (NDA Maths mock4) - exact / high-precision arithmetic.
# Run: python verify9.py
from fractions import Fraction
import mpmath as mp
import sympy as sp

mp.mp.dps = 60

print("=" * 70)
print("Q79  left-hand derivative of f(x) = [x] sin(pi x) at x = k (k integer)")
print("=" * 70)

# --- symbolic: on (k-1, k) the floor is k-1, so f(x) = (k-1) sin(pi x).
# LHD = lim_{t->0^-} ( f(k+t) - f(k) ) / t   with f(k) = k*sin(pi k) = 0
x, t = sp.symbols("x t", real=True)
for kval in range(-3, 6):
    k = sp.Integer(kval)
    f_left = (k - 1) * sp.sin(sp.pi * (k + t))          # branch valid for -1 < t < 0
    fk = k * sp.sin(sp.pi * k)                           # = 0
    lhd = sp.limit((f_left - fk) / t, t, 0, dir="-")
    lhd = sp.simplify(lhd)

    A = (-1) ** k * (k - 1) * sp.pi
    B = (-1) ** (k - 1) * (k - 1) * sp.pi
    C = (-1) ** k * k * sp.pi
    D = (-1) ** (k - 1) * k * sp.pi
    matches = [lab for lab, v in (("A", A), ("B", B), ("C", C), ("D", D))
               if sp.simplify(lhd - v) == 0]
    print(f"  k={kval:3d}  LHD = {sp.nsimplify(lhd)!s:>18}   matches: {matches}")

# --- independent numeric check of the difference quotient (no symbolic shortcuts)
print("\n  numeric difference quotient (mpmath, dps=60):")


def f_num(xv):
    return mp.floor(xv) * mp.sin(mp.pi * xv)


for kval in [-3, -2, -1, 0, 1, 2, 3, 4, 5]:
    k = mp.mpf(kval)
    # Richardson-free: just take a very small h with high precision
    vals = []
    for e in (20, 25, 30):
        h = mp.mpf(10) ** (-e)
        vals.append((f_num(k) - f_num(k - h)) / h)
    num = vals[-1]
    optA = (-1) ** kval * (kval - 1) * mp.pi
    optB = (-1) ** (kval - 1) * (kval - 1) * mp.pi
    optC = (-1) ** kval * kval * mp.pi
    optD = (-1) ** (kval - 1) * kval * mp.pi
    near = [lab for lab, v in (("A", optA), ("B", optB), ("C", optC), ("D", optD))
            if abs(num - v) < mp.mpf(10) ** -12]
    print(f"  k={kval:3d}  quotient={mp.nstr(num, 15):>22}  matches: {near}")

print()
print("=" * 70)
print("Q113  mean of 100 obs = 50; y_i = (x_i - 5)/20; new mean?")
print("=" * 70)
old_mean = Fraction(50)
n = 100
# exact, with an explicit synthetic dataset whose mean is exactly 50 (not all equal)
data = [Fraction(i) for i in range(1, n + 1)]          # mean 50.5, shift it
shift = Fraction(50) - (sum(data) / n)
data = [d + shift for d in data]
assert sum(data) / n == Fraction(50), "dataset mean must be exactly 50"
new = [(d - 5) / 20 for d in data]
new_mean = sum(new) / n
print(f"  dataset mean          : {sum(data)/n}")
print(f"  transformed mean      : {new_mean}  = {float(new_mean)}")
print(f"  formula (50-5)/20     : {(old_mean - 5)/20}")
opts = {"A": Fraction(9, 4), "B": Fraction(7, 2), "C": Fraction(17, 4), "D": Fraction(11, 2)}
print("  matches:", [lab for lab, v in opts.items() if v == new_mean])
print("  (alt reading 50/20 - 5 =", Fraction(50, 20) - 5, "-> not an option)")

print()
print("=" * 70)
print("Q139  roots of (x+1)^3 + 8 = 0, omega = imaginary cube root of unity")
print("=" * 70)
X = sp.symbols("X")
true_roots = sp.solve(sp.Eq((X + 1) ** 3 + 8, 0), X)
true_set = {sp.nsimplify(sp.expand(sp.simplify(r))) for r in true_roots}
print("  sympy roots:", sorted([sp.srepr(r) for r in true_roots])[:0] or [sp.simplify(r) for r in true_roots])
true_num = sorted([complex(sp.N(r, 40)) for r in true_roots], key=lambda z: (round(z.real, 12), round(z.imag, 12)))
print("  numeric    :", [f"{z.real:+.10f}{z.imag:+.10f}i" for z in true_num])
# verify each really satisfies the equation
for r in true_roots:
    res = sp.simplify((r + 1) ** 3 + 8)
    assert res == 0, f"root {r} does not satisfy the equation ({res})"
print("  all three verified to satisfy (x+1)^3 + 8 = 0 exactly")

# Evaluate the options as SETS, for BOTH primitive cube roots of unity.
options_expr = {
    "A": ["-3", "1 + 2*w", "1 + 2*w**2"],
    "B": ["-3", "1 - 2*w", "1 - 2*w**2"],
    "C": ["-3", "-1 + 2*w", "-1 + 2*w**2"],
    "D": ["-3", "1 - 2*w", "-1 - 2*w**2"],
}


def key(z):
    return (round(z.real, 12), round(z.imag, 12))


def eval_option(entries, wval):
    out = []
    for e in entries:
        expr = sp.sympify(e, locals={"w": wval})
        out.append(complex(sp.N(sp.expand(expr), 40)))
    return sorted(out, key=key)


for wname, wval in (
    ("w = exp(2*pi*i/3)", sp.Rational(-1, 2) + sp.sqrt(3) / 2 * sp.I),
    ("w = exp(-2*pi*i/3)", sp.Rational(-1, 2) - sp.sqrt(3) / 2 * sp.I),
):
    print(f"\n  --- with {wname} ---")
    evaluated = {}
    for lab, entries in options_expr.items():
        vals = eval_option(entries, wval)
        evaluated[lab] = vals
        same = all(any(abs(v - r) < 1e-25 for r in true_num) for v in vals) and len(vals) == 3 and \
            all(any(abs(v - r) < 1e-25 for v in vals) for r in true_num)
        print(f"   {lab}: " + ", ".join(f"{z.real:+.8f}{z.imag:+.8f}i" for z in vals) +
              f"   == true root set? {same}")
    # pairwise equivalence between options (set comparison, not string comparison)
    labs = list(options_expr)
    print("   pairwise option-set equality:")
    for i in range(len(labs)):
        for j in range(i + 1, len(labs)):
            a, b = evaluated[labs[i]], evaluated[labs[j]]
            eq = len(a) == len(b) and all(abs(p - q) < 1e-25 for p, q in zip(a, b))
            print(f"     {labs[i]} == {labs[j]} ? {eq}")

# explicit sanity: is  1 + 2w  the same number as  -1 - 2w**2 ?
w = sp.Rational(-1, 2) + sp.sqrt(3) / 2 * sp.I
print("\n  identity check (uses 1 + w + w^2 = 0):")
print("   1 + 2w      =", sp.simplify(sp.expand(1 + 2 * w)))
print("   -1 - 2w**2  =", sp.simplify(sp.expand(-1 - 2 * w**2)))
print("   equal?      ", sp.simplify(sp.expand((1 + 2 * w) - (-1 - 2 * w**2))) == 0)
print("   1 + 2w**2   =", sp.simplify(sp.expand(1 + 2 * w**2)))
print("   -1 - 2w     =", sp.simplify(sp.expand(-1 - 2 * w)))
print("   equal?      ", sp.simplify(sp.expand((1 + 2 * w**2) - (-1 - 2 * w))) == 0)
print("   1 + w + w^2 =", sp.simplify(sp.expand(1 + w + w**2)))
