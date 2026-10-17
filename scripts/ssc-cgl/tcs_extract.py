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
import re
import os
import sys

import fitz  # PyMuPDF
from PIL import Image

ICON_W = 20


def is_scan(page, blocks):
    """A page that is one raster picture (the 2023 scans' first page per sheet)."""
    w, h = page.rect.width, page.rect.height
    return any(b["type"] == 1 and b["bbox"][2] - b["bbox"][0] > w * 0.9 and b["bbox"][3] - b["bbox"][1] > h * 0.9 for b in blocks)


def scan_marks(page, pno):
    """The tick (green) and crosses (red) read off a scanned page's pixels, one per option row,
    in the icon column only (x 60-98 pt), so coloured option text further right is not read."""
    z = 2
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z), clip=fitz.Rect(60, 0, 98, page.rect.height))
    s, n, w = pix.samples, pix.n, pix.width
    rows = {}
    for y in range(pix.height):
        for x in range(w):
            i = (y * w + x) * n
            r, g, b = s[i], s[i + 1], s[i + 2]
            kind = "tick" if g >= 120 and g - r >= 60 and g - b >= 60 else "cross" if r >= 180 and r - g >= 120 and r - b >= 120 else None
            if kind:
                rows.setdefault(y, {}).setdefault(kind, []).append(x)
    marks, cur = [], None
    for y in sorted(rows):
        kind = max(rows[y], key=lambda k: len(rows[y][k]))
        xs = rows[y][kind]
        if cur and cur["kind"] == kind and y - cur["_y"] <= 3:
            cur["_y"], cur["_n"] = y, cur["_n"] + len(xs)
            cur["x0"], cur["x1"] = min(cur["x0"], min(xs)), max(cur["x1"], max(xs))
            cur["y1"] = y
        else:
            cur = {"kind": kind, "y0": y, "y1": y, "x0": min(xs), "x1": max(xs), "_y": y, "_n": len(xs)}
            marks.append(cur)
    return [{"page": pno, "kind": m["kind"], "x0": round(60 + m["x0"] / z, 1), "y0": round(m["y0"] / z, 1),
             "x1": round(60 + m["x1"] / z, 1), "y1": round(m["y1"] / z, 1)} for m in marks if m["_n"] >= 8]


DO = re.compile(rb"/([^\s/<>\[\]()]+)\s+Do\b")


def drawn_images(doc, page):
    """The page's image XObjects in DRAWING order, following Form XObjects (the CGL 2024 Tier II
    print draws each page inside one). PyMuPDF's own image-to-place mapping goes by content
    digest, so two pictures sharing a base image (a solid black block whose glyphs live in its
    soft mask, every option of 20 Jan 2025 Q19) come back as the same object; the Do order does
    not."""
    names = {}  # (referencer xref, name) -> ("image" | "form", xref)
    for im in page.get_images(full=True):
        names[(im[9], im[7])] = ("image", im[0])
    for xo in page.get_xobjects():
        names[(xo[2], xo[1])] = ("form", xo[0])
    out = []

    def walk(stream, referencer):
        for m in DO.finditer(stream):
            hit = names.get((referencer, m.group(1).decode("latin1")))
            if not hit:
                continue
            kind, xref = hit
            if kind == "form":
                walk(doc.xref_stream(xref), xref)
            else:
                out.append(xref)

    for c in page.get_contents():
        walk(doc.xref_stream(c), 0)
    return out


def page_image_xrefs(doc, page, blocks):
    """Each picture block of the page, in order, paired with the image object drawn there, and
    the drawn objects left unpaired (a hosting site's header logo can report a different size)."""
    # An INLINE image (BI .. EI: this print's cross icons) is a picture block with no Do, so a
    # block whose size is not the next drawn object's is skipped as inline; every drawn object
    # must still find its block, in order.
    pics = [b for b in blocks if b["type"] == 1]
    xrefs = drawn_images(doc, page)
    sizes = [(doc.extract_image(x)["width"], doc.extract_image(x)["height"]) for x in xrefs]
    pairing, k = {}, 0
    for b in pics:
        if k < len(xrefs) and sizes[k] == (b.get("width"), b.get("height")):
            pairing[id(b)] = xrefs[k]
            k += 1
    return pairing, xrefs[k:]


