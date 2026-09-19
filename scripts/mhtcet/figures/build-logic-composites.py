"""Rebuild the composite stem figures the legacy Mathematical Logic rows need.

    python scripts/mhtcet/figures/build-logic-composites.py

Some MHT-CET switching-circuit questions print SEVERAL circuits inside one stem
("which of the following is the pair of equivalent circuits? (i) ... (v)") and
answer them with TEXT options ("(i) and (iii)"). pandoc extracts those circuits
as separate PNGs, but `questions.image_url` holds a single path — so the five
pictures have to become one picture before they can be attached.

Reads the pandoc-extracted media under scripts/mhtcet/out/media/<shiftId>/media/
(gitignored, regenerate with scripts/mhtcet/extract.ts) and writes the composites
to scripts/mhtcet/out/media/legacy-composites/. Both ends are disposable: the
durable artifact is this recipe plus the source .docx.

The roman labels are drawn HERE because the source PNGs do not contain them --
in the .docx they are separate text runs sitting between the images, so a bare
stack would leave the option text ("(i) and (iii)") pointing at nothing.
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "out", "media")
OUT_DIR = os.path.join(ROOT, "legacy-composites")

# One entry per question whose stem prints multiple circuits.
# (shiftId, [image basenames in printed order], [labels], output name)
COMPOSITES = [
    (
        "2023-may-02-s2",
        ["image15.png", "image16.png", "image17.png", "image18.png", "image19.png"],
        ["(i)", "(ii)", "(iii)", "(iv)", "(v)"],
        "2023-may-02-s2-q150-stem.png",
    ),
]

TARGET_W = 330  # normalise widths: the source crops vary 292-417px wide
PAD, LBL_H, GAP, COLS = 12, 30, 16, 2


def load_font():
    try:
        return ImageFont.truetype("arial.ttf", 22)
    except OSError:
        return ImageFont.load_default()


def build(shift_id, names, labels, out_name):
    base = os.path.join(ROOT, shift_id, "media")
    missing = [n for n in names if not os.path.exists(os.path.join(base, n))]
    if missing:
        raise SystemExit(
            "missing extracted media for %s: %s\n"
            "run: npx tsx scripts/mhtcet/extract.ts <QP.docx> <AK.docx> %s"
            % (shift_id, ", ".join(missing), shift_id)
        )

    imgs = []
    for n in names:
        im = Image.open(os.path.join(base, n)).convert("RGB")
        w, h = im.size
        imgs.append(im.resize((TARGET_W, max(1, round(h * TARGET_W / w))), Image.LANCZOS))

    rows = (len(imgs) + COLS - 1) // COLS
    row_h = [0] * rows
    for i, im in enumerate(imgs):
        r = i // COLS
        row_h[r] = max(row_h[r], im.size[1] + LBL_H + 2 * PAD)

    cell_w = TARGET_W + 2 * PAD
    canvas = Image.new("RGB", (COLS * cell_w + GAP, sum(row_h) + 2 * GAP), "white")
    draw = ImageDraw.Draw(canvas)
    font = load_font()

    y = 0
    for r in range(rows):
        x = 0
        for c in range(COLS):
            i = r * COLS + c
            if i >= len(imgs):
                break
            draw.text((x + PAD, y + PAD), labels[i], fill="black", font=font)
            canvas.paste(imgs[i], (x + PAD, y + PAD + LBL_H))
            x += cell_w + GAP
        y += row_h[r] + GAP

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, out_name)
    canvas.save(out_path, optimize=True)
    print("%s  %dx%d  %d bytes" % (out_name, canvas.size[0], canvas.size[1], os.path.getsize(out_path)))


def main():
    for spec in COMPOSITES:
        build(*spec)
    print("\nwrote %d composite(s) to %s" % (len(COMPOSITES), OUT_DIR))


if __name__ == "__main__":
    sys.exit(main())
