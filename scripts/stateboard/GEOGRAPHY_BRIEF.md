# Transcription brief — Class-12 Balbharati GEOGRAPHY chapters

Applies to the eight chapter PDFs under `GEOGRAPHY_ROOT` (see `config.ts`). The
Maths chapters use the README's flow, Physics uses `PHYSICS_TRANSCRIPTION_BRIEF.md`
and Chemistry `CHEMISTRY_AGENT_BRIEF.md`. This book needs its own contract
because it is different in kind from all three: clean prose text layer, no
mathematics, **no solved examples anywhere**, and **no answer key anywhere**.

Descended from `scripts/mh-sb-9/HUMANITIES_BRIEF.md`, which covered the Class-9
Balbharati Geography book. Where the two disagree, this file wins for Class 12.

---

## Your inputs

- `scripts/stateboard/out/<id>.text.md` — the chapter's full PDF text layer.
  **This is your primary source for wording.** Read it in full before starting.
- `scripts/stateboard/out/<id>/p-*.png` — rendered pages. Use these to settle
  **layout** only: reading order, which lines belong to which numbered item,
  where a table's cells actually sit, how many options an MCQ really has.

### Two text-layer facts, both measured — do not re-derive them, and do not "fix" them

1. **The punctuation is already correct.** Reading the dump through a Windows
   cp1252 console prints a replacement character for every curly quote, which
   looks exactly like mojibake. It is the console, not the book: U+FFFD occurs
   **zero** times, and what is actually present is U+2019/U+2018/U+2013. Read
   with an explicit utf-8 reader before concluding anything about a character.
2. **The two-column layout interleaves items out of printed order.** Measured on
   Ch.7: `Q.1)` and `Q.3)` both sit at **y=183.8** — left and right column of the
   same page. So the dump can emit Q.1, Q.2, then Q.3 from the *other* column
   mid-stream, and a single printed question can arrive as several non-adjacent
   lines. **Never infer question boundaries or ordering from the dump.** Rebuild
   the true order from the page images every time.

---

## What to transcribe

Two things, and nothing else.

### 1. The chapter-end `Exercise` block — all of it

Every numbered question under the `Exercise` heading.

### 2. Activity boxes — only the ANSWERABLE items

The chapter bodies carry boxes titled *Try this · Give it a try · Use your brain
power! · Can you tell? · Think about it · Find out! · Do you know?*. Unlike the
Class-9 book, **many of these are genuine questions with determinate answers**,
so they are in scope — but only per **item**, never per box. A single box
routinely mixes both kinds.

**Include an item when its answer is fixed by either:**
- **printed data** in the box (a table, graph, map or dataset), or
- **the chapter's own prose** — very often the `Geographical explanation`
  paragraph immediately below the box answers it outright.

**Exclude an item when it:**
- asks about the student's own reasoning process — *"How did you decide the
  common factor?"*, *"How did you differentiate one area from another?"*;
- asks about the student's own locality or preference — *"Identify YOUR formal
  region"*, *"In which region would you like to stay and why?"*;
- asks them to go outside the book — *"Find out information about X"*, *"collect
  pictures"*, *"discuss this in your class"*;
- is a bare *Do you know?* factoid with no question in it at all.

Worked example of the split, Ch.7 `Try this` (Table 7.1), four printed items:
items 1 and 2 ask *how did you decide / differentiate* → **excluded**; item 3
(*"Is the common factor the only basis of differentiation?"*) and item 4
(*"Make a list of characteristics…"*) are both answered by the prose directly
below → **included**. Same box, opposite verdicts.

**Report the per-box include/exclude split** so the judgement is reviewable. Do
not silently drop a box.

---

## Output — `scripts/stateboard/data/<id>.<section>.json`

An `SBQuestion[]` (the type is in `lib.ts`). One file per section is fine;
`merge.ts` globs them and guards against duplicate refs.

