"""
CLAT 2022's page words: its damaged text layer, repaired from OCR by POSITION.

    python -P scripts/clat/ocr_lines.py render <year>   # 300-dpi pages -> ocr\\<year>\\page\\pNNN.png
                                                        #   + one crop per text-layer line -> ocr\\<year>\\lines
    powershell -NoProfile -File scripts/clat/ocr.ps1 -Dir C:\\tmp\\PYQPs\\CLAT\\ocr\\<year>\\page -Dpi 300
    powershell -NoProfile -File scripts/clat/ocr.ps1 -Dir C:\\tmp\\PYQPs\\CLAT\\ocr\\<year>\\lines -Dpi 300
    python -P scripts/clat/ocr_lines.py merge <year>    # -> ocr\\<year>\\pNNN.words.json + merge-report.txt

The 2022 booklet's text layer is damaged two ways, and neither source alone is safe:
  - a substitution in some font subsets ("commiVVingVhe" = "committing the":
    s-z print as U-\\, "fi" as "ſ", "fl" as "ƀ", quotes as "Ŏ"/"ŏ"), often with the
    spaces lost, so one word box covers several words;
  - capitals read as lower case ("the main idea", "(b)", "mr. A").
Windows OCR reads case and letters well but silently DROPS fragments (Q136's
"(A) 440" on a whole-page read) and scrambles some lines. Both sources carry the
right POSITIONS, so the repair is geometric: every text-layer word box is kept
(nothing can be dropped), and its text is replaced by the OCR words whose centres
fall inside it when the two agree ignoring case (OCR's case wins) or the text-layer
word shows the substitution's marks. Otherwise the text layer stands (OCR's
"Ill." does not overwrite the printed "III."). Line-crop OCR is preferred,
whole-page OCR is the second reader. Every replacement that is not a pure case
fix is listed in merge-report.txt for a person to read against the page.
"""
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(r"C:\tmp\PYQPs\CLAT")
YEARS = json.loads((Path(__file__).parent / "years.json").read_text(encoding="utf-8"))["years"]
DPI = 300
PAD = 3  # points around each line crop

# Marks of the substitution: a stand-in glyph, or a shifted capital (U-Z) inside
# or after a lower-case run ("commiVVing", "haU", "Vhe").
CIPHER = re.compile(r"[\[\\\]ſƀŎŏŌŒő]|[a-z][UVWXYZ]|^[UVWXYZ][a-z]|[UVWXYZ]{2,}[a-z]|^[A-Z][UVWXYZ][a-z]|^IV$")
COMMON_CAPS = {"We", "You", "Your", "Upon", "Under", "Union", "Very", "View", "Was", "Were", "What", "When", "Where",
               "Which", "While", "Who", "Whose", "Why", "With", "Women", "World", "Year", "Years", "Yet", "Vice",
               "Value", "Values", "Used", "Use", "Uttar", "United", "Village", "Victory", "Western", "Water", "War",
               "Writ", "Yoga", "Zone", "Usually", "Unlike", "Whether", "Without", "Within", "Would", "Will", "Women's",
               "Union's", "Vienna", "Virginia", "Yemen", "Zealand", "Ukraine", "Uganda", "Venezuela", "Vietnam"}


