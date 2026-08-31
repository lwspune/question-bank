# Part A of the alg-arithmetic-progression-10 transcription: blocks 1-4.
# (Solved examples under "Arithmetic Progression", Practice Set 3.1,
#  Solved examples under "nth term of an A.P.", Practice Set 3.2)
# Transcribed from the rendered page images out/alg-arithmetic-progression-10/p-64..p-89.png.

CONCEPT = "Concept of Arithmetic Progression"
CD = "Common Difference of an A.P."
NTH = "nth Term of an A.P."
SUM = "Sum of n Terms of an A.P."
WORD = "Word Problems and Applications"


def q(ref, bucket, subtopic, difficulty, stem, **kw):
    row = {
        "ref": ref,
        "bucket": bucket,
        "format": kw.pop("format", "subjective"),
        "subtopic": subtopic,
        "difficulty": difficulty,
        "stem": stem,
    }
    for k in ("context", "setLabel", "options", "answer", "solution", "note"):
        if k in kw and kw[k] is not None:
            row[k] = kw[k]
    return row


ROWS = []

# ── Block 1 — Solved examples, printed under the "Arithmetic Progression"
#    heading (printed pp 59-61).
CTX1 = "Which of the following sequences are A.P ? If it is an A.P, find next two terms."
S1 = "Arithmetic Progression SolvedEx.1"
ROWS += [
    q(S1 + " (i)", "solved", CONCEPT, "EASY", r"5, 12, 19, 26, . . .",
      context=CTX1, setLabel=S1,
      solution=(
          r"In this sequence 5, 12, 19, 26, . . . ," "\n\n"
          r"First term \(= t_1 = 5\), \(t_2 = 12\), \(t_3 = 19\), . . ." "\n\n"
          r"\(t_2 - t_1 = 12 - 5 = 7\)" "\n\n"
          r"\(t_3 - t_2 = 19 - 12 = 7\)" "\n\n"
          r"Here first term is 5 and common difference which is constant is \(d = 7\)" "\n\n"
          r"\(\therefore\) This sequence is an A.P." "\n\n"
          r"Next two terms in this A.P. are \(26 + 7 = 33\) and \(33 + 7 = 40\)." "\n\n"
          r"Next two terms in given A.P. are 33 and 40"
      )),
    q(S1 + " (ii)", "solved", CONCEPT, "EASY", r"2, -2, -6, -10, . . .",
      context=CTX1, setLabel=S1,
      solution=(
          r"In the sequence 2, -2, -6, -10, . . . ," "\n\n"
          r"\(t_1 = 2\), \(t_2 = -2\), \(t_3 = -6\), \(t_4 = -10\) . . ." "\n\n"
          r"\(t_2 - t_1 = -2 - 2 = -4\)" "\n\n"
          r"\(t_3 - t_2 = -6 - (-2) = -6 + 2 = -4\)" "\n\n"
          r"\(t_4 - t_3 = -10 - (-6) = -10 + 6 = -4\)" "\n\n"
          r"From this difference between two consecutive terms that is \(t_n - t_{n-1} = -4\)" "\n\n"
          r"\(\therefore\) \(d = -4\), which is constant. \(\therefore\) It is an A.P." "\n\n"
          r"Next two terms in this A.P. are \((-10) + (-4) = -14\) and \((-14) + (-4) = -18\)"
      )),
    q(S1 + " (iii)", "solved", CONCEPT, "EASY", r"1, 1, 2, 2, 3, 3, . . .",
      context=CTX1, setLabel=S1,
      solution=(
          r"In the sequence 1, 1, 2, 2, 3, 3, . . . ," "\n\n"
          r"\(t_1 = 1\), \(t_2 = 1\), \(t_3 = 2\), \(t_4 = 2\), \(t_5 = 3\), \(t_6 = 3\) . . ." "\n\n"
          r"\(t_2 - t_1 = 1 - 1 = 0\)   \(t_3 - t_2 = 2 - 1 = 1\)" "\n\n"
          r"\(t_4 - t_3 = 2 - 2 = 0\)   \(t_3 - t_2 \neq t_2 - t_1\)" "\n\n"
          r"In this sequence difference between two consecutive terms is not constant." "\n\n"
          r"\(\therefore\) This sequence is not an A.P."
      )),
    q(S1 + " (iv)", "solved", CONCEPT, "MODERATE",
      r"\(\dfrac{3}{2}\), \(\dfrac{1}{2}\), \(-\dfrac{1}{2}\), . . .",
      context=CTX1, setLabel=S1,
      solution=(
          r"In the sequence \(\dfrac{3}{2}\), \(\dfrac{1}{2}\), \(-\dfrac{1}{2}\), \(-\dfrac{3}{2}\), . . . ," "\n\n"
          r"\(t_1 = \dfrac{3}{2}\), \(t_2 = \dfrac{1}{2}\), \(t_3 = -\dfrac{1}{2}\), \(t_4 = -\dfrac{3}{2}\) . . ." "\n\n"
          r"\(t_2 - t_1 = \dfrac{1}{2} - \dfrac{3}{2} = -\dfrac{2}{2} = -1\)" "\n\n"
          r"\(t_3 - t_2 = -\dfrac{1}{2} - \dfrac{1}{2} = -\dfrac{2}{2} = -1\)" "\n\n"
          r"\(t_4 - t_3 = -\dfrac{3}{2} - \left(-\dfrac{1}{2}\right) = -\dfrac{3}{2} + \dfrac{1}{2} = -\dfrac{2}{2} = -1\)" "\n\n"
          r"Here the common difference \(d = -1\) which is constant." "\n\n"
          r"\(\therefore\) Given sequence is an A.P. Let's find next two terms of this A.P." "\n\n"
          r"\(-\dfrac{3}{2} - 1 = -\dfrac{5}{2}\),   \(-\dfrac{5}{2} - 1 = -\dfrac{7}{2}\)" "\n\n"
          r"\(\therefore\) Next two terms are \(-\dfrac{5}{2}\) and \(-\dfrac{7}{2}\)"
      ),
      note=("The book's printed solution writes the fourth line of working for this item as "
            "“5/2 - 1 = -7/2”; the quantity being reduced is -5/2, so it is a sign "
            "misprint in the printed working. The stated next two terms (-5/2 and -7/2) are correct.")),
]

