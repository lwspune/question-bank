# Product roadmap

Pending features, data-model changes, and content work for Question Bank. Mirrors the "deferred" annotations scattered through the `CLAUDE.md` decisions log and consolidates them in one place.

**Live as of 2026-05-15:** 1,378 questions (MHT-CET 748 + NDA 630, all PUBLIC) · public `/browse` with filter/cart/Word export · admin `/upload` + `/uploads` index + per-question edit · `/guide/nda-maths` with 26 indexable pages (landing + 5 sections + 20 principle deep dives) · cross-app sync receiver. 20 migrations applied. 442 tests across 63 files.

---

## Data model

### Principle tags on questions (proposed, not committed)

Add `principle_tags text[]` to `questions`. Multi-valued, since one question can invoke multiple principles simultaneously — `x² + x + 1 = 0` is both Vieta and Cube-roots-of-unity; "max sin A · sin B given A + B = π/2" is AM-GM AND Compound-angle.

**Why this would be cleaner:** Today's principle drill resolves via two mechanisms — multi-subtopic drill lists + curated `extraQuestionIds` arrays, both stored as TS data in `src/app/guide/nda-maths/_data/principles.ts`. With a DB column, drill resolution collapses to one SQL filter (`WHERE 'am-gm' = ANY(principle_tags)`), the editorial TS file shrinks to just *content* (story, examples, variants), and new uploads can be tagged once instead of triggering a re-survey of every principle.

It also unlocks UX that's currently impossible:
- Filter `/browse` by principle directly (orthogonal to chapter/subtopic).
- Show "tagged: AM-GM · Compound angle" chips on each `QuestionCard`.
- Find questions invoking *multiple specific* principles ("Vieta + Compound angle").
- Per-question audit on the edit page.

**Why it's not urgent:** The current pattern works for the actual product. The primary use case is "filter → cart → export Word file" — principle tags are a *strategy-guide* concept, not a paper-builder concept. The 53 curated extras shipped 2026-05-15 cover the user-facing principle UI completely.

**Hidden cost:** ~2,800 tag decisions (1,378 questions × ~2 principles each). Bootstrapping the column from current curated data covers ~600 questions of the top-20; the remaining ~750 need LLM-assisted or manual tagging with audit. That is a real ongoing tagging discipline once committed.

**Decision driver:** is guide #2 coming?
- **If yes** (MHT-CET strategy guide, IPMAT, etc.): ship this *before* writing the next guide's data files. The current hand-curated extras pattern doesn't scale to 4–5 guides × ~70 principles each.
- **If no** (staying primarily a paper-builder, `/guide/nda-maths` is a one-off): the current pattern is good enough.

### Cross-batch passage reuse — `passages` table (option C)

Promote `set_id` (currently a string `"<uploadJobId>:<setLabel>"`) into a real table so the same passage can be reused across batches. Tradeoff documented in the 2026-05-12 "Question sets" decision-log entry: option B (current per-upload scope) is sufficient for now; user said re-upload is their preferred backfill anyway. Migration B → C is mechanical when wanted.

### Audit columns: `updated_at`, `updated_by`

Per-question audit trail. Currently `created_at` + `created_by` only. Useful for "who touched this question last and when" once teacher accounts exist.

### Optimistic locking on edit

Currently no concurrency check — two admins editing the same question race the write. Low risk today (one admin per org), but add `version int` or `updated_at` check on PUT before opening teacher writes.

---

## `/guide` expansion

### MHT-CET strategy guide

Replicate the NDA-Maths 7-phase template against MHT-CET's 748-question Physics / Chemistry / Maths bank. Most infrastructure (`_components/`, `_data/` shape, `resolveTaxonomy`, JSON-LD, OG image, sitemap pattern) is reusable; content + bank analysis is the new work. The MHT-CET principles set is different from NDA's, so this drives the "do principle tags need a DB column" question.

### NDA other-subject guides

`/guide/nda-english`, `/guide/nda-gat-history`, etc. — for the 9 non-Maths NDA subjects. Each needs its own taxonomy of "principles" (which are more concept-based than mathematical for arts/humanities subjects).

### Future-exam guides

IPMAT, CUET, NEET, JEE Main — already shown in `/browse` Hero as "Coming soon." Each needs taxonomy seed + question bank + strategy guide.

---

## Taxonomy cleanup (data work)

Per-chapter subtopic consolidation from question-leakage names ("Integral of 1/(1−cosx)") to technique-level canonicals ("Half-Angle Substitution"). Workflow documented in the `[[reclassification-sql-pattern]]` and `[[taxonomy-inline-iteration]]` memories. Done so far: NDA Mathematics (480 q · 121 subtopics) + MHT-CET Mathematics (248 q · 56 subtopics).

Pending:
- MHT-CET Chemistry (33 chapters · ~241 subtopics)
- MHT-CET Physics (27 chapters · ~243 subtopics)
- NDA GAT 2025 Paper-1 PART B (100 q across History/Geography/Polity/Economics/Physics/Chemistry/Biology/Current Affairs — 1:1 question-to-subtopic ratio anti-pattern needs cleanup)
- NDA other 9 subjects across remaining papers

---

## Admin tooling

### Per-question editing of upload-level metadata

`/questions/[id]/edit` doesn't currently expose `pyq_year`, `pyq_month`, `pyq_note`, or `question_number`. Those are set at upload time or via `/uploads/[id]` bulk-PATCH. Per-question override is sometimes needed (correcting a single row after upload).

### Set merge / split / move UI

Sets are immutable post-upload by design — to fix a structural mistake (wrong set membership, wrong context, etc.) the admin re-uploads. A first-class UI for set operations would avoid the re-upload cycle.

### Excel-embedded image extraction

Today teachers upload text-only Excels and add images via the per-question edit page. An xlsx-parser → exceljs swap would extract images directly from Excel cells. Smaller blast radius than doing it now, but real friction for teachers with diagram-heavy papers.

### Teacher invitation flow

First admin is seeded via SQL; teacher addition is manual. A proper "invite teacher" flow is gated on SMTP being available (see Auth section).

---

## Auth + accounts

### Custom SMTP (Resend) + magic-link sign-in (explicitly deferred)

Supabase's default-SMTP cap of 2 emails/hour project-wide blocked the magic-link flow during development. User has marked Phases F (SMTP) and G (user accounts) as not currently necessary. When teachers come online, wire Resend and re-enable magic-link alongside password sign-in.

### Optional user accounts — saved filters / history (explicitly deferred)

Phase C of the original M-series plan. Saved filter presets, recently-built papers, drill streaks. Gated on auth being teacher-friendly first.

### Password reset flow

No UI yet — admins reset directly via SQL (see CLAUDE.md Operations). Defer until SMTP is wired.

---

## Export quality

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
