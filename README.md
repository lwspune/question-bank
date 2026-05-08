# Question Bank

MCQ question bank portal for teachers. Multi-tenant, per-school. Built on Next.js 14 + Supabase + Tailwind.

## Setup (first time)

### 1. Create a Supabase project

Go to https://supabase.com → New project. Save:

- Project URL (`https://YOUR-REF.supabase.co`)
- `anon` public key
- `service_role` key (server-only — never expose to client)
- Project ref (the `YOUR-REF` part of the URL)

### 2. Configure local env

```sh
cp .env.example .env.local
# fill in the four values
```

### 3. Install deps

```sh
npm install
```

### 4. Apply migrations

Paste the contents of these files into the Supabase SQL editor (Dashboard → SQL Editor → New query) **in order**:

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_rls.sql`

### 5. Seed taxonomy

```sh
npm run db:seed
```

This inserts the MHT-CET taxonomy (1 exam, 3 subjects, 72 chapters, 150 subtopics) extracted from the reference Excel. Idempotent — safe to re-run.

### 6. Generate TypeScript types from the live schema (optional but recommended)

```sh
SUPABASE_PROJECT_REF=your-ref npm run db:types
```

(Requires the Supabase CLI: `npm i -g supabase` or use `npx supabase`.)

### 7. Run the app

```sh
npm run dev
```

Open http://localhost:3000.

### 8. Onboard your first admin

1. Sign in via magic link (enter your email, click the link in your inbox).
2. After signing in, you'll see a "not linked to an organization" message — that's expected.
3. Open `supabase/seed/seed-first-org.sql`, replace the two placeholders with your org name and your email, paste into the Supabase SQL editor, and run.
4. Refresh the dashboard — you should now see your org name and `ADMIN` role.

## Tests

```sh
npm test            # one-shot
npm run test:watch  # watch mode
```

- Middleware tests run anywhere (mocked Supabase).
- Seed and RLS tests require `.env.local` to be filled in. They are skipped automatically otherwise.

## Project structure

```
src/
├── app/
│   ├── login/             # magic-link sign-in
│   ├── dashboard/         # protected landing page
│   ├── api/auth/callback  # Supabase auth code exchange
│   └── page.tsx           # root redirect to /login or /dashboard
├── lib/
│   ├── supabase/          # browser, server, admin, middleware clients
│   ├── auth.ts            # session + membership helpers
│   ├── seed.ts            # taxonomy seed (idempotent)
│   └── utils.ts           # cn()
├── components/ui/         # shadcn-style primitives
└── middleware.ts          # route guard

supabase/
├── migrations/            # raw SQL — apply in order
└── seed/
    ├── taxonomy.json      # extracted from reference Excel
    └── seed-first-org.sql # manual onboarding for first admin

scripts/
├── extract-taxonomy.ts    # one-shot: regenerate taxonomy.json
└── seed.ts                # CLI for seeding taxonomy

tests/
├── middleware.test.ts     # pure unit
├── seed.test.ts           # integration (DB required)
└── rls.test.ts            # integration (DB required)
```

## Status

**M1 — done:** scaffold · auth · taxonomy seed · RLS · dashboard placeholder.
**M2 — next:** Excel upload (admin) with validation + preview + commit.
