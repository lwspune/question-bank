"""
Tighten a COARSE hand-drawn box onto the ink it contains.

  python scripts/lib/figures/tighten.py <pdf> <page> <x0> <y0> <x1> <y1>
      -> prints {"bbox":[...], "moved":[...], "note":"..."}

WHY THIS EXISTS. Hand-anchoring a figure meant reading a page, eyeballing four
coordinates, cropping, looking at the crop, and re-cutting — and on the first
eleven anchors SIX needed a second pass. Every one of those re-cuts was the same
two defects: an edge slightly inside the drawing (a clipped charge label, a
missing caption) or slightly outside it (a shaved line of the text column
wrapping alongside). Both are mechanical, and the machinery to fix them already
existed on the derived path while the hand path skipped it entirely.

So the hand input becomes a ROUGH REGION rather than a final answer:
  - the box is shrunk onto the ink actually inside it, plus a small margin, so
    an edge cutting through a label is pushed out and a wide empty edge pulled in;
  - then the same body-text trim the derivation uses runs over the result, so a
    line of prose inside the region is excluded rather than shaved.

It can only ever move an edge INWARD to exclude prose or OUTWARD to reach ink
that the region already overlaps. It cannot wander onto a neighbouring figure,
because it never looks outside the region it was given. That bound is the point:
the human still says WHICH figure, the geometry only says where its edges are.
"""
import json
import re
import sys

import fitz
import numpy as np

INK = 165          # grayscale below this counts as ink
ROW_MIN = 0.004    # fraction of the band that must be ink for a row/col to count
MARGIN = 0.008     # fraction of the region added back as breathing room
RENDER = 2.0
LINE_MAX_CHARS = 26
# A FIGURE'S OWN CAPTION IS NOT PROSE, however long it is. "Fig. a: Position of
# charges." is 27 characters, one over the label threshold, so the first version
# of this trimmed captions off three of the eleven boxes a human had already
# accepted WITH them — a quality regression dressed up as a tightening. Caught
# by validating the tool against those eleven rather than by reading its output.
CAPTION_LINE = re.compile(r"^\s*fig(?:ure)?\b", re.I)


def body_lines(page, W, H):
    """Lines that are prose rather than a figure label — the same two tests the
    derivation uses: too long to be a label, or sitting on a shared column edge."""
    counts, lines = {}, []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(s["text"] for s in line["spans"]).strip()
            if not text:
                continue
            key = round(line["bbox"][0] / 2) * 2
            counts[key] = counts.get(key, 0) + 1
            lines.append((fitz.Rect(line["bbox"]), text))
    columns = {x for x, n in counts.items() if n >= 4}
    out = []
    for r, text in lines:
        if CAPTION_LINE.match(text):
            continue
        if len(text) > LINE_MAX_CHARS or any(abs(r.x0 - c) <= 2 for c in columns):
            out.append(r)
    return out


def main():
    pdf, page_no = sys.argv[1], int(sys.argv[2])
    x0, y0, x1, y1 = (float(v) for v in sys.argv[3:7])
    doc = fitz.open(pdf)
    page = doc[page_no]
    W, H = page.rect.width, page.rect.height
    region = fitz.Rect(x0 * W, y0 * H, x1 * W, y1 * H)

    pix = page.get_pixmap(matrix=fitz.Matrix(RENDER, RENDER), clip=region, colorspace=fitz.csGRAY)
    arr = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width)
    mask = arr < INK
    rows = np.where(mask.mean(axis=1) > ROW_MIN)[0]
    cols = np.where(mask.mean(axis=0) > ROW_MIN)[0]
    if not len(rows) or not len(cols):
        print(json.dumps({"bbox": [x0, y0, x1, y1], "moved": [], "note": "no ink in the region — left as given"}))
        return

    rw, rh = region.width, region.height
    mx, my = MARGIN * rw, MARGIN * rh
    tight = fitz.Rect(
        max(region.x0, region.x0 + cols[0] / RENDER - mx),
        max(region.y0, region.y0 + rows[0] / RENDER - my),
        min(region.x1, region.x0 + (cols[-1] + 1) / RENDER + mx),
        min(region.y1, region.y0 + (rows[-1] + 1) / RENDER + my),
    )

    # Same trim as the derived path: no line of body text may remain inside.
    notes = []
    for pr in body_lines(page, W, H):
        if not tight.intersects(pr):
            continue
        if (tight & pr).get_area() < 0.2 * pr.get_area():
            continue
        # Push the nearest edge off it, never cutting more than the overlap.
        if pr.y1 <= tight.y0 + (tight.height / 2):
            tight.y0 = min(tight.y1 - 1, pr.y1 + 2); notes.append("top trimmed off prose")
        elif pr.y0 >= tight.y0 + (tight.height / 2):
            tight.y1 = max(tight.y0 + 1, pr.y0 - 2); notes.append("bottom trimmed off prose")
        elif pr.x1 <= tight.x0 + (tight.width / 2):
            tight.x0 = min(tight.x1 - 1, pr.x1 + 2); notes.append("left trimmed off prose")
        else:
            tight.x1 = max(tight.x0 + 1, pr.x0 - 2); notes.append("right trimmed off prose")

    out = [round(tight.x0 / W, 4), round(tight.y0 / H, 4), round(tight.x1 / W, 4), round(tight.y1 / H, 4)]
    moved = [round(a - b, 4) for a, b in zip(out, [x0, y0, x1, y1])]
    print(json.dumps({"bbox": out, "moved": moved, "note": "; ".join(sorted(set(notes))) or "ink-bounded"}))


if __name__ == "__main__":
    main()
