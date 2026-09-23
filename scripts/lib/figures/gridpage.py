"""
Render the page holding a question, overlaid with a fractional coordinate grid.

  python scripts/lib/figures/gridpage.py <pdf> <anchor text> <out.png> [--all]

The authoring aid for `overrides.json`. Hand-anchoring needs two things that a
plain render does not give: WHICH page the question is on, and coordinates you
can read off rather than estimate. The page is found by searching for a prose
fragment of the stem (numbers and math are unreliable — they are often drawn as
images), and the grid is labelled in the same 0..1 fractions the override file
takes, so a box can be transcribed instead of guessed.

Prints the page index it used, which is the value that goes in the override.
"""
import sys

import fitz
from PIL import Image, ImageDraw

STEP = 0.05
SCALE = 1.7


def main():
    pdf, anchor, out = sys.argv[1], sys.argv[2], sys.argv[3]
    show_all = "--all" in sys.argv
    doc = fitz.open(pdf)

    hits = [p for p in range(len(doc)) if doc[p].search_for(anchor)]
    if not hits:
        # Fall back to a normalised text scan: search_for is layout-sensitive and
        # misses an anchor that wraps across a line, which is most of them.
        flat = anchor.lower().split()
        for p in range(len(doc)):
            t = " ".join(doc[p].get_text().lower().split())
            if all(w in t for w in flat):
                hits.append(p)
    if not hits:
        print("ANCHOR NOT FOUND")
        return
    if not show_all:
        hits = hits[:1]

    for p in hits:
        page = doc[p]
        W, H = page.rect.width, page.rect.height
        pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("RGB")
        d = ImageDraw.Draw(im)
        n = int(1 / STEP)
        for i in range(n + 1):
            f = i * STEP
            x, y = f * im.width, f * im.height
            major = i % 2 == 0
            col = (255, 90, 90) if major else (210, 210, 255)
            d.line([(x, 0), (x, im.height)], fill=col, width=2 if major else 1)
            d.line([(0, y), (im.width, y)], fill=col, width=2 if major else 1)
            if major:
                d.text((x + 2, 2), f"{f:.2f}", fill=(200, 0, 0))
                d.text((2, y + 2), f"{f:.2f}", fill=(200, 0, 0))
        path = out if len(hits) == 1 else out.replace(".png", f"-p{p}.png")
        im.save(path)
        print(f"page {p}  ({W:.0f}x{H:.0f}pt) -> {path}")


if __name__ == "__main__":
    main()
