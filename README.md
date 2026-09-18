# PYQ Vault

Free, public past-year-question bank for Indian entrance and board exams. Filter and preview by exam, chapter, subtopic, difficulty and PYQ year; sit timed mock tests reconstructed from real papers; read per-chapter teaching notes, strategy guides and book-faithful textbook solutions. Live at **https://www.pyqvault.com**.

Browsing and previewing are fully open to anyone. Downloading a paper + answer key as Word files requires a **teacher account** — a downloadable Word paper is a teacher artifact, so students get the online product and other visitors get a "request teacher access" CTA.

Covers NDA, CDS, JEE Mains, NEET, MHT-CET, CBSE Classes 10/11/12, Maharashtra State Board Classes 9/10/11/12, and two worksheet courses. **Run `npm run stats` for live bank size** — any count written in prose, here or anywhere else in the repo, lags the bank.

> The repo, folder and Vercel project are still named `question-bank`; the product was rebranded to PYQ Vault on 2026-06-04. Lowercase "question bank" in prose means the question corpus, not the brand.

> Looking for the deeper context — architecture, decisions log, project conventions? See [CLAUDE.md](./CLAUDE.md). This README is for getting a local dev environment running.

## Stack

- **Next.js 14** App Router · TypeScript · Tailwind 3
- **Supabase** Auth + Postgres + RLS via `@supabase/supabase-js` (no Prisma, no ORM)
- **Word export:** `temml` (LaTeX → MathML) → `mathml2omml` → `docx` + `jszip`
- **Math preview:** `katex` + `react-katex`
- **Tests:** Vitest 2
- **Deploy:** Vercel, git-integrated to `main`

## Setup (first time)

### 1. Create a Supabase project

Go to https://supabase.com → New project. From **Settings → API** save:
- Project URL (`https://YOUR-REF.supabase.co`)
- `anon` public key
- `service_role` key (server-only — never expose to client)
- Project ref (the `YOUR-REF` part of the URL)

### 2. Configure local env

```sh
cp .env.example .env.local
# fill in the five values, including SYNC_SHARED_SECRET (any long random string)
```

### 3. Install deps

```sh
npm install
```

### 4. Apply migrations

Apply each `supabase/migrations/00NN_*.sql` in order via the Supabase MCP tool, or paste the contents into the Supabase SQL editor (Dashboard → SQL Editor → New query). Migrations are **append-only** — never edit one that has already been applied. `ls supabase/migrations/` is the index, and every migration's rationale lives in its own `.sql` header.

### 5. Seed taxonomy

```sh
npm run db:seed
```

Inserts the exam/subject/chapter/subtopic taxonomy from `supabase/seed/taxonomy.json`. Idempotent — safe to re-run. This seeds the *taxonomy* only; the question corpus itself is built by the per-exam ingestion pipelines under `scripts/`.

### 6. Generate TypeScript types from the live schema (optional)

```sh
SUPABASE_PROJECT_REF=your-ref npm run db:types
```

Requires the Supabase CLI: `npm i -g supabase` or `npx supabase`.

### 7. Run the app

```sh
npm run dev
```

Open http://localhost:3000. Anonymous visitors get the public landing page; signed-in org members are redirected to `/dashboard`.

### 8. Onboard your first admin

The login page accepts email + password sign-in. **Custom SMTP for Supabase Auth is wired as of 2026-07-16** (Resend), so auth mail sends — but magic-link stays disabled and there's still no `/forgot-password` page, because Supabase's stock templates link to `<project-ref>.supabase.co` while the From reads `pyqvault.com`, and Gmail flags that cross-domain shape as phishing. Fixing it means pointing the templates at an `/auth/confirm` route on our own domain — see [ROADMAP](./ROADMAP.md) "Password reset flow". (Note the app's outbound campaign email is a *different* system: it calls the Resend **API** directly — [OPERATIONS](./OPERATIONS.md).) To create an admin:

1. **Create the auth user via the Supabase dashboard:** Authentication → Users → "Add user" → email + a password you choose.
2. **Set the password directly in `auth.users`** (or in the dashboard's user editor). Bcrypt example: `UPDATE auth.users SET encrypted_password = crypt('your-password', gen_salt('bf')) WHERE email = 'you@example.com';`
3. **Link the user to an org** by editing `supabase/seed/seed-first-org.sql`, replacing the two placeholders with your org name and email, then running it in the SQL editor.
4. Sign in at `/login` with your email + password. The admin dashboard, upload, and edit pages become available.

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server (Tailwind JIT can miss new routes — restart if styles look broken on a freshly-added page) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest one-shot |
| `npm run test:watch` | Vitest watch mode |
| `npm run typecheck` | Full project typecheck (`tsc --noEmit`, covers test files too — keep this clean) |
| `npm run db:seed` | Idempotent taxonomy seed |
| `npm run db:types` | Regenerate `src/types/db.ts` from the live schema |
| `npm run extract:taxonomy` | Regenerate `supabase/seed/taxonomy.json` from the reference Excel |

## Where things live

- **Live production:** https://www.pyqvault.com — auto-deploys from `main`. The old `question-bank-sage.vercel.app` still resolves and 308-redirects here.
- **Repo:** https://github.com/lwspune/question-bank
- **Supabase project:** `wunvtnqlzjrkvolslbnm` (https://wunvtnqlzjrkvolslbnm.supabase.co)
- **Architecture, decisions log, project conventions:** [CLAUDE.md](./CLAUDE.md)

## Tests

```sh
npm test            # one-shot
npm run test:watch  # watch mode
```

Pure unit tests run anywhere. **DB-integration tests run against a DEDICATED TEST Supabase project, never production** — `tests/setup.ts` resolves `.env.test.local` / `TEST_SUPABASE_*` and hard-refuses to run fixture-writing tests against any project ref not on its allow-list. Do not point them at the prod project; see `scripts/testdb/README.md` for the runbook and `npm run testdb:reset` to re-baseline. The read-only prod-contract suites (editorial ↔ live-content checks) are the exception and run via `npm run test:prod-contract`.

## Public surface vs admin surface

- **Public** (no login): `/`, `/browse`, `/questions/*` (per-chapter landing pages), `/guide/*`, `/notes/*`, `/board/*`, `/mock`, `/formula/*`, `/quiz/*`, `/blog`, `/about`, `/sitemap.xml`, `/robots.txt`. RLS scopes the question reads to `visibility = 'PUBLIC'` rows.
- **Signed-in student:** question reports, bookmarks (`/saved`), timed mock sittings and their results.
- **Teacher / admin** (auth required): `/dashboard/*`, `/upload`, `/papers`, and the Word export at `/api/export` — downloading a paper is teacher-gated, server-enforced by `resolveExportAccess`.
- **Superadmin:** `/superadmin` (cross-org console) and the question editor at `/dashboard/questions/[id]` — content editing is superadmin-only since migration 0056.
- **Server-to-server** (shared-secret): `/api/sync/mock` — receives finalized mocks from sibling apps (initially MHT_CET_AI). Auth via `Authorization: Bearer $SYNC_SHARED_SECRET`.
