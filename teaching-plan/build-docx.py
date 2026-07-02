#!/usr/bin/env python
"""
Generate Word docs from the teaching-plan JSON files.

Usage:  python build-docx.py <slug>        e.g.  python build-docx.py maths-xi

Reads   <slug>-spiral-plan.json  and  <slug>-deep-dive.json  (in this folder)
Writes  <slug>-teaching-plan.docx      (ONE combined file: plan portrait -> mapping landscape)

(build_spiral / build_deepdive remain if a standalone file is ever wanted,
 but main() emits only the combined file.)

The JSON is the source of truth; the .docx files are a throwaway rendering —
re-run this any time the JSON changes. Same generator works for every
grade/subject: just point it at a same-shaped pair of JSON files.
"""
import sys, os, json
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.section import WD_ORIENT, WD_SECTION
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

HERE = os.path.dirname(os.path.abspath(__file__))
GREY = "E7E6E6"
BRAND = RGBColor(0x37, 0x30, 0x8A)  # indigo accent for headings


# ---------- low-level helpers ----------
def shade(cell, hexcolor):
    tcPr = cell._tc.get_or_add_tcPr()
    sh = OxmlElement("w:shd")
    sh.set(qn("w:val"), "clear"); sh.set(qn("w:color"), "auto"); sh.set(qn("w:fill"), hexcolor)
    tcPr.append(sh)


def set_cell(cell, text, size=8, bold=False, italic=False):
    """Write multi-line text into a cell (one paragraph per line)."""
    cell.vertical_alignment = WD_ALIGN_VERTICAL.TOP
    cell.text = ""
    lines = str(text).split("\n")
    for i, line in enumerate(lines):
        p = cell.paragraphs[0] if i == 0 else cell.add_paragraph()
        p.paragraph_format.space_after = Pt(1)
        p.paragraph_format.space_before = Pt(0)
        r = p.add_run(line)
        r.font.size = Pt(size); r.bold = bold; r.italic = italic


def header_row(table, labels, size=8):
    for c, lab in zip(table.rows[0].cells, labels):
        set_cell(c, lab, size=size, bold=True)
        shade(c, GREY)


def set_widths(table, widths_in):
    table.autofit = False
    for row in table.rows:
        for c, w in zip(row.cells, widths_in):
            c.width = Inches(w)


def portrait(s):
    s.top_margin = s.bottom_margin = Inches(0.6)
    s.left_margin = s.right_margin = Inches(0.7)


def landscape(s):
    if s.page_width < s.page_height:
        s.page_width, s.page_height = s.page_height, s.page_width
    s.orientation = WD_ORIENT.LANDSCAPE
    s.top_margin = s.bottom_margin = Inches(0.5)
    s.left_margin = s.right_margin = Inches(0.5)


# ---------- cell formatters ----------
def concepts_cell(concepts):
    return "\n".join("• " + c for c in concepts)


def book_cell(d):
    sec, ex, note = d.get("section"), d.get("exercise"), d.get("note")
    if not sec:
        return "GAP" + (f"\n{note}" if note else "")
    out = [sec]
    if ex: out.append("→ " + ex)
    if note: out.append("Note: " + note)
    return "\n".join(out)


def exam_cell(d):
    cnt, topic, rel, note = d.get("pyq_count"), d.get("topic"), d.get("relevance", ""), d.get("note")
    out = []
    if cnt is not None:
        out.append(f"PYQ freq: {cnt}" + (f" ({topic})" if topic else ""))
    elif topic:
        out.append(topic)
    out.append(f"relevance: {rel}")
    if note: out.append(note)
    return "\n".join(out)


FLAG_LABEL = {
    "sb_split": "⚠ SB split", "ncert_gap": "⚠ NCERT gap",
    "ncert_aligned": "✓ NCERT", "cet_anchor": "★ CET", "nda_anchor": "★ NDA",
    "cbse_gap": "⚠ CBSE gap", "cbse_xi": "◆ CBSE: teach in XI",
}


def subtopic_cell(row):
    head = f"{row['id']}  {row['subtopic']}"
    flags = [FLAG_LABEL.get(f, f) for f in row.get("flags", [])]
    return head + ("\n[" + " · ".join(flags) + "]" if flags else "")


