"""Dump the Chemistry source books as PER-CHAPTER text, for ruling verification.

    python scripts/syllabus/dump_chem_corpus.py

Writes generated-papers/chem-corpus.json:
    { "MH State Board|11|5": {"chapter": "Basic Principles...", "text": "..."}, ... }

The Physics sibling (dump_physics_corpus.py) explains why per-chapter is
load-bearing rather than a convenience, and this pipeline is where that was
learned: searching the whole 1.6M-char corpus at once scored a real gap as
covered, because the term appeared SOMEWHERE — in a different chapter, usually
as a passing mention. NCERT teaches Vitamins inside Biomolecules; the State
Board Biomolecules chapter says "vitamin" zero times, yet the word appears nine
times elsewhere in the corpus. A ruling must say WHERE a topic is taught, so the
unit of search has to be the unit a ruling can cite.

This does NOT replace generated-papers/sb-corpus.json, which has a different
shape ({all, chapters}) and existing consumers (probe-exam-coverage.ts,
ingest-ncert-spine.ts). It adds the NCERT half, which had no text corpus at all,
and re-dumps the State Board half so both books share one key format.

Both books ship one PDF per chapter here, so unlike NCERT Physics no page
slicing is needed. Non-chapter files are skipped by the filename pattern: the
State Board folders also hold a whole-book "00. ..." PDF, and the NCERT folders
hold prelims/answers/appendices (kech1a1, lech1an, ...) that would otherwise be
folded into whichever chapter they sorted next to.
"""
import fitz, os, re, json

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "generated-papers", "chem-corpus.json")

SB = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Chem\State_Board\Book"
NCERT = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books"

# "01. Some Basic Concepts of Chemistry.pdf". Chapter 00 is the whole-book PDF
# and is rejected below, not by this pattern, so the skip is visible in output.
CHAPTER_PDF = re.compile(r"^(\d{1,2})\.\s*(.+)\.pdf$", re.I)


def norm(s: str) -> str:
    # Soft hyphens survive PDF extraction and split words mid-token, which
    # silently defeats a search for the very term a ruling is checking.
    return re.sub(r"\s+", " ", s.replace("\u00ad", "")).strip()


def read_chapters(folder: str, source: str, cls: int, out: dict) -> int:
    n = 0
    for fn in sorted(os.listdir(folder)):
        m = CHAPTER_PDF.match(fn)
        if not m:
            continue
        ch, name = int(m.group(1)), m.group(2).strip()
        if ch == 0:
            print(f"    skip (whole book): {fn}")
            continue
        key = f"{source}|{cls}|{ch}"
        if key in out:
            raise SystemExit(f"duplicate chapter key {key} from {fn}")
        doc = fitz.open(os.path.join(folder, fn))
        text = norm(" ".join(p.get_text() for p in doc))
        doc.close()
        out[key] = {"chapter": name, "text": text}
        print(f"    Std{cls} ch{ch:>2} {name[:44]:<44} {len(text):>7} chars")
        n += 1
    return n


def main():
    out: dict = {}

    print("=== MH State Board ===")
    for cls in (11, 12):
        read_chapters(os.path.join(SB, f"{cls}th"), "MH State Board", cls, out)

    print("=== NCERT ===")
    for cls in (11, 12):
        base = os.path.join(NCERT, f"{cls}th", "Chemistry")
        # Part_1/Part_2 split the year but the chapter numbering runs straight
        # through, so both parts write into the same class namespace.
        for part in sorted(os.listdir(base)):
            p = os.path.join(base, part)
            if os.path.isdir(p):
                read_chapters(p, "NCERT", cls, out)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False)

    by_source: dict = {}
    for k in out:
        by_source[k.split("|")[0]] = by_source.get(k.split("|")[0], 0) + 1
    total = sum(len(v["text"]) for v in out.values())
    print(f"\n-> {OUT}")
    print(f"   {len(out)} chapters ({by_source}), {total:,} chars")

    # An empty or near-empty chapter means a scanned PDF with no text layer,
    # which would make every search against it silently return "absent".
    thin = [k for k, v in out.items() if len(v["text"]) < 3000]
    if thin:
        print(f"   WARNING: {len(thin)} chapter(s) under 3k chars — no text layer?")
        for k in thin:
            print(f"     {k} ({len(out[k]['text'])} chars)")


if __name__ == "__main__":
    main()
