# Render ONLY the question region of a book chapter's pages, column by column,
# stopping each column at its first answer/hints/solutions heading. The blind
# pass must not see the key, and the key often shares a page with the last
# questions (Conquer the Sky p3: past-year Q13-14 in the left column, "Answers"
# in the right). A full-width cut at the heading would hide those questions; no
# cut would show the key.
#
#   python scripts/afcat/render-questions.py <pdf> <outdir> [--dpi=150]
#
# Writes <outdir>/p<N>-L.png and p<N>-R.png (columns), skips a column that
# starts with its heading, and stops at the first page with a heading in BOTH
# columns or a heading at the top of a column (everything after is the key).
import os
import re
import sys

import fitz  # PyMuPDF

# Not "Solution": worked examples in the theory pages are labelled with it.
HEAD = re.compile(r"^(ANSWERS|Answers|HINTS|Hints|SOLUTIONS|EXPLANATIONS)$")
pdf, out = sys.argv[1], sys.argv[2]
dpi = int(next((a[6:] for a in sys.argv[3:] if a.startswith("--dpi=")), 150))
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
stop = False
for pno, page in enumerate(doc, start=1):
    if stop:
        break
    W, H = page.rect.width, page.rect.height
    mid = W / 2
    words = page.get_text("words")
    for side, x0, x1 in (("L", 0, mid), ("R", mid, W)):
        heads = [w for w in words if HEAD.match(w[4]) and x0 <= w[0] < x1]
        cut = min([h[1] for h in heads] or [H])
        if heads:
            print(f"p{pno}-{side}: answer heading at y={cut:.0f}; column rendered only above it")
        if cut > 60:
            dest = os.path.join(out, f"p{pno}-{side}.png")
            page.get_pixmap(dpi=dpi, clip=fitz.Rect(x0, 0, x1, cut - 3)).save(dest)
            print(dest)
        if heads and side == "R":
            stop = True  # the key starts here; nothing after this page is questions
        if heads and side == "L" and cut < H * 0.25:
            stop = True
