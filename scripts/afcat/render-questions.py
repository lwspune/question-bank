# Render ONLY the question region of a book chapter's pages, column by column,
# stopping at the first answer/hints/solutions heading. The blind pass must not
# see the key, and the key often shares a page with the last questions (Conquer
# the Sky p3: past-year Q13-14 in the left column, "Answers" in the right). A
# full-width cut at the heading would hide those questions; no cut would show
# the key.
#
#   python scripts/afcat/render-questions.py <pdf> <outdir> [--dpi=150]
#          [--start=PRACTICE] [--also-stop=PREVIOUS]
#
# --start: render nothing before the first block whose text contains this word
#   (CDS Pathfinder: skip the theory and worked examples).
# --also-stop: an extra stop word (CDS Pathfinder: "PREVIOUS", its CDS
#   past-year section, which the owner left out).
#
# Writes <outdir>/p<N>-L.png and p<N>-R.png (columns). Reading order is left
# column, right column, next page; nothing after a stop heading is rendered.
import os
import re
import sys

import fitz  # PyMuPDF

# Not "Solution": worked examples in the theory pages are labelled with it.
HEAD = re.compile(r"^(ANSWERS|Answers|HINTS|Hints|SOLUTIONS|EXPLANATIONS)$")
pdf, out = sys.argv[1], sys.argv[2]
opt = {a.split("=", 1)[0]: a.split("=", 1)[1] for a in sys.argv[3:] if "=" in a}
dpi = int(opt.get("--dpi", 150))
start_word = opt.get("--start")
also_stop = opt.get("--also-stop")
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
started = start_word is None
stop = False
for pno, page in enumerate(doc, start=1):
    if stop:
        break
    W, H = page.rect.width, page.rect.height
    mid = W / 2
    words = page.get_text("words")
    for side, x0, x1 in (("L", 0, mid), ("R", mid, W)):
        col = [w for w in words if x0 <= w[0] < x1]
        top = 0.0
        if not started:
            hits = [w for w in col if start_word in w[4]]
            if not hits:
                continue
            started = True
            top = min(h[1] for h in hits) - 3
            print(f"p{pno}-{side}: start heading at y={top:.0f}")
        heads = [w for w in col if HEAD.match(w[4]) or (also_stop and also_stop in w[4] and w[1] > top + 5)]
        cut = min([h[1] for h in heads] or [H])
        if heads:
            print(f"p{pno}-{side}: stop heading at y={cut:.0f}; column rendered only above it")
        if cut - top > 40:
            dest = os.path.join(out, f"p{pno}-{side}.png")
            page.get_pixmap(dpi=dpi, clip=fitz.Rect(x0, top, x1, cut - 3)).save(dest)
            print(dest)
        if heads:
            # Everything after a stop heading in reading order is key (or the
            # left-out section): render nothing further.
            stop = True
            break
