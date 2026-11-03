# Drafting one UCEED paper (brief for a helper)

You draft ONE UCEED Part A paper (IIT Bombay's design entrance) for a question bank: a clean
transcription of every question, your own BLIND answer, a classification and a short worked
solution. The main session then compares your answers with IIT Bombay's key, settles every
disagreement and writes to the bank. You never write to the bank or touch git.

## Read ONLY these

- `C:/tmp/PYQPs/UCEED/work/<year>/draft.json`: the machine draft. Per question: `n`, `page`,
  `text` (from the PDF's text layer), `options` (A-D lines it found, may be empty or wrong),
  `figure` (file name or null).
- `C:/tmp/PYQPs/UCEED/figures/<year>/Q<nn>.png`: each question's figure.
- `C:/tmp/PYQPs/UCEED/work/<year>/pages/p<NN>.png`: every page rendered, to check the draft.

**Never open** `C:/tmp/PYQPs/UCEED/src/`, any file with "key" in its name, anything under
`scripts/uceed/data/`, any other year's folders, or the web. The answer key must stay unseen;
your blind answers are how the main session measures and catches errors.

## The paper's sections

Given in your task: which question numbers are NAT (a number), MSQ (one OR MORE of A-D) and
MCQ (exactly one of A-D). Part B (drawing) is out of scope: stop at the last Part A question.

## Transcribe

Check every question's draft against its page image and fix it:
- Stray headings, instructions, footers or the next section's preamble that ran into a stem or
  an option: remove them.
- Options the draft missed or split wrongly: write all four, labels A-D.
- Options drawn INSIDE the figure (picture panels labelled A-D): write each option's text as
  `[figure]`.
- A figure the draft attached to the wrong question, or missing: say so in `notes`.
- Tables: a GFM pipe table with a `|---|` separator row. Poems and lists: real line breaks.
- Degree signs: `60°` (the PDF often gives `60o`). Keep the paper's own wording and dashes.
- A passage shared by several questions: put it in each question's `context`.

## Solve, blind

From the figure and text alone. Count systematically and recount once. Do every question.
Mark `confidence` honestly: low means you could not be sure (a dense count, a fine detail).

## Write

`C:/tmp/PYQPs/UCEED/blind/<year>/derived.json`, rewritten every ~10 questions so partial work
survives:

```json
{"year": 2025, "questions": [
  {"n": 1, "type": "NAT", "text": "...", "context": null,
   "options": [], "figure": true,
   "answer": "14", "confidence": "high", "difficulty": "Moderate",
   "chapter": "Counting in Compositions", "subtopic": "Counting shapes",
   "solution": "...", "notes": null}
]}
```

- `answer`: NAT a plain number; MCQ one letter; MSQ letters like "A, C".
- `difficulty`: Easy | Moderate | Hard, for a Class 12 student.
- `chapter`: ONE of these (subject in brackets). Reuse a 2026 `subtopic` where it fits; else a
  short new one.
  - [Visualization and Spatial Reasoning] Paper Folding and Cutting · Mental Rotation and Views ·
    Pattern and Figure Completion · Puzzles and Assembly · Mazes and Paths
  - [Practical and Scientific Knowledge] Mechanisms and Machines · Light, Colour and Optics ·
    Photography and Cameras · Everyday Objects and Systems
  - [Observation and Design Sensitivity] Counting in Compositions · Odd One Out and
    Classification · Typography and Lettering · Visual Detail
  - [Environment and Society] Indian Art, Craft and Culture · Art, Design and Architecture ·
    Brands, Logos and Symbols · Civic and General Awareness
  - [Analytical and Logical Reasoning] Quantitative Reasoning · Codes and Series · Logical Deduction
  - [Language] Reading and Interpretation · Grammar and Vocabulary
  - [Creativity] Analogies and Visual Metaphors
  - 2026 subtopics: Counting shapes · Counting letters · Counting objects · Area and geometry ·
    Ratio and proportion · Volume and capacity · Orthographic views · Rotational symmetry ·
    Rotation and reassembly · Odd one out · Comparing details · Matching a part to the whole ·
    Matching pairs · Sequencing frames · Letters in a composition · Lettering tools ·
    Identifying fonts · Product usability · Household systems · Assembling pieces · Tiling with
    shapes · Completing a shape · Cutting and folding · Folding transparent sheets · Number
    patterns · Letter codes · Transforming a pattern · Figure series · Gears and pulleys · Motion
    and animation · Linkages · Levers · Textiles and crafts · Painting traditions · Metal crafts ·
    Artists and artworks · Film and awards · Cameras and equipment · Aperture and depth of field ·
    Composition · Cities and heritage · Signs and road rules · Colour and light · Light and
    shadow · Refraction · Text and image · Logos · Tracing paths
- `solution`: 2-5 plain sentences a 17-year-old can follow, from the figure's own labels. For a
  general-awareness question, the fact and one line on why each wrong option is wrong. **No em
  dashes or spaced dashes** (full stops, commas, colons instead); no unicode maths, use words or
  LaTeX in `\( \)` only when needed. Never mention an answer key. For a dense count, give the
  method and your count; do not invent a tally to reach a round number.
- `notes`: anything the main session must know (a defect as printed, an ambiguous figure, a
  figure on the wrong question), else null.

Keep tool output small: never print the draft or long files back; open figures one at a time.
When done, reply with ONLY: how many questions, the low-confidence numbers, and any `notes`.
