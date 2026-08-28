# CDS General Knowledge — transcription contract

You transcribe a **band** of a scanned CDS General Knowledge booklet into JSON.
Read this whole file before opening a page. It is the contract; your prompt only
tells you WHICH band.

## What you are and are not doing

- You transcribe. **You do NOT answer.** There is no `answer` field in your output
  and you must not add one. Answer derivation is a separate, deliberately blind
  pass — if a transcriber leaves a guess behind, the deriver anchors on it and the
  two passes stop being independent, which is the whole point of running two.
- You classify each question into `subject` / `chapter` / `subtopic`.
- You transcribe **what is printed**, not what you think was intended. If the page
  is wrong, transcribe it faithfully and say so in `flags`.

## RULE 1 — OPTION FIDELITY. This is the one that matters most.

For every question, the four options must match the page in **both**:

1. the **set** — the four texts, no invention, no omission, no paraphrase; and
2. the **label → text ORDER** — the text printed at (a) goes in `A`, (b) in `B`,
   (c) in `C`, (d) in `D`.

This corpus has no answer key, so every answer downstream is derived by reading
the options. If you copy the right option's *text* into the wrong *letter's* slot,
the derivation still succeeds, still names a letter, and is **wrong** — and no
downstream check can catch it. On the sibling CDS English corpus this exact defect
produced 19 wrong keys, and a full blind re-derivation pass confirmed all 89 rows
it saw, including one that was later disproved from the page.

So: after transcribing a question, **look at the page again** and check the four
labels against your four strings, in order. Do not rely on having read it once.

Two-column pages are where this goes wrong. A question's options belong to the
question whose stem is directly above them **in the same column** — never to the
question printed beside them in the other column.

## RULE 2 — the stimulus goes IN the stem

`content_hash` is computed from stem + options + answer, and it **excludes**
context. So two questions that share a generic stem collide and one is silently
dropped at commit. Anything question-specific therefore belongs in `stem`:

- **Match List** — a Match List is **ALWAYS a GFM pipe TABLE**, never prose, never
  a list of lines. The `|---|---|` separator row is **mandatory**: without it the
  renderer treats the pipes as literal text and prints raw `|` on the page and in
  every downloaded Word paper. One row per pairing, List-I in column 1 and List-II
  in column 2, and the column headers carry the parenthesised category names the
  page prints. Put the `Code :` /
  `Codes :` line on its own line AFTER the table, never inside a cell:

  ```
  Match List-I with List-II and select the correct answer using the code given below the Lists :

  | List-I (Forest type) | List-II (Specie) |
  |---|---|
  | A. Tropical Moist Forest | 1. Kail |
  | B. Littoral and Swamp Forest | 2. Khair |

  Code :
  ```
  The four options are then the code rows, e.g. `A-4, B-3, C-2, D-1` — transcribe
  each option exactly as the row of numbers under the A B C D header reads.

- **"Consider the following statements"** — the numbered statements go in the stem,
  each on its own line, then the "Which of the statements given above is/are
  correct?" line. Options are the code (`1 only` / `2 only` / `Both 1 and 2` /
  `Neither 1 nor 2`, or whatever is printed).

- **"Statement I / Statement II"** — both statements in the stem, then the
  printed instruction line. Options are the four printed alternatives.

## RULE 3 — classification

`subject`, `chapter` and `subtopic` must come from **`scripts/cds-gs/catalog.json`**
(read it). `subject` and `chapter` are **hard-validated** at commit — an
unrecognised value fails the build, it does not auto-create.

- Pick the chapter that the question actually **tests**, not one a keyword hints at.
  A question naming a river but asking which state a dam is in is Indian Geography —
  Economy/Resources, not Rivers.
- **An INSTITUTION question: structure/function, or a dated event?** This is the split that
  otherwise gets decided differently by every band. A question testing an institution's
  **structure, mandate or function** goes to its subject home — the NHRC's functions are
  Polity, how India Post Payments Bank is incorporated is Economics. A question testing a
  **dated event, appointment or announcement** goes to Current Affairs — who chairs a task
  force constituted "recently" is a Current-Affairs recall, even though the body is the RBI.
