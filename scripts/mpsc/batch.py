"""
Build a transcription batch (data/<paper>.tNN.json) from a small Python source,
so Devanagari text and line breaks are written as-is (no JSON escaping by hand).

    import sys; sys.path.insert(0, "scripts/mpsc"); from batch import *
    Q(1, "History", "Ancient India", "Mahajanapadas", "EASY",
      mr_stem_lines, mr_options, en_stem_lines, en_options, "B")
    emit("ssp-2022", 1)

Each Q() also records the answer MARKED on the scan (a coaching institute's box,
or "#" for its "CANCEL #" stamp) into data/<paper>.boxes.json; merge.ts reads it
against the official key. The subject/chapter list is enforced by merge.ts
(config.ts SSP_CHAPTERS), not here.
"""
import json, os, sys

REPO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
_qs = []
_boxes = {}


def table(h1, h2, rows):
    """GFM table lines, blank line either side."""
    out = ["", f"| {h1} | {h2} |", "|---|---|"]
    out += [f"| {a} | {b} |" for a, b in rows]
    return out + [""]


def tableN(headers, rows):
    """GFM table with any number of columns, blank line either side."""
    out = ["", "| " + " | ".join(headers) + " |", "|" + "---|" * len(headers)]
    out += ["| " + " | ".join(r) + " |" for r in rows]
    return out + [""]


def match_opts(*perms):
    """perms like ('iv','iii','ii','i') -> '(a)-(iv), (b)-(iii), ...'"""
    return [", ".join(f"({l})-({r})" for l, r in zip("abcd", p)) for p in perms]


def passage(*paras):
    """A reading passage: its heading and paragraphs as one context string."""
    return "\n\n".join(p.strip() for p in paras)


def _version(stem, opts, ctx):
    v = {"stem": "\n".join(stem).strip("\n"), "options": opts}
    if ctx:
        v["context"] = ctx
    return v


def Q(n, subject, chapter, subtopic, diff, mr, mr_opts, en, en_opts, box, note=None, figure=None, ctx_mr=None, ctx_en=None):
    """mr=None or en=None: the question is printed in the other language only
    (CSAT language comprehension, booklet instruction 4(c)). ctx_*: the passage."""
    q = {
        "n": n,
        "subject": subject,
        "chapter": chapter,
        "subtopic": subtopic,
        "difficulty": diff,
    }
    if mr is not None:
        q["mr"] = _version(mr, mr_opts, ctx_mr)
    if en is not None:
        q["en"] = _version(en, en_opts, ctx_en)
    if note:
        q["printNote"] = note
    if figure:
        q["figure"] = figure
    _qs.append(q)
    _boxes[str(n)] = box


def emit(paper, batch):
    with open(os.path.join(REPO, f"{paper}.t{batch:02d}.json"), "w", encoding="utf-8") as f:
        json.dump(_qs, f, ensure_ascii=False, indent=1)
    bp = os.path.join(REPO, f"{paper}.boxes.json")
    boxes = json.load(open(bp, encoding="utf-8")) if os.path.exists(bp) else {}
    boxes.update(_boxes)
    with open(bp, "w", encoding="utf-8") as f:
        json.dump(dict(sorted(boxes.items(), key=lambda kv: int(kv[0]))), f, indent=0)
    print(f"{paper} t{batch:02d}: {len(_qs)} questions ({_qs[0]['n']}-{_qs[-1]['n']})")
