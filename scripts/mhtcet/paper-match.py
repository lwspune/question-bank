"""Does every MHT-CET past-year row match a question of its printed paper?

    python scripts/mhtcet/paper-match.py <outDir> <Subject>

Read-only. Every PUBLIC 2021-2025 row of <Subject> is compared with EVERY
question of its .docx paper (found from pyq_year + pyq_note, as
source-compare.py does). A row is UNMATCHED when no printed question shares 60%
of its prose words (stem + options). Writes <outDir>/unmatched-<Subject>.json
and prints the count per shift.

An unmatched row is a question, not a verdict: about half of the first run's
46 Chemistry rows (2026-11-04) were the printed question reworded; the rest had
no printed counterpart at all. Read each against the paper.
"""
import json, os, re, subprocess, sys
from collections import defaultdict

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src = open(os.path.join(REPO, "scripts", "mhtcet", "source-compare.py"), encoding="utf-8").read().replace("\nmain()\n", "\n")
sc = {}
exec(compile(src, "sc", "exec"), sc)
os.chdir(REPO)
OUT, SUBJ = sys.argv[1], sys.argv[2]
cache = os.path.join(OUT, "md")
os.makedirs(cache, exist_ok=True)
STOP = {"following", "which", "from", "among", "identify", "correct", "statement", "mathbf", "text", "what", "calculate", "given", "that", "with", "this", "value", "when"}

q = ("select coalesce(json_agg(json_build_object('id',q.id,'year',q.pyq_year,'note',q.pyq_note,'qn',q.question_number,'text',q.text,"
     "'opts',(select string_agg(o.text,' ') from options o where o.question_id=q.id))),'[]') "
     "from questions q join subjects s on s.id=q.subject_id where s.name='%s' and q.question_kind='pyq' and q.pyq_year between 2021 and 2025 "
     "and q.source_file ilike '%%cet%%' and q.visibility='PUBLIC'" % SUBJ)
rows = json.loads(subprocess.run([sc["PSQL"], sc["db_url"](), "-At", "-c", q], capture_output=True, text=True, encoding="utf-8", check=True).stdout)


def words(t):
    t = re.sub(r"\\[a-zA-Z]+", " ", t or "")
    return {w.lower() for w in re.findall(r"[A-Za-z]{4,}", t)} - STOP


papers = {}


def paper(path):
    if path not in papers:
        sc["docx_question"](path, 1, cache)  # fills sc's md cache
        lines = sc["_md"][path]
        qs, cur, n = {}, [], None
        for line in lines:
            m = re.match(r"^(\d{1,3})\\?\.", line)
            if m:
                if n is not None:
                    qs.setdefault(n, " ".join(cur))
                n, cur = int(m.group(1)), [line]
            elif n is not None and line.strip():
                cur.append(line.strip())
        if n is not None:
            qs.setdefault(n, " ".join(cur))
        papers[path] = {k: words(v.replace("**", "")) for k, v in qs.items()}
    return papers[path]


unmatched = []
per = defaultdict(lambda: [0, 0])
for r in rows:
    path = sc["source_file"](r["year"], r["note"])
    if not path or path.endswith(".pdf"):
        continue
    key = f"{r['year']} {r['note']}"
    per[key][0] += 1
    a = words(r["text"] + " " + (r["opts"] or ""))
    if len(a) < 3:
        continue  # too little prose to judge (a bare formula question)
    best = max(((len(a & b) / len(a), n) for n, b in paper(path).items()), default=(0, None))
    if best[0] < 0.6:
        per[key][1] += 1
        unmatched.append({"id": r["id"], "sitting": key, "qn": r["qn"], "score": round(best[0], 2), "bestQ": best[1], "text": " ".join(r["text"].split())[:120]})
json.dump(unmatched, open(os.path.join(OUT, f"unmatched-{SUBJ}.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print(len(rows), "rows;", len(unmatched), "unmatched")
for k, (n, m) in sorted(per.items(), key=lambda kv: -kv[1][1]):
    if m:
        print(f"  {k}: {m}/{n}")
