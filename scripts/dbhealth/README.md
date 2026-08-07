# Database health tracker

```sh
npm run db:health           # snapshot + store + report
npm run db:health -- --dry  # snapshot + report, store nothing
```

Runs daily via `.github/workflows/db-health.yml` (02:30 UTC / 08:00 IST), and
on demand from the Actions tab.

## Why it exists

Every counter Postgres exposes about load is **cumulative with no time
dimension**. `pg_stat_statements` will tell you a query has spilled 1,129 GB to
disk since the stats were last reset (2026-05-08) — it cannot tell you whether
any of that was today. That gap is not academic. When the `/browse` wide-sort
regression was fixed on 2026-08-05 there was no way to confirm from the database
that the spill had actually stopped: the lifetime total keeps the old number
forever.

Two snapshots subtract to a real per-window rate. One snapshot cannot. That is
the entire idea.

## What it watches, and why each one

Each rule exists because the thing it watches has already broken this project.

| Watched | Why |
|---|---|
| **Disk spill per query** | The `/browse` regression wrote 13.9 MB per call to return 25 rows — 99.4% of the whole database's temp writes, and what drained the disk-IO budget. A healthy query spills nothing. |
| **Calls per query per window** | Catches a new hot path on the day it appears rather than after a 91-day total looks alarming. |
| **Distance to the PostgREST 1000-row cap** | A plain `.select()` truncates at 1000 rows **silently** — no error, just undercounted results. Has caused at least five separate bugs here. Measured as the largest number of PUBLIC questions in one chapter. |
| **Database size vs the plan cap** | The bank grows with every ingest; JEE alone added ~10,000 questions. |
| **Cache hit rate, connections, deadlocks, dead rows** | Cheap to record, currently all healthy. Recorded so a change is visible, not because anything is wrong. |

## The three ways the arithmetic can lie

All handled in `src/lib/dbhealth/delta.ts`, all covered by tests. Each yields
`null` or an explicit flag rather than a plausible-looking wrong number.

1. **`pg_stat_statements` was reset** between snapshots — every counter restarts
   at zero, so subtracting gives nonsense (usually negative). Detected via the
   stored `stats_reset` timestamp; cumulative deltas become null. Point-in-time
   gauges are unaffected and still reported.
2. **A single query entry was evicted and re-created** — its counters restart
   while the global reset timestamp does not move. Flagged `suspectedReset`; the
   delta falls back to the current value, which UNDER-counts, and says so.
3. **The window is too short to extrapolate** — two snapshots two seconds apart
   genuinely reported "268 GB/day" from 7 MB of real activity. Below
   `MIN_RATE_WINDOW_HOURS` the raw delta is shown and the rate left blank.

## Two things learned on the first real run

Both are now encoded in the rules, and both are the kind of thing only contact
with real data reveals:

- **Collecting queries by lifetime rank misses new problems.** A query that
  starts misbehaving today has a small lifetime total by definition, so it stays
  invisible until it has already done damage. Fixed in migration 0070: spill is
  rare (100 of 4,477 queries have ever spilled), so *every* query that has ever
  spilled is now recorded, and a new one is caught on its first appearance.
- **Per-call spill alone is far too noisy.** The first run produced 20+ warnings,
  every one a hand-run analysis query that executed once and spilled ~5 MB.
  Volume is what makes spill an operational problem, so a query must also clear
  a total-for-the-window floor before it is reported.

## Layout

- `supabase/migrations/0069_db_health_snapshots.sql` — the table (service-role
  only: RLS on, no policies) and `collect_db_health()`
- `supabase/migrations/0070_db_health_collector_coverage.sql` — widened query
  collection
- `src/lib/dbhealth/{types,delta,flags,format}.ts` — pure core, no I/O
- `tests/dbhealth-{delta,flags}.test.ts` — 33 cases
- `scripts/dbhealth/run.ts` — the only piece that touches the database

`collect_db_health()` is an RPC rather than a set of table reads because
`pg_stat_statements` lives in the `extensions` schema and is not exposed through
PostgREST — supabase-js cannot read it directly. Same pattern as
`get_activity_shape` (0053) and `get_dashboard_stats` (0018).

## The monitor's own cost

`collect_db_health()` takes ~2.7 s and itself spills ~8 MB, mostly from
aggregating 4,477 rows of `pg_stat_statements` three ways. Once a day that is
8 MB against a database that moves gigabytes, so it is accepted rather than
optimised — but it is real, it appears in the tracker's own output, and it is
worth remembering before running the tracker in a loop.

## Reading the report

`FINDINGS: none` means everything measured is in range. It does **not** mean
nothing is wrong — it means nothing among these specific rules is. The report is
a tripwire, not proof of health.
