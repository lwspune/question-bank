"""
Read the Consortium's Set A FINAL answer key for one CLAT year, by word position.

    python -P scripts/clat/key.py <year>      # writes C:\\tmp\\PYQPs\\CLAT\\keys\\<year>.json

Why positions and not `pdftotext -layout`: on the 2022 and 2023 tables the layout
text puts every answer one row below its question (Q1 reads blank, Q2 reads Q1's
answer). The word boxes are right, so each answer is paired with the question
number on its own row (same baseline within 4 pt) and nearest to its left.

The table runs from the "SET A" (or "APPENDIX I") header to the next "APPENDIX"
or "SET B"; 2022's file is the table alone. Values: A-D, "W" (withdrawn) and
"C/D" (the Consortium accepted either). Refuses unless every question 1..N has
exactly one answer.
"""
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(r"C:\tmp\PYQPs\CLAT")
YEARS = json.loads((Path(__file__).parent / "years.json").read_text(encoding="utf-8"))["years"]
ANSWER = re.compile(r"^(?:[A-D]|Withdrawn|[A-D]/[A-D]\*?)$")
NUMBER = re.compile(r"^\d{1,3}$")


def table_words(doc, pages):
    """Words of the Set A table: after the "SET A" / "APPENDIX I" header, up to
    the next "APPENDIX II" / "SET B" header. Each tagged with its page."""
    flat = []
    for p in range(pages[0], pages[1] + 1):
        for w in sorted(doc[p - 1].get_text("words"), key=lambda w: (round(w[1]), w[0])):
            flat.append((p, w))
    toks = [w[4].strip(":-") for _, w in flat]
    start = end = None
    for i in range(len(toks) - 1):
        pair = (toks[i], toks[i + 1])
        if start is None and pair in (("SET", "A"), ("APPENDIX", "I")):
            start = i + 2
        elif start is not None and i >= start and pair in (("SET", "B"), ("APPENDIX", "II"), ("Question", "Number")):
            end = i
            break
    if start is None:
        return []
    return [(p, w, True) for p, w in flat[start:end]]


def read_key(year: str) -> dict:
    cfg = YEARS[year]
    n = cfg["sections"][-1][2]
    doc = fitz.open(ROOT / "src" / cfg["keyPdf"])
    pages = cfg["keyPages"]
    if year == "2022":
        # The 2022 file is the table alone: no header to start from.
        words = [(p, w, True) for p in range(pages[0], pages[1] + 1) for w in doc[p - 1].get_text("words")]
    else:
        words = table_words(doc, pages)
        if not words:
            raise SystemExit(f"{year}: no Set A table found on pages {pages}")
    nums = [(p, w) for p, w, _ in words if NUMBER.match(w[4]) and 1 <= int(w[4]) <= n]
    answers = {}
    stray = []
    for p, w, _ in words:
        if not ANSWER.match(w[4]):
            continue
        yc = (w[1] + w[3]) / 2
        best = None
        for q, nw in nums:
            if q != p:
                continue
            dx = w[0] - nw[0]
            if 0 < dx <= 160 and abs((nw[1] + nw[3]) / 2 - yc) <= 4 and (best is None or dx < best[0]):
                best = (dx, nw[4])
        if best is None:
            # A letter in running prose (2025's footnote "chose either C or D").
            # Never paired, so it cannot become an answer; listed so a person sees it.
            stray.append(f"{w[4]}@p{p}y{round(yc)}")
            continue
        q = best[1]
        v = "W" if w[4] == "Withdrawn" else w[4].rstrip("*")
        if q in answers and answers[q] != v:
            raise SystemExit(f"{year}: Q{q} read twice ({answers[q]} and {v})")
        answers[q] = v
    missing = [str(i) for i in range(1, n + 1) if str(i) not in answers]
    if missing:
        raise SystemExit(f"{year}: no answer read for Q{', Q'.join(missing)}")
    if stray:
        print(f"{year}: letters beside no question number (ignored): {stray}")
    return {str(i): answers[str(i)] for i in range(1, n + 1)}


def main():
    year = sys.argv[1]
    key = read_key(year)
    out = ROOT / "keys" / f"{year}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"year": int(year), "answers": key}, indent=1), encoding="utf-8")
    odd = {q: v for q, v in key.items() if v not in ("A", "B", "C", "D")}
    slots = {s: sum(1 for v in key.values() if v == s) for s in "ABCD"}
    print(f"{year}: {len(key)} answers -> {out}  by slot {slots}  other {odd}")


if __name__ == "__main__":
    main()
