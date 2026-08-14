"""Search a book corpus per chapter, to turn a coverage guess into evidence.

    python scripts/syllabus/search_corpus.py "unit cell" "packing efficiency"
    python scripts/syllabus/search_corpus.py --source=NCERT "polymerisation"
    python scripts/syllabus/search_corpus.py --corpus=physics --word "emf"

Prints, per term, every chapter containing it and the hit count, so a ruling can
name the section that teaches a topic instead of asserting that one does.

WHY THIS EXISTS, AND WHAT IT IS NOT
-----------------------------------
A hit is weak evidence and absence is weaker still. Both must be read, never
taken as a verdict:

  * A HIT may be a passing mention. "vitamin" appears nine times across the
    State Board corpus while its Biomolecules chapter says it zero times. Only
    the chapter that would actually teach the topic counts, which is why output
    is per chapter and never totalled.

  * ABSENCE is the weakest evidence available. Three separate negative-grep
    claims were wrong during the Physics phase, each for a different reason:
      - spacing      'step-?up' misses "step up" written with a space
      - punctuation  "newton's law of cooling" misses a CURLY apostrophe, and
                     both books use one; the section exists in each
      - homonym      r'\bNOR\b' matches the ordinary English word "nor", which
                     briefly made logic gates look present in six chapters
    So this normalises curly punctuation and treats spaces as flexible, and
    --word is offered for terms that are also ordinary English. Before calling a
    topic absent, vary spelling, spacing AND punctuation, and prefer a term that
    cannot occur as ordinary prose.

Corpora are built by dump_chem_corpus.py / dump_physics_corpus.py.
"""
import json, os, re, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def normalise(s: str) -> str:
    """Fold the punctuation variants that silently break a search.

    Curly quotes, the various dashes and non-breaking spaces all appear in these
    PDFs and none of them survive a naive query typed on a keyboard.
    """
    s = unicodedata.normalize("NFKC", s)
    for a, b in (("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'),
                 ("–", "-"), ("—", "-"), ("−", "-"), (" ", " ")):
        s = s.replace(a, b)
    return s.lower()


def pattern_for(term: str, mode: str) -> re.Pattern:
    """Spaces and hyphens in the query match any run of either in the text.

    "step up", "step-up" and "stepup" are the same topic to a reader and three
    different strings to a regex; these books use all three.

    The DEFAULT anchors the start of the term to a word boundary and leaves the
    end open, which is the only one of the three modes that is right more often
    than it is wrong:

      substring  "cement" matches displaCEMENT — it scored 17 hits in NCERT
                 Redox Reactions and 16 in Amines, making a topic neither book
                 teaches look ubiquitous.
      whole word "aldehyde" then fails to match "aldehydes", so the chapter that
                 is named after the topic reports nothing.
      prefix     matches cement/cements but not displacement, and aldehyde/
                 aldehydes both. (default)

    --word is still worth reaching for on a term that is also ordinary English:
    r"\\bNOR\\b" is the only way to stop "nor" matching.
    """
    parts = [re.escape(p) for p in re.split(r"[\s-]+", normalise(term)) if p]
    body = r"[\s-]*".join(parts)
    if mode == "substring":
        return re.compile(body)
    return re.compile(r"\b" + body + (r"\b" if mode == "word" else ""))


def main() -> int:
    args = [a for a in sys.argv[1:]]
    corpus = "chem"
    source_filter = None
    mode = "prefix"
    terms = []
    for a in args:
        if a.startswith("--corpus="):
            corpus = a.split("=", 1)[1]
        elif a.startswith("--source="):
            source_filter = a.split("=", 1)[1]
        elif a in ("--word", "-w"):
            mode = "word"
        elif a == "--substring":
            mode = "substring"
        elif a.startswith("-"):
            print(f"unknown flag {a}", file=sys.stderr)
            return 2
        else:
            terms.append(a)

    if not terms:
        print(__doc__)
        return 2

    path = os.path.join(ROOT, "generated-papers", f"{corpus}-corpus.json")
    if not os.path.exists(path):
        print(f"no corpus at {path} — build it with dump_{corpus}_corpus.py", file=sys.stderr)
        return 1
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    # A --source that matches no book must be a LOUD failure, never a search.
    # The filter is an exact match, so "--source=MH State" (the obvious guess for
    # "MH State Board") selected zero chapters and every term then printed
    # "ZERO hits in MH State — absence is weak evidence", which reads as a finding
    # about the book. Absence is what this tool is most often used to establish,
    # so an operator typo silently manufacturing it across every term is the worst
    # failure available here: it produces confident, plausible, wrong `not`
    # rulings that no later probe can catch.
    known = sorted({key.split("|")[0] for key in data})
    if source_filter and not any(s.lower() == source_filter.lower() for s in known):
        print(
            f"unknown --source={source_filter!r}; this corpus has: "
            + ", ".join(repr(s) for s in known),
            file=sys.stderr,
        )
        return 2

    # Normalise once, not per term: these corpora are ~3M chars.
    chapters = []
    for key, v in data.items():
        source, cls, ch = key.split("|")
        if source_filter and source.lower() != source_filter.lower():
            continue
        chapters.append((source, int(cls), int(ch), v["chapter"], normalise(v["text"])))
    chapters.sort(key=lambda c: (c[0], c[1], c[2]))

    for term in terms:
        rx = pattern_for(term, mode)
        hits = []
        for source, cls, ch, name, text in chapters:
            n = len(rx.findall(text))
            if n:
                hits.append((n, source, cls, ch, name))
        label = f'"{term}"' + ("" if mode == "prefix" else f" ({mode})")
        if not hits:
            scope = source_filter or "either book"
            print(f"\n{label}: ZERO hits in {scope} "
                  f"— absence is weak evidence, try a spelling/spacing variant")
            continue
        print(f"\n{label}: {sum(h[0] for h in hits)} hits in {len(hits)} chapter(s)")
        for n, source, cls, ch, name in sorted(hits, key=lambda h: -h[0]):
            print(f"   {n:>4}  {source:<15} Std {cls} ch{ch:>2}  {name[:52]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
