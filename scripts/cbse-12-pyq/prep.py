"""
Prepare one paper for transcription: render its pages and its marking scheme,
and write the skip plan.

    python scripts/cbse-12-pyq/prep.py 2025 65-5-2 --against 65-5-1

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

SOURCE_ROOT = r"C:\tmp\PYQPs\CBSE\XII\Mathematics"
OUT = os.path.join(os.path.dirname(__file__), "out")
DPI = 165


def find_pdf(year, code, kind):
    """kind is 'qp' or 'ms'. Matches the code with any separator style."""
    root = os.path.join(SOURCE_ROOT, str(year), kind)
    want = code.replace("/", "-")
    hits = []
    for dirpath, _, files in os.walk(root):
        for fn in files:
            if not fn.lower().endswith(".pdf"):
                continue
            if re.search(r"65[\s_\-(]*B", fn, re.I):
                continue  # visually-impaired variant — a different paper
            if re.sub(r"[_\s]", "-", fn).find(want) >= 0:
                hits.append(os.path.join(dirpath, fn))
    if not hits:
        return None
    # 2024 ships some papers twice under two names; identical bytes, take one.
    return sorted(hits)[0]


def render(pdf, dest):
    os.makedirs(dest, exist_ok=True)
    doc = fitz.open(pdf)
    for i, page in enumerate(doc):
        page.get_pixmap(dpi=DPI).save(os.path.join(dest, f"p{i:02d}.png"))
    return len(doc)


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
        print("usage: prep.py <year> <code> [--against c1,c2]", file=sys.stderr)
        sys.exit(2)
    year, code = sys.argv[1], sys.argv[2]
    against = ""
    for i, a in enumerate(sys.argv):
        if a == "--against" and i + 1 < len(sys.argv):
            against = sys.argv[i + 1]

    paper_id = f"{year}-{code.replace('/', '-')}"
    qp = find_pdf(year, code, "qp")
    ms = find_pdf(year, code, "ms")
    if not qp:
        print(f"no question paper found for {year} {code}", file=sys.stderr)
        sys.exit(1)
    if not ms:
        # Not fatal, but it means Section-A answers cannot be taken from the
        # official key — which is the whole quality argument for this ingest.
        print(f"  WARN no marking scheme for {year} {code}", file=sys.stderr)

    dest = os.path.join(OUT, paper_id)
    n_qp = render(qp, dest)
    n_ms = render(ms, os.path.join(dest, "ms")) if ms else 0
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
