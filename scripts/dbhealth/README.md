# Database health tracker

```sh
npm run db:health                       # snapshot + store + report
npm run db:health -- --dry              # snapshot + report, store nothing
npm run db:health -- --reset-if-needed  # ...and clear the query store if it is
                                        # approaching work_mem (the CI job's mode)
```

Runs daily via `.github/workflows/db-health.yml` (02:30 UTC / 08:00 IST), and
on demand from the Actions tab.

Or read it as a page: **`/dashboard/health`** (superadmin only) — same numbers,
plus a history table the CLI cannot give you, since the CLI only ever compares
the latest two snapshots.

```sh
npx tsx scripts/dbhealth/smoke-page-data.ts   # drives the page's data path
```

That page is auth-gated and `force-dynamic`, so `next build` never executes it
and an anon curl is bounced by middleware before the route compiles — a green
build proves only that it compiles. The smoke script drives everything behind
the render; it is not a substitute for looking at the page while signed in.

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
| **Visibility-map coverage** | The share of a table's heap pages VACUUM has marked all-visible — what decides whether an "Index Only Scan" is *actually* index-only. `questions` at 67.4% meant **13,092 heap fetches** on one `/browse` query, most of its cost. **Dead rows do not predict this**: `syllabus_concepts` runs 0% dead rows at 43.2% coverage, because a bulk INSERT creates pages with neither — which is exactly how this bank is loaded. Gated on table *size*, not row count: the worst ratio on the database (`user_activity`, 30.4%) spans 56 pages and costs nothing. |
| **Query store size vs `work_mem`** | Supabase's `postgres_exporter` materialises the WHOLE of `pg_stat_statements` every minute. Once that no longer fits in `work_mem`, every scrape spills to disk: 13 GB/day in Aug 2026, and 2.7 GB/day again ten days later. Measured in BYTES, not entries — see below. |
| **Cache hit rate, connections, deadlocks** | Cheap to record, currently all healthy. Recorded so a change is visible, not because anything is wrong. |
| **Dead rows** | Recalibrated 2026-08-13, from 20% to 35%. Postgres autovacuums at `50 + 0.2 × live` — **the same point the old rule fired at** — so it could only ever report a condition the database was already fixing, and its message said so. It never fired in eleven snapshots, across a healthy sawtooth of 7.7 → 18.3 → 7.2%. Above 35% means autovacuum is genuinely losing, which *is* a finding. |

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
3. **A query was first seen in this snapshot** — it is either genuinely new
   (its lifetime is roughly the window) or long-lived and merely newly
   *collected* (its lifetime is months), and nothing stored tells them apart.
   Marked `windowKnown: false`; such rows are excluded from the busiest-queries
   list and from every per-query threshold, and counted in a footnote instead.
   **Found the hard way:** widening the collector in 0070 made 100 long-lived
   queries "appear" at once, so the page showed 212,079 lifetime calls under a
   heading promising this window.

   **One deliberate exception, added 2026-08-13.** The `spill-unattributed` rule
   asks a different question — *has anything accounted for this window's spill?*
   — and there, dropping first-seen rows produced a false alarm of its own: on
   08-12 four of the six spilling queries were first-seen, so 177 MB was
   discarded and the report announced it could account for only 0.9 MB of a
   113 MB window, while the missing 177 MB sat in the very array it was reading.
   That rule now credits a first-seen row **up to a physical bound**: no single
   query can have spilled more in this window than the entire database did. Under
   the bound the figure is credible as window activity; over it, it is provably a
   lifetime total and is still ignored — which is what keeps the 0070
   mass-collection scenario from laundering months of history into one window.
4. **The window is too short to extrapolate** — two snapshots two seconds apart
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

## After changing what the collector collects

The first comparison across a collector change is **degraded by construction**:
every query the new arms added counts as first-seen, so it is excluded from the
window figures. Expect a thin busiest-queries list and a likely
`spill-unattributed` warning on that one run — the spill is real, but the
queries that did it are sitting in the excluded set. It resolves by itself on
the next snapshot, once two consecutive runs share a collector. Don't chase it.

## The store rule was recalibrated once, and why

Migration 0071 watched the store's ENTRY COUNT and warned at 80% of
`pg_stat_statements.max` — 4,000 of 5,000 entries. On **2026-08-19** the database
was writing ~2.7 GB/day of temp files and that rule had not fired, because
spilling had begun at roughly **1,640 entries — 33% of max**. The alarm sat at
about 2.4x the failure point and stayed silent through the whole incident; it was
found by a human looking, not by the tracker.

The miscalibration was the wrong QUANTITY, not a badly-chosen number. 0071's own
comment reasons about "3.8 MB of query TEXT against 2.1 MB of work_mem", and used
entry count as a stand-in. But the exporter does not read the text — it
materialises whole ROWS, all ~45 columns. On 2026-08-19 that was **1,580 kB
against 911 kB of text**, a factor the proxy cannot see, and the ratio moves with
the mix of long ad-hoc SQL versus short PostgREST statements. So migration 0080
records `statements_bytes` and `work_mem_bytes` and the rule divides one by the
other.

**What actually spills, precisely.** Not the sort. Measured with `EXPLAIN` on
2026-08-19: `Sort Method: quicksort  Memory: 1616kB` — the sort fitted. The
`temp written` sat on the **Function Scan** node, because `pg_stat_statements` is
a set-returning function whose result is materialised into a tuplestore that
overflows `work_mem`. Three differently-shaped queries over the store (a sort, an
aggregate, a count) each wrote exactly 195 blocks. **Any read pays the full
cost** — a bare `select count(*)` is as expensive as a full scan.

**Why the warning line is 60% and not 100%.** `pg_column_size` sums datum sizes;
the tuplestore representation is larger. Spilling was OBSERVED at 72% by this
measure, and the true crossing is bracketed between two snapshots rather than
pinned — so 0.6 warns with roughly a week of headroom, and 0.70 is critical
because it means you are at or past the lowest level spilling has ever been seen.
The two numbers are close on purpose: this is a cliff, not a slope.

## Clearing the store on a schedule

The daily job runs with `--reset-if-needed`, which clears `pg_stat_statements`
**after the snapshot is stored** once it crosses the warn threshold.

- **Ordering is load-bearing.** Resetting first would destroy the very reading
  that justifies the reset, and the report would show a healthy empty store with
  no record of why.
- **Condition-based, not calendar-based.** A monthly job would have missed the
  2026-08-19 incident outright: the store refilled from empty to the cliff in
  **ten days** under heavy ingestion, against the "~3 months" originally
  predicted. The daily run is the clock; the threshold decides.
- **Opt-in, never the default.** A reset is irreversible — every per-query
  counter restarts. Running `npm run db:health` by hand can never wipe the
  history as a side effect of asking for a report.
- **The next report will be degraded, and says so.** `stats_reset` moves, so
  `delta.ts` correctly refuses per-query window figures and every query reads as
  first-seen for one run. The job logs that it did this deliberately, so the gap
  is not mistaken for a fault. Over half the store is one-off ingestion and audit
  SQL that will never run again (890 of 1,678 entries on 2026-08-19), so this
  discards waste rather than history anyone consults.

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
