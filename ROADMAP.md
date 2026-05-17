# Product roadmap

Pending features, data-model changes, and content work for Question Bank. Mirrors the "deferred" annotations scattered through the `CLAUDE.md` decisions log and consolidates them in one place.

**Live as of 2026-05-17:** **4,708 questions all PUBLIC** (MHT-CET 748 + NDA 3,960: Maths 2,160, English 600, Physics 299, Geography 229, Chemistry 177, History 169, Current Affairs 127, Biology 124, Polity 61, Economics 14) · public `/browse` with filter/cart/Word export + `?principle=<slug>` filter · admin `/upload` + `/uploads` index + per-question edit + concept/principle tagging UI · `/guide/nda-maths` with **17 indexable pages** (landing + 5 sections + 11 TOP_11 principle deep dives, post-Phase-3 prune) · `/notes/nda-maths/statistics` with 4 subtopic notes · cross-app sync receiver. **23 migrations** applied. **~510 tests across 71 files**.

---

## Data model

### Cross-batch passage reuse — `passages` table (option C)

Promote `set_id` (currently a string `"<uploadJobId>:<setLabel>"`) into a real table so the same passage can be reused across batches. Tradeoff documented in the 2026-05-12 "Question sets" decision-log entry: option B (current per-upload scope) is sufficient for now; user said re-upload is their preferred backfill anyway. Migration B → C is mechanical when wanted.

### Audit columns: `updated_at`, `updated_by`

Per-question audit trail. Currently `created_at` + `created_by` only. Useful for "who touched this question last and when" once teacher accounts exist.

### Optimistic locking on edit

Currently no concurrency check — two admins editing the same question race the write. Low risk today (one admin per org), but add `version int` or `updated_at` check on PUT before opening teacher writes.

---

## `/guide` expansion

### MHT-CET strategy guide

Replicate the NDA-Maths 7-phase template against MHT-CET's 748-question Physics / Chemistry / Maths bank. Most infrastructure (`_components/`, `_data/` shape, `resolveTaxonomy`, JSON-LD, OG image, sitemap pattern) is reusable; content + bank analysis is the new work. Principle tagging now goes through `question_principle_tags` (migration 0023) — survey methodology in `[[principle-tag-survey-methodology]]`. Subject-level taxonomy cleanup must precede the guide (Chemistry + Physics still pending — see Taxonomy section below).

### NDA other-subject guides

`/guide/nda-english`, `/guide/nda-gat-history`, etc. — for the 9 non-Maths NDA subjects. Each needs its own taxonomy of "principles" (which are more concept-based than mathematical for arts/humanities subjects).

### Future-exam guides

IPMAT, CUET, NEET, JEE Main — already shown in `/browse` Hero as "Coming soon." Each needs taxonomy seed + question bank + strategy guide.

---

## Taxonomy cleanup (data work)

Per-chapter subtopic consolidation from question-leakage names ("Integral of 1/(1−cosx)") to technique-level canonicals ("Half-Angle Substitution"). Workflow documented in the `[[reclassification-sql-pattern]]` and `[[taxonomy-inline-iteration]]` memories. **Done so far (11 subjects · 132 ch · 4,058 q · 430 subtopics):** all 10 NDA subjects + MHT-CET Mathematics. NDA Maths re-Phase-D'd 2026-05-17 after 2017–2020 PYQ uploads added ~840 q (avg now 18.2 q/sub, highest density of any cleaned subject).

Pending:
- MHT-CET Chemistry (33 chapters · ~241 subtopics)
- MHT-CET Physics (27 chapters · ~243 subtopics)
All NDA cleanup complete. Phase B/C/D template fully stable.

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
