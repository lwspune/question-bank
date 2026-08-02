"""Extract NCERT Class 11 + 12 Chemistry section headings.

Font names vary across the four books (BookmanOldStyle-Bold, Bookman-Demi, plain
Bookman ...), so matching on "Bold"/"Demi" silently returned ZERO sections for
some chapters. Instead: per document, whichever font carries the most text is the
BODY font, and any other font is a heading candidate. That generalises without a
per-book lookup table.

NCERT also sets the section NUMBER in a margin block separate from its TITLE, so
candidates are grouped by y-coordinate before being matched.
"""
import fitz, os, re, json, collections

BOOKS = [
    (11, r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books\11th\Chemistry"),
    (12, r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books\12th\Chemistry"),
]
DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "ncert-sections.json")

MOJI = {"\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"',
        "\u2013": "-", "\u2014": "-", "\u00a0": " ", "\uf030": ""}


def clean(s):
    for a, b in MOJI.items():
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", s.replace("\t", " ")).strip()


def tidy_title(title, chap):
    """Trim a heading to its first, single occurrence.

    NCERT repeats the section heading as a running page header, and BOTH passes
    can pick the repeat up — the font pass merges it into the same y-band, the
    plain pass reads it off one line. Cutting at the first reappearance of a
    section number leaves the title exactly once.
    """
    title = re.split(rf"\b{chap}\.\d", title)[0].strip()
    return re.sub(r"\s*[:.]?\s*$", "", title).strip()


def is_exercise(title):
    """NCERT exercises share the N.M numbering of sections.

    A section title is a short noun phrase; an exercise is a long question or
    imperative, so both traits are rejected.
    """
    if title.endswith("?") or len(title) > 60:
        return True
    return bool(re.match(
        r"^(what|why|how|define|write|explain|describe|give|calculate|enumerate|"
        r"differentiate|name|discuss|state|account|draw|arrange|predict|identify|"
        r"complete|illustrate|justify|mention|distinguish|compare|suggest|comment|"
        r"find|derive|prove|show|list|answer)\b", title, re.I))


def body_font(doc):
    c = collections.Counter()
    for p in doc:
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                for s in l["spans"]:
                    c[s["font"]] += len(s["text"])
    return c.most_common(1)[0][0] if c else ""


def headings(path, chap):
    doc = fitz.open(path)
    body = body_font(doc)
    found = {}
    for page in doc:
        items = []
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                txt = "".join(s["text"] for s in l["spans"] if s["font"] != body)
                if txt.strip():
                    items.append((round(l["bbox"][1], 1), round(l["bbox"][0], 1), txt))
        items.sort(key=lambda z: (z[0], z[1]))
        merged, cur = [], None
        for y, x, txt in items:
            if cur and abs(y - cur[0]) <= 2.5:
                cur = (cur[0], cur[1], cur[2] + " " + txt)
            else:
                if cur:
                    merged.append(cur)
                cur = (y, x, txt)
        if cur:
            merged.append(cur)

        for i, (y, x, raw) in enumerate(merged):
            t = clean(raw)
            m = re.match(rf"^{chap}\.(\d+)(?:\.(\d+))?\s+(.*)$", t)
            if not m:
                continue
            n1, n2, title = m.group(1), m.group(2), m.group(3).strip()
            if (len(n1) > 1 and n1.startswith("0")) or not (1 <= int(n1) <= 40):
                continue
            if title and not re.match(r"^[A-Za-z(]", title):
                continue
            j = i + 1
            while j < len(merged) and len(title) < 70:
                ny, _, nraw = merged[j]
                nt = clean(nraw)
                if ny - merged[j - 1][0] > 18 or re.match(rf"^{chap}\.\d", nt):
                    break
                if not re.match(r"^[a-zA-Z]", nt) or len(nt) > 45:
                    break
                title = (title + " " + nt).strip()
                j += 1
            title = tidy_title(title, chap)
            if len(title) < 3 or is_exercise(title):
                continue
            sec = f"{chap}.{n1}" + (f".{n2}" if n2 else "")
            if sec not in found or len(title) > len(found[sec]):
                found[sec] = title
    # Plain-text pass. Some chapters (Amines) place the margin number far from its
    # title, so the y-grouping above cannot join them — but NCERT repeats
    # "9.1 Structure of Amines" as a RUNNING PAGE HEADER, which this catches.
    # Font-pass titles win; this only fills what the font pass missed.
    # Reuse the already-open handle. Opening a SECOND fitz.Document here and
    # never closing it leaked a handle per chapter and wedged the run on Windows.
    full = "\n".join(p.get_text() for p in doc)
    for line in full.split("\n"):
        s = clean(line)
        m = re.match(rf"^{chap}\.(\d+)(?:\.(\d+))?\s+([A-Z][A-Za-z].*)$", s)
        if not m:
            continue
        n1, n2, title = m.group(1), m.group(2), m.group(3).strip()
        if (len(n1) > 1 and n1.startswith("0")) or not (1 <= int(n1) <= 40):
            continue
        # A running header repeats on the extracted line ("Structure of Amines
        # 9.1 Structure of Amines 9.1 ..."). Cut at the first reappearance of a
        # section number; what precedes it is the title exactly once.
        title = re.split(rf"\b{chap}\.\d", title)[0].strip()
        title = re.sub(r"\s*[:.]?\s*$", "", title.split("  ")[0]).strip()
        # NCERT exercises are numbered in the same N.M shape as sections
        # ("10.11 What are essential and non-essential amino acids?"). Section
        # titles are short noun phrases; exercise text is a long imperative or
        # a question, so both traits are rejected.
        if is_exercise(title):
            continue
        if not (3 <= len(title) <= 60):
            continue
        sec = f"{chap}.{n1}" + (f".{n2}" if n2 else "")
        if sec not in found or len(title) > len(found[sec]):
            found[sec] = title

    doc.close()
    return found


def main():
    out = []
    for cls, root in BOOKS:
        for part in sorted(os.listdir(root)):
            pdir = os.path.join(root, part)
            if not os.path.isdir(pdir):
                continue
            for f in sorted(os.listdir(pdir)):
                m = re.match(r"(\d+)\. (.+)\.pdf$", f)
                if not m:
                    continue
                chap, name = int(m.group(1)), m.group(2)
                secs = headings(os.path.join(pdir, f), chap)
                for s in sorted(secs, key=lambda k: tuple(int(x) for x in k.split("."))):
                    out.append({"class": cls, "chapter_no": chap, "chapter_name": name,
                                "section_no": s, "concept": secs[s]})
                print(f"  Std {cls} ch{chap:>2} {name[:44]:<44} {len(secs):>3} sections")
    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    with open(DEST, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print(f"\nTOTAL {len(out)} NCERT sections -> {os.path.normpath(DEST)}")


if __name__ == "__main__":
    main()
