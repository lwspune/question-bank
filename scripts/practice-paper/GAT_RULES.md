# GAT ingestion rules

Standing rules for ingesting an **NDA GAT** paper (a mock, a test series, or a publisher
book) into the bank. They are additional to `.claude/commands/lws-test-ingest.md`, which
governs the pipeline; these are the GAT-specific content rules.

**They are enforced, not just documented** — `npx tsx scripts/practice-paper/gat-lint.ts <slug>`
checks every one that can be checked mechanically. Run it before `commit-paper --apply`.
The rules a script cannot judge (4, 5, 6, 7) are still listed, because the lint tells you
*where to look*, and a human or an agent decides.

Each rule below records **why** it exists — most were earned from a real defect found during
the Oswaal 10-mock ingestion (2026-08-26).

---

## 0. A GAT question has EXACTLY FOUR options

Labelled (a) (b) (c) (d). Always. There are no 3-option or 5-option variants.

Treat this as an **assertion in the parser**, not an inference: a question that does not
yield four distinct non-empty options is a PARSE FAILURE and must be reported by number.
Never invent a fourth option to reach the count, and never emit three.

> **Why.** The stored key is a LETTER, so an option miscount silently shifts every later
> option and re-points the key. In the Oswaal series the spotting-errors block prints
> `Dispose off (a)/the garbage (b)/from themselves (c)/No error (d)` — labels come AFTER
> their segment — and a prefix-label parser reads the first segment as the stem, produces
> three options, and shifts the whole set by one position. Asserting "exactly four" turns
> that from a silent mis-key into a loud failure.
>
> The invariant also **bounds a trim**: when stripping a section header that has run on into
> option (d), a trim that would leave (d) EMPTY has eaten the option, not the header. Backing
> off on that condition is what stopped the JUMBLED block's all-caps `SRQP` being deleted.

## 1. Statements in a statement-analysis question go on their own line

`1.` `2.` `3.` `4.` each start a new line. The lead-in is its own line, and the trailing
"Select the correct answer using the code given below" is its own line.

## 2. List I / List II — and any two-column pair list — must be a GFM pipe table

A **header row AND a `|---|---|` separator row are both mandatory**; without the separator
the renderer treats the block as prose (see the pipe-table convention in CLAUDE.md).

```
| Location | Leader |
|---|---|
| 1. Mathura | Devi Singh |
```

> **Why the literal words are not the test.** A match-list frequently does not say
> "List I"/"List II" at all. Oswaal Mock 10 Q86 prints bare `Location` / `Leader` column
> headings, so a search for "List I" misses it entirely. Detect the **shape** — a column
> header pair followed by numbered rows — not the vocabulary.
>
> **Convert in the PARSER, never downstream.** The column boundary lives in the raw
> line/tab layout (`'\t1.\t Mathura\t'` then `'Devi Singh'`). Once whitespace is collapsed,
> `Mathura Devi Singh` is irreducibly ambiguous. If a split is not confident, emit the block
> unconverted and report the question number — a wrong column boundary reads as authoritative
> and is worse than a flat stem.

## 3. P./Q./R./S. rearrangement parts go on their own line

Lead-in on its own line, then one line per part. Source spacing around the markers is
inconsistent (`\t P.\t` vs `\tQ.\t`) — do not key on exact whitespace.

> **Why 1–3 are one family.** They are all destroyed by the same one-line mistake: collapsing
> all whitespace (`\s+` -> `" "`) during normalisation. Source newlines inside ordinary prose
> ARE just wrap points and must still be collapsed — so the fix is not "stop collapsing", it
> is "collapse prose, preserve these three shapes". In Oswaal Mock 10 this affected 20 of 150
> stems.

## 4. A question with a diagram must not have leaky text in the diagram

Check the figure image itself for text that gives the answer away — a label, a caption, a
worked value that belongs in the solution rather than the stem.

## 5. No hand-wavy solutions

A solution must actually derive its answer. "Clearly", "obviously", "it is a standard
result", or a restatement of the option text is not a solution.

> **Why this is not pedantry.** Oswaal Mock 10 Q80's solution describes Lakshadweep at length
> and never engages any of the three figures the stem gives (45 km coast, 28 fishing villages,
> 45% agriculture) — which is exactly how its wrong key survived. A solution that does not
> engage the stem is usually a wrong-answer tell, not just poor writing.
>
> Watch especially for a solution that **states the key's letter while its own working proves
> another** — Mock 10 Q70's solution prints K2 = 8,611 m and Kanchenjunga = 8,586 m (order A)
> and then concludes "Option D". An automated key-vs-solution *letter* diff cannot see this;
> across Mock 10 it caught 1 of the ~8 real disputes.

## 6. Solutions must be student-facing — no LLM or process residue

No "as an AI", no "the model", no `REVIEW:`, no `TODO`, no note-to-self, no meta-commentary
about deriving or verifying. The student reads this.

> Beware the false positive: a legitimate GAT question can be *about* a language model.
> Mock 10 Q103 asks about BharatGen, "the world's first government-funded multimodal large
> language model" — flagged by a naive scan, entirely fine.

## 7. A question or option that references a diagram must actually have one

If a stem says "in the figure below" and no image is attached, the question is unanswerable
as stored. Report it; do not publish it.

> Also check the inverse where the source is scanned or vector-drawn: Mock 10 has **zero**
> raster images, and its two stacked-fraction questions (Q121, Q122) were destroyed because a
> fraction bar is a **vector line, not a character**. Enumerating the PDF's vector objects is
> what proved there was no third broken fraction hiding. The same is true of **underlines**:
> Q46–50 ask what part of speech the *underlined* word is, and the underline is a vector line
> absent from the text layer — leaving a stem that names no target. Restore per the bank
> convention `\(\underline{\text{word}}\)`.

---

## Answer-key policy for a GAT source

**The printed key is the default, but it is the WEAKER of the two printed sources.**

Across the Oswaal series, wherever the compact Answer Key and the worked solution named
different letters, adjudication sided with the **solution 7 times out of 7**. And in the
stealth cases the key fails without any letter disagreement at all.

So:
- Take the answer from the printed key where key and solution agree.
- Where they disagree, **derive it**, and expect the solution to win.
- **Never silently change a key.** Keep it, set `status:"flawed"`, and explain in `reviewNote`.
- Measured dispute rate on this source: **~5% of questions**, of which an automated letter
  diff finds about 1 in 10. Budget for per-question derivation accordingly.

## Duplicate policy

Dedup on **stems**, semantically, BEFORE deriving anything — and dedup in **two directions**:

1. against the existing bank (`dump-bank.ts --subject`), and
2. **against the other papers in the same series**, including *within* one paper.

> The second is easy to forget and the Oswaal series needed it: one question appears in mocks
> 2, 3, 6, 8 and 10, and Mock 3 carries it **twice internally**. `content_hash` absorbs
> byte-identical repeats silently, but a reworded twin ("Silver ware" / "Silverware") ships as
> two public rows. Refresh the bank dump between papers, or paper N+1 cannot see paper N.
