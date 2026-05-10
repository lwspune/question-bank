# Question Bank — project notes

MCQ question bank for teachers. Teachers upload Excel files of questions, filter by exam/subject/chapter/subtopic, and download a Question Paper + Answer Key zip for offline distribution.

## Stack

- **Next.js 14** App Router · TypeScript · Tailwind 3 · shadcn-style UI primitives
- **Supabase** Auth + Postgres + RLS, accessed via `@supabase/supabase-js` (no Prisma, no ORM)
- **Vitest 2** for tests · `tsx` for scripts
- **Word export:** `temml` (LaTeX → MathML) → `mathml2omml` → `docx` + `jszip`
- **Browser math preview:** `katex` + `react-katex`
- **Deploy:** Vercel, git-integrated

## Multi-tenancy + visibility model

Per-school orgs, RLS-enforced. Three tiers of access:
- **Service role** (seed scripts, server-only admin actions) bypasses RLS by design — never expose to client code.
- **ADMIN** can write questions, options, upload_jobs, and auto-create chapters/subtopics, scoped to their own org.
- **TEACHER** can read everything in their org but cannot write.
- **anon** (no JWT) can read PUBLIC questions/options + all taxonomy. Cannot write anything.

Each question has a `visibility` enum (`PUBLIC | PRIVATE`, default PRIVATE). Read RLS is the union of two permissive policies: `(visibility = 'PUBLIC')` for everyone, plus `(org_id = private.current_user_org_id())` for authenticated org members on their own org's PRIVATE rows. Authenticated users see PUBLIC across all orgs + their own PRIVATE; anon sees only PUBLIC. Admins flip per-question visibility from the edit page.

RLS helpers live in the **`private` schema** (not exposed by PostgREST): `private.current_user_org_id()`, `private.current_user_is_admin()`. New org-scoped policies should reference these.

## File layout

