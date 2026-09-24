# Answer-authoring brief — Class-12 Balbharati GEOGRAPHY chapters

Companion to `GEOGRAPHY_BRIEF.md`. Descended from
`scripts/mh-sb-9/HUMANITIES_SOLUTION_BRIEF.md`.

## The one rule that matters

**This textbook ships no answer key anywhere.** Measured across all 124 pages of
`SB_12th_Geography.pdf`: no ANSWERS section, no inline `(Ans. …)` key, and — unlike
Maths, Physics and Chemistry — **not one worked example in any chapter**. So the
README's step-6 cross-check cannot run, and there is nothing to check your answer
against.

The failure mode is therefore not a wrong key. It is a **fluent invention**: a
real-sounding place, country, organisation, year or statistic that the chapter
never mentions and that no reader would think to question. Geography is
especially exposed, because a plausible-sounding country name or percentage reads
as authoritative.

**Every factual claim in every answer must be traceable to the chapter's own
prose.** Write the answer a student could produce having read only this chapter.

Concretely:

- Do NOT add place names, country names, years, organisations, treaties or
  figures that are absent from the chapter text, **even when you are confident
  they are true**.
- Do NOT fabricate a statistic, a rank, or a source attribution.
- If a question cannot be fully answered from the chapter, answer it as far as
  the chapter allows, then append a final line
  `[Note: the chapter does not state ...]` naming exactly what is missing.
- Where general knowledge points somewhere other than the chapter, follow the
  **chapter**, and say so in one honest closing sentence rather than silently
  choosing.

`audit-grounding.ts` runs over your output afterwards: it extracts every year and
proper noun and checks each against the chapter text. Unsourced names and dates
WILL be surfaced. It is triage, not a verdict — and a clean run is **not** proof
of grounding, because it cannot see an invention phrased in ordinary lowercase
("the region's output tripled").

## Inputs

- **Questions**: `scripts/stateboard/data/<id>.all.topaper.json` — `{id, ref,
  stem, context, subtopic}`. Answer EVERY row.
- **Grounding source, read it IN FULL first**:
  `scripts/stateboard/out/<id>.text.md`.
- Rendered pages `scripts/stateboard/out/<id>/p-*.png` when a table, map or
  figure is unclear.

## Style

- Class 12 register: plain, direct sentences. No preamble ("The answer is…").
- Length follows the printed instruction:
  - one-line identification / *identify the correct group* → 1–2 lines, naming
    **why the other three groups break**
  - *give geographical reasons* → 3–5 sentences that actually state the REASON,
    not a restatement of the claim
  - *write short notes* → 4–6 sentences
  - *differentiate between* → a GFM pipe-table of contrasts, 3–4 rows
  - *answer in detail* → 6–10 sentences
  - a data-interpretation activity item → 1–3 sentences, quoting the figure read
    off the table
- Plain prose. **No `\(...\)` anywhere** except a statistical symbol inside a
  correlation answer.
- No raw unicode math (`× ÷ √ ∴`) — write "multiplied by", "therefore".

## Shape-specific rules

**"Identify the correct group".** Name the correct option letter, then say in one
clause what unifies it, then name the disqualifying member of each other group.
That last part is what makes the answer teach rather than assert.

**"Complete the chain" / "complete the table".** Answer with the COMPLETED table
as a GFM pipe-table. The `|---|---|` separator row is **mandatory**. Fill only
cells the chapter supports; for a cell the chapter does not supply, write "The
chapter does not state this" rather than inventing it, and add the `[Note: …]`
line.

**"Differentiate between".** A pipe-table with one column per item and one row
per axis of contrast. Name the axis in the first column.

**Map work — "On an outline map of the world, show the following with index".**
You cannot draw. Answer with **what a correct map would show**: name the specific
region or country for each item **as the chapter names it**, say where it lies,
and state the index/symbol convention. If the chapter does not name a location
precisely enough to place it, say so — do not supply a place name from general
knowledge. This is the single highest-risk shape in the book for invention.

