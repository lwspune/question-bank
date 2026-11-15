"""
Assemble a year's reviewed slices into data/<year>.questions.json.

    python scripts/enem/assemble.py <year> <slices_dir> [--day 2] [--booklet 7] [--source <paper.pdf name>]

Reads every out-*.json in <slices_dir> (the reviewers' output), applies the
year's recorded fixes from data/<year>.fixes.json, and writes the reviewed
file. The fixes are DATA, so every change after review is visible in git:

    {"<n>": {"figure": {...} | [..] | null, "option_figures": ..., "notice": "...",
             "solution": "...", "replace": [["old", "new"], ...], "why": "..."}}

Applied to every question, always:
- a credit listed without the text's bold (**Título**) takes the exact form
  printed in the text, so the build's "credit must be in the text" guard holds;
- an escaped asterisk "\\*" becomes "∗" (U+2217): the renderer has no `\\*`
  escape and reads `**` as bold even across lines.
"""
import glob
import json
import re
import sys
from pathlib import Path

DATA = Path(__file__).parent / "data"
STAR = "∗"


def arg(name, default=None):
    a = sys.argv
    return a[a.index(name) + 1] if name in a else default


def fix_credit(q):
    out = []
    for c in q.get("credit", []):
        if c in q["text"]:
            out.append(c)
            continue
        plain_text = q["text"].replace("**", "")
        if c.replace("**", "") in plain_text:
            # find the formatted span in the text that reads as this credit
            for para in q["text"].split("\n\n"):
                if para.replace("**", "") == c.replace("**", ""):
                    out.append(para)
                    break
            else:
                out.append(c)
        else:
            out.append(c)
    q["credit"] = out


def main():
    year = int(sys.argv[1])
    slices = Path(sys.argv[2])
    qs = []
    for p in sorted(glob.glob(str(slices / "out-*.json"))):
        qs += json.load(open(p, encoding="utf-8"))["questions"]
    qs.sort(key=lambda q: q["n"])
    nums = [q["n"] for q in qs]
    if len(set(nums)) != len(nums):
        sys.exit(f"duplicate question numbers: {sorted(n for n in set(nums) if nums.count(n) > 1)}")
    fixes_path = DATA / f"{year}.fixes.json"
    fixes = json.load(open(fixes_path, encoding="utf-8")) if fixes_path.exists() else {}
    by = {q["n"]: q for q in qs}
    for key, f in fixes.items():
        if key.startswith("_"):
            continue
        q = by.get(int(key))
        if q is None:
            sys.exit(f"fix for Q{key}, which is not in the slices")
        for old, new in f.get("replace", []):
            hits = 0
            for field in ("text", "solution"):
                if old in q[field]:
                    q[field] = q[field].replace(old, new)
                    hits += 1
            q["options"] = [o.replace(old, new) if old in o else o for o in q["options"]]
            q["credit"] = [c.replace(old, new) for c in q.get("credit", [])]
            if not hits and not any(new in o for o in q["options"]):
                sys.exit(f"Q{key}: replace target not found: {old[:40]!r}")
        for field in ("figure", "option_figures", "notice", "solution"):
            if field in f:
                q[field] = f[field]
    stars = 0
    for q in qs:
        for field in ("text", "solution"):
            stars += q[field].count("\\*")
            q[field] = q[field].replace("\\*", STAR)
        q["options"] = [o.replace("\\*", STAR) for o in q["options"]]
        q["credit"] = [c.replace("\\*", STAR) for c in q.get("credit", [])]
        fix_credit(q)
    out = {
        "year": year,
        "day": int(arg("--day", 2)),
        "booklet": int(arg("--booklet", 7)),
        "source_file": arg("--source", f"{year}_PV_impresso_D2_CD7.pdf"),
        "questions": qs,
    }
    target = DATA / f"{year}.questions.json"
    target.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{year}: {len(qs)} questions -> {target.name}; fixes applied to {len([k for k in fixes if not k.startswith('_')])}; escaped asterisks {stars}")


if __name__ == "__main__":
    main()