- **A DEFENCE question: the system, or the news about it?** Same shape. "Which missile is
  India's first indigenous long-range subsonic cruise missile" is identification, so it is
  `Defence and Military Exercises > Weapon Systems, Missiles and Military Aircraft`. "DRDO
  test-fired X in month Y" is an event, so it is `Science and Technology > DRDO, Defence and
  Marine Technology`. Decide by what is being TESTED, never by whether DRDO built the thing —
  otherwise the two subtopics split the same weapon arbitrarily.
- If nothing in the catalog fits, still pick the closest chapter, and add a `flags`
  entry `"catalog-gap: <what is missing>"`. **Do not invent a chapter or subtopic
  name.** The gaps you report are collected and adjudicated as a batch.
- `subtopic` is soft — a mismatch is flagged, not fatal — but pick from the list.

## RULE 4 — report on territory you do not own

Your band has a page range. Also tell me, in `bandReport`:

- the **full sorted list of question numbers** you found (so a gap is visible);
- whether the **first** question on your first page is complete, or continues from
  the previous page (a stem or option block that starts mid-sentence);
- whether the **last** question on your last page is complete or continues overleaf;
- anything you can see that belongs to a neighbouring band.

A duplicated question announces itself at merge time. A **dropped** one does not.
This field is the only thing that catches it.

## RULE 5 — faithfulness and formatting

- **Math** in `\( ... \)`: `\(10^{-9}\ \text{cm}\)`, `\(T = t_c + 273.15\)`,
  `\(a\mathrm{Fe_2O_3}\)`. Balance every `\(` with a `\)`.
- **Do not "fix" the page.** A misprint, an impossible value, a duplicated option,
  a missing fourth option — transcribe as printed and add a `flags` entry. If a
  question has a genuine defect, that is a finding, not something to smooth over.
- Preserve emphasis that changes meaning: "Sound waves **cannot** travel through"
  — the bold `not` is load-bearing. Use `**bold**`.
- Do not transcribe the header, footer, booklet code or page number.
- Straight quotes and hyphens are fine. Never emit a literal `\n` two-character
  sequence — use a real line break.

## Output

Write **one JSON file** to the path your prompt names. Shape:

```json
{
  "band": "B1",
  "pages": [1, 2, 3],
  "bandReport": {
    "numbersFound": [1, 2, 3],
    "firstComplete": true,
    "lastComplete": true,
    "notes": "Q22's option block runs to the foot of the right column; nothing spills."
  },
  "questions": [
    {
      "number": 1,
      "stem": "Which one of the following elements is used as a timekeeper in atomic clocks?",
      "options": [
        { "label": "A", "text": "Potassium" },
        { "label": "B", "text": "Caesium" },
        { "label": "C", "text": "Calcium" },
        { "label": "D", "text": "Magnesium" }
      ],
      "subject": "Chemistry",
      "chapter": "Atomic Structure and Periodic Classification",
      "subtopic": "Periodic Trends, Valency and Atomicity",
      "difficulty": "MODERATE",
      "flags": []
    }
  ]
}
```

## WHY THE SHELL CORRUPTS YOUR PROBES AND NOT YOUR DATA

A dozen agents on this pipeline have had a validation script silently corrupted by
a shell heredoc, and NONE has corrupted a question file that way. That is not luck
and it is worth understanding, because it tells you where to be careful.

The shell eats ONE backslash level. Your DATA carries single backslashes — `\(`,
`\neq`, `\theta` — and a lone backslash survives a heredoc intact. Your PROBES carry
DOUBLED backslashes, because a regex or a string literal that means "a literal
backslash followed by n" is written `\\n`. That doubled pair is exactly what gets
collapsed, so the probe compiles to "contains a real newline" and reports a clean
file as broken. One agent's checker falsely flagged five stems this way; another's
turned `\text{th}` into a literal TAB and then failed to notice, because the same
probe exempted tab as "ordinarily legitimate".

Three consequences:
- Author probes with the Write tool, exactly like data. `python -c` is no safer —
  it round-trips through the shell's encoding too, and one agent's checkpoint came
  out as cp1252 with every em dash a raw 0x97, which would have failed the merge.
- When a probe disagrees with the data, suspect the probe FIRST. On this pipeline
  it has been wrong every single time.
- Never exempt tab in long-form text. Nothing here is tab-separated — prose, inline
  LaTeX and GFM pipe-tables all use pipes and spaces — so a tab is always damage,
  and exempting it defeats the check that would have caught the corruption above.

## PAGE COUNT IS DENSITY, NOT BILINGUALISM

Every booklet in this corpus is printed in Hindi AND English, and every render
carries the ENGLISH half only — which is why printed page numbers are always
odd-only, image n mapping to printed 2n+1. That is UNIVERSAL, so it explains
nothing about why one booklet is 18 pages and another 23.

The difference is question density, and it tracks the year:

| booklet   | pages | English pages | q/page |
|-----------|-------|---------------|--------|
| 2020-2025 |  18   |      17       |  7.1   |
| 2018-2019 |  22   |      21       |  5.7   |
| 2016-2017 |  23   |      22       |  5.5   |

So do not predict a per-page count from the page total, and do not conclude that a
long booklet has extra content. Report the range you actually find on each page —
the older papers run 4 to 7 and the rhythm breaks whenever a Directions block or a
long option set eats a column.

## NAMESPACE YOUR SCRATCH FILES BY BAND — the scratchpad is SHARED

Several agents run at once on this pipeline and they all share one scratchpad
directory. Two agents transcribing the same paper independently created
`merge_2019_1.py`, and one silently overwrote the other's copy mid-run. The two
scripts had different contracts and one of them deleted its own fragments on
exit, so running the wrong one would have destroyed work with no error.

Prefix EVERY scratch file you create — scripts as well as crops — with the paper
and band you own: `2019-1-B1_merge.py`, not `merge.py`. Nothing you write is
private just because you made it, and a generic filename is an invitation for a
peer to clobber it. Delete your own when done and leave everyone else's alone.

## WRITE AFTER EVERY PAGE — not "early", not "when the band is done"

Agents on this pipeline die to transient API errors. Three have. What separates a
12-question loss from a total one is purely how often the output file was written.

The rule is literal: **after you finish reading a page, write the file.** Not after
you have verified the whole band, not once your checks pass, not when the work
feels ready to show. One agent held its output while it verified every code block
in its band, died on the last step, and lost all of it — its final words were
"All code blocks verified. Writing B1."

A partial file is not a mess, it is a checkpoint. The merge step reconciles bands
against 1-120 and fails loudly on any gap, so an incomplete file cannot slip
through unnoticed — and a resumed agent can verify what is there and continue,
which costs a fraction of redoing it. Overwrite the same path each time; the last
write wins.

`difficulty` is `EASY` | `MODERATE` | `HARD` — judged as a CDS aspirant, not as you.
`flags` is a string array; leave it `[]` when there is nothing to say.

## Before you finish

1. Every question number in your range is present exactly once.
2. Every question has exactly 4 options labelled A, B, C, D — unless the page
   really prints otherwise, which is a `flags` entry.
3. You re-checked label→text order against the page (Rule 1).
4. Every `subject` and `chapter` is a literal key from `catalog.json`.
5. No `answer` field anywhere.
