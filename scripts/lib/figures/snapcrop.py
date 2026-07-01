"""
snapCrop — derive a tight, leak-safe figure bbox from COARSE anchors.

The NEET booklets are scanned image PDFs (no text layer), so figure crops were
hand-authored as fractional bboxes and repeatedly (a) leaked the "Answer (N)" /
"Sol." text sitting below the options into the crop, or (b) clipped the figure.
Eyeballing 4 float coordinates is what kept going wrong.

snapCrop replaces the 4 eyeballed floats with FORGIVING anchors:
  - col     [fx0,fx1] : the rough column band the figure sits in (wide is fine)
  - top      yfrac    : a point in the whitespace gap BELOW the stem
  - bottom   yfrac    : a point in the whitespace gap ABOVE the options/"Answer"
  - answerY  yfrac    : where the answer/options begin — the HARD leak ceiling

It renders the page, bounds the actual INK within [top,bottom] x [col] (so the
exact edges and left/right extent are derived, not guessed), and returns the
tight bbox + validation warnings. The crop can never dip below answerY, so the
answer text can't leak — PROVIDED answerY is correct (the one semantic input a
human/agent must get right; the verify-figures contact sheet is the backstop).

CLI:
  python snapcrop.py <pdf> <page1> <col0> <col1> <top> <bottom> <answerY>
       -> prints {"bbox":[...], "warnings":[...], "ok":bool} as JSON
  python snapcrop.py --selftest      -> runs synthetic unit checks, exits nonzero on failure
"""
import sys
import json

import numpy as np

INK = 165  # grayscale value < INK counts as ink (dark pixel)
ROW_MIN = 0.006  # a row/col is "content" if this fraction of the band is ink
MARGIN = 0.004  # whitespace padding added around the ink (never crosses the anchors)


def _content_rows(mask, col):
    """Boolean per-row: is there ink in the [col] band of this ink-mask?"""
    x0, x1 = int(col[0] * mask.shape[1]), int(col[1] * mask.shape[1])
    return mask[:, x0:x1].mean(axis=1) > ROW_MIN


def _in_gap(content_rows, yf):
    """True iff the page-fraction yf lands on a whitespace (non-content) row."""
    H = content_rows.shape[0]
    y = min(max(int(yf * H), 0), H - 1)
    return not content_rows[y]


def snap_crop(mask, col, top, bottom, answerY, margin=MARGIN):
    """Pure core. `mask` is a HxW boolean ink array (True = dark pixel).

    Returns {"bbox":[fx0,fy0,fx1,fy1], "warnings":[...], "ok":bool}. `ok` is False
    when any anchor is misplaced or the leak ceiling is violated — the caller must
    refuse to write a not-ok bbox. Never raises for a bad anchor; raises only if the
    band is empty (which means the anchors point at blank page)."""
    H, W = mask.shape
    content = _content_rows(mask, col)
    warnings = []
    if not _in_gap(content, top):
        warnings.append(f"top {top} is inside content, not a whitespace gap")
    if not _in_gap(content, bottom):
        warnings.append(f"bottom {bottom} is inside content, not a whitespace gap")
    if not bottom <= answerY:
        warnings.append(f"bottom {bottom} >= answerY {answerY} (would not guard the answer)")

    y0, y1 = int(top * H), int(bottom * H)
    x0, x1 = int(col[0] * W), int(col[1] * W)
    sub = mask[y0:y1, x0:x1]
    rows = np.where(sub.mean(axis=1) > ROW_MIN)[0]
    cols = np.where(sub.mean(axis=0) > ROW_MIN)[0]
    if rows.size == 0 or cols.size == 0:
        raise ValueError("no ink within [top,bottom]x[col] — anchors point at blank page")

    fy0 = (y0 + rows[0]) / H
    fy1 = (y0 + rows[-1] + 1) / H
    fx0 = (x0 + cols[0]) / W
    fx1 = (x0 + cols[-1] + 1) / W
    # pad into whitespace but never past the anchors (stem floor / answer ceiling / column)
    fy0 = max(top, fy0 - margin)
    fy1 = min(bottom, fy1 + margin)
    fx0 = max(col[0], fx0 - margin)
    fx1 = min(col[1], fx1 + margin)

    # HARD leak guard: the crop bottom must be strictly above where the answer begins.
    if not fy1 < answerY:
        warnings.append(f"LEAK: derived fy1 {fy1:.3f} not strictly above answerY {answerY}")

    return {
        "bbox": [round(float(fx0), 3), round(float(fy0), 3), round(float(fx1), 3), round(float(fy1), 3)],
        "warnings": warnings,
        "ok": len(warnings) == 0,
    }


