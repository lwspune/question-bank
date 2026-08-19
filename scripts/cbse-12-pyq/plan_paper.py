"""
Plan the transcription of one paper: which of its questions are NEW, and which
are already covered by a paper that has been transcribed already.

    python scripts/cbse-12-pyq/plan_paper.py 2025 65-5-2 --against 65-5-1
    python scripts/cbse-12-pyq/plan_paper.py 2025 65-5-2 --against 65-5-1,65-5-3

This is what turns the dedup index from a COUNT into a work plan. dedup_index.py
says "1,971 unique of 2,861"; this says "in 65/5/2, transcribe Q3, Q7, Q11 … and
skip Q1, Q2, Q5 …, which are byte-identical to 65/5/1."

HOW A BLOCK GETS A QUESTION NUMBER
----------------------------------
The marking scheme is a table: a question-number cell, then the question as an
IMAGE, then an `Ans` row. Walking each page top-to-bottom and attributing every
image to the most recent number cell recovers the mapping.

Two quirks are handled because both are real (measured on 65/5/1):
  • an OR-alternative's image attaches to the question it belongs to, so a
    question with internal choice legitimately owns TWO images — they are
    reported as `Q27#1` / `Q27#2` rather than silently collapsed;
  • at least one number cell is typeset in BOLD UNICODE DIGITS (𝟔 = U+1D7D4),
    which a plain \\d regex does not match. Normalised before matching.

⚠ REPORTS, NEVER DELETES. A skip here is a recommendation for a human
transcriber; the authoritative item list is still the PAPER. The index covers
~87% of items, so a question it cannot see is simply reported as NEW — the safe
direction, and the reason this is allowed to be a pre-transcription filter at
all. Only EXACT sha matches are called "already covered"; a perceptual match is
reported separately as a candidate to eyeball, never as a skip.
"""

import hashlib
import os
import re
import io
import sys
import unicodedata
import warnings

# getdata() is deprecated in Pillow 14, but this dhash MUST stay byte-identical
# to dedup_index.py's or a block covered by one tool is new to the other. The
# warning is silenced rather than the algorithm changed; migrate BOTH together.
warnings.filterwarnings("ignore", category=DeprecationWarning)

import fitz
from PIL import Image

SOURCE_ROOT = r"C:\tmp\PYQPs\CBSE\XII\Mathematics"
MIN_BLOCK_BYTES = 5000

# U+1D7CE..U+1D7FF are the mathematical bold/sans digits; NFKC folds them to
# ASCII. Without this, "𝟔." is not a question-number cell and Q6's image is
# mis-attributed to Q5.
# TWO printed forms, both real: series 65/2, 65/5, 65/6, 65/7 print a bare
# "1."; series 65/1 and 65/4 print "Q1.". A regex for only the first silently
# attributed ZERO blocks for those two series, which plan.txt then rendered as
# "0 NEW, needs transcription" - i.e. "everything is already covered" - when it
# actually meant "I could not read this file". An agent following that would
# have skipped an entire paper.
NUMCELL = re.compile(
    # THREE printed forms, all real and all measured:
    #   "1."   series 65/2, 65/5, 65/6, 65/7   (bare number, trailing dot)
    #   "Q1."  series 65/1, 65/4               (Q prefix and dot)
    #   "Q1"   series 65/3                     (Q prefix, NO dot) — and its cell
    #          sometimes swallows the next label, e.g. "Q4        Ans"
    # A BARE "1" with no dot and no Q is deliberately NOT matched: page numbers,
    # mark columns and stray digits all look like that, and admitting them
    # attributes question images to whatever integer was last seen.
    r"^(?:Q\s*(\d{1,2})\.?(?:\s+Ans\b.*)?|(\d{1,2})\.)\s*$",
    re.IGNORECASE | re.DOTALL,
)


def norm(s):
    return unicodedata.normalize("NFKC", s)


def ms_path(year, code):
    ms_dir = os.path.join(SOURCE_ROOT, str(year), "ms")
    want = code.replace("/", "-")
    for root, _, files in os.walk(ms_dir):
        for fn in files:
            if not fn.lower().endswith(".pdf"):
                continue
            if re.sub(r"[_\s]", "-", fn).find(want) >= 0:
                return os.path.join(root, fn)
    return None


