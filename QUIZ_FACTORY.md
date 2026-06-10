# Quiz Factory — Runbook

The repeatable process for turning `/notes` content into **themed daily recall
quizzes** delivered through **nda-tracker's Daily Quiz**. This is the living
operational doc — **keep the Chapter Status table + numbers current as chapters
ship.** (The *why* behind the design lives in [CLAUDE.md](CLAUDE.md) Decisions log
2026-06-08; the full build history in the `daily-quiz-pilot` memory.)

---

## Architecture in one line

**PYQ Vault** is the content **Factory** (owns the question pool + classification);
**nda-tracker** is **delivery** (batch / publish / attempts / scores). Quiz
metadata (`exam` / `chapter` / `theme`, and per-question `conceptSlug`)
**originates in PYQ Vault and rides on the push** — nda-tracker stores a copy for
its own filtering. Two Supabase projects (`wunvtnqlzjrkvolslbnm` vs
`exjnzrrlzcrsoxfoojcq`); MCP/tooling is bound to PYQ Vault only.

---

## The pipeline

```
/notes content
  │ 1. npm run quiz:harvest nda-maths/<chapter>      → MCQ atoms (scripts/quiz/atoms/*.json)
  │ 2. npm run quiz:sync                             → public.quiz_atoms pool (staleness-aware)
  │ 3. [Claude authors distractors] → npm run quiz:verify <name>   → atoms become "verified"
  │ 4. npm run quiz:assemble nda-maths <chapter> [-- --theme=X]    → records (quizzes+map) + pushes drafts
  ▼
nda-tracker Daily Quiz  →  5. teacher publishes to a batch  →  students take → results land
```

Each atom carries a **status** (`auto` | `needs_review` | `verified`) and a
**theme** (`formula` | `property` | `computation` | `fact` | `trap`). Only
`auto` + `verified` atoms are assemblable.

---

## Recipe: complete a chapter end-to-end (the per-chapter CADENCE)

The user says **"approve `<chapter>`"** and Claude runs this cadence. **Building a chapter is also when its /notes get enriched** — the quiz themes have notes-source dependencies (see [[quiz-formula-coverage-gap]]), so closing a theme's gap means editing the notes, and that edit improves the student notes too. The cadence folds that in rather than leaving it as an afterthought.

1. **Harvest + sync**: `npm run quiz:harvest <route>/<chapter>` → `npm run quiz:sync`.
   - `formula` + `reference` → **`auto`** (ready); `practiceSet`/`selfCheck` → **`needs_review`** (key correct, distractors pending); `trap` → **`needs_review`** seeds (placeholder stem/key).
2. **Coverage check (the cadence gate)**: `npm run quiz:coverage <route> <chapter>` → records the chapter's **formula gaps** (empty-`formula.latex` concepts, the `✗`) and **trap gap** (`<12` callouts). This drives steps 5–6 — decide per chapter which gaps are worth closing.
3. **Computation**: query `needs_review`+`looks_mcq_clean` `practiceSet`/`selfCheck` atoms (drop `trap_hints` — overflows); author 3 distractors each into `scripts/quiz/verify/<route>__<chapter>-computation*.ts` (parallel agents subtopic-split for heavy chapters); `quiz:verify`. **Re-deriving each `correct` IS the chapter's correctness check** — fix any notes errors found (e.g. Seq-Series `S_n=5n-2n²`→a₃=−5).
4. **Formula** (author): if the chapter already has ≥12 formula atoms, **no notes edit needed** — just author the `needs_review` bundle pieces into `-formulas.ts` (full-equation permutation distractors, no bare-RHS tell); tag genuine rule-identities `theme:"property"` (classify theme on the FIRST pass — re-theming later is churn).
5. **Formula enrichment** (notes edit, *conditional*): if step 2 flagged real recall-formula gaps, **triage the `✗` flags first** (the probe over-flags prose derivation steps), then **append** the genuine formulas to the concept's `formula.latex` (append-only — preserves piece indices/fingerprints; safe on EMPTY concepts, watch the single→bundle `auto`-flip on non-empty ones) → re-harvest → author only the new pieces.
6. **Traps** (notes edit, *conditional*): if `<12` callouts, **author ~5–7 misconception callouts** (`{title, body}`) into the chapter's notes concepts (a real "common mistakes" section students gain) → re-harvest → author the "spot the mistake" MCQs into `-traps.ts` via the **`stem`+`correct` overrides**; skip the ~⅔ that overlap practice/property content.
7. **Assemble** per theme: `npm run quiz:assemble <route> <chapter> -- --theme=<formula|property|computation|fact|trap>` (loop until `0 ready left`). `quiz:lint` (integrity + stems) before/after.
8. **Gate + commit** per theme/notes edit (`notes:lint`+`notes:latex` whenever notes change). **Publish** is the user's step in nda-tracker.

