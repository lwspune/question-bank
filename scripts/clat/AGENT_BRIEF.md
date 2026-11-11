# CLAT UG: solve one slice of one paper, blind

You are solving one section-slice of a real CLAT UG paper (Common Law Admission
Test, Consortium of NLUs) and writing the worked solution students will read on
PYQ Vault. The questions are already extracted from the official booklet; you do
NOT transcribe anything. Your output is one data file, not a message: write it,
check it, then reply with a SHORT summary. **Keep tool output small**: never print
a whole payload or a whole file.

Work in `C:\Users\vilas\Downloads\qb-clat` (run every command from there).

## 0. What you may and may not open

- **Yours:** the payload `C:\tmp\PYQPs\CLAT\blind\<year>\<slice>.payload.json`
  (passages, any section directions, questions, options), `scripts/clat/taxonomy.ts`,
  the page images `C:\tmp\PYQPs\CLAT\render\<year>\pNNN.png` (only if a passage
  or question reads oddly and you want to see the printed page), and your output
  file `C:\tmp\PYQPs\CLAT\blind\<year>\<slice>.derived.json`.
- **Never open** `C:\tmp\PYQPs\CLAT\keys`, `C:\tmp\PYQPs\CLAT\src`, anything
  under `scripts/clat/data/`, any other year's or slice's file, or the web for
  this paper or its answer key. The answers come from the Consortium's key later;
  your solve exists to CHECK that key independently, and one look ends that.

## 1. Never copy a passage out

Many passages are extracts from published books and articles. **Never write a
passage, or more than about 12 consecutive words of it, into any file or reply.**
Refer to it ("the second paragraph says the movement was withdrawn after
Chauri Chaura") instead of quoting it. Long verbatim copying gets your output
stopped, and the whole batch is lost.

## 2. Solve (C:\tmp\PYQPs\CLAT\blind\<year>\<slice>.derived.json)

```json
{
  "derivedBy": "short description of you",
  "answers": [
    {
      "ref": "53",
      "label": "B",
      "working": "the student-facing solution (below)",
      "difficulty": "Moderate",
      "confidence": "HIGH",
      "chapter": "Law of Contract",
      "subtopic": "Validity and consent",
      "flag": "optional: anything wrong or doubtful in the QUESTION",
      "textFlag": "optional: a word or phrase that looks misread in the extracted text"
    }
  ]
}
```

- One entry per question in your payload, same `ref`. Options are A, B, C, D in
  printed order.
- **Write the file as you go**: after every passage's questions, rewrite the whole
  file with everything so far (Write tool). Never hold a whole slice in your head.
- `chapter` and `subtopic`: copied VERBATIM from `taxonomy.ts`, under the subject
  named by the question's `section`. Pick the one the question mostly tests.
- **Solve as printed.** If a question is defective (no option right, two right,
  a missing fact), give the most defensible answer, say exactly what is wrong in
  `flag`, use `MEDIUM` or `LOW` confidence, and never repair it silently.

How CLAT expects each section to be read:

- **English Language:** answer from the passage. "Inferred" means it follows from
  what the passage says, not from outside knowledge.
- **Current Affairs including General Knowledge:** the passage sets the topic but
  the question usually needs a fact beyond it. Use what was true when the paper
  was SAT: CLAT 2026 was sat on 7 Dec 2025, 2025 on 1 Dec 2024, 2024 on 3 Dec 2023,
  2023 on 18 Dec 2022, 2022 on 19 Jun 2022. If a fact is one you are not sure of,
  say so in `flag` and use `MEDIUM`.
- **Legal Reasoning:** apply ONLY the principles and facts the passage gives, even
  where real law differs; that is the instruction CLAT prints. Name the principle
  and walk the facts through it. Where real law would differ, you may say so in
  one sentence, but the answer follows the passage.
- **Logical Reasoning:** arguments (assumption, inference, strengthen/weaken,
  flaw) and puzzles (arrangements, ordering). For a puzzle, set out the deduction
  step by step, a small table if it helps.
- **Quantitative Techniques:** the data comes from a passage; show every
  calculation.

`difficulty`: `Easy` (one step or one fact), `Moderate` (two linked steps, or a
fact most candidates half-know), `Hard` (long working or an idea most would miss).
`confidence`: `HIGH`, `MEDIUM` or `LOW`.

### `working` is the published solution

Students read it under the question. Plain English a Class 12 student reads
easily. Explain why the right option is right and, where it helps, why the
tempting one is wrong. End with the option, e.g. `So the answer is option (B).`
Usually 3 to 8 sentences.

- Paragraphs separated by a blank line (`\n\n` inside the JSON string). `**bold**`
  for a key term. A table as a GFM pipe table (header row, then `|---|---|`).
- Maths in `\( ... \)` only: no bare unicode maths signs (`× ÷ √ ≤ ≥ ≠`); write
  `\(1{,}700 \times 30\% = 510\)` or plain words. Plain `+`, `-`, `=` and `%`
  in simple arithmetic are fine. In JSON a backslash is doubled: `"\\(x\\)"`.
- Name options by LETTER: `option (C)`, never `option 3`.
- **No em dashes** (—) anywhere, and no " – " or " -- ": use a full stop, colon,
  comma or brackets.
- Never mention a key, "blind", "payload", the Consortium's answer, or yourself.
- **Write files with the Write tool, never a shell heredoc** (the shell eats
  backslashes). Line breaks in JSON strings are `\n`, never a literal backslash-n
  in the final text.

### `textFlag`

The text was extracted by a program from the official booklet (the 2022 booklet
by OCR, so expect an occasional misread word there). If a word or phrase looks
wrong (a garbled word, a missing word, lower case where a name should be capital,
a sentence that does not join up), put it in `textFlag` with the passage id or
question and the wrong text, and what the page shows if you looked:
`"P04: 'ansensitizing' looks merged; page 13 shows 'an inspiring'"`. Solve the
question as it must have been printed.

## 3. Check and report

Run `npx tsx scripts/clat/validate.ts <year> <slice>` and fix everything it
reports until its last line says OK (it checks every row, the taxonomy and the
style; it never shows answers).

Reply in at most ~15 lines: validate's last line, every non-HIGH answer and why,
every `flag`, every `textFlag`.
