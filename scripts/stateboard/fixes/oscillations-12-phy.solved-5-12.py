r"""One-off: bracket Example 5.12's wrong unit on the moment of inertia.

The book's own printed working reads  I = 1.7 x 10^-5 A m^2  for a MOMENT OF
INERTIA. A m^2 is the unit of MAGNETIC MOMENT (the 3.4 given in the stem);
a moment of inertia is kg m^2. Verified on the rendered page at 4x zoom.

The VALUE is right (0.12 x (1600+100)/12 x 10^-6 = 1.7e-5) and the final answer
B = 4(1.7e-5)/3.4 = 2e-5 T is unaffected, so nothing is recomputed here -- the
working is preserved as printed and the defect is recorded. That is the
"book itself printed it" case, distinct from Ex 5.1 where the printed working
contradicted its own stem and had to be corrected.

Authored as a FILE, not a heredoc. See [[heredoc-backslash-eating]].
"""
import json, pathlib, sys

p = pathlib.Path(__file__).parent / "data" / "oscillations-12-phy.solved-b.json"
rows = json.loads(p.read_text(encoding="utf8"))

BRACKET = (
    "[Textbook misprint: the book's working prints the moment of inertia as "
    "\\( I = 1.7 \\times 10^{-5}\\ \\text{A m}^2 \\); A m\\(^2\\) is the unit of magnetic "
    "moment, and a moment of inertia is in kg m\\(^2\\). The value and the final answer "
    "\\( B = 2 \\times 10^{-5} \\) T are unaffected. Preserved as printed.]\n"
)

hit = [r for r in rows if r["ref"] == "Solved Ex.5.12"]
if len(hit) != 1:
    sys.exit(f"expected exactly 1 row for Solved Ex.5.12, found {len(hit)}")
row = hit[0]

if "A m" not in row["solution"] and "\\text{A m}" not in row["solution"]:
    sys.exit("REFUSING: the flagged 'A m^2' unit is not present in the stored solution -- "
             "the transcription may differ from what was adjudicated.")
if row["solution"].startswith("[Textbook"):
    sys.exit("REFUSING: an errata bracket is already present.")

before = row["solution"]
row["solution"] = BRACKET + before
p.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf8")

back = json.loads(p.read_text(encoding="utf8"))
r2 = [r for r in back if r["ref"] == "Solved Ex.5.12"][0]
assert r2["solution"].startswith("[Textbook misprint:"), "bracket missing"
assert r2["solution"].endswith(before), "the book's printed working was altered -- it must not be"
assert r2["solution"].count("\\(") == r2["solution"].count("\\)"), "latex imbalance"
print("Solved Ex.5.12: errata bracket added; the book's printed working is byte-identical below it.")
