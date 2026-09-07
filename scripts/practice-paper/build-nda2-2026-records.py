"""
Turn the vision-transcription output for the NDA2_2026 series into committed
records files, applying the five adjudicated REPAIRS on the way.

    python scripts/practice-paper/build-nda2-2026-records.py <transcriptionDir>

Only 6 of the 11 transcribed questions are committed. The other 5 are
irredeemably flawed (no correct option exists, or the question is structurally
unfixable) and are REPLACED in the mock by an existing bank row instead — see
scripts/mocks/data/nda2-2026-practice.json, where each substitution records its
own reason.

EVERY REPAIR ASSERTS ITS BEFORE-STATE and refuses the whole run on a mismatch.
That is the difference between a repair and a rewrite: if the transcription is
ever re-run and a value moves, this stops rather than silently "fixing"
something else. Each repair also carries the evidence that justifies it.
"""
import json
import os
import sys

# (paper, n) -> the six questions that survive adjudication.
KEEP = {("t1", 63), ("t1", 65), ("t1", 68), ("t2", 109), ("t4", 49), ("t4", 92)}

# Source file per paper — must match scripts/mocks/data/nda2-2026-practice.json,
# because the mock builder resolves a new question by (source_file, question_number).
SOURCE = {
    "t1": "NDA2_2026_Maths_Practice_Mock_1.pdf",
    "t2": "NDA2_2026_Maths_Practice_Mock_2.pdf",
    "t4": "NDA2_2026_Maths_Practice_Mock_4.pdf",
}

SLUG = {"t1": "nda2-2026-mock-1-new", "t2": "nda2-2026-mock-2-new", "t4": "nda2-2026-mock-4-new"}

Q63_SOLUTION = (
    "The three boundary lines meet pairwise at \\((0, 3)\\), \\((0, -5)\\) and \\((6, 0)\\), so the region "
    "is the triangle with those vertices. Its area is \\(\\tfrac{1}{2} \\times 8 \\times 6 = 24\\). The line "
    "\\(y = 1\\) cuts it at \\((0, 1)\\) and at \\((4, 1)\\) on \\(2y + x = 6\\), so the part with \\(y > 1\\) "
    "is the triangle \\((0,1), (0,3), (4,1)\\) of area \\(\\tfrac{1}{2} \\times 2 \\times 4 = 4\\). Hence "
    "\\(P(y < 1) = \\dfrac{24 - 4}{24} = \\dfrac{5}{6}\\). That value is neither \\(\\tfrac{1}{4}\\) nor "
    "\\(\\tfrac{5}{9}\\), and option (c) states no value at all, so the correct choice is None of these. "
    "Matches option D."
)

Q65_SOLUTION = (
    "The first draw takes 4 balls from 15, so \\(P_1 = \\dfrac{\\binom{6}{4}}{\\binom{15}{4}} = "
    "\\dfrac{15}{1365} = \\dfrac{1}{91}\\). Four white balls having gone, the urn holds 2 white and 9 black, "
    "so the second draw of 4 from 11 gives \\(P_2 = \\dfrac{\\binom{9}{4}}{\\binom{11}{4}} = "
    "\\dfrac{126}{330} = \\dfrac{21}{55}\\). By the multiplication rule the required probability is "
    "\\(P_1 P_2 = \\dfrac{1}{91} \\times \\dfrac{21}{55} = \\dfrac{21}{5005} = \\dfrac{3}{715}\\). "
    "Matches option B."
)

Q68_SOLUTION = (
    "The combined mean is \\(\\bar{x} = \\dfrac{10(10) + 20(20)}{30} = \\dfrac{500}{30} = \\dfrac{50}{3}\\). "
    "The group means deviate from it by \\(d_1 = 10 - \\tfrac{50}{3} = -\\tfrac{20}{3}\\) and "
    "\\(d_2 = 20 - \\tfrac{50}{3} = \\tfrac{10}{3}\\). Then "
    "\\(\\sigma^2 = \\dfrac{n_1(\\sigma_1^2 + d_1^2) + n_2(\\sigma_2^2 + d_2^2)}{n_1 + n_2} = "
    "\\dfrac{10\\left(4 + \\tfrac{400}{9}\\right) + 20\\left(9 + \\tfrac{100}{9}\\right)}{30} = "
    "\\dfrac{266}{9} = 29.56\\) to two decimal places. Matches option B."
)

Q92_SOLUTION = (
    "Only ranks \\(2\\) to \\(10\\) carry a number. The prime ranks are \\(2, 3, 5, 7\\) (16 cards) and the "
    "multiples of \\(5\\) are \\(5\\) and \\(10\\) (8 cards). Rank \\(5\\) is in BOTH sets, so the two "
    "categories are not disjoint and the product \\(16 \\times 8\\) is not a count of two-card hands: it "
    "counts selections that take the same five twice and double-counts the pairs of fives. Count directly "
    "instead, splitting the primes into \\(A\\) = ranks \\(2, 3, 7\\) (12 cards) and \\(C\\) = rank \\(5\\) "
    "(4 cards), with \\(B\\) = rank \\(10\\) (4 cards). Favourable hands are \\(A\\) with \\(B\\): "
    "\\(12 \\times 4 = 48\\); \\(A\\) with \\(C\\): \\(12 \\times 4 = 48\\); \\(C\\) with \\(B\\): "
    "\\(4 \\times 4 = 16\\); and two fives, which satisfy both conditions at once: \\(\\binom{4}{2} = 6\\). "
    "That is \\(48 + 48 + 16 + 6 = 118\\) hands out of \\(\\binom{52}{2} = 1326\\), so the probability is "
    "\\(\\dfrac{118}{1326} = \\dfrac{59}{663}\\). Matches option D."
)