CTX2 = "The first term \\(a\\) and common difference \\(d\\) are given. Find first four terms of A.P."
S2 = "Arithmetic Progression SolvedEx.2"
ROWS += [
    q(S2 + " (i)", "solved", CD, "EASY", r"\(a = -3\), \(d = 4\)",
      context=CTX2, setLabel=S2,
      solution=(
          r"Given \(a = -3\), \(d = 4\)" "\n\n"
          r"\(t_1 = -3\)" "\n\n"
          r"\(t_2 = t_1 + d = -3 + 4 = 1\)" "\n\n"
          r"\(t_3 = t_2 + d = 1 + 4 = 5\)" "\n\n"
          r"\(t_4 = t_3 + d = 5 + 4 = 9\)" "\n\n"
          r"\(\therefore\) A.P. is \(= -3,\ 1,\ 5,\ 9,\ \ldots\)"
      )),
    q(S2 + " (ii)", "solved", CD, "EASY", r"\(a = 200\), \(d = 7\)",
      context=CTX2, setLabel=S2,
      solution=(
          r"Given \(a = 200\), \(d = 7\)" "\n\n"
          r"\(a = t_1 = 200\)" "\n\n"
          r"\(t_2 = t_1 + d = 200 + 7 = 207\)" "\n\n"
          r"\(t_3 = t_2 + d = 207 + 7 = 214\)" "\n\n"
          r"\(t_4 = t_3 + d = 214 + 7 = 221\)" "\n\n"
          r"\(\therefore\) A.P. is \(= 200,\ 207,\ 214,\ 221,\ \ldots\)"
      )),
    q(S2 + " (iii)", "solved", CD, "MODERATE", r"\(a = -1\), \(d = -\dfrac{1}{2}\)",
      context=CTX2, setLabel=S2,
      solution=(
          r"\(a = t_1 = -1\)" "\n\n"
          r"\(t_2 = t_1 + d = -1 + \left(-\dfrac{1}{2}\right) = -\dfrac{3}{2}\)" "\n\n"
          r"\(t_3 = t_2 + d = -\dfrac{3}{2} + \left(-\dfrac{1}{2}\right) = -\dfrac{4}{2} = -2\)" "\n\n"
          r"\(t_4 = t_3 + d = -2 + \left(-\dfrac{1}{2}\right) = -2 - \dfrac{1}{2} = -\dfrac{5}{2}\)" "\n\n"
          r"\(\therefore\) A.P. is \(= -1,\ -\dfrac{3}{2},\ -2,\ -\dfrac{5}{2},\ \ldots\)"
      )),
    q(S2 + " (iv)", "solved", CD, "EASY", r"\(a = 8\), \(d = -5\)",
      context=CTX2, setLabel=S2,
      solution=(
          r"\(a = t_1 = 8\)" "\n\n"
          r"\(t_2 = t_1 + d = 8 + (-5) = 3\)" "\n\n"
          r"\(t_3 = t_2 + d = 3 + (-5) = -2\)" "\n\n"
          r"\(t_4 = t_3 + d = -2 + (-5) = -7\)" "\n\n"
          r"\(8,\ 3,\ -2,\ -7,\ \ldots\)" "\n\n"
          r"\(\therefore\) A.P. is \(= 8,\ 3,\ -2,\ -7,\ \ldots\)"
      )),
]

