# Independent numeric verification of every answer authored for
# alg-arithmetic-progression-10, and of every entry of the book's printed key.
#
# Deliberately DIRECT: an nth term is read off a generated list and a sum is a
# built-in sum() over that list, never only tn = a+(n-1)d / Sn = n/2[...]. That is
# what catches an off-by-one in n, which is this topic's characteristic error.
# Exact arithmetic throughout (Fraction), never floats.
from fractions import Fraction as F

FAILS = []
CHECKS = [0]


def ck(label, got, want):
    CHECKS[0] += 1
    if got != want:
        FAILS.append(f"{label}: got {got!r}, want {want!r}")


def ap(a, d, n):
    """The first n terms, built by repeated addition — no closed form."""
    out, x = [], F(a)
    for _ in range(n):
        out.append(x)
        x += F(d)
    return out


def tn(a, d, n):
    """nth term, read off the generated list (1-based n)."""
    return ap(a, d, n)[-1]


def sn(a, d, n):
    return sum(ap(a, d, n))


def diffs(seq):
    s = [F(x) for x in seq]
    return [s[i + 1] - s[i] for i in range(len(s) - 1)]


def is_ap(seq):
    d = diffs(seq)
    return len(set(d)) == 1, (d[0] if len(set(d)) == 1 else None)


# ─────────────────────────── Practice Set 3.1 ───────────────────────────
# Q1 — is it an A.P.? printed key: (1) Yes d=2 (2) Yes d=1/2 (3) Yes d=4 (4) No
#      (5) Yes d=-4 (6) Yes d=0 (7) Yes d=sqrt2 (8) Yes d=5
ck("3.1 Q1(1)", is_ap([2, 4, 6, 8]), (True, F(2)))
# (2) AS PRINTED the fourth term is 7/3 -> NOT an A.P. (the book's key says d=1/2,
#     which needs 7/2). Both readings recorded so the disagreement is explicit.
ck("3.1 Q1(2) as printed", is_ap([F(2), F(5, 2), F(3), F(7, 3)])[0], False)
ck("3.1 Q1(2) diffs as printed",
   diffs([F(2), F(5, 2), F(3), F(7, 3)]), [F(1, 2), F(1, 2), F(-2, 3)])
ck("3.1 Q1(2) with 7/2", is_ap([F(2), F(5, 2), F(3), F(7, 2)]), (True, F(1, 2)))
ck("3.1 Q1(3)", is_ap([-10, -6, -2, 2]), (True, F(4)))
ck("3.1 Q1(4) printed .0333", is_ap([F(3, 10), F(33, 100), F(333, 10000)])[0], False)
ck("3.1 Q1(4) intended 0.333", is_ap([F(3, 10), F(33, 100), F(333, 1000)])[0], False)
ck("3.1 Q1(5)", is_ap([0, -4, -8, -12]), (True, F(-4)))
ck("3.1 Q1(6)", is_ap([F(-1, 5)] * 3), (True, F(0)))
# (7) 3, 3+r, 3+2r, 3+3r is an A.P. with d = r for ANY r, so exact symbolic r works.
ck("3.1 Q1(7)", is_ap([F(0), F(1), F(2), F(3)]), (True, F(1)))  # coefficients of sqrt2
ck("3.1 Q1(8)", is_ap([127, 132, 137]), (True, F(5)))

# Q2 — write the A.P.  key: (1) 10,15,20,25 (2) -3,-3,-3,-3 (3) -7,-6.5,-6,-5.5
#      (4) -1.25,1.75,4.75,7.75 (5) 6,3,0,-3 (6) -19,-23,-27,-31
ck("3.1 Q2(1)", ap(10, 5, 4), [F(10), F(15), F(20), F(25)])
ck("3.1 Q2(2)", ap(-3, 0, 4), [F(-3)] * 4)
ck("3.1 Q2(3)", ap(-7, F(1, 2), 4), [F(-7), F(-13, 2), F(-6), F(-11, 2)])
ck("3.1 Q2(4)", ap(F(-5, 4), 3, 4), [F(-5, 4), F(7, 4), F(19, 4), F(31, 4)])
ck("3.1 Q2(5)", ap(6, -3, 4), [F(6), F(3), F(0), F(-3)])
ck("3.1 Q2(6)", ap(-19, -4, 4), [F(-19), F(-23), F(-27), F(-31)])

