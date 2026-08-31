# Part B of the alg-arithmetic-progression-10 transcription: blocks 5-9.
# (Solved examples under "Sum of first n terms of an A.P.", Practice Set 3.3,
#  Solved examples under "Application of A.P.", Practice Set 3.4, Problem Set 3)
import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location(
    "gen_a", os.path.join(HERE, "alg-arithmetic-progression-10.gen-a.py"))
A = importlib.util.module_from_spec(spec)
spec.loader.exec_module(A)

q, ROWS = A.q, A.ROWS
CONCEPT, CD, NTH, SUM, WORD = A.CONCEPT, A.CD, A.NTH, A.SUM, A.WORD

# ── Block 5 — Solved examples, printed under the "Sum of first n terms of an
#    A. P." heading (printed pp 70-71).
S5 = "Sum of first n terms of an A.P. SolvedEx."
ROWS += [
    q(S5 + "1", "solved", SUM, "EASY", r"Find the sum of first \(n\) natural numbers.",
      solution=(
          r"First \(n\) natural numbers are 1, 2, 3, . . . , \(n\)." "\n\n"
          r"Here \(a = 1\), \(d = 1\), \(n^{\text{th}}\) term \(= n\)" "\n\n"
          r"\(\therefore\) \(S_n = 1 + 2 + 3 + \ldots + n\)" "\n\n"
          r"\(S_n = \dfrac{n}{2}\)[First term + last term] . . . . . (by the formula)" "\n\n"
          r"\(= \dfrac{n}{2}[1 + n]\)" "\n\n"
          r"\(= \dfrac{n(n + 1)}{2}\)" "\n\n"
          r"\(\therefore\) Sum of first \(n\) natural number is \(\dfrac{n(n + 1)}{2}\)."
      )),
    q(S5 + "2", "solved", SUM, "MODERATE", r"Find the sum of first \(n\) even natural numbers.",
      solution=(
          r"First \(n\) even natural numbers are 2, 4, 6, 8, . . . , \(2n\)." "\n\n"
          r"\(t_1 =\) First term \(= 2\), \(t_n =\) last term \(= 2n\)" "\n\n"
          r"**Method I**" "\n\n"
          r"\(= \dfrac{n}{2}[t_1 + t_n]\)" "\n\n"
          r"\(= \dfrac{n}{2}[2 + 2n]\)" "\n\n"
          r"\(= \dfrac{n}{2} \times 2(1 + n)\)" "\n\n"
          r"\(= n(1 + n)\)" "\n\n"
          r"**Method II**" "\n\n"
          r"\(S_n = 2 + 4 + 6 \ldots + 2n\)" "\n\n"
          r"\(= 2(1 + 2 + 3 + \ldots + n)\)" "\n\n"
          r"\(= \dfrac{2[n(n + 1)]}{2}\)" "\n\n"
          r"\(= n(1 + n)\)" "\n\n"
          r"**Method III**" "\n\n"
          r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(= \dfrac{n}{2}[2 \times 2 + (n - 1)2]\)" "\n\n"
          r"\(= \dfrac{n}{2}[4 + 2n - 2]\)" "\n\n"
          r"\(= \dfrac{n}{2}[2 + 2n]\)" "\n\n"
          r"\(= \dfrac{n}{2} \times 2(1 + n)\)" "\n\n"
          r"\(= n(1 + n)\)" "\n\n"
          r"\(\therefore\) Sum of first \(n\) even natural numbers is \(n(1 + n)\)."
      )),
    q(S5 + "3", "solved", SUM, "MODERATE", r"Find the sum of first \(n\) odd natural numbers.",
      solution=(
          r"First \(n\) natural numbers" "\n\n"
          r"1, 3, 5, 7, . . . , \((2n - 1)\)." "\n\n"
          r"\(a = t_1 = 1\) and \(t_n = (2n - 1)\), \(d = 2\)" "\n\n"
          r"**Method I**" "\n\n"
          r"\(S_n = \dfrac{n}{2}[t_1 + t_n]\)" "\n\n"
          r"\(= \dfrac{n}{2}[1 + (2n - 1)]\)" "\n\n"
          r"\(= \dfrac{n}{2}[1 + 2n - 1]\)" "\n\n"
          r"\(= \dfrac{n}{2} \times 2n = n^2\)" "\n\n"
          r"**Method II**" "\n\n"
          r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(= \dfrac{n}{2}[2 \times 1 + (n - 1) \times 2]\)" "\n\n"
          r"\(= \dfrac{n}{2}[2 + 2n - 2]\)" "\n\n"
          r"\(= \dfrac{n}{2} \times 2n = n^2\)" "\n\n"
          r"**Method III**" "\n\n"
          r"\(1 + 3 + \ldots\ 2n - 1\)" "\n\n"
          r"\(= (1 + 2 + 3 + \ldots + 2n) - (2 + 4 + 6 + \ldots + 2n)\)" "\n\n"
          r"\(= \dfrac{2n(2n + 1)}{2} - \dfrac{2n(n + 1)}{2}\)" "\n\n"
          r"\(= (2n^2 + n) - (n^2 + n)\)" "\n\n"
          r"\(= n^2\)"
      ),
      note=("The book's printed solution opens “First n natural numbers” where it means "
            "“First n ODD natural numbers”; the list it then writes, 1, 3, 5, 7, ..., (2n-1), "
            "is the odd numbers, so only the sentence is wrong.")),
    q(S5 + "4", "solved", SUM, "MODERATE", r"Find the sum of all odd numbers from 1 to 150.",
      solution=(
          r"1 to 150 all odd numbers are 1, 3, 5, 7, . . . , 149." "\n\n"
          r"Which is an A.P." "\n\n"
          r"Here \(a = 1\) and \(d = 2\). First let's find how many odd numbers are there from 1 to 150, "
          r"so find the value of \(n\), if \(t_n = 149\)" "\n\n"
          r"\(t_n = a + (n - 1)d\)" "\n\n"
          r"\(149 = 1 + (n - 1)2\)   \(\therefore\) \(149 = 1 + 2n - 2\)" "\n\n"
          r"\(\therefore\) \(n = 75\)" "\n\n"
          r"Now let's find the sum of these 75 numbers   \(1 + 3 + 5 + \ldots + 149\)." "\n\n"
          r"\(a = 1\) and \(d = 2\), \(n = 75\)" "\n\n"
          r"**Method I**   \(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(S_n = \dfrac{75}{2}[2 \times 1 + (75 - 1) \times 2]\)" "\n\n"
          r"\(S_n = \dfrac{75}{2} \times 150\)" "\n\n"
          r"\(S_n = 5625\)" "\n\n"
          r"**Method II**   \(S_n = \dfrac{n}{2}[t_1 + t_n]\)" "\n\n"
          r"\(S_n = \dfrac{75}{2}[1 + 149]\)" "\n\n"
          r"\(S_n = \dfrac{75}{2} \times 150\)" "\n\n"
          r"\(S_n = 5625\)" "\n\n"
          r"\(\therefore\) The sum of all odd numbers from 1 to 150 is 5625."
      ),
      note=("The book prints this solved example's last three lines of EACH method as empty boxes "
            "for the student to fill. The blanks are completed here so the stored model answer is "
            "a whole worked solution rather than a hole; every filled value is forced by the "
            "line above it.")),
]