def ink_mask_from_pdf(pdf, page1, zoom=2.0):
    """Render a page to a boolean ink mask (True = dark). Kept out of the pure core
    so snap_crop is unit-testable on synthetic masks without a PDF/renderer."""
    import fitz
    from PIL import Image

    pg = fitz.open(pdf)[page1 - 1]
    pix = pg.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
    gray = np.asarray(Image.frombytes("RGB", (pix.width, pix.height), pix.samples).convert("L"))
    return gray < INK


def _selftest():
    """Synthetic checks on the pure core (no PDF needed)."""
    fails = []

    def check(name, cond):
        if not cond:
            fails.append(name)

    # A 1000x400 page: stem band rows 100-140, figure rows 200-360, answer rows 420-460.
    m = np.zeros((1000, 400), dtype=bool)
    m[100:140, 40:300] = True   # stem text (left-aligned)
    m[200:360, 120:280] = True  # figure (centered)
    m[420:460, 40:300] = True   # "Answer" text
    col = [0.05, 0.75]

    # anchors in the gaps: top=0.17 (between stem & figure), bottom=0.39 (between figure & answer)
    r = snap_crop(m, col, top=0.17, bottom=0.39, answerY=0.42)
    check("ok when anchors in gaps", r["ok"] is True)
    check("figure top ~0.20", abs(r["bbox"][1] - 0.20) <= 0.01)
    check("figure bottom ~0.36", abs(r["bbox"][3] - 0.36) <= 0.01)
    check("left snapped to figure ~0.30", abs(r["bbox"][0] - 0.30) <= 0.02)
    check("no answer leaked (fy1 < 0.42)", r["bbox"][3] < 0.42)

    # bottom anchor placed INSIDE the answer text -> flagged not-ok (the common
    # protection: a too-low bottom anchor that lands on the answer is caught).
    bad = snap_crop(m, col, top=0.17, bottom=0.44, answerY=0.50)
    check("bad bottom anchor flagged", bad["ok"] is False)

    # answerY placed in the gap BELOW the answer (a WRONG ceiling) is the one case
    # geometry cannot catch: fy1 < answerY holds yet the answer is inside the crop.
    # This is exactly why a wrong answerY needs the verify-figures visual backstop —
    # assert the documented blind spot so it stays documented (not a silent surprise).
    blind = snap_crop(m, col, top=0.17, bottom=0.47, answerY=0.48)
    check("wrong-ceiling blind spot: geometry reports ok", blind["ok"] is True)
    check("wrong-ceiling blind spot: answer IS inside the crop", blind["bbox"][3] > 0.42)

    # empty band -> raises
    try:
        snap_crop(np.zeros((100, 100), dtype=bool), [0.0, 1.0], 0.1, 0.2, 0.3)
        check("empty band raises", False)
    except ValueError:
        check("empty band raises", True)

    if fails:
        print("SELFTEST FAILED: " + "; ".join(fails), file=sys.stderr)
        sys.exit(1)
    print("snapcrop selftest OK")


def main():
    if "--selftest" in sys.argv:
        _selftest()
        return
    pdf, page1, c0, c1, top, bottom, answerY = (
        sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]),
        float(sys.argv[5]), float(sys.argv[6]), float(sys.argv[7]),
    )
    mask = ink_mask_from_pdf(pdf, page1)
    print(json.dumps(snap_crop(mask, [c0, c1], top, bottom, answerY)))


if __name__ == "__main__":
    main()
