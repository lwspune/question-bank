"""Extract Maharashtra State Board Std XI + XII PHYSICS section headings.

    python scripts/syllabus/dump_sb_physics_sections.py            # both years
    python scripts/syllabus/dump_sb_physics_sections.py 11         # one year

Writes scripts/syllabus/data/phy-sb-11.json and phy-sb-12.json — the shape
`scripts/syllabus/seed.ts` expects (and the subject registry already names).

Reads the publisher's PER-CHAPTER PDFs, not the whole-book file. That is the
load-bearing choice: inside "05. Gravitation.pdf" the only valid section number
is 5.x, which by itself rejects every false positive the whole-book pass
produced — physical constants ("8.31 J mol-1 K-1"), percentages ("98.6"),
and stray numerics ("4.608 N") all carry a chapter number that cannot match the
file they sit in. Chapter number and title then come from the filename rather
than being inferred from a title page, which the whole-book pass got wrong for
6 of 16 Std XII chapters by picking up body text.

TWO signals must agree for a line to be a heading:
  1. it starts with <this chapter>.<n>[.<n>], optionally with a trailing dot, and
  2. its first span is the BOLD face.
Either alone is insufficient. The book's own body text is full of figure
references in exactly the heading's numeric shape ("4.6(c) shows the view from
the top"), and bold is also used for run-of-text emphasis. Requiring both is
what separates them.

The numbering style is NOT consistent even within one chapter: Laws of Motion
prints "4.1. Introduction:" (trailing dot) alongside "4.5 Types of Forces:"
(none), so the dot is optional in the pattern and stripped from the stored ref.
"""
import fitz, os, re, json, sys

BASE = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Physics\State_Board\Topics"
BOOKS = {11: "11th_Topics", 12: "12th_Topics"}
DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

MOJI = {"\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"',
        "\u2013": "-", "\u2014": "-", "\u00a0": " ", "\u00ad": ""}

# Devanagari set in a symbol font decodes to ASCII rubble, e.g. Std XII's
# "Well (or Wall) of Death: (0L&>A)". Only strip a parenthesised group that has
# no lowercase letter AND carries symbol debris — a conservative test, so real
# parentheticals ("(or Wall)", "(a)", "(NCERT)") survive untouched.
MARATHI_DEBRIS = re.compile(r"\s*\([^()a-z]*[&<>|~^@#$%*][^()a-z]*\)")

# "4.1", "4.1.", "4.1.2", "5.6:" — the separator after the number may be a dot
# or a COLON, and the title may be absent entirely. Justified setting sometimes
# breaks a heading into one word per line, leaving the number alone on its own
# line ("3.10", then "Absorption,", "Reflection", ...); those are rebuilt by the
# continuation rule below.
HEADING = re.compile(r"^(\d{1,2})\.(\d{1,2})(?:\.(\d{1,2}))?[.:]?(?:\s+(\S.*))?$")

# Typos in the PRINTED book, each verified against the rendered page before
# being listed here — never against the text layer alone, which has its own
# failure modes. Explicit and keyed by (class, section) so the correction is
# auditable and the run stays deterministic, rather than a regex that might
# also rewrite something legitimate.
#
# These are NAVIGATION LABELS, not answer keys: nothing factual turns on them,
# and shipping a visible typo in a section title serves no one. A defect that
# changed a claim would be preserved and flagged instead.
TITLE_FIXES = {
    # Printed: "Equations of Motion for an Object travellinging a Plane with
    # Uniform Acceleration:" — confirmed on the page image at 5x.
    (11, "3.3.3"): (
        "Equations of Motion for an Object travellinging a Plane with Uniform Acceleration",
        "Equations of Motion for an Object travelling in a Plane with Uniform Acceleration",
    ),
}


def clean(s: str) -> str:
    for a, b in MOJI.items():
        s = s.replace(a, b)
    s = MARATHI_DEBRIS.sub("", s)
    s = re.sub(r"\s+", " ", s.replace("\t", " ")).strip()
    # Headings end in a colon in this book; a trailing dot is numbering debris.
    return re.sub(r"\s*[:.]+\s*$", "", s).strip()


def chapter_of(filename: str):
    m = re.match(r"^(\d{1,2})\.\s*(.+)\.pdf$", filename, re.I)
    if not m:
        return None
    return int(m.group(1)), clean(m.group(2))


def is_bold(span) -> bool:
    return "bold" in span["font"].lower()


def lines_with_font(doc):
    """Yield (text, has_bold, mostly_bold) per rendered line, in order.

    `has_bold` is ANY bold span, not the first one. Testing spans[0] silently
    dropped real headings whose line opens with a stray regular-font fragment —
    "6.6 Stress-Strain Curve:" is [regular, BOLD] and "9.8 Dispersion of light
    and prisms:" is [regular, BOLD, regular]. Those two misses are exactly the
    gaps that showed up as missing 6.6 and 9.8. Body text cannot slip in
    through the looser test: it must still match the numeric heading shape, and
    a line like "9.8 (b)) and emerges after several kilometers" is entirely
    regular, so it still scores no bold span at all.
    """
    for page in doc:
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                spans = line.get("spans", [])
                if not spans:
                    continue
                text = "".join(s["text"] for s in spans).strip()
                if not text:
                    continue
                bold_chars = sum(len(s["text"]) for s in spans if is_bold(s))
                total = sum(len(s["text"]) for s in spans) or 1
                yield text, bold_chars > 0, bold_chars / total > 0.6