# ── Block 6 — Practice Set 3.3 (printed pp 72-73).
ROWS += [
    q("Ex 3.3 Q1", "exercise-subjective", SUM, "EASY",
      r"First term and common difference of an A.P. are 6 and 3 respectively ; find \(S_{27}\)." "\n\n"
      r"\(a = 6\), \(d = 3\), \(S_{27} = ?\)" "\n\n"
      r"\(S_n = \dfrac{n}{2}[\square + (n - 1)d]\)" "\n\n"
      r"\(S_{27} = \dfrac{27}{2}[12 + (27 - 1)\square]\)" "\n\n"
      r"\(= \dfrac{27}{2} \times \square\)" "\n\n"
      r"\(= 27 \times 45 = \square\)"),
    q("Ex 3.3 Q2", "exercise-subjective", SUM, "EASY",
      r"Find the sum of first 123 even natural numbers."),
    q("Ex 3.3 Q3", "exercise-subjective", SUM, "MODERATE",
      r"Find the sum of all even numbers between 1 and 350."),
    q("Ex 3.3 Q4", "exercise-subjective", SUM, "MODERATE",
      r"In an A.P. \(19^{\text{th}}\) term is 52 and \(38^{\text{th}}\) term is 128, find sum of first "
      r"56 terms."),
    q("Ex 3.3 Q5", "exercise-subjective", SUM, "MODERATE",
      r"Complete the following activity to find the sum of natural numbers between 1 and 140 which are "
      r"divisible by 4." "\n\n"
      r"Between 1 and 140, natural numbers divisible by 4" "\n\n"
      r"4, 8, . . . . . . . . , 136" "\n\n"
      r"How many numbers ? \(\therefore\) \(n = \square\)" "\n\n"
      r"\(n = \square\), \(a = \square\), \(d = \square\)" "\n\n"
      r"\(t_n = a + (n - 1)d\)" "\n\n"
      r"\(136 = \square + (n - 1) \times \square\)" "\n\n"
      r"\(n = \square\)   \(\longrightarrow\)   \(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
      r"\(S_{\square} = \dfrac{\square}{2}[\ \ \ \ ] = \square\)" "\n\n"
      r"Sum of numbers from 1 to 140, which are divisible by 4 \(= \square\)"),
    q("Ex 3.3 Q6", "exercise-subjective", SUM, "MODERATE",
      r"Sum of first 55 terms in an A.P. is 3300, find its \(28^{\text{th}}\) term.",
      note="Starred in the book with a superscript star, its mark for a challenging question."),
    q("Ex 3.3 Q7", "exercise-subjective", SUM, "MODERATE",
      r"In an A.P. sum of three consecutive terms is 27 and their product is 504, find the terms. "
      r"(Assume that three consecutive terms in A.P. are \(a - d\), \(a\), \(a + d\).)",
      note="Starred in the book with a superscript star, its mark for a challenging question."),
    q("Ex 3.3 Q8", "exercise-subjective", SUM, "MODERATE",
      r"Find four consecutive terms in an A.P. whose sum is 12 and sum of \(3^{\text{rd}}\) and "
      r"\(4^{\text{th}}\) term is 14." "\n\n"
      r"(Assume the four consecutive terms in A.P. are \(a - d\), \(a\), \(a + d\), \(a + 2d\).)",
      note="Starred in the book with a superscript star, its mark for a challenging question."),
    q("Ex 3.3 Q9", "exercise-subjective", NTH, "MODERATE",
      r"If the \(9^{\text{th}}\) term of an A.P. is zero then show that the \(29^{\text{th}}\) term is "
      r"twice the \(19^{\text{th}}\) term.",
      note="Starred in the book with a superscript star, its mark for a challenging question."),
]

