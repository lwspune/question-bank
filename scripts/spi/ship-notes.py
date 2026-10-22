"""Ship one drafted SPI /notes chapter: apply its re-cut, register it, tag every row.

Usage (repo root): python scripts/spi/ship-notes.py <abbr> [--dry]

The chapter must be drafted per scripts/spi/NOTES_BRIEF.md and reviewed first. Reads its row in
scripts/spi/notes-manifest.json; each page file is the subtopic slug minus `spi-<abbr>-`, and its
export is the one `SubtopicNote` it declares. Steps stop at the first failure:
  1. scripts/spi/reshape.ts <plan> --apply   (bank + transcripts)
  2. scripts/notes-pipeline/cds-gk/register.py   (index.ts, route pages, subject landing, registry)
  3. scripts/notes-pipeline/jee/tag-chapter.ts   (every PUBLIC row, exactly once)
Run `npm run notes:order`, `notes:nav-index`, `chat:notes-data` and `seo:dates` once per batch after.
"""
import io, json, os, re, subprocess, sys

ROOT = os.getcwd()
abbr = sys.argv[1]
dry = "--dry" in sys.argv
manifest = json.load(io.open(os.path.join(ROOT, "scripts", "spi", "notes-manifest.json"), encoding="utf-8"))
row = next(c for c in manifest["chapters"] if c["abbr"] == abbr)
route, display = manifest["routes"][row["subject"]]
data = os.path.join(ROOT, "src", "app", "notes", route, row["slug"], "_data")

chapter_src = io.open(os.path.join(data, "chapter.ts"), encoding="utf-8").read()
const = re.search(r"export const (\w+)_CHAPTER\b", chapter_src).group(1)
order = re.search(r"subtopicOrder:\s*\[([^\]]*)\]", chapter_src, re.S).group(1)
slugs = re.findall(r'"([^"]+)"', order)
pages = []
for slug in slugs:
    prefix = f"spi-{abbr}-"
    if not slug.startswith(prefix):
        sys.exit(f"slug {slug} does not start with {prefix}")
    f = slug[len(prefix):]
    src = io.open(os.path.join(data, f + ".ts"), encoding="utf-8").read()
    exports = re.findall(r"export const (\w+): SubtopicNote\b", src)
    if len(exports) != 1:
        sys.exit(f"{f}.ts must export exactly one SubtopicNote, found {exports}")
    pages.append([slug, f, exports[0]])

spec = {
    "route": route, "exam": "SPI", "subject": row["subject"], "display": display, "slug": row["slug"],
    "const": const, "chip": f'{row["chapter"].split(" — ")[0]} notes', "prefix": f"spi-{abbr}", "cprefix": f"spi{abbr}",
    "blurb": f"Pages cut by reading every question (scripts/spi/reshape/{row['slug']}.ts). Order matches `subtopicOrder`.",
    "pages": pages,
}
spec_path = os.path.join(ROOT, "generated-papers", f"_spi_reg_{abbr}.json")
io.open(spec_path, "w", encoding="utf-8").write(json.dumps(spec, indent=1, ensure_ascii=False))
print(f"{row['chapter']}: {len(pages)} pages, const {const}")


def run(cmd):
    print("$", " ".join(cmd))
    r = subprocess.run(cmd, cwd=ROOT, shell=(os.name == "nt"))
    if r.returncode != 0:
        sys.exit(f"FAILED: {' '.join(cmd)}")


plan = os.path.join("scripts", "spi", "reshape", row["slug"] + ".ts")
tag = os.path.join("generated-papers", f"_tag-spi-{abbr}.json")
run(["npx", "tsx", "scripts/spi/reshape.ts", plan] + ([] if dry else ["--apply"]))
if dry:
    run(["npx", "tsx", "scripts/notes-pipeline/jee/tag-chapter.ts", tag, "--dry"])
    print("DRY: not registered, not tagged")
    sys.exit(0)
run(["python", "scripts/notes-pipeline/cds-gk/register.py", spec_path])
run(["npx", "tsx", "scripts/notes-pipeline/jee/tag-chapter.ts", tag])
print("SHIPPED", row["chapter"])
