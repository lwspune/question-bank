"""
One CLAT UG paper (Set A) out of the Consortium's typeset booklet, from its text
layer: passages, questions and options, never retyped.

    python -P scripts/clat/extract.py <year>     # writes scripts/clat/data/<year>.questions.json
                                                 #   + page images under C:\\tmp\\PYQPs\\CLAT\\render\\<year>

Why a script and not a transcriber: every CLAT question hangs off a long passage,
many of them extracts from published books, and a model that writes such a passage
out verbatim is stopped by the output filter. The text layer of the 2023-2026
booklets is clean (2022's is not: see ocr.py), so the passages go from the PDF
straight into the file and nobody types them.

How a page is read (word boxes, grouped into rows by baseline):
  - a row starting with a Roman numeral ("IV.") left of the question column opens
    a passage; the numerals run on across sections, so a passage is keyed P01, P02...
  - a row starting with the NEXT question number ("57.") at the question column
    (years.json `qx`, within 8 pt) opens a question. Requiring the next number
    keeps a numbered statement inside a stem from opening a question.
  - "(A)".."(D)", in order, at the start of a row or after a wide gap, open options;
    two option columns on one row are split at the second label.
  - any other row continues whatever is open. A blank-line gap opens a new
    paragraph in a passage; a row opening with a list marker ("I.", "1.",
    "Statement", "Assertion") starts a new line in a stem.
Headers, footers, section titles and "SPACE FOR ROUGH WORK" are dropped.

Anything the reader is unsure of goes in `anomalies` (a continuation left of its
option's column, a row with wide gaps that may be a table). Every one is looked at
against the page image; corrections are recorded in data/<year>.fixes.json, never
by editing this output by hand.
"""
import json
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(r"C:\tmp\PYQPs\CLAT")
HERE = Path(__file__).parent
YEARS = json.loads((HERE / "years.json").read_text(encoding="utf-8"))["years"]

ROMAN = re.compile(r"^(?=[IVXL])(L?X{0,3})(IX|IV|V?I{0,3})\.$")
QNUM = re.compile(r"^(\d{1,3})\.$")
LABEL = re.compile(r"^\(([A-Da-d])\)$")
LIST_MARK = re.compile(r"^(?:[IVX]+\.|\d+\.|\([ivx]+\)|\([a-d1-9]\)|[ivx]+\.|Statement|Statements|Assertion|Reason|Conclusion|Conclusions|Argument|Arguments|Premise|Fact|Principle|Facts)\b")
SECTION_TITLE = re.compile(
    r"^(?:(?:SECTION\s+[IVX]+|English\s+Language|Current\s+Affairs[\w\s]*?Knowledge|Current\s+Affairs|Legal\s+Reasoning|Logical\s+Reasoning|Quantitative\s+(?:Techniques|Aptitude))\s*)+$",
    re.I,
)
ROUGH = re.compile(r"SPACE\s+FOR\s+ROUGH\s+WORK", re.I)
FURNITURE = re.compile(r"^(?:UG|20\d\d|\d{1,2}|[^\w\s]{1,2}|M|O|Ο)$")
DECOR = re.compile(r"^i{4,}$")
# Private-use glyphs the booklets print as set symbols and borders.
PUA = re.compile(r"[\uf000-\uf0ff]")


def page_words(page, pno, year, cfg):
    """The page's word boxes: its text layer, or (years.json `ocr`) the boxes
    ocr.ps1 wrote from a 300-dpi render, in the same points."""
    if cfg.get("ocr"):
        f = ROOT / "ocr" / year / f"p{pno:03d}.words.json"
        if not f.exists():
            raise SystemExit(f"{year} p{pno}: no OCR words; run ocr.ps1 (README)")
        return [tuple(w) for w in json.loads(f.read_text(encoding="utf-8-sig"))]
    # The set symbol ("*") is also printed in the side margins, outside the text
    # column; on a passage line's baseline it read as a bullet (2025 P01).
    width = page.rect.width
    words = [w for w in page.get_text("words") if not (w[2] < 50 or w[0] > width - 45)]
    return underline(page, words)


