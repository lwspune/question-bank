"""
Cut every figure a shift's transcription asks for, from the extracted image.

    python -P scripts/ugc-net/crop.py <shift-id>           # crop
    python -P scripts/ugc-net/crop.py <shift-id> --sheet   # crop + one contact sheet to LOOK at

A row's `figure` is {file, region: [l, t, r, b] as fractions of that image,
note}. The crop goes to SOURCE_ROOT/figures/<shift>/q<ref>.png (one per row,
so a set's chart is stored once per row that shows it, as the bank stores
images per question). The sheet is written beside the crops; a person checks
every crop against its note before the commit.
"""
import json
import os
import sys

from PIL import Image

SOURCE_ROOT = r"C:\tmp\PYQPs\UGCNET"
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def main() -> None:
    shift = sys.argv[1]
    paper = json.load(open(os.path.join(REPO, "scripts", "ugc-net", "data", f"{shift}.questions.json"), encoding="utf-8"))
    out = os.path.join(SOURCE_ROOT, "figures", shift)
    os.makedirs(out, exist_ok=True)
    made = []
    for row in paper["rows"]:
        fig = row.get("figure")
        if not fig:
            continue
        src = Image.open(os.path.join(SOURCE_ROOT, "render", shift, fig["file"])).convert("RGB")
        l, t, r, b = fig.get("region") or [0, 0, 1, 1]
        if not (0 <= l < r <= 1 and 0 <= t < b <= 1):
            sys.exit(f"Q{row['ref']}: region {fig.get('region')} is not fractions 0-1, left<right, top<bottom")
        W, H = src.size
        crop = src.crop((round(l * W), round(t * H), round(r * W), round(b * H)))
        name = f"q{int(row['ref']):02d}.png"
        crop.save(os.path.join(out, name))
        made.append((row["ref"], name, crop))
    print(f"{shift}: {len(made)} figure(s) -> {out}")
    if "--sheet" in sys.argv and made:
        w = max(c.width for _, _, c in made)
        h = sum(c.height + 30 for _, _, c in made)
        sheet = Image.new("RGB", (w, h), "white")
        y = 0
        from PIL import ImageDraw

        d = ImageDraw.Draw(sheet)
        for ref, name, c in made:
            d.text((4, y + 8), f"Q{ref}  {name}", fill="red")
            sheet.paste(c, (0, y + 30))
            y += c.height + 30
        sheet.save(os.path.join(out, "_sheet.png"))
        print(f"sheet: {os.path.join(out, '_sheet.png')}")


if __name__ == "__main__":
    main()
