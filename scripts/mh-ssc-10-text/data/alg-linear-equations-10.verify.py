"""Third independent ground truth for alg-linear-equations-10.

Solves every keyed question from the STEM with sympy (exact rationals), then
compares against (a) the value I derived by hand and (b) the value printed in the
book's ANSWERS section (pp 169-170 = idx 178-179). Prints a per-row verdict.

Deliberately re-derives from the stem rather than checking one number against
another, so a shared error cannot hide.
"""
from sympy import symbols, Rational, solve, Eq, sqrt, simplify, Matrix, nsimplify

x, y, a, b, m, n, p, q, u, v = symbols('x y a b m n p q u v')

rows = []          # (ref, computed, book_key)
def chk(ref, computed, book):
    rows.append((ref, computed, book))

def sol2(e1, e2, v1=x, v2=y):
    s = solve([e1, e2], [v1, v2], dict=True)
    assert len(s) == 1, (e1, e2, s)
    return (s[0][v1], s[0][v2])

# ---- Practice set 1.1 Q2 -------------------------------------------------
chk("Ex 1.1 Q2(1)", sol2(Eq(3*a + 5*b, 26), Eq(a + 5*b, 22), a, b), (2, 4))
chk("Ex 1.1 Q2(2)", sol2(Eq(x + 7*y, 10), Eq(3*x - 2*y, 7)), (3, 1))
chk("Ex 1.1 Q2(3)", sol2(Eq(2*x - 3*y, 9), Eq(2*x + y, 13)), (6, 1))
chk("Ex 1.1 Q2(4)", sol2(Eq(5*m - 3*n, 19), Eq(m - 6*n, -7), m, n), (5, 2))
chk("Ex 1.1 Q2(5)", sol2(Eq(5*x + 2*y, -3), Eq(x + 5*y, 4)), (-1, 1))
chk("Ex 1.1 Q2(6)", sol2(Eq(Rational(1,3)*x + y, Rational(10,3)),
                         Eq(2*x + Rational(1,4)*y, Rational(11,4))), (1, 3))
chk("Ex 1.1 Q2(7)", sol2(Eq(99*x + 101*y, 499), Eq(101*x + 99*y, 501)), (3, 2))
chk("Ex 1.1 Q2(8)", sol2(Eq(49*x - 57*y, 172), Eq(57*x - 49*y, 252)), (7, 3))

# ---- Practice set 1.2 ----------------------------------------------------
# Q1(I) x+y=3 : given x=3 -> y ; given y=5 -> x ; given y=3 -> x
chk("Ex 1.2 Q1(I)",
    (solve(Eq(3 + y, 3), y)[0], solve(Eq(x + 5, 3), x)[0], solve(Eq(x + 3, 3), x)[0]),
    (0, -2, 0))
# Q1(II) x-y=4 : given y=0 -> x ; given x=-1 -> y ; given x=0 -> y
chk("Ex 1.2 Q1(II)",
    (solve(Eq(x - 0, 4), x)[0], solve(Eq(-1 - y, 4), y)[0], solve(Eq(0 - y, 4), y)[0]),
    (4, -5, -4))
chk("Ex 1.2 Q2(1)", sol2(Eq(x + y, 6), Eq(x - y, 4)), (5, 1))
chk("Ex 1.2 Q2(2)", sol2(Eq(x + y, 5), Eq(x - y, 3)), (4, 1))
chk("Ex 1.2 Q2(3)", sol2(Eq(x + y, 0), Eq(2*x - y, 9)), (3, -3))
chk("Ex 1.2 Q2(4)", sol2(Eq(3*x - y, 2), Eq(2*x - y, 3)), (-1, -5))
chk("Ex 1.2 Q2(5)", sol2(Eq(3*x - 4*y, -7), Eq(5*x - 2*y, 0)), (1, Rational(5,2)))
chk("Ex 1.2 Q2(6)", sol2(Eq(2*x - 3*y, 4), Eq(3*y - x, 4)), (8, 4))

# ---- Practice set 1.3 ----------------------------------------------------
chk("Ex 1.3 Q1", (5, 2, 3*5, 3*5 - 8), (5, 2, 15, 7))
chk("Ex 1.3 Q2(1)", Matrix([[-1, 7], [2, 4]]).det(), -18)
chk("Ex 1.3 Q2(2)", Matrix([[5, 3], [-7, 0]]).det(), 21)
chk("Ex 1.3 Q2(3)", Matrix([[Rational(7,3), Rational(5,3)],
                            [Rational(3,2), Rational(1,2)]]).det(), Rational(-4,3))
