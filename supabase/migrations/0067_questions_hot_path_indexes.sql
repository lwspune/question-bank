-- Performance: index the two hottest read paths on `questions`.
--
-- Diagnosis (2026-08-07, prod `pg_stat_statements` over a 91-day window):
-- the database spent 2,626 minutes executing queries, and 62% of that went to
-- two shapes that were doing enormous amounts of avoidable work. Nothing was
-- reading disk — cache hit was 100.0% on every hot query and `temp_blks_written`
-- was 0 — so this is pure CPU spent scanning buffers, NOT the disk-IO problem
-- fixed on 2026-08-05 (that one is genuinely gone).
--
-- `questions` carried 14 indexes and NOT ONE on `subtopic_id`.
--
--
-- (1) questions_subtopic_kind_idx — 1,320 min (50% of all DB time)
--
-- Two /notes components ask "how many questions are in this subtopic?":
--   src/app/notes/_components/NotesSubtopicPage.tsx:141   (660,121 calls)
--     .select("id", { count: "exact", head: true })
--     .eq("subtopic_id", …).eq("question_kind", "pyq")
--   src/app/notes/_components/NotesChapterLanding.tsx:61  (157,400 calls)
--     .select("subtopic_id").in("subtopic_id", …).eq("question_kind", "pyq")
--
-- With no index on subtopic_id the planner fell back to
-- questions_question_kind_idx (org_id, question_kind) and filtered:
--
--   Index Scan using questions_question_kind_idx on questions
--     Index Cond: (question_kind = 'practice')
--     Filter:     (subtopic_id = '41488206-…')
--     Rows Removed by Filter: 15169        <- to return 27
--     Buffers: shared hit=2653
--   Execution Time: 1775.878 ms            (LIMIT 25 half)
--   Execution Time:  538.051 ms            (count half)
--
-- Neither call sits in a JS loop. The multiplier is that both pages set
-- `revalidate = 86400` + `generateStaticParams`, so EVERY build re-renders the
-- whole /notes tree: 377 subtopic pages + 83 chapter landings. Observed call
-- ratio 660,121/157,400 = 4.19 against the structural ratio 377/83 = 4.54 —
-- the two shapes are locked at the /notes fan-out ratio, which is the
-- signature of build-time prerendering (~20 full-tree renders/day: 3 builds
-- per push × ~5 pushes/day, plus daily ISR).
--
-- Both queries exist to render one integer.
--
-- Column order is (subtopic_id, question_kind), not the reverse: subtopic_id is
-- far more selective, and leading with it also serves the subtopic-only lookups
-- in src/lib/questions/query.ts (`.in("subtopic_id", …)` when kind = 'all',
-- which applies no question_kind predicate at all). `visibility` is deliberately
-- NOT included — the RLS predicate needs it, but re-checking ~27 heap rows is
-- free, and a partial `WHERE visibility = 'PUBLIC'` index (the pattern used by
-- questions_public_filters_idx) would not serve org members reading their own
-- PRIVATE rows through the same code path.
--
--
-- (2) questions_pyq_year_idx + get_pyq_years() rewrite — 303 min (12%)
--
-- get_pyq_years() (migration 0019) seq-scanned all 42,536 rows and sorted
-- 27,340 values to return ELEVEN integers:
--
--   Aggregate -> Sort (27,340 rows, quicksort 769kB) -> Seq Scan on questions
--     Buffers: shared hit=6881
--   Execution Time: 2976.353 ms
--
-- 52,007 calls (38,095 anon @ 248 ms mean, 13,912 authenticated @ 617 ms,
-- max 7,930 ms). The `anon` role's statement_timeout is 3s and this ran at
-- 2.98s, which made it the single largest producer of the ~18 "canceling
-- statement due to statement timeout" errors per hour in the Postgres log.
--
-- Replaced with a loose index scan (recursive skip scan): ~11 index descents
-- instead of a 42,536-row scan. A plain `SELECT DISTINCT` would NOT have been
-- enough — RLS has to check `visibility`, which is not in the index, so the
-- scan cannot go index-only and would still touch 27,340 heap rows.
--
-- Semantics are UNCHANGED and were verified against the old implementation on
-- production data before this migration was written — both return exactly
-- {2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016}. `security invoker`
-- is preserved, so RLS still scopes the result per caller (anon sees years on
-- PUBLIC rows; org members additionally see their own org's PRIVATE rows) —
-- each subquery inside the CTE is RLS-filtered independently.
--
-- Reversal: `drop index` on both, and restore the 0019 function body (kept
-- verbatim in the comment above the new definition).
--
-- Applied with plain CREATE INDEX rather than CONCURRENTLY: the MCP applies a
-- migration inside a transaction, where CONCURRENTLY is not permitted, and at
-- 42,536 rows the ACCESS EXCLUSIVE lock is sub-second.

create index if not exists questions_subtopic_kind_idx
  on public.questions (subtopic_id, question_kind);

comment on index public.questions_subtopic_kind_idx is
  'Serves the /notes per-subtopic question counts (NotesSubtopicPage + NotesChapterLanding) and the subtopic filter in queryQuestions. Before this index those scanned ~15k rows to return ~27.';

create index if not exists questions_pyq_year_idx
  on public.questions (pyq_year)
  where pyq_year is not null;

comment on index public.questions_pyq_year_idx is
  'Supports the loose index scan in get_pyq_years(). Partial: the function only ever looks at non-null years.';

-- Previous body (migration 0019), kept for reversal:
--   select coalesce(
--     array_agg(distinct pyq_year order by pyq_year desc),
--     '{}'::int[]
--   )
--   from public.questions
--   where pyq_year is not null;
create or replace function public.get_pyq_years()
returns int[]
language sql
stable
security invoker
set search_path = ''
as $$
  with recursive skip as (
    -- Anchor: the earliest visible year.
    (select min(pyq_year) as y from public.questions where pyq_year is not null)
    union all
    -- Step: the next visible year strictly greater than the previous one.
    -- Terminates when the subquery returns NULL (no higher year remains); the
    -- outer WHERE then drops that trailing NULL row.
    (select (select min(q.pyq_year)
               from public.questions q
              where q.pyq_year > skip.y)
       from skip
      where skip.y is not null)
  )
  select coalesce(array_agg(y order by y desc), '{}'::int[])
  from skip
  where y is not null;
$$;

comment on function public.get_pyq_years() is
  'Returns the descending-sorted distinct non-null pyq_year values visible to the caller. Bypasses the PostgREST row cap. RLS-safe (security invoker). Implemented as a loose index scan over questions_pyq_year_idx — ~11 index descents rather than a full table scan (migration 0067).';
