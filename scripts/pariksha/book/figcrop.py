"""Cut each figure question's box out of its column image, for the blind solvers and the redraws.

    python -P scripts/pariksha/book/figcrop.py <WORK> <testId>

Reads every <WORK>/drafts/<testId>*.A.json and writes <WORK>/figcrops/<testId>/<ref>.jpg (spaces
in the ref become _), padded 3% so a loose Pass A box still holds the whole diagram. Solvers get
these crops INSTEAD of page images, so they never see a key table printed on the same page.
"""
import glob
import json
import os
import sys

from PIL import Image

work, test_id = sys.argv[1], sys.argv[2]
out = os.path.join(work, "figcrops", test_id)
os.makedirs(out, exist_ok=True)
n, bad = 0, []
for f in sorted(glob.glob(os.path.join(work, "drafts", test_id + "*.A.json"))):
    for q in json.load(open(f, encoding="utf8")):
        fig = q.get("figure")
        if not q.get("hasFigure") or not fig:
            continue
        p = os.path.join(work, "render", test_id, fig["img"] + ".jpg")
        if not os.path.exists(p):
            bad.append(q["ref"])
            continue
        im = Image.open(p)
        W, H = im.size
        x0, y0, x1, y1 = fig["bbox"]
        box = (max(0, int((x0 - 0.03) * W)), max(0, int((y0 - 0.03) * H)),
               min(W, int((x1 + 0.03) * W)), min(H, int((y1 + 0.03) * H)))
        im.crop(box).convert("RGB").save(os.path.join(out, q["ref"].replace(" ", "_") + ".jpg"), quality=90)
        n += 1
print(f"{test_id}: {n} crops" + (f"; missing image for {bad}" if bad else ""))
