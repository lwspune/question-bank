# Question Bank

Free, public past-year-question paper builder for Indian entrance exams. Filter by exam, chapter, difficulty and year — download the Question Paper + Answer Key as Word files. Live at **https://question-bank-sage.vercel.app**.

Currently supports MHT-CET. NDA, IPMAT, CUET, NEET and JEE Main are queued.

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

Apply each `supabase/migrations/000N_*.sql` in order via the Supabase MCP tool, or paste the contents into the Supabase SQL editor (Dashboard → SQL Editor → New query). Today there are 12 migrations, including the schema, RLS, sync metadata, rate-limiter, and the public-visibility partial index.

### 5. Seed taxonomy

```sh
npm run db:seed
```

Inserts the MHT-CET taxonomy (1 exam, 3 subjects, 73 chapters, 152 subtopics) extracted from the reference Excel. Idempotent — safe to re-run.

### 6. Generate TypeScript types from the live schema (optional)

```sh
SUPABASE_PROJECT_REF=your-ref npm run db:types
```

Requires the Supabase CLI: `npm i -g supabase` or `npx supabase`.

### 7. Run the app

```sh
npm run dev
```

Open http://localhost:3000 → redirects to `/browse` (the public landing).

### 8. Onboard your first admin

The login page accepts email + password sign-in. Magic-link is intentionally disabled until custom SMTP is wired (see [CLAUDE.md decisions log](./CLAUDE.md)). To create an admin:

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
| `npx tsc --noEmit` | Full project typecheck (covers test files too — keep this clean) |
| `npm run db:seed` | Idempotent taxonomy seed |
| `npm run db:types` | Regenerate `src/types/db.ts` from the live schema |
| `npm run extract:taxonomy` | Regenerate `supabase/seed/taxonomy.json` from the reference Excel |

## Where things live

- **Live production:** https://question-bank-sage.vercel.app — auto-deploys from `main`
- **Repo:** https://github.com/lwspune/question-bank
- **Supabase project:** `wunvtnqlzjrkvolslbnm` (https://wunvtnqlzjrkvolslbnm.supabase.co)
- **Architecture, decisions log, project conventions:** [CLAUDE.md](./CLAUDE.md)

## Tests

```sh
npm test            # one-shot
npm run test:watch  # watch mode
```

Pure unit tests run anywhere. DB integration tests (the majority) require `.env.local` to be filled in and skip automatically otherwise. There are 184 tests across 28 files; full suite runs in ~5s.

## Public surface vs admin surface

- **Public** (no login): `/`, `/browse`, `/api/export`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`. RLS scopes the question reads to `visibility = 'PUBLIC'` rows.
- **Admin** (auth required): `/dashboard`, `/upload`, `/questions/[id]/edit`, plus the corresponding `/api` routes. Visibility per question is editable in the edit form.
- **Server-to-server** (shared-secret): `/api/sync/mock` — receives finalized mocks from sibling apps (initially MHT_CET_AI). Auth via `Authorization: Bearer $SYNC_SHARED_SECRET`.
