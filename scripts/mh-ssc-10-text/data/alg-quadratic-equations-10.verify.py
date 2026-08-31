# Independent verification of every numeric answer in the chapter, computed from
# the STEM alone (sympy), then compared against the book's printed ANSWERS key.
# Written as a file (never a shell heredoc) so no backslash is eaten.
import sympy as sp

x, y, m, p, q, k, t, a, b = sp.symbols('x y m p q k t a b')
fails = []


def chk(ref, got, want, note=""):
    """got/want are comparable python/sympy objects; report inequality."""
    ok = sp.simplify(sp.sympify(got) - sp.sympify(want)) == 0 if not isinstance(got, (list, tuple, set)) \
        else set(sp.nsimplify(v) for v in got) == set(sp.nsimplify(v) for v in want)
    print(("OK   " if ok else "FAIL ") + ref + ("  " + note if note else ""))
    if not ok:
        fails.append((ref, got, want))


def roots(expr, var=x):
    return sorted(sp.solve(sp.Eq(expr, 0), var), key=lambda r: sp.re(sp.N(r)))


def disc(expr, var=x):
    P = sp.Poly(sp.expand(expr), var)
    A, B, C = P.all_coeffs()
    return sp.simplify(B**2 - 4*A*C)


print("== Practice set 2.1 ==")
# Q3 general forms
for ref, lhs, rhs, var, want in [
    ("Ex 2.1 Q.3 (1)", 2*y, 10 - y**2, y, (1, 2, -10)),
    ("Ex 2.1 Q.3 (2)", (x - 1)**2, 2*x + 3, x, (1, -4, -2)),
    ("Ex 2.1 Q.3 (3)", x**2 + 5*x, -(3 - x), x, (1, 4, 3)),
    ("Ex 2.1 Q.3 (4)", 3*m**2, 2*m**2 - 9, m, (1, 0, 9)),
    ("Ex 2.1 Q.3 (5)", p*(3 + 6*p), -5, p, (6, 3, 5)),
    ("Ex 2.1 Q.3 (6)", x**2 - 9, 13, x, (1, 0, -22)),
]:
    P = sp.Poly(sp.expand(lhs - rhs), var)
    co = P.all_coeffs()
    while len(co) < 3:
        co = [0] + co
    if co[0] < 0:
        co = [-c for c in co]
    chk(ref, list(co), list(want), "a,b,c = %s" % (co,))

chk("Ex 2.1 Q.4 (1) x=1", (x**2 + 4*x - 5).subs(x, 1), 0)
print("     Q.4(1) x=-1 gives", (x**2 + 4*x - 5).subs(x, -1), "(non-zero => not a root)")
print("     Q.4(2) m=2 gives", (2*m**2 - 5*m).subs(m, 2), "; m=5/2 gives", (2*m**2 - 5*m).subs(m, sp.Rational(5, 2)))
chk("Ex 2.1 Q.5", sp.solve(sp.Eq(k*9 - 30 + 3, 0), k)[0], 3)
chk("Ex 2.1 Q.6", sp.solve(sp.Eq(5*sp.Rational(-7, 5)**2 + 2*sp.Rational(-7, 5) + k, 0), k)[0], -7)

print("== Practice set 2.2 (factorisation) ==")
ps22 = [
    ("(1)", x**2 - 15*x + 54, [9, 6]),
    ("(2)", x**2 + x - 20, [-5, 4]),
    ("(3)", 2*y**2 + 27*y + 13, [-13, sp.Rational(-1, 2)]),
    ("(4)", 5*m**2 - 22*m - 15, [5, sp.Rational(-3, 5)]),
    ("(5)", 2*x**2 - 2*x + sp.Rational(1, 2), [sp.Rational(1, 2)]),
    ("(6)", 6*x**2 - x - 2, [sp.Rational(2, 3), sp.Rational(-1, 2)]),
    ("(7)", sp.sqrt(2)*x**2 + 7*x + 5*sp.sqrt(2), [-5/sp.sqrt(2), -sp.sqrt(2)]),
    ("(8)", 3*x**2 - 2*sp.sqrt(6)*x + 2, [sp.sqrt(2)/sp.sqrt(3)]),
    ("(9)", 2*m**2 - 48*m - 50, [25, -1]),
    ("(10)", 25*m**2 - 9, [sp.Rational(-3, 5), sp.Rational(3, 5)]),
    ("(11)", 7*m**2 - 21*m, [0, 3]),
    ("(12)", m**2 - 11, [-sp.sqrt(11), sp.sqrt(11)]),
]
for lab, expr, want in ps22:
    var = list(expr.free_symbols)[0]
    got = roots(expr, var)
    chk("Ex 2.2 Q.1 " + lab, got, want, str(got))

