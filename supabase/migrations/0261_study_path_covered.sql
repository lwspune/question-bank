-- 0261_study_path_covered.sql -- the board plan follows the class
-- (MENTOR_SPEC.md §18, 2026-11-15).
--
-- A week after the plan went live (0225), 83 students had started it and none
-- had finished a chapter: on plan days they practised 1,236 questions and only
-- 79 (6%) were on the plan's chapter. The plan began at chapter 1 in book
-- order; students study the chapter their class is on. "Not taught yet" was
-- one tap per chapter and 4 students used it.
--
--   study_path_covered    one row per chapter the student ticked as taught
--                         ("What has your class covered?"). The plan starts
--                         with these; an unticked chapter with no work in it
--                         waits. No rows = book order, as before.
--   study_paths.covered_at  when the student last answered the question. NULL
--                         = never asked, so the card asks (new starters after
--                         "Start my plan", and the 83 already on the plan).
--   set_path_covered()    clears and rewrites the ticks and stamps covered_at
--                         in ONE transaction, as the student (security
--                         invoker): RLS refuses anyone else's plan, and a
--                         failure leaves the old ticks whole.
--   path_chapter_work()   which of the plan's chapters the student worked on
--                         and when, from ANY practice on a chapter's questions
--                         (the bank, /board, V), not only its Top 10. The
--                         drill is left out: answering a Fix question must not
--                         pull an old chapter back to the front. Aggregated
--                         here so the app reads a row per chapter, never the
--                         student's whole activity log.
--   user_activity kinds   path_covered (metadata: ticked, skipped) and
--                         path_switched (ref = the chapter chosen, metadata:
--                         from), for the readout. The kinds below are the list
--                         read LIVE on 2026-11-15 (0230's plus 0241's
--                         v_not_understood) plus these two; widening a CHECK
--                         cannot reject an existing row. 0261 was checked free
--                         in every branch and worktree the same day.

-- ── study_paths.covered_at ─────────────────────────────────────────────
alter table public.study_paths add column covered_at timestamptz;

comment on column public.study_paths.covered_at is
  'When the student last answered "What has your class covered?" (study_path_covered). NULL = never: the card asks.';

-- ── study_path_covered ─────────────────────────────────────────────────
create table public.study_path_covered (
  path_id    uuid not null references public.study_paths(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  ticked_at  timestamptz not null default now(),
  primary key (path_id, chapter_id)
);

comment on table public.study_path_covered is
  'Chapters a student ticked as taught in class (MENTOR_SPEC.md §18). No rows = the plan runs in book order.';

create index study_path_covered_user_idx on public.study_path_covered (user_id);

alter table public.study_path_covered enable row level security;

create policy study_path_covered_select_own on public.study_path_covered
  for select to authenticated using (user_id = (select auth.uid()));
-- Writes only on the student's own ACTIVE path (0225's deferrals rule).
create policy study_path_covered_insert_own on public.study_path_covered
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.study_paths p
      where p.id = path_id and p.user_id = (select auth.uid()) and p.ended_at is null
    )
  );
create policy study_path_covered_delete_own on public.study_path_covered
  for delete to authenticated
  using (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.study_paths p
      where p.id = path_id and p.user_id = (select auth.uid()) and p.ended_at is null
    )
  );

-- ── set_path_covered ───────────────────────────────────────────────────
-- Whole set at once: the checklist is saved, not toggled, so a half-written
-- set would be a plan the student never chose. A plan holds at most 47
-- chapters (HSC PCM); 80 leaves room without letting a caller flood it.
create or replace function public.set_path_covered(p_path uuid, p_chapters uuid[])
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user uuid := (select auth.uid());
begin
  if v_user is null then
    raise exception 'sign in first' using errcode = '42501';
  end if;
  if coalesce(cardinality(p_chapters), 0) > 80 then
    raise exception 'too many chapters' using errcode = '22023';
  end if;

  update public.study_paths
     set covered_at = now()
   where id = p_path and user_id = v_user and ended_at is null;
  if not found then
    raise exception 'not your active plan' using errcode = '42501';
  end if;

  delete from public.study_path_covered where path_id = p_path;
  insert into public.study_path_covered (path_id, user_id, chapter_id)
  select p_path, v_user, c
    from (select distinct unnest(coalesce(p_chapters, '{}'::uuid[])) as c) t;
end;
$$;

revoke all on function public.set_path_covered(uuid, uuid[]) from public, anon;
grant execute on function public.set_path_covered(uuid, uuid[]) to authenticated;

-- ── path_chapter_work ──────────────────────────────────────────────────
-- Security invoker: a student's RLS on user_activity returns their own rows
-- only, whatever p_user says; the service role (the staff view of /me, the
-- readout) reads the student it names. The uuid guard keeps a malformed
-- ref_id from failing the cast; ref_id is a question id on these kinds.
create or replace function public.path_chapter_work(p_user uuid, p_since timestamptz, p_chapters uuid[])
returns table (chapter_id uuid, last_at timestamptz)
language sql
stable
security invoker
set search_path = ''
as $$
  with acts as (
    select case
             when a.ref_id ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
             then a.ref_id::uuid
           end as question_id,
           max(a.created_at) as at
      from public.user_activity a
     where a.user_id = p_user
       and a.kind in ('question_practiced', 'answer_wrong', 'answer_correct', 'self_mark')
       and a.created_at >= p_since
       and coalesce(a.metadata->>'surface', '') <> 'drill'
     group by 1
  )
  select q.chapter_id, max(acts.at) as last_at
    from acts
    join public.questions q on q.id = acts.question_id
   where acts.question_id is not null
     and q.chapter_id = any(p_chapters)
   group by q.chapter_id;
$$;

revoke all on function public.path_chapter_work(uuid, timestamptz, uuid[]) from public, anon;
grant execute on function public.path_chapter_work(uuid, timestamptz, uuid[]) to authenticated, service_role;

-- ── user_activity kinds ────────────────────────────────────────────────
alter table public.user_activity drop constraint user_activity_kind_ck;

alter table public.user_activity add constraint user_activity_kind_ck check (kind in (
  'mock_submitted',
  'mock_started',
  'answer_wrong',
  'answer_correct',
  'chapter_mastered',
  'note_checkpoint',
  'question_bookmarked',
  'question_practiced',
  'quiz_taken',
  'drill_completed',
  'surface_viewed',
  'drill_started',
  'goal_set',
  'paywall_event',
  'email_clicked',
  'milestone_reached',
  'push_clicked',
  'self_mark',
  'solution_visual',
  'path_chapter_done',
  'path_paced',
  'v_not_understood',
  'path_covered',
  'path_switched'
));
