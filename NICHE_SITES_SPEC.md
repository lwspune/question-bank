# Niche sites — spec (2026-10-08)

What this document is: the plan for serving international exams (IMAT first)
on their own small branded sites — one site per exam — from the PYQ Vault
codebase, database and Vercel project. Nothing here is built yet. It is the
source of truth for this work until it ships; then its decisions move to the
CLAUDE.md Decisions log.

## 1. Decisions already made (owner, 2026-10-08)

| Decision | Why |
|---|---|
| International exams get **niche sites, one per exam** (IMAT first, more later). | Showing Indian exams to international students dilutes the proposition. |
| Niche sites live **inside this repo, this Supabase project and this Vercel project**. | Easiest to build and maintain: one codebase, one database, one deploy. Every engine fix reaches every site. A separate repo was considered and rejected: it means copying the engine and letting the copies drift. |
| Trial domain: **`imatvault.vercel.app`**. A real domain comes once the trial shows demand. | No cost; a `*.vercel.app` name can be attached to the existing project. |
| IMAT papers used: **2023 onward only** (set by the Italian Ministry, MUR, with CINECA). | 2011-2022 papers are Cambridge's; its policy refuses permission for multiple-choice papers and anything set before 2016. 2023+ papers are plausibly outside copyright under Italian Law 633/1941 art. 5 (official acts of the State). See §7, D1. |

### Order of work (owner, 2026-10-08): content first, domain later

The questions are the same data whichever domain shows them, so IMAT is
ingested first and the site work (P1 platform, P3 pages) follows later.
Nothing done in the content-first step is redone.

| Step | What |
|---|---|
| C1 | Find the official MUR papers 2023+ and check each has an official key. A paper without an official key is not ingested. |
| C2 | Branch `feat/imat-five-options`: migration 0140 adds `'E'` to `option_label`; the commit path takes `StoredOptionLabel` (A-E) while the Excel template's `OptionLabel` stays A-D. The one PYQ Vault surface that lists every DB exam, the `/browse` exam dropdown (`listExams`), drops exams named in `lib/sites/nicheExams.ts` (IMAT). It is a NAMED list, not "not in `EXAM_REGISTRY`", because /browse deliberately keeps an exam ingested before anyone registered it (FilterBar). The mock and item-stats parts of A-E wait for P1.5. |
| C3 | `scripts/imat/` pipeline (P2.1-P2.4 below); rows land **PRIVATE**; standing audits. |
| C4 | **Done 2026-10-09:** teaching notes for every IMAT chapter (46 chapters, 671 concepts) in `src/lib/sites/imat/notes/`, registered only in its own `IMAT_NOTES_CHAPTERS`, so PYQ Vault never lists them. Every worked example and five-option self-check is original (the past papers are evidence only), so the notes do not wait on D1. Readable today at the superadmin-only `/dashboard/imat-notes`. Showing them on the IMAT site means adding a `/notes` page to the P3 list below, which is the owner's call. |

While C1-C3 are the only steps done: IMAT is NOT in `EXAM_REGISTRY`, has no
mocks, and every row is PRIVATE, so PYQ Vault shows nothing of it. Every
other PYQ Vault surface that lists exams already picks them from
`EXAM_REGISTRY` (`/questions` landings, exam stats, sitemap, nav). Rows flip
PUBLIC only when the niche site (P3) and D1 are both done.

## 2. How it works

```
imatvault.vercel.app/mock      ──rewrite──▶  /s/imat/mock        (niche page tree)
www.pyqvault.com/mock          ──────────▶  /mock               (unchanged)
www.pyqvault.com/s/imat/...    ──────────▶  404                 (blocked)
imatvault.vercel.app/notes     ──rewrite──▶  /s/imat/notes  ──▶  404 (no such page)
```

- **One route tree per niche site family:** `src/app/(niche)/s/[site]/...`. It
  holds only what a niche site needs. Any path not defined there is a 404, so
  Indian pages can never appear on a niche domain *by construction*.
- **Routing by domain in `next.config.mjs` rewrites** (`has: [{ type: "host" }]`),
  not middleware. Vercel resolves these without running a function, so they
  cost nothing. Middleware stays scoped to the signed-in surfaces, as today
  (running it everywhere cost ~40% of edge CPU — 2026-06-27 Decisions entry).
- **`/api/*` is shared.** Rewrites skip `/api`, `/_next` and static files, so
  the niche pages call the same export, mock and auth routes.
