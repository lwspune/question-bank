"""
Crop each REQUIRED figure out of its paper, and let the CROPS decide whether a
content_hash group is one reprinted question or two colliding ones.

    npx tsx scripts/cbse-12-pyq/figure-groups.ts --write   # first: the work list
    python scripts/cbse-12-pyq/extract_figures.py          # plan, writes nothing
    python scripts/cbse-12-pyq/extract_figures.py --crop   # write out/figures/*

WHY CROP RATHER THAN EXTRACT THE EMBEDDED IMAGE
The producer SLICES a figure into horizontal strips — the same Venn diagram is 3
strips of 55pt in one file and 7 of 24.5pt in another — so `extract_image` hands
back a fragment, never the figure. Strips are therefore unioned (see regions.py)
and the RENDERED page is cropped over the union. Cropping also picks up any
vector or text drawn on top of the raster, which extraction would drop.

WHAT THE PAGE INDEX IS WORTH
`_figure` notes record a page, and it is ADVISORY. Two are provably wrong: the
2026-65-3-2 ladder figure sits on p22 and the note says p23 (the page the
sub-part is printed on), and a 2026-65-5-3 note says p22 for a figure on p18. So
the note is a starting point and the crop is verified, never the other way round.

REFUSALS
Nothing here guesses. A page with no region, or with more than one, is reported
and left for a human — a wrong figure on a question is worse than no figure.
"""

import argparse
import collections
import io
import itertools
import json
import os
import re
import sys
import warnings

import fitz
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regions import merge, big  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
OUT = os.path.join(HERE, "out", "figures")
_INDEX = None


def paper_index():
    """{paperId: row} across every data/_papers.<subject>.json (papers.ts --emit-index).

    One run's group list spans every subject and both classes, because a
    content_hash group is a question and questions do not know about subjects.
    So paths come from the TS discovery's index, the tested matcher, and never
    from a filename search here. That search matched a code as a SUBSTRING, and
    Class 10 broke it: "30-1-1" is inside "430-1-1_Mathematics Basic.pdf", and
    the 2026 Standard folder ships both, so the crop could have been taken from
    a Basic paper (prep.py's load_index retired the same second matcher).
    """
    global _INDEX
    if _INDEX is None:
        _INDEX = {}
        for fn in sorted(os.listdir(DATA)):
            if fn.startswith("_papers.") and fn.endswith(".json"):
                with open(os.path.join(DATA, fn), encoding="utf-8") as fh:
                    for row in json.load(fh):
                        _INDEX[row["paperId"]] = row
    return _INDEX


# Papers whose /Indexed images MuPDF misrenders, and their in-memory repair,
# live in indexed_repair.py so prep.py's transcription pages get the same fix.
from indexed_repair import REPAIR_INDEXED, repair_indexed  # noqa: E402


REPRINT_MAX = 8      # measured: worst genuine reprint 8, known collision 42
COLLISION_SURE = 20  # above this it is certainly a different figure

DPI = 200            # figures carry axis labels and corner coordinates
PAD = 6.0            # pt of whitespace around the union, so a label at the very
                     # edge of the raster (the Venn's "S") is not shaved off
MAX_BYTES = 1_000_000  # Supabase storage object cap


warnings.filterwarnings("ignore", category=DeprecationWarning)


def dhash(im, h=12, w=13):
    """MUST stay byte-identical to dedup_index.py / plan_paper.py: the same
    figure hashed two different ways would compare as two figures."""
    im = im.convert("L").resize((w, h), Image.LANCZOS)
    px = list(im.getdata())
    bits = 0
    for r in range(h):
        for c in range(w - 1):
            bits = (bits << 1) | (px[r * w + c] < px[r * w + c + 1])
    return bits


def hamming(a, b):
    return bin(a ^ b).count("1")


def find_pdf(year, code, kind="qp"):
    """The paper's question-paper or marking-scheme path, from the index; None if absent."""
    row = paper_index().get(f"{year}-{code.replace('/', '-')}")
    return row.get(kind) if row else None


def ms_page_range(year, code):
    """The (from, to) 0-based inclusive pages of this paper's block in a shared scheme, or None."""
    row = paper_index().get(f"{year}-{code.replace('/', '-')}")
    pages = row.get("msPages") if row else None
    return (pages["from"], pages["to"]) if pages else None


