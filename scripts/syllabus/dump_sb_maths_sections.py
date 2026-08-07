"""Extract Maharashtra State Board Std XI + XII MATHEMATICS section headings.

    python scripts/syllabus/dump_sb_maths_sections.py            # both years
    python scripts/syllabus/dump_sb_maths_sections.py 11         # one year

Writes scripts/syllabus/data/maths-sb-11.json and maths-sb-12.json — the shape
`scripts/syllabus/seed.ts` expects (and the subject registry already names).

CONTINUOUS RENUMBERING — the one structural difference from Physics/Chemistry.
Each Maths year is TWO books ("Part 1" / "Part 2") that BOTH restart at
Chapter 1 §1.1: Std XII prints a "1.1" in Mathematical Logic (Part 1) AND in
Differentiation (Part 2), which collides on the spine's unique key
(source, class, subject, section_no). Decision 2026-08-07: renumber Part 2
continuously after Part 1 — the same convention NCERT itself uses for its own
Part 2 (Integrals is printed Chapter 7 there):

    Std XI:  Part 1 Ch.1-9 stay 1-9,  Part 2 Ch.1-9 become 10-18
    Std XII: Part 1 Ch.1-7 stay 1-7,  Part 2 Ch.1-8 become 8-15

So section_no "10.2" here is the page printed "1.2" in Std XI Part 2
(Complex Numbers), and "8.2.1" is printed "1.2.1" in Std XII Part 2
(Differentiation). Anything citing this spine (rulings, covered_by, the
handout) cites the RENUMBERED refs; translate back by subtracting the Part 1
chapter count.

Reads the publisher's PER-CHAPTER PDFs, not the whole-book file — inside the
Vectors PDF the only valid printed section number is 5.x, which structurally
rejects the whole-book pass's false positives. The printed chapter number comes
from the `Ch_NN_...` filename; the chapter TITLE comes from CHAPTER_TITLES
below (verified against the books' own index pages / chapter banners), because
several filenames carry typos ("Diffrential", "Determinent", "Trigno").

Typography (probed on all four books, 2026-08-07): headings are BODY-SIZE
(12 pt) bold — TimesNewRomanPS-BoldMT or AGTimes,Bold — so weight is the only
signal, exactly like SB Physics Std XI. TWO signals must agree for a line to be
a heading: the printed-chapter numeric shape AND a bold span. Maths-specific
quirks the probe surfaced, each handled below:
  - top-level sections often set the NUMBER alone on one bold line with the
    title on the NEXT bold line ("5.3" / "Product of vectors :");
  - headings frequently run INTO their body text on the same line
    ("6.3.1 Tangent : When a line intersects a circle in") — the title is cut
    at its first colon;
  - some separators are " : " straight after the number
    ("5.5.2 : Vector triple product :");
  - a few titles are set in MATH (CambriaMath, NOT bold — e.g. Indefinite
    Integration's integral-form headings), which the continuation rule cannot
    absorb: those surface in the NEEDS-TITLE report and are supplied via
    MATH_TITLES, transcribed from the rendered page.
"""
import fitz, os, re, json, sys

