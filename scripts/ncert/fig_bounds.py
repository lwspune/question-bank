# -*- coding: utf-8 -*-
"""Measure figure crop bboxes off a vector NCERT page, by CAPTION.

    python scripts/ncert/fig_bounds.py <pdf> <page>:<caption>:<ref> [...] [--out F]

Emits the attach-images manifest shape: [{ref, fig, page, bbox}], bbox fractional.

THE THREE RULES, each of which cost a bad crop before it was one:

1. SOLID INK ONLY. A candidate rect must be >= 2pt in BOTH dimensions. Prose
   carries vector ink -- fraction bars, square-root vincula, fill-in-the-blank
   underlines -- and those are hairlines. On Ch.5 Fig 5.7 the unfiltered bounds
   swallowed the entire left text column. (Ch.6 found this first: "prose carries
   vector ink".)

2. PAGE FURNITURE IS NOT ART. Drop any rect wider than half the page: the rule
   under the running head is ~0.84 page-widths and otherwise dominates every
   bound on the page.

3. TEXT MUST BE CONTAINED, NOT MERELY OVERLAPPING. A figure's own labels are
   admitted only if the whole line sits inside the padded ink window. A prose
   line starts at the left margin and overlaps every figure on its row, which is
   how three Ch.7 crops swallowed the text column.

AND THE RULE THAT IS NOT AUTOMATABLE: look at the result. On Ch.5 the contact
sheet found 3 of 5 crops wrong AFTER the geometry said they were fine, and on
Ch.6 it found 6 of 22. Geometry proposes; the eye disposes. Use --sheet.
"""
import sys, json, io, os

import fitz


def bounds_for(page, caption, pad=0.012, left_extra=0.0):
    W, H = page.rect.width, page.rect.height
    cap = None
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            if "".join(s["text"] for s in l["spans"]).strip() == caption:
                cap = l["bbox"]
    if cap is None:
        raise SystemExit(f"caption {caption!r} not found on page {page.number}")
    cx0, cy0, cx1, cy1 = cap

    # rule 1 + rule 2
    cands = [r for r in (d["rect"] for d in page.get_drawings())
             if r.width >= 2 and r.height >= 2
             and r.width < 0.5 * W and r.height < 0.6 * H]
    # the figure sits directly ABOVE its caption, within about half a page
    near = [r for r in cands if r.y1 <= cy0 + 2 and r.y0 >= cy0 - 0.55 * H]
    if not near:
        raise SystemExit(f"no ink above caption {caption!r}")
    # the frame is the largest such rect; fall back to the union when there is none
    frame = max(near, key=lambda r: r.width * r.height)
    fx0, fy0, fx1, fy1 = frame.x0, frame.y0, frame.x1, frame.y1
    for r in near:
        if r.x0 >= fx0 - 0.08 * W and r.x1 <= fx1 + 0.08 * W and r.y0 >= fy0 - 0.12 * H:
            fx0, fy0 = min(fx0, r.x0), min(fy0, r.y0)
            fx1, fy1 = max(fx1, r.x1), max(fy1, r.y1)

    mx, my = 0.075 * W, 0.055 * H
    tx0, ty0, tx1, ty1 = fx0, fy0, fx1, fy1
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            bx0, by0, bx1, by1 = l["bbox"]
            t = "".join(s["text"] for s in l["spans"]).strip()
            if not t:
                continue
            if t.startswith("Fig.") and t != caption:
                continue
            # rule 3
            if not (bx0 >= fx0 - mx and bx1 <= fx1 + mx):
                continue
            # Vertically the admissible band runs from just above the ink to the
            # CAPTION'S BASELINE and no further. Anything below the caption is the
            # next paragraph, and anything well above it is the previous one; both
            # leaked into Ch.8's crops when the band was a fixed margin instead.
            if by0 < fy0 - my or by1 > cy1 + 2:
                continue
            tx0, ty0 = min(tx0, bx0), min(ty0, by0)
            tx1, ty1 = max(tx1, bx1), max(ty1, by1)
    tx0, tx1, ty1 = min(tx0, cx0), max(tx1, cx1), max(ty1, cy1)
    tx0 -= left_extra * W
    return [round(max(0.0, tx0 / W - pad), 4), round(max(0.0, ty0 / H - pad), 4),
            round(min(1.0, tx1 / W + pad), 4), round(min(1.0, ty1 / H + pad), 4)]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    pdf, specs = args[0], args[1:]
    out_path = None
    sheet_dir = None
    for f in flags:
        if f.startswith("--out="):
            out_path = f.split("=", 1)[1]
        if f.startswith("--sheet="):
            sheet_dir = f.split("=", 1)[1]
    d = fitz.open(pdf)
    man = []
    for spec in specs:
        parts = spec.split(":")
        pno, caption, ref = int(parts[0]), parts[1], parts[2]
        left_extra = float(parts[3]) if len(parts) > 3 else 0.0
        bbox = bounds_for(d[pno], caption, left_extra=left_extra)
        man.append({"ref": ref, "fig": caption, "page": pno, "bbox": bbox})
        print(f"{ref:14} {caption:10} bbox={bbox}")
    if out_path:
        io.open(out_path, "w", encoding="utf-8", newline="\n").write(
            json.dumps(man, indent=2, ensure_ascii=False) + "\n")
        print("wrote", out_path)
    if sheet_dir:
        from PIL import Image, ImageDraw
        os.makedirs(sheet_dir, exist_ok=True)
        imgs = []
        for m in man:
            p = d[m["page"]]
            W, H = p.rect.width, p.rect.height
            x0, y0, x1, y1 = m["bbox"]
            pix = p.get_pixmap(matrix=fitz.Matrix(2.2, 2.2),
                               clip=fitz.Rect(x0 * W, y0 * H, x1 * W, y1 * H))
            n = m["ref"].replace(" ", "_").replace(".", "")
            path = f"{sheet_dir}/{n}.png"
            pix.save(path)
            imgs.append((n, Image.open(path)))
        WW = max(i.width for _, i in imgs) + 20
        HH = sum(i.height + 34 for _, i in imgs) + 20
        sheet = Image.new("RGB", (WW, HH), "white")
        dr = ImageDraw.Draw(sheet)
        y = 10
        for n, im in imgs:
            dr.text((10, y), n, fill="red")
            y += 24
            sheet.paste(im, (10, y))
            dr.rectangle([10, y, 10 + im.width, y + im.height], outline="red")
            y += im.height + 10
        sheet.save(f"{sheet_dir}/_sheet.png")
        print("sheet", f"{sheet_dir}/_sheet.png", sheet.width, "x", sheet.height)


if __name__ == "__main__":
    main()
