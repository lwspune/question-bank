-- 0228_claim_reveal.sql -- the server decides every answer of the daily limit.
--
-- Why: the signed-in daily answer limit (0134) was decided in the BROWSER from
-- a copy of today's count fetched once per page load, and any failure to get
-- that copy (the count timing out, the limits read failing, the sign-in check
-- failing) left the student unlimited until a full reload. The copy also never
-- saw other tabs, V's explanations or answers still waiting in the beacon. In
-- the 30 days to 2026-11-08, ten student-days without a pass went past the
-- limit, ~190 answers; four are confirmed by the timeouts 0227 fixed.
--
-- Now one function decides, at the moment a student opens a NEW answer:
--   claim_reveal(question, surface)  checks the question's exam (free exam,
--   pass for that exam, staff), the limit, today's board-path questions (0225),
--   whether this answer is already open today, and records it if it fits, all
--   in one transaction, serialised per student so two tabs can never both take
--   the last free answer. Called straight from the browser with the student's
--   own login, and by V's explain_question (lib/chat/questionReveal.ts).
--
--   daily_reveals  the count of record: one row per student, IST day and
--   question. `counts` is false for a free exam's question (0210/0211). Read by
--   GET /api/me/reveals for the display copy, so what a page shows and what
--   the server enforces are the same rows. Only this migration's functions
--   write it.
--
--   The trigger on user_activity copies every recorded answer of a counted
--   surface into daily_reveals. Tabs opened before a deploy keep running the
--   old browser code, which records through the beacon without claiming; with
--   the trigger their answers still count, whichever code recorded them. It
--   never fails the activity insert it rides on.
--
-- The answers are still in the cached page (SEO), so reading the page source
-- is not stopped; everything the site's own buttons do is.

-- ── the count of record ────────────────────────────────────────────────
create table public.daily_reveals (
  user_id     uuid not null references auth.users(id) on delete cascade,
  ist_day     date not null,
  question_id uuid not null,
  surface     text not null check (surface in ('bank', 'board', 'guide', 'v')),
  counts      boolean not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, ist_day, question_id)
);

comment on table public.daily_reveals is
  'Answers a signed-in student opened, per IST day (0228): the daily answer limit counts rows with counts = true. Written only by claim_reveal and the user_activity trigger.';

alter table public.daily_reveals enable row level security;

create policy daily_reveals_select_own on public.daily_reveals
  for select to authenticated using (user_id = (select auth.uid()));

revoke insert, update, delete, truncate on public.daily_reveals from anon, authenticated;

