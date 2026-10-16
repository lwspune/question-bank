"""Reading sheets for one TCS shift (2022-2024 response sheets): what the transcriber reads.

    python -P scripts/ssc-cgl/tcs_sheets.py <shiftId>

Reads out/<shiftId>/questions.json (assemble-tcs.ts) for each question's printed regions,
and renders them from a MASKED copy of the PDF page:
- the option text's key colours (green = correct, red = wrong) are repainted the body's dark
  grey in the content stream, so every option prints alike;
- the tick and cross icons beside the options are painted over in white;
- the right-hand panel (Question ID, Status, Chosen Option: the candidate's own answer) is
  painted over in white.
It then checks the masked page: any text left in a key colour inside a region aborts the run.
Writes out/<shiftId>/sheets/qNNN.png (one question, its GLOBAL number on top; a sheet prints
the number within its section) and batch-NNN-MMM.png (consecutive questions). text.txt, the
text layer, is written beside them by assemble-tcs.ts.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF
from PIL import Image, ImageDraw, ImageFont

ZOOM = 2.0
PAD = 4  # points around a region
BATCH_HEIGHT = 2600
DARK = b"0.14502 0.14502 0.14502"
# Fills (rg) AND strokes (RG): the 2022 print underlines option text in the key colours.
FILL = re.compile(rb"(\d*\.?\d+) (\d*\.?\d+) (\d*\.?\d+) (rg|RG)")
PANEL_LABEL = re.compile(r"^(Question ID|Option \d ID|Status|Chosen Option)\s*:")
LEFT = 4  # the 2022 vector print frames its questions from x 9
GLYPH = re.compile(r"^(X|,Z|[✓✔✗✘])$")


def keyish(c):
    r, g, b = (c >> 16) & 255, (c >> 8) & 255, c & 255
    return (r - g >= 80 and r - b >= 80) or (g - r >= 40 and g - b >= 40)


def is_icon(bbox, labels):
    """A tick or cross: a small image ending just left of an option's "n." label on its line.
    Small images elsewhere are content (9 Sep 2024 Q52 prints options 2-4 as 6x9 pt pictures)."""
    x0, y0, x1, y1 = bbox
    if x1 - x0 >= 20 or y1 - y0 >= 16:
        return False
    mid = (y0 + y1) / 2
    return any(abs((l[1] + l[3]) / 2 - mid) < 7 and x1 <= l[0] + 1 and l[0] - x1 < 25 for l in labels)


def is_icon_picture(info):
    """The vector print's tick (84x84 px in 2022, 23x23 in 2023) and cross (31x21 px), drawn under 20x16 pt."""
    x0, y0, x1, y1 = info["bbox"]
    w, h = info.get("width", 0), info.get("height", 0)
    small = x1 - x0 < 20 and y1 - y0 < 16
    tick = (w >= 60 and h >= 60) or (20 <= w <= 26 and abs(w - h) <= 2)
    return small and (tick or (25 <= w <= 40 and 15 <= h <= 25 and w > h))


# A 2023 scan's raster first page: the tick and crosses stand in this column (points), between
# "Ans" (ends ~66) and the option number "1." (starts ~90).
SCAN_ICONS = (66, 90)


def is_key_pixel(r, g, b):
    return (g >= 120 and g - r >= 60 and g - b >= 60) or (r >= 180 and r - g >= 120 and r - b >= 120)


def white_scan_icons(page, marks):
    """White out the icon column on each option row of a raster page. The rows are the scan
    marks tcs_extract.py read (the same ones that gave the key): masking can't find them by
    colour, since the X is near-black and only the option number carries the red."""
    for m in marks:
        yc = (m["y0"] + m["y1"]) / 2
        page.draw_rect(fitz.Rect(SCAN_ICONS[0], yc - 7, SCAN_ICONS[1], yc + 7), color=None, fill=(1, 1, 1), overlay=True)


