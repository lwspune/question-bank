# Product roadmap

Pending features, data-model changes, and content work for Question Bank. Mirrors the "deferred" annotations scattered through the `CLAUDE.md` decisions log and consolidates them in one place.

**Live state** — for current bank size, per-subject counts, shipped features, test counts, and migration count, see the **"Live bank size"** line at the top of `CLAUDE.md` and the **Decisions log** section below it. Don't duplicate that here; it drifts on every upload.

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

**Three guides shipped:** NDA Mathematics (Template A — principles-first), NDA English (Template B — playbooks-first), NDA PART B Physics (Template C — chapter-playbooks + skill-strand + formula compendium). Template choice flow + per-template editorial shape: CLAUDE.md "Guide structure templates" section. Don't propose forcing one template onto a subject whose bank shape rejects it — see [[english-guide-structure-diverges]].

### MHT-CET strategy guides (Maths / Physics / Chemistry)

Reuse the shared infra (`_components/`, `resolveTaxonomy`, JSON-LD, OG image, sitemap pattern). Subject-level taxonomy cleanup must precede each guide — Physics + Chemistry still pending (see Taxonomy section below). MHT-CET Maths is already cleanly bucketed (248 q · 56 sub). Template choice per subject after a bank-shape analysis.

### NDA other-subject guides (7 remaining)

The 7 NDA non-Maths/English/Physics subjects: Chemistry (262 q), Biology (190), Geography (345), History (260), Polity (90), Economics (24), Current Affairs (180). Each needs its own bank-shape analysis to pick the right template — content-heavy subjects (History, Geography) likely lean Template C with subject-specific seam (Era / Region / Concept buckets); thin subjects (Economics, Polity) may not justify a full guide. NDA Chemistry is the natural next candidate (largest of the seven).

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
