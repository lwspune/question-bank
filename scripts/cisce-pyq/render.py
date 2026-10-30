"""
Render ISC source PDFs to page images for VISION transcription.

    python scripts/isc-12-pyq/render.py 2025 Mathematics
    python scripts/isc-12-pyq/render.py 2026 Physics --dpi 220

WHY VISION AT ALL — this is measured, not a default:

  * The 2026 QUESTION PAPERS have a ZERO-character text layer. They are 150 dpi
    scans (crisp typeset, not photocopy) carrying a diagonal serial-number
    watermark. There is nothing to extract.

  * The 2025 MARKING SCHEMES do have a text layer, and it is worse than none,
    because it is LOSSY rather than noisy. Every math-italic glyph is doubled
    AND distinct letters collapse onto the same glyph:

        printed   y^2 dx + (x^2 - xy - y^2) dy = 0
        extracts  𝑦𝑦2𝑑𝑑𝑑𝑑 + (𝑥𝑥2 −𝑥𝑥𝑥𝑥−𝑦𝑦2)𝑑𝑑𝑑𝑑 =  0
                        ^^^^                    ^^^^
                        "dx" and "dy" are the SAME four characters

    No substitution table can repair that; the information is gone. The text
    layer is therefore useful for locating and cross-checking PROSE, and for
    nothing that carries a symbol.

The page images this writes are the transcription source of record. Prose may be
sanity-checked against `--dump-text`, but every symbol comes from the image.

180 dpi is the default because it is what these pages were verified legible at,
including subscripts (K2Cr2O7), superscripts ([Ni(CN)4]2-) and the watermark
crossing the text. Raise it for a page that argues back rather than lowering it.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:  # pragma: no cover - environment guard
    sys.exit("PyMuPDF is required:  pip install pymupdf")

SOURCE_ROOT = Path(r"C:\tmp\PYQPs\ISC\XII")
SUBJECTS = ("Mathematics", "Physics", "Chemistry")

# Which document each year is transcribed from. Mirrors YEAR_SOURCES in
# ./config.ts — if these disagree, config.ts is the source of record.
SOURCE_KIND = {2025: "apup", 2026: "qp"}

# Front/back matter carrying no exam content. Measured per document rather than
# assumed: the 2025 APUPs open with ~7 pages of council preface and region-wise
# performance charts and close with general comments. `--all-pages` overrides.
CONTENT_RANGE = {
    # Measured per document: first page carrying "SECTION A" through the last
    # page before GENERAL COMMENTS / Suggestions-for-candidates back matter.
    (2025, "Mathematics"): (8, 43),
    (2025, "Physics"): (8, 41),
    (2025, "Chemistry"): (8, 32),
    (2026, "Mathematics"): (2, 11),
    (2026, "Physics"): (2, 12),
    (2026, "Chemistry"): (2, 11),
}


def source_pdf(year: int, subject: str) -> Path:
    kind = SOURCE_KIND.get(year)
    if kind is None:
        raise SystemExit(
            f"ISC {year}: no source document held. Years in hand: "
            f"{', '.join(str(y) for y in sorted(SOURCE_KIND))}."
        )
    return SOURCE_ROOT / str(year) / kind / f"{subject}.pdf"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("year", type=int)
    ap.add_argument("subject", choices=SUBJECTS)
    ap.add_argument("--dpi", type=int, default=180)
    ap.add_argument(
        "--all-pages",
        action="store_true",
        help="ignore the measured content range and render every page",
    )
    ap.add_argument(
        "--dump-text",
        action="store_true",
        help="also write the (math-lossy) text layer per page, for PROSE cross-check only",
    )
    args = ap.parse_args()

    pdf = source_pdf(args.year, args.subject)
    if not pdf.exists():
        raise SystemExit(f"missing source: {pdf}")

    out = SOURCE_ROOT / "render" / f"{args.year}-{args.subject}"
    out.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf)
    rng = None if args.all_pages else CONTENT_RANGE.get((args.year, args.subject))
    first, last = rng if rng else (1, doc.page_count)

    if rng is None and not args.all_pages:
        print(
            f"note: content range for {args.year} {args.subject} is not measured yet "
            f"— rendering all {doc.page_count} pages.",
            file=sys.stderr,
        )

    written = 0
    for pn in range(first - 1, min(last, doc.page_count)):
        page = doc[pn]
        page.get_pixmap(dpi=args.dpi).save(out / f"p{pn + 1:02d}.png")
        if args.dump_text:
            (out / f"p{pn + 1:02d}.txt").write_text(page.get_text(), encoding="utf-8")
        written += 1

    print(f"{pdf.name}: rendered pages {first}-{min(last, doc.page_count)} "
          f"({written} images) at {args.dpi} dpi -> {out}")
    if args.dump_text:
        print("text dumps written. PROSE CROSS-CHECK ONLY — every symbol comes from the image.")


if __name__ == "__main__":
    main()
