"""Independent enumeration of every countable answer in Probability (Class 10
Algebra Ch.5), so each authored answer rests on a brute-force count rather than
on my arithmetic. Prints OUR value beside the BOOK's printed key value; any
DISAGREE line is a finding to adjudicate by hand.

Fractions are compared as VALUES (Fraction), never as strings — the standard
false alarm in a probability chapter is the key printing 6/36 where we write
1/6, which is the same answer."""
from fractions import Fraction as F
from itertools import product, combinations
import datetime

fails = []


def chk(tag, ours, book):
    """ours/book may be Fraction, int, or a set/list (compared as sets)."""
    if isinstance(ours, (set, frozenset)) or isinstance(book, (set, frozenset)):
        ok = set(ours) == set(book)
    else:
        ok = ours == book
    print(("  OK   " if ok else "DISAGREE") + f"  {tag}: ours={ours}  book={book}")
    if not ok:
        fails.append(tag)


D6 = [1, 2, 3, 4, 5, 6]
TWO_DICE = list(product(D6, D6))
print("n(two dice) =", len(TWO_DICE))

print("\n-- Practice set 5.1 (counts) --")
chk("5.1 Q1(1) sites", 8, 8)
chk("5.1 Q1(2) days of week", 7, 7)
chk("5.1 Q1(3) pack of cards", 52, 52)
chk("5.1 Q1(4) numbers 10..20", len(range(10, 21)), 11)

print("\n-- Practice set 5.2 --")
coin_die = [f"{d}{c}" for d in D6 for c in "HT"]
chk("5.2 Q1(1) n(S) coin+die", len(coin_die), 12)
two_from_235 = sorted(int(f"{a}{b}") for a, b in product([2, 3, 5], repeat=2) if a != b)
chk("5.2 Q1(2) set", set(two_from_235), {23, 25, 32, 35, 52, 53})
chk("5.2 Q1(2) n(S)", len(two_from_235), 6)
# March 2019: 1 March 2019 is a Friday (the printed calendar puts 1 under F)
assert datetime.date(2019, 3, 1).strftime("%A") == "Friday", "calendar premise wrong"
mult5_days = [datetime.date(2019, 3, d).strftime("%A") for d in range(1, 32) if d % 5 == 0]
chk("5.2 Q3 days", set(mult5_days),
    {"Tuesday", "Sunday", "Friday", "Wednesday", "Monday", "Saturday"})
chk("5.2 Q3 n(S)", len(mult5_days), 6)
kids = ["B1", "B2", "G1", "G2"]
committee2 = ["".join(c) for c in combinations(kids, 2)]
chk("5.2 Q4 n(S)", len(committee2), 6)
chk("5.2 Q4 boys-only", {c for c in committee2 if c.count("B") == 2}, {"B1B2"})
chk("5.2 Q4 girls-only", {c for c in committee2 if c.count("G") == 2}, {"G1G2"})
chk("5.2 Q4 mixed", {c for c in committee2 if c.count("B") == 1},
    {"B1G1", "B1G2", "B2G1", "B2G2"})

print("\n-- Solved run 1 (Event) --")
two_coins = ["HH", "HT", "TH", "TT"]
chk("SolvedEx.1 A as PRINTED IN QUESTION (>=1 tail)",
    {s for s in two_coins if "T" in s}, {"HT", "TH", "TT"})
chk("SolvedEx.1 A as PRINTED IN SOLUTION (>=1 head)",
    {s for s in two_coins if "H" in s}, {"HH", "HT", "TH"})
chk("SolvedEx.1 C (at most one tail)",
    {s for s in two_coins if s.count("T") <= 1}, {"HH", "HT", "TH"})
chk("SolvedEx.2 A div by 6", {n for n in range(1, 51) if n % 6 == 0},
    {6, 12, 18, 24, 30, 36, 42, 48})
chk("SolvedEx.2 B squares", {n for n in range(1, 51) if int(n ** 0.5) ** 2 == n},
    {1, 4, 9, 16, 25, 36, 49})
