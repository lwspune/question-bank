"""Sanity-check result5.json against batch5.json: coverage, id match, field shape."""
import json
import os

here = os.path.dirname(os.path.abspath(__file__))
batch = json.load(open(os.path.join(here, "batch5.json"), encoding="utf-8"))
res = json.load(open(os.path.join(here, "result5.json"), encoding="utf-8"))

print("batch rows:", len(batch), " result rows:", len(res))

bid = [(r["questionId"], r["qnum"]) for r in batch]
rid = [(r["questionId"], r["qnum"]) for r in res]
print("id+qnum sequences identical:", bid == rid)

missing = set(x[0] for x in bid) - set(x[0] for x in rid)
extra = set(x[0] for x in rid) - set(x[0] for x in bid)
print("missing:", missing, " extra:", extra)

required = {"questionId", "qnum", "derived", "value", "confidence", "why"}
valid_derived = {"A", "B", "C", "D", "NONE", "AMBIGUOUS"}
labels = {}
for r in res:
    assert required <= set(r), (r["qnum"], "missing fields", required - set(r))
    assert r["derived"] in valid_derived, (r["qnum"], r["derived"])
    assert r["confidence"] in {"high", "low"}, (r["qnum"], r["confidence"])
    assert r["value"].strip(), (r["qnum"], "empty value")
    labels[r["qnum"]] = r["derived"]

# every named letter must exist in that question's printed options
for b, r in zip(batch, res):
    if r["derived"] in {"A", "B", "C", "D"}:
        opts = {o["label"] for o in b["options"]}
        assert r["derived"] in opts, (r["qnum"], "letter not printed", opts)

print("all rows well-formed; letters all exist in printed options")
print("distribution:", {k: sum(1 for v in labels.values() if v == k) for k in sorted(set(labels.values()))})
print("answers:", labels)
