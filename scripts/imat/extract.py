"""
Extract an IMAT paper's text layer into a DRAFT transcription.

    python scripts/imat/extract.py <paper.pdf> <year> <out.json>

Works for 2024, 2025 and 2026, whose PDFs carry a real text layer. NOT for
2023: its font has no character map, so its text extracts as garbage and the
paper is transcribed from page images instead.

What it does
- Splits the paper into its five printed sections and 60 numbered questions,
  each with a stem and options A-E in PRINTED order (A is the correct one).
- Keeps sub- and superscripts. The plain text layer flattens x squared to "x2"
  and H2O's subscript to "H2O"; reading span sizes and baselines instead, a
  smaller raised span becomes ^{...} and a smaller lowered one _{...}, and the
  token is wrapped in inline LaTeX the way the bank stores formulas.
- Flags every question a person must check against the page image: an empty
  option (a formula drawn as a graphic), a stem that mentions a table or
  figure, or any sub/superscript at all.

It writes a DRAFT. `chapter` is left empty for a person to fill from the
syllabus, and nothing here is committed until a person has compared the draft
with the page.
"""
import json
import re
import sys

import fitz  # PyMuPDF

SECTION_HEADS = {
    "Reading skills and knowledge acquired during studies": "reading",
    "Logical reasoning and problem-solving": "logic",
    "Biology": "biology",
    "Chemistry": "chemistry",
    "Physics and Mathematics": "physmath",
}
BOILERPLATE = re.compile(
    r"^(Ministero dell.Universit. e della Ricerca|\d{1,2}|CALL FOR APPLICATIONS.*|"
    r"SINGLE-CYCLE DEGREE.*|AND DENTAL PROSTHODONTICS.*|Academic Year \d{4}/\d{4}|"
    r"\*+ ?FINE DELLE DOMANDE ?\*+|Per ogni domanda.*|"
    r"ADMISSION TEST.*|.*IN ENGLISH.*)$"
)
CHEM_LIKE = {"biology", "chemistry"}


def line_text(line):
    """A line's text with sub/superscripts marked as _{..} / ^{..}."""
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


def wrap_scripts(text, section):
    """Wrap each whitespace token carrying ^{ or _{ in inline LaTeX."""
    def fix(tok):
        if "^{" not in tok and "_{" not in tok:
            return tok
        m = re.match(r"^([(\[]*)(.*?)([.,;:?)\]]*)$", tok)
        lead, core, trail = m.group(1), m.group(2), m.group(3)
        # Keep a bracket inside the maths when its partner is inside too:
        # "(NH_{4})_{2}" must not become "(" + "\(NH_4)_2\)".
        while lead and core.count(")") + core.count("]") > core.count("(") + core.count("["):
            core, lead = lead[-1] + core, lead[:-1]
        while trail and core.count("(") + core.count("[") > core.count(")") + core.count("]"):
            core, trail = core + trail[0], trail[1:]
        if section in CHEM_LIKE:
            # H_{2}O -> \(\text{H}_{2}\text{O}\)
            parts = re.split(r"([_^]\{[^}]*\})", core)
            core = "".join(p if p.startswith(("_{", "^{")) or not p else f"\\text{{{p}}}" for p in parts)
        return f"{lead}\\({core}\\){trail}"
    return " ".join(fix(t) for t in text.split(" "))


def main(pdf, year, out):
    doc = fitz.open(pdf)
    lines = []
    for page in doc:
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                t = line_text(line).strip()
                if t:
                    lines.append(t)

    section = None
    questions = []
    cur = None
    q_re = re.compile(r"^(\d{1,2})\.\s*(.*)$")
    opt_re = re.compile(r"^([A-E])\)\s*(.*)$")
    for raw in lines:
        if raw in SECTION_HEADS:
            section = SECTION_HEADS[raw]
            continue
        if BOILERPLATE.match(raw):
            continue
        m = q_re.match(raw)
        if m and section and (cur is None or int(m.group(1)) == cur["n"] + 1):
            cur = {"n": int(m.group(1)), "section": section, "stem": [m.group(2)] if m.group(2) else [], "options": {}, "last": "stem"}
            questions.append(cur)
            continue
        if cur is None:
            continue
        m = opt_re.match(raw)
        if m and m.group(1) == "ABCDE"[len(cur["options"])]:
            cur["options"][m.group(1)] = [m.group(2)] if m.group(2) else []
            cur["last"] = m.group(1)
            continue
        if cur["last"] == "stem":
            cur["stem"].append(raw)
        else:
            cur["options"][cur["last"]].append(raw)

    drafts = []
    for q in questions:
        sec = q["section"]
        stem = wrap_scripts(" ".join(q["stem"]).strip(), sec)
        opts = [wrap_scripts(" ".join(q["options"].get(k, [])).strip(), sec) for k in "ABCDE"]
        flags = []
        if any(not o for o in opts):
            flags.append("empty-option")
        if re.search(r"\b(table|figure|graph|diagram|shown|following picture)\b", stem, re.I):
            flags.append("table-or-figure")
        if "\\(" in stem or any("\\(" in o for o in opts):
            flags.append("scripts")
        drafts.append({
            "n": q["n"], "section": sec, "subject": None, "chapter": "",
            "text": stem, "options": opts, "flags": flags,
        })

    json.dump({"year": int(year), "draft": True, "questions": drafts}, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{year}: {len(drafts)} questions; flagged {sum(1 for d in drafts if d['flags'])}: "
          + ", ".join(f"Q{d['n']}[{'/'.join(d['flags'])}]" for d in drafts if d["flags"]))


if __name__ == "__main__":
    main(*sys.argv[1:4])