# ── Block 2 — Practice Set 3.1 (printed pp 61-62).
CTX_31_1 = "Which of the following sequences are A.P. ? If they are A.P. find the common difference ."
SET_31_1 = "Ex 3.1 Q1"
_p31q1 = [
    ("(1)", r"2, 4, 6, 8, . . .", "EASY"),
    ("(2)", r"2, \(\dfrac{5}{2}\), 3, \(\dfrac{7}{3}\), . . .", "MODERATE"),
    ("(3)", r"-10, -6, -2, 2, . . .", "EASY"),
    ("(4)", r"0.3, 0.33, .0333, . . .", "EASY"),
    ("(5)", r"0, -4, -8, -12, . . .", "EASY"),
    ("(6)", r"\(-\dfrac{1}{5}\), \(-\dfrac{1}{5}\), \(-\dfrac{1}{5}\), . . .", "EASY"),
    ("(7)", r"3, \(3 + \sqrt{2}\), \(3 + 2\sqrt{2}\), \(3 + 3\sqrt{2}\), . . .", "MODERATE"),
    ("(8)", r"127, 132, 137, . . .", "EASY"),
]
for lab, stem, diff in _p31q1:
    note = None
    if lab == "(2)":
        note = ("The book prints the fourth term as 7/3 (confirmed at 4.5x magnification on the "
                "rendered page); with 7/3 the sequence is NOT an A.P. (differences +1/2, +1/2, -2/3). "
                "The printed answer key gives “Yes, d = 1/2”, which holds only if the fourth "
                "term is 7/2 — so the printed stem is a misprint for 7/2.")
    if lab == "(4)":
        note = ("The book prints the third term as “.0333” with a leading decimal point and no "
                "zero (confirmed at 4.5x magnification), i.e. 0.0333; the intended term is almost "
                "certainly 0.333. The answer is “No” under either reading, so nothing turns on it.")
    ROWS.append(q("Ex 3.1 Q1" + lab, "exercise-subjective", CONCEPT, diff, stem,
                  context=CTX_31_1, setLabel=SET_31_1, note=note))

CTX_31_2 = ("Write an A.P. whose first term is \\(a\\) and common difference is \\(d\\) in each of the "
            "following.")
SET_31_2 = "Ex 3.1 Q2"
_p31q2 = [
    ("(1)", r"\(a = 10\), \(d = 5\)"),
    ("(2)", r"\(a = -3\), \(d = 0\)"),
    ("(3)", r"\(a = -7\), \(d = \dfrac{1}{2}\)"),
    ("(4)", r"\(a = -1.25\), \(d = 3\)"),
    ("(5)", r"\(a = 6\), \(d = -3\)"),
    ("(6)", r"\(a = -19\), \(d = -4\)"),
]
for lab, stem in _p31q2:
    ROWS.append(q("Ex 3.1 Q2" + lab, "exercise-subjective", CD, "EASY", stem,
                  context=CTX_31_2, setLabel=SET_31_2))

