"""Extract one MHT-CET PDF paper (2026 onward: a typeset PDF, not an LWS .docx).

    python scripts/mhtcet/pdf-extract.py "<paper.pdf>" <shiftId>

Writes, under scripts/mhtcet/out/pdf/<shiftId>/ (gitignored, never shipped):
  crops/qNNN.png      the question as printed (QR column cut off), for transcription
  orig/qNNN-k.png     each raster figure in the question, as REFERENCE ONLY for redrawing
                      (watermarked third-party art: it is never uploaded)
  meta.json           {subjectOrder, key{n: letter}, textLayer{n: words}, figures{n: count}}

The prose of these PDFs is a real text layer but every formula and number is drawn
as vector paths, so the text layer cannot be the transcription. It is kept to CHECK
the transcription (pdfSource.ts textLayerFidelity). Fails loudly unless the paper
yields exactly 150 questions and 150 key letters.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

TOP, BOTTOM = 60.0, 772.0  # content band; header logo above, app banner + footer below
QR_X = 505.0  # QR code + "Open solution" link column starts here
DPI = 170

Q_LABEL = re.compile(r"^Q(\d{1,3})\.$")
SECTION = re.compile(r"^(Chemistry|Mathematics|Physics)\n50 questions", re.M)
KEY = re.compile(r"(?m)^(\d{1,3})\. ?\n?([A-D])\s*$")
SUBJECT = {"Chemistry": "Chemistry", "Mathematics": "Maths", "Physics": "Physics"}


def labels(doc):
    """(number, page_index, y_top) of every question label, in reading order."""
    out = []
    for pi, page in enumerate(doc):
        for w in page.get_text("words"):
            x0, y0, x1, y1, text = w[:5]
            m = Q_LABEL.match(text)
            if m and x0 < 60 and TOP <= y0 <= BOTTOM:
                out.append((int(m.group(1)), pi, y0))
    return out


def segments(doc, labs, i):
    """Page regions [(page, y0, y1)] spanned by question i (label to next label)."""
    _, p0, y0 = labs[i]
    if i + 1 < len(labs):
        _, p1, y1 = labs[i + 1]
    else:  # last question: runs to the end of its page
        p1, y1 = p0, BOTTOM
    if p1 == p0:
        return [(p0, y0 - 4, y1 - 4)]
    segs = [(p0, y0 - 4, BOTTOM)]
    for p in range(p0 + 1, p1):
        segs.append((p, TOP, BOTTOM))
    segs.append((p1, TOP, y1 - 4))
    # A trailing segment with no ink (the next label sits at the top of its page) adds nothing.
    return [s for s in segs if s[2] - s[1] > 8]


def words_in(page, y0, y1):
    ws = [w for w in page.get_text("words") if y0 <= w[1] < y1 and w[0] < QR_X]
    return " ".join(w[4] for w in ws)


def main():
    pdf, shift_id = sys.argv[1], sys.argv[2]
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", "pdf", shift_id)
    os.makedirs(os.path.join(out, "crops"), exist_ok=True)
    os.makedirs(os.path.join(out, "orig"), exist_ok=True)
    doc = fitz.open(pdf)

    order = [SUBJECT[s] for s in SECTION.findall(doc[0].get_text())]
    if len(order) != 3:
        sys.exit(f"cover page names {order}, expected 3 sections")

    labs = labels(doc)
    nums = [n for n, _, _ in labs]
    if nums != list(range(1, 151)):
        sys.exit(f"expected question labels 1..150 in order, got {len(nums)}: {nums[:5]}...")

    full = "\n".join(p.get_text() for p in doc)
    key = {int(n): a for n, a in KEY.findall(full)}
    if sorted(key) != list(range(1, 151)):
        sys.exit(f"answer key has {len(key)} entries, expected 1..150")

    text_layer, figures = {}, {}
    for i, (n, _, _) in enumerate(labs):
        segs = segments(doc, labs, i)
        pixes, words, k = [], [], 0
        for p, y0, y1 in segs:
            page = doc[p]
            clip = fitz.Rect(28, y0, QR_X, y1)
            pixes.append(page.get_pixmap(dpi=DPI, clip=clip))
            words.append(words_in(page, y0, y1))
            for img in page.get_images(full=True):
                if img[2] <= 200:  # QR codes and app logos
                    continue
                for r in page.get_image_rects(img[0]):
                    if y0 <= r.y0 < y1:
                        k += 1
                        pix = fitz.Pixmap(doc, img[0])
                        if pix.alpha or pix.n > 3:
                            pix = fitz.Pixmap(fitz.csRGB, pix)
                        pix.save(os.path.join(out, "orig", f"q{n:03d}-{k}.png"))
        # stitch the segments vertically into one crop
        w = max(px.width for px in pixes)
        h = sum(px.height for px in pixes)
        canvas = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, w, h), False)
        canvas.clear_with(255)
        y = 0
        for px in pixes:
            if px.alpha:
                px = fitz.Pixmap(px, 0)
            px.set_origin(0, y)
            canvas.copy(px, px.irect)
            y += px.height
        canvas.save(os.path.join(out, "crops", f"q{n:03d}.png"))
        text_layer[n] = " ".join(words)
        figures[n] = k

    meta = {"source": os.path.basename(pdf), "subjectOrder": order, "key": key, "textLayer": text_layer, "figures": figures}
    with open(os.path.join(out, "meta.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=1, ensure_ascii=False)
    spanning = [n for i, (n, _, _) in enumerate(labs) if len(segments(doc, labs, i)) > 1]
    print(f"{shift_id}: 150 questions, 150 keys, order {order}, "
          f"{sum(1 for v in figures.values() if v)} questions with {sum(figures.values())} figures, "
          f"{len(spanning)} span a page break -> {out}")


if __name__ == "__main__":
    main()
