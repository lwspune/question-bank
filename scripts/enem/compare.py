"""
Compare blind solutions with INEP's key, and check the reviewed drafts' shape.

    python scripts/enem/compare.py <key.json> <reviewed.json> [<reviewed.json> ...]

Prints the agreement, every disagreement (to be settled by hand: re-derive,
then decide whether the key or the solution is wrong), the cancelled items,
and shape problems: options not 5, a figure box without a page, an unknown
subject, a credit listed but missing from the text, a bare `$`.
Exit code 1 on a shape problem; disagreements are reported, never fatal.
"""
import json
import re
import sys

SUBJECTS = {"matematica", "fisica", "quimica", "biologia"}


def main():
    key = json.load(open(sys.argv[1], encoding="utf-8"))
    qs = []
    for p in sys.argv[2:]:
        qs += json.load(open(p, encoding="utf-8"))["questions"]
    qs.sort(key=lambda q: q["n"])
    agree, differ, cancelled, shape = [], [], [], []
    for q in qs:
        n = str(q["n"])
        k = key.get(n)
        if k is None:
            shape.append(f"Q{n}: not in the key")
            continue
        if k == "ANULADO":
            cancelled.append(f"Q{n} (solver {q.get('answer')}, {q.get('confidence')})")
        elif q.get("answer") == k:
            agree.append(q["n"])
        else:
            differ.append(f"Q{n}: key {k}, solver {q.get('answer')} ({q.get('confidence')}) {q.get('notes', '')[:90]}")
        if len(q.get("options", [])) != 5 or any(not o.strip() for o in q["options"]):
            shape.append(f"Q{n}: options must be 5 and non-empty")
        if q.get("subject") not in SUBJECTS:
            shape.append(f"Q{n}: subject {q.get('subject')!r}")
        for f in ("figure", "option_figures"):
            v = q.get(f)
            box = v.get("box", []) if v else []
            boxes = box if box and isinstance(box[0], list) else [box]
            if v and (not isinstance(v.get("page"), int) or any(len(b) != 4 for b in boxes)):
                shape.append(f"Q{n}: {f} needs page + 4-number box")
        for c in q.get("credit", []):
            if c.split(".")[0][:25] not in q["text"]:
                shape.append(f"Q{n}: credit not found in text: {c[:40]!r}")
        for field in [q["text"], q.get("solution", ""), *q.get("options", [])]:
            if re.search(r"(?<!\\)\$", field):
                shape.append(f"Q{n}: bare $ (write \\$)")
                break
        if not q.get("solution") or len(q["solution"]) < 40:
            shape.append(f"Q{n}: solution missing")
    scored = len(agree) + len(differ)
    print(f"{len(qs)} questions; blind agrees with the key on {len(agree)} of {scored} scored; {len(cancelled)} cancelled")
    for d in differ:
        print("  DISAGREE", d)
    for c in cancelled:
        print("  CANCELLED", c)
    for s in shape:
        print("  SHAPE", s)
    if shape:
        sys.exit(1)


if __name__ == "__main__":
    main()
