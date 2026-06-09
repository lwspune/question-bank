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

## Recipe: complete a chapter end-to-end

The user says **"approve `<chapter>`"** (or "do `<chapter>` traps") and Claude runs:

1. **Harvest** (if not already): `npm run quiz:harvest <route>/<chapter>` → `npm run quiz:sync`.
   - `formula` + `reference` atoms become **`auto`** (ready immediately — key + sibling distractors correct by construction).
   - `practiceSet` / `selfCheck` → **`needs_review`** (key correct, distractors pending).
   - `trap` → **`needs_review`** seeds (placeholder stem, empty key — a *full* MCQ to author).
2. **Approve the clean questions**: query the chapter's `needs_review` + `looks_mcq_clean` `practiceSet`/`selfCheck` atoms (SELECT atom_key/subtopic/source_kind/stem/correct — **drop `trap_hints`, it overflows**); Claude authors 3 distractors each into `scripts/quiz/verify/<route>__<chapter>.ts` (tag identity/rule questions `theme:"property"`); `npm run quiz:verify <route>__<chapter>`.
3. **Approve the traps** (optional, for a Common-Traps theme): author full "spot the tempting error" MCQs into `scripts/quiz/verify/<route>__<chapter>-traps.ts` using the **`stem` + `correct` overrides** (trap atoms have neither); skip the ~⅔ that overlap the practice/property content. `npm run quiz:verify <route>__<chapter>-traps`.
4. **Assemble** themed quizzes: `npm run quiz:assemble <route> <chapter> -- --theme=<formula|property|computation|fact|trap>` (or no `--theme` for mixed). Records + pushes drafts to nda-tracker.
5. **Commit** the verify data file(s). **Publish** is the user's step in nda-tracker.

**Worked template:** NDA Probability (10 quizzes — 4 mixed + 4 Practice + 1 Properties + 1 Common Traps).

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
| nda-maths / **probability** | ~163 | ~9 | ✅ **Complete** (formula/computation/property/trap) |
| nda-maths / **statistics** | ~197 | ~11 | ✅ **Complete** (formula/computation/property/trap) |
| nda-biology / **human-physiology** | ~166 | ~5 | ✅ **Complete** (fact + recall + traps; all distractors hand-authored) |
| nda-maths / **matrices-determinants** | ~222 | ~12 | ✅ **Complete** (formula + computation; 5 trap atoms <12 → no standalone trap quiz) |
| nda-maths / **vectors** | ~223 | ~13 | ✅ **Complete** (formula + computation + trap) |
| nda-maths / **trigonometric-identities** | ~108 | 6 | 🟡 **computation done** (6 quizzes, Wave 1, 2 agents subtopic-split); formula pending bundle-author (only 3 auto-ready); traps pending |
| nda-maths / **lines** | ~53 | 3 | 🟡 **computation done** (3 quizzes, Wave 1); auto=0 (no formula quiz); traps pending |
| nda-maths / **functions** | ~24 | 1 | 🟡 **computation done** (1 quiz, Wave 1); auto=0; traps pending |
| nda-maths / **3d-geometry** · **sequence-series** · **differentiation** | harvested+synced (~133/145/85 needs_review clean) | — | 🟠 **Wave 2** — atoms in pool, distractors pending |
| _rest of NDA Maths (~17 ch — mostly formula-only chapters I recently built), NDA Physics (2), MHT-CET (1)_ | — | — | Not harvested |

**Known quality catch (Wave 1):** the quiz build re-derives every practiceSet/selfCheck answer, surfacing **notes errors** the way notes-building surfaces wrong keys — Lines `lines-family-and-concurrency:practiceSet:3` had answer `(1,-2)` (should be `(1,-1)`); fixed in the notes `_data`, atom left parked (will correct on next harvest).

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
