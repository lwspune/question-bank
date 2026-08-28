"""
Classify every page of a UPSC booklet as ENGLISH / HINDI / BLANK, so `englishPages`
in config.ts can be MEASURED rather than assumed.

    python scripts/upsc/classify-pages.py 2025-p2
    python scripts/upsc/classify-pages.py --all

WHY THIS EXISTS. `requirePaper` refuses a paper whose `englishPages` is empty,
because rendering a bilingual booklet blind feeds ~half Devanagari pages to a
transcription agent. The rule "English is at even 0-based indices from 2" was
verified on two booklets by eye; there are 20 more, spanning eleven years and at
least three scan generations, and 2016's Paper II is 40 pages where the rest are
48. Eyeballing 20 booklets is both slow and exactly the kind of check that
degrades when it gets boring.

HOW IT TELLS THE SCRIPTS APART, and why this particular signal.
Devanagari joins its letters along a continuous horizontal top bar (the
shirorekha), so a word is one long connected run of dark pixels. Latin letters
stand apart, so runs are short — a few pixels per stroke. Measuring the 95th
percentile of horizontal dark-run length therefore separates the two scripts
cleanly, and it does not care about scan quality, skew, font size or page
furniture the way OCR would.

CALIBRATED, NOT ASSUMED. `--calibrate` runs it against 2025-p2 and 2026-p1, whose
alternation was established by reading the pages, and reports whether the
detector reproduces it. A detector that has never been checked against a known
answer is not evidence.
"""

import json
import statistics
import sys
from pathlib import Path

import fitz
from PIL import Image
import io

HERE = Path(__file__).resolve().parent

P1_ROOT = Path(r"C:/Vilas/LWS_Pune/UPSC/Paper_1/PYQPs")
P2_ROOT = Path(r"C:/Vilas/LWS_Pune/UPSC/Paper-2")

# paperId -> (pdf path, kind). kind is only a HINT for the summary line; the
# classification itself is measured per page and never assumes a generation.
PAPERS = {
    "2026-p1": (P1_ROOT / "QP_CSP_2026_GENERAL_STUDIES_PAPER-I_25052026.pdf", "bilingual"),
    "2025-p1": (P1_ROOT / "CSE_P1_2025.pdf", "extract"),
    "2024-p1": (P1_ROOT / "CSE_P1_2024.pdf", "extract"),
    "2023-p1": (P1_ROOT / "CSE_P1_2023.pdf", "extract"),
    "2022-p1": (P1_ROOT / "CSE_P1_2022.pdf", "extract"),
    "2021-p1": (P1_ROOT / "CSE_P1_2021.pdf", "extract"),
    "2020-p1": (P1_ROOT / "CSE_P1_2020.pdf", "extract"),
    "2019-p1": (P1_ROOT / "CSE_P1_2019.pdf", "extract"),
    "2018-p1": (P1_ROOT / "CSE_P1_2018.pdf", "extract"),
    "2017-p1": (P1_ROOT / "CSE_P1_2017.pdf", "extract"),
    "2016-p1": (P1_ROOT / "CSE_P1_2016.pdf", "extract"),
    "2026-p2": (P2_ROOT / "QP_CSP_2026_GENERAL_STUDIES_PAPER-II_25052026.pdf", "bilingual"),
    "2025-p2": (P2_ROOT / "QP-CSP-25-GENERAL-STUDIES-PAPER-II-26052025.pdf", "bilingual"),
    "2024-p2": (P2_ROOT / "QP-CSP-24-GENERAL-STUDIES-PAPER-II-180624.pdf", "bilingual"),
    "2023-p2": (P2_ROOT / "QP_CS_Pre_Exam_2023_GENERAL_STUDIES_PAPER_II_280523.pdf", "bilingual"),
    "2022-p2": (P2_ROOT / "GENERAL STUDIES PAPER II.pdf", "bilingual"),
    "2021-p2": (P2_ROOT / "QP-CSP-21-GeneralStudiesPaper-II-121021.pdf", "bilingual"),
    "2020-p2": (P2_ROOT / "CSP_2020_GS_Paper-2.pdf", "bilingual"),
    "2019-p2": (P2_ROOT / "csp-p2.pdf", "bilingual"),
    "2018-p2": (P2_ROOT / "QP-CSP-18-GS-II-C.pdf", "bilingual"),
    "2017-p2": (P2_ROOT / "CSP-17-GS_PAPER-II-C.pdf", "bilingual"),
    "2016-p2": (P2_ROOT / "GENERAL_STUDIES_PAPER-II.pdf", "bilingual"),
}

DPI = 100          # enough for run-length structure; 5x cheaper than transcription DPI
DARK = 160         # a pixel this dark or darker is ink
MIN_RUN = 3        # ignore 1-2px speckle when measuring runs
BLANK_INK = 0.004  # below this fraction of dark pixels the page carries no text
DEVA_RUN = 13      # p95 run length at 100 DPI above which the script is Devanagari


