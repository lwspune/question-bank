"""
Read an ENEM answer key (gabarito) by POSITION.

    python scripts/enem/key.py <gabarito.pdf> <first>-<last> [<first>-<last> ...] --out <key.json>

For each question number in the ranges, the answer is the nearest word to its
right on the same row: a letter A-E, or "Anulado" (cancelled by INEP). Reading
by position, not by `pdftotext -layout`: on the CLAT keys the layout text put
answers one row low (2026-11-11). The run fails unless every number in the
ranges is found exactly once.
"""
import json
import re
import sys

import fitz


def main():
    argv = sys.argv[1:]
    out = argv[argv.index("--out") + 1]
    pdf = argv[0]
    want = set()
    for a in argv[1:]:
        if re.fullmatch(r"\d+-\d+", a):
            lo, hi = map(int, a.split("-"))
            want |= set(range(lo, hi + 1))
    doc = fitz.open(pdf)
    key, seen = {}, {}
    for page in doc:
        words = page.get_text("words")  # x0, y0, x1, y1, word, ...
        for w in words:
            if not re.fullmatch(r"\d{1,3}", w[4]) or int(w[4]) not in want:
                continue
            n = int(w[4])
            yc = (w[1] + w[3]) / 2
            right = [v for v in words if v[0] > w[2] and abs((v[1] + v[3]) / 2 - yc) < 3]
            right.sort(key=lambda v: v[0])
            ans = next((v[4] for v in right if re.fullmatch(r"[A-E]|Anulad[oa]", v[4], re.I)), None)
            if ans is None:
                continue
            seen[n] = seen.get(n, 0) + 1
            key[n] = "ANULADO" if ans.lower().startswith("anulad") else ans.upper()
    missing = sorted(want - set(key))
    twice = sorted(n for n, c in seen.items() if c > 1)
    if missing or twice:
        print(f"FAIL: missing {missing}, read twice {twice}")
        sys.exit(1)
    json.dump({str(n): key[n] for n in sorted(key)}, open(out, "w", encoding="utf-8"), indent=1)
    letters = {c: sum(1 for v in key.values() if v == c) for c in ["A", "B", "C", "D", "E", "ANULADO"]}
    print(f"{len(key)} answers {letters}; cancelled {[n for n in sorted(key) if key[n] == 'ANULADO']}")


if __name__ == "__main__":
    main()
