# Authored model answers for the 59 exercise-subjective rows of
# alg-arithmetic-progression-10. Every numeric result here is independently
# re-derived in data/alg-arithmetic-progression-10.verify.py (155 checks, 0 fails)
# by BUILDING the terms rather than only applying tn = a+(n-1)d / Sn.
#
# Joined onto the topaper dump BY REF, with an assertion that every emitted row's
# id still pairs with its own ref (a dropped row that shifts the tail is a
# permutation: id set matches, count matches, every answer lands on the wrong
# question).
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ID = "alg-arithmetic-progression-10"

FORMULA_TN = r"\(t_n = a + (n - 1)d\)"
FORMULA_SN = r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)"
FORMULA_SN2 = r"\(S_n = \dfrac{n}{2}(t_1 + t_n)\)"

S = {}


def sol(ref, text):
    assert ref not in S, "duplicate ref " + ref
    S[ref] = text


# ─────────────────────────── Practice Set 3.1 ───────────────────────────
sol("Ex 3.1 Q1(1)",
    r"\(t_2 - t_1 = 4 - 2 = 2\), \(t_3 - t_2 = 6 - 4 = 2\), \(t_4 - t_3 = 8 - 6 = 2\)." "\n\n"
    r"The difference between consecutive terms is constant." "\n\n"
    r"\(\therefore\) It is an A.P. with common difference \(d = 2\).")
sol("Ex 3.1 Q1(2)",
    r"[Textbook note: the book prints the fourth term as \(\dfrac{7}{3}\); with that term the "
    r"sequence is not an A.P., yet the printed answer key gives “Yes, \(d = \dfrac{1}{2}\)”, which "
    r"holds only if the fourth term is \(\dfrac{7}{2}\). So the printed stem is a misprint for "
    r"\(\dfrac{7}{2}\). The question is answered below exactly as printed, and the intended "
    r"version is answered after it.]" "\n\n"
    r"**As printed.**" "\n\n"
    r"\(t_2 - t_1 = \dfrac{5}{2} - 2 = \dfrac{1}{2}\)" "\n\n"
    r"\(t_3 - t_2 = 3 - \dfrac{5}{2} = \dfrac{1}{2}\)" "\n\n"
    r"\(t_4 - t_3 = \dfrac{7}{3} - 3 = -\dfrac{2}{3}\)" "\n\n"
    r"\(\dfrac{1}{2} \neq -\dfrac{2}{3}\), so the difference is not constant." "\n\n"
    r"\(\therefore\) As printed, the sequence is **not** an A.P." "\n\n"
    r"**As intended** (fourth term \(\dfrac{7}{2}\))." "\n\n"
    r"\(\dfrac{7}{2} - 3 = \dfrac{1}{2}\), so all three differences are \(\dfrac{1}{2}\)." "\n\n"
    r"\(\therefore\) It is an A.P. with \(d = \dfrac{1}{2}\), which is the printed answer.")
sol("Ex 3.1 Q1(3)",
    r"\(t_2 - t_1 = -6 - (-10) = 4\), \(t_3 - t_2 = -2 - (-6) = 4\), \(t_4 - t_3 = 2 - (-2) = 4\)." "\n\n"
    r"\(\therefore\) It is an A.P. with common difference \(d = 4\).")
sol("Ex 3.1 Q1(4)",
    r"Taking the terms exactly as printed, \(0.3\), \(0.33\), \(0.0333\):" "\n\n"
    r"\(t_2 - t_1 = 0.33 - 0.3 = 0.03\)" "\n\n"
    r"\(t_3 - t_2 = 0.0333 - 0.33 = -0.2967\)" "\n\n"
    r"The differences are not equal." "\n\n"
    r"(The third term is almost certainly meant to be \(0.333\); even then "
    r"\(0.333 - 0.33 = 0.003 \neq 0.03\), so the verdict is the same.)" "\n\n"
    r"\(\therefore\) The sequence is **not** an A.P.")
sol("Ex 3.1 Q1(5)",
    r"\(t_2 - t_1 = -4 - 0 = -4\), \(t_3 - t_2 = -8 - (-4) = -4\), \(t_4 - t_3 = -12 - (-8) = -4\)." "\n\n"
    r"\(\therefore\) It is an A.P. with common difference \(d = -4\).")
sol("Ex 3.1 Q1(6)",
    r"Every term is \(-\dfrac{1}{5}\), so each difference is "
    r"\(-\dfrac{1}{5} - \left(-\dfrac{1}{5}\right) = 0\)." "\n\n"
    r"A constant sequence is an A.P. whose common difference is zero." "\n\n"
    r"\(\therefore\) It is an A.P. with \(d = 0\).")
sol("Ex 3.1 Q1(7)",
    r"\(t_2 - t_1 = (3 + \sqrt{2}) - 3 = \sqrt{2}\)" "\n\n"
    r"\(t_3 - t_2 = (3 + 2\sqrt{2}) - (3 + \sqrt{2}) = \sqrt{2}\)" "\n\n"
    r"\(t_4 - t_3 = (3 + 3\sqrt{2}) - (3 + 2\sqrt{2}) = \sqrt{2}\)" "\n\n"
    r"\(\therefore\) It is an A.P. with common difference \(d = \sqrt{2}\)." "\n\n"
    r"(A common difference need not be rational — only constant.)")