def dhash(im, h=12, w=13):
    """Perceptual fingerprint: 132 bits of left-to-right brightness gradient.

    Identical to the one in dedup_index.py, on purpose - the two must agree or a
    block "already covered" by one tool is "new" to the other.
    """
    im = im.convert("L").resize((w, h), Image.LANCZOS)
    px = list(im.getdata())
    bits = 0
    k = 0
    for r in range(h):
        for c in range(w - 1):
            bits |= (1 if px[r * w + c] < px[r * w + c + 1] else 0) << k
            k += 1
    return bits


def hamming(a, b):
    return bin(a ^ b).count("1")


def blocks_by_question(path):
    """[(label, sha)] in page order, e.g. ('Q27#1', 'ab12…').

    `current` is a LOCAL, deliberately. It was a function attribute in the first
    version, which leaks state between calls — the target paper's leading blocks
    would inherit the REFERENCE paper's last question number, and the two are
    compared against each other, so the corruption would be invisible.

    Question numbers are also required to be NON-DECREASING. Page footers and
    stray cells parse as small integers ("6."), and without this a trailing
    footer re-opened Q6 forty blocks after Q36 had started.
    """
    doc = fitz.open(path)
    out = []
    counts = {}
    current = None
    highest = 0
    for page in doc:
        items = []
        for b in page.get_text("blocks"):
            t = norm(b[4]).strip()
            m = NUMCELL.match(t)
            # x0 < 120 keeps this to the marking scheme's narrow "Q.No." column;
            # a bare number elsewhere on the page is not a question cell.
            if m and b[0] < 120 and int(m.group(1) or m.group(2)) >= highest:
                items.append((b[1], "num", m.group(1) or m.group(2)))
        for img in page.get_images(full=True):
            try:
                x = doc.extract_image(img[0])
            except Exception:
                continue
            if len(x["image"]) < MIN_BLOCK_BYTES:
                continue
            rects = page.get_image_rects(img[0])
            if not rects:
                continue
            try:
                d = dhash(Image.open(io.BytesIO(x["image"])))
            except Exception:
                d = None  # unreadable codec: exact matching still works
            items.append(
                (rects[0].y0, "img", (hashlib.sha256(x["image"]).hexdigest(), d))
            )
        items.sort(key=lambda z: z[0])
        for _, kind, val in items:
            if kind == "num":
                current = val
                highest = max(highest, int(val))
            else:
                if current is None:
                    continue  # a header/logo before the first question cell
                counts[current] = counts.get(current, 0) + 1
                out.append((f"Q{current}#{counts[current]}", val))
    return out


