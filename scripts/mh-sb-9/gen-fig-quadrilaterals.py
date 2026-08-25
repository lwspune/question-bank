"""Generate quadrilaterals-9.fig.json from MEASURED ink bounds.

attach-images.ts wants FRACTIONAL bboxes, but the trustworthy input is measured
ink extents, not eyeballed fractions -- eyeballing a downscaled render is how
earlier chapters in this pipeline shipped clipped crops (Geography clipped a point
label and a caption; Parallel Lines caught a pink banner). So the measurement is
done here, from the PDF's own geometry, and the fractions are derived.

Method, per page:
  1. Find every "Fig. 5.NN" caption. The captions are the SEPARATORS: a figure's
     ink always lies above its own caption and below the previous one, so an item
     belongs to the first caption whose bottom is at or below the item's bottom.
     This replaces hand-set y-windows, which got both edges wrong in turn -- an
     overlap test pulled Fig. 5.40's apex label into Fig. 5.39, and tightening it
     to containment then dropped the top vertex labels of five figures, because a
     label straddling the window edge is in neither figure.
  2. Collect drawing rects AND TEXT SPANS. Text matters: the vertex labels
     (A, B, C, P, Q, ...) are text, not drawing, so a drawing-only bound clips
     exactly the labels the question depends on.
  3. Drop FULL-WIDTH items. The pink footer band and the section banners are
     furniture, and Practice set 5.2's Q2 is a single line of question text
     running the whole width of the page -- left in, it makes the column gutter
     undetectable.
  4. Split at the COLUMN GUTTER (the widest horizontal gap) and keep the right
     side. Every one of these figures sits in the right-hand column with its
     question text on the left.
  5. Pad symmetrically, but CLAMP against the vertical neighbour and against page
     furniture: Fig. 5.23's caption and Fig. 5.24's topmost dashed arrow are 13px
     apart, so a full pad would pull the text "5.23" into 5.24's crop -- a visible
     WRONG figure number, worse than a tight edge.
  6. Assert the caption survived (each stem cites its figure BY NUMBER, so a
     cropped caption breaks the reference) and that no two crops on a page
     overlap vertically.

Run from the repo root:
  python scripts/mh-sb-9/gen-fig-quadrilaterals.py "<path to 9th_Maths_Part2_SB.pdf>"

Lives OUTSIDE data/ deliberately: .gitignore excludes `scripts/*/data/_*`, so a
generator parked beside its output would be untracked and the measured bounds --
the only record of WHY each bbox is what it is -- would be lost.
"""
import fitz
import json
import os
import re
import sys

SCALE = 3.0                # render scale the pixel numbers are expressed in
PAD = 14                   # px, symmetric before clamping
MIN_GUTTER = 60            # px; below this it is word spacing, not a column break
FULL_WIDTH = 0.55          # fraction of page width above which an item is not a figure

CAPTION_RE = re.compile(r"^Fig\s*\.?\s*(5\.\d+)\s*$")

PDF_DEFAULT = (
    r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\State-Board"
    r"\01. 9th\9th_Maths_Part2_SB.pdf"
)

# Which figures to EMIT, and the question rows that read each one. Every other
# caption on these pages still acts as a separator but produces no crop:
# Fig. 5.11 belongs to a solved example, and Fig. 5.33 / 5.34 illustrate the
# midpoint-theorem proof rather than any question.
#
# The y-window is for GUTTER DETECTION ONLY and must be confined to the rows
# where that figure's own question sits. It cannot simply be the caption band:
# on p71 the band from Fig. 5.11 to Fig. 5.12 also covers Practice set 5.1's
# questions 1-5, whose text runs the FULL width of the page (only Q6 and Q7 are
# narrow, because only they have a figure beside them), so there is no gutter to
# find. Windows are otherwise generous -- caption-band ownership, not the window,
# decides what each crop finally contains.
WANTED = {
    #  fig      page  window y0, y1   refs
    "5.12": (71, 1640, 1945, ["Ex 5.1 Q6"]),
    "5.13": (71, 1960, 2275, ["Ex 5.1 Q7"]),
    "5.22": (76,  270,  600, ["Ex 5.2 Q1"]),
    # 655, not 640: Practice set 5.2's Q2 has no figure and is a single line of
    # text spanning the whole page, ending at y 649. Inside the window it bridges
    # the two columns and the gutter disappears.
    "5.23": (76,  655, 1013, ["Ex 5.2 Q3"]),
    "5.24": (76, 1010, 1399, ["Ex 5.2 Q4"]),
    "5.25": (76, 1420, 1714, ["Ex 5.2 Q5"]),
    "5.32": (80,  520,  845, ["Ex 5.4 Q3"]),
    "5.38": (82,  740, 1050, ["Ex 5.5 Q1"]),
    "5.39": (82, 1040, 1360, ["Ex 5.5 Q2"]),
    "5.40": (82, 1290, 1680, ["Ex 5.5 Q3"]),
    "5.41": (82, 1660, 1955, ["Ex 5.5 Q4"]),
    "5.42": (83, 1090, 1395, ["Prob Q7"]),
    "5.43": (83, 1520, 1785, ["Prob Q8*"]),
    "5.44": (83, 1960, 2235, ["Prob Q9"]),
}
PAGES = [71, 76, 80, 82, 83]