sol("Ex 3.1 Q1(8)",
    r"\(t_2 - t_1 = 132 - 127 = 5\), \(t_3 - t_2 = 137 - 132 = 5\)." "\n\n"
    r"\(\therefore\) It is an A.P. with common difference \(d = 5\).")

_q2 = [
    ("(1)", r"a = 10", r"d = 5", [r"10", r"15", r"20", r"25"], "10, 15, 20, 25, . . ."),
    ("(2)", r"a = -3", r"d = 0", [r"-3", r"-3", r"-3", r"-3"], "-3, -3, -3, -3, . . ."),
    ("(3)", r"a = -7", r"d = \dfrac{1}{2}", [r"-7", r"-6.5", r"-6", r"-5.5"],
     "-7, -6.5, -6, -5.5, . . ."),
    ("(4)", r"a = -1.25", r"d = 3", [r"-1.25", r"1.75", r"4.75", r"7.75"],
     "-1.25, 1.75, 4.75, 7.75, . . ."),
    ("(5)", r"a = 6", r"d = -3", [r"6", r"3", r"0", r"-3"], "6, 3, 0, -3, . . ."),
    ("(6)", r"a = -19", r"d = -4", [r"-19", r"-23", r"-27", r"-31"], "-19, -23, -27, -31, . . ."),
]
for lab, a, d, terms, final in _q2:
    sol("Ex 3.1 Q2" + lab,
        r"Here \(" + a + r"\) and \(" + d + r"\)." "\n\n"
        r"\(t_1 = a = " + terms[0] + r"\)" "\n\n"
        r"\(t_2 = t_1 + d = " + terms[1] + r"\)" "\n\n"
        r"\(t_3 = t_2 + d = " + terms[2] + r"\)" "\n\n"
        r"\(t_4 = t_3 + d = " + terms[3] + r"\)" "\n\n"
        r"\(\therefore\) The A.P. is " + final)

_q3 = [
    ("(1)", "5, 1, -3, -7", r"a = 5", r"1 - 5 = -4", r"-3 - 1 = -4", r"d = -4"),
    ("(2)", "0.6, 0.9, 1.2, 1.5", r"a = 0.6", r"0.9 - 0.6 = 0.3", r"1.2 - 0.9 = 0.3", r"d = 0.3"),
    ("(3)", "127, 135, 143, 151", r"a = 127", r"135 - 127 = 8", r"143 - 135 = 8", r"d = 8"),
    ("(4)", r"\(\dfrac{1}{4}, \dfrac{3}{4}, \dfrac{5}{4}, \dfrac{7}{4}\)",
     r"a = \dfrac{1}{4}", r"\dfrac{3}{4} - \dfrac{1}{4} = \dfrac{2}{4} = \dfrac{1}{2}",
     r"\dfrac{5}{4} - \dfrac{3}{4} = \dfrac{1}{2}", r"d = \dfrac{1}{2}"),
]
for lab, seq, a, d1, d2, d in _q3:
    sol("Ex 3.1 Q3" + lab,
        r"In the A.P. " + seq + r", the first term is the term written first." "\n\n"
        r"\(\therefore\) \(" + a + r"\)" "\n\n"
        r"\(t_2 - t_1 = " + d1 + r"\)" "\n\n"
        r"\(t_3 - t_2 = " + d2 + r"\)" "\n\n"
        r"The difference is constant, so \(" + d + r"\)." "\n\n"
        r"\(\therefore\) First term \(" + a + r"\) and common difference \(" + d + r"\).")

# ─────────────────────────── Practice Set 3.2 ───────────────────────────
sol("Ex 3.2 Q1(i)",
    r"\(a = 1\), \(t_1 = 1\), \(t_2 = 8\), \(t_3 = 15\)," "\n\n"
    r"\(t_2 - t_1 = 8 - 1 = 7\)" "\n\n"
    r"\(t_3 - t_2 = 15 - 8 = 7\)   \(\therefore\) \(d = 7\)")
sol("Ex 3.2 Q1(ii)",
    r"\(t_1 = 3\), \(t_2 = 6\), \(t_3 = 9\), \(t_4 = 12\)," "\n\n"
    r"\(t_2 - t_1 = 3\), \(t_3 - t_2 = 3\)   \(\therefore\) \(d = 3\)")
sol("Ex 3.2 Q1(iii)",
    r"Note the boxes are printed out of order here; the terms themselves are" "\n\n"
    r"\(t_1 = -3\), \(t_2 = -8\), \(t_3 = -13\), \(t_4 = -18\)," "\n\n"
    r"\(t_2 - t_1 = -8 - (-3) = -5\), \(t_3 - t_2 = -13 - (-8) = -5\)" "\n\n"
    r"\(\therefore\) \(a = -3\), \(d = -5\)")
sol("Ex 3.2 Q1(iv)",
    r"\(t_1 = 70\), \(t_2 = 60\), \(t_3 = 50\), . . ." "\n\n"
    r"\(t_2 - t_1 = 60 - 70 = -10\)" "\n\n"
    r"\(\therefore\) \(a = 70\), \(d = -10\)")