print("== Practice set 2.3 (completing the square) ==")
ps23 = [
    ("(1)", x**2 + x - 20, [4, -5]),
    ("(2)", x**2 + 2*x - 5, [sp.sqrt(6) - 1, -sp.sqrt(6) - 1]),
    ("(3)", m**2 - 5*m + 3, [(sp.sqrt(13) + 5)/2, (-sp.sqrt(13) + 5)/2]),
    ("(4)", 9*y**2 - 12*y + 2, [(sp.sqrt(2) + 2)/3, (-sp.sqrt(2) + 2)/3]),
    ("(5)", 2*y**2 + 9*y + 10, [-2, sp.Rational(-5, 2)]),
    ("(6)", 5*x**2 - 4*x - 7, [(2 + sp.sqrt(39))/5, (2 - sp.sqrt(39))/5]),
]
for lab, expr, want in ps23:
    var = list(expr.free_symbols)[0]
    chk("Ex 2.3 " + lab, roots(expr, var), want, str(roots(expr, var)))

print("== Practice set 2.4 ==")
for ref, lhs, rhs, var, want in [
    ("Ex 2.4 Q.1 (1)", x**2 - 7*x + 5, 0, x, (1, -7, 5)),
    ("Ex 2.4 Q.1 (2)", 2*m**2, 5*m - 5, m, (2, -5, 5)),
    ("Ex 2.4 Q.1 (3)", y**2, 7*y, y, (1, -7, 0)),
]:
    P = sp.Poly(sp.expand(lhs - rhs), var)
    co = P.all_coeffs()
    while len(co) < 3:
        co = co + [0]
    chk(ref, list(co), list(want), str(co))

ps24 = [
    ("(1)", x**2 + 6*x + 5, [-1, -5]),
    ("(2)", x**2 - 3*x - 2, [(3 + sp.sqrt(17))/2, (3 - sp.sqrt(17))/2]),
    ("(3)", 3*m**2 + 2*m - 7, [(-1 + sp.sqrt(22))/3, (-1 - sp.sqrt(22))/3]),
    ("(4)", 5*m**2 - 4*m - 2, [(2 + sp.sqrt(14))/5, (2 - sp.sqrt(14))/5]),
    ("(5)", 3*y**2 + y - 6, [(-1 + sp.sqrt(73))/6, (-1 - sp.sqrt(73))/6]),
    ("(6)", 5*x**2 + 13*x + 8, [-1, sp.Rational(-8, 5)]),
]
for lab, expr, want in ps24:
    var = list(expr.free_symbols)[0]
    chk("Ex 2.4 Q.2 " + lab, roots(expr, var), want, str(roots(expr, var)))
chk("Ex 2.4 Q.3", roots(x**2 + 2*sp.sqrt(3)*x + 3), [-sp.sqrt(3)])

print("== Practice set 2.5 ==")
chk("Ex 2.5 Q.1 (2)", [sp.Rational(-7), sp.Rational(5)], [sum(roots(x**2 + 7*x + 5)), sp.expand(roots(x**2 + 7*x + 5)[0]*roots(x**2 + 7*x + 5)[1])])
r = roots(2*x**2 - 4*x - 3)
chk("Ex 2.5 Q.1 (3) sum", sp.simplify(r[0] + r[1]), 2)
chk("Ex 2.5 Q.1 (3) prod", sp.simplify(r[0]*r[1]), sp.Rational(-3, 2))
chk("Ex 2.5 Q.2 (1)", disc(x**2 + 7*x - 1), 53)
chk("Ex 2.5 Q.2 (2)", disc(2*y**2 - 5*y + 10, y), -55)
chk("Ex 2.5 Q.2 (3)", disc(sp.sqrt(2)*x**2 + 4*x + 2*sp.sqrt(2)), 0)
chk("Ex 2.5 Q.3 (1)", disc(x**2 - 4*x + 4), 0)
chk("Ex 2.5 Q.3 (2)", disc(2*y**2 - 7*y + 2, y), 33)
chk("Ex 2.5 Q.3 (3)", disc(m**2 + 2*m + 9, m), -32)
for lab, rr, want in [
    ("(1)", (0, 4), x**2 - 4*x),
    ("(2)", (3, -10), x**2 + 7*x - 30),
    ("(3)", (sp.Rational(1, 2), sp.Rational(-1, 2)), x**2 - sp.Rational(1, 4)),
    ("(4)", (2 - sp.sqrt(5), 2 + sp.sqrt(5)), x**2 - 4*x - 1),
]:
    built = sp.expand(x**2 - (rr[0] + rr[1])*x + rr[0]*rr[1])
    chk("Ex 2.5 Q.4 " + lab, built, sp.expand(want), str(built))
