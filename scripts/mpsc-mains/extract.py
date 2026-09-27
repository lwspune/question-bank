"""
Extract what the merged MPSC Mains scan gives for free, per paper:

  python scripts/mpsc-mains/extract.py keys            # data/<id>.keytokens.json from each key's text layer
  python scripts/mpsc-mains/extract.py render <id>     # data/pages/<id>/p<NNN>.png for transcription
  python scripts/mpsc-mains/extract.py figures <id>    # data/figures/<id>/q<N>.png from each merged question's figure box

The paper table is READ FROM config.ts (the `p(...)` calls), not mirrored here,
so the two cannot drift. Key lines are grouped by printed y-position exactly as
scripts/mpsc/extract.py does; lib.ts `parseKeyLines` validates them.
"""
import json
import os
import re
import sys

import fitz

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
CONFIG = open(os.path.join(HERE, "config.ts"), encoding="utf-8").read()
SRC = re.search(r'SOURCE_PDF = "([^"]+)"', CONFIG).group(1)

PAPER_RE = re.compile(
    r'p\("([\w-]+)",\s*\[[^\]]*\],\s*\d+,\s*"[\d-]+",\s*"\w+",\s*\[(\d+),\s*(\d+)\],\s*'
    r'(?:\[(\d+),\s*(\d+)\]|null),\s*(\d+)(.*?)\),?\n'
)
PAPERS = {}
for m in PAPER_RE.finditer(CONFIG):
    pid, a, b, k1, k2, _, extra = m.groups()
    PAPERS[pid] = {
        "pages": (int(a), int(b)),
        "key": (int(k1), int(k2)) if k1 else None,
        "image_only": "keyImageOnly: true" in extra,
    }


# Row-grouping tolerance (points). 4 suits every key but one: the State Services
# 2018 key prints its question numbers ~5pt off their answers' baseline, which
# splits each row in two. Its rows are ~21pt apart, so 8 is safe THERE; it is
# not proven for the others, so it is scoped to that key.
KEY_Y_TOL = {"ssm-2018": 8}


def key_lines(page, tol=4):
    words = [
        w for w in page.get_text("words")
        if w[4].strip() and len(w[4].strip()) <= 3 and all(c.isdigit() or c == "#" for c in w[4].strip())
    ]
    words.sort(key=lambda w: (round(w[1]), w[0]))
    lines, cur, cur_y = [], [], None
    for w in words:
        if cur_y is not None and abs(w[1] - cur_y) > tol:
            lines.append([t[4].strip() for t in sorted(cur, key=lambda t: t[0])])
            cur = []
        if not cur:
            cur_y = w[1]
        cur.append(w)
    if cur:
        lines.append([t[4].strip() for t in sorted(cur, key=lambda t: t[0])])
    return lines


def keys(doc):
    os.makedirs(DATA, exist_ok=True)
    for pid, cfg in PAPERS.items():
        if not cfg["key"]:
            print(f"{pid}: no key on file")
            continue
        if cfg["image_only"]:
            print(f"{pid}: image-only key, transcribed by hand")
            continue
        k1, k2 = cfg["key"]
        lines = []
        for n in range(k1, k2 + 1):
            lines.extend(key_lines(doc[n - 1], KEY_Y_TOL.get(pid, 4)))
        with open(os.path.join(DATA, f"{pid}.keytokens.json"), "w", encoding="utf-8") as f:
            json.dump({"paper": pid, "pages": [k1, k2], "lines": lines}, f)
        print(f"{pid}: {len(lines)} lines")


def render(doc, pid, dpi=130):
    a, b = PAPERS[pid]["pages"]
    out = os.path.join(DATA, "pages", pid)
    os.makedirs(out, exist_ok=True)
    for n in range(a, b + 1):
        doc[n - 1].get_pixmap(dpi=dpi).save(os.path.join(out, f"p{n:03d}.png"))
    print(f"{pid}: rendered pages {a}-{b} -> {out}")


def figures(doc, pid, dpi=220):
    merged = json.load(open(os.path.join(DATA, f"{pid}.merged.json"), encoding="utf-8"))
    out = os.path.join(DATA, "figures", pid)
    os.makedirs(out, exist_ok=True)
    k = 72.0 / 130
    n = 0
    for q in merged["questions"]:
        fig = q.get("figure")
        if not fig:
            continue
        x0, y0, x1, y1 = fig["box"]
        doc[fig["page"] - 1].get_pixmap(dpi=dpi, clip=fitz.Rect(x0 * k, y0 * k, x1 * k, y1 * k)).save(
            os.path.join(out, f"q{q['n']}.png")
        )
        n += 1
    print(f"{pid}: {n} figure(s) -> {out}")


if __name__ == "__main__":
    if len(PAPERS) == 0:
        sys.exit("no papers parsed from config.ts")
    doc = fitz.open(SRC)
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "keys":
        keys(doc)
    elif cmd == "render":
        render(doc, sys.argv[2])
    elif cmd == "figures":
        figures(doc, sys.argv[2])
    elif cmd == "papers":
        print(json.dumps(PAPERS, indent=1))
    else:
        sys.exit(__doc__)
