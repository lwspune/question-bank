"""
Re-render a printed figure at 300 dpi with its faint strokes darkened, for a
figure that is a drawing (not a schematic) and so is kept, not redrawn.

    python scripts/homi-bhabha/clean.py <paper> <pdf name> --q=89[,90]

Reads the figure's page + region from data/<paper>.merged.json, renders that
region of SOURCE_ROOT/<pdf> at 300 dpi, applies the tone curve the README's
"Figures that read badly as scanned" section describes (paper white from 238;
everything darker pulled down by a power curve, so a pencil grey becomes a
clear line) and trims to the ink. Writes cleaned/<paper>/qNNN.png; point the
band files' figure.cleaned at it, run crop.py, look, then refigure.ts.
Every mark is still the printed one.
"""
import json
import os
import sys

import fitz
from PIL import Image, ImageOps

LANE = os.path.dirname(os.path.abspath(__file__))
SOURCE_ROOT = os.environ.get("HOMI_BHABHA_SRC", r"C:\Vilas\LWS_Pune\Homi_Bhabha\papers")
WHITE = 238  # paper: anything this light or lighter becomes white
POWER = 2.2  # >1 darkens mid-greys more than near-blacks


def tone(v: int) -> int:
    if v >= WHITE:
        return 255
    return round(255 * (v / WHITE) ** POWER)


def main() -> None:
    paper, pdf = sys.argv[1], sys.argv[2]
    q_arg = next(a for a in sys.argv[3:] if a.startswith("--q="))
    nums = [int(x) for x in q_arg[4:].split(",")]
    merged = json.load(open(os.path.join(LANE, "data", f"{paper}.merged.json"), encoding="utf-8"))
    byn = {int(q["number"]): q for q in merged["questions"]}
    doc = fitz.open(os.path.join(SOURCE_ROOT, pdf))
    out = os.path.join(LANE, "cleaned", paper)
    os.makedirs(out, exist_ok=True)
    for n in nums:
        fig = byn[n]["figure"]
        page = doc[int(fig["page"]) - 1]
        l, t, r, b = fig.get("region") or [0, 0, 1, 1]
        W, H = page.rect.width, page.rect.height
        pix = page.get_pixmap(dpi=300, clip=fitz.Rect(l * W, t * H, r * W, b * H))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("L").point(tone)
        ink = ImageOps.invert(im).getbbox()
        if ink:
            pad = 12
            im = im.crop((max(0, ink[0] - pad), max(0, ink[1] - pad), min(im.width, ink[2] + pad),
                          min(im.height, ink[3] + pad)))
        path = os.path.join(out, f"q{n:03d}.png")
        im.save(path)
        print(f"cleaned: {paper} Q{n} -> {path} ({im.width}x{im.height})")


if __name__ == "__main__":
    main()
