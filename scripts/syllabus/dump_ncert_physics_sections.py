"""Extract NCERT Class 11 + 12 PHYSICS section headings.

    python scripts/syllabus/dump_ncert_physics_sections.py            # both years
    python scripts/syllabus/dump_ncert_physics_sections.py 11         # one year

Writes scripts/syllabus/data/phy-ncert-11.json and phy-ncert-12.json.

Separate from dump_ncert_sections.py (Chemistry) on purpose: that script carries
~100 hand-authored TITLE_OVERRIDES for the Chemistry books' specific extraction
failures, and its heuristics are tuned to them. The Physics books set headings in
a cleanly identifiable face, so they need much less machinery — sharing the file
would mean inheriting a pile of Chemistry-shaped workarounds that do not apply.

FONT IS THE SIGNAL, and it separates three things a regex cannot:
    Bookman-Demi 16.0  top-level section     "1.4  BASIC PROPERTIES OF ELECTRIC"
    Bookman-Demi 12.0  sub-section           "1.4.1  Additivity of charges"
    Bookman-Demi  9.0  FIGURE caption        "FIGURE 1.2 Electroscopes: (a)"
    Bookman-Light      body text
Figure captions carry the same N.M numbering as sections, so the size floor is
what keeps them out.

TWO layout quirks, both handled below rather than by hand-listing titles:
  * Chapter-opening pages paint each heading 4-5 times to fake a drop shadow, and
    the first letter is painted separately, so the text layer reads
    "2.1  I" x4, "2.1  INTRODUCTION", "NTRODUCTION" x4. Keeping the LONGEST
    candidate per section recovers the real heading.
  * Top-level headings WRAP ("1.4  BASIC PROPERTIES OF ELECTRIC" / "CHARGE"),
    so a following line in the same face is a continuation.
"""
import fitz, os, re, json, sys, collections

BASE = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books"
DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# Chapter ranges per volume, verified by locating each chapter's own "N.1"
# heading. There is NO overlap between the two parts of a year — an early probe
# suggested Std XII Part_2 restated chapters 2/5/7/8, but those were figure
# references, not sections.
PARTS = {
    11: [("Part_1", range(1, 8)), ("Part_2", range(8, 15))],
    12: [("Part_1", range(1, 9)), ("Part_2", range(9, 15))],
}

# The title may be absent: Std XI Part_2 sets many headings with the NUMBER on
# its own line and the title on the next ("13.2" / "SIMPLE HARMONIC MOTION").
# Requiring a same-line title lost 13.1, 13.2, 13.3, 13.5 and 13.6 from
# Oscillations alone.
#
# The separator may also be MISSING entirely — the book prints
# "11.7THERMODYNAMIC STATE VARIABLES" with no space — so it is `[:\s]*`, not
# `\s+`. Requiring whitespace made that line fail to match at all, losing the
# section outright.
#
# The title must then start with a LETTER. Without that anchor a decimal in body
# text ("4.608 N") would parse as section 4.60 with the title "8 N".
HEADING = re.compile(r"^(\d{1,2})\.(\d{1,2})(?:\.(\d{1,2}))?\.?[:\s]*([A-Za-z].*)?$")

MOJI = {"\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"',
        "\u2013": "-", "\u2014": "-", "\u00a0": " ", "\u00ad": ""}

# Titles the text layer CANNOT yield, each read off the rendered page at 3x and
# transcribed from the image \u2014 never from memory.
#
# Std XII chapter-opener headings combine small caps with the drop shadow, so a
# single title is painted as overlapping fragments at two sizes:
#   "12.2 ALPHA" (16.0), then "LPHA", "LPHA-PAR", "AR", "ARTICLE", "TICLE" (11.2)
# Neither the span reader nor the plain-text layer reconstructs that, and any
# rule that stitched those fragments would be guessing at the overlaps.
#
# Only TWO sections across both volumes are affected \u2014 every other short title
# ("Work", "Viscosity", "Radioactivity") is genuinely that short in the book.
TITLE_OVERRIDES = {
    (12, "5.2"): "The Bar Magnet",
    (12, "12.2"): "Alpha-particle Scattering and Rutherford's Nuclear Model of Atom",
}

# NOT a missing extraction, and deliberately NOT synthesised: Std XI ch.2's
# opener box lists "2.5 Relative velocity", but the phrase occurs NOWHERE else
# in the volume \u2014 the rationalised edition dropped the section's content and
# left the box listing it. The spine records what the book teaches, so 2.5 is
# absent here exactly as it is absent there.

# Lowercased inside a title-cased heading, never at the start.
SMALL = {"a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
         "of", "on", "or", "the", "to", "with", "due"}

# Stay capitalised when a heading is converted out of ALL CAPS. Without this,
# "AC" becomes "Ac" and "EMF" becomes "Emf".
# NOT/AND/OR are deliberately ABSENT despite being logic-gate names: they are
# far more common as ordinary words, and keeping them upper turned "UNITS AND
# MEASUREMENT" into "Units AND Measurement". The gate headings are unaffected —
# NCERT sets sub-sections in sentence case, and title_case() only fires on a
# string with no lowercase at all, so it never touches them.
KEEP_UPPER = {"AC", "DC", "EMF", "LCR", "LED", "RMS", "SI", "III", "II", "IV"}


