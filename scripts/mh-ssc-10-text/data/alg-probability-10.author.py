# -*- coding: utf-8 -*-
"""Build data/alg-probability-10.solutions.json by joining the authored answers
below onto the topaper dump ON `ref`, and assert that every emitted row's id
still pairs with its OWN ref (a dropped row that shifts the tail is a
permutation: the id set matches, the count matches, every gate passes, and every
answer lands on the wrong question)."""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DUMP = os.path.join(HERE, "alg-probability-10.all.topaper.json")
OUT = os.path.join(HERE, "alg-probability-10.solutions.json")

A = {}

# ---------------------------------------------------------------- Practice set 5.1
A["Ex 5.1 Q1 (1)"] = (
    "Vanita will visit exactly one of the eight sites she knows, so each site is "
    "one possibility.\n\n"
    "S = {Ajintha, Mahabaleshwar, Lonar Sarovar, Tadoba wild life sanctuary, "
    "Amboli, Raigad, Matheran, Anandavan}\n\n"
    "There are 8 possibilities, i.e. n(S) = 8."
)
A["Ex 5.1 Q1 (2)"] = (
    "A week has seven days, and exactly one of them is selected.\n\n"
    "S = {Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday}\n\n"
    "There are 7 possibilities, i.e. n(S) = 7."
)
A["Ex 5.1 Q1 (3)"] = (
    "A pack has 52 cards (26 red = 13 hearts + 13 diamonds, and 26 black = "
    "13 clubs + 13 spades), and any one of them may be selected.\n\n"
    "There are 52 possibilities, i.e. n(S) = 52."
)
A["Ex 5.1 Q1 (4)"] = (
    "One card is written for each number from 10 to 20, both included.\n\n"
    "S = {10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20}\n\n"
    "Counting: \\(20 - 10 + 1 = 11\\). There are 11 possibilities, i.e. n(S) = 11.\n\n"
    "(The common slip is to answer 10 by subtracting alone; both end numbers are "
    "on cards, so 1 must be added.)"
)

# ---------------------------------------------------------------- Practice set 5.2
A["Ex 5.2 Q1 (1)"] = (
    "The die can show any of 1, 2, 3, 4, 5, 6 and the coin can show H or T, and "
    "the two happen together, so every die result pairs with each coin result.\n\n"
    "S = {1H, 1T, 2H, 2T, 3H, 3T, 4H, 4T, 5H, 5T, 6H, 6T}\n\n"
    "\\(n(S) = 6 \\times 2 = 12\\)"
)
A["Ex 5.2 Q1 (2)"] = (
    "A two digit number is formed by choosing a tens digit and then a units digit "
    "from 2, 3 and 5, with no digit repeated. There are 3 choices for the tens "
    "place and 2 remaining choices for the units place.\n\n"
    "S = {23, 25, 32, 35, 52, 53}\n\n"
    "\\(n(S) = 3 \\times 2 = 6\\)"
)
A["Ex 5.2 Q2"] = (
    "The arrow can come to rest on any one of the six coloured sectors of the "
    "disc, so the colours themselves are the outcomes.\n\n"
    "S = {Red, Purple, Orange, Yellow, Blue, Green}\n\n"
    "n(S) = 6"
)
A["Ex 5.2 Q3"] = (
    "The dates in March 2019 that are multiples of 5 are 5, 10, 15, 20, 25 and 30. "
    "Reading each of them off the calendar page (1 March 2019 falls on a Friday):\n\n"
    "| Date | 5 | 10 | 15 | 20 | 25 | 30 |\n"
    "|---|---|---|---|---|---|---|\n"
    "| Day | Tuesday | Sunday | Friday | Wednesday | Monday | Saturday |\n\n"
    "S = {Tuesday, Sunday, Friday, Wednesday, Monday, Saturday}\n\n"
    "n(S) = 6\n\n"
    "(All six days are different, so no day repeats even though March has 31 days.)"
)
A["Ex 5.2 Q4"] = (
    "Two people are chosen from the four \\(B_1\\), \\(B_2\\), \\(G_1\\), "
    "\\(G_2\\), and a committee is decided by WHO is in it, not by the order, so "
    "\\(B_1G_1\\) and \\(G_1B_1\\) are the same committee.\n\n"
    "(a) Committee of 2 boys = \\(B_1B_2\\)\n\n"
    "(b) Committee of 2 girls = \\(G_1G_2\\)\n\n"
    "(c) Committee of one boy and one girl = \\(B_1G_1\\), \\(B_2G_1\\), "
    "\\(B_1G_2\\), \\(B_2G_2\\)\n\n"
    "\\(\\therefore\\) Sample space = {\\(B_1B_2\\), \\(B_1G_1\\), \\(B_1G_2\\), "
    "\\(B_2G_1\\), \\(B_2G_2\\), \\(G_1G_2\\)}\n\n"
    "n(S) = 6"
)

