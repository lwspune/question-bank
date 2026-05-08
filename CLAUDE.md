# Question Bank — project notes

MCQ question bank for teachers. Teachers upload Excel files of questions, filter by exam/subject/chapter/subtopic, and download a Question Paper + Answer Key zip for offline distribution.

## Stack

- **Next.js 14** App Router · TypeScript · Tailwind 3 · shadcn-style UI primitives
- **Supabase** Auth + Postgres + RLS, accessed via `@supabase/supabase-js` (no Prisma, no ORM)
- **Vitest 2** for tests · `tsx` for scripts
- **Word export:** `temml` (LaTeX → MathML) → `mathml2omml` → `docx` + `jszip`
- **Browser math preview:** `katex` + `react-katex`
- **Deploy:** Vercel, git-integrated

## Multi-tenancy model

Per-school orgs, RLS-enforced. Three tiers of access:
- **Service role** (seed scripts, server-only admin actions) bypasses RLS by design — never expose to client code.
- **ADMIN** can write questions, options, upload_jobs, and auto-create chapters/subtopics, scoped to their own org.
- **TEACHER** can read everything in their org but cannot write.

RLS helpers live in the **`private` schema** (not exposed by PostgREST): `private.current_user_org_id()`, `private.current_user_is_admin()`. New org-scoped policies should reference these.

## File layout

```
src/
├── app/
│   ├── login/page.tsx                     magic-link sign-in (client)
│   ├── dashboard/                         landing page; admin sees Upload button
│   ├── upload/                            admin-only: file picker → preview → commit
│   ├── browse/                            org-wide: cascading filters, KaTeX preview, ZIP export, admin image-edit dialog
│   ├── api/auth/callback/                 Supabase OAuth code exchange
│   ├── api/upload/{preview,commit}/       two-stage admin upload
│   ├── api/questions/[id]/images/         PUT (multipart): per-slot image upload / remove (admin only)
│   └── api/export/                        POST → ZIP of Question Paper + Answer Key (server-side fetches image bytes via service-role for embed)
├── lib/
│   ├── supabase/{client,server,middleware,admin}.ts    four supabase-js variants
│   ├── auth.ts                            getSessionUser, getSessionMember, requireAdmin, HttpError
│   ├── seed.ts                            taxonomy upsert (used by scripts/seed.ts)
│   ├── questions/{filters,query}.ts       browse filters ↔ URL + Supabase query builder
│   ├── upload/{parser,validate,hash,taxonomy,commit}.ts   upload pipeline (pure → DB)
│   ├── storage/
│   │   ├── images.ts                      uploadImage / deleteImage / downloadImage / validateImageUpload (server, uses node:crypto)
│   │   └── imageUrl.ts                    pure-function publicImageUrl — safe to import from client components
│   └── export/{ommlBuilder,docxBuilder}.ts                LaTeX → OMML, .docx assembly
├── components/
│   ├── math/{parseLatex,KatexRenderer}.tsx   shared LaTeX segmenter + KaTeX wrapper
│   └── ui/{button,input,label,card,badge}.tsx   shadcn primitives
└── middleware.ts                          Supabase session refresh + /dashboard guard

supabase/
├── migrations/0001..0008_*.sql            apply in order via Supabase MCP
└── seed/
    ├── taxonomy.json                      committed snapshot from MHT_CET_2025_PCM.xlsx
    └── seed-first-org.sql                 manual onboarding for first admin

scripts/
├── extract-taxonomy.ts                    one-shot: regenerate taxonomy.json from a reference Excel
└── seed.ts                                idempotent taxonomy seed (service-role)

tests/                                     14 files, 79 tests
├── fixtures/upload.ts                     in-memory .xlsx fixture builder
├── *.test.ts                              pure unit + DB integration (DB tests skip if env missing)
└── setup.ts                               loads .env.local for tests
```

## Commands

```sh
npm run dev                # next dev (local)
npm run build              # production build
npm run lint
npm test                   # vitest run
npm run test:watch
npm run db:seed            # idempotent taxonomy seed (service-role)
npm run extract:taxonomy   # regenerate supabase/seed/taxonomy.json from a reference Excel
npm run db:types           # supabase gen types (requires SUPABASE_PROJECT_REF env)
```

## Conventions specific to this project

- **No Prisma.** Supabase RLS is the security boundary — every read/write goes through `@supabase/supabase-js` so the user's JWT carries through. Reach for `createSupabaseAdminClient()` (service-role) only in server-only contexts (seeds, cross-org admin) — it bypasses RLS by design.
- **Migrations are append-only.** New SQL goes in a new `000N_<name>.sql`. Apply via Supabase MCP `apply_migration`. Never edit a previously-applied file.
- **`.mcp.json` is gitignored.** Holds Supabase + Vercel personal access tokens. Don't commit.
- **Idempotent seeds + uploads.** `scripts/seed.ts` and the upload commit both check existence before insert; re-running is safe.
- **Content hashing for upload dedup.** `content_hash = sha256(normalised question text + sorted options + answer)` plus a unique index on `(org_id, content_hash)`. Re-uploading the same file inserts 0 rows.
- **OMML insertion via post-processing.** The `docx` library's `ImportedXmlComponent` wraps imported XML in an `<undefined>` element that Word rejects. We render placeholder runs in the docx, then patch `word/document.xml` after `Packer.toBuffer`. See `src/lib/export/docxBuilder.ts`.
- **Restart `npm run dev` after adding new routes.** Tailwind JIT can miss files created mid-session. Stop dev, `rm -rf .next`, restart before UI smoke tests.