sol("Ex 3.2 Q2",
    r"\(t_2 - t_1 = -5 - (-12) = 7\), \(t_3 - t_2 = 2 - (-5) = 7\), \(t_4 - t_3 = 9 - 2 = 7\), and the "
    r"same difference continues (16, 23, 30)." "\n\n"
    r"\(\therefore\) Yes, it is an A.P. with \(a = -12\), \(d = 7\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(t_{20} = -12 + (20 - 1) \times 7 = -12 + 19 \times 7 = -12 + 133 = 121\)" "\n\n"
    r"\(\therefore\) The \(20^{\text{th}}\) term is 121.")
sol("Ex 3.2 Q3",
    r"Here \(a = 12\) and \(d = 16 - 12 = 4\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(t_{24} = 12 + (24 - 1) \times 4 = 12 + 23 \times 4 = 12 + 92 = 104\)" "\n\n"
    r"\(\therefore\) The \(24^{\text{th}}\) term is 104.")
sol("Ex 3.2 Q4",
    r"Here \(a = 7\) and \(d = 13 - 7 = 6\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(t_{19} = 7 + (19 - 1) \times 6 = 7 + 18 \times 6 = 7 + 108 = 115\)" "\n\n"
    r"\(\therefore\) The \(19^{\text{th}}\) term is 115.")
sol("Ex 3.2 Q5",
    r"Here \(a = 9\) and \(d = 4 - 9 = -5\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(t_{27} = 9 + (27 - 1) \times (-5) = 9 + 26 \times (-5) = 9 - 130 = -121\)" "\n\n"
    r"\(\therefore\) The \(27^{\text{th}}\) term is \(-121\).")
sol("Ex 3.2 Q6",
    r"The three digit natural numbers divisible by 5 are" "\n\n"
    r"100, 105, 110, . . . , 995." "\n\n"
    r"(995 is the last, because the next multiple of 5 is 1000, which has four digits.)" "\n\n"
    r"This is an A.P. with \(a = 100\), \(d = 5\), \(t_n = 995\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(995 = 100 + (n - 1) \times 5\)" "\n\n"
    r"\(895 = 5(n - 1)\)" "\n\n"
    r"\(n - 1 = 179\)   \(\therefore\) \(n = 180\)" "\n\n"
    r"\(\therefore\) There are 180 three digit natural numbers divisible by 5.")
sol("Ex 3.2 Q7",
    r"\(t_{11} = a + 10d = 16\) . . . (I)" "\n\n"
    r"\(t_{21} = a + 20d = 29\) . . . (II)" "\n\n"
    r"Subtracting (I) from (II): \(10d = 13\)   \(\therefore\) \(d = 1.3\)" "\n\n"
    r"From (I): \(a + 10(1.3) = 16\)   \(\therefore\) \(a + 13 = 16\)   \(\therefore\) \(a = 3\)" "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(t_{41} = 3 + (41 - 1) \times 1.3 = 3 + 40 \times 1.3 = 3 + 52 = 55\)" "\n\n"
    r"\(\therefore\) The \(41^{\text{st}}\) term is 55.")
sol("Ex 3.2 Q8",
    r"Here \(a = 11\) and \(d = 8 - 11 = -3\). Let \(t_n = -151\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(-151 = 11 + (n - 1)(-3)\)" "\n\n"
    r"\(-151 = 11 - 3n + 3\)" "\n\n"
    r"\(-151 = 14 - 3n\)" "\n\n"
    r"\(3n = 14 + 151 = 165\)   \(\therefore\) \(n = 55\)" "\n\n"
    r"Check: \(t_{55} = 11 + 54(-3) = 11 - 162 = -151\). \(\checkmark\)" "\n\n"
    r"\(\therefore\) \(-151\) is the \(55^{\text{th}}\) term.")
sol("Ex 3.2 Q9",
    r"The numbers from 10 to 250 divisible by 4 are" "\n\n"
    r"12, 16, 20, . . . , 248." "\n\n"
    r"(12 is the first, because 10 and 11 are not multiples of 4; 248 is the last, because 252 exceeds "
    r"250.)" "\n\n"
    r"This is an A.P. with \(a = 12\), \(d = 4\), \(t_n = 248\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(248 = 12 + (n - 1) \times 4\)" "\n\n"
    r"\(236 = 4(n - 1)\)" "\n\n"
    r"\(n - 1 = 59\)   \(\therefore\) \(n = 60\)" "\n\n"
    r"\(\therefore\) 60 of them are divisible by 4.")
sol("Ex 3.2 Q10",
    r"Given \(t_{17} = t_{10} + 7\)." "\n\n"
    r"\(t_{17} = a + 16d\) and \(t_{10} = a + 9d\)" "\n\n"
    r"\(\therefore\) \(a + 16d = a + 9d + 7\)" "\n\n"
    r"\(\therefore\) \(7d = 7\)" "\n\n"
    r"\(\therefore\) \(d = 1\)" "\n\n"
    r"\(\therefore\) The common difference is 1. (Note \(a\) cancels, so it is not needed.)")

# ─────────────────────────── Practice Set 3.3 ───────────────────────────
sol("Ex 3.3 Q1",
    r"\(a = 6\), \(d = 3\), \(n = 27\)" "\n\n"
    r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
    r"\(S_{27} = \dfrac{27}{2}[12 + (27 - 1) \times 3]\)" "\n\n"
    r"\(= \dfrac{27}{2}[12 + 78] = \dfrac{27}{2} \times 90\)" "\n\n"
    r"\(= 27 \times 45 = 1215\)" "\n\n"
    r"\(\therefore\) \(S_{27} = 1215\)." "\n\n"
    r"(Filling the printed boxes in order: \(2a\), \(d = 3\), \(90\), \(1215\).)")
