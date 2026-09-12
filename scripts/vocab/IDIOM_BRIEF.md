# Cadet Vocabulary — Part 4 authoring contract (idioms and phrases)

You are authoring one chapter of Part 4 of a printed vocabulary book for NDA and
CDS candidates. Work to this file, not to memory of how other chapters were
done — **Part 4 is shaped differently from Parts 1–3 and most of their rules do
not apply here.**

## What you do, and what you must not do

**DO:** read one worksheet, write one JSON file. That is the whole job.

**DO NOT** run `git` (add, commit, anything), **do not** pass `--apply` to any
script, and **do not** touch the database. Several agents share this repository
and one `git add` while others are mid-write sweeps their half-finished files
into a commit. The orchestrator applies and commits.

## Input and output

- Worksheet: `scripts/vocab/out/<chapter>.md`
- Write to: `scripts/vocab/data/<chapter>.json`

Use the **Write tool**, never a shell heredoc. A heredoc eats backslashes and
has corrupted files in this repo repeatedly.

**IF YOUR OUTPUT FILE ALREADY EXISTS, STOP AND REPORT IT.** Do not overwrite it
and do not reason from what its siblings look like — it may hold a different,
already-applied batch. The Write tool saying "updated" rather than "created" is
the signal.

## Schema — a JSON array, one object per idiom

```json
{ "idiom": "...", "meaning": "..." }
```

**TWO FIELDS. THAT IS ALL, AND IT IS ENFORCED BY THE DATABASE.** Migration 0091
REFUSES a Part 4 row carrying a sentence, a source, synonyms or antonyms. If you
add them the commit fails outright. This is not a style preference: an authored
example sentence in Part 4 would read as evidence a paper never gave.

- **`idiom`** — copied EXACTLY from the worksheet heading. Same words, same
  spelling, same capitalisation, **including a leading "To"**. That is how the
  book files and prints it (the part sorts on the literal first word, so "To
  pull your weight" belongs under T), and changing it moves the entry to a
  chapter that does not expect it.
- **`meaning`** — one lower-case clause, **no closing full stop**, no trailing
  editorial comment.
  - Lower-case the first word UNLESS it is "I" (the pronoun) or an acronym.
  - Define the idiom, not a sentence it might appear in.
  - Where an idiom has two genuinely live senses, give both, separated by a
    semicolon. Do not pad with a second phrasing of the same sense.

Good: `to force yourself to do something difficult or unpleasant`
Bad: `To force yourself to do something unpleasant.` (capital, full stop)

## The rule that matters most here

**THERE IS NO KEY BEHIND THESE ENTRIES, AND NOTHING DOWNSTREAM CAN CATCH A WRONG
MEANING.**

Elsewhere in this book a meaning can be checked: Part 4's other section holds
idioms a real question printed, and its meaning is the option that question
keyed as correct. Your chapter is the opposite — a commercial prep deck teaches
these and **no question has ever printed them**, so there is no key, no
distractor set and no cross-check. A confident wrong meaning ships.

So:

- **If you are not sure what an idiom means, say so.** Write your best meaning,
  and **list that idiom in your report** as one needing a human eye. A reported
  uncertainty costs a minute to check; a silent guess is found by a student.
- **Do not infer a meaning from the words.** `Loaves and fishes` is not about
  food, `A dog in the manger` is not about animals, `The gnomes of Zurich` is not
  about gnomes. If the literal reading is all you have, that is a report, not an
  answer.
- **Do not go looking for the deck's own wording.** The decks gloss every idiom
  they teach and we deliberately do not reproduce it — they are used as a LIST
  OF IDIOMS and nothing else. Write the meaning in your own words.

## Coverage

Every heading in the worksheet, exactly once, nothing extra. The worksheet's
first line states the count — your array length must match it. **Verify this
yourself before reporting; do not report a count you have not checked.**

A chapter over ~170 idioms is split into numbered parts (`-1`, `-2`). Yours is
one part; author exactly the headings in YOUR worksheet and do not reach into
the other.

## Report back

State: the chapter, the count you wrote, and — most importantly — **every idiom
you were not confident about**. Also report anything odd: a heading that looks
like an extraction artefact, a near-duplicate of another heading, an idiom that
seems to be two idioms joined by a slash. Do not fix an odd heading silently.