# ── Block 7 — Solved examples, printed under the "Application of A.P." heading
#    (printed pp 73-77).
S7 = "Application of A.P. SolvedEx."
ROWS += [
    q(S7 + "1", "solved", WORD, "MODERATE",
      r"A mixer manufacturing company manufactured 600 mixers in \(3^{\text{rd}}\) year and in "
      r"\(7^{\text{th}}\) year they manufactured 700 mixers. If every year there is same growth in the "
      r"production of mixers then find (i) Production in the first year (ii) Production in "
      r"\(10^{\text{th}}\) year (iii) Total production in first seven years.",
      solution=(
          r"Addition in the number of mixers manufactured by the company per year is constant therefore "
          r"the number of production in successive years is in A.P." "\n\n"
          r"(i) Let's assume that company manufactured \(t_n\) mixers in the \(n^{\text{th}}\) year then "
          r"as per given information," "\n\n"
          r"\(t_3 = 600\), \(t_7 = 700\)" "\n\n"
          r"We know that \(t_n = a + (n - 1)d\)" "\n\n"
          r"\(t_3 = a + (3 - 1)d\)" "\n\n"
          r"\(a + 2d = 600\) . . . (I)" "\n\n"
          r"\(t_7 = a + (7 - 1)d\)" "\n\n"
          r"\(t_7 = a + 6d = 700\) . . . (II)" "\n\n"
          r"\(a + 2d = 600\)  \(\therefore\) Substituting \(a = 600 - 2d\) in equation (II)," "\n\n"
          r"\(600 - 2d + 6d = 700\)" "\n\n"
          r"\(4d = 100\)   \(\therefore\) \(d = 25\)" "\n\n"
          r"\(a + 2d = 600\)   \(\therefore\) \(a + 2 \times 25 = 600\)" "\n\n"
          r"\(a + 50 = 600\)   \(\therefore\) \(a = 550\)" "\n\n"
          r"\(\therefore\) Production in first year was 550." "\n\n"
          r"(ii) \(t_n = a + (n - 1)d\)" "\n\n"
          r"\(t_{10} = 550 + (10 - 1) \times 25 = 550 + 225\)" "\n\n"
          r"Production in \(10^{\text{th}}\) year was 775." "\n\n"
          r"(iii) For finding total production in first 7 years let's use formula for \(S_n\)." "\n\n"
          r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(S_n = \dfrac{7}{2}[1100 + 150] = \dfrac{7}{2}[1250] = 7 \times 625 = 4375\)" "\n\n"
          r"Total production in first 7 years is 4375 mixers."
      )),
    q(S7 + "2", "solved", WORD, "HARD",
      r"Ajay sharma repays the borrowed amount of \(\text{Rs. }3{,}25{,}000\) by paying "
      r"\(\text{Rs. }30500\) in the first month and then decreases the payment by \(\text{Rs. }1500\) "
      r"every month. How long will it take to clear his amount ?",
      solution=(
          r"Let the time required to clear the amount be \(n\) months. The monthly payment decreases by "
          r"\(\text{Rs. }1500\). Therefore the payments are in A.P." "\n\n"
          r"First term \(= a = 30500\), \(d = -1500\)" "\n\n"
          r"Amount \(= S_n = 3{,}25{,}000\)" "\n\n"
          r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(3{,}25{,}000 = \dfrac{n}{2}[2 \times 30500 + (n - 1)d]\)" "\n\n"
          r"\(= \dfrac{n}{2}[2 \times 30500 - 1500n + 1500]\)" "\n\n"
          r"\(3{,}25{,}000 = 30500n - 750n^2 + 750n\)" "\n\n"
          r"\(\therefore\) \(750n^2 - 31250n + 325000 = 0\)" "\n\n"
          r"divide both sides by 250." "\n\n"
          r"\(\therefore\) \(3n^2 - 125n + 1300 = 0\)" "\n\n"
          r"\(\therefore\) \(3n^2 - 60n - 65n + 1300 = 0\)" "\n\n"
          r"\(\therefore\) \(3n(n - 20) - 65(n - 20) = 0\)" "\n\n"
          r"\(\therefore\) \((n - 20)(3n - 65) = 0\)" "\n\n"
          r"\(\therefore\) \(n - 20 = 0\), \(3n - 65 = 0\)" "\n\n"
          r"\(\therefore\) \(n = 20\) or \(n = \dfrac{65}{3} = 21\dfrac{2}{3}\)" "\n\n"
          r"In an A.P. \(n\) is a natural number." "\n\n"
          r"\(\therefore\) \(n \neq \dfrac{65}{3}\)   \(\therefore\) \(n = 20\)" "\n\n"
          r"(Or, after 20 months, \(S_{20} = 3{,}25{,}000\) then the total amount will be repaid. It is "
          r"not required to think about further period of time.)" "\n\n"
          r"\(\therefore\) To clear the amount 20 months are needed."
      )),
    q(S7 + "3", "solved", WORD, "MODERATE",
      r"Anvar saves some amount every month. In first three months he saves \(\text{Rs. }200\), "
      r"\(\text{Rs. }250\) and \(\text{Rs. }300\) respectively. In which month will he save "
      r"\(\text{Rs. }1000\) ?",
      solution=(
          r"Saving in first month \(\text{Rs. }200\); Saving in second month \(\text{Rs. }250\); ....." "\n\n"
          r"200, 250, 300, . . .   this is an A.P." "\n\n"
          r"Here \(a = 200\), \(d = 50\), Let's find \(n\) using \(t_n\) formula and then find \(S_n\)." "\n\n"
          r"\(t_n = a + (n - 1)d\)" "\n\n"
          r"\(= 200 + (n - 1)50\)" "\n\n"
          r"\(= 200 + 50n - 50\)" "\n\n"
          r"\(1000 = 150 + 50n\)" "\n\n"
          r"\(150 + 50n = 1000\)" "\n\n"
          r"\(50n = 1000 - 150\)" "\n\n"
          r"\(50n = 850\)" "\n\n"
          r"\(\therefore\) \(n = 17\)" "\n\n"
          r"In the \(17^{\text{th}}\) month he will save \(\text{Rs. }1000\)." "\n\n"
          r"Let's find that in 17 months how much total amount is saved." "\n\n"
          r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(= \dfrac{17}{2}[2 \times 200 + (17 - 1) \times 50]\)" "\n\n"
          r"\(= \dfrac{17}{2}[400 + 800]\)" "\n\n"
          r"\(= \dfrac{17}{2}[1200]\)" "\n\n"
          r"\(= 17 \times 600 = 10200\)" "\n\n"
          r"In 17 months total saving is \(\text{Rs. }10200\)."
      )),
    q(S7 + "4", "solved", WORD, "HARD",
      r"As shown in the figure, take point A on the line and draw a half circle \(P_1\) of radius 0.5 "
      r"with A as centre. It intersects given line in point B. Now taking B as centre draw a half circle "
      r"\(P_2\) of radius 1 cm which is on the other side of the line." "\n\n"
      r"Now again taking A as centre draw a half circle \(P_3\) of radius 1.5 cm. If we draw half circles "
      r"like this having radius 0.5 cm, 1 cm, 1.5 cm, 2 cm, we get a figure of spiral shape. Find the "
      r"length of such spiral shaped figure formed by 13 such half circles. "
      r"\(\left(\pi = \dfrac{22}{7}\right)\)",
      solution=(
          r"Semi circumferences \(P_1\), \(P_2\), \(P_3\), . . . are drawn by taking centres A, B, A, "
          r"B,... It is given that radius of the first circle is 0.5 cm. The radius of the second circle "
          r"is 1.0 cm,... From this information we will find \(P_1\), \(P_2\), \(P_3\), . . . \(P_{13}\)." "\n\n"
          r"Length of the first semi circumference \(= P_1 = \pi r_1 = \pi \times \dfrac{1}{2} = \dfrac{\pi}{2}\)" "\n\n"
          r"\(P_2 = \pi r_2 = \pi \times 1 = \pi\)" "\n\n"
          r"\(P_3 = \pi r_3 = \pi \times 1.5 = \dfrac{3}{2}\pi\)" "\n\n"
          r"The lengths are \(P_1\), \(P_2\), \(P_3\), . . ., and the numbers \(\dfrac{1}{2}\pi\), "
          r"\(1\pi\), \(\dfrac{3}{2}\pi\), . . . are in A.P." "\n\n"
          r"Here \(a = \dfrac{1}{2}\pi\), \(d = \dfrac{1}{2}\pi\), From this let's find \(S_{13}\)." "\n\n"
          r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
          r"\(S_{13} = \dfrac{13}{2}\left[2 \times \dfrac{\pi}{2} + (13 - 1) \times \dfrac{1}{2}\pi\right]\)" "\n\n"
          r"\(= \dfrac{13}{2}[\pi + 6\pi]\)" "\n\n"
          r"\(= \dfrac{13}{2} \times 7\pi\)" "\n\n"
          r"\(= \dfrac{13}{2} \times 7 \times \dfrac{22}{7}\)" "\n\n"
          r"\(= 143\) cm." "\n\n"
          r"\(\therefore\) The total length of spiral shape formed by 13 semicircles is 143 cm."
      ),
      note=("The stem cites a printed figure, but every quantity the figure carries (the centres A and "
            "B, the radii 0.5, 1, 1.5, ... cm) is stated in words, so the question is answerable "
            "without it. The book's printed solution ends the list with “P3” where it means "
            "P-subscript-13; corrected above.")),
    q(S7 + "5", "solved", WORD, "EASY",
      r"In the year 2010 in the village there were 4000 people who were literate. Every year the number "
      r"of literate people increases by 400. How many people will be literate in the year 2020 ?",
      solution=(
          r"| Year | 2010 | 2011 | 2012 | . . . | 2020 |" "\n"
          r"|---|---|---|---|---|---|" "\n"
          r"| Literate People | 4000 | 4400 | 4800 | . . . | 8000 |" "\n\n"
          r"\(a = 4000\), \(d = 400\), \(n = 11\)" "\n\n"
          r"\(t_n = a + (n - 1)d\)" "\n\n"
          r"\(= 4000 + (11 - 1)400\)" "\n\n"
          r"\(= 4000 + 4000\)" "\n\n"
          r"\(= 8000\)" "\n\n"
          r"In year 2020, 8000 people will be literate."
      )),
    q(S7 + "6", "solved", WORD, "EASY",
      r"In year 2015, Mrs. Shaikh got a job with salary \(\text{Rs. }1{,}80{,}000\) per year. Her "
      r"employer agreed to give \(\text{Rs. }10{,}000\) per year as increment. Then in how many years "
      r"will her annual salary be \(\text{Rs. }2{,}50{,}000\) ?",
      solution=(
          r"| Year | First Year (2015) | Second Year (2016) | Third Year (2017) | . . . |" "\n"
          r"|---|---|---|---|---|" "\n"
          r"| Salary (Rs.) | [1,80,000] | [1,80,000 + 10,000] | [1,80,000 + 20,000] | . . . |" "\n\n"
          r"\(a = 1{,}80{,}000\)   \(d = 10{,}000\)   \(n = ?\)   \(t_n = 2{,}50{,}000\)" "\n\n"
          r"\(t_n = a + (n - 1)d\)" "\n\n"
          r"\(2{,}50{,}000 = 1{,}80{,}000 + (n - 1) \times 10{,}000\)" "\n\n"
          r"\((n - 1) \times 10000 = 70{,}000\)" "\n\n"
          r"\((n - 1) = 7\)" "\n\n"
          r"\(n = 8\)" "\n\n"
          r"In the \(8^{\text{th}}\) year her annual salary will be \(\text{Rs. }2{,}50{,}000\)."
      ),
      note=("The book leaves the Third Year cell of the printed table empty for the student; it is "
            "filled in above as 1,80,000 + 20,000, which the two cells to its left force.")),
]