FOLDERS = [
    # (class, part, printed-chapter offset, folder)
    (11, 1, 0, r"C:/tmp/PYQPs/MHT-CET/State_Board/11th/Maths/Part 1/Part 1_Chapterwise"),
    (11, 2, 9, r"C:/tmp/PYQPs/MHT-CET/State_Board/11th/Maths/Part 2/Part 2_Chapterwise"),
    (12, 1, 0, r"C:/tmp/PYQPs/MHT-CET/State_Board/12th/Part 01"),
    (12, 2, 7, r"C:/tmp/PYQPs/MHT-CET/State_Board/12th/Part 02"),
]
DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# Official chapter titles. Std XI + XII Part 1 from the whole-book INDEX pages
# (State_Board_Maths_*_Part_*.pdf p10); Std XII Part 2 from each chapter's own
# page-1 banner (its index page did not parse; the banner is direct print
# evidence). Keyed by (class, part, printed chapter number).
CHAPTER_TITLES = {
    (11, 1, 1): "Angle and its Measurement",
    (11, 1, 2): "Trigonometry - I",
    (11, 1, 3): "Trigonometry - II",
    (11, 1, 4): "Determinants and Matrices",
    (11, 1, 5): "Straight Line",
    (11, 1, 6): "Circle",
    (11, 1, 7): "Conic Sections",
    (11, 1, 8): "Measures of Dispersion",
    (11, 1, 9): "Probability",
    (11, 2, 1): "Complex Numbers",
    (11, 2, 2): "Sequences and Series",
    (11, 2, 3): "Permutations and Combination",
    (11, 2, 4): "Methods of Induction and Binomial Theorem",
    (11, 2, 5): "Sets and Relations",
    (11, 2, 6): "Functions",
    (11, 2, 7): "Limits",
    (11, 2, 8): "Continuity",
    (11, 2, 9): "Differentiation",
    (12, 1, 1): "Mathematical Logic",
    (12, 1, 2): "Matrices",
    (12, 1, 3): "Trigonometric Functions",
    (12, 1, 4): "Pair of Straight Lines",
    (12, 1, 5): "Vectors",
    (12, 1, 6): "Line and Plane",
    (12, 1, 7): "Linear Programming",
    (12, 2, 1): "Differentiation",
    (12, 2, 2): "Applications of Derivatives",
    (12, 2, 3): "Indefinite Integration",
    (12, 2, 4): "Definite Integration",
    (12, 2, 5): "Application of Definite Integration",
    (12, 2, 6): "Differential Equations",
    (12, 2, 7): "Probability Distributions",
    (12, 2, 8): "Binomial Distribution",
}

MOJI = {"\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"',
        "\u2013": "-", "\u2014": "-", "\u00a0": " ", "\u00ad": ""}

# Devanagari set in a symbol font decodes to ASCII rubble (see the Physics
# extractor). Conservative: only a parenthesised group with no lowercase letter
# AND symbol debris is stripped.
MARATHI_DEBRIS = re.compile(r"\s*\([^()a-z]*[&<>|~^@#$%*][^()a-z]*\)")

# "5.1", "5.1.", "5.1.2", "3.3.2 :", "1.2.7. Powers of i" — separator dot or
# colon optional, title optional (bare-number headings take their title from
# the next bold line via the continuation rule). The space after the first dot
# is REAL: Definite Integration prints "4. 1 Definite integral as limit of
# sum" (verified on the rendered page), and without it the chapter extracted
# two sections instead of eight.
HEADING = re.compile(r"^(\d{1,2})\.\s?(\d{1,2})(?:\.(\d{1,2}))?[.:]?(?:\s+(\S.*))?$")