def extract_chapter(path: str, chap_no: int):
    """Headings of one chapter PDF, in book order, deduped by section number."""
    doc = fitz.open(path)
    found = {}
    order = []
    pending = None  # a heading whose title wrapped onto the next line

    for text, has_bold, mostly_bold in lines_with_font(doc):
        m = HEADING.match(text)
        is_head = bool(m) and has_bold and int(m.group(1)) == chap_no

        if is_head:
            major, sub, title = m.group(2), m.group(3), (m.group(4) or "")
            ref = f"{chap_no}.{major}" + (f".{sub}" if sub else "")
            # FIRST occurrence wins. Running page headers restate a heading, and
            # body text carries bare figure refs in the same shape — Std XI ch.4
            # prints a bold "4.7:" pointing at a figure long after the real
            # "4.7 Principle of Conservation of Linear Momentum". Overwriting
            # would replace a good title with a figure caption's words.
            if found.get(ref, {}).get("title"):
                pending = None
                continue
            # A heading that already ends in a colon is COMPLETE, so it must not
            # absorb what follows. Without this, "6.2 Elastic Behavior of
            # Solids:" swallowed the bold opening clause of its own body text
            # ("If a body regains its original shape ...").
            pending = {"ref": ref, "title": title, "open": not title.rstrip().endswith(":")}
            if ref not in found:
                order.append(ref)
            found[ref] = pending
            continue

        # Continuation: a wrapped heading title. Only for a still-open heading,
        # on a predominantly-bold line that is not itself a heading.
        if pending and pending["open"] and mostly_bold and not HEADING.match(text) and len(text) < 80:
            pending["title"] += " " + text
            if text.rstrip().endswith(":"):
                pending["open"] = False
            continue
        pending = None

    out = []
    for ref in order:
        title = clean(found[ref]["title"])
        if not title:
            continue
        # FIGURE CAPTION, not a section. The book numbers its figures in the
        # same N.M shape and captions them "(a) A dielectric slab placed
        # between the plates ...", so once the pattern was loosened to accept a
        # colon separator and a bare number, three captions slipped in as
        # sections (8.22, 13.16, 16.26) with figure numbers far past the real
        # section count. No genuine section title in this book opens with a
        # parenthesis, so that is the discriminator.
        if title.startswith("("):
            continue
        out.append((ref, title))
    return out


def sort_key(ref: str):
    return tuple(int(x) for x in ref.split("."))


def build(cls: int):
    folder = os.path.join(BASE, BOOKS[cls])
    rows, seq = [], 0
    skipped = []
    for filename in sorted(os.listdir(folder)):
        if not filename.lower().endswith(".pdf"):
            continue
        parsed = chapter_of(filename)
        if not parsed:
            skipped.append(filename)
            continue
        chap_no, chap_name = parsed
        secs = extract_chapter(os.path.join(folder, filename), chap_no)
        secs.sort(key=lambda t: sort_key(t[0]))
        for ref, title in secs:
            fix = TITLE_FIXES.get((cls, ref))
            if fix:
                printed, corrected = fix
                # Fail loudly if the book text no longer matches: a silent
                # mismatch would leave a stale "correction" applied to
                # something else, or quietly stop applying at all.
                if title != printed:
                    raise SystemExit(
                        f"TITLE_FIXES stale for Std {cls} {ref}:\n"
                        f"  expected printed: {printed!r}\n"
                        f"  extracted now:    {title!r}"
                    )
                title = corrected
                print(f"     [fix] {ref}: applied printed-typo correction")
            seq += 1
            rows.append({
                "class": cls,
                "subject": "Physics",
                "source": "MH State Board",
                "chapter_no": chap_no,
                "chapter_name": chap_name,
                "section_no": ref,
                "concept": title,
                "seq": seq,
            })
        print(f"  ch{chap_no:>2} {chap_name[:44]:<44} {len(secs):>3} sections")
    if skipped:
        print(f"  !! unparsed filenames: {skipped}")
    return rows


def main():
    want = [int(a) for a in sys.argv[1:] if a.isdigit()] or [11, 12]
    for cls in want:
        print(f"=== Std {cls} ===")
        rows = build(cls)
        dest = os.path.join(DEST, f"phy-sb-{cls}.json")
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(rows, f, indent=1, ensure_ascii=False)
        chapters = len({r["chapter_no"] for r in rows})
        print(f"  -> {dest}  ({len(rows)} concepts across {chapters} chapters)\n")


if __name__ == "__main__":
    main()
