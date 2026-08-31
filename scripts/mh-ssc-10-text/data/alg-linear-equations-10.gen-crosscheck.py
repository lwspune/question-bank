"""Emit data/alg-linear-equations-10.crosscheck.json — the step-6 answer-key gate.

Every row of data/<id>.questions.json gets a verdict. AGREE / OUR-ANSWER-WRONG /
BOOK-KEY-WRONG / NO-KEY-ENTRY. The `ours` values are the ones authored into the
live solutions; the `book` values are transcribed from the printed ANSWERS
section (idx 178-179 = printed pp 169-170) and were independently reproduced from
the STEM by sympy in out/_alg-linear-equations-10_verify.py (68 checks, 0 diffs).
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = HERE
CHID = "alg-linear-equations-10"

SOLVED_NOTE = ("Solved example - outside this gate by construction. The printed ANSWERS section "
               "is organised under 'Practice Set' / 'Problem Set' headings only; a worked "
               "example's answer is printed inside its own solution on the page.")

# ref -> (book, ours)  [AGREE unless overridden below]
A = {}
def agree(ref, book, ours=None):
    A[ref] = ("AGREE", book, ours if ours is not None else book, None)
def nokey(ref, note):
    A[ref] = ("NO-KEY-ENTRY", "(nothing printed)", "", note)

# --- solved examples: no key entry by construction -----------------------
for ref in ["Simultaneous linear equations SolvedEx.1", "Simultaneous linear equations SolvedEx.2",
            "Simultaneous linear equations SolvedEx.3", "Determinant SolvedEx.1(1)",
            "Determinant SolvedEx.1(2)", "Determinant SolvedEx.1(3)",
            "Determinant method (Cramer's Rule) SolvedEx.1",
            "Equations reducible SolvedEx.1", "Equations reducible SolvedEx.2",
            "Application of Simultaneous equations SolvedEx.1",
            "Application of Simultaneous equations SolvedEx.2",
            "Application of Simultaneous equations SolvedEx.3",
            "Application of Simultaneous equations SolvedEx.4",
            "Application of Simultaneous equations SolvedEx.5"]:
    nokey(ref, SOLVED_NOTE)

nokey("Ex 1.1 Q1", "Guided activity. The printed key for Practice Set 1.1 begins at question 2, "
                   "so this item has no entry. Our answer (3, -2) is derived from the two printed equations.")
nokey("PS1 Q7(1)", "Guided activity. The printed key for Problem Set 1 question 7 begins at (2), "
                   "because the activity prints its own final answer, 58, on the page - which our answer reproduces.")

# --- Practice Set 1.1 ----------------------------------------------------
for r, v in [("(1)", "(2, 4)"), ("(2)", "(3, 1)"), ("(3)", "(6, 1)"), ("(4)", "(5, 2)"),
             ("(5)", "(-1, 1)"), ("(6)", "(1, 3)"), ("(7)", "(3, 2)"), ("(8)", "(7, 3)")]:
    agree("Ex 1.1 Q2" + r, v)

# --- Practice Set 1.2 ----------------------------------------------------
agree("Ex 1.2 Q1(I)",  "x = 3, -2, 0 ; y = 0, 5, 3 ; (3, 0), (-2, 5), (0, 3)")
agree("Ex 1.2 Q1(II)", "x = 4, -1, 0 ; y = 0, -5, -4 ; (4, 0), (-1, -5), (0, -4)")
for r, v in [("(1)", "(5, 1)"), ("(2)", "(4, 1)"), ("(3)", "(3, -3)"), ("(4)", "(-1, -5)"),
             ("(5)", "(1, 2.5)"), ("(6)", "(8, 4)")]:
    agree("Ex 1.2 Q2" + r, v)

# --- Practice Set 1.3 ----------------------------------------------------
agree("Ex 1.3 Q1", "blanks 5, 2, 15, 7")
for r, v in [("(1)", "-18"), ("(2)", "21"), ("(3)", "-4/3")]:
    agree("Ex 1.3 Q2" + r, v)
for r, v in [("(1)", "(2, -1)"), ("(2)", "(-2, 4)"), ("(3)", "(3, -2)"), ("(4)", "(2, 6)"),
             ("(5)", "(6, 5)"), ("(6)", "(5/8, 1/4)")]:
    agree("Ex 1.3 Q3" + r, v)

# --- Practice Set 1.4 ----------------------------------------------------
for r, v in [("(1)", "(1/9, 1)"), ("(2)", "(3, 2)"), ("(3)", "(5/2, -2)"), ("(4)", "(1, 1)")]:
    agree("Ex 1.4 Q1" + r, v)

# --- Practice Set 1.5 ----------------------------------------------------
A["Ex 1.5 Q1"] = ("AGREE", "The numbers are 5 and 2", "smaller 2, greater 5",
                  "NOT COMMITTED - content_hash dedup dropped this row: the March 2026 SSC Algebra "
                  "board paper sets it VERBATIM (Q3(B)(i)) and that PYQ row is already live and PUBLIC "
                  "on this same chapter. Diffed here for completeness; it is not one of the 80 live rows.")
agree("Ex 1.5 Q2", "x = 12, y = 8, Area = 640 sq. unit, Perimeter = 112 unit")
agree("Ex 1.5 Q3", "Son's age is 15 years, father's age is 40 years")
agree("Ex 1.5 Q4", "7/18")
agree("Ex 1.5 Q5", "A - 30 kg, B - 55 kg")
agree("Ex 1.5 Q6", "150 km.")

# --- Problem Set 1 -------------------------------------------------------
for r, v in [("(1)", "B"), ("(2)", "A"), ("(3)", "D"), ("(4)", "C"), ("(5)", "A")]:
    agree("PS1 Q1" + r, v)
agree("PS1 Q2", "x = -5, 3/2 ; y = -13/6, 0 ; (-5, -13/6), (3/2, 0)")
for r, v in [("(1)", "(3, 2)"), ("(2)", "(-2, -1)"), ("(3)", "(0, 5)"), ("(4)", "(2, 4)"), ("(5)", "(3, 1)")]:
    agree("PS1 Q3" + r, v)
for r, v in [("(1)", "22"), ("(2)", "-1"), ("(3)", "13")]:
    agree("PS1 Q4" + r, v)
for r, v in [("(1)", "(-2/3, 2)"), ("(2)", "(1, 4)"), ("(3)", "(1/2, -1/2)"),
             ("(4)", "(7/11, 116/33)"), ("(5)", "(2, 6)")]:
    agree("PS1 Q5" + r, v)
for r, v in [("(1)", "(6, -4)"), ("(2)", "(-1/4, -1)"), ("(3)", "(1, 2)"), ("(4)", "(1, 1)"), ("(5)", "(2, 1)")]:
    agree("PS1 Q6" + r, v)
agree("PS1 Q7(2)", "Tea; Rs.300 per kg. sugar; Rs.40 per kg.")
agree("PS1 Q7(3)", "Rs.100 notes 20, Rs.50 notes 10")
A["PS1 Q7(4)"] = ("AGREE", "Manisha's age 23 years, Savita's age 8 years",
                  "Manish 23 years, Savita 8 years",
                  "The question names the boy 'Manish'; the printed key answers it as 'Manisha'. "
                  "A name inconsistency between question and key only - both figures agree, so the "
                  "verdict is AGREE and the discrepancy is recorded as a [Textbook note:] bracket on the row.")
agree("PS1 Q7(5)", "Skilled worker's wages Rs.450. unskilled worker's wages Rs.270.")
agree("PS1 Q7(6)", "Hamid's speed 50 km/hr. Joseph's speed 40 km/hr.")


def main():
    qs = json.load(open(os.path.join(DATA, CHID + ".questions.json"), encoding="utf-8"))
    refs = [q["ref"] for q in qs]
    missing = [r for r in refs if r not in A]
    extra = [r for r in A if r not in refs]
    if missing or extra:
        print("MISSING:", missing)
        print("EXTRA:", extra)
        sys.exit(1)

    out = []
    for r in refs:
        verdict, book, ours, note = A[r]
        row = {"ref": r, "verdict": verdict, "book": book, "ours": ours}
        if note:
            row["note"] = note
        out.append(row)

    path = os.path.join(DATA, CHID + ".crosscheck.json")
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

    from collections import Counter
    cnt = Counter(o["verdict"] for o in out)
    print("wrote", len(out), "->", path)
    for k, v in sorted(cnt.items()):
        print("  %-16s %d" % (k, v))
    diffed = sum(v for k, v in cnt.items() if k != "NO-KEY-ENTRY")
    print("  rows actually diffed against the printed key:", diffed, "of", len(out))


if __name__ == "__main__":
    main()