# ---------------------------------------------------------------- Practice set 5.3
A["Ex 5.3 Q1 (1)"] = (
    "S = {1, 2, 3, 4, 5, 6}   n(S) = 6\n\n"
    "Event A : even number on the upper face.\n\n"
    "A = {2, 4, 6}   n(A) = 3\n\n"
    "Event B : odd number on the upper face.\n\n"
    "B = {1, 3, 5}   n(B) = 3\n\n"
    "Event C : prime number on the upper face.\n\n"
    "C = {2, 3, 5}   n(C) = 3\n\n"
    "(1 is not prime, so it is left out of C.)"
)
A["Ex 5.3 Q1 (2)"] = (
    "S = {(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),\n"
    "(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),\n"
    "(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6),\n"
    "(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6),\n"
    "(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6),\n"
    "(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6)}   n(S) = 36\n\n"
    "Event A : the sum is a multiple of 6, i.e. the sum is 6 or 12 (18 is "
    "impossible, as the largest sum is 12).\n\n"
    "A = {(1, 5), (2, 4), (3, 3), (4, 2), (5, 1), (6, 6)}   n(A) = 6\n\n"
    "Event B : the sum is minimum 10, i.e. the sum is 10, 11 or 12.\n\n"
    "B = {(4, 6), (5, 5), (5, 6), (6, 4), (6, 5), (6, 6)}   n(B) = 6\n\n"
    "Event C : the same digit on both upper faces.\n\n"
    "C = {(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6)}   n(C) = 6"
)
A["Ex 5.3 Q1 (3)"] = (
    "Each coin shows H or T, so there are \\(2 \\times 2 \\times 2 = 8\\) outcomes.\n\n"
    "S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}   n(S) = 8\n\n"
    "Event A : at least two heads, i.e. exactly two heads or three heads.\n\n"
    "A = {HHH, HHT, HTH, THH}   n(A) = 4\n\n"
    "Event B : no head.\n\n"
    "B = {TTT}   n(B) = 1\n\n"
    "Event C : head on the second coin, i.e. the middle letter is H.\n\n"
    "C = {HHH, HHT, THH, THT}   n(C) = 4"
)
A["Ex 5.3 Q1 (4)"] = (
    "The tens digit cannot be 0 (otherwise the number is not a two digit number), "
    "so there are 5 choices for it, and then 5 remaining digits for the units "
    "place: \\(5 \\times 5 = 25\\).\n\n"
    "S = {10, 12, 13, 14, 15, 20, 21, 23, 24, 25, 30, 31, 32, 34, 35, "
    "40, 41, 42, 43, 45, 50, 51, 52, 53, 54}   n(S) = 25\n\n"
    "Event A : the number formed is even, i.e. its units digit is 0, 2 or 4.\n\n"
    "A = {10, 12, 14, 20, 24, 30, 32, 34, 40, 42, 50, 52, 54}   n(A) = 13\n\n"
    "Event B : the number formed is divisible by 3 (the digit sum is a multiple of 3).\n\n"
    "B = {12, 15, 21, 24, 30, 42, 45, 51, 54}   n(B) = 9\n\n"
    "Event C : the number formed is greater than 50.\n\n"
    "C = {51, 52, 53, 54}   n(C) = 4\n\n"
    "(50 itself is not greater than 50, so it is not in C.)"
)
A["Ex 5.3 Q1 (5)"] = (
    "Let the three men be \\(M_1\\), \\(M_2\\), \\(M_3\\) and the two women be "
    "\\(F_1\\), \\(F_2\\). Two of these five form the committee, and order does "
    "not matter.\n\n"
    "S = {\\(M_1M_2\\), \\(M_1M_3\\), \\(M_1F_1\\), \\(M_1F_2\\), \\(M_2M_3\\), "
    "\\(M_2F_1\\), \\(M_2F_2\\), \\(M_3F_1\\), \\(M_3F_2\\), \\(F_1F_2\\)}   "
    "n(S) = 10\n\n"
    "Event A : at least one woman member.\n\n"
    "A = {\\(M_1F_1\\), \\(M_1F_2\\), \\(M_2F_1\\), \\(M_2F_2\\), \\(M_3F_1\\), "
    "\\(M_3F_2\\), \\(F_1F_2\\)}   n(A) = 7\n\n"
    "Event B : one man and one woman.\n\n"
    "B = {\\(M_1F_1\\), \\(M_1F_2\\), \\(M_2F_1\\), \\(M_2F_2\\), \\(M_3F_1\\), "
    "\\(M_3F_2\\)}   n(B) = 6\n\n"
    "Event C : no woman member.\n\n"
    "C = {\\(M_1M_2\\), \\(M_1M_3\\), \\(M_2M_3\\)}   n(C) = 3\n\n"
    "(A contains B together with \\(F_1F_2\\), which is why n(A) is one more than n(B).)"
)
A["Ex 5.3 Q1 (6)"] = (
    "S = {H1, H2, H3, H4, H5, H6, T1, T2, T3, T4, T5, T6}   n(S) = 12\n\n"
    "Event A : head on the coin and an odd number on the die.\n\n"
    "A = {H1, H3, H5}   n(A) = 3\n\n"
    "Event B : a head or a tail on the coin and an even number on the die — the "
    "coin is unrestricted, so only the die matters.\n\n"
    "B = {H2, H4, H6, T2, T4, T6}   n(B) = 6\n\n"
    "Event C : the number on the upper face is greater than 7 and tail on the coin. "
    "A die bears no number greater than 6, so no outcome satisfies this.\n\n"
    "C = { } = \\(\\phi\\)   n(C) = 0"
)

