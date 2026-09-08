# NCERT Physics (CBSE Class 11 + 12) — vision transcription brief (per-band agent)

You are transcribing ONE band of an NCERT **Physics** chapter from rendered page images
into a JSON file the ingestion pipeline commits. Your task message gives you: the
**chapter id**, the **book chapter number**, your **band's page range**, and the
**canonical subtopic list**. Page images are at `scripts/ncert/out/<chapterId>/p-NN.png`
(NN = 0-based page index, zero-padded to 2).

> This is the PHYSICS brief. `TRANSCRIPTION_BRIEF.md` is the Maths one and its **ref
> convention is different** — do not follow it. A Maths chapter has several numbered
> exercises (`Ex 7.3 Q6`); a Physics chapter has ONE terminal exercise block whose
> questions are numbered `<chapter>.<n>` directly.

**READ the images with the Read tool.** Do NOT use the PDF text layer. This is measured,
not a precaution: across 785,781 characters of Class 11 Physics the text layer yields the
radical sign **once** and superscript-two **zero** times, in a book whose every other page
carries a squared unit. Greek and operators are substituted from a Symbol font, so a
perfectly plausible-looking string is not what the page says.

## THE CHAPTER NUMBER IS NOT THE FILE NUMBER

Physics numbers its chapters CONTINUOUSLY across both parts while each part's files
restart at `01.`. Your task message gives you the **book chapter number** — use that in
every ref, never the filename's number. If your task message says chapter 8 and the file
is `01. MECHANICAL PROPERTIES OF SOLIDS.pdf`, every ref is `8.x`. The page itself is the
check: its running head, its section headings and its question numbers all carry the true
chapter number.

## What to transcribe from YOUR band

