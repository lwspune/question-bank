"""Homi Bhabha /notes: dump a chapter, or ship a drafted one (re-cut, register, tag).

Usage (repo root of the checkout that holds the notes files):
  python scripts/homi-bhabha/notes/ship.py dump <abbr>          # generated-papers/_cdsk_hb9<abbr>.{md,json}
  python scripts/homi-bhabha/notes/ship.py plan <abbr>          # the re-cut's dry run (writes nothing)
  python scripts/homi-bhabha/notes/ship.py ship <abbr> [--dry]  # re-cut + register + tag

The chapter must be drafted per scripts/homi-bhabha/notes/NOTES_BRIEF.md and reviewed first. Files:
  plan   scripts/homi-bhabha/notes/plans/<slug>.ts   (reshape plan, reviewed)
  tags   scripts/homi-bhabha/notes/tags/<abbr>.json  (tag map, tag-chapter.ts shape)
  pages  src/app/notes/<route>/<slug>/_data/<page>.ts + chapter.ts

A worktree never holds a production .env.local (the 2026-11-18 incident). The DB steps (dump,
reshape, tag) get ONLY the two Supabase settings, read from the main checkout's .env.local and
passed in this process's environment; nothing is written to disk. Steps stop at the first failure.
Run `npm run notes:order`, `notes:nav-index`, `notes:chapter-loaders`, `chat:notes-data` and
`seo:dates` once per batch after.
"""
import io, json, os, re, subprocess, sys

ROOT = os.getcwd()
MAIN_ENV = r"C:\Users\vilas\Downloads\Question_Bank\.env.local"
LANE = os.path.join(ROOT, "scripts", "homi-bhabha", "notes")
cmd, abbr = sys.argv[1], sys.argv[2]
dry = "--dry" in sys.argv
manifest = json.load(io.open(os.path.join(LANE, "manifest.json"), encoding="utf-8"))
row = next(c for c in manifest["chapters"] if c["abbr"] == abbr)
route, display = manifest["routes"][row["subject"]]


def prod_env():
    keep = {"NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"}
    env = dict(os.environ)
    for line in io.open(MAIN_ENV, encoding="utf-8"):
        m = re.match(r"\s*([A-Z_]+)\s*=\s*(.*)\s*$", line)
        if m and m.group(1) in keep:
            env[m.group(1)] = m.group(2).strip().strip('"').strip("'")
    missing = keep - {k for k in keep if env.get(k)}
    if missing:
        sys.exit(f"main checkout .env.local lacks {missing}")
    return env


def run(args, db=False):
    print("$", " ".join(args))
    r = subprocess.run(args, cwd=ROOT, shell=(os.name == "nt"), env=prod_env() if db else None)
    if r.returncode != 0:
        sys.exit(f"FAILED: {' '.join(args)}")


if cmd == "dump":
    os.makedirs(os.path.join(ROOT, "generated-papers"), exist_ok=True)
    run(["npx", "tsx", "scripts/notes-pipeline/cds-gk/dump.ts", row["subject"], row["chapter"], f"hb9{abbr}",
         f"--exam={manifest['exam']}"], db=True)
    sys.exit(0)

if cmd == "plan":  # the re-cut's DRY RUN only: reads the bank and the band files, writes nothing
    run(["npx", "tsx", "scripts/homi-bhabha/reshape.ts",
         os.path.join("scripts", "homi-bhabha", "notes", "plans", row["slug"] + ".ts")], db=True)
    sys.exit(0)

if cmd != "ship":
    sys.exit("usage: ship.py dump|plan|ship <abbr> [--dry]")

data = os.path.join(ROOT, "src", "app", "notes", route, row["slug"], "_data")
chapter_src = io.open(os.path.join(data, "chapter.ts"), encoding="utf-8").read()
const = re.search(r"export const (\w+)_CHAPTER\b", chapter_src).group(1)
order = re.search(r"subtopicOrder:\s*\[([^\]]*)\]", chapter_src, re.S).group(1)
pages = []
for slug in re.findall(r'"([^"]+)"', order):
    prefix = f"hb9-{abbr}-"
    if not slug.startswith(prefix):
        sys.exit(f"slug {slug} does not start with {prefix}")
    f = slug[len(prefix):]
    src = io.open(os.path.join(data, f + ".ts"), encoding="utf-8").read()
    exports = re.findall(r"export const (\w+): SubtopicNote\b", src)
    if len(exports) != 1:
        sys.exit(f"{f}.ts must export exactly one SubtopicNote, found {exports}")
    pages.append([slug, f, exports[0]])

spec = {
    "route": route, "exam": manifest["exam"], "subject": row["subject"], "display": display, "slug": row["slug"],
    "const": const, "chip": row.get("chip", f'{row["chapter"]} notes'), "prefix": f"hb9-{abbr}", "cprefix": f"hb9{abbr}",
    "blurb": f"Pages cut by reading every question (scripts/homi-bhabha/notes/plans/{row['slug']}.ts). Order matches `subtopicOrder`.",
    "pages": pages,
}
if row.get("titleName"):
    spec["titleName"] = row["titleName"]
os.makedirs(os.path.join(ROOT, "generated-papers"), exist_ok=True)
spec_path = os.path.join(ROOT, "generated-papers", f"_hb9_reg_{abbr}.json")
io.open(spec_path, "w", encoding="utf-8").write(json.dumps(spec, indent=1, ensure_ascii=False))
print(f"{row['chapter']}: {len(pages)} pages, const {const}")

plan = os.path.join("scripts", "homi-bhabha", "notes", "plans", row["slug"] + ".ts")
tag = os.path.join("scripts", "homi-bhabha", "notes", "tags", f"{abbr}.json")
run(["npx", "tsx", "scripts/homi-bhabha/reshape.ts", plan] + ([] if dry else ["--apply"]), db=True)
if dry:
    run(["npx", "tsx", "scripts/notes-pipeline/jee/tag-chapter.ts", tag, "--dry"], db=True)
    print("DRY: not registered, not tagged")
    sys.exit(0)
run(["python", "scripts/notes-pipeline/cds-gk/register.py", spec_path])
run(["npx", "tsx", "scripts/notes-pipeline/jee/tag-chapter.ts", tag], db=True)
print("SHIPPED", row["chapter"])
