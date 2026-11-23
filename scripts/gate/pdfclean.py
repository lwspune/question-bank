"""
A GATE paper with its page furniture removed, for cutting figures.

Every GATE master paper paints the same images on every page: a logo, and (2025, 2026) a
full-page background carrying the organising institute's watermark. A figure cut from the
rendered page picks the watermark up (ISC 2026 shipped 12 figures that way). Deleting the
images that recur on 5+ pages before rendering leaves the figure, its labels and any vector
drawing, and nothing behind them.
"""
from collections import Counter

import fitz  # PyMuPDF

FURNITURE_PAGES = 5


def furniture_sizes(doc) -> set:
    sizes = Counter()
    for page in doc:
        for info in page.get_image_info():
            sizes[(info["width"], info["height"])] += 1
    return {s for s, c in sizes.items() if c >= FURNITURE_PAGES}


def hide_translucent(doc) -> int:
    """Make every half-transparent graphics state fully transparent. GATE 2024 draws its
    "GATE 2024" watermark as grey shapes at fill opacity .50196 (one shared ExtGState);
    2026 has a 4% overlay. A figure's own ink is opaque, so it never uses one of these."""
    hidden = 0
    for x in range(1, doc.xref_length()):
        try:
            if doc.xref_get_key(x, "Type")[1] != "/ExtGState":
                continue
        except Exception:
            continue
        for key in ("ca", "CA"):
            kind, value = doc.xref_get_key(x, key)
            if kind in ("float", "real", "int"):
                if float(value) < 0.6:
                    doc.xref_set_key(x, key, "0")
                    hidden += 1
    return hidden


def clean_doc(path):
    """The paper, opened fresh, with every furniture image deleted from every page and its
    translucent watermark shapes hidden."""
    doc = fitz.open(path)
    hide_translucent(doc)
    furniture = furniture_sizes(doc)
    for page in doc:
        for img in page.get_images(full=True):
            xref, w, h = img[0], img[2], img[3]
            if (w, h) in furniture:
                page.delete_image(xref)
    return doc, furniture
