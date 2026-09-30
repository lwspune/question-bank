"""
Extract what the merged MPSC scan gives for free, per paper:

  python scripts/mpsc/extract.py keys [prefix]   # data/<id>.keytokens.json from each key's text layer ("ssp" = State Services only)
  python scripts/mpsc/extract.py render <id>     # data/pages/<id>/p<NNN>.png for transcription
  python scripts/mpsc/extract.py figures <id>    # data/figures/<id>/q<N>.png from each merged question's figure box

Page ranges are mirrored from config.ts (PAPERS) - keep the two in step; the
TS side is the source of truth and `merge.ts` re-checks every paper it reads.

The key text layer is a clean stream of `q, A, B, C, D` groups (parsed and
validated in lib.ts `parseKeyTokens`). The one image-only key (2019-c) is
skipped here and transcribed by hand.
"""
import json
import os
import sys

import fitz

SRC = r"C:/Users/vilas/Downloads/Group B & C Pre Papers 2017 to 2024.pdf"
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")

PAPERS = {
    "2017-b": ((1, 32), (33, 34)),
    "2018-b": ((35, 82), (83, 84)),
    "2019-b": ((85, 124), (125, 126)),
    "2020-b": ((129, 168), (127, 128)),
    "2021-b": ((169, 208), (209, 210)),
    "2022-b": ((211, 250), (251, 252)),
    "2017-c": ((253, 288), (289, 290)),
    "2018-c": ((292, 323), (324, 325)),
    "2019-c": ((326, 361), (362, 363)),
    "2021-c": ((364, 395), (396, 397)),
    "2022-c": ((398, 429), (430, 431)),
    "2023-bc": ((432, 471), (472, 473)),
    "2024-b": ((474, 513), (514, 515)),
    "2024-c": ((516, 555), (556, 557)),
}
# State Services Prelims GS Paper I: booklets in their own scan, each final key
# in its own 2-page PDF (config.ts SSP_PAPERS). 2019's key is a "Print to PDF"
# image with no text layer, so it is transcribed by hand.
SSP_SRC = r"C:/Users/vilas/Downloads/MPSC Rajyaseva PYQ by ACHIEVERS MENTORSHIP.pdf"
SSP_KEY_DIR = r"C:/Users/vilas/Downloads/mpsc-ssp-final-keys"
SSP_PAPERS = {
    "ssp-2022": (1, 40),
    "ssp-2021": (41, 88),
    "ssp-2020": (89, 136),
    "ssp-2019": (137, 184),
    "ssp-2017": (185, 232),
    "ssp-2018": (233, 276),
    "ssp-2016": (277, 316),
    "ssp-2015": (317, 364),
    "ssp-2013": (365, 412),
    "ssp-2014": (413, 460),
}
# CSAT Paper II (config.ts SSP_CSAT_PAPERS): booklet file year, booklet pages.
# paper-2017.pdf is the 2018 booklet; no 2017 booklet exists in the source.
SSP_CSAT_DIR = r"C:/Users/vilas/Downloads/mpsc-ssp-csat"
SSP_CSAT_PAPERS = {
    "ssp-csat-2022": (2022, 64),
    "ssp-csat-2021": (2021, 56),
    "ssp-csat-2020": (2020, 64),
    "ssp-csat-2019": (2019, 56),
    "ssp-csat-2018": (2017, 56),
    "ssp-csat-2016": (2016, 56),
    "ssp-csat-2015": (2015, 56),
    "ssp-csat-2014": (2014, 48),
    "ssp-csat-2013": (2013, 48),
}
IMAGE_ONLY_KEYS = {"2019-c", "ssp-2019"}


def source(pid):
    """(booklet doc path, booklet pages, key doc path, key pages) for a paper."""
    if pid in SSP_CSAT_PAPERS:
        file_year, n = SSP_CSAT_PAPERS[pid]
        key = os.path.join(SSP_CSAT_DIR, f"key-{pid[-4:]}.pdf")
        return os.path.join(SSP_CSAT_DIR, f"paper-{file_year}.pdf"), (1, n), key, (1, len(doc_for(key)))
    if pid in SSP_PAPERS:
        return SSP_SRC, SSP_PAPERS[pid], os.path.join(SSP_KEY_DIR, pid[4:] + ".pdf"), (1, 2)
    pages, keypages = PAPERS[pid]
    return SRC, pages, SRC, keypages


