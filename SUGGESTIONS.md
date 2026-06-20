# Suggestions

A running list of actionable improvements surfaced during /update-docs runs.
Each item is outside the scope of the work that surfaced it. Strike through when done.

---

## Backfill ledger

Standing list of **new learnings that may apply to EXISTING/shipped work** — so they survive across sessions and aren't silently forgotten. Per [[learning-propagation-protocol]]: a candidate here is reworked ONLY after a 360 analysis + explicit user permission. Status: *identified → analysed → awaiting-permission → approved / declined → done*.

| Learning | Existing-work candidate | Status (2026-06-10) |
|---|---|---|
| Theme-coverage gap — a chapter can ship "complete" while a theme (formula/trap) is missing from the notes source ([[quiz-formula-coverage-gap]]) | The ~23 un-quiz-built /notes chapters: (a) **correctness** — hand-authored practiceSet/selfCheck answers never independently re-derived (the Lines `(1,-2)` class of bug); (b) **completeness** — empty `formula.latex` / <12 `traps` (run `npm run quiz:coverage`) | **Analysed** (full audit done). User decision: NO blanket campaign — **fold correctness re-derivation + formula/trap enrichment into per-chapter quiz-building (Wave 2+)**. Targeted correctness pass available on request for any chapter that's a live LWS lesson plan. |
| Matrices is formula- + property-rich; `quiz:coverage` flagged ~10 empty-`formula.latex` concepts | Matrices & Determinants /notes — property quiz + clean formula/property split | **Path A + B DONE 2026-06-10.** Path A: 25 rule-identities enriched from prose → property (2 quizzes, 0 churn). Path B: re-themed the 12 rule-formulas formula→property + re-assembled → clean split (formula=construction 1 quiz; property=ALL rules 3 quizzes); 0 integrity flags. **Only deferred:** the 6 `transpose-rules`/`symmetric-and-skew` *extra* properties reverted in Path A (single→bundle flip — re-author + re-assemble if ever wanted; low value). |
| 2 likely wrong-keys in the EXISTING PUBLIC Foundation "Acids, Bases and Salts" bank, surfaced when an LWS test (already 100% in the bank) was re-derived during `/lws-test-ingest` (2026-06-20) | (1) *"Tooth decay begins at the pH of"* (opts 8.0/5.1/5.8/6.5) — bank keyed **C=5.8**; decay starts BELOW 5.5, so 5.8 shouldn't qualify, **5.1 (B)** is the only sub-5.5 option. (2) *"Bleaching powder is a"* — bank keyed **C=greyish white powder**; standard textbook description is **pale yellow powder (B)**. | **DONE 2026-06-20** (user-approved). Both keys flipped C→B (id `7c9581ef…` tooth decay, `1906ee88…` bleaching powder), `content_hash` recomputed via the real helper (no collisions), explanatory solutions added, exactly-one-correct verified. These were LLM-*derived* keys (Foundation has no printed keys), corrected to the textbook-standard answer. |

---

## 2026-06-20

### Ingest Foundation Course Physics + Biology subjects