chk("Ex 2.5 Q.5", sp.solve(sp.Eq(4*k, 2*(k + 3)), k)[0], 3)
al, be = sp.symbols('al be')
S, P_ = 2, -7
chk("Ex 2.5 Q.6 (1)", S**2 - 2*P_, 18)
chk("Ex 2.5 Q.6 (2)", S**3 - 3*P_*S, 50)
chk("Ex 2.5 Q.7 (1)", sorted(sp.solve(sp.Eq(k**2 - 4*3*12, 0), k)), [-12, 12])
chk("Ex 2.5 Q.7 (2)", sorted(sp.solve(sp.Eq((2*k)**2 - 4*k*6, 0), k)), [0, 6], "(k=0 rejected: not quadratic)")

print("== Practice set 2.6 (word problems) ==")
n = sp.symbols('n', positive=True)
chk("Ex 2.6 Q.1", [r for r in sp.solve(sp.Eq((x - 2)*(x + 3), 84), x) if r > 0], [9])
chk("Ex 2.6 Q.2", [r for r in sp.solve(sp.Eq(x**2 + (x + 2)**2, 244), x) if r > 0], [10])
chk("Ex 2.6 Q.3", [r for r in sp.solve(sp.Eq(x*(x + 5), 150), x) if r > 0], [10], "col=10, row=15")
chk("Ex 2.6 Q.4", [r for r in sp.solve(sp.Eq(1/x + 1/(x + 5), sp.Rational(1, 6)), x) if r > 0], [10], "Kishor 10, Vivek 15")
chk("Ex 2.6 Q.5", [r for r in sp.solve(sp.Eq(5*(x + 10), x**2), x) if r > 0], [10])
chk("Ex 2.6 Q.6", [r for r in sp.solve(sp.Eq(x*(10*x + 40), 600), x) if r > 0], [6], "cost each = 100")
chk("Ex 2.6 Q.7", [r for r in sp.solve(sp.Eq(36/(12 + x) + 36/(12 - x), 8), x) if r > 0], [6])
chk("Ex 2.6 Q.8", [r for r in sp.solve(sp.Eq(1/x + 1/(x + 6), sp.Rational(1, 4)), x) if r > 0], [6], "Nishu 6, Pintu 12")
chk("Ex 2.6 Q.9", [r for r in sp.solve(sp.Eq(x*(5*x + 6) + 1, 460), x) if r > 0], [9], "quotient 51")
chk("Ex 2.6 Q.10", [r for r in sp.solve(sp.Eq(sp.Rational(1, 2)*(x + 2*x + 1)*(x - 4), 33), x) if r > 0], [7],
    "AB=7 CD=15 AM=3 BC=5")
# and the trapezium closes: AD from the offsets must equal BC
print("     Q.10 check AD:", sp.sqrt(((15 - 7)/2)**2 + 3**2), "vs BC =", 7 - 2)