# Q3 — first term and common difference. key: (1) a=5,d=-4 (2) a=0.6,d=0.3
#      (3) a=127,d=8 (4) a=1/4,d=1/2
ck("3.1 Q3(1)", is_ap([5, 1, -3, -7]), (True, F(-4)))
ck("3.1 Q3(2)", is_ap([F(6, 10), F(9, 10), F(12, 10), F(15, 10)]), (True, F(3, 10)))
ck("3.1 Q3(3)", is_ap([127, 135, 143, 151]), (True, F(8)))
ck("3.1 Q3(4)", is_ap([F(1, 4), F(3, 4), F(5, 4), F(7, 4)]), (True, F(1, 2)))

# ─────────────────────────── Practice Set 3.2 ───────────────────────────
# Q1 fill-in. key: (1) d=7 (2) d=3 (3) a=-3,d=-5 (4) a=70,d=-10
ck("3.2 Q1(i)", is_ap([1, 8, 15, 22]), (True, F(7)))
ck("3.2 Q1(ii)", is_ap([3, 6, 9, 12]), (True, F(3)))
ck("3.2 Q1(iii)", is_ap([-3, -8, -13, -18]), (True, F(-5)))
ck("3.2 Q1(iv)", is_ap([70, 60, 50, 40]), (True, F(-10)))

ck("3.2 Q2 is-ap", is_ap([-12, -5, 2, 9, 16, 23, 30]), (True, F(7)))
ck("3.2 Q2 t20", tn(-12, 7, 20), F(121))                       # key 121
ck("3.2 Q3 t24", tn(12, 4, 24), F(104))                        # key 104
ck("3.2 Q4 t19", tn(7, 6, 19), F(115))                         # key 115
ck("3.2 Q5 t27", tn(9, -5, 27), F(-121))                       # key -121
# Q6 three-digit naturals divisible by 5 — counted, not formula'd.
ck("3.2 Q6 count", len([x for x in range(100, 1000) if x % 5 == 0]), 180)   # key 180
ck("3.2 Q6 first/last", (100, 995),
   (min(x for x in range(100, 1000) if x % 5 == 0), max(x for x in range(100, 1000) if x % 5 == 0)))
# Q7 t11=16, t21=29 -> d = 13/10, a = 3; find t41.  key 55
_d = F(29 - 16, 21 - 11)
_a = F(16) - 10 * _d
ck("3.2 Q7 d", _d, F(13, 10))
ck("3.2 Q7 a", _a, F(3))
ck("3.2 Q7 t11", tn(_a, _d, 11), F(16))
ck("3.2 Q7 t21", tn(_a, _d, 21), F(29))
ck("3.2 Q7 t41", tn(_a, _d, 41), F(55))
# Q8 which term of 11,8,5,2,... is -151?  key 55th
_seq = ap(11, -3, 60)
ck("3.2 Q8 n", _seq.index(F(-151)) + 1, 55)
ck("3.2 Q8 t55", tn(11, -3, 55), F(-151))
ck("3.2 Q8 t54", tn(11, -3, 54), F(-148))   # neighbour check: off-by-one would show here
ck("3.2 Q8 t56", tn(11, -3, 56), F(-154))
# Q9 naturals 10..250 divisible by 4 — counted.  key 60
_div4 = [x for x in range(10, 251) if x % 4 == 0]
ck("3.2 Q9 count", len(_div4), 60)
ck("3.2 Q9 ends", (_div4[0], _div4[-1]), (12, 248))
# Q10 t17 = t10 + 7 -> 7d = 7 -> d = 1.  key 1
ck("3.2 Q10", F(7, 17 - 10), F(1))
ck("3.2 Q10 check", tn(0, 1, 17) - tn(0, 1, 10), F(7))

