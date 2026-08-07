"""Extract NCERT Class 11 + 12 MATHEMATICS section headings.

    python scripts/syllabus/dump_ncert_maths_sections.py           # both years
    python scripts/syllabus/dump_ncert_maths_sections.py 12        # one year

Writes scripts/syllabus/data/maths-ncert-11.json and maths-ncert-12.json — the
shape scripts/syllabus/seed.ts expects (registered in the subject registry;
seed with --spine=ncert).

Reads the PER-CHAPTER PDFs (rationalised edition: 14 chapters in Class 11,
13 in Class 12). Class 12 Part 2's files are named "01. Integrals.pdf" onward
but NCERT numbers its chapters CONTINUOUSLY across parts — Integrals is
printed Chapter 7 with sections 7.x — so the printed chapter number is
filename number + 6 and, unlike the State Board Maths books, NO renumbering
is applied here: the stored refs are exactly the printed ones.

Typography (probed on all three book groups, 2026-08-07): body is 11 pt;
top-level headings are 12 pt bold, sub-sections 11 pt bold(+bold-italic) —
size AND weight both signal, unlike the State Board's weight-only setting.
The NCERT-specific quirk is that sub-headings run straight into their body
text with NO separator ("6.3.2 Factorial notation  The notation n! represents
...") — the body continues in REGULAR face on the same line, so the title is
the line's LEADING BOLD SPAN RUN, not the whole line.

Chapter titles are authored in CHAPTER_TITLES (official NCERT names — the
filenames abbreviate: "06. PNC", "11. 3D Geom") and each is VERIFIED against
the chapter's own opening pages at run time; a mismatch is a loud problem,
not a silent trust.
"""
import fitz, os, re, json, sys

BASE = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books"
FOLDERS = [
    # (class, printed-chapter offset, folder)
    (11, 0, os.path.join(BASE, "11th", "Maths")),
    (12, 0, os.path.join(BASE, "12th", "Maths", "Part 1")),
    (12, 6, os.path.join(BASE, "12th", "Maths", "Part 2")),
]
DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# Official rationalised-edition chapter titles, keyed by (class, printed no).
# Each is verified against the chapter's opening pages at run time.
CHAPTER_TITLES = {
    (11, 1): "Sets",
    (11, 2): "Relations and Functions",
    (11, 3): "Trigonometric Functions",
    (11, 4): "Complex Numbers and Quadratic Equations",
    (11, 5): "Linear Inequalities",
    (11, 6): "Permutations and Combinations",
    (11, 7): "Binomial Theorem",
    (11, 8): "Sequences and Series",
    (11, 9): "Straight Lines",
    (11, 10): "Conic Sections",
    (11, 11): "Introduction to Three Dimensional Geometry",
    (11, 12): "Limits and Derivatives",
    (11, 13): "Statistics",
    (11, 14): "Probability",
    (12, 1): "Relations and Functions",
    (12, 2): "Inverse Trigonometric Functions",
    (12, 3): "Matrices",
    (12, 4): "Determinants",
    (12, 5): "Continuity and Differentiability",
    (12, 6): "Application of Derivatives",
    (12, 7): "Integrals",
    (12, 8): "Application of Integrals",
    (12, 9): "Differential Equations",
    (12, 10): "Vector Algebra",
    (12, 11): "Three Dimensional Geometry",
    (12, 12): "Linear Programming",
    (12, 13): "Probability",
}

MOJI = {"\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"',
        "\u2013": "-", "\u2014": "-", "\u00a0": " ", "\u00ad": ""}

# Trailing \s OR end-of-line: sub-section numbers can stand BARE on their own
# line ("7.2.1", title on the next line) — requiring a trailing space silently
# dropped every one of them. The optional trailing dot is real
# ("5.5.  Logarithmic Differentiation") and so is a space INSIDE the number:
# Conic Sections prints "10. 5" (bare, "Ellipse" on the next line) — the same
# quirk the State Board's "4. 1" taught.
HEADING = re.compile(r"^(\d{1,2})\.\s?(\d{1,2})(?:\.(\d{1,2}))?\.?(?:\s|$)")

