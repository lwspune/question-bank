"""Byte-hygiene sweep over a merged paper, authored as a FILE on purpose.

The double-escape check is the one that must not be written through a shell:
a `\\` in a shell heredoc or a `python -c` argument is eaten before Python sees
it, so the pattern tests something other than what it reads as. That produced a
false "82 double-escaped fields" on this very paper, against ten transcription
bands that had each verified their own file clean with file-based probes.

Every check below is paired with a CONTROL that must go red. A probe that has
never failed proves nothing.
"""

import io
import json
import re
import sys
import unicodedata

# A DECODED string holding LaTeX correctly has ONE backslash: `\(`, `\frac`.
# A double-escaped one has TWO: `\\(`, `\\frac`. That is the defect — it renders
# as a literal backslash instead of opening a math zone.
DOUBLE = re.compile(r"\\\\[a-zA-Z(]")

path = sys.argv[1] if len(sys.argv) > 1 else "scripts/nda-gat/data/2026-2.questions.json"
qs = json.load(io.open(path, encoding="utf8"))


def fields(q):
    yield "stem", q["stem"]
    if q.get("context"):
        yield "context", q["context"]
    for o in q["options"]:
        yield "option " + o["label"], o["text"]


# --- CONTROLS ---------------------------------------------------------------
assert DOUBLE.search("a \\\\frac b"), "control: must flag a genuine double escape"
assert DOUBLE.search("a \\\\( b"), "control: must flag a double-escaped delimiter"
assert not DOUBLE.search("a \\frac{1}{2} b"), "control: must NOT flag correct LaTeX"
assert not DOUBLE.search("a \\(x\\) b"), "control: must NOT flag a correct math zone"
print("controls: 4/4 behaved (2 red on bad input, 2 green on good)")

raw = io.open(path, "rb").read()
text = raw.decode("utf8")
ctrl = [c for c in text if ord(c) < 32 and c not in "\n\r\t"]

bad = []
n = 0
for q in qs:
    for name, v in fields(q):
        n += 1
        m = DOUBLE.search(v)
        if m:
            bad.append("Q%d %s: %r" % (q["number"], name, v[max(0, m.start() - 30):m.start() + 40]))

na = {}
for q in qs:
    for _, v in fields(q):
        for ch in v:
            if ord(ch) > 127:
                na[ch] = na.get(ch, 0) + 1

print("questions      %d" % len(qs))
print("fields scanned %d" % n)
print("control chars  %d" % len(ctrl))
print("U+FFFD         %d" % text.count("�"))
print("double-escaped %d" % len(bad))
for b in bad[:10]:
    print("   " + b)
print(
    "non-ascii      "
    + ", ".join(
        "U+%04X %s x%d" % (ord(k), unicodedata.name(k, "?")[:30], v)
        for k, v in sorted(na.items(), key=lambda x: -x[1])
    )
)

if ctrl or text.count("�") or bad:
    sys.exit(1)
print("\nclean.")
