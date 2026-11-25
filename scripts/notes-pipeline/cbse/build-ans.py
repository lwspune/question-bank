"""Build the answer-edit input for one or more CBSE chapters (the HSC ANSWER_EDIT_BRIEF's shape).

Usage (repo root): python scripts/notes-pipeline/cbse/build-ans.py <group> <prefix> [<prefix> ...]

Reads generated-papers/_cdsk_<prefix>.json (re-dump first: the edit is refused unless `find` is in
the LIVE answer) and the main session's rulings (generated-papers/_rulings-*.md), and writes
generated-papers/_ans-<group>.json + .md with `{ id, chapter, kind, year, number, flagged, stem,
solution }` for every row that has a dash, a method-note phrase, or a ruling. A row is `flagged`
when its 8-hex id appears in a rulings file; the ruling says what to change (or "leave").
A prep report names many ids that were merely checked or featured, so it is NOT the flag source.
"""
import glob, io, json, os, re, sys

group, prefixes = sys.argv[1], sys.argv[2:]
DASH = re.compile("[—–]")
METHOD = re.compile(r"marking scheme|answer key|cross-?check|verif(y|ied)|re-?derived|\bNCERT('s)? (answer|key|prints)", re.I)

named = set()
for f in glob.glob(os.path.join("generated-papers", "_rulings-*.md")):
    named |= set(re.findall(r"\b[0-9a-f]{8}\b", io.open(f, encoding="utf-8").read()))

out = []
for prefix in prefixes:
    rows = json.load(io.open(os.path.join("generated-papers", f"_cdsk_{prefix}.json"), encoding="utf-8"))["questions"]
    for q in rows:
        s = q.get("solution") or ""
        flagged = q["id"][:8] in named
        if not (flagged or DASH.search(s) or METHOD.search(s)):
            continue
        out.append({"id": q["id"], "chapter": prefix, "kind": q["kind"], "year": q.get("year"),
                    "number": q.get("number"), "flagged": flagged,
                    "stem": ((q.get("context") or "") + "\n" + (q.get("text") or "")).strip(), "solution": s})

io.open(os.path.join("generated-papers", f"_ans-{group}.json"), "w", encoding="utf-8", newline="\n").write(
    json.dumps(out, ensure_ascii=False, indent=1))
md = []
for r in out:
    md += [f"### {r['id'][:8]} | {r['chapter']} | {r['kind']} {r['year'] or ''} | {r['number'] or ''}"
           f"{' | FLAGGED' if r['flagged'] else ''}", "Q: " + r["stem"], "S: " + r["solution"], ""]
io.open(os.path.join("generated-papers", f"_ans-{group}.md"), "w", encoding="utf-8", newline="\n").write("\n".join(md))
print(group, len(out), "rows,", sum(r["flagged"] for r in out), "flagged,",
      sum(len(DASH.findall(r["solution"])) for r in out), "dashes")
