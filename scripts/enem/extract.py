"""
Extract an ENEM paper's text layer into a DRAFT transcription.

    python scripts/enem/extract.py <paper.pdf> <year> <first>-<last> [<first>-<last> ...] --out <draft.json>

Each range is a block of question numbers on the paper with its area:
91-135:natureza 136-180:matematica (2017 onward, Day 2); 2016's Sciences are
Day 1, 46-90:natureza.

What it does
- Reads each page in column order (left column, then right), drops the page
  furniture (barcode, ENEM2025ENEM2025 band, area headings, booklet colour,
  page numbers), and splits at "Questão N" / "QUESTÃO N".
- Options are the lines "A<tab>...", ..., "E<tab>..." in order. The tab is
  required: a stem line can start "A filtração..." or "E ...".
- Keeps sub- and superscripts as _{..} / ^{..} and wraps the token in inline
  LaTeX (H_{2}O -> \\(\\text{H}_{2}\\text{O}\\)), as the IMAT lane does.
- Records each question's SOURCE CREDIT lines ("SOBRENOME, A. Título...
  (adaptado)", "Disponível em: ...", "Acesso em: ..."): an adapted third-party
  text may belong to its author (legal flag, owner decides what is published).
- Flags for a person: an image inside the question's area on the page, a stem
  naming a figure or table, an empty or missing option, any sub/superscript.

It writes a DRAFT. Nothing here is committed until a person has compared the
draft with the page.
"""
import json
import re
import sys

import fitz  # PyMuPDF

FURNITURE = re.compile(
    r"^(\*[^*]+\*|(ENEM\d{4}|ENEN\d{4})+.*|CI[ÊE]NCIAS DA NATUREZA E SUAS TECNOLOGIAS|"
    r"MATEM[ÁA]TICA E SUAS TECNOLOGIAS|LINGUAGENS, C[ÓO]DIGOS E SUAS TECNOLOGIAS|"
    r"CI[ÊE]NCIAS HUMANAS E SUAS TECNOLOGIAS|Quest[õo]es de \d+ a \d+|\d+\s*[ºo°]\s*DIA|"
    r"CADERNO\s*\d*|AZUL|AMARELO|ROSA|CINZA|BRANCO|VERDE|LARANJA|\d{1,2}|"
    r"\*?[A-Z0-9]{8,}\*?)$",
    re.I,
)
Q_RE = re.compile(r"^QUEST[ÃA]O\s+(\d{1,3})\b\s*(.*)$", re.I)
OPT_RE = re.compile(r"^([A-E])\s*\t\s*(.*)$")
CREDIT_RE = re.compile(
    r"(\(adaptad[oa]\)|Dispon[ií]vel em|Acesso em|^[A-ZÀ-Ý][A-ZÀ-Ý' -]{1,40}, [A-Z]\. ?[A-Z]?\.?|^[A-ZÀ-Ý]{2,}[A-ZÀ-Ý ]*\. [A-Z])"
)
FIGURE_WORDS = re.compile(r"\b(figura|gr[áa]fico|tabela|quadro|imagem|ilustra|esquema|mapa|tirinha|charge)\b", re.I)


def line_text(line):
    """A line's text with sub/superscripts marked as _{..} / ^{..} (from scripts/imat/extract.py)."""
    # A font without a character map (2021) yields glyph codes as raw control
    # bytes, which the repo forbids (tests/no-control-bytes): show them as U+FFFD.
    for s in line["spans"]:
        s["text"] = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "�", s["text"])
    spans = [s for s in line["spans"] if s["text"]]
    if not spans:
        return ""
    main = max(s["size"] for s in spans)
    base = max((s["origin"][1] for s in spans if s["size"] >= 0.9 * main), default=0)
    out = []
    for s in spans:
        t = s["text"]
        if s["size"] < 0.85 * main and t.strip():
            mark = "^" if s["origin"][1] < base - 0.5 else "_"
            out.append(f"{mark}{{{t.strip()}}}")
        else:
            out.append(t)
    return "".join(out)


def wrap_scripts(text):
    """Wrap each whitespace token carrying ^{ or _{ in inline LaTeX, letters as \\text{}."""

    def fix(tok):
        if "^{" not in tok and "_{" not in tok:
            return tok
        m = re.match(r"^([(\[]*)(.*?)([.,;:?)\]]*)$", tok)
        lead, core, trail = m.group(1), m.group(2), m.group(3)
        while lead and core.count(")") + core.count("]") > core.count("(") + core.count("["):
            core, lead = lead[-1] + core, lead[:-1]
        while trail and core.count("(") + core.count("[") > core.count(")") + core.count("]"):
            core, trail = core + trail[0], trail[1:]
        parts = re.split(r"([_^]\{[^}]*\})", core)
        core = "".join(p if p.startswith(("_{", "^{")) or not p else f"\\text{{{p}}}" for p in parts)
        return f"{lead}\\({core}\\){trail}"

    return " ".join(fix(t) for t in text.split(" "))


