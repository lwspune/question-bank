"""Derive figure bboxes for the five NDA GAT Mock 3 figures, from the PDF itself.

WHY NOT INFER. These worksheets are born-digital and every one of the five
figures is an EMBEDDED IMAGE whose exact rect the PDF already carries. Earlier
attempts inferred the crop from text geometry — column detection plus whitespace
gap-walking — and each inference had its own failure:

  - a full-width band captured the NEIGHBOURING COLUMN (a neighbouring
    question's options and the next question's stem),
  - a gutter split on line-START positions put the boundary mid-indent, so
    left-column lines extended past it and leaked into a "right column" crop,
  - "first option below the stem" matched an option in the OTHER column,
    putting the leak ceiling in the wrong place entirely,
  - a whitespace gap-walk cut through bio Q2's x-axis label, because a narrow
    label spans too little of a wide band to reach snapCrop's ROW_MIN, and
  - the largest-gap rule stopped at bio Q4's post-figure stem text.

The image rect has none of that: it is the figure, stated by the source.

The text layer is still used for ONE thing — `answerY`, the y at which this
question's options begin, in the same column. That is snapCrop's leak ceiling
and the single value the shipped crops got wrong (three captured an option).
Here it is an ASSERTION rather than an anchor: a figure rect that reaches below
its own options means the layout is not what we think, and the figure is
refused rather than cropped.
"""
import json

import fitz

ROOT = r"C:\tmp\Practice\Foundation"

FIGS = [
    {"key": "bio_q4", "id": "0b3e8aa2-9663-4a3b-9ddf-1b8328c7988d",
     "pdf": ROOT + r"\_converted\bio-reproduce-1.pdf",
     "stem": "monthly changes in the human ovary"},
    {"key": "chem_q23", "id": "0d052c3a-14eb-4808-a477-4639cf02be8d",
     "pdf": ROOT + r"\_converted\metals-2.pdf",
     "stem": "The gas evolved is collected by the method"},
    {"key": "sound_q19", "id": "07e18fec-d0b6-432f-b1b0-82c68d86c84c",
     "pdf": ROOT + r"\_converted\sound-2.pdf",
     "stem": "The given image shows the phenomena of"},
    {"key": "bio_q2", "id": "1a2ddd90-43ba-43a4-b96e-24db45ea1a75",
     "pdf": ROOT + r"\_converted\bio-cell-1.pdf",
     # The stored stem was lightly normalised ("of the vacuole"); the PDF reads
     # "of vacuole". Anchor on a phrase that survives both.
     "stem": "gives the correct explanation of the data"},
    {"key": "prism_q56", "id": "2bd03c78-d7f4-4001-84fe-7e788a144f9a",
     "pdf": ROOT + r"\Physics\07. The_Human_Eye\Human Eye and Colourful World WS.pdf",
     "stem": "angle of deviation"},
]

PAD = 0.004  # a little whitespace so the figure does not sit flush to the edge


def lines_of(page):
    out = []
    for blk in page.get_text("dict")["blocks"]:
        for line in blk.get("lines", []):
            txt = "".join(s["text"] for s in line["spans"]).strip()
            if txt:
                out.append((txt, line["bbox"]))
    return out


def main():
    out = []
    for f in FIGS:
        doc = fitz.open(f["pdf"])
        page = rect = None
        pi = -1
        for i in range(doc.page_count):
            hits = doc[i].search_for(f["stem"])
            if hits:
                pi, rect, page = i, hits[0], doc[i]
                break
        if page is None:
            out.append({"key": f["key"], "error": "stem not found"})
            continue

        H, W = page.rect.height, page.rect.width
        mid = W / 2
        stem_left = (rect.x0 + rect.x1) / 2 < mid  # which column the stem sits in

        # answerY — first option line BELOW the stem IN THE SAME COLUMN.
        answer_y = None
        for txt, bb in lines_of(page):
            if (((bb[0] + bb[2]) / 2 < mid) != stem_left) or bb[1] <= rect.y1:
                continue
            if txt[:2].lower() in ("a)", "a."):
                if answer_y is None or bb[1] < answer_y:
                    answer_y = bb[1]

        # The figure: the image in this column, below the stem, nearest to it.
        best = None
        for im in page.get_images(full=True):
            try:
                b = page.get_image_bbox(im)
            except Exception:
                continue
            if ((b.x0 + b.x1) / 2 < mid) != stem_left:
                continue
            if b.y0 < rect.y1 - 2:
                continue
            if answer_y is not None and b.y0 >= answer_y:
                continue
            if best is None or b.y0 < best.y0:
                best = b
        if best is None:
            out.append({"key": f["key"], "page1": pi + 1, "error": "no image between stem and options in column"})
            continue

        # THE PAD MUST NOT REACH ANY NEIGHBOURING TEXT LINE, above or below.
        # These figures sit tight against their stem and options — one ends
        # 0.05pt above its options — so an unclamped 3pt pad is by itself enough
        # to pull a line of stem into the crop (bio Q4 took a sliver at BOTH
        # edges) or to cross the leak ceiling. Clamp to the nearest in-column
        # text line on each side, and to answerY as the hard floor.
        above = [bb[3] for _, bb in lines_of(page)
                 if (((bb[0] + bb[2]) / 2 < mid) == stem_left) and bb[3] <= best.y0 + 1]
        below = [bb[1] for _, bb in lines_of(page)
                 if (((bb[0] + bb[2]) / 2 < mid) == stem_left) and bb[1] >= best.y1 - 1]
        top_limit = (max(above) + 1) / H if above else 0.0
        bot_limit = (min(below) - 1) / H if below else 1.0
        if answer_y is not None:
            bot_limit = min(bot_limit, answer_y / H - 0.0015)

        bbox = [
            round(max(0.0, best.x0 / W - PAD), 4),
            round(max(top_limit, best.y0 / H - PAD), 4),
            round(min(1.0, best.x1 / W + PAD), 4),
            round(min(bot_limit, best.y1 / H + PAD), 4),
        ]
        rec = {
            "key": f["key"], "id": f["id"], "pdf": f["pdf"], "page1": pi + 1,
            "bbox": bbox,
            "answerY": round(answer_y / H, 4) if answer_y else None,
            "column": "left" if stem_left else "right",
        }
        # LEAK ASSERTION: the crop must end strictly above this question's options.
        rec["ok"] = answer_y is None or bbox[3] < answer_y / H
        if not rec["ok"]:
            rec["error"] = "figure rect reaches below its own options — refusing"
        out.append(rec)

    print(json.dumps(out, indent=1))


if __name__ == "__main__":
    main()
