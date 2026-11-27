-- 0293_learn_chemistry_biology.sql: Learn courses in Chemistry and Biology (2026-11-27).
--
-- WHAT: learn_courses.subject (migration 0192) takes 'chemistry' and 'biology'
-- as well as 'maths' and 'physics'; learn_my_misses (0194) names each row's
-- subject (below).
--
-- WHY: Concept Ladder now writes every course it has with chapters, in every
-- subject: 27 courses (Maths, Physics, Chemistry and Biology) across CBSE 11
-- and 12, Maharashtra Std IX to XII, MHT-CET, JEE Main, NEET and NDA, where the
-- Learn import had three Maths courses. The owner OK'd importing them all on
-- 2026-11-27, so V's Teach me can play a Learn lesson in those chapters too.
-- The CHECK named only the two subjects 0192 knew, and refused the rest
-- (23514 on learn_seed_courses).
--
-- The list stays a CHECK, not a lookup table: a subject needs code anyway (its
-- name in src/lib/learn/subjects.ts, the bank subject its chapters link to), so
-- a new one is a migration and a code change in the same branch, as here.
-- Widening a CHECK cannot invalidate an existing row.

alter table public.learn_courses drop constraint learn_courses_subject_check;

alter table public.learn_courses
  add constraint learn_courses_subject_check check (subject in ('maths', 'physics', 'chemistry', 'biology'));

-- learn_my_misses (0194) names each row's SUBJECT and counts by subject AND
-- chapter. It counted by chapter name alone, which was safe while every course
-- was Maths; two subjects of one exam can share a chapter name (CBSE Class 11
-- and NEET each have a Physics and a Chemistry "Thermodynamics"), and a
-- Chemistry miss would have shown on the Physics course's "From your mistakes".
-- The app matches on subject + chapter where a row has a subject and on the
-- name alone where it has none, so code and migration can ship in either order.
-- Same signature, so create or replace keeps 0194's grants.

create or replace function public.learn_my_misses(p_exam text) returns jsonb
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
    select su.name as subject, c.name as chapter, count(*)::int as misses, max(l.created_at) as last_missed_at
    from latest l
    join public.questions q on q.id = l.ref_id::uuid
    join public.chapters c on c.id = q.chapter_id
    join public.subjects su on su.id = c.subject_id
    join public.exams e on e.id = su.exam_id
    where l.kind = 'answer_wrong' and e.name = p_exam
    group by su.name, c.name
  )
  select coalesce(jsonb_agg(jsonb_build_object('subject', subject, 'chapter', chapter, 'misses', misses, 'last_missed_at', last_missed_at)
    order by misses desc, subject, chapter), '[]'::jsonb)
  from by_chapter
$$;
