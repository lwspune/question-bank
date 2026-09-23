"""
Derive a figure catalogue for a Balbharati Maths chapter from the PDF itself.

  python scripts/mh-ssc-10-text/derive-figs.py <pdf> <page0> <page1> <out.json>
      (pages are 0-based, inclusive-exclusive, matching config.ts `pages`)

WHY THIS EXISTS RATHER THAN EYEBALLED BBOXES. The four figure-bearing Maths
chapters of this book carry ~125 figures between them. The pipeline's other
chapters were hand-anchored off rendered PNGs, and the project has already paid
for that twice: hand/agent-eyeballed boxes clipped figures and leaked solution
text (see snap-crop.ts's header), and on the NCERT Class-10 run geometry was
confident and 6 of 22 crops were visibly wrong.

This book gives a better handle than eyeballing. It is BORN-DIGITAL:
  • every figure is VECTOR-drawn, so `get_drawings()` returns its actual paths;
  • every figure carries a printed "Fig. N.M" caption that is REAL TEXT, and the
    question stems name that same number ("In figure 3.37, ...").
So the figure's extent is measured, and the question->figure mapping is read off
the page rather than inferred from position. Nothing here is eyeballed.

WHAT IT STILL DOES NOT PROVE. Geometry finding a box is not the box being right.
The crops must be reviewed on a contact sheet before anything is attached — see
[[figure-snapcrop-verify]].

THE THREE THINGS THAT MAKE IT CORRECT RATHER THAN MERELY AUTOMATIC:

1. THE CAPTION IS NOT RELIABLY BELOW ITS FIGURE. The first version of this script
   assumed it was, and lost Fig. 3.77/3.78/3.79 on one page of Circle alone:
   Balbharati sets a caption beside a figure about as often as under it (3.77's
   sits to the RIGHT of the diagram, 3.78's level with its middle). So figures
   are CLUSTERED first and captions assigned to the nearest cluster — no
   directional assumption at all.

2. A figure's LABELS ARE TEXT, not drawings. Vertex letters, measures and angle
   marks are real text spans, so a union of vector paths alone clips them off the
   edges. The union is grown to absorb nearby text.

3. PROSE MUST NOT BE ABSORBED, and neither a distance rule nor a "short line"
   rule is enough on its own. Both were tried and both leaked, visibly, on the
   first contact sheet:
     • ITERATING the absorption walks the box up the page. Each absorbed line
       moves the edge, the next line up is then within reach of the NEW edge, and
       the box climbs. Ex 3.5 Q.1's box ended up containing the "Practice set 3.5"
       header and the whole of question 2 — a student would have been shown a
       different question's figure and text. Absorption is therefore SINGLE-PASS,
       measured against the original vector union.
     • SHORTNESS alone does not separate a vertex label from prose, because
       maths prose is full of short lines: "(1) /_AOB    (2)/_ACB" and "= 36" and
       ".'. PS = 6" are all shorter than a caption. So the box is additionally
       CLAMPED to the vector union plus MAX_GROW. A label sits against the ink it
       labels; anything further out is not part of the drawing, whatever it says.
   The clamp is the load-bearing one. It is a statement about where labels can
   physically be, not a guess about what text means.
"""
import json
import sys
import re

import fitz

CAPTION = re.compile(r"^Fig\.?$", re.I)
NUMBER = re.compile(r"^(\d+\.\d+)$")

# Page furniture, all measured on this book:
FULL_WIDTH = 0.75   # a path spanning most of the width is a rule or border
HEADER_Y = 0.055    # running head
FOOTER_Y = 0.895    # the decorative box-strip along the bottom of every page
MIN_AREA = 6.0

# Two paths belong to the same figure if their rects are within this of each
# other. Wide enough to join a triangle to its right-angle tick, tight enough to
# keep two figures stacked in one column apart.
JOIN = 14.0
# A caption must be this close to its cluster to be assigned to it.
CAPTION_REACH = 46.0
# Figure labels are a handful of characters; a line of prose is not.
LINE_MAX_CHARS = 26
LABEL_PAD = 13.0
# How far outside the VECTOR UNION the final box may ever reach. A vertex label
# sits against the ink it labels; 20pt is roughly one line of body text, so prose
# a line away cannot be pulled in however short it is.
MAX_GROW = 20.0


