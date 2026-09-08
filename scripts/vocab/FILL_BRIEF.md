# Cadet Vocabulary — Part 1 fill roster contract

You are extending one **class rung** of a printed vocabulary book for NDA and
CDS candidates. Work to this file, not to memory of how other chapters were
done.

## What makes this job different from the rest of the book

Every other chapter is authored from a worksheet of words the corpus already
holds — the author defines a given word. **Here you choose the words too.**

That is a weaker claim and the book records it: these rows are stamped
`school_source = 'authored'`, against `'cbse'` for the words a publisher graded.
So the level judgement is genuinely yours, and it is the part of this job worth
slowing down for.

## What you do, and what you must not do

**DO:** read your rung's brief, write one JSON file. That is the whole job.

**DO NOT** run `git` (add, commit, anything), **do not** run
`commit-entries.ts --apply`, and **do not** touch the database. Several agents
share this repository and one `git add` while others are mid-write sweeps their
half-finished files into a commit. The orchestrator applies and commits.

A dry run is NOT available to you here, and that is expected: a fill word is not
in the corpus until the orchestrator builds the roster from your file, so
`commit-entries.ts` will refuse every word until then. Do not try to make it
pass. Check your own work instead — see **Before you report back**.

## Input and output

- Your brief: `scripts/vocab/out/fill-class-<N>.md`
- Taken words: `scripts/vocab/out/_taken-words.txt`
- Write to: `scripts/vocab/data/fill-class-<N>.json`

Use the **Write tool**, never a shell heredoc. A heredoc eats backslashes and
has corrupted files in this repo repeatedly.

## Schema — a JSON array, one object per word

```json
{ "word": "...", "meaning": "...", "sentence": "...",
  "synonyms": ["...", "..."], "antonyms": ["...", "..."] }
```

- **`word`** — lower case, single word, ordinary English. No proper nouns, no
  hyphenated compounds, no phrases (Part 4 holds the idioms).
- **`meaning`** — one clause, lower case, **no full stop at the end**, no
  trailing editorial comment.
- **`sentence`** — a short natural sentence you author, using the word.
- **`synonyms` / `antonyms`** — 3-4 each, British spelling (`-ise`, `colour`,
  `behaviour`). `antonyms` may be `[]` where the word genuinely has no opposite.
  Do not pad it with a negated form.

## The one rule you cannot break

**Do NOT add a `sentenceSource` field.** That field is a claim that a real exam
paper asked the word in exactly those words, and it is the one thing this book
has that a bought word list does not. No fill word has ever appeared in a paper
— that is why it is a fill word. `commit-entries` will refuse an invented
citation, but do not rely on that: do not write the field at all.

## Choosing the words — this is the actual work

1. **Match the rung's level.** Your brief prints every word CBSE itself places
   at your class, and samples from the rungs above and below. Aim at the
   MIDDLE of your rung, not its hardest word.

2. **Grep `_taken-words.txt` for every word before you keep it.** The book
   already holds ~3,700, including all four parts. A collision is REFUSED at
   commit, so an unchecked proposal wastes the run — and a near-collision
   matters too: do not propose `abundance` because `abundant` is taken, but DO
   check both.

3. **Ordinary, useful English.** These are words a school student should end
   the year owning. Not archaic (`perspicacious`), not technical
   (`isotope`), not slang.

4. **Spread the alphabet.** The rung prints A-Z; twenty words starting with
   `c` makes a lopsided chapter. No letter should hold more than ~12% of your
   list.

5. **No near-duplicates within your own list** — `courageous` and `valiant`
   in the same rung teaches one word twice.

## Quality bar

- **Where a word has two live senses, give both** — `grave` (serious / burial
  place), `stall` (to halt / a market booth), `tender` (gentle / to offer).
- The sentence should show the word doing its work, not merely contain it.
  "The weather was pleasant" teaches nothing; "a pleasant breeze made the long
  march bearable" does.
- Vary the sentence subjects. A hundred sentences all about soldiers reads as
  a template.

## Before you report back

You have no dry run, so check these yourself and say that you did:

- **Count** — your array length equals the number your brief asked for.
- **Collisions** — every word grepped against `_taken-words.txt`, zero hits.
- **Internal duplicates** — no word appears twice in your own file.
- **Valid JSON** — parse the file you wrote.
- **No `sentenceSource` anywhere.**

## Report back

State: your class, the count you wrote, the four checks above with their
results, and anything you found difficult — a rung you think is too thin to fill
honestly at that level, a word you were unsure about. Say so rather than
padding the list to hit the number.