sol("Ex 3.3 Q2",
    r"The first 123 even natural numbers are 2, 4, 6, . . . , 246." "\n\n"
    r"Here \(a = 2\), \(d = 2\), \(n = 123\), \(t_n = 2 \times 123 = 246\)." "\n\n"
    + FORMULA_SN2 + "\n\n"
    r"\(S_{123} = \dfrac{123}{2}(2 + 246) = \dfrac{123}{2} \times 248 = 123 \times 124 = 15252\)" "\n\n"
    r"\(\therefore\) The sum is 15252." "\n\n"
    r"(The general result is \(n(n + 1)\), and \(123 \times 124 = 15252\) agrees.)")
sol("Ex 3.3 Q3",
    r"The even numbers **between** 1 and 350 are 2, 4, 6, . . . , 348 — 350 is excluded because the "
    r"word “between” does not include the end value." "\n\n"
    r"Here \(a = 2\), \(d = 2\), \(t_n = 348\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(348 = 2 + (n - 1)2\)   \(\therefore\) \(346 = 2(n - 1)\)   \(\therefore\) \(n = 174\)" "\n\n"
    + FORMULA_SN2 + "\n\n"
    r"\(S_{174} = \dfrac{174}{2}(2 + 348) = 87 \times 350 = 30450\)" "\n\n"
    r"\(\therefore\) The sum is 30450.")
sol("Ex 3.3 Q4",
    r"\(t_{19} = a + 18d = 52\) . . . (I)" "\n\n"
    r"\(t_{38} = a + 37d = 128\) . . . (II)" "\n\n"
    r"Subtracting (I) from (II): \(19d = 76\)   \(\therefore\) \(d = 4\)" "\n\n"
    r"From (I): \(a + 18 \times 4 = 52\)   \(\therefore\) \(a + 72 = 52\)   \(\therefore\) \(a = -20\)" "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{56} = \dfrac{56}{2}[2(-20) + (56 - 1) \times 4]\)" "\n\n"
    r"\(= 28[-40 + 220] = 28 \times 180 = 5040\)" "\n\n"
    r"\(\therefore\) The sum of the first 56 terms is 5040." "\n\n"
    r"[Textbook note: the printed answer key lists this value under the label “5.” and prints no "
    r"“4.” at all for Practice Set 3.3, so its numbering runs 1, 2, 3, 5, 5, 6, 7, 8. The value "
    r"5040 belongs to this question and 2380 to Q5; only the labels are wrong.]")
sol("Ex 3.3 Q5",
    r"Between 1 and 140, the natural numbers divisible by 4 are" "\n\n"
    r"4, 8, 12, . . . , 136." "\n\n"
    r"Here \(a = 4\), \(d = 4\), \(t_n = 136\)." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(136 = 4 + (n - 1) \times 4\)" "\n\n"
    r"\(132 = 4(n - 1)\)   \(\therefore\) \(n - 1 = 33\)   \(\therefore\) \(n = 34\)" "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{34} = \dfrac{34}{2}[2 \times 4 + (34 - 1) \times 4] = 17[8 + 132] = 17 \times 140 = 2380\)" "\n\n"
    r"\(\therefore\) The sum is 2380." "\n\n"
    r"(Filling the printed boxes: \(n = 34\), \(a = 4\), \(d = 4\), \(136 = 4 + (n - 1) \times 4\), "
    r"\(n = 34\), \(S_{34} = \dfrac{34}{2}[8 + 132] = 2380\).)")
sol("Ex 3.3 Q6",
    r"\(S_{55} = 3300\), so with \(n = 55\)" "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(3300 = \dfrac{55}{2}[2a + 54d]\)" "\n\n"
    r"\(3300 = 55[a + 27d]\)" "\n\n"
    r"\(a + 27d = \dfrac{3300}{55} = 60\)" "\n\n"
    r"But \(t_{28} = a + (28 - 1)d = a + 27d\)." "\n\n"
    r"\(\therefore\) \(t_{28} = 60\)." "\n\n"
    r"(\(a\) and \(d\) are not separately determined — only the combination \(a + 27d\) is, and that "
    r"is exactly the \(28^{\text{th}}\) term, the middle term of the 55.)")
sol("Ex 3.3 Q7",
    r"Let the three consecutive terms be \(a - d\), \(a\), \(a + d\)." "\n\n"
    r"Sum: \((a - d) + a + (a + d) = 3a = 27\)   \(\therefore\) \(a = 9\)" "\n\n"
    r"Product: \((9 - d)(9)(9 + d) = 504\)" "\n\n"
    r"\(9(81 - d^2) = 504\)" "\n\n"
    r"\(81 - d^2 = 56\)" "\n\n"
    r"\(d^2 = 25\)   \(\therefore\) \(d = 5\) or \(d = -5\)" "\n\n"
    r"If \(d = 5\) the terms are 4, 9, 14; if \(d = -5\) they are 14, 9, 4." "\n\n"
    r"Check: \(4 + 9 + 14 = 27\) and \(4 \times 9 \times 14 = 504\). \(\checkmark\)" "\n\n"
    r"\(\therefore\) The terms are 4, 9, 14 (or 14, 9, 4).")
