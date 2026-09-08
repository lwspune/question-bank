# NCERT Chemistry (CBSE Class 11 + 12) — vision transcription brief (per-band agent)

**Read `PHYSICS_TRANSCRIPTION_BRIEF.md` first.** Everything there applies — the output
schema, the `bucket`/`format` rules, the `_figure` convention, the transcription rules and
especially the ESCAPING section — EXCEPT where this file overrides it. This document is
short on purpose: it is the delta, not a rewrite.

## ⚠ ONE SECTION OF THE PHYSICS BRIEF IS FALSE HERE — read this before anything else

The Physics brief's **"THE CHAPTER NUMBER IS NOT THE FILE NUMBER"** section does NOT apply
to Chemistry. **Chemistry has NO offset**: its files are already numbered by book chapter
(Class 11 Part_2 runs `07.`-`09.`, Class 12 Part_2 runs `06.`-`10.`). Applying the Physics
`+7`/`+8` would mis-ref every row in the chapter. Your task message gives you the chapter
number; the running head, section headings and figure captions on the page confirm it. If
they disagree with your task message, STOP and report rather than guessing.

## THE THING THAT WILL BITE YOU: two streams share one numbering namespace

NCERT Chemistry prints **three** question streams, and Physics only has two:

| Stream | Printed as | Has a printed solution? | Ref you write |
|---|---|---|---|
| Worked example | `Example 1.3` (Cl-12) / `Problem 1.3` (Cl-11) | **Yes** — transcribe it | `Eg 1.3` |
| Intext question | under an **`Intext Questions`** heading, numbered `1.1, 1.2, …` | No | `Intext 1.1` |
| Exercise | under the terminal **`Exercises`** heading, numbered `1.1, 1.2, …` | No | `Ex 1.1` |

**Intext Questions and Exercises BOTH restart at `<chapter>.1`.** A bare "1.5" names two
different questions in the same chapter. The stream prefix is the ONLY thing keeping them
apart, and it routes `/board` section structure — so getting it wrong collides rows and
points the answer-key cross-check at the wrong stream.

Decide the stream by **which heading the question sits under on the page**, never by its
number. Intext blocks are interspersed through the teaching prose; the Exercises block is
terminal and is the last thing before the chapter ends.

- Worked example → `bucket:"solved"`, include the book's printed `solution`.
- Intext question → `bucket:"exercise-subjective"`, **no** `solution`.
- Exercise → `bucket:"exercise-subjective"` (or `exercise-mcq` if it genuinely is one),
  **no** `solution`.

## Chemistry-specific transcription notes

- **Formulae are math.** Write them inside `\(...\)` with proper sub/superscripts:
  `\(\text{H}_2\text{SO}_4\)`, `\(\text{Ca}^{2+}\)`, `\(\text{CH}_3\text{COOH}\)`. Never
  bare `H2SO4`, never a baseline `2+`.
- **Reaction arrows** are `\rightarrow` / `\rightleftharpoons`, inside a math zone. The
  book's arrow does not survive the text layer, so read it off the page.
- **Never trust the text layer for a Greek letter.** Measured: the delta glyph extracts as
  the Latin letter `D` in Class 12 (so `\(\Delta_r G\)` arrives as a plausible-looking
  `DrG`) and vanishes entirely in Class 11. The radical sign occurs ZERO times in either
  book. **Transcribe from the PAGE IMAGE, always.**
- **…and the glyph fault reaches the RENDERED PAGE too, not just the text layer.** Found on
  Cl-12 ch1 `Eg 1.9`, where the printed image itself sets the delta as a Latin `Ä`
  ("ÄT_f = 1.86 K kg mol⁻¹"). Every other delta in that chapter renders correctly, so it is
  a typesetting fault in the book, not a different symbol. Transcribe the INTENDED symbol
  (`\Delta T_f`) and flag it in a `_note`. Reading the image is necessary but not by itself
  sufficient — a glyph that is wrong on the page needs chemistry to disambiguate.
- **Class 12 pages are painted ~5x** (a drop-shadow effect). If you look at the text layer
  at all, every heading appears five times in a row. That is the PDF, not five headings.
- A structure diagram, reaction scheme or graph a question depends on is a `_figure` —
  same convention as the Physics brief.

## Your final message

Report, per the Physics brief, plus: **the count in each of the three streams separately**
(worked / intext / exercise), and the ref of the first and last item of each stream in your
band. Report anything you saw on a page you do NOT own — a stranded example or a block that
continues past your last page is invisible to every downstream gate, and the maintainer
cannot see it either.
