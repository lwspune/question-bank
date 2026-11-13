"""Prove an NTPC shift's reading sheets cannot show the key through their LAYOUT.

    python -P scripts/rrb-ntpc/check_sheets.py <shiftId>

The keyed option prints ~2 pt right of the others (its tick is narrower than a cross).
tcs_sheets.py realigns every option row whose icon it finds inside the question's region, and
stops the run if the rows it realigned still start apart. So the sheet is clean exactly when
EVERY question hands it all four rows. This replays its masking (the same functions) and fails
on any question with other than four, which would leave one row, maybe the key, unaligned.
Run it after tcs_sheets.py, before any agent reads the sheets.
"""
import importlib.util
import json
import os
import sys

import fitz  # PyMuPDF

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("tcs_sheets", os.path.join(HERE, "..", "ssc-cgl", "tcs_sheets.py"))
tcs_sheets = importlib.util.module_from_spec(spec)
spec.loader.exec_module(tcs_sheets)


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: check_sheets.py <shiftId>")
    shift = sys.argv[1]
    data = json.load(open(os.path.join(HERE, "out", shift, "questions.json"), encoding="utf8"))
    doc = fitz.open(data["pdf"])
    rows = {}
    bad = []
    for q in data["questions"]:
        n = 0
        for r in q["regions"]:
            if r["page"] not in rows:
                rows[r["page"]] = tcs_sheets.mask_page(doc, doc[r["page"]], True)
            n += sum(1 for m in rows[r["page"]] if r["y0"] - 1 <= m["y0"] and m["y1"] <= r["y1"] + 1)
        if n != 4:
            bad.append(f"Q{q['number']}: {n} rows")
    if bad:
        sys.exit(f"{shift}: option rows the masking would not realign: {', '.join(bad)}")
    print(f"{shift}: all {len(data['questions'])} questions hand the masking four option rows")


if __name__ == "__main__":
    main()
