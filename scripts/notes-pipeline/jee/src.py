"""Show a JEE row's question in its SOURCE docx (and optionally its solution doc).

  python scripts/notes-pipeline/jee/src.py <dump.json> <idprefix> [--soln] [--ctx=N]

Resolves source_file -> scripts/jee/papers/<id>.json -> the raw docx under
C:/Vilas/LWS_Pune/JEE_Mains/PYQs/<year>/, converts it with pandoc (cached in the
scratchpad), and prints the block whose words best match the stem. Matching is
by WORDS, never by question number: pandoc collapses list numbering.
"""
import json, os, re, subprocess, sys, glob, hashlib

ROOT = os.environ.get("JEE_PYQ_ROOT", "C:/Vilas/LWS_Pune/JEE_Mains/PYQs")
CACHE = os.path.join(os.environ.get("TEMP", "."), "jee_src_cache")
os.makedirs(CACHE, exist_ok=True)
PANDOC = os.environ.get("PANDOC") or os.path.join(os.environ["LOCALAPPDATA"], "Pandoc", "pandoc.exe")
MONTHS = {"jan": "jan", "feb": "feb", "apr": "apr", "jun": "june", "jul": "july"}

def paper_id(source_file):
    for f in glob.glob("scripts/jee/papers/*.json"):
        if json.load(open(f, encoding="utf8")).get("sourceFile") == source_file:
            return os.path.basename(f)[:-5]
    raise SystemExit("no paper for " + source_file)

def docx_for(pid, soln=False):
    y = pid[:4]
    files = [f for f in os.listdir(os.path.join(ROOT, y)) if f.lower().endswith(".docx")]
    is_soln = lambda f: bool(re.search(r"soln|_ak", f, re.I))
    files = [f for f in files if is_soln(f) == soln]
    m = re.match(r"\d{4}-p(\d+)$", pid)
    if m:
        want = [f for f in files if re.match(rf"paper {m.group(1)}\b", f, re.I)]
    else:
        m = re.match(r"\d{4}-([a-z]{3})(\d{2})(?:-s(\d))?$", pid)
        if not m:
            raise SystemExit("cannot parse " + pid)
        mon, day, shift = m.group(1), int(m.group(2)), m.group(3)
        def ok(f):
            g = f.lower()
            if not re.search(rf"(^|\D)0?{day}(st|nd|rd|th)?\s", g):
                return False
            if not g.split()[1].startswith(mon if mon != "apr" else "apr") and mon not in g:
                return False
            if shift:
                s = re.search(r"shift\s*-?\s*(\d)|s(\d)", g)
                return bool(s) and (s.group(1) or s.group(2)) == shift
            return True
        want = [f for f in files if ok(f)]
    if len(want) != 1:
        raise SystemExit(f"{pid}: docx candidates {want}")
    return os.path.join(ROOT, y, want[0])

def markdown(path):
    key = hashlib.md5(path.encode()).hexdigest() + ".md"
    out = os.path.join(CACHE, key)
    if not os.path.exists(out):
        subprocess.run([PANDOC, path, "-t", "markdown-simple_tables-multiline_tables-grid_tables", "--wrap=none", "-o", out], check=True)
    return open(out, encoding="utf8").read()

def words(s):
    s = re.sub(r"\\\(.*?\\\)|\\\[.*?\\\]|\$.*?\$", " ", s)
    return [w.lower() for w in re.findall(r"[A-Za-z]{4,}", s)]

def main():
    dump, prefix = sys.argv[1], sys.argv[2]
    soln = "--soln" in sys.argv
    ctx = int(next((a[6:] for a in sys.argv if a.startswith("--ctx=")), "12"))
    d = json.load(open(os.path.join("generated-papers", dump), encoding="utf8"))
    q = next(x for x in d["questions"] if x["id"].startswith(prefix))
    pid = paper_id(q["source_file"])
    path = docx_for(pid, soln)
    lines = markdown(path).split("\n")
    target = set(words(q["text"]))
    best, bi = -1, 0
    num = str(q["question_number"])
    hits = [i for i, l in enumerate(lines) if re.match(rf"^{num}\.\s", l)] if soln else []
    if len(hits) == 1:
        best, bi = 99, hits[0]
    for i in ([] if best == 99 else range(len(lines))):
        window = set(words(" ".join(lines[i:i + 4])))
        sc = len(target & window)
        if sc > best:
            best, bi = sc, i
    print(f"# {prefix} {pid} Q{q['question_number']} {os.path.basename(path)}  match {best}/{len(target)}")
    for l in lines[max(0, bi - 2): bi + ctx]:
        print(l)

main()