# ── Block 8 — Practice Set 3.4 (printed p 78).
ROWS += [
    q("Ex 3.4 Q1", "exercise-subjective", WORD, "MODERATE",
      r"On \(1^{\text{st}}\) Jan 2016, Sanika decides to save \(\text{Rs. }10\), \(\text{Rs. }11\) on "
      r"second day, \(\text{Rs. }12\) on third day. If she decides to save like this, then on "
      r"\(31^{\text{st}}\) Dec 2016 what would be her total saving ?"),
    q("Ex 3.4 Q2", "exercise-subjective", WORD, "MODERATE",
      r"A man borrows \(\text{Rs. }8000\) and agrees to repay with a total interest of "
      r"\(\text{Rs. }1360\) in 12 monthly instalments. Each instalment being less than the preceding one "
      r"by \(\text{Rs. }40\). Find the amount of the first and last instalment."),
    q("Ex 3.4 Q3", "exercise-subjective", WORD, "MODERATE",
      r"Sachin invested in a national saving certificate scheme. In the first year he invested "
      r"\(\text{Rs. }5000\), in the second year \(\text{Rs. }7000\), in the third year "
      r"\(\text{Rs. }9000\) and so on. Find the total amount that he invested in 12 years."),
    q("Ex 3.4 Q4", "exercise-subjective", WORD, "MODERATE",
      r"There is an auditorium with 27 rows of seats. There are 20 seats in the first row, 22 seats in "
      r"the second row, 24 seats in the third row and so on. Find the number of seats in the "
      r"\(15^{\text{th}}\) row and also find how many total seats are there in the auditorium ?"),
    q("Ex 3.4 Q5", "exercise-subjective", WORD, "HARD",
      r"Kargil's temperature was recorded in a week from Monday to Saturday. All readings were in A.P."
      r"The sum of temperatures of Monday and Saturday was \(5^\circ\) C more than sum of temperatures "
      r"of Tuesday and Saturday. If temperature of Wednesday was \(-30^\circ\) celsius then find the "
      r"temperature on the other five days."),
    q("Ex 3.4 Q6", "exercise-subjective", WORD, "EASY",
      r"On the world environment day tree plantation programme was arranged on a land which is "
      r"triangular in shape. Trees are planted such that in the first row there is one tree, in the "
      r"second row there are two trees, in the third row three trees and so on. Find the total number of "
      r"trees in the 25 rows."),
]

