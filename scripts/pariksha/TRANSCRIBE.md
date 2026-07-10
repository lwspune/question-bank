# Pariksha transcription task (shared agent spec)

You transcribe ONE ParikshaGruh coaching test's images into structured JSON. Accuracy is
everything — this feeds a live question bank. Your prompt gives you: `<testId>`,
`<subjects>` (one, or the four mock sections), `<questionCount>`, and `<keyed>` (true =
an official answer key exists and will be overlaid later; false = you must DERIVE answers).

## 1. Read the images
Read EVERY `p*.png` under `C:/Users/vilas/Downloads/Question_Bank/scripts/pariksha/out/<testId>/`
in filename order (p001_L, p001_R, p002_L, p002_R, …). Each is a logical print-page (the
two-up PDF was split into Left then Right halves). The first image has a school logo/header
— skip it. Questions are numbered `1 )` .. `<questionCount> )` continuously.

## 2. Read the chapter catalog
Read `C:/Users/vilas/Downloads/Question_Bank/scripts/neet/config.ts` and use the EXACT
chapter strings from `NEET_CHAPTERS` for your subject(s). Every question's `chapter` MUST
be one of those exact strings.

## 3. Write the transcription
Write a JSON ARRAY (one object per question) to
`C:/Users/vilas/Downloads/Question_Bank/scripts/pariksha/data/<testId>.<subject>.json`
(lowercase subject; a single-subject test = one file; a 4-section mock = one file per
subject, each holding that section's questions).

Each object:
```
{
  "number": 1,
  "subject": "Physics",                 // one of Physics|Chemistry|Botany|Zoology
  "chapter": "<EXACT NEET_CHAPTERS string>",
  "subtopic": "<short free-form topic>",
  "stem": "<verbatim text; math in LaTeX \\( \\)>",
  "options": ["<a>","<b>","<c>","<d>"], // exactly 4, printed order a→d
  "answer": "<A|B|C|D>",                 // see rule 5
  "difficulty": "EASY|MODERATE|HARD",
  "hasFigure": true|false,
  "figureImg": "p003_L",                 // ONLY if hasFigure — the page-image the figure is on
  "figureAnchors": {                     // ONLY if hasFigure — snapCrop anchors, see rule 6
    "col": [0.10, 0.60],                 //   rough L/R column band the figure sits in (wide is fine)
    "top": 0.11,                         //   a y-fraction in the WHITESPACE GAP just ABOVE the figure
    "bottom": 0.24,                      //   a y-fraction in the WHITESPACE GAP just BELOW the figure
    "answerY": 0.285                     //   y-fraction where the 'Answer :' line begins (hard ceiling)
  },
  "confidence": "HIGH|MED|LOW",
  "reasoning": "<only if confidence != HIGH or a source quirk>"
}
```

## Rules
1. **Verbatim.** Do not solve, rephrase, or fix. Copy exact wording + exact options. Preserve source typos (note them in `reasoning`).
2. **Math → LaTeX in `\\( \\)`.** e.g. `\\( \\rho \\)`, `\\( 900\\,\\text{kg/m}^3 \\)`, `\\( \\frac{M}{\\sigma-\\rho} \\)`, `\\( \\sqrt{r_1^2+r_2^2} \\)`. NEVER leave bare unicode math (² ³ ρ σ × ÷ → √ ≈ ⁻) in any field — always wrap in `\\( \\)`. Keep `\\( \\)` balanced in every field.
3. **Options** in printed order (a→index0 … d→index3). Exactly 4, all non-empty. If a question prints 5 options (a–e) or the options themselves are figures/graphs, set `confidence:"MED"` and explain in `reasoning`; still fill 4 option strings (for figure-options use the labels `(a)`,`(b)`,`(c)`,`(d)`).
4. **Chapter** = EXACT string from NEET_CHAPTERS for the question's subject.
5. **Answer:**
   - `<keyed>=true`: still record the printed `Answer : X` letter you see (it will be re-overlaid from the authoritative text key — just give your best read).
   - `<keyed>=false` (no key in the paper): DERIVE the correct answer yourself, set `confidence:"MED"` (or LOW if unsure), and explain briefly in `reasoning`. These stay PRIVATE for human review.
6. **Figures.** If a question has a diagram/graph/apparatus, set `hasFigure:true`, still transcribe the stem + all option text you can read, and add `figureImg` + `figureAnchors` (these feed snapCrop, which INK-BOUNDS the actual figure — so your anchors are FORGIVING, they don't need to be tight):
   - `figureImg`: the page-image basename the figure sits on (e.g. `"p003_L"`).
   - `figureAnchors.col`: `[c0,c1]` = the rough left/right column band (fractions of image WIDTH) the figure lies in — err WIDE.
   - `figureAnchors.top`: a y-fraction landing in the WHITESPACE GAP just ABOVE the figure (below the stem). Must be blank space, not on text/ink.
   - `figureAnchors.bottom`: a y-fraction in the WHITESPACE GAP just BELOW the figure (above the options / the `Answer :` line). For a question whose 4 options ARE graphs, put `bottom` below the option-graphs (so they're included) but above the `Answer :` line.
   - `figureAnchors.answerY`: the y-fraction where the `Answer :` line begins — the HARD leak ceiling (`bottom` must be ≤ `answerY`). Get this one right; the crop can never dip past it.
   All four are fractions (0..1) of the named page-image. snapCrop flags anchors that land on ink, so place `top`/`bottom` in genuine gaps.
7. **Tables / match-the-columns:** render as a GFM pipe-table inside `stem` (header row + `|---|---|` separator + data rows).
8. **Coverage:** exactly `<questionCount>` objects (per subject for a mock), numbered contiguously, none missing/duplicated.

Before writing: verify every option non-empty, every `\\( \\)` balanced, count == expected.
After writing, report: count, figures (list numbers), and any confidence!=HIGH with why.
