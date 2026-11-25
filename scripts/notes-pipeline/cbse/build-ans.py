"""Build the answer-edit input for one or more CBSE chapters (the HSC ANSWER_EDIT_BRIEF's shape).

Usage (repo root): python scripts/notes-pipeline/cbse/build-ans.py <group> <prefix> [<prefix> ...]

Reads generated-papers/_cdsk_<prefix>.json (re-dump first: the edit is refused unless `find` is in
the LIVE answer) and _prep-<prefix>.md, and writes generated-papers/_ans-<group>.json + .md with
`{ id, chapter, kind, year, number, flagged, stem, solution }` for every row that has a dash, a
method-note phrase, or is named in the prep report. A row is `flagged` when its 8-hex id appears in
the prep report; the report says why.
"""
import io, json, os, re, sys

group, prefixes = sys.argv[1], sys.argv[2:]
DASH = re.compile("[—–]")
METHOD = re.compile(r"marking scheme|answer key|cross-?check|verif(y|ied)|re-?derived|\bNCERT('s)? (answer|key|prints)", re.I)

out = []
for prefix in prefixes:
    rows = json.load(io.open(os.path.join("generated-papers", f"_cdsk_{prefix}.json"), encoding="utf-8"))["questions"]
    prep_path = os.path.join("generated-papers", f"_prep-{prefix}.md")
    prep = io.open(prep_path, encoding="utf-8").read() if os.path.exists(prep_path) else ""
    named = set(re.findall(r"\b[0-9a-f]{8}\b", prep))
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