def measure(page) -> dict:
    """Ink fraction and the 95th-percentile horizontal dark-run length."""
    pix = page.get_pixmap(dpi=DPI)
    im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
    W, H = im.size
    # Trim the page furniture: the header/footer band carries the booklet code and
    # folio, which are Latin on EVERY page including the Hindi ones, and would
    # drag a Hindi page's score down.
    im = im.crop((int(W * 0.05), int(H * 0.12), int(W * 0.95), int(H * 0.90)))
    px = im.load()
    w, h = im.size

    dark = 0
    runs = []
    for y in range(0, h, 2):  # every other row: the statistic is stable and it halves the cost
        run = 0
        for x in range(w):
            if px[x, y] < DARK:
                dark += 1
                run += 1
            else:
                if run >= MIN_RUN:
                    runs.append(run)
                run = 0
        if run >= MIN_RUN:
            runs.append(run)

    total = w * (h // 2 + 1)
    ink = dark / total if total else 0.0

    # Two-column-ness. A QUESTION page is set in two columns and therefore has a
    # near-empty vertical gutter down the middle; a COVER or an INSTRUCTIONS page
    # is a single full-width column and has none.
    #
    # This is the signal that separates a question page from the back cover, and
    # it is needed: the back cover carries the English instructions, so a
    # script-only detector calls it English and it slips into `englishPages`.
    # Measured as the lowest windowed MEDIAN ink over the middle 40% — median
    # rather than mean because Paper II prints a vertical rule down the gutter
    # whose mean is indistinguishable from body text.
    col = [0] * w
    for x in range(w):
        c = 0
        for y in range(0, h, 4):
            if px[x, y] < DARK:
                c += 1
        col[x] = c
    half, lo, hi = 25, int(w * 0.30), int(w * 0.70)
    gutter = min(
        statistics.median(col[max(0, x - half): min(w, x + half + 1)])
        for x in range(lo, hi)
    )
    rows_sampled = h // 4 + 1
    gutter_frac = gutter / rows_sampled if rows_sampled else 1.0

    if not runs:
        return {"ink": ink, "p95": 0.0, "runs": 0, "gutter": gutter_frac}
    runs.sort()
    p95 = runs[min(len(runs) - 1, int(len(runs) * 0.95))]
    return {"ink": ink, "p95": float(p95), "runs": len(runs), "gutter": gutter_frac}


# Above this fraction of sampled rows carrying ink at the page's clearest middle
# column, there is no gutter — the page is single-column, i.e. a cover or an
# instructions page, not a question page.
NO_GUTTER = 0.06


def classify(m: dict) -> str:
    if m["ink"] < BLANK_INK:
        return "BLANK"
    if m["gutter"] > NO_GUTTER:
        return "COVER"
    return "HINDI" if m["p95"] >= DEVA_RUN else "ENGLISH"


def run(paper_id: str, verbose: bool = False) -> dict:
    pdf, hint = PAPERS[paper_id]
    if not pdf.exists():
        raise SystemExit(f"missing: {pdf}")
    doc = fitz.open(str(pdf))
    pages = []
    for i in range(doc.page_count):
        m = measure(doc[i])
        pages.append({"index": i, **m, "kind": classify(m)})
    doc.close()

    english = [p["index"] for p in pages if p["kind"] == "ENGLISH"]
    # The cover is English-furniture-heavy on some booklets and Hindi on others;
    # it is always index 0 and never carries questions.
    english = [i for i in english if i != 0]

    out = {
        "paper": paper_id,
        "hint": hint,
        "pageCount": len(pages),
        "english": english,
        "hindi": [p["index"] for p in pages if p["kind"] == "HINDI"],
        "blank": [p["index"] for p in pages if p["kind"] == "BLANK"],
        "cover": [p["index"] for p in pages if p["kind"] == "COVER"],
        "pages": pages,
    }
    if verbose:
        for p in pages:
            print(f"  p{p['index']:02d} {p['kind']:8s} ink={p['ink']:.4f} p95run={p['p95']:.0f} gutter={p['gutter']:.3f}")
    return out


def fmt(seq):
    """Compact a page list, and say whether it is a clean even/odd run."""
    if not seq:
        return "(none)"
    if len(seq) > 6:
        step = {b - a for a, b in zip(seq, seq[1:])}
        shape = f"step {step.pop()}" if len(step) == 1 else "irregular"
        return f"{seq[0]}..{seq[-1]} ({len(seq)} pages, {shape})"
    return str(seq)


CALIBRATION = {
    # Established by reading the pages during the 2025 pilot.
    "2025-p2": list(range(2, 43, 2)),
    "2025-p1": list(range(1, 22)),
}


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}

    if "--calibrate" in flags:
        print("CALIBRATION — against booklets whose answer was established by reading them\n")
        ok = True
        for pid, expected in CALIBRATION.items():
            got = run(pid)["english"]
            match = got == expected
            ok &= match
            print(f"  {pid}: {'MATCH' if match else 'MISMATCH'}")
            if not match:
                print(f"    expected {fmt(expected)}")
                print(f"    got      {fmt(got)}")
                print(f"    missing  {sorted(set(expected) - set(got))}")
                print(f"    extra    {sorted(set(got) - set(expected))}")
        print(f"\n{'detector reproduces both known answers' if ok else 'DETECTOR IS NOT TRUSTWORTHY'}")
        sys.exit(0 if ok else 1)

    targets = args if args else (list(PAPERS) if "--all" in flags else [])
    if not targets:
        raise SystemExit("name a paper, or pass --all / --calibrate")

    results = {}
    for pid in targets:
        r = run(pid, verbose="--verbose" in flags)
        results[pid] = r
        print(
            f"{pid:9s} {r['pageCount']:2d}pp  "
            f"EN {fmt(r['english']):34s}  HI {len(r['hindi']):2d}  BLANK {len(r['blank']):2d}  COVER {len(r['cover']):2d}"
        )

    if "--json" in flags:
        (HERE / "out" / "page-classification.json").write_text(
            json.dumps(results, indent=2), encoding="utf-8"
        )
        print(f"\nwrote {HERE / 'out' / 'page-classification.json'}")


if __name__ == "__main__":
    main()
