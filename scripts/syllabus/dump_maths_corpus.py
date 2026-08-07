"""Dump the Mathematics source books as PER-CHAPTER text, for ruling evidence.

    python scripts/syllabus/dump_maths_corpus.py

Writes generated-papers/maths-corpus.json:
    { "MH State Board|11|5": {"chapter": "Straight Line", "text": "..."}, ... }

PER-CHAPTER is load-bearing (see dump_physics_corpus.py): a ruling has to say
WHERE a topic is taught, so the unit of search must be the unit a ruling can
cite. Search with:  python scripts/syllabus/search_corpus.py --corpus=maths ...

CHAPTER KEYS USE THE SPINE'S RENUMBERED NUMBERS, not the printed ones: the
State Board Maths years are two Parts that both restart at Ch.1, and the spine
renumbers Part 2 continuously (Std XI +9, Std XII +7 — see
dump_sb_maths_sections.py). A corpus keyed by printed numbers would say "ch1"
for two different chapters and disagree with every handout ref.

CAVEAT the ruling brief must carry: the State Board Maths text layer GARBLES
math — the ∫ sign extracts as Sinhala glyphs and 2-D constructions flatten —
so prose-term search works ("integration by parts", "Bayes") but formula-level
evidence needs the rendered page. The NCERT layer is cleaner but shreds
display formulas too.
"""
import fitz, os, re, json

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "generated-papers", "maths-corpus.json")

SB_FOLDERS = [
    # (class, printed-chapter offset, folder) — mirrors dump_sb_maths_sections
    (11, 0, r"C:/tmp/PYQPs/MHT-CET/State_Board/11th/Maths/Part 1/Part 1_Chapterwise"),
    (11, 9, r"C:/tmp/PYQPs/MHT-CET/State_Board/11th/Maths/Part 2/Part 2_Chapterwise"),
    (12, 0, r"C:/tmp/PYQPs/MHT-CET/State_Board/12th/Part 01"),
    (12, 7, r"C:/tmp/PYQPs/MHT-CET/State_Board/12th/Part 02"),
]
NCERT_BASE = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books"
NCERT_FOLDERS = [
    # (class, printed-chapter offset, folder) — mirrors dump_ncert_maths_sections
    (11, 0, os.path.join(NCERT_BASE, "11th", "Maths")),
    (12, 0, os.path.join(NCERT_BASE, "12th", "Maths", "Part 1")),
    (12, 6, os.path.join(NCERT_BASE, "12th", "Maths", "Part 2")),
]


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.replace("\u00ad", "")).strip()


def dump(out: dict, source: str, folders, pattern: str) -> None:
    for cls, offset, folder in folders:
        for fn in sorted(os.listdir(folder)):
            m = re.match(pattern, fn, re.I)
            if not m:
                continue
            ch = int(m.group(1)) + offset
            name = re.sub(r"[_&]+", " ", m.group(2)).strip()
            doc = fitz.open(os.path.join(folder, fn))
            text = norm(" ".join(p.get_text() for p in doc))
            out[f"{source}|{cls}|{ch}"] = {"chapter": name, "text": text}
            print(f"  {source[:4]:<5} Std{cls} ch{ch:>2} {name[:40]:<40} {len(text):>7} chars")


def main():
    out: dict = {}
    print("=== State Board ===")
    dump(out, "MH State Board", SB_FOLDERS, r"^Ch_(\d{1,2})_(.+)\.pdf$")
    print("=== NCERT ===")
    dump(out, "NCERT", NCERT_FOLDERS, r"^(\d{1,2})\.\s*(.+)\.pdf$")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False)
    total = sum(len(v["text"]) for v in out.values())
    print(f"\n-> {OUT}  ({len(out)} chapters, {total:,} chars)")


if __name__ == "__main__":
    main()
