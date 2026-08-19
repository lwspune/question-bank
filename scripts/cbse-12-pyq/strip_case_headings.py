"""
Move the printed "Case Study - N" heading out of `context` and into
`_caseStudyLabel`, in every transcribed paper.

    python scripts/cbse-12-pyq/strip_case_headings.py            # dry run
    python scripts/cbse-12-pyq/strip_case_headings.py --apply

WHY. CBSE reuses the same case study across the sets of a series under a
DIFFERENT number: 65/5/1 prints one as "Case Study - 2" that 65/5/3 prints as
"Case Study - 1", with a byte-identical passage (and, measured, even a different
dash character - an en-dash in one, a hyphen in the other).

`subjectiveContentHash(stem, context)` is context-aware, deliberately, so that
two case-study sub-parts sharing a bare stem ("Find dS/dx.") cannot collide. The
side effect is that a positional heading inside `context` makes two IDENTICAL
questions hash differently, and both ship. That is a visible duplicate in the
bank, and no gate would catch it - the rows are legitimately distinct by hash.

The heading is a position within one paper, not part of the question, so it moves
to `_caseStudyLabel`: preserved as provenance, absent from the hash.

⚠ For a paper ALREADY COMMITTED this changes `content_hash`, so the affected rows
must be deleted and re-committed - editing in place would leave stored text that
is no longer the hash's preimage. The script names those papers; it does not
touch the database.
"""

import glob
import io
import json
import os
import re
import sys

DATA = os.path.join(os.path.dirname(__file__), "data")

# The heading is its own leading line: optional bold markers, "Case Study",
# any dash (hyphen, en-dash, em-dash), a number. Matched only at the START of
# the context, so a mention of "case study" inside the passage is untouched.
HEADING = re.compile(
    r"^\s*(?:\*\*)?\s*Case\s*Study\s*[-‐-―]\s*(\d+)\s*(?:\*\*)?\s*(?:\n+|$)",
    re.IGNORECASE,
)


def main():
    apply = "--apply" in sys.argv
    total = 0
    for path in sorted(glob.glob(os.path.join(DATA, "*.questions.json"))):
        doc = json.load(io.open(path, encoding="utf-8"))
        changed = 0
        for q in doc.get("questions", []):
            ctx = q.get("context")
            if not ctx:
                continue
            m = HEADING.match(ctx)
            if not m:
                continue
            q["context"] = HEADING.sub("", ctx, count=1).lstrip()
            q["_caseStudyLabel"] = f"Case Study - {m.group(1)}"
            changed += 1
        if changed:
            total += changed
            print(f"{os.path.basename(path)}: {changed} rows")
            if apply:
                io.open(path, "w", encoding="utf-8", newline="\n").write(
                    json.dumps(doc, ensure_ascii=False, indent=2) + "\n"
                )
    if not total:
        print("nothing to change.")
    elif not apply:
        print(f"\n{total} rows would change. Re-run with --apply.")
    else:
        print(f"\n{total} rows rewritten.")
        print(
            "\nAny paper already committed must be DELETED and re-committed - "
            "context is part of subjectiveContentHash:\n"
            "  delete from questions where source_file = '<sourceFile>';"
        )


if __name__ == "__main__":
    main()
