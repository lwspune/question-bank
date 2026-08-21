"""
Crop Chapter 3's figures out of the printed page.

The figures are VECTOR drawings, not embedded rasters (checked: 9 embedded
images across the chapter, none of them a numbered figure), so there is nothing
to extract losslessly — they have to be rendered and cropped, the same approach
`snapCrop` takes elsewhere in this repo.

Method: find each "Fig ..." caption, take the vector drawings sitting ABOVE it
in the same column, and union their boxes. Then WIDEN to the caption, because a
caption is usually wider than the artwork and clipping it loses the figure's
number — and the slides refer to figures by number.

    python scripts/ppt/motion-in-a-plane/extract_figures.py

Every crop must still be looked at. This script gets the box approximately
right; only the eye catches a clipped axis label.
"""
import json
import re
import sys
from pathlib import Path

import fitz

PDF = Path(r"C:/tmp/Practice/Physics/11th_Topics/03. Motion in a Plane.pdf")
OUT = Path(__file__).parent / "figures"
ZOOM = 3.0
PAD = 4.0

# "Fig 3.1 (a): ...", "Fig.3.5: ...", and — with NO colon at all —
# "Fig. 3.4 (a) Motion in two dimensions". The colon is optional; requiring it
# silently dropped both halves of Fig 3.4.
CAPTION = re.compile(r"^Fig\.?\s*(3\.\d+)\s*(\([a-e]\))?\s*[:.]?\s+\S", re.I)

# Manual box overrides, in PDF points (x0, y0, x1, y1). Filled in after LOOKING
# at a rendered crop — never guessed.
#
# 3.6 is the one figure the automatic box gets wrong at BOTH ends: it opens over
# "The unit of omega is radian/sec." (too short to trip the prose test — 27
# chars but the wrong shape) and closes over the "3.4.2 Expression for
# Centripetal Acceleration" heading. Rather than loosen two rules that are
# correct for the other fourteen, this box is stated outright. Verified against
# the rendered page: y0 clears the prose line, y1 sits on the caption baseline.
OVERRIDES: dict[str, tuple[float, float, float, float]] = {
    "3.6": (299.6, 303.0, 499.2, 466.0),
}

# Captions (and their wrapped continuation lines) are set in this colour; body
# text is 2301728. Measured, not guessed — all 15 captions use it.
CAPTION_COLOUR = 15466636


def caption_spans(page):
    """Every caption line on the page, as (key, bbox)."""
    found = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(s["text"] for s in line["spans"]).strip()
            m = CAPTION.match(text)
            if not m:
                continue
            key = m.group(1) + (m.group(2) or "").strip("()")
            found.append((key, fitz.Rect(line["bbox"]), text))
    return found


def drawing_boxes(page):
    out = []
    for d in page.get_drawings():
        r = fitz.Rect(d["rect"])
        if r.width < 1 or r.height < 1:
            continue
        out.append(r)
    return out


def text_lines(page):
    """Every text line as (text, rect, colour-of-first-span)."""
    out = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            spans = line["spans"]
            txt = "".join(s["text"] for s in spans).strip()
            if txt:
                out.append((txt, fitz.Rect(line["bbox"]), spans[0]["color"]))
    return out


def trim_bleed(page, box, caption_rect):
    """
    Drop body prose caught above the artwork.

    The box is a union of nearby vector paths, and a rule belonging to the
    paragraph ABOVE drags the top edge over a line of text: Fig 3.4(a) came out
    carrying "at point P at time t1 as shown in Fig. 3.4", Fig 3.6 carried "he
    unit of omega is radian/sec."

    A figure's OWN labels are black text inside the box too, so colour alone
    cannot separate them. The first attempt used WIDTH, and that clipped the
    tops off Fig 3.4(a), 3.4(b) and 3.7 — a row of figure labels can be as wide
    as a sentence. What actually separates them is SHAPE: prose is a long run of
    words, a label is a word or a symbol.

        "at point P at time t1 as shown in Fig. 3.4"   42 chars, 9 spaces
        "he unit of omega is radian/sec."              27 chars, 5 spaces
        "Velocity" / "(O,O)" / "time t"                short, 0-1 spaces

    The page is TWO-COLUMN, so the line must also overlap this figure's own
    column. Without that check the left column's prose raised the floor of a
    right-column figure and cut the top off Fig 3.4(a) — the defect survived a
    rewrite of the prose test precisely because the column was never the thing
    being tested.
    """
    cutoff = box.y0 + box.height * 0.3
    floor = box.y0
    for txt, r, colour in text_lines(page):
        if colour == CAPTION_COLOUR or r.intersects(caption_rect):
            continue
        if r.y1 <= box.y0 or r.y1 > cutoff:
            continue
        if r.x1 < box.x0 + 5 or r.x0 > box.x1 - 5:
            continue  # the other column
        if len(txt) >= 25 and txt.count(" ") >= 4:
            floor = max(floor, r.y1)
    return fitz.Rect(box.x0, floor, box.x1, box.y1)


