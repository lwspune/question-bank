-- 0137_mock_paper_daily_limit.sql — a daily limit on whole past-paper downloads.
--
-- WHY (owner, 2026-10-07). A Premium Pass holder could download all 264 past
-- papers and their keys in under three hours (200 files an hour was the only
-- limit) and pass the whole archive around for one ₹99 pass. The owner set 5
-- different papers a day.
--
-- WHO. Every account that can download a past paper: pass holders AND
-- institute staff (owner's call: staff are not exempt). A paper's answer key is
-- not a separate paper, and the same paper again the same day costs nothing.
--
-- WHERE. The download route checks early (so a refused download never builds a
-- PDF) and then claims a row here AFTER the file is built, serving it only if
-- the claim succeeds, the order the one free download uses (0131). The real
-- limit is this trigger: two downloads at the same instant cannot both pass,
-- because it takes a per-user-per-day lock before counting.
--
-- The day is IST, the student's calendar day, like every other daily limit.
-- The number lives on paywall_settings beside the other limits, edited at
-- /dashboard/pricing. NULL = off. Shipped ON at 5: the owner set it.

alter table public.paywall_settings
  add column mock_papers_per_day integer
    check (mock_papers_per_day is null or mock_papers_per_day >= 0);

comment on column public.paywall_settings.mock_papers_per_day is
  'Different whole past papers any account may download per IST day (answer keys and repeats free). Enforced by a trigger on mock_paper_downloads. NULL = off.';

update public.paywall_settings set mock_papers_per_day = 5;

create table public.mock_paper_downloads (
  user_id    uuid not null references auth.users(id) on delete cascade,
  mock_id    uuid not null references public.mock_tests(id) on delete cascade,
  ist_day    date not null default ((now() at time zone 'Asia/Kolkata')::date),
  created_at timestamptz not null default now(),
  primary key (user_id, ist_day, mock_id)
);

comment on table public.mock_paper_downloads is
  'One row per account, IST day and past paper downloaded (migration 0137). Written only by the download route (service role); the daily limit is its trigger.';

alter table public.mock_paper_downloads enable row level security;

-- Read own rows only; no write policy, so a student cannot reset the count.
create policy mock_paper_downloads_select_own
  on public.mock_paper_downloads
  for select
  to authenticated
  using (user_id = auth.uid());

create or replace function private.enforce_mock_paper_daily_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  lim integer;
begin
  select s.mock_papers_per_day into lim from public.paywall_settings s;
  if lim is null then
    return new;
  end if;
  perform pg_advisory_xact_lock(
    hashtextextended('mock_paper_day:' || new.user_id::text || ':' || new.ist_day::text, 0)
  );
  -- The same paper again that day (its answer key, or a second copy): the
  -- route's upsert(ignoreDuplicates) still fires this BEFORE INSERT trigger
  -- before the conflict is resolved, and refusing it would block the key of a
  -- paper downloaded as the day's last. The conflict makes it a no-op.
  if exists (
    select 1 from public.mock_paper_downloads d
    where d.user_id = new.user_id and d.ist_day = new.ist_day and d.mock_id = new.mock_id
  ) then
    return new;
  end if;
  if (
    select count(*) from public.mock_paper_downloads d
    where d.user_id = new.user_id and d.ist_day = new.ist_day
  ) >= lim then
    raise exception 'You have downloaded % papers today.', lim
      using errcode = 'PT429', hint = 'MOCK_PAPER_DAILY_LIMIT';
  end if;
  return new;
end;
$$;

create trigger mock_paper_downloads_daily_limit
  before insert on public.mock_paper_downloads
  for each row execute function private.enforce_mock_paper_daily_limit();
