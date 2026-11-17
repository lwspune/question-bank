"""Redraw figures a candidate's pen made unreadable as printed.

    python -P scripts/milschool/redraw.py

Writes scripts/milschool/redrawn/<paper>/qNNN.png. A figure's `redrawn` field
(crop.py) points at the file. Each drawing records why its shape is certain:
redraw only what the print itself settles, never a guess.
"""
import os
from PIL import Image, ImageDraw

LANE = os.path.dirname(os.path.abspath(__file__))


def save(paper: str, n: int, im: Image.Image) -> None:
    out = os.path.join(LANE, "redrawn", paper)
    os.makedirs(out, exist_ok=True)
    im.save(os.path.join(out, f"q{n:03d}.png"))


def rms_cet_6_2024_q128() -> Image.Image:
    # A triangle cut by three lines from its apex to the base. Settled by the
    # print: the candidate numbered the parts 1-4 (four parts = three lines),
    # and the options are 5, 7, 10, 12 (three lines give 10, four would give
    # 15, not an option). The photo's extra strokes are the candidate's pen.
    W, H = 640, 300
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    apex = (320, 30)
    base_l, base_r, base_y = (40, 600, 270)
    d.polygon([apex, (base_l, base_y), (base_r, base_y)], outline="black", width=3)
    for x in (170, 320, 470):
        d.line([apex, (x, base_y)], fill="black", width=3)
    return im


if __name__ == "__main__":
    save("rms-cet-6-2024", 128, rms_cet_6_2024_q128())
    print("redrawn: rms-cet-6-2024 q128")
