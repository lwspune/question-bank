# UP Board PYQ: solving brief (pass A and pass B)

UP Board publishes NO answer key and NO marking scheme. So every paper is
solved twice by agents that never see each other's work, and the main session
settles every MCQ where they disagree. You are ONE of the two passes; your
prompt says which. Keep your tool output small.

Input: `scripts/up-board/data/<paperId>.questions.json` (English + Hindi of
every question, no answers). The page images are in
`scripts/up-board/out/<paperId>/pNN.png` if a figure matters; the question's
`figure.page` names the page.

**Never open `scripts/up-board/derived/` except to write your own file.** Seeing
the other pass's answers would make the check worthless. Never touch git, the
database, or any file other than your own output. Write with the Write tool,
never a shell heredoc.

## Pass B (blind letters)

For every MCQ (`format: "mcq"`), work it out from the English and give the
letter. Write `scripts/up-board/derived/<paperId>.b.json`:

```json
{ "paper": "2025-822-BW", "answers": { "Q1": "B", "Q2": "B" }, "doubts": { "Q7": "one sentence" } }
```

`doubts` lists only MCQs you are not sure of, with why (two options look
right, none matches, the print looks wrong). Report: MCQ count, how many in
`doubts`, nothing else.

## Pass A (letters + solutions in both languages)

1. Every MCQ: the letter, worked out yourself, as in pass B.
2. Every row (MCQ and written): a solution in ENGLISH and in HINDI.

Write `scripts/up-board/derived/<paperId>.a.json`:

```json
{
  "paper": "2025-822-BW",
  "answers": { "Q2": "B" },
  "solutions": {
    "Q2": {
      "en": "A die has six faces, and three of them (1, 3, 5) are odd. So the probability is \\(\\frac{3}{6} = \\frac{1}{2}\\), which is the choice \\(\\frac{1}{2}\\).",
      "hi": "पासे के छह फलक होते हैं, जिनमें से तीन (1, 3, 5) विषम हैं। अतः प्रायिकता \\(\\frac{3}{6} = \\frac{1}{2}\\) है, जो विकल्प \\(\\frac{1}{2}\\) है।"
    }
  },
  "doubts": { "Q7": "one sentence" }
}
```

### What a good solution looks like

- **The answer a good student would write in the board exam.** Effort matches
  the marks: a 1-mark MCQ wants one to three sentences; a 2-mark part the key
  steps; a 4-6 mark question the full working, every step a board examiner
  looks for (formula, substitution, result with unit).
- **Prose, not a bare chain.** One sentence of orientation, then the working.
- **An MCQ names the option's TEXT, not its letter**: "which is the choice
  \\(\\frac{1}{2}\\)", never "so (B)". Never put a bare capital A-D where it
  could be read as an option label: name a matrix "the matrix B", a point "the
  point A(2, 3)", a distractor by its value.
- **Proofs** are written out in full. **Constructions** give the numbered steps
  of construction (and the justification if asked); no drawing.
- **Questions with sub-items** `(i)`, `(ii)` answer each, labelled.
- **One voice**: the answer itself. No "I think", "recall", "my answer", no
  notes about how you solved it, no "runner-up". Doubts go in `doubts`, never in
  a solution.
- **No em dash** (the long dash) anywhere in what you write; use a full stop,
  colon, comma or brackets.
- **The Hindi solution says the same thing as the English**, in natural
  textbook Hindi, using the paper's own Hindi terms (प्रायिकता, अपरिमेय,
  त्रिज्या, सेमी ...). Maths and numbers identical to the English. Not a word
  for word translation of English idiom; how a UP Board Hindi-medium teacher
  would write it.
- Maths in `\( ... \)` in both languages, balanced. Tables as GFM pipe tables
  with a `|---|` row. A line break is a real newline.
- Do NOT add "solution by PYQ Vault" or any note about the missing key: the
  merge step adds that line itself.

If the question as printed is defective (no option correct, a misprint that
changes the answer), solve what is printed, and put one sentence in `doubts`.
Never change the question.

**When the Hindi and English print different questions** (the row's `_flag`
says so, e.g. the English drops a word the Hindi keeps): open BOTH solutions
with a note in that language, `**Note:** ...` / `**टिप्पणी:** ...`, saying
in one sentence what each print says and which one the working follows (the
one that has an answer, normally the complete one). Then solve that version.
Put one sentence in `doubts` too, so the main session sees it.

Report (at most 10 lines): MCQ count, rows solved, every `doubts` entry.

## Science (824) and the Class 12 sciences

- Answers follow the NCERT book of that class. A written answer is what a good
  student writes for those marks: definitions, reasons, balanced chemical
  equations (`\(\mathrm{...}\)`), numerical working with units.
- A "draw a labelled diagram" part: no picture can be stored, so say what the
  diagram shows and list its labels.
- Hindi solutions use the standard Hindi-medium textbook terms (अपवर्तन,
  प्रतिरोध, संक्षारण, प्रकाश-संश्लेषण ...), not transliterated English.
