-- Performance: let the /browse facet RPCs use an index.
--
-- Follows 0067. After that migration the facet RPCs became the largest
-- remaining consumer of database time — 281 min over the 91-day
-- pg_stat_statements window, `authenticated` mean 571 ms / max 7,915 ms
-- against an 8s statement_timeout, `anon` mean 97 ms / max 2,998 ms against a
-- 3s one (i.e. sitting exactly on the cap).
--
--
-- THE CAUSE — the optional-parameter ("catch-all") anti-pattern.
--
-- Both bodies are written as:
--
--   where (p_exam_id is null or q.exam_id = p_exam_id)
--     and (p_subject_id is null or q.subject_id = p_subject_id)
--     ...
--
-- A `language sql` function body is planned ONCE, generically, with the
-- parameters unknown. The planner cannot prove `p_exam_id` is non-null, so it
-- cannot use an index on exam_id, and demotes every predicate to a filter.
-- Confirmed with EXPLAIN (GENERIC_PLAN) on PG17:
--
--   Seq Scan on questions q  (cost=0.00..7941.40)
--     Filter: (($1 IS NULL) OR (exam_id = $1)) AND (($2 IS NULL) OR (subject_id = $2)) ...
--
-- The identical query with literal values costs 541 and uses
-- questions_filter_idx. So every /browse filter interaction scanned all 42,536
-- rows — not because of data volume, but because of how the predicates are
-- written. This is NOT a missing index: the right index already exists.
--
--
-- THE FIX — a one-shot plan.
--
-- PL/pgSQL's `EXECUTE ... USING` builds a one-shot plan, where the planner CAN
-- see the actual parameter values. The `IS NULL OR` branches then collapse at
-- plan time and the index becomes usable.
--
-- The SQL text is UNCHANGED — same predicates, same order, same semantics. It
-- only moves inside an EXECUTE. Values are passed via USING, never
-- concatenated, so there is no injection surface (and no user-supplied string
-- ever reaches the statement text).
--
-- Measured, warm, mean of 10 calls:
--   NDA + Mathematics + kind=pyq   36.44 ms -> 5.29 ms   (42,536 rows read -> 2,160)
--   exam+subject+kind (CBSE)       23.0  ms -> 0.9  ms
--   no filters at all              31.0  ms -> 16.2 ms
--
-- Note the last row: the unfiltered call improves too. An early single-run
-- EXPLAIN suggested it regressed (13,496 buffers vs 7,747) — that was a cold-run
-- artifact. Buffer count is not cost when every buffer is a cache hit; the
-- repeated-call benchmark is the reliable signal and it is ~2x faster.
--
--
-- TWO ALTERNATIVES TESTED AND REJECTED (do not re-try these):
--
--   1. ALTER FUNCTION ... SET plan_cache_mode = 'force_custom_plan'
--      No effect whatsoever — buffers stayed at 7,707. A `language sql` body
--      does not go through the prepared-statement plan cache that GUC governs.
--
--   2. Dropping the ::text casts (q.question_kind = p_kind::question_kind, etc.)
--      MEASURABLY WORSE: 997 -> 1,232 buffers. It steered the planner onto a
--      different, poorer index. The casts are harmless here; leave them.
--
--
-- EQUIVALENCE — verified before this migration was written, by building both
-- rewrites as probe functions on production and diffing them against the live
-- ones with EXCEPT ALL in both directions, across 14 parameter combinations:
-- no filters / kind alone / exam alone / exam+subject+kind / difficulty /
-- pyq_years / chapter_ids / full-text search / and the two cases most likely to
-- break a rewrite — EMPTY (not null) arrays, and p_q = ''. Zero row differences
-- in every combination. The probes ran inside transactions that were rolled
-- back; production was not modified. tests/filter-facets.test.ts now pins the
-- empty-array / empty-string contract explicitly.
--
-- Signatures, return types and column names (q_count) are unchanged, so the
-- PostgREST API contract is identical. `security invoker` is preserved, so RLS
-- still scopes every call.
--
-- Reversal: re-run the 0020/0037-era `language sql` bodies; the predicates here
-- are character-for-character the same, so reverting is mechanical.