def extend_to_caption_tail(page, box, caption_rect):
    """
    Include a caption's continuation lines, and nothing else.

    Captions wrap — "Fig 3.1 (b): Object with uniform velocity / along +ve
    x-axis." — and cropping at the first line leaves half a sentence. The
    continuation is set in the SAME colour as the caption, which is what
    separates it from the body paragraph that follows; matching on proximity
    alone pulled in "Thus, we resolve tension T ..." under Fig 3.7.
    """
    # Starts at the caption, NOT at box.y1 — starting at box.y1 could only ever
    # grow the box, so it could not clamp anything.
    bottom = caption_rect.y1
    cursor = caption_rect.y1
    for txt, r, colour in sorted(text_lines(page), key=lambda x: x[1].y0):
        if r.y0 < caption_rect.y1 - 1:
            continue
        if r.x1 < caption_rect.x0 - 10 or r.x0 > caption_rect.x1 + 10:
            continue
        if colour != CAPTION_COLOUR or CAPTION.match(txt):
            break  # body text, or the next figure's caption — stop here
        if r.y0 > cursor + caption_rect.height * 1.2:
            break  # a gap: no longer this caption's tail
        bottom = max(bottom, r.y1)
        cursor = r.y1
    # The caption is the bottom-most part of a figure by definition, so CLAMP
    # to it rather than taking the max: the drawing union can reach below the
    # caption and swallow the next section heading (Fig 3.6 came out carrying
    # "3.4.2 Expression for Centripetal Acceleration").
    return fitz.Rect(box.x0, box.y0, box.x1, bottom)


def figure_box(page, caption_rect, boxes, ceiling):
    """
    Union of the drawings that sit above this caption and overlap its column.

    `ceiling` stops the box swallowing the previous figure or a paragraph of
    body text that happens to contain a rule.
    """
    col_lo = caption_rect.x0 - 40
    col_hi = caption_rect.x1 + 40
    picked = [
        r
        for r in boxes
        if r.y1 <= caption_rect.y0 + 2
        and r.y0 >= ceiling
        and r.x1 > col_lo
        and r.x0 < col_hi
    ]
    if not picked:
        return None
    box = picked[0]
    for r in picked[1:]:
        box |= r
    # Include the caption itself: the figure NUMBER is what the slide cites.
    box |= caption_rect
    return box


# Figures the book presents as a SET. One slide teaches "reading an x-t graph"
# off all five cases at once, so they are stitched into one panel rather than
# split across five slides.
COMPOSITES = [
    ("3.1", ["3.1a", "3.1b", "3.1c", "3.1d", "3.1e"], 3),
    ("3.2", ["3.2a", "3.2b", "3.2c", "3.2d"], 2),
]


