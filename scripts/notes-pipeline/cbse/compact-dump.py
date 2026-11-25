"""Write a COMPACT reading copy of a notes dump, for a chapter agent.

Usage (repo root): python scripts/notes-pipeline/cbse/compact-dump.py <prefix> [--head=700]

Reads generated-papers/_cdsk_<prefix>.json and writes generated-papers/_cdsk_<prefix>.compact.md:
one block per row with the id prefix, kind (BOARD / TEXTBOOK), year, Q#, difficulty, subtopic,
IMG, the stem (and its shared context once per set), options with the key starred, and the first
`head` characters of the model answer. CBSE Class 12 answers average ~2 KB each (a whole Physics
dump is 4 MB), so the full `.md` stays the place to read a whole answer; this copy is for reading
every row once. Rows are grouped by subtopic so a page can be read in one go.
"""
import io, json, os, re, sys
from collections import OrderedDict

prefix = sys.argv[1]
head = int(next((a[7:] for a in sys.argv if a.startswith("--head=")), "700"))
src = os.path.join("generated-papers", f"_cdsk_{prefix}.json")
rows = json.load(io.open(src, encoding="utf-8"))["questions"]

groups: "OrderedDict[str, list]" = OrderedDict()
for q in rows:
    groups.setdefault(q.get("subtopic") or "?", []).append(q)

out = [f"# Compact dump {prefix}: {len(rows)} rows "
       f"({sum(q['kind'] == 'pyq' for q in rows)} board, {sum(q['kind'] != 'pyq' for q in rows)} textbook)", ""]
seen_ctx = set()
for sub, qs in groups.items():
    out.append(f"## {sub} ({len(qs)} rows: {sum(q['kind'] == 'pyq' for q in qs)} board)")
    out.append("")
    for q in qs:
        kind = "BOARD" if q["kind"] == "pyq" else "TEXTBOOK"
        img = " | IMG" if q.get("image") else ""
        out.append(f"### {q['id'][:8]} | {kind} {q.get('year') or ''} | {q.get('number') or ''} | {q.get('difficulty') or ''}{img}")
        ctx = (q.get("context") or "").strip()
        if ctx:
            key = q.get("setId") or ctx[:80]
            if key in seen_ctx:
                out.append("C: (same context as the set's first row above)")
            else:
                seen_ctx.add(key)
                out.append("C: " + ctx)
        out.append("Q: " + (q.get("text") or "").strip())
        opts = q.get("options") or []
        if opts:
            out.append("O: " + "  ".join(
                f"{o.get('label')}{'*' if (o.get('correct') or o.get('is_correct')) else ''}) {o.get('text')}" for o in opts))
        if q.get("answer") not in (None, ""):
            out.append(f"A: {q['answer']}")
        s = (q.get("solution") or "").strip()
        s = re.sub(r"\n{2,}", "\n", s)
        more = len(s) - head
        out.append("S: " + (s[:head] + (f" ...[+{more} chars, full answer in _cdsk_{prefix}.md]" if more > 0 else "")))
        out.append("")
io.open(os.path.join("generated-papers", f"_cdsk_{prefix}.compact.md"), "w", encoding="utf-8", newline="\n").write("\n".join(out))
print(prefix, len(rows), "rows")
