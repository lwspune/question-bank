"""
Dump a TCS-format SSC CGL day file (2022-2024 response sheets) to geometry for assembleTcs.

    python -P scripts/ssc-cgl/tcs_extract.py <dayId> "<day pdf>" [--pages=FROM-TO]

Writes out/<dayId>/geometry.json: every text span (page, bbox, text, colour, bold) and every
image (page, bbox, saved name). The question text IS the text layer here, and the key is the
colour of the option text, so this file holds the key: like questions.json, it is never
shown to a drafting agent. Images narrower than ICON_W at the left margin are the tick and
cross icons beside the options; they carry the key too and are not saved.
"""
import json
import os
import sys

import fitz  # PyMuPDF

ICON_W = 20


def main():
    if len(sys.argv) < 3:
        sys.exit("usage: tcs_extract.py <dayId> <pdfPath> [--pages=FROM-TO]")
    day, pdf = sys.argv[1], sys.argv[2]
    span_arg = next((a.split("=", 1)[1] for a in sys.argv[3:] if a.startswith("--pages=")), None)
    first, last = (int(x) for x in span_arg.split("-")) if span_arg else (1, 10**9)
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", day)
    img_dir = os.path.join(out_dir, "img")
    os.makedirs(img_dir, exist_ok=True)
    doc = fitz.open(pdf)
    spans, images = [], []
    for pno, page in enumerate(doc):
        if not first - 1 <= pno <= last - 1:
            continue
        blocks = page.get_text("dict")["blocks"]
        k = 0
        for b in blocks:
            if b["type"] == 1:
                x0, y0, x1, y1 = b["bbox"]
                if x1 - x0 < ICON_W and x0 < 90:
                    continue
                name = f"p{pno:03d}_{k:02d}.png"
                k += 1
                path = os.path.join(img_dir, name)
                if not os.path.exists(path):
                    pix = fitz.Pixmap(b["image"])
                    if pix.n - pix.alpha > 3:
                        pix = fitz.Pixmap(fitz.csRGB, pix)
                    pix.save(path)
                images.append({"page": pno, "name": name, "x0": round(x0, 1), "y0": round(y0, 1), "x1": round(x1, 1), "y1": round(y1, 1)})
                continue
            for line in b["lines"]:
                for s in line["spans"]:
                    if not s["text"].strip():
                        continue
                    x0, y0, x1, y1 = s["bbox"]
                    spans.append({
                        "page": pno,
                        "x0": round(x0, 1), "y0": round(y0, 1), "x1": round(x1, 1), "y1": round(y1, 1),
                        "text": s["text"],
                        "color": s["color"],
                        "bold": "Bold" in s["font"] or bool(s["flags"] & 16),
                    })
    with open(os.path.join(out_dir, "geometry.json"), "w", encoding="utf8") as f:
        json.dump({"format": "tcs", "pdf": os.path.basename(pdf), "pages": doc.page_count, "spans": spans, "images": images}, f, ensure_ascii=False)
    print(f"{day}: {doc.page_count} pages, {len(spans)} spans, {len(images)} images -> {out_dir}")


if __name__ == "__main__":
    main()
