# Crop figures to PNG: the paper's own drawing, never redrawn.
#
#   python scripts/spi/crop-figures.py <jobs.json>
#
# jobs.json is a list of {pdf, page, bbox: [x0, y0, x1, y1], out, pad?, noImages?}; bbox is in
# PDF points. A job of {pdf, xref, out} instead saves embedded image `xref` as it is. `noImages` removes every raster image from the page before rendering, in memory
# only (the PDF is never saved): the sample papers' "Sample Paper SPI" watermark is one image
# tiled across each page while their figures are vector drawings, so this crops the drawing
# without the watermark. Never use it on a scan, whose figures ARE images.
import json
import sys

import fitz  # PyMuPDF

PAD = 4
DPI = 220

docs: dict[tuple[str, bool], fitz.Document] = {}
cleaned: set[tuple[str, int]] = set()
for job in json.load(open(sys.argv[1], encoding="utf8")):
    no_images = bool(job.get("noImages"))
    doc = docs.setdefault((job["pdf"], no_images), fitz.open(job["pdf"]))
    if "xref" in job:
        # The figure IS an embedded image (the LWS mocks): save the object itself, at its own
        # resolution, rather than re-rendering the page around it.
        pix = fitz.Pixmap(doc, job["xref"])
        if pix.alpha or pix.n - pix.alpha >= 4:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        pix.save(job["out"])
        print(f"{job['out']}  image {job['xref']} {pix.width}x{pix.height}px")
        continue
    page = doc[job["page"] - 1]
    if no_images and (job["pdf"], job["page"]) not in cleaned:
        for img in page.get_images(full=True):
            page.delete_image(img[0])
        cleaned.add((job["pdf"], job["page"]))
    x0, y0, x1, y1 = job["bbox"]
    pad = job.get("pad", PAD)
    clip = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad) & page.rect
    page.get_pixmap(clip=clip, dpi=DPI).save(job["out"])
    print(f"{job['out']}  {clip.width:.0f}x{clip.height:.0f} pt")
