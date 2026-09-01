r"""One-off: remap Ex Q.1 (v)'s row id in the mcq-verify record after a re-commit.

Stripping the graph prose changed the STEM, which `content_hash` covers, so the
row had to be deleted and re-committed and therefore minted a FRESH uuid. The
blind derivation itself is unchanged -- only the row it points at moved -- so
this is a mechanical remap by `ref`, the same move the NCERT pipeline makes after
a delete-and-re-commit.

`ref` survives a re-commit because it is provenance, not identity. The guard
below refuses unless the ref resolves to exactly one live row, so a remap can
never silently attach the derivation to a different question.

Authored as a FILE, not a heredoc. See [[heredoc-backslash-eating]].
"""
import json, os, pathlib, sys, urllib.request

REF = "Ex Q.1 (v)"
SOURCE_FILE = "StateBoard_12_Physics__Oscillations.pdf"

root = pathlib.Path(__file__).parents[2].parent
env = {}
for line in (root / ".env.local").read_text(encoding="utf8").splitlines():
    if "=" in line and not line.strip().startswith("#"):
        k, _, v = line.partition("=")
        env[k.strip()] = v.strip().strip('"')

url = env["NEXT_PUBLIC_SUPABASE_URL"]
key = env["SUPABASE_SERVICE_ROLE_KEY"]
q = (
    f"{url}/rest/v1/questions?select=id,question_number"
    f"&source_file=eq.{urllib.parse.quote(SOURCE_FILE)}"
    f"&question_number=eq.{urllib.parse.quote(REF)}"
)
req = urllib.request.Request(q, headers={"apikey": key, "Authorization": f"Bearer {key}"})
live = json.loads(urllib.request.urlopen(req).read())

if len(live) != 1:
    sys.exit(f"REFUSING: ref {REF!r} resolves to {len(live)} live rows, expected exactly 1.")
new_id = live[0]["id"]

p = pathlib.Path(__file__).parents[1] / "data" / "oscillations-12-phy.mcq-verify.json"
rows = json.loads(p.read_text(encoding="utf8"))
hit = [r for r in rows if r["ref"] == REF]
if len(hit) != 1:
    sys.exit(f"REFUSING: {len(hit)} verify rows for {REF!r}, expected exactly 1.")

old_id = hit[0]["id"]
if old_id == new_id:
    sys.exit("REFUSING: id already current -- nothing to remap.")

hit[0]["id"] = new_id
p.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf8")

back = json.loads(p.read_text(encoding="utf8"))
assert [r for r in back if r["ref"] == REF][0]["id"] == new_id
assert len({r["id"] for r in back}) == len(back), "ids must stay unique"
assert all(r["ref"] != REF or r["derived_answer"] == "B" for r in back), "derivation must be untouched"
print(f"remapped {REF}: {old_id} -> {new_id}")
print("derivation and answer untouched; ids unique.")
