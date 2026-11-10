"""
Paper 1 out of one NTA master question paper (2024 layout: a text layer for the
headers and ids, one embedded image per question block).

    python -P scripts/ugc-net/extract.py <shift-id> <paper.pdf>

Writes SOURCE_ROOT/render/<shift>/:
    q01.png .. q50.png     each question's ENGLISH image (stem + its four options)
    set-<first>.png        a set's shared passage / table / chart
    manifest.json          [{ref, qid, image, set?}] in paper order, plus the header

How the file runs: a header block, then each question twice, English then
Hindi. A set ("COMPREHENSION ... Question Numbers : (1 to 5)") prints its
shared image before its sub-questions. Every marker in the text layer owns the
next image on the page, so markers and images pair 1:1 in reading order; the
first image seen for an id is the English one. Paper 1 is Question Number 1-50.

Refuses (exit 1) if the pairing does not come out 1:1 on a page, or if Paper 1
does not end with exactly 50 questions: a layout this script was not written
for must be looked at, not guessed.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

SOURCE_ROOT = r"C:\tmp\PYQPs\UGCNET"
# group 1: a set's id; groups 4, 5: a question's number and id. A set's
# "Question Numbers : (46 to 50)" can fall on the next page, so it is read apart (SET_RANGE).
MARKER = re.compile(
    r"Question Id\s*:\s*(\d+)\s*Question Type\s*:\s*COMPREHENSION()()"
    r"|Question Number\s*:\s*(\d+)\s*Question Id\s*:\s*(\d+)\s*Question Type\s*:\s*MCQ",
)
SET_RANGE = re.compile(r"Question Numbers\s*:\s*\((\d+)\s*to\s*(\d+)\)")


def main() -> None:
    shift, pdf = sys.argv[1], sys.argv[2]
    out = os.path.join(SOURCE_ROOT, "render", shift)
    os.makedirs(out, exist_ok=True)
    doc = fitz.open(pdf)
    header = re.search(r"Question Paper Name\s*:\s*\n?(.+)", doc[0].get_text())
    seen: set[str] = set()
    rows: list[dict] = []
    sets: dict[str, dict] = {}
    current_set: dict | None = None

    # Every marker and every image, in one reading order across the whole file.
    events = []
    for pno in range(len(doc)):
        page = doc[pno]
        nth: dict[str, int] = {}
        for m in MARKER.finditer(page.get_text()):
            qid = m.group(1) or m.group(5)
            # English and Hindi copies of one id can share a page: the k-th copy in the text is the k-th hit.
            k = nth.get(qid, 0)
            nth[qid] = k + 1
            hits = sorted(page.search_for(qid), key=lambda h: h.y0)
            if len(hits) <= k:
                sys.exit(f"page {pno + 1}: id {qid} is in the text {k + 1} time(s) but found on the page {len(hits)}")
            events.append((pno, hits[k].y0, 0, m))
        for img in page.get_image_info(xrefs=True):
            if img["width"] < 40 and img["height"] < 40:
                continue  # 16x16 option icons some papers print beside each option (Hindi, 27 Aug)
            events.append((pno, img["bbox"][1], 1, img))
        if any(e[2] == 0 and e[3].group(4) and int(e[3].group(4)) > 50 for e in events):
            break
    events.sort(key=lambda e: (e[0], e[1]))

    # Each set's question range: the first "Question Numbers" after its header, on its page or the next.
    set_ranges: dict[str, tuple[int, int]] = {}
    for pno, _, kind, m in events:
        if kind != 0 or not m.group(1) or m.group(1) in set_ranges:
            continue
        here = doc[pno].get_text()
        tail = here[here.index(m.group(0)) + len(m.group(0)):]
        r = SET_RANGE.search(tail) or (SET_RANGE.match(doc[pno + 1].get_text().lstrip()) if pno + 1 < len(doc) else None)
        if not r:
            sys.exit(f"page {pno + 1}: set {m.group(1)} has no 'Question Numbers' after it")
        set_ranges[m.group(1)] = (int(r.group(1)), int(r.group(2)))

    def save(img, name):
        pix = fitz.Pixmap(doc, img["xref"])
        if pix.n - pix.alpha >= 4:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        pix.save(os.path.join(out, name))

    pending = None
    for pno, y, kind, obj in events:
        if kind == 0:
            if pending is not None:
                sys.exit(f"page {pno + 1}: marker {pending.group(0)[:60]!r} got no image before the next marker")
            pending = obj
            continue
        if pending is None:
            if not seen and not rows:
                continue  # the header block's own picture (21-27 Aug papers), before any question
            sys.exit(f"page {pno + 1}: an image at y={y:.0f} belongs to no marker; look at this page")
        m, pending = pending, None
        if m.group(1):
            qid = m.group(1)
            first, last = set_ranges[qid]
            if qid in seen:
                current_set = sets[qid]
                continue
            seen.add(qid)
            name = f"set-{first:02d}.png"
            save(obj, name)
            current_set = sets[qid] = {"qid": qid, "first": first, "last": last, "image": name}
            continue
        ref, qid = int(m.group(4)), m.group(5)
        if ref > 50:
            break
        if qid in seen:
            continue
        seen.add(qid)
        name = f"q{ref:02d}.png"
        save(obj, name)
        row = {"ref": str(ref), "qid": qid, "image": name}
        if current_set and current_set["first"] <= ref <= current_set["last"]:
            row["set"] = current_set["image"]
        rows.append(row)

    refs = [int(r["ref"]) for r in rows]
    if refs != list(range(1, 51)):
        missing = sorted(set(range(1, 51)) - set(refs))
        sys.exit(f"Paper 1 came out as {len(refs)} question(s), missing {missing[:10]}; look at the file")
    manifest = {"shift": shift, "source": os.path.basename(pdf), "header": header.group(1).strip() if header else None,
                "sets": list(sets.values()), "rows": rows}
    with open(os.path.join(out, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1)
    print(f"{shift}: 50 questions, {len(sets)} set(s) -> {out}  ({manifest['header']})")


if __name__ == "__main__":
    main()
