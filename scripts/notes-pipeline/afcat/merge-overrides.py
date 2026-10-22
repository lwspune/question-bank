"""Merge reviewed fixes into scripts/afcat/data/<chapter>.overrides.json.
usage: python merge_overrides.py <repo root> <chapterId> <fixes.json>
fixes.json: {"<question id>": {"solution"|"answer"|"options"|...: ..., "reason": "..."}}
A reason is appended to an existing one; other fields replace."""
import io, json, sys

root, chapter, fixes_path = sys.argv[1:4]
path = f"{root}/scripts/afcat/data/{chapter}.overrides.json"
ov = json.load(io.open(path, encoding="utf-8"))
fixes = json.load(io.open(fixes_path, encoding="utf-8"))
for qid, fix in fixes.items():
    e = ov.setdefault(qid, {})
    why = fix.pop("reason")
    for k, v in fix.items():
        if k == "options":
            e.setdefault("options", {}).update(v)
        else:
            e[k] = v
    e["reason"] = (e["reason"] + " " if e.get("reason") else "") + why
io.open(path, "w", encoding="utf-8", newline="\n").write(json.dumps(ov, ensure_ascii=False, indent=2) + "\n")
print(f"{chapter}: merged {len(fixes)} fix(es)")
