# Fan-out dispatch template — CBSE science board papers

The prompt each transcription agent gets. Fill the `«…»` slots from
`npx tsx scripts/cbse-12-pyq/wave.ts --subject=<s> --openers` (or `--followers`),
which prints every one of them per paper.

Written after the Chemistry pilot (2023 56/1/1) so it carries what that run
actually taught rather than what was guessed beforehand.

---

## Orchestrator rules — these are mine, not the agent's

Each earned its place from a real incident in this repo.

1. **Do not touch `scripts/cbse-12-pyq/` while a wave is in flight.** I edited
   `config.ts` and `SCIENCE_ADDENDUM.md` under the pilot agent. It noticed,
   checked, and confirmed no impact — but that was luck. An agent that re-reads
   a brief mid-run and finds different instructions than it started with has no
   way to tell which is authoritative.
2. **`git add` by EXPLICIT PATH, never a directory or pattern.** Agents write
   into `data/` continuously; a `git add scripts/cbse-12-pyq/data/` sweeps
   half-written files into a commit.
3. **Namespace scratch files per agent.** Two agents in this repo have
   independently created the same scratch filename and silently overwritten each
   other's work, one then reporting on the wrong paper.
4. **Render → transcribe → DELETE `out/<paperId>/`.** ~15 MB per paper. Left
   behind, a wave fills the disk and the gate stops running.
5. **Wait for the completion notification, not for the output file to exist.**
   Agents are told to write early and update as they go, so a present file is
   not a finished one. This has already produced one false "missing questions"
   diagnosis that cost a wasted dispatch.

---

## The prompt

