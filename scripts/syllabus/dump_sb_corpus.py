"""Dump the State Board Std XI+XII Chemistry books as PER-CHAPTER text.

A real file, not `python -c`: inlining this through JSON.stringify mangles the
newlines and backslashes in the Windows paths.

PER-CHAPTER is the load-bearing part. Searching the whole 1.6M-char corpus is too
lenient — NCERT teaches Vitamins inside Biomolecules, the State Board Biomolecules
chapter says "vitamin" ZERO times, yet the word appears 9 times elsewhere in the
corpus. A whole-corpus search therefore scored a real gap as fully covered. A
coverage claim has to be tested against the chapter that would actually teach it.

Output feeds probe-exam-coverage.ts and ingest-ncert-spine.ts.
"""
import fitz, os, json

BOOKS = [
    (11, r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Chem\State_Board\Book\11th"),
    (12, r"C:\Vilas\LWS_Pune\NDA_Subjects_Content\Subjects\Chem\State_Board\Book\12th"),
]

DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..",
                    "generated-papers", "sb-corpus.json")


def main():
    per = {}
    parts = []
    for cls, book in BOOKS:
        for f in sorted(os.listdir(book)):
            # skip the whole-book "00." file so its text is not counted twice
            if f[:2].isdigit() and f.lower().endswith(".pdf") and not f.startswith("00"):
                d = fitz.open(os.path.join(book, f))
                t = "\n".join(p.get_text() for p in d).lower()
                d.close()
                # the books print "van\u2019t Hoff"; a straight-quote search against a
                # curly apostrophe silently reports a false gap
                t = t.replace("\u2019", "'").replace("\u2018", "'")
                per[f"{cls}-{int(f[:2])}"] = t
                parts.append(t)
    payload = {"all": "\n".join(parts), "chapters": per}
    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    with open(DEST, "w", encoding="utf-8") as fh:
        json.dump(payload, fh)
    print(f"corpus {len(payload['all'])//1000}k chars, {len(per)} chapters -> {os.path.normpath(DEST)}")


if __name__ == "__main__":
    main()
