# Product roadmap

Pending features, data-model changes, and content work for Question Bank. Mirrors the "deferred" annotations scattered through the `CLAUDE.md` decisions log and consolidates them in one place.

**Live state** — for current bank size, per-subject counts, shipped features, test counts, and migration count, see the **"Live bank size"** line at the top of `CLAUDE.md` and the **Decisions log** section below it. Don't duplicate that here; it drifts on every upload.

---

## Data model

### Cross-topic questions — decouple concept tags from the home subtopic (2-phase)

**Diagnosis (2026-06-07):** `subtopic_id` is overloaded — it does *filing/navigation* (where a question shows on `/browse`, which paper it belongs to) AND *concept membership* (because a concept tag is welded to the home subtopic: `question_concept_tags.subtopic_slug` must equal the question's subtopic). That weld causes every cross-topic friction point: the **same technique re-taught across N subtopics** (e.g. line-of-intersection = n₁×n₂ taught 3× in DC&Ratios/Straight-Line/Plane), **invisible cross-chapter prerequisites** (a Functions question needs `f'(1)` but links nowhere), and **move-as-the-only-fix** for mis-filing (move ⇒ forced retag). Today's footprint is small — 13 multi-concept-tag questions, 0 cross-subtopic tags (the wall holds), ~5–6 cross-chapter-prerequisite questions found in the MODERATE sweep.

**Ideal model (keep one canonical home; decouple membership):**
- Keep a **single canonical home** (chapter+subtopic) for navigation — `/browse`, the PYQ paper-builder, Word export, and guides all need one answer to "which paper/chapter." Do NOT multi-home or go fully tag-only; the chapter tree is load-bearing.
- **Drop `subtopic_slug` from the concept tag** (`concept_slug` is already globally unique; derive the subtopic from the concept). Then a question filed under *Functions/Domain* can point at the *Differentiation/derivative-at-a-point* concept without moving — kills the re-teaching duplication (one canonical teaching home per technique, removes **rename-rot** risk) and makes cross-chapter membership expressible.
- Add a **tag role** `primary | secondary | prerequisite`. Formalises the hand-applied rules: *home follows primary* (mis-filing mostly disappears); coverage gaps = primary/secondary not taught (prerequisites are expected-elsewhere, not flagged — automating the sweep's "exclude cross-chapter prerequisite" rule); and **prerequisite** unlocks the chip in Phase 1 below.
- Keep the **principles-vs-concepts authoring distinction** (curated/selective vs coverage/per-upload) — as a flag/role, not necessarily a merge; the authoring-loop reason for the wall is real.

**Phasing — trigger-gated, do NOT migrate preemptively:**
- **Phase 1 (cheap, no schema change to the home model): prerequisite links.** Surface "Needs: Differentiation →" cross-chapter pointers so a cross-topic question links the student to the missing prerequisite instead of stranding them. Curated TS map rendered through the existing `getQuestionResources` → `ResourceChip` cross-link infra; seed with the cross-topic questions already known (the `[d/dx]` Functions/Sequence ones, binomial-variance-in-Statistics, etc.). Highest UX value, no migration. **← do this first.**
- **Phase 2 (the decouple migration): only when rename-rot actually bites** — i.e. the first time renaming a shipped concept silently breaks its re-taught copies across subtopics. Drop `subtopic_slug` from the tag PK; rework `loadConceptDrills` / mastery-checkpoint queries / `getQuestionResources`; re-derive. Real regression surface for currently-low volume — the rename-rot incident is the trigger, not a calendar date.

### Cross-batch passage reuse — `passages` table (option C)

Promote `set_id` (currently a string `"<uploadJobId>:<setLabel>"`) into a real table so the same passage can be reused across batches. Tradeoff documented in the 2026-05-12 "Question sets" decision-log entry: option B (current per-upload scope) is sufficient for now; user said re-upload is their preferred backfill anyway. Migration B → C is mechanical when wanted.

### Audit columns: `updated_at`, `updated_by`

Per-question audit trail. Currently `created_at` + `created_by` only. Useful for "who touched this question last and when" once teacher accounts exist.

### Optimistic locking on edit

Currently no concurrency check — two admins editing the same question race the write. Low risk today (one admin per org), but add `version int` or `updated_at` check on PUT before opening teacher writes.

---

## `/guide` expansion

**Nine guides shipped:** NDA Mathematics (Template A — principles-first), NDA English (Template B — playbooks-first), NDA PART B Physics (Template C — chapter-playbooks + skill-strand + formula compendium), NDA Chemistry (Template B variant — Recall/Rule/Calculate), NDA Biology (Template B variant — Recall/Apply/Verify), NDA Geography (Template B + non-flat %HARD variant), NDA History (Template B + tier-style strands variant — Cornerstone/Foundation Recall/Quick-Win), NDA Polity (Template B + tier-style strands variant 2 with INVERTED third-tier — Cornerstone/Foundation Recall/Specialist Wildcard), NDA Economics (single-page landing — deliberately thinner terminal node; bank too small for a multi-route guide). Template choice flow + per-template editorial shape: CLAUDE.md "Guide structure templates" section. Don't propose forcing one template onto a subject whose bank shape rejects it — see [[english-guide-structure-diverges]]. **NDA Current Affairs is explicitly deferred** (content half-life issue — see CLAUDE.md decisions log 2026-05-19).

### Guide-side Present mode (adapt `NotePresenter` for `/guide` playbook pages)

Today Present mode exists only on `/notes` subtopic pages (the slide deck derives from a `SubtopicNote` via `splitNoteIntoSlides`). Teachers projecting playbook content in class would benefit from the same overlay applied to playbook detail pages (trigger + story + sub-skills + traps + worked examples). Needs a playbook-shaped slide splitter (similar to `splitNoteIntoSlides` but consuming `PlaybookDetail`) + presenter wiring across all 7 playbook-bearing guide subtrees (English / Physics / Chemistry / Biology / Geography / History / Polity). ~2–3 hour build. Tier 4 scope per the 2026-05-18 Present-mode-discoverability ship which deliberately left this to a separate commit.

### MHT-CET strategy guides (Maths / Physics / Chemistry)

Reuse the shared infra (`_components/`, `resolveTaxonomy`, JSON-LD, OG image, sitemap pattern). Subject-level taxonomy cleanup must precede each guide — Physics + Chemistry still pending (see Taxonomy section below). MHT-CET Maths is already cleanly bucketed (248 q · 56 sub). Template choice per subject after a bank-shape analysis. **This is now the primary remaining `/guide` scope** — NDA guide coverage is effectively complete (9 of 10 NDA subjects guided; Current Affairs explicitly deferred).

### Future-exam guides

IPMAT, CUET, NEET, JEE Main — already shown in `/browse` Hero as "Coming soon." Each needs taxonomy seed + question bank + strategy guide.

---

## Taxonomy cleanup (data work)

Per-chapter subtopic consolidation from question-leakage names ("Integral of 1/(1−cosx)") to technique-level canonicals ("Half-Angle Substitution"). Workflow documented in the [[reclassification-sql-pattern]] and [[taxonomy-inline-iteration]] memories. Done counts + per-subject narratives: CLAUDE.md "Cleaned subjects · post-delta sizing" table and [[taxonomy-cleanup-progress]] memory.

Pending:
- MHT-CET Chemistry (33 chapters · ~241 subtopics)
- MHT-CET Physics (27 chapters · ~243 subtopics)
All NDA cleanup complete. Phase B/C/D template fully stable.

---

## Content quality audits (data work)

Per-chapter sweep for LaTeX formatting, broken math, hallucinated solutions, and **wrong correct-answer keys**. The *primary* value of this audit is the last item — LaTeX prettification is a cleanup side-effect. Audit workflow is now stable: paired skills `/latex-cleanup` (mechanical, ASCII-safe) and `/solution-cleanup` (judgment-heavy, key flips need user approval), with autonomous gdrive PDF fetch for stem/option verification and screenshot fallback for diagram-dependent rows. See [[gdrive-pdf-fetch]] and [[unicode-in-solution-rewrites]] for the supporting workflow memories.

**Done — NDA bank-wide closed at probe-flagged surface (2026-05-27):**

| Subject | q | Wrong-key flips | Preserved paper defects | Notes |
|---|---|---|---|---|
| NDA Maths (full per-chapter) | 2,160 | ~82 | 2 (Functions Q77, IT Q42) | All 31 chapters individually audited |
| NDA English | 900 | 11 | 0 | Sentence Rearrangement dominated |
| NDA Physics | 449 | 10 | 1 (Work Q123) | First diagram-fallback usage (Q70 circuit + Q132 B-field) |
| NDA Geography | 345 | 8 | 0 | 1 judgment-flag flip (Q142 forest order — option set imperfect) |
| NDA Chemistry | 262 | 5 | 0 | Q140 self-inflicted unicode regression caught + fixed |
| NDA History | 260 | 3 | 1 (Ancient Q85 Senguttuvan) | First non-Maths preserved-defect |
| NDA Current Affairs | 180 | 4 | 0 | Combined-pass with Polity + Economics |
| NDA Biology | 190 | 1 | 0 | Cleanest subject (0.5% rate) |
| NDA Polity | 90 | 0 | 1 (Q150 NCAP options all seem valid) | Combined-pass |
| NDA Economics | 24 | 2 | 0 | Combined-pass |
| **NDA total** | **4,860** | **~126** | **5** | All 10 subjects probe-closed; ~51% of bank |

Per-subject narratives + per-row decisions are in CLAUDE.md "Decisions log" 2026-05-27 entries. Per-chapter / per-flip register in [[content-audit-progress]].

### Pending — JEE Mains content-correctness audit (its own future pass)

**The original 13 subjects are now BANK-WIDE CLOSED** at the no-source-needed surface (9,546 q, ~100%) — MHT-CET Maths (1,587) + Physics (1,574) closed 2026-06-02, **MHT-CET Chemistry (now 1,525) closed 2026-06-03** across three passes + a source-PDF verification pass (31 wrong-key flips, 24 dupes deleted, 3 → PRIVATE). See CLAUDE.md "Decisions log" 2026-06.

**The remaining audit frontier is JEE Mains.** The ingested JEE q (2021 Papers 1-4, 240 q / 239 PUBLIC as of 2026-06-03, growing toward all 26 papers of 2021) are **NOT** part of the bank-wide audit above — they carry source answer keys verified only against the source images during ingestion, plus 54 AI-authored solutions. **Schedule a JEE content-correctness audit as its own pass once the 2021 set is fully ingested.** It's tractable: the DOCX source papers are local (`C:\tmp\PYQPs\JEE_Mains\2021\`), so `/solution-cleanup`-style re-derivation + source-image verification applies. Known seeds already surfaced during ingestion: P2 Q1 wrong-keyed by a duplicate-numbered soln block (fixed via override), P3 Q37 incomplete → PRIVATE, P4 Q44 multi-figure stem fixed via composite image. See [[jee-mains-ingestion]].

**Pre-flagged rows deferred from closed audits — revisit on the next content pass:**
- MHT-CET Chemistry: ~6 image-based IUPAC-naming rows + 5 user-deferred conflicting-key dup-pairs + 32 same-stem/diff-option groups — all need the source PDF/figure, not derivation (see CLAUDE.md 2026-06-03 source-PDF verification entry).
- `5044c336` (MHT-CET Sequences & Series · "sin(θ−α), sinθ, sin(θ+α) in H.P. → cos²θ"): **probable wrong-key** (a stealth case — bank solution likely agrees with a wrong key, so the matches-option probe never flagged it). Surfaced 2026-06-02 by cross-referencing its Trig-II sibling `b358ae2f` ("…→ cos2θ", answer `(1−4cos²α)/2`): `5044c336`'s `(1−2cos²α)/2` doesn't reconcile. Also arguably misfiled to Sequences (it's a trigonometry question). Derive the HP→cos²θ result independently, flip the key if wrong, and consider moving it to Trigonometry-II. Not touched during the 2026-06-02 Sequences bank-hygiene fix (out of hygiene scope).

**Prerequisite for MHT-CET audit:** the gdrive `PYQPs/MHT-CET/` folder is enumerated (2026-05-27) with year sub-folders 2021–2025, but it's lightly populated — most years have `MHT_CET_{year}_QP.docx` + `_AK.docx` (annual), and 2025 has only 1 of ~14 per-shift PDFs (`MHT_CET_2025_14th_May_Shift_2_QP.pdf`). Compared with NDA gdrive (22 PDFs covering full years 2015–2026), MHT-CET source coverage is sparser. The audit can proceed where DB rows have year/shift metadata that matches an available source file; rows from unavailable shifts (~90% of 2025) will need to defer or rely on internal-consistency derivation only.

### Probes (stable workflow)

The audit uses two skills with probes baked in. Don't re-implement.

- **`/latex-cleanup <chapter>`** — Phase 1 probes: `unicode_in_qtext/solution/options`, `unbalanced_qtext/solution/options`, `pipe_cond_*`, `english_math_words_*`, `matches_option_disagrees_with_key`. Phase 4 applies Bucket A (mechanical) automatically; Bucket B (wrong_key / REVIEW / hedge / plain-text-heavy) defers.
- **`/solution-cleanup <chapter>`** — Phase 1 probes (content-correctness only, formatting assumed clean): `matches_option_disagrees_with_key`, `review_markers`, `hedge_phrases`, `plain_text_heavy_sol`, `broken_matrix_env`. Phase 3 STOPS on every DISAGREE / PRINTED-PAPER-ERROR / STEM-BROKEN row for user approval before flipping `is_correct`.

The 6-row PDF-vs-bank extraction-error taxonomy ([[gdrive-pdf-fetch]]) covers the resolution shapes: option-text / stem-text / context-text / set-context-overspecification / dropped-sign / preserved-paper-defect.

### Patterns observed across the NDA bank-wide audit

- **Wrong-key rate correlates with derivation complexity.** Math-derivation subjects (Maths 3.8%, Physics 2.2%) significantly higher than pure-recall subjects (Biology 0.5%, Polity 0%, History 1.2%). LLM extraction handles named facts better than algebraic chains.
- **Combined-pass for small subjects** works. Polity + Current Affairs + Economics (294 q across 13 chapters) ran in one consolidated DO block on 2026-05-27 — saves the per-subject latex+solution cleanup round-trip. Recommended pattern when individual subjects are <100 q.
- **Diagram-dependent rows need screenshot fallback.** gdrive PDF OCR captures text but not spatial info (arrow directions, circuit topology). Two NDA Physics rows (Q70 circuit + Q132 B-field) required user-pasted screenshots after gdrive returned only text-around-the-figure. Rule embedded in `/solution-cleanup` Phase 3.
- **Self-inflicted unicode regression risk.** When rewriting solution prose, NEVER write unicode math chars (`× ÷ ≈ ✓ ✗ → ² ³` etc.) — they'll be caught by next `/latex-cleanup`. Lesson recorded in [[unicode-in-solution-rewrites]] after the Q140 Chemistry incident.
- **Cluster pattern by paper-batch.** Wrong-keys often cluster within a single paper sitting (Statistics 2017-Sep all 5 keyed wrong, Trig Id 2020-Apr 6 of 6). Likely an extraction-prompt batch effect — worth flagging at upload-audit time on new MHT-CET batches.
- **Stealth wrong-key gap.** When bank's solution prose is mathematically wrong but lands on the same wrong value as the stored key, NO probe flags it. Only close-reading every flagged solution catches these (e.g. Definite Integration Q96 on 2026-05-27). For MHT-CET audits, plan to close-read every solution that surfaces for ANY reason, not just trust the matches-option probe.

### Future hardening

`npm run content:lint` script that gates the pre-push hook for new uploads (mostly the formatting probes — wrong-key is not auto-detectable without human derivation). Still deferred — but the audit-skill probes are stable enough that lifting them into a script is mechanical. ~2 hours when there's appetite to wire it up.

### Notes-coverage probe — ✅ SHIPPED 2026-06-07 (`npm run notes:coverage`)

`scripts/notes-coverage.ts [subjectRoute] [chapterSlug]` (default `nda-maths statistics`). Per `/notes`-covered subtopic, diffs the math in that subtopic's PUBLIC question SOLUTIONS against the math in its notes bodies (incl. `formula.latex` + reference-table cells, which are raw LaTeX outside `\(...\)`), reporting two token kinds appearing in ≥2 solutions but 0 notes: **macros** (`\[a-z]+`, minus a common/relational-operator allowlist) and **structural fragments** (operands abstracted to `@`, so `(20^2-1)/12` ≡ `(n^2-1)/12`). The macro channel is the high-signal one; structural fragments are noisy (generic arithmetic) → human-review triage, **not a gate**. Validated on Statistics (would have flagged the `(n²−1)/12` gap pre-fill; resolved post-fill) and run on **Matrices & Determinants → no gaps** (all flags triaged to notation variants `\Delta`/`\det`, cross-subtopic trig, and the ln-of-GP determinant which IS covered in prose). The Matrices run **hardened the probe**: (1) strip LaTeX row-breaks `\\` before tokenizing — a matrix row entry after `\\` was matching as a spurious `\p`/`\l` macro; (2) collect notes math from raw string fields (recursive walk), NOT `JSON.stringify` — the latter doubles backslashes, which `stripBreaks` then ate, dropping macros from notes-vocab and false-flagging `\sin`/`\cos`. **Remaining:** run across the other 10 noted chapters + triage. Inherently misses "present-but-under-emphasised" (finds ABSENCE) and semantic equivalents in different notation; the structural-fragment channel is noisy (human-read), the macro channel is the high-signal one.

---

## Admin tooling

### `/dashboard/quizzes` — server-side filtering + pagination (past ~1000 quizzes)

`listAssembledQuizzes` now returns up to 1000 quizzes (raised from a silent 60-cap that hid older quizzes once the bank crossed 60 — fixed 2026-06-11) and `QuizBrowser` filters them client-side. This is fine at the current ~100 quizzes but ships every quiz's full `questions` snapshot to the client. Past ~1000 quizzes (the PostgREST page size) the list would silently truncate again. The scalable fix: push the exam/subject/chapter/theme/status filters into the query (server-side), drop the per-quiz `questions` payload from the list (lazy-load on row expand via a server action), and paginate. The "Quizzes built" stat already uses a true `count:"exact"` (`countAssembledQuizzes`), so it stays honest even if the list is capped.

### Per-question editing of upload-level metadata

`/questions/[id]/edit` doesn't currently expose `pyq_year`, `pyq_month`, `pyq_note`, or `question_number`. Those are set at upload time or via `/uploads/[id]` bulk-PATCH. Per-question override is sometimes needed (correcting a single row after upload).

### Set merge / split / move UI

Sets are immutable post-upload by design — to fix a structural mistake (wrong set membership, wrong context, etc.) the admin re-uploads. A first-class UI for set operations would avoid the re-upload cycle.

### Excel-embedded image extraction

Today teachers upload text-only Excels and add images via the per-question edit page. An xlsx-parser → exceljs swap would extract images directly from Excel cells. Smaller blast radius than doing it now, but real friction for teachers with diagram-heavy papers.

### Teacher invitation flow

First admin is seeded via SQL; teacher addition is manual. A proper "invite teacher" flow is gated on SMTP being available (see Auth section).

### Notes-lint guide-side rename validation — ✅ SHIPPED 2026-05-30

Done via an equivalent implementation to the originally-planned notes-lint extension. Every guide's drill targets now resolve against live taxonomy in a `describe.skipIf(!HAS_ENV)` test: `tests/guide-nda-<subject>-playbooks.test.ts` (English/Physics/Chemistry/Biology/Geography/History/Polity) validate each PLAYBOOK's `chapter` + `subtopics[]`; `tests/guide-nda-current-affairs-themes.test.ts` validates theme `chapter` + `drillSubtopics`; `tests/guide-nda-maths-taxonomy.test.ts` (added this session — Template A has no PLAYBOOKS array) validates principles/compounds/strategy drill targets. The `/notes`-side chapter + subtopic names are validated by `scripts/notes-lint.ts` check 1. The `/browse` backlink chips (`getQuestionResources`) build their guide maps from the same PLAYBOOKS arrays + the `NOTES_CHAPTERS` registry, so they're covered transitively; Economics/CA chips + landing CTAs key on `examId`/`subjectId`, not chapter names. `.github/workflows/ci.yml` runs all of these on every push/PR (requires the three Supabase repo secrets). The guard caught two real broken-CTA regressions in its first session (Sound + Probability — see Decisions log). Recurring-lesson memory: [[shipped-chapter-rename-downstream-sync]].

### Derive `/nda` NOTES_PREVIEWS array from `NOTES_CHAPTERS` registry

Mop-up of the 2026-05-18 registry refactor. The `/nda` exam home's `NOTES_PREVIEWS` array (chapter cards with hand-written blurbs + concept counts) is still hardcoded — derivable from `NOTES_CHAPTERS` if we add `blurb` + `conceptCount` accessors to the registry entries, or compute `conceptCount` live at render time. ~15 min cleanup; trivial but consolidates the new-chapter ritual further.

---

## Tech debt / refactoring

Deferred remainder of the 2026-06-01 (later) tech-debt pass. That session shipped the guide component de-dup (12 parallel files → 2 generics), the `questionResources.ts` resolver registry, and cross-link + billing test coverage (see CLAUDE.md Decisions log). These three are the lower-urgency items it explicitly left out.

### Split `EditQuestionForm` (1,154-line god-component)

`src/app/questions/[id]/edit/EditQuestionForm.tsx` fuses form state, the exam→subject→chapter→subtopic cascade, concept tagging, image upload/preview/validation, set-membership, and role-gated visibility behind ~11 drilled props. Works + server-guarded, but untestable as a unit. Natural seams: `TaxonomyPicker`, `ImageSlot`, `ConceptTagger`, `VisibilityControl`. Tier-2 — do it when the edit page is next touched.

### Extract `docxBuilder` paragraph-construction helpers

`src/lib/export/docxBuilder.ts` (~468 lines) is dense imperative Word-layout code (numbering, set-banner + passage truncation, OMML placeholder-swap, image fitting). Cohesive but hard to follow — extract `buildSetBanner` / `buildOptions` / `applyOmmlPatch` opportunistically when next touched. Lower priority than the form split.

### Collapse the `/`→`/dashboard`→`/browse` double-redirect

`src/app/page.tsx` sends a signed-in org-less student to `/dashboard`, which then bounces them to `/browse` — a wasted hop, and the inline comment ("orphan-user state lives on /dashboard") is stale after the 2026-06-01 dashboard change. Route org-less users straight to `/browse` from `/`. Tier-3; ~5-minute fix.

---

## UI / IA polish

The 2026-05-18 Tier 1 IA + cross-linking ship (primary nav, exam pill, `/nda` exam home, backlink chips, click-to-reveal, filter recipes, in-app reports) left these student / teacher journey items as follow-ups.

### Brand link → exam home for non-admin viewers

`AppHeader` brand link currently goes to `/browse` for non-admins (and `/dashboard` for admins). Now that `/nda` exists, non-admin brand link should go to the cookie-active exam's home (`/nda` today; future `/mht-cet` etc.) so "go home" means "go to your exam's everything-page". Behaviour change worth its own commit; cost is ~10 minutes (one helper edit). Deferred from Tier 1 Phase 1.

### Per-exam `/browse` route

Today `/browse` is exam-agnostic and the user applies the exam filter via cookie / URL param. A `/nda/browse` route (and future `/mht-cet/browse`) that defaults to the exam's `examId` would drop the "pick exam" step for the 95% case and let direct deep-links carry exam context naturally. Plumbing: route alias + middleware default-filter injection. ~1 hour. Deferred from Tier 2 (the empty-state recipes ship was the smaller half of Tier 2 student journey).

### Cookie-driven resume

Last-read playbook / last-opened concept note / current cart as a tiny `qb_resume` cookie. Lets a returning student pick up where they left off without an account. No DB cost; ~1 hour. Deferred from Tier 2 student journey.

### Saved filter sets (DB-backed teacher infra) — Tier 3 scope

New `saved_filters(user_id, org_id, name, filters_jsonb, created_at)` table + a small UI under `/dashboard` (probably split into "Admin" + "Teach" tabs). Lets a teacher save the same recipe ("MHT-CET Physics HARD 2024") and reuse it weekly without rebuilding. Half-day; first new schema since the Tier 1 UI overhaul began. Needs a small product decision on UI placement (dashboard tab vs `/browse` toolbar vs cart-style panel) before scoping. Subsumes the existing "Optional user accounts — saved filters / history" entry below.

---

## Auth + accounts

### Custom SMTP (Resend) — now a real need

Supabase's default-SMTP cap (~2 emails/hour project-wide) is dev-only. **Self-serve student accounts shipped 2026-06-01 with email confirmation OFF**, so signup itself sends no mail — but **password resets do** (and they run through the same throttled service), so any email/password student who forgets their password is currently stuck. Wire a custom SMTP provider (Resend or any — see CLAUDE.md "Razorpay cost" discussion; Resend isn't mandatory) before the first real paying cohort. Magic-link can be re-enabled at the same time but isn't required (password + Google OAuth cover sign-in).

### Optional user accounts — recently-built papers, drill streaks

**Self-serve accounts now exist** (`/signup`, 2026-06-01) and the per-user `entitlements` table is live — so this is unblocked. Remaining: recently-built papers history, per-user drill streaks / progress, account-bound preferences (the "saved filters" half is a separate scope under **UI / IA polish**; the cross-device cart under **Cart / persistence** is also now unblocked). These attach to `auth.users(id)` the same way entitlements do.

### Password reset flow

No UI yet — admins reset directly via SQL (see CLAUDE.md Operations). **Now a real gap, not just a teacher nicety:** self-serve email/password students shipped 2026-06-01, and they have no "forgot password" path. Needs custom SMTP (above) + a reset-request page. Google-OAuth students are unaffected. Prioritise alongside the first batch of real paying students.

---

## Premium / paywall (Razorpay)

The 4-phase paywall shipped 2026-06-01 (signup → entitlements → comp-access UI → notes preview-gate → Razorpay checkout; see CLAUDE.md Decisions log + [[project-paywall-build]]). The code is complete and gate-green; these are the **open activation + follow-up** items.

### Activate Razorpay (the only thing blocking real transactions)

Checkout returns 503 until 4 env vars are set in Vercel + `.env.local`: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` (= key id), `RAZORPAY_WEBHOOK_SECRET`. Steps: create a Razorpay account (test mode needs **no KYC**) → generate test keys → create an `order.paid` webhook → `https://question-bank-sage.vercel.app/api/billing/webhook` → run a test-card payment → confirm an `entitlements` row + a paid chapter unlocks. **Open question (2026-06-01):** the user's existing Razorpay login looked like a partner-linked/Route account ("Registered By: CREATOR ECONOMY TECH", limited nav, no API-keys page) — may not expose standalone keys; a fresh direct razorpay.com merchant account may be required. Going live later = KYC + swap the 4 vars to `rzp_live_…` + repoint the webhook (no code change).

### Designate the first paid notes chapter

All 5 current `/notes` chapters are `free` — the preview-gate machinery is dormant. Making a future chapter premium = set `tier:"paid"` (+ optional `paidScope`/`previewConceptCount`) in the `NOTES_CHAPTERS` registry AND make its `[subtopicSlug]/page.tsx` wrapper `export const dynamic = "force-dynamic"` + drop `revalidate`/`generateStaticParams` (notes-lint enforces the contract). Product decision: which chapter, and confirm the 2-concept preview line reads well for it.

### Pro-plan hardening (when on Supabase Pro)

`auth_leaked_password_protection` (HaveIBeenPwned check on new passwords) is **Pro-only** and currently off — worth enabling now that strangers set passwords. On Free, the lever for abuse is Attack Protection → CAPTCHA (hCaptcha/Turnstile, free-tier) — only wire if bot signups appear.

### Per-chapter / multi-tier pricing (future)

The entitlement model already supports non-`'all'` scopes (`scope` is free-text), so selling individual chapters or tiers needs **no migration** — add `PLANS` entries + per-chapter `paidScope` + a richer `/pricing`. Single-tier (one ₹999/365 pass) is the current shipped shape; revisit only if the catalog of paid chapters grows enough to warrant à-la-carte.

### Receipts / invoices / GST (ops, not code)

Razorpay dashboard handles payment receipts; GST on the price itself (if LWS is GST-registered) is a CA/tax question, not a code change. Flag for the finance side before going live.

---

## Export quality

### Printable per-chapter `/notes` PDF — "Download PDF" button

Generate a printable PDF study booklet per `/notes` chapter, straight from the existing notes data (no new authoring — it's pure layout over `ChapterNote` → `SubtopicNote` → `ConceptUnit`). **Structure approved 2026-06-04** (full booklet ending in a revision sheet):

1. **Cover** — title · `subjectDisplay` · exam · PYQ Vault mark · chapter `intro` · stat band · short URL.
2. **Chapter map** — `subtopicOrder` contents + the auto-derived `ConceptWeightTable` (high-yield triage).
3. **Teaching body** — per subtopic → per concept: `name` → `intuition` → `definition` → boxed `formula`/`ReferenceTable` → worked example (`authoredExample`) → traps → `[Q# · month · year]` provenance. Static SVGs inline; rotatable ones print their default frame.
4. **Practice workbook** — every `selfCheckExample` + `practiceSet` rep as numbered problems, with…
5. **Answer key** — solutions at the back, back-referenced (so it's self-test-usable on paper).
6. **Revision sheet** — the auto-derived `ChapterRevisionSheet`, dense two-column finale.

**Delivery (decided):** a server-side **"Download PDF" button** on the chapter landing → headless-Chrome render of a dedicated print route → streamed `application/pdf`.

**Sample approved:** `C:\tmp\indefinite-integration-sample.pdf` (51 pages, MHT-CET Indefinite Integration), generated by a throwaway DB-light proof-of-concept (not kept — regenerable from this recipe: a `tsx` script reads the chapter's real `_data`, pre-renders each `\(...\)` zone with the bundled `katex` package's `renderToString`, emits print-styled HTML linking `node_modules/katex/dist/katex.min.css`, then `msedge --headless=new --no-pdf-header-footer --print-to-pdf=...`). Confirmed KaTeX math, formula boxes, worked examples, traps, and the two-column revision sheet all render cleanly.

**Architecture (single source of truth):**
- **Phase 1** — a print route `/notes/<subject>/<chapter>/print` (server component) renders the full booklet flat (non-interactive) via the existing `KatexRenderer`/`RichText`/diagram renderers + a print stylesheet. Independently viewable, so browser **Save-as-PDF is a zero-infra fallback**. TDD the pure helpers: `collectPrintBooklet(registration)` (ordered flattened sections), the **answer-key separation** (relocate every practice/self-check answer to the back, numbered + back-referenced), `pdfFilename(registration)`.
- **Phase 2** — a PDF API route (`/api/notes/[subject]/[chapter]/pdf`) launches headless Chrome, navigates the print route, waits for `document.fonts.ready` + KaTeX, `page.pdf()`, returns the buffer; plus the button, running headers / page numbers (Puppeteer `headerTemplate`/`footerTemplate`), the **real SVG diagrams** (replace the Phase-1 placeholders), and the **DB-backed featured PYQs + drill refs** (omitted in the sample).

**New dependency:** `puppeteer-core` + `@sparticuz/chromium` (no in-stack substitute — react-pdf can't render KaTeX; the docx pipeline is for question papers, not prose). Risks on the record: **Vercel Hobby 10s function timeout** (a 30–50 page render + cold start is the main risk; Pro lifts it to 60s — relevant to the pre-Razorpay Pro move), ~50 MB chromium bundle (fits Hobby, adds cold-start latency on a click-to-download path), and the Save-as-PDF fallback if it ever bites.

**Defaults taken:** A4, one PDF per chapter, button beside the existing Present-mode control. **Open product questions:** (a) **free vs entitlement-gated** download (decide at the button — ties into the paywall machinery); (b) **page length** — 51 pp is what "everything for one chapter" costs (biggest chapter); levers if too heavy are dropping the practice+answer-key section or making it opt-in.

### Auto-split exports (> 200 questions)

Current cap: 200 questions per export, enforced because of Vercel function timeout. Beyond that, the user gets a clear error ("narrow filters"). Auto-split (multiple Word files for one big request) was deliberately not built; revisit if a real teacher hits the cap.

### Custom-designed OG PNG

The dynamic `ImageResponse`-based OG image (both `/opengraph-image` and `/guide/opengraph-image`) renders fine but is less polished than a designer-built PNG. Cosmetic-only.

---

## Cart / persistence

### Cross-device cart sync (DB-backed paper drafts)

The paper cart is localStorage-only — per-browser, doesn't survive a phone-to-laptop switch. DB-backed drafts would let a teacher build a paper on phone, finish on desktop. Needs auth (sign-in to associate drafts to a user).

---

## Cross-app integration

### MHT_CET_AI publisher button (explicitly deferred)

`POST /api/sync/mock` is the receiver side, already live. The publisher button inside MHT_CET_AI is a separate cross-project change. User explicitly chose "complete this project, defer cross-integration."

---

## Observability + ops

### Frontend error monitoring (Sentry or equivalent)

Currently relying on Vercel function logs (server-side `console.error` paths) + Vercel Analytics (pageview counts, cookieless). Frontend exceptions don't surface anywhere. Consider Sentry only if noise picks up — premature otherwise.

### Health-check endpoint

Premature without an external uptime watch. Wire if and when an uptime monitor (Better Uptime, etc.) is configured.

### About / FAQ pages

Content rather than infrastructure. Could live under `/about` and `/faq`. Not load-bearing for the paper-builder use case.

---

**Decisions-log style note**: when an item ships, move its entry from this file into the `CLAUDE.md` Decisions log (with a `2026-MM-DD —` prefix and a "Why" sentence). Don't let ROADMAP.md and the decisions log diverge.
