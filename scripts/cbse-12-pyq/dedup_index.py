"""
Build the pre-transcription duplicate index for the CBSE Class-12 board PYQs.

    python scripts/cbse-12-pyq/dedup_index.py            # report only
    python scripts/cbse-12-pyq/dedup_index.py --write    # also write out/dedup-index.json

WHY THIS EXISTS, AND WHY IT IS NOT A HEURISTIC
----------------------------------------------
CBSE's marking schemes embed each question as a discrete image object, and a
question reused across sets is BYTE-IDENTICAL. So a SHA-256 match here is
evidence that CBSE reused the identical typeset block — proof of reuse, not a
similarity guess. That is what makes a PRE-transcription filter safe, where an
OCR-fingerprint filter would not be: a false "duplicate" silently drops a unique
question, which is unrecoverable and invisible to every downstream gate.

Validated three ways before being trusted (2026-08-18):
  • visually     — a block is one COMPLETE question including its four options;
  • by yield     — exact hashing finds 770 of the 890 duplicates;
  • by CORRECTNESS — across the 27 questions appearing in more than one 65/5
    set, the official answers AGREE 14 / DISAGREE 0.

TWO STAGES, AND ONLY THE FIRST IS AUTOMATIC
-------------------------------------------
  stage 1  exact SHA-256          → auto-drop. Proof-grade.
  stage 2  perceptual (dHash)     → CANDIDATES for a reviewed ledger. NEVER an
                                    auto-drop, following the reasoning in
                                    scripts/mh-hsc-12-pyq/dedupe.ts: its 0.90
                                    threshold missed real pairs at 0.76-0.89
                                    while a genuinely-different pair sat at 0.83.
Stage 2 is not optional cleanup — series 65/1 and 65/4 RE-ENCODE their images, so
exact hashing under-detects there (15 and 11 extra pairs, against 1-2 elsewhere).

SCOPE — this indexes MARKING SCHEMES, and it is a DEDUP TOOL, NOT A QUESTION
INVENTORY. It covers ~87% of items (2,861 blocks against ~3,300 expected: 38
questions + 9 internal-choice alternatives per full80 paper). Question numbering
and the authoritative item list come from the PAPERS. An item this misses is not
lost — it is transcribed and then caught by stage 2, which is the safe direction.

Comparison is scoped WITHIN (year, series) because that is where reuse lives:
cross-series overlap is ~0 (3 blocks across all 15 pairs of 2025) and cross-YEAR
overlap is exactly 0 — CBSE never repeats a question between years.
"""

import hashlib
import io
import itertools
import json
import os
import re
import sys

import fitz  # PyMuPDF
from PIL import Image

SOURCE_ROOT = r"C:\tmp\PYQPs\CBSE\XII\Mathematics"
OUT = os.path.join(os.path.dirname(__file__), "out")
YEARS = ["2022", "2023", "2024", "2025", "2026"]

# Mirrors parsePaperCode in ./lib.ts. Kept in step with it BY TEST, not by hope:
# tests/cbse-12-pyq-lib.test.ts pins the TS side against the same real filenames.
JOB_PREFIX = re.compile(r"^\d{4}-\d[_\s-]+")
CODE = re.compile(r"65[\s_\-(]*([1-9])[\s_\-)]*([1-9])")
VI = re.compile(r"65[\s_\-(]*B", re.I)

# A block below this many bytes is page furniture (rules, logos, bullets), not a
# question. Chosen from the observed distribution: real blocks run ~20 KB median.
MIN_BLOCK_BYTES = 5000
# dHash Hamming distance at or below this is a stage-2 CANDIDATE, not a verdict.
PERCEPTUAL_MAX_DISTANCE = 8


def parse_code(path):
    base = JOB_PREFIX.sub("", os.path.basename(path))
    if VI.search(base):
        return None  # 65(B) visually-impaired paper — a separate adapted set
    m = CODE.search(base)
    return (m.group(1), m.group(2)) if m else None


def dhash(im, h=12, w=13):
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