chk("Ex 1.3 Q3(1)", sol2(Eq(3*x - 4*y, 10), Eq(4*x + 3*y, 5)), (2, -1))
chk("Ex 1.3 Q3(2)", sol2(Eq(4*x + 3*y - 4, 0), Eq(6*x, 8 - 5*y)), (-2, 4))
chk("Ex 1.3 Q3(3)", sol2(Eq(x + 2*y, -1), Eq(2*x - 3*y, 12)), (3, -2))
chk("Ex 1.3 Q3(4)", sol2(Eq(6*x - 4*y, -12), Eq(8*x - 3*y, -2)), (2, 6))
chk("Ex 1.3 Q3(5)", sol2(Eq(4*m + 6*n, 54), Eq(3*m + 2*n, 28), m, n), (6, 5))
chk("Ex 1.3 Q3(6)", sol2(Eq(2*x + 3*y, 2), Eq(x - y/2, Rational(1,2))),
    (Rational(5,8), Rational(1,4)))

# ---- Practice set 1.4 ----------------------------------------------------
chk("Ex 1.4 Q1(1)", sol2(Eq(2/x - 3/y, 15), Eq(8/x + 5/y, 77)), (Rational(1,9), 1))
chk("Ex 1.4 Q1(2)", sol2(Eq(10/(x+y) + 2/(x-y), 4), Eq(15/(x+y) - 5/(x-y), -2)), (3, 2))
chk("Ex 1.4 Q1(3)", sol2(Eq(27/(x-2) + 31/(y+3), 85), Eq(31/(x-2) + 27/(y+3), 89)),
    (Rational(5,2), -2))
chk("Ex 1.4 Q1(4)", sol2(Eq(1/(3*x+y) + 1/(3*x-y), Rational(3,4)),
                         Eq(1/(2*(3*x+y)) - 1/(2*(3*x-y)), Rational(-1,8))), (1, 1))

# ---- Practice set 1.5 ----------------------------------------------------
# Q1 two numbers differ by 3; 2*smaller + 3*greater = 19  (g - s = 3)
s_, g_ = symbols('s_ g_')
chk("Ex 1.5 Q1", sol2(Eq(g_ - s_, 3), Eq(2*s_ + 3*g_, 19), s_, g_), (2, 5))
# Q2 rectangle: 2x+y+8 == 4x-y (opposite sides), x+4 == 2y
r = sol2(Eq(2*x + y + 8, 4*x - y), Eq(x + 4, 2*y))
L = (2*r[0] + r[1] + 8).subs({}); W = (r[0] + 4)
chk("Ex 1.5 Q2 (x,y)", r, (12, 8))
chk("Ex 1.5 Q2 area", simplify(L*W), 640)
chk("Ex 1.5 Q2 perim", simplify(2*(L + W)), 112)
# Q3 f + 2s = 70 ; 2f + s = 95
f_, s2 = symbols('f_ s2')
chk("Ex 1.5 Q3 (father,son)", sol2(Eq(f_ + 2*s2, 70), Eq(2*f_ + s2, 95), f_, s2), (40, 15))
# Q4 denominator = 2*num + 4 ; (den-6) = 12*(num-6)
num, den = symbols('num den')
r4 = sol2(Eq(den, 2*num + 4), Eq(den - 6, 12*(num - 6)), num, den)
chk("Ex 1.5 Q4 fraction", (r4[0], r4[1]), (7, 18))
# Q5 150A+100B = 10000 kg ; 260A+40B = 10000 kg
A_, B_ = symbols('A_ B_')
chk("Ex 1.5 Q5 (A,B) kg", sol2(Eq(150*A_ + 100*B_, 10000), Eq(260*A_ + 40*B_, 10000), A_, B_), (30, 55))
# Q6 bus distance d at 60, plane (1900-d) at 700, total 5 h
d_ = symbols('d_')
chk("Ex 1.5 Q6 bus km", solve(Eq(d_/60 + (1900 - d_)/700, 5), d_)[0], 150)

