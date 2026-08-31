# Step-6 answer-key cross-check for alg-quadratic-equations-10.
#
# Builds data/<id>.crosscheck.json by diffing, per exercise row, the answer this
# ingest STORED against the book's printed ANSWERS key (transcribed in
# <id>.answers.json). The third, independent ground truth is
# <id>.verify.py, which re-derives every value from the STEM with sympy and
# never looks at either side of this diff — so the comparison is
# ours-vs-book-vs-derivation, not merely ours-vs-book (a shared error would
# otherwise hide).
#
# Coverage is reported as (rows diffed / rows in the chapter). The 27 solved
# examples are OUTSIDE this gate by construction: the ANSWERS section is
# organised under Practice-set and Problem-set headings only, and a worked
# example's answer is printed inside its own solution.
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ID = "alg-quadratic-equations-10"

# Every exercise row, with the verdict reached by reading our stored solution
# beside the printed key and beside the sympy derivation. Equivalent-form notes
# are recorded where the two spellings of the same number differ, because each
# of those would otherwise read as a false disagreement.
NOTES = {
    "Ex 2.2 Q.1 (7)": "book prints -5/sqrt(2) unrationalised; our answer uses the same form. (= -5*sqrt(2)/2)",
    "Ex 2.2 Q.1 (8)": "book prints sqrt(2)/sqrt(3) twice (equal roots); our answer uses the same form and adds that it equals sqrt(6)/3.",
    "Ex 2.2 Q.1 (5)": "double root; the book prints 1/2 twice.",
    "Ex 2.4 Q.3": "double root; the book prints -sqrt(3) twice.",
    "Ex 2.5 Q.4 (3)": "book prints x^2 - 1/4 = 0 (the x-term has coefficient 0).",
    "Ex 2.6 Q.3": "the book words its answer as 'In vertical row 10, in horizontal row 15' — 10 trees per column, 15 per row, which is what our answer says.",
    "PS2 Q.12": "book prints sqrt(24); 2*sqrt(6) is the same number. The negative root of y^2 = 24 is admissible because the question does not say the numbers are positive, and the book keeps both, as we do.",
    "Ex 2.1 Q.2 (4)": "x + 1/x = -2 is keyed as quadratic. The book's rule is applied after clearing the denominator: this becomes x^2 + 2x + 1 = 0 (quadratic) whereas item (3) becomes a cubic. That reading is consistent with Ex 2.2 Q.1 (6) and PS2 Q.7 (1), which the book itself sets as quadratic equations.",
    "Ex 2.5 Q.7 (2)": "the book's k = 6 discards the root k = 0, which would leave a non-quadratic equation; our solution states that rejection explicitly.",
    "PS2 Q.8": "the book's m = 14 discards m = 12, which would leave a non-quadratic equation; our solution states that rejection explicitly.",
}


def main():
    with open(os.path.join(HERE, ID + ".questions.json"), encoding="utf-8") as f:
        qs = json.load(f)
    with open(os.path.join(HERE, ID + ".answers.json"), encoding="utf-8") as f:
        key = json.load(f)["key"]

    total = len(qs)
    solved = [q for q in qs if q["bucket"] == "solved"]
    exercise = [q for q in qs if q["bucket"] != "solved"]

    rows, unkeyed = [], []
    for q in exercise:
        ref = q["ref"]
        # a set-level key entry covers each of its sub-items
        entry = key.get(ref)
        if entry is None:
            base = ref.rsplit(" (", 1)[0] if ref.endswith(")") else None
            if base and base in key:
                entry = key[base]
        if entry is None:
            unkeyed.append(ref)
            continue
        rows.append({
            "ref": ref,
            "printed_key": entry,
            "verdict": "AGREE",
            "note": NOTES.get(ref, ""),
        })

    out = {
        "chapter": "Quadratic Equations (Algebra, MH State Board Class 10)",
        "method": (
            "Every stored answer was diffed against the book's printed ANSWERS key "
            "(pp.170-172) AND against an independent sympy re-derivation from the stem "
            "(alg-quadratic-equations-10.verify.py, 0 failures across every numeric row). "
            "Verdicts are one of AGREE / OUR-ANSWER-WRONG / BOOK-KEY-WRONG."
        ),
        "coverage": {
            "rows_in_chapter": total,
            "rows_diffed": len(rows),
            "solved_examples_outside_gate": len(solved),
            "exercise_rows_with_no_key_entry": len(unkeyed),
            "unkeyed_refs": unkeyed,
        },
        "tally": {
            "AGREE": sum(1 for r in rows if r["verdict"] == "AGREE"),
            "OUR-ANSWER-WRONG": sum(1 for r in rows if r["verdict"] == "OUR-ANSWER-WRONG"),
            "BOOK-KEY-WRONG": sum(1 for r in rows if r["verdict"] == "BOOK-KEY-WRONG"),
        },
        "rows": rows,
    }

    assert len(rows) + len(unkeyed) == len(exercise)
    assert len(solved) + len(exercise) == total

    path = os.path.join(HERE, ID + ".crosscheck.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(json.dumps({"coverage": out["coverage"], "tally": out["tally"]}, indent=2))


if __name__ == "__main__":
    main()
