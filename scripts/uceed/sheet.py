"""
The owner's review sheet for one UCEED paper: every Part A question with its figure, options,
IIT Bombay's answer, our solution and classification; held rows marked. Open it in a browser.

    python -I scripts/uceed/sheet.py 2026 [--check 40,45,52]

Writes generated-papers/uceed/<year>-review.html in the MAIN checkout (gitignored; it outlives
a worktree). Figures are linked from C:\\tmp\\PYQPs\\UCEED\\figures\\<year>\\, not copied.
--check lists question numbers to put in the "please check" box at the top, with the reason
taken from data/<year>.review.json if present ({"<n>": "reason"}).
"""
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = r"C:\Users\vilas\Downloads\Question_Bank\generated-papers\uceed"
FIGS = r"C:/tmp/PYQPs/UCEED/figures"


def key_text(k):
    if k["type"] == "MCQ":
        return k["value"]
    if k["type"] == "NAT":
        return f'{k["range"][0]} to {k["range"][1]}' if "range" in k else str(k["value"])
    return " or ".join(", ".join(s) for s in k["sets"])


def main(year, check):
    data = os.path.join(HERE, "data")
    paper = json.load(open(os.path.join(data, f"{year}.questions.json"), encoding="utf-8"))
    key = {k["n"]: k for k in json.load(open(os.path.join(data, f"{year}.key.json"), encoding="utf-8"))["answers"]}
    notes_path = os.path.join(data, f"{year}.review.json")
    notes = json.load(open(notes_path, encoding="utf-8")) if os.path.exists(notes_path) else {}
    e = html.escape
    cards = []
    for q in paper["questions"]:
        n, k = q["n"], key[q["n"]]
        held = "MSQ: held until the bank has multiple-select" if q["type"] == "MSQ" else (
            "Range answer: held until the bank stores ranges" if "range" in k else "")
        opts = ""
        if q["options"] and q["options"][0]["text"] != "[figure]":
            opts = "<ol type=A>" + "".join(f"<li>{e(o['text'])}</li>" for o in q["options"]) + "</ol>"
        elif q["options"]:
            opts = "<p class=muted>Options A to D are in the picture.</p>"
        fig = f'<img src="file:///{FIGS}/{year}/Q{n:02d}.png" alt="Figure for Q{n}">' if q["figure"] else ""
        flag = f'<p class=flag>Please check: {e(notes.get(str(n), ""))}</p>' if n in check else ""
        cards.append(f"""<section id=q{n} class="{'held' if held else ''}">
<h2>Q{n} <span>{q['type']} · {e(q['subject'])} › {e(q['chapter'])} › {e(q['subtopic'])} · {q['difficulty']}</span></h2>
{f'<p class=heldnote>{held}</p>' if held else ''}{flag}
<p class=stem>{e(q['text']).replace(chr(10), '<br>')}</p>{fig}{opts}
<p class=ans>Answer (IIT Bombay final key): <b>{e(key_text(k))}</b></p>
<p class=sol>{e(q['solution'])}</p></section>""")
    box = "".join(f'<li><a href="#q{n}">Q{n}</a>: {e(notes.get(str(n), ""))}</li>' for n in check)
    committed = sum(1 for q in paper["questions"] if q["type"] != "MSQ" and "range" not in key[q["n"]])
    page = f"""<!doctype html><meta charset=utf-8><title>UCEED {year} review</title>
<style>body{{font:15px/1.5 system-ui;max-width:880px;margin:24px auto;padding:0 16px;color:#0F1D4A;background:#F5F7FB}}
section{{background:#fff;border:1px solid #d7deea;border-radius:10px;padding:16px 20px;margin:14px 0}}
section.held{{opacity:.75}} h2{{font-size:17px;margin:0 0 8px}} h2 span{{font-weight:400;font-size:13px;color:#4a5878}}
img{{max-width:100%;border:1px solid #e3e8f0;margin:8px 0}} .ans{{color:#1D4ED8}} .sol{{background:#f3f6fb;padding:10px;border-radius:6px}}
.muted{{color:#4a5878}} .flag{{background:#fff4d6;padding:6px 10px;border-radius:6px}} .heldnote{{color:#8a5a00;font-size:13px}}
.top{{background:#fff4d6;border-radius:10px;padding:12px 20px}}</style>
<h1>UCEED {year} Part A: review sheet</h1>
<p>{len(paper['questions'])} questions. {committed} are in the bank, PRIVATE; the rest are held. Every answer is IIT Bombay's final key.</p>
<div class=top><b>Please check these first</b><ul>{box}</ul></div>
{''.join(cards)}"""
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f"{year}-review.html")
    open(path, "w", encoding="utf-8").write(page)
    print(path)


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args or not args[0].isdigit():
        sys.exit("usage: python -I scripts/uceed/sheet.py <year> [--check 40,45,52]")
    chk = []
    if "--check" in args:
        chk = [int(x) for x in args[args.index("--check") + 1].split(",")]
    main(args[0], chk)