UL_CORE = re.compile(r"^([^\w]*)(.*?\w)([^\w]*)$")
TEXT_ESCAPE = str.maketrans({"%": r"\%", "&": r"\&", "$": r"\$", "#": r"\#", "_": r"\_", "{": r"\{", "}": r"\}"})


def underline(page, words):
    """Words the booklet underlines (a thin rule drawn just below the baseline)
    become \\(\\underline{\\text{word}}\\), the bank's underline convention (the Word
    export draws it natively). Word by word, so a long underlined sentence still
    wraps on a phone. 2023 Q13 and Q28 ask about "the underlined sentence"."""
    rules = []
    for dr in page.get_drawings():
        for it in dr["items"]:
            if it[0] == "l" and abs(it[1].y - it[2].y) < 0.8:
                rules.append((min(it[1].x, it[2].x), max(it[1].x, it[2].x), it[1].y))
            elif it[0] == "re" and it[1].height < 1.5 and it[1].width > 3:
                rules.append((it[1].x0, it[1].x1, (it[1].y0 + it[1].y1) / 2))
    if not rules:
        return words
    out = []
    for w in words:
        hit = any(-1.5 <= y - w[3] <= 3.5 and min(x1, w[2]) - max(x0, w[0]) >= 0.7 * (w[2] - w[0]) for x0, x1, y in rules)
        m = UL_CORE.match(w[4]) if hit else None
        if m:
            w = (*w[:4], f"{m.group(1)}\\(\\underline{{\\text{{{m.group(2).translate(TEXT_ESCAPE)}}}}}\\){m.group(3)}")
        out.append(w)
    return out


def rows_of(raw_words, pno):
    """Word boxes grouped into rows by vertical centre (3 pt tolerance)."""
    # 2024 draws page ornaments in a symbol font whose glyphs read as "iiii".
    words = [w for w in raw_words if w[4].strip() and not DECOR.match(w[4])]
    words.sort(key=lambda w: ((w[1] + w[3]) / 2, w[0]))
    rows = []
    for w in words:
        yc = (w[1] + w[3]) / 2
        if rows and abs(rows[-1]["y"] - yc) <= 3:
            rows[-1]["words"].append(w)
        else:
            rows.append({"y": yc, "words": [w], "page": pno})
    for r in rows:
        r["words"].sort(key=lambda w: w[0])
        r["x"] = r["words"][0][0]
        r["top"] = min(w[1] for w in r["words"])
        r["text"] = " ".join(w[4] for w in r["words"])
    return rows


def is_furniture(row, height):
    t = row["text"]
    if ROUGH.search(t) or SECTION_TITLE.match(t.strip()):
        return True
    # 2022 prints its "UG" header lower (y~97) than the later booklets do.
    in_margin = row["y"] < 110 or row["y"] > height - 125
    if in_margin and all(FURNITURE.match(PUA.sub("*", w[4])) for w in row["words"]):
        return True
    return False


def gaps(row):
    """Horizontal gaps between consecutive words of a row, in points."""
    ws = row["words"]
    return [ws[i + 1][0] - ws[i][2] for i in range(len(ws) - 1)]


def split_options(row, expect):
    """Split a row at option labels. Returns ([(label, text)], leading_text).
    A label counts only when it is the label expected next and opens the row or
    follows a gap wider than a word space."""
    ws = row["words"]
    pieces = []
    lead = []
    cur = None
    for i, w in enumerate(ws):
        m = LABEL.match(w[4])
        gap_before = (w[0] - ws[i - 1][2]) if i else 99
        if m and m.group(1).upper() == expect and (i == 0 or gap_before > 7):
            cur = [expect, []]
            pieces.append(cur)
            expect = chr(ord(expect) + 1)
            continue
        (cur[1] if cur else lead).append(w[4])
    return [(l, " ".join(t)) for l, t in pieces], " ".join(lead)


