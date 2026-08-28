# scratch (geo-mensuration-10): a THIRD, independent computation of every keyed
# answer, straight from the printed stem data -- not from our solution text and
# not from the book's key. Both are then tested against it, so a shared error
# cannot hide. Delete after use.
from fractions import Fraction as F
import math

P22 = F(22, 7)
P314 = F(314, 100)
R3_173 = F(173, 100)
R3_1732 = F(1732, 1000)

rows = []          # (ref, ours, book, note)
def chk(ref, ours, book, note=""):
    rows.append((ref, ours, book, note))

def f(x, nd=2):
    return round(float(x), nd)

# ---------- Practice set 7.1 ----------
chk("7.1 Q1", f(F(1,3)*P22*F(15,10)**2*5), 11.79)
chk("7.1 Q2", f(F(4,3)*P314*3**3), 113.04)
chk("7.1 Q3", f(2*P314*5*(5+40)), 1413)
chk("7.1 Q4", f(4*P22*7**2), 616)
vol_cuboid = 44*21*12
r2 = F(vol_cuboid,1)/(F(1,3)*P22*24)
chk("7.1 Q5", f(math.sqrt(float(r2))), 21)
cyl = P22*49*10
jug = F(1,3)*P22*F(35,10)**2*10
chk("7.1 Q6", f(cyl/jug), 12)
chk("7.1 Q7", 3 + (500-300)/(F(1,3)*100), 9)
chk("7.1 Q8 (coef of pi)", f(2*9 + 2*3*40 + 3*5), 273)
chk("7.1 Q9", 100//5, 20)
chk("7.1 Q10 vol", f(F(1,3)*P314*9*4 + F(2,3)*P314*27), 94.20)
chk("7.1 Q10 sa", f(P314*3*5 + 2*P314*9), 103.62)
chk("7.1 Q11 sa", f(4*P314*21**2), 5538.96)
chk("7.1 Q11 vol", f(F(4,3)*P314*21**3), 38772.72)
chk("7.1 Q12 (coef of pi)", f(49*30 - F(4,3)), 1468.67)

# ---------- Practice set 7.2 ----------
chk("7.2 Q1 (litre)", f(F(1,3)*P22*30*(196+49+14*7)/1000, 3), 10.780)
l2 = math.sqrt(6**2 + (14-6)**2)
chk("7.2 Q2 i", f(P314*(14+6)*F(int(l2),1)), 628)
chk("7.2 Q2 ii", f(P314*(14+6)*10 + P314*14**2 + P314*6**2), 1356.48)
chk("7.2 Q2 iii", f(F(1,3)*P314*6*(196+36+84)), 1984.48)
chk("7.2 Q3 (no key; ours 2750)", f(P22*(21+14)*25), None, "no key entry")

# ---------- Practice set 7.3 ----------
chk("7.3 Q1", f(F(54,360)*P314*100), 47.1)
chk("7.3 Q2", f(F(80,360)*2*P314*18), 25.12)
chk("7.3 Q3", f(F(1,2)*F(22,10)*F(35,10)), 3.85)
chk("7.3 Q4", f(P314*100 - 100), 214)
chk("7.3 Q5", f(30*2/F(15,1)), 4)
circ7 = P22*49
chk("7.3 Q6(1)", f(circ7), 154)
chk("7.3 Q6(2)", f(F(60,360)*circ7), 25.7, "key 25.7, ours 25.67")
chk("7.3 Q6(3)", f(circ7 - F(60,360)*circ7), 128.3, "key 128.3, ours 128.33")
arc7 = F(128,10) - 2*F(34,10)
chk("7.3 Q7", f(F(1,2)*arc7*F(34,10)), 10.2)
chk("7.3 Q8 RXQ", f(F(60,360)*2*P22*7), 7.3, "key 7.3, ours 7.33")
chk("7.3 Q8 MYN", f(F(60,360)*2*P22*21), 22)
theta9 = F(154,1)/(P22*196)*360
chk("7.3 Q9(1)", f(theta9), 90)
chk("7.3 Q9(2)", f(F(90,360)*2*P22*14), 22)
chk("7.3 Q10(1)", f(F(30,360)*circ7), 12.83)
chk("7.3 Q10(2)", f(F(210,360)*circ7), 89.83)
chk("7.3 Q10(3)", f(F(270,360)*circ7), 115.5)
r211 = F(385,100)/(F(36,360)*P22)
chk("7.3 Q11", f(math.sqrt(float(r211))), 3.5)
chk("7.3 Q12 x", f(F(90,360)*P22*14**2), 154)
chk("7.3 Q12 y", f(F(90,360)*P22*7**2), 38.5)
chk("7.3 Q12 z", f(14*21 - F(90,360)*P22*196 - F(90,360)*P22*49), 101.5)
chk("7.3 Q13(1)", f(R3_1732/4*14**2), 84.87)
chk("7.3 Q13(2)", f(F(60,360)*circ7), 25.67)
chk("7.3 Q13(3)", f(3*round(float(F(60,360)*circ7),2)), 77.01, "3 x rounded sector")
chk("7.3 Q13(4)", f(round(float(R3_1732/4*196),2) - 77.01), 7.86)

# ---------- Practice set 7.4 ----------
# Q1: A is the CENTRE, 45 deg is at B => central angle 90 deg, r^2 = 98
q1_ours_22_7 = F(90,360)*P22*98 - F(1,2)*98
q1_book_if_central_45 = F(45,360)*P314*98 - F(1,2)*98*F(141,200)  # sin45 with sqrt2=1.41
chk("7.4 Q1", f(q1_ours_22_7), 3.92,
    "ours 28 (pi=22/7) / 27.93 (pi=3.14); the book's 3.92 = %s, i.e. it treats the 45 deg as the CENTRAL angle" % f(q1_book_if_central_45))
sin60 = F(865,1000)   # sqrt3/2 with sqrt3 = 1.73
chk("7.4 Q2", f(100*(P314*60/360 - sin60/2)), 9.08)
chk("7.4 Q3", f(F(30,360)*P314*F(75,10)**2 - F(1,2)*F(75,10)**2*F(1,2), 5), 0.65625)
chk("7.4 Q4 (radius)", f(math.sqrt(114/float(P314*F(90,360) - F(1,2)))), 20)
chk("7.4 Q5 minor", f(225*(P314*60/360 - sin60/2)), 20.43)
chk("7.4 Q5 major", f(P314*225 - 225*(P314*60/360 - sin60/2)), 686.07)

# ---------- Problem set 7 ----------
chk("PS7 Q2 (litre)", f(F(1,3)*P22*21*(400+225+300)/1000), 20.35)
tube = F(90,1)*(30**2 - 28**2)          # in units of pi
chk("PS7 Q3", f(tube/F(4,3)), 7830)
chk("PS7 Q4", f(F(16*11*10,1)/(F(2,10))/P22*1), 2800, "n = V/(pi r^2 t), pi=22/7")
csa_roller = 2*P22*F(6,10)*F(84,100)
chk("PS7 Q5 (Rs)", f(csa_roller*200*10), 6336)
chk("PS7 Q6 sa (pi=3.14)", f(4*P314*36), 452.16)
chk("PS7 Q6 mass (pi=3.14)", f(F(4,3)*P314*(216-125)*F(888,100)), 3385.94,
    "book's 3385.94 needs pi=22/7 (%s) while its own 452.16 needs pi=3.14" % f(F(4,3)*P22*(216-125)*F(888,100)))
R2_cone = F(3920*3,14)
chk("PS7 Q7", f(P22*R2_cone), 2640)
chk("PS7 Q8 (metre)", f(F(4,3)*9**3/(F(2,10)**2)/100), 243)
theta9b = F(15,36)*360
chk("PS7 Q9 (deg)", f(theta9b), 150)
chk("PS7 Q9 arc (coef of pi)", f(F(150,360)*2*6), 5)
sector10 = F(120,360)*P314*64
tri10 = F(1,2)*(8*R3_173)*4
chk("PS7 Q10", f(sector10 - tri10), 39.28,
    "ours 39.31 with the printed sqrt3=1.73; %s with sqrt3=1.732 -- rounding only" % f(sector10 - F(1,2)*(8*R3_1732)*4))

# ---------- report ----------
agree = wrongbook = noky = 0
print("%-26s %14s %14s  %s" % ("ref", "independent", "book key", "verdict"))
print("-" * 100)
for ref, ours, book, note in rows:
    if book is None:
        v, noky = "NO-KEY-ENTRY", noky + 1
    elif abs(float(ours) - float(book)) < 0.06:
        v, agree = "AGREE", agree + 1
    else:
        v, wrongbook = "DISAGREE", wrongbook + 1
    print("%-26s %14s %14s  %-12s %s" % (ref, ours, book, v, note))
print("-" * 100)
print("AGREE %d   DISAGREE %d   NO-KEY-ENTRY %d   (total %d)" % (agree, wrongbook, noky, len(rows)))
