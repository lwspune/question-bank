# Cadet Vocabulary — authoring contract

You are authoring one chapter of a printed vocabulary book for NDA and CDS
candidates. Work to this file, not to memory of how other chapters were done.

## What you do, and what you must not do

**DO:** read one worksheet, write one JSON file. That is the whole job.

**DO NOT** run `git` (add, commit, anything), **do not** run
`commit-entries.ts --apply`, and **do not** touch the database. Several agents
share this repository and one `git add` while others are mid-write sweeps their
half-finished files into a commit. The orchestrator applies and commits.

You MAY run `npx tsx scripts/vocab/commit-entries.ts <file>.json` **without
`--apply`** — that is a dry run, it writes nothing, and it will tell you whether
every word resolved. Do that before you report back.

## Input and output

- Worksheet: `scripts/vocab/out/<chapter>.md`
- Write to: `scripts/vocab/data/<chapter>.json`

Use the **Write tool**, never a shell heredoc. A heredoc eats backslashes and
has corrupted files in this repo repeatedly.

## Schema — a JSON array, one object per word

```json
{ "word": "...", "meaning": "...", "sentence": "...",
  "synonyms": ["...", "..."], "antonyms": ["...", "..."] }
```

- **`word`** — copied EXACTLY from the worksheet heading, same spelling and
  case (they are all lower case, including the odd one like `indian`; that is a
  data artefact of the extractor, not something to fix).
- **`meaning`** — one clause, lower case, **no full stop at the end**, no
  trailing editorial comment. Define the word, not the sentence.
- **`sentence`** — a short natural sentence you author, using the word.
- **`synonyms` / `antonyms`** — 3-4 each, British spelling (`-ise`, `colour`,
  `behaviour`). `antonyms` may be `[]` where the word genuinely has no opposite
  (`accountant`, `calendar`, `dune`). Do not pad it with a negated form.

## The one rule you cannot break

**Do NOT add a `sentenceSource` field.** Every word in these worksheets appeared
only among a question's four OPTIONS — the paper printed it, it never tested it,
so there is no exam sentence and no citation. A `sentenceSource` is a claim that
a real paper asked the word in exactly those words, and it is the one thing this
book has that a bought word list does not. `commit-entries` will refuse an
invented citation, but do not rely on that: do not write the field at all.

(If a worksheet entry ever shows a `- [synonym] CDS 2019-I` line with a `>`
sentence under it, that word IS a tested word: use that sentence verbatim and
set `sentenceSource` to the citation exactly as printed. None of the current
chapters contain any.)

## Three kinds of worksheet entry

- **`- [option] …`** — the exams printed it among the choices. No sentence, no
  key. Author the meaning and the sentence.
- **`- [school] …`** — from the Class 5-12 school list; neither exam has set it.
  It comes with a **`docx gloss`** line.
- **`- [synonym] NDA 2019 (Apr)`** with a `>` sentence — a tested word (see
  above). Rare in these chapters.

### The `docx gloss` is a STARTING POINT, not text to paste

It is the school book's own definition and it is usually sound, but it is
written in a different style: `To give up a position of power or responsibility`
— capitalised, often an infinitive phrase. House style is a lower-case clause
with **no closing full stop**: `to give up a position of power or
responsibility`.

Read it, then write the meaning you would write anyway. Where the gloss is
thin, or misses a second live sense, improve it — you are not bound by it. Where
it is simply right, lower-casing it is the correct outcome and not laziness.
**Never copy a gloss you believe is wrong**; report it instead.

## Coverage

Every heading in the worksheet, exactly once, nothing extra. The worksheet's
first line states the count — your array length must match it. Verify this
yourself before reporting; do not report a count you have not checked.

## Quality bar

These are ordinary English words and the temptation is to write the obvious
gloss and move on. Two things to be careful about:

- **Define the word, not the option it was standing in for.** A word appeared
  as a distractor, so its neighbours in the worksheet are unrelated to it.
- **Where a word has two live senses, give both** — `grave` (serious / burial
  place), `stall` (to halt / a market booth), `tender` (gentle / to offer). A
  candidate meets both.

## Report back

State: the chapter, the count you wrote, whether the dry run resolved every
word, and anything you found odd — a word you could not define confidently, a
spelling that looks like an extraction artefact, a duplicate. Do not fix an odd
word silently; report it.
