"""
GATE lane, step 2a: the organising IIT's answer key as rows of words.

    python -P -E scripts/gate/keyrows.py 2026-cs1

Reads <ROOT>/src/<paper>-key.pdf, writes <ROOT>/work/keys/<paper>.keyrows.json: one list of
words per table row whose first word is a question number, left to right.

Read by word POSITION, never by `pdftotext -layout`: the layout text shifts a cell into
the next row when one row is taller (2026 CS2 printed Q26's key on Q30's line). The words
are then turned into the key by `parseKeyRows` (lib.ts), and every key is still checked
against the rendered page before it is trusted (README).
"""
import json
import sys
from collections import defaultdict
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(r"C:\tmp\PYQPs\GATE\CS")


def main(paper):
    doc = fitz.open(ROOT / "src" / f"{paper}-key.pdf")
    rows = []
    for page in doc:
        by_line = defaultdict(list)
        for w in page.get_text("words"):
            by_line[round((w[1] + w[3]) / 2 / 3)].append(w)
        for k in sorted(by_line):
            words = [w[4] for w in sorted(by_line[k], key=lambda w: w[0])]
            if words and words[0].isdigit():
                rows.append(words)
    out = ROOT / "work" / "keys" / f"{paper}.keyrows.json"  # never beside the pages the helpers read
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(rows, indent=0), encoding="utf-8")
    print(f"{paper}: {len(rows)} key rows -> {out}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: keyrows.py <year>-cs<set>")
    main(sys.argv[1])
