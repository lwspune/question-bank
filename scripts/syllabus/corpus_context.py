"""Print the SENTENCES around a term, per chapter — the read-the-text half of search_corpus.

    python scripts/syllabus/corpus_context.py "Dalton's law" --source=NCERT
    python scripts/syllabus/corpus_context.py "titration" --corpus=chem --max=6

search_corpus.py answers "how many hits, in which chapter", which is where a
ruling STARTS. It cannot answer the question the ruling brief actually turns on:
is this hit a section that TEACHES the topic, or a passing mention? The brief's
own examples are all of that shape — 'urea' scoring 41 hits that are colligative-
property sums, 'vitamin' appearing 9 times in a corpus whose Biomolecules chapter
says it zero times. Counting those as coverage is the documented false-positive.

So this prints the surrounding text and leaves the judgement to a reader. It is
evidence, never a verdict.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def load(corpus: str):
    path = ROOT / "generated-papers" / f"{corpus}-corpus.json"
    # utf-8 explicitly: the default on Windows is cp1252 and these corpora carry
    # curly quotes, degree signs and Greek letters straight from the books.
    return json.loads(path.read_text(encoding="utf-8"))


def norm(s: str) -> str:
    # Mirrors search_corpus: curly punctuation and flexible spacing, so a term
    # that matched there also matches here rather than silently finding nothing.
    return (
        s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    )


def main() -> None:
    terms, corpus, source, limit = [], "chem", None, 4
    for a in sys.argv[1:]:
        if a.startswith("--corpus="):
            corpus = a.split("=", 1)[1]
        elif a.startswith("--source="):
            source = a.split("=", 1)[1].lower()
        elif a.startswith("--max="):
            limit = int(a.split("=", 1)[1])
        elif a.startswith("--"):
            sys.exit(f"unknown flag {a}")
        else:
            terms.append(a)
    if not terms:
        sys.exit("usage: corpus_context.py TERM [TERM ...] [--corpus=chem] [--source=NCERT] [--max=N]")

    # Keyed "<source>|<class>|<chapter_no>" -> {chapter, text}; the key carries
    # the source and year, so the label is rebuilt from it rather than from
    # fields the value does not have.
    data = load(corpus)

    for term in terms:
        pattern = re.compile(r"\b" + re.escape(norm(term)).replace(r"\ ", r"\s+"), re.I)
        print(f"\n=== {term} ===")
        for key, entry in data.items():
            src, cls, chno = key.split("|")
            if source and source not in src.lower():
                continue
            text = norm(str(entry.get("text", "")))
            sentences = re.split(r"(?<=[.:;])\s+", text)
            hits = [s.strip() for s in sentences if pattern.search(s)]
            if not hits:
                continue
            print(f"\n-- {src} Std {cls} ch{chno} {entry.get('chapter', '')}  ({len(hits)} sentence(s))")
            for s in hits[:limit]:
                print(f"   {' '.join(s.split())[:300]}")


if __name__ == "__main__":
    main()