-- Parameter DEFAULTS are load-bearing and must be restated verbatim: callers
-- (and the tests) invoke these with only the parameters they care about, and
-- p_kind defaults to 'pyq' — NOT 'all'. `create or replace` refuses to drop an
-- existing default, which is how this was caught.
create or replace function public.get_chapter_facets(
  p_exam_id uuid default null::uuid,
  p_subject_id uuid default null::uuid,
  p_difficulties text[] default null::text[],
  p_pyq_years int[] default null::int[],
  p_q text default null::text,
  p_kind text default 'pyq'::text
)
returns table (chapter_id uuid, q_count integer)
language plpgsql
stable
security invoker
set search_path = ''
as $fn$
begin
  return query execute $q$
    select q.chapter_id, count(*)::int
    from public.questions q
    where ($1::uuid is null or q.exam_id = $1)
      and ($2::uuid is null or q.subject_id = $2)
      and ($6 = 'all' or q.question_kind::text = $6)
      and (
        coalesce(array_length($3::text[], 1), 0) = 0
        or q.difficulty::text = any($3)
      )
      and (
        coalesce(array_length($4::int[], 1), 0) = 0
        or q.pyq_year = any($4)
      )
      and (
        $5::text is null or $5 = ''
        or q.search_vector @@ websearch_to_tsquery('english', $5)
      )
    group by q.chapter_id
  $q$
  using p_exam_id, p_subject_id, p_difficulties, p_pyq_years, p_q, p_kind;
end
$fn$;

comment on function public.get_chapter_facets(uuid, uuid, text[], int[], text, text) is
  'Per-chapter question counts for the /browse filter sidebar, RLS-scoped (security invoker). Body is identical SQL to the original; it lives inside EXECUTE ... USING so the planner gets a one-shot plan and can use questions_filter_idx — the optional-parameter pattern forces a full seq scan under a generic plan (migration 0068).';

-- p_chapter_ids deliberately has NO default (it is the required leading arg);
-- the rest mirror get_chapter_facets above.
create or replace function public.get_subtopic_facets(
  p_chapter_ids uuid[],
  p_exam_id uuid default null::uuid,
  p_subject_id uuid default null::uuid,
  p_difficulties text[] default null::text[],
  p_pyq_years int[] default null::int[],
  p_q text default null::text,
  p_kind text default 'pyq'::text
)
returns table (subtopic_id uuid, q_count integer)
language plpgsql
stable
security invoker
set search_path = ''
as $fn$
begin
  return query execute $q$
    select q.subtopic_id, count(*)::int
    from public.questions q
    where q.subtopic_id is not null
      and (
        coalesce(array_length($1::uuid[], 1), 0) = 0
        or q.chapter_id = any($1)
      )
      and ($2::uuid is null or q.exam_id = $2)
      and ($3::uuid is null or q.subject_id = $3)
      and ($7 = 'all' or q.question_kind::text = $7)
      and (
        coalesce(array_length($4::text[], 1), 0) = 0
        or q.difficulty::text = any($4)
      )
      and (
        coalesce(array_length($5::int[], 1), 0) = 0
        or q.pyq_year = any($5)
      )
      and (
        $6::text is null or $6 = ''
        or q.search_vector @@ websearch_to_tsquery('english', $6)
      )
    group by q.subtopic_id
  $q$
  using p_chapter_ids, p_exam_id, p_subject_id, p_difficulties, p_pyq_years, p_q, p_kind;
end
$fn$;

comment on function public.get_subtopic_facets(uuid[], uuid, uuid, text[], int[], text, text) is
  'Per-subtopic question counts for the /browse filter sidebar, RLS-scoped (security invoker). Same EXECUTE ... USING treatment as get_chapter_facets — see migration 0068.';