def clean(s: str) -> str:
    for a, b in MOJI.items():
        s = s.replace(a, b)
    s = re.sub(r"\s+", " ", s.replace("\t", " ")).strip()
    # NCERT flags optional material with a trailing asterisk ("Alternating
    # Current *"); it is a footnote marker, not part of the name.
    s = re.sub(r"\s*\*+\s*$", "", s)
    return re.sub(r"\s*[:.]+\s*$", "", s).strip()


def title_case(s: str) -> str:
    """ALL-CAPS heading -> Title Case, matching the Chemistry NCERT spine.

    Only fires on a string with NO lowercase letter. NCERT sets top-level
    headings in caps but sub-sections in sentence case, and the stored Chemistry
    rows are Title Case throughout — mixing the two would read as broken in the
    alignment table, where NCERT sits beside the State Board column.
    """
    if any(c.islower() for c in s):
        return s
    words = s.split()
    out = []
    for i, w in enumerate(words):
        core = w.strip("(),:;")
        if core in KEEP_UPPER:
            out.append(w)
        elif i != 0 and core.lower() in SMALL:
            out.append(w.lower())
        else:
            out.append(w[:1].upper() + w[1:].lower())
    return " ".join(out)


def body_size(doc) -> float:
    """The dominant NON-bold text size, i.e. the body face of THIS volume.

    Must be measured per document, not hardcoded. The two Physics generations
    are typeset differently and an absolute size floor cannot serve both:

        Std XII  body 10.5  headings 16.0 / 12.0  captions 9.0
        Std XI   body 10.0  headings 10.0         captions 9.0

    Std XI sets its headings at the SAME size as its body and separates them by
    weight alone, so a `size >= 11` floor silently returned zero sections for
    the entire year — the same failure the Chemistry extractor's header warns
    about. A floor relative to the body size admits both years' headings while
    still excluding figure captions, which sit below body size in both.
    """
    sizes = collections.Counter()
    for page in doc:
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                for s in line.get("spans", []):
                    f = s["font"].lower()
                    if "demi" not in f and "bold" not in f:
                        sizes[round(s["size"], 1)] += len(s["text"])
    return sizes.most_common(1)[0][0] if sizes else 10.0


def is_heading_face(span, body: float) -> bool:
    """Either signal suffices: a heavier weight at body size, OR a clearly
    larger size at any weight.

    Weight alone is not enough. Std XII's CHAPTER-OPENER headings are set in
    plain "Bookman" at 16.0 — no demi, no bold — so a weight-only test dropped
    the first section of several chapters (2.1, 3.11, 5.2, 12.2) while happily
    keeping every other section of the same chapter. Size alone is not enough
    either: Std XI sets headings at exactly body size and distinguishes them by
    weight only.

    Figure captions stay out under both arms: they are BELOW body size in every
    volume (9.0 against a 10.0-10.5 body).
    """
    f = span["font"].lower()
    if span["size"] >= body * 1.25:
        return True
    return ("demi" in f or "bold" in f) and span["size"] >= body


def lines(doc, body: float):
    """(text, font_key, page_index) per line, consecutive duplicates collapsed.

    The collapse is what tames the drop-shadow: five identical paints of one
    heading become one line, so a later "longest candidate" pick is comparing
    real variants rather than repeats.
    """
    prev = None
    for pno, page in enumerate(doc):
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                spans = line.get("spans", [])
                if not spans:
                    continue
                text = "".join(s["text"] for s in spans).strip()
                if not text:
                    continue
                key = (spans[0]["font"], round(spans[0]["size"], 1)) if is_heading_face(spans[0], body) else None
                if (text, key) == prev:
                    continue
                prev = (text, key)
                yield text, key, pno


CHAPTER_BANNER = re.compile(
    r"^CHAPTER\s+(?:ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN|ELEVEN|TWELVE|"
    r"THIRTEEN|FOURTEEN|\d{1,2})\s*$", re.I)


