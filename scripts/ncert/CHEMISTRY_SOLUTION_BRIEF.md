# NCERT Chemistry (CBSE Class 11 + 12) — solution authoring brief (per-subtopic agent)

**Read `PHYSICS_SOLUTION_BRIEF.md` first and follow it.** Its rules on UNITS, SIGNIFICANT
FIGURES, stating the final answer LAST, conceptual questions getting a real answer, the
(id, ref) PAIRING gate, and ESCAPING all apply here unchanged and are not repeated. Nothing
in that brief is false for Chemistry — unlike the *transcription* brief, where one section
is. This file is the delta only.

## You are authoring TWO streams, and they are different kinds of question

Your rows come from `<chapterId>.tosolve.json` and carry refs of two shapes:

- **`Ex 1.n`** — end-of-chapter Exercises. Mostly numerical or multi-part reasoning.
- **`Intext 1.n`** — Intext Questions, printed mid-chapter. Usually SHORTER and tied to the
  one section they follow, often a single calculation or a one-idea explanation.

Both get a full model solution. Do not treat an Intext question as lesser: it is frequently
the more heavily used of the two in CBSE prep, and it is the only worked answer a student
will get for it.

**A ref is `Eg 1.n`, `Intext 1.n` or `Ex 1.n` — copy it VERBATIM.** The book numbers Intext
and Exercise questions identically (both 1.1, 1.2, …), so dropping the prefix makes the row
ambiguous between two different questions.

## Do NOT go looking for the book's answers

This chapter carries a printed key in two places — an end-of-book section for the Exercises
and an "Answers to Some Intext Questions" block on the chapter's last page. **Do not open
either.** The whole value of this pass is an INDEPENDENT derivation for the answer-key
cross-check to adjudicate; an answer bent toward the book cannot disagree with it, so the
gate it feeds learns nothing. If you think the book is wrong, that is not your call — put it
in a `_note` and let the cross-check decide.

## Chemistry-specific rules

- **Every formula is math.** `\(\text{H}_2\text{SO}_4\)`, `\(\text{Ca}^{2+}\)`,
  `\(\Delta T_f\)`, `\(K_b\)`. Never a bare `H2SO4`, never a baseline charge.
- **State the relation you are using by name before substituting** — Raoult's law, Henry's
  law, the van't Hoff factor, molality vs molarity. A Chemistry answer that opens with a
  bare number substitution is unusable as a model answer.
- **Molar masses**: state the value you used and how you got it (sum of atomic masses), to
  the precision the question's data justifies. Most disagreements with the printed key on
  this source trace to a different molar mass or a different water density, not to method.
- **Watch molality vs molarity.** They differ by the solvent-vs-solution basis and by
  density; the single commonest error in this chapter is using one where the other belongs.
  Show the conversion explicitly whenever a question mixes them.
- **A "state with reasons" or "explain why" question gets the actual chemical reason** —
  intermolecular forces, H-bonding, ion-dipole interaction, deviation from Raoult's law —
  not a restatement of the question.