sol("Ex 3.3 Q8",
    r"Let the four consecutive terms be \(a - d\), \(a\), \(a + d\), \(a + 2d\)." "\n\n"
    r"Sum: \(4a + 2d = 12\), i.e. \(2a + d = 6\) . . . (I)" "\n\n"
    r"\(3^{\text{rd}} + 4^{\text{th}}\): \((a + d) + (a + 2d) = 2a + 3d = 14\) . . . (II)" "\n\n"
    r"Subtracting (I) from (II): \(2d = 8\)   \(\therefore\) \(d = 4\)" "\n\n"
    r"From (I): \(2a + 4 = 6\)   \(\therefore\) \(a = 1\)" "\n\n"
    r"The terms are \(1 - 4 = -3\), \(1\), \(1 + 4 = 5\), \(1 + 8 = 9\)." "\n\n"
    r"Check: \(-3 + 1 + 5 + 9 = 12\) and \(5 + 9 = 14\). \(\checkmark\)" "\n\n"
    r"\(\therefore\) The four terms are \(-3\), 1, 5, 9.")
sol("Ex 3.3 Q9",
    r"Given \(t_9 = 0\), i.e. \(a + 8d = 0\), so \(a = -8d\)." "\n\n"
    r"\(t_{19} = a + 18d = -8d + 18d = 10d\)" "\n\n"
    r"\(t_{29} = a + 28d = -8d + 28d = 20d\)" "\n\n"
    r"\(\therefore\) \(t_{29} = 20d = 2 \times 10d = 2 \times t_{19}\)" "\n\n"
    r"\(\therefore\) The \(29^{\text{th}}\) term is twice the \(19^{\text{th}}\) term. Hence proved." "\n\n"
    r"(Worth noticing: the result holds for every A.P. whose \(9^{\text{th}}\) term is zero — the "
    r"proof never needs the value of \(a\) or \(d\) separately.)")

# ─────────────────────────── Practice Set 3.4 ───────────────────────────
sol("Ex 3.4 Q1",
    r"Sanika saves \(\text{Rs. }10\) on 1 January, \(\text{Rs. }11\) on 2 January, "
    r"\(\text{Rs. }12\) on 3 January, and so on — an A.P. with \(a = 10\), \(d = 1\)." "\n\n"
    r"**2016 is a leap year** (2016 is divisible by 4 and is not a century year), so from "
    r"1 January to 31 December there are \(n = 366\) days." "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{366} = \dfrac{366}{2}[2 \times 10 + (366 - 1) \times 1]\)" "\n\n"
    r"\(= 183[20 + 365] = 183 \times 385 = 70455\)" "\n\n"
    r"\(\therefore\) Her total saving is \(\text{Rs. }70455\)." "\n\n"
    r"(Taking 365 days instead would give \(\text{Rs. }70080\), so the leap year matters.)")
sol("Ex 3.4 Q2",
    r"Total amount to be repaid \(= 8000 + 1360 = \text{Rs. }9360\), in \(n = 12\) instalments." "\n\n"
    r"Each instalment is \(\text{Rs. }40\) less than the one before, so the instalments are in A.P. "
    r"with \(d = -40\)." "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(9360 = \dfrac{12}{2}[2a + (12 - 1)(-40)]\)" "\n\n"
    r"\(9360 = 6[2a - 440]\)" "\n\n"
    r"\(1560 = 2a - 440\)" "\n\n"
    r"\(2a = 2000\)   \(\therefore\) \(a = 1000\)" "\n\n"
    r"Last instalment \(= t_{12} = a + 11d = 1000 + 11(-40) = 1000 - 440 = 560\)" "\n\n"
    r"\(\therefore\) The first instalment is \(\text{Rs. }1000\) and the last is \(\text{Rs. }560\).")
sol("Ex 3.4 Q3",
    r"The yearly investments are \(5000, 7000, 9000, \ldots\) — an A.P. with \(a = 5000\), "
    r"\(d = 2000\), \(n = 12\)." "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{12} = \dfrac{12}{2}[2 \times 5000 + (12 - 1) \times 2000]\)" "\n\n"
    r"\(= 6[10000 + 22000] = 6 \times 32000 = 192000\)" "\n\n"
    r"\(\therefore\) He invested \(\text{Rs. }1{,}92{,}000\) in 12 years.")
sol("Ex 3.4 Q4",
    r"The seats per row are \(20, 22, 24, \ldots\) — an A.P. with \(a = 20\), \(d = 2\), and there are "
    r"\(n = 27\) rows." "\n\n"
    + FORMULA_TN + "\n\n"
    r"\(t_{15} = 20 + (15 - 1) \times 2 = 20 + 28 = 48\)" "\n\n"
    r"So the \(15^{\text{th}}\) row has 48 seats." "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{27} = \dfrac{27}{2}[2 \times 20 + (27 - 1) \times 2] = \dfrac{27}{2}[40 + 52] "
    r"= \dfrac{27}{2} \times 92 = 27 \times 46 = 1242\)" "\n\n"
    r"\(\therefore\) There are 48 seats in the \(15^{\text{th}}\) row and 1242 seats in the "
    r"auditorium.")
