"""Read-only checker for a CBSE Class 10 solution sidecar.

Usage: python -P scripts/cbse-12-pyq/check-sidecar.py <paperId>
Run from the repo root (C:/Users/vilas/Downloads/Question_Bank).

Checks the sidecar scripts/cbse-12-pyq/data/_sol_<paperId>.txt against
scripts/cbse-12-pyq/data/<paperId>.topaper.json. Writes nothing.
"""
import json
import pathlib
import re
import sys

NL = chr(10)
DATA = pathlib.Path("scripts/cbse-12-pyq/data")

pid = sys.argv[1]
rows = json.loads((DATA / (pid + ".topaper.json")).read_text(encoding="utf-8"))["rows"]
raw = (DATA / ("_sol_" + pid + ".txt")).read_text(encoding="utf-8")

problems = []

if re.search("[" + chr(0) + "-" + chr(8) + chr(11) + chr(12) + chr(14) + "-" + chr(31) + chr(127) + "]", raw):
    problems.append("control character in the sidecar")

blocks = {}
order = []
cur = None
for line in raw.split(NL):
    m = re.fullmatch(r"===([A-Za-z0-9]+)===", line.strip())
    if m:
        cur = m.group(1)
        if cur in blocks:
            problems.append("duplicate block " + cur)
        blocks[cur] = []
        order.append(cur)
        continue
    if cur is not None:
        blocks[cur].append(line)
sol = {k: NL.join(v).strip() for k, v in blocks.items()}

refs = [r["ref"] for r in rows]
for r in refs:
    if r not in sol:
        problems.append("missing block for " + r)
    elif not sol[r]:
        problems.append("empty block for " + r)
for k in sol:
    if k not in refs:
        problems.append("block names a ref not in the paper: " + k)

# Unicode maths that must be LaTeX. The rupee sign is allowed (prose).
BANNED = {
    chr(0x2014): "em dash",
    chr(0x03C0): "pi", chr(0x03B8): "theta", chr(0x221A): "sqrt", chr(0x222B): "integral",
    chr(0x00B2): "superscript 2", chr(0x00B3): "superscript 3", chr(0x2264): "<=", chr(0x2265): ">=",
    chr(0x00D7): "times", chr(0x2212): "unicode minus", chr(0x00F7): "divide", chr(0x00B0): "degree",
    chr(0x03B1): "alpha", chr(0x03B2): "beta", chr(0x03A9): "Omega", chr(0x03BC): "mu",
    chr(0x2220): "angle", chr(0x0394): "Delta", chr(0x2260): "!=", chr(0x2192): "arrow",
    chr(0x2248): "approx", chr(0x00BD): "half", chr(0x2032): "prime", chr(0x221E): "infinity",
}
for ref, text in sol.items():
    for ch, name in BANNED.items():
        if ch in text:
            problems.append(ref + ": unicode " + name + " (write it in LaTeX or reword)")
    prose = NL.join(l for l in text.split(NL) if not l.lstrip().startswith("|"))
    if " " + chr(0x2013) + " " in prose or " -- " in prose:
        problems.append(ref + ": spaced dash used as an em dash")
    depth = 0
    i = 0
    while i < len(text) - 1:
        two = text[i:i + 2]
        if two == "\\(":
            if depth:
                problems.append(ref + ": nested \\( ")
            depth += 1
            i += 2
            continue
        if two == "\\)":
            depth -= 1
            if depth < 0:
                problems.append(ref + ": stray \\)")
                depth = 0
            i += 2
            continue
        i += 1
    if depth:
        problems.append(ref + ": unclosed \\(")
    if re.search(r"half a mark|loses half|marking scheme (?:deducts|awards full marks for|gives (?:one|only|a|half|the) mark|gives marks for)", text, re.I):
        problems.append(ref + ": quotes a marking-scheme mark rule; keep the instruction, drop the rule (SOLUTION_BRIEF)")
    if re.search(r"Hence[,\s]*\(?[A-D]\)?(?![a-z])", text):
        problems.append(ref + ": 'Hence <capital A-D>' reads as an option letter; use 'So'")

by_ref = {r["ref"]: r for r in rows}
for ref, text in sol.items():
    row = by_ref.get(ref)
    if not row or row.get("format") != "mcq":
        continue
    key = row.get("answer")
    letters = re.findall(r"option \(([A-D])\)", text)
    if not key:
        continue
    if not letters:
        problems.append(ref + ": MCQ names no 'option (X)'; end with 'which is option (" + key + ") <text>'")
    elif letters[-1] != key:
        problems.append(ref + ": last option named is (" + letters[-1] + ") but the key is (" + key + ")")
    else:
        tail = text[text.rfind("option (" + key + ")") + len("option (X)"):]
        if re.search(r"\(([a-d])\)", tail):
            problems.append(ref + ": a bracketed letter follows the final 'option (" + key + ")'; the key probe reads it as the answer. End on 'This is option (" + key + ").'")

print(pid + ": " + str(len(rows)) + " rows, " + str(len(sol)) + " blocks")
if problems:
    print(str(len(problems)) + " problem(s):")
    for p in problems:
        print("  " + p)
    sys.exit(1)
print("sidecar clean.")