def captions(page):
    """[(fignum, rect)] for every 'Fig. N.M' printed on the page, de-duplicated:
    the book overprints a caption in places, which would otherwise read as two
    different figures sharing a number."""
    words = page.get_text("words")
    out = []
    for i, w in enumerate(words):
        if not CAPTION.match(w[4]):
            continue
        for j in (i + 1, i + 2):
            if j < len(words) and NUMBER.match(words[j][4]):
                out.append((words[j][4], fitz.Rect(w[:4]) | fitz.Rect(words[j][:4])))
                break
    deduped = []
    for fignum, r in out:
        if any(f == fignum and abs(q.y0 - r.y0) < 4 and abs(q.x0 - r.x0) < 4 for f, q in deduped):
            continue
        deduped.append((fignum, r))
    return deduped


def short_lines(page):
    """Text lines short enough to be figure labels rather than prose."""
    out = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(s["text"] for s in line["spans"]).strip()
            if 0 < len(text) <= LINE_MAX_CHARS:
                out.append(fitz.Rect(line["bbox"]))
    return out


def prose_lines(page):
    """Text lines too long to be a figure label — see the cluster filter."""
    out = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(sp["text"] for sp in line["spans"]).strip()
            if len(text) > LINE_MAX_CHARS:
                out.append(fitz.Rect(line["bbox"]))
    return out


def column_edges(page):
    """The left edges shared by four or more text lines on the page.

    This is how body text is told from a figure callout, and it measures the page
    rather than assuming anything about it. Balbharati wraps a paragraph down the
    side of a floated figure; every one of those wrapped lines is SHORT ("A metal
    sphere of", "immersed in it. Find"), so length cannot separate them from
    "42 cm", and they sit a few points away, so distance cannot either. What they
    do is line up: seven of them begin at exactly x=324. A callout does not belong
    to a column, so its left edge is its own.

    An earlier version took the single leftmost long line as "the margin". That is
    wrong on a TWO-COLUMN page — it measured the left column's edge (x=42) and so
    never recognised the right column (x=324), which was the one wrapping around
    the figure."""
    counts = {}
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            if not "".join(sp["text"] for sp in line["spans"]).strip():
                continue
            counts[round(line["bbox"][0] / 2) * 2] = counts.get(round(line["bbox"][0] / 2) * 2, 0) + 1
    return {x for x, n in counts.items() if n >= 4}


def cluster(rects):
    """Greedy proximity clustering — no directional assumption."""
    clusters = []
    for r in sorted(rects, key=lambda r: (r.y0, r.x0)):
        grown = fitz.Rect(r.x0 - JOIN, r.y0 - JOIN, r.x1 + JOIN, r.y1 + JOIN)
        hit = [c for c in clusters if c.intersects(grown)]
        if not hit:
            clusters.append(fitz.Rect(r))
            continue
        merged = fitz.Rect(r)
        for c in hit:
            merged |= c
            clusters.remove(c)
        clusters.append(merged)
    return clusters


def gap(a, b):
    """Rect-to-rect distance (0 when they touch or overlap)."""
    dx = max(a.x0 - b.x1, b.x0 - a.x1, 0)
    dy = max(a.y0 - b.y1, b.y0 - a.y1, 0)
    return (dx * dx + dy * dy) ** 0.5


