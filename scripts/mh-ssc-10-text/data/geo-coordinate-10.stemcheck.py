"""Cross-check the COMMITTED stems against the coordinate data the verification
script used.

Why this exists: geo-coordinate-10.verify.py re-typed every point by hand.  So an
"AGREE" there proves that MY re-typed data reproduces the book's key -- it says
nothing about whether the TRANSCRIBED STEM carries the same numbers.  A sign
dropped in the stem alone would sail through (it did: PS5 Q.18 was transcribed
A(-4, 2) while the verifier used A(-4, -2), and only the verifier matched the key).

This pulls every ordered pair out of each stem's LaTeX and diffs it against the
tuples the verifier used, per ref.
"""
import json
import re
from fractions import Fraction as F

# ---- what the verifier used, keyed by ref (typed independently of the stems) ----
EXPECT = {
    "Ex 5.1 Q.1 (1)": [(2, 3), (4, 1)],
    "Ex 5.1 Q.1 (2)": [(-5, 7), (-1, 3)],
    "Ex 5.1 Q.1 (3)": [(0, -3), (0, F(5, 2))],
    "Ex 5.1 Q.1 (4)": [(5, -8), (-7, -3)],
    "Ex 5.1 Q.1 (5)": [(-3, 6), (9, -10)],
    "Ex 5.1 Q.1 (6)": [(F(-7, 2), 4), (11, 4)],
    "Ex 5.1 Q.2 (1)": [(1, -3), (2, -5), (-4, 7)],
    "Ex 5.1 Q.2 (2)": [(-2, 3), (1, -3), (5, 4)],
    "Ex 5.1 Q.2 (3)": [(0, 3), (2, 1), (3, -1)],
    "Ex 5.1 Q.2 (4)": [(-2, 3), (1, 2), (4, 1)],
    "Ex 5.1 Q.3": [(-3, 4), (1, -4)],
    "Ex 5.1 Q.4": [(-2, 2), (2, 2), (2, 7)],
    "Ex 5.1 Q.5": [(2, -2), (7, 3), (11, -1), (6, -6)],
    "Ex 5.1 Q.6": [(-4, -7), (-1, 2), (8, 5), (5, -4)],
    "Ex 5.1 Q.7": [(1, 15)],
    "Ex 5.1 Q.8": [(1, 2), (1, 6)],
    "Ex 5.2 Q.1": [(-1, 7), (4, -3)],
    "Ex 5.2 Q.2 (1)": [(-3, 7), (1, -4)],
    "Ex 5.2 Q.2 (2)": [(-2, -5), (4, 3)],
    "Ex 5.2 Q.2 (3)": [(2, 6), (-4, 1)],
    "Ex 5.2 Q.3": [(-1, 6), (-3, 10), (6, -8)],
    "Ex 5.2 Q.4": [(2, -3), (-2, 0)],
    "Ex 5.2 Q.5": [(8, 9), (1, 2)],
    "Ex 5.2 Q.6": [(22, 20), (0, 16)],
    "Ex 5.2 Q.7 (1)": [(-7, 6), (2, -2), (8, 5)],
    "Ex 5.2 Q.7 (2)": [(3, -5), (4, 3), (11, -4)],
    "Ex 5.2 Q.7 (3)": [(4, 7), (8, 4), (7, 11)],
    "Ex 5.2 Q.8": [(-4, -7), (-14, -19), (3, 5)],
    "Ex 5.2 Q.9": [(2, 3), (1, 5)],
    "Ex 5.2 Q.10": [(2, 7), (-4, -8)],
    "Ex 5.2 Q.11": [(-14, -10), (6, -2)],
    "Ex 5.2 Q.12": [(20, 10), (0, 20)],
    "Ex 5.3 Q.2 (1)": [(2, 3), (4, 7)],
    "Ex 5.3 Q.2 (2)": [(-3, 1), (5, -2)],
    "Ex 5.3 Q.2 (3)": [(5, -2), (7, 3)],
    "Ex 5.3 Q.2 (4)": [(-2, -3), (-6, -8)],
    "Ex 5.3 Q.2 (5)": [(-4, -2), (6, 3)],
    "Ex 5.3 Q.2 (6)": [(0, -3), (0, 4)],
    "Ex 5.3 Q.3 (1)": [(-1, -1), (0, 1), (1, 3)],
    "Ex 5.3 Q.3 (2)": [(-2, -3), (1, 0), (2, 1)],
    "Ex 5.3 Q.3 (3)": [(2, 5), (3, 3), (5, 1)],
    "Ex 5.3 Q.3 (4)": [(2, -5), (1, -3), (-2, 3)],
    "Ex 5.3 Q.3 (5)": [(1, -4), (-2, 2), (-3, 4)],
    "Ex 5.3 Q.3 (6)": [(-4, 4), (-2, F(5, 2)), (4, -2)],
    "Ex 5.3 Q.4": [(1, -1), (0, 4), (-5, 3)],
    "Ex 5.3 Q.5": [(-4, -7), (-1, 2), (8, 5), (5, -4)],
    "Ex 5.3 Q.6": [(1, -1)],
    "Ex 5.3 Q.7": [(1, 2)],
    "Ex 5.3 Q.8": [(2, 4), (3, 6), (3, 1)],
    "PS5 Q.1 (1)": [(1, 3), (3, 1), (5, 3), (3, 0), (1, -3)],
    "PS5 Q.1 (2)": [(-2, 0), (0, 2), (2, 3), (2, 0)],
    "PS5 Q.1 (3)": [(-3, 4)],
    "PS5 Q.2 (1)": [(0, 2), (1, F(-1, 2)), (2, -3)],  # book prints B(1, -0.5)
    "PS5 Q.2 (2)": [(1, 2), (2, F(8, 5)), (3, F(6, 5))],
    "PS5 Q.2 (3)": [(1, 2), (5, 3), (8, 6)],
    "PS5 Q.3": [(0, 6), (12, 20)],
    "PS5 Q.4": [(3, 8), (-9, 3)],
    "PS5 Q.5": [(2, -5), (-2, 9)],
    "PS5 Q.6 (ii)": [(-6, -3), (-1, 9)],
    "PS5 Q.7": [(-3, 1), (0, -2), (1, 3)],
    "PS5 Q.8 (1)": [(6, 4), (-5, -3), (-6, 8)],
    "PS5 Q.8 (2)": [(-2, -6), (-4, -2), (-5, 0)],
    "PS5 Q.9": [(-12, -3)],
    "PS5 Q.10": [(4, 8), (5, 5), (2, 4), (1, 7)],
    "PS5 Q.11": [(1, -2), (5, 2), (3, -1), (-1, -5)],
    "PS5 Q.12": [(2, 1), (-1, 3), (-5, -3), (-2, -5)],
    "PS5 Q.13": [(-1, 1), (5, -3), (3, 5)],
    "PS5 Q.14": [(-7, 6), (8, 5), (2, -2)],
    "PS5 Q.15": [(4, -1), (6, 0), (7, -2), (5, -3)],
    "PS5 Q.16": [(7, 1), (3, 5), (2, 0)],
    "PS5 Q.17": [(4, -3), (8, 5)],
    "PS5 Q.18": [(-4, -2), (-3, -7), (3, -2), (2, 3)],
    "PS5 Q.19": [(12, 14), (4, 18)],
    "PS5 Q.20": [(6, -6), (3, -7), (3, 3)],
    "PS5 Q.21": [(5, 6), (1, -2), (3, -2)],
    "PS5 Q.22": [(1, 7), (6, 3), (0, -3), (-3, 3)],
}

