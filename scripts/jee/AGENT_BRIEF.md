# JEE ingestion — the agent briefs

The two prompts dispatched once per paper. They were retyped inline for ten
waves, which is how wording drifts between batches and how a rule quietly gets
dropped; author from here instead and substitute `<PAPER_ID>` and `<SUBJECT>`.

Pick the brief from `npx tsx scripts/jee/triage.ts --subject=<SUBJECT>`, and read
the paper's own `notes` before trusting a SAFE verdict — a paper any earlier
subject found untrustworthy is BLIND, since it is the same extraction.

---

## SAFE lane

The extracted key is trustworthy, so the agent classifies and VERIFIES it.

> You are classifying and verifying the `<SUBJECT>` questions of one JEE Mains
> paper for the PYQ Vault question bank. Work in
> `c:/Users/vilas/Downloads/Question_Bank`.
>
> PAPER ID: `<PAPER_ID>`
>
> ## Inputs
> 1. `scripts/jee/out/<PAPER_ID>_<subject>.txt` — the questions. Each block is:
>    ```
>    === Q31 [ok] ===
>    <stem, LaTeX in \( \) or \[ \]>
>      (A) ...
>      (B) ...  <==srcKEY
>    ```
>    `<==srcKEY` marks the SOURCE answer key. Section-B NAT questions have no
>    options and show `srcNAT=<number>`.
> 2. `scripts/jee/out/_<subject>_taxonomy.txt` — the LIVE taxonomy to classify
>    into. Follow ITS stated rules; it appends sibling exams' taxonomies as
>    REFERENCE for wording only.
> 3. `scripts/jee/out/<PAPER_ID>_soln.md` — the source solution document.
> 4. Figures: stems referencing a structure/scheme/graph have images under
>    `scripts/jee/out/media/`. Open them with the Read tool — many questions are
>    unanswerable without looking.
>
> ## Your job
> For EVERY question:
> 1. **Solve it yourself from the stem** BEFORE looking at `<==srcKEY`, then
>    compare.
> 2. **Classify** into an EXISTING chapter + subtopic, copied VERBATIM.
> 3. **Write a solution** — 2-6 sentences teaching the reasoning, ending by
>    naming the correct option.
>
> ## Rules
> - **The source key is a PEER, not an oracle.** Record `keyDisagreement`; do NOT
>   adopt the key silently and do NOT flip it — the maintainer adjudicates each
>   one. Papers with ZERO disagreements are normal. **Never manufacture one.**
> - **A printed solution contradicting its own printed letter** is strong
>   evidence the letter is wrong — quote it.
> - **Two options satisfying the stem is a PAPER DEFECT, not a wrong key.** Flag
>   it and keep the official key.
> - **Damaged stems.** Extraction drops leading digits (`.18` for `2.18`),
>   coefficients and whole clauses; a stray `$` scrambles `\( \)` delimiters; a
>   command can glue to the next token. Set `stemIssue` saying exactly what is
>   wrong, and give `suggestedStem` (the FULL corrected stem) ONLY when uniquely
>   recoverable — forced by the question's own internal evidence, or by
>   back-solving to the key with no other value fitting. If several values fit,
>   `skip: true`. **Inventing data is worse than skipping.**
> - `suggestedStem` CANNOT express an option fix. If option text is missing or
>   absorbed into the stem, say so in `stemIssue` and give what you recover.
> - **Do not invent taxonomy.** Closest existing pair + `taxonomyGap`.
> - LaTeX only inside `\( \)` / `\[ \]`, every zone BALANCED. **No unicode maths**
>   (→ ⇌ × ⁻ ° Å ∴ Δ) — use `\rightarrow`, `\times`, `^{-}`, `^{\circ}`,
>   `\Delta`. Beware mojibake: type real characters, never mis-decoded bytes.
>
> ## Output
> `scripts/jee/out/<PAPER_ID>_sol_chem.json`, keyed by question number as a
> STRING: `{chapter, subtopic, answer, solution, skip}` plus, only when they
> apply, `keyDisagreement` / `stemIssue` / `suggestedStem` / `taxonomyGap` /
> `skipReason`. `answer` is a NUMBER for NAT.
>
> **Write INCREMENTALLY** (every ~10 questions) so a stall loses nothing. Use the
> Write tool, **never a bash heredoc** — heredocs eat backslashes and destroy
> LaTeX.
>
> Report: count classified, figures opened, each `keyDisagreement` with a
> one-line reason, any `stemIssue`/`skip`, any `taxonomyGap`.

---

## BLIND lane

The key is untrustworthy, so the agent must never see it. Same brief with these
changes:

- **Dump with keys suppressed.** A BLIND agent that can see `<==srcKEY` is not
  blind — it will rationalise a shifted key rather than contradict it.
- Replace the "Your job" section with:

> This paper's answer key is KNOWN UNRELIABLE — on one sitting an entire shift's
> key block was displaced by +2. You are therefore **solving from scratch**.
> There is no key to verify against and none is supplied. Derive each answer
> yourself and report it as `answer`; `assemble-blind` stores YOUR derivation.
>
> Where you cannot reach a confident answer, set `skip: true` with a reason. A
> skipped question costs one row; a guessed one ships a wrong answer to students
> under the authority of a past paper. **Skip readily.**
>
> State a per-question `confidence` (`high` | `medium` | `low`). Anything below
> high gets a second look from the maintainer.

- Drop every rule mentioning the key (`keyDisagreement`, the printed-letter
  rule). KEEP the paper-defect rule: two options satisfying the stem still needs
  flagging, and here there is no official key to fall back on, so it is a skip.
- `stemIssue` recovery **cannot** use "back-solve to the key" here. The only
  admissible ground is the question's own internal evidence.

---

## What the maintainer does with the output

1. `promote-gaps.ts` — turn `taxonomyGap` into real subtopics (it refuses prose
   and refuses a chapter absent from the live handout).
2. `assemble-safe.ts` / `assemble-blind.ts` — build `papers/<id>.json`.
   **Must run BEFORE adjudications and must NOT be re-run after**: it recomputes
   `answerOverrides` from the SOURCE key and silently reverts verified flips.
3. Adjudicate every `keyDisagreement` personally against the printed options.
   Apply `suggestedStem` programmatically rather than retyping — retyped LaTeX is
   a transcription risk with no upside.
4. commit → attach-images → attach-solutions → cleanup-latex → **validate-db** →
   scan-flip (in that order; see the README gotchas).