# ─────────────────────────── Practice Set 3.3 ───────────────────────────
ck("3.3 Q1 S27", sn(6, 3, 27), F(1215))                        # key 1215
ck("3.3 Q2", sum(range(2, 2 * 123 + 1, 2)), 15252)             # key 15252
# Q3 even numbers BETWEEN 1 and 350 -> 2..348 (350 excluded by "between").
ck("3.3 Q3", sum(x for x in range(2, 350) if x % 2 == 0), 30450)  # key 30450
ck("3.3 Q3 incl-350", sum(x for x in range(2, 351) if x % 2 == 0), 30800)  # the reading the key rejects
# Q4 t19=52, t38=128 -> d=4, a=-20; S56.  key printed under the label "5." = 5040
_d = F(128 - 52, 38 - 19)
_a = F(52) - 18 * _d
ck("3.3 Q4 d", _d, F(4))
ck("3.3 Q4 a", _a, F(-20))
ck("3.3 Q4 t19", tn(_a, _d, 19), F(52))
ck("3.3 Q4 t38", tn(_a, _d, 38), F(128))
ck("3.3 Q4 S56", sn(_a, _d, 56), F(5040))
# Q5 naturals between 1 and 140 divisible by 4 — counted and summed directly.
# "between 1 and 140" excludes both endpoints; the book's own activity writes
# the list as 4, 8, ........, 136, confirming 140 is out.
_d4 = [x for x in range(2, 140) if x % 4 == 0]
ck("3.3 Q5 n", len(_d4), 34)
ck("3.3 Q5 ends", (_d4[0], _d4[-1]), (4, 136))
ck("3.3 Q5 sum", sum(_d4), 2380)                               # key 2380
# Q6 S55 = 3300 -> t28.  key 60
ck("3.3 Q6 identity", sn(F(3300, 55) - 27, 1, 55), F(3300))    # one witness A.P.
ck("3.3 Q6 t28", tn(F(3300, 55) - 27, 1, 28), F(60))
ck("3.3 Q6 second witness", tn(F(3300, 55) - 27 * 7, 7, 28), F(60))
ck("3.3 Q6 second witness S", sn(F(3300, 55) - 27 * 7, 7, 55), F(3300))
# Q7 three consecutive terms sum 27, product 504.  key 4,9,14 or 14,9,4
_sols = []
for dd in range(-30, 31):
    a = 9
    trip = [a - dd, a, a + dd]
    if sum(trip) == 27 and trip[0] * trip[1] * trip[2] == 504:
        _sols.append(tuple(trip))
ck("3.3 Q7", sorted(_sols), sorted([(4, 9, 14), (14, 9, 4)]))
# Q8 four consecutive terms, sum 12, t3+t4 = 14.  key -3,1,5,9
_found = []
for num in range(-40, 41):
    for den in range(-40, 41):
        pass
for dd4 in [F(n, 1) for n in range(-20, 21)]:
    aa = (F(12) - 2 * dd4) / 4
    terms = [aa - dd4, aa, aa + dd4, aa + 2 * dd4]
    if sum(terms) == 12 and terms[2] + terms[3] == 14:
        _found.append(tuple(terms))
ck("3.3 Q8", _found, [(F(-3), F(1), F(5), F(9))])
ck("3.3 Q8 is-ap", is_ap([-3, 1, 5, 9])[0], True)
# Q9 t9 = 0 -> t29 = 2 * t19, over several witness A.P.s.
for _a0, _dd in [(8, -1), (-16, 2), (F(9, 2), F(-9, 16)), (0, 0)]:
    seq = ap(_a0, _dd, 30)
    if seq[8] == 0:
        ck(f"3.3 Q9 witness a={_a0} d={_dd}", seq[28], 2 * seq[18])
