"""Side-by-side review sheets for redrawn figures: scan crop (left) beside redraw (right).

    python -P scripts/pariksha/book/compare.py <WORK> <testId> [--only=23.1_Q10,23.1_Q11] [--tag=a]

Reads <WORK>/figcrops/<testId>/<ref>.jpg and <WORK>/figdraft/<testId>/<ref>.png and writes
<WORK>/figdraft/<testId>/sheet[-<tag>]-NN.png, 6 rows a sheet. Two redraw agents sharing a
folder each pass their own --tag so neither overwrites the other's sheets. Lists refs with a
crop but no redraw. LOOK at every sheet: the main session does, before anything is attached.
"""
import os
import sys

from PIL import Image, ImageDraw

work, test_id = sys.argv[1], sys.argv[2]
opts = dict(a[2:].split("=", 1) for a in sys.argv[3:] if a.startswith("--") and "=" in a)
only = opts["only"].split(",") if "only" in opts else None
prefix = "sheet-" + (opts["tag"] + "-" if "tag" in opts else "")
crops = os.path.join(work, "figcrops", test_id)
draft = os.path.join(work, "figdraft", test_id)
refs = sorted(f[:-4] for f in os.listdir(crops) if f.endswith(".jpg"))
drawn = {f[:-4] for f in os.listdir(draft) if f.endswith(".png") and not f.startswith("sheet")}
if only:
    refs = [r for r in refs if r in only]
missing = [r for r in refs if r not in drawn]
COLW, ROWH, LABEL = 560, 300, 26


def fit(im, w, h):
    im = im.convert("RGB")
    s = min(w / im.width, h / im.height)
    return im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))))


rows = [r for r in refs if r in drawn]
for i in range(0, len(rows), 6):
    chunk = rows[i:i + 6]
    sheet = Image.new("RGB", (2 * COLW + 30, len(chunk) * (ROWH + LABEL) + 10), "white")
    d = ImageDraw.Draw(sheet)
    for j, r in enumerate(chunk):
        y = j * (ROWH + LABEL) + 5
        d.text((10, y), f"{r}   scan  |  redraw", fill="black")
        sheet.paste(fit(Image.open(os.path.join(crops, r + ".jpg")), COLW, ROWH), (10, y + LABEL))
        sheet.paste(fit(Image.open(os.path.join(draft, r + ".png")), COLW, ROWH), (COLW + 20, y + LABEL))
        d.line([(COLW + 15, y + LABEL), (COLW + 15, y + LABEL + ROWH)], fill="gray")
    sheet.save(os.path.join(draft, f"{prefix}{i // 6 + 1:02d}.png"))
print(f"{test_id}: {len(rows)} compared in {(len(rows) + 5) // 6} sheet(s)" + (f"; NOT DRAWN: {missing}" if missing else ""))