# ---------------------------------------------------------------- Practice set 5.4
A["Ex 5.4 Q1 (1)"] = (
    "S = {HH, HT, TH, TT}   n(S) = 4\n\n"
    "Let A be the event of getting at least one head, i.e. one head or two heads.\n\n"
    "A = {HH, HT, TH}   n(A) = 3\n\n"
    "\\(P(A) = \\dfrac{n(A)}{n(S)} = \\dfrac{3}{4}\\)"
)
A["Ex 5.4 Q1 (2)"] = (
    "S = {HH, HT, TH, TT}   n(S) = 4\n\n"
    "Let B be the event of getting no head, i.e. both coins show tails.\n\n"
    "B = {TT}   n(B) = 1\n\n"
    "\\(P(B) = \\dfrac{n(B)}{n(S)} = \\dfrac{1}{4}\\)\n\n"
    "(This event is the complement of 'at least one head', and indeed "
    "\\(\\dfrac{3}{4} + \\dfrac{1}{4} = 1\\).)"
)
A["Ex 5.4 Q2 (1)"] = (
    "Two dice give \\(6 \\times 6 = 36\\) equally likely outcomes, so n(S) = 36.\n\n"
    "Let A be the event that the sum is at least 10, i.e. the sum is 10, 11 or 12.\n\n"
    "A = {(4, 6), (5, 5), (6, 4), (5, 6), (6, 5), (6, 6)}   n(A) = 6\n\n"
    "\\(P(A) = \\dfrac{n(A)}{n(S)} = \\dfrac{6}{36} = \\dfrac{1}{6}\\)"
)
A["Ex 5.4 Q2 (2)"] = (
    "n(S) = 36. The greatest possible sum on two dice is \\(6 + 6 = 12\\), so a "
    "sum of 33 can never occur.\n\n"
    "B = { } = \\(\\phi\\)   n(B) = 0\n\n"
    "\\(P(B) = \\dfrac{0}{36} = 0\\)\n\n"
    "(This is an impossible event; its probability is exactly 0.)"
)
A["Ex 5.4 Q2 (3)"] = (
    "n(S) = 36. Let C be the event that the digit on the first die is greater "
    "than the digit on the second die.\n\n"
    "C = {(2, 1), (3, 1), (3, 2), (4, 1), (4, 2), (4, 3), (5, 1), (5, 2), (5, 3), "
    "(5, 4), (6, 1), (6, 2), (6, 3), (6, 4), (6, 5)}   n(C) = 15\n\n"
    "\\(P(C) = \\dfrac{15}{36} = \\dfrac{5}{12}\\)\n\n"
    "(Counting shortcut: 6 of the 36 outcomes have equal digits, and the "
    "remaining 30 split evenly between 'first greater' and 'second greater', "
    "giving \\(\\dfrac{30}{2} = 15\\).)"
)
A["Ex 5.4 Q3 (1)"] = (
    "S = {1, 2, 3, ..., 15}   n(S) = 15\n\n"
    "Let A be the event that the ticket shows an even number.\n\n"
    "A = {2, 4, 6, 8, 10, 12, 14}   n(A) = 7\n\n"
    "\\(P(A) = \\dfrac{7}{15}\\)"
)
A["Ex 5.4 Q3 (2)"] = (
    "S = {1, 2, 3, ..., 15}   n(S) = 15\n\n"
    "Let B be the event that the ticket shows a multiple of 5.\n\n"
    "B = {5, 10, 15}   n(B) = 3\n\n"
    "\\(P(B) = \\dfrac{3}{15} = \\dfrac{1}{5}\\)"
)
A["Ex 5.4 Q4 (1)"] = (
    "A two digit number is formed from 2, 3, 5, 7, 9 without repetition: 5 choices "
    "for the tens digit and 4 for the units digit, so \\(n(S) = 5 \\times 4 = 20\\).\n\n"
    "S = {23, 25, 27, 29, 32, 35, 37, 39, 52, 53, 57, 59, 72, 73, 75, 79, 92, 93, "
    "95, 97}\n\n"
    "Let A be the event that the number is odd — that is decided by the units "
    "digit, which must be one of the four odd digits 3, 5, 7, 9. The tens digit "
    "may then be any of the 4 remaining digits.\n\n"
    "\\(n(A) = 4 \\times 4 = 16\\)\n\n"
    "\\(P(A) = \\dfrac{16}{20} = \\dfrac{4}{5}\\)\n\n"
    "(Only 2 is even here, so a number is even exactly when it ends in 2 — which "
    "happens 4 times, and \\(20 - 4 = 16\\).)"
)
A["Ex 5.4 Q4 (2)"] = (
    "n(S) = 20, as above.\n\n"
    "Let B be the event that the number is a multiple of 5, i.e. it ends in 5 "
    "(there is no 0 among the digits).\n\n"
    "B = {25, 35, 75, 95}   n(B) = 4\n\n"
    "\\(P(B) = \\dfrac{4}{20} = \\dfrac{1}{5}\\)"
)
A["Ex 5.4 Q5 (1)"] = (
    "n(S) = 52\n\n"
    "Let A be the event that the card drawn is an ace. There is one ace in each "
    "of the four suits.\n\n"
    "n(A) = 4\n\n"
    "\\(P(A) = \\dfrac{4}{52} = \\dfrac{1}{13}\\)"
)
A["Ex 5.4 Q5 (2)"] = (
    "n(S) = 52\n\n"
    "Let B be the event that the card drawn is a spade. Each suit has 13 cards.\n\n"
    "n(B) = 13\n\n"
    "\\(P(B) = \\dfrac{13}{52} = \\dfrac{1}{4}\\)"
)

