"""Splice authored solutions into <paperId>.topaper.json — the solution field ONLY.

    python scripts/cbse-12-pyq/merge-solutions.py <paperId>

Reads `data/_sol_<paperId>.txt`, a PLAIN-TEXT sidecar of the form

    ===Q1===
    <the solution, LaTeX and all>

    ===Q19a===
    ...

and writes each block into the matching row's `solution`.

WHY A PLAIN-TEXT SIDECAR AND NOT THE JSON DIRECTLY. Authoring straight into the
work file means hand-escaping every backslash, so `\\(` has to be typed `\\\\(`
across hundreds of maths zones. That is the same class of defect as
SOLUTION_BRIEF §6's heredoc trap — one lost backslash turns `\\theta` into a TAB
— except that here it is silent rather than corrupting, producing a literal
backslash on the page. A plain-text file has no escaping layer at all, so what
is authored is exactly what is stored.

The refs come from the work file, never from the sidecar, and a mismatch in
EITHER direction refuses: a sidecar that names a ref the paper does not have is
as much a defect as a row left unauthored.

Guards, in the order they run (every one red-tested by
`merge-solutions-redtest.py`, which asserts each fault trips its OWN guard —
a suite where every fault produced the same refusal would prove only that one
guard works):
  0. ROUND-TRIP: re-serialise the untouched file and require byte identity with
     what is on disk. If the writer cannot reproduce the original exactly, every
     later "only the solution changed" claim is worthless.
  1. ref sets match both ways (no unknown ref in the sidecar, no unfilled row).
  2. every solution non-empty.
  3. BOTH corruption layers per SOLUTION_BRIEF §6: a raw-byte scan of the file
     and a scan of the decoded strings. An escaped control char is invisible to
     the first; the second is the only one that sees it.
  4. field-level diff: every key of every row identical to the original except
     `solution`, and the key SET unchanged (catches a stray field).
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

if len(sys.argv) < 2:
    print("usage: merge-solutions.py <paperId>   e.g. 2026-56-1-2", file=sys.stderr)
    sys.exit(2)
PAPER_ID = sys.argv[1]
TOPAPER = HERE / "data" / (PAPER_ID + ".topaper.json")
SIDECAR = HERE / "data" / ("_sol_" + PAPER_ID + ".txt")

if not TOPAPER.exists():
    print("no work file at " + str(TOPAPER) + " — run dump-solutions.ts first.", file=sys.stderr)
    sys.exit(2)
if not SIDECAR.exists():
    print("no sidecar at " + str(SIDECAR) + " — author the solutions there first.", file=sys.stderr)
    sys.exit(2)

# Built from escapes, never typed literally, and never copied from another file
# (SOLUTION_BRIEF §6: two probes in this directory were found holding the raw
# bytes they existed to detect).
# The set is chosen to MATCH apply-solutions.ts exactly: 0x00-0x09 (TAB included
# — it is the heredoc signature), 0x0b, 0x0c, 0x0e-0x1f. LF and CR are legal.
# A first draft of this line stopped at 0x08 and so could not see a TAB, which is
# the one byte the applier cares most about.
CONTROL = re.compile("[" + "".join(chr(c) for c in list(range(0, 10)) + [11, 12] + list(range(14, 32))) + "]")


def fail(msg):
    print("REFUSING: " + msg, file=sys.stderr)
    sys.exit(1)


def serialise(doc):
    return json.dumps(doc, indent=1, ensure_ascii=False)


def main():
    original_bytes = TOPAPER.read_bytes()
    doc = json.loads(original_bytes.decode("utf-8"))

    # --- guard 0a: decoded-string scan of what is ALREADY in the work file.
    # This runs before the round-trip check on purpose. A control character
    # written as an escape (backslash-u-0-0-0-1) is invisible to a raw-byte scan
    # of the file, and the round-trip check would also catch it — but only as
    # "the file reformatted", which names the wrong defect and sends the reader
    # looking for a whitespace problem.
    def walk(node, where):
        if isinstance(node, str):
            if CONTROL.search(node):
                fail("control character already in the work file at " + where)
        elif isinstance(node, dict):
            for k, v in node.items():
                walk(v, where + "." + k)
        elif isinstance(node, list):
            for i, v in enumerate(node):
                walk(v, where + "[" + str(i) + "]")

    walk(doc, "doc")

    # --- guard 0b: the writer must be able to reproduce the file byte for byte
    if serialise(doc).encode("utf-8") != original_bytes:
        fail("round-trip is not byte-identical; this writer would reformat the file")

    raw = SIDECAR.read_text(encoding="utf-8")

    # --- guard 3a: raw-byte scan of the sidecar itself, before parsing
    if CONTROL.search(raw):
        fail("control character in the sidecar file")

    blocks = {}
    current = None
    for line in raw.split("\n"):
        m = re.fullmatch(r"===([A-Za-z0-9]+)===", line.strip())
        if m:
            current = m.group(1)
            if current in blocks:
                fail("duplicate ref in sidecar: " + current)
            blocks[current] = []
            continue
        if current is not None:
            blocks[current].append(line)
    solutions = {k: "\n".join(v).strip() for k, v in blocks.items()}

    rows = doc["rows"]
    row_refs = [r["ref"] for r in rows]

    # --- guard 1: both directions
    missing = [r for r in row_refs if r not in solutions]
    extra = [k for k in solutions if k not in row_refs]
    if missing:
        fail("no solution authored for: " + ", ".join(missing))
    if extra:
        fail("sidecar names refs that are not in the paper: " + ", ".join(extra))

    # --- guard 2 + 3b
    for ref, text in solutions.items():
        if not text:
            fail("empty solution for " + ref)
        if CONTROL.search(text):
            fail("control character in the decoded solution for " + ref)

    before = json.loads(original_bytes.decode("utf-8"))["rows"]
    for row in rows:
        row["solution"] = solutions[row["ref"]]

    # --- guard 4: nothing but `solution` moved
    for old, new in zip(before, rows):
        if set(old.keys()) != set(new.keys()):
            fail("key set changed on " + old["ref"])
        for k in old:
            if k == "solution":
                continue
            if old[k] != new[k]:
                fail("field '" + k + "' changed on " + old["ref"])
        if old["solution"] != "":
            fail("row " + old["ref"] + " already had a solution; this script only fills blanks")

    out = serialise(doc)
    if CONTROL.search(out):
        fail("control character in the serialised output")
    TOPAPER.write_text(out, encoding="utf-8", newline="")

    print("merged {0} solutions into {1}".format(len(rows), TOPAPER.name))
    print("  chars: min {0}, median {1}, max {2}".format(
        min(len(s) for s in solutions.values()),
        sorted(len(s) for s in solutions.values())[len(solutions) // 2],
        max(len(s) for s in solutions.values()),
    ))


main()