def tidy(s: str) -> str:
    """Last pass over every string written: the rupee font prints its sign as a
    backtick ("` 15,000" -> "₹15,000")."""
    return re.sub(r"`\s?(?=\d)", "₹", s).strip()


def join_text(prev: str, nxt: str) -> str:
    if not prev:
        return nxt
    if prev.endswith("-") and nxt[:1].islower() and len(prev) > 1 and prev[-2].isalpha():
        return prev + nxt
    return prev + " " + nxt


def extract(year: str):
    cfg = YEARS[year]
    doc = fitz.open(ROOT / "src" / cfg["pdf"])
    n = cfg["sections"][-1][2]
    qx = cfg["qx"]
    px = cfg.get("px", 80)
    notes = []  # section directions printed between questions: {beforeRef, text}
    directions = []
    passages = []  # {id, printed, page, paras: [str]}
    rows_out = []  # {ref, page, passage, stem: [lines], options: {A: str}}
    anomalies = []
    open_kind = None  # "passage" | "stem" | "option"
    cur_q = None
    cur_p = None
    cur_opt = None
    opt_x = None
    expect_q = 1
    last_row = None
    line_h = None

    render = ROOT / "render" / year
    render.mkdir(parents=True, exist_ok=True)

    for pno in range(cfg["pages"][0], cfg["pages"][1] + 1):
        page = doc[pno - 1]
        page.get_pixmap(dpi=110).save(render / f"p{pno:03d}.png")
        height = page.rect.height
        for row in rows_of(page_words(page, pno, year, cfg), pno):
            if is_furniture(row, height):
                continue
            first = row["words"][0][4]
            text = PUA.sub("", row["text"]).strip()
            if not text:
                continue

            # A printed "*" or black-circle bullet becomes "•": a lone asterisk can
            # open italics in the site's renderer.
            if re.match(r"^[*●•]\s", text):
                text = "• " + text[2:].strip()
            gap = (row["top"] - last_row["top"]) if (last_row and last_row["page"] == pno) else None
            if gap is not None and 8 < gap < 16:
                line_h = gap if line_h is None else min(line_h, gap)

            # Passage start: numerals sit left of every stem line (years.json `px`).
            m = ROMAN.match(first)
            if m and row["x"] <= px:
                if directions:
                    notes.append({"beforeRef": str(expect_q), "text": " ".join(directions)})
                    directions = []
                cur_p = {"id": f"P{len(passages) + 1:02d}", "printed": first.rstrip("."), "page": pno, "paras": [""]}
                passages.append(cur_p)
                cur_p["paras"][-1] = " ".join(w[4] for w in row["words"][1:])
                open_kind = "passage"
                last_row = row
                continue

            # Question start: the NEXT number, right-aligned numbers start up to 16 pt left.
            m = QNUM.match(first)
            if m and int(m.group(1)) == expect_q and qx - 16 <= row["x"] <= qx + 8:
                if directions:
                    notes.append({"beforeRef": str(expect_q), "text": " ".join(directions)})
                    directions = []
                cur_q = {"ref": str(expect_q), "page": pno, "passage": cur_p["id"] if cur_p else None, "stem": [""], "options": {}}
                rows_out.append(cur_q)
                expect_q += 1
                rest = {"words": row["words"][1:], "y": row["y"]}
                opts, lead = split_options(rest, "A") if rest["words"] else ([], "")
                cur_q["stem"][-1] = lead
                open_kind = "stem"
                for l, t in opts:
                    cur_q["options"][l] = t
                    cur_opt = l
                    open_kind = "option"
                last_row = row
                continue

            # Options
            if cur_q is not None and open_kind in ("stem", "option") and len(cur_q["options"]) < 4:
                expect = chr(ord("A") + len(cur_q["options"]))
                if LABEL.match(first) and first[1].upper() == expect:
                    opts, lead = split_options(row, expect)
                    for l, t in opts:
                        cur_q["options"][l] = t
                        cur_opt = l
                    opt_x = row["words"][1][0] if len(row["words"]) > 1 else row["x"] + 25
                    open_kind = "option"
                    last_row = row
                    continue
                if open_kind == "option":
                    opts, lead = split_options(row, expect)
                    if opts and not lead:
                        for l, t in opts:
                            cur_q["options"][l] = t
                            cur_opt = l
                        last_row = row
                        continue

            # Text after a finished question that sits left of the option column is
            # neither an option nor a question: section directions, kept apart.
            if open_kind == "option" and len(cur_q["options"]) == 4 and opt_x is not None and row["x"] < opt_x - 6:
                open_kind = "directions"
            if open_kind is None:
                open_kind = "directions"

            # Continuation
            wide = [g for g in gaps(row) if g > 25]
            if open_kind == "passage":
                # A wide gap opens a paragraph only after a finished sentence: some
                # passages are set with looser leading than others, and a gap rule
                # alone split 2026's passages mid-sentence 84 times.
                ended = cur_p["paras"][-1].rstrip().endswith((".", "?", "!", "”", "’", '"', ":", ")", "]", "…"))
                new_para = ended and gap is not None and line_h is not None and gap > line_h * 1.3
                if last_row and last_row["page"] != pno:
                    prev = cur_p["paras"][-1]
                    new_para = prev.endswith((".", "?", "!", "”", '"', ":")) and row["x"] > (last_row["x"] + 3)
                if text.startswith("• ") or new_para:
                    cur_p["paras"].append(text)
                else:
                    cur_p["paras"][-1] = join_text(cur_p["paras"][-1], text)
            elif open_kind == "stem":
                if LIST_MARK.match(text) or text.startswith("• "):
                    cur_q["stem"].append(text)
                else:
                    cur_q["stem"][-1] = join_text(cur_q["stem"][-1], text)
                if wide:
                    anomalies.append(f"Q{cur_q['ref']} p{pno}: wide gaps in a stem row (table?): {text[:60]}")
            elif open_kind == "option":
                cur_q["options"][cur_opt] = join_text(cur_q["options"][cur_opt], text)
            else:
                directions.append(text)
            last_row = row

    if directions:
        notes.append({"beforeRef": str(expect_q), "text": " ".join(directions)})
    if expect_q != n + 1:
        anomalies.append(f"read {expect_q - 1} questions, expected {n}")
    sections = cfg["sections"]

    def section_of(ref):
        for name, a, b in sections:
            if a <= ref <= b:
                return name
        raise SystemExit(f"Q{ref} in no section")

    out_rows = []
    for q in rows_out:
        opts = [q["options"].get(l, "").strip() for l in "ABCD"]
        if any(not o for o in opts):
            anomalies.append(f"Q{q['ref']}: missing option(s) {[l for l, o in zip('ABCD', opts) if not o]}")
        out_rows.append({
            "ref": q["ref"],
            "section": section_of(int(q["ref"])),
            "page": q["page"],
            "passage": q["passage"],
            "text": tidy("\n".join(s.strip() for s in q["stem"] if s.strip())),
            "options": [tidy(o) for o in opts],
        })
    out = {
        "year": int(year),
        "source": f"{cfg['pdf']} pages {cfg['pages'][0]}-{cfg['pages'][1]} (Set A)",
        "passages": [
            {"id": p["id"], "printed": p["printed"], "page": p["page"], "text": tidy("\n\n".join(x.strip() for x in p["paras"] if x.strip()))}
            for p in passages
        ],
        "rows": out_rows,
        "directions": [{"beforeRef": d["beforeRef"], "text": tidy(d["text"])} for d in notes],
        "anomalies": anomalies,
    }
    dest = HERE / "data" / f"{year}.questions.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    per = {}
    for r in out_rows:
        per[r["section"]] = per.get(r["section"], 0) + 1
    print(f"{year}: {len(out_rows)} questions, {len(passages)} passages, {len(anomalies)} anomalies -> {dest.name}")
    print("  by section:", per)
    for a in anomalies[:40]:
        print("  !", a)
    for d in notes:
        print(f"  directions before Q{d['beforeRef']}: {d['text'][:90]}")


if __name__ == "__main__":
    extract(sys.argv[1])
