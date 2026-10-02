"""Build per-PAPER page-verification files for CDS English from the 8 chapter dumps.

_pv_<pid>.md        every row in paper order: full id, chapter / subtopic, set context (once per set),
                    stem, options. NO key, NO solution (the agent answers first).
_pv_<pid>_keys.md   Q#, key, solution, and PRECHECK flags (structural tells).
"""
import json, re, glob, collections

CH = {"vo": "Vocabulary", "gr": "Grammar", "sr": "Sentence Rearrangement", "se": "Spotting Errors",
      "rc": "Reading Comprehension", "cz": "Cloze Test", "id": "Idioms and Phrases", "fb": "Fill in the Blanks"}
INTERNAL = re.compile(r"KEY FIX|PENDING|\bscan|\bOCR\b|transcri|\bbank\b|mis-?slot|refit|\bp\.?\s?\d{1,2}\b|page \d|source (file|row)|ingest", re.I)

rows = []
for code, chapter in CH.items():
    d = json.load(open(f"generated-papers/_cdsk_en-{code}.json", encoding="utf8"))
    for q in d["questions"]:
        q["chapter"] = chapter
        rows.append(q)

by_paper = collections.defaultdict(list)
for q in rows:
    m = re.match(r"Eng_CDS_(\d{4})_(\d)\.pdf", q["sourceFile"])
    by_paper[f"{m.group(1)}-{m.group(2)}"].append(q)

summary = []
for pid, qs in sorted(by_paper.items()):
    qs.sort(key=lambda q: int(q["number"]))
    nums = [int(q["number"]) for q in qs]
    out = [f"# CDS English {pid} — {len(qs)} rows (Q{nums[0]}-Q{nums[-1]})",
           f"Pages: scripts/cds/out/{pid}/pNN.png   Source data: scripts/cds/data/{pid}.*.json", ""]
    keys = [f"# CDS English {pid} — KEYS + SOLUTIONS + PRECHECK (open only after answering every item)", ""]
    last_ctx = None
    flagged = 0
    for q in qs:
        ctx = q.get("context") or ""
        if ctx != last_ctx:
            out += ["", f"## SET {q.get('setId') or '-'}", "CONTEXT:", ctx or "(none)", ""]
            last_ctx = ctx
        out.append(f"### Q{q['number']}  id={q['id']}  [{q['chapter']} / {q['subtopic']}]")
        out.append(f"STEM: {q['text']}")
        for o in q["options"]:
            out.append(f"  ({o['label']}) {o['text']}" + (f"  [image {o['image']}]" if o.get("image") else ""))
        if q.get("image"):
            out.append(f"  [stem image {q['image']}]")
        out.append("")

        flags = []
        sol = q.get("solution") or ""
        m = re.match(r"\s*Answer:\s*([A-D])\b", sol)
        if not q["answer"]:
            flags.append("NO KEY")
        if m and m.group(1) != q["answer"]:
            flags.append(f"SOLUTION SAYS {m.group(1)}, KEY {q['answer']}")
        if not m:
            flags.append("SOLUTION LACKS 'Answer: X.' prefix")
        if INTERNAL.search(sol):
            flags.append("INTERNAL NOTE? '" + INTERNAL.search(sol).group(0) + "'")
        texts = [re.sub(r"\s+", " ", o["text"].strip().lower()) for o in q["options"]]
        if len(set(texts)) < len(texts):
            flags.append("DUPLICATE OPTIONS")
        if any(t == "" for t in texts):
            flags.append("EMPTY OPTION")
        if len(q["options"]) != 4:
            flags.append(f"{len(q['options'])} OPTIONS")
        if not (q["text"] or "").strip():
            flags.append("EMPTY STEM")
        if re.search(r"underline", ctx, re.I) and "\\underline" not in (q["text"] or ""):
            flags.append("DIRECTIONS SAY UNDERLINED, STEM HAS NO UNDERLINE")
        if flags:
            flagged += 1
        keys.append(f"Q{q['number']}  key={q['answer']}" + (f"  PRECHECK: {' | '.join(flags)}" if flags else ""))
        keys.append(f"  SOLUTION: {sol}")
        keys.append("")
    open(f"generated-papers/_pv_{pid}.md", "w", encoding="utf8").write("\n".join(out))
    open(f"generated-papers/_pv_{pid}_keys.md", "w", encoding="utf8").write("\n".join(keys))
    gaps = sorted(set(range(1, 121)) - set(nums))
    summary.append(f"{pid}: {len(qs)} rows, {flagged} prechecked" + (f", MISSING Q{gaps}" if gaps else ""))

print("\n".join(summary))
print("total", len(rows))