# Each repair: (paper, n) -> list of (field, expected_before, after).
# A mismatch on ANY expected value aborts the whole run.
REPAIRS = {
    # The key was simply wrong: 5/6 is neither (a) nor (b), and (c) is not a
    # value, so "None of these" is correct. No content changes.
    ("t1", 63): [("answer", "C", "D"), ("solution", None, Q63_SOLUTION)],
    # Option (b) already carries the RIGHT numerator and two other options use
    # /715, so 256 is a denominator typo for 715.
    ("t1", 65): [("optB", "\\(\\frac{3}{256}\\)", "\\(\\frac{3}{715}\\)"),
                 ("answer", "A", "B"), ("solution", None, Q65_SOLUTION)],
    # True value 266/9 = 29.5556. The paper's own working prints 29.53 and then
    # keys 29.33 - a corrupted digit in the option, not a wrong method.
    ("t1", 68): [("optB", "29.33", "29.56"), ("solution", None, Q68_SOLUTION)],
    # The printed denominator is x^3 (confirmed at 9x DPI and from span metrics),
    # over which the limit diverges. The paper's OWN solution restates it as x^2
    # and reaches 12 = option (a), so the stem is the misprint and the key is right.
    ("t4", 49): [("stem",
                  "If \\(f''(x)\\) is continuous at \\(x = 0\\) and \\(f''(0) = 4\\), then value of "
                  "\\(\\lim_{x \\to 0} \\dfrac{2f(x) - 3f(2x) + f(4x)}{x^{3}}\\) is equal to",
                  "If \\(f''(x)\\) is continuous at \\(x = 0\\) and \\(f''(0) = 4\\), then value of "
                  "\\(\\lim_{x \\to 0} \\dfrac{2f(x) - 3f(2x) + f(4x)}{x^{2}}\\) is equal to")],
    # Same denominator, wrong numerator: 64 -> 59. Verified by enumerating all
    # 1326 two-card hands.
    ("t4", 92): [("optD", "\\(\\dfrac{64}{663}\\)", "\\(\\dfrac{59}{663}\\)"),
                 ("solution", None, Q92_SOLUTION)],
}


def main() -> None:
    src_dir = sys.argv[1]
    paper_of = {"new_t1.json": "t1", "new_t4.json": "t4"}
    rows = []
    for fname in ("new_t1.json", "new_t2t3.json", "new_t4.json"):
        with open(os.path.join(src_dir, fname), encoding="utf-8") as fh:
            for rec in json.load(fh):
                rec["paper"] = rec.get("paper") or paper_of[fname]
                rows.append(rec)

    kept = [r for r in rows if (r["paper"], r["n"]) in KEEP]
    if len(kept) != len(KEEP):
        raise SystemExit(f"expected {len(KEEP)} kept records, found {len(kept)}")

    applied = 0
    for rec in kept:
        for field, before, after in REPAIRS.get((rec["paper"], rec["n"]), []):
            if before is not None and rec.get(field) != before:
                raise SystemExit(
                    f"REFUSED {rec['paper']} Q{rec['n']}: {field} is\n"
                    f"  {rec.get(field)!r}\nexpected\n  {before!r}"
                )
            rec[field] = after
            applied += 1
        # Repaired questions are genuinely usable now, so they are no longer
        # "flawed" - shipping them as flawed would keep them out of the bank.
        rec["status"] = "new"
        rec.pop("keyAgrees", None)
        rec.pop("keyNote", None)
        rec.pop("needsFigure", None)

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
    os.makedirs(out_dir, exist_ok=True)
    for paper, slug in SLUG.items():
        mine = sorted((r for r in kept if r["paper"] == paper), key=lambda r: r["n"])
        recs = [
            {
                "n": r["n"], "stem": r["stem"],
                "optA": r["optA"], "optB": r["optB"], "optC": r["optC"], "optD": r["optD"],
                "answer": r["answer"], "solution": r["solution"],
                "difficulty": r["difficulty"], "chapter": r["chapter"], "subtopic": r["subtopic"],
                "status": "new",
                **({"reviewNote": r["reviewNote"]} if r.get("reviewNote") else {}),
            }
            for r in mine
        ]
        path = os.path.join(out_dir, f"{slug}.records.json")
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(recs, fh, ensure_ascii=False, indent=1)
        print(f"{slug}.records.json  {len(recs)} record(s)  n={[r['n'] for r in recs]}  source_file={SOURCE[paper]}")
    print(f"\n{applied} repair field(s) applied, all before-states asserted")


if __name__ == "__main__":
    main()