**Worked templates:** NDA Probability (10 quizzes, all themes); Wave 2 3D-Geo/Seq-Series/Diff (computation 8/8/6 via parallel agents).

---

## Who does what

| Step | Who | Notes |
|---|---|---|
| Harvest / Sync / Assemble / Push | **Automated** (commands or the `/dashboard/quizzes` Assemble button) | seconds |
| **Approve** (author wrong options + trap MCQs) | **Claude**, chapter-by-chapter on request | the real work — distractor quality is the bottleneck, so it stays human-authored |
| Publish to students | **User**, in nda-tracker | clicks |

---

## Themes & sizing

- **Formula / Fact** quizzes assemble straight from `auto` atoms — no approval needed.
- **Practice / Properties / Traps** need the approve step.
- **Theme = a quiz's actual content** (one distinct atom theme → that, else "mixed") — derived the same way in the assembler and the dashboard, so titles/filters agree.
- **Balanced sizing** (`balancedSizes`, band 12–18, target 15): a non-15-multiple pool is fully consumed (16→[16], 65→[17,16,16,16], 28→[14,14]); below 12 carries forward; dead zone 18<n<24 → one 18 + carry.
- **Coverage dedup**: an atom used in any quiz is excluded from future assembles — no repeats. Re-runs keep minting *new* quizzes until the pool is dry.
- **Idempotent push**: deterministic slug→UUIDv5, so re-pushing a slug UPDATEs the same draft.

---

## Command reference

```sh
npm run quiz:harvest [route/chapter ...]   # /notes → atoms JSON (default: 3 sample chapters)
npm run quiz:sync                          # atoms JSON → quiz_atoms DB (preserves verified)
npm run quiz:verify [name]                 # promote needs_review → verified from verify/<name>.ts
npm run quiz:lint [route] [chapter]        # flag stems that aren't self-contained (triage, not a gate)
npm run quiz:coverage [route] [chapter] [--review]   # flag formulas/traps TAUGHT in prose but not harvestable (the theme-coverage guardrail; triage, not a gate)
npm run quiz:assemble <route> <chapter> [max] [size] [-- --theme=X]   # assemble + record + push
npm run quiz:delete <slug>                 # delete a quiz here AND propagate the delete to nda-tracker
npm run quiz:push [daily/<slug>]           # push a single hand-authored DraftQuiz module
```

**Stem self-containment (`quiz:lint`).** Notes practiceSet/selfCheck prompts are
authored as a *connected sequence* read under a concept (item 2 says "the product"
because item 1 defined it). Harvested into standalone, shuffled atoms, those
back-references become unfair to a cold quiz-taker. `quiz:lint` flags the
offenders (back-references, criterion-less "which is correct?", deictic openers,
bare fragments) so you rewrite **only the flagged few** via the verify `stem`
override — not every stem. Formula stems use the concept **name**, not a
pedagogical `formula.label` nickname like "Sieve Inequality" (fixed at harvest).
**Run `quiz:lint <route> <chapter>` before publishing a chapter's quizzes public.**

Assembly + delete are **CLI-only** (the dashboard is a read-only view — assembling
from a web UI was friction). `/dashboard/quizzes` shows pool stats + the assembled-
quiz list + Publish-to-public; nda-tracker's Daily Quiz page filters by
exam/subject/chapter/theme/status. **Recorded quizzes are an immutable snapshot
(0035)** — `quiz:delete` removes one here and propagates the delete to nda-tracker
(guarded to drafts there; a published quiz with attempts is never deleted).