CTX_31_3 = "Find the first term and common difference for each of the A.P."
SET_31_3 = "Ex 3.1 Q3"
_p31q3 = [
    ("(1)", r"5, 1, -3, -7, . . ."),
    ("(2)", r"0.6, 0.9, 1.2, 1.5, . . ."),
    ("(3)", r"127, 135, 143, 151, . . ."),
    ("(4)", r"\(\dfrac{1}{4}\), \(\dfrac{3}{4}\), \(\dfrac{5}{4}\), \(\dfrac{7}{4}\), . . ."),
]
for lab, stem in _p31q3:
    ROWS.append(q("Ex 3.1 Q3" + lab, "exercise-subjective", CD, "EASY", stem,
                  context=CTX_31_3, setLabel=SET_31_3))

# ── Block 3 — Solved examples, printed under the "nth term of an A. P."
#    heading (printed pp 64-65).
S3 = "nth term of an A.P. SolvedEx."
ROWS += [
    q(S3 + "1", "solved", NTH, "EASY",
      r"Find \(t_n\) for following A.P. and then find \(30^{\text{th}}\) term of A.P." "\n\n"
      r"3, 8, 13, 18, . . .",
      solution=(
          r"Given A.P. 3, 8, 13, 18, . . ." "\n\n"
          r"Here \(t_1 = 3\), \(t_2 = 8\), \(t_3 = 13\), \(t_4 = 18\), . . ." "\n\n"
          r"\(d = t_2 - t_1 = 8 - 3 = 5\)" "\n\n"
          r"We know that \(t_n = a + (n - 1)d\)" "\n\n"
          r"\(\therefore\) \(t_n = 3 + (n - 1) \times 5\)   \(\because\) \(a = 3\), \(d = 5\)" "\n\n"
          r"\(\therefore\) \(t_n = 3 + 5n - 5\)" "\n\n"
          r"\(\therefore\) \(t_n = 5n - 2\)" "\n\n"
          r"\(\therefore\) \(30^{\text{th}}\) term \(= t_{30} = 5 \times 30 - 2 = 150 - 2 = 148\)"
      )),
    q(S3 + "2", "solved", NTH, "EASY",
      r"Which term of the following A.P. is 560 ?" "\n\n" r"2, 11, 20, 29, . . .",
      solution=(
          r"Given A.P. 2, 11, 20, 29, . ." "\n\n"
          r"Here \(a = 2\), \(d = 11 - 2 = 9\)" "\n\n"
          r"\(n^{\text{th}}\) term of this A.P. is 560." "\n\n"
          r"\(t_n = a + (n - 1)d\)" "\n\n"
          r"\(\therefore\) \(560 = 2 + (n - 1) \times 9\)" "\n\n"
          r"\(= 2 + 9n - 9\)" "\n\n"
          r"\(\therefore\) \(9n = 567\)" "\n\n"
          r"\(\therefore\) \(n = \dfrac{567}{9} = 63\)" "\n\n"
          r"\(\therefore\) \(63^{\text{rd}}\) term of given A.P. is 560."
      )),
    q(S3 + "3", "solved", NTH, "MODERATE",
      r"Check whether 301 is in the sequence 5, 11, 17, 23, . . . ?",
      solution=(
          r"In the sequence 5, 11, 17, 23, . . ." "\n\n"
          r"\(t_1 = 5\), \(t_2 = 11\), \(t_3 = 17\), \(t_4 = 23\), . . ." "\n\n"
          r"\(t_2 - t_1 = 11 - 5 = 6\)" "\n\n"
          r"\(t_3 - t_2 = 17 - 11 = 6\)" "\n\n"
          r"\(\therefore\) This sequence is an A.P." "\n\n"
          r"First term \(a = 5\) and \(d = 6\)" "\n\n"
          r"If 301 is \(n^{\text{th}}\) term, then." "\n\n"
          r"\(t_n = a + (n - 1)d = 301\)" "\n\n"
          r"\(\therefore\) \(301 = 5 + (n - 1) \times 6\)" "\n\n"
          r"\(= 5 + 6n - 6\)" "\n\n"
          r"\(\therefore\) \(6n = 301 + 1 = 302\)" "\n\n"
          r"\(\therefore\) \(n = \dfrac{302}{6}\). But it is not an integer." "\n\n"
          r"\(\therefore\) 301 is not in the given sequence."
      )),
    q(S3 + "4", "solved", NTH, "MODERATE",
      r"How many two digit numbers are divisible by 4 ?",
      solution=(
          r"List of two digit numbers divisible by 4 is" "\n\n"
          r"12, 16, 20, 24, . . . , 96." "\n\n"
          r"Let's find how many such numbers are there." "\n\n"
          r"\(t_n = 96\),   \(a = 12\),   \(d = 4\)" "\n\n"
          r"From this we will find the value of \(n\)." "\n\n"
          r"\(t_n = 96\), \(\therefore\) By formula," "\n\n"
          r"\(96 = 12 + (n - 1) \times 4\)" "\n\n"
          r"\(= 12 + 4n - 4\)" "\n\n"
          r"\(\therefore\) \(4n = 88\)" "\n\n"
          r"\(\therefore\) \(n = 22\)" "\n\n"
          r"\(\therefore\) There are 22 two digit numbers divisible by 4."
      )),
    q(S3 + "5", "solved", NTH, "MODERATE",
      r"The \(10^{\text{th}}\) term and the \(18^{\text{th}}\) term of an A.P. are 25 and 41 "
      r"respectively then find \(38^{\text{th}}\) term of that A.P., similarly if "
      r"\(n^{\text{th}}\) term is 99. Find the value of \(n\).",
      solution=(
          r"In the given A.P. \(t_{10} = 25\) and \(t_{18} = 41\)." "\n\n"
          r"We know that, \(t_n = a + (n - 1)d\)" "\n\n"
          r"\(\therefore\) \(t_{10} = a + (10 - 1)d\)" "\n\n"
          r"\(\therefore\) \(25 = a + 9d\) . . . (I)" "\n\n"
          r"Similarly \(t_{18} = a + (18 - 1)d\)" "\n\n"
          r"\(\therefore\) \(41 = a + 17d\) . . . (II)" "\n\n"
          r"\(25 = a + 9d\) . . . From (I) ." "\n\n"
          r"\(a = 25 - 9d\)" "\n\n"
          r"Substituting this value in equation II." "\n\n"
          r"\(\therefore\) Equation (II) \(a + 17d = 41\)" "\n\n"
          r"\(\therefore\) \(25 - 9d + 17d = 41\)" "\n\n"
          r"\(8d = 41 - 25 = 16\)" "\n\n"
          r"\(d = 2\)" "\n\n"
          r"Substituting \(d = 2\) in equation I." "\n\n"
          r"\(a + 9d = 25\)" "\n\n"
          r"\(\therefore\) \(a + 9 \times 2 = 25\)" "\n\n"
          r"\(\therefore\) \(a + 18 = 25\)   \(\therefore\) \(a = 7\)" "\n\n"
          r"Now, \(t_n = a + (n - 1)d\)" "\n\n"
          r"\(\therefore\) \(t_{38} = 7 + (38 - 1) \times 2 = 7 + 37 \times 2 = 7 + 74 = 81\)" "\n\n"
          r"If \(n^{\text{th}}\) term is 99, then to find value of \(n\)." "\n\n"
          r"\(t_n = a + (n - 1)d\)" "\n\n"
          r"\(99 = 7 + (n - 1) \times 2\)" "\n\n"
          r"\(99 = 7 + 2n - 2\)" "\n\n"
          r"\(99 = 5 + 2n\)" "\n\n"
          r"\(\therefore\) \(2n = 94\)" "\n\n"
          r"\(\therefore\) \(n = 47\)" "\n\n"
          r"\(\therefore\) In the given progression \(38^{\text{th}}\) term is 81 and 99 is the "
          r"\(47^{\text{th}}\) term."
      )),
]