# The marking scheme lays each question out as a table row: a number in a narrow
# left column, the worked solution (figures included) beside it.
MS_NUMCELL = re.compile(r"^(?:Q\.?\s*)?(\d{1,2})\s*[.)]?\s*(?:\(|$)")
MS_NUM_X_MAX = 120.0   # the "Q.No." column; a bare number elsewhere is not a label
MS_ROW_EPS = 8.0       # see below


def ms_figures_by_question(doc):
    """{question number: [(page index, rect)]} for every figure in a scheme.

    MS_ROW_EPS is load-bearing and was measured. A label and the figure beside it
    are one TABLE ROW, and the figure's top can sit slightly ABOVE the label's —
    in 2024's 65/2/1 the "37." cell starts at y=295.6 and its figure at y=295.0.
    Sorting on y alone therefore hands the figure to question 36, silently, and
    that is what happened on the first run: three of the five figures wanted here
    came out attributed to the PREVIOUS question. Letting a label claim anything
    starting within 8pt above it fixed all five at once.
    """
    out, current, highest = {}, None, 0
    for i, page in enumerate(doc):
        items = []
        for b in page.get_text("blocks"):
            t = " ".join(b[4].split()).strip()
            m = MS_NUMCELL.match(t)
            # Non-decreasing, like plan_paper.py: footers and stray cells parse as
            # small integers and would otherwise re-open an early question.
            if m and b[0] < MS_NUM_X_MAX and int(m.group(1)) >= highest:
                items.append((b[1] - MS_ROW_EPS, 0, "num", m.group(1)))
        raw = []
        for img in page.get_images(full=True):
            raw.extend(tuple(r) for r in page.get_image_rects(img[0]))
        for r in big(merge(raw)):
            items.append((r[1], 1, "img", r))
        items.sort(key=lambda z: (z[0], z[1]))
        for _, _, kind, val in items:
            if kind == "num":
                current, highest = val, max(highest, int(val))
            elif current is not None:
                out.setdefault(current, []).append((i, val))
    return out


def page_regions(page):
    raw = []
    for img in page.get_images(full=True):
        raw.extend(tuple(r) for r in page.get_image_rects(img[0]))
    return big(merge(raw))


def crop(page, rect, dpi=DPI, pad=PAD, pad_top=None):
    # pad_top overrides pad on the TOP edge alone. A caption sits one line above
    # the drawing, so the top is the one edge where "a bit more" is not safe --
    # 6pt too many pulls in the tail of the stem's last prose line. Callers that
    # have measured the gap pass it; everyone else passes None and gets pad.
    top = pad if pad_top is None else pad_top
    clip = fitz.Rect(rect[0] - pad, rect[1] - top, rect[2] + pad, rect[3] + pad)
    clip = clip & page.rect          # never ask for pixels outside the page
    pix = page.get_pixmap(dpi=dpi, clip=clip)
    return pix.tobytes("png")


def paint_mask(png, rect, boxes):
    """White out page-point boxes on an EXACT crop of `rect` (no padding)."""
    im = Image.open(io.BytesIO(png)).convert("RGB")
    sx = im.width / (rect[2] - rect[0])
    sy = im.height / (rect[3] - rect[1])
    d = ImageDraw.Draw(im)
    for b in boxes:
        d.rectangle([(b[0] - rect[0]) * sx, (b[1] - rect[1]) * sy,
                     (b[2] - rect[0]) * sx, (b[3] - rect[1]) * sy], fill="white")
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return buf.getvalue()


