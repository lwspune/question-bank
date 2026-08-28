# MCQ keys for Problem Set 3 Q1(1)-(10).
#
# HONEST METHOD (per AGENT_BRIEF §4): the options were transcribed and keyed in the
# SAME pass, so this is NOT an independent blind re-derivation. mark-mcq-verify.ts
# is deliberately NOT run on this file and no question_reviews row is recorded.
# Every key is nonetheless re-derived from the option set by
# data/alg-arithmetic-progression-10.verify.py, and separately agrees with the
# book's printed key on p172 (idx 181): B C B D B C C A A B.
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ID = "alg-arithmetic-progression-10"

METHOD = ("keyed from the chapter at transcription time and re-checked against the quoted "
          "sentence; this is NOT an independent blind re-derivation, so no question_reviews "
          "row is recorded for it (do not run mark-mcq-verify.ts on this file).")

ANS = {
    "PS3 Q1(1)": ("B",
        r"\(t_2 - t_1 = -6 - (-10) = 4\), \(t_3 - t_2 = -2 - (-6) = 4\), "
        r"\(t_4 - t_3 = 2 - (-2) = 4\)." "\n\n"
        r"The difference is constant and equal to 4, so the sequence is an A.P. with "
        r"\(d = 4\) — the option pairing “is an A.P.” with \(d = 4\)." "\n\n"
        r"(The terms are increasing, so a negative \(d\) is impossible; and a constant "
        r"difference rules out “is not an A.P.”)"),
    "PS3 Q1(2)": ("C",
        r"\(a = -2\), \(d = -2\)." "\n\n"
        r"\(t_1 = -2\), \(t_2 = -2 + (-2) = -4\), \(t_3 = -4 + (-2) = -6\), "
        r"\(t_4 = -6 + (-2) = -8\)." "\n\n"
        r"\(\therefore\) The first four terms are \(-2, -4, -6, -8\)." "\n\n"
        r"(The lists \(-2, 4, -8, 16\) and \(-2, -4, -8, -16\) are obtained by **multiplying** by "
        r"\(-2\) and by 2 — those are geometric, not arithmetic.)"),
    "PS3 Q1(3)": ("B",
        r"The first 30 natural numbers are \(1, 2, 3, \ldots, 30\), an A.P. with \(a = 1\), "
        r"\(d = 1\), \(n = 30\)." "\n\n"
        r"\(S_n = \dfrac{n(n + 1)}{2}\)" "\n\n"
        r"\(S_{30} = \dfrac{30 \times 31}{2} = 15 \times 31 = 465\)" "\n\n"
        r"\(\therefore\) The sum is 465."),
    "PS3 Q1(4)": ("D",
        r"\(t_7 = a + 6d\)" "\n\n"
        r"\(4 = a + 6(-4)\)" "\n\n"
        r"\(4 = a - 24\)" "\n\n"
        r"\(\therefore\) \(a = 28\)" "\n\n"
        r"Check: starting at 28 and subtracting 4 six times gives "
        r"\(28, 24, 20, 16, 12, 8, 4\) — the seventh term is 4. \(\checkmark\)"),
    "PS3 Q1(5)": ("B",
        r"\(t_n = a + (n - 1)d = 3.5 + (101 - 1) \times 0 = 3.5 + 0 = 3.5\)" "\n\n"
        r"When \(d = 0\) every term of the A.P. equals the first term, whatever \(n\) is." "\n\n"
        r"\(\therefore\) \(t_n = 3.5\)."),
    "PS3 Q1(6)": ("C",
        r"First two terms are \(-3\) and 4, so \(d = 4 - (-3) = 7\)." "\n\n"
        r"\(t_{21} = a + 20d = -3 + 20 \times 7 = -3 + 140 = 137\)" "\n\n"
        r"\(\therefore\) The \(21^{\text{st}}\) term is 137."),
    "PS3 Q1(7)": ("C",
        r"\(t_{18} = a + 17d\) and \(t_{13} = a + 12d\)." "\n\n"
        r"\(t_{18} - t_{13} = (a + 17d) - (a + 12d) = 5d\)" "\n\n"
        r"\(= 5 \times 5 = 25\)" "\n\n"
        r"\(\therefore\) The difference is 25. (\(a\) cancels, so the first term is not needed — "
        r"and note it is \(5d\), not \(d\) or \((18 - 13 + 1)d\).)"),
    "PS3 Q1(8)": ("A",
        r"The first five multiples of 3 are \(3, 6, 9, 12, 15\)." "\n\n"
        r"\(3 + 6 + 9 + 12 + 15 = 45\)" "\n\n"
        r"By formula: \(S_5 = \dfrac{5}{2}[2 \times 3 + (5 - 1) \times 3] = \dfrac{5}{2}[6 + 12] "
        r"= \dfrac{5}{2} \times 18 = 45\)" "\n\n"
        r"\(\therefore\) The sum is 45."),
    "PS3 Q1(9)": ("A",
        r"Here \(a = 15\), \(d = 10 - 15 = -5\), \(n = 10\)." "\n\n"
        r"\(S_n = \dfrac{n}{2}[2a + (n - 1)d]\)" "\n\n"
        r"\(S_{10} = \dfrac{10}{2}[2 \times 15 + 9 \times (-5)] = 5[30 - 45] = 5 \times (-15) = -75\)" "\n\n"
        r"\(\therefore\) The sum of the first 10 terms is \(-75\)." "\n\n"
        r"(The terms are \(15, 10, 5, 0, -5, -10, -15, -20, -25, -30\); adding them gives "
        r"\(-75\).)"),
    "PS3 Q1(10)": ("B",
        r"With the first and last terms known, use" "\n\n"
        r"\(S_n = \dfrac{n}{2}(\text{first term} + \text{last term})\)" "\n\n"
        r"\(399 = \dfrac{n}{2}(1 + 20) = \dfrac{21n}{2}\)" "\n\n"
        r"\(21n = 798\)" "\n\n"
        r"\(\therefore\) \(n = 38\)"),
}

blind = json.load(open(os.path.join(HERE, f"{ID}.mcq-blind.json"), encoding="utf-8"))
by_ref = {r["ref"]: r for r in blind}
assert len(by_ref) == len(blind) == 10, len(blind)
assert set(by_ref) == set(ANS), (set(by_ref) ^ set(ANS))

out = []
for r in blind:
    a, s = ANS[r["ref"]]
    # the pairing gate — this row's id must be the dump's id FOR THIS REF
    assert by_ref[r["ref"]]["id"] == r["id"]
    out.append({"id": r["id"], "ref": r["ref"], "derived_answer": a,
                "solution": s, "method": METHOD})

path = os.path.join(HERE, f"{ID}.mcq-verify.json")
with open(path, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write("\n")
print("keys:", "".join(x["derived_answer"] for x in out))
print("printed book key (p172):", "BCBDBCCAAB")
assert "".join(x["derived_answer"] for x in out) == "BCBDBCCAAB"
print(f"wrote {len(out)} -> {path}")
