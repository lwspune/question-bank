-- 0192_learn_personal.sql -- the reads that personalise the Learn pages, beside 0190/0191.
--
-- Why (owner, 2026-10-27: "no personalisation currently"): Learn lives inside PYQ Vault, so it can
-- use what PYQ Vault already knows about a student. Two reads, both for auth.uid() only:
--
-- 1. learn_my_progress gains `updated_at`, so "Continue where you left off" is the concept the
--    student last worked on, not merely the first unfinished one in the course.
--
-- 2. learn_my_misses(exam): the student's questions in one exam whose LATEST answer is still wrong
--    (answer_wrong / answer_correct in user_activity, migration 0052: mocks, chapter tests, the
--    board reader, the drill), counted by bank chapter. The Learn course pages turn this into
--    "From your mistakes: learn the ideas behind them". A question fixed later no longer counts,
--    the drill's own notion of a mistake that is still open.
--
-- user_activity.ref_id is text; only uuid-shaped refs are cast, so a stray ref cannot fail the read.

create or replace function public.learn_my_progress(p_chapters text[] default null) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'chapter', ch.slug,
    'code', c.code,
    'slug', c.slug,
    'title', c.title,
    'state', s.state,
    'streak', s.streak,
    'to_retry', s.to_retry,
    'review_box', s.review_box,
    'review_correct', s.review_correct,
    'next_review_at', s.next_review_at,
    'updated_at', s.updated_at
  ) order by ch.slug, c.position), '[]'::jsonb)
  from public.learn_concept_state s
  join public.learn_concepts c on c.id = s.concept_id
  join public.learn_chapters ch on ch.id = c.chapter_id
  where s.user_id = (select auth.uid())
    and (p_chapters is null or ch.slug = any (p_chapters))
$$;

create function public.learn_my_misses(p_exam text) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  with latest as (
    select distinct on (ua.ref_id) ua.ref_id, ua.kind, ua.created_at
    from public.user_activity ua
    where ua.user_id = (select auth.uid())
      and ua.kind in ('answer_wrong', 'answer_correct')
      and ua.ref_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    order by ua.ref_id, ua.created_at desc
  ),
  by_chapter as (
    select c.name as chapter, count(*)::int as misses, max(l.created_at) as last_missed_at
    from latest l
    join public.questions q on q.id = l.ref_id::uuid
    join public.chapters c on c.id = q.chapter_id
    join public.subjects su on su.id = c.subject_id
    join public.exams e on e.id = su.exam_id
    where l.kind = 'answer_wrong' and e.name = p_exam
    group by c.name
  )
  select coalesce(jsonb_agg(jsonb_build_object('chapter', chapter, 'misses', misses, 'last_missed_at', last_missed_at)
    order by misses desc, chapter), '[]'::jsonb)
  from by_chapter
$$;

revoke execute on function public.learn_my_progress(text[]), public.learn_my_misses(text) from public, anon, authenticated;
grant execute on function public.learn_my_progress(text[]), public.learn_my_misses(text) to authenticated, service_role;
