-- /browse question-format filter (migrations 0041 + 0061) — facet awareness.
--
-- The `question_format` axis has been queryable since 0041/0061 but had no
-- filter control. Adding one to the sidebar without teaching the facet RPCs
-- about it reproduces, exactly, the defect migration 0037 fixed for the
-- PYQ/Practice toggle: the accordion keeps printing the unfiltered total while
-- the list shows the filtered subset.
--
-- Measured on the live bank, 2026-08-16 — MH State Board Class 11, format=mcq:
--
--   Determinants and Matrices    sidebar (264)   list 20
--   Complex Numbers              sidebar (254)   list 10
--   Functions                    sidebar (252)   list 10
--
-- ~13-25x on precisely the exams the filter exists for. It also defeats the
-- hide-zero-count rule in mergeAndSortFacets: a chapter holding 180 subjective
-- questions and no MCQs would still render (180) and invite a click that
-- returns nothing.
--
--
-- WHY DROP-THEN-CREATE, AND NOT `create or replace`.
--
-- Adding a parameter — even a defaulted one — produces a DIFFERENT signature,
-- so `create or replace` leaves the 6-arg function in place and defines a
-- second 7-arg overload beside it. Every existing 6-named-arg call is then
-- ambiguous and PostgREST 300s. 0037 dropped the old signature for the same
-- reason when it introduced p_kind; this repeats that.
--
-- Backward compatible in the other direction, which matters because the
-- database is shared with the DEPLOYED app: p_format defaults to 'all', so the
-- currently-live callers (which pass six named args and know nothing about
-- format) resolve to the new function and behave identically.
--
-- The bodies are otherwise UNCHANGED — same predicates in the same order, still
-- inside `EXECUTE ... USING` so the planner gets a one-shot plan and can use
-- questions_filter_idx. Rewriting these as `language sql` would silently
-- reinstate the seq scan 0068 removed; see that migration before touching them.
-- Values continue to travel via USING, never concatenation.
--
-- Parameter DEFAULTS are load-bearing and restated verbatim: p_kind defaults to
-- 'pyq', NOT 'all'.

drop function if exists public.get_chapter_facets(uuid, uuid, text[], int[], text, text);
drop function if exists public.get_subtopic_facets(uuid[], uuid, uuid, text[], int[], text, text);

create or replace function public.get_chapter_facets(
  p_exam_id uuid default null::uuid,
  p_subject_id uuid default null::uuid,
  p_difficulties text[] default null::text[],
  p_pyq_years int[] default null::int[],
  p_q text default null::text,
  p_kind text default 'pyq'::text,
  p_format text default 'all'::text
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
      and ($7 = 'all' or q.question_format::text = $7)
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
  using p_exam_id, p_subject_id, p_difficulties, p_pyq_years, p_q, p_kind, p_format;
end
$fn$;

comment on function public.get_chapter_facets(uuid, uuid, text[], int[], text, text, text) is
  'Per-chapter question counts for the /browse filter sidebar, RLS-scoped (security invoker). Body lives inside EXECUTE ... USING so the planner gets a one-shot plan and can use questions_filter_idx (migration 0068). p_format added in 0078 so the counts agree with the format filter.';

-- p_chapter_ids deliberately has NO default (it is the required leading arg);
-- the rest mirror get_chapter_facets above.
create or replace function public.get_subtopic_facets(
  p_chapter_ids uuid[],
  p_exam_id uuid default null::uuid,
  p_subject_id uuid default null::uuid,
  p_difficulties text[] default null::text[],
  p_pyq_years int[] default null::int[],
  p_q text default null::text,
  p_kind text default 'pyq'::text,
  p_format text default 'all'::text
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
      and ($8 = 'all' or q.question_format::text = $8)
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
  using p_chapter_ids, p_exam_id, p_subject_id, p_difficulties, p_pyq_years, p_q, p_kind, p_format;
end
$fn$;

comment on function public.get_subtopic_facets(uuid[], uuid, uuid, text[], int[], text, text, text) is
  'Per-subtopic question counts for the /browse filter sidebar, RLS-scoped (security invoker). Same EXECUTE ... USING treatment as get_chapter_facets (0068); p_format added in 0078.';


-- Which exams hold more than one format — the VISIBILITY input for the filter.
--
-- Five of eleven exams (NDA, MHT-CET, NEET, Foundation Course, Worksheets —
-- 29,524 PUBLIC questions) are 100% MCQ, where the control could only ever be a
-- no-op, so it is hidden there. That decision needs a per-exam reading of the
-- bank, and this is it: ~30 rows in one round trip, read once per hour behind
-- unstable_cache rather than per render (/browse is already the largest single
-- consumer of this database's time).
--
-- Grouped in SQL, never derived from a row payload — the PostgREST 1000-row
-- truncation trap has bitten this codebase five times.
--
-- `security invoker`, so RLS scopes it. Its only caller reads through the ANON
-- client, which is what makes caching the result legal: an authenticated
-- caller's rows would include their org's PRIVATE questions and must not be
-- shared between viewers.
create or replace function public.get_format_mix()
returns table (
  exam_id uuid,
  question_kind text,
  question_format text,
  q_count integer
)
language sql
stable
security invoker
set search_path = ''
as $fn$
  select q.exam_id,
         q.question_kind::text,
         q.question_format::text,
         count(*)::int
  from public.questions q
  group by q.exam_id, q.question_kind, q.question_format;
$fn$;

comment on function public.get_format_mix() is
  'Per (exam, kind, format) question counts, RLS-scoped. Decides whether the /browse format filter is rendered at all — it is hidden on the five exams that are 100% MCQ. Cached hourly against the anon client; see src/lib/questions/formatMix.ts (migration 0078).';
