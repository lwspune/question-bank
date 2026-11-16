"""Build register.py's spec from a drafted chapter's _data/ folder.

Usage (repo root):
  python scripts/notes-pipeline/cds-gk/reg-from-data.py <route> <slug> <Subject> <CONST> <prefix> <cprefix> "<chip>" [--exam=NEET] > generated-papers/_reg-<prefix>.json

Reads chapter.ts's subtopicOrder and finds each page by its slug's last word
(`cdshi-an-stone` -> stone.ts) and the file's exported `*_NOTE` name, so the page
list cannot drift from what the agent drafted. Fails on a missing file or export.
"""
import io, json, os, re, sys

# --exam=NEET registers another exam's chapter (default CDS). NEET chapters are re-cut by
# scripts/neet/retax.ts from a plan, not by a cds-gs reshape script, so the blurb says so.
exam = next((a[7:] for a in sys.argv if a.startswith("--exam=")), "CDS")
route, slug, subject, const, prefix, cprefix, chip = [a for a in sys.argv[1:] if not a.startswith("--")][:7]
d = os.path.join("src", "app", "notes", route, slug, "_data")
chapter = io.open(os.path.join(d, "chapter.ts"), encoding="utf-8").read()
order = re.findall(r'"([a-z0-9-]+)"', chapter[chapter.index("subtopicOrder"):])
pages = []
for s in order:
    if not s.startswith(prefix + "-"):
        sys.exit(f"{s}: does not start with {prefix}-")
    f = s[len(prefix) + 1:]
    text = io.open(os.path.join(d, f + ".ts"), encoding="utf-8").read()
    m = re.search(r"export const (\w+_NOTE)\b", text)
    if not m:
        sys.exit(f"{f}.ts: no *_NOTE export")
    pages.append([s, f, m.group(1)])
display = exam + " " + subject
how = ("re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json" if exam == "NEET"
       else f"cut by reading every solution (scripts/cds-gs/reshape/{slug}.ts)")
print(json.dumps({
    "route": route, "subject": subject, "display": display, "slug": slug, "const": const,
    "chip": chip, "prefix": prefix, "cprefix": cprefix,
    "blurb": f"{len(pages)} pages {how}.\nOrder matches `subtopicOrder`.",
    **({"exam": exam} if exam != "CDS" else {}),
    "pages": pages,
}, ensure_ascii=False, indent=1))
