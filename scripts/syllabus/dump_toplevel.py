"""Dump TOP-LEVEL (N.M) headings for one class, for hand-verification.

Why not the general extractor: it applies is_exercise() and a title-continuation
heuristic, both needed at sub-section grain and both misfiring on NCERT Std XII,
where intext questions sit MID-chapter sharing the N.M numbering.

Why not the heading-font pass either: the Std XII books set headings with a
layered drop-shadow, so the same words are painted 2-4 times in one line and
arrive as "1.1 Types of Types of 1.1 Types of". The PLAIN text layer carries each
heading once, in the running header, so that is what this reads.

Repetition is collapsed anyway, because some headings still double.

Usage:  python scripts/syllabus/dump_toplevel.py 12
"""
import os
import re
import sys

import fitz

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dump_ncert_sections import exercises_start  # noqa: E402

ROOTS = {
    11: "C:/Vilas/LWS_Pune/NDA_Subjects_Content/Subjects/NCERT/Books/11th/Chemistry",
    12: "C:/Vilas/LWS_Pune/NDA_Subjects_Content/Subjects/NCERT/Books/12th/Chemistry",
}


def collapse(title):
    """Undo the drop-shadow layering.

    The Std XII books paint each heading 4-5 times to fake a shadow, and the text
    layer keeps every copy. It arrives either word-wise
    ("Functional Functional Functional Groups Groups Groups") or phrase-wise
    ("Uses of Uses of Uses of Aldehydes Aldehydes"), and often both in one line.

    So collapse CONSECUTIVE repeats at every period from 1 upward, repeatedly,
    until nothing changes — a single fixed period cannot handle the mixture.
    """
    w = title.split()
    changed = True
    while changed:
        changed = False
        for k in range(1, 9):
            i = 0
            while i + 2 * k <= len(w):
                if w[i : i + k] == w[i + k : i + 2 * k]:
                    del w[i + k : i + 2 * k]
                    changed = True
                else:
                    i += 1
    return " ".join(w)


def main():
    cls = int(sys.argv[1]) if len(sys.argv) > 1 else 12
    root = ROOTS[cls]
    for part in sorted(os.listdir(root)):
        pdir = os.path.join(root, part)
        if not os.path.isdir(pdir):
            continue
        for f in sorted(os.listdir(pdir)):
            m = re.match(r"(\d+)\. (.+)\.pdf$", f)
            if not m:
                continue
            chap, name = int(m.group(1)), m.group(2)
            doc = fitz.open(os.path.join(pdir, f))
            # STOP AT THE EXERCISES. NCERT numbers its exercise questions N.M too
            # ("2.3 Consult the table of standard electrode potentials..."), and
            # without this cut they outnumber and outrank the real headings.
            cut = min(exercises_start(doc), doc.page_count)
            lines = "\n".join(doc[i].get_text() for i in range(cut)).split("\n")
            doc.close()
            # Candidates keyed by section, keeping the LONGEST spelling seen — a
            # running header can be clipped on one page and whole on another.
            best = {}
            for i, line in enumerate(lines):
                mm = re.match(rf"^{chap}\.(\d+)\s+([A-Z].{{2,70}})$", line.strip())
                if not mm:
                    continue
                n = int(mm.group(1))
                if not (1 <= n <= 30):
                    continue
                t = collapse(mm.group(2).strip())
                # Headings WRAP: "1.5 Ideal and Non-" / "ideal Solutions". Pull the
                # continuation when the line breaks mid-word or mid-phrase.
                for j in (i + 1, i + 2):
                    if j >= len(lines):
                        break
                    nxt = lines[j].strip()
                    if not nxt or not re.match(r"^[a-z(]", nxt) or len(nxt) > 40:
                        break
                    t = (t[:-1] + nxt) if t.endswith("-") else (t + " " + nxt)
                if len(t) > len(best.get(n, "")):
                    best[n] = collapse(t)
            print(f"\n=== Ch{chap} {name} ===")
            for n in sorted(best):
                print(f"  {chap}.{n:<3} {best[n]}")


if __name__ == "__main__":
    main()
