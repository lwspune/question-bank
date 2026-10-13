# Answer-authoring brief: Balbharati BIOLOGY, Std XI and Std XII

Companion to `BIOLOGY_BRIEF.md` (same two lanes: `<lane>` is `scripts/stateboard`
for Std XII, `scripts/mh-sb-11` for Std XI). Descended from
`GEOGRAPHY_SOLUTION_BRIEF.md`.

## The one rule that matters

**These books print no answer key.** Nothing exists to check your answer against, so
the failure mode is not a wrong key. It is a **fluent invention**: a real-sounding
enzyme, hormone, organism, scientist, year or number that the chapter never mentions
and no reader would think to question.

**Every factual claim must be traceable to THIS chapter's prose.** Write the answer
a student could produce having read only this chapter.

- Do NOT add names, examples, numbers, dates or mechanisms that are absent from the
  chapter text, **even when you are sure they are true**.
- If a question cannot be fully answered from the chapter, answer as far as the
  chapter goes, then append a final line `[Note: the chapter does not state ...]`
  naming exactly what is missing.
- Where the chapter and standard biology disagree (a wrong enzyme name, a wrong
  spelling of a genus), **write the correct fact and add a closing line**
  `[Note: the textbook says ...]`. Do not repeat a factual error just because the
  book prints it. A spelling the book gets wrong may simply be corrected in the
  answer; no note is needed for that.

`audit-grounding.ts` runs over your output afterwards and lists every proper noun and
year it cannot find in the chapter. It is triage, and a clean run does not prove
grounding: it cannot see an invention written in lower case ("the rate doubles").

## Inputs

- **Questions**: `<lane>/data/<id>.ex.topaper.json`, `{id, ref, stem, context,
  subtopic}`. Answer EVERY row.
- **Grounding source, read it IN FULL first**: `<lane>/out/<id>.text.md`.
- Rendered pages `<lane>/out/<id>/p-*.png` for any table or figure, and for every
  figure a question depends on (its page is in `<lane>/data/<id>.figneed.json`).

## Style

The register of a good Maharashtra board answer: plain, direct, complete sentences,
no preamble ("The answer is..."). Key terms in **bold**, scientific names in
*italics*. Length follows the instruction:

- a fill-in, one-word or one-line item → the word or line, plus one sentence of why
- *answer the following* → 2 to 5 sentences
- *write short notes* → 5 to 8 sentences or a short list of points
- *give reasons* → the reason itself in 2 to 4 sentences, not a restatement
- *differentiate between* → a GFM pipe-table, one column per item, one row per
  point of contrast (3 to 5 rows), the point named in the first column
- *explain / describe in detail* → 6 to 12 sentences, or numbered steps for a process
- *match the following* → the matched pairs as a pipe-table, then one line per pair
  only if the match is not self-evident
- *complete the chart / tree diagram* → the completed chart as a pipe-table or a
  nested list, filling only what the chapter supports

Chemical formulas and ions in LaTeX: `\(\text{CO}_2\)`, `\(\text{Ca}^{2+}\)`,
`\(\text{NADPH} + \text{H}^+\)`. No raw unicode maths (`× → ∴`): write "gives",
"forms", "therefore". A reaction is a line of words or a LaTeX `\rightarrow`
inside `\( \)`.

## Shape-specific rules

**"Draw a neat labelled diagram of ...".** You cannot draw, and the owner does not
want generated drawings. Answer in two parts: (1) one sentence naming what the
diagram shows, then the list of labels a correct diagram carries, **taken from the
chapter's own figure** of that structure; (2) one or two sentences on what the
structure does, if the question asks. Then record the book's figure in
`<lane>/data/<id>.diagram-answers.json` as
`[{ "ref": "...", "figure": "Fig. 5.3", "page": <render page index>, "what": "..." }]`
so the book's own figure can be cropped and attached as the answer image. If the
chapter has no figure of that structure, record `"figure": null` and say so in the
report.

**"Identify the diagrams / label the diagram".** Look at the page image (the page is
in `figneed.json`). Name what each figure shows and give its labels. If a label
pointer is ambiguous, say which reading you chose and why in one sentence.

**"Complete the tree diagram / chart".** Give the completed structure as a nested
list or a pipe-table. Fill only cells the chapter supports; a cell it does not
supply reads "not stated in the chapter" and earns the `[Note: ...]` line.

**A two-choice item** ("identify the correctly written name: A or B"). Name the
correct one and the rule it follows, citing the chapter's rule.

## MCQs are not yours

Exercise MCQs get their key and explanation from a separate BLIND pass
(`dump-mcq.ts` writes them without the key, and a different agent re-derives each).
Answer only the rows in your `ex.topaper.json` input.

## Output

ONE file: `<lane>/data/<id>.ex.solutions.json`, a JSON array of
`{"id": "<uuid copied exactly from the input>", "ref": "<ref>", "solution": "<answer>"}`.
Plus `<lane>/data/<id>.diagram-answers.json` if the chapter has drawing tasks.

- Use the **Write tool**. Never a bash heredoc or `python -c`: both eat backslashes.
- Newlines are JSON `\n` escapes (one backslash), never a literal `\\n`.
- **No em dashes in anything you write.** Use a full stop, colon, comma or brackets.
  An en dash in a range is fine.
- Before finishing, diff your ids against the input ids; the sets must be identical.
- Then dry-run the apply and fix whatever it reports:
  `npx tsx <lane>/apply-solutions.ts <id>` (no `--apply`).

## Report back

Rows answered (must equal the input count); every row with a `[Note: ...]` line and
why; every place the chapter and standard biology disagree and what you wrote; every
drawing task and the figure you paired it with (or `null`); every label reading you
were unsure of. Do not paste the answers.
