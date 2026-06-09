# Suggestions

A running list of actionable improvements surfaced during /update-docs runs.
Each item is outside the scope of the work that surfaced it. Strike through when done.

---

## 2026-06-09

### Distractor-verify the remaining harvested quiz chapters before public-publishing

The public quiz funnel can publish ANY assembled quiz, but only **NDA Probability + Statistics** have had the full per-chapter distractor approval (`quiz:verify`). The other harvested chapters — **vectors, matrices-determinants, human-physiology** — only have `formula`/`fact` (auto) atoms ready; their practice/property/trap themes are still `needs_review`. So a public quiz from those chapters can only be a Formulas/Key-Facts quiz today.

**Why:** the funnel's value is sharing good quizzes; a half-approved chapter limits theme variety and could surface thin quizzes. Approving them widens the publishable pool. Also run `npm run quiz:lint <route> <chapter>` on each before publishing (notes prompts can be sequence-dependent / unfair standalone).

**How to apply:** per chapter the user names — query its `needs_review` + `looks_mcq_clean` practiceSet/selfCheck atoms, author 3 distractors each into `scripts/quiz/verify/<route>__<chapter>.ts` (tag identity/rule Qs `theme:"property"`), `npm run quiz:verify`, then `quiz:lint` + fix flagged stems via the `stem` override. Chapter-by-chapter, on request (the agreed cadence).

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
