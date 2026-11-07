-- 0227_paid_reveals_today_index.sql -- the answer wall's count uses the questions index.
--
-- Why: 0211 joined `q.id::text = a.ref_id`. Casting the question id to text
-- leaves Postgres no index to use, so every call read all ~124k questions
-- (767 ms, 22,446 buffers, measured 2026-11-07). Under load ~7% of calls passed
-- the 8 s statement timeout; GET /api/me/reveals then answered "no limit" and
-- the page stayed unlimited until reload. One student opened 68 answers past a
-- limit of 15 that way, and ~17 students hit the timeout that day.
--
-- Fix: cast the activity row's id to uuid instead, guarded by a uuid pattern so
-- an id that is no uuid never raises (the pattern get_own_progress_card already
-- uses). The join is then an index lookup on questions_pkey: 25 ms, 564
-- buffers, same plan input. Results are unchanged: an id that is no question
-- (or no uuid) still finds no question and still counts, as in 0211.
-- Signature, SECURITY DEFINER, auth.uid() scoping and grants are as in 0211.

create or replace function public.my_paid_reveals_today(p_since timestamptz, p_surfaces text[])
returns text[]
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(array_agg(distinct a.ref_id), array[]::text[])
  from public.user_activity a
  left join public.questions q
    on q.id = case
      when a.ref_id ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
      then a.ref_id::uuid
    end
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
