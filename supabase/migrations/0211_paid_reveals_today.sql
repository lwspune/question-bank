-- 0211_paid_reveals_today.sql -- the answer wall counts paid exams only.
--
-- Why: 0210 made the Class 9-10 exams free. The daily answer limit is counted
-- from the day's question_practiced rows (lib/questions/revealQuota.ts), and a
-- free exam's answers must not use up a student's answers on paid exams. The
-- row carries only a question id, so the exam is a join, and a free exam's
-- question may be PRIVATE to its org: SECURITY DEFINER reads past that, which
-- is why the function reads the CALLER's own rows only (auth.uid(), no user
-- argument) and returns question ids the caller already holds.
--
-- Same surfaces and rules as loadRevealedToday: a row with no surface predates
-- 0107 and is the bank.

create or replace function public.my_paid_reveals_today(p_since timestamptz, p_surfaces text[])
returns text[]
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(array_agg(distinct a.ref_id), array[]::text[])
  from public.user_activity a
  left join public.questions q on q.id::text = a.ref_id
  where a.user_id = auth.uid()
    and a.kind = 'question_practiced'
    and a.created_at >= p_since
    and a.ref_id is not null
    and (a.metadata->>'surface' is null or a.metadata->>'surface' = any (p_surfaces))
    -- An id that is no question (or none we can find) counts, as before.
    and coalesce(private.exam_pass_scope(q.exam_id), 'mocks') <> 'free';
$$;

revoke all on function public.my_paid_reveals_today(timestamptz, text[]) from public, anon;
grant execute on function public.my_paid_reveals_today(timestamptz, text[]) to authenticated;