# ── Block 4 — Practice Set 3.2 (printed p 66).
CTX_32_1 = "Write the correct number in the given boxes from the following A. P."
SET_32_1 = "Ex 3.2 Q1"
_p32q1 = [
    ("(i)", r"1, 8, 15, 22, . . ." "\n\n"
            r"Here \(a = \square\), \(t_1 = \square\), \(t_2 = \square\), \(t_3 = \square\)," "\n\n"
            r"\(t_2 - t_1 = \square - \square = \square\)" "\n\n"
            r"\(t_3 - t_2 = \square - \square = \square\)   \(\therefore\) \(d = \square\)"),
    ("(ii)", r"3, 6, 9, 12, . . ." "\n\n"
             r"Here \(t_1 = \square\), \(t_2 = \square\), \(t_3 = \square\), \(t_4 = \square\)," "\n\n"
             r"\(t_2 - t_1 = \square\), \(t_3 - t_2 = \square\)   \(\therefore\) \(d = \square\)"),
    ("(iii)", r"-3, -8, -13, -18, . . ." "\n\n"
              r"Here \(t_3 = \square\), \(t_2 = \square\), \(t_4 = \square\), \(t_1 = \square\)," "\n\n"
              r"\(t_2 - t_1 = \square\), \(t_3 - t_2 = \square\)   \(\therefore\) \(a = \square\), \(d = \square\)"),
    ("(iv)", r"70, 60, 50, 40, . . ." "\n\n"
             r"Here \(t_1 = \square\), \(t_2 = \square\), \(t_3 = \square\), . . ." "\n\n"
             r"\(\therefore\) \(a = \square\), \(d = \square\)"),
]
for lab, stem in _p32q1:
    ROWS.append(q("Ex 3.2 Q1" + lab, "exercise-subjective", CD, "EASY", stem,
                  context=CTX_32_1, setLabel=SET_32_1))

