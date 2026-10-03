"""Redraw figures that exist in NO copy of the source on this machine.

    python scripts/figures-fix/drawn/draw.py

Each drawing encodes only what the printed question, its official key and its
worked solution fix; anything the source does not determine is left out. A
manifest that uses one of these says "REDRAWN" in its note.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
INK = (25, 25, 25)
FONT = "C:/Windows/Fonts/times.ttf"
FONT_I = "C:/Windows/Fonts/timesi.ttf"


def font(size, italic=False):
    try:
        return ImageFont.truetype(FONT_I if italic else FONT, size)
    except OSError:
        return ImageFont.load_default()


def arrow(d, a, b, w=4, head=18):
    d.line([a, b], fill=INK, width=w)
    ang = math.atan2(b[1] - a[1], b[0] - a[0])
    for s in (-1, 1):
        d.line([b, (b[0] - head * math.cos(ang + s * 0.4), b[1] - head * math.sin(ang + s * 0.4))], fill=INK, width=w)


def neet_disc():
    """Pariksha 13177 Q6 (AIPMT 2005): disc radius R, mass 9M; a disc of radius
    R/3 removed. The key 4MR^2 forces the hole's centre to sit 2R/3 from O, so
    the hole touches the rim. Remaining disc shaded, hole white."""
    S = 900
    im = Image.new("RGB", (S, S), "white")
    d = ImageDraw.Draw(im)
    c, R = (S // 2, S // 2), 360
    r, off = R / 3, 2 * R / 3
    d.ellipse([c[0] - R, c[1] - R, c[0] + R, c[1] + R], fill=(205, 214, 230), outline=INK, width=5)
    hc = (c[0], c[1] - off)
    d.ellipse([hc[0] - r, hc[1] - r, hc[0] + r, hc[1] + r], fill="white", outline=INK, width=4)
    d.ellipse([c[0] - 7, c[1] - 7, c[0] + 7, c[1] + 7], fill=INK)
    d.text((c[0] - 48, c[1] - 22), "O", font=font(46, True), fill=INK)
    # radius R to the lower right
    e = (c[0] + R * math.cos(math.radians(35)), c[1] + R * math.sin(math.radians(35)))
    arrow(d, c, e)
    d.text(((c[0] + e[0]) / 2 + 6, (c[1] + e[1]) / 2 - 52), "R", font=font(48, True), fill=INK)
    # radius R/3 of the removed disc
    e2 = (hc[0] + r, hc[1])
    arrow(d, hc, e2, w=3, head=14)
    d.ellipse([hc[0] - 5, hc[1] - 5, hc[0] + 5, hc[1] + 5], fill=INK)
    d.text((hc[0] + 18, hc[1] - 58), "R/3", font=font(40, True), fill=INK)
    im.save(os.path.join(HERE, "neet-13177-q6-disc.png"), optimize=True)


def jee_charge_time():
    """JEE Main 28 Jan 2025 Q1: two capacitors in parallel across one battery;
    q-t graph. Key (d) and its solution use only that q2 > q1 at the same V,
    so the C2 curve is drawn above the C1 curve; no values are given."""
    W, H = 1000, 640
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    o = (110, 560)
    arrow(d, o, (o[0], 50))
    arrow(d, o, (W - 60, o[1]))
    d.text((o[0] - 70, 40), "q", font=font(50, True), fill=INK)
    d.text((W - 70, o[1] + 12), "t", font=font(50, True), fill=INK)
    d.text((o[0] - 40, o[1] + 6), "O", font=font(42, True), fill=INK)
    for qmax, label, col in ((420, "C\u2082", (30, 80, 170)), (250, "C\u2081", (190, 60, 40))):
        pts = []
        for i in range(0, 801):
            t = i / 800 * 8
            pts.append((o[0] + i, o[1] - qmax * (1 - math.exp(-t / 1.6))))
        d.line(pts, fill=col, width=6)
        d.text((o[0] + 800 - 70, pts[-1][1] - 64), label, font=font(48, True), fill=col)
    im.save(os.path.join(HERE, "jee-2025-jan28-q1-charge-time.png"), optimize=True)


if __name__ == "__main__":
    neet_disc()
    jee_charge_time()
    print("drawn")