# ── Block 9 — Problem Set 3 (printed pp 78-80).
CTX_PS3_1 = "Choose the correct alternative answer for each of the following sub questions."
SET_PS3_1 = "PS3 Q1"
_mcq = [
    ("(1)", CONCEPT, "EASY", r"The sequence -10, -6, -2, 2, . . .",
     [r"is an A.P., Reason \(d = -16\)", r"is an A.P., Reason \(d = 4\)",
      r"is an A.P., Reason \(d = -4\)", r"is not an A.P."], "B"),
    ("(2)", CD, "EASY",
     r"First four terms of an A.P. are ....., whose first term is -2 and common difference is -2.",
     [r"-2, 0, 2, 4", r"-2, 4, -8, 16", r"-2, -4, -6, -8", r"-2, -4, -8, -16"], "C"),
    ("(3)", SUM, "EASY", r"What is the sum of the first 30 natural numbers ?",
     [r"464", r"465", r"462", r"461"], "B"),
    ("(4)", NTH, "EASY", r"For an given A.P. \(t_7 = 4\), \(d = -4\) then \(a = \ldots\)",
     [r"6", r"7", r"20", r"28"], "D"),
    ("(5)", NTH, "EASY",
     r"For an given A.P. \(a = 3.5\), \(d = 0\), \(n = 101\), then \(t_n = \ldots\)",
     [r"0", r"3.5", r"103.5", r"104.5"], "B"),
    ("(6)", NTH, "MODERATE",
     r"In an A.P. first two terms are -3, 4 then \(21^{\text{st}}\) term is . . .",
     [r"-143", r"143", r"137", r"17"], "C"),
    ("(7)", NTH, "EASY", r"If for any A.P. \(d = 5\) then \(t_{18} - t_{13} = \ldots\)",
     [r"5", r"20", r"25", r"30"], "C"),
    ("(8)", SUM, "EASY", r"Sum of first five multuiples of 3 is. . .",
     [r"45", r"55", r"15", r"75"], "A"),
    ("(9)", SUM, "MODERATE", r"15, 10, 5, . . .  In this A.P. sum of first 10 terms is . . .",
     [r"-75", r"-125", r"75", r"125"], "A"),
    ("(10)", SUM, "MODERATE",
     r"In an A.P. \(1^{\text{st}}\) term is 1 and the last term is 20. The sum of all terms is = 399 "
     r"then \(n = \ldots\)",
     [r"42", r"38", r"21", r"19"], "B"),
]
for lab, sub, diff, stem, opts, ans in _mcq:
    note = None
    if lab == "(8)":
        note = "The book prints “multuiples” for “multiples”."
    ROWS.append(q("PS3 Q1" + lab, "exercise-mcq", sub, diff, stem,
                  format="mcq", context=CTX_PS3_1, setLabel=SET_PS3_1,
                  options=[{"label": L, "text": t} for L, t in zip("ABCD", opts)],
                  answer=ans, note=note))