sol("Ex 3.4 Q5",
    r"Let Monday's temperature be \(a\) and the common difference \(d\), so the six readings "
    r"Monday to Saturday are \(t_1, t_2, \ldots, t_6\)." "\n\n"
    r"Given, as printed: (Monday + Saturday) is \(5^\circ\) more than (Tuesday + Saturday)." "\n\n"
    r"\(t_1 + t_6 = t_2 + t_6 + 5\)" "\n\n"
    r"Saturday appears on both sides and cancels:" "\n\n"
    r"\(t_1 = t_2 + 5\)   \(\therefore\) \(a = (a + d) + 5\)   \(\therefore\) \(d = -5\)" "\n\n"
    r"Wednesday is the third reading: \(t_3 = a + 2d = -30\)" "\n\n"
    r"\(a + 2(-5) = -30\)   \(\therefore\) \(a - 10 = -30\)   \(\therefore\) \(a = -20\)" "\n\n"
    r"So the six readings are" "\n\n"
    r"| Day | Mon | Tue | Wed | Thu | Fri | Sat |" "\n"
    r"|---|---|---|---|---|---|---|" "\n"
    r"| Temperature (\(^\circ\)C) | -20 | -25 | -30 | -35 | -40 | -45 |" "\n\n"
    r"\(\therefore\) The other five days are \(-20^\circ\), \(-25^\circ\), \(-35^\circ\), "
    r"\(-40^\circ\) and \(-45^\circ\) C (Wednesday being the given \(-30^\circ\) C).")
sol("Ex 3.4 Q6",
    r"The rows hold \(1, 2, 3, \ldots\) trees — an A.P. with \(a = 1\), \(d = 1\), \(n = 25\)." "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{25} = \dfrac{25}{2}[2 \times 1 + (25 - 1) \times 1] = \dfrac{25}{2}[2 + 24] "
    r"= \dfrac{25}{2} \times 26 = 25 \times 13 = 325\)" "\n\n"
    r"\(\therefore\) 325 trees are planted in the 25 rows." "\n\n"
    r"(This is the sum of the first 25 natural numbers, \(\dfrac{25 \times 26}{2} = 325\).)")

# ─────────────────────────── Problem Set 3 ───────────────────────────
sol("PS3 Q2",
    r"The A.P. is \(-11, -8, -5, \ldots, 49\) with \(a = -11\), \(d = 3\)." "\n\n"
    r"Counting from the END, the terms are \(49\), \(49 - 3 = 46\), \(46 - 3 = 43\), "
    r"\(43 - 3 = 40\)." "\n\n"
    r"\(\therefore\) The fourth term from the end is 40." "\n\n"
    r"(Equivalently: reverse the A.P., so \(a' = 49\), \(d' = -3\), and "
    r"\(t_4' = 49 + 3(-3) = 40\).)")
sol("PS3 Q3",
    r"\(t_{10} = a + 9d = 46\) . . . (I)" "\n\n"
    r"\(t_5 + t_7 = (a + 4d) + (a + 6d) = 2a + 10d = 52\), i.e. \(a + 5d = 26\) . . . (II)" "\n\n"
    r"Subtracting (II) from (I): \(4d = 20\)   \(\therefore\) \(d = 5\)" "\n\n"
    r"From (II): \(a + 25 = 26\)   \(\therefore\) \(a = 1\)" "\n\n"
    r"\(\therefore\) The A.P. is \(1, 6, 11, 16, \ldots\)" "\n\n"
    r"Check: \(t_{10} = 1 + 9 \times 5 = 46\), and \(t_5 + t_7 = 21 + 31 = 52\). \(\checkmark\)")
sol("PS3 Q4",
    r"\(t_4 = a + 3d = -15\) . . . (I)" "\n\n"
    r"\(t_9 = a + 8d = -30\) . . . (II)" "\n\n"
    r"Subtracting (I) from (II): \(5d = -15\)   \(\therefore\) \(d = -3\)" "\n\n"
    r"From (I): \(a + 3(-3) = -15\)   \(\therefore\) \(a - 9 = -15\)   \(\therefore\) \(a = -6\)" "\n\n"
    + FORMULA_SN + "\n\n"
    r"\(S_{10} = \dfrac{10}{2}[2(-6) + (10 - 1)(-3)] = 5[-12 - 27] = 5 \times (-39) = -195\)" "\n\n"
    r"\(\therefore\) The sum of the first 10 terms is \(-195\).")
sol("PS3 Q5",
    r"For \(9, 7, 5, \ldots\): \(a = 9\), \(d = -2\), so \(t_n = 9 + (n - 1)(-2) = 11 - 2n\)." "\n\n"
    r"For \(24, 21, 18, \ldots\): \(a = 24\), \(d = -3\), so \(t_n = 24 + (n - 1)(-3) = 27 - 3n\)." "\n\n"
    r"Equating: \(11 - 2n = 27 - 3n\)" "\n\n"
    r"\(3n - 2n = 27 - 11\)   \(\therefore\) \(n = 16\)" "\n\n"
    r"\(t_{16} = 11 - 2 \times 16 = 11 - 32 = -21\)" "\n\n"
    r"Check in the second A.P.: \(27 - 3 \times 16 = 27 - 48 = -21\). \(\checkmark\)" "\n\n"
    r"\(\therefore\) \(n = 16\) and the common term is \(-21\).")
