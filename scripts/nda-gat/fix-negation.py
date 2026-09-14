"""One-off: make the EMPHASISED `not` consistent across bands.

Eight stems in this paper print `not` in bold italic -- it inverts the question,
so the emphasis is load-bearing. Ten independent transcription agents rendered
that same printed feature THREE different ways, and nothing in the pipeline
catches a cross-band convention split because each band is internally consistent:

    **not**            Q77, Q87, Q94, Q136, Q143   (b5, b6, b9, b10)
    \\(\\textit{not}\\)    Q99, Q100                   (b7)
    plain              Q119                        (b8)

`**not**` wins, on evidence rather than majority:

  * It is an established BANK convention -- 381 CDS rows (the closest sibling
    corpus, same UPSC English/GK material) and 680+ rows bank-wide use `**`.
  * It renders on BOTH surfaces. `KatexRenderer` parses rich segments so a
    `**bold**` span may contain math, and `docxBuilder.mathRuns` turns it into a
    native Word bold run ("Markdown **bold** becomes a native Word bold run").
  * `\\(\\textit{not}\\)` puts a prose word inside a MATH zone. It renders, but it
    is notation markup doing a typography job, and no other row in the bank does
    it.
  * Plain silently drops a negation marker on a negative-polarity question --
    the word survives, the signal does not.

Ordinary prose negation INSIDE a statement (Q13, Q32, Q34, Q74, Q107, Q133,
Q134) is NOT emphasised on the page and is deliberately left alone. Bolding
those would invent emphasis the printer never used.

Asserts each before-state and refuses otherwise, so a re-run cannot corrupt an
already-repaired file.
"""

import io
import json
import sys

FIXES = [
    ("2026-2.b7.json", 99, "\\(\\textit{not}\\)", "**not**"),
    ("2026-2.b7.json", 100, "\\(\\textit{not}\\)", "**not**"),
    ("2026-2.b8.json", 119, "given above are not correct", "given above are **not** correct"),
]

apply = "--apply" in sys.argv
failed = False

for name, number, want, repl in FIXES:
    path = "scripts/nda-gat/data/" + name
    doc = json.load(io.open(path, encoding="utf8"))
    hit = [q for q in doc["questions"] if q["number"] == number]
    if len(hit) != 1:
        print("REFUSE %s Q%d: found %d rows" % (name, number, len(hit)))
        failed = True
        continue
    cur = hit[0]["stem"]
    if want not in cur:
        print("REFUSE %s Q%d: expected text absent (already fixed?)" % (name, number))
        print("   want: %r" % want)
        print("   have: %r" % cur)
        failed = True
        continue
    if cur.count(want) != 1:
        print("REFUSE %s Q%d: %d occurrences, expected exactly 1" % (name, number, cur.count(want)))
        failed = True
        continue
    print("%s Q%d: %r -> %r" % (name, number, want, repl))
    if apply:
        hit[0]["stem"] = cur.replace(want, repl)
        io.open(path, "w", encoding="utf8", newline="\n").write(
            json.dumps(doc, ensure_ascii=False, indent=2) + "\n"
        )

if failed:
    sys.exit(1)
if not apply:
    print("\n[dry-run] pass --apply to write.")
