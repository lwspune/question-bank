"""Cross-paper consistency probe over the transcribed JSON.

CBSE reuses a question across the sets of a series and across series. Wherever
the SAME question appears twice, three things must agree or one of the two
transcriptions is wrong:

    the official ANSWER, the chapter, and the subtopic.

Matching is on the (stem, sorted option TEXTS) pair - never on question number,
which is reshuffled, and never on stem alone, because 2026 65/4/1 and 65/4/3 both
print the stem "The following graph represents :" for two DIFFERENT questions
distinguished only by their options.

Reports, never edits.
"""
import collections
import glob
import json
import os
import sys


def key_of(q):
    stem = (q.get("stem") or "").strip()
    if q.get("format") == "mcq":
        opts = tuple(sorted((o.get("text") or "").strip() for o in q.get("options") or []))
    else:
        opts = ()
    return (stem, opts)


def main():
    pat = sys.argv[1] if len(sys.argv) > 1 else "*"
    groups = collections.defaultdict(list)
    files = sorted(glob.glob(f"scripts/cbse-12-pyq/data/{pat}.questions.json"))
    for f in files:
        try:
            d = json.load(open(f, encoding="utf-8"))
        except Exception:
            print(f"  (skipping unreadable {os.path.basename(f)})")
            continue
        pid = os.path.basename(f).replace(".questions.json", "")
        for q in d["questions"]:
            k = key_of(q)
            if not k[0]:
                continue
            groups[k].append((pid, q))

    shared = {k: v for k, v in groups.items() if len(v) > 1}
    ans = ch = st = 0
    for k, rows in sorted(shared.items(), key=lambda kv: kv[1][0][0]):
        def spread(field):
            return {r[1].get(field) for r in rows}

        for field, label in (("answer", "ANSWER"), ("chapter", "CHAPTER"), ("subtopic", "SUBTOPIC")):
            vals = spread(field)
            if len(vals) > 1:
                if field == "answer":
                    ans += 1
                elif field == "chapter":
                    ch += 1
                else:
                    st += 1
                where = ", ".join(f"{p}:{q['ref']}={q.get(field)!r}" for p, q in rows)
                print(f"{label} DISAGREES  {k[0][:70]!r}")
                print(f"    {where}")

    print()
    print(f"{len(files)} papers | {len(groups)} distinct questions | {len(shared)} appear more than once")
    print(f"disagreements: answer {ans} | chapter {ch} | subtopic {st}")
    if not (ans or ch or st):
        print("no cross-paper disagreement.")


if __name__ == "__main__":
    main()