sol("PS3 Q6",
    r"\(t_3 + t_8 = (a + 2d) + (a + 7d) = 2a + 9d = 7\) . . . (I)" "\n\n"
    r"\(t_7 + t_{14} = (a + 6d) + (a + 13d) = 2a + 19d = -3\) . . . (II)" "\n\n"
    r"Subtracting (I) from (II): \(10d = -10\)   \(\therefore\) \(d = -1\)" "\n\n"
    r"From (I): \(2a + 9(-1) = 7\)   \(\therefore\) \(2a = 16\)   \(\therefore\) \(a = 8\)" "\n\n"
    r"\(t_{10} = a + 9d = 8 + 9(-1) = -1\)" "\n\n"
    r"\(\therefore\) The \(10^{\text{th}}\) term is \(-1\).")
sol("PS3 Q7",
    r"Here \(a = -5\), last term \(t_n = 45\) and \(S_n = 120\)." "\n\n"
    r"Use the form that needs only the two end terms:" "\n\n"
    + FORMULA_SN2 + "\n\n"
    r"\(120 = \dfrac{n}{2}(-5 + 45) = \dfrac{n}{2} \times 40 = 20n\)" "\n\n"
    r"\(\therefore\) \(n = 6\)" "\n\n"
    r"Now use \(t_n = a + (n - 1)d\) with \(n = 6\):" "\n\n"
    r"\(45 = -5 + 5d\)   \(\therefore\) \(5d = 50\)   \(\therefore\) \(d = 10\)" "\n\n"
    r"\(\therefore\) There are 6 terms and the common difference is 10 "
    r"(the A.P. is \(-5, 5, 15, 25, 35, 45\)).")
sol("PS3 Q8",
    r"The sum of the first \(n\) natural numbers is \(\dfrac{n(n + 1)}{2}\)." "\n\n"
    r"\(\dfrac{n(n + 1)}{2} = 36\)" "\n\n"
    r"\(n(n + 1) = 72\)" "\n\n"
    r"\(n^2 + n - 72 = 0\)" "\n\n"
    r"\((n + 9)(n - 8) = 0\)   \(\therefore\) \(n = -9\) or \(n = 8\)" "\n\n"
    r"\(n\) is a count of terms, so it must be a natural number and \(n = -9\) is rejected." "\n\n"
    r"\(\therefore\) \(n = 8\). (Check: \(1 + 2 + \cdots + 8 = 36\).)")
sol("PS3 Q9",
    r"Let the three parts be \(a - d\), \(a\), \(a + d\)." "\n\n"
    r"Sum: \((a - d) + a + (a + d) = 3a = 207\)   \(\therefore\) \(a = 69\)" "\n\n"
    r"Taking \(d > 0\), the two smaller parts are \(a - d\) and \(a\)." "\n\n"
    r"Product: \((69 - d) \times 69 = 4623\)" "\n\n"
    r"\(69 - d = \dfrac{4623}{69} = 67\)   \(\therefore\) \(d = 2\)" "\n\n"
    r"\(\therefore\) The three parts are 67, 69 and 71." "\n\n"
    r"Check: \(67 + 69 + 71 = 207\) and \(67 \times 69 = 4623\). \(\checkmark\)")
sol("PS3 Q10",
    r"With 37 terms, the three terms exactly in the middle are \(t_{18}, t_{19}, t_{20}\) "
    r"(18 terms before them and 18 after)." "\n\n"
    r"Their sum \(= 3t_{19} = 225\)   \(\therefore\) \(t_{19} = a + 18d = 75\) . . . (I)" "\n\n"
    r"The last three terms are \(t_{35}, t_{36}, t_{37}\), whose sum \(= 3t_{36} = 429\)" "\n\n"
    r"\(\therefore\) \(t_{36} = a + 35d = 143\) . . . (II)" "\n\n"
    r"Subtracting (I) from (II): \(17d = 68\)   \(\therefore\) \(d = 4\)" "\n\n"
    r"From (I): \(a + 72 = 75\)   \(\therefore\) \(a = 3\)" "\n\n"
    r"Last term \(t_{37} = 3 + 36 \times 4 = 147\)." "\n\n"
    r"\(\therefore\) The A.P. is \(3, 7, 11, \ldots, 147\)." "\n\n"
    r"(Both shortcuts used the same fact: in any A.P. the sum of three consecutive terms is three "
    r"times the middle one.)")
sol("PS3 Q11",
    r"Let the A.P. have first term \(a\), second term \(b\) and \(n\) terms in all, the last being "
    r"\(c\)." "\n\n"
    r"Common difference \(d = b - a\)." "\n\n"
    r"Last term: \(c = a + (n - 1)d = a + (n - 1)(b - a)\)" "\n\n"
    r"\(\therefore\) \(n - 1 = \dfrac{c - a}{b - a}\)   \(\therefore\) "
    r"\(n = \dfrac{c - a}{b - a} + 1 = \dfrac{c - a + b - a}{b - a} = \dfrac{b + c - 2a}{b - a}\)" "\n\n"
    r"Now use the first-plus-last form of the sum:" "\n\n"
    r"\(S_n = \dfrac{n}{2}(\text{first term} + \text{last term}) = \dfrac{n}{2}(a + c)\)" "\n\n"
    r"Substituting \(n\):" "\n\n"
    r"\(S_n = \dfrac{1}{2} \times \dfrac{b + c - 2a}{b - a} \times (a + c) "
    r"= \dfrac{(a + c)(b + c - 2a)}{2(b - a)}\)" "\n\n"
    r"Hence proved. (\(b \neq a\) is needed, i.e. the common difference is not zero.)")