ck("3.3 Q9 t9 zero a=8 d=-1", tn(8, -1, 9), F(0))
ck("3.3 Q9 t9 zero a=-16 d=2", tn(-16, 2, 9), F(0))

# ─────────────────────────── Practice Set 3.4 ───────────────────────────
# Q1 Sanika: 2016 is a LEAP year -> 366 days.  key 70455
ck("3.4 Q1 leap", 2016 % 4 == 0 and 2016 % 100 != 0, True)
ck("3.4 Q1", sn(10, 1, 366), F(70455))
ck("3.4 Q1 not-365", sn(10, 1, 365) != F(70455), True)
ck("3.4 Q1 S365", sn(10, 1, 365), F(70080))
# Q2 total repaid 9360 in 12 instalments, d = -40.  key first 1000, last 560
_a = (F(9360) * 2 / 12 - 11 * F(-40)) / 2
ck("3.4 Q2 a", _a, F(1000))
ck("3.4 Q2 last", tn(_a, -40, 12), F(560))
ck("3.4 Q2 total", sn(_a, -40, 12), F(9360))
ck("3.4 Q2 interest", F(9360) - 8000, F(1360))
# Q3 5000, 7000, 9000, ... 12 years.  key 1,92,000
ck("3.4 Q3", sn(5000, 2000, 12), F(192000))
ck("3.4 Q3 direct", sum(5000 + 2000 * i for i in range(12)), 192000)
# Q4 auditorium.  key 48, 1242
ck("3.4 Q4 t15", tn(20, 2, 15), F(48))
ck("3.4 Q4 S27", sn(20, 2, 27), F(1242))
ck("3.4 Q4 direct", sum(20 + 2 * i for i in range(27)), 1242)
# Q5 Kargil.  key -20,-25,-30,-35,-40,-45  (Mon..Sat)
#   printed condition: (Mon + Sat) = (Tue + Sat) + 5  =>  Mon = Tue + 5  =>  d = -5
_dd = F(-5)
_aa = F(-30) - 2 * _dd            # Wed = t3 = a + 2d = -30
week = ap(_aa, _dd, 6)
ck("3.4 Q5 week", week, [F(-20), F(-25), F(-30), F(-35), F(-40), F(-45)])
ck("3.4 Q5 wed", week[2], F(-30))
ck("3.4 Q5 printed condition", week[0] + week[5], week[1] + week[5] + 5)
# and the rival "Tuesday and Wednesday" reading does NOT reproduce the key:
_d2 = F(5, 2)
_a2 = F(-30) - 2 * _d2
ck("3.4 Q5 rival reading differs", ap(_a2, _d2, 6) != week, True)
# Q6 trees.  key 325
ck("3.4 Q6", sum(range(1, 26)), 325)

# ─────────────────────────── Problem Set 3 ───────────────────────────
# Q1 MCQs — every key re-derived. printed key B C B D B C C A A B
ck("PS3 Q1(1)", is_ap([-10, -6, -2, 2]), (True, F(4)))                # B
ck("PS3 Q1(2)", ap(-2, -2, 4), [F(-2), F(-4), F(-6), F(-8)])          # C
ck("PS3 Q1(3)", sum(range(1, 31)), 465)                               # B
ck("PS3 Q1(4)", tn(28, -4, 7), F(4))                                  # D  (a=28)
ck("PS3 Q1(4) rivals", [tn(x, -4, 7) for x in (6, 7, 20)], [F(-18), F(-17), F(-4)])
ck("PS3 Q1(5)", tn(F(7, 2), 0, 101), F(7, 2))                         # B
ck("PS3 Q1(6)", tn(-3, 4 - (-3), 21), F(137))                         # C
ck("PS3 Q1(7)", tn(0, 5, 18) - tn(0, 5, 13), F(25))                   # C
ck("PS3 Q1(8)", sum(3 * i for i in range(1, 6)), 45)                  # A
ck("PS3 Q1(9)", sn(15, -5, 10), F(-75))                               # A
_n = [n for n in range(1, 200) if F(n, 2) * (1 + 20) == 399]
ck("PS3 Q1(10)", _n, [38])                                            # B
ck("PS3 Q1(10) direct", sn(1, F(19, 37), 38), F(399))
ck("PS3 Q1(10) last", tn(1, F(19, 37), 38), F(20))