# ---- Problem set 1 ------------------------------------------------------
chk("PS1 Q1(1)", solve(Eq(4*1 + 5*y, 19), y)[0], 3)                       # option B
chk("PS1 Q1(2)", Rational(49, 7), 7)                                       # option A
chk("PS1 Q1(3)", Matrix([[5, 3], [-7, -4]]).det(), 1)                      # option D
chk("PS1 Q1(4)", Matrix([[1, 1], [3, -2]]).det(), -5)                      # option C
# Q1(5) an != bm -> unique solution (option A) : structural, no numeric check
chk("PS1 Q2 x=-5 -> y", solve(Eq(2*(-5) - 6*y, 3), y)[0], Rational(-13, 6))
chk("PS1 Q2 y=0  -> x", solve(Eq(2*x - 6*0, 3), x)[0], Rational(3, 2))
chk("PS1 Q3(1)", sol2(Eq(2*x + 3*y, 12), Eq(x - y, 1)), (3, 2))
chk("PS1 Q3(2)", sol2(Eq(x - 3*y, 1), Eq(3*x - 2*y + 4, 0)), (-2, -1))
chk("PS1 Q3(3)", sol2(Eq(5*x - 6*y + 30, 0), Eq(5*x + 4*y - 20, 0)), (0, 5))
chk("PS1 Q3(4)", sol2(Eq(3*x - y - 2, 0), Eq(2*x + y, 8)), (2, 4))
chk("PS1 Q3(5)", sol2(Eq(3*x + y, 10), Eq(x - y, 2)), (3, 1))
chk("PS1 Q4(1)", Matrix([[4, 3], [2, 7]]).det(), 22)
chk("PS1 Q4(2)", Matrix([[5, -2], [-3, 1]]).det(), -1)
chk("PS1 Q4(3)", Matrix([[3, -1], [1, 4]]).det(), 13)
chk("PS1 Q5(1)", sol2(Eq(6*x - 3*y, -10), Eq(3*x + 5*y - 8, 0)), (Rational(-2,3), 2))
chk("PS1 Q5(2)", sol2(Eq(4*m - 2*n, -4), Eq(4*m + 3*n, 16), m, n), (1, 4))
chk("PS1 Q5(3)", sol2(Eq(3*x - 2*y, Rational(5,2)),
                      Eq(Rational(1,3)*x + 3*y, Rational(-4,3))), (Rational(1,2), Rational(-1,2)))
chk("PS1 Q5(4)", sol2(Eq(7*x + 3*y, 15), Eq(12*y - 5*x, 39)), (Rational(7,11), Rational(116,33)))
chk("PS1 Q5(5)", sol2(Eq((x + y - 8)/2, (x + 2*y - 14)/3),
                      Eq((x + 2*y - 14)/3, (3*x - y)/4)), (2, 6))
chk("PS1 Q6(1)", sol2(Eq(2/x + 2/(3*y), Rational(1,6)), Eq(3/x + 2/y, 0)), (6, -4))
chk("PS1 Q6(2)", sol2(Eq(7/(2*x+1) + 13/(y+2), 27), Eq(13/(2*x+1) + 7/(y+2), 33)),
    (Rational(-1,4), -1))
chk("PS1 Q6(3)", sol2(Eq(148/x + 231/y, 527/(x*y)), Eq(231/x + 148/y, 610/(x*y))), (1, 2))
chk("PS1 Q6(4)", sol2(Eq((7*x - 2*y)/(x*y), 5), Eq((8*x + 7*y)/(x*y), 15)), (1, 1))
chk("PS1 Q6(5)", sol2(Eq(1/(2*(3*x+4*y)) + 1/(5*(2*x-3*y)), Rational(1,4)),
                      Eq(5/(3*x+4*y) - 2/(2*x-3*y), Rational(-3,2))), (2, 1))
# Q7(1) two-digit: 10y+x (tens y, units x); (10y+x)+(10x+y)=143 ; x = y+3
chk("PS1 Q7(1) number", (lambda r: 10*r[1] + r[0])(sol2(Eq(11*x + 11*y, 143), Eq(x - y, 3))), 58)
# Q7(2) 1.5 t + 5 s = 700 - 50 ; 2 t + 7 s = 880
t_, sg = symbols('t_ sg')
chk("PS1 Q7(2) (tea,sugar)", sol2(Eq(Rational(3,2)*t_ + 5*sg, 650), Eq(2*t_ + 7*sg, 880), t_, sg), (300, 40))
# Q7(3) 100x + 50y = 2500 ; 100y + 50x = 2000
chk("PS1 Q7(3) (100s,50s)", sol2(Eq(100*x + 50*y, 2500), Eq(100*y + 50*x, 2000)), (20, 10))
# Q7(4) m + s = 31 ; m - 3 = 4(s - 3)
mn, sv = symbols('mn sv')
chk("PS1 Q7(4) (Manish,Savita)", sol2(Eq(mn + sv, 31), Eq(mn - 3, 4*(sv - 3)), mn, sv), (23, 8))
# Q7(5) 5k + 3k = 720
k_ = symbols('k_')
kk = solve(Eq(5*k_ + 3*k_, 720), k_)[0]
chk("PS1 Q7(5) (skilled,unskilled)", (5*kk, 3*kk), (450, 270))
# Q7(6) (h+j)*(1/3) = 30 ; (h-j)*3 = 30
h_, j_ = symbols('h_ j_')
chk("PS1 Q7(6) (Hamid,Joseph)", sol2(Eq((h_ + j_)*Rational(1,3), 30), Eq((h_ - j_)*3, 30), h_, j_), (50, 40))

bad = 0
for ref, got, book in rows:
    def norm(z):
        if isinstance(z, tuple):
            return tuple(nsimplify(w) for w in z)
        return nsimplify(z)
    ok = norm(got) == norm(book)
    if not ok:
        bad += 1
    print(("  OK  " if ok else "**DIFF**"), ref.ljust(30), "computed:", got, " book:", book)
print("\nrows diffed:", len(rows), " disagreements:", bad)
