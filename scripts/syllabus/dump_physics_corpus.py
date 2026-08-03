"""Dump the Physics source books as PER-CHAPTER text, for ruling verification.

    python scripts/syllabus/dump_physics_corpus.py

Writes generated-papers/physics-corpus.json:
    { "MH State Board|11|5": {"chapter": "Gravitation", "text": "..."}, ... }

PER-CHAPTER is load-bearing, not a convenience. The Chemistry pipeline learned
this the hard way: searching the whole corpus at once scored a real gap as
covered, because the term appeared *somewhere* in 1.6M characters — in a
different chapter, often as a passing mention. A ruling has to say WHERE a topic
is taught, so the unit of search must be the unit a ruling can cite.

This exists because a title match is not evidence. The State Board's AC chapter
has no "Transformers" heading, but that alone cannot decide the ruling: the
topic might be taught inside another chapter's section. Only reading the text
settles it, and only per-chapter text can name the chapter that teaches it.
"""
import fitz, os, re, json

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "generated-papers", "physics-corpus.json")

SB = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Physics\State_Board\Topics"
NCERT = r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\NCERT\Books"

# NCERT volumes and the chapter range each covers, matching the spine ingest.
NCERT_PARTS = {
    11: [("Part_1", range(1, 8)), ("Part_2", range(8, 15))],
    12: [("Part_1", range(1, 9)), ("Part_2", range(9, 15))],
}


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.replace("\u00ad", "")).strip()


def dump_state_board(out: dict) -> None:
    """State Board ships one PDF per chapter, so the split is already made."""
    for cls, sub in ((11, "11th_Topics"), (12, "12th_Topics")):
        folder = os.path.join(SB, sub)
        for fn in sorted(os.listdir(folder)):
            m = re.match(r"^(\d{1,2})\.\s*(.+)\.pdf$", fn, re.I)
            if not m:
                continue
            ch, name = int(m.group(1)), m.group(2).strip()
            doc = fitz.open(os.path.join(folder, fn))
            text = norm(" ".join(p.get_text() for p in doc))
            out[f"MH State Board|{cls}|{ch}"] = {"chapter": name, "text": text}
            print(f"  SB   Std{cls} ch{ch:>2} {name[:40]:<40} {len(text):>7} chars")


def dump_ncert(out: dict) -> None:
    """NCERT ships two volumes per year, so chapters are split by locating each
    chapter's own opening page and slicing to the next one."""
    for cls, parts in NCERT_PARTS.items():
        for part, chapters in parts:
            path = os.path.join(NCERT, f"{cls}th", "Physics", part,
                                f"NCERT_Physics_{cls}th_{part}.pdf")
            doc = fitz.open(path)
            starts = {}
            for pno, page in enumerate(doc):
                m = re.search(r"^\s*(\d{1,2})\.1\s+", page.get_text(), re.M)
                if m:
                    ch = int(m.group(1))
                    if ch in chapters and ch not in starts:
                        starts[ch] = pno
            ordered = sorted(starts.items(), key=lambda kv: kv[1])
            for i, (ch, first) in enumerate(ordered):
                last = ordered[i + 1][1] if i + 1 < len(ordered) else len(doc)
                text = norm(" ".join(doc[p].get_text() for p in range(first, last)))
                out[f"NCERT|{cls}|{ch}"] = {"chapter": f"ch{ch}", "text": text}
                print(f"  NCERT Std{cls} ch{ch:>2} pages {first:>3}-{last:<3}"
                      f"{'':<28}{len(text):>7} chars")


def main():
    out: dict = {}
    print("=== State Board ===")
    dump_state_board(out)
    print("=== NCERT ===")
    dump_ncert(out)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False)
    total = sum(len(v["text"]) for v in out.values())
    print(f"\n-> {OUT}  ({len(out)} chapters, {total:,} chars)")


if __name__ == "__main__":
    main()