def render(year):
    cfg = YEARS[year]
    doc = fitz.open(ROOT / "src" / cfg["pdf"])
    pages = ROOT / "ocr" / year / "page"
    lines = ROOT / "ocr" / year / "lines"
    pages.mkdir(parents=True, exist_ok=True)
    lines.mkdir(parents=True, exist_ok=True)
    manifest = []
    for pno in range(cfg["pages"][0], cfg["pages"][1] + 1):
        page = doc[pno - 1]
        page.get_pixmap(dpi=DPI).save(pages / f"p{pno:03d}.png")
        n = 0
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                if not "".join(s["text"] for s in l["spans"]).strip():
                    continue
                r = fitz.Rect(l["bbox"]) + (-PAD, -PAD, PAD, PAD)
                r &= page.rect
                n += 1
                name = f"p{pno:03d}_{n:03d}"
                page.get_pixmap(dpi=DPI, clip=r).save(lines / f"{name}.png")
                manifest.append({"name": name, "page": pno, "x": r.x0, "y": r.y0})
    (lines / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    print(f"{year}: pages + {len(manifest)} line crops rendered")


def load_words(f):
    if not f.exists():
        return []
    words = json.loads(f.read_text(encoding="utf-8-sig")) or []
    if words and not isinstance(words[0], list):
        words = [words]  # ConvertTo-Json flattens a one-word array
    return words


def centre_in(w, box, slack=1.0):
    cx, cy = (w[0] + w[2]) / 2, (w[1] + w[3]) / 2
    return box[0] - slack <= cx <= box[2] + slack and box[1] - slack <= cy <= box[3] + slack


STRAIGHT = str.maketrans({"‘": "'", "’": "'", "“": '"', "”": '"'})


def recase(printed, ocr):
    """The printed characters (curly quotes and all) with OCR's capitals, when the
    two differ only in case and quote style."""
    if len(printed) != len(ocr):
        return None
    if printed.translate(STRAIGHT).lower() != ocr.translate(STRAIGHT).lower():
        return None
    return "".join(o if o.isalpha() else p for p, o in zip(printed, ocr))


DECODE = {"U": "s", "V": "t", "W": "u", "X": "v", "Y": "w", "Z": "x", "[": "y", "\\": "z", "ſ": "fi", "ƀ": "fl",
          "Ŏ": "'", "ŏ": "'", "ő": '"', "Œ": '"', "Ō": "-"}


def decodes_to(printed, ocr):
    """Undoing the substitution on the printed text gives the OCR reading (ignoring
    case, spaces and quote style): the OCR is confirmed, not merely preferred."""
    norm = lambda s: re.sub(r"\s+", "", s.translate(STRAIGHT)).lower().replace("—", "-").replace("–", "-")
    return norm("".join(DECODE.get(c, c) for c in printed)) == norm(ocr)


def looks_ciphered(t):
    return bool(CIPHER.search(t)) and t.strip(".,;:!?()'\"\u2018\u2019\u201c\u201d") not in COMMON_CAPS


def merge(year):
    cfg = YEARS[year]
    doc = fitz.open(ROOT / "src" / cfg["pdf"])
    base = ROOT / "ocr" / year
    manifest = json.loads((base / "lines" / "manifest.json").read_text(encoding="utf-8"))
    line_ocr = {}
    for m in manifest:
        for w in load_words(base / "lines" / f"{m['name']}.words.json"):
            line_ocr.setdefault(m["page"], []).append([w[0] + m["x"], w[1] + m["y"], w[2] + m["x"], w[3] + m["y"], w[4]])
    report = []
    stats = {"same": 0, "case": 0, "decoded": 0, "replaced": 0, "kept": 0, "unread": 0}
    for pno in range(cfg["pages"][0], cfg["pages"][1] + 1):
        page_ocr = load_words(base / "page" / f"p{pno:03d}.words.json")
        out = []
        for w in doc[pno - 1].get_text("words"):
            t = w[4]
            box = list(w[:4])
            choice = None
            for src in (line_ocr.get(pno, []), page_ocr):
                inside = sorted([o for o in src if centre_in(o, box)], key=lambda o: o[0])
                if inside:
                    choice = " ".join(o[4] for o in inside)
                    break
            if choice is None:
                stats["unread"] += 1
                if looks_ciphered(t):
                    report.append(f"p{pno} UNREAD, ciphered text kept: {t!r}")
                text = t
            elif choice == t:
                stats["same"] += 1
                text = t
            elif choice.replace(" ", "") == t:
                # OCR only split the printed word ("1 925", "91 ,500"): the text layer stands.
                stats["same"] += 1
                text = t
            elif recase(t, choice) is not None:
                stats["case"] += 1
                text = recase(t, choice)
            elif decodes_to(t, choice):
                stats["decoded"] += 1
                text = choice
            elif looks_ciphered(t):
                stats["replaced"] += 1
                report.append(f"p{pno} replaced (unconfirmed) {t!r} -> {choice!r}")
                text = choice
            else:
                stats["kept"] += 1
                report.append(f"p{pno} kept {t!r} (OCR read {choice!r})")
                text = t
            out.append(box + [text])
        (base / f"p{pno:03d}.words.json").write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    (base / "merge-report.txt").write_text("\n".join(report) + "\n", encoding="utf-8")
    print(f"{year}: {stats}; report: {base / 'merge-report.txt'} ({len(report)} lines)")


if __name__ == "__main__":
    {"render": render, "merge": merge}[sys.argv[1]](sys.argv[2])