```
src/
├── app/
│   ├── layout.tsx                         next/font (Inter + Source Serif 4), sonner Toaster, Vercel Analytics, no-FOUC theme bootstrap, full SEO Metadata + Twitter card
│   ├── opengraph-image.tsx                edge-runtime ImageResponse — dynamic 1200x630 OG image with the headline + LWS Pune mark
│   ├── robots.ts                          MetadataRoute.Robots — allow public routes, disallow /dashboard /upload /questions /api
│   ├── sitemap.ts                         MetadataRoute.Sitemap — lists /browse + /login
│   ├── login/page.tsx                     email + password sign-in (client) — split-screen layout
│   ├── dashboard/                         page.tsx + loading.tsx — quick actions, stat cards, by-exam bars, recent uploads (admin)
│   ├── upload/                            admin-only: Stepper → Dropzone (file pick) → preview summary bar → animated success
│   ├── browse/                            page.tsx + loading.tsx + Hero + FilterBar (incl. pyqYears chips) + MobileFilters (Sheet) + QuestionCard + Pagination + DownloadDialog (real modal)
│   ├── questions/[id]/edit/               admin-only edit page: two-column, sticky save bar, Edit/Preview tab, dropzone-style image slots
│   ├── api/auth/callback/                 Supabase OAuth code exchange
│   ├── api/upload/{preview,commit}/       two-stage admin upload
│   ├── api/questions/[id]/                PUT (JSON): edit text+options+taxonomy+image paths in one request (admin only)
│   ├── api/sync/mock/                     POST (JSON): receives a finalized mock from a sibling app (e.g. MHT_CET_AI). Bearer-token auth via SYNC_SHARED_SECRET. Idempotent + content-hash dedup + attempt-stats merging.
│   └── api/export/                        POST → ZIP of Question Paper + Answer Key (server-side fetches image bytes via service-role for embed)
├── lib/
│   ├── supabase/{client,server,middleware,admin}.ts    four supabase-js variants
│   ├── auth.ts                            getSessionUser, getSessionMember, requireAdmin, HttpError
│   ├── seed.ts                            taxonomy upsert (used by scripts/seed.ts)
│   ├── questions/{filters,query,edit,applyEdit,dirty}.ts   browse filters ↔ URL · Supabase query builder · zod edit schema + hash · DB-side edit application · pure-function form-state diff for edit page
│   ├── sync/{payload,mergeAttemptStats,applyMockSync}.ts  zod payload validator · pure stats merge · orchestrator that resolves taxonomy + dedups by content_hash + merges attempt_stats for the sync receiver
│   ├── rate-limit.ts                      checkAndIncrement(client, bucket, {limit, windowMs}) backed by public.rate_limits + public.rate_limit_increment SQL function (service-role only)
│   ├── dashboard/{stats,activity}.ts      getDashboardStats (totalQuestions/exams/chapters/daysSinceLastUpload/byExam) · getRecentUploads (cap 5)
│   ├── upload/{parser,validate,hash,taxonomy,commit}.ts   upload pipeline (pure → DB)
│   ├── storage/
│   │   ├── images.ts                      uploadImage / deleteImage / downloadImage / validateImageUpload (server, uses node:crypto)
│   │   └── imageUrl.ts                    pure-function publicImageUrl — safe to import from client components
│   └── export/{ommlBuilder,docxBuilder}.ts                LaTeX → OMML, .docx assembly
├── components/
│   ├── AppHeader.tsx + UserMenu.tsx       sticky 56px header (logo + org + avatar dropdown with dark-mode toggle + sign-out)
│   ├── Footer.tsx                         site-wide footer (LWS Pune attribution, Report-a-question mailto, GitHub link)
│   ├── math/{parseLatex,KatexRenderer}.tsx   shared LaTeX segmenter + KaTeX wrapper
│   └── ui/{button,input,label,card,badge,select,dialog,sheet,skeleton,stepper,dropzone}.tsx   shadcn primitives
└── middleware.ts                          Supabase session refresh + /dashboard guard

supabase/
├── migrations/0001..0012_*.sql            apply in order via Supabase MCP (0009 = visibility enum + public-read policies; 0010 = sync metadata columns: pyq_year, marks, neg_marks, attempt_stats, source_mock_id, source_app; 0011 = rate_limits table + atomic increment function; 0012 = partial index on (visibility, exam_id, subject_id, created_at desc) WHERE visibility='PUBLIC' for the public hot path)
└── seed/
    ├── taxonomy.json                      committed snapshot from MHT_CET_2025_PCM.xlsx
    └── seed-first-org.sql                 manual onboarding for first admin

scripts/
├── extract-taxonomy.ts                    one-shot: regenerate taxonomy.json from a reference Excel
└── seed.ts                                idempotent taxonomy seed (service-role)

tests/                                     28 .test.ts files, 184 tests
├── fixtures/{upload,tinyImage}.ts         in-memory .xlsx fixture builder; 67-byte 1x1 PNG buffer
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

- **Spacing scale.** Page wrappers `p-8`, content cards (CardContent default) `p-6`, compact cards (FilterBar etc.) `p-4`, nested option blocks `p-3`. Pick the smallest tier that contains breathing room — don't mix `p-4`/`p-6` in the same visual rhythm.
- **Typography.** UI text uses `font-sans` (Inter, default). Question/option/solution body text uses `font-serif` (Source Serif 4) — it's how teachers tell content apart from chrome. Both are loaded via `next/font` in `src/app/layout.tsx` and exposed as Tailwind utilities.
- **Icons.** Use `lucide-react` for all icons. Never emoji or text glyphs (▾, ‹, ›) for UI affordances. Standard sizes: `h-3.5 w-3.5` for inline-with-text, `h-4 w-4` for buttons, `h-5 w-5` for the AppHeader logo.
- **Toasts.** `import { toast } from "sonner"`. Fire on every async user-initiated success or failure (save, upload commit, export download, sign-out). Setting an inline `error` state is fine, but never *replace* a toast with it — both should fire so the user can't miss the result while scrolled.
- **AppHeader.** Every authenticated page wraps its `<main>` in `<><AppHeader />…</>`. Don't re-add ad-hoc back-links or sign-out buttons on individual pages — sign-out lives in the AppHeader user menu.
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
- **2026-05-08 — Edit lives on a dedicated page, not inline.** The M5 inline `EditImagesDialog` was cramped once we expanded scope to text + 4 options + solution + taxonomy. `/questions/[id]/edit` is admin-only and gives a full form. The browse card just links out.
- **2026-05-08 — Eager-upload image flow on edit (MHT_CET_AI pattern).** Image uploads happen on file-pick via the browser session client (storage RLS gates admin + org folder). The Save endpoint is JSON-only and receives storage paths. Server compares old vs new paths and deletes orphans. Keeps the route handler simple and decouples storage failures from DB writes.
- **2026-05-08 — Edit allows taxonomy moves but not auto-create.** The form lets admins reassign subject/chapter/subtopic from existing options. Auto-create from this UI was deliberately not added: a typo here is more visible (admin staring at one row) than during bulk Excel upload, and a typo'd "Phyiscs" subject would corrupt the canonical taxonomy. Auto-create stays in the upload pipeline only.
- **2026-05-08 — `applyEdit` extracted as a discriminated-union returning DB function.** Route handler is a thin auth + http mapping; all the logic (load + verify org + path-prefix check + taxonomy hierarchy + UPDATEs + orphan cleanup) lives in `src/lib/questions/applyEdit.ts` and returns `{ kind: "ok" | "not_found" | "forbidden" | "invalid_image_path" | "invalid_taxonomy" | "duplicate" | "error" }`. Lets us integration-test the logic directly with the service-role client without spinning up the route.
- **2026-05-09 — Login uses email + password (`signInWithPassword`), magic-link removed for now.** Supabase's default-SMTP cap of 2 emails/hour project-wide blocked the magic-link flow during development. Rather than configure custom SMTP just to demo, admin passwords are set directly in `auth.users` via `UPDATE ... SET encrypted_password = crypt('…', gen_salt('bf'))` (pgcrypto, bcrypt). No sign-up flow, no password-reset flow — both deferred until custom SMTP (Resend) is wired. When teachers come online, add a magic-link toggle alongside password sign-in rather than forcing them through admin-set passwords.
- **2026-05-09 — Public-product pivot (Phase A): visibility enum + drop auth wall.** Question Bank repositioned from "private coaching tool" to "public PYQ paper builder, fed by sync from MHT_CET_AI." `0009_visibility.sql` adds a `visibility (PUBLIC | PRIVATE)` enum on `questions` (default PRIVATE; LWS Pune's 150 backfilled to PUBLIC). New permissive RLS policies grant anon + authenticated read access to PUBLIC rows; existing org-scoped policies remain for PRIVATE. `queryQuestions` now accepts `orgId: string | null` — null means "RLS scopes." Browse page + export endpoint are unauthenticated; AppHeader shows "Sign in" for anon; middleware redirects anon /dashboard → /browse instead of /login. Multi-tenancy stays for the future "private branded bank for paying coaching orgs" tier (deferred). Remaining phases: B (sync receiver from MHT_CET_AI), C (optional user accounts behind Resend SMTP), D (anti-abuse rate limit on /api/export).
- **2026-05-09 — Sync receiver (Phase B): `POST /api/sync/mock`.** A finalized mock in MHT_CET_AI (or any sibling publisher) POSTs its questions here; we dedup via `content_hash`, auto-create chapters/subtopics, and either INSERT a new question (visibility=PUBLIC) or MERGE attempt_stats into an existing row. Auth via `Authorization: Bearer <SYNC_SHARED_SECRET>`. `0010_sync_metadata.sql` adds five nullable columns on `questions`: `pyq_year`, `marks`, `neg_marks`, `attempt_stats jsonb`, `source_mock_id`, `source_app`. **Trade-offs:** (1) `source_mock_id` is last-write-wins, not a join table — loses cross-mock provenance; if needed later, promote to a `question_sources` table. (2) Subject names must match the canonical taxonomy exactly (e.g. "Maths" not "Mathematics") — easier contract; alias map deferred. (3) Synced rows always land as PUBLIC in the LWS Pune org with the org's first ADMIN as `created_by`; admins can flip to PRIVATE via the edit page if needed. (4) On near-simultaneous duplicate POSTs, the orchestrator catches `23505` unique-violation and re-routes through MERGE — no race window. The MHT_CET_AI publisher button is a separate cross-project change (not in this commit).
- **2026-05-09 — Public-launch polish (Phase E).** Five small things that together turn `/browse` from "looks half-built" into "feels like a real product." (1) **Hero + Footer:** new `Hero` on the browse landing (only when no filters applied) — exam-agnostic copy ("Build a question paper in 60 seconds") with a stat row showing what's available now (MHT-CET) vs coming soon (NDA, IPMAT, CUET, NEET, JEE Main); new `Footer` site-wide with LWS Pune attribution + Report-a-question mailto + GitHub link. (2) **SEO foundation:** full root `Metadata` (title template, description, keywords, OG, Twitter card), per-page metadata for `/browse`, dynamic OG image via `app/opengraph-image.tsx` (edge-runtime ImageResponse), `app/robots.ts` allowing public routes only, `app/sitemap.ts`. (3) **PYQ year filter:** new `pyqYears: number[]` field on `Filters`, parsed/serialized through URL, queried via `.in("pyq_year", ...)`, exposed as a chip toggle in `FilterBar` (only visible when at least one question in the public bank has a non-null `pyq_year`). (4) **Mobile pass:** QuestionCard padding tightens at `< sm`, MobileFilters Sheet now full-width on small viewports, AppHeader org name hidden on `< md` instead of `< sm`. (5) **Perf + analytics:** `0012_public_filter_index.sql` adds a partial index on `(visibility, exam_id, subject_id, created_at desc) WHERE visibility = 'PUBLIC'` for the public hot path; `@vercel/analytics` mounted in root layout. **Trade-offs:** OG image is dynamic ImageResponse not a designed PNG — looks fine but less polished than a real graphic; pyqYears filter UI is hidden when the bank has no PYQ data, which keeps the panel clean but means the feature is silently invisible until data arrives.
- **2026-05-09 — Rate limiting (Phase D): per-IP/per-user cap on `/api/export`.** Public + zero rate limit = scraping. `0011_rate_limits.sql` adds a `rate_limits(bucket, window_start, count)` table + `public.rate_limit_increment(bucket, window_start)` SECURITY DEFINER function (service-role only — `revoke from anon, authenticated` is required because Supabase auto-grants execute on `public.*`). The route handler does `checkAndIncrement` BEFORE payload validation so junk requests still count toward the bucket. Limits: anon = 10 exports/hour/IP, authed = 100/hour/user. Bucket key is `export:anon:<ip>` or `export:user:<user_id>`. Garbage collection happens inline (each call deletes rows older than 2h for the same bucket). 429 response includes `Retry-After` header + JSON body with `retryAfter`/`limit`/`used`. `getSessionMember()` is wrapped in try/catch in the route — outside Next request scope (i.e. in tests calling POST directly) `next/headers` `cookies()` throws; harmless fallback to anon for the rate-limit bucket lets tests work without cookie mocking.

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
- **Auth callback URLs allow-listed in Supabase Auth:** production + `localhost:3000` (legacy from the magic-link era; harmless to leave even though we currently use password auth)

## Operations

Day-to-day knobs and where to look when something goes sideways.

### Monitoring

- **Vercel function logs:** dashboard → Project → Logs. The `/api/export`, `/api/sync/mock`, and `/api/upload/*` route handlers all `console.error` on the catch path; surface there.
- **Vercel Analytics:** dashboard → Project → Analytics. Pageviews + visitor counts. Free tier, cookieless. Frontend errors don't surface here yet — if/when noise picks up, consider Sentry.
- **Supabase logs:** dashboard → Logs → API/Postgres. Useful when an export 500s and you want to see the underlying SQL error.
- **Supabase advisor:** run `mcp__supabase__get_advisors` periodically (or after a migration). Two acceptable lints today: `rls_enabled_no_policy` on `public.rate_limits` (intentional, service-role-only access) and `auth_leaked_password_protection` (Supabase auth setting, can be enabled in dashboard).

### When to upgrade tiers

- **Vercel Hobby (current)** is bounded by ~100 GB-h/month of function execution and ~100 GB of bandwidth. The export endpoint is the heavy hitter — when daily traffic crosses ~500 papers, watch the dashboard's bandwidth meter weekly.
- **Supabase Free (current)** is bounded by 500 MB DB + 1 GB storage egress + 5 GB bandwidth. The public bucket of question images is the egress risk; if egress crosses ~80% of the cap mid-month, plan a Pro upgrade.

### Rate limit visibility

The rate-limit table (Phase D) is service-role only and not exposed to the API. To see who's hitting the limit:
```sql
select bucket, count, window_start
from rate_limits
order by count desc
limit 20;
```
Buckets are formatted `export:anon:<ip>` or `export:user:<user_id>`.

### Rotating SYNC_SHARED_SECRET

No code change needed. Set a new value in:
1. Vercel env vars (Question Bank project) → trigger redeploy
2. MHT_CET_AI's env (whatever variable name its publisher uses) → redeploy

The secret is read at request time via `process.env.SYNC_SHARED_SECRET`, so a redeploy on Question Bank's side picks up the new value immediately. Until both sides match, syncs return 401.

### Resetting an admin password

No password reset flow in the UI yet (deferred until SMTP is wired). To reset directly:
```sql
update auth.users
set encrypted_password = crypt('new-password', gen_salt('bf'))
where email = 'admin@example.com';
```
Run in the Supabase SQL editor with the service role.

### Backfilling visibility on existing questions

The default for new rows is PRIVATE. If you bulk-uploaded a batch you want public:
```sql
update questions
set visibility = 'PUBLIC'
where source_file = 'NDA_2024_paper.xlsx';
```