- **The site is in the URL path, so caching keeps working.** Choosing the brand
  by reading the request's host inside a shared layout would call `headers()`
  and de-cache every page on every site (the shell-component pitfall in
  CLAUDE.md). With `/s/[site]` in the path, each site's pages prerender and
  cache like any other page.

### Layouts

Today `src/app/layout.tsx` carries PYQ Vault's metadata, description, the V
chatbot, Clarity and the student providers. It becomes three layers:

| File | Holds |
|---|---|
| `src/app/layout.tsx` (root, slimmed) | `<html>`, `<body>`, fonts, `globals.css`, Toaster, Vercel Analytics. Nothing branded. |
| `src/app/(pyqvault)/layout.tsx` (new) | Everything PYQ Vault-specific that the root has today: metadata + `metadataBase`, JSON-LD, Clarity, ChatWidget, providers, acquisition capture. |
| `src/app/(niche)/s/[site]/layout.tsx` (new) | The site's own metadata, colours, header and footer. |

Every existing route folder moves into `(pyqvault)/`. A route group does not
change URLs. Keeping one root layout (rather than two) avoids Next 14's
full-page reload between root layouts and keeps the global `not-found` working.

**Unknown paths on a niche domain:** Next renders the ROOT `not-found.tsx` for
an unmatched URL, which would show PYQ Vault's 404. A catch-all
`(niche)/s/[site]/[...rest]/page.tsx` that calls `notFound()` makes the niche
tree render its own 404 instead.

### Site settings

`src/lib/sites/registry.ts` — one entry per niche site, as data:

```ts
{
  slug: "imat",
  name: "IMAT Vault",
  hosts: ["imatvault.vercel.app"],     // + the real domain later
  canonicalHost: "imatvault.vercel.app",
  indexable: false,                    // trial: noindex everywhere
  exams: ["IMAT"],                     // DB exam names this site serves
  colours: { brand: "#…", brandAccent: "#…" },  // must pass the AA test
  currency: null,                      // no payments in the trial
  signedInHome: "/mock",
}
```

Pure helpers, written test-first: `siteForHost(host)`, `siteBySlug(slug)`,
`isNicheExam(examName)`. `next.config.mjs` builds its rewrites from the same
registry, so adding a site never means editing routing by hand.

### Niche exams stay out of PYQ Vault

The leak runs in this direction: PYQ Vault surfaces that list exams would
pick up IMAT, and Google would see the same questions on two domains.

1. **Not in `EXAM_REGISTRY`.** 33 files read that registry (nav, sitemap,
   `/exams`, `/browse`, chatbot, mock catalogue, growth dashboard…). Niche exams
   get their own profile in the site registry instead, so every one of those
   surfaces excludes them without being touched. Engine code that looks up an
   exam's profile by name (mock blueprints, the runner's `bilingual` check)
   goes through one lookup that checks both registries.
2. **A `site` column on `exams`** (default `'pyqvault'`, NOT NULL, CHECK
   against the known slugs). Queries that list exams straight from the
   database add `site = 'pyqvault'`. Starting list, confirmed by the audit in
   P1.4: `lib/questions/taxonomy.ts`, `lib/questions/landing.ts`,
   `lib/questions/defaultViewCounts.ts`, `lib/exam/allExamStats.ts`,
   `lib/exam/examHomeStats.ts`, `lib/exam/examIdMap.ts`, `lib/board/query.ts`,
   `lib/books/query.ts`, `lib/planner/query.ts`, `lib/guide/resolveTaxonomy.ts`.
3. **A leak test** that seeds a niche exam in the test DB and fails if any
   PYQ Vault loader (sitemap, `/questions` landings, `/browse` taxonomy, mock
   catalogue, exam stats) returns it.

### Students and accounts

- One Supabase auth user pool. Sessions are per domain (browsers treat each
  `*.vercel.app` subdomain as a separate site), so nobody sees another brand.
- **Record the site a student signed up on** (`signup_site`, written where
  first-touch is saved at account creation). Without it the trial cannot be
  measured, and the next three items cannot exclude niche students.
- **PYQ Vault's email crons skip niche students** (welcome, due-nudge,
  mock-report, push). Otherwise an IMAT student gets PYQ Vault-branded mail.
- **Paywall limits skip niche exams** for the trial. The free-mock trigger
  (migration 0120) and the 0134 limits count every `mock_attempts` row today,
  so a PYQ Vault limit switched on at `/dashboard/pricing` would quietly
  apply to IMAT.
