# Authors data/<id>.mcq-verify.json for the eight Problem-set-2 MCQs.
# Keys were derived by solving each question; that derivation is reproduced in
# alg-quadratic-equations-10.verify.py and independently agrees with the book's
# printed ANSWERS page (p.171). Per AGENT_BRIEF.md §4 this pass is NOT a blind
# re-derivation, so mark-mcq-verify.ts must NOT be run on this file.
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ID = "alg-quadratic-equations-10"

METHOD = (
    "keyed from the chapter at transcription time and re-checked against the "
    "quoted sentence; this is NOT an independent blind re-derivation, so no "
    "question_reviews row is recorded for it (do not run mark-mcq-verify.ts on this file)."
)

T = r"\(\therefore\)"


def S(*lines):
    return "\n\n".join(lines)


DERIVED = {
    "PS2 Q.1 (1)": ("B", S(
        r"An equation is quadratic when, after clearing denominators, one variable is left with maximum index 2 and a non-zero coefficient.",
        r"Option A : \(\dfrac{5}{x} - 3 = x^2\); multiplying by \(x\) gives \(5 - 3x = x^3\), index 3.",
        r"Option B : \(x(x + 5) = 2\) gives \(x^2 + 5x - 2 = 0\), index 2 with \(a = 1 \neq 0\).",
        r"Option C : \(n - 1 = 2n\) gives \(n + 1 = 0\), index 1.",
        r"Option D : \(\dfrac{1}{x^2}(x + 2) = x\); multiplying by \(x^2\) gives \(x + 2 = x^3\), index 3.",
        T + r" \(x(x + 5) = 2\) is the quadratic equation.")),
    "PS2 Q.1 (2)": ("A", S(
        r"Option A : \(x^2 + 4x = 11 + x^2\); the \(x^2\) terms cancel, leaving \(4x - 11 = 0\), a linear equation.",
        r"Option B : \(x^2 = 4x\) gives \(x^2 - 4x = 0\), quadratic.",
        r"Option C : \(5x^2 = 90\) gives \(5x^2 - 90 = 0\), quadratic.",
        r"Option D : \(2x - x^2 = x^2 + 5\) gives \(2x^2 - 2x + 5 = 0\), quadratic.",
        T + r" \(x^2 + 4x = 11 + x^2\) is the one that is not a quadratic equation.")),
    "PS2 Q.1 (3)": ("C", S(
        r"For \(x^2 + kx + k = 0\), \(a = 1\), \(b = k\), \(c = k\).",
        r"Roots are real and equal, so \(b^2 - 4ac = 0\).",
        T + r" \(k^2 - 4k = 0\)",
        T + r" \(k(k - 4) = 0\)",
        T + r" \(k = 0\) or \(k = 4\).")),
    "PS2 Q.1 (4)": ("B", S(
        r"For \(\sqrt{2}\,x^2 - 5x + \sqrt{2} = 0\), \(a = \sqrt{2}\), \(b = -5\), \(c = \sqrt{2}\).",
        r"\(b^2 - 4ac = (-5)^2 - 4 \times \sqrt{2} \times \sqrt{2} = 25 - 8 = 17\).")),
    "PS2 Q.1 (5)": ("B", S(
        r"With roots 3 and 5, the sum is 8 and the product is 15.",
        r"The equation is \(x^2 - (\text{sum})x + (\text{product}) = 0\), that is \(x^2 - 8x + 15 = 0\).")),
    "PS2 Q.1 (6)": ("D", S(
        r"For \(ax^2 + bx + c = 0\) the sum of the roots is \(-\dfrac{b}{a}\).",
        r"\(3x^2 - 15x + 3 = 0\) : sum \(= \dfrac{15}{3} = 5\).",
        r"\(x^2 - 5x + 3 = 0\) : sum \(= 5\).",
        r"\(x^2 + 3x - 5 = 0\) : sum \(= -3\).",
        r"\(3x^2 + 15x + 3 = 0\) : sum \(= -\dfrac{15}{3} = -5\).",
        T + r" \(3x^2 + 15x + 3 = 0\) is the equation whose roots add to \(-5\).")),
    "PS2 Q.1 (7)": ("C", S(
        r"For \(\sqrt{5}\,m^2 - \sqrt{5}\,m + \sqrt{5} = 0\), \(a = \sqrt{5}\), \(b = -\sqrt{5}\), \(c = \sqrt{5}\).",
        r"\(b^2 - 4ac = 5 - 4 \times \sqrt{5} \times \sqrt{5} = 5 - 20 = -15\).",
        T + r" \(b^2 - 4ac < 0\), so the roots are not real.")),
    "PS2 Q.1 (8)": ("C", S(
        r"2 is a root of \(x^2 + mx - 5 = 0\), so putting \(x = 2\) must satisfy it.",
        r"\((2)^2 + m(2) - 5 = 0\)",
        T + r" \(4 + 2m - 5 = 0\)",
        T + r" \(2m = 1\)",
        T + r" \(m = \dfrac{1}{2}\).")),
}


def main():
    with open(os.path.join(HERE, ID + ".mcq-blind.json"), encoding="utf-8") as f:
        rows = json.load(f)
    by_ref = {r["ref"]: r["id"] for r in rows}

    # The committed key, read back from the transcription source of truth, so
    # matches_current is a real comparison rather than an assumption.
    with open(os.path.join(HERE, ID + ".questions.json"), encoding="utf-8") as f:
        committed = {q["ref"]: q.get("answer") for q in json.load(f) if q.get("format") == "mcq"}

    out = []
    for ref, (ans, sol) in DERIVED.items():
        if ref not in by_ref:
            raise SystemExit("ref not in mcq dump: " + ref)
        out.append({
            "id": by_ref[ref],
            "ref": ref,
            "derived_answer": ans,
            "matches_current": committed.get(ref) == ans,
            "solution": sol,
            "method": METHOD,
        })
    for row in out:
        assert by_ref[row["ref"]] == row["id"]
    mismatch = [r["ref"] for r in out if not r["matches_current"]]
    path = os.path.join(HERE, ID + ".mcq-verify.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("wrote %d mcq verifications; mismatches: %s" % (len(out), mismatch or "none"))
    missing = sorted(set(by_ref) - set(DERIVED))
    print("mcq rows not covered: %d %s" % (len(missing), missing))


if __name__ == "__main__":
    main()