# Titles the text layer cannot yield faithfully, keyed by (class, part,
# PRINTED ref). Three cases, every entry transcribed from the RENDERED page:
#   - the book prints NO title (a bare number over a content box);
#   - the title is set in math (CambriaMath, ∫ garbles to a stray glyph);
#   - the title's superscripts flatten ("y2 = 4 ax").
# These REPLACE whatever was extracted — a garbled extraction must not win by
# merely existing. A run reports NEEDS-TITLE for any bare ref missing here.
TITLE_OVERRIDES: dict[tuple[int, int, str], str] = {
    # Bare "1.4.1." under "1.4 SOME IMPORTANT RESULTS": the standard
    # equivalences p->q = ~p v q, p<->q = (p->q)^(q->p), distributivity,
    # proved by truth table.
    (12, 1, "1.4.1"): "Standard logical equivalences",
    # Bare "3.1.2" over a box of Theorems 1-3: integral of sum, difference,
    # constant multiple.
    (12, 2, "3.1.2"): "Theorems on integrals (linearity)",
    (12, 2, "3.2.4"): "Integrals of the type ∫ dx/(ax² + bx + c) and ∫ dx/√(ax² + bx + c)",
    (12, 2, "3.2.5"): "Integrals of the type ∫ dx/(a sin²x + b cos²x + c)",
    # 3.2.6's p114 heading is bare; its p123 restatement's ∫ garbles.
    (12, 2, "3.2.6"): "Integrals of the type ∫ dx/(a sin x + b cos x + c)",
    (12, 2, "3.3.2"): "Integrals of the type ∫ (px + q)√(ax² + bx + c) dx",
    # Extracted with CambriaMath debris ("?e x [ f (x) + f ' (x)]").
    (12, 2, "3.3.3"): "Integrals of the type ∫ eˣ[f(x) + f′(x)] dx",
    # Bare "4.2.1" introducing Properties I-VIII; without an override the
    # continuation rule absorbs "Property I" as the title.
    (12, 2, "4.2.1"): "Properties of definite integrals",
    # Printed as definition prose with no title ("9.3.2 Let S be a finite
    # sample space, associated with ..."): the P(A/B) = n(A∩B)/n(B) result.
    (11, 1, "9.3.2"): "Conditional probability for equally likely outcomes",
    # Wrapped titles whose continuation line is set in REGULAR face (a
    # typesetting slip — "functions." carries no bold span), so no absorption
    # rule can honestly recover them; transcribed from the page.
    (11, 1, "5.4.2"): "The distance of the point (x₁, y₁) from a line",
    (11, 2, "9.2.2"): "Theorem 2. Derivative of Difference of functions",
    (11, 2, "9.2.3"): "Theorem 3. Derivative of Product of functions",
    (11, 2, "9.2.4"): "Theorem 4. Derivative of Quotient of functions",
    # Superscripts flatten in the text layer ("y2 = 4 ax").
    (11, 1, "7.1.6"): "Tracing of the parabola y² = 4ax (a > 0)",
    (11, 1, "7.1.9"): "Parametric expressions of standard parabola y² = 4ax",
    (11, 2, "4.3"): "General term in expansion of (a+b)ⁿ",
    (12, 1, "4.3"): "Angle between lines represented by ax² + 2hxy + by² = 0",
    # Wrap set in regular face, like the theorem headings above.
    (11, 1, "2.2.1"): "Domain and Range of Trigonometric functions",
    # Justified setting hyphenates across the line break ("perpen dicular").
    (11, 1, "7.3.7"): "Locus of point of intersection of perpendicular tangents",
    # The heading is followed by a bold run-in sub-label the continuation rule
    # absorbed ("Random Experiment", "Tree Diagram", "One-one or ...") — the
    # printed TITLE is just the first phrase.
    (11, 1, "9.1.1"): "Basic Terminologies",
    (11, 2, "3.2"): "Fundamental principles of counting",
    (11, 2, "6.1.1"): "Types of function",
    # "3.3 Inverse Trigonometric Functions" carries a subtitle line
    # ("Properties, Principal values of ...") that joined the title.
    (12, 1, "3.3"): "Inverse Trigonometric Functions",
    # Vector overbars flatten to "point A a( ) and parallel to b" — the
    # printed heading, p211 of the book.
    (12, 1, "6.4.2"): "The vector equation of the plane passing through point A(ā) and parallel to b̄ and c̄",
}

