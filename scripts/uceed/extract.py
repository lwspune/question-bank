"""
Split one UCEED paper into a DRAFT per question: its text from the PDF's text layer and
every embedded picture placed inside it, saved at native resolution.

    python scripts/uceed/extract.py 2026

Reads  C:\\tmp\\PYQPs\\UCEED\\src\\<year>-paper.pdf
Writes C:\\tmp\\PYQPs\\UCEED\\work\\<year>\\draft.json      (text + option lines + picture files)
       C:\\tmp\\PYQPs\\UCEED\\figures\\<year>\\Q<nn>.png      (one per question; several pictures
                                                          stacked top to bottom in page order)
       C:\\tmp\\PYQPs\\UCEED\\work\\<year>\\_sheet-<k>.png    (contact sheets: LOOK at every crop)

The draft is a starting point, not a transcription: a person reads every question against
the page and writes data/<year>.questions.json (README "Transcribing").

Why extract and not crop: each UCEED figure is ONE embedded raster with its A-D panels and
labels drawn inside it, so the object is the figure, with no page text leaking in
(memory: figure-image-acquisition, method 1). A picture is assigned to the question whose
"Q.NN" marker most recently precedes it in reading order, across page breaks.
"""
import json
import os
import re
import site
import sys

sys.path.append(site.getusersitepackages())
import fitz  # noqa: E402  PyMuPDF

ROOT = r"C:\tmp\PYQPs\UCEED"
FOOTER_Y = 780  # "UCEED 2026 / Page n of N" sits at y >= 790 on every page
# Two numbering styles. "Q.01" (2018 on): a paper that has it uses ONLY that, because its
# instructions are a numbered list too ("1. The total duration ..."). "3." (2015-2017): a bare
# number, and the instructions are numbered the same way, so a new "1." RESTARTS the count and
# the instruction list is thrown away. Either way a number counts only when it is the NEXT one in
# sequence, so a numbered list or a table cell inside a question cannot split it.
Q_MARKER = re.compile(r"^\s*Q\.?\s?(\d{1,3})\b\.?")
BARE_MARKER = re.compile(r"^\s*(\d{1,3})(?:\.(?!\d)|\))")
OPTION = re.compile(r"^\s*\(?([A-D])[.)]\s+(.*)$")
# Figures drawn as VECTORS, with no embedded picture to extract: rendered from the page,
# clipped to the drawing (year -> question -> (page, x0, y0, x1, y1) in PDF points).
# 2021 Q19's four rotations are line drawings.
PAGE_CLIPS = {2021: {19: (11, 70, 354, 526, 606)}}
# A picture printed at the foot of a page, above the question it belongs to on the next page,
# is read as the previous question's (its marker comes later). year -> {from: to}: the LAST
# picture of `from` moves to `to`. 2020 Q39 and Q67 sit below Q38 and Q66.
MOVE_LAST_PICTURE = {2020: {38: 39, 66: 67}}
MAX_FIGURE_BYTES = 1000 * 1000  # under storage's 1 MiB limit
TINY = 40  # px: bullets and icons, not figures
SCANNED_PAGE = 0.6  # a picture covering more of the page than this is a scanned page, not a figure
INSTRUCTIONS_MAX = 15  # a numbered instruction list is shorter than this
MAX_GAP = 3  # question numbers that may go missing in a row (scanned pages)
# Part A's question count per year, from IIT Bombay's key. Part B (drawing) follows and is
# numbered too: "Q.69" in 2022, a fresh "1." in 2015, which the restart rule above would read
# as instructions and so throw away all of Part A. The first marker after the last Part A
# question therefore ends the stream.
PART_A = {2015: 100, 2016: 80, 2017: 85, 2018: 85, 2019: 85, 2020: 68, 2021: 68, 2022: 68,
          2023: 68, 2024: 57, 2025: 57, 2026: 57}