Foundation Course **Chemistry is complete** (8 chapters, ~995 q PUBLIC). The source has parallel `Physics` (9 chapters) and `Biology` (8 chapters) worksheet folders under `C:\tmp\Practice\Foundation\` — same shape (WS docx/pdf, no answer keys, figure-bearing).

**Why:** the Foundation Course is only ⅓ done; Physics + Biology round out the subject offering for the same student cohort.

**How to apply:** seed each subject (`INSERT INTO subjects(exam_id, name)` under exam `22d88324-…`), then run the `scripts/foundation/` pipeline per chapter exactly as for Chemistry (config `WORKSHEETS` entries → docx-to-pdf if docx → render → parallel vision-transcribe → commit PRIVATE → figure pass → attach → flip PUBLIC). Physics has numeric/diagram-heavy worksheets (motion graphs, ray diagrams, circuits) so expect a larger figure share. See [[foundation-course]].

### ~~Recover the deferred Foundation Chemistry figures~~ — **DONE 2026-06-20**

Shipped: **Acids-3's 25 figure questions** (transcribed + answered + all 25 figures attached; the "color/low-yield" worry was overstated — they crop cleanly; commit `179a783`) and the **4 split-across-pages figures** (Structure Q6/Q9 + Carbon Q58/Q62 — "~7" was 4; shipped as self-contained TEXT, no figure, since the stems describe each diagram; commit `337685b`). Still deferred (genuinely flawed, no valid answer → never committed): **Carbon Q53** (correct {B,C,D} not an option) + **Chem-3 Q30** (only 3 printed options). The old "Chem Q51" was a mislabel — Q51 was committed-then-flawed, now PRIVATE in the REVIEW cleanup below.

<details><summary>original</summary>

Left undone in the Chemistry pass: **Acids-3's 25 figure questions** (color/apparatus-heavy — pH strips, test-tube colours), **~7 split-across-pages figures** (Structure of the Atom Q6/Q9/Q60, Carbon Q58/Q62 — 4 option-diagrams span non-contiguous regions), **2 flawed-option figures** (Chem Q51, Carbon Q53), and **Chem-3 Q30** (lost to an agent page-split boundary).

**Why:** these questions exist in the worksheets but aren't in the bank; the split-figure ones especially are common in the figure-heavy chapters and will recur in Physics/Biology.

**How to apply:** for split figures, build a Pillow composite step (crop each region → stitch into one labelled image → attach as one `image_url`) — the JEE multi-figure precedent. For Acids-3, decide first whether color-from-crop is reliable enough to be worth the 25-question effort. The flawed-option ones (Chem Q51, Carbon Q53) should be excluded, not force-keyed.

### ~~Cleanup pass for the REVIEW-flagged Foundation Chemistry answers~~ — **DONE 2026-06-20**

All **71** flagged answers (the real count, > the ~50 estimate) re-verified via 5 parallel sub-agents + human adjudication (commit on `main`, after `337685b`): **41 CONFIRM** (flag cleared), **10 FLIP** (answer corrected by direct DB `is_correct`+`content_hash` update — NOT re-commit, which would orphan figure `image_url`s), **11 FLAWED → set PRIVATE** with a flaw note (no correct option among the four), **9 kept REVIEW** (5 figure-dependent + 4 borderline-but-defensible). Chemistry 1,024 → 1,014 PUBLIC + 11 PRIVATE. Lessons → [[audit-probe-symmetry]] (adjudicate delegated-agent verdicts) + [[practice-pdf-vision-ingestion]] (image-budget delegation).

<details><summary>original</summary>

All Foundation Chemistry answers were DERIVED (no source keys) and ~50 are `REVIEW:`-flagged in their `overrides.json` (genuinely-flawed source options, ambiguous wording, or low-confidence). They're already PUBLIC (user flipped all). **How to apply:** `grep -l REVIEW scripts/foundation/data/*.overrides.json`, spot-check each flagged item against the source, edit `overrides.json` → delete the changed rows → re-commit.

~~Carry-forward — Document `scripts/practice-paper/` + `scripts/foundation/` in ARCHITECTURE.md~~ — **DONE 2026-06-20**: added a `foundation/` entry + updated the stale `practice-paper/` entry (was "paper BUILDER"; now the `/lws-test-ingest` pipeline) in ARCHITECTURE.md's `scripts/` tree. (The notes `_data` one-liner backfill for Sets & Relations · Definite Integration · Differential Equations is a *separate* still-open carry-forward — see the notes-batch entry below.)

## 2026-06-19

### Complete the NDA Maths grounding + blind-rederivation key-audit (365/2,160 done)

The RAG grounding pipeline ([[rag-grounding-layer]], `scripts/grounding/`) is built and running. 365 of 2,160 NDA Maths PYQs are grounded; the blind re-derivation is doubling as a ~90%-precise wrong-key audit (18 of 21 disputes were real bank errors; 17 fixed). The remaining ~1,800 rows are pending.

**Why:** the audit is the high-value part — it's finding an ~8% real error rate in "audit-closed" NDA Maths that the prior probe-based sweeps missed. Every wrong key left in the bank is a question the tutor (and students) get wrong. Cost: ~13M agent tokens + per-wave source verification.

**How to apply:** run the deliberate batched loop per `scripts/grounding/README.md` — export 4×25 → 4 blind agents → `commit` (agreeing auto, disputes hold) → pull held rows' `pyq_year/month/question_number`, group by paper, source-verify with render+rederive agents over `C:\tmp\PYQPs\NDA\NDA_Maths_PYQPs\` → `apply-fix` the confirmed → repeat. Next up: source-verify wave 4's 5 disputes (`12d160c4`, `254cf562`, `278343c8`, `28fb8efa`, `2dfbd7ce`), then waves 5+.

### Build the RETRIEVAL half (embeddings) + the cross-app grounding API

The augmentation half (solution_json) is in progress; the retrieval half is untouched. Needs: (a) full `plain_text` backfill over all 12,603 pyq (deterministic, `backfill-plain-text.ts --apply`); (b) an embedding model decision — Supabase `gte-small` edge fn vs local `bge-small` (both 384-dim; Voyage a later eval-gated upgrade) + a `generate-embeddings.ts`; (c) the Bearer-secret grounding/retrieval API on PYQ Vault (mirror `src/app/api/sync/mock/route.ts`) that nda-tracker calls. `match_chunks` is already built for whichever model.

**Why:** retrieval unlocks free-form "explain any concept" tutoring (vs v1's "explain THIS in-bank PYQ", which needs only grounding). It's also reusable infra for every future AI product.

**How to apply:** decide the keyless model first (gte-small edge fn is zero-local-setup), backfill plain_text, generate embeddings in idempotent batches of 100, then build the API endpoint. Defer until the NDA Maths grounding/audit is far enough along to be worth serving.

### Resolve the `05c32038` / Q100 doubly-corrupt set (2025 NDA1 Q99+Q100)

Deferred during the wave-1 source pass. The set shares an `f(x)=[√x]` context that the source shows is actually `[x²]`, AND Q100's stem `∫√2 to √2` (zero-width) is also mis-extracted. Both questions + the shared context need a single focused source read of `Maths_2025_NDA1.pdf`.

**Why:** it's a known-corrupt set left ungrounded; both questions are currently unusable.

**How to apply:** render the relevant page, read the real shared context + both stems + both option sets, then `apply-fix` both (context + stems + options + keys). Q99's answer with `[x²]` is `2(√3−√2)` (option B); Q100 needs its real bounds first.

### Review derived answers, then flip the two LWS test papers PUBLIC

The NDA Matrices test (40 q, paper `bed3cfbd-…`) and Vector test B (120 q, paper `dc55cf9e-…`) are ingested PRIVATE `question_kind='practice'`. Their `status:"new"` rows (26 matrices, 102 vectors) are PUBLIC-eligible but **not yet flipped** — the Matrices answers were DERIVED (no printed key) so they need a human spot-check before publishing; the Vector key is verified (lower risk). See [[lws-test-paper-ingest]].

**Why:** until flipped, the 128 new practice questions aren't browsable. The Matrices flip especially should wait on a review — a wrong derived key becomes a wrong OMR grade + a wrong public question (prioritise the flawed Q9/Q25 + the 14 D-keyed answers).

**How to apply:** spot-check the derived answers (the `solution` field ends "Matches option X"; flawed items carry a `reviewNote`), then `npx tsx scripts/practice-paper/flip-public.ts matrices-test --apply` and `… vectors-b --apply`. dup + flawed rows stay PRIVATE by design.

### Document `scripts/practice-paper/` in ARCHITECTURE.md

The generalized LWS test-paper pipeline (`config.ts` PAPERS registry + `build-tags.ts`/`commit-paper.ts`/`flip-public.ts`) isn't in the ARCHITECTURE.md file-layout `scripts/` map — only `scripts/practice/` (the practice-book pipeline) is.

**Why:** CLAUDE.md says "append a new file/component/route to ARCHITECTURE.md, not [the header]"; the new scripts are otherwise only discoverable via the Decisions log + the (gitignored) skill.

**How to apply:** add a one-line `scripts/practice-paper/` entry to ARCHITECTURE.md's scripts list, distinguishing it from `scripts/practice/` (teacher-authored printed test → Excel + paper + deduped practice, vs the practice-book ingestion).

## 2026-06-17

### Continue the MHT-CET Maths /notes campaign (25 chapters un-noted; workflow now captured)

Only 2 of 27 MHT-CET-Maths chapters are noted (Indefinite Integration + Differentiation, shipped 2026-06-16). The CET-Maths chapter playbook is now codified in CLAUDE.md "Notes editorial workflow → step 0 → MHT-CET Maths defaults" + the [[notes-structure-pedagogy-first]] reconfirm, so the next chapter is turn-key.

**Why:** CET Maths is a large, high-traffic exam for the product; the per-chapter cost is now low (clone `differentiation/_data/`, expect a Phase-D reshape, build via a 6-agent batch). Highest-yield next picks by bank size: **Vectors (173 q, 58% HARD)**, **Applications of Derivative (137 q, 26% HARD — gentler)**, Line and Plane (137), Differential Equations (94), Probability Distribution (86). Below the bank-coverage gate (reuse NDA siblings, don't build): Conic Sections (5 q), Sequences & Series (4 q — see [[mhtcet-sequences-notes-deferred]]), Quadratic Equations (3 q).

**How to apply:** pick a chapter → run step-0 analysis (read HARD+MODERATE solutions) → reshape the catch-all bank subtopics → 6-agent parallel batch off a fixed concept skeleton → tag 100% → Step-4 gate chain → smoke-test routes → commit. Default to Vectors or Applications of Derivative.

### Spot-check the MHT-CET Differentiation `a18fbd89` disputed answer key (/solution-cleanup)

During the Differentiation notes build, PYQ `a18fbd89` (`y = sin⁻¹x² + cos⁻¹x²`, asks `(1−x²)y₂ − xy₁`) surfaced an answer-key dispute: the identity gives `sin⁻¹x²+cos⁻¹x² = π/2` (constant) ⇒ `y₁=y₂=0` ⇒ the expression is `0`, but the bank's stored answer key is `−4`. It was taught-but-not-featured in the notes (the identity is correct); the key needs a source verdict.

**Why:** it's a known wrong-key candidate flagged but not resolved; leaving it lets a wrong key sit in a HARD inverse-trig question. Bank-wide content audit is otherwise closed.

**How to apply:** run `/solution-cleanup` (or a targeted re-derivation) on `a18fbd89` — re-read the stem (the `−4` answer likely implies a different intended stem, e.g. `sin⁻¹x + cos⁻¹x` of a non-constant argument, or `(sin⁻¹x)²+(cos⁻¹x)²`); fix the key or the stem per the source. CET source papers are local at `C:\tmp\PYQPs\MHT-CET` ([[mhtcet-source-docx-render]]).

### Harvest the 2 MHT-CET Maths notes chapters for daily quizzes (carry-forward)

Both CET-Maths notes chapters (Indefinite Integration + Differentiation) were authored quiz-ready per Step 1b (Differentiation: `quiz:coverage` 0 formula gaps, 75 traps) but are **unharvested** — the daily-quiz campaign is NDA-only so far. Carry-forward of the broader quiz frontier (see the 2026-06-09 "Wave 3+" entry) extended to MHT-CET; lower priority than clearing the NDA Chemistry/Physics/Biology frontier first.

### Add an error-type signal to wrong-answer remediation (slip vs concept-gap)

The exam/quiz remediation links (2026-06-17) show on EVERY wrong/skipped question. But not every miss signals a knowledge gap — a careless slip on a topic the student otherwise aces doesn't need drilling, and pushing remediation there reads as punitive. A cheap proxy exists: if the student got the OTHER questions in the same subtopic right, the miss is likely a slip.

**Why:** the whole design thesis (2026-06-17 Decisions log) is "remediate the concept gap, not the slip." Without this signal the feature over-triggers; with it, remediation concentrates where it changes outcomes. It's also the higher-leverage axis than concept-precision (which conceptSlug already gives).

**How to apply:** nda-tracker already has per-student per-subtopic stats (`computeStudentChapterStats`). In `QuestionCard`/`FocusedExamResult`, soften or suppress the buttons when the student's same-subtopic accuracy (this exam, or recency-weighted) is high. Keep it a gentle de-emphasis, not a hard hide — a student may still want to revise.

### Teacher per-student exam/quiz drill-in (StudentQuizHistory → QuizReview with buttons)

The teacher's per-student view (`StudentView` → `StudentQuizHistory`) lists quiz attempts as summary rows (title · X/total · score) but can't expand into the per-question review, so the remediation buttons (and the misses themselves) aren't reachable teacher-side. The data is all present (`quiz_attempts.answers` per student + the quiz's questions/key); same gap on the exam side could surface a per-student review.

**Why:** in a coaching setting the teacher often drives remediation ("go drill this"). Surfacing the same Learn/Practice links in the teacher's per-student view is arguably more useful than the student-only version, and it's a small, self-contained add that reuses `QuizReview`.

**How to apply:** make `StudentQuizHistory` rows expandable → render `QuizReview` (read-only) for the clicked attempt, passing `subject` so the buttons resolve. Verify `getQuizAttemptsForStudent` returns `answers` (add to the select if not). Decide scope with the user first (it's a deliberate teacher-side feature, not silent scope creep).

### Persistent "mistake notebook" + fixed-tracking (Phase 2 of remediation)

Today remediation is per-review-screen only. The intuitive next step (the digital error-notebook reframe from the 2026-06-17 analysis) is a running per-student "Mistakes" list that the student clears by re-practising, with visible "6 mistakes → 1 left" progress for the parent. Gate building it on the one metric: do students actually click the Phase-1 links.

**Why:** the notebook is the culturally-resonant version (every Indian topper keeps an error log) and gives the parent-visible before/after. But it's real new state + UI; building it before Phase-1 engagement is proven would be over-engineering. Deliberately deferred.

**How to apply:** measure Phase-1 link clicks first. If real, promote per-screen remediation into a `mistakes`-style rollup (derive "fixed" implicitly = a later correct answer on the same concept/subtopic, so no manual marking). Spacing (resurface at 1/3/7 days) is a further increment, not v1.

### ~~Trim MEMORY.md back under its size budget~~ — **DONE 2026-06-17**

Trimmed the 13 longest index one-liners (notes-self-sufficient-template, cross-app, practice/JEE/CDS ingestion, content-audit, daily-quiz, quiz-coverage, paper-builder, public-quiz, test-data-leak, mhtcet-docx, notes-structure, etc.) — moved detail into the topic files, kept the hooks. MEMORY.md now **24,549 bytes ≈ 23.97 KiB**, under the 24.4 KiB limit with headroom; all pointers verified resolving.

The memory index is ~25.4 KB against a ~24.4 KB limit (the loader warned it's truncating). New memories can't be added cleanly until it's trimmed.

**Why:** an over-budget index gets partially loaded, so the tail entries silently stop surfacing in recall — the index's whole job. Several entries are long enough to shorten without losing the hook.

**How to apply:** tighten the longest one-liners (the notes-self-sufficient-template, content-audit-progress, practice-ingestion, JEE entries each run 200–400 chars) — move detail into the topic file, leave a ≤150-char hook. Or merge a couple of near-adjacent reference entries. Target ~22 KB to leave headroom.

## 2026-06-15

### A school / Class-10 (non-NDA) chapter list for nda-tracker's tag validation

> **Update 2026-06-15 — the BLOCKING is RESOLVED.** nda-tracker now treats chapter-name mismatches as a non-blocking amber **warning**, not a hard block (commit `597bf0b`; see nda-tracker DECISIONS.md/GUARDRAILS.md 2026-06-15). So school papers upload with `Subject=Maths` once deployed — no `Others` workaround needed. What remains below is now an **optional, low-priority nicety**: a *populated* Class-10 list so school chapters validate cleanly (amber-free) instead of merely warning.

The user runs non-NDA **school Class-10 / SSC** Maths tests through nda-tracker for grading (e.g. the "APJ school" 50-q paper this session). nda-tracker's `validateTags` validates the "Maths" subject against the **NDA** chapter list (`NDA_FREQ_BY_SUBJECT.Maths`, synced to PYQ Vault's 31). A Class-10 paper tagged with Class-10 chapters (Polynomials, Arithmetic Progressions, Real Numbers, Pair of Linear Equations, Areas Related to Circles, …) **HARD-BLOCKS the upload** — confirmed 2026-06-15 ("33 chapter name issues — fix to continue"; `findClosest` returns null so there's "No suggestion found"). Not a soft warning — the wizard won't proceed. **Immediate workaround (no code):** set the tags-file `Subject` column to an empty-list subject (`Others`) → `validateTags` skips validation; grading unaffected.

**Why:** it fully blocks a real, recurring workflow (the user runs school Class-10 tests through nda-tracker). Medium urgency — the `Others` workaround unblocks today, but a clean Class-10 path is worth having.

**How to apply (nda-tracker, `src/lib/ndaFreq.js` + `validateTags.js`):** cleanest is a **subject whose chapter list is empty `[]`** — `validateTags` already *accepts any chapter when the list is empty* (that's how the GAT subjects work). So either (a) add a `"Maths (School)"` / `"SSC Maths"` subject key with `[]` and let the user pick it for school tests, or (b) add a populated Class-10 list (Real Numbers, Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Introduction to Trigonometry, Heights and Distances, Circles, Areas Related to Circles, Surface Areas & Volumes, Statistics, Probability) under that key so the freq chart still works. Option (a) is ~2 lines; option (b) gives real validation. Pure nda-tracker code, no DB migration (the freq is a JS constant + a persisted store seed).

### Spot-check CDS English LLM-derived answers before flipping PUBLIC

CDS English booklets carry **no official answer key**, so every answer in the bank is LLM-derived + confidence-flagged (HIGH/MED/LOW). **All 19 papers (2,280 q) now committed PRIVATE**; per-paper review HTMLs at `scripts/cds/out/<id>.preview.html`. **Nothing should go PUBLIC until a human reviews at least the MED items** (they cluster in the genuinely-hard-keyless types: sentence/part-rearrangement grids, S1/S2 relationship, match-list code grids, word-usage). Prioritise the **oldest dense scans (2017-1 worst, 60 MED)** + the P/Q/R/S part-rearrangement grids; the 2025 match-list code grids were flagged as possibly OCR-degraded (e.g. 2025-I Q71/72/75/77) — recheck those against the source crops.

**Why:** a PYQ-first product showing wrong answers as authoritative erodes trust; the confidence flags exist precisely so this review is targeted, not exhaustive.

**How to apply:** open each `out/<id>.preview.html`, focus the amber (non-HIGH) cards, confirm/correct against the rendered source pages, then flip PUBLIC per paper. A future helper could surface only the MED rows for review.

### ~~Finish CDS English ingestion (15 papers + 2024-1 RC) + push the branch~~ — **DONE 2026-06-16**

All **19 CDS English papers (2017-I … 2026-I = 2,280 q)** committed PRIVATE on `main` + pushed; per-exam dedup migration 0038 shipped. Pipeline + per-paper detail in [[cds-english-ingestion]]. **Consistency cleanup — DONE 2026-06-16:** 2026-1 back-ported from the trial `commit-trial.ts`+`final.json` to the standard `data/2026-1.*` shape (verified the round-trip reproduces the committed rows exactly; standard `commit.ts 2026-1 --apply` → `inserted=0 skipped=120`); legacy `final.json` + `commit-trial.ts` removed. All 19 papers now reproducible identically via `commit.ts`.

### ~~Manual authed golden-path for the collaborative paper builder~~ — **DONE 2026-06-15** (user-verified in browser)

The paper builder (migration 0039) shipped + pushed to `main` on a green gate, and the data layer is proven by 9 RLS/integration tests, but the **authed teacher render** of the editor (`/dashboard/papers/[id]` → `PaperEditor` + `AddQuestionsPanel`) was never exercised in a browser (needs a real signed-in session; can't be done headlessly). The `ƒ`-page pitfall (build-green ≠ runtime-ok) makes a manual pass worthwhile.

**Why:** Definition-of-Done requires the golden path verified in the browser; an authed render-time bug (e.g. a serialization or client-island issue) would only show under a real session.

**How to apply:** sign in as a TEACHER (org member), UserMenu → Papers → New paper; add questions via the editor's search panel AND via "Add from Browse" (`/browse?paper=<id>`); have a SECOND teacher add to the same paper (confirm both land, sections auto-file); edit the section template (add/rename/delete a section → its questions fall to "Unassigned"); Finalize → Download (Question Paper / Answer Key / Tagged sheet); Reopen. Watch light + dark.

### ~~Drag-reorder questions within a paper section~~ — **DONE 2026-06-15** (up/down buttons)

Shipped as **up/down move buttons** per question row (user chose this over drag — accessible, touch/tablet-safe, no new dependency). New pure `positionForMove(orderedRows, questionId, "up"|"down")` in `src/lib/papers/sections.ts` (7 TDD cases) computes the fractional target via `positionBetween`; `reorderQuestion`/`reorderQuestionAction` UPDATE `paper_questions.position`; buttons disabled at section edges. (Original spec kept below.)

The editor's move control is a section `<select>` that **appends to the end** of the target section; there's no fine within-section ordering or drag-and-drop. The DB already supports it — `paper_questions.position` is a `double precision` and `positionBetween(before, after)` (pure, in `src/lib/papers/sections.ts`) returns a fractional midpoint for insert-between-neighbours without renumbering.

**Why:** exam papers care about question order within a section; "append only" forces delete+re-add to reorder. The hard part (fractional positions) is already built and tested.

**How to apply:** add a drag handle per question row in `PaperEditor` (a lib like `@dnd-kit` or native HTML5 DnD — prefer native to avoid a dep per the project's dependency rule), compute the new `position` via `positionBetween(prevRow.position, nextRow.position)`, and add a `reorderQuestionAction(paperId, questionId, position)` wrapping a `paper_questions` position UPDATE. Snapshot/export already read position order, so no other change.

### ~~Section-assignee UI + "added by" attribution in the editor~~ — **DONE 2026-06-15**

Shipped: the SectionManager dialog now has per-section assignee toggle chips (org members via the service-role `listMembers(orgId)`, since `org_members` read RLS is admin-only) wired to `setSectionAssignees` → `updateSectionTemplate`; assignees render as chips on each section progress bar; and each question row shows "· added by &lt;name&gt;" (resolves `paper_questions.added_by` via a uid→label map passed from the editor page). (Original spec kept below.)

The schema carries two collaboration signals the UI doesn't surface yet: `section_template[].assignedTo` (the soft "who's working this section" hint — `setSectionAssignees` exists in `template.ts` but no UI sets it) and `paper_questions.added_by` (stored on every add, never displayed).

**Why:** these are what make the "soft assignment" + multi-teacher model legible — a teacher should see which sections are claimed and who added each question, without it being a hard lock. Low effort, high coordination value.

**How to apply:** in the SectionManager dialog, add an assignee multi-select per section (org members from a `listOrgMembersAction`) wired to `setSectionAssignees` → `updateSectionTemplate`; render assignee chips on each section header + the progress bar. In the question list, show a small "added by &lt;name&gt;" on each row (resolve `added_by` → member name; the editor page already has the membership, just needs a uid→name map). Pairs naturally with live presence below.

### Live presence on the paper editor (Supabase Realtime)

The explicitly-deferred Phase 2: show "Teacher B is editing the Physics section right now" via Supabase Realtime presence/broadcast, and live-update the section counts as collaborators add questions (today each client only sees its own adds until `router.refresh()`).

**Why:** real-time awareness is the polish that makes simultaneous multi-teacher editing feel collaborative rather than blind; it also removes the "did my colleague already add this?" guesswork. Deferred from v1 as non-essential (the junction model + per-section progress already make concurrent editing correct, just not live).

**How to apply:** subscribe the `[id]` editor to a Supabase Realtime channel keyed on the paper id; broadcast presence (user + active section) + INSERT/DELETE events on `paper_questions` for that paper; merge incoming changes into the editor's local state instead of (or alongside) `router.refresh()`. Gate it behind the same org-member check. Note Realtime needs the `paper_questions` table added to the realtime publication.

### Browser-verify the NEW cart→paper "Add to paper" flow

The earlier "Manual authed golden-path" (struck DONE above) verified the **old** per-card `/browse?paper=` mode, which was **removed 2026-06-15** and replaced by the cart→paper bridge (commit `c5c27d9`). The new path — cart panel → "Add to paper" → pick/create a draft paper → bulk-commit — passed the gate + integration tests but hasn't been eyeballed authed in a browser.

**Why:** it's a new UI surface (`AddToPaperDialog` in `CartPill`) on the high-traffic `/browse`; the `ƒ`-page pitfall (build-green ≠ runtime-ok) plus the org-member gating make a quick authed pass worthwhile. Also confirms the "Download paper" vs "Add to paper" two-button footer reads cleanly on mobile.

**How to apply:** sign in as a TEACHER, `/browse` → Add a few questions to the cart → open the cart pill → **Add to paper** → confirm the active-paper picker lists drafts (+ "New paper"), bulk-commit, and the toast reports `added`/`already there` + "View paper". Re-commit the same cart → expect "0 added · N already there". Check the cart is NOT cleared. Confirm anon users see only "Download paper" (no "Add to paper"). Watch light + dark + mobile.

## 2026-06-14

### ~~Refresh the nda-geography guide's per-subtopic %HARD numbers (Mountains, States are stale)~~ — **DONE 2026-06-14**

Synced all per-subtopic counts/%HARD across the 5 nda-geography guide `_data` files for every chapter this session's reclassifications changed (Economy: Agriculture 36→20 etc.; Earth's Structure: Interior 18→15, Earthquakes 8→9 etc.; Physical: Mountains 43→14% + dropped the stale "densest-HARD" framing; Climatology + Oceanography after the #2 catch-all moves). Other NDA guide subjects' banks didn't change this session, so their drift (pre-existing) is left for a separate audit.

The Physical "Forests" Phase-D split synced the guide prose for the subtopics it touched (Rivers/Forests/Soils/Climate + the new Location subtopic), but while editing those sentences I noticed two **pre-existing** stale figures the split did NOT cause: the guide quotes "Mountains, Plateaus and Plains (7 q · **43% HARD** — densest HARD pool)" and "Indian States and Islands (4 · **25% HARD**)", whereas `npm run stats`-class live queries show Mountains at **14% HARD** and States at **0% HARD**. These predate this session (the guide was built on older/different data) and are outside the split's blast radius, so I left them.

**Why:** the guide's "densest-HARD subtopic" framing now points at the wrong subtopic (post-split, Forests at 29% is the densest, not Mountains). Low-stakes (editorial prose, no test depends on the numbers), but it's a visible inaccuracy a student could act on.

**How to apply:** run a per-subtopic `COUNT(*) FILTER (WHERE difficulty='HARD')` for all 6 NDA Geography chapters (one query), then update the %HARD figures in `src/app/guide/nda-geography/_data/{nda-geography,playbooks,playbook-details,strategy,trends}.ts`. Consider doing the same one-query audit for the other 6 guide subjects — the guide %HARD numbers have drifted as the bank grew. ~20 min.

### ~~Review other reorder-only catch-all subtopics for a Phase-D split~~ — **DONE 2026-06-14**

Split two more: Climatology "Atmospheric Layers" (4/14 off-topic) — moved the tropical-cyclone-formation + cold-local-wind questions to "Cyclones, Fronts and Local Winds" (relocated the concept + retag; the local-winds concept already taught Mistral), leaving 2 world-vegetation stragglers under an honest `regional-recall` concept. Oceanography "Marine Ecosystems — Coral Reefs" (2/3 off-topic) — moved the Mariana-Trench question to "Ocean Waves and Sea-Floor Topography" and the Agulhas-current question to "Ocean Currents" (both pure retags — the target concepts already taught the facts), removing the `named-ocean-features` concept. Coverage + mistag clean; guide figures synced.

The Geography notes agents kept everything reorder-only, which surfaced (and we fixed) the Physical "Forests" catch-all. Their handoffs flagged at least one more residual mini-catch-all left as-is: Climatology's **"Atmospheric Layers, Composition and Aurora"** DB subtopic houses misfiled recall (world-vegetation/savanna, a cold-local-wind item, a tropical-cyclone-formation item — tagged honestly under `regional-recall`/`tropical-cyclone-conditions` concepts). Other recall chapters across subjects may have similar low-grade catch-alls.

**Why:** a catch-all subtopic makes the /notes page read as a mixed bag and rots `/browse` filtering. The Forests split proved the cleanup is cheap when the facts are already taught in the right concepts ([[notes-self-sufficient-template]]).

**How to apply:** per suspect subtopic, SQL-read the stems; if a meaningful fraction is off-topic, Phase-D-split them into existing subtopics (+ a new subtopic only where nothing fits). Cheap because the relocated facts usually already have a home concept — re-derive the tags, not the teaching. Only worth it for the worst offenders (≥~30% off-topic); a couple of stragglers are fine left as honestly-named concepts.

### ~~Source-verify the remaining agent-flagged Geography UNCERTAIN items (low priority)~~ — **DONE 2026-06-14**

Source-verified the two genuinely-suspect items against the GAT PDFs: `8584266a` (2024 NDA-2, "which states never get perpendicular Sun") — extraction faithful, but key A (Bihar & Chhattisgarh) is geographically wrong; the Tropic crosses Chhattisgarh, so the answer is Bihar & Manipur (B). `9a0a10a4` (2018 NDA-2, NE-places sunrise order) — key C places Imphal last despite it being easternmost; by longitude the answer is B. Both keys PRESERVED (no source key page to confirm the official answer) with honest solutions deriving B + flagging the discrepancy; the featured perpendicular-Sun card was de-featured + a trap added so the notes teach the correct answer. The other flagged items are option-bound recall taught at the correct-principle level — no wrong fact, left as-is.

The 6-agent Geography build flagged a handful of option-bound or report-year-dependent facts the agents handled honestly (taught "among the listed states", taught both forest-cover report years, hedged the Coriolis framing, taught the Bihar/Chhattisgarh perpendicular-rays *principle*). I source-verified only the two clear-cut ones (Assam-China, chert/shale). The rest are taught at the correct-principle level and don't depend on a possibly-wrong key.

**Why:** completeness — but genuinely low priority; none teaches a wrong fact, they're just option-bound answers where the official key could be contested.

**How to apply:** the GAT PYQ PDFs are local at `C:\tmp\PYQPs\NDA\GAT_Edited\` — render the relevant page (PyMuPDF → Read, per [[gdrive-pdf-fetch]]) only if a specific flagged item is challenged. Not worth a batch pass.

### ~~Browser smoke-test `/guide/nda-physics/ncert-map`~~ — **DONE 2026-06-14**

The smoke test caught a **production 500** the green build had missed: a `<NcertChip>` prop named `ref` (React-reserved) crashed the RSC render. Root-caused via dev (full error), renamed `ref`→`item`, curl-verified HTTP 200 + content renders (chapter rows, watch/dormant chips, Drill links). Fix on `main` (`4018a5e`). Lesson banked in CLAUDE.md "Recurring pitfalls" (build-green ≠ runtime-ok for dynamic `ƒ` pages). **Still worth a human light/dark visual pass** for chip contrast — the curl check confirms render, not aesthetics.

### Extend the NCERT↔NDA cross-walk + weak-signal detector to other NDA subjects

`/guide/nda-physics/ncert-map` is the first source-syllabus cross-walk page ([[weak-signal-trend-detection]]). The same shape applies to NDA Chemistry, Biology, Maths → NCERT — each could surface a Class-12 watch-list of its own.

**Why:** the detector's value compounds across subjects (Chemistry especially leans Class-11/12 physical chemistry); and it gives NCERT-oriented students a discovery path into each subject's bank. The pure `signalStatus()` helper + the test pattern are reusable as-is.

**How to apply:** per subject, author a `_data/ncert-map.ts` (NDA-keyed → NCERT refs, class-tagged), run the per-topic recency probe to populate `signal` on the Class-12 watch-list topics, clone `ncert-map/page.tsx` + the test, add a `ROUTES` entry. Consider promoting the shared bits (`NcertRef`/`signalStatus`/the page shell) into a generic component once the 2nd subject lands (don't parameterise before the 2nd, per the project's "don't abstract until forced" norm). The richer Phase-2 (an NCERT-name → NDA-chapter alias feeding `/browse` search) is still deferred — the page covers discovery for now.

### Refresh mechanism for the ncert-map `signal` recency numbers

The Class-12 watch-list recency (`lastSeen` + `recentCount`) in `ncert-map.ts` is an **authored snapshot** (`SIGNAL_SNAPSHOT=2026-06-14`), so the live/watch/dormant flags drift as the bank grows — the exact staleness class in [[project-docs-staleness]].

**Why:** the whole point of the detector is to flip a topic to `live` when it recurs; a stale hand-snapshot defeats that silently. Low urgency now (numbers are fresh), but it compounds.

**How to apply:** either (a) a small probe script (`npm run` target) that re-emits the per-topic `{lastSeen, recentCount}` from the live bank for paste-in, or (b) derive recency live in the page from a keyword-tagged query (heavier — keeps the page a server component but adds a per-request scan; the authored snapshot is cheaper and a refresh script is probably the better ROI). Fold a refresh into the post-upload ritual when NDA Physics gets new PYQs.

---

## 2026-06-12

### ~~Harden `global-teardown`'s leak-assertion against the delete-visibility race~~ — **DONE 2026-06-12**

Extracted the 4-stage sweep into a re-runnable `sweepTestData(admin)` and added a pure, injectable `sweepUntilClean(check, sweep, {attempts, delayMs, sleep})` helper in `tests/global-teardown-helpers.ts` (TDD: 4 new cases — clean-first/race-clears/persists/sleeps-between). `assertNoLeakedTestData` now re-sweeps + re-checks up to 3× (750 ms apart) before throwing, so an already-doomed survivor clears on retry instead of false-throwing; a genuine leak persists through every re-sweep and still fails the run. 12 helper tests green. See [[shared-db-test-flake]].

### ~~Quiz Waves 5-7 — finish NDA Maths~~ — **DONE 2026-06-12**

Waves 5 (binomial-theorem/properties-of-triangle/indefinite-integration/conics), 6 (inverse-trigonometry/trigonometric-equations/circles/logarithms), 7 (applications-of-integration/height-distance/binary-numbers) + the binomial-distribution single-add **completed all 30 noted NDA Maths chapters** (~120 quizzes built). Every predicted verify key matched first run. The bulk of the work was computation top-ups (the "MCQ-clean" count conflates formula pieces with computation → most chapters had near-zero practiceSet) + trap-callout top-ups; honest parks where content was genuinely thin (binary formula 8, conics computation 3). See QUIZ_FACTORY.md + [[daily-quiz-pilot]] + [[quiz-formula-coverage-gap]].

### Harvest the new NDA Chemistry (11) + Physics (9) + Biology (8) notes chapters for quizzes (carry-forward)

The 2026-06-10/11 Chemistry + Physics notes and this session's 8 new NDA Biology chapters are all authored quiz-ready (Step 1b) but **unharvested** — a large fresh frontier beyond NDA Maths. Chemistry/Biology are recall-heavy (rich `fact`/`trap` themes); Physics is formula-heavy.

**Why:** **NDA Maths is now 30/30 complete (2026-06-12), so this is the PRIMARY next-session frontier.** Broadens the daily-quiz beyond Maths into the other NDA subjects; these chapters were built quiz-ready specifically so the harvest needs no rework. (Note the recall-subject difference: Chemistry/Biology lean `fact`+`trap` themes, so expect computation to be thin/parked and `fact` from reference tables to be the bulk — different shape from Maths.)

**How to apply:** same per-chapter cadence; recall subjects lean `fact` (reference-table) + `trap` themes rather than computation. HP (Biology) is already done as the template for a recall-heavy chapter.

### ~~Review + flip the practice pilot PUBLIC (Sequence & Series, 84 q)~~ — **DONE 2026-06-12**

All 3 ingested practice topics flipped PUBLIC after preview review (Sequence & Series 84 + Logarithms 26 + Statistics 81 = 191 q). Live /browse smoke confirmed the PYQ/Practice/All toggle works on production (kind=practice → "84 questions match" for Sequence & Series).

### ~~Scale practice ingestion to more topics/subjects~~ — **DONE 2026-06-13**

Completed in a later session (not /update-docs'd at the time): **ALL 5 source folders ingested → 3,040 practice q across 29 NDA Maths chapters**, all PUBLIC (only Mathematical Induction skipped — no NDA Maths home). See CLAUDE.md Decisions log 2026-06-13 + [[practice-ingestion]]. Original spec kept below.

**Progress 2026-06-12:** ingested Logarithms (26 q) + Statistics (81 q) + Complex Numbers (82 q) + Quadratic Equations (62 q) on top of the Sequence & Series pilot — **5 NDA Maths topics now PUBLIC (335 q)**. STILL OPEN: Algebra's remaining sub-topics (Sets/Relations/Permutation/Combination/Binomial/Matrices/Determinants/Probability — each maps to an existing NDA Maths chapter; next contiguous in the book is Permutation & Combination at Q233+) + the Trig / 2D / 3D / Calculus folders (different source PDFs → new `TOPICS` entries). New per-topic finding banked this run: a 3rd-party book ships **genuinely-flawed MCQs** (correct answer not among the printed options) → **exclude them** (don't transcribe; they show as intentional coverage gaps), never ship a guessed key — see the override/stem-fix/EXCLUDE triage in [[practice-pdf-vision-ingestion]].

**Why:** broadens the practice bank. It is a **workflow, not automation** — budget the per-section vision-transcription + verification pass. The 3 done averaged near-0 wrong keys, but number-dense topics (Statistics) needed half-column crops to read values reliably.

**How to apply:** follow `scripts/practice/README.md`. Per topic: verify the answer-key + solution Q-ranges exist for that section (solution coverage varies by source PDF), confirm the practice section maps to an **existing** NDA Maths chapter (skip ones with no home, e.g. Mathematical Induction / System of Equations — never auto-create), add a `TOPICS` entry, run render→transcribe→commit→preview→flip. For number-dense sections render half-column crops, not just per-column.

---

## 2026-06-11

### ~~Sweep leaked `auth.users` test accounts~~ — **DONE 2026-06-11**

Cleaned 11 orphaned `@test.local` accounts (guarded: test domain, no `org_members`, never the real admin) and added a permanent auth-user sweep to `global-teardown` (`isTestAuthEmail`, via `admin.auth.admin.listUsers`/`deleteUser`) + a guardrail that throws if any test orgs/subjects/auth-users survive. See [[test-data-leak-org-signal]].

### ~~Purge the `pubtest` test quizzes + dummy atoms~~ — **DONE 2026-06-11**

Deleted both quizzes (`nda-maths-resq1781117516622-formula-1` + `pubtest-priv-1781117516622`) via `quiz:delete` (propagated to nda-tracker) and the 3 `pubtest-%` dummy atoms via SQL. `quiz:lint` is now 0-flagged.

### Publish the now-clean formula quizzes (carry-forward)

Carry-forward of the still-open "Publish more public-funnel quizzes" entry below (2026-06-10) — **now unblocked**: the 20 formula quizzes are reworked to publish quality (0 broken stems), so a "Formulas of the day" share link is viable alongside the trap/HP suggestions already noted there. No new spec; see that entry.

### Dashboard `/dashboard/quizzes` server-side filtering + pagination (carry-forward → ROADMAP)

The 60-cap was fixed 2026-06-11 (limit→1000 + true count), good to ~1000 quizzes. The scalable version (push filters into the query, drop per-quiz `questions` from the list payload + lazy-load on expand, paginate) is fully specced in **ROADMAP.md → Admin tooling**. Surface here only as a pointer; act on it when the bank nears ~1000 quizzes.

---

## 2026-06-10

### ~~Structured distractor-candidate generators in the harvester~~ — **DONE 2026-06-10** (numeric atoms)

Shipped `errorTransforms()` in `src/lib/quiz/atoms.ts` (TDD `tests/quiz-error-transforms.test.ts`) — `harvestProblem` seeds `candidate_distractors` for SIMPLE-numeric answers (int/decimal/fraction) with sign-flip/double/off-by-one/fraction-swap variants (e.g. `8`→`[-8,16,9]`), falling back to siblings for non-numeric. A proposal the verify pass accepts/edits. All 11 harvested chapters re-harvested (candidate_distractors only; 0 correct/answer drift). Original spec kept below — **only the numeric case is covered**; expression/formula permutation transforms (the harder, problem-specific part) remain manual.

The distractor-authoring bottleneck is fully manual (parallel agents hand-write 3 wrong options per atom). But many wrong answers follow MECHANICAL error-transforms — sign flip, reciprocal, off-by-a-factor, swapped operands, `1±x` vs `1∓x`, `a+b` vs `√(a²+b²)`. The harvester could PROPOSE candidate distractors by applying these transforms to the correct answer, so the human refines rather than authors from scratch.

**Why:** distractor authoring is the single bottleneck of the whole factory (harvest/sync/assemble take seconds; the agents are the token cost). Even a partial reduction (formula/structured atoms) compounds across the ~17 remaining chapters. Raised in the 2026-06-10 "workflow vs template" discussion as the genuine "better method".

**How to apply:** add an `errorTransforms(correct, theme)` helper emitting candidate wrong-variants per theme (formula → permutation transforms; numeric → ±factor/sign), surfaced as `candidate_distractors` the verify pass can accept/edit — replacing the current cross-category sibling guesses. Keep it a PROPOSAL: the human still approves (distractor quality is the value). Math-aware distractors are problem-specific, so it helps formula/structured atoms more than word problems.

### ~~Bucket 2 — enrich the empty-`formula.latex` concepts flagged by `quiz:coverage` (Wave 2 chapters)~~ — **DONE 2026-06-10** (triage-disciplined)

Triaged all 16 flagged concepts across the 3 Wave-2 chapters → **only 4 had genuine recallable formulas** (the probe over-flags, as warned): `diff-via-limit-definition` (first principles), `diff-inverse-trig-simplify` (5 standard collapses), `ap-clever-identities` (3 AP identities), `gp-product-symmetry` (2). The other 12 are correctly TECHNIQUES (read-symmetric-form, log-diff, substitute-point, AGP shift-subtract, collinearity criteria) → left empty. Enriched 11 formula atoms → Seq +1 formula quiz, Diff's formula quiz to 18 Q; **3D-Geo gained 0** (all 5 flagged are methods). The mechanism stays for future chapters via the cadence. Original spec below.

`quiz:coverage` flags concepts that teach a formula in `definition` prose but leave `formula.latex` EMPTY (3D-Geo 5, Seq-Series 6, Diff 5 at last run). Enriching these would add formula-recall atoms + render the notes' formula blocks fuller. **Deferred deliberately** in Wave 2: all 3 chapters already cleared 12 formula atoms from their non-empty concepts, so a formula quiz didn't need it — this is *completeness*, not blocking.

**Why:** completeness of the formula theme + better student notes. Low priority — no quiz is missing because of it.

**How to apply:** per flagged concept, **triage first** (the probe over-flags prose derivation steps — only genuine recallable formulas count), then **append** the formula to the concept's `formula.latex` (append-only preserves piece indices/fingerprints; safe on EMPTY concepts) → re-harvest → author the new pieces in `-formulas.ts` → delete + re-assemble that chapter's formula quiz. Same mechanism as Matrices Path A. Fold into a chapter's build when convenient, not as a separate campaign.

### ~~Finish NDA Physics notes — the 3 borderline chapters~~ — **DONE 2026-06-11**

Shipped Gravitation (3 sub · 14 concepts · 17 q · 3 SVGs · `grav-`), Units, Measurement & Dimensions (1 sub · 9 concepts · 14 q · 1 SVG · `umd-`), and Oscillations & Waves (2 sub · 6 concepts · 13 q · 3 SVGs · `osc-`) via the 3-agent parallel loop + serial merge. NDA Physics notes now **12 of 14** (only Astronomy 4 q + Energy Sources 2 q remain, below the bank-coverage gate — `/browse`-only). All reorder-only, 44/44 q tagged at 100%, mistag detector clean, full gate green. **One audit flag surfaced:** Gravitation escape-velocity PYQ `95e70f86` (2024 NDA-1) is a **wrong-key candidate** (stored B=15.8; re-derivation gives A=11.2 — v_e ∝ R√ρ so ½·√4=1, unchanged) — **DB key flip B→A applied 2026-06-11 with user approval** (solution rewritten, content_hash recomputed). Original spec below.

NDA Physics notes shipped **9 of 14 chapters** 2026-06-10 (the 7 that cleared the bank-coverage gate cleanly). Three borderline chapters remain buildable: **Gravitation (17 q · 3 sub) · Units & Measurement (14 q · 1 sub) · Oscillations & Waves (13 q · 2 sub)**. Astronomy (4 q) + Energy Sources (2 q) are below the gate — leave `/browse`-only.

**Why:** completes NDA Physics for LWS lesson-plan coverage + grows the Quiz-Factory/public-funnel pool. Deferred only because the user scoped this batch to the 7 gate-clearing chapters.

**How to apply:** same parallel-agent loop as the 7 (or solo — they're thin), bank-coverage-gate read first per [[notes-self-sufficient-template]]; formula-heavy + a few diagrams (Gravitation orbit/escape-velocity; Oscillations SHM/waveform; Units dimensional, diagram-light). Reorder-only — the nda-physics Template-C guide references subtopic names, so grep `src/app/guide/nda-physics` before any rename.

### Publish more public-funnel quizzes (the funnel is proven live)

The public lead-magnet funnel went live 2026-06-10 with ONE quiz (`nda-probability`, HTTP 200). Eight more Probability quizzes (5 computation + formula/property/trap) plus every other complete chapter's quizzes are assembled + pushed but `public_slug=null` (nda-tracker-only).

**Why:** more shareable public quizzes = wider cold-traffic lead capture, now that the mechanism is proven end-to-end. The **trap quiz** ("spot the mistake") is a strong share hook; a formula or Human-Physiology quiz broadens topic coverage.

**How to apply:** pick a quiz, `npm run quiz:lint <route> <chapter>`, set `public_slug` (clean shareable slug, e.g. `nda-probability-traps`) via `setQuizPublicAction` on `/dashboard/quizzes` or SQL, verify HTTP 200. Leads roll up at `/dashboard/leads`; premium CTA stays dormant until Razorpay ([[project-paywall-build]]).

---

## 2026-06-09

### ~~Build /notes for the 6 remaining un-noted NDA Maths chapters~~ — **DONE 2026-06-09** (5 of 6, parallel build)

Shipped Circles · Logarithms · Applications of Integration · Height & Distance · Binary Numbers in parallel (5 concurrent agents → serial merge). NDA Maths notes now **30 of 31**. **Linear Inequalities (5 q) deliberately skipped** — below the bank-coverage gate; fold into a related chapter or leave `/browse`-only. The ARCHITECTURE.md backfill sub-note below was also addressed for these 5 (their `_data` one-liners are in ARCHITECTURE.md), but **Sets & Relations · Definite Integration · Differential Equations are still missing from that list** — carry forward. (Original spec kept below.)

After the 2026-06-09 autonomous 5-chapter batch, NDA Maths notes stand at 25 of 31 chapters. The 6 left (PUBLIC q): **Circles 27 · Logarithms 27 · Applications of Integration 25 · Height & Distance 24 · Binary Numbers 13 · Linear Inequalities 5**.

**Why:** finishing NDA Maths makes the subject's notes complete (lesson-plan coverage for LWS teachers) + grows the Quiz-Factory + public-funnel pool. The first four (24–27 q) are solid standalone chapters; the small two need a bank-coverage gate check first.

**How to apply:** same loop as the 5-chapter batch — per chapter, grep `src/app/guide/nda-maths` for the chapter's subtopic names (reorder-only if referenced), pull HARD+MODERATE solutions, design pedagogy-first concepts with a foundation, author `_data` + diagrams + wrappers + registry, tag, verify (notes:lint/latex/order/coverage), commit. **Logarithms** — check first whether the bank's log questions are a coherent teaching unit or scattered algebra (it's more a cross-chapter tool). **Linear Inequalities (5 q)** is below the bank-coverage gate ([[notes-self-sufficient-template]]) — likely fold into a related chapter or leave `/browse`-only rather than ship a hollow chapter. Sub-note: ARCHITECTURE.md's notes `_data` one-liner list is still missing **Sets & Relations · Definite Integration · Differential Equations** (3 prior-session chapters) — backfill them when next in that file.

### ~~Audit two flagged Definite Integration solutions (/solution-cleanup)~~ — **DONE 2026-06-09**

Resolved earlier this session (and re-confirmed when clearing the backlog): `b7044159` keys **A = ln(8√e)** (matches the f(x)→1/x derivation); `6f4b78e9` keys **B = π preserved with a source-verified defect note** (the true value (π+2)/(π−2) isn't among the printed options — a defective printed question). Original note kept below.

Surfaced during the Quadratic Equations Step-0 read of the *already-shipped* Definite Integration chapter (not re-audited this session). Two HARD "Properties" items in `Definite Integration`: (1) `8∫₁²f(x)dx` (id `b7044159-69e7-4035-85f0-46f6372bc1c9`) — the bank solution computes `ln(8√e)` but defers to key `ln(8e)`, a possible wrong-key; (2) `(I₁+I₂)/(I₁−I₂)` (id `6f4b78e9-27ea-47ec-ae4b-d8b6dca4f904`) — the computed value `(π+2)/(π−2)` isn't among the printed options (official key B = π preserved as a printed-paper defect).

**Why:** #1 is a genuine wrong-key candidate (the JEE/DI audit hasn't been done — DI carries source keys verified only at ingestion). Cheap to resolve; a wrong key on a HARD featured-able question is high-harm.

**How to apply:** re-derive both from scratch (the `8∫₁²f` one: `8∫₁²(3/(8x)−x/8+1/4)dx = 3ln2 − 3/2 + 2 = ln8 + 1/2 = ln(8√e)` → if correct, flip key to `ln(8√e)`; verify against the source PDF via [[gdrive-pdf-fetch]]). #2 is likely a preserve-with-note (printed defect). Part of a future DI content-audit pass (DI + JEE are the un-audited remainder per the header).

### ~~Bypass KaTeX for underline-only words in the web renderer~~ — **DONE 2026-06-09**

Shipped: `src/components/math/underlineBypass.ts` (`matchUnderlineBypass` + `UNDERLINE_BYPASS_RE`, mirrors the docx pattern in `ommlBuilder.ts`) + a pre-check in `KatexRenderer` that emits a native underlined `<span>` in the body font for a standalone `\(\underline{\text{…}}\)` / `\(\underline{\textit{…}}\)` zone (fixes the font mismatch + the line-clamp break) + `tests/underline-bypass.test.ts` (6 cases). Covers /browse cards, WorkedExampleCard, editor preview (all via KatexRenderer/BlockText). RichText (notes definitions) deliberately untouched — no bank-underline content flows through it. Genuine math, `\textbf`, and chained/embedded underlines fall through to KaTeX unchanged. Original spec kept below.

English (vocab/idioms) and Biology (taxonomy) questions store the underlined word as a KaTeX math zone — `\(\underline{\text{absently}}\)` / `\(\underline{\textit{...}}\)`. So `KatexRenderer` typesets that one word in KaTeX's font (KaTeX_Main) instead of the body Source Serif → it looks like a different typeface dropped mid-sentence, AND the `.katex` inline-block breaks `-webkit-line-clamp` (the mid-sentence "tha…" truncation artifact on `/browse` collapsed cards).

**Why:** it's bank-wide (all NDA English + Biology underline questions) and visibly "weird"; KaTeX is the wrong tool just to underline an English word. The `.docx` export already solves this with `UNDERLINE_BYPASS_RE` in `src/lib/export/ommlBuilder.ts` (emits a native underlined run instead of routing through the math pipeline) — so there's a sanctioned pattern to mirror.

**How to apply:** in the web renderer (`KatexRenderer` or a small pre-pass in `parseLatex`), detect the simple `\(\underline{\text{…}}\)` / `\(\underline{\textit{…}}\)` zone and emit a real underlined `<span>` (`underline`, optional `italic`) in the body font instead of `<InlineMath>`. Fixes both the font mismatch and the line-clamp artifact, and removes the inline-block from the flow. Decide scope: shared `KatexRenderer` (notes/guides/editor-preview all benefit) vs just `/browse`. Leave genuine math (`\(x^2\)`, matrices) untouched — only the bare `\underline{\text{…}}`/`\textit` pattern. See [[mobile-render-gotchas]].

### ~~Distractor-verify the remaining harvested quiz chapters before public-publishing~~ — **DONE 2026-06-09**

Completed all three named chapters — **Human Physiology** (87 recall + 23 traps), **Matrices & Determinants** (182 computation + 5 traps), **Vectors** (130 computation + 55 traps) — by hand-authoring every distractor (the harvest's sibling-row candidates were cross-category/unusable). All `verified`, 0 lint flags, assembled + pushed. Quiz Factory now has 5 complete chapters. The same cadence applies to any *future* harvested chapter (see "Harvest + verify the unstarted chapters" below).

### Wave 3+ : harvest + verify the remaining /notes chapters (the Quiz Factory frontier)

**CARRY-FORWARD (2026-06-12): superseded by the 2026-06-12 entries above — Waves 3 + 4 completed the top-18 NDA Maths chapters; ~12 NDA Maths + the new Chem 11/Phys 9/Bio 8 remain. The counts below are the 2026-06-10 snapshot, kept for the cadence detail.**

**10 NDA Maths chapters now complete** across all themes (Stats/Prob/Vectors/Matrices/Functions/Lines/Trig-Id + **Wave 2: 3D-Geometry · Sequence-Series · Differentiation**, 2026-06-10) + HP (Bio). **The harvest frontier GREW sharply 2026-06-10**: the notes corpus jumped from ~31 to **52 chapters** (NDA Chemistry 11 + NDA Physics 7 shipped this day), all authored quiz-ready (Step 1b) but **none harvested**. So **~41 chapters now await harvest** — the new NDA Chemistry 11 + NDA Physics 9 + ~12 autonomous-batch NDA Maths (Binomial, Conics, Circles, etc.) + 1 MHT-CET. The new Chemistry/Physics chapters are the freshest, highest-value targets (recall-heavy `fact`/`trap` themes for Chemistry; formula-heavy for Physics).

**Why:** more chapters = a deeper daily-quiz supply + a wider public-funnel pool.

**How to apply:** run the per-chapter **CADENCE** now codified in QUIZ_FACTORY "Recipe" — harvest → `quiz:coverage` (completeness gate) → computation (re-derivation = correctness check) → formula author → conditional formula-enrichment + trap-callouts (notes edits) → `quiz:assemble … -- --theme=X`. Each chapter ≈ 2–3 parallel agents (computation subtopic-split) + 1 formula + 1 trap agent; the trap agent authors misconception callouts INTO the notes (predict atom keys `<concept>:trap:<existing+pos>`, verify fail-fast catches misses). Chapter-by-chapter, on the user's cue.

### Cross-chapter "traps/properties of the day" assembly for thin themes

Some themes are permanently thin per chapter (e.g. Functions' 6 formula atoms + Trig-Id's 11 reference atoms sit below the 12-atom minimum for a standalone quiz, so stranded; `quiz:coverage` flags <12-trap chapters). A cross-chapter assembler ("Traps of the day" / "Formulas of the day" pulling atoms by theme across all NDA Maths chapters) would use them.

**Why:** otherwise low-count themes never form a quiz and the atoms sit unused. Already noted in QUIZ_FACTORY "Known gaps."

**How to apply:** extend `assembleNextQuiz` (or a sibling) to select ready-unused atoms by `(exam, theme)` across chapters instead of `(route, chapter, theme)`; slug like `nda-maths-traps-N`. Keep the coverage-dedup ledger.

### Phone-link signup attribution (deferred — attribution-only shipped)

The lead→buyer link is **attribution-only** today: `utm_source=quiz:<slug>` rides the lead + signup → `user_metadata.signup_source`, so you can see WHICH quiz drove a signup, but not join an exact mobile lead to an exact paying account (mobile vs email identity gap).

**Why:** if precise per-lead conversion tracking becomes valuable (e.g. proving a specific lead bought), phone-link closes it. Deferred because Google OAuth gives no phone — it needs a pre-filled phone field on email signup PLUS a post-OAuth "complete profile" step for Google, and the number is self-reported/unverified.

**How to apply:** add an optional phone field to `/signup` (pre-filled from the lead's localStorage mobile), pass `options.data.phone` to `signUp`; for Google, stash it and stamp `user_metadata.phone` in `/api/auth/callback` (first-time only). Then the leads dashboard can join `quiz_leads.mobile` ↔ `auth.users.meta->>'phone'`.

---

## 2026-06-08

### ~~Consolidate the per-subject notes pages into a dynamic `[subjectRoute]` route~~ — **DONE 2026-06-08** (commit `b40f025`)

Shipped as a **shared `NotesSubjectLanding` component** + 4 thin (~6-line) registry-derived wrappers (−304 net lines), NOT the fully-dynamic route. Rejected fully-dynamic: a single `[slug]/[chapterSlug]/[subtopicSlug]` wrapper would force the whole notes tree all-static (paywall preview leak) or all-dynamic (free chapters lose SSG/ISR), since the per-chapter force-dynamic paywall hook needs per-chapter files. Thin wrappers got the dedup at zero routing/paywall/SSG risk. (Original spec kept below for the record.)

The cross-exam-hub work (2026-06-08) made `/notes` and the per-exam hubs (`/notes/<examSlug>`) derive from the `NOTES_CHAPTERS` registry — but the per-**subject** index pages (`/notes/nda-maths/page.tsx`, `nda-physics`, `mht-cet-maths`, `nda-biology`) are still hand-written near-identical files. Adding a new subject still requires cloning one (and forgetting it 404s the subject hub — that bit us on NDA Biology this session).

**Why:** the boilerplate is ~130 lines duplicated 4× and growing per subject; a single dynamic `[subjectRoute]/page.tsx` (validate the route against `getNotesChaptersForSubject`, `notFound()` otherwise) would make a new subject *zero-page* — just a registry entry + the chapter wrappers. It mirrors exactly what `[examSlug]` already does one level up. The concrete folders would need to go (or the dynamic route shadowed correctly), so it's a real refactor, not a 5-minute change.

**How to apply:** create `src/app/notes/[subjectRoute]/page.tsx` rendering from `getNotesChaptersForSubject(params.subjectRoute)` + `getNotesTaxonomy`; delete the 4 concrete subject `page.tsx` files; confirm the dynamic `[examSlug]` and `[subjectRoute]` siblings don't collide (exam slugs `nda`/`mht-cet`/`jee-mains` vs subject routes `nda-maths`/… — they differ, but Next.js disallows two *differently-named* dynamic segments at one level, so this needs verifying — may require a single `[slug]` that branches exam-vs-subject). Keep the chapter + `[subtopicSlug]` route files as-is.

### ~~Browser smoke-test the NDA Biology chapter + the new notes hubs~~ — **DONE 2026-06-08** (verified by user)

User confirmed the NDA Biology chapter pages, the 6 Human Physiology diagrams, and the new notes hubs render correctly in the browser. No code changes needed. (Original note kept below for the record.)

The 6 Human Physiology SVG diagrams (heart, eye, nephron, reflex arc, lung volumes, alveolus) and the new `/notes`, `/notes/nda`, `/notes/jee-mains` (coming-soon) pages were shipped on a green `prepush` (build + tests) but never eyeballed in a browser.

**Why:** the diagrams are hand-rolled SVG with absolute coordinates — they compile fine but can render visually off (overlap, clipping, dark-mode contrast). The "verify in a browser before claiming done" rule in [[notes-self-sufficient-template]] hasn't been satisfied for this chapter.

**How to apply:** `npm run dev`, open `/notes/nda/human-physiology/hp-circulation` (heart), `…/hp-nervous` (eye + reflex arc), `…/hp-respiration` (lung volumes + alveolus), `…/hp-excretion-reproduction` (nephron) in light + dark; plus `/notes`, `/notes/nda`, `/notes/jee-mains`. Fix any coordinate/contrast issues.

### ~~Regenerate the ARCHITECTURE.md visualization-batch enumeration from `npm run stats`~~ — **DONE 2026-06-08** (commit `b40f025`)

Trimmed the drifted per-batch enumeration to a pointer ("per-chapter diagram choices live in each chapter's `_data` + the Decisions log; `npm run stats` is the source of truth"); kept the count (95) + the conventions + the add-one steps. (Original spec kept below for the record.)

ARCHITECTURE.md's `visualizations/` line now shows the correct **95** count but its per-batch enumeration only lists batches through Electricity & Magnetism + Binomial Distribution + the new Human Physiology 6 — it skips the Functions/Differentiation/Limits/AoD/Trig/Lines/P&C/Complex diagram batches that landed 2026-06-06/07.

**Why:** the list reads as authoritative but is incomplete; someone counting from it gets the wrong total. Low urgency (the count is right; `npm run stats` is the source of truth), but the prose drift is the kind that compounds.

**How to apply:** either trim the enumeration to "see `npm run stats` / the `_data` dirs for the per-chapter list" (preferred — stop hand-maintaining it), or backfill the missing batches in one pass.

### ~~Relocate the Quiz-Factory core from `scripts/quiz/` into `src/lib/quiz/`~~ — **DONE 2026-06-08**

Moved `atoms.ts`/`daily.ts`/`quizPayload.ts` (via `git mv`, history preserved) to `src/lib/quiz/`; `assemble.ts` now imports them as `./atoms` etc.; the `scripts/quiz/` CLIs import the core via `../../src/lib/quiz/…`; tests repointed. Typecheck + 45 quiz tests + build green. (Original spec below.)

The pure quiz core (`scripts/quiz/atoms.ts`, `daily.ts`, `quizPayload.ts`) lives under `scripts/`, but `src/lib/quiz/assemble.ts` (used by the dashboard server action) now imports it via `../../../scripts/quiz/…`. The app bundling imports *up into scripts/* — a mild architectural smell.

**Why:** `src/` importing from `scripts/` inverts the usual dependency direction and means the Next build bundles files from the scripts tree. It works (typecheck + build green) but reads wrong and will confuse the next person; the quiz *domain* logic is really `src/lib` material that the CLI happens to also use.

**How to apply:** move `atoms.ts`/`daily.ts`/`quizPayload.ts` (+ their tests) to `src/lib/quiz/`, update the `scripts/quiz/*` runners to import from `@/lib/quiz/…` (the tsx scripts already resolve the `@/` alias, per notes-lint precedent), and drop the `../../../scripts` relative imports. Pure move + import-path update; the gate covers it.

### ~~Add exam/chapter/theme inputs to nda-tracker's QuizEditor~~ — **DONE 2026-06-09** (nda-tracker commit `78e9713`)

Shipped: Exam + Theme `<select>`s (vocab synced with PYQ Vault: NDA/MHT-CET; mixed/formula/property/computation/fact/trap) + a Chapter text input in `QuizEditor.jsx`'s Quiz-details card; new quizzes default to NDA / mixed. `buildQuizRow` already persisted the fields. 30 quiz tests + build green. (The one existing uncategorized "Classical Probability" quiz can now be fixed by opening it in the editor and setting the fields.) Original note below for the record.

The Daily Quiz filtering (shipped 2026-06-08) classifies *imported* quizzes (PYQ Vault sends exam/chapter/theme), but **hand-authored** quizzes (nda-tracker's "+ New quiz") have no way to set those fields, so they fall into the "Uncategorized" filter bucket — and that bucket grows as teachers make ad-hoc quizzes.

**Why:** the long-term-correct rule for the filter is "every quiz carries its classification, no exceptions" — otherwise the feature quietly rots. This is the fast-follow that was explicitly deferred when the filter shipped.

**How to apply:** add exam/chapter/theme inputs to `src/pages/Quizzes/QuizEditor.jsx` (the editor already patches `subject`/`batch`); `buildQuizRow` already persists them, so it's just UI inputs wired to `patch({ exam })` etc. Optionally also classify the one hand-authored "Classical Probability" quiz (id `61151aeb…`) that's currently uncategorized.
