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


def rms_cet_9_2024_q133() -> Image.Image:
    # Trapezium ABCD with AD and BC vertical (BC the longer, B above N), and
    # AN the horizontal height from A to BC. The photo shows this outline; the
    # candidate traced AD in pen and wrote the stem's lengths (7, 5, 11) and a
    # stray line inside it. The stem states every length, so none is drawn.
    from PIL import ImageFont
    W, H = 420, 300
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype(r"C:\Windows\Fonts\times.ttf", 26)
    except OSError:
        font = ImageFont.load_default()
    A, D = (70, 90), (70, 250)
    B, N, C = (330, 30), (330, 90), (330, 250)
    d.line([A, B, C, D, A], fill="black", width=3)
    # AN, dashed, with the right angle at N
    for x in range(A[0], N[0], 16):
        d.line([(x, 90), (min(x + 9, N[0]), 90)], fill="black", width=2)
    d.line([(312, 90), (312, 108), (330, 108)], fill="black", width=2)
    for label, (x, y) in {"A": (40, 72), "D": (40, 238), "B": (342, 12), "N": (342, 76), "C": (342, 238)}.items():
        d.text((x, y), label, fill="black", font=font)
    return im


def rms_cet_9_2024_q126() -> Image.Image:
    # Two parallel lines cut by a transversal rising to the right. Angles at
    # the upper crossing: 1 above-left, 2 above-right, 3 below-left, 4
    # below-right; at the lower crossing 5, 6, 7, 8 in the same places (as
    # printed). The candidate wrote over the printed "3" across the line.
    from PIL import ImageFont
    W, H = 460, 260
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype(r"C:\Windows\Fonts\timesi.ttf", 20)
    except OSError:
        font = ImageFont.load_default()

    def arrow_line(p, q):
        d.line([p, q], fill="black", width=2)
        for end, other in ((p, q), (q, p)):
            dx, dy = other[0] - end[0], other[1] - end[1]
            n = (dx * dx + dy * dy) ** 0.5
            ux, uy = dx / n, dy / n
            px, py = -uy, ux
            d.polygon([end, (end[0] + 12 * ux + 5 * px, end[1] + 12 * uy + 5 * py),
                       (end[0] + 12 * ux - 5 * px, end[1] + 12 * uy - 5 * py)], fill="black")

    y1, y2 = 75, 175
    arrow_line((20, y1), (420, y1))
    arrow_line((20, y2), (420, y2))
    # transversal: slope chosen so it crosses y1 at x=280 and y2 at x=170
    x1, x2 = 280, 170
    k = (x1 - x2) / (y2 - y1)
    arrow_line((x2 - k * (240 - y2), 240), (x1 + k * (y1 - 15), 15))
    for (cx, cy), labels in (((x1, y1), "1234"), ((x2, y2), "5678")):
        offs = [(-28, -30), (30, -30), (-44, 4), (12, 4)]
        for ch, (ox, oy) in zip(labels, offs):
            d.text((cx + ox, cy + oy), ch, fill="black", font=font)
    return im


if __name__ == "__main__":
    save("rms-cet-6-2024", 128, rms_cet_6_2024_q128())
    save("rms-cet-9-2024", 126, rms_cet_9_2024_q126())
    save("rms-cet-9-2024", 133, rms_cet_9_2024_q133())
    print("redrawn: rms-cet-6-2024 q128, rms-cet-9-2024 q126 q133")
