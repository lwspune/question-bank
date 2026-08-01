# Answer-authoring brief — Class-9 History / Political Science chapters

## The one rule that matters

**This textbook ships NO answer key anywhere.** There is nothing to check your
answer against, so the failure mode is not a wrong key — it is a *fluent
invention*: a real-sounding date, person, organisation or statistic that the
chapter never mentions and that no reader would think to question.

**Every factual claim in every answer must be traceable to the chapter's own
prose.** Write the answer a student could produce having read only this chapter.

Concretely:
- Do NOT add years, names, place names, organisations, treaties or figures that
  are absent from the chapter text, even when you are confident they are true.
- Do NOT fabricate a quotation, a statistic, or an attribute of a person.
- If a question cannot be fully answered from the chapter, answer it as far as
  the chapter allows, then append a final line
  `[Note: the chapter does not state ...]` naming exactly what is missing.
- Where widely-known history points somewhere other than the chapter, follow the
  **chapter**, and say so in one honest closing sentence rather than silently
  choosing.

A grounding audit runs over your output afterwards: it extracts every year and
proper noun from each answer and checks it against the chapter text. Unsourced
names and dates WILL be surfaced.

## Inputs

- **Questions**: `scripts/mh-sb-9/data/<id>.all.topaper.json` — `{id, ref, stem,
  context, subtopic}`. Answer EVERY row.
- **Grounding source, read it IN FULL first**:
  `scripts/mh-sb-9/out/<id>.text.md` — the chapter's complete text layer.
- Rendered pages `scripts/mh-sb-9/out/<id>/p-*.png` if a table or figure is unclear.

## Style

- Class 9 register: plain, direct sentences. No preamble ("The answer is…").
- Length follows the printed instruction:
  - full form / one-line identification → 1–2 lines
  - "write a short note" → 3–5 sentences
  - "explain with reasons" / "give reasons" → 3–5 sentences that actually state
    the REASON, not just restate the claim
  - "answer in brief" → 4–6 sentences
  - "answer in detail" → 6–10 sentences
- **True/false questions**: begin with the single word `True.` or `False.`, then
  the reason from the chapter. Decide from the chapter, not from memory.
- **"Identify the wrong pair"**: name the wrong pair, say in one sentence what
  the chapter actually says about that item, and note the other three are correct.
- **"Complete the table/chart/timeline"**: answer with the COMPLETED table as a
  GFM pipe-table. The `|---|---|` separator row is **mandatory** — without it the
  renderer prints raw pipe characters on the website and in Word. Fill only cells
  the chapter supports; for a cell the chapter does not supply, write
  "The chapter does not state this" rather than inventing it, and add the
  `[Note: ...]` line.
- Plain prose only. There is no mathematics in this book — never use `\(...\)`.

## Output

Write ONE file: `scripts/mh-sb-9/data/<id>.ex.solutions.json`
A JSON array of `{"id": "<uuid copied exactly from the input>", "ref": "<ref>",
"solution": "<your answer>"}`.

- Use the **Write tool**. Do NOT build the file with a bash heredoc or
  `python -c` — both eat backslashes in this repo.
- Newlines inside a solution must be real JSON `\n` escapes (one backslash),
  never a literal two-character `\\n`.
- Before finishing, diff your authored ids against the input ids and confirm the
  sets are identical. Do not trust your own running count.

## Report back

Row count answered (must equal the input count), every row where you added a
`[Note: ...]` line and why, any true/false verdict you found genuinely arguable,
and anything the chapter contradicts about general knowledge. Do not paste the
answers.