def main(year: str) -> None:
    pdf = fitz.open(os.path.join(ROOT, "src", f"{year}-paper.pdf"))
    work = os.path.join(ROOT, "work", year)
    figs = os.path.join(ROOT, "figures", year)
    os.makedirs(work, exist_ok=True)
    os.makedirs(figs, exist_ok=True)

    # One stream of items in reading order: text lines and pictures, each with its page + y.
    items = []
    scanned: list[int] = []
    for pno, page in enumerate(pdf):
        for b in page.get_text("dict")["blocks"]:
            if b["type"] != 0:
                continue
            for line in b["lines"]:
                y = line["bbox"][1]
                if y >= FOOTER_Y:
                    continue
                text = "".join(s["text"] for s in line["spans"]).rstrip()
                if text.strip():
                    items.append((pno, y, line["bbox"][0], "text", text))
        for im in page.get_images(full=True):
            xref, w, h = im[0], im[2], im[3]
            if w < TINY or h < TINY:
                continue
            for r in page.get_image_rects(xref):
                if r.get_area() > SCANNED_PAGE * page.rect.get_area():
                    scanned.append(pno + 1)  # a scanned page: its questions are only in the picture
                    continue
                items.append((pno, r.y0, r.x0, "image", xref))
    items.sort(key=lambda t: (t[0], round(t[1]), t[2]))

    q_style = any(k == "text" and Q_MARKER.match(t) for _p, _y, _x, k, t in items)
    marker = Q_MARKER if q_style else BARE_MARKER
    questions: dict[int, dict] = {}
    current = None
    last = PART_A[int(year)]
    for pno, _y, _x, kind, payload in items:
        if kind == "text":
            m = marker.match(payload)
            if m and current is not None and current["n"] == last:
                break  # Part B begins
            expected = (current["n"] + 1) if current else 1
            # A list that came before the questions. Only an instruction list restarts the count:
            # short, and with no picture in any of its items (a cover logo comes before them all).
            # A "1." in a list INSIDE a question (2015 has several) would otherwise throw the
            # paper away.
            if (m and not q_style and int(m.group(1)) == 1 and current is not None
                    and current["n"] <= INSTRUCTIONS_MAX
                    and not any(q["xrefs"] for q in questions.values())):
                questions, current, expected = {}, None, 1
            # A small jump is allowed: a question printed only on a scanned page has no text marker.
            if m and expected <= int(m.group(1)) <= expected + MAX_GAP:
                n = int(m.group(1))
                current = questions.setdefault(n, {"n": n, "page": pno + 1, "lines": [], "xrefs": []})
                rest = payload[m.end():].strip()
                if rest:
                    current["lines"].append(rest)
                continue
            if current is not None:
                current["lines"].append(payload.strip())
        elif current is not None:
            current["xrefs"].append(payload)

    for src, dst in MOVE_LAST_PICTURE.get(int(year), {}).items():
        if questions.get(src, {}).get("xrefs") and dst in questions:
            questions[dst]["xrefs"].insert(0, questions[src]["xrefs"].pop())

    drafts = []
    for n in sorted(questions):
        q = questions[n]
        stem, options = [], []
        for line in q["lines"]:
            m = OPTION.match(line)
            if m:
                options.append({"label": m.group(1), "text": m.group(2).strip()})
            elif options:
                options[-1]["text"] += " " + line
            else:
                stem.append(line)
        clip = PAGE_CLIPS.get(int(year), {}).get(n)
        if clip:
            files = save_clip(pdf, clip, os.path.join(figs, f"Q{n:02d}.png"))
        else:
            files = save_figure(pdf, q["xrefs"], os.path.join(figs, f"Q{n:02d}.png"))
        drafts.append({
            "n": n, "page": q["page"], "text": " ".join(stem), "options": options,
            "figure": os.path.basename(files) if files else None, "pictures": len(q["xrefs"]),
        })
    with open(os.path.join(work, "draft.json"), "w", encoding="utf-8") as f:
        gaps = [n for n in range(1, max(questions, default=0) + 1) if n not in questions]
        json.dump({"year": int(year), "gaps": gaps, "scanned_pages": scanned, "questions": drafts},
                  f, ensure_ascii=False, indent=2)
    contact_sheets(figs, work, drafts)
    # Every page as an image, so whoever reads the draft can check it against the paper.
    pages = os.path.join(work, "pages")
    os.makedirs(pages, exist_ok=True)
    for pno, page in enumerate(pdf):
        page.get_pixmap(dpi=110).save(os.path.join(pages, f"p{pno + 1:02d}.png"))
    with_fig = sum(1 for d in drafts if d["figure"])
    if gaps:
        print(f"  GAPS (no text marker; read them off the page images): {gaps}  scanned pages: {scanned}")
    print(f"{year}: {len(drafts)} questions, {with_fig} with a figure, "
          f"{sum(d['pictures'] for d in drafts)} pictures -> {work}")


