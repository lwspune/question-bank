"""
Mechanical transcription-fidelity check for CDS GK 2018-I.

    python scripts/cds-gs/audit_fidelity.py

WHY THIS EXISTS. This corpus has no answer key, so every answer is derived by
reading the options. That makes OPTION FIDELITY the load-bearing property: if the
correct option's TEXT is copied into the wrong LETTER's slot, a blind derivation
still succeeds, still names a letter, and is wrong — and no downstream check can
see it. On the sibling CDS English corpus that exact defect produced 19 wrong keys
while a full blind re-derivation pass confirmed all 89 rows it saw.

WHAT MAKES THIS PAPER SPECIAL. 2018-I is the ONE paper of the 19 with an OCR text
layer, giving a SECOND, NON-LLM channel to check the vision transcription against.

THREE THINGS THIS PROBE LEARNED THE HARD WAY — each produced false findings in an
earlier version, and each is now handled explicitly:

  1. TWO COLUMNS. PyMuPDF's reading order interleaves them: at the foot of a page
     one question's options and its neighbour's are emitted line-for-line into
     each other. So columns are reconstructed from WORD COORDINATES first.

  2. CROSS-QUESTION SUBSTRING COLLISION. Q1, Q2 and Q4 sit in one column and share
     option words (Potassium, Caesium, Calcium, Magnesium). Searching the whole
     column makes Q2's "Potassium" match Q1's, and the resulting "wrong order"
     report is pure artifact. Each question is therefore SCOPED to its own span,
     bounded by its stem and the next question's stem.

  3. OPTIONS OCR CANNOT REPRESENT. A LaTeX option (`\\(10^{-7}\\ \\text{cm}\\)`) and a
     Match-List code row (`A-2, B-4, C-1, D-3`, printed as a bare `2 4 1 3` under
     an `A B C D` header) can never match the text layer no matter how good the
     transcription is. Flagging them is noise, so they are skipped BY SHAPE and
     reported as skipped — a skip is a stated limit, not a pass.

WHAT A RESULT MEANS. A clean run means our option texts are present, in our order,
inside each question's own span, per an independent reader. It does NOT prove the
letters are right: OCR cannot see the printed (a)/(b)/(c)/(d) labels reliably, so
a swap of two ADJACENT options is not always distinguishable. A FLAG is a question
to take to the page image, never a verdict.
"""
import json
import os
import re
import sys
from difflib import SequenceMatcher

import fitz

ROOT = os.path.dirname(os.path.abspath(__file__))
PDF = r"C:\Vilas\LWS_Pune\AFCAT_CDS\PYQPs\03. GS\CDS GK 2018 I.pdf"
QUESTIONS = os.path.join(ROOT, "data", "2018-1.questions.json")

BANDS = [
    ("b1", [1, 2, 3]), ("b2", [4, 5, 6]), ("b3", [7, 8, 9]), ("b4", [10, 11, 12]),
    ("b5", [13, 14, 15]), ("b6", [16, 17]), ("b7", [18, 19]), ("b8", [20, 21]),
]

PRESENT = 0.80  # loose: OCR garble is common, and a false positive costs a page-check


def norm(s):
    """Compare on letters and digits only — OCR mangles punctuation and spacing freely."""
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def unmatchable(text):
    """
    True when no faithful transcription of this option could match the text layer,
    so a flag would say more about OCR than about us.
      - LaTeX: the page prints 10^-7 cm; OCR emits `1 0"^ cm`.
      - Match-List code rows: we store `A-2, B-4, C-1, D-3`; the page prints the
        numerals alone under an `A B C D` header, so the letters exist only in our
        representation.
      - Anything too short to be a distinctive needle.
    """
    if "\\(" in text or "\\text" in text:
        return True
    if re.fullmatch(r"[A-D][\s\-–]*\d([,\s]+[A-D][\s\-–]*\d)+", text.strip()):
        return True
    # GENERIC CODE OPTIONS — "1 and 2 only", "Both 1 and 2", "Neither 1 nor 2",
    # "1, 2 and 3". These are drawn from a fixed ~8-word vocabulary, so they carry
    # almost no distinguishing content, and OCR garbles short tokens freely
    # ("only" -> "onlv"/"orUy"). Every one of the 7 single-option misses in an
    # earlier run but one was such a string, and all were noise.
    #
    # STATED LIMITATION, not a silent suppression: this probe therefore CANNOT
    # catch a swapped or altered code option — e.g. our "1 and 2 only" where the
    # page prints "1 and 3 only". That defect class is covered only by the manual
    # page spot-check, and the transcription agents' own second pass.
    if re.fullmatch(r"(both|neither|only|and|nor|or)?[\s,0-9]*"
                    r"((both|neither|and|nor|only|or)[\s,0-9]*)*", text.strip(), re.I):
        return True
    return len(norm(text)) < 8