def paragraphs(lines):
    """Printed lines as paragraphs: text runs joined with spaces, a source credit as its own paragraph."""
    paras, cur, cur_credit = [], [], False
    for line in lines:
        is_credit = bool(CREDIT_RE.search(line))
        if cur and is_credit != cur_credit:
            paras.append(" ".join(cur))
            cur = []
        cur.append(line)
        cur_credit = is_credit
    if cur:
        paras.append(" ".join(cur))
    return [re.sub(r"\s+", " ", p).strip() for p in paras if p.strip()]


def page_lines(page):
    """(column, y, text) for every line, column 0 left / 1 right, in reading order."""
    mid = page.rect.width / 2
    out = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            t = line_text(line).strip()
            if not t:
                continue
            x0, y0 = line["bbox"][0], line["bbox"][1]
            out.append((0 if x0 < mid - 15 else 1, y0, t))
    out.sort(key=lambda r: (r[0], r[1]))
    return out


def page_images(page):
    mid = page.rect.width / 2
    boxes = []
    for info in page.get_image_info():
        x0, y0, x1, y1 = info["bbox"]
        if (x1 - x0) * (y1 - y0) < 2500:  # icons, barcode bits
            continue
        boxes.append((0 if x0 < mid - 15 else 1, y0, y1))
    return boxes


def parse_ranges(args):
    ranges = []
    for a in args:
        span, area = a.split(":")
        lo, hi = span.split("-")
        ranges.append((int(lo), int(hi), area))
    return ranges


def area_of(n, ranges):
    for lo, hi, area in ranges:
        if lo <= n <= hi:
            return area
    return None


def main():
    argv = sys.argv[1:]
    out = argv[argv.index("--out") + 1]
    pdf, year = argv[0], int(argv[1])
    ranges = parse_ranges([a for a in argv[2:] if ":" in a])
    doc = fitz.open(pdf)

    questions = []
    cur = None
    for pno, page in enumerate(doc):
        imgs = page_images(page)
        for col, y, raw in page_lines(page):
            if FURNITURE.match(raw):
                continue
            m = Q_RE.match(raw)
            if m:
                n = int(m.group(1))
                cur = None
                if area_of(n, ranges):
                    cur = {"n": n, "area": area_of(n, ranges), "stem": [], "options": {}, "last": "stem",
                           "where": [], "images": 0}
                    if m.group(2).strip():
                        cur["stem"].append(m.group(2).strip())
                    questions.append(cur)
                    cur["where"].append((pno, col, y))
                continue
            if cur is None:
                continue
            cur["where"].append((pno, col, y))
            mo = OPT_RE.match(raw)
            want = "ABCDE"[len(cur["options"])] if len(cur["options"]) < 5 else None
            if mo and mo.group(1) == want:
                cur["options"][want] = [mo.group(2)] if mo.group(2) else []
                cur["last"] = want
                continue
            if cur["last"] == "stem":
                cur["stem"].append(raw)
            else:
                cur["options"][cur["last"]].append(raw)
        # images inside a question's area: same page and column, between its first and last line
        for q in questions:
            spots = [(c, y) for p, c, y in q["where"] if p == pno]
            for col, y0, y1 in imgs:
                ys = [y for c, y in spots if c == col]
                if ys and min(ys) - 40 <= y0 <= max(ys) + 5:
                    q["images"] += 1

    drafts = []
    for q in questions:
        credit = [l for l in q["stem"] if CREDIT_RE.search(l)]
        stem = "\n\n".join(wrap_scripts(p) for p in paragraphs(q["stem"]))
        opts = [wrap_scripts(" ".join(q["options"].get(k, [])).strip()) for k in "ABCDE"]
        flags = []
        if any(not o for o in opts):
            flags.append("empty-option")
        if q["images"]:
            flags.append(f"image x{q['images']}")
        if FIGURE_WORDS.search(stem):
            flags.append("names-figure-or-table")
        if "\\(" in stem or any("\\(" in o for o in opts):
            flags.append("scripts")
        if credit:
            flags.append("source-credit")
        drafts.append({"n": q["n"], "area": q["area"], "subject": None, "chapter": "", "text": stem,
                       "options": opts, "credit": credit, "flags": flags})

    want = sorted(n for lo, hi, _ in ranges for n in range(lo, hi + 1))
    got = [d["n"] for d in drafts]
    missing = sorted(set(want) - set(got))
    dupes = sorted({n for n in got if got.count(n) > 1})
    json.dump({"year": year, "draft": True, "source_file": pdf.replace("\\", "/").split("/")[-1], "questions": drafts},
              open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    by = {}
    for d in drafts:
        by[d["area"]] = by.get(d["area"], 0) + 1
    print(f"{year}: {len(drafts)} questions {by}; missing {missing}; duplicated {dupes}")
    for f in ("empty-option", "source-credit"):
        print(f"  {f}: {[d['n'] for d in drafts if f in d['flags']]}")
    print(f"  with an image: {[d['n'] for d in drafts if any(x.startswith('image') for x in d['flags'])]}")


if __name__ == "__main__":
    main()