def save_image(doc, b, xref, path):
    """Save one picture. One with a soft mask (black glyphs on a transparent ground) is saved
    through its mask onto white; saved raw it is a solid black box (20 Jan 2025 Q19, Q25)."""
    smask = doc.extract_image(xref).get("smask", 0) if xref else 0
    if smask:
        base = fitz.Pixmap(doc, xref)
        if base.n - base.alpha > 3:
            base = fitz.Pixmap(fitz.csRGB, base)
        if base.alpha:
            base = fitz.Pixmap(base, 0)
        rgba = fitz.Pixmap(base, fitz.Pixmap(doc, smask))
        img = Image.frombytes("RGBA", (rgba.width, rgba.height), rgba.samples)
        flat = Image.new("RGB", img.size, "white")
        flat.paste(img, mask=img.split()[3])
        flat.save(path)
        return
    pix = fitz.Pixmap(b["image"])
    if pix.n - pix.alpha > 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    pix.save(path)


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
    spans, images, icons, panels, frames, marks = [], [], [], [], [], []
    unpaired_masked = []
    for pno, page in enumerate(doc):
        if not first - 1 <= pno <= last - 1:
            continue
        blocks = page.get_text("dict")["blocks"]
        pairing, unpaired = page_image_xrefs(doc, page, blocks)
        # A soft-masked object left unpaired would be saved raw, i.e. as a black box: report it.
        for x in unpaired:
            if doc.extract_image(x).get("smask"):
                info = doc.extract_image(x)
                unpaired_masked.append(f"page {pno}: masked picture {info['width']}x{info['height']} not paired, saved raw")
        if is_scan(page, blocks):
            marks += scan_marks(page, pno)
        k = 0
        # The right-hand panel box (Question ID / Status / Chosen Option): a white box with a
        # grey border. The 2022 vector print has no text layer, so it is found as a drawing.
        for dr in page.get_drawings():
            r = dr["rect"]
            box = {"page": pno, "x0": round(r.x0, 1), "y0": round(r.y0, 1), "x1": round(r.x1, 1), "y1": round(r.y1, 1)}
            if r.width > 150 and 25 < r.height < 80 and r.x0 > page.rect.width * 0.45 and dr.get("fill") == (1.0, 1.0, 1.0):
                panels.append(box)
            # A question's frame: a wide grey-stroked box, one per page the question covers.
            c = dr.get("color")
            if r.width > page.rect.width * 0.8 and r.height > 20 and dr.get("fill") is None and c and all(abs(v - 0.6) < 0.05 for v in c):
                frames.append(box)
        for b in blocks:
            if b["type"] == 1:
                x0, y0, x1, y1 = b["bbox"]
                if x1 - x0 < ICON_W and y1 - y0 < 16:
                    # Tick/cross icons: kept apart, with pixel size (the 2022 vector print
                    # draws its tick 84x84 and its cross 31x21, so the size IS the key).
                    icons.append({"page": pno, "x0": round(x0, 1), "y0": round(y0, 1), "x1": round(x1, 1), "y1": round(y1, 1),
                                  "w": b.get("width"), "h": b.get("height")})
                    if x0 < 90:
                        continue
                name = f"p{pno:03d}_{k:02d}.png"
                k += 1
                path = os.path.join(img_dir, name)
                if not os.path.exists(path):
                    save_image(doc, b, pairing.get(id(b), 0), path)
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
        json.dump({"format": "tcs", "pdf": os.path.basename(pdf), "pages": doc.page_count, "spans": spans, "images": images,
                   "icons": icons, "panels": panels, "frames": frames, "marks": marks}, f, ensure_ascii=False)
    sizes = {}
    for u in unpaired_masked:
        sizes[u.split("masked picture ")[1].split(" ")[0]] = sizes.get(u.split("masked picture ")[1].split(" ")[0], 0) + 1
    if sizes:
        print(f"  ! unpaired masked pictures by size (a header logo repeats on every page; anything else needs a look): {sizes}")
    print(f"{day}: {doc.page_count} pages, {len(spans)} spans, {len(images)} images, {len(icons)} icons, {len(panels)} panels, {len(frames)} frames, {len(marks)} scan marks -> {out_dir}")


if __name__ == "__main__":
    main()
