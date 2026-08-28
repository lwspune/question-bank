# -*- coding: utf-8 -*-
"""geo-trigonometry-10 — independent derivation of every KEYED numeric answer,
then a diff against the printed key transcribed off out/_answers/.../p-176.png.

Method: derive first from the stem alone (the functions below never read the
key), THEN compare. A disagreement is reported, never reconciled.
"""
from mpmath import mp, mpf, sin, cos, tan, asin, sqrt, pi, radians, degrees

mp.dps = 30
S3 = sqrt(3)


def show(x, nd=6):
    return mp.nstr(mpf(x), nd)


derived = {}   # ref -> (our value(s) as text, our numeric tuple)
notes = {}

# ── Practice set 6.1 ────────────────────────────────────────────────────
# Q1  sin = 7/25
s = mpf(7) / 25
c = sqrt(1 - s ** 2)
derived["Ex 6.1 Q.1"] = (f"cos = {c} (=24/25), tan = {s/c} (=7/24)", (c, s / c))

# Q2  tan = 3/4
t = mpf(3) / 4
sec = sqrt(1 + t ** 2)
derived["Ex 6.1 Q.2"] = (f"sec = {sec} (=5/4), cos = {1/sec} (=4/5)", (sec, 1 / sec))

# Q3  cot = 40/9
cot = mpf(40) / 9
csc = sqrt(1 + cot ** 2)
derived["Ex 6.1 Q.3"] = (f"cosec = {csc} (=41/9), sin = {1/csc} (=9/41)", (csc, 1 / csc))

# Q4  5 sec - 12 cosec = 0  ->  5/cos = 12/sin -> 5 sin = 12 cos -> tan = 12/5
t = mpf(12) / 5
sec = sqrt(1 + t ** 2)
derived["Ex 6.1 Q.4"] = (f"sec = {sec} (=13/5), cos = {1/sec} (=5/13), sin = {t/sec} (=12/13)",
                         (sec, 1 / sec, t / sec))

# Q5  tan = 1 -> theta = 45
th = pi / 4
val = (sin(th) + cos(th)) / (1 / cos(th) + 1 / sin(th))
derived["Ex 6.1 Q.5"] = (f"(sin+cos)/(sec+cosec) = {val} (=1/2)", (val,))

# ── Practice set 6.2 ────────────────────────────────────────────────────
# Q1  80 m away, elevation 45 -> h = 80 tan45
h = 80 * tan(radians(45))
derived["Ex 6.2 Q.1"] = (f"height of church = {h} m (=80)", (h,))

# Q2  lighthouse 90 m, depression 60 -> d = 90/tan60 = 30*sqrt3
d_exact = 90 / S3
d_book = 30 * mpf("1.73")          # using the book's sqrt3 = 1.73
derived["Ex 6.2 Q.2"] = (f"distance = 90/tan60 = 30*sqrt3 = {d_exact}; with sqrt3=1.73 -> {d_book} (=51.90)",
                         (d_book,))

# Q3  road 12, first building 10, elevation 60 -> H = 10 + 12 tan60
H = 10 + 12 * tan(radians(60))
derived["Ex 6.2 Q.3"] = (f"H = 10 + 12*tan60 = 10 + 12*sqrt3 = {H}", (H,))

# Q4  poles 18 and 7, wire 22 -> sin A = 11/22
ang = degrees(asin(mpf(11) / 22))
derived["Ex 6.2 Q.4"] = (f"sin = 11/22 = 1/2 -> angle = {ang} deg (=30)", (ang,))

# Q5  treetop 20 m from base, 60 with horizontal.
#     broken piece = 20/cos60 ; standing stump = 20*tan60 ; height = sum
piece = 20 / cos(radians(60))
stump = 20 * tan(radians(60))
derived["Ex 6.2 Q.5"] = (f"broken part = 20/cos60 = {piece} (=40); stump = 20*tan60 = {stump} (=20*sqrt3); "
                         f"height = {piece + stump} (= 40 + 20*sqrt3)", (piece + stump,))

# Q6  kite 60 m up, string at 60 -> L = 60/sin60
L_exact = 60 / sin(radians(60))
L_book = 40 * mpf("1.73")
derived["Ex 6.2 Q.6"] = (f"L = 60/sin60 = 40*sqrt3 = {L_exact}; with sqrt3=1.73 -> {L_book} (=69.20)",
                         (L_book,))

# ── Problem set 6 ───────────────────────────────────────────────────────
# Q2  sin = 11/61
s = mpf(11) / 61
derived["PS6 Q.2"] = (f"cos = {sqrt(1-s**2)} (=60/61)", (sqrt(1 - s ** 2),))

# Q3  tan = 2
t = mpf(2)
sec = sqrt(1 + t ** 2)
derived["PS6 Q.3"] = (f"sin = {t/sec} (=2/sqrt5), cos = {1/sec} (=1/sqrt5), "
                      f"cosec = {sec/t} (=sqrt5/2), sec = {sec} (=sqrt5), cot = {1/t} (=1/2)",
                      (t / sec, 1 / sec, sec / t, sec, 1 / t))

# Q4  sec = 13/12
sec = mpf(13) / 12
c = 1 / sec
s = sqrt(1 - c ** 2)
derived["PS6 Q.4"] = (f"sin = {s} (=5/13), cos = {c} (=12/13), cosec = {1/s} (=13/5), "
                      f"tan = {s/c} (=5/12), cot = {c/s} (=12/5)", (s, c, 1 / s, s / c, c / s))