- **Sign-in on the trial is Google only.** Email sign-up and password reset
  send Supabase's single email template, which says PYQ Vault. Branded auth
  email (Supabase's Send Email hook, sent through Resend) is a later phase.
- The auth callback already builds its redirect from the request origin, so
  it works on any domain. Its post-sign-in destination (`signedInHome`)
  must resolve to a page that exists on the niche site (`/mock`), not `/me`.

### Five options (A–E)

IMAT questions have five options. The bank allows four:

| Where | Today | Change |
|---|---|---|
| `option_label` enum (0001) | `'A','B','C','D'` | `ALTER TYPE … ADD VALUE 'E'` (additive, safe) |
| `mock_attempt_answers.selected_label` CHECK (0044) | A–D | widen to A–E |
| `question_item_stats.key_at_measurement` CHECK (0095) | A–D | widen to A–E — the weekly `itemstats:rollup` reads every mock response, so it would otherwise fail on the first IMAT answer |
| ~30 code sites typed `"A" \| "B" \| "C" \| "D"` | — | widen **only on the niche path** (below) |

Code on the niche path, widened through one shared `OptionLabel` type:
upload/commit validation, `lib/questions/query.ts`, `lib/mocks/answers.ts` +
`query.ts`, the mock answer route's zod schema, the runner and its palette,
the result page, both export builders (Word + PDF), `lib/itemStats/types.ts`.

Deliberately left at A–D, because no niche exam reaches them: the quiz
factory (`lib/quiz/*`, `quiz_atoms` CHECK), the nda-tracker sync
(`lib/sync/*`), the admin question editor, `practiceBatch`, `drill/parse`,
`i18n/bilingual`. Each gets a one-line comment saying so, and the leak test
in §2 covers the drill.

### IMAT exam profile

| | |
|---|---|
| Paper | 60 questions, 100 minutes, one sitting |
| Sections | Reading skills & general knowledge 4 · Logical reasoning 5 · Biology 23 · Chemistry 15 · Physics & Maths 13 |
| Marking | +1.5 correct, −0.4 wrong, 0 blank — fits the existing `marking: { correct, wrong }` blueprint shape unchanged |
| Options | 5 (A–E), one correct |

The section counts above come from secondary sources; P2 confirms them
against each official paper before the blueprint is written.

## 3. Work plan

Rules that apply throughout: tests before code (CLAUDE.md); branch per phase;
`npm run gate prepush:quick` on branches, one local build a day at push time;
before/after screenshot sheet for any PYQ Vault change you can see (P1.1 must
show NO visible change). Migrations take the next free number at the time.

### P0 — Owner actions (dashboards Claude cannot reach)

1. Vercel → project `question-bank` → Domains → add `imatvault.vercel.app`.
2. Supabase → Authentication → URL Configuration → add
   `https://imatvault.vercel.app/api/auth/callback`.
3. Decide D1–D3 in §7.

### P1 — Platform

| Step | What | Done when |
|---|---|---|
| P1.1 | Slim root layout; move all routes into `(pyqvault)/`; move PYQ Vault chrome into its layout. | Build page count identical before/after; prerendered `.html` count identical; screenshot sheet shows no change; `npm test` green. |
| P1.2 | `lib/sites/registry.ts` + pure helpers (TDD). | Unit tests for host lookup, unknown host, slug lookup, niche-exam check. |
| P1.3 | Host rewrites in `next.config.mjs` generated from the registry; block `/s/*` on PYQ Vault hosts; `X-Robots-Tag: noindex` header on non-indexable sites; per-site `robots.txt` + `sitemap.xml` routes. | Local check with a `Host:` header: niche paths serve niche pages, unknown paths 404 with the niche 404, `/api` passes through, pyqvault `/s/imat` is 404. |
| P1.4 | `exams.site` column (migration) + audit every DB exam listing + the leak test. | Leak test fails before the filters, passes after. |
| P1.5 | A–E: migration (enum + two CHECKs), shared `OptionLabel`, niche-path code. | Tests: a 5-option question commits, renders, grades, exports (Word + PDF); a 4-option question is byte-identical to before. |
| P1.6 | `signup_site`; email crons + push skip niche students; paywall triggers skip niche exams. | Tests on each skip; cron dry-runs show 0 niche recipients. |
| P1.7 | Engine lookups (`examProfile(name)`) read both registries; IMAT blueprint (+1.5/−0.4, 5 sections). | Grading test: right/wrong/blank on a 60-question paper gives the official score. |

### P2 — IMAT content

| Step | What |
|---|---|
| P2.1 | Fetch the **official MUR papers** 2023, 2024, 2025 (2026 if published) **and official keys** from mur.gov.it / accessoprogrammato.mur.gov.it. Never from a prep site — their layout and worked solutions are their own copyright. Record each file's source URL. |
| P2.2 | `scripts/imat/` pipeline on the shared commit core: extract → stage → commit. Rows land **PRIVATE** until D1 is answered. Figures and tables handled as in the existing pipelines. |
| P2.3 | Reconcile: 60 questions per paper, every question has exactly one correct option among five, keys match the official key. Run the standing audits (`audit:text`, `audit:figures`, `audit:omml` on the IMAT filter). |
| P2.4 | Taxonomy: subjects = the five sections; chapters from the official syllabus (MUR decree annex). |
| P2.5 | Build one mock per paper with the IMAT blueprint. Publishing is the owner's call. |

Worked solutions are out of scope for P2. The official key is the answer; a
later phase can add solutions.

### P3 — The IMAT site (trial)

| Page | Notes |
|---|---|
| `/` | What IMAT is, what the site offers, start a mock. |
| `/browse` | The bank filtered to IMAT, reusing the question list and card. |
| `/mock`, `/mock/[slug]`, runner, result | Reusing the existing runner and result components. P3 starts with an audit of those components for hard-coded PYQ Vault links (`/drill`, `/pricing`, `/me`, AppHeader) and makes them take links from the site. |
| `/login` | Google button only. |
| `/robots.txt`, `/sitemap.xml` | Disallow-all + noindex while `indexable: false`. |
| 404 | The niche catch-all. |

Header, footer, icon and manifest come from the site entry. The V chatbot and
Clarity stay PYQ Vault-only for now.

Done when: the golden path works on `imatvault.vercel.app` — land, browse,
sign in with Google, sit a mock, see the result — checked on a phone and a
desktop, and pyqvault.com shows no IMAT anywhere (leak test + a manual look
at the sitemap, `/exams`, `/mock`, `/browse`).

### Later — only if the trial shows demand

- Real domain; the trial URL 308s to it; `indexable: true`.
- Branded auth email per site (Supabase Send Email hook → Resend, sending
  domain verified per site). Then email sign-up.
- Payments in the site's currency. `plans.ts` accepts INR only today; plans
  gain a `site`, entitlement scopes become per site.
- Worked solutions; original IMAT-style practice questions for Biology, the
  largest section, if the past-paper bank proves too thin.

## 4. Measuring the trial

Read from the database by `signup_site` and the IMAT exam: visitors (Vercel
Analytics, filtered by host), sign-ups, mocks started, mocks finished, share
of the paper answered, returns within 7 days. The owner sets the bar that
means "buy the real domain and build payments".

## 5. Adding the next niche site

1. Owner: legal position on the papers, year by year, with evidence.
2. Official papers and keys located, source URLs recorded.
3. Exam profile: options, marking, sections, timing, language. Anything the
   engine cannot represent (adaptive tests, scaled scores, drag-and-drop
   items) means defer or decline, never a special case in the engine.
4. Site entry in `lib/sites/registry.ts`, `exams.site` set for its exams.
5. Domain attached in Vercel; callback URL added in Supabase.
6. Pipeline in `scripts/<exam>/`, then mocks.

No new route code should be needed for a site that only needs the P3 pages.

## 6. Risks

| Risk | Mitigation |
|---|---|
| P1.1 moves every route folder: a large diff on the product that earns money. | Mechanical move only (`git mv`), no code edits in the same commit; prove with page counts, `.html` counts, screenshots and the full test suite before merging. |
| Shared database: PYQ Vault's prod DB has gone down under build load before. | Niche pages are few and prerendered; IMAT adds ~250 questions. If a site takes off, its content can move to its own project later. |
| A PYQ Vault surface lists niche exams that the audit missed. | `EXAM_REGISTRY` exclusion covers 33 files by construction; the leak test covers the DB listings. |
| A shared component links to a PYQ Vault-only page from a niche site. | The P3 component audit; the niche 404 catches anything missed rather than showing PYQ Vault. |
| Section counts or marking differ by year. | P2.1 confirms from each official paper; the blueprint can vary by sitting, as NDA's does. |

## 7. Open decisions (owner)

- **D1 — Copyright before going live.** The trial URL is public even when
  noindexed and unshared. Get the one-line Italian legal opinion on MUR IMAT
  papers before IMAT rows are flipped PUBLIC? (Default in this plan: yes;
  rows stay PRIVATE until then. Pages can be built and checked against the
  test database meanwhile.)
- **D2 — Trial limits.** Google-only sign-in, no payments, noindex. OK?
- **D3 — Brand name.** "IMAT Vault" to match the trial domain, or another
  name? Colours for the site?