# The book misnumbers a handful of sections in PRINT, and two of those clashes
# collide with the spine's unique key. Each entry is verified on the rendered
# page: (class, part, printed ref) -> alias for the SECOND, textually distinct
# occurrence. Std XI Trigonometry-I prints "2.1.3 Range of cos0 and sin0" (p3)
# and then "2.1.3 Trigonometric functions of negative angles" (p5) — the
# second should have been 2.1.5. The alias keeps both real teaching units in
# the spine without fabricating a number the page does not carry.
PRINT_DUPLICATES: dict[tuple[int, int, str], str] = {
    (11, 1, "2.1.3"): "2.1.3b",
    # Std XII Trigonometric Functions prints 3.3.5 TWICE: "The Cosine Rule"
    # (p79, inside the solution-of-triangle run that should have been 3.2.5+)
    # and "Inverse secant function" (p92). First by page order keeps the
    # number; the second takes the alias. The same chapter also numbers its
    # last inverse-function run 3.4.6-3.4.8 with no 3.4-3.4.5 ever printed —
    # kept exactly as printed.
    (12, 1, "3.3.5"): "3.3.5b",
}

# Numbering gaps that exist in PRINT, verified on the rendered pages, so the
# gap report can distinguish "the book really jumps" from an extraction hole.
# Std XI Trigonometry-I runs 2.1.x, 2.2-2.2.2, then prints "2.9 Graphs of
# trigonometric functions" (p12) followed by "2.2.4 Polar Co-ordinate system"
# (p17): §§2.3-2.8 and 2.2.3 simply do not exist in the book.
KNOWN_PRINT_GAPS: dict[tuple[int, int, int], str] = {
    (11, 1, 2): "book jumps 2.2.x -> 2.9 (printed); 2.3-2.8 never exist",
}

# Printed-book typos, each verified in the source (the heading prints the typo
# while the body prose spells it right, or the misspelling is unambiguous).
# Navigation labels, not answer keys — nothing factual turns on them. Keyed by
# (class, part, PRINTED ref) -> (printed, corrected); stale entries fail loudly.
TITLE_FIXES: dict[tuple[int, int, str], tuple[str, str]] = {
    (11, 1, "3.2"): (
        "Trigonometric functions of allied angels",
        "Trigonometric functions of allied angles",
    ),
    (11, 1, "9.1.5"): (
        "Elementary Properties of Probabilty",
        "Elementary Properties of Probability",
    ),
    (11, 2, "6.1.4"): ("Value of funcation", "Value of function"),
    (11, 2, "5.2.2"): ("Carstesian Product of two sets", "Cartesian Product of two sets"),
    (11, 2, "1.6"): ("De Moivres Theorem", "De Moivre's Theorem"),
    (12, 1, "2.1"): ("Elementry transformations", "Elementary transformations"),
    (12, 2, "3.2.2"): (
        "Integrals of trignometric functions",
        "Integrals of trigonometric functions",
    ),
    (12, 2, "1.2.4"): (
        "Derivatives of Standard Inverse trigononmetric Functions",
        "Derivatives of Standard Inverse trigonometric Functions",
    ),
    # The printed heading itself omits the noun: "6.4.1 Homogeneous
    # differential :" (its own contents page says "equation").
    (12, 2, "6.4.1"): ("Homogeneous differential", "Homogeneous differential equation"),
}


# Decorated box labels and page furniture that must never be absorbed as a
# heading's wrapped title ("7.2 Ellipse" + the "Let's Study" box; "6.7 ..." +
# the running footer "6 Line and Plane ... 195"). Digit-led lines are footer
# page/chapter numbers — a wrapped title's continuation never starts with one.
CONT_EXCLUDE = re.compile(
    r"^(let'?s\s|let us\s|solved examples\b|exercise\b|activity\b|miscellaneous\b|fig\.?\s|\d)", re.I
)

SMALL_WORDS = {"of", "and", "in", "a", "an", "the", "for", "to", "or", "with", "by", "on", "from", "at"}


