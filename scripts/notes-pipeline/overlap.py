"""How much of one /notes chapter's wording another chapter already has.

Usage (repo root): python scripts/notes-pipeline/overlap.py <new _data dir> <reference _data dir> [--show=N]

Two exams on one syllabus (SSC CGL and CDS Maths share a catalog) get separate pages, and a search
engine treats two pages with the same sentences as one page. A draft agent reads the reference chapter
as a topic checklist; this measures whether it copied it. It compares the text of every string literal:
the share of the new chapter's 8-word runs that also occur in the reference, then the longest shared
runs. Maths inside \\( \\) is dropped (a formula shared by two pages is the syllabus, not a copy).
Read-only; exits 0. A share above about 5% is worth reading; the shared runs say what to rewrite.
"""
import io, os, re, sys

N = 8


def words(folder):
    out = []
    for f in sorted(os.listdir(folder)):
        if not f.endswith(".ts") or f == "index.ts":
            continue
        src = io.open(os.path.join(folder, f), encoding="utf-8").read()
        for lit in re.findall(r'"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`', src):
            s = lit[0] or lit[1]
            s = re.sub(r"\\\\\((.*?)\\\\\)", " ", s)  # \\( maths \\)
            out += re.findall(r"[a-z0-9']+", s.lower())
            out.append("|")  # no run crosses two literals
    return out


def runs(ws):
    return {tuple(ws[i:i + N]) for i in range(len(ws) - N + 1) if "|" not in ws[i:i + N]}


new, ref = sys.argv[1], sys.argv[2]
show = int(next((a.split("=")[1] for a in sys.argv if a.startswith("--show=")), "8"))
a, b = runs(words(new)), runs(words(ref))
shared = a & b
print(f"{len(shared)} of {len(a)} 8-word runs shared ({100 * len(shared) / max(len(a), 1):.1f}%)")
# Merge overlapping shared runs back into passages, longest first.
ws = words(new)
passages, i = [], 0
while i <= len(ws) - N:
    if tuple(ws[i:i + N]) in shared:
        j = i
        while j <= len(ws) - N and tuple(ws[j:j + N]) in shared:
            j += 1
        passages.append(" ".join(ws[i:j + N - 1]))
        i = j + N - 1
    else:
        i += 1
for p in sorted(set(passages), key=len, reverse=True)[:show]:
    print("  -", p[:160])
