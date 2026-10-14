"""Blank every solution in one topaper file, so merge-solutions.py can refill it.

Usage: python -P scripts/cbse-12-pyq/reset-solutions.py scripts/cbse-12-pyq/data/<paperId>.topaper.json

merge-solutions.py only fills BLANK rows. To redo a paper's solutions after a
sidecar edit: run this, then merge-solutions.py and apply-solutions.ts again.
It refuses a file the writer cannot round-trip byte for byte, the same guard
merge-solutions.py uses, so it never reformats the file.
"""
import json
import pathlib
import sys

p = pathlib.Path(sys.argv[1])
raw = p.read_bytes()
doc = json.loads(raw.decode("utf-8"))


def ser(d):
    return json.dumps(d, indent=1, ensure_ascii=False)


if ser(doc).encode("utf-8") != raw:
    sys.exit("REFUSING: round-trip is not byte-identical; this writer would reformat " + p.name)
for r in doc["rows"]:
    r["solution"] = ""
p.write_text(ser(doc), encoding="utf-8", newline="")
print("reset", len(doc["rows"]), "solutions in", p.name)