def decap(title: str) -> str:
    """Title-case an ALL/mostly-caps title ("METHOD OF FACTORIZATION" ->
    "Method of Factorization"), leaving mixed-case titles exactly as printed.
    Acronym-shaped words (A.P., G.M., L.P.P., 2-D, roman numerals) survive —
    the Physics KEEP_UPPER lesson ("Units AND Measurement")."""
    letters = [c for c in title if c.isalpha()]
    if not letters:
        return title
    caps = sum(1 for c in letters if c.isupper()) / len(letters)
    if caps < 0.8:
        return title
    out = []
    for i, w in enumerate(title.split()):
        bare = w.strip("().,")
        # No bare single-capital exception: in an all-caps title a lone "A" is
        # the article ("AREA OF A SECTOR"), not an acronym. Roman numerals
        # still survive via [IVX]+.
        if re.fullmatch(r"([A-Z]\.)+[A-Z]?\.?|[IVX]+|[23]-?D", bare):
            out.append(w)
            continue
        lw = w.lower()
        out.append(lw if (i > 0 and lw in SMALL_WORDS) else lw[:1].upper() + lw[1:])
    return " ".join(out)


def clean(s: str) -> str:
    for a, b in MOJI.items():
        s = s.replace(a, b)
    s = MARATHI_DEBRIS.sub("", s)
    s = re.sub(r"\s+", " ", s.replace("\t", " ")).strip()
    return re.sub(r"\s*[:.]+\s*$", "", s).strip()


def title_of(raw: str) -> str:
    """A heading's title from its raw captured text.

    Strip a LEADING separator colon ("5.5.2 : Vector triple product :"), then
    cut at the first remaining colon — headings in these books terminate in a
    colon, and many run straight into their body text on the same line
    ("6.3.1 Tangent : When a line intersects...").
    """
    s = raw.strip().lstrip(":").strip()
    return clean(s.split(":", 1)[0])


def chapter_of(filename: str):
    m = re.match(r"^Ch_(\d{1,2})_.+\.pdf$", filename, re.I)
    return int(m.group(1)) if m else None


def is_bold(span) -> bool:
    return "bold" in span["font"].lower()


def lines_with_font(doc):
    """Yield (text, has_bold, mostly_bold, block_id) per rendered line.

    ANY bold span qualifies, not just the first — headings open with stray
    regular-font fragments in these books too (the Physics 6.6/9.8 lesson).
    The block id scopes title continuation: a wrapped heading is one visual
    paragraph, so its second line shares the block, while body text under a
    heading starts a new one.
    """
    for page in doc:
        for bno, block in enumerate(page.get_text("dict")["blocks"]):
            for line in block.get("lines", []):
                spans = line.get("spans", [])
                if not spans:
                    continue
                text = "".join(s["text"] for s in spans).strip()
                if not text:
                    continue
                bold_chars = sum(len(s["text"]) for s in spans if is_bold(s))
                total = sum(len(s["text"]) for s in spans) or 1
                yield text, bold_chars > 0, bold_chars / total > 0.6, (page.number, bno)