def chapter_titles(doc, expected, body: float):
    """Chapter number -> printed title, read off each chapter's opening page.

    Taken from the book rather than hardcoded, but the two years set their
    openers differently and need different reads:

    Std XI  prints a banner, and PLAIN TEXT recovers it cleanly:
                "CHAPTER ELEVEN" / "THERMODYNAMICS" / "11.1  INTRODUCTION"
            The span-level read does NOT work here — Std XI sets titles in small
            caps, one span per letter-run with no spaces between them, so joining
            spans yields "COUNITSANDMEASUREMENT" (the CHAPTER-banner initials
            plus a title with every word boundary lost). PyMuPDF's plain-text
            layer restores the spacing.

    Std XII has no banner and sets the title at 48pt, so the largest-span join
            is the read there — and it works, because that title is one span size.
    """
    found = {}
    for page in doc:
        m = re.search(r"^\s*(\d{1,2})\.1\s+", page.get_text(), re.M)
        if not m:
            continue
        ch = int(m.group(1))
        if ch not in expected or ch in found:
            continue

        # 1) Banner form: the title follows "CHAPTER N" and may WRAP over several
        # lines ("ELECTRIC CHARGES" / "AND FIELDS"). Both years print a banner —
        # Std XI as "CHAPTER ONE", Std XII as "Chapter One" — so take every
        # following ALL-CAPS line and stop at the first section heading.
        plain = [x.strip() for x in page.get_text().split("\n") if x.strip()]
        title = ""
        for i, line in enumerate(plain[:-1]):
            if CHAPTER_BANNER.match(line):
                parts = []
                for nxt in plain[i + 1:]:
                    if re.match(r"^\d", nxt) or any(c.islower() for c in nxt):
                        break
                    parts.append(nxt)
                title = clean(" ".join(parts))
                break

        # 2) Otherwise the largest text on the page.
        if len(title) <= 3:
            big = []
            for block in page.get_text("dict")["blocks"]:
                for line in block.get("lines", []):
                    for s in line.get("spans", []):
                        if s["size"] > body * 1.4 and s["text"].strip():
                            big.append((round(s["size"], 1), s["text"].strip()))
            if big:
                mx = max(sz for sz, _ in big)
                title = clean(" ".join(t for sz, t in big if sz == mx))

        if len(title) > 3:
            found[ch] = title_case(title)
    return found


def extract(path: str, chapters) -> tuple[dict, dict]:
    doc = fitz.open(path)
    body = body_size(doc)
    titles = chapter_titles(doc, chapters, body)

    # ref -> list of candidate titles; longest wins.
    cands = collections.defaultdict(list)
    order = []
    pending = None

    for text, key, _pno in lines(doc, body):
        m = HEADING.match(text)
        if m and key and int(m.group(1)) in chapters:
            major, sub, title = m.group(2), m.group(3), (m.group(4) or "")
            ref = f"{m.group(1)}.{major}" + (f".{sub}" if sub else "")
            pending = {"ref": ref, "parts": [title] if title else [], "key": key}
            cands[ref].append(pending)
            if ref not in order:
                order.append(ref)
            continue

        # Continuation of a wrapped heading: same face, not itself a heading,
        # and not a drop-shadow tail. "2.1 INTRODUCTION" is followed by
        # "NTRODUCTION" (the shadow of its own first letter painted apart);
        # appending that would yield "INTRODUCTION NTRODUCTION".
        if pending and key == pending["key"] and not HEADING.match(text) and len(text) < 70:
            joined = " ".join(pending["parts"])
            if not joined.upper().endswith(text.upper()):
                pending["parts"].append(text)
            continue
        pending = None

    out = {}
    for ref in order:
        best = max((" ".join(c["parts"]) for c in cands[ref]), key=len)
        title = title_case(clean(best))
        if title:
            out[ref] = title
    return out, titles


def sort_key(ref: str):
    return tuple(int(x) for x in ref.split("."))


def build(cls: int):
    rows, seq = [], 0
    names = {}
    per_part = []
    for part, chapters in PARTS[cls]:
        path = os.path.join(BASE, f"{cls}th", "Physics", part, f"NCERT_Physics_{cls}th_{part}.pdf")
        secs, titles = extract(path, chapters)
        names.update(titles)
        per_part.append((part, chapters, secs))
        missing = [c for c in chapters if c not in titles]
        if missing:
            print(f"  !! {part}: no chapter title found for {missing}")

    for part, chapters, secs in per_part:
        for ref in sorted(secs, key=sort_key):
            ch = int(ref.split(".")[0])
            # An override replaces a title the text layer truncates. Guard that
            # the extracted stub is still a PREFIX of the authored title: if the
            # book is re-issued with a readable heading, or the extractor
            # improves, a stale override must fail loudly rather than quietly
            # overwrite a now-correct title with a hand-typed one.
            override = TITLE_OVERRIDES.get((cls, ref))
            concept = secs[ref]
            if override:
                if not override.lower().startswith(concept.lower()[:5]):
                    raise SystemExit(
                        f"TITLE_OVERRIDES stale for Std {cls} {ref}:\n"
                        f"  extracted: {concept!r}\n"
                        f"  override:  {override!r}"
                    )
                concept = override
            seq += 1
            rows.append({
                "class": cls,
                "subject": "Physics",
                "source": "NCERT",
                "chapter_no": ch,
                "chapter_name": names.get(ch, f"Chapter {ch}"),
                "section_no": ref,
                "concept": concept,
                "seq": seq,
            })
        print(f"  {part}: chapters {min(chapters)}-{max(chapters)}, {len(secs)} sections")
    return rows


def main():
    want = [int(a) for a in sys.argv[1:] if a.isdigit()] or [11, 12]
    for cls in want:
        print(f"=== Std {cls} ===")
        rows = build(cls)
        dest = os.path.join(DEST, f"phy-ncert-{cls}.json")
        with open(dest, "w", encoding="utf-8") as f:
            json.dump(rows, f, indent=1, ensure_ascii=False)
        print(f"  -> {dest}  ({len(rows)} concepts across "
              f"{len({r['chapter_no'] for r in rows})} chapters)\n")


if __name__ == "__main__":
    main()