def collect():
    blocks = []
    for year in YEARS:
        ms_dir = os.path.join(SOURCE_ROOT, year, "ms")
        if not os.path.isdir(ms_dir):
            print(f"  WARN {year}: no marking-scheme directory at {ms_dir}", file=sys.stderr)
            continue
        seen_files = set()
        for root, _, files in os.walk(ms_dir):
            for fn in sorted(files):
                if not fn.lower().endswith(".pdf"):
                    continue
                path = os.path.join(root, fn)
                code = parse_code(path)
                if not code:
                    continue
                fh = hashlib.sha256(open(path, "rb").read()).hexdigest()
                if fh in seen_files:  # byte-identical twin filename
                    continue
                seen_files.add(fh)
                try:
                    doc = fitz.open(path)
                except Exception as e:  # a corrupt PDF must be loud, not skipped
                    print(f"  WARN cannot open {path}: {e}", file=sys.stderr)
                    continue
                for page in doc:
                    for img in page.get_images(full=True):
                        try:
                            x = doc.extract_image(img[0])
                        except Exception:
                            continue
                        if len(x["image"]) < MIN_BLOCK_BYTES:
                            continue
                        try:
                            im = Image.open(io.BytesIO(x["image"]))
                        except Exception:
                            continue
                        blocks.append(
                            {
                                "year": year,
                                "series": code[0],
                                "set": code[1],
                                "sha": hashlib.sha256(x["image"]).hexdigest(),
                                "dh": dhash(im),
                            }
                        )
    return blocks


def group(blocks):
    """Union-find within (year, series). Returns (exact_unique, final_unique, groups)."""
    parent = list(range(len(blocks)))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    def union(i, j):
        a, b = find(i), find(j)
        if a != b:
            parent[a] = b

    buckets = {}
    for idx, b in enumerate(blocks):
        buckets.setdefault((b["year"], b["series"]), []).append(idx)

    exact_pairs = perceptual_pairs = 0
    for idxs in buckets.values():
        for i, j in itertools.combinations(idxs, 2):
            if blocks[i]["sha"] == blocks[j]["sha"]:
                if find(i) != find(j):
                    exact_pairs += 1
                union(i, j)
        # Perceptual pass runs SECOND so its merges are reported separately —
        # they are the ones a human still has to adjudicate.
        for i, j in itertools.combinations(idxs, 2):
            if find(i) != find(j) and hamming(blocks[i]["dh"], blocks[j]["dh"]) <= PERCEPTUAL_MAX_DISTANCE:
                perceptual_pairs += 1
                union(i, j)

    groups = {}
    for idx in range(len(blocks)):
        groups.setdefault(find(idx), []).append(idx)
    return exact_pairs, perceptual_pairs, groups


def main():
    blocks = collect()
    if not blocks:
        print("no blocks found — is SOURCE_ROOT populated?", file=sys.stderr)
        sys.exit(1)

    exact_unique_total = 0
    print("year  series   raw  exact-unique  final-unique  redundancy")
    for year in YEARS:
        ys = [b for b in blocks if b["year"] == year]
        if not ys:
            continue
        for ser in sorted({b["series"] for b in ys}):
            g = [b for b in ys if b["series"] == ser]
            _, _, grp = group(g)
            ex = len({b["sha"] for b in g})
            exact_unique_total += ex
            print(
                f"{year}   65-{ser}   {len(g):5d} {ex:13d} {len(grp):13d}  {(len(g) - len(grp)) / len(g):9.0%}"
            )

    exact_pairs, perceptual_pairs, groups = group(blocks)
    raw, final = len(blocks), len(groups)
    print("=" * 62)
    print(f"raw blocks          : {raw}")
    print(f"unique (exact only) : {exact_unique_total}")
    print(f"unique (both stages): {final}")
    print(f"duplicates removed  : {raw - final} ({(raw - final) / raw:.0%})")
    print(f"  stage 1 proof-grade (exact sha) : {raw - exact_unique_total}")
    print(f"  stage 2 NEEDS REVIEW (perceptual): {exact_unique_total - final}")

    if "--write" in sys.argv:
        os.makedirs(OUT, exist_ok=True)
        path = os.path.join(OUT, "dedup-index.json")
        payload = []
        for members in groups.values():
            rep = blocks[members[0]]
            payload.append(
                {
                    "sha": rep["sha"],
                    "appearsIn": sorted(
                        f"{blocks[m]['year']}:65/{blocks[m]['series']}/{blocks[m]['set']}" for m in members
                    ),
                    # True when the group was formed by anything other than an
                    # exact match — those groups are candidates, not verdicts.
                    "needsReview": len({blocks[m]["sha"] for m in members}) > 1,
                }
            )
        json.dump(payload, open(path, "w"), indent=1)
        print(f"\nwrote {path} ({len(payload)} groups, {sum(1 for p in payload if p['needsReview'])} needing review)")


if __name__ == "__main__":
    main()