```jsonc
{
  "ref": "Ex Q1(1)",              // unique in the chapter; mirror the PRINTED numbering
  "bucket": "exercise-mcq",       // or "exercise-subjective"
  "format": "mcq",                // or "subjective"
  "subtopic": "<exactly one of the chapter's canonical subtopics>",
  "difficulty": "MODERATE",       // EASY | MODERATE | HARD
  "context": "Identify the correct group :",   // the SHARED instruction, if any
  "setLabel": "Ex Q1",            // same string for every sibling under that instruction
  "stem": "...",                  // the question itself, WITHOUT the shared instruction
  "options": [                    // MCQ only — exactly 4, labels A B C D
    { "label": "A", "text": "..." }, { "label": "B", "text": "..." },
    { "label": "C", "text": "..." }, { "label": "D", "text": "..." }
  ],
  "answer": "D"                   // MCQ only — DERIVED, see below
}
```

- **`bucket`**: only the two exercise buckets are ever used. There is **no
  `solved` bucket in this book** — it prints no worked examples at all, so a row
  claiming to carry the book's own solution would be a fabrication.
- **Ref scheme** mirrors the print: `Ex Q1(1)`, `Ex Q2(2)`, `Ex Q6`. Prefix an
  activity item with its box and page so it stays traceable and globally unique:
  `Act p02 Formal-Functional`, `Act p06 T7.5(3)`.
- **Sets.** Where one printed instruction governs several sub-items, put the
  instruction in `context`, give every sibling the same `setLabel`, and put only
  the sub-item text in `stem`. A standalone question needs neither.
- **Options map positionally**: printed A/B/C/D (or a/b/c/d) → A B C D. Never
  reorder — a mis-slotted option makes a blind re-derivation confirm the wrong
  letter, which is the one error a blind pass cannot catch by itself.
- **`difficulty`**: one-line recall → EASY; short note / give-reasons /
  differentiate → MODERATE; *answer in detail*, a multi-part comparison, or a
  statistical computation → HARD.
- **`subtopic`** must be EXACTLY one of the strings in the chapter's `subtopics`
  array. The build hard-fails on an unknown one. Choose by CONTENT.

### `answer` — derive it, or omit it

There is **no answer key anywhere in this book** (measured: all 124 pages, no
ANSWERS section, no inline `(Ans. …)`, no worked examples). So every key is
yours.

Derive it from the chapter's own prose. **If the chapter genuinely does not
settle it, omit `answer` entirely** — the row then commits with no correct option
and is reported as a flag. Omitting is the honest move; a wrong key is worse
than a missing one, and there is no second pass that will catch it for you.

---

## The five question shapes that need explicit handling

These do not occur in the Maths/Physics/Chemistry lanes.

**1. "Identify the correct group" / "Identify the correct correlation".**
Genuine four-option MCQs, but the option is a **group of four items**, not a
phrase. Put the whole group in the option text, newline-separated, preserving the
printed inner numbering. The question asks which group is **internally
homogeneous**. Ch.7 Q.1(1): option A is `Satpuda / Deccan / Alps / Rockies` —
three ranges and a plateau, so A breaks; the answer is the group whose four
members share one category.

Some chapters instead print an **Assertion–Reasoning** block under the same
heading ("A : Assertion; R : Reasoning") whose four options are the standard
boilerplate, identical for every sub-item. Those are also `mcq`. Repeat the four
boilerplate options on every sibling row — they are that row's options, and
`buildRecords` requires exactly four.

**2. "Complete the chain".** A three-column matching table (A/B/C). This is
**ONE row**, `subjective`. Reproduce the table in the stem as a GFM pipe-table.
**The text layer scrambles these badly** — Ch.4's columns interleave across the
two-column split — so build it from the page image, not the dump.

**3. Map work and "draw a neat labelled diagram".** *"On an outline map of the
world, show the following with index"*, *"Draw a neat labelled diagram for the
demographic transition theory"*. These are student **drawing** tasks.
Transcribe the stem normally; they are `subjective`. **They are NOT
figure-dependent — do not record them in `<id>.figneed.json`.** There is nothing
in the book to crop: the map is blank by design and the diagram is the answer.