> Transcribe ONE CBSE Class-12 «SUBJECT» board question paper into the pipeline's
> JSON format.
>
> ### Read these contracts FIRST, in order
> 1. `scripts/cbse-12-pyq/TRANSCRIPTION_BRIEF.md` — the general contract. All of
>    it applies: bilingual page parity, read-the-page-never-the-text-layer,
>    `\( … \)` maths, sets/`context`, internal-choice `OR`, the JSON shape.
> 2. `scripts/cbse-12-pyq/SCIENCE_ADDENDUM.md` — what differs for the sciences.
>    It overrides the Maths specifics.
>
> ### The paper
> - **«SUBJECT» «YEAR», code «CODE»** · paperId `«PAPER_ID»`
> - Pages: `scripts/cbse-12-pyq/out/«PAPER_ID»/p00.png` … (`contact.png` shows
>   all pages at once — the fastest way to find the English parity)
> - Marking scheme: `scripts/cbse-12-pyq/out/«PAPER_ID»/ms/`
>
> ### Structure — pattern `«PATTERN»`
> «SECTION_TABLE»
>
> **Check this against the paper's own printed General Instructions and tell me
> if it disagrees.** I would rather be corrected than agreed with. The tables
> differ by year AND by subject — Physics 2023 and Chemistry 2023 are different
> exams that both total 70 marks, so a marks check cannot catch a mix-up.
>
> ### Section-A answers
> «KEY_INSTRUCTION»
>
> Whatever the source, **flag any question CBSE itself voided** — its scheme
> prints notes like "Full mark to be awarded for any option" or "Award full mark
> if attempted (Printing error)". Set `_cbseVoided` to the note verbatim and keep
> the printed letter. Find them yourself; do not assume there are none.
>
> «FOLLOWER_BLOCK»
>
> ### Output
> `scripts/cbse-12-pyq/data/«PAPER_ID».questions.json`:
> ```
> { "paper": "«CODE»", "year": «YEAR», "pattern": "«PATTERN»", "questions": [ … ] }
> ```
> Per question: `ref`, `questionNumber`, `section`, `marks`, `format`
> ("mcq"|"subjective"), `chapter`, `subtopic`, `difficulty`
> (EASY|MODERATE|HARD), `stem`, optional `context`, `options`, `answer`,
> optional `setId`.
>
> Use ONLY the chapter names in the addendum, character for character —
> chapters AUTO-CREATE on commit, so one wrong space forks the corpus in two.
> Note `Werner’s Theory of Coordination Compounds` uses **U+2019**, not an ASCII
> apostrophe.
>
> ### House rules that have cost this project real time
> - **Write the file with the editor, never a shell heredoc.** Heredocs eat
>   backslashes and turn `\theta` into a control character that is invisible on
>   inspection and survives review.
> - The papers use **raised decimal points** (`0·05`) → `0{\cdot}05`.
> - A drawn structure, mechanism, circuit or ray diagram **cannot be typed**.
>   Flag it **`_figure`** — that exact field, opening with `REQUIRED`,
>   `ILLUSTRATIVE` or `DECORATIVE`, and always carrying `Page idx N`. See the
>   addendum's table. Nothing reads any other field name, and `REQUIRED` also
>   drives a dedup guard, so when unsure choose `REQUIRED`. Do not approximate a
>   drawing in ASCII — that is wrong AND looks authoritative. Naming a compound
>   in words is a lossless reading and is preferred — **unless** the options are
>   drawings and naming them would state the answer, in which case describe them
>   without naming. Say which you did.
> - Transcribe the paper **as printed**. If a stem looks wrong, transcribe it
>   faithfully and REPORT it. Adjudication is the maintainer's call.
> - Use a scratch filename unique to you: `_tmp_«PAPER_ID»_*`.
>
> ### Verify before finishing
> - Every question present, numbered 1..N with no gaps.
> - Section/marks/format match the table above.
> - `\( … \)` balanced, never nested; no control characters; no literal `\n`.
> - Then run `npx tsx scripts/cbse-12-pyq/validate.ts «PAPER_ID»` and report its
>   output verbatim. It derives the subject from the paper code, so it should
>   run clean — if it reports unknown chapters, that is a real finding.
> - **Prove any checker you write goes RED on a deliberately bad input before
>   trusting a green run.**
>
> ### Report back
> - Anything that disagreed with what I told you.
> - Questions CBSE voided, and any stem you believe is defective (do not fix).
> - Any question needing a figure.
> - For a follower: how many rows you found shared with the opener, and how you
>   matched them.
>
> Do NOT commit to git and do NOT write to the database.

---

## Slot values

| slot | where it comes from |
|---|---|
| `«KEY_INSTRUCTION»` | `wave.ts` key column — see below |
| `«SECTION_TABLE»` | the pattern's row in `SCIENCE_ADDENDUM.md` §1 |
| `«FOLLOWER_BLOCK»` | empty for an opener; see below for a follower |

**`official (N)`** → *"Take the answer from the marking scheme's Section-A table,
verbatim, uppercased. Do NOT derive it. There should be N entries."*

**`VISION NEEDED`** → *"This paper's marking scheme does not extract cleanly, so
read its Section-A block from the rendered `ms/` page images. If the block is
unreadable, say so rather than deriving — an answer that arrives without saying
it was derived is indistinguishable from an official key."*

**`n/a (no MCQs)`** → *"This is the 2022 Term-II paper: 12 questions, 35 marks,
and NO MCQs at all. Every row is subjective."*

**Follower block:**

> This is a FOLLOWER set. Its opener is transcribed at
> `scripts/cbse-12-pyq/data/«OPENER_ID».questions.json`. The three sets of a
> series are RESHUFFLES of largely the same questions — Maths measured ~41 of 54
> shared. Match against the opener by **CONTENT, never by position**: block 1
> against block 1 can only agree by coincidence, and this project has already
> published a wrong conclusion from a positional sample and had to retract it.
>
> **Transcribe every question anyway.** A true duplicate costs nothing —
> `content_hash` collapses it at commit — whereas a wrongly-skipped question is
> lost silently. Report the overlap you found; do not act on it.
