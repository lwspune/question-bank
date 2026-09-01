r"""One-off: correct Example 5.1(iii)'s printed working + add the errata bracket.

The book's stem asks for the acceleration at a displacement of 1 cm, but its own
printed working substitutes 0.04 m (= 4 cm, the displacement from part (i)) and
reports -1 m/s^2. With the stem's 1 cm the answer is -0.25 m/s^2.

The STEM is the correct half and is preserved verbatim: part (i) already gives
the restoring force at 4 cm, so a part (iii) reusing 4 cm would collapse to
a = F/m and ask nothing new. It is the SOLUTION that is defective, and a solved
example ships its solution to students as the model answer -- so leaving it would
teach the error (the Limits 7.1.7 precedent). Corrected + bracketed.

Authored as a FILE, not a heredoc: `python -c` double-escapes, so \frac/\times
arrive as control characters. See [[heredoc-backslash-eating]].
"""
import json, pathlib, sys

p = pathlib.Path(__file__).parent / "data" / "oscillations-12-phy.solved-a.json"
rows = json.loads(p.read_text(encoding="utf8"))

OLD = r"\( a = -\omega^2 x = -\frac{k}{m} x = -\frac{5}{0.2} \times 0.04 = -1\ \text{m s}^{-2} \)"
NEW = (
    r"\( a = -\omega^2 x = -\frac{k}{m} x = -\frac{5}{0.2} \times 0.01 = -0.25\ \text{m s}^{-2} \)"
)
BRACKET = (
    "[Textbook misprint: the book's printed working for part (iii) substitutes "
    "\\( x = 0.04 \\) m (4 cm, the displacement given in part (i)) instead of the "
    "1 cm the question asks for, and so prints \\( a = -1\\ \\text{m s}^{-2} \\). "
    "The stem is preserved as printed; the working is corrected to use \\( x = 0.01 \\) m, "
    "giving \\( a = -0.25\\ \\text{m s}^{-2} \\).]\n"
)

hit = [r for r in rows if r["ref"] == "Solved Ex.5.1"]
if len(hit) != 1:
    sys.exit(f"expected exactly 1 row for Solved Ex.5.1, found {len(hit)}")
row = hit[0]

if OLD not in row["solution"]:
    sys.exit("REFUSING: the target working is not present verbatim -- already fixed, or the text moved.")
if row["solution"].count(OLD) != 1:
    sys.exit("REFUSING: target appears more than once.")
if row["solution"].startswith("[Textbook"):
    sys.exit("REFUSING: an errata bracket is already present.")

row["solution"] = BRACKET + row["solution"].replace(OLD, NEW)
p.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf8")

# Read back and assert, rather than trusting the write.
back = json.loads(p.read_text(encoding="utf8"))
r2 = [r for r in back if r["ref"] == "Solved Ex.5.1"][0]
assert "0.01" in r2["solution"] and "-0.25" in r2["solution"], "correction missing"
assert r2["solution"].startswith("[Textbook misprint:"), "bracket missing"
assert OLD not in r2["solution"], "old working still present"
assert r2["stem"].endswith("mean position is 1 cm."), "stem was modified -- it must not be"
assert r2["solution"].count("\\(") == r2["solution"].count("\\)"), "latex imbalance"
print("Solved Ex.5.1: working corrected 0.04 -> 0.01, answer -1 -> -0.25 m/s^2, bracket added.")
print("stem unchanged; latex balanced.")
