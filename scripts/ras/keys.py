"""
Read RPSC's RAS Prelims answer keys (text-layer PDFs) into key.json files.

    python -P scripts/ras/keys.py            # report every key, write nothing
    python -P scripts/ras/keys.py --write    # write <KEY_ROOT>/<year>.key.json

The JSON is the shape `../upsc/lib.ts parseOfficialKey` reads: {"1": "A", ...},
with "X" for a question RPSC deleted. RPSC prints the answer as 1-4; the bank
labels options A-D in printed order, so 1 -> A ... 4 -> D.

The files are written OUTSIDE the repo (KEY_ROOT) on purpose: a blind
derivation pass must never be able to read the key. keycheck.ts copies one into
data/ only after both passes for that paper are on disk.

WHY POSITIONS, NOT `pdftotext -layout`. The 2016 key sets each answer half a
row above its question number, and `-layout` then prints Q1 with no answer and
Q2 with Q1's. Every key is read here as words with coordinates: each RES column
is paired with the Q.No. column to its left, and an answer with the question
whose row it overlaps most. A deleted question is a BLANK cell in 2013 (the
key's own note says so) and `*` from 2016 on; both become "X".

`**` (2016 only) marks a question deleted for BLIND candidates alone. It keeps
its answer for everyone else, which is the paper we publish, so the `**` is
dropped and the digit kept.
"""

import json
import sys
from pathlib import Path

import fitz

KEY_ROOT = Path(r"C:\Vilas\LWS_Pune\RPSC\RAS\keys")
KEYS = {
    "2013": "RAS_Pre_2013_RevisedKey.pdf",
    "2016": "RAS_Pre_2016_FinalKey.pdf",
    "2018": "RAS_Pre_2018_FinalKey.pdf",
    "2021": "RAS_Pre_2021_FinalKey.pdf",
    "2023": "RAS_Pre_2023_FinalKey.pdf",
    "2024": "RAS_Pre_2024_FinalKey.pdf",
}
TOTAL = 150
LETTER = {"1": "A", "2": "B", "3": "C", "4": "D"}


def read_key(pdf: Path) -> tuple[dict[str, str], list[str]]:
    notes: list[str] = []
    out: dict[str, str] = {}
    doc = fitz.open(pdf)
    for page in doc:
        words = page.get_text("words")
        heads = [w for w in words if w[4].upper().startswith("RES")]
        qheads = [w for w in words if w[4].upper().rstrip(".") in ("Q", "Q.NO", "QNO")]
        if not heads:
            continue
        head_y = max(w[3] for w in heads)
        # Column bands: each RES header owns the x-range from its Q.No. header
        # (the nearest Q header to its left) to just past itself.
        cols = []
        for h in sorted(heads, key=lambda w: w[0]):
            left = [q for q in qheads if q[0] < h[0]]
            qx = max((q[0] for q in left), default=h[0] - 120)
            cols.append((qx - 15, (qx + h[0]) / 2, h[2] + 25))
        body = [w for w in words if w[1] > head_y - 1]
        for qlo, split, rhi in cols:
            qs = [w for w in body if qlo <= w[0] < split and w[4].isdigit()]
            rs = [w for w in body if split <= w[0] < rhi]
            for q in qs:
                n = int(q[4])
                if not 1 <= n <= TOTAL:
                    continue
                best, overlap = None, 0.0
                for r in rs:
                    ov = min(q[3], r[3]) - max(q[1], r[1])
                    if ov > overlap:
                        best, overlap = r, ov
                cell = best[4] if best else ""
                # A row's answer must overlap the number by half its height;
                # less is the NEXT row's answer reached through a blank cell.
                if best and overlap < 0.5 * (q[3] - q[1]):
                    cell = ""
                cell = cell.replace("**", "").strip()
                if cell == "" or cell == "*":
                    out[str(n)] = "X"
                elif cell in LETTER:
                    out[str(n)] = LETTER[cell]
                else:
                    notes.append(f"Q{n}: unexpected cell {cell!r}")
                if best and "**" in best[4]:
                    notes.append(f"Q{n}: '**' = deleted for blind candidates only; answer kept")
    return out, notes


def main() -> None:
    write = "--write" in sys.argv
    bad = False
    for year, name in KEYS.items():
        key, notes = read_key(KEY_ROOT / name)
        missing = [n for n in range(1, TOTAL + 1) if str(n) not in key]
        dropped = [int(n) for n, v in key.items() if v == "X"]
        spread = {L: sum(1 for v in key.values() if v == L) for L in "ABCD"}
        print(f"{year}: {len(key)}/{TOTAL} read, deleted {sorted(dropped)}, spread {spread}")
        for m in notes:
            print(f"    note: {m}")
        if missing:
            bad = True
            print(f"    MISSING: Q{', Q'.join(map(str, missing))}")
            continue
        if write:
            ordered = {str(n): key[str(n)] for n in range(1, TOTAL + 1)}
            (KEY_ROOT / f"{year}.key.json").write_text(json.dumps(ordered) + "\n", encoding="utf8")
    if bad:
        sys.exit(1)


if __name__ == "__main__":
    main()
