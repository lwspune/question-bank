"""Compare bank questions with the MHT-CET paper they were transcribed from.

    python scripts/mhtcet/source-compare.py <ids.txt> <outDir>

<ids.txt>: one full question id per line (anything after '#' is a note, kept in
the report). For each id, the report shows OUR stem, options and key next to the
PRINTED question:
  - 2021-2025: the .docx paper under PYQPs/<year>/, converted with pandoc (text,
    with Word equations as LaTeX). Located from pyq_year + pyq_note, never
    source_file (see memory: mhtcet-source-docx-render).
  - 2026: a typeset PDF whose formulas are DRAWN, so the text layer has no
    numbers. The question is cropped to <outDir>/crops/<id8>.png to be looked at.

Read-only: it reads the database (psql, SUPABASE_DB_URL from .env.local) and the
papers, and writes only <outDir>. Deciding what to do with a row is the reader's
job; corrections go through scripts/reports/apply-fixes.ts.
"""
import glob, json, os, re, subprocess, sys

import fitz  # PyMuPDF

PYQ = r"C:\Vilas\LWS_Pune\MHT-CET\PYQPs"
PSQL = r"C:\Program Files\PostgreSQL\17\bin\psql.exe"
ORD = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"}


def db_url():
    for line in open(".env.local", encoding="utf-8"):
        if line.startswith("SUPABASE_DB_URL="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("SUPABASE_DB_URL not in .env.local")


def fetch(ids):
    q = (
        "select coalesce(json_agg(json_build_object('id',q.id,'year',q.pyq_year,'note',q.pyq_note,'qn',q.question_number,"
        "'text',q.text,'opts',(select json_agg(json_build_object('l',o.label,'t',o.text,'c',o.is_correct) order by o.label) "
        "from options o where o.question_id=q.id))),'[]') from questions q where q.id in (%s)"
        % ",".join("'%s'" % i for i in ids)
    )
    out = subprocess.run([PSQL, db_url(), "-At", "-c", q], capture_output=True, text=True, encoding="utf-8", check=True)
    return {r["id"]: r for r in json.loads(out.stdout)}


def shift_of(note):
    m = re.match(r"^(?:(\d{1,2})(?:st|nd|rd|th)?\s+)?(?:[A-Za-z]+\s+)?Shift\s+(1|2|I|II)$", (note or "").strip())
    if not m:
        return None, None
    return (int(m.group(1)) if m.group(1) else None), (1 if m.group(2) in ("1", "I") else 2)


def source_file(year, note):
    day, shift = shift_of(note)
    files = os.listdir(os.path.join(PYQ, str(year)))
    low = {f.lower(): f for f in files}
    if year in (2021, 2022):
        return os.path.join(PYQ, str(year), f"MHT_CET_{year}_QP.docx")
    if year in (2023, 2024):
        want = f"{day} may shift {shift} (ques).docx"
        return os.path.join(PYQ, str(year), low[want]) if want in low else None
    if year == 2025:
        roman = "i" if shift == 1 else "ii"
        for f in files:
            n = f.lower().replace("-", "").replace("  ", " ")
            if re.match(rf"^{day}(st|nd|rd|th) april shift ?{roman}\.docx$", n):
                return os.path.join(PYQ, str(year), f)
        return None
    if year == 2026:
        month = "April" if "April" in note or "Apr" in note else "May"
        session = "Morning" if shift == 1 else "Evening"
        name = f"MHT CET 2026 {day}{ORD.get(day, 'th')} {month} {session} Shift Question Paper with Answer Key.pdf"
        p = os.path.join(PYQ, "2026", name)
        return p if os.path.exists(p) else None
    return None


_md = {}


def docx_question(path, qn, cache):
    if path not in _md:
        # Key by year AND name: 2023 and 2024 share file names ("9 may shift 1
        # (ques).docx"), and Windows ignores case, so the name alone collides.
        year = os.path.basename(os.path.dirname(path))
        md = os.path.join(cache, year + "_" + re.sub(r"[^A-Za-z0-9]+", "_", os.path.basename(path)) + ".md")
        if not os.path.exists(md):
            subprocess.run(["pandoc", path, "-t", "markdown", "-o", md], check=True)
        _md[path] = open(md, encoding="utf-8").read().split("\n")
    out, on = [], False
    for line in _md[path]:
        if re.match(r"^%s\\?\." % qn, line):
            on = True
        elif on and re.match(r"^\d{1,3}\\?\.", line):
            break
        if on and line.strip():
            out.append(line.strip())
    text = " ".join(out)
    for _ in range(3):
        text = re.sub(r"\\mathbf\{([^{}]*)\}", r"\1", text)
    return text.replace("**", "")


def pdf_crop(path, qn, crop_path):
    doc = fitz.open(path)
    labels = []
    for pi, page in enumerate(doc):
        for w in page.get_text("words"):
            m = re.match(r"^Q(\d{1,3})\.$", w[4])
            if m and w[0] < 60:
                labels.append((int(m.group(1)), pi, w[1]))
    for i, (n, pi, y) in enumerate(labels):
        if n == int(qn):
            nxt = labels[i + 1] if i + 1 < len(labels) else None
            y1 = nxt[2] if nxt and nxt[1] == pi else 772.0
            page = doc[pi]
            clip = fitz.Rect(30, y - 4, 505, y1 - 2)
            page.get_pixmap(clip=clip, dpi=130).save(crop_path)
            return crop_path
    return None


def main():
    ids_path, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(os.path.join(out_dir, "crops"), exist_ok=True)
    cache = os.path.join(out_dir, "md")
    os.makedirs(cache, exist_ok=True)
    notes, ids = {}, []
    for line in open(ids_path, encoding="utf-8"):
        qid, _, note = line.partition("#")
        qid = qid.strip()
        if qid:
            ids.append(qid)
            notes[qid] = note.strip()
    rows = fetch(ids)
    report = []
    for qid in ids:
        r = rows.get(qid)
        if not r:
            report.append(f"## {qid}\nNOT FOUND\n")
            continue
        key = "".join(o["l"] for o in (r["opts"] or []) if o["c"])
        ours = r["text"] + "\n" + "\n".join(f"  ({o['l']}) {o['t']}" for o in (r["opts"] or []))
        path = source_file(r["year"], r["note"])
        if path is None:
            printed = "SOURCE FILE NOT FOUND"
        elif path.endswith(".pdf"):
            crop = pdf_crop(path, r["qn"], os.path.join(out_dir, "crops", qid[:8] + ".png"))
            printed = f"(PDF, formulas drawn) crop: {crop}" if crop else "QUESTION NOT FOUND IN PDF"
        else:
            printed = docx_question(path, r["qn"], cache) or "QUESTION NOT FOUND IN DOCX"
        report.append(
            f"## {qid} | {r['year']} {r['note']} Q{r['qn']} | key {key}\n"
            f"Flag: {notes[qid]}\n\nOURS:\n{ours}\n\nPRINTED ({os.path.basename(path) if path else '-'}):\n{printed}\n"
        )
    open(os.path.join(out_dir, "report.md"), "w", encoding="utf-8").write("\n".join(report))
    print(f"{len(ids)} questions -> {os.path.join(out_dir, 'report.md')}")


main()