people = ["B1", "B2", "B3", "G1", "G2"]
c2 = ["".join(c) for c in combinations(people, 2)]
chk("SolvedEx.3 n(S)", len(c2), 10)
chk("SolvedEx.3 n(A) >=1 girl", sum(1 for c in c2 if "G" in c), 7)
chk("SolvedEx.3 n(B) 1B1G", sum(1 for c in c2 if c.count("B") == 1 and c.count("G") == 1), 6)
chk("SolvedEx.3 n(C) boys only", sum(1 for c in c2 if c.count("G") == 0), 3)
chk("SolvedEx.3 n(D) at most 1 girl", sum(1 for c in c2 if c.count("G") <= 1), 9)
PRIMES = {2, 3, 5, 7, 11}
chk("SolvedEx.4 n(E) prime sum", sum(1 for a, b in TWO_DICE if a + b in PRIMES), 15)
chk("SolvedEx.4 n(F) sum mult of 5", sum(1 for a, b in TWO_DICE if (a + b) % 5 == 0), 7)
chk("SolvedEx.4 n(G) sum 25", sum(1 for a, b in TWO_DICE if a + b == 25), 0)
chk("SolvedEx.4 n(H) first<second", sum(1 for a, b in TWO_DICE if a < b), 15)

print("\n-- Practice set 5.3 --")
chk("5.3 (1) A even", {n for n in D6 if n % 2 == 0}, {2, 4, 6})
chk("5.3 (1) B odd", {n for n in D6 if n % 2}, {1, 3, 5})
chk("5.3 (1) C prime", {n for n in D6 if n in (2, 3, 5)}, {2, 3, 5})
chk("5.3 (2) A sum mult of 6", {(a, b) for a, b in TWO_DICE if (a + b) % 6 == 0},
    {(1, 5), (2, 4), (3, 3), (4, 2), (5, 1), (6, 6)})
chk("5.3 (2) B sum >= 10", {(a, b) for a, b in TWO_DICE if a + b >= 10},
    {(4, 6), (5, 5), (5, 6), (6, 4), (6, 5), (6, 6)})
chk("5.3 (2) C same digit", {(a, b) for a, b in TWO_DICE if a == b},
    {(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6)})
three = ["".join(t) for t in product("HT", repeat=3)]
chk("5.3 (3) n(S)", len(three), 8)
chk("5.3 (3) A >=2 heads", {s for s in three if s.count("H") >= 2},
    {"HHH", "HHT", "HTH", "THH"})
chk("5.3 (3) B no head", {s for s in three if "H" not in s}, {"TTT"})
chk("5.3 (3) C head on 2nd coin", {s for s in three if s[1] == "H"},
    {"HHH", "HHT", "THH", "THT"})
S4 = sorted(int(f"{a}{b}") for a, b in product(range(6), repeat=2) if a != b and a != 0)
chk("5.3 (4) n(S)", len(S4), 25)
chk("5.3 (4) A even", {n for n in S4 if n % 2 == 0},
    {10, 12, 14, 20, 24, 30, 32, 34, 40, 42, 50, 52, 54})
chk("5.3 (4) B div 3", {n for n in S4 if n % 3 == 0},
    {12, 15, 21, 24, 30, 42, 45, 51, 54})
chk("5.3 (4) C > 50", {n for n in S4 if n > 50}, {51, 52, 53, 54})
mw = ["M1", "M2", "M3", "F1", "F2"]
c5 = ["".join(c) for c in combinations(mw, 2)]
chk("5.3 (5) n(S)", len(c5), 10)
chk("5.3 (5) n(A) >=1 woman", sum(1 for c in c5 if "F" in c), 7)
chk("5.3 (5) n(B) 1M1W", sum(1 for c in c5 if c.count("M") == 1 and c.count("F") == 1), 6)
chk("5.3 (5) n(C) no woman", sum(1 for c in c5 if "F" not in c), 3)
cd = [f"{c}{d}" for c in "HT" for d in D6]
chk("5.3 (6) n(S)", len(cd), 12)
chk("5.3 (6) A head+odd", {x for x in cd if x[0] == "H" and int(x[1]) % 2},
    {"H1", "H3", "H5"})
