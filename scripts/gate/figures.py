"""
GATE lane, step 6: each question's figure, from the draft's hints, as one image.

    python -P -E scripts/gate/figures.py 2026-cs1

Reads the helper's hints in <ROOT>/blind/<paper>/derived.json (`figureFiles`: pictures from
work/<paper>/cand/, `figureBox`: {page, top, bottom, left?, right?} drawn on the page), overridden per
question by scripts/gate/data/<paper>.settle.json, which can also give `figureOptions`: four
pictures for picture options A-D, drawn under the stem in labelled panels.

Writes <ROOT>/figures/<paper>/Q<nn>.png (white background, trimmed to the ink) and
<ROOT>/figures/<paper>/sheet.png, every figure labelled. LOOK at the sheet: a figure the
hints got wrong is fixed in settle.json and this is re-run.
"""
import json
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageDraw, ImageFont, ImageOps

sys.path.insert(0, str(Path(__file__).parent))  # our own lane folder only (run with -P)
from pdfclean import clean_doc  # noqa: E402

ROOT = Path(r"C:\tmp\PYQPs\GATE\CS")
DATA = Path(__file__).parent / "data"
DPI = 200
PAD = 16
# Option labels must read on a phone: Arial (on every Windows machine) at the paper's scale.
LABEL_FONT = ImageFont.truetype("arial.ttf", 30)


def trim(im: Image.Image) -> Image.Image:
    """Crop to the ink (anything darker than near-white) with a small margin."""
    gray = ImageOps.invert(im.convert("L")).point(lambda v: 255 if v > 24 else 0)
    box = gray.getbbox()
    if not box:
        return im
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - PAD), max(0, y0 - PAD), min(im.width, x1 + PAD), min(im.height, y1 + PAD)))


def strip_frame(im: Image.Image) -> Image.Image:
    """White out the question box's border lines a page crop catches: a column (row) of ink
    running 85%+ of the crop's height (width), within the outer 12% of its width (height).
    A figure's own long line sits inside it, never hugging the crop's edge. Repeats until
    the edge is clean, since a trim can expose the next border in."""
    import numpy as np

    a = np.array(im.convert("RGB"))
    for _ in range(3):
        ink = a.min(axis=2) < 235  # a light grey border counts too
        h, w = ink.shape
        cols = [x for x in range(w) if (x < 0.12 * w or x > 0.88 * w) and ink[:, x].mean() > 0.85]
        rows = [y for y in range(h) if (y < 0.12 * h or y > 0.88 * h) and ink[y, :].mean() > 0.85]
        if not cols and not rows:
            break
        a[:, cols] = 255
        a[rows, :] = 255
    return Image.fromarray(a)


def flat(im: Image.Image) -> Image.Image:
    """Any transparency onto white."""
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


def from_box(doc, box) -> Image.Image:
    page = doc[box["page"]]
    r = page.rect
    # left/right (fractions of the page width) keep a question box's border lines out.
    clip = fitz.Rect(r.width * box.get("left", 0.05), r.height * box["top"], r.width * box.get("right", 0.95), r.height * box["bottom"])
    pix = page.get_pixmap(dpi=DPI, clip=clip)
    return trim(strip_frame(trim(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))))


def stack(parts, gap=PAD) -> Image.Image:
    w = max(p.width for p in parts)
    h = sum(p.height for p in parts) + gap * (len(parts) - 1)
    out = Image.new("RGB", (w, h), "white")
    y = 0
    for p in parts:
        out.paste(p, (0, y))
        y += p.height + gap
    return out


def option_grid(parts) -> Image.Image:
    """Four option pictures, two per row, each under its printed label (A)-(D)."""
    cell_w = max(p.width for p in parts) + 2 * PAD
    cell_h = max(p.height for p in parts) + 56
    out = Image.new("RGB", (cell_w * 2, cell_h * 2), "white")
    draw = ImageDraw.Draw(out)
    for k, p in enumerate(parts):
        x, y = (k % 2) * cell_w, (k // 2) * cell_h
        draw.text((x + PAD, y + 6), f"({'ABCD'[k]})", fill="black", font=LABEL_FONT)
        out.paste(p, (x + PAD, y + 48))
    return out


def main(paper):
    draft = json.loads((ROOT / "blind" / paper / "derived.json").read_text(encoding="utf-8"))
    settle_file = DATA / f"{paper}.settle.json"
    settle = json.loads(settle_file.read_text(encoding="utf-8")) if settle_file.exists() else {}
    doc, _ = clean_doc(ROOT / "src" / f"{paper}-paper.pdf")  # no logo, no watermarked background
    cand = ROOT / "work" / paper / "cand"
    out_dir = ROOT / "figures" / paper
    out_dir.mkdir(parents=True, exist_ok=True)

    made = []
    for q in sorted(draft["questions"], key=lambda q: q["n"]):
        s = settle.get(str(q["n"]), {})
        if not s.get("figure", q.get("figure")):
            continue
        files = s.get("figureFiles", q.get("figureFiles") or [])
        box = s.get("figureBox", q.get("figureBox"))
        boxes = box if isinstance(box, list) else ([box] if box else [])
        parts = [from_box(doc, b) for b in boxes] + [trim(flat(Image.open(cand / f))) for f in files]
        opts = s.get("figureOptions")
        if opts:
            parts.append(option_grid([trim(flat(Image.open(cand / f))) for f in opts]))
        if not parts:
            print(f"  Q{q['n']}: figure set but no files and no box")
            continue
        im = stack(parts)
        name = out_dir / f"Q{q['n']:02d}.png"
        im.save(name)
        made.append((q["n"], name))

    sheet_parts = []
    for n, name in made:
        im = Image.open(name).convert("RGB")
        im.thumbnail((900, 700))
        label = Image.new("RGB", (im.width, 30), "white")
        ImageDraw.Draw(label).text((4, 8), f"Q{n}", fill="red")
        sheet_parts.append(stack([label, im], gap=0))
    if sheet_parts:
        stack(sheet_parts, gap=24).save(out_dir / "sheet.png")
    print(f"{paper}: {len(made)} figure(s): {', '.join(f'Q{n}' for n, _ in made)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: figures.py <year>-cs<set>")
    main(sys.argv[1])
