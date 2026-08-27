# UPSC transcription brief

You are transcribing a **band** of pages from a scanned UPSC Civil Services
(Preliminary) booklet into JSON. Read this whole file before starting.

**You transcribe. You do NOT answer.** There is no answer key in this booklet and
you must not supply one, not even a hint. A separate blind pass derives every
answer later, and it must not be anchored by a guess of yours. If you find
yourself reasoning toward an answer, stop — that is not this job.

---

## 1. Your inputs

For each page index `NN` in your band, in `scripts/upsc/out/<paperId>/`:

| file | use it for |
|---|---|
| `pNN-c1.png` | the **LEFT column** — transcribe text from here |
| `pNN-c2.png` | the **RIGHT column** — transcribe text from here |
| `pNN.png` | the **whole page** — structure only |

**Transcribe from the COLUMN images.** The page is set in two columns and the
single most expensive defect this bank has ever recorded comes from reading them
in the wrong order — an option block attributed to the neighbouring question. It
produced 19 wrong keys on a sibling corpus, and a later blind re-derivation
**could not catch it**, because the deriver reads the corrupted options, reasons
correctly from them, and confirms the wrong letter. Use `pNN.png` only to see
what spans the gutter, never to read text order off.

Reading order is: all of `c1`, top to bottom, then all of `c2`, top to bottom.

The column split was detected automatically. It is usually right and occasionally
not. **If a crop looks sliced — a line cut down its middle, an item number
missing from the top of `c2`, a stray fragment of the other column — say so in
`bandReport.notes` and read that page from `pNN.png` instead.**

---

## 2. Your output

Write exactly one file: `scripts/upsc/data/<paperId>.<band>.json`

```json
{
  "band": "b1",
  "pages": [1, 2, 3, 4],
  "bandReport": {
    "numbersFound": [1, 2, 3, 4, 5],
    "firstComplete": true,
    "lastComplete": true,
    "notes": ""
  },
  "questions": [
    {
      "number": 1,
      "stem": "Consider the following statements : ...",
      "options": [
        { "label": "A", "text": "I and II only" },
        { "label": "B", "text": "II and III only" },
        { "label": "C", "text": "I and III only" },
        { "label": "D", "text": "I, II and III" }
      ],
      "subject": "Polity and Governance",
      "chapter": "The Union Executive",
      "subtopic": "The President of India",
      "difficulty": "MODERATE",
      "flags": []
    }
  ]
}
```

`bandReport`:
- `numbersFound` — every item number you actually saw, in order.
- `firstComplete` / `lastComplete` — is the first/last item in your band **whole**
  on your pages, or does it start before / continue after them?
- `notes` — anything a later reader needs. Sliced crops, a defective question,
  an item you could not read, a number that skips.

---

## 3. Report on territory you do not own

Band boundaries are cut at item boundaries, but pages and items do not line up
perfectly. **If your first page opens mid-item, or your last page ends mid-item,
transcribe that item anyway and say so in `notes`.**

A question appearing in two bands is fine and expected — the merge step dedupes
them. What the merge step **cannot** do is invent a question that no band
reported. A duplicate is free; a gap is silent and fatal.

If two bands report the same item differently, the merge **refuses** and a human
resolves it against the page. That is the intended behaviour. Do not try to
guess what the neighbouring band saw.

---

## 4. Transcribe what is printed

**Verbatim.** Do not correct spelling, grammar, arithmetic, or facts. If the
booklet prints something wrong, the wrong thing is the data — record it and note
it in `notes`. A "helpful" correction silently changes what the question asks and
makes the derived answer wrong against the real paper.

- **Options are always A, B, C, D**, in printed order. The booklet prints them as
  `(a) (b) (c) (d)`; use uppercase labels.
- **Never reorder options.** Their order is the answer's meaning.
- If an option's text is genuinely identical to another's, transcribe both as
  printed and flag it in `notes`. That is a real paper defect, not yours to fix.
- Roman-numeral statement lists (`I.`, `II.`, `III.`) are part of the **stem**.
  Keep them on their own lines.
- Preserve line breaks inside a statement list. Collapse the ragged line-wrapping
  of ordinary prose into normal sentences.

**Maths and symbols.** Use LaTeX inline delimiters `\( ... \)` for anything
mathematical: `\(x^2\)`, `\(\frac{1}{2}\)`, `\(p + q + r\)`. Every `\(` needs a
matching `\)` — the merge step refuses an unbalanced field. Plain prose stays
plain; do not wrap ordinary words in math.

**Tables.** If a question prints a genuine data grid (a two-column
`List-I / List-II` match, a territorial-region table), write it as a GitHub
pipe table **including the `|---|---|` separator row**, which is mandatory:

```
| List-I | List-II |
|---|---|
| Amaska | Godavari |
```

Without the separator row the renderer prints literal pipes.

---

## 5. Classify every question

`subject`, `chapter` and `subtopic` must come from
`scripts/upsc/catalog.json`. **Read it before you start.**

- `subject` and `chapter` are **hard-validated**. An unknown value fails the
  merge. Copy the strings exactly — punctuation included.
- The chapter must belong to **that subject**. Several chapter names are
  plausible under more than one subject; a chapter borrowed from the wrong
  subject is an error even though both names exist.
- `subtopic` is soft — a warning, not a failure. Prefer a listed one; if nothing
  fits, use your best short label and note it. Those warnings are how the catalog
  gets extended.
- Your paper only permits **its own** subjects. Paper I may not use a CSAT
  subject; Paper II may not use a General Studies subject.

`difficulty` is one of `EASY`, `MODERATE`, `HARD` — your honest read of how hard
the item is for a prepared candidate. Default `MODERATE`.

---

## 6. Paper II only: `context` and shared passages

CSAT is built out of blocks: *"Directions for the following 4 (four) items: Read
the following two passages and answer the items that follow."*

Put the passage that governs an item in that item's `context` field, **verbatim,
with its paragraph breaks**.

**The mapping is per-item and it nests.** One directions block over 4 items can
contain **two** passages, each governing 2 of them. Work out which passage each
item actually refers to — the items usually say ("With reference to the above
passage…") — and give each item **only its own passage**. Do not paste the whole
directions block onto all four.

**Only genuinely SHARED material goes in `context`.** This is the rule that
matters most, and it is not a style preference:

> `content_hash` is stem + sorted options + answer and **excludes `context`**.

So if you park an item's distinguishing text in `context`, two items whose stems
then read identically will **collide on one hash and one will be silently
dropped at commit**.

The concrete trap: data-sufficiency items all share the same boilerplate opening
and the same four options. Their `Question:` and `Statement I / Statement II`
lines are what tell them apart, so those lines belong in the **stem**. Put them
in `context` and five of six items vanish.

Rule of thumb: if it governs **two or more** items, it is `context`. If it is
unique to one item, it is `stem`. Paper I never uses `context`.

---

## 7. Do not author files through a shell heredoc

Write your JSON with the editor/Write tool. In this environment a `bash` heredoc
**eats backslashes**: `\(` and `\frac` arrive as control characters, which is
invisible in review and corrupts the data. Every agent that has ignored this has
produced a corrupted file, and it has caught the maintainer too.

---

## 8. Before you finish

- Every item number in your band range is present exactly once.
- Every question has exactly 4 options, labelled A-D, none blank.
- No question has an `answer` field. You do not supply answers.
- Every `\(` has a matching `\)`.
- Every pipe table has its `|---|---|` row.
- `subject` and `chapter` are copied exactly from `catalog.json`.
- Your JSON parses.

Report in your final message: the item numbers you covered, anything you flagged,
and any page whose column crop you had to work around.
