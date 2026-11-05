# Tech debt plan

Written 2026-11-05. Status: **approved by the owner 2026-11-05.** D1 decided (remove the chip); D3 decided (SheetJS 0.20.3, vendored); D4 done by the owner 2026-11-05 (the advisor's leaked-password warning is gone; the sign-up test with a leaked password is still to do).

Every claim here is a measurement taken on 2026-11-05, with the command or source that
reproduces it. Where something is not yet measured, the plan says so and makes measuring it
the first step. Sizes (S/M/L) are estimates from the counted files, not measurements.

How each item runs: its own branch, test first where there is logic, `npm run gate`, a
before/after sheet for anything a user can see, then merge. Approving a phase approves its
items; the **decision points** marked below still stop for the owner.

**Measurement (owner, 2026-11-05): all build and deploy measurements happen ONCE, after every phase is built and deployed.** Each item is verified without a build (typecheck, lint, tests, a dev-server check); the Baseline table is the "before". Moved to after that deploy: 2.5 (the heap limit) and every before/after comparison. Not builds, so still done in place: 2.3's traffic per page family (Vercel Analytics) and 4.0's advisory counts (scratch installs). Each phase stays in separate commits so a failing deploy build can be bisected; the deploy does not publish a failed build.

Builds follow the owner's
rule (no casual local builds): measurement builds are the normal deploy build or one `staged`
workflow run, each asked for first.

---

## Baseline (re-measure at the end of each phase)

| Measure | Value 2026-11-05 | Source |
|---|---|---|
| Deploy run, total | 30.4 min (17.9-21.1 min on 15-17 Oct) | `gh run list --workflow=deploy.yml` |
| Deploy: Build step | 1,577 s; compile 4m03s, type+lint 1m17s, page data 1m29s, **prerender 19m09s** | deploy log of b32e9be10 (phase timestamps) |
| Pages prerendered | 5,187 (5,182 on 3 Nov) | same log |
| Routes in the build | 1,446 | same log, route table |
| Build memory | ran out on 4 Nov ("Reached heap limit … heap out of memory"), fixed by an 8 GB heap in b32e9be10; runner has 16 GB | failed run of c74b6bc6f |
| Peak build memory | **not measured** (step 2.0 adds it) | |
| CI run | 9.6 min; typecheck 81 s, lint 33 s, tests 377 s | latest ci.yml run, step timings |
| `npm audit` | 29 (3 critical, 13 high, 11 moderate, 2 low) | `npm audit --json` |
| CLAUDE.md | 155.7 of 156.3 KB (100%); ~44,537 tokens per session with MEMORY.md | `npx tsx scripts/docs-budget.ts` |
| Prod-contract job | failed 8 days running (28 Oct to 4 Nov), cancelled 6 days before that | `gh run list --workflow=prod-contract.yml` |
| Notes chapter page JS | 411 kB first load (325 kB on 3 Nov) | deploy route tables, 3 Nov vs 4 Nov |

---

## Phase 0: owner decisions (no code)

| # | Decision | Data | Options |
|---|---|---|---|
| D1 | **Concept Ladder links are dead.** Question cards in MHT-CET Maths, Circle (71 PUBLIC questions) show a lesson chip (`src/lib/links/questionResources.ts:189` via `resolveLesson`) to conceptladder.in, which answers `HTTP 402`, `X-Vercel-Error: DEPLOYMENT_DISABLED` on every page (curl, 2026-11-05). The daily check passed all 9 links through 2026-11-01 and failed from 2026-11-02. | 9 prod-contract failures are this. | (a) re-enable the Concept Ladder Vercel deployment; (b) point the chip at the in-app Learn lessons (imported, migration 0192); (c) remove the chip. |
| D2 | **Which pages to build ahead.** Prerender is 19 min for 5,187 pages: /notes 893, /questions 797, /formula 397, /board 390, /guide 189, /mock 119, plus ~523 chapter landings (route table). | Traffic per page family is **not measured**. Step 2.3 measures it (Vercel Analytics) before you decide. | Build ahead only pages with traffic above a cut-off you pick; the rest render on first visit and are then cached, as homework days and print handouts already are. |
| D3 | **Where `xlsx` comes from.** npm's latest is 0.18.5 (no newer release on npm), flagged high twice: prototype pollution and ReDoS (`npm audit`). Used by `src/lib/upload/parser.ts` and `src/app/api/export/route.ts`. | SheetJS publishes fixed builds only from its own site. | (a) pin the SheetJS 0.20.x tarball by URL with its lockfile hash (same API); (b) replace with another library (a new dependency; your rules prefer not). |
| D4 | **Leaked-password protection is off** (Supabase security advisor). | Dashboard switch, not code. | You switch it on (Auth settings), or decline. |
| D5 | **Next.js target.** 14.2.35 is the last 14.x (published 2025-12-11, npm). npm dist-tags: `backport` 15.5.29, `latest` 16.4.5. | Which version clears the advisories is **not measured**; step 4.0 measures it. | Decide after 4.0. |

---

## Phase 1: stop the bleeding (small, independent; S each)

### 1.1 Concept Ladder chip: remove it (D1 decided 2026-11-05)
- **Evidence:** above. **Fix:** remove the `lesson` chip from `getQuestionResources` and its renderer, delete `src/lib/links/conceptLadder.ts` and retire `tests/concept-ladder-urls.test.ts` with it (prodContractFiles too). Test first: a resources test asserting no lesson chip for a mapped Class 12 Maths chapter.
- **Verify:** no `conceptladder.in` string left in `src/` (grep); a /browse card on a mapped chapter shows no chip (browser, phone width); prod-contract loses those 9 failures.
- **360:** scope one resolver, its renderer and its test; blast radius the 71 PUBLIC MHT-CET Circle questions (the only chapter mapped), whose chip links to a dead page since 2026-11-02; reversible by revert.

### 1.2 Prod-contract back to green, and make a failure noisy
The latest run (41813110379) fails 14 of 370 tests, with these causes:

| Failure | Measured cause | Fix |
|---|---|---|
| `notes-intro-counts` (8) | SSC CGL intros claim counts the bank has outgrown (vocabulary 36 vs 1,036 live; ancient-india 53 vs 132; medieval-india 45 vs 118; government-structure 26 vs 148; climatology 13 vs 42; national-income 39 vs 98). Two "claims 2025" are a year read as a count (modern-physics, astronomy-space). | Rewrite the six intros to not state a count that drifts; check whether the probe should skip 4-digit years (test first). |
| `solution-coverage-registry` | mpsc-forest-service-prelims declared none, measured 336/399; mpsc-agriculture-service-prelims none vs 590/700; mpsc-state-services-mains some vs 276/300. | Update `EXAM_REGISTRY` flags. These change visible copy, so an old-vs-new table. |
| `past-paper-solutions-registry` | mpsc-state-services-mains: 276/300 have solutions, flag not set. | Set `pastPaperSolutions: true`. |
| `guide-mht-cet-maths-playbooks` | perpendicular stems 148 live vs 147 in the guide. | Update the count. |
| `all-exam-stats` (`pickExamCardHref`) | test needs an exam with `noPublicContent`; none has it now. | Test bug: use a made-up registry entry in the test. |
| `concept-ladder-urls` (9) | D1. | 1.1. |

- **Make it noisy:** the job was red 14 days with nobody acting. On failure, the workflow opens or updates one GitHub issue (uses `gh`, no new dependency, no Resend quota; that quota is 100/day and shared with sign-up mail, OPERATIONS.md).
- **Verify:** 3 green daily runs in a row.

### 1.3 Notes chapter pages: +86 kB JavaScript on all 523
- **Evidence:** chapter landing first load 325 kB (3 Nov, 31 Oct) to 411 kB (4 Nov). Same window: subtopic page +2 kB, /board +6, /browse 0. The only commit in that window touching `NotesChapterLanding.tsx` is a601fc9c6, which statically imports the client component `NotesTopPyqs` (board reveal, `PaperDownload`, `PresentRegistry`). It renders only where `TOP_PYQS_SUBJECTS` has the subject: nda-maths, 30 of 523 chapters.
- **Fix:** load it only for those subjects (`next/dynamic`, or a server split so other subjects never reach it).
- **Verify:** next deploy's route table shows the chapter landing at about 325 kB; NDA Maths chapters still show the list (browser check, phone width).

### 1.4 Package hygiene
- `jszip` and `xlsx` are in `devDependencies` but imported by production code (`src/lib/export/docxBuilder.ts`, `pptxBuilder.ts`, `src/lib/upload/parser.ts`, `src/app/api/export/route.ts`). Move both to `dependencies`.
- `xlsx`: per D3. **Recommendation (data 2026-11-05):** SheetJS 0.20.3, the version its own site serves as `xlsx-latest` (read from the tarball's package.json; Apache-2.0). The advisories cover versions below 0.19.3 (GHSA-4r6h-8v6p-xvw6) and below 0.20.2 (GHSA-5pgg-2g8v-p4x9), so 0.20.3 clears both. The app uses 6 calls (`read`, `write`, `utils.sheet_to_json`, `aoa_to_sheet`, `book_new`, `book_append_sheet`) and 8 scripts import it, all on the same API. **Vendor the tarball** into the repo (`vendor/xlsx-0.20.3.tgz`, 2,409,319 bytes) and depend on `file:vendor/xlsx-0.20.3.tgz`, so no build or CI run depends on cdn.sheetjs.com being up. Exposure today is low: the only parser of uploaded files is `/api/upload/preview`, behind `requireSuperadmin()`; the export route only writes.
- `zod`: high advisory (memory exhaustion on oversized constrained collections), fixed only in 4.x (3.25.76 is the last 3.x, npm). **Not yet measured:** whether any of the 15 files importing zod validates public input with the affected collection rules. Check those 15 first; if exposed, move zod 4 up from Phase 4.
- **Verify:** `npm audit` count drops; export (Word, PDF) and upload golden paths in the browser.

### 1.5 Database quick fixes (one migration)
- `search_path` not set on `public.record_quiz_lead` and `private.organizations_protect` (security advisor). Set it.
- ~~Leftover table `question_principle_tags_bak_20260819`: drop.~~ **KEPT (owner, 2026-11-05).** Measured: it is the 2026-08-19 rollback copy of the principle-tag split (commit 5db95ff9d); live has since diverged (529 live rows vs 488; 102 only in live, 61 only in the backup), so it is no longer a usable rollback but is the only record of those 61 removed tags. Cost 72 kB and an INFO advisory shared by 32 intended tables, so dropping it buys nothing measurable.
- **Review only, no change unless a leak is found:** 18 SECURITY DEFINER functions callable by signed-in users and 7 by anon (advisor). Read each and confirm it filters by `auth.uid()` or returns only public data. Record the verdict per function in this file.
- **Leaked-password protection (D4, owner switches it on):** 182 accounts use email + password (131 created in the last 30 days); 2,227 use Google and are unaffected (`auth.identities`, 2026-11-05). Per Supabase's docs, existing users still sign in; sign-up and password changes with a leaked password are rejected with error code `weak_password`. Our sign-up page shows Supabase's raw message (`src/app/signup/page.tsx`, `setError(signUpError.message)`), while sign-in errors already go through a plain-words mapper in `src/lib/auth/credentials.ts`. **Add `weak_password` to that mapper for sign-up** (test first), wording: "This password has appeared in a data leak, so it is easy to guess. Please choose a different one." Not measured: whether the check also applies to logins a teacher creates through the admin API (`src/lib/batches/studentLoginsAdmin.ts`, typed or generated passwords). Check with one test login after the switch.
- **Verify:** advisors re-run; the two warnings, the table and the leaked-password warning gone; a sign-up attempt with a known leaked password is refused with the new wording and creates no account.

### 1.6 CLAUDE.md under budget
- **Evidence:** 155.7 of 156.3 KB, so the next Decisions entry fails `docs:budget`. Measured savings: the "September entries … evicted" paragraph is 15,699 bytes (~3,900 tokens); the 10 October entries are 7,417 bytes (~1,850 tokens), all flagged "due for archiving"; 45 of the 80 commands in the Commands section are already documented in OPERATIONS.md, README.md or a `scripts/*/README.md`.
- **Fix:** archive per the existing convention (long form must already be in DECISIONS_HISTORY.md; `docs:budget` names any that aren't); replace the eviction paragraph with one sentence; shorten those 45 commands to one line each with a pointer. Via the `update-docs` skill.
- **Target:** at most 125 KB (about 8,000 fewer tokens per session). **Verify:** `docs:budget`.

---

## Phase 2: build scaling (sequential; each step measured before the next)

### 2.0 Measure build memory (S)
- Wrap the Build step in `deploy.yml` with `/usr/bin/time -v` so every deploy logs maximum resident memory. Baseline from the first run after merge.

### 2.1 Spike: one subject's notes pages as a dynamic route (M, throwaway branch)
- **Evidence:** 522 chapter `page.tsx` and 522 `[subtopicSlug]/page.tsx` are byte-identical apart from the slug (hashing each file with the slug replaced: 522 + 522 identical, 3 others differ). Each imports `src/lib/notes/chapters.ts` (7,762 lines, 481 imports of chapter content); 1,075 files import it. Precedent: `/notes/print/[subjectRoute]/[chapterSlug]` already serves every chapter from one route.
- **Unknown the spike settles:** each chapter folder keeps its `_data/` after its `page.tsx` goes. The spike proves whether a static folder with no page (`nda-maths/statistics/`) lets `nda-maths/[chapterSlug]` serve `/notes/nda-maths/statistics`. A level-1 dynamic folder is not possible: `/notes/[examSlug]` already uses that level, and Next allows one slug name per level (as noted for `/formula`).
- **Spike on nda-maths (30 chapters):** check (a) every old URL answers 200 on local dev; (b) the sitemap's notes URLs are identical before and after; (c) the HTML of 3 pages matches, ignoring build ids.
- **Decision point:** if the folders shadow the route, move `_data` out to `src/content/notes/` instead (larger rename). Bring the data back to the owner.

### 2.2 Roll out to all 52 subjects (M-L)
- 1,044 page files become 104 (2 per subject), or fewer if 2.1 allows. Replace the registry's static imports with a generated per-chapter loader, the pattern already used by `src/lib/board/revision/loaders.generated.ts` and `src/lib/chat/notesData.generated.ts`. Consumers that need every chapter at once (sitemap, notes-lint, guides) keep a lean generated index (`notesNavIndex.generated.ts` exists).
- **Verify against baseline:** route count (1,446, expected about 506), compile time (4m03s), peak memory (2.0), sitemap URL list identical, `notes:lint` green, notes pages render (spot check per exam).

### 2.3 Prerender budget (after D2) (M)
- **Measure first:** views per page family over 28 days from Vercel Analytics (read in Chrome, per the standing memory note), set against the counts in D2.
- Build ahead what clears the owner's cut-off; the rest render on first visit, then serve from cache (`revalidate` unchanged).
- **Verify:** prerender time (19m09s); first-visit response time on 10 sample pages; Search Console indexed counts unchanged 2 weeks later.

### 2.4 Repeated database reads during a build (M)
- Already approved and open in SUGGESTIONS.md ("A build is too expensive for the production database", 2026-10-04: e.g. `exams?name=eq.JEE Mains` requested 446 times in one build). Do it here: count requests by shape in one build, cache the top repeats for the build, re-measure requests and peak per minute.

### 2.5 Drop the 8 GB heap if it is no longer needed (S)
- After 2.2-2.4, if peak memory (2.0) is well under Node's default heap, remove the override so the runner's 16 GB stays headroom. Keep it if not; the number decides.

---

## Phase 3: structural consolidation (items independent of each other)

### 3.1 Guide pages from one component (M)
- **Evidence:** 14 `playbooks/[slug]/page.tsx` of 248-335 lines; nda-biology vs nda-geography differ in 34 lines, every one the subject name or its data import. MHT-CET Physics vs Chemistry strategy pages (707 and 698 lines) differ in 97 lines with subject names masked.
- **Fix:** one shared playbook page and one strategy layout, each driven by a per-subject settings object.
- **Verify:** fetch every guide URL from local dev on `main` and on the branch, and diff the HTML (ignoring build ids): zero differences. The existing guide taxonomy tests stay green.

### 3.2 Access-rule checks run once per query, not per row (M)
- **Evidence:** 63 policies call `auth.uid()` per row (performance advisor; `pg_policies`). Busiest affected tables by scans: org_members 4.9M, mock_attempts 274k, mock_tests 243k, attempt_answers 196k, user_activity 174k. Slowest affected reads by `pg_stat_statements` (role `authenticated`): a mock_attempts read, 297 ms mean over 331 calls; an attempt_answers read with no filter of its own, 604 ms mean, from `src/lib/drill/query.ts:324` (`select question_id … order(question_id)`), so the `EXISTS … auth.uid()` rule runs over all 69,097 rows. `src/lib/practiceTests/seen.ts:20` and `src/lib/email/service.ts:86` have the same shape.
- **Fix:** (a) a migration rewriting the 63 policies to `(select auth.uid())`, same logic; (b) the three reads filter by the student's own attempt ids.
- **Verify:** the RLS integration tests on the test project; `EXPLAIN (ANALYZE, TIMING OFF)` as a test user before and after; `pg_stat_statements` mean for those shapes after 7 days (baseline 604 ms and 297 ms).

### 3.3 Database types (M, then by touch)
- **Evidence:** `src/types/db.ts` does not exist although `npm run db:types` writes there; no Supabase client is typed (`<Database>`: 0); 65 `as unknown as` casts in `src/`; 176 files call `.from("…")`; the schema has 103 tables and 97 functions.
- **Fix:** generate the types and commit them; add typed client factories; new code uses them; existing modules move over when edited. A ratchet test fails if `as unknown as` count in `src/` rises above 65 (same pattern as `tests/voice-ratchet.test.ts`).

### 3.4 Paging helpers (S, then by touch)
- **Evidence:** `readAllPages` (`src/lib/supabase/readAllPages.ts`, since 2026-10-23) is used in 9 files; 40 files in `src/` call `.range(`, most as hand-written paging loops; 48 local page/chunk constants; no shared helper for splitting `.in()` id lists (~200 per request, CLAUDE.md). This limit has caused 5 production bugs (CLAUDE.md, Recurring pitfalls).
- **Fix:** add `readInChunks` beside `readAllPages`; a ratchet test fails if the count of files with hand-written paging loops rises; move files over when edited.

### 3.5 One site address, one slug rule (S)
- **Evidence:** `SITE_URL = "https://www.pyqvault.com"` defined in 10 files (CLAUDE.md says 4); intl.pyqvault.com exists, with `canonicalFor` in `src/lib/sites/intl`. 5 slug functions (`ChapterBreakdownTable`, `board/query`, `mocks/sectional`, `papers/template`, `questions/slugs`).
- **Fix:** one exported constant; check each of the 10 uses for whether it should be site-aware. For slugs: run all 5 over every chapter and subtopic name in the bank; merge only the ones whose outputs are identical (URLs depend on them).

### 3.6 Data checks, change only if numbers justify it (S)
- 47 foreign keys without an index (advisor): measure the child-table row counts and whether the parent is ever deleted (org deletion cascades); index only those that matter.
- Dead code: run `npx knip` once (not added to package.json) and review its list; a rough import scan this session found no confirmed unused files in `src/lib` or `src/components`.

---

## Phase 4: framework upgrade (after Phase 2; L)

### 4.0 Measure before choosing (S)
- In scratch folders, install next@15.5.29 and next@16.4.5 with matching React and ESLint, and run `npm audit` on each, giving the advisories left per target (D5).
- Size of the change, counted 2026-11-05 in `src/`: 612 page/layout/route files read `params` (522 are notes subtopic pages, so about 90 after 2.2); 567 `generateMetadata`; 50 use `searchParams`; 13 `cookies()`; 3 `headers()`; 99 route handlers; 7 `"use server"` files; 18 `unstable_cache`; 89 `fetch(`; 1,247 `export const revalidate`; 75 `export const dynamic`; 7 `forwardRef`. Doing Phase 2 first is what cuts the `params` count from 612 to about 90.
- Read both upgrade guides and list each breaking change against these counts in this file.

### 4.1 Next 15 + React 19 (L)
- Official codemods, then the full gate. **Caching check** (this site has silently lost all caching before, CLAUDE.md "shell component de-caches site"): count prerendered `.html` files in the build output and read `Cache-Control` on 10 sample pages, before and after; the counts must match.
- Before/after sheets on the main page types (owner rule).

### 4.2 Next 16, ESLint 9 (L)
- Per the 4.0 list. Build time before and after is measured and reported.

### 4.3 Test runner and validation (M)
- Vitest 2 to 5 (critical advisory on vitest/tinypool; dev only), zod 3 to 4 (15 files; earlier if 1.4 finds exposure).
- **Not planned:** Tailwind 4, TypeScript 7, lucide 1.x. `npm audit` lists no advisory for any of them, and Tailwind 4 would change styles site-wide. Revisit only with a reason.

---

## Phase 5: keep it from coming back (S each)

- **Build budget report** in `deploy.yml`: print build minutes, route count, pages prerendered, peak memory and the 5 heaviest routes by first-load JS; warn (not fail) past thresholds set from the post-Phase-2 numbers.
- **Prod-contract failure opens an issue** (1.2).
- **Ratchets:** `as unknown as` (3.3), hand-written paging loops (3.4).
- **Weekly `npm audit` report** in an existing scheduled workflow, report only.

---

## Deliberately out of scope (with the data)

- **Unused indexes:** 38, 2.5 MB in total (largest `vocab_entries_chapter_idx`, 1 MB). Not worth a migration.
- **`scripts/` size:** 287 MB, 14,139 files, 94 pipelines; CI checkout takes 12 s. It is the ingestion record, and moving it saves almost nothing measured.
- **Line-level hygiene in `src/`:** 0 `console.log`, 2 TODO/FIXME, 0 `@ts-ignore`, 50 `any`, 44 `eslint-disable`. Already healthy.
- **Ingestion write path:** all 36 commit scripts that write call `commitStaged`; the other 7 hand off to one that does; none inserts into `questions` directly.
- **33 tables with RLS on and no policy:** service-role-only tables, as the access model intends (CLAUDE.md, Multi-tenancy).
- **Migration names vs files:** the database records some migrations without the number prefix; `npm run testdb:migrate` already guards the drift this could hide.

---

## Order and dependencies

```
Phase 0 decisions
  └─ Phase 1 (1.1-1.6 in any order; 1.1 needs D1, 1.4 xlsx needs D3)
       └─ Phase 2: 2.0 → 2.1 (decision point) → 2.2 → 2.3 (needs D2) → 2.4 → 2.5
            ├─ Phase 3 (3.1-3.6 independent; may start alongside Phase 2)
            └─ Phase 4: 4.0 (D5) → 4.1 → 4.2 → 4.3
                 └─ Phase 5 thresholds set from post-Phase-2 numbers
```

## Status log

| Date | Item | Result |
|---|---|---|
| 2026-11-05 | Plan written | approved; D1 = remove the chip |
| 2026-11-05 | D4 leaked-password protection | on (owner); advisor warning gone. `/signup` maps `weak_password`/`pwned` to plain words. Owner's own sign-up test still to do |
| 2026-11-05 | 1.1 chip removed | merged locally. Scope was ONE chapter (MHT-CET Circle, 71 PUBLIC questions), not "Class 12 Maths"; the site failed the daily check from 2026-11-02, not 10-28 |
| 2026-11-05 | 1.2 prod contract | 14 of 14 original failures fixed: the 8 "stale intros" were a PROBE bug (thousands comma, years read as counts, per-year counts), fixed test-first; fixing it exposed 13 real stale MHT-CET Chemistry intro totals (the 2026-11-04 bank repair), updated with HARD counts re-measured; MPSC solution flags; MHT-CET Maths 147 -> 148; exam-card test made self-contained. A full prod-contract run then showed 2 NEW failures from the same repair (MHT-CET Chemistry guide overview 3,371 vs 3,389 live, matrix stale; the 2026-10-10 blog post's chapter table): content refresh, owner to decide |
| 2026-11-05 | 1.2 "make it noisy" | NOT built: the repo has had 0 GitHub issues ever, so an issue has no evidence of being seen over the failure emails that went unread for 8 days. Owner to choose the channel |
| 2026-11-05 | 1.2 alert channel | owner chose EMAIL. `prod-contract.yml` now emails the platform admins on failure, naming the failing tests (`src/lib/ops/checkFailureEmail.ts`, TDD); step limits 12/6/2 min (about 3x the slowest of the last six runs: 254 s, 70 s, 2 s) turn a hang into a failure, since a cancelled job (10-21 to 10-26) is not one. Not yet seen firing: it needs a real failure, or a one-off test send |
| 2026-11-05 | MHT-CET Chemistry refresh (owner: do it now) | guide + blog on the repaired bank: total 3,371 -> 3,389, 21 chapter counts, 48 subtopic/chapter prose figures, 2023-24 rates (e.g. Structure of Atom 2.00 -> 2.07), HARD_BY_YEAR, EASY shares 56/60% -> 57/61%, /guide total 10,149 -> 10,167; every 2025-26 rate unchanged, so no strategy claim moved; blog mark shares unchanged (71/17/12). Full prod-contract: 41/41 files green |
| 2026-11-05 | 1.3 Top 10 PYQs lazy | `next/dynamic` in NotesChapterLanding (TDD source guard). Dev: NDA Statistics keeps the section and answers a tap; AFCAT Average has none. The kB saving is UNMEASURED until the next deploy route table (baseline 411 kB, expected ~325) |
| 2026-11-05 | 1.4 packages | merged: xlsx 0.20.3 vendored as a file dependency (both advisories fixed; `npm audit` 29 -> 28, high 13 -> 12); jszip and xlsx moved to dependencies (jszip kept at 3.10.1). zod: measured that zod 3 parses every element despite `.max()` (4 MB body -> 634 MB heap, 0.9 s on /api/profile); `boundedArray` caps it first (22 ms, one issue) on the 2 routes the public reaches; editor and sync authenticate first. zod 4 stays in Phase 4 |
| 2026-11-05 | 1.5 database | migration 0217 pins search_path on record_quiz_lead and organizations_protect (replayed on the test project; 14 covering tests green; applied to prod; advisor warning gone). SECURITY DEFINER review: all 18 pin search_path; each scopes by auth.uid(), checks a role, or returns public settings/lessons; v_search_answers filters PUBLIC and all 760 publish_blocked IMAT rows are PRIVATE: no leak. The backup table is KEPT (see 1.5) |
| 2026-11-05 | 2.0-2.2 (part 1) | 2.0: deploy build logs peak memory (GNU time). 2.1 trial on nda-maths passed: chapter folders holding only `_data` do not shadow the `[chapterSlug]` route; 4 pages identical in head tags + visible text; unknown chapter 404 (dev shows Next's error shell, the browser shows the full site 404; `dynamicParams = false` added; check the prod HTML after deploy). 2.2: all 47 subjects moved, 1,046 page files -> 94; 140 sampled URLs (first/last chapter + a subtopic per subject) all 200 (IMAT on the intl host). Found: the DEV server ran out of its default heap after ~22 compiled notes routes (each carries the whole registry); not compared with before. That registry-per-route load is what 2.2 part 2 (lazy chapter loaders) targets |
| 2026-11-05 | 2.2 part 2 | the notes routes, NotesChapterLanding and NotesSubtopicPage no longer import the registry: a generated chapter index + one lazy loader per chapter (`npm run notes:chapter-loaders`); keepGoing.ts and formula/chapterPages.ts read the index. Value graphs 3,600 / 3,791 modules -> 240 / 431 (+ one chapter). loadNotesChapter rebuilds all 523 registry entries identically (test). Dev: 4 pages identical to before INCLUDING the 404 (now the full site 404 in the HTML); 140 sampled URLs all 200; on the default heap the dev server now served ~62 compiled notes routes before running out (was ~22): improved, NOT solved, dev still accumulates per route. Notes pipeline register.py and NOTES_WORKFLOW.md no longer create per-chapter pages |