def align_scan_rows(img, marks, top):
    """On a raster page the tick is wider than the cross, so the KEYED option's number prints
    ~2 pt right of the others: an indent that gives the key away. Shift each option row so its
    number starts where the other rows' numbers start. `top` is the crop's top in points."""
    px = img.load()
    z = ZOOM
    x0, x1 = int((SCAN_ICONS[1] - LEFT) * z), int((112 - LEFT) * z)

    def band(m):
        yc = (m["y0"] + m["y1"]) / 2
        return max(0, int((yc - 7 - top) * z)), min(img.height, int((yc + 7 - top) * z))

    def first_ink(m):
        a, b = band(m)
        xs = [x for x in range(x0, min(x1, img.width)) for y in range(a, b) if sum(px[x, y]) < 450]
        return min(xs) if xs else None

    starts = [(m, first_ink(m)) for m in marks]
    found = sorted(s for _, s in starts if s is not None)
    if not found:
        return img
    base = found[0]
    # Shift only the option text span, so the frame lines either side never jog.
    xr = min(img.width, int((540 - LEFT) * z))
    for m, s in starts:
        if s is None or s <= base:
            continue
        a, b = band(m)
        d = s - base
        row = img.crop((x0 + d, a, xr, b))
        tail = img.crop((xr - d, a, xr, b))  # the scan's own off-white, not pure white
        img.paste(row, (x0, a))
        img.paste(tail, (xr - d, a))
    # An indent left behind would be the key: every row must now start in the same place.
    after = {first_ink(m) for m in marks} - {None}
    if after and max(after) - min(after) > 1:
        sys.exit(f"option rows still start at different x after realigning: {sorted(after)}")
    return img


def unkey_scan(img):
    """Turn any key-coloured pixel left on a raster crop (option text) dark grey."""
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            if is_key_pixel(*px[x, y]):
                px[x, y] = (37, 37, 37)
    return img


def key_pixels(img):
    """Pixels in the tick's green or the cross's red: what a masked sheet must not show."""
    n = 0
    for r, g, b in img.getdata():
        if (g > 150 and g - r > 70 and g - b > 70) or (r > 200 and r - g > 140 and r - b > 140):
            n += 1
    return n


def mask_page(doc, page):
    """Repaint key colours, white out icons, tick glyphs and the panel's lines."""
    # Option labels, read BEFORE the colours are repainted: "1." to "4." in green or red.
    option_labels = [
        s["bbox"] for b in page.get_text("dict")["blocks"] if b["type"] == 0 for l in b["lines"] for s in l["spans"]
        if keyish(s["color"]) and re.match(r"^[1-4]\.", s["text"].strip())
    ]
    for xref in page.get_contents():
        stream = doc.xref_stream(xref)
        # Any key-coloured fill (each year prints its own green and red) becomes the body grey.
        def repaint(m):
            r, g, b = (min(255, round(float(v) * 255)) for v in m.groups()[:3])
            return DARK + b" " + m.group(4) if keyish((r << 16) | (g << 8) | b) else m.group(0)
        stream = FILL.sub(repaint, stream)
        doc.update_stream(xref, stream)
    spans = [s for b in page.get_text("dict")["blocks"] if b["type"] == 0 for l in b["lines"] for s in l["spans"]]
    labels = [s for s in spans if PANEL_LABEL.match(s["text"].strip())]
    white = lambda r: page.draw_rect(fitz.Rect(r) + (-1, -1, 1, 1), color=None, fill=(1, 1, 1), overlay=True)
    # The panel is its LINES: a label and the value right of it on the same line. Not
    # everything right of an x: a stem line's tail can print there (11 Sep 2024 Q48).
    for l in labels:
        white((l["bbox"][0], l["bbox"][1], page.rect.width, l["bbox"][3]))
    # The 18 Jul 2023 print sets the tick and cross as coloured text glyphs.
    for s in spans:
        if GLYPH.match(s["text"].strip()) and keyish(s["color"]):
            white(s["bbox"])
    for info in page.get_image_info():
        if is_icon(info["bbox"], option_labels) or is_icon_picture(info):
            page.draw_rect(fitz.Rect(info["bbox"]) + (-1, -1, 1, 1), color=None, fill=(1, 1, 1), overlay=True)
    # The 2022 vector print draws the panel as a white box with a grey border: paint it out.
    for dr in page.get_drawings():
        r = dr["rect"]
        if r.width > 150 and 25 < r.height < 80 and r.x0 > page.rect.width * 0.45 and dr.get("fill") == (1.0, 1.0, 1.0):
            white(r)


