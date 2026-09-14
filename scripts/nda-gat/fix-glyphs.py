"""One-off: repair the three glyph defects check-bands flagged in b8 / b10.

Each is a real convention violation, not a probe artefact:

  * U+00B7 (raised middle dot) is UPSC's decimal separator. The bank stores a
    full stop; check-bands errors on the dot outright.
  * U+00B0 (degree) must be `\\(15^\\circ\\)` so it renders through KaTeX rather
    than as a bare glyph.
  * A BARE `$` IS A MATH DELIMITER in this repo's renderer, and that is a
    measured hazard rather than a style rule: a single-`$` arm in MATH_PATTERN
    pairs two dollars and swallows everything between them. It reached shipped
    content once already (UPSC 2019-p2 Q74, where `$` was a puzzle operator).
    Four candidate fixes were measured against the real parser then, and
    backslash-escaping does NOT work -- there is no escape handling at all.
    `\\(\\$\\)` renders a normal-width dollar with the prose intact, so that is
    the form used here.

Asserts the before-state and refuses otherwise, so a re-run cannot corrupt a
file that has already been repaired.
"""

import io
import json
import sys

DOT = "·"
DEG = "°"

FIXES = [
    (
        "scripts/nda-gat/data/2026-2.b10.json",
        145,
        "stem",
        "Which two countries signed a $ 2" + DOT + "6 billion uranium supply agreement in March 2026 ?",
        "Which two countries signed a \\(\\$\\)2.6 billion uranium supply agreement in March 2026 ?",
    ),
    (
        "scripts/nda-gat/data/2026-2.b8.json",
        111,
        "stem",
        "III. The Earth turns 15" + DEG + " of longitude in an hour.",
        "III. The Earth turns \\(15^\\circ\\) of longitude in an hour.",
    ),
]

apply = "--apply" in sys.argv
failed = False

for path, number, field, want, repl in FIXES:
    doc = json.load(io.open(path, encoding="utf8"))
    hit = [q for q in doc["questions"] if q["number"] == number]
    if len(hit) != 1:
        print("REFUSE %s Q%d: found %d rows" % (path, number, len(hit)))
        failed = True
        continue
    cur = hit[0][field]
    if want not in cur:
        print("REFUSE %s Q%d %s: expected text not present (already fixed?)" % (path, number, field))
        print("   want: %r" % want)
        print("   have: %r" % cur)
        failed = True
        continue
    new = cur.replace(want, repl)
    print("%s Q%d %s" % (path.split("/")[-1], number, field))
    print("   -> %r" % repl)
    if apply:
        hit[0][field] = new
        io.open(path, "w", encoding="utf8", newline="\n").write(
            json.dumps(doc, ensure_ascii=False, indent=2) + "\n"
        )

if failed:
    sys.exit(1)
if not apply:
    print("\n[dry-run] pass --apply to write.")
