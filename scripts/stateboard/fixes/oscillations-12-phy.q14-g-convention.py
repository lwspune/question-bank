r"""One-off: note the chapter's own g = pi^2 convention on Ex Q.14.

The cross-check reported Ex Q.14 as BOOK-KEY-WRONG (book 1.48e-2 N, ours
1.47e-2 N) but flagged its own confidence as not airtight and named the escape
hatch: an unstated g ~ 9.87. The escape hatch HOLDS, so this is NOT a book error
and gets NO [Textbook ...] bracket:

  g = 9.8   -> 1.4700e-2 N   (ours)
  g = pi^2  -> 1.4804e-2 N   (= 1.48e-2 N, exactly what the book prints)

Two things settle it, neither of them the arithmetic alone:
  1. This chapter states the convention OUT LOUD -- Ex Q.23's own stem reads
     "(g ~ pi^2 ~ 10 m s^-2)".
  2. The question's L = 100 cm is EXACTLY a second's-pendulum length when
     g = pi^2 (L = g T^2 / 4pi^2 = 1.000 m at T = 2 s), which is the context the
     surrounding questions are set in.

The stem states no g at all, so both values are defensible and neither answer is
wrong. Ours is amended to give the book's figure under the chapter's convention
while keeping the g = 9.8 result, rather than silently switching -- a reader who
computes 0.0147 should not think they have made a mistake.

Authored as a FILE, not a heredoc. See [[heredoc-backslash-eating]].
"""
import json, pathlib, sys

p = pathlib.Path(__file__).parents[1] / "data" / "oscillations-12-phy.g2-num.solutions.json"
rows = json.loads(p.read_text(encoding="utf8"))

OLD = (
    r"*Note:* the same result follows from \(F = -m\omega^2 x\) with "
    r"\(\omega^2 = \dfrac{g}{L} = 9.8\ \text{s}^{-2}\)."
)
NEW = (
    r"*Note:* the same result follows from \(F = -m\omega^2 x\) with "
    r"\(\omega^2 = \dfrac{g}{L} = 9.8\ \text{s}^{-2}\)."
    "\n\n"
    r"*On the value of \(g\):* the stem does not state one. This chapter elsewhere "
    r"uses \(g \approx \pi^2 \approx 10\ \text{m s}^{-2}\) (see the bracketed constant in "
    r"the piston question), and a pendulum of length \(1\ \text{m}\) is a second's "
    r"pendulum precisely when \(g = \pi^2\). Taking \(g = \pi^2 = 9.87\ \text{m s}^{-2}\) "
    r"gives \(F = 1.48 \times 10^{-2}\ \text{N}\), which is the value the textbook prints. "
    r"Both are correct; only the assumed \(g\) differs."
)

hit = [r for r in rows if r["ref"] == "Ex Q.14"]
if len(hit) != 1:
    sys.exit(f"expected exactly 1 row for Ex Q.14, found {len(hit)}")
row = hit[0]
if OLD not in row["solution"]:
    sys.exit("REFUSING: anchor note not present verbatim -- already amended, or the text moved.")
if "On the value of" in row["solution"]:
    sys.exit("REFUSING: the g-convention note is already present.")

row["solution"] = row["solution"].replace(OLD, NEW)
p.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf8")

back = json.loads(p.read_text(encoding="utf8"))
r2 = [r for r in back if r["ref"] == "Ex Q.14"][0]
assert "1.48 \\times 10^{-2}" in r2["solution"], "book value missing"
assert "1.47 \\times 10^{-2}" in r2["solution"], "our value must be RETAINED, not replaced"
assert not r2["solution"].startswith("[Textbook"), "this must NOT be an errata bracket"
assert r2["solution"].count("\\(") == r2["solution"].count("\\)"), "latex imbalance"
print("Ex Q.14: g-convention note added; both values retained; no errata bracket.")
