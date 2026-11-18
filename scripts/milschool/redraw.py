"""Redraw figures a candidate's pen, or the scan's printed serial number, made
unreadable as printed.

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


def _font(name: str, size: int):
    from PIL import ImageFont
    try:
        return ImageFont.truetype(rf"C:\Windows\Fonts\{name}", size)
    except OSError:
        return ImageFont.load_default()


def _hatch(im, box, kind):
    # fill box (x0, y0, x1, y1) with diagonal ("m") or cross ("s") hatching
    x0, y0, x1, y1 = (int(v) for v in box)
    w, h = x1 - x0, y1 - y0
    if w <= 2 or h <= 2:
        return
    tile = Image.new("RGB", (w, h), "white")
    t = ImageDraw.Draw(tile)
    if kind == "m":
        for k in range(-h, w, 6):
            t.line([(k, h), (k + h, 0)], fill="black", width=1)
    else:
        for x in range(5, w, 5):
            t.line([(x, 0), (x, h)], fill="black", width=1)
        for y in range(5, h, 5):
            t.line([(0, y), (w, y)], fill="black", width=1)
    im.paste(tile, (x0, y0))


def _arc(d, c, r, a0, a1, width=2):
    # an angle mark from math angle a0 to a1 (degrees, anticlockwise, y up)
    box = (c[0] - r, c[1] - r, c[0] + r, c[1] + r)
    d.arc(box, -a1, -a0, fill="black", width=width)


def aissee_9_2025_q14() -> Image.Image:
    # Parallelogram ABCD with diagonals AC and BD meeting at O; the angle
    # DAC (between AD and AC) marked 45 degrees, angle AOB (below O) marked
    # 110 degrees. The scan's serial number is printed across A and its 45
    # degree mark; the stem states both angles, which settle the marks.
    import math
    W, H = 560, 300
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    A, B, C, D = (40, 250), (420, 245), (490, 52), (110, 55)
    d.line([A, B, C, D, A], fill="black", width=3)
    d.line([A, C], fill="black", width=2)
    d.line([B, D], fill="black", width=2)
    # O = intersection of AC and BD
    (x1, y1), (x2, y2), (x3, y3), (x4, y4) = A, C, B, D
    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    O = (x1 + t * (x2 - x1), y1 + t * (y2 - y1))

    def ang(p, q):
        return math.degrees(math.atan2(-(q[1] - p[1]), q[0] - p[0]))

    _arc(d, A, 34, ang(A, C), ang(A, D))
    a_oa, a_ob = ang(O, A) % 360, ang(O, B) % 360   # angle AOB is the one below O
    _arc(d, O, 26, a_ob, a_oa) if a_ob < a_oa else _arc(d, O, 26, a_oa, a_ob)
    f = _font("times.ttf", 24)
    d.text((66, 196), "45°", fill="black", font=_font("times.ttf", 18))
    d.text((O[0] - 22, O[1] + 30), "110°", fill="black", font=_font("times.ttf", 20))
    for label, (x, y) in {"A": (18, 252), "B": (410, 252), "C": (496, 26), "D": (98, 22), "O": (O[0] - 8, O[1] - 32)}.items():
        d.text((x, y), label, fill="black", font=f)
    return im


def aissee_9_2025_q36() -> Image.Image:
    # Double bar graph, Manufacture (diagonal hatching) beside Sale (cross
    # hatching) for Jan, Feb, March, April, each bar labelled with its value
    # as printed: 700/400, 500/250, 600/350, 450/620. The scan's serial
    # number is printed down the middle of the chart.
    W, H = 600, 360
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    f, fs = _font("times.ttf", 20), _font("times.ttf", 17)
    x0, y0, top = 95, 300, 40          # axis origin; y of value 0
    unit = (y0 - 70) / 700            # 700 at y=70
    d.line([(x0, y0), (x0, top)], fill="black", width=2)
    d.line([(x0, y0), (580, y0)], fill="black", width=2)
    for v in range(100, 701, 100):
        y = y0 - v * unit
        d.line([(x0 - 8, y), (x0, y)], fill="black", width=2)
        d.text((x0 - 50, y - 10), str(v), fill="black", font=fs)
    label = Image.new("RGB", (220, 26), "white")
    ImageDraw.Draw(label).text((0, 0), "Quantity of an item", fill="black", font=fs)
    im.paste(label.rotate(90, expand=True), (10, 80))

    def bar(x, v, kind):
        y = y0 - v * unit
        w = 30
        _hatch(im, (x + 2, y + 2, x + w - 1, y0 - 1), kind)
        d.rectangle([x, y, x + w, y0], outline="black", width=2)
        d.text((x - 2, y - 24), str(v), fill="black", font=fs)

    data = [("Jan", 700, 400), ("Feb", 500, 250), ("March", 600, 350), ("April", 450, 620)]
    for i, (m, a, b) in enumerate(data):
        x = 125 + i * 115
        bar(x, a, "m")
        bar(x + 34, b, "s")
        d.text((x + 34 - len(m) * 5, y0 + 6), m, fill="black", font=f)
    # x-axis title with dashed arrows either side
    d.text((290, 330), "Month", fill="black", font=f)
    for xa, xb in ((110, 280), (360, 560)):
        for x in range(xa, xb, 10):
            d.line([(x, 342), (min(x + 5, xb), 342)], fill="black", width=1)
    d.polygon([(105, 342), (117, 337), (117, 347)], fill="black")
    d.polygon([(565, 342), (553, 337), (553, 347)], fill="black")
    # legend
    for x, kind, name in ((260, "m", "Manufacture"), (420, "s", "Sale")):
        _hatch(im, (x + 2, 14, x + 19, 31), kind)
        d.rectangle([x, 12, x + 20, 32], outline="black", width=2)
        d.text((x + 26, 10), name, fill="black", font=f)
    return im


def aissee_9_2025_q37() -> Image.Image:
    # Pie chart with five sectors; going clockwise from the line to the left:
    # 54, 36, 72, 54 and 144 degrees, the 144 degree sector (lower left)
    # labelled Household Expenditure, each angle marked at the centre as
    # printed. The scan's serial number is printed across the right edge.
    import math
    W, H = 470, 340
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    c, r = (235, 172), 150
    d.ellipse([c[0] - r, c[1] - r, c[0] + r, c[1] + r], outline="black", width=3)
    a = 161.0
    bounds = [a]
    for step in (54, 36, 72, 54, 144):
        a -= step
        bounds.append(a)
    for b in bounds[:-1]:
        d.line([c, (c[0] + r * math.cos(math.radians(b)), c[1] - r * math.sin(math.radians(b)))], fill="black", width=2)
    fs = _font("times.ttf", 17)
    for (hi, lo), text, rad in zip(zip(bounds, bounds[1:]), ("54°", "36°", "72°", "54°", "144°"), (20, 30, 20, 30, 24)):
        _arc(d, c, rad, lo, hi)
        mid = math.radians((hi + lo) / 2)
        lr = 50 if text != "144°" else 56
        d.text((c[0] + lr * math.cos(mid) - 14, c[1] - lr * math.sin(mid) - 10), text, fill="black", font=fs)
    f = _font("times.ttf", 21)
    d.text((140, 232), "Household", fill="black", font=f)
    d.text((136, 256), "Expenditure", fill="black", font=f)
    return im


if __name__ == "__main__":
    save("rms-cet-6-2024", 128, rms_cet_6_2024_q128())
    save("rms-cet-9-2024", 126, rms_cet_9_2024_q126())
    save("rms-cet-9-2024", 133, rms_cet_9_2024_q133())
    save("aissee-9-2025", 14, aissee_9_2025_q14())
    save("aissee-9-2025", 36, aissee_9_2025_q36())
    save("aissee-9-2025", 37, aissee_9_2025_q37())
    print("redrawn: rms-cet-6-2024 q128, rms-cet-9-2024 q126 q133, aissee-9-2025 q14 q36 q37")
