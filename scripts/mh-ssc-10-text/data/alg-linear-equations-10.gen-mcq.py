"""Build data/alg-linear-equations-10.mcq-verify.json.

Joins on `ref` against the mcq-blind dump, asserts the derived letter's OPTION
TEXT is the value actually derived (a letter alone is not a check), and asserts
the pairing id<->ref.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = HERE
CHID = "alg-linear-equations-10"

METHOD = ("keyed from the chapter at transcription time and re-checked against the "
          "quoted sentence; this is NOT an independent blind re-derivation, so no "
          "question_reviews row is recorded for it (do not run mark-mcq-verify.ts on this file).")

D = {}

D["PS1 Q1(1)"] = dict(
    letter="B", expect_text="3",
    solution="\n\n".join([
        r"Substitute \(x = 1\) in the equation of the line.",
        r"\(4x + 5y = 19\) \(\therefore 4(1) + 5y = 19\) \(\therefore 5y = 15\) \(\therefore y = 3\)",
        r"\(\therefore\) the correct alternative is the one whose value is 3.",
    ]))

D["PS1 Q1(2)"] = dict(
    letter="A", expect_text="7",
    solution="\n\n".join([
        r"By Cramer's rule \(x = \dfrac{\mathrm{D}_x}{\mathrm{D}}\).",
        r"\(x = \dfrac{49}{7} = 7\)",
        r"\(\therefore\) the correct alternative is the one whose value is 7. (\(\mathrm{D}_y\) is not needed for \(x\).)",
    ]))

D["PS1 Q1(3)"] = dict(
    letter="D", expect_text=r"1",
    solution="\n\n".join([
        r"For \(\begin{vmatrix} a & b \\ c & d \end{vmatrix}\) the value is \(ad - bc\).",
        r"\(\begin{vmatrix} 5 & 3 \\ -7 & -4 \end{vmatrix} = (5)(-4) - (3)(-7) = -20 + 21 = 1\)",
        r"\(\therefore\) the correct alternative is the one whose value is 1.",
    ]))

D["PS1 Q1(4)"] = dict(
    letter="C", expect_text=r"\(-5\)",
    solution="\n\n".join([
        r"Write both equations in the form \(ax + by = c\): \(x + y = 3\) and \(3x - 2y = 4\).",
        r"D is the determinant of the coefficients of \(x\) and \(y\).",
        r"\(\mathrm{D} = \begin{vmatrix} 1 & 1 \\ 3 & -2 \end{vmatrix} = (1)(-2) - (1)(3) = -2 - 3 = -5\)",
        r"\(\therefore\) the correct alternative is the one whose value is \(-5\).",
    ]))

D["PS1 Q1(5)"] = dict(
    letter="A", expect_text="Only one common solution.",
    solution="\n\n".join([
        r"For \(ax + by = c\) and \(mx + ny = d\), the determinant of the coefficients is \(\mathrm{D} = an - bm\).",
        r"Given \(an \neq bm\), so \(\mathrm{D} \neq 0\), and Cramer's rule gives exactly one value of \(x\) and one value of \(y\).",
        r"Geometrically the two lines are neither parallel nor coincident, so they cut each other at exactly one point.",
        r"\(\therefore\) the equations have only one common solution.",
    ]))


def main():
    blind = json.load(open(os.path.join(DATA, CHID + ".mcq-blind.json"), encoding="utf-8"))
    by_ref = {r["ref"]: r for r in blind}
    assert set(by_ref) == set(D), (sorted(set(by_ref) ^ set(D)))

    out = []
    for ref, spec in D.items():
        row = by_ref[ref]
        assert row["ref"] == ref
        opts = {o["label"]: o["text"] for o in row["options"]}
        assert set(opts) == {"A", "B", "C", "D"}, ref
        # the check that matters: the letter must carry the value we derived
        assert opts[spec["letter"]] == spec["expect_text"], (
            ref, spec["letter"], repr(opts[spec["letter"]]), repr(spec["expect_text"]))
        out.append({
            "id": row["id"],
            "ref": ref,
            "derived_answer": spec["letter"],
            "matches_current": True,
            "solution": spec["solution"],
            "method": METHOD,
        })

    path = os.path.join(DATA, CHID + ".mcq-verify.json")
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print("wrote", len(out), "mcq verifications ->", path)
    print("derived:", " ".join(o["derived_answer"] for o in out))


if __name__ == "__main__":
    main()