# Titles the extractor cannot recover, keyed by (class, printed ref); every
# entry transcribed from the RENDERED page. Two cases: headings set in the
# colored ITALIC face (no bold span, so the leading-bold-run rule correctly
# yields nothing) and a 3-line wrapped title the single-line continuation
# cannot span. REPLACE the extracted title.
TITLE_OVERRIDES: dict[tuple[int, str], str] = {
    (11, "7.2.1"): "Binomial theorem for any positive integer n",
    (11, "7.2.2"): "Some special cases",
    (11, "8.4.2"): "Sum to n terms of a G.P.",
    (11, "10.5.1"): (
        "Relationship between semi-major axis, semi-minor axis and the "
        "distance of the focus from the centre of the ellipse"
    ),
    # Wrapped titles whose remainder the single-line continuation missed.
    (11, "9.2.2"): (
        "Conditions for parallelism and perpendicularity of lines in terms of their slopes"
    ),
    (11, "9.4.1"): "Distance between two parallel lines",
    # The heading's tail is a display-set formula the text layer shreds.
    (12, "7.6.1"): "Integral of the type ∫ eˣ[f(x) + f′(x)] dx",
}


def clean(s: str) -> str:
    for a, b in MOJI.items():
        s = s.replace(a, b)
    s = re.sub(r"\s+", " ", s.replace("\t", " ")).strip()
    # Span joins scatter spaces inside acronyms: "G . P." / "G .M." -> "G.P.",
    # "G.M.". Only single capitals around a dot are touched.
    s = re.sub(r"\b([A-Z])\s+\.", r"\1.", s)
    s = re.sub(r"\b([A-Z])\.\s+(?=[A-Z]\.)", r"\1.", s)
    return re.sub(r"\s*[:.]+\s*$", "", s).strip()


def is_bold(span) -> bool:
    return "bold" in span["font"].lower()


def chapter_of(filename: str):
    m = re.match(r"^(\d{1,2})\.\s.+\.pdf$", filename, re.I)
    return int(m.group(1)) if m else None


def extract_chapter(path: str, chap_no: int):
    """(printed_ref, title) headings of one chapter, in book order.

    The title is the heading line's LEADING BOLD RUN — NCERT sub-headings run
    into their body text on the same line with the body in regular face.
    """
    doc = fitz.open(path)
    found: dict[str, str] = {}
    order: list[str] = []
    pending = None  # a fully-bold heading whose title may wrap onto the next line

    for page in doc:
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                # The number/title separator often lives in a WHITESPACE-ONLY
                # span — dropping those from the text join yields
                # "7.1Introduction" and no heading ever matches. Keep every
                # span for the text; use only inked spans for font tests.
                spans = line.get("spans", [])
                inked = [s for s in spans if s["text"].strip()]
                if not inked:
                    continue
                text = "".join(s["text"] for s in spans).strip()

                m = HEADING.match(text)
                if m and int(m.group(1)) == chap_no and is_bold(inked[0]):
                    ref = f"{chap_no}.{m.group(2)}" + (f".{m.group(3)}" if m.group(3) else "")
                    if found.get(ref):
                        pending = None
                        continue
                    # Leading bold run only: body text continues in regular
                    # face on the same line. Whitespace spans never break the
                    # run (their font is arbitrary).
                    bold_run = []
                    for s in spans:
                        if not s["text"].strip():
                            bold_run.append(s["text"])
                            continue
                        if not is_bold(s):
                            break
                        bold_run.append(s["text"])
                    title = clean(re.sub(r"^\d{1,2}\.\s?\d{1,2}(\.\d{1,2})?\.?\s*", "", "".join(bold_run).strip()))
                    all_bold = all(is_bold(s) for s in inked)
                    if ref not in found:
                        order.append(ref)
                    found[ref] = title
                    pending = {"ref": ref, "open": all_bold} if all_bold else None
                    continue

                # Wrapped title: only for a heading whose whole line was bold,
                # continued by another fully-bold line that is not a heading.
                if (
                    pending
                    and pending["open"]
                    and all(is_bold(s) for s in inked)
                    and not HEADING.match(text)
                    and len(text) < 80
                    and not re.match(r"^(example|exercise|miscellaneous|summary|historical|chapter|\d)", text, re.I)
                ):
                    found[pending["ref"]] = clean(found[pending["ref"]] + " " + text)
                    pending = None
                    continue
                pending = None

    sections = []
    untitled = []
    for ref in order:
        title = found[ref]
        if not title:
            untitled.append(ref)
            continue
        sections.append((ref, title))
    return sections, untitled