def check_masked(page, clip, where):
    for b in page.get_text("dict", clip=clip)["blocks"]:
        if b["type"] != 0:
            continue
        for l in b["lines"]:
            for s in l["spans"]:
                if keyish(s["color"]) and s["text"].strip():
                    sys.exit(f"{where}: key colour survived masking: {s['text'][:40]!r}")


def label(img, text):
    font = ImageFont.load_default(size=30)
    head = Image.new("RGB", (img.width, 44), "white")
    ImageDraw.Draw(head).text((8, 6), text, fill=(180, 0, 0), font=font)
    out = Image.new("RGB", (img.width, img.height + 44), "white")
    out.paste(head, (0, 0))
    out.paste(img, (0, 44))
    return out


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: tcs_sheets.py <shiftId>")
    shift = sys.argv[1]
    base = os.path.dirname(os.path.abspath(__file__))
    qfile = os.path.join(base, "out", shift, "questions.json")
    data = json.load(open(qfile, encoding="utf8"))
    if data.get("format") != "tcs":
        sys.exit(f"{qfile} is not a TCS shift: use sheets.py")
    out_dir = os.path.join(base, "out", shift, "sheets")
    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(out_dir):  # a rerun's batches can split differently: never leave an old one
        if f.startswith("batch-") and f.endswith(".png"):
            os.remove(os.path.join(out_dir, f))
    doc = fitz.open(data["pdf"])
    geom = os.path.join(os.path.dirname(data["imgDir"]), "geometry.json")
    marks = json.load(open(geom, encoding="utf8")).get("marks", []) if os.path.exists(geom) else []
    masked = set()
    crops = []
    for q in data["questions"]:
        parts = []
        for r in q["regions"]:
            page = doc[r["page"]]
            if r["page"] not in masked:
                mask_page(doc, page)
                white_scan_icons(page, [m for m in marks if m["page"] == r["page"]])
                masked.add(r["page"])
            clip = fitz.Rect(LEFT, r["y0"] - PAD, page.rect.width - 20, r["y1"] + PAD)
            check_masked(page, clip, f"{shift} Q{q['number']}")
            pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip)
            part = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            if r.get("raster"):
                mine = [m for m in marks if m["page"] == r["page"] and r["y0"] <= m["y0"] and m["y1"] <= r["y1"]]
                part = unkey_scan(align_scan_rows(part, mine, clip.y0))
            parts.append(part)
        img = Image.new("RGB", (max(p.width for p in parts), sum(p.height for p in parts)), "white")
        y = 0
        for p in parts:
            img.paste(p, (0, y))
            y += p.height
        stray = key_pixels(img)
        if stray > 40:
            pictured = q["stemImages"] or any(q["options"])
            # Only a picture (a coloured chart) may carry these colours; on a text-only
            # question they are the key showing through, so stop.
            if not pictured:
                sys.exit(f"{shift} Q{q['number']}: {stray} key-coloured pixels survive masking on a question with no picture")
            print(f"  ! {shift} Q{q['number']}: {stray} key-coloured pixels on a pictured question (a coloured chart?): look")
        img = label(img, f"Q{q['number']}")
        img.save(os.path.join(out_dir, f"q{q['number']:03d}.png"))
        crops.append((q["number"], img))

    batch, height = [], 0
    def flush():
        if not batch:
            return
        w = max(i.width for _, i in batch)
        sheet = Image.new("RGB", (w, sum(i.height + 12 for _, i in batch)), "white")
        y = 0
        for _, i in batch:
            sheet.paste(i, (0, y))
            y += i.height + 12
        sheet.save(os.path.join(out_dir, f"batch-{batch[0][0]:03d}-{batch[-1][0]:03d}.png"))
    for n, img in crops:
        if batch and height + img.height > BATCH_HEIGHT:
            flush()
            batch, height = [], 0
        batch.append((n, img))
        height += img.height + 12
    flush()
    print(f"{shift}: {len(crops)} question sheets + batches -> {out_dir}")


if __name__ == "__main__":
    main()
