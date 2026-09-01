r"""One-off: strip the prose graph description from Ex Q.1 (v)'s stem.

WHY. The transcriber wrote a `[Graph: ...]` description as a FALLBACK, before the
figure existed. The figure was attached later and the prose was kept -- a call I
made explicitly and got wrong. Rendered on a /browse card the two sit one above
the other, and the prose is not merely redundant:

  The question asks "which statement is correct FROM THE GRAPH". The correct
  answer (B, force maximum at 3T/4) follows directly from the prose sentence
  "falls to its negative extreme at t = 3T/4". So the description performs the
  graph-reading step the question exists to test.

The figure carries every fact the prose did (axes, the zero at t=0, the extremes
at T/4 and 3T/4, the marked instants) -- verified by eye on the cropped PNG -- so
nothing is lost by removing it.

This edits the STEM, which `content_hash` covers, so the row must be DELETED and
RE-COMMITTED rather than updated in place. Updating in place would leave the
stored text != the hash's preimage, and the next re-commit from this (corrected)
source would hash differently and INSERT a duplicate. See
[[reject-dont-normalise-when-hash-upstream]].

Authored as a FILE, not a heredoc. See [[heredoc-backslash-eating]].
"""
import json, pathlib, re, sys

p = pathlib.Path(__file__).parents[1] / "data" / "oscillations-12-phy.ex-mcq.json"
rows = json.loads(p.read_text(encoding="utf8"))

hit = [r for r in rows if r["ref"] == "Ex Q.1 (v)"]
if len(hit) != 1:
    sys.exit(f"expected exactly 1 row for Ex Q.1 (v), found {len(hit)}")
row = hit[0]
before = row["stem"]

if "[Graph:" not in before:
    sys.exit("REFUSING: no [Graph: ...] block present -- already stripped, or the text moved.")

# Strip the trailing bracketed block and any whitespace that preceded it.
after = re.sub(r"\s*\[Graph:.*?\]\s*$", "", before, flags=re.S)

if after == before:
    sys.exit("REFUSING: the strip changed nothing -- the block is not where it was expected.")
if "[Graph:" in after:
    sys.exit("REFUSING: a [Graph: ...] block survives the strip.")
if not after.rstrip().endswith("correct from the graph?"):
    sys.exit(f"REFUSING: unexpected tail after strip -> {after[-60:]!r}")
if after.count("\\(") != after.count("\\)"):
    sys.exit("REFUSING: latex imbalance after strip.")

row["stem"] = after
p.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf8")

back = json.loads(p.read_text(encoding="utf8"))
r2 = [r for r in back if r["ref"] == "Ex Q.1 (v)"][0]
assert "[Graph:" not in r2["stem"], "block survived the write"
assert len(r2["options"]) == 4, "options must be untouched"
assert r2["answer"] == "B", "answer must be untouched"
print("Ex Q.1 (v) stem stripped:")
print(f"  before {len(before)} chars -> after {len(after)} chars")
print(f"  now: {r2['stem']!r}")
print("\nNEXT: delete the live row, re-merge, re-commit, then re-apply")
print("      solution / sections / figure / provenance -- the row gets a NEW id.")
