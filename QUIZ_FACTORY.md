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
npm run quiz:assemble <route> <chapter> [max] [size] [-- --theme=X]   # assemble + record + push
npm run quiz:push [daily/<slug>]           # push a single hand-authored DraftQuiz module
```

Filter/view: **PYQ Vault** `/dashboard/quizzes` (pool stats + filterable list + Assemble button) ·
**nda-tracker** Daily Quiz page (filter by exam/subject/chapter/theme/status).

---

## Chapter status

Snapshot **2026-06-09** — refresh with:
`SELECT subject_route, chapter_slug, count(*) FILTER (WHERE status IN ('auto','verified')) ready, count(*) FILTER (WHERE status='needs_review') needs_review FROM quiz_atoms GROUP BY 1,2;`

| Chapter | Ready | Needs review | Quizzes | State |
|---|---|---|---|---|
| nda-maths / **probability** | 157 | 41* | **10** | ✅ **Complete** (all themes; *41 = 34 overlapping trap seeds + 7 non-MCQ-clean, left unauthored) |
| nda-maths / **statistics** | 168 | 46* | **11** | ✅ **Complete** (formula + property + computation; *46 = 38 trap seeds + 8 non-MCQ-clean, left unauthored; 3 property atoms carry forward below band) |
| nda-biology / human-physiology | 56 | 122 | 3 | Harvested; `fact` auto ready; practice/traps **not approved** |
| nda-maths / matrices-determinants | 29 | 187 | 1 | Harvested; `formula` auto ready; **not approved** |
| nda-maths / vectors | 27 | 185 | 1 | Harvested; `formula` auto ready; **not approved** |
| _rest of NDA Maths (~23 ch), NDA Physics, MHT-CET, JEE_ | — | — | — | Not harvested |

---

## Known gaps / deferred

- **Cross-chapter, theme-first assembly** — for permanently-thin themes (Properties/Traps cap low per chapter). A "Properties of the day" pulling property atoms across all NDA Maths chapters. Not built.
- **QuizEditor classification fields** in nda-tracker — so hand-authored quizzes are filterable (else "Uncategorized"). Deferred fast-follow.
- **Student-portal filters** (nda-tracker `StudentQuizzes`) — when delivery goes self-serve.
- **CET daily** — only 0–1 noted CET chapters; corpus too thin for daily until more CET notes ship. Run weekly or seed from EASY bank rows.

---

## Maintenance

Update this file when: a chapter changes state (edit the **Chapter Status** table),
a pipeline command/flag changes (edit **Command reference** + the recipe), or a
deferred item ships (move it from **Known gaps** into the recipe/status). Keep the
snapshot date current.
