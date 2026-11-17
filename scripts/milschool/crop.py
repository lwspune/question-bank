"""
Cut every figure the merged transcription asks for, from the rendered page.

    python -P scripts/milschool/crop.py <paperId>           # crop
    python -P scripts/milschool/crop.py <paperId> --sheet   # crop + one contact sheet to LOOK at

An item's `figure` is {page, region: [l, t, r, b] as fractions of out/<id>/pNN.png,
note}. Crops go to C:\\Vilas\\LWS_Pune\\Sainik_Schools\\figures\\<id>\\qNNN.png (the path
figures.ts names). The sheet is written to out/<id>/_figures.png; a person checks
every crop against its note before the commit.
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

FIGURE_ROOT = r"C:\Vilas\LWS_Pune\Sainik_Schools\figures"
LANE = os.path.dirname(os.path.abspath(__file__))


def main() -> None:
    paper = sys.argv[1]
    merged = json.load(open(os.path.join(LANE, "data", f"{paper}.merged.json"), encoding="utf-8"))
    out = os.path.join(FIGURE_ROOT, paper)
    os.makedirs(out, exist_ok=True)
    made = []
    for q in merged["questions"]:
        fig = q.get("figure")
        if not fig:
            continue
        page = int(fig["page"])
        src = Image.open(os.path.join(LANE, "out", paper, f"p{page:02d}.png")).convert("RGB")
        l, t, r, b = fig.get("region") or [0, 0, 1, 1]
        if not (0 <= l < r <= 1 and 0 <= t < b <= 1):
            sys.exit(f"Q{q['number']}: region {fig.get('region')} is not fractions 0-1, left<right, top<bottom")
        W, H = src.size
        crop = src.crop((round(l * W), round(t * H), round(r * W), round(b * H)))
        # The booklet is printed on both sides, so the Hindi page shows through
        # as light grey. Printed ink is dark; anything lighter becomes white.
        # `clean` may be false (keep every grey) or a number (the threshold):
        # thin printed lines (a figure series) can be lighter than 170.
        clean = fig.get("clean", True)
        if clean is not False:
            cut = 170 if clean is True else int(clean)
            crop = crop.point(lambda v, cut=cut: 255 if v > cut else v)
        # `erase`: [[l, t, r, b], ...] as fractions of THIS crop, painted white.
        # For a reader's pen mark inside a figure (AISSEE 2026 Q73: "+1" written
        # beside a printed 12). Look at the crop after: it must remove only the mark.
        for el, et, er, eb in fig.get("erase", []):
            cw, ch = crop.size
            ImageDraw.Draw(crop).rectangle((round(el * cw), round(et * ch), round(er * cw), round(eb * ch)), fill="white")
        # `relabel`: [{"box": [l, t, r, b], "text": "(3)"}] whitens the box and
        # writes the printed label back cleanly. For an option label a reader
        # circled in pen inside a picture-option figure (AISSEE 2026 Class 6):
        # the circle is a hint to a solver and noise to a student.
        for rl in fig.get("relabel", []):
            cw, ch = crop.size
            l, t, r, b = rl["box"]
            box = (round(l * cw), round(t * ch), round(r * cw), round(b * ch))
            d = ImageDraw.Draw(crop)
            d.rectangle(box, fill="white")
            size = max(10, int((box[3] - box[1]) * 0.45))
            try:
                font = ImageFont.truetype(r"C:\Windows\Fonts\times.ttf", size)
            except OSError:
                font = ImageFont.load_default()
            tw = d.textlength(rl["text"], font=font)
            d.text((box[0] + (box[2] - box[0] - tw) / 2, box[1] + (box[3] - box[1] - size) / 2), rl["text"], fill="black", font=font)
        path = os.path.join(out, f"q{int(q['number']):03d}.png")
        crop.save(path)
        made.append((q["number"], fig.get("note", ""), crop))
    print(f"{paper}: {len(made)} figure(s) -> {out}")

    if "--sheet" in sys.argv and made:
        width = 900
        tiles = []
        for n, note, im in made:
            scale = min(1.0, (width - 20) / im.width)
            im2 = im.resize((max(1, int(im.width * scale)), max(1, int(im.height * scale))))
            tile = Image.new("RGB", (width, im2.height + 40), "white")
            ImageDraw.Draw(tile).text((10, 8), f"Q{n}: {note[:110]}", fill=(200, 0, 0))
            tile.paste(im2, (10, 34))
            tiles.append(tile)
        sheet = Image.new("RGB", (width, sum(t.height for t in tiles)), "white")
        y = 0
        for t in tiles:
            sheet.paste(t, (0, y))
            y += t.height
        dest = os.path.join(LANE, "out", paper, "_figures.png")
        sheet.save(dest)
        print(f"sheet: {dest}")


if __name__ == "__main__":
    main()
