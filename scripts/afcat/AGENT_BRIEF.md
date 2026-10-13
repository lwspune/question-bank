# AFCAT blind-verification agent brief

The contract every AFCAT verification agent works to. Your dispatch names the
pass you are running (PASS 1, PASS 2 or TWIN REPAIR) and the packet file.

---

## Why this exists

The AFCAT practice sources are untrustworthy in three different ways:

- **LWS quizzes (Group A):** the answer keys were written by an AI. One key
  contains the words "Actually: Let me recalculate"; the Mixtures key disagrees
  with its own options on 13 of 30 rows.
- **"Errorless" sheets (Group B):** key letters only, no solutions, and many
  questions look machine-generated (some are badly posed).
- **Published books (Group C):** a printed key with the usual book error rate.

So every key is re-derived from scratch by someone who cannot see it. Your
derivation is **evidence for a human adjudicator**. It is never applied
automatically.

## Blindness rules (every pass except TWIN REPAIR)

The packet gives you the stem and four options and nothing else. The key, the
source's worked solution and the extraction notes are withheld on purpose.

**Do not go looking for them.** Do not open anything under `C:\Vilas\`,
`scripts/afcat/data/`, other files in `scripts/afcat/out/`, or the database. If
you see a key anyway, ignore it and derive your own answer. A contaminated pass
is worse than no pass, because it looks like corroboration.

**Never bend your answer toward what you think the key says.** If you believe
you know the key and your derivation disagrees, write YOUR conclusion and say
so in the note. An answer bent toward the source cannot disagree with it, so
the check would learn nothing.

## Rigour

These are arithmetic questions: percentages, ratios, work, speed, interest.
They are easy to get wrong by misreading, not by lacking technique. So:

- **Read the stem twice.** "How many days will the work be completed" (total
  time) is not "how many days will B take" (B's share). This exact confusion
  sits in the Time and Work key.
- **Check by substituting back.** Put your answer into the stem's conditions
  and confirm every one holds. Say in the note that you did.
- **Compute exactly.** Keep fractions; compare a decimal option only at the
  end (120/7 = 17.142..., so "17.14" matches).
- Do not pattern-match to a familiar textbook answer.

## The TWIN check

Before answering, check whether **two or more options are EQUAL in value**
(`1/5` and `2/10`, `0.25` and `1/4`, `Rs. 1,200` and `Rs. 1200`). If so, still
give the letter you would pick, but START the note with `TWIN: A=C`, naming
the equal letters. When the keyed option and yours are the same value, the key
is correct and the option text needs repair, not the key. Without the flag, a
correct key gets overwritten.

If two options are both genuinely correct answers (not equal values, but both
right), say so in the note and name them.

## `X`: no option is right, or the stem is broken

Return `"derived": "X"` when no option equals your answer, or the stem is
impossible, self-contradictory or ambiguous. The note MUST then give your
computed value, or say exactly why the question cannot be answered, so a human
can repair it.

---

## PASS 1: derive, and author the student-facing fields

Packet: `out/<chapter>/verify-NN-P.json`, shape
`{chapter, subtopics: [...], questions: [{id, stem, options: {A,B,C,D}}]}`.

Write a JSON **array** to `out/<chapter>/derived-NN-P.json` (same NN-P as the
packet), one object per question in the packet, in packet order:

```json
{
  "id": "01-4",
  "derived": "D",
  "value": "19 days in total (A: 3 days, B: 16 days)",
  "confidence": "high",
  "note": "checked: 3/15 + 16/20 = 1",
  "subtopic": "Partial Work, Joining and Leaving",
  "difficulty": "MODERATE",
  "solution": "In 3 days A does \\(\\frac{3}{15} = \\frac{1}{5}\\) of the work, leaving \\(\\frac{4}{5}\\). B alone needs \\(\\frac{4}{5} \\times 20 = 16\\) days for it. The work is finished in \\(3 + 16 = 19\\) days."
}
```

- `derived`: A-D, or X (see above).
- `value`: what YOU computed, in plain words, independent of the options.
- `confidence`: high / medium / low.
- `note`: under ~15 words, unless explaining an X or a TWIN.
- `subtopic`: **exactly one string from the packet's `subtopics` list.** If
  none fits, use the closest and say `SUBTOPIC?` in the note.
- `difficulty`: `EASY` (one step, a formula applied directly), `MODERATE`
  (two to three steps or one idea to spot), `HARD` (several steps, a trap, or
  an unusual setup). For a timed AFCAT student, not an olympiad.
- `solution`: **this text is published to students as the worked answer**,
  so it carries the full editorial contract below. Write it even when you
  return X: solve the most sensible intended reading and the note says why.

### Solution rules (the published text)

- **2-5 short sentences.** Name the idea, show the key step, state the result.
  No preamble, no restating the question, no `**bold**`.
- **End with the answer as a value** ("... so the work is finished in 19
  days.").
- **Math inside `\( ... \)`.** Fractions as `\frac{a}{b}`, multiplication as
  `\times`, percent as `\%` inside a zone (`\(20\%\)`). Plain words stay
  outside the zones. Currency as the stem writes it (`Rs.` or `₹`).
- **Never name an option by LETTER** ("option C", "(b)", "answer is A"). The
  standing `audit:keys` probe reads a named letter as your concluded answer and
  fires a false alarm, and letters go stale when options are reordered for
  balance (we do reorder them). Name the VALUE.
- **No em dashes** (—). Readers type on phone keyboards without one, and text
  full of them reads as machine-written. Use a full stop, colon, comma or
  brackets. Not " – " or " -- " either. A range like 2017–2024 is fine.
- **No self-talk** ("wait", "let me recheck", "actually"). If you changed your
  mind, the solution shows only the final working.

Final message: ONE line. Total, count of X, count of TWIN notes, count of
low-confidence, count of SUBTOPIC?.

---

## PASS 2: independent recheck of disputed rows

Packet: `out/<chapter>/recheck.json`, ONLY the rows where pass 1 disagreed
with the source key (or returned X). You are not told which way either went,
and must not look.

Return a JSON array to `out/<chapter>/recheck-verdicts.json`:

```json
{ "id": "01-4", "derived": "D", "value": "19 days", "confidence": "high", "note": "" }
```

**`value` is REQUIRED and is the point of this pass.** State what you
computed, independently of the options. The crosstab then compares two
derivations of the same QUANTITY rather than two letter guesses. No solution,
subtopic or difficulty in this pass.

Final message: ONE line. Total, count of X, count of TWIN, count of
two-correct-options rows.

---

## TWIN REPAIR: draft a replacement distractor

Packet: `out/<chapter>/twin-dossier.json`, rows where two options are equal
but the key is CORRECT (that is the selection rule). This packet includes the
key, because you cannot tell which option must survive without it. Not blind.

Return a JSON array to `out/<chapter>/twin-repairs.json`:

```json
{ "id": "01-12", "replace": "B", "with": "Rs. 1,440",
  "why": "B was Rs. 1200, the keyed A written without the comma.",
  "check": "1,440 would need 12% for 2 years at simple interest; the stem gives 10%" }
```

- `replace`: the letter to overwrite. **Never the keyed letter.**
- `with`: a WRONG value, wrong for a reason a student might produce (forgot
  to subtract, used the reciprocal, simple instead of compound, the other
  ratio order). Same units and style as its siblings, distinct in VALUE from
  all three surviving options.
- `check`: your evidence the new text is wrong. A "repair" that is also correct
  turns one defect into a worse one.
- If the row's real defect is not a twin, return `"replace": null` and say
  what is wrong.

Final message: ONE line. Rows in, repairs proposed, rows returned null.

---

## Writing the file

Use the **Write tool**. Never write JSON through a shell heredoc, `node -e` or
`python -c`: this environment eats backslashes and silently corrupts every
LaTeX zone (`\theta` arrives as TAB + "heta"). In JSON a LaTeX backslash is
`\\`, so `\(` is written `"\\("`. Never `\\\\(`, which renders as a stray
backslash.
