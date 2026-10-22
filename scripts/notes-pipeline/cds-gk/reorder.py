"""Put one CDS subject's NOTES_CHAPTERS entries in teaching order.

Usage (repo root): python scripts/notes-pipeline/cds-gk/reorder.py <Subject> <slug> <slug> ...

register.py appends each chapter after the route's last entry, so chapters land in the
order they were registered. For CDS the registry order IS the order on the subject page
and the "Next chapter" link, so it is set here once a subject is complete. Refuses unless
the slugs given are exactly the subject's registered chapters and their entries are
contiguous. Keeps the file's line endings.
"""
import io, re, sys

subject, order = sys.argv[1], sys.argv[2:]
p = "src/lib/notes/chapters.ts"
s = io.open(p, encoding="utf-8", newline="").read()
nl = "\r\n" if "\r\n" in s else "\n"
t = s.replace("\r\n", "\n")
blocks = re.findall(
    r'\n  \{\n    examName: "CDS",\n    subjectName: "' + re.escape(subject) + r'",\n(?:.*\n)*?  \},', t)
slug = lambda b: re.search(r'chapterSlug: "([^"]+)"', b).group(1)
if sorted(map(slug, blocks)) != sorted(order):
    sys.exit(f"registered {sorted(map(slug, blocks))} != given {sorted(order)}")
joined = "".join(blocks)
if joined not in t:
    sys.exit("entries are not contiguous")
by = {slug(b): b for b in blocks}
t = t.replace(joined, "".join(by[o] for o in order))
io.open(p, "w", encoding="utf-8", newline="").write(t.replace("\n", nl))
print(f"{subject}: {' > '.join(order)}")
