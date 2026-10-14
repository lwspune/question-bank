"""
Papers whose /Indexed images MuPDF renders wrongly, and the in-memory repair.

Shared by prep.py (the pages a transcriber reads) and extract_figures.py (the
figure crops), so the two can never disagree about what a page looks like.

Two failures, both measured:
  * 2024 Class 12 Biology 57/4/1-3: figures are 8-bit /Indexed over an ICC
    profile and render as black tiled noise.
  * 2024 Class 10 Maths 30/2, 30/3 and 30/4 (all nine sets): the decorative
    watermark strips down each page are /Indexed images (8-bit AND 1-bit) that
    render as solid black bars over the question text. Measured 2026-10-14 by
    rendering all 150 Class 10 papers: these nine have pages up to 33% pure
    black, and 0% after this repair. (2025 Science 31/2 also crosses the probe's
    line, at 9%, and is unchanged by the repair: a real photograph.)

Decoding each index through its own palette by hand gives the true image. The
source PDF is never written. Named, not detected: a detector would also
"repair" papers that render correctly today.
"""

import io
import re

from PIL import Image

REPAIR_INDEXED = {
    "2024-57-4-1", "2024-57-4-2", "2024-57-4-3",
    "2024-30-2-1", "2024-30-2-2", "2024-30-2-3",
    "2024-30-3-1", "2024-30-3-2", "2024-30-3-3",
    "2024-30-4-1", "2024-30-4-2", "2024-30-4-3",
}


def repair_indexed(doc):
    """Replace every /Indexed image in `doc` with its palette-decoded RGB."""
    done = set()
    for page in doc:
        for img in page.get_images(full=True):
            x = img[0]
            if x in done:
                continue
            done.add(x)
            obj = doc.xref_object(x, compressed=True)
            m = re.search(r"/Indexed \d+ 0 R (\d+) (\d+) 0 R", obj)
            if not m:
                continue
            w = int(re.search(r"/Width (\d+)", obj).group(1))
            h = int(re.search(r"/Height (\d+)", obj).group(1))
            bpc = int(re.search(r"/BitsPerComponent (\d+)", obj).group(1))
            entries = int(m.group(1)) + 1  # the palette's hival, plus one
            palette = list(doc.xref_stream(int(m.group(2)))[: 3 * entries])
            raw = doc.xref_stream(x)
            if bpc == 8:
                im = Image.frombytes("P", (w, h), raw[: w * h])
            elif bpc == 1:
                # One bit per index, rows padded to a byte: index 0 or 1.
                bits = Image.frombytes("1", (w, h), raw[: ((w + 7) // 8) * h])
                im = bits.convert("L").point(lambda v: 1 if v else 0).convert("P")
            else:
                continue
            im.putpalette(palette + [0] * (768 - len(palette)))
            buf = io.BytesIO()
            im.convert("RGB").save(buf, "PNG")
            page.replace_image(x, stream=buf.getvalue())
