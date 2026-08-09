-- Scope get_chapter_last_added() to one subject, and drop the bank-wide variant
-- added minutes earlier in 0072.
--
-- WHY 0072 WAS WRONG. Its unscoped aggregate had to walk every PUBLIC pyq row in
-- the bank. Measured on prod:
--
--   HashAggregate (actual rows=421)
--     -> Index Scan using questions_question_kind_idx (actual rows=25026)
--          Filter: visibility = 'PUBLIC'
--          Buffers: shared hit=6144
--   Execution Time: 5430.957 ms
--
-- `questions_question_kind_idx` is (org_id, question_kind) and carries neither
-- chapter_id nor created_at, so every one of those 25,026 rows was a heap fetch —
-- 48 MB touched to produce 421 rows. At 5.4s it sat close enough to the anon
-- role's statement timeout that it FAILED INTERMITTENTLY: a standalone probe
-- returned all 421 rows, while the same call from the running app was cancelled
-- ("canceling statement due to statement timeout"). The sitemap silently fell
-- back to the build date for every pyq exam — JEE Mains, MHT-CET, MH-SSC-10 —
-- which is precisely the defect the whole change exists to remove, reintroduced
-- through a swallowed error.
--
-- WHY NOT AN INDEX. A covering partial index on (question_kind, chapter_id,
-- created_at) WHERE visibility='PUBLIC' would fix the plan, and it was the
-- obvious move. But `questions` is the most heavily written table here — every
-- ingest inserts thousands of rows — and this project has already spent a session
-- tracing disk-IO exhaustion to write amplification. Paying a permanent write
-- cost on every future ingest, to speed up a read that happens ONCE A DAY behind
-- an unstable_cache, is the wrong trade.
--
-- THE ACTUAL FIX. The caller already loops per subject (it calls
-- get_chapter_facets once per subject anyway), so the aggregate can be scoped to
-- match and ride the EXISTING questions_filter_idx (visibility, exam_id,
-- subject_id, created_at). Re-measured on the largest subject in the bank,
-- JEE Mains Maths at 3,556 rows:
--
--   HashAggregate (actual rows=27)
--     -> Index Scan using questions_filter_idx (actual rows=3556)
--   Execution Time: 88.686 ms
--
-- ~61x faster, no new index, and it now runs inside the per-subject Promise.all
-- so it adds no extra round-trip. It also degrades gracefully: a slow subject can
-- only cost that subject's dates, never every pyq exam at once.

drop function if exists public.get_chapter_last_added(public.question_kind);

create or replace function public.get_chapter_last_added(
  p_subject_id uuid,
  p_kind public.question_kind
)
returns table (chapter_id uuid, last_added timestamptz)
language sql
stable
security invoker
set search_path = ''
as $$
  select q.chapter_id, max(q.created_at) as last_added
  from public.questions q
  where q.subject_id = p_subject_id
    and q.visibility = 'PUBLIC'
    and q.question_kind = p_kind
    and q.chapter_id is not null
  group by q.chapter_id;
$$;

comment on function public.get_chapter_last_added(uuid, public.question_kind) is
  'Newest PUBLIC question per chapter within one subject. Feeds the sitemap <lastmod> of /questions/<exam>/<subject>/<chapter>.';

revoke execute on function public.get_chapter_last_added(uuid, public.question_kind) from public;
grant execute on function public.get_chapter_last_added(uuid, public.question_kind) to anon, authenticated, service_role;