# Q2 fourth term from the end of -11,-8,-5,...,49.  key 40
_full = []
x = -11
while x <= 49:
    _full.append(x)
    x += 3
ck("PS3 Q2 last", _full[-1], 49)
ck("PS3 Q2", _full[-4], 40)
ck("PS3 Q2 n", len(_full), 21)
# Q3 t10=46, t5+t7=52.  key 1, 6, 11, ...
_dd = F(46 - 26, 9 - 5)          # from a+9d=46 and a+5d=26
_aa = F(46) - 9 * _dd
ck("PS3 Q3 a,d", (_aa, _dd), (F(1), F(5)))
ck("PS3 Q3 t10", tn(_aa, _dd, 10), F(46))
ck("PS3 Q3 t5+t7", tn(_aa, _dd, 5) + tn(_aa, _dd, 7), F(52))
ck("PS3 Q3 first three", ap(_aa, _dd, 3), [F(1), F(6), F(11)])
# Q4 t4=-15, t9=-30 -> S10.  key -195
_dd = F(-30 + 15, 9 - 4)
_aa = F(-15) - 3 * _dd
ck("PS3 Q4 a,d", (_aa, _dd), (F(-6), F(-3)))
ck("PS3 Q4 t4", tn(_aa, _dd, 4), F(-15))
ck("PS3 Q4 t9", tn(_aa, _dd, 9), F(-30))
ck("PS3 Q4 S10", sn(_aa, _dd, 10), F(-195))
# Q5 9,7,5,... and 24,21,18,... equal nth term.  key 16, -21
_match = [n for n in range(1, 100) if tn(9, -2, n) == tn(24, -3, n)]
ck("PS3 Q5 n", _match, [16])
ck("PS3 Q5 value", tn(9, -2, 16), F(-21))
ck("PS3 Q5 value2", tn(24, -3, 16), F(-21))
# Q6 t3+t8=7, t7+t14=-3 -> t10.  key -1
_dd = F(-3 - 7, (7 + 14) - (3 + 8))
_aa = (F(7) - 9 * _dd) / 2
ck("PS3 Q6 a,d", (_aa, _dd), (F(8), F(-1)))
ck("PS3 Q6 c1", tn(_aa, _dd, 3) + tn(_aa, _dd, 8), F(7))
ck("PS3 Q6 c2", tn(_aa, _dd, 7) + tn(_aa, _dd, 14), F(-3))
ck("PS3 Q6 t10", tn(_aa, _dd, 10), F(-1))
# Q7 a=-5, last=45, S=120.  key 6, 10
_hits = [(n, F(45 + 5, n - 1)) for n in range(2, 60) if sn(-5, F(45 + 5, n - 1), n) == 120]
ck("PS3 Q7", _hits, [(6, F(10))])
ck("PS3 Q7 last term", tn(-5, 10, 6), F(45))
ck("PS3 Q7 sum", sn(-5, 10, 6), F(120))
# Q8 sum 1..n = 36.  key 8
ck("PS3 Q8", [n for n in range(1, 100) if sum(range(1, n + 1)) == 36], [8])
# Q9 divide 207 into three A.P. parts, product of two smaller = 4623.  key 67,69,71
_p = [(69 - dd, 69, 69 + dd) for dd in range(0, 70)
      if (69 - dd) + 69 + (69 + dd) == 207 and (69 - dd) * 69 == 4623]
