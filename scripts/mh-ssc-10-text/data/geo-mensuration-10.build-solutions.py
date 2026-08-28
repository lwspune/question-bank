# scratch (geo-mensuration-10): join the by-ref solutions onto the topaper dump
# BY REF and assert every emitted row's id still pairs with its own ref, then
# write data/geo-mensuration-10.solutions.json. Delete after use.
#
# The assertion is the point (AGENT_BRIEF §5): a dropped row that shifts the tail
# is a PERMUTATION -- id set matches, count matches, every gate passes, and every
# answer lands on the wrong question.
import io, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = HERE
DUMP = os.path.join(DATA, "geo-mensuration-10.all.topaper.json")
BYREF = os.path.join(HERE, "geo-mensuration-10.solutions-by-ref.json")
OUT = os.path.join(DATA, "geo-mensuration-10.solutions.json")

dump = json.load(io.open(DUMP, encoding="utf-8"))
byref = json.load(io.open(BYREF, encoding="utf-8"))

dump_refs = [r["ref"] for r in dump]
if len(set(dump_refs)) != len(dump_refs):
    sys.exit("dump has duplicate refs")

missing = [r for r in dump_refs if r not in byref]
extra = [r for r in byref if r not in dump_refs]
if missing:
    sys.exit("no solution authored for: " + ", ".join(missing))
if extra:
    sys.exit("solution authored for a ref that is not in the dump: " + ", ".join(extra))

rows = []
for r in dump:
    sol = byref[r["ref"]]
    if not sol.strip():
        sys.exit("empty solution for " + r["ref"])
    rows.append({"id": r["id"], "ref": r["ref"], "solution": sol})

# --- the pairing assertion, re-derived independently of the loop above ---
pair_from_dump = {r["ref"]: r["id"] for r in dump}
bad = [x["ref"] for x in rows if pair_from_dump.get(x["ref"]) != x["id"]]
if bad:
    sys.exit("REF->ID PAIRING BROKEN for: " + ", ".join(bad))
if len(rows) != len(dump):
    sys.exit("row count %d != dump count %d" % (len(rows), len(dump)))

# --- text hygiene: no control chars, no double-escaped LaTeX, balanced \( \) ---
problems = []
for x in rows:
    s = x["solution"]
    if any(ord(c) < 32 and c != "\n" for c in s):
        problems.append(x["ref"] + ": control character")
    if "\\\\(" in s or "\\\\)" in s:
        problems.append(x["ref"] + ": double-escaped math delimiter")
    if s.count("\\(") != s.count("\\)"):
        problems.append("%s: %d open vs %d close math delimiters" % (x["ref"], s.count("\\("), s.count("\\)")))
    if "�" in s:
        problems.append(x["ref"] + ": U+FFFD")
if problems:
    sys.exit("\n".join(problems))

io.open(OUT, "w", encoding="utf-8", newline="\n").write(
    json.dumps(rows, ensure_ascii=False, indent=2) + "\n"
)
print("wrote %d solutions -> %s" % (len(rows), os.path.basename(OUT)))
print("ref->id pairing verified for all %d rows" % len(rows))
print("first: %s  last: %s" % (rows[0]["ref"], rows[-1]["ref"]))
