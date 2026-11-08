"""
Page renders and figure crops for the IAT lane.

    python scripts/iat/pages.py render 2025            # every page -> C:\\tmp\\PYQPs\\IAT\\render\\2025\\pNN.png
    python scripts/iat/pages.py crop 2025 Chemistry    # every figure of that paper
    python scripts/iat/pages.py crop 2025 Chemistry 7  # just these refs
    python scripts/iat/pages.py sheet 2025 Chemistry   # one image of every crop, to look at

Renders are for READING (150 dpi). Crops are cut from the PDF itself at 220 dpi
with `region` = [left, top, right, bottom] as fractions of the page, then the
white margin is trimmed. Regions are a transcriber's estimate, so every crop is
looked at (`sheet`) before it is used; fix one by editing its region and
re-cropping that ref.

File names: `<ref>.png` for a stem figure, `<ref>-opt<N>.png` for PRINTED
option N. In a keyed year printed option 1 is IISER's answer, so these files
never go to a solver under these names (dump-for-derivation.ts renames them to
stored letters).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageChops

ROOT = Path(r"C:\tmp\PYQPs\IAT")
DATA = Path(__file__).resolve().parent / "data"
# Mirrors IAT_YEARS in config.ts.
FILES = {
    2017: "2017_Eng_IAT.pdf", 2018: "2018_Eng_IAT.pdf", 2019: "2019_Eng_IAT.pdf",
    2021: "2021_Eng_IAT.pdf", 2022: "2022-eng-IAT.pdf", 2023: "2023-eng-IAT.pdf",
    2024: "2024_Eng_IAT.pdf", 2025: "English-Key_IAT-2025.pdf", 2026: "English_Key_IAT 2026_final.pdf",
}


def pdf(year: int) -> fitz.Document:
    return fitz.open(ROOT / "src" / FILES[year])


def render(year: int, dpi: int = 150) -> None:
    out = ROOT / "render" / str(year)
    out.mkdir(parents=True, exist_ok=True)
    doc = pdf(year)
    for i, page in enumerate(doc):
        page.get_pixmap(dpi=dpi).save(out / f"p{i + 1:02d}.png")
    print(f"{len(doc)} pages -> {out}")


def trim(img: Image.Image, pad: int = 10) -> Image.Image:
    bg = Image.new(img.mode, img.size, (255, 255, 255))
    box = ImageChops.difference(img, bg).convert("L").point(lambda v: 255 if v > 40 else 0).getbbox()
    if not box:
        return img
    l, t, r, b = box
    return img.crop((max(0, l - pad), max(0, t - pad), min(img.width, r + pad), min(img.height, b + pad)))


def cut(doc: fitz.Document, fig: dict, dest: Path) -> None:
    page = doc[int(fig["page"].lstrip("p")) - 1]
    w, h = page.rect.width, page.rect.height
    l, t, r, b = fig["region"]
    pix = page.get_pixmap(dpi=220, clip=fitz.Rect(l * w, t * h, r * w, b * h))
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    trim(img).save(dest)


def crop(year: int, subject: str, refs: list[str]) -> None:
    stem = f"{year}-{subject}"
    paper = json.loads((DATA / f"{stem}.questions.json").read_text(encoding="utf-8"))
    out = ROOT / "figures" / stem
    out.mkdir(parents=True, exist_ok=True)
    doc = pdf(year)
    n = 0
    for row in paper["rows"]:
        if refs and row["ref"] not in refs:
            continue
        if row.get("figure"):
            cut(doc, row["figure"], out / f"{row['ref']}.png")
            n += 1
        for i, fig in enumerate(row.get("optionFigures") or []):
            cut(doc, fig, out / f"{row['ref']}-opt{i + 1}.png")
            n += 1
    print(f"{n} crop(s) -> {out}")


def sheet(year: int, subject: str) -> None:
    stem = f"{year}-{subject}"
    folder = ROOT / "figures" / stem
    files = sorted(folder.glob("*.png"), key=lambda p: (len(p.stem.split("-")[0]), p.stem))
    if not files:
        print("no crops")
        return
    imgs = [Image.open(f) for f in files]
    width = max(i.width for i in imgs)
    canvas = Image.new("RGB", (width + 120, sum(i.height + 30 for i in imgs)), "white")
    from PIL import ImageDraw
    d = ImageDraw.Draw(canvas)
    y = 0
    for f, i in zip(files, imgs):
        d.text((4, y + 4), f.stem, fill="red")
        canvas.paste(i, (110, y + 15))
        y += i.height + 30
    dest = ROOT / "figures" / f"{stem}-sheet.png"
    canvas.save(dest)
    print(dest)


if __name__ == "__main__":
    cmd, year = sys.argv[1], int(sys.argv[2])
    if cmd == "render":
        render(year)
    elif cmd == "crop":
        crop(year, sys.argv[3], sys.argv[4:])
    elif cmd == "sheet":
        sheet(year, sys.argv[3])
    else:
        raise SystemExit(f"unknown command {cmd}")
