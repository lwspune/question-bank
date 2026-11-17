"""
Prepare a paper's question pages for vision transcription.

    python -P scripts/milschool/render.py <src_dir> <out_dir> <pages_json> [--no-columns] [--scale=1.5]

Called by render.ts, which reads config.ts. For each 1-based JPG number in
pages_json it writes into out_dir:

    pNN.png     the whole page, AglaSem's header and footer bands trimmed
    pNN-c1.png  the LEFT column   (transcribe from these)
    pNN-c2.png  the RIGHT column

and prints a JSON report with the gutter found on every page.

The sources are AglaSem's page JPGs (~1075 px wide, ~130 dpi), so pages are
upscaled before cropping: the transcriber reads a small fraction at a time.

The gutter is MEASURED with the CAPF lane's method (median ink in a window;
see scripts/capf/render.ts for why median, not mean, and why c2 is padded
further back than c1). A phone photo (RMS) is skewed and has no clean gutter:
the report then says gutterFound=false and the transcriber reads pNN.png.
"""
import json
import os
import sys

from PIL import Image

HEADER = 0.035  # AglaSem's blue title band
FOOTER = 0.035  # AglaSem's "aglasem.com ... Page n of N" line


def main() -> None:
    src, out, pages_json = sys.argv[1], sys.argv[2], sys.argv[3]
    want_columns = "--no-columns" not in sys.argv
    scale = 1.5
    for a in sys.argv:
        if a.startswith("--scale="):
            scale = float(a.split("=", 1)[1])
    os.makedirs(out, exist_ok=True)
    report = {"pages": []}
    for n in json.loads(pages_json):
        path = os.path.join(src, f"{n:02d}.jpg")
        if not os.path.exists(path):
            report["pages"].append({"index": n, "error": "missing"})
            continue
        im = Image.open(path).convert("L")
        W0, H0 = im.size
        im = im.crop((0, int(H0 * HEADER), W0, int(H0 * (1 - FOOTER))))
        im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
        W, H = im.size
        im.save(os.path.join(out, f"p{n:02d}.png"))
        entry = {"index": n, "width": W, "height": H}
        if want_columns:
            top, bot = int(H * 0.08), int(H * 0.92)
            crop = im.crop((0, top, W, bot))
            px = crop.load()
            cw, ch = crop.size
            ink = [0] * cw
            for x in range(cw):
                c = 0
                for y in range(0, ch, 3):
                    if px[x, y] < 140:
                        c += 1
                ink[x] = c
            HALF = 25
            centre = cw // 2
            lo, hi = int(cw * 0.35), int(cw * 0.65)
            best = None
            for x in range(lo, hi):
                window = sorted(ink[max(0, x - HALF): min(cw, x + HALF + 1)])
                med = window[len(window) // 2]
                key = (med, abs(x - centre))
                if best is None or key < best[0]:
                    best = (key, x)
            mid, med = best[1], best[0][0]
            found = med <= 8
            if not found:
                mid = W // 2
            entry.update({"gutterX": mid, "gutterMedian": med, "gutterFound": found})
            im.crop((0, 0, min(W, mid + 15), H)).save(os.path.join(out, f"p{n:02d}-c1.png"))
            im.crop((max(0, mid - 70), 0, W, H)).save(os.path.join(out, f"p{n:02d}-c2.png"))
        report["pages"].append(entry)
    print(json.dumps(report))


if __name__ == "__main__":
    main()