**4. A question whose data sits on a DIFFERENT PAGE.** Ch.7 Q.6 says *"…given in
Table 7.5"*, and Table 7.5 is printed on page 6 inside an activity box, six pages
before the exercise. Left as printed the question is unanswerable on `/browse`,
where there is no surrounding book. **Inline the referenced table into the stem
as a pipe-table**, keeping the reference ("Table 7.5") so provenance survives.
Check every `Table N.M` / `fig. N.M` reference in an exercise question for this.

**5. "Read the given passage and answer the following questions."** Set-based.
The passage goes in `context`, shared by every sibling via one `setLabel`; each
sub-question is its own row with only its own text in `stem`.

---

## Tables

Any table — in a stem, an option or a context — is a **GFM pipe-table**:

```
| Region | Arable land (%) | GDP (billion $, 2017) |
|---|---|---|
| A | 11.8 | 76.48 |
| B | 4.0 | 1364.83 |
```

**The `|---|---|` separator row is mandatory.** Without it the renderer prints
raw pipe characters — on the website and in the Word export alike. Reproduce
blanks as printed (`.........`) for a complete-the-table question.

---

## Figures

Record a question in `scripts/stateboard/data/<id>.figneed.json` as
`[{ "ref": "...", "page": <0-based PDF page index>, "what": "short description" }]`
**only when the question cannot be answered without seeing a printed graphic** —
*"Study the map in fig. 5.3 and answer"*, *"Observe fig. 3.1 and answer"*. Do not
attempt the crop yourself.

Three things that are **not** figure needs:
- a drawing task (rule 3 above);
- a table that exists as text — use a pipe-table;
- a question that merely **cites** a figure whose content you have fully inlined.
  A figure **citation is not a figure dependence**; over-recording here is the
  documented failure mode of `npm run audit:figures`, whose measured precision is
  26% precisely because transcriptions inline a figure's numbers and keep its
  citation.

Separately, write `scripts/stateboard/data/<id>.figtext.json` as
`{ "figures": { "fig 7.2": ["label", "label", …] } }` listing the **text printed
inside** each map or diagram you can read. PyMuPDF cannot see those labels — they
are vector art — so without this file every map-sourced fact in an authored
answer reads as an invention to `audit-grounding.ts`. On the Class-9 Geography
pilot one figure produced 12 false positives this way.

---

## Fidelity

Transcribe what is printed, including the book's own spellings and typos
(Ch.7 prints "Maharahstra" and "Unfavorable"). Do not silently correct them, do
not paraphrase a stem, do not merge or split printed questions. If an MCQ prints
fewer than four options, **say so in your report — do NOT invent one to reach
four**; ingest it as `subjective` with the printed choices listed in the stem.

---

## Mechanics

- Write the file with the **Write tool**. Do NOT build JSON with a bash heredoc
  or `python -c`: both eat backslashes in this repo, and it has bitten the
  maintainer as well as subagents. A quoted heredoc is not safe either — it
  silently halved `\\n` to `\n` in this very pipeline on 2026-09-24.
- Newlines inside a string are real JSON `\n` escapes (one backslash), never a
  literal two-character `\\n`. `commitStaged` **rejects** a row carrying a
  literal `\n` rather than repairing it, because the content hash is computed
  upstream from the pre-normalisation text.
- **There is no mathematics in this book — never use `\(...\)` anywhere.** The
  one exception is a statistical symbol inside a Spearman's-correlation answer,
  which belongs in the *solution*, not a stem.

---

## Report back

- Row count, split MCQ / subjective, and split exercise / activity.
- Every ref, so the set can be diffed against the print.
- **The per-box include/exclude verdict for every activity box**, with one-line
  reasons.
- Every MCQ where you omitted `answer`, and why.
- Anything printed oddly: wrong option count, a question duplicated from another
  chapter, a broken table, a reference to a table or figure you had to inline.
- The contents of any `.figneed.json` / `.figtext.json` you wrote.

Do not paste the whole JSON.