def load_picture(pdf, xref):
    """The picture as the printed page shows it. A picture with a soft mask (13 across
    2015-2026, e.g. 2023 Q43's footprint options) is drawn by the page through that mask, but
    the raw object reads back fully opaque: 2023 Q43's options came out as black on black. So
    a masked picture is taken from the page render, clipped to the picture's own rectangle at
    its native width (no page text can enter: the clip is the picture). An unmasked picture is
    the raw object, untouched, so its bytes (and content_hash) never move."""
    if not (pdf.extract_image(xref).get("smask") or 0):
        return fitz.Pixmap(pdf, xref)
    width = fitz.Pixmap(pdf, xref).width
    for page in pdf:
        rects = page.get_image_rects(xref)
        if rects:
            r = rects[0]
            zoom = width / r.width
            return page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=r, alpha=False)
    raise ValueError(f"picture {xref} is on no page")


def save_clip(pdf, clip, path):
    """A vector-drawn figure (PAGE_CLIPS) rendered from its page at 800 px wide."""
    page, *rect = clip
    r = fitz.Rect(*rect)
    zoom = 800 / r.width
    pdf[page - 1].get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=r, alpha=False).save(path)
    return fit_storage(path)


def save_figure(pdf, xrefs, path):
    jpg = os.path.splitext(path)[0] + ".jpg"
    if os.path.exists(jpg):
        os.remove(jpg)  # a JPEG from an earlier run (fit_storage) is rebuilt below
    if not xrefs:
        if os.path.exists(path):
            os.remove(path)
        return None
    pix = [load_picture(pdf, x) for x in dict.fromkeys(xrefs)]
    pix = [fitz.Pixmap(fitz.csRGB, p) if p.n - p.alpha != 3 or p.alpha else p for p in pix]
    if len(pix) == 1:
        pix[0].save(path)
        return fit_storage(path)
    # Several pictures in one question: stack them, scaled to one width, 12px apart. Each is
    # flattened to plain RGB first (2018 mixes pictures with and without transparency). Only
    # here, so a single picture's bytes, and so its content_hash, never change.
    pix = [fitz.Pixmap(p, 0) if p.alpha else p for p in pix]
    pix = [p if p.colorspace and p.colorspace.n == 3 else fitz.Pixmap(fitz.csRGB, p) for p in pix]
    width = max(p.width for p in pix)
    scaled = [fitz.Pixmap(p, width, round(p.height * width / p.width)) if p.width != width else p for p in pix]
    height = sum(p.height for p in scaled) + 12 * (len(scaled) - 1)
    out = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, width, height), False)
    out.set_rect(out.irect, (255, 255, 255))
    y = 0
    for p in scaled:
        p.set_origin(0, y)
        out.copy(p, p.irect)
        y += p.height + 12
    out.save(path)
    return fit_storage(path)


def fit_storage(path):
    """Bank storage refuses a file over 1 MB (src/lib/storage/images.ts). A picture past that
    (2024 Q4: a 1234 px photograph, 1.9 MB) is scaled to 800 px wide, the width UCEED draws its
    pictures at. Smaller pictures are left byte for byte, so their content_hash never moves."""
    if os.path.getsize(path) <= MAX_FIGURE_BYTES:
        return path
    p = fitz.Pixmap(path)
    if p.width > 800:
        p = fitz.Pixmap(p, 800, round(p.height * 800 / p.width))
        p.save(path)
        if os.path.getsize(path) <= MAX_FIGURE_BYTES:
            return path
    # Still too big: a tall colour illustration (2023 Q9, two cartoons stacked: 2.4 MB as PNG,
    # 0.38 MB as JPEG). Saved as Q<nn>.jpg instead; config.figurePath finds either.
    jpg = os.path.splitext(path)[0] + ".jpg"
    p.save(jpg, jpg_quality=90)
    os.remove(path)
    return jpg


def contact_sheets(figs, work, drafts, per_sheet=12):
    shown = [d for d in drafts if d["figure"]]
    for k in range(0, len(shown), per_sheet):
        doc = fitz.open()
        page = doc.new_page(width=1200, height=1600)
        for i, d in enumerate(shown[k:k + per_sheet]):
            col, row = i % 3, i // 3
            box = fitz.Rect(10 + col * 395, 30 + row * 392, 395 + col * 395, 392 + row * 392)
            page.insert_text((box.x0, box.y0 - 6), f"Q{d['n']:02d}  ({d['pictures']} picture/s)", fontsize=14)
            page.insert_image(box, filename=os.path.join(figs, d["figure"]), keep_proportion=True)
        doc[0].get_pixmap(dpi=72).save(os.path.join(work, f"_sheet-{k // per_sheet + 1}.png"))


if __name__ == "__main__":
    if len(sys.argv) != 2 or not sys.argv[1].isdigit():
        sys.exit("usage: python scripts/uceed/extract.py <year>")
    main(sys.argv[1])