def px(v):
    return int(round(v * SCALE))


def page_ink(page):
    """(x0, y0, x1, y1, text) for every drawing rect and text span, in 3x px,
    split into figure-eligible items and full-width furniture obstacles."""
    W = page.rect.width
    items, obstacles = [], []
    for dr in page.get_drawings():
        r = dr["rect"]
        rec = (px(r.x0), px(r.y0), px(r.x1), px(r.y1), "<draw>")
        (obstacles if r.width > FULL_WIDTH * W else items).append(rec)
    for blk in page.get_text("dict")["blocks"]:
        for ln in blk.get("lines", []):
            for s in ln["spans"]:
                t = s["text"].strip()
                if not t:
                    continue
                x0, y0, x1, y1 = s["bbox"]
                rec = (px(x0), px(y0), px(x1), px(y1), t)
                (obstacles if (x1 - x0) > FULL_WIDTH * W else items).append(rec)

    # A banner ("Practice set 5.1", "Problem set 5") is a full-width pink DRAWING
    # with a short centred TEXT label inside it. The drawing is caught above; the
    # label is not, and it sits squarely in the gutter -- on p71 it spans
    # x 790..1075 while the question text ends at 915 and Fig. 5.12 starts at
    # 1041, so it bridges the two columns and the gutter vanishes. Anything lying
    # within a full-width drawing's own rows is furniture by construction.
    rows = [(o[1], o[3]) for o in obstacles]
    keep, extra = [], []
    for it in items:
        inside = any(it[1] < r1 and it[3] > r0 for r0, r1 in rows)
        (extra if inside else keep).append(it)
    return keep, obstacles + extra


def captions(page):
    """[(figure-number, y0, y1, x0, x1)] sorted top to bottom."""
    out = []
    for blk in page.get_text("dict")["blocks"]:
        for ln in blk.get("lines", []):
            txt = "".join(s["text"] for s in ln["spans"]).strip()
            m = CAPTION_RE.match(txt)
            if m:
                x0, y0, x1, y1 = ln["bbox"]
                out.append((m.group(1), px(y0), px(y1), px(x0), px(x1)))
    return sorted(out, key=lambda c: c[1])


def right_of_gutter(items):
    """Split at the widest horizontal gap; return the right-hand group + the gap."""
    items = sorted(items, key=lambda it: it[0])
    best_gap, best_i, running = 0, 0, None
    for i, it in enumerate(items):
        if running is not None and it[0] - running > best_gap:
            best_gap, best_i = it[0] - running, i
        running = it[2] if running is None else max(running, it[2])
    if best_gap < MIN_GUTTER:
        raise AssertionError(f"no column gutter found (widest gap {best_gap}px)")
    return items[best_i:], best_gap