ROWS += [
    q("Ex 3.2 Q2", "exercise-subjective", NTH, "EASY",
      r"Decide whether following sequence is an A.P., if so find the \(20^{\text{th}}\) term of the "
      r"progression." "\n\n" r"-12, -5, 2, 9, 16, 23, 30, . . ."),
    q("Ex 3.2 Q3", "exercise-subjective", NTH, "EASY",
      r"Given Arithmetic Progression 12, 16, 20, 24, . . .  Find the \(24^{\text{th}}\) term of this "
      r"progression."),
    q("Ex 3.2 Q4", "exercise-subjective", NTH, "EASY",
      r"Find the \(19^{\text{th}}\) term of the following A.P." "\n\n" r"7, 13, 19, 25, . . ."),
    q("Ex 3.2 Q5", "exercise-subjective", NTH, "EASY",
      r"Find the \(27^{\text{th}}\) term of the following A.P." "\n\n" r"9, 4, -1, -6, -11, . . ."),
    q("Ex 3.2 Q6", "exercise-subjective", NTH, "MODERATE",
      r"Find how many three digit natural numbers are divisible by 5."),
    q("Ex 3.2 Q7", "exercise-subjective", NTH, "MODERATE",
      r"The \(11^{\text{th}}\) term and the \(21^{\text{st}}\) term of an A.P. are 16 and 29 "
      r"respectively, then find the \(41^{\text{th}}\) term of that A.P.",
      note="The book prints “41th term”; the ordinal is a misprint for “41st”."),
    q("Ex 3.2 Q8", "exercise-subjective", NTH, "MODERATE",
      r"11, 8, 5, 2, . . .  In this A.P. which term is number -151 ?"),
    q("Ex 3.2 Q9", "exercise-subjective", NTH, "MODERATE",
      r"In the natural numbers from 10 to 250, how many are divisible by 4 ?"),
    q("Ex 3.2 Q10", "exercise-subjective", CD, "MODERATE",
      r"In an A.P. \(17^{\text{th}}\) term is 7 more than its \(10^{\text{th}}\) term. Find the common "
      r"difference."),
]