def main():
    pdf, p0, p1, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
    doc = fitz.open(pdf)
    cat, problems = [], []
    for p in range(p0, p1):
        page = doc[p]
        W, H = page.rect.width, page.rect.height
        # INK IS INK, VECTOR OR RASTER. Circle and Similarity draw every figure as
        # vector paths, so `get_drawings()` alone found them. Mensuration does not:
        # its 3-D solids (cones, spheres, frustums) are EMBEDDED RASTERS, and on a
        # vector-only read 22 of its 48 captions resolved to nothing at all. The
        # chapter that most needs its pictures is the one where the first method
        # was blindest — so image placements are clustered alongside the paths,
        # under the same furniture filters.
        ink = [g["rect"] for g in page.get_drawings()]
        raster = []
        for im in page.get_images():
            for r in page.get_image_rects(im[0]):
                ink.append(r)
                raster.append(r)
        rects = [
            r
            for r in ink
            if (r.x1 - r.x0) < FULL_WIDTH * W
            and r.get_area() > MIN_AREA
            and r.y1 > HEADER_Y * H
            and r.y0 < FOOTER_Y * H
        ]
        clusters = cluster(rects)
        labels = short_lines(page)
        columns = column_edges(page)

        # A CLUSTER THAT CONTAINS PROSE IS A TEXT PANEL, NOT A DIAGRAM. Balbharati
        # draws its "ICT Tools or Links" box as a rounded rect, which clusters like
        # any figure and sat nearer to Fig. 3.103's caption than Fig. 3.103 did —
        # so the crop shipped as "use the geogebra to verify ..." with a corner of
        # the triangle. Same discriminator as the label rule, one level up: a
        # diagram's own text is all short.
        # BODY TEXT = anything too long to be a label, OR anything sitting on a
        # column edge. The second half matters as much as the first: a paragraph
        # wrapped down the side of a floated figure is made entirely of SHORT
        # lines, so a length test alone does not see it, and it is precisely that
        # text which ends up shaved into the crop.
        prose = [r for r in prose_lines(page)] + [
            fitz.Rect(line["bbox"])
            for block in page.get_text("dict")["blocks"]
            for line in block.get("lines", [])
            if "".join(sp["text"] for sp in line["spans"]).strip()
            and any(abs(line["bbox"][0] - c) <= 2 for c in column_edges(page))
        ]
        clusters = [c for c in clusters if not any(c.intersects(pr) and abs((c & pr).get_area() - pr.get_area()) < 1 for pr in prose)]
        caps = captions(page)

        claimed = {}
        for fignum, cap in caps:
            near = sorted(((gap(cap, c), i) for i, c in enumerate(clusters)))
            if not near or near[0][0] > CAPTION_REACH:
                cat.append({"fig": fignum, "page": p, "bbox": None})
                problems.append(f"  NO CLUSTER   Fig. {fignum} p{p}")
                continue
            idx = near[0][1]
            claimed.setdefault(idx, []).append(fignum)
            union = fitz.Rect(clusters[idx])
            box = union | cap
            # A RASTER FIGURE NEEDS NO LABEL ABSORPTION — its labels are pixels,
            # not text. Mensuration's solids are embedded images with the body
            # prose WRAPPED DOWN THEIR SIDE, and that wrapped prose is narrow, so
            # every line of it reads as "short" and got absorbed: Fig. 7.11 pulled
            # in the next question's opening line, 7.13 and 7.15 a ragged column of
            # half-words. Absorption exists for vector diagrams whose vertex
            # letters are real text; applying it to a raster can only add things
            # the picture already contains or things that were never part of it.
            is_raster = any(r.intersects(union) and (r & union).get_area() > 0.5 * union.get_area() for r in raster)
            # A raster carries most of its labels as PIXELS, so it needs only a
            # tight reach for the few dimension callouts set as text beside it
            # ("42 cm", "14 mm"). Turning absorption off entirely for rasters was
            # tried and clipped those to "42" and "14 r"; the wide vector pad pulls
            # in the wrapped body prose. 7pt is the measured gutter between the
            # picture and its callouts, well inside the text column's own margin.
            pad = 7.0 if is_raster else LABEL_PAD
            # SINGLE pass, probed against the ORIGINAL box — see note 3 above.
            probe = fitz.Rect(box.x0 - pad, box.y0 - pad, box.x1 + pad, box.y1 + pad)
            for lr in labels:
                if not lr.intersects(probe):
                    continue
                # Body text belongs to a COLUMN; a callout does not. See column_edges.
                if any(abs(lr.x0 - c) <= 2 for c in columns):
                    continue
                box |= lr
            # ... then clamped to the drawing's own extent (plus its caption).
            limit = fitz.Rect(
                min(union.x0, cap.x0) - MAX_GROW,
                min(union.y0, cap.y0) - MAX_GROW,
                max(union.x1, cap.x1) + MAX_GROW,
                max(union.y1, cap.y1) + MAX_GROW,
            )
            box &= limit

            # FINAL TRIM: NO LINE OF PROSE MAY REMAIN INSIDE THE CROP.
            # Everything above reasons about what to ADD. This asks the opposite
            # question of the finished rectangle, and it is the only step that
            # catches the failure the others cannot even see: a box is widened to
            # hold its CAPTION, which is set wider than a narrow figure, and body
            # text at some other height then falls inside that new width. Fig.
            # 7.15's crop carried a ragged column of half-words down its left edge
            # for exactly that reason, with every earlier rule behaving correctly.
            # A bbox is a rectangle, so "include the caption" and "exclude the
            # prose beside it" can genuinely conflict; when they do, the figure
            # wins and the caption is clipped. The trim never cuts into the ink.
            for pr in prose:
                if not box.intersects(pr):
                    continue
                if pr.x1 <= union.x0 and pr.x1 + 2 <= union.x0:
                    box.x0 = max(box.x0, pr.x1 + 2)
                elif pr.x0 >= union.x1 and pr.x0 - 2 >= union.x1:
                    box.x1 = min(box.x1, pr.x0 - 2)
                elif pr.y1 <= union.y0:
                    box.y0 = max(box.y0, pr.y1 + 2)
                elif pr.y0 >= max(union.y1, cap.y1):
                    box.y1 = min(box.y1, pr.y0 - 2)
            # THE TRIM TRIES; THIS DECIDES. A bbox is a rectangle and a page is
            # not, so there are layouts where no rectangle holds the figure and
            # excludes the text around it — Fig. 7.11 spans the full column width
            # with the next question's opening line directly beneath its caption.
            # Chasing each such layout with another heuristic is how a crop ends
            # up subtly wrong instead of absent, so the script REFUSES instead:
            # a box that still contains body text is reported as underivable and
            # goes to the hand-anchor list, exactly like a caption with no cluster.
            # A question left without its figure is a known gap; a question shown
            # a crop containing someone else's question is a defect nobody sees.
            leaked = [pr for pr in prose if box.intersects(pr) and (box & pr).get_area() > 0.2 * pr.get_area()]
            if leaked:
                cat.append({"fig": fignum, "page": p, "bbox": None})
                problems.append(f"  LEAKS TEXT   Fig. {fignum} p{p} — no clean rectangle; hand-anchor")
                continue
            cat.append(
                {
                    "fig": fignum,
                    "page": p,
                    "bbox": [round(box.x0 / W, 4), round(box.y0 / H, 4), round(box.x1 / W, 4), round(box.y1 / H, 4)],
                }
            )
        # Two captions on one cluster means two figures were merged into one box.
        # Reported LOUD rather than silently shipped: the crop would show both,
        # and a student reading question A would be looking at figure B as well.
        for idx, figs in claimed.items():
            if len(figs) > 1:
                problems.append(f"  MERGED       p{p} one cluster claimed by Fig. {', '.join(figs)}")

    with open(out, "w", encoding="utf-8") as f:
        json.dump(cat, f, indent=2)
    ok = [c for c in cat if c.get("bbox")]
    print(f"{len(cat)} captions -> {len(ok)} boxes  ({out})")
    for line in problems:
        print(line)
    seen = {}
    for c in cat:
        seen.setdefault(c["fig"], []).append(c["page"])
    for fig, pages in sorted(seen.items()):
        if len(pages) > 1:
            print(f"  DUPLICATE    Fig. {fig} on pages {pages} — mapping must disambiguate")


if __name__ == "__main__":
    main()
