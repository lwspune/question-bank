-- 0260_world_exams.sql — the master list of exams worldwide that PYQ Vault
-- could add next, read by /dashboard/world-exams (superadmin only).
--
-- WHY A TABLE AND NOT A CODE FILE: the owner chose this on 2026-11-15. The list
-- carries rights analysis, revenue estimates and a brief for a lawyer, and the
-- repo is public on GitHub, so the content must never be committed. The page
-- is the source of truth from now on (the Claude doc it was first written in is
-- frozen). Rows change through `scripts/world-exams/load.ts`, which reads a
-- JSON file kept OUT of the repo, validates it with the same schema the page
-- uses (src/lib/worldExams/model.ts), and is a dry run unless --apply.
--
-- TABLES
--   world_exams        one row per exam (or exam family) in one country.
--   world_exam_notes   prose sections: deep dives, the lawyer brief, open
--                      checks. Plain text paragraphs and bullets, no markup.
--
-- Rules the database enforces (the page and the loader check them too):
--   - rights and verdict come from fixed lists;
--   - a shortlisted row carries its reason, risk and next step;
--   - shortlist ranks are unique;
--   - sources is a JSON array; revenue, when present, a JSON object.
--
-- ACCESS: none. RLS on with no policies and no grants to anon/authenticated,
-- like parent_pay_links (0244). The page reads with the service-role client
-- after getSessionSuperadmin().

create table public.world_exams (
  id              text primary key check (id ~ '^[a-z0-9][a-z0-9-]{1,79}$'),
  region          text not null check (region in ('asia', 'europe', 'americas', 'africa', 'oceania', 'global')),
  country         text not null check (length(country) between 2 and 80),
  exam            text not null check (length(exam) between 2 and 200),
  category        text not null check (category in ('entrance', 'school', 'civil_service', 'licensing', 'driving', 'language', 'other')),
  format          text not null default '' check (length(format) <= 300),
  candidates      text not null default '' check (length(candidates) <= 200),
  candidates_n    integer check (candidates_n is null or candidates_n >= 0),
  papers_released text not null default '' check (length(papers_released) <= 300),
  rights          text not null check (rights in ('free', 'same_as_india', 'licensable', 'original_only', 'reject', 'not_checked')),
  rights_note     text not null default '' check (length(rights_note) <= 400),
  language        text not null default '' check (length(language) <= 120),
  verdict         text not null check (verdict in ('live', 'in_progress', 'shortlist', 'lead', 'park', 'skip', 'declined')),
  note            text not null default '' check (length(note) <= 600),
  approximate     boolean not null default false,
  shortlist_rank  integer unique check (shortlist_rank is null or shortlist_rank between 1 and 50),
  why_passes      text check (why_passes is null or length(why_passes) <= 600),
  main_risk       text check (main_risk is null or length(main_risk) <= 400),
  next_step       text check (next_step is null or length(next_step) <= 400),
  revenue         jsonb check (revenue is null or jsonb_typeof(revenue) = 'object'),
  sources         jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  updated_at      timestamptz not null default now(),
  -- A shortlisted row says why it passes, what could kill it and what to do next.
  check (
    shortlist_rank is null
    or (why_passes is not null and main_risk is not null and next_step is not null)
  )
);

comment on table public.world_exams is
  'Exams worldwide screened as the next PYQ Vault exam: one row per exam per country. Superadmin page /dashboard/world-exams; service role only. 0260.';

create table public.world_exam_notes (
  id          text primary key check (id ~ '^[a-z0-9][a-z0-9-]{1,79}$'),
  title       text not null check (length(title) between 2 and 120),
  sort        integer not null default 0,
  paragraphs  text[] not null default '{}',
  bullets     text[] not null default '{}',
  sources     jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  updated_at  timestamptz not null default now()
);

comment on table public.world_exam_notes is
  'Prose sections of /dashboard/world-exams (deep dives, lawyer brief, open checks). Service role only. 0260.';

