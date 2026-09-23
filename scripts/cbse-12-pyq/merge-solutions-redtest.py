"""Red-test the merge guards: each fault must fail, and fail for ITS OWN reason.

A guard that has never gone red is an assumption. This runs the real merge
script against a mutated sandbox and asserts both that it exits non-zero and
that the message names the right defect — a suite where every fault produces
the SAME refusal would pass while proving only that one guard works.
"""
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
MERGE = HERE / "merge-solutions.py"

# Any paper that has BOTH an authored sidecar and a still-blank work file can be
# the fixture. 2026-56-1-1 is the default because it was the first one authored;
# pass another paperId to re-prove the guards against it.
PAPER_ID = sys.argv[1] if len(sys.argv) > 1 else "2026-56-1-1"
TOPAPER = HERE / "data" / (PAPER_ID + ".topaper.json")
SIDECAR = HERE / "data" / ("_sol_" + PAPER_ID + ".txt")

TAB = chr(9)
SOH = chr(1)


def blank_solutions(path):
    """Restore the work file to its post-dump state.

    The fixture paper has usually been MERGED already, so its solutions are
    filled and the 'already had a solution' guard would fire on every case,
    including the clean run. Blanking in the sandbox makes the suite runnable
    at any point in the paper's life instead of only in the window between
    dump and merge — a window that closes within minutes and would have left
    these guards untestable for the remaining papers.
    """
    doc = json.loads(path.read_bytes().decode("utf-8"))
    for row in doc["rows"]:
        row["solution"] = ""
    path.write_text(json.dumps(doc, indent=1, ensure_ascii=False),
                    encoding="utf-8", newline="")


def run_in_sandbox(mutate):
    """Copy script + data into a temp dir, mutate, run, return (rc, output)."""
    with tempfile.TemporaryDirectory() as td:
        root = Path(td)
        (root / "data").mkdir()
        shutil.copy(MERGE, root / MERGE.name)
        shutil.copy(TOPAPER, root / "data" / TOPAPER.name)
        shutil.copy(SIDECAR, root / "data" / SIDECAR.name)
        blank_solutions(root / "data" / TOPAPER.name)
        mutate(root)
        p = subprocess.run([sys.executable, str(root / MERGE.name), PAPER_ID],
                           capture_output=True, text=True)
        return p.returncode, (p.stderr or "") + (p.stdout or "")


def noop(root):
    pass


def edit(path, old, new, count=-1):
    """Rewrite a file, PRESERVING its line endings.

    `write_text` without newline="" translates LF to CRLF on Windows, which
    changes every line of the file. Three cases in the first run of this suite
    did exactly that and so tripped the round-trip guard instead of the guard
    they were aimed at — the suite looked like four broken guards and was in
    fact one broken harness.
    """
    t = path.read_text(encoding="utf-8", newline="")
    assert old in t, "mutation anchor not found: " + old[:40]
    t = t.replace(old, new) if count < 0 else t.replace(old, new, count)
    path.write_text(t, encoding="utf-8", newline="")


def drop_a_block(root):
    f = root / "data" / SIDECAR.name
    t = f.read_text(encoding="utf-8", newline="")
    f.write_text(t[:t.index("===Q33b===")], encoding="utf-8", newline="")


def unknown_ref(root):
    f = root / "data" / SIDECAR.name
    t = f.read_text(encoding="utf-8", newline="")
    f.write_text(t + "\n===Q99===\nnot a real question\n", encoding="utf-8", newline="")


def empty_block(root):
    """Q3's body removed, its header kept — the ref set is still complete, so
    the emptiness guard is the only thing that can catch it."""
    f = root / "data" / SIDECAR.name
    t = f.read_text(encoding="utf-8", newline="")
    start = t.index("===Q3===")
    body = t.index("\n", start) + 1
    end = t.index("===Q4===")
    f.write_text(t[:body] + "\n" + t[end:], encoding="utf-8", newline="")


def tab_in_sidecar(root):
    edit(root / "data" / SIDECAR.name,
         "A transition metal is one", "A transition" + TAB + " metal is one")


def escaped_control_in_json(root):
    """The §6 case: a control char written as an ESCAPE, so a raw-byte scan of
    the file cannot see it and only the decoded-string scan can."""
    edit(root / "data" / TOPAPER.name,
         '"stem": "Which of the following curve',
         '"stem": "Which\\u0001 of the following curve')


def prefilled_solution(root):
    edit(root / "data" / TOPAPER.name, '"solution": ""', '"solution": "already here"', 1)


def reformatted_file(root):
    """Round-trip guard: a file this writer cannot reproduce byte for byte."""
    edit(root / "data" / TOPAPER.name, '{\n "paper"', '{\n    "paper"', 1)


def crlf_flipped(root):
    """The repo runs autocrlf=true, so this is not a hypothetical mutation."""
    f = root / "data" / TOPAPER.name
    b = f.read_bytes()
    f.write_bytes(b.replace(b"\n", b"\r\n"))


CASES = [
    ("clean run",            noop,                     0, None),
    ("missing ref",          drop_a_block,             1, "no solution authored for"),
    ("unknown ref",          unknown_ref,              1, "not in the paper"),
    ("empty solution",       empty_block,              1, "empty solution"),
    ("TAB in sidecar",       tab_in_sidecar,           1, "control character in the sidecar"),
    ("escaped ctrl in JSON", escaped_control_in_json,  1, "already in the work file"),
    ("already solved",       prefilled_solution,       1, "already had a solution"),
    ("reformatted file",     reformatted_file,         1, "round-trip"),
    ("CRLF flipped",         crlf_flipped,             1, "round-trip"),
]

fails = 0
for name, mutate, want_rc, want_msg in CASES:
    rc, out = run_in_sandbox(mutate)
    ok = (rc != 0) == (want_rc != 0)
    if want_msg is not None:
        ok = ok and (want_msg in out)
    print("{0:22s} rc={1} {2}".format(name, rc, "OK" if ok else "*** WRONG ***"))
    if not ok:
        print("    wanted rc {0} and message containing {1!r}".format(want_rc, want_msg))
        print("    got: " + out.strip().replace("\n", " | ")[:300])
        fails += 1

print()
print("{0} of {1} guards behaved as specified".format(len(CASES) - fails, len(CASES)))
sys.exit(1 if fails else 0)