NUM = r"(?:\\\(\s*)?-?\s*\d+(?:\s*\\\))?"


def strip_tex(s):
    s = s.replace("\\(", "").replace("\\)", "")
    s = re.sub(r"\\dfrac\{(-?\d+)\}\{(-?\d+)\}", r"\1/\2", s)
    s = re.sub(r"\\left|\\right|\\!|\\,", "", s)
    return s


def parse_pairs(text):
    t = strip_tex(text)
    out = []
    for m in re.finditer(r"\(\s*(-?\d+(?:\.\d+)?(?:/-?\d+)?)\s*,\s*(-?\d+(?:\.\d+)?(?:/-?\d+)?)\s*\)", t):
        out.append((F(m.group(1)), F(m.group(2))))  # F() parses "-0.5" too
    return out


rows = json.load(open("geo-coordinate-10.questions.json", encoding="utf-8"))
problems = 0
checked = 0
for q in rows:
    ref = q["ref"]
    if ref not in EXPECT:
        continue
    text = q["stem"] + " " + " ".join(o["text"] for o in q.get("options", []))
    got = parse_pairs(text)
    want = [(F(a), F(b)) for a, b in EXPECT[ref]]
    checked += 1
    if got != want:
        problems += 1
        print(f"  MISMATCH {ref}\n     stem  : {got}\n     verify: {want}")

print(f"\n{checked} stems checked against the verifier's coordinate data; {problems} mismatch(es).")
uncovered = sorted(set(r["ref"] for r in rows if r["bucket"] != "solved") - set(EXPECT))
print(f"not coordinate-checkable (no ordered pairs / symbolic): {uncovered}")