alter table public.world_exams enable row level security;
alter table public.world_exam_notes enable row level security;
revoke all on public.world_exams from anon, authenticated;
revoke all on public.world_exam_notes from anon, authenticated;

-- load_world_exams: the loader's one write, in one transaction. Shortlist ranks
-- are UNIQUE, so they are cleared first and set again from the file; a rank
-- swap (2 <-> 3) cannot collide, and a failure anywhere leaves the old list
-- untouched. p_prune also deletes rows missing from the file; without it
-- nothing is deleted. The caller (scripts/world-exams/load.ts) has already
-- checked every row with parseLoadFile and filled every column, so a missing
-- key here is a bug and the NOT NULL columns refuse it.
create or replace function public.load_world_exams(p_exams jsonb, p_notes jsonb, p_prune boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_gone_exams integer := 0;
  v_gone_notes integer := 0;
begin
  if jsonb_typeof(p_exams) <> 'array' or jsonb_typeof(p_notes) <> 'array' then
    raise exception 'load_world_exams: p_exams and p_notes must be JSON arrays';
  end if;

  update public.world_exams
  set shortlist_rank = null, why_passes = null, main_risk = null, next_step = null
  where shortlist_rank is not null;

  insert into public.world_exams as w (
    id, region, country, exam, category, format, candidates, candidates_n, papers_released,
    rights, rights_note, language, verdict, note, approximate, shortlist_rank, why_passes,
    main_risk, next_step, revenue, sources, updated_at
  )
  select x.id, x.region, x.country, x.exam, x.category, x.format, x.candidates, x.candidates_n, x.papers_released,
         x.rights, x.rights_note, x.language, x.verdict, x.note, x.approximate, x.shortlist_rank, x.why_passes,
         x.main_risk, x.next_step, x.revenue, x.sources, now()
  from jsonb_to_recordset(p_exams) as x(
    id text, region text, country text, exam text, category text, format text, candidates text,
    candidates_n integer, papers_released text, rights text, rights_note text, language text,
    verdict text, note text, approximate boolean, shortlist_rank integer, why_passes text,
    main_risk text, next_step text, revenue jsonb, sources jsonb
  )
  on conflict (id) do update set
    region = excluded.region, country = excluded.country, exam = excluded.exam,
    category = excluded.category, format = excluded.format, candidates = excluded.candidates,
    candidates_n = excluded.candidates_n, papers_released = excluded.papers_released,
    rights = excluded.rights, rights_note = excluded.rights_note, language = excluded.language,
    verdict = excluded.verdict, note = excluded.note, approximate = excluded.approximate,
    shortlist_rank = excluded.shortlist_rank, why_passes = excluded.why_passes,
    main_risk = excluded.main_risk, next_step = excluded.next_step, revenue = excluded.revenue,
    sources = excluded.sources, updated_at = now();

  insert into public.world_exam_notes as n (id, title, sort, paragraphs, bullets, sources, updated_at)
  select x.id, x.title, x.sort, x.paragraphs, x.bullets, x.sources, now()
  from jsonb_to_recordset(p_notes) as x(id text, title text, sort integer, paragraphs text[], bullets text[], sources jsonb)
  on conflict (id) do update set
    title = excluded.title, sort = excluded.sort, paragraphs = excluded.paragraphs,
    bullets = excluded.bullets, sources = excluded.sources, updated_at = now();

  if p_prune then
    delete from public.world_exams
    where id not in (select e->>'id' from jsonb_array_elements(p_exams) as e);
    get diagnostics v_gone_exams = row_count;
    delete from public.world_exam_notes
    where id not in (select e->>'id' from jsonb_array_elements(p_notes) as e);
    get diagnostics v_gone_notes = row_count;
  end if;

  return jsonb_build_object(
    'exams', jsonb_array_length(p_exams),
    'notes', jsonb_array_length(p_notes),
    'deleted', v_gone_exams + v_gone_notes
  );
end;
$$;

revoke all on function public.load_world_exams(jsonb, jsonb, boolean) from public, anon, authenticated;
grant execute on function public.load_world_exams(jsonb, jsonb, boolean) to service_role;