chk("5.3 (6) B any coin + even", {x for x in cd if int(x[1]) % 2 == 0},
    {"H2", "H4", "H6", "T2", "T4", "T6"})
chk("5.3 (6) C >7 and tail", {x for x in cd if int(x[1]) > 7 and x[0] == "T"}, set())

print("\n-- Solved run 2 (Probability of an event) --")
chk("P SolvedEx.1 head", F(1, 2), F(1, 2))
chk("P SolvedEx.2 prime", F(3, 6), F(1, 2))
chk("P SolvedEx.2 even", F(3, 6), F(1, 2))
chk("P SolvedEx.3 red", F(26, 52), F(1, 2))
chk("P SolvedEx.3 face", F(12, 52), F(3, 13))
chk("P SolvedEx.4 coffee", F(6, 13), F(6, 13))
chk("P SolvedEx.4 peppermint", F(2, 13), F(2, 13))

print("\n-- Practice set 5.4 (vs printed key) --")
chk("5.4 Q1(1) >=1 head", F(sum(1 for s in two_coins if "H" in s), 4), F(3, 4))
chk("5.4 Q1(2) no head", F(sum(1 for s in two_coins if "H" not in s), 4), F(1, 4))
chk("5.4 Q2(1) sum >= 10", F(sum(1 for a, b in TWO_DICE if a + b >= 10), 36), F(1, 6))
chk("5.4 Q2(2) sum = 33", F(sum(1 for a, b in TWO_DICE if a + b == 33), 36), F(0))
chk("5.4 Q2(3) first > second", F(sum(1 for a, b in TWO_DICE if a > b), 36), F(5, 12))
t15 = list(range(1, 16))
chk("5.4 Q3(1) even", F(sum(1 for n in t15 if n % 2 == 0), 15), F(7, 15))
chk("5.4 Q3(2) mult of 5", F(sum(1 for n in t15 if n % 5 == 0), 15), F(1, 5))
S44 = [int(f"{a}{b}") for a, b in product([2, 3, 5, 7, 9], repeat=2) if a != b]
chk("5.4 Q4 n(S)", len(S44), 20)
chk("5.4 Q4(1) odd", F(sum(1 for n in S44 if n % 2), len(S44)), F(4, 5))
chk("5.4 Q4(2) mult of 5", F(sum(1 for n in S44 if n % 5 == 0), len(S44)), F(1, 5))
chk("5.4 Q5(1) ace", F(4, 52), F(1, 13))
chk("5.4 Q5(2) spade", F(13, 52), F(1, 4))

print("\n-- Problem set 5 (vs printed key) --")
chk("PS5 Q1(1) key", "B", "B")  # 1.5 > 1
chk("PS5 Q1(2) value", F(sum(1 for n in D6 if n < 3), 6), F(1, 3))
primes100 = [n for n in range(1, 101)
             if n > 1 and all(n % d for d in range(2, int(n ** 0.5) + 1))]
