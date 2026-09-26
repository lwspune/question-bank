"""
Extract what the merged MPSC scan gives for free, per paper:

  python scripts/mpsc/extract.py keys            # data/<id>.keytokens.json from each key's text layer
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
IMAGE_ONLY_KEYS = {"2019-c"}


def keys(doc):
    os.makedirs(DATA, exist_ok=True)
    for pid, (_, (k1, k2)) in PAPERS.items():
        if pid in IMAGE_ONLY_KEYS:
            print(f"{pid}: image-only key, skipped")
            continue
        lines = []
        numbered_by_position = False
        for page_idx, n in enumerate((k1, k2)):
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
            # 2021-c prints its question numbers outside the text layer, leaving
            # 25 lines of 8 answers (left column 1-25, right 26-50 on page 1).
            # Number them by position ONLY in that exact shape - anything else
            # is left for parseKeyLines to refuse.
            body = [l for l in page_lines if len(l) > 2]
            if len(body) == 25 and all(len(l) == 8 for l in body):
                base = 1 + 50 * page_idx
                page_lines = [
                    [str(base + i), *l[:4], str(base + 25 + i), *l[4:]] for i, l in enumerate(body)
                ]
                numbered_by_position = True
            lines.extend(page_lines)
        with open(os.path.join(DATA, f"{pid}.keytokens.json"), "w", encoding="utf-8") as f:
            json.dump({"paper": pid, "pages": [k1, k2], "numberedByPosition": numbered_by_position, "lines": lines}, f)
        print(f"{pid}: {len(lines)} lines")


def render(doc, pid, dpi=130):
    (a, b), _ = PAPERS[pid]
    out = os.path.join(DATA, "pages", pid)
    os.makedirs(out, exist_ok=True)
    for n in range(a, b + 1):
        doc[n - 1].get_pixmap(dpi=dpi).save(os.path.join(out, f"p{n:03d}.png"))
    print(f"{pid}: rendered pages {a}-{b} -> {out}")


def figures(doc, pid, dpi=220):
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
        doc[fig["page"] - 1].get_pixmap(dpi=dpi, clip=clip).save(os.path.join(out, f"q{q['n']}.png"))
        n += 1
    print(f"{pid}: {n} figure(s) -> {out}")


if __name__ == "__main__":
    doc = fitz.open(SRC)
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "keys":
        keys(doc)
    elif cmd == "figures":
        figures(doc, sys.argv[2])
    elif cmd == "render":
        render(doc, sys.argv[2])
    else:
        sys.exit(__doc__)
