# Dump a PDF's words with their positions as JSON, for the Errorless parser
# (parseErrorless in lib.ts). PyMuPDF does the reading; all the logic lives in
# the TypeScript side, where it is tested.
#
#   python scripts/afcat/pdf-words.py <pdf>  >  words.json
#
# Output: {"pages": [{"width": w, "height": h, "words": [[x0, y0, x1, y1, "text"], ...],
#                      "images": [[x0, y0, x1, y1], ...]}]}
# The Errorless answer boxes are pictures, so their extent comes from "images".
import json
import sys

import fitz  # PyMuPDF

doc = fitz.open(sys.argv[1])
pages = []
for page in doc:
    words = [[round(w[0], 1), round(w[1], 1), round(w[2], 1), round(w[3], 1), w[4]] for w in page.get_text("words")]
    images = [[round(v, 1) for v in info["bbox"]] for info in page.get_image_info()]
    pages.append({"width": page.rect.width, "height": page.rect.height, "words": words, "images": images})
sys.stdout.reconfigure(encoding="utf-8")
json.dump({"pages": pages}, sys.stdout, ensure_ascii=False)
