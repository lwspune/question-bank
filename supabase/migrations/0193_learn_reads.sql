-- 0193_learn_reads.sql -- the reads the Learn pages make, beside 0192.
--
-- Why: lesson pages are cached (one copy for everyone, so they rank in search), and each
-- student's progress loads after the page opens. A student may read their own
-- learn_concept_state and learn_attempts rows (0192), but those carry concept and item ids,
-- and the content tables that turn an id into a chapter and concept code are server-only.
-- These return the student's own rows already keyed by chapter slug + concept code, as
-- auth.uid() (never a passed-in id), so no request path needs the service role.
--
-- learn_course_list is for anyone: the course picker on /learn.

create function public.learn_my_progress(p_chapters text[] default null) returns jsonb
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
    'next_review_at', s.next_review_at
  ) order by ch.slug, c.position), '[]'::jsonb)
  from public.learn_concept_state s
  join public.learn_concepts c on c.id = s.concept_id
  join public.learn_chapters ch on ch.id = c.chapter_id
  where s.user_id = (select auth.uid())
    and (p_chapters is null or ch.slug = any (p_chapters))
$$;

-- One concept's answers by this student, oldest first: the input to the next-question rule.
create function public.learn_my_attempts(p_chapter text, p_concept text) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object('item_id', a.item_id, 'correct', a.correct) order by a.id), '[]'::jsonb)
  from public.learn_attempts a
  join public.learn_items i on i.id = a.item_id
  join public.learn_concepts c on c.id = i.concept_id
  join public.learn_chapters ch on ch.id = c.chapter_id
  where a.user_id = (select auth.uid())
    and ch.slug = p_chapter and c.slug = p_concept
$$;

create function public.learn_course_list() returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'slug', slug, 'title', title, 'exam', exam_slug, 'subject', subject, 'standard', standard
  ) order by exam_slug, subject), '[]'::jsonb)
  from public.learn_courses
$$;

revoke execute on function public.learn_my_progress(text[]), public.learn_my_attempts(text, text), public.learn_course_list()
  from public, anon, authenticated;
grant execute on function public.learn_my_progress(text[]), public.learn_my_attempts(text, text) to authenticated, service_role;
grant execute on function public.learn_course_list() to anon, authenticated, service_role;