# ---------- content bodies (add to a given doc; no create/save) ----------
def spine_body(doc, data):
    title = data.get("plan_title", "Spiral Teaching Plan")
    h = doc.add_heading(f"LWS Pune {data['subject']} Std {roman(data['grade'])} — {title}", level=0)
    h.runs[0].font.color.rgb = BRAND
    meta = doc.add_paragraph()
    meta.add_run(f"{data['board']} · {data['textbook']}\n").italic = True
    tbd0 = sum(1 for u in data["units"] if u.get("sessions") is None)
    if data.get("total_teaching_sessions"):
        extra0 = f" · +{tbd0} numerical/supplementary units (sessions TBD)" if tbd0 else ""
        meta.add_run(f"{data['total_teaching_sessions']} board-chapter sessions "
                     f"+ {data.get('buffer_sessions','?')} buffer of {data.get('academic_year_sessions','?')}{extra0}").font.size = Pt(9)
    else:
        meta.add_run("Session estimates: TBD").font.size = Pt(9)

    # Guiding principles
    doc.add_heading("Guiding Principles", level=1)
    gp = data["guiding_principles"]
    t = doc.add_table(rows=len(gp) + 1, cols=2); t.style = "Table Grid"
    header_row(t, ["Principle", "What it means"], size=9)
    for i, g in enumerate(gp, start=1):
        set_cell(t.rows[i].cells[0], g["principle"], size=9, bold=True)
        set_cell(t.rows[i].cells[1], g["meaning"], size=9)
    set_widths(t, [1.6, 5.6])

    # Overview
    doc.add_heading("Chapter Overview — All Units", level=1)
    units = data["units"]
    t = doc.add_table(rows=len(units) + 1, cols=5); t.style = "Table Grid"
    header_row(t, ["#", "Chapter Title", "Board Source", "Sessions", "Phase"], size=9)
    for i, u in enumerate(units, start=1):
        set_cell(t.rows[i].cells[0], u["unit_no"], size=9, bold=True)
        set_cell(t.rows[i].cells[1], u["title"], size=9)
        set_cell(t.rows[i].cells[2], u["board_source"], size=9)
        set_cell(t.rows[i].cells[3], str(u["sessions"]) if u.get("sessions") is not None else "TBD", size=9)
        set_cell(t.rows[i].cells[4], "PHASE " + str(u["phase"]), size=9)
    set_widths(t, [0.5, 2.9, 2.1, 0.8, 0.9])
    ss = [u["sessions"] for u in units if u.get("sessions") is not None]
    tbd = sum(1 for u in units if u.get("sessions") is None)
    if ss:
        extra = f" · +{tbd} numerical/supplementary units (TBD)" if tbd else ""
        doc.add_paragraph().add_run(
            f"Total: {sum(ss)} board-chapter sessions · {data.get('academic_year_sessions','?')}-session year · "
            f"{data.get('buffer_sessions','?')} buffer{extra}.").italic = True

    # Phase-by-phase detail
    doc.add_heading("Phase-by-Phase Detail", level=1)
    phases = {p["phase"]: p for p in data["phases"]}
    for ph in sorted(phases):
        p = phases[ph]
        doc.add_heading(f"Phase {ph} — {p['name']}", level=2)
        doc.add_paragraph().add_run(p["blurb"]).italic = True
        for u in [x for x in units if x["phase"] == ph]:
            para = doc.add_paragraph()
            para.add_run(f"Unit {u['unit_no']} · {u['title']} ").bold = True
            sess = f"{u['sessions']} sessions" if u.get("sessions") is not None else "sessions TBD"
            para.add_run(f"({u['board_source']} · {sess})\n").font.size = Pt(9)
            para.add_run(u["why_here"]).font.size = Pt(9)

    supp = data.get("supplementary_nda_topics")
    if supp:
        doc.add_heading("Supplementary NDA Topics — not in the board textbook (to fit later)", level=1)
        for s in supp:
            para = doc.add_paragraph()
            para.add_run(f"{s['topic']} ").bold = True
            para.add_run(f"[{s['status']}] — {s['note']}").font.size = Pt(9)


