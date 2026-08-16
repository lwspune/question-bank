# NCERT (CBSE Class 12) — vision transcription brief (per-band agent)

You are transcribing ONE band of an NCERT Class 12 Maths chapter from rendered page
images into a JSON file the ingestion pipeline commits. Your task message gives you:
the **chapter id**, your **band's page range**, your **exercise number(s)**, and the
**canonical subtopic list**. Page images are at `scripts/ncert/out/<chapterId>/p-NN.png`
(NN = 0-based page index, zero-padded to 2).

**READ the images with the Read tool.** The PDF text layer flattens all 2-D math into
garbage — matrices interleave, exponents drop to the baseline, and MCQ options built from
math render as EMPTY `(A) (B) (C) (D)`. You MUST read the rendered pages visually and
transcribe the math to LaTeX. Do not use the text layer.

## What to transcribe from YOUR band

An NCERT chapter alternates: teaching prose containing **worked Examples** (each with the
book's full printed solution) → then a numbered **EXERCISE**. Transcribe BOTH the worked
Examples and the exercise questions **for your band only**. At a page boundary, ignore
content belonging to an adjacent band (another agent owns it) — but if you see something
that looks like it belongs to NOBODY (e.g. a worked Example stranded between two bands),
**say so in your final message** rather than silently dropping it. A gap that nobody
reports is a question that never ships.

## Output — a JSON array → `scripts/ncert/data/<chapterId>.<band>.json`

Each object (the `SBQuestion` shape):

```jsonc
{
  "ref": "Ex 9.3 Q6",           // UNIQUE provenance ref — see the ref convention below
  "bucket": "exercise-subjective", // "solved" | "exercise-mcq" | "exercise-subjective"
  "format": "subjective",       // "subjective" (no options) | "mcq" (exactly A,B,C,D)
  "subtopic": "<one of the given subtopics>", // VERBATIM from the list you were given
  "difficulty": "EASY",         // EASY | MODERATE | HARD (your estimate)
  "stem": "Solve \\(\\frac{dy}{dx} = \\frac{1-\\cos x}{1+\\cos x}\\).",
  "options": [                   // MCQ ONLY — omit entirely for subjective
    {"label":"A","text":"..."}, {"label":"B","text":"..."},
    {"label":"C","text":"..."}, {"label":"D","text":"..."}
  ],
  "answer": "B",                 // MCQ ONLY — the correct letter (DERIVE it by solving)
  "solution": "..."              // SOLVED examples ONLY — transcribe the book's full solution.
                                 // Leave ABSENT for exercise questions (authored later).
}
```

### Ref convention (load-bearing — routes /board section structure)

Refs are banded by the EXERCISE, not by the book's section number, so each solved block
routes to the exercise it precedes:

- worked Example N sitting in the run-up to Exercise `<c>.<k>` → `"<c>.<k> Eg.N"`
  e.g. `"9.3 Eg.5"`, `"13.1 Eg.2"` — N is the book's **printed** Example number
  (NCERT numbers Examples continuously across the whole chapter, so N does not restart).
- exercise question n → `"Ex <c>.<k> Q<n>"`  e.g. `"Ex 9.3 Q6"`
- exercise sub-item (i)/(ii)/… → `"Ex <c>.<k> Q<n>(iii)"` (see set-grouping below)
- an exercise MCQ is just a numbered exercise question → `"Ex <c>.<k> Q<n>"` with
  `bucket:"exercise-mcq"`, `format:"mcq"`
- Miscellaneous band only: solved → `"Misc Eg.N"`; question/MCQ → `"Misc Q<n>"`

### bucket / format rules
- Worked **Example** with the book's solution → `bucket:"solved"`, `format:"subjective"`, include `solution`.
- Exercise question, free-response → `bucket:"exercise-subjective"`, `format:"subjective"`, NO `solution`.
- Exercise MCQ → `bucket:"exercise-mcq"`, `format:"mcq"`, 4 options + derived `answer`, NO `solution`.

**Spotting an MCQ:** the rationalised 2025-26 edition mostly DROPPED the
"Choose the correct answer" instruction. An MCQ is any numbered exercise item that ends
with a phrase like *"is equal to"*, *"is"*, *"then"* and is followed by four alternatives
labelled `(A) (B) (C) (D)`. Key on that SHAPE, never on an instruction line.

### Set-grouping (only if a single numbered question has sub-items i)/ii)/iii))
Most NCERT exercise questions are standalone. If one question groups sub-items under a
shared instruction, emit ONE row per sub-item, all sharing:
`"context": "<the shared instruction>"`, `"setLabel": "Ex <c>.<k> Q<n>"`, and refs
`"Ex <c>.<k> Q<n>(i)"`, `"(ii)"`, …. Otherwise omit `context`/`setLabel`.

## Transcription rules
- **Math → LaTeX inside `\(...\)`** (inline). Never leave raw unicode math
  (² ³ √ ∫ π ∞ → ≤ ∈ × · ⁻) — convert it. Plain prose stays plain.
  Common: `\frac{}{}`, `\sqrt{}`, `\int`, `\sin`, `\log`, `\tan^{-1}`, `\pi`, `\,dx`,
  `\frac{dy}{dx}`, `\hat{i}`, `\vec{a}`, `\in`, `\le`, `\Rightarrow`, `\cup`, `\cap`.
- **Be faithful to the printed question.** Transcribe exactly what is asked, including any
  oddity. If the book prints something that looks WRONG (a stale cross-reference, a
  numbering jump, an impossible value), transcribe it faithfully AND flag it in a
  `"_note"` field — do not silently "correct" the book.
- For solved examples, transcribe the book's solution steps (condensing prose is fine, but
  keep every mathematical step and the final boxed/stated answer). No raw unicode there either.
- **DERIVE the MCQ answer** by actually solving — you are a strong mathematician. Put the
  letter in `answer`. Do NOT guess from the option shape.
- **difficulty**: EASY = one-step direct application; MODERATE = one technique; HARD =
  multi-step / non-obvious / combined methods.
- If a page is illegible or a question is cut off, transcribe what you can and add a
  `"_note"` (extra fields are ignored by the committer).

## Escaping (this has corrupted real batches — read it)
Write the file with the **Write tool**, never through a shell heredoc or `python -c`. A
shell layer eats one backslash, so `\theta` arrives as a TAB character + "heta" and the
row is silently corrupt. In JSON, a LaTeX backslash is written `\\` — so `\(` is `"\\("`.
Never write `\\\\(` (double-escaped): it decodes to a literal backslash and renders as a
stray `\` on the page. The committer REFUSES both, but fix them at the source.

Return ONLY by WRITING the JSON file. Your final message = counts by bucket, plus any
`_note` flags and any content you believe belongs to no band.
