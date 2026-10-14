# Print a blind packet compactly for the main session to solve: id, stem and
# the four options, nothing else (packets carry no key and no solution).
#
#   python scripts/afcat/show-packet.py out/<chapter>/verify-NN-1.json [--from=ID] [--count=N]
import json
import sys

path = sys.argv[1]
opt = {a.split("=", 1)[0]: a.split("=", 1)[1] for a in sys.argv[2:] if "=" in a}
qs = json.load(open(path, encoding="utf8"))["questions"]
start = next((i for i, q in enumerate(qs) if q["id"] == opt.get("--from")), 0)
count = int(opt.get("--count", len(qs)))
for q in qs[start:start + count]:
    opts = q.get("options") or {}
    if isinstance(opts, list):
        opts = dict(zip("ABCD", opts))
    print(f"[{q['id']}] {q['stem']}")
    print("   " + " | ".join(f"{k}) {v}" for k, v in opts.items()))