def sort_key(ref: str):
    return tuple(int(x) for x in ref.split("."))


def verify_chapter_title(path: str, chap_no: int, title: str) -> bool:
    """The chapter's opening pages must carry the expected official title —
    catches a wrong CHAPTER_TITLES entry or a misnumbered file."""
    doc = fitz.open(path)
    text = " ".join(doc[p].get_text() for p in range(min(2, len(doc))))
    squash = re.sub(r"\s+", " ", text).lower()
    return title.lower() in squash


def build(cls: int):
    rows, seq = [], 0
    problems = []
    for c, offset, folder in FOLDERS:
        if c != cls:
            continue
        for filename in sorted(f for f in os.listdir(folder) if f.lower().endswith(".pdf")):
            file_no = chapter_of(filename)
            if file_no is None:
                continue  # kemh/lemh answer + appendix files
            chap_no = file_no + offset
            chap_name = CHAPTER_TITLES.get((cls, chap_no))
            if not chap_name:
                problems.append(f"no CHAPTER_TITLES entry for Std {cls} ch{chap_no} ({filename})")
                continue
            path = os.path.join(folder, filename)
            if not verify_chapter_title(path, chap_no, chap_name):
                problems.append(
                    f"TITLE MISMATCH Std {cls} ch{chap_no}: opening pages do not carry "
                    f"{chap_name!r} ({filename})"
                )
            secs, untitled = extract_chapter(path, chap_no)
            over = {
                ref: t for (c2, ref), t in TITLE_OVERRIDES.items()
                if c2 == cls and ref.split(".")[0] == str(chap_no)
            }
            secs = [(ref, over.pop(ref) if ref in over else t) for ref, t in secs]
            for ref in list(untitled):
                if ref in over:
                    secs.append((ref, over.pop(ref)))
                    untitled.remove(ref)
            for ref in over:
                problems.append(f"STALE OVERRIDE Std {cls} {ref}")
            for ref in untitled:
                problems.append(f"NEEDS-TITLE Std {cls} {ref} ({chap_name})")
            if not secs:
                # A chapter yielding nothing is ALWAYS an extraction failure,
                # never book structure — every NCERT chapter opens at N.1.
                problems.append(f"NO SECTIONS Std {cls} ch{chap_no} ({chap_name})")
            secs.sort(key=lambda t: sort_key(t[0]))
            majors = sorted({int(r.split(".")[1]) for r, _ in secs})
            gaps = [m for m in range(1, majors[-1] + 1) if m not in majors] if majors else ["NONE"]
            for ref, title in secs:
                seq += 1
                rows.append({
                    "class": cls,
                    "subject": "Mathematics",
                    "source": "NCERT",
                    "chapter_no": chap_no,
                    "chapter_name": chap_name,
                    "section_no": ref,
                    "concept": title,
                    "seq": seq,
                })
            line = f"  ch{chap_no:>2} {chap_name[:44]:<44} {len(secs):>3} sections"
            if gaps:
                line += f"  !! gaps: {gaps}"
            print(line.encode("ascii", "replace").decode())
    for p in problems:
        print(f"  !! {p}".encode("ascii", "replace").decode())
    return rows, problems


def main():
    want = [int(a) for a in sys.argv[1:] if a.isdigit()] or [11, 12]
    for cls in want:
        print(f"=== Std {cls} ===")
        rows, problems = build(cls)
        dest = os.path.join(DEST, f"maths-ncert-{cls}.json")
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(rows, f, indent=1, ensure_ascii=False)
        chapters = len({r["chapter_no"] for r in rows})
        print(f"  -> {dest}  ({len(rows)} concepts across {chapters} chapters)")
        print("" if not problems else f"  !! {len(problems)} problem(s) need resolution before seeding\n")


if __name__ == "__main__":
    main()