chk("PS5 Q1(3) count primes 1..100", len(primes100), 25)
chk("PS5 Q1(3) value", F(len(primes100), 100), F(1, 4))
chk("PS5 Q1(4) value", F(sum(1 for n in range(1, 41) if n % 5 == 0), 40), F(1, 5))
chk("PS5 Q1(5) n(S)", 2 // F(1, 5), 10)
chk("PS5 Q2 best", max([("John", F(4, 5)), ("Vasim", F(83, 100)), ("Akash", F(58, 100))],
                       key=lambda t: t[1])[0], "Vasim")
chk("PS5 Q3(1) goalee", F(1, 11), F(1, 11))
chk("PS5 Q3(2) defender", F(6, 11), F(6, 11))
chk("PS5 Q4 vowel", F(5, 26), F(5, 26))
chk("PS5 Q5(1) red", F(2, 9), F(4, 9))          # <-- expect DISAGREE: book key error
chk("PS5 Q5(2) blue", F(3, 9), F(1, 3))
chk("PS5 Q5(3) green", F(4, 9), F(4, 9))
chk("PS5 Q5 sum of book's three", F(4, 9) + F(1, 3) + F(4, 9), F(1))  # <-- must fail: >1
chk("PS5 Q5 sum of ours", F(2, 9) + F(3, 9) + F(4, 9), F(1))
chk("PS5 Q6 blue pen", F(8, 16), F(1, 2))
faces = ["A", "B", "C", "D", "E", "A"]
chk("PS5 Q7(1) A", F(faces.count("A"), 6), F(1, 3))
chk("PS5 Q7(2) D", F(faces.count("D"), 6), F(1, 6))
chk("PS5 Q8(1) odd", F(sum(1 for n in range(1, 31) if n % 2), 30), F(1, 2))
chk("PS5 Q8(2) square", F(sum(1 for n in range(1, 31) if int(n ** .5) ** 2 == n), 30), F(1, 6))
# Q9: pi = 22/7 as the book uses throughout
lake = F(22, 7) * 7 * 7
chk("PS5 Q9 lake area", lake, 154)
chk("PS5 Q9 value", F(lake, 77 * 50), F(1, 25))
sp = list(range(1, 9))
chk("PS5 Q10(1) 8", F(1, 8), F(1, 8))
chk("PS5 Q10(2) odd", F(sum(1 for n in sp if n % 2), 8), F(1, 2))
chk("PS5 Q10(3) >2", F(sum(1 for n in sp if n > 2), 8), F(3, 4))
chk("PS5 Q10(4) <9", F(sum(1 for n in sp if n < 9), 8), F(1))
cards6 = list(range(0, 6))
chk("PS5 Q11(1) natural", F(sum(1 for n in cards6 if n >= 1), 6), F(5, 6))
chk("PS5 Q11(2) <1", F(sum(1 for n in cards6 if n < 1), 6), F(1, 6))
chk("PS5 Q11(3) whole", F(sum(1 for n in cards6 if n >= 0), 6), F(1))
chk("PS5 Q11(4) >5", F(sum(1 for n in cards6 if n > 5), 6), F(0))
chk("PS5 Q12(1) red", F(3, 9), F(1, 3))
chk("PS5 Q12(2) not red", F(6, 9), F(2, 3))
chk("PS5 Q12(3) red or white", F(6, 9), F(2, 3))
word = "mathematics"
chk("PS5 Q13 letters", len(word), 11)
chk("PS5 Q13 'm'", F(word.count("m"), len(word)), F(2, 11))
chk("PS5 Q14 dislike", F(200 - 135, 200), F(13, 40))
S15 = [10 * a + b for a, b in product(range(5), repeat=2) if a != 0]
chk("PS5 Q15 n(S)", len(S15), 20)
pr = [n for n in S15 if n > 1 and all(n % d for d in range(2, int(n ** .5) + 1))]
chk("PS5 Q15(1) prime", F(len(pr), 20), F(3, 10))
chk("PS5 Q15(2) mult of 4", F(sum(1 for n in S15 if n % 4 == 0), 20), F(3, 10))
chk("PS5 Q15(3) mult of 11", F(sum(1 for n in S15 if n % 11 == 0), 20), F(1, 5))
d05 = list(product(range(6), repeat=2))
chk("PS5 Q16 n(S)", len(d05), 36)
chk("PS5 Q16 product zero", F(sum(1 for a, b in d05 if a * b == 0), 36), F(11, 36))

print("\nprime list for Q15(1):", pr)
print("mult-of-4 list for Q15(2):", [n for n in S15 if n % 4 == 0])
print("mult-of-11 list for Q15(3):", [n for n in S15 if n % 11 == 0])
print("\nDISAGREEMENTS:", fails if fails else "none")