sol("PS3 Q12",
    r"Let the A.P. have first term \(a\) and common difference \(d\)." "\n\n"
    r"\(S_p = \dfrac{p}{2}[2a + (p - 1)d]\) and \(S_q = \dfrac{q}{2}[2a + (q - 1)d]\)" "\n\n"
    r"Given \(S_p = S_q\):" "\n\n"
    r"\(\dfrac{p}{2}[2a + (p - 1)d] = \dfrac{q}{2}[2a + (q - 1)d]\)" "\n\n"
    r"\(2a(p - q) + d[p(p - 1) - q(q - 1)] = 0\)" "\n\n"
    r"\(p(p - 1) - q(q - 1) = p^2 - q^2 - (p - q) = (p - q)(p + q - 1)\)" "\n\n"
    r"\(\therefore\) \((p - q)\{2a + (p + q - 1)d\} = 0\)" "\n\n"
    r"Since \(p \neq q\), \(p - q \neq 0\), so" "\n\n"
    r"\(2a + (p + q - 1)d = 0\) . . . (I)" "\n\n"
    r"Now" "\n\n"
    r"\(S_{p+q} = \dfrac{p + q}{2}[2a + (p + q - 1)d] = \dfrac{p + q}{2} \times 0 = 0\)" "\n\n"
    r"Hence the sum of the first \((p + q)\) terms is zero. Hence proved.")
sol("PS3 Q13",
    r"Let the A.P. have first term \(a\) and common difference \(d\), so "
    r"\(t_m = a + (m - 1)d\) and \(t_n = a + (n - 1)d\)." "\n\n"
    r"Given \(m\,t_m = n\,t_n\):" "\n\n"
    r"\(m[a + (m - 1)d] = n[a + (n - 1)d]\)" "\n\n"
    r"\(a(m - n) + d[m(m - 1) - n(n - 1)] = 0\)" "\n\n"
    r"\(m(m - 1) - n(n - 1) = m^2 - n^2 - (m - n) = (m - n)(m + n - 1)\)" "\n\n"
    r"\(\therefore\) \((m - n)\{a + (m + n - 1)d\} = 0\)" "\n\n"
    r"For the statement to have content \(m \neq n\), so \(m - n \neq 0\) and" "\n\n"
    r"\(a + (m + n - 1)d = 0\)" "\n\n"
    r"But \(t_{m+n} = a + (m + n - 1)d\)." "\n\n"
    r"\(\therefore\) \(t_{m+n} = 0\), i.e. the \((m + n)^{\text{th}}\) term is zero. Hence proved.")
sol("PS3 Q14",
    r"Simple interest \(= \dfrac{P \times R \times N}{100}\) with \(P = 1000\) and \(R = 10\)." "\n\n"
    r"Simple interest after 1 year \(= \dfrac{1000 \times 10 \times 1}{100} = 100\)" "\n\n"
    r"Simple interest after 2 years \(= \dfrac{1000 \times 10 \times 2}{100} = 200\)" "\n\n"
    r"Simple interest after 3 years \(= \dfrac{1000 \times 10 \times 3}{100} = 300\)" "\n\n"
    r"According to this the simple interest for 4, 5, 6 years will be 400, **500**, **600** "
    r"respectively." "\n\n"
    r"The totals \(100, 200, 300, 400, \ldots\) have a constant difference of 100, so they are in "
    r"A.P." "\n\n"
    r"From this \(d = 100\) and \(a = 100\)." "\n\n"
    r"Amount of simple interest after 20 years:" "\n\n"
    r"\(t_n = a + (n - 1)d\)" "\n\n"
    r"\(t_{20} = 100 + (20 - 1) \times 100\)" "\n\n"
    r"\(t_{20} = 100 + 1900 = 2000\)" "\n\n"
    r"\(\therefore\) The amount of simple interest after 20 years is \(\text{Rs. }2000\)." "\n\n"
    r"(Directly: \(\dfrac{1000 \times 10 \times 20}{100} = 2000\), which agrees.)")

# ── join onto the dump BY REF, asserting the id/ref pairing survives ──
dump = json.load(open(os.path.join(HERE, f"{ID}.all.topaper.json"), encoding="utf-8"))
by_ref = {r["ref"]: r for r in dump}
assert len(by_ref) == len(dump), "duplicate ref in the dump"

missing_sol = [r["ref"] for r in dump if r["ref"] not in S]
extra_sol = [k for k in S if k not in by_ref]
assert not missing_sol, f"no solution authored for: {missing_sol}"
assert not extra_sol, f"solution authored for a ref not in the dump: {extra_sol}"

out = []
for r in dump:
    row = {"id": r["id"], "ref": r["ref"], "solution": S[r["ref"]]}
    # the pairing gate: this row's id must still be the dump's id FOR THIS REF
    assert by_ref[row["ref"]]["id"] == row["id"], f"id/ref pairing broken at {row['ref']}"
    out.append(row)
assert len(out) == len(dump) == 59, len(out)
assert len({r["id"] for r in out}) == 59

path = os.path.join(HERE, f"{ID}.all.solutions.json")
with open(path, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write("\n")
print(f"wrote {len(out)} solutions -> {path}")
print("id/ref pairing verified for all 59 rows")