def deepdive_body(doc, data, unit_meta=None, first_break=False):
    unit_meta = unit_meta or {}
    h = doc.add_heading(f"LWS Pune {data['subject']} Std {roman(data['grade'])} — Syllabus Mapping", level=0)
    h.runs[0].font.color.rgb = BRAND
    doc.add_paragraph().add_run(
        "State Board / CET / NCERT / NDA · ★ = primary exam focus · "
        "✓ = clean cross-book alignment · ⚠ = split or gap to flag · "
        "PYQ freq = past-year-question count for the topic cluster (do not sum across rows) · "
        "relevance = editorial exam-emphasis").italic = True

    cols = ["Subtopic", "Concepts", "State Board", "CET", "NCERT", "NDA"]
    widths = [1.5, 2.5, 1.6, 1.5, 1.6, 1.5]
    for ui, u in enumerate(data["units"]):
        m = unit_meta.get(u["unit_no"], {})
        title = m.get("title", "")
        head = doc.add_heading(f"Unit {u['unit_no']}" + (f" · {title}" if title else ""), level=1)
        if ui > 0 or first_break:
            head.paragraph_format.page_break_before = True  # each unit on its own page
        bits = [b for b in (m.get("board_source"),
                            f"Phase {m['phase']}" if m.get("phase") else None,
                            f"{m['sessions']} sessions" if m.get("sessions") else None) if b]
        if bits:
            doc.add_paragraph().add_run(" · ".join(bits)).italic = True
        t = doc.add_table(rows=len(u["rows"]) + 1, cols=6); t.style = "Table Grid"
        header_row(t, cols)
        for i, row in enumerate(u["rows"], start=1):
            cells = t.rows[i].cells
            set_cell(cells[0], subtopic_cell(row), bold=False)
            set_cell(cells[1], concepts_cell(row["concepts"]))
            set_cell(cells[2], book_cell(row["state_board"]))
            set_cell(cells[3], exam_cell(row["cet"]))
            set_cell(cells[4], book_cell(row["ncert"]))
            set_cell(cells[5], exam_cell(row["nda"]))
        set_widths(t, widths)


# ---------- document builders ----------
def new_doc():
    doc = Document(); doc.styles["Normal"].font.name = "Calibri"
    return doc


def build_spiral(data, out_path):
    doc = new_doc(); portrait(doc.sections[0])
    spine_body(doc, data)
    doc.save(out_path); return out_path


def build_deepdive(data, out_path, unit_meta=None):
    doc = new_doc(); landscape(doc.sections[0])
    deepdive_body(doc, data, unit_meta)
    doc.save(out_path); return out_path


def build_combined(spine, deep, unit_meta, out_path):
    doc = new_doc(); portrait(doc.sections[0])
    spine_body(doc, spine)
    landscape(doc.add_section(WD_SECTION.NEW_PAGE))   # section break: plan -> mapping
    deepdive_body(doc, deep, unit_meta)
    doc.save(out_path); return out_path


def roman(n):
    return {9: "IX", 10: "X", 11: "XI", 12: "XII"}.get(n, str(n))


def main():
    if len(sys.argv) < 2:
        sys.exit("Usage: python build-docx.py <slug>   (e.g. maths-xi)")
    slug = sys.argv[1]
    spine_p = os.path.join(HERE, f"{slug}-spiral-plan.json")
    deep_p = os.path.join(HERE, f"{slug}-deep-dive.json")
    spine = json.load(open(spine_p, encoding="utf-8")) if os.path.exists(spine_p) else None
    deep = json.load(open(deep_p, encoding="utf-8")) if os.path.exists(deep_p) else None
    if not (spine and deep):
        sys.exit(f"Need both {slug}-spiral-plan.json and {slug}-deep-dive.json in {HERE}")
    unit_meta = {u["unit_no"]: u for u in spine["units"]}
    out = build_combined(spine, deep, unit_meta, os.path.join(HERE, f"{slug}-teaching-plan.docx"))
    print("wrote:", os.path.basename(out))


if __name__ == "__main__":
    main()