def main():
    if len(sys.argv) < 3:
        print(__doc__.strip().splitlines()[2].strip(), file=sys.stderr)
        sys.exit(2)
    year, code = sys.argv[1], sys.argv[2]
    against = []
    for i, a in enumerate(sys.argv):
        if a == "--against" and i + 1 < len(sys.argv):
            against = [c.strip() for c in sys.argv[i + 1].split(",") if c.strip()]

    target = ms_path(year, code)
    if not target:
        print(f"no marking scheme found for {year} {code}", file=sys.stderr)
        sys.exit(1)

    known = {}
    known_perceptual = []  # [(dhash, "65-1-1 Q7#1")]
    for other in against:
        p = ms_path(year, other)
        if not p:
            print(f"  WARN reference {other} not found — ignored", file=sys.stderr)
            continue
        for label, (sha, dh) in blocks_by_question(p):
            known.setdefault(sha, []).append(f"{other} {label}")
            if dh is not None:
                known_perceptual.append((dh, f"{other} {label}"))

    rows = blocks_by_question(target)
    if not rows:
        # NEVER let an unreadable marking scheme render as "nothing is new".
        # A zero here is the absence of a measurement, not a finding.
        print(f"{year} {code} - COULD NOT READ the marking scheme's question cells.")
        print("  This is NOT a claim that nothing is new. The block->question")
        print("  mapping found no numbered cells, so no skip list can be produced.")
        print("  TRANSCRIBE THE WHOLE PAPER.")
        sys.exit(0)
    covered = [(l, known[sha]) for l, (sha, _) in rows if sha in known]
    new = [(l, dh) for l, (sha, dh) in rows if sha not in known]

    # STAGE 2 - PERCEPTUAL. A byte hash only fires when CBSE reuses the same
    # typeset block. Several series are re-typeset or re-encoded between sets,
    # so the SAME question yields a different sha: 2022 series 65/1 matches 0
    # of 13 by sha and 5 by dHash, while its sibling 65/2 matches 11 by sha and
    # 0 more by dHash. That CONTRAST is the diagnosis - a low sha count alone
    # cannot tell 're-typeset' from 'genuinely different questions', and until
    # now telling them apart meant rendering the blocks and looking at them.
    #
    # REPORTED AS CANDIDATES, NEVER AS SKIPS. A dHash collision is a claim about
    # appearance, and two different questions set in one typeface at one width
    # genuinely look alike; only the sha branch may say 'already covered'.
    LIKELY = 8
    likely = []
    for label, dh in new:
        if dh is None:
            continue
        hits = sorted(
            ((hamming(dh, k), w) for k, w in known_perceptual), key=lambda z: z[0]
        )
        if hits and hits[0][0] <= LIKELY:
            likely.append((label, hits[0][1], hits[0][0]))
    new = [l for l, _ in new]

    print(f"{year} {code} - {len(rows)} question blocks in its marking scheme")
    print(f"  already covered by [{', '.join(against) or 'nothing'}] : {len(covered)}")
    print(f"  NEW, needs transcription                              : {len(new)}")

    # PARTIAL BLINDNESS is the dangerous middle case, and it is REAL: 2026 series
    # 65/4 prints its answers as TEXT and pastes an image for only ~19 of its ~48
    # questions, so the index can SEE barely a third of the paper. It then reports
    # "0 already covered", which reads exactly like "nothing is duplicated" while
    # actually meaning "I could not look". A total failure is caught above; this
    # is the case that renders as a confident finding.
    #
    # The floor MUST be derived from the paper's own pattern. A first version
    # hardcoded 30, which is right for the 48-question full80 paper and fires on
    # EVERY 2022 Term-2 paper, whose 14 questions index ~13 blocks - and its
    # message said "a full paper has ~48 questions", which for a Term-2 paper is
    # simply false. A warning that fires on everything buries its one real hit.
    #
    # These counts mirror PAPER_PATTERNS in lib.ts. They are duplicated across
    # the Python/TS boundary rather than imported; if a pattern is ever added
    # there, add it here too or this check silently stops covering that year.
    # Indexed blocks legitimately EXCEED the printed question count, because an
    # internal choice contributes a second image - hence a 60% floor rather than
    # anything tighter.
    EXPECTED_BLOCKS = {"full80": 48, "term2": 14}
    pattern = "term2" if int(year) == 2022 else "full80"
    expected = EXPECTED_BLOCKS[pattern]
    if len(rows) < 0.6 * expected:
        print()
        print(f"  !! ONLY {len(rows)} BLOCKS INDEXED - a {pattern} paper indexes ~{expected}.")
        print("    This marking scheme pastes an image for only some of its")
        print("    questions (2026 series 65/4 prints the answers as text), so the")
        print("    skip list above covers a FRACTION of the paper and the")
        print("    'already covered' count is NOT a duplicate count.")
        print("    TRANSCRIBE THE WHOLE PAPER; content_hash collapses any true")
        print("    duplicates at commit time.")

    if covered:
        print("\n  SKIP (byte-identical):")
        for label, where in covered:
            print(f"    {label:10s} = {', '.join(where)}")
    if likely:
        print()
        print(f"  LIKELY DUPLICATE ({len(likely)}) - VERIFY, DO NOT SKIP ON THIS ALONE:")
        print("    A perceptual match means the block LOOKS the same, usually")
        print("    because the set was re-typeset or re-encoded. Read the question")
        print("    before trusting it; if it really is the same, content_hash will")
        print("    collapse it at commit, so transcribing it is never wrong.")
        for label, where, dist in likely:
            print(f"    {label:10s} ~ {where}   (dHash distance {dist})")

    print("\n  TRANSCRIBE:")
    print("    " + " ".join(new))


if __name__ == "__main__":
    main()
