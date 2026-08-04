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

    Detect them by SHAPE, not length. An earlier version also rejected anything
    over 60 characters, which silently discarded legitimate long headings —
    "Evidence for the quantized Electronic Energy Levels: Atomic spectra" is 67 —
    and let a truncated fragment win instead. Length is only used as a
    long-stop well above any real heading.
    """
    if title.endswith("?") or len(title) > 150:
        return True
    if re.match(
        r"^(what|why|how|which|define|write|explain|describe|give|calculate|enumerate|"
        r"differentiate|name|discuss|state|account|draw|arrange|predict|identify|"
        r"complete|illustrate|justify|mention|distinguish|compare|suggest|comment|"
        r"find|derive|prove|show|list|answer|indicate|consider|assign|arrange)\b",
        title, re.I):
        return True
    # NCERT's INTEXT questions sit mid-chapter, so the end-of-chapter cutoff
    # cannot reach them, and many are plain declaratives ("The hexaquo
    # manganese(II) ion contains five unpaired electrons..."). A heading is a
    # noun phrase; running prose with a finite verb is not.
    return bool(re.search(r"\b(is|are|was|were|contains|exhibits|decomposes|has|have)\b", title)
                and len(title.split()) >= 8)


# Private-use glyphs are how symbol fonts encode arrows and operators; they carry
# no text meaning and render as boxes. Formula debris trailing a heading
# ("... 18 8 72 . 10 J E1") comes from a margin equation sharing the y-band.
PRIVATE_USE = re.compile(r"[-]")
FORMULA_TAIL = re.compile(r"\s+[\d→=+\-×÷.,]{2,}(?:\s+[\w\d.,]{1,4})*\s*$")


def dedupe_words(title):
    """Drop consecutive repeated words/phrases, ignoring case.

    Two separate causes land on the same shape. A running header can restate the
    heading it continues ("Nature of Matter matter"), and the Std XII books paint
    each heading several times to fake a drop-shadow ("Phenols Phenols Phenols").
    Both read as a stutter to anyone using the table.

    Case-INSENSITIVE compare, because the restated copy is often lowercased; the
    FIRST spelling wins, which is the one the book sets as the heading.
    """
    w = title.split()
    changed = True
    while changed:
        changed = False
        for k in range(1, 6):
            i = 0
            while i + 2 * k <= len(w):
                a = [x.lower() for x in w[i : i + k]]
                b = [x.lower() for x in w[i + k : i + 2 * k]]
                if a == b:
                    del w[i + k : i + 2 * k]
                    changed = True
                else:
                    i += 1
    return " ".join(w)


def scrub(title):
    """Strip symbol-font noise and trailing equation debris from a heading."""
    title = PRIVATE_USE.sub(" ", title)
    title = re.sub(r"\s{2,}", " ", title).strip()
    prev = None
    while prev != title:                      # a heading can pick up more than one tail
        prev = title
        stripped = FORMULA_TAIL.sub("", title).strip()
        # Do not cut mid-expression. "NOMENCLATURE OF ELEMENTS WITH ATOMIC
        # NUMBERS > 100" ends in a genuine number, and the formula-tail rule ate
        # it, leaving a heading that trails off at "> ". An operator left dangling
        # at the end is proof the number belonged to the title, not to margin
        # equation debris, so keep the original in that case.
        if re.search(r"[><=+\-≤≥]\s*$", stripped):
            break
        title = stripped
    # Trailing subscript/superscript debris ("Subshells ppddf f"): a run of short
    # tokens carrying NO VOWEL. Requiring vowel-less-ness is what keeps this from
    # eating real trailing words, which a plain length rule would.
    title = re.sub(r"(?:\s+[bcdfghj-np-tv-z]{1,6}\b){1,}\s*$", "", title, flags=re.I).strip()
    return re.sub(r"\s*[:.\-–]+\s*$", "", title).strip()


# Headings the layout heuristics truncate, recovered by reading the page's words
# in layout order. In a two-column spread the heading and the body interleave, so
# the line-based join stops early; each of these was confirmed by finding every
# word of the title present on the page, NOT written from memory.
#
# The remaining truncations are deliberately NOT listed. Those chapters render the
# section number inside a sidebar graphic, so no title text is recoverable, and
# inventing one would be worse than showing it short — a teacher answering a
# student needs the reference to be right or visibly incomplete, never plausible
# and wrong.
TITLE_OVERRIDES = {
    # PROSE-SWALLOWED headings: the heading ran straight into the sentence that
    # follows it, so the stored title was a paragraph. Found 2026-08-04 by
    # scripts/syllabus/audit-spine.ts, which was written after the same defect
    # class turned up in the Physics NCERT spine. Each verified against its own
    # chapter PDF, where the heading line reads exactly as given here:
    #   1.5.5  -> "...Avogadro's Law equal volumes of all gases at the same
    #             temperature and pressure should contain equal number of molecules"
    #   6.10.3 -> "...Lewis Acids and Bases acid as a species which accepts
    #             electron pair and base which donates an electron pair"
    #   5.4.1  -> "...Geometric Isomerism complexes due to different possible
    #             geometric arrangements of the ligands. Important examples"
    (11, "1.5.5"): "Avogadro's Law",
    (11, "6.10.3"): "Lewis Acids and Bases",
    (12, "5.4.1"): "Geometric Isomerism",
    # BARE-NUMBER headings: Std XII sets these with the number alone on its own
    # line and the title beside it, so the extractor sees an empty title and the
    # `3 <= len(title)` guard drops the section entirely. Same layout that
    # silently lost sections from the Physics NCERT spine. Each title below was
    # read off the chapter PDF by following the bold run after the number.
    (11, "8.3.1"): "Complete, Condensed and Bond-line Structural Formulas",
    (12, "6.4.2"): "From Hydrocarbons",
    (12, "8.1.1"): "Nomenclature",
    (12, "8.2.1"): "Preparation of Aldehydes and Ketones",
    (12, "8.2.2"): "Preparation of Aldehydes",
    (12, "8.6.1"): "Nomenclature",
    (12, "8.9.3"): "Reactions Involving -COOH Group",
    (12, "10.2.2"): "Classification of Amino Acids",
    # SAME REGION, titles that WERE extracted but came out truncated or with the
    # body interleaved. Found while verifying the bare-number holes above; the
    # audit's title probe does not catch these because they carry no sentence
    # break and no first-person prose.
    #   8.1.2  was "Structure of"
    #   8.2.3  was "Preparation 1. From acyl chlorides of Ketones"
    #   8.9.1  was "Reactions Acidity Involving Reactions with metals and
    #              alkalies Cleavage of O-H Bond"
    #   8.9.2  was "Reactions 1. Formation of anhydride Involving Cleavage of
    #              C-OH Bond"
    #   10.2.3 was "Structure"
    (12, "8.1.2"): "Structure of the Carbonyl Group",
    (12, "8.2.3"): "Preparation of Ketones",
    (12, "8.9.1"): "Reactions Involving Cleavage of O-H Bond",
    (12, "8.9.2"): "Reactions Involving Cleavage of C-OH Bond",
    (12, "10.2.3"): "Structure of Proteins",
    (11, "4.7.2"): "Conditions for the Combination of Atomic Orbitals",
    (11, "6.10.1"): "Arrhenius Concept of Acids and Bases",
    (11, "6.10.2"): "The Brönsted-Lowry Acids and Bases",
    (11, "6.11.5"): "Relation between Ka and Kb",
    (11, "8.7.4"): "Electron Displacement Effects in Covalent Bonds",
    (11, "2.2"): "Atomic Models",
    # LETTER-SPACED headings. NCERT sets a few titles with wide tracking, so each
    # letter lands as its own positioned glyph and extraction reads
    # "A N D T Y P E S O F E L E M E N T S". This cannot be repaired by a general
    # rule: the gap between letters and the gap between words are identical once
    # whitespace is normalised, so collapsing them yields "ANDTYPESOFELEMENTS".
    # 3.6 additionally picked up body-text bleed ("aufbau viz s-block, ...").
    # All three confirmed present in their PDFs by a spacing-insensitive search.
    (11, "3.6"): "ELECTRONIC CONFIGURATIONS AND TYPES OF ELEMENTS: s-, p-, d-, f- BLOCKS",
    (11, "6.1"): "EQUILIBRIUM IN PHYSICAL PROCESSES",
    (11, "8.5.3"): "Nomenclature of Organic Compounds having Functional Group(s)",
    # ---- NCERT Std XII, hand-authored and PDF-verified ----
    # These books defeat automated title extraction two ways: headings are painted
    # 4-5 times to fake a drop-shadow (so the text layer reads "Uses of Uses of
    # Uses of Aldehydes Aldehydes"), and NCERT numbers its intext questions N.M
    # like sections, so several slots captured exercise prose instead
    # ("2.3 Consult the table of standard electrode potentials and suggest
    # three..."). Every title below was checked against its chapter PDF by
    # scripts/syllabus/verify_toplevel_xii.py; the section NUMBERING was taken
    # from the heading-font pass with run-collapsing.
    (12, "1.1"): "Types of Solutions",
    (12, "1.2"): "Expressing Concentration of Solutions",
    (12, "1.3"): "Solubility",
    (12, "1.4"): "Vapour Pressure of Liquid Solutions",
    (12, "1.5"): "Ideal and Non-ideal Solutions",
    (12, "1.6"): "Colligative Properties and Determination of Molar Mass",
    (12, "1.7"): "Abnormal Molar Masses",
    (12, "2.1"): "Electrochemical Cells",
    (12, "2.2"): "Galvanic Cells",
    (12, "2.3"): "Nernst Equation",
    (12, "2.4"): "Conductance of Electrolytic Solutions",
    (12, "2.5"): "Electrolytic Cells and Electrolysis",
    (12, "2.6"): "Batteries",
    (12, "2.7"): "Fuel Cells",
    (12, "2.8"): "Corrosion",
    (12, "3.1"): "Rate of a Chemical Reaction",
    (12, "3.2"): "Factors Influencing Rate of a Reaction",
    (12, "3.3"): "Integrated Rate Equations",
    (12, "3.4"): "Temperature Dependence of the Rate of a Reaction",
    (12, "3.5"): "Collision Theory of Chemical Reactions",
    (12, "4.1"): "Position in the Periodic Table",
    (12, "4.2"): "Electronic Configurations of the d-Block Elements",
    (12, "4.3"): "General Properties of the Transition Elements (d-Block)",
    (12, "4.4"): "Some Important Compounds of Transition Elements",
    (12, "4.5"): "The Lanthanoids",
    (12, "4.6"): "The Actinoids",
    (12, "4.7"): "Some Applications of d- and f-Block Elements",
    (12, "5.1"): "Werner's Theory of Coordination Compounds",
    (12, "5.2"): "Definitions of Some Important Terms Pertaining to Coordination Compounds",
    (12, "5.3"): "Nomenclature of Coordination Compounds",
    (12, "5.4"): "Isomerism in Coordination Compounds",
    (12, "5.5"): "Bonding in Coordination Compounds",
    (12, "5.6"): "Bonding in Metal Carbonyls",
    (12, "5.7"): "Importance and Applications of Coordination Compounds",
    (12, "6.1"): "Classification",
    (12, "6.2"): "Nomenclature",
    (12, "6.3"): "Nature of C-X Bond",
    (12, "6.4"): "Methods of Preparation of Haloalkanes",
    (12, "6.5"): "Preparation of Haloarenes",
    (12, "6.6"): "Physical Properties",
    (12, "6.7"): "Chemical Reactions",
    (12, "6.8"): "Polyhalogen Compounds",
    (12, "7.1"): "Classification",
    (12, "7.2"): "Nomenclature",
    (12, "7.3"): "Structures of Functional Groups",
    (12, "7.4"): "Alcohols and Phenols",
    (12, "7.5"): "Some Commercially Important Alcohols",
    (12, "7.6"): "Ethers",
    (12, "8.1"): "Nomenclature and Structure of Carbonyl Group",
    (12, "8.2"): "Preparation of Aldehydes and Ketones",
    (12, "8.3"): "Physical Properties",
    (12, "8.4"): "Chemical Reactions",
    (12, "8.5"): "Uses of Aldehydes and Ketones",
    (12, "8.6"): "Nomenclature and Structure of Carboxyl Group",
    (12, "8.7"): "Methods of Preparation of Carboxylic Acids",
    (12, "8.8"): "Physical Properties",
    (12, "8.9"): "Chemical Reactions",
    (12, "8.10"): "Uses of Carboxylic Acids",
    (12, "9.1"): "Structure of Amines",
    (12, "9.2"): "Classification",
    (12, "9.3"): "Nomenclature",
    (12, "9.4"): "Preparation of Amines",
    (12, "9.5"): "Physical Properties",
    (12, "9.6"): "Chemical Reactions",
    (12, "9.7"): "Method of Preparation of Diazonium Salts",
    (12, "9.8"): "Physical Properties",
    (12, "9.9"): "Chemical Reactions",
    (12, "9.10"): "Importance of Diazonium Salts in Synthesis of Aromatic Compounds",
    (12, "10.1"): "Carbohydrates",
    (12, "10.2"): "Proteins",
    (12, "10.3"): "Enzymes",
    (12, "10.4"): "Vitamins",
    (12, "10.5"): "Nucleic Acids",
    (12, "10.6"): "Hormones",
}

# Top-level sections the extractor cannot recover at all, injected so the spine is
# complete. Same provenance as the overrides above: read off the book, verified.
# Without these a student looking up e.g. NCERT 3.1 finds no row and concludes the
# topic is unmapped, when in fact it is taught.
EXTRA_SECTIONS = {
    (11, 3): [("3.1", "Why do we Need to Classify Elements?")],
    (11, 5): [("5.3", "Measurement of ∆U and ∆H: Calorimetry")],
    # ONE ENTRY PER (class, chapter) — a repeated key silently wins over the
    # earlier one, so the sub-section additions below are merged into their
    # chapter's existing list rather than appended as a second entry.
    #
    # Title "" means "take it from TITLE_OVERRIDES above".
    # 1.7 sits PAST the last extracted section rather than in a numbering hole, so
    # the hole-filler never reaches it. Verified as printed in the chapter.
    #
    # The `N.M.K` entries are SUB-SECTION holes: the book sets them as a bare
    # number with the title beside it, which the extractor reads as an empty
    # title and drops. The hole-filler only repairs TOP-LEVEL gaps, so these can
    # never be recovered automatically.
    (11, 8): [("8.2", "Tetravalence of Carbon: Shapes of Organic Compounds"), ("8.3.1", "")],
    (12, 1): [("1.1", ""), ("1.2", ""), ("1.7", "")],
    (12, 5): [("5.1", "")],
    (12, 6): [("6.2", ""), ("6.3", ""), ("6.4", ""), ("6.5", ""), ("6.7", ""), ("6.8", ""), ("6.4.2", "")],
    (12, 8): [("8.6", ""), ("8.1.1", ""), ("8.2.1", ""), ("8.2.2", ""), ("8.6.1", ""), ("8.9.3", "")],
    (12, 9): [("9.2", ""), ("9.3", ""), ("9.8", "")],
    (12, 10): [("10.2", ""), ("10.5", ""), ("10.2.2", "")],
}

# Numbers that are NOT sections. NCERT numbers its intext/exercise questions N.M
# exactly like sections, and a few survive every shape test because they read like
# statements. Verified against the book: the rationalised Std XII Electrochemistry
# chapter ends at 2.8 Corrosion, so anything past it is an exercise.
DROP_SECTIONS = {
    (12, "2.10"),
}


def body_font(doc):
    c = collections.Counter()
    for p in doc:
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                for s in l["spans"]:
                    c[s["font"]] += len(s["text"])
    return c.most_common(1)[0][0] if c else ""


def exercises_start(doc):
    """Page index where the chapter's EXERCISES begin, or len(doc) if none.

    STRUCTURAL, because text heuristics cannot do this job. NCERT exercises share
    the N.M numbering of sections and are often plain declaratives — "One mole of
    H2O and one mole of CO are taken in a 10 L vessel..." has no question mark and
    no imperative verb, so a wording filter cannot see it. But every one of them
    sits after the printed EXERCISES heading, and no real section does.
    """
    for i, page in enumerate(doc):
        for line in page.get_text().split("\n"):
            # Case-INSENSITIVE: Std XI prints "EXERCISES", Std XII prints
            # "Exercises". Matching only the caps form silently left the Std XII
            # chapters uncut, so their exercises kept flowing in as sections.
            if re.fullmatch(r"\s*EXERCISES?\s*", line, flags=re.I):
                return i
    return len(doc)


def headings(path, chap):
    doc = fitz.open(path)
    body = body_font(doc)
    cutoff = exercises_start(doc)
    found = {}
    rejected = {}  # section -> title that is_exercise refused; used only to fill holes
    for pageno, page in enumerate(doc):
        if pageno >= cutoff:
            break
        items = []
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                txt = "".join(s["text"] for s in l["spans"] if s["font"] != body)
                if txt.strip():
                    items.append((round(l["bbox"][1], 1), round(l["bbox"][0], 1), txt))
        # Group by COLUMN first, then by y. NCERT is two-column, and grouping on y
        # alone merged across the gutter: on p16 of Ch.1, "1.7.1 Atomic Mass"
        # (right column, y=397.8) and "1.6 Dalton's Atomic Theory" (left column,
        # y=398.0) fused into one line, the regex matched 1.7.1 first, and section
        # 1.6 vanished from the book entirely. Most of the bleed and truncation
        # traced back to this same cross-column merge.
        mid = page.rect.width / 2
        merged = []
        for col in (0, 1):
            colitems = [it for it in items if (it[1] >= mid) == bool(col)]
            colitems.sort(key=lambda z: (z[0], z[1]))
            cur = None
            for y, x, txt in colitems:
                if cur and abs(y - cur[0]) <= 2.5:
                    cur = (cur[0], cur[1], cur[2] + " " + txt)
                else:
                    if cur:
                        merged.append(cur)
                    cur = (y, x, txt)
            if cur:
                merged.append(cur)
        # Reading order: left column top-to-bottom, then right column.
        merged.sort(key=lambda z: (z[1] >= mid, z[0]))

        for i, (y, x, raw) in enumerate(merged):
            t = clean(raw)
            # Optional trailing dot: the book prints "1.2.2." for some headings,
            # and requiring whitespace straight after the number dropped them.
            m = re.match(rf"^{chap}\.(\d+)(?:\.(\d+))?\.?\s+(.*)$", t)
            if not m:
                continue
            n1, n2, title = m.group(1), m.group(2), m.group(3).strip()
            if (len(n1) > 1 and n1.startswith("0")) or not (1 <= int(n1) <= 40):
                continue
            if title and not re.match(r"^[A-Za-z(]", title):
                continue
            j = i + 1
            while j < len(merged) and len(title) < 110:
                ny, _, nraw = merged[j]
                nt = clean(nraw)
                if ny - merged[j - 1][0] > 18 or re.match(rf"^{chap}\.\d", nt):
                    break
                if not re.match(r"^[a-zA-Z(]", nt) or len(nt) > 60:
                    break
                title = (title + " " + nt).strip()
                j += 1
            title = dedupe_words(scrub(tidy_title(title, chap)))
            sec = f"{chap}.{n1}" + (f".{n2}" if n2 else "")
            if len(title) < 3:
                continue
            if is_exercise(title):
                # Keep it as a FALLBACK rather than discarding. Some genuine
                # headings are questions ("3.1 WHY DO WE NEED TO CLASSIFY
                # ELEMENTS ?") and is_exercise cannot tell them from an intext
                # question. The numbering can: see the gap-fill below.
                rejected.setdefault(sec, title)
                continue
            if sec not in found or len(title) > len(found[sec]):
                found[sec] = title
    # Plain-text pass. Some chapters (Amines) place the margin number far from its
    # title, so the y-grouping above cannot join them — but NCERT repeats
    # "9.1 Structure of Amines" as a RUNNING PAGE HEADER, which this catches.
    # Font-pass titles win; this only fills what the font pass missed.
    # Reuse the already-open handle. Opening a SECOND fitz.Document here and
    # never closing it leaked a handle per chapter and wedged the run on Windows.
    # Same EXERCISES cutoff as the font pass — otherwise the plain pass reads the
    # exercise numbering straight back in and undoes the filter.
    full = "\n".join(doc[i].get_text() for i in range(min(cutoff, doc.page_count)))
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
        title = dedupe_words(scrub(tidy_title(title.split("  ")[0], chap)))
        # NCERT exercises are numbered in the same N.M shape as sections
        # ("10.11 What are essential and non-essential amino acids?"). Section
        # titles are short noun phrases; exercise text is a long imperative or
        # a question, so both traits are rejected.
        if is_exercise(title):
            continue
        if not (3 <= len(title) <= 150):
            continue
        sec = f"{chap}.{n1}" + (f".{n2}" if n2 else "")
        if sec not in found or len(title) > len(found[sec]):
            found[sec] = title

    # GAP-FILL. Some genuine section headings ARE questions — Ch.3 opens with
    # "3.1 WHY DO WE NEED TO CLASSIFY ELEMENTS ?" — and is_exercise rejects them
    # on both counts (ends in '?', opens with 'why'). Dropping that filter wholesale
    # would let every intext question back in, since NCERT numbers those N.M too.
    #
    # So only run where the numbering PROVES something is missing: a hole in the
    # top-level sequence (3.1 absent while 3.2..3.7 are present) cannot be
    # anything but a lost heading. Self-limiting — it can never add a number the
    # book does not already imply.
    # GAP-FILL. Some genuine headings ARE questions — Ch.3 opens with "3.1 WHY DO
    # WE NEED TO CLASSIFY ELEMENTS ?" — so is_exercise refuses them on both counts.
    # Only fill a HOLE in the numbering, and only with something that still looks
    # like a heading: NCERT sets top-level headings in caps, while an intext
    # question is mixed-case running prose ("2.3 Consult the table of standard
    # electrode potentials and suggest three..."). Without this second test the
    # fill would inject intext questions wherever a chapter has a hole, which is
    # worse than the hole.
    def heading_shaped(t):
        letters = [c for c in t if c.isalpha()]
        return bool(letters) and (all(c.isupper() for c in letters) or len(t.split()) <= 5)

    tops = sorted(int(s.split(".")[1]) for s in found if s.count(".") == 1)
    if tops:
        for n in range(1, max(tops)):
            sec = f"{chap}.{n}"
            if sec not in found and sec in rejected and heading_shaped(rejected[sec]):
                found[sec] = rejected[sec]

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
                # Inject the hand-verified sections extraction cannot reach, so a
                # student looking one up finds a row instead of concluding the
                # topic is unmapped. setdefault, so a real extraction always wins.
                for sec, title in EXTRA_SECTIONS.get((cls, chap), []):
                    secs.setdefault(sec, title or TITLE_OVERRIDES.get((cls, sec), ""))
                for sec in list(secs):
                    if (cls, sec) in DROP_SECTIONS:
                        del secs[sec]
                for s in sorted(secs, key=lambda k: tuple(int(x) for x in k.split("."))):
                    title = TITLE_OVERRIDES.get((cls, s), secs[s])
                    # Flag what is still short so the UI can say "check the book"
                    # rather than present a fragment as if it were the heading.
                    incomplete = bool(re.search(
                        r"\b(of|the|and|in|for|to|with|between)$", title, re.I))
                    out.append({"class": cls, "chapter_no": chap, "chapter_name": name,
                                "section_no": s, "concept": title,
                                **({"incomplete": True} if incomplete else {})})
                print(f"  Std {cls} ch{chap:>2} {name[:44]:<44} {len(secs):>3} sections")
    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    with open(DEST, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print(f"\nTOTAL {len(out)} NCERT sections -> {os.path.normpath(DEST)}")


if __name__ == "__main__":
    main()
