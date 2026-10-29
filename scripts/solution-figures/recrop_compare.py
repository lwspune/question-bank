"""Re-crop live NCERT figures with and without the watermark, and measure.

    python scripts/solution-figures/recrop_compare.py <jobs.json>

jobs.json = {"outdir": dir, "jobs": [{"key", "pdf", "parts": [{"page", "bbox", "mask"?}], "live": png path}]}.
For each job: the OLD crop (watermark kept, as it was made), the NEW crop
(watermark removed), and the live image. Prints one JSON line:
{key: {"liveVsOld": share, "oldVsNew": share, "liveVsNew": share, "new": path}}.

liveVsOld counts pixels differing by more than 48 grey levels after both are
scaled to one size: a record that still reproduces the live image scores near
0 whatever zoom or quantization it was uploaded at. oldVsNew counts pixels
differing by more than 12 levels at full size: the watermark is a pale grey
(about 35 levels off white), so it shows there and nowhere else. liveVsNew uses the same fine threshold
against the live image: near 0 means the live image is already the clean crop
(replaced on an earlier run), so a re-run does not upload it again.
"""
import json
import os
import sys

from PIL import Image, ImageChops

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "lib", "figures"))
from crop_answer_figs import encode, render, stack  # noqa: E402


def share(a, b, threshold, width=None):
    a, b = a.convert("L"), b.convert("L")
    if width:
        h = max(1, round(a.height * width / a.width))
        a, b = a.resize((width, h)), b.resize((width, h))
    elif a.size != b.size:
        b = b.resize(a.size)
    hist = ImageChops.difference(a, b).histogram()
    return sum(hist[threshold + 1:]) / (a.width * a.height)


def main():
    spec = json.load(open(sys.argv[1], encoding="utf-8"))
    os.makedirs(spec["outdir"], exist_ok=True)
    out = {}
    for job in spec["jobs"]:
        parts = job["parts"]
        old = stack([render(job["pdf"], p["page"], p["bbox"], p.get("mask", ()), keep_furniture=True) for p in parts])
        new = stack([render(job["pdf"], p["page"], p["bbox"], p.get("mask", ())) for p in parts])
        live = Image.open(job["live"]).convert("RGB")
        path = os.path.join(spec["outdir"], job["key"] + ".png")
        open(path, "wb").write(encode(new))
        out[job["key"]] = {"liveVsOld": round(share(old, live, 48, width=300), 5), "oldVsNew": round(share(old, new, 12), 5),
                          "liveVsNew": round(share(new, live, 12), 5), "new": path}
    print(json.dumps(out))


if __name__ == "__main__":
    main()
