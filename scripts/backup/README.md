# Local database backup

```sh
npm run db:backup              # dump, verify, prune to the newest 5 runs
npm run db:backup -- --dry     # show what it would do; writes nothing
npm run db:backup -- --keep=10 # override retention for this run
```

Writes to `backups/` (gitignored). One run ≈ **25 MB**, ~16 seconds.

## When to run it

- **Weekly**, from Task Scheduler (see below).
- **By hand, before any script that does a bulk write.** This is the one that
  matters. The threat here has never been Supabase losing data — it is our own
  scripts. See the header comment in `lib.ts` for the list of near-misses.

## What a run produces

| File | What it is |
|---|---|
| `pyqvault-<stamp>.dump` | pg_dump custom format. **Data** for every non-internal schema — `public`, `auth`, `storage`, and anything added later. |
| `pyqvault-<stamp>.schema.sql` | Plain-SQL DDL for `public`. Readable. |
| `pyqvault-<stamp>.manifest.json` | Live row counts per table, sizes, server + pg_dump versions. What the dump *should* contain, for checking a restore against. |

The stamp is `YYYYMMDD-HHMM` in **UTC** (unambiguous, DST-proof, sorts
chronologically). The console prints local time so the message still reads
naturally.

## What it refuses to do

The script deletes a dump rather than keep one it cannot vouch for. It rejects a
run if pg_dump exits non-zero, if the file is under 1 MB, or if any live table is
missing from the dump's table-of-contents. **On rejection it prunes nothing**, so
a bad run can never be the reason your good backups were deleted.

That last check is the one that earns its keep over time: when a future migration
adds a table, this notices immediately instead of silently omitting it from every
backup thereafter.

Retention is by **run**, not by file, so a dump and its manifest always live or
die together. It never deletes a file whose name it cannot parse — anything else
in `backups/` is left alone.

## Requirements

- **PostgreSQL 17+ client tools.** Command-line tools only; you do not need the
  server. Found automatically under `C:\Program Files\PostgreSQL\*\bin` (newest
  wins), or set `PG_BIN`. Deliberately not read from `PATH` — a scheduled task
  runs with a different environment, and a PATH-dependent backup works when you
  test it by hand and quietly does nothing at 3am.
- **`SUPABASE_DB_URL`** in `.env.local`:
  ```
  SUPABASE_DB_URL=postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres
  ```
  Percent-encode the password if it contains `@ : / #` (e.g. `@` → `%40`).
- **You cannot point this somewhere else with an environment variable.** Like
  every script here, it loads `.env.local` with `override: true`, so the file
  beats the environment and `SUPABASE_DB_URL=... npm run db:backup` silently
  dumps production anyway. (Found the hard way while trying to test the
  connection-failure path — the probe never reached the code it was aimed at.)
  To back up a different database, edit `.env.local`.
- **IPv6.** `db.<ref>.supabase.co` publishes **no A record** — it is IPv6-only.
  This works on a network with IPv6 (verified on the current one) and will fail
  with a confusing connection error on one without. Fallback is Supabase's
  session pooler, which is IPv4; the dashboard gives the host and its different
  username format (`postgres.<ref>`).

## Restoring

The archive is custom format, so use `pg_restore`, not `psql`:

```sh
# what's in it
pg_restore --list backups/pyqvault-<stamp>.dump

# convert to plain readable SQL
pg_restore -f - backups/pyqvault-<stamp>.dump > restore.sql

# one table only
pg_restore --data-only --table=questions -d "<target-url>" backups/pyqvault-<stamp>.dump

# everything, into a target whose schema already exists (run migrations first)
pg_restore --data-only --disable-triggers -d "<target-url>" backups/pyqvault-<stamp>.dump
```

`--disable-triggers` matters: it lets rows load without foreign-key ordering
constraints, which is why a hand-rolled exporter would have needed to solve
insert ordering and this does not.

Check the result against the manifest's `rowCounts`.

## Weekly schedule (Windows) — REGISTERED

Task **"PYQ Vault DB backup"** runs `weekly.cmd` every **Monday at 11:00**.
Registered 2026-08-11 and verified by firing it through the scheduler
(`LastTaskResult 0`, dump written, log appended).

To recreate it on another machine:

```powershell
$repo = "C:\Users\vilas\Downloads\Question_Bank"
$action = New-ScheduledTaskAction -Execute "$repo\scripts\backup\weekly.cmd" -WorkingDirectory $repo
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 11am
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
              -DontStopIfGoingOnBatteries -AllowStartIfOnBatteries `
              -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
Register-ScheduledTask -TaskName "PYQ Vault DB backup" -Action $action `
  -Trigger $trigger -Settings $settings -Description "Weekly pg_dump to backups\"
```

`-StartWhenAvailable` is the important flag: a laptop is often asleep at 11:00
Monday, and without it that week is simply skipped — silently, and you find out
during a restore. The battery flags stop it being skipped or killed when
unplugged. Verified live: `StartWhenAvailable True`, `DisallowStartIfOnBatteries
False`, `StopIfGoingOnBatteries False`.

**Registering is not the same as working.** Prove it end to end with
`Start-ScheduledTask -TaskName "PYQ Vault DB backup"`, then check a new dump
appeared.

### Did it run?

```powershell
Get-ScheduledTaskInfo -TaskName "PYQ Vault DB backup" |
  Select-Object LastRunTime, LastTaskResult, NextRunTime   # 0 = success
```

That only says npm exited cleanly. The real evidence is the artifact: `backups\`
should always hold a dump newer than 7 days. For *why* a run failed, read
`backups\last-run.log`, which `weekly.cmd` appends to every run — a scheduled
task's console output otherwise goes nowhere. The log grows by ~15 lines a week
and is never touched by retention (the pruner ignores names it cannot parse).

## What this does NOT cover

- **Storage bucket files** (question figures, ~500+ images). Those live in
  Supabase Storage, not Postgres; only their metadata rows are dumped. They are
  regenerable from the source PDFs via the committed manifests.
- **Off-machine copies.** Everything is on `C:`, which also holds the source PDFs
  and the NDA/MHT-CET Excel uploads that exist nowhere else. A drive failure
  costs all of it. That exposure predates this script — it just doesn't fix it.
- **Encryption.** Deliberate: these files stay local, and encryption was a
  mitigation for uploading them somewhere shared. They contain student mobiles,
  quiz-lead consent records and the full `auth.users` table — so if they ever do
  leave this machine, that decision changes.