def main():
    doc = fitz.open(sys.argv[1] if len(sys.argv) > 1 else PDF_DEFAULT)
    entries, bands, seen, page_h = [], [], set(), {}

    print(f"{'figure':<9}{'pg':>4} {'gutter':>7}  bbox (fractional)                      px w x h   pad y")
    for pno in PAGES:
        page = doc[pno]
        W, H = px(page.rect.width), px(page.rect.height)
        page_h[pno] = H
        items, obstacles = page_ink(page)
        caps = captions(page)
        assert caps, f"page {pno}: no Fig. captions found"

        # ---- pass 1: assign every item to the first caption at or below it,
        #      then measure that figure's tight ink bounds.
        tight = {}
        for num, cy0, cy1, cx0, cx1 in caps:
            prev = max((c[2] for c in caps if c[2] < cy0), default=-1)
            # A caption we do not emit (Fig. 5.11 belongs to a solved example;
            # 5.33/5.34 illustrate the midpoint-theorem proof) still has to act as
            # a separator and as a padding blocker, but its band may hold nothing
            # but the caption itself, which has no column gutter to find. Record
            # the caption's own rect and move on rather than failing on it.
            if num not in WANTED:
                obstacles.append((cx0, cy0, cx1, cy1, f"Fig. {num}"))
                continue
            _, wy0, wy1, _ = WANTED[num]
            # Collect by OVERLAP with the window (so a vertex label straddling the
            # window edge is still a candidate), then keep only what this caption
            # OWNS. Ownership is what stops Fig. 5.40's apex label 'A' being
            # counted into Fig. 5.39, which a plain overlap test did.
            window = [it for it in items if it[3] >= wy0 and it[1] <= wy1]
            try:
                right, gap = right_of_gutter(window)
            except AssertionError as exc:
                shown = sorted(window, key=lambda it: it[0])
                raise AssertionError(
                    f"page {pno} Fig. {num}: {exc}\n  items:\n    "
                    + "\n    ".join(
                        "x %5d..%5d y %5d..%5d %r" % (it[0], it[2], it[1], it[3], it[4])
                        for it in shown
                    )
                ) from None
            keep = [it for it in right if prev < it[3] <= cy1]
            assert keep, f"page {pno} Fig. {num}: nothing owned by this caption"
            tight[num] = [min(k[0] for k in keep), min(k[1] for k in keep),
                          max(k[2] for k in keep), max(k[3] for k in keep), gap, cy0, cy1]
            assert tight[num][1] <= cy0 and tight[num][3] >= cy1, \
                f"page {pno} Fig. {num}: caption not inside the kept region"

        # ---- pass 2: pad, clamped against neighbours and page furniture.
        for num, (x0, y0, x1, y1, gap, cy0, cy1) in sorted(tight.items(), key=lambda kv: kv[1][1]):
            others = [v for k, v in tight.items() if k != num]
            blockers_up = [v[3] for v in others if v[3] <= y0] + \
                          [o[3] for o in obstacles if o[3] <= y0]
            blockers_dn = [v[1] for v in others if v[1] >= y1] + \
                          [o[1] for o in obstacles if o[1] >= y1]
            room_up = y0 - max(blockers_up, default=0)
            room_dn = min(blockers_dn, default=H) - y1
            pad_up = min(PAD, max(0, room_up // 2))
            pad_dn = min(PAD, max(0, room_dn // 2))

            bx0, by0 = max(0, x0 - PAD), max(0, y0 - pad_up)
            bx1, by1 = min(W, x1 + PAD), min(H, y1 + pad_dn)

            # HARD floor: a crop must never contain ANOTHER figure's caption, which
            # would show the reader a wrong figure number. On p82 Fig. 5.41's apex
            # label 'P' begins 6px ABOVE Fig. 5.40's caption bottom and shares its
            # x-range, so the two genuinely interleave and no padding rule can
            # separate them -- the top of that one letter is sacrificed instead.
            above_cap = [c[2] for c in caps if c[2] < cy0]
            if above_cap and by0 <= max(above_cap):
                floor = max(above_cap) + 1
                if floor > y0:
                    print(f"         clip: Fig {num} top raised {by0}->{floor} "
                          f"({floor - y0}px of ink) to clear Fig. "
                          f"{[c[0] for c in caps if c[2] == max(above_cap)][0]}'s caption")
                by0 = floor
            bands.append((pno, by0, by1, num))
            if num not in WANTED:
                continue
            seen.add(num)
            bbox = [round(bx0 / W, 4), round(by0 / H, 4), round(bx1 / W, 4), round(by1 / H, 4)]
            print(f"Fig {num:<5}{pno:>4} {gap:>5}px  {str(bbox):<38} {bx1-bx0:>4}x{by1-by0:<4} "
                  f"-{pad_up}/+{pad_dn}  {len(WANTED[num][3])} ref(s)")
            for ref in WANTED[num][3]:
                entries.append({"ref": ref, "page": pno, "bbox": bbox, "_figure": f"Fig. {num}"})

    missing = set(WANTED) - seen
    assert not missing, f"figures never measured: {sorted(missing)}"

    # Where two bands still meet, give the ground to the LOWER one: its top edge
    # was set by the hard caption floor above and is not negotiable, whereas the
    # upper band's bottom is only padding past its own caption. Then assert.
    by_page = {}
    for i, (pno, y0, y1, num) in enumerate(bands):
        by_page.setdefault(pno, []).append(i)
    for pno, idxs in by_page.items():
        idxs.sort(key=lambda i: bands[i][1])
        for a, b in zip(idxs, idxs[1:]):
            if bands[a][2] > bands[b][1]:
                lost = bands[a][2] - bands[b][1]
                print(f"         trim: Fig {bands[a][3]} bottom {bands[a][2]}->{bands[b][1]} "
                      f"({lost}px of padding) to clear Fig. {bands[b][3]}")
                bands[a] = (bands[a][0], bands[a][1], bands[b][1], bands[a][3])
                for e in entries:
                    if e["page"] == pno and e["_figure"] == f"Fig. {bands[a][3]}":
                        e["bbox"][3] = round(bands[b][1] / page_h[pno], 4)

    for pno in sorted({b[0] for b in bands}):
        on_page = sorted(b for b in bands if b[0] == pno)
        for (_, a0, a1, an), (_, b0, b1, bn) in zip(on_page, on_page[1:]):
            assert a1 <= b0, f"OVERLAP on page {pno}: Fig. {an} ends {a1}, Fig. {bn} starts {b0}"
        print(f"page {pno}: {len(on_page)} figure band(s), no vertical overlap")

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "data", "quadrilaterals-9.fig.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(entries, fh, indent=1)
        fh.write("\n")
    print(f"\nwrote {len(entries)} entries ({len(WANTED)} distinct figures) -> {os.path.basename(out)}")


if __name__ == "__main__":
    main()