def compose(name, keys, cols, manifest):
    """Stitch a figure set into one image on a white ground."""
    try:
        from PIL import Image
    except ImportError:
        print("  !! Pillow not installed — composites skipped")
        return None
    files = [OUT / manifest[k]["file"] for k in keys if k in manifest]
    if len(files) != len(keys):
        print(f"  !! composite {name}: missing panels, skipped")
        return None

    images = [Image.open(f).convert("RGB") for f in files]
    # Scale every panel to a common HEIGHT so the rows line up; panels differ in
    # aspect because each is cropped to its own artwork.
    target = max(im.height for im in images)
    scaled = [
        im.resize((max(1, round(im.width * target / im.height)), target))
        for im in images
    ]
    gap = 18
    col_w = max(im.width for im in scaled)
    rows = (len(scaled) + cols - 1) // cols
    sheet = Image.new(
        "RGB",
        (cols * col_w + (cols + 1) * gap, rows * target + (rows + 1) * gap),
        "white",
    )
    for i, im in enumerate(scaled):
        x = gap + (i % cols) * (col_w + gap) + (col_w - im.width) // 2
        y = gap + (i // cols) * (target + gap)
        sheet.paste(im, (x, y))
    out_name = f"fig{name.replace('.', '_')}_set.png"
    sheet.save(OUT / out_name)
    return out_name


# Supabase rejects an object over 1 MB (MAX_SIZE_BYTES in src/lib/storage), and
# it rejects it by THROWING — a near-full-page colour figure simply fails to
# upload. Ported from scripts/mh-ssc-10/attach-images.ts, which met this on a
# Geography panorama that rendered at 7.2 MB.
#
# Physics is line art and lands ~51 KB at 3x, so the first rung is 3x and
# everything that already fits is byte-identical to before this existed. The
# ladder is for CHEMISTRY: apparatus diagrams and colour structures are the ones
# that will blow the cap, and a scan is already lossy, so JPEG (also an
# ALLOWED_MIME) costs nothing real and keeps the figure legible.
STORAGE_BUDGET = int(1024 * 1024 * 0.95)  # headroom under the hard cap
PNG_SCALES = (3.0, 2.5, 2.0)
JPEG_QUALITIES = (88, 80, 70, 60)


def render_within_budget(page, box, stem: str):
    """Render a clip small enough to upload. Returns (filename, note)."""
    for scale in PNG_SCALES:
        data = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=box).tobytes("png")
        if len(data) <= STORAGE_BUDGET:
            name = f"{stem}.png"
            (OUT / name).write_bytes(data)
            note = "" if scale == PNG_SCALES[0] else f" [{scale}x to fit]"
            return name, f"{len(data)//1024} KB{note}"

    from PIL import Image  # only needed on the fallback path
    import io as _io

    pix = page.get_pixmap(matrix=fitz.Matrix(3.0, 3.0), clip=box)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    for q in JPEG_QUALITIES:
        buf = _io.BytesIO()
        img.save(buf, "JPEG", quality=q, optimize=True)
        # The last rung ships even if still over budget — better a loud upload
        # failure naming the file than a silently dropped figure.
        if buf.tell() <= STORAGE_BUDGET or q == JPEG_QUALITIES[-1]:
            name = f"{stem}.jpg"
            (OUT / name).write_bytes(buf.getvalue())
            return name, f"{buf.tell()//1024} KB [jpeg q{q}]"
    raise AssertionError("unreachable")


def main() -> int:
    if not PDF.exists():
        print(f"source not found: {PDF}")
        return 1
    OUT.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF)
    manifest = {}

    for pno, page in enumerate(doc):
        captions = caption_spans(page)
        if not captions:
            continue
        boxes = drawing_boxes(page)
        # Process top-down per column so each figure's ceiling is the bottom of
        # the one above it.
        captions.sort(key=lambda c: (round(c[1].x0 / 100), c[1].y0))
        ceilings: dict[int, float] = {}
        for key, rect, text in captions:
            col = round(rect.x0 / 100)
            ceiling = ceilings.get(col, 0.0)
            box = OVERRIDES.get(key)
            box = fitz.Rect(*box) if box else figure_box(page, rect, boxes, ceiling)
            if box is None:
                print(f"  !! no drawings found for Fig {key} on p{pno}")
                continue
            overridden = key in OVERRIDES
            raw_top = box.y0
            if not overridden:
                box = trim_bleed(page, box, rect)
                box = extend_to_caption_tail(page, box, rect)
            # Pad sideways freely, but NOT past the edges the two steps above
            # deliberately chose: padding the top by 4pt walked straight back
            # over the prose line trim_bleed had just excluded (a sliver of
            # descenders), and padding the bottom reached the section heading
            # under Fig 3.6.
            if not overridden:
                box = fitz.Rect(
                    box.x0 - PAD,
                    box.y0 - (PAD if box.y0 <= raw_top + 0.5 else 0.5),
                    box.x1 + PAD,
                    box.y1 + 0.5,
                )
            box &= page.rect
            name, note = render_within_budget(page, box, f"fig{key.replace('.', '_')}")
            manifest[key] = {
                "file": name,
                "page": pno,
                "box": [round(v, 1) for v in (box.x0, box.y0, box.x1, box.y1)],
                "caption": text,
            }
            ceilings[col] = box.y1
            print(f"  Fig {key:<6} p{pno:<3} {name:<16} {note}")

    for name, keys, cols in COMPOSITES:
        made = compose(name, keys, cols, manifest)
        if made:
            manifest[name] = {"file": made, "panels": keys}
            print(f"  composite {name:<8} {made} ({len(keys)} panels)")

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\n{len(manifest)} figures written to {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