ck("PS3 Q9", _p, [(67, 69, 71)])
ck("PS3 Q9 product", 67 * 69, 4623)
# Q10 37 terms; middle three sum 225, last three sum 429.  key 3,7,11,...,147
_dd = F(429 - 225, (35 + 36 + 37) - (18 + 19 + 20))
_aa = F(225, 3) - 18 * _dd
ck("PS3 Q10 a,d", (_aa, _dd), (F(3), F(4)))
_s37 = ap(_aa, _dd, 37)
ck("PS3 Q10 middle3", sum(_s37[17:20]), F(225))
ck("PS3 Q10 last3", sum(_s37[-3:]), F(429))
ck("PS3 Q10 first3", _s37[:3], [F(3), F(7), F(11)])
ck("PS3 Q10 t37", _s37[-1], F(147))
# Q11 identity: with a, b = a+d, c = a+(n-1)d, S = (a+c)(b+c-2a) / (2(b-a)).
for _a0, _dd0, _n0 in [(3, 4, 10), (F(-5, 2), F(7, 3), 7), (100, -6, 15), (2, 1, 2)]:
    b = _a0 + _dd0
    c = tn(_a0, _dd0, _n0)
    lhs = sn(_a0, _dd0, _n0)
    rhs = F(( _a0 + c) * (b + c - 2 * _a0), 1) / (2 * (b - _a0))
    ck(f"PS3 Q11 a={_a0} d={_dd0} n={_n0}", lhs, rhs)
# Q12 Sp = Sq (p != q) -> S(p+q) = 0
for _p0, _q0 in [(3, 5), (2, 7), (4, 9)]:
    # choose d = 1, then solve a from Sp = Sq
    _dd0 = F(1)
    _aa0 = -(_dd0 * (_p0 + _q0 - 1)) / 2
    ck(f"PS3 Q12 Sp=Sq p={_p0} q={_q0}", sn(_aa0, _dd0, _p0), sn(_aa0, _dd0, _q0))
    ck(f"PS3 Q12 S(p+q)=0 p={_p0} q={_q0}", sn(_aa0, _dd0, _p0 + _q0), F(0))
# Q13 m*tm = n*tn (m != n) -> t(m+n) = 0
for _m0, _n0 in [(3, 5), (2, 9), (4, 7)]:
    _dd0 = F(1)
    _aa0 = -(_dd0 * (_m0 + _n0 - 1))
    ck(f"PS3 Q13 m*tm=n*tn m={_m0} n={_n0}",
       _m0 * tn(_aa0, _dd0, _m0), _n0 * tn(_aa0, _dd0, _n0))
    ck(f"PS3 Q13 t(m+n)=0 m={_m0} n={_n0}", tn(_aa0, _dd0, _m0 + _n0), F(0))
# Q14 simple interest 1000 at 10% -> 100, 200, 300, ...; t20.  key 2000
_si = [F(1000 * 10 * y, 100) for y in range(1, 21)]
ck("PS3 Q14 is-ap", is_ap(_si), (True, F(100)))
ck("PS3 Q14 first", _si[0], F(100))
ck("PS3 Q14 t20 direct", _si[-1], F(2000))
ck("PS3 Q14 t20 formula", tn(100, 100, 20), F(2000))
ck("PS3 Q14 y4,y5,y6", _si[3:6], [F(400), F(500), F(600)])

# ─────────── solved examples whose blanks this ingest completed ───────────
ck("SolvedEx sum-odd-to-150 n", len([x for x in range(1, 151) if x % 2 == 1]), 75)
ck("SolvedEx sum-odd-to-150", sum(x for x in range(1, 151) if x % 2 == 1), 5625)
ck("SolvedEx spiral", sum(F(22, 7) * F(k, 2) for k in range(1, 14)), F(143))
ck("SolvedEx Shaikh 3rd year", 180000 + 2 * 10000, 200000)

print(f"{CHECKS[0]} checks run, {len(FAILS)} failed")
for f in FAILS:
    print("  FAIL", f)
raise SystemExit(1 if FAILS else 0)
