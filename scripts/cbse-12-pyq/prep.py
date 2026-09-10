"""
Prepare one paper for transcription: render its pages and its marking scheme,
and write the skip plan.

    python scripts/cbse-12-pyq/prep.py 2025 65-5-2 --against 65-5-1
    python scripts/cbse-12-pyq/prep.py 2023 56-1-1 --subject=chemistry
    python scripts/cbse-12-pyq/prep.py 2023 55-1-1 --subject=physics

⚠ REQUIRES the paper index, once per subject (and again whenever the source
folder changes — it is derived from disk, so refreshing costs nothing):

    npx tsx scripts/cbse-12-pyq/papers.ts --subject=physics --emit-index

That index is the ONLY thing that resolves a paper to its PDFs. This script
used to search the filenames itself and had silently diverged; see load_index.
It also carries the page range of a merged marking scheme, so --ms-pages is now
needed only to override one by hand.

Produces, under out/<paperId>/:
    pNN.png       the question paper, one file per page
    ms/pNN.png    the official marking scheme, one file per page
    plan.txt      which questions are already covered (from plan_paper.py)
    contact.png   a thumbnail sheet of the whole paper, for finding the
                  English pages in one look rather than 23

<paperId> is <year>-<code>, e.g. 2025-65-5-2 — the same id validate.ts and
commit.ts take, so the whole lane keys on one string.

DPI 165 is deliberate: 150 loses subscripts on the a_ij questions and 200 makes
pages large enough to slow an agent down without reading any better.
"""

import json
import os
import re
import sys

import fitz
from PIL import Image, ImageDraw

# Per-subject source roots and paper-code prefixes. Kept in step with the
# SUBJECTS registry in config.ts — this is the Python half of the same thing.
# The prefix is what keeps a Chemistry paper out of the Physics corpus: 55, 56
# and 65 are the same three digits rearranged, and every Chemistry filename also
# carries the subject code 043.
SUBJECTS = {
    "maths": ("Mathematics", "65"),
    "physics": ("Physics", "55"),
    "chemistry": ("Chemistry", "56"),
}
SOURCE_BASE = r"C:\tmp\PYQPs\CBSE\XII"
OUT = os.path.join(os.path.dirname(__file__), "out")
DATA = os.path.join(os.path.dirname(__file__), "data")
DPI = 165

# A marking scheme whose filename advertises several papers — "55-1-1,2,3" or
# "55_1-(1 & 2 & 3)". Physics ships these in EVERY year 2022-2025, and rendering
# one whole would hand the transcriber three papers' keys stacked together.
MERGED_MS = re.compile(r"\d[\s_\-]*\(?\s*[1-9](?:\s*[,.&]\s*[1-9])+")


def load_index(subject):
    """Resolve papers from the TS discovery's emitted index — never re-derive.

    ⚠ THIS REPLACED A SECOND, DIVERGED MATCHER. prep.py used to search the
    filenames itself, and its miss was NON-FATAL: it warned and then rendered
    the paper with no marking scheme, so Section-A answers silently stopped
    coming from CBSE's official key — the entire quality argument for this
    ingest. Measured 2026-09-10, it lost the marking scheme for 62 of 78
    PHYSICS papers and 6 of 78 Chemistry ones, from two independent causes:

      • it normalised [_\\s] to "-" without collapsing runs, so
        "XII_043_Chemistry_MS_56_2- 1-.pdf" became "...56-2--1-" and never
        contained "56-2-1";
      • it substring-matched the code, so a MERGED filename advertising
        "55-1-1,2,3" could never match "55-1-2" or "55-1-3". That is most of
        the Physics corpus, which ships merged schemes in every year 2022-2025.

    papers.ts already resolves all of this — including which PAGE RANGE of a
    merged file belongs to this paper — and is the half with tests. So this
    reads its output rather than growing a second implementation to drift.
    """
    path = os.path.join(DATA, f"_papers.{subject}.json")
    if not os.path.exists(path):
        print(
            f"  no paper index at {path}\n"
            f"  Generate it first (it is derived from disk, so it is cheap to refresh):\n"
            f"    npx tsx scripts/cbse-12-pyq/papers.ts --subject={subject} --emit-index",
            file=sys.stderr,
        )
        sys.exit(2)
    with open(path, encoding="utf-8") as fh:
        rows = json.load(fh)
    return {r["paperId"]: r for r in rows}


