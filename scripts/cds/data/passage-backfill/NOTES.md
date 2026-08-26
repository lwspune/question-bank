# Findings surfaced by the passage backfill (NOT applied here)

The backfill's remit is the hash-neutral `passage` field. Everything below
changes a stem, an option or a key, which re-mints `content_hash` - a different
repair with a different blast radius (resync + re-flip). Collected for the single
blind re-derivation pass that runs once all passages are restored.

## 2022-2 Q15 - corrupted stem + option, and a wrong key

`audit-passages.ts` flagged this as P-WORD-MISSING ("protocol" absent from the
passage). The passage is COMPLETE and correct; the QUESTION is corrupted, and
both corrupt values come from Q10 on the facing page.

| field | booklet (page 4-A) | stored |
|---|---|---|
| stem word | `'unanchoring'` | `'protocol'` |
| option (b) | `The rising anchor will free inflation` | `school of thought` |

Q10 (page 3-A) reads "Which of the following words is nearer to the meaning of
the word 'protocol' in the text?" with "(b) school of thought" - the source of
both. Options (a), (c), (d) of Q15 match the booklet exactly.

Key: stored **A** ("Stability of inflation that will be securely anchored")
describes inflation that IS anchored, i.e. the opposite of the term asked about.
The passage uses "the 'unanchoring' of inflation and inflation expectations" as
a risk to macroeconomic stability. Correct answer is **C** ("The disjoint
between inflation and its expectations").

Worth noting for the gate's own record: P-WORD-MISSING was written to catch a
TRUNCATED PASSAGE and instead caught a corrupted stem. It fires on a real
inconsistency between question and passage either way - the rule holds, the
diagnosis just is not always the passage.

## 2023-2 S12/S13 - four findings from the restored passages

Surfaced by the transcription pass, verified by the orchestrator against the
transcribed text. All four change stems, options or a key, so none is applied
here.

### Q111 - the answer is not supported by the printed excerpt (needs a reader)

Stored key is (a) "Truth and divinity go hand-in-hand". The booklet's
Passage - I is an excerpt of Bacon's *Of Truth* that STOPS before the sovereign-
good material: searching the transcription finds no "God", no "divin", no
"sovereign", no "heaven". (A search for "holy" hits, but only as a substring of
"melancholy" - a prefix-matching false positive, so it is not evidence.) The
excerpt ends at "...poor shrunken things, full of melancholy and indisposition,
and unpleasing to themselves ?"

So (a) is the conventional key for the ESSAY and is not derivable from the
PARAGRAPH the item asks about, which is what the paper's own Directions require
("select your answers based on the contents of the passage"). None of the four
options is well supported. Stored confidence is already MED. This is the class
the ledger predicted: restoring the passage is what made the key checkable, and
the check came back inconclusive rather than clean.

### Q116 - two option texts diverge from the booklet (key unaffected)

Booklet (a) ends "...elements of social custom and JUSTICE"; stored says "law".
Booklet (c) ends "...unjust existence of human being and JUSTICE"; stored says
"law". (b) and (d) match. The key stays (a).

### Q113 - option (b) has a dropped word (key unaffected)

Booklet: "Beauty versus PLAIN unadorned truth". Stored omits "plain".

### Q111 stem - cosmetic

Booklet prints the plural possessive "writers'"; stored has "writer's".

## 2020-2 S10 cloze - corrupted option sets (keys are FINE; do not "repair" alone)

Six rows carry option text that differs from the booklet. Verified by the
orchestrator against printed pages 21-22 (indices 20-21).

**Q96 is the one that matters, and the transcription agent's severity call was
WRONG in a way worth recording.** It reported "a student would be graded wrong".
They would not: a student sees OUR options, and our key B points at "that",
which is the correct word. The row is internally consistent and grades
correctly today.

| | booklet (printed p21) | stored |
|---|---|---|
| (a) | these | this |
| (b) | this | that  <- key |
| (c) | that | than |
| (d) | which | which |

So our set is SHIFTED and "than" is a corruption of "these". The hazard is the
reverse of what was reported: repairing the option TEXT alone to match the
booklet would leave key B sitting on "this" and turn a correct row into a wrong
one. This is exactly the class CLAUDE.md records for CDS - "repairing option
text ALONE makes a row worse". Text and key move together or not at all.

**Five distractor-only corruptions. Key letter and key text are correct in every
one; only a wrong-answer option is mis-transcribed, so nothing is mis-graded.**

| row | booklet | stored | key (unaffected) |
|---|---|---|---|
| Q94 (d) | might | that | A = must |
| Q98 (d) | most | complately | B = all |
| Q105 (b) | would | were | A = might |
| Q110 (a) | a | describing | D |
| Q110 (c) | the | more | D |

Q94/Q98/Q105 confirmed by the orchestrator from the page; Q110 is
agent-reported and NOT independently checked.

Also agent-reported, not checked: Q99's stem carries a comma ("______ , and
behaviour") the booklet does not print.