**"Draw a neat labelled diagram".** Describe the diagram's structure and list
every label the chapter supplies, in order. Do not invent labels.

**Spearman's Rank Correlation.** Show the working: rank both variables, note any
tied ranks and how they were handled, give `d`, `d²`, `Σd²`, `n`, and the
resulting coefficient, then state the conclusion in one sentence. **Compute it —
do not assert a coefficient.** Two of these exist (Ch.7 Q.6 on Table 7.5, and the
Table 7.4 activity), both with ties, and a tied rank handled silently is the easy
error here.

**Statistical / data-interpretation items.** Quote the number you read off the
table. An answer that says "region E is highest" without the figure is not
checkable by the next reader.

## Output

Write ONE file: `scripts/stateboard/data/<id>.ex.solutions.json`
A JSON array of `{"id": "<uuid copied exactly from the input>", "ref": "<ref>",
"solution": "<your answer>"}`.

- Use the **Write tool**. Do NOT build the file with a bash heredoc or
  `python -c` — both eat backslashes in this repo, including a *quoted* heredoc.
- Newlines inside a solution are real JSON `\n` escapes (one backslash), never a
  literal two-character `\\n`.
- Before finishing, diff your authored ids against the input ids and confirm the
  sets are identical. Do not trust your own running count.

## What `audit-grounding.ts` actually reports on this book — measured

Pilot chapter (Region and Regional Development, 41 answered rows): **21 hits, all
21 false positives, 0 genuine ungrounded claims.** Expect a similar rate. The
hits are worth reading, but they cluster into four shapes that you can dismiss
quickly once you recognise them:

1. **Connector-joined name pairs — 17 of 21, by far the dominant class.** The
   proper-noun regex lets one `and`/`of`/`the` sit *inside* a capitalised run, so
   two separate names printed as a list become one token that appears nowhere:
   `Mississippi and Nile`, `Gobi and Sahara`, `Amravati and Solapur`,
   `Marathi-speaking and Hindi-speaking`, `Indonesia and Malaysia`. The chapter
   prints each name, just comma-separated. Check the individual names, not the
   joined string.
2. **A hyphenated word broken across a line.** The chapter prints
   `Hydro-` / `electricity` / `project` on three lines; normalising collapses that
   to `Hydro- electricity project`, which never matches `Hydro-electricity`.
3. **Answer scaffolding and table labels.** `Option D`, `Region K` — phrases you
   wrote to refer to a row or an option, which naturally do not occur in prose.
4. **A computed number that looks like a year.** The Spearman denominator
   `12 x 143 = 1716` was reported as an ungrounded year. Any arithmetic landing
   between 1600 and 2099 will be.

Tuning the probe against these was considered and **deliberately not done** on
one chapter's evidence: 21 readable hits is not a signal-to-noise failure, and
`scripts/lib/grounding.ts` is shared, so divergence now would complicate the
logged backfill of the two older copies. Logged in ROADMAP.md instead. If the
rate climbs on the remaining chapters, revisit it there with more evidence.

**One thing the probe genuinely cannot see here**, so check it by hand: this book
prints its own typos (`Maharahstra`, `Unfavorable`). A stem must keep them; an
answer may use the correct spelling. That difference reads as an ungrounded name
and is not one.

## Order of operations — this has cost real work before

`apply-solutions.ts` LAST-writes and `apply-errata.ts` LAST-wins. **Never re-run
`apply-solutions.ts` after `apply-errata.ts`**: it rewrites `solution` from the
fragments and silently strips any bracket it cannot restore. Run errata strictly
after the last solution write, and verify by COUNTING
(`select count(*) … where solution like '[Note%'`) rather than trusting the log.

## Report back

Row count answered (must equal the input count), every row where you added a
`[Note: …]` line and why, every computed correlation coefficient with its `Σd²`
and `n`, any place name you declined to supply, and anything the chapter
contradicts about general knowledge. Do not paste the answers.