-- ── does a question count toward the limit? (not a free exam's) ────────
create or replace function private.reveal_counts(p_question_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.exam_pass_scope((select q.exam_id from public.questions q where q.id = p_question_id)) <> 'free';
$$;

-- ── copy every recorded answer into the count ──────────────────────────
create or replace function private.mirror_daily_reveal()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  qid uuid;
begin
  if new.ref_id is null
     or new.ref_id !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' then
    return null;
  end if;
  qid := new.ref_id::uuid;
  insert into public.daily_reveals (user_id, ist_day, question_id, surface, counts)
  values (
    new.user_id,
    (new.created_at at time zone 'Asia/Kolkata')::date,
    qid,
    coalesce(new.metadata->>'surface', 'bank'),
    private.reveal_counts(qid)
  )
  on conflict do nothing;
  return null;
exception when others then
  -- The activity row is the student's action; never lose it over the copy.
  raise warning 'mirror_daily_reveal: %', sqlerrm;
  return null;
end;
$$;

create trigger user_activity_mirror_daily_reveal
  after insert on public.user_activity
  for each row
  when (new.kind = 'question_practiced'
        and coalesce(new.metadata->>'surface', 'bank') in ('bank', 'board', 'guide', 'v'))
  execute function private.mirror_daily_reveal();

-- ── the decision ───────────────────────────────────────────────────────
-- Returns {allowed, reason, used, limit}. reason: counted (a new answer,
-- recorded) · repeat (already open today) · limit (refused) · pass · free ·
-- off (no limit set) · path (today's board-path question) · uncounted (a
-- surface the limit does not cover: the drill, the question of the day).
create or replace function public.claim_reveal(p_question_id uuid, p_surface text)
returns jsonb
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  uid      uuid := auth.uid();
  v_day    date := (now() at time zone 'Asia/Kolkata')::date;
  v_scope  text;
  v_limit  integer;
  v_exempt uuid[];
  v_used   integer;
begin
  if uid is null then
    raise exception 'claim_reveal: not signed in' using errcode = '42501';
  end if;
  if p_question_id is null then
    raise exception 'claim_reveal: question required' using errcode = '22023';
  end if;
  if p_surface is null or p_surface not in ('bank', 'board', 'guide', 'v') then
    return jsonb_build_object('allowed', true, 'reason', 'uncounted', 'used', null, 'limit', null);
  end if;

  v_scope := private.exam_pass_scope((select q.exam_id from public.questions q where q.id = p_question_id));
  if v_scope = 'free' then
    return jsonb_build_object('allowed', true, 'reason', 'free', 'used', null, 'limit', null);
  end if;
  if private.user_has_pass(uid, v_scope) then
    return jsonb_build_object('allowed', true, 'reason', 'pass', 'used', null, 'limit', null);
  end if;

  select s.free_reveals_per_day into v_limit from public.paywall_settings s;
  if v_limit is null then
    return jsonb_build_object('allowed', true, 'reason', 'off', 'used', null, 'limit', null);
  end if;

  select d.exempt_question_ids into v_exempt
  from public.study_path_days d
  where d.user_id = uid and d.day = v_day;
  v_exempt := coalesce(v_exempt, array[]::uuid[]);
  if p_question_id = any (v_exempt) then
    return jsonb_build_object('allowed', true, 'reason', 'path', 'used', null, 'limit', v_limit);
  end if;

  -- One claim at a time per student: two tabs cannot both take the last answer.
  perform pg_advisory_xact_lock(hashtextextended('claim_reveal:' || uid::text, 0));

  select count(*) into v_used
  from public.daily_reveals r
  where r.user_id = uid and r.ist_day = v_day and r.counts
    and not (r.question_id = any (v_exempt));

  if exists (
    select 1 from public.daily_reveals r
    where r.user_id = uid and r.ist_day = v_day and r.question_id = p_question_id
  ) then
    return jsonb_build_object('allowed', true, 'reason', 'repeat', 'used', v_used, 'limit', v_limit);
  end if;

  if v_used >= v_limit then
    return jsonb_build_object('allowed', false, 'reason', 'limit', 'used', v_used, 'limit', v_limit);
  end if;

  insert into public.daily_reveals (user_id, ist_day, question_id, surface, counts)
  values (uid, v_day, p_question_id, p_surface, true)
  on conflict do nothing;
  return jsonb_build_object('allowed', true, 'reason', 'counted', 'used', v_used + 1, 'limit', v_limit);
end;
$$;

revoke all on function public.claim_reveal(uuid, text) from public, anon;
grant execute on function public.claim_reveal(uuid, text) to authenticated;
revoke all on function private.reveal_counts(uuid) from public, anon, authenticated;
revoke all on function private.mirror_daily_reveal() from public, anon, authenticated;

-- ── today's answers so far, so the switch costs no student a fresh allowance ──
insert into public.daily_reveals (user_id, ist_day, question_id, surface, counts)
select distinct on (a.user_id, a.ref_id)
  a.user_id,
  (a.created_at at time zone 'Asia/Kolkata')::date,
  a.ref_id::uuid,
  coalesce(a.metadata->>'surface', 'bank'),
  private.reveal_counts(a.ref_id::uuid)
from public.user_activity a
where a.kind = 'question_practiced'
  and a.created_at >= ((now() at time zone 'Asia/Kolkata')::date)::timestamp at time zone 'Asia/Kolkata'
  and a.ref_id ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
  and coalesce(a.metadata->>'surface', 'bank') in ('bank', 'board', 'guide', 'v')
order by a.user_id, a.ref_id, a.created_at
on conflict do nothing;