def shrink(png, cap=MAX_BYTES):
    """Step the resolution down until the object fits. Ported from the sibling
    pipelines, where a full-page colour figure rendered at 7.2 MB and the upload
    simply threw. These crops are small, so this normally does nothing."""
    if len(png) <= cap:
        return png, None
    im = Image.open(io.BytesIO(png))
    for scale in (0.8, 0.65, 0.5, 0.4):
        buf = io.BytesIO()
        im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))),
                  Image.LANCZOS).save(buf, "PNG", optimize=True)
        if buf.tell() <= cap:
            return buf.getvalue(), f"scaled to {scale:.2f}"
    buf = io.BytesIO()
    im.convert("RGB").save(buf, "JPEG", quality=82, optimize=True)
    return buf.getvalue(), "fell back to JPEG"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--crop", action="store_true", help="write the crops")
    ap.add_argument("--only", help="restrict to hash prefixes: one, a comma list, or @file (one per line)")
    args = ap.parse_args()

    path = os.path.join(DATA, "figure-groups.json")
    if not os.path.exists(path):
        sys.exit("run: npx tsx scripts/cbse-12-pyq/figure-groups.ts --write")
    groups = json.load(open(path, encoding="utf-8"))
    if args.only:
        if args.only.startswith("@"):
            prefixes = tuple(open(args.only[1:], encoding="utf-8").read().split())
        else:
            prefixes = tuple(p for p in args.only.split(",") if p)
        groups = [g for g in groups if g["hash"].startswith(prefixes)]

    if args.crop:
        os.makedirs(OUT, exist_ok=True)

    picks_path = os.path.join(DATA, "figure-picks.json")
    picks = json.load(open(picks_path, encoding="utf-8"))["picks"] if os.path.exists(picks_path) else {}
    used_picks = set()

    docs = {}
    manifest, problems, disagree = [], [], []

    def open_doc(pid):
        if pid not in docs:
            year, code = pid.split("-", 1)
            pdf = find_pdf(year, code)
            docs[pid] = fitz.open(pdf) if pdf else None
            if docs[pid] is not None and pid in REPAIR_INDEXED:
                repair_indexed(docs[pid])
        return docs[pid]

    ms_docs = {}

    def open_ms(pid):
        if pid not in ms_docs:
            year, code = pid.split("-", 1)
            pdf = find_pdf(year, code, kind="ms")
            ms_docs[pid] = (fitz.open(pdf), None) if pdf else (None, None)
            if ms_docs[pid][0] is not None:
                index = ms_figures_by_question(ms_docs[pid][0])
                # A shared scheme (Class 10 Science, Class 12 Physics) holds
                # several sets, and each numbers its questions from 1, so keep
                # only the hits inside THIS paper's block.
                rng = ms_page_range(year, code)
                if rng:
                    index = {q: [h for h in hits if rng[0] <= h[0] <= rng[1]] for q, hits in index.items()}
                ms_docs[pid] = (ms_docs[pid][0], index)
        return ms_docs[pid]

    for g in groups:
        # An adjudicated pick overrides the one-region rule for this group only.
        pick = picks.get(g["hash"])
        if pick:
            used_picks.add(g["hash"])
            src = pick.get("source", "qp")
            if src == "ms":
                doc, index = open_ms(pick["pid"])
                if doc is None:
                    problems.append(f"{g['hash'][:8]}: no marking scheme for {pick['pid']}")
                    continue
                # A scheme whose question label is not detected (2024 30/5/1 files
                # Q35's figure under Q32) can name the page and a rect in points
                # outright, like a qp rect pick, instead of looking up "q".
                if pick.get("mode") == "rect" and isinstance(pick.get("page"), int):
                    r = pick.get("rect")
                    if (not isinstance(r, (list, tuple)) or len(r) != 4 or pick["page"] >= len(doc)
                            or not (r[0] < r[2] and r[1] < r[3])):
                        problems.append(f"{g['hash'][:8]}: ms rect pick needs a valid page and rect [x0,y0,x1,y1]")
                        continue
                    page, pageno = doc[pick["page"]], pick["page"]
                    rect = tuple(float(v) for v in r)
                    label = f"{pick['pid']}:ms rect"
                    hits = [(pageno, rect)]
                else:
                    hits = index.get(pick["q"], [])
                if len(hits) != 1:
                    problems.append(f"{g['hash'][:8]}: scheme {pick['pid']} has {len(hits)} figures for Q{pick['q']}, need exactly 1")
                    continue
                if pick.get("mode") != "rect":
                    pageno, rect = hits[0]
                    page, label = doc[pageno], f"{pick['pid']}:ms Q{pick['q']}"
            else:
                doc = open_doc(pick["pid"])
                if doc is None or pick["page"] >= len(doc):
                    problems.append(f"{g['hash'][:8]}: pick names {pick['pid']} p{pick['page']}, which does not exist")
                    continue
                page, pageno = doc[pick["page"]], pick["page"]
                mode = pick.get("mode")
                stacked = None
                # A SCANNED paper has no separable figures to index. Its whole
                # page is one raster -- 2022-55-5-1 is 1654x2338 per page with
                # ZERO text characters -- so page_regions() returns exactly one
                # region covering everything, and `region` and `union` both
                # resolve to the full page. `band` cannot rescue that either: it
                # trims only vertically, and a figure sitting beside prose needs
                # a horizontal cut too.
                #
                # So `rect` names the crop outright, in PDF POINTS on that page,
                # and deliberately never consults page_regions -- there is
                # nothing there to consult. It is the only mode that is not
                # positional, which also makes it the only one a re-run cannot
                # silently shift.
                if mode == "rect":
                    r = pick.get("rect")
                    if (not isinstance(r, (list, tuple)) or len(r) != 4
                            or not all(isinstance(v, (int, float)) for v in r)):
                        problems.append(f"{g['hash'][:8]}: rect pick needs rect [x0,y0,x1,y1] in points")
                        continue
                    if not (r[0] < r[2] and r[1] < r[3]):
                        problems.append(f"{g['hash'][:8]}: rect {list(r)} is empty or inverted")
                        continue
                    pr = page.rect
                    if r[0] < 0 or r[1] < 0 or r[2] > pr.width or r[3] > pr.height:
                        problems.append(
                            f"{g['hash'][:8]}: rect {list(r)} falls outside the page "
                            f"({pr.width:.0f} x {pr.height:.0f} pt)")
                        continue
                    rect = tuple(float(v) for v in r)
                    label = f"{pick['pid']}:rect"
                elif mode == "region":
                    # The commonest refusal is "N regions (ambiguous - which one?)",
                    # and until now the picks file had no way to answer it: union
                    # would merge a neighbouring question's figure in. `index` is
                    # 1-BASED, matching the [N] labels the candidate sheets print.
                    #
                    # It is POSITIONAL, so it depends on page_regions() returning
                    # the same order -- deterministic today (merge+filter of the
                    # page's image rects) but it is an ordering, not an identity.
                    # Hence the bounds check below is an error, never a clamp: a
                    # silently shifted index would attach the wrong figure, which
                    # nothing downstream can detect.
                    rs = page_regions(page)
                    if not rs:
                        problems.append(f"{g['hash'][:8]}: pick names a page with no figure at all")
                        continue
                    i = pick.get("index")
                    if not isinstance(i, int) or not (1 <= i <= len(rs)):
                        problems.append(
                            f"{g['hash'][:8]}: pick index {i!r} outside 1..{len(rs)} on {pick['pid']} p{pick['page']}")
                        continue
                    rect = rs[i - 1]
                    label = f"{pick['pid']}:picked[{i}]"
                elif mode == "union":
                    rs = page_regions(page)
                    if not rs:
                        problems.append(f"{g['hash'][:8]}: pick names a page with no figure at all")
                        continue
                    rect = (min(r[0] for r in rs), min(r[1] for r in rs),
                            max(r[2] for r in rs), max(r[3] for r in rs))
                    label = f"{pick['pid']}:picked"
                elif mode == "stack":
                    # One question can depend on two drawings with its own prose
                    # printed between them. 2025 31/2/1 Q36(a): the circuit for
                    # part (i) and the field-and-electron drawing for part (iii).
                    # A single rect around both would carry the parts' text into
                    # the image, so each rect is cropped exactly (no pad) and the
                    # crops are stacked top to bottom, in the order listed.
                    rs = pick.get("rects")
                    if (not isinstance(rs, list) or len(rs) < 2 or not all(
                            isinstance(r, (list, tuple)) and len(r) == 4 and r[0] < r[2] and r[1] < r[3]
                            for r in rs)):
                        problems.append(f"{g['hash'][:8]}: stack pick needs rects [[x0,y0,x1,y1], ...] (two or more)")
                        continue
                    ims = [Image.open(io.BytesIO(crop(page, r, pad=0.0))).convert("RGB") for r in rs]
                    gap = 24
                    canvas = Image.new("RGB", (max(im.width for im in ims),
                                               sum(im.height for im in ims) + gap * (len(ims) - 1)), "white")
                    y = 0
                    for im in ims:
                        canvas.paste(im, (0, y))
                        y += im.height + gap
                    buf = io.BytesIO()
                    canvas.save(buf, "PNG", optimize=True)
                    stacked = buf.getvalue()
                    rect = (min(r[0] for r in rs), min(r[1] for r in rs),
                            max(r[2] for r in rs), max(r[3] for r in rs))
                    label = f"{pick['pid']}:stack"
                else:
                    problems.append(f"{g['hash'][:8]}: unknown pick mode {mode!r}")
                    continue
            # A band is a deliberate trim, so it must NOT be padded back out —
            # the first run re-added PAD and pulled the text line the band had
            # just removed straight back into the crop.
            band = pick.get("band")
            if band:
                h = rect[3] - rect[1]
                rect = (rect[0], rect[1] + band[0] * h, rect[2], rect[1] + band[1] * h)
            # A figure's CAPTION is page TEXT and page_regions() only reads image
            # rects, so a label printed above the drawing lies outside every
            # region and PAD does not reach it. 2025-55-4-1 p16 Q24 forced this:
            # the crop came out with "Coil 2" and "Coil 1" sliced through the
            # middle, and those two labels ARE the question -- all three
            # sub-parts ask about coil 1 versus coil 2. In POINTS, not a
            # fraction of the figure, because the gap to the caption is a
            # typographic distance that does not scale with the drawing. It
            # replaces PAD on the top edge rather than adding to it, so the
            # value can be measured off the page and used as measured.
            top = pick.get("padTop")
            if top:
                rect = (rect[0], max(0.0, rect[1] - top), rect[2], rect[3])
            # A `mask` whites out stem text that sits INSIDE the drawing's bounds
            # and cannot be cut by any rectangle. 2024 30/1/3 Q35 forced it: the
            # last words of the stem ("circle", "then :") print beside the circle,
            # directly above the "A" label the question turns on. Boxes are in
            # page points, so the crop must be exact (band) or the pixel offsets
            # would not match.
            mask = pick.get("mask")
            if mask and (stacked or not band or top):
                problems.append(f"{g['hash'][:8]}: mask needs an exact crop (band, no padTop, not stack)")
                continue
            if stacked:
                png, note = shrink(stacked)
            else:
                raw = crop(page, rect, pad=0.0 if band else PAD,
                           pad_top=0.0 if top else None)
                if mask:
                    raw = paint_mask(raw, rect, mask)
                png, note = shrink(raw)
            entry = {"hash": g["hash"], "from": label, "page": pageno,
                     "rect": [round(v, 1) for v in rect], "bytes": len(png),
                     "file": f"{g['hash'][:12]}.png", "members": len(g["members"]),
                     "cropDigests": 1, "picked": True, "source": src}
            if note:
                entry["resized"] = note
            manifest.append(entry)
            if args.crop:
                open(os.path.join(OUT, entry["file"]), "wb").write(png)
            continue

        shots = []          # (member, region, png) for every member we could read
        for m in g["members"]:
            pid = m["pid"]
            doc = open_doc(pid)
            if doc is None:
                problems.append(f"{g['hash'][:8]} {pid}: no source PDF")
                continue
            if m["page"] is None or m["page"] >= len(doc):
                problems.append(f"{g['hash'][:8]} {pid}:{m['ref']}: page {m['page']} out of range")
                continue
            page = doc[m["page"]]
            rs = page_regions(page)
            if len(rs) != 1:
                problems.append(
                    f"{g['hash'][:8]} {pid}:{m['ref']} p{m['page']}: {len(rs)} regions "
                    f"({'none - the note page is wrong' if not rs else 'ambiguous - which one?'})")
                continue
            shots.append((m, rs[0], crop(page, rs[0])))

        if not shots:
            problems.append(f"{g['hash'][:8]}: NO usable crop from any of its {len(g['members'])} papers")
            continue

        # THE REAL COLLISION CHECK. Members of a group are supposed to be the same
        # question reprinted; if their crops show different figures, they are not.
        #
        # Compare PERCEPTUALLY, not byte-wise. The first version hashed the PNG
        # bytes and called 12 of 24 groups "distinct" — the same figure sits at a
        # slightly different y on each series' page, so it renders to different
        # pixels. That measured the typesetting, not the picture.
        #
        # The threshold is measured, not chosen: across every group here the worst
        # genuine reprint is 8 and the one known collision (2025-65-7-1 Q1's
        # arctan graph vs 65-7-3 Q1's arcsec) is 42. Nothing lands between, so the
        # grey band is reported rather than decided.
        digests = {}
        for m, _, png in shots:
            digests.setdefault(dhash(Image.open(io.BytesIO(png))), []).append(f"{m['pid']}:{m['ref']}")
        worst = max((hamming(a, b) for a, b in itertools.combinations(digests, 2)), default=0)
        if worst > REPRINT_MAX:
            disagree.append((g, digests, worst))

        m, rect, png = shots[0]
        png, note = shrink(png)
        entry = {
            "hash": g["hash"], "from": f"{m['pid']}:{m['ref']}", "page": m["page"],
            "rect": [round(v, 1) for v in rect], "bytes": len(png),
            "file": f"{g['hash'][:12]}.png", "members": len(g["members"]),
            "cropDigests": len(digests),
        }
        if note:
            entry["resized"] = note
        manifest.append(entry)
        if args.crop:
            open(os.path.join(OUT, entry["file"]), "wb").write(png)

    for d in docs.values():
        if d:
            d.close()
    for d, _ in ms_docs.values():
        if d:
            d.close()

    print(f"groups {len(groups)}   cropped {len(manifest)}   problems {len(problems)}")
    if manifest:
        by = collections.Counter(e["bytes"] // 100_000 for e in manifest)
        print("  crop sizes (100 KB buckets):", dict(sorted(by.items())))
    if disagree:
        print(f"\n{len(disagree)} group(s) whose CROPS DISAGREE — a content_hash "
              f"collision, not a reprint:")
        for g, digests, worst in disagree:
            sure = "CERTAIN" if worst >= COLLISION_SURE else "GREY ZONE - look at it"
            print(f"  {g['hash'][:8]}  hamming {worst}  ({sure})")
            for dig, who in digests.items():
                print(f"     {dig % 0x100000000:08x}  {' '.join(who)}")
    if problems:
        print(f"\n{len(problems)} problem(s) — resolve by hand, nothing is guessed:")
        for p in problems:
            print("  " + p)
    # STALENESS IS NOT COMPUTABLE FROM A NARROWED RUN. `used_picks` only fills
    # for the groups this run processed, so under --only every pick belonging to
    # any OTHER group looks unmatched -- 20 of 21 on a one-group run. The message
    # says "fix or remove", so acting on it would delete authored picks that are
    # perfectly live. Same trap as the manifest write below: --only narrows the
    # WORK, never the FILE, and a whole-corpus claim needs a whole-corpus run.
    if args.only:
        print("\n--only: pick staleness NOT checked (needs a whole-corpus run).")
    else:
        stale = set(picks) - used_picks
        if stale:
            print(f"\n{len(stale)} pick(s) in figure-picks.json match NO group - stale, fix or remove:")
            for h in stale:
                print("  " + h[:16])
    if args.crop:
        # --only NARROWS THE WORK, NOT THE FILE. This manifest is a whole-corpus
        # record that attach-images.ts reads, so writing one run's entries over it
        # turned 291 entries into 1 the first time a single group was re-cropped --
        # silently, because the count is printed AFTER the write. A filtered run
        # therefore MERGES BY HASH: entries this run produced win, every other entry
        # is kept. An unfiltered run is the whole truth and still replaces the file.
        path = os.path.join(DATA, "figures.json")
        out = manifest
        if args.only and os.path.exists(path):
            prior = json.load(open(path, encoding="utf-8"))
            fresh = {e["hash"] for e in manifest}
            # Replace IN PLACE and append only what is genuinely new. Sorting the
            # merged list instead rewrote the order of all 291 entries for a
            # two-entry change, which is 8,800 lines of diff nobody can review.
            pending = {e["hash"]: e for e in manifest}
            out = [pending.pop(e["hash"], e) for e in prior]
            out += [e for e in manifest if e["hash"] in pending]
            print("")
            print(f"--only: merged {len(manifest)} entry(s) into {len(prior)} kept -> {len(out)}")
        # indent=2 matches the file as COMMITTED. The writer said indent=1, so
        # every run silently reformatted all ~4,400 lines and buried a two-entry
        # change in an 8,800-line diff. Whichever value is chosen, the writer and
        # the committed file have to agree or the diff is unreviewable.
        json.dump(out, open(path, "w"), indent=2)
        print(f"\nwrote {len(manifest)} crops to out/figures/ and data/figures.json")
    else:
        print("\n[plan only] pass --crop to write the images")


if __name__ == "__main__":
    main()
