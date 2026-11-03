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
# "Q.01" (2018 on) or "3." (2015-2017). A number counts as a new question only when it is
# the NEXT one in sequence, so a numbered list or a table cell inside a question cannot split it.
MARKER = re.compile(r"^\s*(?:Q\.?\s?)?(\d{1,3})(?:\.(?!\d)|\)|(?=\s)|$)\.?")
OPTION = re.compile(r"^\s*\(?([A-D])[.)]\s+(.*)$")
TINY = 40  # px: bullets and icons, not figures


def main(year: str) -> None:
    pdf = fitz.open(os.path.join(ROOT, "src", f"{year}-paper.pdf"))
    work = os.path.join(ROOT, "work", year)
    figs = os.path.join(ROOT, "figures", year)
    os.makedirs(work, exist_ok=True)
    os.makedirs(figs, exist_ok=True)

    # One stream of items in reading order: text lines and pictures, each with its page + y.
    items = []
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
                items.append((pno, r.y0, r.x0, "image", xref))
    items.sort(key=lambda t: (t[0], round(t[1]), t[2]))

    questions: dict[int, dict] = {}
    current = None
    for pno, _y, _x, kind, payload in items:
        if kind == "text":
            m = MARKER.match(payload)
            expected = (current["n"] + 1) if current else 1
            if m and int(m.group(1)) == expected:
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
        files = save_figure(pdf, q["xrefs"], os.path.join(figs, f"Q{n:02d}.png"))
        drafts.append({
            "n": n, "page": q["page"], "text": " ".join(stem), "options": options,
            "figure": os.path.basename(files) if files else None, "pictures": len(q["xrefs"]),
        })
    with open(os.path.join(work, "draft.json"), "w", encoding="utf-8") as f:
        json.dump({"year": int(year), "questions": drafts}, f, ensure_ascii=False, indent=2)
    contact_sheets(figs, work, drafts)
    # Every page as an image, so whoever reads the draft can check it against the paper.
    pages = os.path.join(work, "pages")
    os.makedirs(pages, exist_ok=True)
    for pno, page in enumerate(pdf):
        page.get_pixmap(dpi=110).save(os.path.join(pages, f"p{pno + 1:02d}.png"))
    with_fig = sum(1 for d in drafts if d["figure"])
    print(f"{year}: {len(drafts)} questions, {with_fig} with a figure, "
          f"{sum(d['pictures'] for d in drafts)} pictures -> {work}")


def save_figure(pdf, xrefs, path):
    if not xrefs:
        if os.path.exists(path):
            os.remove(path)
        return None
    pix = [fitz.Pixmap(pdf, x) for x in dict.fromkeys(xrefs)]
    pix = [fitz.Pixmap(fitz.csRGB, p) if p.n - p.alpha != 3 or p.alpha else p for p in pix]
    if len(pix) == 1:
        pix[0].save(path)
        return path
    # Several pictures in one question: stack them, scaled to one width, 12px apart.
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
    return path


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