ROWS += [
    q("PS3 Q2", "exercise-subjective", NTH, "MODERATE",
      r"Find the fourth term from the end in an A.P. -11, -8, -5, . . . , 49."),
    q("PS3 Q3", "exercise-subjective", NTH, "MODERATE",
      r"In an A.P. the \(10^{\text{th}}\) term is 46, sum of the \(5^{\text{th}}\) and "
      r"\(7^{\text{th}}\) term is 52. Find the A.P."),
    q("PS3 Q4", "exercise-subjective", SUM, "MODERATE",
      r"The A.P. in which \(4^{\text{th}}\) term is -15 and \(9^{\text{th}}\) term is -30. Find the sum "
      r"of the first 10 numbers."),
    q("PS3 Q5", "exercise-subjective", NTH, "MODERATE",
      r"Two A.P.'s are given 9, 7, 5, . . .  and 24, 21, 18, . . .  . If \(n^{\text{th}}\) term of both "
      r"the progressions are equal then find the value of \(n\) and \(n^{\text{th}}\) term."),
    q("PS3 Q6", "exercise-subjective", NTH, "MODERATE",
      r"If sum of \(3^{\text{rd}}\) and \(8^{\text{th}}\) terms of an A.P. is 7 and sum of "
      r"\(7^{\text{th}}\) and \(14^{\text{th}}\) terms is -3 then find the \(10^{\text{th}}\) term."),
    q("PS3 Q7", "exercise-subjective", SUM, "MODERATE",
      r"In an A.P. the first term is -5 and last term is 45. If sum of all numbers in the A.P. is 120, "
      r"then how many terms are there ? What is the common difference ?"),
    q("PS3 Q8", "exercise-subjective", SUM, "EASY",
      r"Sum of 1 to \(n\) natural numbers is 36, then find the value of \(n\)."),
    q("PS3 Q9", "exercise-subjective", SUM, "HARD",
      r"Divide 207 in three parts, such that all parts are in A.P. and product of two smaller parts will "
      r"be 4623."),
    q("PS3 Q10", "exercise-subjective", NTH, "HARD",
      r"There are 37 terms in an A.P., the sum of three terms placed exactly at the middle is 225 and "
      r"the sum of last three terms is 429. Write the A.P."),
    q("PS3 Q11", "exercise-subjective", SUM, "HARD",
      r"If first term of an A.P. is \(a\), second term is \(b\) and last term is \(c\), then show that "
      r"sum of all terms is \(\dfrac{(a + c)(b + c - 2a)}{2(b - a)}\).",
      note="Starred in the book with a superscript star, its mark for a challenging question."),
    q("PS3 Q12", "exercise-subjective", SUM, "HARD",
      r"If the sum of first \(p\) terms of an A.P. is equal to the sum of first \(q\) terms then show "
      r"that the sum of its first \((p + q)\) terms is zero. \((p \neq q)\)",
      note="Starred in the book with a superscript star, its mark for a challenging question."),
    q("PS3 Q13", "exercise-subjective", NTH, "HARD",
      r"If \(m\) times the \(m^{\text{th}}\) term of an A.P. is eqaul to \(n\) times \(n^{\text{th}}\) "
      r"term then show that the \((m + n)^{\text{th}}\) term of the A.P. is zero.",
      note=("Starred in the book with a superscript star, its mark for a challenging question. "
            "The book prints “eqaul” for “equal”.")),
    q("PS3 Q14", "exercise-subjective", WORD, "MODERATE",
      r"\(\text{Rs. }1000\) is invested at 10 percent simple interest. Check at the end of every year if "
      r"the total interest amount is in A.P. If this is an A.P. then find interest amount after 20 "
      r"years. For this complete the following activity." "\n\n"
      r"Simple interest \(= \dfrac{P \times R \times N}{100}\)" "\n\n"
      r"Simple interest after 1 year \(= \dfrac{1000 \times 10 \times 1}{100} = \square\)" "\n\n"
      r"Simple interest after 2 year \(= \dfrac{1000 \times 10 \times 2}{100} = \square\)" "\n\n"
      r"Simple interest after 3 year \(= \dfrac{\square \times \square \times \square}{100} = 300\)" "\n\n"
      r"According to this the simple interest for 4, 5, 6 years will be 400, \(\square\), \(\square\) "
      r"respectively." "\n\n"
      r"From this \(d = \square\), and \(a = \square\)" "\n\n"
      r"Amount of simple interest after 20 years" "\n\n"
      r"\(t_n = a + (n - 1)d\)" "\n\n"
      r"\(t_{20} = \square + (20 - 1)\square\)" "\n\n"
      r"\(t_{20} = \square\)" "\n\n"
      r"Amount of simple interest after 20 years is \(= \square\)"),
]

out = os.path.join(HERE, "alg-arithmetic-progression-10.questions.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(ROWS, f, ensure_ascii=False, indent=1)
    f.write("\n")

import collections
print("rows:", len(ROWS))
print("buckets:", dict(collections.Counter(r["bucket"] for r in ROWS)))
print("subtopics:", dict(collections.Counter(r["subtopic"] for r in ROWS)))
refs = [r["ref"] for r in ROWS]
assert len(set(refs)) == len(refs), "duplicate refs"
print("wrote", out)