# ---------------------------------------------------------------- Problem set 5
A["PS5 Q2"] = (
    "Write all three chances in the same form so they can be compared.\n\n"
    "John : \\(\\dfrac{4}{5} = 0.80\\)\n\n"
    "Vasim : \\(0.83\\)\n\n"
    "Akash : \\(58\\% = \\dfrac{58}{100} = 0.58\\)\n\n"
    "Since \\(0.83 > 0.80 > 0.58\\), Vasim had the greatest probability of success."
)
A["PS5 Q3 (1)"] = (
    "The team has \\(6 + 4 + 1 = 11\\) players and one of them is chosen, so "
    "n(S) = 11.\n\n"
    "Let A be the event that the goalee is selected. There is only one goalee, so "
    "n(A) = 1.\n\n"
    "\\(P(A) = \\dfrac{1}{11}\\)"
)
A["PS5 Q3 (2)"] = (
    "n(S) = 11, as above.\n\n"
    "Let B be the event that a defender is selected. There are 6 defenders, so "
    "n(B) = 6.\n\n"
    "\\(P(B) = \\dfrac{6}{11}\\)"
)
A["PS5 Q4"] = (
    "There are 26 cards, one per letter of the English alphabet, so n(S) = 26.\n\n"
    "Let A be the event that the card drawn is a vowel card.\n\n"
    "A = {a, e, i, o, u}   n(A) = 5\n\n"
    "\\(P(A) = \\dfrac{5}{26}\\)"
)
A["PS5 Q5 (1)"] = (
    "[Textbook note: the book's answer key prints \\(\\dfrac{4}{9}\\) for the red "
    "balloon. That is wrong: there are only 2 red balloons out of 9, so the "
    "probability is \\(\\dfrac{2}{9}\\). The key refutes itself twice over — it "
    "prints the SAME value \\(\\dfrac{4}{9}\\) for both red and green although "
    "there are 2 red and 4 green, and its three answers add up to "
    "\\(\\dfrac{4}{9} + \\dfrac{1}{3} + \\dfrac{4}{9} = \\dfrac{11}{9}\\), which "
    "is greater than 1. The three outcomes are exhaustive, so they must total "
    "exactly 1, and our answers do.]\n\n"
    "The vendor has \\(2 + 3 + 4 = 9\\) balloons and gives away one, so n(S) = 9.\n\n"
    "Let A be the event that Pranali gets a red balloon. There are 2 red "
    "balloons, so n(A) = 2.\n\n"
    "\\(P(A) = \\dfrac{n(A)}{n(S)} = \\dfrac{2}{9}\\)"
)
A["PS5 Q5 (2)"] = (
    "n(S) = 9, as the vendor has \\(2 + 3 + 4 = 9\\) balloons.\n\n"
    "Let B be the event that Pranali gets a blue balloon. There are 3 blue "
    "balloons, so n(B) = 3.\n\n"
    "\\(P(B) = \\dfrac{3}{9} = \\dfrac{1}{3}\\)"
)
A["PS5 Q5 (3)"] = (
    "n(S) = 9, as the vendor has \\(2 + 3 + 4 = 9\\) balloons.\n\n"
    "Let C be the event that Pranali gets a green balloon. There are 4 green "
    "balloons, so n(C) = 4.\n\n"
    "\\(P(C) = \\dfrac{4}{9}\\)\n\n"
    "(Check: the balloon must be red, blue or green, and "
    "\\(\\dfrac{2}{9} + \\dfrac{1}{3} + \\dfrac{4}{9} = 1\\).)"
)
A["PS5 Q6"] = (
    "The box holds \\(5 + 8 + 3 = 16\\) pens and one is picked, so n(S) = 16.\n\n"
    "Let A be the event that the pen is blue. There are 8 blue pens, so n(A) = 8.\n\n"
    "\\(P(A) = \\dfrac{8}{16} = \\dfrac{1}{2}\\)"
)
A["PS5 Q7 (1)"] = (
    "The die has six faces, so n(S) = 6, but the faces are not all different — "
    "they bear A, B, C, D, E, A.\n\n"
    "S = {A, B, C, D, E, A}\n\n"
    "Let X be the event that 'A' appears on the upper face. Two of the six faces "
    "carry A, so n(X) = 2.\n\n"
    "\\(P(X) = \\dfrac{2}{6} = \\dfrac{1}{3}\\)\n\n"
    "(The outcomes here are the six FACES, not the five different letters — that "
    "is what makes A twice as likely as any other letter.)"
)
A["PS5 Q7 (2)"] = (
    "n(S) = 6, the six faces bearing A, B, C, D, E, A.\n\n"
    "Let Y be the event that 'D' appears on the upper face. Exactly one face "
    "carries D, so n(Y) = 1.\n\n"
    "\\(P(Y) = \\dfrac{1}{6}\\)"
)
A["PS5 Q8 (1)"] = (
    "S = {1, 2, 3, ..., 30}   n(S) = 30\n\n"
    "Let A be the event that the ticket bears an odd number.\n\n"
    "A = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29}   n(A) = 15\n\n"
    "\\(P(A) = \\dfrac{15}{30} = \\dfrac{1}{2}\\)"
)
A["PS5 Q8 (2)"] = (
    "S = {1, 2, 3, ..., 30}   n(S) = 30\n\n"
    "Let B be the event that the ticket bears a complete square number.\n\n"
    "B = {1, 4, 9, 16, 25}   n(B) = 5\n\n"
    "(The next square is \\(6^2 = 36\\), which is beyond 30.)\n\n"
    "\\(P(B) = \\dfrac{5}{30} = \\dfrac{1}{6}\\)"
)
A["PS5 Q9"] = (
    "Here the outcomes are the POINTS of the garden rather than a finite list, so "
    "the probability is the ratio of the areas.\n\n"
    "Area of the garden \\(= 77 \\times 50 = 3850\\) sq.m\n\n"
    "The lake has diameter 14 m, so its radius is \\(r = 7\\) m.\n\n"
    "Area of the lake \\(= \\pi r^2 = \\dfrac{22}{7} \\times 7 \\times 7 = 154\\) sq.m\n\n"
    "Let A be the event that the towel fell in the lake.\n\n"
    "\\(P(A) = \\dfrac{\\text{area of the lake}}{\\text{area of the garden}} = "
    "\\dfrac{154}{3850} = \\dfrac{1}{25}\\)"
)
A["PS5 Q10 (1)"] = (
    "S = {1, 2, 3, 4, 5, 6, 7, 8}   n(S) = 8, and all eight are equally likely.\n\n"
    "Let A be the event that the arrow rests at 8.\n\n"
    "A = {8}   n(A) = 1\n\n"
    "\\(P(A) = \\dfrac{1}{8}\\)"
)
A["PS5 Q10 (2)"] = (
    "n(S) = 8, with S = {1, 2, 3, 4, 5, 6, 7, 8}.\n\n"
    "Let B be the event that the arrow rests at an odd number.\n\n"
    "B = {1, 3, 5, 7}   n(B) = 4\n\n"
    "\\(P(B) = \\dfrac{4}{8} = \\dfrac{1}{2}\\)"
)
A["PS5 Q10 (3)"] = (
    "n(S) = 8, with S = {1, 2, 3, 4, 5, 6, 7, 8}.\n\n"
    "Let C be the event that the arrow rests at a number greater than 2.\n\n"
    "C = {3, 4, 5, 6, 7, 8}   n(C) = 6\n\n"
    "\\(P(C) = \\dfrac{6}{8} = \\dfrac{3}{4}\\)\n\n"
    "(2 itself is not greater than 2, so it is left out.)"
)
A["PS5 Q10 (4)"] = (
    "n(S) = 8, with S = {1, 2, 3, 4, 5, 6, 7, 8}.\n\n"
    "Let D be the event that the arrow rests at a number less than 9. Every one "
    "of the eight numbers is less than 9.\n\n"
    "D = {1, 2, 3, 4, 5, 6, 7, 8}   n(D) = 8\n\n"
    "\\(P(D) = \\dfrac{8}{8} = 1\\)\n\n"
    "(This is a certain event, so its probability is exactly 1.)"
)
A["PS5 Q11 (1)"] = (
    "S = {0, 1, 2, 3, 4, 5}   n(S) = 6\n\n"
    "Let A be the event that the card shows a natural number. The natural numbers "
    "are 1, 2, 3, ... — zero is not a natural number.\n\n"
    "A = {1, 2, 3, 4, 5}   n(A) = 5\n\n"
    "\\(P(A) = \\dfrac{5}{6}\\)"
)
A["PS5 Q11 (2)"] = (
    "S = {0, 1, 2, 3, 4, 5}   n(S) = 6\n\n"
    "Let B be the event that the card shows a number less than 1. Of the numbers "
    "on the cards only 0 is less than 1.\n\n"
    "B = {0}   n(B) = 1\n\n"
    "\\(P(B) = \\dfrac{1}{6}\\)"
)
A["PS5 Q11 (3)"] = (
    "S = {0, 1, 2, 3, 4, 5}   n(S) = 6\n\n"
    "Let C be the event that the card shows a whole number. The whole numbers are "
    "0, 1, 2, 3, ..., so every card qualifies.\n\n"
    "C = {0, 1, 2, 3, 4, 5}   n(C) = 6\n\n"
    "\\(P(C) = \\dfrac{6}{6} = 1\\)\n\n"
    "(Compare with part (1): 0 is a whole number but not a natural number, which "
    "is the whole difference between the two answers.)"
)
A["PS5 Q11 (4)"] = (
    "S = {0, 1, 2, 3, 4, 5}   n(S) = 6\n\n"
    "Let D be the event that the card shows a number greater than 5. The largest "
    "number on any card is 5, so no card qualifies.\n\n"
    "D = { } = \\(\\phi\\)   n(D) = 0\n\n"
    "\\(P(D) = \\dfrac{0}{6} = 0\\)"
)
A["PS5 Q12 (1)"] = (
    "The bag holds \\(3 + 3 + 3 = 9\\) balls and one is taken out, so n(S) = 9.\n\n"
    "Let A be the event that the ball drawn is red. There are 3 red balls, so "
    "n(A) = 3.\n\n"
    "\\(P(A) = \\dfrac{3}{9} = \\dfrac{1}{3}\\)"
)
A["PS5 Q12 (2)"] = (
    "n(S) = 9, as the bag holds \\(3 + 3 + 3 = 9\\) balls.\n\n"
    "Let B be the event that the ball drawn is not red — that is, it is white or "
    "green, i.e. \\(3 + 3 = 6\\) balls.\n\n"
    "n(B) = 6\n\n"
    "\\(P(B) = \\dfrac{6}{9} = \\dfrac{2}{3}\\)\n\n"
    "(B is the complement of the event in part (1), and "
    "\\(\\dfrac{1}{3} + \\dfrac{2}{3} = 1\\).)"
)
A["PS5 Q12 (3)"] = (
    "n(S) = 9, as the bag holds \\(3 + 3 + 3 = 9\\) balls.\n\n"
    "Let C be the event that the ball drawn is either red or white, i.e. one of "
    "\\(3 + 3 = 6\\) balls.\n\n"
    "n(C) = 6\n\n"
    "\\(P(C) = \\dfrac{6}{9} = \\dfrac{2}{3}\\)"
)
A["PS5 Q13"] = (
    "The word 'mathematics' has 11 letters — m, a, t, h, e, m, a, t, i, c, s — "
    "and there is one card per letter, so n(S) = 11.\n\n"
    "Let A be the event that the card drawn bears the letter 'm'. The letter m "
    "occurs twice in the word, so n(A) = 2.\n\n"
    "\\(P(A) = \\dfrac{2}{11}\\)\n\n"
    "(Repeated letters are counted as often as they occur, because each occurrence "
    "is written on its own card.)"
)
A["PS5 Q14"] = (
    "n(S) = 200, the number of students.\n\n"
    "Students who do not like Kabbaddi \\(= 200 - 135 = 65\\)\n\n"
    "Let A be the event that the student selected does not like Kabbaddi, so "
    "n(A) = 65.\n\n"
    "\\(P(A) = \\dfrac{65}{200} = \\dfrac{13}{40}\\)"
)
A["PS5 Q15 (1)"] = (
    "Repetition IS allowed, but the tens digit still cannot be 0. So there are 4 "
    "choices for the tens digit and 5 for the units digit: "
    "\\(n(S) = 4 \\times 5 = 20\\).\n\n"
    "S = {10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, "
    "40, 41, 42, 43, 44}\n\n"
    "Let A be the event that the number formed is prime.\n\n"
    "A = {11, 13, 23, 31, 41, 43}   n(A) = 6\n\n"
    "\\(P(A) = \\dfrac{6}{20} = \\dfrac{3}{10}\\)\n\n"
    "(21 = 3 x 7 and 33 = 3 x 11 are the two that most often slip in by mistake.)"
)
A["PS5 Q15 (2)"] = (
    "n(S) = 20, with S as listed in part (1).\n\n"
    "Let B be the event that the number formed is a multiple of 4.\n\n"
    "B = {12, 20, 24, 32, 40, 44}   n(B) = 6\n\n"
    "\\(P(B) = \\dfrac{6}{20} = \\dfrac{3}{10}\\)"
)
A["PS5 Q15 (3)"] = (
    "n(S) = 20, with S as listed in part (1).\n\n"
    "Let C be the event that the number formed is a multiple of 11. A two digit "
    "multiple of 11 has both digits the same, and repetition is allowed here.\n\n"
    "C = {11, 22, 33, 44}   n(C) = 4\n\n"
    "\\(P(C) = \\dfrac{4}{20} = \\dfrac{1}{5}\\)\n\n"
    "(00 is not a two digit number, so it is not counted.)"
)
A["PS5 Q16"] = (
    "The die is rolled twice and each face bears one of 0, 1, 2, 3, 4, 5, so "
    "\\(n(S) = 6 \\times 6 = 36\\).\n\n"
    "A product is zero exactly when at least one of the two factors is zero, so "
    "let A be the event that at least one roll shows 0.\n\n"
    "A = {(0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5), "
    "(1, 0), (2, 0), (3, 0), (4, 0), (5, 0)}   n(A) = 11\n\n"
    "\\(P(A) = \\dfrac{11}{36}\\)\n\n"
    "(Counting the other way: 6 pairs have 0 first and 6 have 0 second, but "
    "(0, 0) is in both lists, so \\(6 + 6 - 1 = 11\\), not 12.)"
)


def main():
    dump = json.load(io.open(DUMP, encoding="utf8"))
    missing = [r["ref"] for r in dump if r["ref"] not in A]
    extra = [k for k in A if k not in {r["ref"] for r in dump}]
    if missing:
        print("NO ANSWER AUTHORED for:", missing)
    if extra:
        print("ANSWER FOR A REF NOT IN THE DUMP:", extra)
    if missing or extra:
        sys.exit(1)

    by_ref = {r["ref"]: r for r in dump}
    out = []
    for ref, sol in A.items():
        row = by_ref[ref]
        # the pairing gate: this id must be the id of THIS ref
        assert row["ref"] == ref, f"ref/id pairing broken at {ref}"
        out.append({"id": row["id"], "ref": ref, "solution": sol})

    # second, independent pairing check against the dump order
    ids = {o["id"] for o in out}
    assert len(ids) == len(out) == len(dump), "id count/uniqueness check failed"
    for o in out:
        assert by_ref[o["ref"]]["id"] == o["id"], f"pairing drift at {o['ref']}"

    io.open(OUT, "w", encoding="utf8", newline="\n").write(
        json.dumps(out, ensure_ascii=False, indent=2) + "\n"
    )
    print(f"wrote {len(out)} solutions -> {OUT}")


main()