def extract_chapter(path: str, chap_no: int, duplicates=None, chap_name: str = ""):
    """Headings of one chapter PDF as (printed_ref, title), in book order.

    Returns (sections, untitled) — untitled refs were seen in heading position
    but never got a title (math-set title lines are not bold, so the
    continuation rule cannot absorb them); they need a TITLE_OVERRIDES entry.

    `duplicates` maps a printed ref to the alias its SECOND, textually distinct
    occurrence is stored under (see PRINT_DUPLICATES). `chap_name` lets the
    continuation rule reject the running footer's chapter-title line.
    """
    doc = fitz.open(path)
    found = {}
    order = []
    pending = None  # a heading whose title may continue on the next line
    duplicates = duplicates or {}

    for text, has_bold, mostly_bold, blk in lines_with_font(doc):
        m = HEADING.match(text)
        is_head = bool(m) and has_bold and int(m.group(1)) == chap_no

        if is_head:
            major, sub, raw_title = m.group(2), m.group(3), (m.group(4) or "")
            ref = f"{chap_no}.{major}" + (f".{sub}" if sub else "")
            # A listed print-duplicate: the second occurrence is a REAL,
            # different section the book misnumbered; store it under its alias.
            if found.get(ref, {}).get("title") and ref in duplicates:
                ref = duplicates[ref]
            # FIRST occurrence with a real title wins (running headers restate
            # headings; body text carries bold figure refs in the same shape).
            # A ref first seen BARE can still be titled by a later restatement —
            # Indefinite Integration lists 3.2.4-3.2.6 bare on one page and
            # restates 3.2.6 with its title ten pages on.
            if found.get(ref, {}).get("title"):
                pending = None
                continue
            title = title_of(raw_title)
            # A colon in the captured text closes the heading — it must not
            # absorb the bold opening of its own body text. A colon-less title
            # stays open for SAME-BLOCK continuation only (wrapped titles share
            # the paragraph block; body text starts a new block).
            pending = {"title": title, "open": ":" not in raw_title, "blk": blk, "bare": not title}
            if ref not in found:
                order.append(ref)
            found[ref] = pending
            continue

        # Continuation: the wrapped remainder of an open heading's title, or
        # the title line of a bare-number heading ("5.3" / "Product of
        # vectors :"). CROSS-block on purpose — PyMuPDF often puts a heading's
        # wrap in its own block ("2.1.1 Trigonometric functions with the help
        # of" / "a circle:"), so block-scoping loses real titles; junk
        # absorption is prevented by CONT_EXCLUDE + the footer chapter-title
        # test instead. Only the IMMEDIATE next line can continue — any
        # non-qualifying line terminates the pending heading.
        if (
            pending
            and pending["open"]
            and mostly_bold
            and not m
            and len(text) < 90
            and not CONT_EXCLUDE.match(text)
            and (not chap_name or text.strip().lower() != chap_name.lower())
        ):
            joined = (pending["title"] + " " + text).strip()
            pending["title"] = title_of(joined)
            pending["bare"] = False
            pending["blk"] = blk
            if ":" in text:
                pending["open"] = False
            continue
        pending = None

    sections, untitled = [], []
    for ref in order:
        title = decap(clean(found[ref]["title"]))
        # Figure-caption discriminator (the Physics 8.22/13.16 lesson): no
        # genuine section title in these books opens with a parenthesis.
        if title.startswith("("):
            continue
        if not title:
            untitled.append(ref)
            continue
        sections.append((ref, title))
    return sections, untitled


def sort_key(ref: str):
    # A print-duplicate alias like "2.1.3b" sorts right after its number.
    return tuple(
        (int(m.group(1)), m.group(2))
        for m in (re.match(r"(\d+)([a-z]?)", x) for x in ref.split("."))
        if m
    )


def remap(ref: str, offset: int) -> str:
    """Printed ref -> continuously-renumbered ref: '1.2.1' + offset 7 -> '8.2.1'."""
    head, _, tail = ref.partition(".")
    return f"{int(head) + offset}.{tail}"


def gap_report(refs, chap_no: int):
    """Missing top-level majors N.1..N.max — holes only; truncation is caught
    by eyeballing per-chapter counts against the book, not by this probe."""
    majors = sorted({int(r.split(".")[1]) for r in refs})
    if not majors:
        return "NO SECTIONS"
    missing = [m for m in range(1, majors[-1] + 1) if m not in majors]
    return f"missing majors: {missing}" if missing else ""