print("== Problem set 2 ==")
chk("PS2 Q.1 (3)", sorted(sp.solve(sp.Eq(k**2 - 4*k, 0), k)), [0, 4])
chk("PS2 Q.1 (4)", disc(sp.sqrt(2)*x**2 - 5*x + sp.sqrt(2)), 17)
chk("PS2 Q.1 (5)", sp.expand(x**2 - 8*x + 15), sp.expand((x - 3)*(x - 5)))
chk("PS2 Q.1 (6)", -sp.Rational(15, 3), -5)
chk("PS2 Q.1 (7)", disc(sp.sqrt(5)*m**2 - sp.sqrt(5)*m + sp.sqrt(5), m), -15)
chk("PS2 Q.1 (8)", sp.solve(sp.Eq(4 + 2*m - 5, 0), m)[0], sp.Rational(1, 2))
chk("PS2 Q.3 (1)", disc(2*y**2 - y + 2, y), -15)
chk("PS2 Q.3 (2)", disc(5*m**2 - m, m), 1)
chk("PS2 Q.3 (3)", disc(sp.sqrt(5)*x**2 - x - sp.sqrt(5)), 21)
chk("PS2 Q.4", sp.solve(sp.Eq(2*4 - 2*k - 2, 0), k)[0], 3)
for lab, rr, want in [
    ("(1)", (10, -10), x**2 - 100),
    ("(2)", (1 - 3*sp.sqrt(5), 1 + 3*sp.sqrt(5)), x**2 - 2*x - 44),
    ("(3)", (0, 7), x**2 - 7*x),
]:
    built = sp.expand(x**2 - (rr[0] + rr[1])*x + rr[0]*rr[1])
    chk("PS2 Q.5 " + lab, built, sp.expand(want), str(built))
chk("PS2 Q.6 (1)", disc(3*x**2 - 5*x + 7), -59)
chk("PS2 Q.6 (2)", disc(sp.sqrt(3)*x**2 + sp.sqrt(2)*x - 2*sp.sqrt(3)), 26)
chk("PS2 Q.6 (3)", disc(m**2 - 2*m + 1, m), 0)
ps27 = [
    ("(1)", x**2 - x - 5, [(1 + sp.sqrt(21))/2, (1 - sp.sqrt(21))/2]),
    ("(2)", 10*x**2 - 3*x - 1, [sp.Rational(1, 2), sp.Rational(-1, 5)]),
    ("(3)", (2*x + 3)**2 - 25, [1, -4]),
    ("(4)", m**2 + 5*m + 5, [(-5 + sp.sqrt(5))/2, (-5 - sp.sqrt(5))/2]),
    ("(6)", x**2 - 4*x - 3, [2 + sp.sqrt(7), 2 - sp.sqrt(7)]),
]
for lab, expr, want in ps27:
    var = list(expr.free_symbols)[0]
    chk("PS2 Q.7 " + lab, roots(expr, var), want, str(roots(expr, var)))
chk("PS2 Q.7 (5) disc", disc(5*m**2 + 2*m + 1, m), -16, "not real")
chk("PS2 Q.8", sorted(sp.solve(sp.Eq(4*(m - 12)**2 - 8*(m - 12), 0), m)), [12, 14], "(m=12 rejected)")
chk("PS2 Q.9", sp.solve(sp.Eq(125 - 15*k, 35), k)[0], 6, "=> x^2-5x+6=0")
# Q10 : roots of 2x^2 + 2(p+q)x + p^2+q^2 = 0
S10 = -(p + q)
P10 = (p**2 + q**2)/2
newsum = sp.expand(S10**2 + (S10**2 - 4*P10))
newprod = sp.expand(S10**2 * (S10**2 - 4*P10))
chk("PS2 Q.10 sum", newsum, sp.expand(4*p*q), str(sp.factor(newsum)))
chk("PS2 Q.10 prod", newprod, sp.expand(-(p**2 - q**2)**2), str(sp.factor(newprod)))
chk("PS2 Q.11", [r for r in sp.solve(sp.Eq(x*(x + 50), 15000), x) if r > 0], [100], "Mukund 150")
gsol = sp.solve([sp.Eq(a**2 - b**2, 120), sp.Eq(b**2, 2*a)], [a, b])
print("     Q.12 solutions:", gsol)
chk("PS2 Q.13", [r for r in sp.solve(sp.Eq(540/x - 540/(x + 30), 3), x) if r > 0], [60])
bb = sp.symbols('bb', positive=True)
chk("PS2 Q.14", sp.solve(sp.Eq(bb*(2*bb + 10), 20*(bb/3)**2), bb), [45], "length 100, pond side 15")
chk("PS2 Q.15", [r for r in sp.solve(sp.Eq(1/t + 1/(t + 3), sp.Rational(1, 2)), t) if r > 0], [3], "smaller 6")

print()
print("FAILURES:", len(fails))
for f in fails:
    print("  ", f)