## Decisions log

Why behind architectural pivots — saves future-you from "why didn't we just…?".

- **2026-05-08 — No Prisma.** Supabase RLS is the security boundary; Prisma uses a single privileged DB user and bypasses RLS by default. Forcing per-request `SET LOCAL` JWT injection fights the tide. `@supabase/supabase-js` carries the user's JWT through naturally.
- **2026-05-08 — RLS helpers in `private` schema.** PostgREST exposes any `public.*` function as a `/rest/v1/rpc/<name>` endpoint. Supabase advisor flagged `current_user_org_id()` / `current_user_is_admin()` as callable by `anon` and `authenticated`. Functionally safe (returns `null`/`false` for anon) but defence-in-depth — moved to a schema PostgREST doesn't expose.
- **2026-05-08 — OMML via marker-and-post-process.** The `docx` library's `ImportedXmlComponent.fromXmlString` wraps imported XML in an `<undefined>` element that Word refuses to open. We render placeholder text where math should go, then patch `word/document.xml` after `Packer.toBuffer`. Sidesteps the library quirk; works for arbitrary OMML.
- **2026-05-08 — Word export = ZIP of two files.** First version was a single .docx with a 3-way layout toggle. User asked to split: a Question Paper distributable without leaking answers, and a separate Answer Key. One ZIP keeps the bundle obvious.
- **2026-05-08 — Hard 200/export cap, no auto-split.** Vercel function timeout is the binding constraint. A clear error ("narrow filters") ships faster than a zip-of-zips. Revisit if a teacher genuinely needs 500 questions in one paper.
- **2026-05-08 — Chapters/subtopics auto-create, subjects don't.** Subjects are top-level taxonomy curated centrally; auto-creating "Phyiscs" from a typo would corrupt the canonical list. Chapters/subtopics are per-upload working data — small typo cost, and a merge tool can clean up later.
- **2026-05-08 — Tightened RLS writes to ADMIN at M2.** Original `0002_rls.sql` let any authenticated org member insert questions. M2 (`0004_upload_staging.sql`) added `private.current_user_is_admin()` to write policies on questions, options, and upload_jobs. Layered with `requireAdmin()` in route handlers — defence in depth.
- **2026-05-08 — `tsvector` + GIN index at M3 even with 150 rows.** Cheap to add now, expensive to retrofit. Schema designed for 10k+/org.
- **2026-05-08 — Export = current-filter set, no per-question checkboxes.** Avoids managing multi-page selection state in URL. Teachers narrow via filters, then export the lot. Per-question selection is a v2 if asked for.
- **2026-05-08 — Public storage bucket for question images, not private+signed.** Faster (no per-render signing round-trip), simpler client code (plain `<img src>`). URLs are obscure-but-not-secret — relies on UUID filenames for privacy-by-obscurity. Acceptable trade for a coaching-org tool; revisit if real cross-org confidentiality requirements appear.
- **2026-05-08 — PNG and JPEG only, WebP rejected.** The `docx` library's `ImageRun` doesn't accept WebP, and silently dropping WebP images at export time would surprise teachers worse than rejecting at upload time.
- **2026-05-08 — Per-question Edit Images UI rather than Excel-embedded extraction.** Smaller blast radius — Excel pipeline (xlsx parser) untouched. Teachers add images post-upload through the browse page. Excel-embedded extraction (xlsx → exceljs swap) is a separate future milestone.
- **2026-05-08 — `imageUrl.ts` split out from `images.ts`.** `images.ts` imports `node:crypto` for `randomUUID`; importing it from a client component pulls `node:crypto` into the browser bundle and breaks the Webpack build. The pure-function URL builder lives in its own module so client components can use it.

## Adding a new RLS-protected table

Follow the `questions`/`options` pattern (see `0002_rls.sql` + `0004_upload_staging.sql`):
1. Enable RLS.
2. Read policy: `org_id = private.current_user_org_id()`.
3. Write policy: same plus `private.current_user_is_admin()` if admin-curated.
4. Add a test in `tests/upload-rls.test.ts` (or new equivalent) proving a TEACHER cannot write and a member of another org cannot read.
5. Run `mcp__supabase__get_advisors` after applying the migration.

## Live infra

- **Supabase project:** `wunvtnqlzjrkvolslbnm` (https://wunvtnqlzjrkvolslbnm.supabase.co)
- **Production:** https://question-bank-sage.vercel.app — auto-deploys from `main`
- **Repo:** https://github.com/lwspune/question-bank (public)
- **Auth callback URLs allow-listed in Supabase Auth:** production + `localhost:3000`
