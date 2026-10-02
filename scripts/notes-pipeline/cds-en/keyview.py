"""Show each key_fixed entry of a page-verify spec with the row AS IT WOULD BE after the spec
(spec stem/options override the bank view), the new answer, why and reasoning."""
import json, sys, re
sys.stdout.reconfigure(encoding="utf-8")
pid = sys.argv[1]
only = set(sys.argv[2:])
spec = json.load(open(f"generated-papers/_fix-cdsen-pv-{pid}.json", encoding="utf8"))
md = open(f"generated-papers/_pv_{pid}.md", encoding="utf8").read()
blocks = {}
for b in re.split(r"\n(?=### Q)", md):
    m = re.match(r"### Q(\d+) ", b)
    if m:
        blocks[m.group(1)] = b.split("\n## ")[0]
for e in spec:
    if e["verdict"] != "key_fixed" or (only and str(e["q"]) not in only):
        continue
    s = e["set"]
    print(f"===== Q{e['q']}  {e.get('from')} -> {s.get('answer')}")
    print(blocks.get(str(e["q"]), "(no block)").strip())
    if s.get("stem"):
        print("  NEW STEM:", s["stem"])
    if s.get("options"):
        print("  NEW OPTIONS:", s["options"])
    print("  WHY:", e["why"])
    print("  REASONING:", s.get("reasoning"))
    print()