---

## Chapter status

Snapshot **2026-06-09** — refresh with:
`SELECT subject_route, chapter_slug, count(*) FILTER (WHERE status IN ('auto','verified')) ready, count(*) FILTER (WHERE status='needs_review') needs_review FROM quiz_atoms GROUP BY 1,2;`

**5 chapters complete + Wave 1 of the prioritized-subset campaign** (2026-06-09: parallel sub-agents author distractors — one per chapter, heavy chapters split by subtopic; the main agent harvests/syncs/verifies/assembles/pushes serially). All quizzes are snapshot-backed (0035).

| Chapter | Ready | Quizzes | State |
|---|---|---|---|
| nda-maths / **probability** | ~163 | ~9 | ✅ **Complete** (formula/computation/property/trap) — formula spot-check 2026-06-10: CLEAN |
| nda-maths / **statistics** | ~197 | ~11 | ✅ **Complete** (formula/computation/property/trap) — formula spot-check 2026-06-10: CLEAN |
| nda-biology / **human-physiology** | ~166 | ~5 | ✅ **Complete** (fact + recall + traps; all distractors hand-authored) |
| nda-maths / **matrices-determinants** | ~262 | 16 | ✅ **Complete** — **clean formula/property split (Path B, 2026-06-10): formula = CONSTRUCTION only (1 quiz: det 2×2, A⁻¹=adj/\|A\|, Cramer's, cofactor-expansion, roots-of-unity); property = ALL rules/identities (3 quizzes, 38 atoms)** + computation + trap. Path A enriched 25 rules from prose → property; Path B re-themed the 10+2 rule-formulas formula→property + re-assembled. |
| nda-maths / **vectors** | ~223 | ~13 | ✅ **Complete** (formula + computation + trap) — formula coverage spot-check 2026-06-10: CLEAN |
| nda-maths / **trigonometric-identities** | ~144 | 9 | ✅ **Complete** — computation (6, 2 agents subtopic-split) + formula (2; ALL 25 identity formulas, 2026-06-10 formula.latex enrichment) + **trap (1; 14 common-mistake callouts authored into the notes 2026-06-10)**; 11 reference atoms parked (<12) |
| nda-maths / **lines** | ~92 | 7 | ✅ **Complete** — computation (4) + formula (2; 26 pieces) + trap (1; 13 callouts) — formula.latex + traps authored from scratch 2026-06-10 (both were 0) |
| nda-maths / **functions** | ~54 | 4 | ✅ **Complete** — computation (2) + formula (1; 16 pieces after 2026-06-10 formula.latex enrichment) + trap (1; 14 pre-existing seeds authored) |
| nda-maths / **3d-geometry** | ~133 | 10 | 🟡 **Wave 2 — computation (8) + formula (2) done** 2026-06-10; traps (7 callouts <12) pending |
| nda-maths / **sequence-series** | ~177 | 10 | 🟡 **Wave 2 — computation (8) + formula (2) done** 2026-06-10 (re-derivation caught a notes error `S_n=5n-2n²`→a₃=−5 not −7, fixed); traps (5 <12) pending |
| nda-maths / **differentiation** | ~129 | 7 | 🟡 **Wave 2 — computation (6) + formula (1) done** 2026-06-10; traps (6 <12) pending |
| _rest of NDA Maths (~17 ch — mostly formula-only chapters I recently built), NDA Physics (2), MHT-CET (1)_ | — | — | Not harvested |

**Known quality catch (Wave 1):** the quiz build re-derives every practiceSet/selfCheck answer, surfacing **notes errors** the way notes-building surfaces wrong keys — Lines `lines-family-and-concurrency:practiceSet:3` had answer `(1,-2)` (should be `(1,-1)`); fixed in the notes `_data`, atom left parked (will correct on next harvest).

**Coverage gap — EVERY theme has a notes-source (or classification) dependency; "atoms consumed" ≠ "theme complete".** **`npm run quiz:coverage [route] [chapter] [--review]` catches the formula/trap side automatically** (built 2026-06-10): it flags concepts that teach a formula in prose but leave `formula.latex` EMPTY (strong, e.g. would have caught Lines' 11 formula-less concepts), and chapters with < 12 `traps` callouts. Logic + tests in `src/lib/quiz/coverage.ts`; triage aid, not a gate (prose derivation steps look like formulas — `--review` lists per-formula chapter-wide gaps but is noisy). The principle it guards: A theme is only as complete as the notes field it harvests from — **formula** ← `formula.latex`, **trap** ← `traps` callouts, **fact** ← reference tables, **computation** ← practiceSet/selfCheck — except **property**, which has NO source: it's a practiceSet/selfCheck atom the author hand-tags `theme:"property"` during verify (so a chapter shows 0 property atoms unless the split was made — Wave 1 agents hardcoded `computation`). So before calling a theme done, check the *source*, not the ready-count. Two precedents, both Trig-Identities 2026-06-10: the **trap** theme had 0 atoms because the notes had **zero `traps` callouts** (Lines too) — fixed by authoring 14 common-mistake callouts into the notes (`{title, body}` per concept) → re-harvest → author the "spot the mistake" MCQs in `…-traps.ts` (concrete problem, misconception = the tempting distractor) → assemble. And the **formula** detail: the harvester makes a formula-recall atom ONLY from a concept's `formula.latex`; a formula taught in `definition` prose or only practiced (→ a computation atom) becomes **no recall atom, silently**. So a formula theme can look done (harvested atoms consumed) while missing half the chapter's formulas, and nothing flags it. **Before calling a formula theme complete, cross-check the harvested formula atoms against the chapter's real formula set.** If gaps: ENRICH the notes' `formula.latex` — **append** the missing formulas (keeps existing pieces' index + sha1 fingerprint stable, since `splitFormulaPieces` strips trailing commas, so already-verified pieces stay verified through re-sync) → re-harvest → author only the new pieces. Precedent: Trig-Identities 2026-06-10 — `formula.latex` carried 15 of ~26 formulas (half-angle, sin 2A/tan 2A, tan 3A, and 2-of-4 of both product-to-sum and sum-to-product all missing); enriched all 5 concepts + rewrote distractors to full-equation form (no length tell) → 25 formula atoms across 2 quizzes. See [[quiz-formula-coverage-gap]].

---

## Known gaps / deferred

- **Cross-chapter, theme-first assembly** — for permanently-thin themes (Properties/Traps cap low per chapter). A "Properties of the day" pulling property atoms across all NDA Maths chapters. Not built.
- **QuizEditor classification fields** in nda-tracker — so hand-authored quizzes are filterable (else "Uncategorized"). Deferred fast-follow.
- **Student-portal filters** (nda-tracker `StudentQuizzes`) — when delivery goes self-serve.
- **CET daily** — only 0–1 noted CET chapters; corpus too thin for daily until more CET notes ship. Run weekly or seed from EASY bank rows.

---

## Changing the harvester (`src/lib/quiz/atoms.ts`)

The committed `scripts/quiz/atoms/*.json` are GENERATOR OUTPUT — they're only as
current as the harvester code that last produced them. So when you change
`atoms.ts`, a chapter's JSON that predates the change will show a diff on the next
`quiz:harvest` **even though nobody edited the notes** — that's the generator, not
content drift. Two such changes are baked in:

- **Formula stems use the concept `name`**, not `formula.label` (a pedagogical
  nickname like "Sieve Inequality" is meaningless standalone). Changing the stem
  subject also re-keys its `sourceFingerprint`.
- **`leadFormula()` declutters distractors.** Sibling formula LaTeX is often a
  multi-formula bundle (`… \qquad … \qquad …`) — noisy as a distractor.
  `leadFormula` trims a bundle to its leading expression (splits on `\qquad`/`\quad`
  only, never commas; strips a trailing comma) for distractor use.
- **Bundle-formula concepts are SPLIT into one slot per formula, then
  hand-authored.** A concept whose `formula.latex` bundles several identities
  (e.g. `Σ(xᵢ−x̄)=0 \quad Mode≈3Med−2Mean \quad MD≈⅘SD`) can't be one fair "which
  is THE formula?" MCQ — so `harvestFormulaConcept` splits it on `\qquad`/`\quad`
  into one **`needs_review` slot per piece** (`concept:formula:0,1,…`,
  `splitFormulaPieces`), and each genuine formula is hand-authored in a verify
  file (`scripts/quiz/verify/<route>__<chapter>-formulas.ts`) with a SPECIFIC stem
  + **tempting permutation distractors** (wrong versions of the same formula — far
  better than random sibling formulas; keep every option the same shape as the
  answer, no format tell). **Use judgment per slot:** skip pieces that are really
  CONDITIONS (`(|A|≠0)`, `P(B)>0`), ANNOTATIONS (`(length/area/volume)`),
  CONNECTIVES (`\text{and}`, `\Longrightarrow`), trivial setups, off-target
  prerequisites (i-powers in a Matrices quiz), redundant repeats (Cramer's y,z),
  or cross-concept DUPLICATES (`v̂=v/|v|` appears under two vector concepts) —
  those slots stay parked (`needs_review`, never published, harmless). Single-
  formula concepts stay one `auto` atom. `isBundleFormula()` detects a bundle;
  `quiz:lint` flags any bundle-correct atom that slips into the ready pool. The
  4 NDA-Maths formula chapters (statistics/probability/matrices/vectors) are done:
  80 hand-authored recall MCQs + 55 auto single-formula + 21 parked slots.
- **`errorTransforms()` seeds candidate distractors for NUMERIC atoms (2026-06-10).** For a practiceSet/selfCheck atom whose answer is a simple numeric (integer, decimal, `\dfrac/\tfrac/\frac{a}{b}`, `a/b`), `harvestProblem` now fills `candidate_distractors` with **mechanical wrong-variants** (sign flip, double, off-by-one, fraction swap) in the answer's format, before falling back to sibling answers — so the verify pass sees a usable starting point instead of cold-authoring (e.g. `8` → `[-8, 16, 9]`). Non-numeric answers (expressions, vectors, words) get `[]` and keep the sibling pool. It is a PROPOSAL the verify pass accepts/edits — never auto-accepted (distractor quality stays human; a transform can land on a correct alternative). Pure + TDD'd (`tests/quiz-error-transforms.test.ts`).

**Procedure when you edit the harvester:** re-harvest EVERY chapter whose atoms
the change touches (e.g. all chapters with `formula` atoms — `grep -l
'"sourceKind": ?"formula"' scripts/quiz/atoms/*.json`), then `quiz:sync`. Before
committing the regenerated JSON, **diff and confirm `correct` + `answer` are
unchanged** (`git diff <json> | grep -E '"(correct|answer)":'` → empty) so no
question's key moved — stem/fingerprint/options changes are expected and safe.
Don't leave a subset regenerated: a JSON that disagrees with the generator
produces a "mystery diff" for the next person to harvest.

**Recorded quizzes are an IMMUTABLE snapshot (migration 0035).** A quiz stores its
questions as a JSON snapshot on the `quizzes.questions` column at assemble time;
the dashboard reads that, NOT the live atoms. So re-harvesting/re-classifying an
atom that's already in a quiz can't break the recorded quiz — it keeps the
questions it was assembled with. (`quiz_atoms_map` stays, but only as the coverage
ledger.) Two residual notes: (1) a quiz's snapshot can go STALE vs the current
pool — `npm run quiz:lint`'s "quiz integrity" section lists quizzes whose mapped
source atoms changed; re-assemble to refresh. (2) Quizzes assembled BEFORE 0035
have an empty snapshot and fall back to the live join, so they CAN still render
broken — re-assemble or delete them. (3) Pushed copies on nda-tracker are frozen
snapshots too; re-push the same slug to update, or delete orphans there.

---

## Maintenance

Update this file when: a chapter changes state (edit the **Chapter Status** table),
a pipeline command/flag changes (edit **Command reference** + the recipe), or a
deferred item ships (move it from **Known gaps** into the recipe/status). Keep the
snapshot date current.
