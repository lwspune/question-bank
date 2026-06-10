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

Shipped Gravitation (3 sub · 14 concepts · 17 q · 3 SVGs · `grav-`), Units, Measurement & Dimensions (1 sub · 9 concepts · 14 q · 1 SVG · `umd-`), and Oscillations & Waves (2 sub · 6 concepts · 13 q · 3 SVGs · `osc-`) via the 3-agent parallel loop + serial merge. NDA Physics notes now **12 of 14** (only Astronomy 4 q + Energy Sources 2 q remain, below the bank-coverage gate — `/browse`-only). All reorder-only, 44/44 q tagged at 100%, mistag detector clean, full gate green. **One audit flag surfaced:** Gravitation escape-velocity PYQ `95e70f86` (2024 NDA-1) is a **wrong-key candidate** (stored B=15.8; re-derivation gives A=11.2 — v_e ∝ R√ρ so ½·√4=1, unchanged) — pending user approval for the DB flip (notes already teach the correct physics). Original spec below.

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