A Physics chapter is teaching prose containing **worked Examples** (each with the book's
printed solution), then a single terminal **EXERCISES** block. Transcribe both, for your
band only. At a page boundary, ignore content belonging to an adjacent band — but if you
see something that looks like it belongs to NOBODY (a worked Example stranded between two
bands, or a solution whose tail runs onto the next band's first page), **say so in your
final message** rather than silently dropping it. A gap nobody reports is a question that
never ships. Only the duplicate case announces itself; a gap is invisible to every gate.

**Do NOT transcribe** the chapter-opening contents box (it lists section titles and the
word "EXERCISES" on page 0 — it is a table of contents, not the exercise block), "SUMMARY",
"POINTS TO PONDER", or the boxed side-features.

## Output — a JSON array to `scripts/ncert/data/<chapterId>.<band>.json`

```jsonc
{
  "ref": "Ex 8.5",              // see the ref convention below
  "bucket": "exercise-subjective", // "solved" | "exercise-mcq" | "exercise-subjective"
  "format": "subjective",       // "subjective" (no options) | "mcq" (exactly A,B,C,D)
  "subtopic": "<one of the given subtopics>", // VERBATIM from the list you were given
  "difficulty": "MODERATE",     // EASY | MODERATE | HARD
  "stem": "A steel wire of length \\(4.7\\,\\text{m}\\) ...",
  "options": [ {"label":"A","text":"..."} ],  // MCQ ONLY - omit for subjective
  "answer": "B",                // MCQ ONLY - DERIVE it by solving
  "solution": "..."             // SOLVED examples ONLY - the book's printed solution.
                                // ABSENT for exercise questions (authored later).
}
```

### Ref convention (load-bearing — routes /board section structure)

- worked Example printed as "Example 8.3" becomes `"Eg 8.3"`
- exercise question printed as "8.5" becomes `"Ex 8.5"`
- sub-item of an exercise question becomes `"Ex 8.5(a)"` — **use the book's own labels**
  (Physics prints `(a) (b) (c)`; follow the page, do not normalise)

Use the **printed** number. NCERT Physics numbers worked Examples per chapter (`8.1`,
`8.2`, ...), and the exercise questions restart from `<chapter>.1` — so `Eg 8.1` and
`Ex 8.1` are DIFFERENT questions that share a number. That is expected and is exactly why
the two prefixes differ; never merge them.

### bucket / format rules
- Worked **Example** with the book's printed solution: `bucket:"solved"`,
  `format:"subjective"`, include `solution`.
- Exercise question, free-response: `bucket:"exercise-subjective"`, `format:"subjective"`,
  NO `solution`.
- Exercise MCQ: `bucket:"exercise-mcq"`, `format:"mcq"`, 4 options + derived `answer`.

**Spotting an MCQ:** NCERT Physics rarely prints a "Choose the correct answer" instruction.
Key on the SHAPE — a numbered item followed by four alternatives labelled `(a) (b) (c) (d)`
that are mutually exclusive ANSWERS. Beware the opposite error: Physics uses `(a) (b) (c) (d)`
just as often for the **sub-parts of one subjective question** ("(a) find the stress
(b) find the strain"). Sub-parts ask for different quantities; MCQ options are rival answers
to one question. If in doubt, it is a subjective question with sub-parts.

### A question that references a printed FIGURE

Physics exercises genuinely read data off printed figures far more often than Maths does —
graphs to read values from, circuits, stress-strain curves. Such a question is
**unanswerable from its stem alone** and needs the figure cropped and attached later.

```jsonc
"_figure": { "fig": "Fig 8.10", "page": 11 }   // page = 0-based index of the page the FIGURE is on
```

The figure is not always on the question's own page. Give the page the **figure** is on,
and list which refs carry `_figure` in your final message. Do NOT add `_figure` for a
figure that merely illustrates a worked Example whose solution you transcribed in full.

## Transcription rules
- **Math to LaTeX inside `\(...\)`.** Never leave raw unicode (superscripts, radicals, pi,
  arrows, times, ohm, delta, theta, mu) — convert it. Prose stays prose.
- **UNITS ARE PART OF THE PHYSICS.** Write them inside the math zone with `\text{}`:
  `\(9.8\,\text{m s}^{-2}\)`, `\(2.0 \times 10^{11}\,\text{N m}^{-2}\)`,
  `\(1.5\,\text{kg}\)`. Never drop an exponent to the baseline (`m s-2` is wrong and is
  exactly what the broken text layer produces). Never leave a bare `10-5` — it is
  `\(10^{-5}\)`.
- **Be faithful to the printed question**, including any oddity. If the book prints
  something that looks WRONG (an impossible value, a stale cross-reference, a numbering
  jump, a duplicated option), transcribe it faithfully AND flag it in a `"_note"` field.
  Do not silently "correct" the book. The answer-key cross-check adjudicates later; a
  helpfully-corrected stem makes a correct answer look wrong against the key.
- For solved examples, transcribe the book's solution steps (condensing prose is fine, but
  keep every mathematical step, every unit and the final stated answer).
- **DERIVE any MCQ answer** by actually solving. Do not guess from option shape.
- **difficulty**: EASY = one-step substitution into a stated formula; MODERATE = one
  concept applied; HARD = multi-step, or combines concepts, or needs a non-obvious insight.
- If a page is illegible or a question is cut off, transcribe what you can and add a `"_note"`.

## Escaping (this has corrupted real batches — read it)
Write the file with the **Write tool**, never through a shell heredoc or `python -c`. A
shell layer eats one backslash, so `\theta` arrives as a TAB character + "heta" and the row
is silently corrupt. In JSON a LaTeX backslash is written `\\` — so `\(` is `"\\("`. Never
write four backslashes before a parenthesis: it decodes to a literal backslash and renders
as a stray mark on the page. The committer REFUSES both, but fix them at the source.

Return ONLY by WRITING the JSON file. Your final message = counts by bucket, the refs
carrying `_figure`, any `_note` flags, and any content you believe belongs to no band.