def column_text(page):
    """(left, right) reconstructed from word coordinates; a word is assigned by its LEFT edge."""
    words = page.get_text("words")
    if not words:
        return "", ""
    mid = page.rect.width / 2
    cols = {0: [], 1: []}
    for w in words:
        cols[0 if w[0] < mid else 1].append(w)
    out = []
    for c in (0, 1):
        ws = sorted(cols[c], key=lambda w: (round(w[1], 1), w[0]))
        out.append(" ".join(w[4] for w in ws))
    return out[0], out[1]


def best_pos(needle, haystack, start=0, end=None):
    """
    Best fuzzy position of `needle` within haystack[start:end], or (None, score).
    Returns an ABSOLUTE index into haystack.
    """
    n = norm(needle)
    end = len(haystack) if end is None else end
    h = haystack[start:end]
    if not n or not h:
        return None, 0.0
    idx = h.find(n)
    if idx >= 0:
        return start + idx, 1.0
    best_i, best_r = None, 0.0
    step = max(1, len(n) // 6)
    for i in range(0, max(1, len(h) - len(n) + 1), step):
        r = SequenceMatcher(None, n, h[i:i + len(n)]).ratio()
        if r > best_r:
            best_r, best_i = r, start + i
        if best_r > 0.97:
            break
    return best_i, best_r


def main():
    questions = json.load(open(QUESTIONS, encoding="utf8"))
    by_number = {q["number"]: q for q in questions}
    doc = fitz.open(PDF)

    band_of = {}
    for band, _ in BANDS:
        data = json.load(open(os.path.join(ROOT, "data", f"2018-1.{band}.json"), encoding="utf8"))
        for q in data["questions"]:
            band_of[q["number"]] = band

    # Normalised column blobs, keyed (page, side).
    blobs = {}
    for band, pages in BANDS:
        for p in pages:
            l, r = column_text(doc[p])
            blobs[(p, "left")] = norm(l)
            blobs[(p, "right")] = norm(r)

    # --- Locate each question's STEM, so its options can be scoped to its own span ---
    # A stem is long and near-unique, which is exactly what an option text is not.
    located = {}   # number -> (page, side, stem_pos)
    unlocated = []
    for n in sorted(by_number):
        q = by_number[n]
        band = band_of.get(n)
        if not band:
            continue
        pages = dict(BANDS)[band]
        # Use the first ~120 chars of the stem — enough to be unique, short enough
        # that a mid-stem OCR garble does not sink the whole match.
        needle = norm(q["stem"])[:120]
        best = (None, None, None, 0.0)
        for p in pages:
            for side in ("left", "right"):
                pos, score = best_pos(needle, blobs[(p, side)])
                if score > best[3]:
                    best = (p, side, pos, score)
        if best[3] < 0.55 or best[2] is None:
            unlocated.append(n)
            continue
        located[n] = (best[0], best[1], best[2])

    # Each question's span runs from its own stem to the next stem IN THE SAME column.
    by_column = {}
    for n, (p, side, pos) in located.items():
        by_column.setdefault((p, side), []).append((pos, n))
    span = {}
    for key, items in by_column.items():
        items.sort()
        for i, (pos, n) in enumerate(items):
            end = items[i + 1][0] if i + 1 < len(items) else len(blobs[key])
            span[n] = (key, pos, end)

    # A SHARED option block is printed ONCE and applies to a run of questions —
    # this paper's Statement I/II run (Q12-Q18) is one code block governing seven
    # items, which the transcriber correctly replicated onto each. Those options
    # are therefore genuinely absent from six of the seven spans, and flagging
    # that would report the data being RIGHT as a defect. Detected by shape (an
    # identical option set on more than one question), never by hardcoding a range.
    fingerprints = {}
    for n, q in by_number.items():
        fp = "|".join(norm(o["text"]) for o in q["options"])
        fingerprints.setdefault(fp, []).append(n)
    shared = {n for group in fingerprints.values() if len(group) > 1 for n in group}

    # The span ends where the NEXT question's stem begins, but OCR emits a column
    # line-by-line and rounds y-coordinates, so the next stem can be emitted just
    # BEFORE the previous question's last option. That truncation showed up as a
    # missing option D on 7 of 13 single-option findings — a boundary artifact,
    # not a dropped option. A short tail absorbs it; a genuinely invented option
    # still fails, because it appears nowhere on the page at all.
    TAIL = 260

    findings = []
    checked = 0
    skipped_opts = 0
    skipped_q = []
    shared_checked = 0

    for n in sorted(by_number):
        if n not in span:
            continue
        q = by_number[n]
        key, start, end = span[n]
        blob = blobs[key]
        if n in shared:
            # Check the set is present SOMEWHERE on the page (both columns), which
            # is all that can be asserted about a block printed once for a run.
            page = key[0]
            whole = blobs[(page, "left")] + " " + blobs[(page, "right")]
            miss = [o["label"] for o in q["options"]
                    if not unmatchable(o["text"]) and best_pos(o["text"], whole)[1] < PRESENT]
            shared_checked += 1
            if miss:
                findings.append((n, "SHARED", f"shared code block: option(s) {','.join(miss)} not found anywhere on p{page}"))
            continue
        end = min(len(blob), end + TAIL)

        testable = [(o["label"], o["text"]) for o in q["options"] if not unmatchable(o["text"])]
        skipped_opts += len(q["options"]) - len(testable)
        if len(testable) < 2:
            skipped_q.append(n)
            continue
        checked += 1

        # (1) SET — is each testable option present inside THIS question's span?
        missing, positions = [], []
        for label, text in testable:
            pos, score = best_pos(text, blob, start, end)
            if score < PRESENT:
                missing.append(label)
            else:
                positions.append((label, pos))
        if missing:
            findings.append((n, "SET", f"option(s) {','.join(missing)} not found in Q{n}'s own span on p{key[0]} {key[1]} column"))
            continue

        # (2) ORDER — do they appear down the column in the order we recorded?
        seq = [p for _, p in positions]
        if seq != sorted(seq):
            printed = ",".join(l for l, _ in sorted(positions, key=lambda x: x[1]))
            ours = ",".join(l for l, _ in positions)
            findings.append((n, "ORDER", f"p{key[0]} {key[1]} column reads {printed}, we have {ours}"))

    print("CDS GK 2018-I — mechanical option-fidelity check vs the OCR text layer")
    print(f"  questions located in the text layer : {len(located)}/{len(by_number)}")
    if unlocated:
        print(f"  NOT located (stem unmatched)       : {unlocated}")
    print(f"  questions compared (own span)      : {checked}")
    print(f"  shared-code-block questions        : {shared_checked}  (options printed once for a run; checked page-wide)")
    print(f"  questions skipped (<2 testable opts): {len(skipped_q)}" + (f"  {skipped_q}" if skipped_q else ""))
    print(f"  individual options skipped by shape: {skipped_opts}  (LaTeX / code-row / too short)")
    print(f"  findings                           : {len(findings)}")
    for n, kind, msg in findings:
        print(f"    Q{n:<4} {kind:<6} {msg}")
    if not findings:
        print("\n  No option-SET or option-ORDER disagreement between the vision transcription")
        print("  and the independent OCR text layer, within each question's own span.")
        print("  This does NOT prove the LETTERS are right — OCR cannot read the printed")
        print("  (a)/(b)/(c)/(d) labels reliably, so an adjacent swap can still hide.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
