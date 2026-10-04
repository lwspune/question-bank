"""Build every brand icon from the V mark (2026-10-04).

    python scripts/brand/build_icons.py

Sources (assets/brand/):
  v-mark-source.png  the V with a transparent background, as supplied. Every
                     size from 32 px up is this drawing, scaled, untouched.
  v-mark-16.svg      a pageless V for 16 px only: the four fanned pages turn
                     to a smudge at that size. Rasterised with headless Edge
                     (set EDGE to its path if it is not the default).

Writes src/app/{favicon.ico, icon.png, apple-icon.png} (Next.js file
conventions emit the <link> tags) and public/icons/ (manifest, push, header).
push-192.png and push-badge-96.png keep their names because public/sw.js and
src/lib/push/core.ts point at them.

Tiles are white. A rounded tile has transparent corners; apple-icon and the
maskable icon are full-bleed squares because iOS and Android cut their own
shape. The badge is a white silhouette, since Android uses only its alpha.
"""
import io
import os
import struct
import subprocess
import tempfile
from PIL import Image, ImageDraw

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
BRAND = os.path.join(ROOT, "assets", "brand")
APP = os.path.join(ROOT, "src", "app")
ICONS = os.path.join(ROOT, "public", "icons")
EDGE = os.environ.get("EDGE", r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")
WHITE = (255, 255, 255, 255)
CLEAR = (0, 0, 0, 0)


def load_mark() -> Image.Image:
    src = Image.open(os.path.join(BRAND, "v-mark-source.png")).convert("RGBA")
    return src.crop(src.getchannel("A").point(lambda p: 255 if p > 20 else 0).getbbox())


def place(mark, size, width_frac, *, rounded, bg=WHITE, dy=0.01):
    """The mark centred on a square canvas, `width_frac` of the canvas wide."""
    canvas = Image.new("RGBA", (size, size), CLEAR)
    if bg[3]:
        fill = Image.new("RGBA", (size, size), bg)
        if rounded:
            m = Image.new("L", (size, size), 0)
            ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], round(size * 14 / 64), fill=255)
            canvas.paste(fill, (0, 0), m)
        else:
            canvas = fill
    w, h = mark.size
    k = size * width_frac / w
    v = mark.resize((round(w * k), round(h * k)), Image.LANCZOS)
    canvas.alpha_composite(v, ((size - v.size[0]) // 2, (size - v.size[1]) // 2 + round(size * dy)))
    return canvas


def render_svg(path, size=512) -> Image.Image:
    """Rasterise an SVG with headless Edge at `size` px (transparent background)."""
    with tempfile.TemporaryDirectory() as tmp:
        html = os.path.join(tmp, "r.html")
        with open(html, "w") as f:
            uri = "file:///" + path.replace("\\", "/")
            f.write(f'<html><body style="margin:0;background:transparent"><img src="{uri}" '
                    f'style="width:{size}px;height:{size}px;display:block"></body></html>')
        out = os.path.join(tmp, "r.png")
        subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                        "--default-background-color=00000000", f"--window-size={size},{size}",
                        f"--user-data-dir={os.path.join(tmp, 'p')}", f"--screenshot={out}",
                        "file:///" + html.replace("\\", "/")], check=True, capture_output=True)
        return Image.open(out).convert("RGBA").crop((0, 0, size, size)).copy()


def write_ico(path, images):
    """An .ico holding one PNG per size; Pillow's writer cannot take a
    hand-drawn image for one size, and 16 px is hand-drawn here."""
    blobs = []
    for im in images:
        b = io.BytesIO()
        im.save(b, "PNG")
        blobs.append((im.size[0], b.getvalue()))
    head = struct.pack("<HHH", 0, 1, len(blobs))
    offset, dirs, data = 6 + 16 * len(blobs), b"", b""
    for s, png in blobs:
        dirs += struct.pack("<BBBBHHII", s, s, 0, 0, 1, 32, len(png), offset + len(data))
        data += png
    with open(path, "wb") as f:
        f.write(head + dirs + data)


def badge(mark) -> Image.Image:
    """White silhouette; the white keyhole becomes a hole, as do the page gaps."""
    rgb = mark.convert("RGB")
    keyhole = rgb.convert("L").point(lambda p: 255 if p > 235 else 0)
    alpha = Image.composite(Image.new("L", mark.size, 0), mark.getchannel("A"), keyhole)
    sil = Image.new("RGBA", mark.size, (255, 255, 255, 0))
    sil.putalpha(alpha)
    return place(sil, 1024, 0.92, rounded=False, bg=CLEAR, dy=0).resize((96, 96), Image.LANCZOS)


def main():
    mark = load_mark()
    os.makedirs(ICONS, exist_ok=True)
    tile = place(mark, 1024, 0.80, rounded=True)
    size = lambda s: tile.resize((s, s), Image.LANCZOS)

    tile16 = render_svg(os.path.join(BRAND, "v-mark-16.svg")).resize((16, 16), Image.LANCZOS)
    write_ico(os.path.join(APP, "favicon.ico"), [tile16, size(32), size(48)])
    size(512).save(os.path.join(APP, "icon.png"))
    place(mark, 1024, 0.74, rounded=False).convert("RGB").resize((180, 180), Image.LANCZOS).save(os.path.join(APP, "apple-icon.png"))

    size(192).save(os.path.join(ICONS, "icon-192.png"))
    size(512).save(os.path.join(ICONS, "icon-512.png"))
    place(mark, 1024, 0.60, rounded=False).convert("RGB").resize((512, 512), Image.LANCZOS).save(os.path.join(ICONS, "icon-maskable-512.png"))
    size(192).save(os.path.join(ICONS, "push-192.png"))
    badge(mark).save(os.path.join(ICONS, "push-badge-96.png"))
    # Header: the V alone (a white tile would vanish on the white header).
    place(mark, 512, 0.96, rounded=False, bg=CLEAR, dy=0).resize((96, 96), Image.LANCZOS).save(os.path.join(ICONS, "mark-96.png"))
    # Homepage hero watermark: the V alone, shown faint (~14% opacity), so a
    # small WebP is enough and keeps the first screen light on phones.
    place(mark, 768, 0.96, rounded=False, bg=CLEAR, dy=0).resize((256, 256), Image.LANCZOS).save(os.path.join(ICONS, "mark-256.webp"), quality=82, method=6)
    print("wrote favicon.ico, icon.png, apple-icon.png and public/icons/*")


if __name__ == "__main__":
    main()
