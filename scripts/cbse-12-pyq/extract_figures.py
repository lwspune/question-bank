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
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regions import merge, big  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
OUT = os.path.join(HERE, "out", "figures")
SOURCE_ROOT = r"C:\tmp\PYQPs\CBSE\XII\Mathematics"

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
    root = os.path.join(SOURCE_ROOT, str(year), kind)
    want = code.replace("/", "-")
    for dirpath, _, files in os.walk(root):
        for fn in files:
            if fn.lower().endswith(".pdf") and want in re.sub(r"[_\s]", "-", fn):
                return os.path.join(dirpath, fn)
    return None


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


def crop(page, rect, dpi=DPI, pad=PAD):
    clip = fitz.Rect(rect[0] - pad, rect[1] - pad, rect[2] + pad, rect[3] + pad)
    clip = clip & page.rect          # never ask for pixels outside the page
    pix = page.get_pixmap(dpi=dpi, clip=clip)
    return pix.tobytes("png")


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
    ap.add_argument("--only", help="restrict to one hash prefix")
    args = ap.parse_args()

    path = os.path.join(DATA, "figure-groups.json")
    if not os.path.exists(path):
        sys.exit("run: npx tsx scripts/cbse-12-pyq/figure-groups.ts --write")
    groups = json.load(open(path, encoding="utf-8"))
    if args.only:
        groups = [g for g in groups if g["hash"].startswith(args.only)]

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
        return docs[pid]

    ms_docs = {}

    def open_ms(pid):
        if pid not in ms_docs:
            year, code = pid.split("-", 1)
            pdf = find_pdf(year, code, kind="ms")
            ms_docs[pid] = (fitz.open(pdf), None) if pdf else (None, None)
            if ms_docs[pid][0] is not None:
                ms_docs[pid] = (ms_docs[pid][0], ms_figures_by_question(ms_docs[pid][0]))
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
                hits = index.get(pick["q"], [])
                if len(hits) != 1:
                    problems.append(f"{g['hash'][:8]}: scheme {pick['pid']} has {len(hits)} figures for Q{pick['q']}, need exactly 1")
                    continue
                pageno, rect = hits[0]
                page, label = doc[pageno], f"{pick['pid']}:ms Q{pick['q']}"
            else:
                doc = open_doc(pick["pid"])
                if doc is None or pick["page"] >= len(doc):
                    problems.append(f"{g['hash'][:8]}: pick names {pick['pid']} p{pick['page']}, which does not exist")
                    continue
                page, pageno = doc[pick["page"]], pick["page"]
                rs = page_regions(page)
                if not rs:
                    problems.append(f"{g['hash'][:8]}: pick names a page with no figure at all")
                    continue
                if pick.get("mode") != "union":
                    problems.append(f"{g['hash'][:8]}: unknown pick mode {pick.get('mode')!r}")
                    continue
                rect = (min(r[0] for r in rs), min(r[1] for r in rs),
                        max(r[2] for r in rs), max(r[3] for r in rs))
                label = f"{pick['pid']}:picked"
            # A band is a deliberate trim, so it must NOT be padded back out —
            # the first run re-added PAD and pulled the text line the band had
            # just removed straight back into the crop.
            band = pick.get("band")
            if band:
                h = rect[3] - rect[1]
                rect = (rect[0], rect[1] + band[0] * h, rect[2], rect[1] + band[1] * h)
            png, note = shrink(crop(page, rect, pad=0.0 if band else PAD))
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
    stale = set(picks) - used_picks
    if stale:
        print(f"\n{len(stale)} pick(s) in figure-picks.json match NO group - stale, fix or remove:")
        for h in stale:
            print("  " + h[:16])
    if args.crop:
        json.dump(manifest, open(os.path.join(DATA, "figures.json"), "w"), indent=1)
        print(f"\nwrote {len(manifest)} crops to out/figures/ and data/figures.json")
    else:
        print("\n[plan only] pass --crop to write the images")


if __name__ == "__main__":
    main()