_docs = {}


def doc_for(path):
    if path not in _docs:
        _docs[path] = fitz.open(path)
    return _docs[path]


def keys(only=None):
    os.makedirs(DATA, exist_ok=True)
    for pid in [*PAPERS, *SSP_PAPERS, *SSP_CSAT_PAPERS]:
        if only and not pid.startswith(only):
            continue
        _, _, keypath, (k1, k2) = source(pid)
        doc = doc_for(keypath)
        if pid in IMAGE_ONLY_KEYS:
            print(f"{pid}: image-only key, skipped")
            continue
        lines = []
        numbered_by_position = False
        base = 1  # first question number on the page, for keys numbered by position
        for page_idx, n in enumerate(range(k1, k2 + 1)):
            page_lines = []
            # Group words into printed lines by y (the flat text stream's column
            # order differs between keys). The header prose is Devanagari in a
            # broken font and never looks like a key token, so keep only short
            # digit/# tokens.
            words = [
                w for w in doc[n - 1].get_text("words")
                if w[4].strip() and len(w[4].strip()) <= 3
                and all(c.isdigit() or c == "#" for c in w[4].strip())
            ]
            words.sort(key=lambda w: (round(w[1]), w[0]))
            cur, cur_y = [], None
            for w in words:
                y = w[1]
                if cur_y is not None and abs(y - cur_y) > 4:
                    page_lines.append([t[4].strip() for t in sorted(cur, key=lambda t: t[0])])
                    cur = []
                if not cur:
                    cur_y = y
                cur.append(w)
            if cur:
                page_lines.append([t[4].strip() for t in sorted(cur, key=lambda t: t[0])])
            # Some keys (2021-c, several CSAT) print their question numbers
            # outside the text layer, leaving R lines of 8 answers: left column
            # base..base+R-1, right column the next R. Number them by position
            # ONLY in that exact shape - anything else is left for
            # parseKeyLines to refuse. set balance (keys.ts) then checks it.
            body = [l for l in page_lines if len(l) > 2]
            if body and all(len(l) == 8 for l in body):
                R = len(body)
                page_lines = [
                    [str(base + i), *l[:4], str(base + R + i), *l[4:]] for i, l in enumerate(body)
                ]
                base += 2 * R
                numbered_by_position = True
            lines.extend(page_lines)
        with open(os.path.join(DATA, f"{pid}.keytokens.json"), "w", encoding="utf-8") as f:
            json.dump({"paper": pid, "pages": [k1, k2], "numberedByPosition": numbered_by_position, "lines": lines}, f)
        print(f"{pid}: {len(lines)} lines")


def render(pid, dpi=130):
    path, (a, b), _, _ = source(pid)
    doc = doc_for(path)
    out = os.path.join(DATA, "pages", pid)
    os.makedirs(out, exist_ok=True)
    for n in range(a, b + 1):
        doc[n - 1].get_pixmap(dpi=dpi).save(os.path.join(out, f"p{n:03d}.png"))
    print(f"{pid}: rendered pages {a}-{b} -> {out}")


def figures(pid, dpi=220):
    """Crop each figure at a higher dpi than the 130-dpi render its box was read on."""
    merged = json.load(open(os.path.join(DATA, f"{pid}.merged.json"), encoding="utf-8"))
    out = os.path.join(DATA, "figures", pid)
    os.makedirs(out, exist_ok=True)
    k = 72.0 / 130  # render pixels -> PDF points
    n = 0
    for q in merged["questions"]:
        fig = q.get("figure")
        if not fig:
            continue
        x0, y0, x1, y1 = fig["box"]
        clip = fitz.Rect(x0 * k, y0 * k, x1 * k, y1 * k)
        doc_for(source(pid)[0])[fig["page"] - 1].get_pixmap(dpi=dpi, clip=clip).save(os.path.join(out, f"q{q['n']}.png"))
        n += 1
    print(f"{pid}: {n} figure(s) -> {out}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "keys":
        keys(sys.argv[2] if len(sys.argv) > 2 else None)
    elif cmd == "figures":
        figures(sys.argv[2])
    elif cmd == "render":
        render(sys.argv[2])
    else:
        sys.exit(__doc__)
