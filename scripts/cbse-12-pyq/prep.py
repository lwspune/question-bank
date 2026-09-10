"""
Prepare one paper for transcription: render its pages and its marking scheme,
and write the skip plan.

    python scripts/cbse-12-pyq/prep.py 2025 65-5-2 --against 65-5-1
    python scripts/cbse-12-pyq/prep.py 2023 56-1-1 --subject=chemistry
    python scripts/cbse-12-pyq/prep.py 2023 55-1-1 --subject=physics --ms-pages 0:21

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
DPI = 165

# A marking scheme whose filename advertises several papers — "55-1-1,2,3" or
# "55_1-(1 & 2 & 3)". Physics ships these in EVERY year 2022-2025, and rendering
# one whole would hand the transcriber three papers' keys stacked together.
MERGED_MS = re.compile(r"\d[\s_\-]*\(?\s*[1-9](?:\s*[,.&]\s*[1-9])+")


def find_pdf(year, code, kind, subject="maths"):
    """kind is 'qp' or 'ms'. Matches the code with any separator style."""
    folder, prefix = SUBJECTS[subject]
    root = os.path.join(SOURCE_BASE, folder, str(year), kind)
    want = code.replace("/", "-")
    hits = []
    for dirpath, _, files in os.walk(root):
        for fn in files:
            if not fn.lower().endswith(".pdf"):
                continue
            if re.search(prefix + r"[\s_\-(]*B", fn, re.I):
                continue  # visually-impaired variant — a different paper
            if re.search(r"hindi", dirpath + fn, re.I) or re.search(r"[_-]H\s*\.pdf$", fn, re.I):
                continue  # Hindi medium — a translation can never dedup against
                          # the real English stem, since content_hash is stem-derived
            if re.sub(r"[_\s]", "-", fn).find(want) >= 0:
                hits.append(os.path.join(dirpath, fn))
    if not hits:
        return None
    # 2024 ships some papers twice under two names; identical bytes, take one.
    return sorted(hits)[0]


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
    qp = find_pdf(year, code, "qp", subject)
    ms = find_pdf(year, code, "ms", subject)

    # A merged marking scheme carries THREE papers' keys. Rendering it whole
    # would hand the transcriber the wrong paper's Section-A answers with
    # nothing to signal it, so refuse until the page range is supplied.
    # `papers.ts --subject=<s> --read-merged` prints the range for every paper.
    if ms and ms_pages is None and MERGED_MS.search(os.path.basename(ms)):
        print(
            f"  REFUSING: {os.path.basename(ms)} is a MERGED marking scheme carrying several\n"
            f"  papers. Pass --ms-pages from:to for {code}. Get the range from:\n"
            f"    npx tsx scripts/cbse-12-pyq/papers.ts --subject={subject} --read-merged",
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
