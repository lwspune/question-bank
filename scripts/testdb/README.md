# Dedicated test Supabase project

`npm test` (the fixture-writing suite) runs against a **dedicated test
Supabase project**, never production. Built 2026-08-06 after the fixture-leak
incident (test mocks/questions/quizzes surfacing on the live site — see the
Decisions log).

- **Project:** `question-bank-test`, ref `rjwuwmrzkyergflmmfxq`, in a
  **separate free Supabase account** (own egress/disk-IO quotas, so test
  traffic can't pressure prod's org limits).
- **Creds:** `.env.test.local` (gitignored; template in
  `.env.test.local.example`). CI supplies the same values as `TEST_SUPABASE_*`
  repo secrets on the test step only.
- **The guard:** `tests/setup.ts` + `tests/helpers/testdb.ts` resolve the env
  and **refuse to run** if the Supabase URL's project ref isn't on
  `ALLOWED_TEST_REFS` — an allow-list, so an unknown/misconfigured project
  fails closed. Prod is reachable only via `npm run test:prod-contract`
  (read-only suites asserting editorial ↔ live-content contracts, listed in
  `tests/prodContractFiles.ts`) or the temporary `TESTDB_TRANSITION=1` escape.

## Scripts (all guarded — they refuse non-allow-listed refs)

| Command | What |
|---|---|
| `npm run testdb:migrate` | Replay `supabase/migrations/*.sql` in order; bookkeeping in `public.testdb_migrations`; idempotent. Run after adding a migration. |
| `npm run testdb:seed` | Canonical taxonomy (taxonomy.json = MHT-CET only) + `LWS Pune` org + seed owner user + 12 PUBLIC MCQs. Idempotent. |
| `npm run testdb:reset` | Truncate all public tables + delete all auth users + empty the bucket, then migrate + seed. Run when killed test runs leave crumbs. |
| `npx tsx scripts/testdb/sql.ts "<sql>"` | Ad-hoc SQL against the test DB (the MCP only reaches prod). |

## Gotchas

- **Free projects pause after ~7 days idle.** CI activity normally prevents
  it; if tests suddenly fail with connection errors, unpause from the
  dashboard (data survives).
- **New migration numbers must have committed files.** The replay is the only
  thing that catches a prod-applied-but-never-committed migration (0021 and
  0066 were both that defect) — if `testdb:migrate` fails on a missing
  relation, a file is missing from `supabase/migrations/`.
- **The seed owner user** (`seed-owner@testdb.internal`) is deliberately NOT
  under `@test.local` — the global-teardown sweeps that domain, and
  `questions.created_by` is a NO-ACTION FK, so sweeping the owner would fail.
- **taxonomy.json seeds MHT-CET only** (it derives from the MHT-CET reference
  Excel; other exams were auto-created by uploads in prod). Tests needing
  other real taxonomy belong in the prod-contract list.