# Q6  48 m, elevation 30 -> h = 48 tan30 = 16 sqrt3
h = 48 * tan(radians(30))
derived["PS6 Q.6"] = (f"h = 48*tan30 = 48/sqrt3 = 16*sqrt3 = {h}", (h,))

# Q7  lighthouse 100 m, depression 30 -> d = 100/tan30 = 100 sqrt3
d = 100 / tan(radians(30))
derived["PS6 Q.7"] = (f"d = 100/tan30 = 100*sqrt3 = {d}", (d,))

# Q8  road 15, first building 12, elevation 30 -> H = 12 + 15 tan30 = 12 + 5 sqrt3
H = 12 + 15 * tan(radians(30))
derived["PS6 Q.8"] = (f"H = 12 + 15*tan30 = 12 + 15/sqrt3 = 12 + 5*sqrt3 = {H}", (H,))
notes["PS6 Q.8"] = ("Book key prints (12 + 15*sqrt3) = %s. That is 12 + 15*TAN60, not tan30."
                    % show(12 + 15 * S3))

# Q9  ladder 20 m at 70 deg from a platform 2 m up, sin70 = 0.94
H = 2 + 20 * mpf("0.94")
derived["PS6 Q.9"] = (f"H = 2 + 20*sin70 = 2 + 20*0.94 = {H} (=20.80)", (H,))

# Q10 200 km/hr for 54 s along the glide path, depression 20, sin20 = 0.342
dist = mpf(200) * 1000 / 3600 * 54
H = dist * mpf("0.342")
derived["PS6 Q.10"] = (f"path = 200 km/h * 54 s = {dist} m (=3000); height = 3000*sin20 = {H} (=1026)", (H,))

# ── the printed key, transcribed from p-176 / p-177 ─────────────────────
KEY = {
    "Ex 6.1 Q.1": ("cos = 24/25 ; tan = 7/24", [mpf(24) / 25, mpf(7) / 24]),
    "Ex 6.1 Q.2": ("sec = 5/4 ; cos = 4/5", [mpf(5) / 4, mpf(4) / 5]),
    "Ex 6.1 Q.3": ("cosec = 41/9 ; sin = 9/41", [mpf(41) / 9, mpf(9) / 41]),
    "Ex 6.1 Q.4": ("sec = 13/5 ; cos = 5/13 ; sin = 12/13", [mpf(13) / 5, mpf(5) / 13, mpf(12) / 13]),
    "Ex 6.1 Q.5": ("1/2", [mpf(1) / 2]),
    "Ex 6.2 Q.1": ("Height of the church is 80 metre.", [mpf(80)]),
    "Ex 6.2 Q.2": ("The ship is 51.90 metre away from the ligthhouse.", [mpf("51.90")]),
    "Ex 6.2 Q.3": ("Height of the second building is (10 + 12 sqrt3) metre.", [10 + 12 * S3]),
    "Ex 6.2 Q.4": ("Angle made by the wire with the horizontal line is 30 deg.", [mpf(30)]),
    "Ex 6.2 Q.5": ("Height of the tree is (40 + 20 sqrt3) metre.", [40 + 20 * S3]),
    "Ex 6.2 Q.6": ("The length of the string is 69.20 metre.", [mpf("69.20")]),
    "PS6 Q.2": ("cos = 60/61", [mpf(60) / 61]),
    "PS6 Q.3": ("sin=2/sqrt5 ; cos=1/sqrt5 ; cosec=sqrt5/2 ; sec=sqrt5 ; cot=1/2",
                [2 / sqrt(5), 1 / sqrt(5), sqrt(5) / 2, sqrt(5), mpf(1) / 2]),
    "PS6 Q.4": ("sin=5/13 ; cos=12/13 ; cosec=13/5 ; tan=5/12 ; cot=12/5",
                [mpf(5) / 13, mpf(12) / 13, mpf(13) / 5, mpf(5) / 12, mpf(12) / 5]),
    "PS6 Q.6": ("Height of the building is 16 sqrt3 metre.", [16 * S3]),
    "PS6 Q.7": ("The ship is 100 sqrt3 metre away from the ligthhouse.", [100 * S3]),
    "PS6 Q.8": ("Height of the second buliding is (12 + 15 sqrt3) metre.", [12 + 15 * S3]),
    "PS6 Q.9": ("The maximum height that ladder can reach is 20.80 metre.", [mpf("20.80")]),
    "PS6 Q.10": ("the plane was 1026 metre high at the time of landing.", [mpf(1026)]),
}

TOL = mpf("1e-6")
agree, ours_wrong, book_wrong = [], [], []
print("ref                 verdict     ours                                   key")
print("-" * 110)
for ref in sorted(KEY, key=lambda r: (r.split()[0], r)):
    keytxt, keyvals = KEY[ref]
    ourtxt, ourvals = derived[ref]
    ok = len(keyvals) == len(ourvals) and all(abs(a - b) < TOL for a, b in zip(ourvals, keyvals))
    verdict = "AGREE" if ok else "DISAGREE"
    (agree if ok else book_wrong).append(ref)
    print(f"{ref:<19} {verdict:<11} {', '.join(show(v) for v in ourvals):<38} "
          f"{', '.join(show(v) for v in keyvals)}")
    if not ok:
        print(f"{'':19} book text: {keytxt}")
        print(f"{'':19} our work : {ourtxt}")
        if ref in notes:
            print(f"{'':19} note     : {notes[ref]}")

print()
print(f"diffed {len(KEY)} keyed rows: AGREE {len(agree)}  DISAGREE {len(book_wrong)} -> {book_wrong}")