def build(cls: int):
    rows, seq = [], 0
    problems = []
    notes = []
    for c, part, offset, folder in FOLDERS:
        if c != cls:
            continue
        files = sorted(f for f in os.listdir(folder) if f.lower().endswith(".pdf"))
        for filename in files:
            printed_no = chapter_of(filename)
            if printed_no is None:
                problems.append(f"unparsed filename: {filename}")
                continue
            title_key = (cls, part, printed_no)
            chap_name = CHAPTER_TITLES.get(title_key)
            if not chap_name:
                problems.append(f"no CHAPTER_TITLES entry for {title_key} ({filename})")
                continue
            dups = {
                ref: alias
                for (c2, p2, ref), alias in PRINT_DUPLICATES.items()
                if (c2, p2) == (cls, part)
            }
            secs, untitled = extract_chapter(
                os.path.join(folder, filename), printed_no, dups, chap_name
            )
            # Overrides REPLACE extracted titles (a garbled extraction must not
            # win by existing) and fill bare-number sections.
            over = {
                ref: t
                for (c2, p2, ref), t in TITLE_OVERRIDES.items()
                if (c2, p2) == (cls, part) and ref.split(".")[0] == str(printed_no)
            }
            secs = [(ref, over.pop(ref) if ref in over else title) for ref, title in secs]
            for ref in list(untitled):
                if ref in over:
                    secs.append((ref, over.pop(ref)))
                    untitled.remove(ref)
            for ref in over:
                problems.append(f"STALE OVERRIDE Std {cls} Part {part} {ref} — no such heading found")
            secs.sort(key=lambda t: sort_key(t[0]))
            for ref in untitled:
                problems.append(f"NEEDS-TITLE Std {cls} Part {part} {ref} ({chap_name})")
            # Top-level holes: a present x.y.z whose x.y never surfaced.
            # Verified 2026-08-07 to be the BOOK's own style, not extraction
            # loss: these books often skip the parent heading and open straight
            # at x.y.1 (Vectors p152 goes Exercise -> "5.2.1 Section Formula"
            # with no 5.2 anywhere; a whole-corpus scan found no line, spaced
            # or not, starting with any of the missing parents). Informational.
            majors_present = {r for r, _ in secs if r.count(".") == 1}
            majors_implied = {".".join(r.split(".")[:2]) for r, _ in secs if r.count(".") == 2}
            for miss in sorted(majors_implied - majors_present, key=sort_key):
                notes.append(f"unprinted parent Std {cls} Part {part} {miss} ({chap_name})")
            chap_no = printed_no + offset
            for ref, title in secs:
                fix = TITLE_FIXES.get((cls, part, ref))
                if fix:
                    printed, corrected = fix
                    if title != printed:
                        raise SystemExit(
                            f"TITLE_FIXES stale for Std {cls} Part {part} {ref}:\n"
                            f"  expected printed: {printed!r}\n"
                            f"  extracted now:    {title!r}"
                        )
                    title = corrected
                seq += 1
                rows.append({
                    "class": cls,
                    "subject": "Mathematics",
                    "source": "MH State Board",
                    "chapter_no": chap_no,
                    "chapter_name": chap_name,
                    "section_no": remap(ref, offset),
                    "concept": title,
                    "seq": seq,
                })
            gaps = gap_report([r for r, _ in secs], printed_no)
            line = f"  P{part} ch{printed_no:>2}->{chap_no:>2} {chap_name[:42]:<42} {len(secs):>3} sections"
            if gaps:
                known = KNOWN_PRINT_GAPS.get((cls, part, printed_no))
                if known:
                    line += f"  (book numbering: {known})"
                else:
                    line += f"  !! {gaps}"
            print(line.encode("ascii", "replace").decode())
    for n in notes:
        print(f"  (note) {n}".encode("ascii", "replace").decode())
    for p in problems:
        print(f"  !! {p}".encode("ascii", "replace").decode())
    return rows, problems


def main():
    want = [int(a) for a in sys.argv[1:] if a.isdigit()] or [11, 12]
    for cls in want:
        print(f"=== Std {cls} ===")
        rows, problems = build(cls)
        dest = os.path.join(DEST, f"maths-sb-{cls}.json")
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(rows, f, indent=1, ensure_ascii=False)
        chapters = len({r["chapter_no"] for r in rows})
        print(f"  -> {dest}  ({len(rows)} concepts across {chapters} chapters)")
        if problems:
            print(f"  !! {len(problems)} problem(s) above need resolution before seeding\n")
        else:
            print()


if __name__ == "__main__":
    main()
