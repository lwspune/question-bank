# -*- coding: utf-8 -*-
"""Text-hygiene probe over the authored solutions AND the transcription.

Written to a FILE, never a shell heredoc: an earlier run of this same check
through `python - <<'PY'` reported a double-escaped delimiter on all 41 rows,
which was the shell eating backslashes in the PROBE, not a defect in the data.
The probe is as likely to be corrupt as the thing it checks, so it now asserts
against a self-test fixture before it reports anything.
"""
import io
import json
import os
import re

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(HERE, "data")

BS = chr(92)                      # a single backslash, built rather than typed
OPEN, CLOSE = BS + "(", BS + ")"  # \(  and  \)
DOUBLE_OPEN = BS + BS + "("       # \\(
CTRL = re.compile("[" + "".join(chr(c) for c in list(range(0, 9)) + [11, 12] + list(range(14, 32))) + "]")
UNICODE_MATH = "√∠△≅∴⊥×θ°−±≤≥"

# --- self-test: the probe must fire on a known-bad fixture, else it proves nothing
_fix_ok = "x " + OPEN + "a" + CLOSE
_fix_double = "x " + DOUBLE_OPEN + "a" + CLOSE
assert DOUBLE_OPEN not in _fix_ok, "probe broken: false positive on clean text"
assert DOUBLE_OPEN in _fix_double, "probe broken: cannot see a real double escape"
assert CTRL.search("a" + chr(1) + "b") and not CTRL.search("a\nb"), "probe broken: control-char class"


def check(name, rows, field):
    problems = []
    for r in rows:
        ref = r.get("ref") or r.get("question_number") or "?"
        for key in (field if isinstance(field, (list, tuple)) else [field]):
            t = r.get(key)
            if not t:
                continue
            if t.count(OPEN) != t.count(CLOSE):
                problems.append((ref, key, f"delimiter imbalance {t.count(OPEN)} open / {t.count(CLOSE)} close"))
            if DOUBLE_OPEN in t:
                problems.append((ref, key, "double-escaped delimiter"))
            m = CTRL.search(t)
            if m:
                problems.append((ref, key, f"control char U+{ord(m.group()):04X}"))
            if "�" in t:
                problems.append((ref, key, "U+FFFD replacement char"))
            for ch in UNICODE_MATH:
                if ch in t:
                    problems.append((ref, key, f"unicode math {ch!r} outside a math zone"))
            if BS + "n" in t.replace(BS + "neq", "").replace(BS + "nu", ""):
                problems.append((ref, key, "literal backslash-n"))
            if re.search(re.escape(OPEN) + r"\s*" + re.escape(CLOSE), t):
                problems.append((ref, key, "empty math zone"))
    print(f"{name:<28} rows={len(rows):<4} problems={len(problems)}")
    for p in problems:
        print("   ", p)
    return problems


tot = []
with io.open(os.path.join(DATA, "geo-trigonometry-10.solutions.json"), encoding="utf-8") as f:
    tot += check("solutions.json", json.load(f), "solution")
with io.open(os.path.join(DATA, "geo-trigonometry-10.questions.json"), encoding="utf-8") as f:
    qs = json.load(f)
    tot += check("questions.json (stem)", qs, ["stem", "solution", "context"])
    opts = [{"ref": q["ref"], "solution": o["text"]} for q in qs for o in q.get("options", [])]
    tot += check("questions.json (options)", opts, "solution")
p = os.path.join(DATA, "geo-trigonometry-10.mcq-verify.json")
if os.path.exists(p):
    with io.open(p, encoding="utf-8") as f:
        tot += check("mcq-verify.json", json.load(f), "solution")

print("\nTOTAL problems:", len(tot) or "none")