def render(pdf, dest, pages=None):
    """pages is an inclusive (from, to) 0-based range, or None for the whole file."""
    os.makedirs(dest, exist_ok=True)
    doc = fitz.open(pdf)
    lo, hi = (0, len(doc) - 1) if pages is None else pages
    hi = min(hi, len(doc) - 1)
    for i in range(lo, hi + 1):
        doc[i].get_pixmap(dpi=DPI).save(os.path.join(dest, f"p{i - lo:02d}.png"))
    return hi - lo + 1


def contact_sheet(pdf, path):
    doc = fitz.open(pdf)
    thumbs = []
    for page in doc:
        pm = page.get_pixmap(dpi=40)
        thumbs.append(Image.frombytes("RGB", (pm.width, pm.height), pm.samples))
    w, h = thumbs[0].size
    cols = 6
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * w, rows * (h + 16)), "white")
    draw = ImageDraw.Draw(sheet)
    for i, im in enumerate(thumbs):
        x, y = (i % cols) * w, (i // cols) * (h + 16)
        sheet.paste(im, (x, y + 16))
        draw.text((x + 4, y + 3), f"idx {i}", fill="red")
    sheet.save(path)


def main():
    if len(sys.argv) < 3:
        print(
            "usage: prep.py <year> <code> [--subject=maths|physics|chemistry] "
            "[--against c1,c2] [--ms-pages from:to]",
            file=sys.stderr,
        )
        sys.exit(2)
    year, code = sys.argv[1], sys.argv[2]
    against = ""
    subject = "maths"
    ms_pages = None
    for i, a in enumerate(sys.argv):
        if a == "--against" and i + 1 < len(sys.argv):
            against = sys.argv[i + 1]
        if a.startswith("--subject="):
            subject = a.split("=", 1)[1].strip().lower()
        if a == "--ms-pages" and i + 1 < len(sys.argv):
            lo, hi = sys.argv[i + 1].split(":")
            ms_pages = (int(lo), int(hi))
    if subject not in SUBJECTS:
        print(f"unknown --subject={subject}; expected one of {', '.join(SUBJECTS)}", file=sys.stderr)
        sys.exit(2)

    paper_id = f"{year}-{code.replace('/', '-')}"
    index = load_index(subject)
    row = index.get(paper_id)
    if row is None:
        print(
            f"  {paper_id} is not in the {subject} paper index.\n"
            f"  Either the code is wrong, or the index predates this paper landing on disk:\n"
            f"    npx tsx scripts/cbse-12-pyq/papers.ts --subject={subject} --emit-index",
            file=sys.stderr,
        )
        sys.exit(2)
    qp, ms = row["qp"], row["ms"]

    # The index already knows which page range of a merged marking scheme
    # belongs to THIS paper, so the common case needs no --ms-pages at all.
    # An explicit flag still wins, for re-checking a range by hand.
    if ms_pages is None and row.get("msPages"):
        ms_pages = (row["msPages"]["from"], row["msPages"]["to"])

    # Belt and braces: if the filename still advertises several papers and we
    # have NO range, refuse. Rendering it whole hands the transcriber three
    # papers' Section-A keys stacked together with nothing to signal it.
    if ms and ms_pages is None and MERGED_MS.search(os.path.basename(ms)):
        print(
            f"  REFUSING: {os.path.basename(ms)} is a MERGED marking scheme carrying several\n"
            f"  papers, and the index carries no page range for {code}. Re-emit the index\n"
            f"  (it reads the PDF to find the block boundaries), or pass --ms-pages from:to:\n"
            f"    npx tsx scripts/cbse-12-pyq/papers.ts --subject={subject} --emit-index",
            file=sys.stderr,
        )
        sys.exit(1)
    if not qp:
        print(f"no question paper found for {year} {code}", file=sys.stderr)
        sys.exit(1)
    if not ms:
        # Not fatal, but it means Section-A answers cannot be taken from the
        # official key — which is the whole quality argument for this ingest.
        print(f"  WARN no marking scheme for {year} {code}", file=sys.stderr)

    dest = os.path.join(OUT, paper_id)
    n_qp = render(qp, dest)
    n_ms = render(ms, os.path.join(dest, "ms"), ms_pages) if ms else 0
    contact_sheet(qp, os.path.join(dest, "contact.png"))

    plan_path = os.path.join(dest, "plan.txt")
    if against:
        os.system(
            f'python "{os.path.join(os.path.dirname(__file__), "plan_paper.py")}" '
            f'{year} {code} --against {against} > "{plan_path}" 2>&1'
        )
    else:
        with open(plan_path, "w") as fh:
            fh.write("No reference papers given — transcribe every question.\n")

    print(f"{paper_id}: qp {n_qp} pages, ms {n_ms} pages -> {dest}")


if __name__ == "__main__":
    main()
