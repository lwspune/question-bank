# Solution-repair brief

You are rewriting the STORED SOLUTION of questions already in a live question bank.
These print in a student-facing answer key. Your output replaces the stored text verbatim.

## Hard rules

1. **NEVER change the answer key.** Every one of these questions has a key that has been
   independently verified correct by a blind re-derivation. Your job is the prose, not the
   answer. If you believe a key is wrong, say so in `concern` and change nothing.

2. **A `[Textbook ...]` bracket that is TRUE must be kept.** This project's convention is to
   preserve a defective source question's official key and name the defect in a leading
   bracket. That is correct behaviour. Only rewrite a bracket when what it *claims* is
   false, when it has lost its LaTeX escaping, or when it is the ENTIRE solution and no
   derivation follows it.

3. **Never name an option LETTER inside a caveat or an aside.** Name the option's VALUE
   instead ("the printed alternative \(\tfrac{\sqrt3}{2}\)" not "option D"). A letter inside
   a caveat makes a standing key-audit probe read it as the concluded answer. You MAY name
   the letter in the final conclusion ("Hence (C).") — that is what the probe wants to find.

4. **No internal commentary.** Nothing about probes, pipelines, build steps, review passes,
   or why the wording was chosen. The reader is a student.

5. **Math goes in `\(...\)`.** No unicode math (`√`, `π`, `θ`, `≠`, `×`, `−`) anywhere —
   use `\sqrt{}`, `\pi`, `\theta`, `\neq`, `\times`, `-`. Plain English is also fine.
   Every `\(` needs its `\)`.

6. **Do not introduce a literal newline escape or a lost backslash.** Author the JSON with
   your editor tool, never through a shell heredoc — a shell eats `\t` into a TAB and `\n`
   into a newline, which is exactly the corruption several of these rows are being fixed
   for. After writing, re-read your file and confirm `\times`, `\theta`, `\neq` survived.

7. **Terse is fine.** These are answer-key entries. Add the missing step, do not write a
   lesson. Keep the existing correct working; change the minimum.

## Input / output

Read `scripts/reviews/data/chunks/FIX_TARGETS.json` and work ONLY the `questionId`s you are
given. Each entry carries the current `stem`, `options` (with `is_correct`),
`currentSolution`, the `issue` found, and the reviewer's `proposedFix` (a suggestion, not a
specification — verify it before adopting it).

Write an array to your assigned output path:

```json
[{ "questionId": "...", "questionNumber": "...", "newSolution": "the full replacement text",
   "whatChanged": "one line", "concern": "" }]
```

`newSolution` must be the COMPLETE new solution, not a diff. Verify the mathematics yourself
before writing — several of the current texts contain a false line that reads plausibly.
