# NCERT Integrals — vision transcription brief (per-exercise agent)

You are transcribing ONE exercise band of the NCERT Class 12 Maths chapter **Integrals**
from rendered page images into a JSON file the ingestion pipeline commits. The page
images are at `scripts/ncert/out/integrals/p-NN.png` (NN = 0-based page index, zero-padded).

**READ the images with the Read tool.** The PDF text layer flattens all 2-D math into
garbage, so you MUST read the rendered pages visually and transcribe the math to LaTeX.

## What to transcribe from YOUR band

Each `§7.k` section is: some **worked Examples** (with the book's full solution) → then
**EXERCISE 7.k** (numbered questions, the last 1–2 being "Choose the correct answer" MCQs).
Transcribe BOTH the solved examples and the exercise questions **for your exercise only**.
At a page boundary, ignore content that belongs to an adjacent exercise (you'll be told
your exercise number + page range; another agent owns the neighbours).

## Output — a JSON array of question objects → `scripts/ncert/data/integrals.<sec>.json`

Each object (the `SBQuestion` shape):

```jsonc
{
  "ref": "Ex 7.1 Q6",          // UNIQUE provenance ref — see the ref convention below
  "bucket": "exercise-subjective", // "solved" | "exercise-mcq" | "exercise-subjective"
  "format": "subjective",       // "subjective" (no options) | "mcq" (exactly A,B,C,D)
  "subtopic": "<your subtopic>",// the ONE canonical subtopic you're given (verbatim)
  "difficulty": "EASY",         // EASY | MODERATE | HARD (your estimate)
  "stem": "Find \\(\\int (4e^{3x}+1)\\,dx\\).",  // question text, math in \\(...\\)
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
- solved worked Example N in the §7.k band → `"7.k Eg.N"`   e.g. `"7.1 Eg.1"`, `"7.5 Eg.8"`
  (N = the book's printed Example number — NCERT numbers Examples continuously across the chapter)
- exercise question n → `"Ex 7.k Q<n>"`  e.g. `"Ex 7.1 Q6"`
- exercise sub-item (i)/(ii)/… → `"Ex 7.k Q<n>(iii)"` (see set-grouping below)
- an exercise MCQ is just a numbered exercise question → `"Ex 7.k Q<n>"` with `bucket:"exercise-mcq"`, `format:"mcq"`
- (Miscellaneous agent only) misc solved example → `"Misc Eg.N"`; misc question → `"Misc Q<n>"`

### bucket / format rules
- Worked **Example** with the book's solution → `bucket:"solved"`, `format:"subjective"`, include `solution`.
- Exercise question, free-response ("find the integral", "evaluate") → `bucket:"exercise-subjective"`, `format:"subjective"`, NO `solution`.
- Exercise "Choose the correct answer" MCQ → `bucket:"exercise-mcq"`, `format:"mcq"`, 4 options + derived `answer`, NO `solution`.

### Set-grouping (only if a single numbered question has sub-items i)/ii)/iii))
Most NCERT exercise questions are standalone. If one question groups sub-items under a
shared instruction, emit ONE row per sub-item, all sharing:
`"context": "<the shared instruction>"`, `"setLabel": "Ex 7.k Q<n>"`, and refs
`"Ex 7.k Q<n>(i)"`, `"Ex 7.k Q<n>(ii)"`, …. Otherwise omit `context`/`setLabel`.

## Transcription rules
- **Math → LaTeX inside `\\(...\\)`** (inline). Integrals `\\int`, fractions `\\frac{}{}`,
  `\\sqrt{}`, `e^{2x}`, `\\sin`, `\\log`, `\\tan^{-1}`, `\\,dx`, limits `\\int_0^1`. Use `\\pi`.
  Never leave raw unicode math (² ³ √ ∫ π ∞ →) — convert to LaTeX. Plain prose stays plain.
- Be **faithful** to the printed question. Transcribe exactly what's asked. For solved
  examples, transcribe the book's solution steps (condensed prose is fine but keep the math
  and the final `+ C` / boxed answer). No raw unicode in the solution either.
- **DERIVE the MCQ answer** by actually solving — you're a strong mathematician. Put the letter in `answer`.
- **difficulty**: EASY = one-step standard formula; MODERATE = one technique (substitution,
  by-parts, partial fractions); HARD = multi-step / non-obvious substitution / combined methods.
- If a page is illegible or a question is cut off, transcribe what you can and add a
  `"_note"` field flagging it (extra fields are ignored by the committer).
- Return ONLY by WRITING the JSON file. Your final message = a 2-line summary (counts by bucket).
