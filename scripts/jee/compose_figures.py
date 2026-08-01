"""
Stack several stem figures into ONE composite image.

Why this exists: a bank question carries a single `questions.image_url`, but an
organic-chemistry stem routinely prints two or three structures ("Statement-I:
the condensation between <A> and <B> produces <C>"). `attach-images` used to keep
only the FIRST, silently shipping a question that cannot be answered from what is
on screen. Across the extracted JEE Chemistry corpus that is 130 questions and
351 dropped figures (Physics 16 / Maths 2 — this is overwhelmingly an organic
shape). Compositing preserves every figure without touching the DB schema.

Vertical stack, white background, centred, with padding between panels and a thin
rule so two structures don't read as one drawing.

    python compose_figures.py <out.png> <in1.png> <in2.png> [...]

Prints the output path on success. Exits non-zero on any unreadable input rather
than silently composing a partial figure — a partial composite is the exact
failure mode this is meant to remove.
"""

import sys
from PIL import Image

PAD = 18          # px between panels
MARGIN = 12       # px around the whole composite
RULE = 1          # px separator thickness
RULE_GREY = (208, 208, 208)
BG = (255, 255, 255)
MAX_W = 1400      # cap so a wide panel can't blow past the storage limit


def load(path: str) -> Image.Image:
    img = Image.open(path)
    # Flatten transparency onto white; a transparent PNG renders black-on-black
    # in a dark-theme viewer.
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        flat = Image.new("RGB", img.size, BG)
        flat.paste(img, mask=img.split()[-1])
        return flat
    return img.convert("RGB")


def main() -> int:
    if len(sys.argv) < 4:
        print("usage: compose_figures.py <out.png> <in1> <in2> [...]", file=sys.stderr)
        return 2

    out_path = sys.argv[1]
    in_paths = sys.argv[2:]

    panels = []
    for p in in_paths:
        try:
            panels.append(load(p))
        except Exception as exc:  # noqa: BLE001 - any failure must be fatal
            print(f"FAILED to read {p}: {exc}", file=sys.stderr)
            return 1

    # Scale anything wider than the cap, preserving aspect ratio.
    scaled = []
    for img in panels:
        if img.width > MAX_W:
            h = round(img.height * MAX_W / img.width)
            img = img.resize((MAX_W, h), Image.LANCZOS)
        scaled.append(img)

    width = max(i.width for i in scaled) + 2 * MARGIN
    height = (
        sum(i.height for i in scaled)
        + PAD * (len(scaled) - 1)
        + 2 * MARGIN
    )

    canvas = Image.new("RGB", (width, height), BG)
    y = MARGIN
    for idx, img in enumerate(scaled):
        x = (width - img.width) // 2
        canvas.paste(img, (x, y))
        y += img.height
        if idx != len(scaled) - 1:
            rule_y = y + PAD // 2
            for dx in range(MARGIN * 2, width - MARGIN * 2):
                for dy in range(RULE):
                    canvas.putpixel((dx, rule_y + dy), RULE_GREY)
            y += PAD

    canvas.save(out_path, "PNG", optimize=True)
    print(out_path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
