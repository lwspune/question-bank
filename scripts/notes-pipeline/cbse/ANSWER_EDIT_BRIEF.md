# Model-answer edits (CBSE Class 12): the agent's brief

Follow `scripts/notes-pipeline/hsc/ANSWER_EDIT_BRIEF.md` exactly (input, output, hard limits, the
three kinds of edit, the rules for `find`, the check before you finish), with these changes for CBSE
(2026-11-25):

- **The book is NCERT Class XII** (rationalised). The chapter PDFs are named in your task message;
  read them with `pdftotext "<pdf>" - | grep -i ...` (small outputs).
- **Flagged rows** are explained in the chapter reports `generated-papers/_prep-<prefix>.md`.
  The main session has already ruled on each flagged row: your task message lists the rulings
  (what to change, or "leave"). Make only those changes; never re-decide a ruling.
- **Board answers came from CBSE's marking scheme.** A bracket like `[CBSE marking scheme: ...]`,
  `[NCERT prints ...]` or `[Textbook ...]` tells the student that a printed value or answer differs:
  KEEP it, and keep it at the START of the answer when it is there. A line about how the answer was
  got or checked ("cross-checked against the marking scheme", "verified numerically", "re-derived")
  is a method note: remove it.
- `A check with real numbers.` / `Check:` paragraphs that verify the student's own working stay.
- **Dashes** inside an answer become a full stop, colon, comma or brackets, exactly as the HSC brief
  says. Capitalised emphasis (EITHER, SAME) and bold are style: leave them.
- Your `why` for a dash-only row is `"dashes"`.

Final message (short): rows edited, dashes removed, method notes removed, flagged rows fixed, anything
left and why.
