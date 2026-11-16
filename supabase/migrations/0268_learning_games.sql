-- 0268_learning_games.sql — the catalogue of learning games that already exist
-- (card, map, quiz and simulation games), mapped to our exams and subjects, read
-- by /dashboard/games (superadmin only). The owner revisits it to see what is
-- out there and what we could borrow.
--
-- WHY A TABLE AND NOT A CODE FILE: the owner asked on 2026-11-16 to keep the
-- page AND the list private, and the repo is public on GitHub, so the content
-- must never be committed (the 0260 world_exams pattern). The database is the
-- source of truth. Rows change through `scripts/games/load.ts`, which reads a
-- JSON file kept OUT of the repo, validates it with the same schema the page
-- uses (src/lib/games/model.ts), and is a dry run unless --apply.
--
-- TABLES
--   learning_games       one row per existing game.
--   learning_game_notes  prose sections: what the research says, the watch
--                        list. Plain text paragraphs and bullets, no markup.
--
-- Rules the database enforces (the page and the loader check them too):
--   - platform and evidence come from fixed lists;
--   - subjects and mechanics are non-empty and drawn from fixed lists;
--   - fits and sources are JSON arrays.
-- What only the code checks: each fit's goal/subject/strength and that its
-- exam slugs exist in EXAM_REGISTRY under that goal (the registry lives in
-- code), and that evidence above 'none' carries a source. The gate verdict
-- (passes / caution / fails) is COMPUTED from mechanics in code and never
-- stored, so it cannot drift from the rule.
--
-- ACCESS: none. RLS on with no policies and no grants to anon/authenticated,
-- like world_exams (0260). The page reads with the service-role client after
-- getSessionSuperadmin().

create table public.learning_games (
  id            text primary key check (id ~ '^[a-z0-9][a-z0-9-]{1,79}$'),
  name          text not null check (length(name) between 1 and 120),
  url           text not null check (url ~ '^https://'),
  maker         text not null default '' check (length(maker) <= 120),
  platform      text not null check (platform in ('app', 'web', 'card_board', 'console', 'classroom')),
  price         text not null default '' check (length(price) <= 120),
  audience      text not null default '' check (length(audience) <= 120),
  subjects      text[] not null check (
    cardinality(subjects) >= 1
    and subjects <@ array['maths', 'physics', 'chemistry', 'biology', 'history', 'geography', 'polity',
      'economics', 'english', 'reasoning', 'general_knowledge', 'computer', 'regional_language', 'any']::text[]
  ),
  how_it_plays  text not null check (length(how_it_plays) between 1 and 400),
  mechanics     text[] not null check (
    cardinality(mechanics) >= 1
    and mechanics <@ array['speed_round', 'daily_puzzle', 'ordering', 'matching', 'map_tap', 'labelling',
      'predict_reveal', 'simulation', 'building', 'puzzle', 'quiz', 'card_play', 'story_world', 'team_play',
      'personal_best', 'mastery_levels', 'adaptive', 'spaced_review', 'shareable_result', 'teacher_led',
      'live_duel', 'daily_streak', 'xp_points', 'badges', 'power_ups', 'leaderboard', 'rating', 'lives',
      'random_rewards', 'streak_freeze']::text[]
  ),
  evidence      text not null check (evidence in ('strong', 'some', 'weak', 'none')),
  evidence_note text not null default '' check (length(evidence_note) <= 400),
  vendor_funded boolean not null default false,
  scale         text not null default '' check (length(scale) <= 200),
  scale_as_of   date,
  borrow        text not null default '' check (length(borrow) <= 300),
  fits          jsonb not null default '[]'::jsonb check (jsonb_typeof(fits) = 'array'),
  sources       jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  checked_on    date not null,
  updated_at    timestamptz not null default now()
);

comment on table public.learning_games is
  'Existing learning games mapped to our exams and subjects. Superadmin page /dashboard/games; service role only. 0268.';

create table public.learning_game_notes (
  id          text primary key check (id ~ '^[a-z0-9][a-z0-9-]{1,79}$'),
  title       text not null check (length(title) between 2 and 120),
  sort        integer not null default 0,
  paragraphs  text[] not null default '{}',
  bullets     text[] not null default '{}',
  sources     jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  updated_at  timestamptz not null default now()
);

comment on table public.learning_game_notes is
  'Prose sections of /dashboard/games (research findings, watch list). Service role only. 0268.';

alter table public.learning_games enable row level security;
alter table public.learning_game_notes enable row level security;
revoke all on public.learning_games from anon, authenticated;
revoke all on public.learning_game_notes from anon, authenticated;

-- load_learning_games: the loader's one write, in one transaction, so a bad row
-- anywhere leaves the old catalogue untouched. p_prune also deletes rows
-- missing from the file; without it nothing is deleted. The caller
-- (scripts/games/load.ts) has already checked every row with parseLoadFile and
-- filled every column, so a missing key here is a bug and NOT NULL refuses it.
create or replace function public.load_learning_games(p_games jsonb, p_notes jsonb, p_prune boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_gone_games integer := 0;
  v_gone_notes integer := 0;
begin
  if jsonb_typeof(p_games) <> 'array' or jsonb_typeof(p_notes) <> 'array' then
    raise exception 'load_learning_games: p_games and p_notes must be JSON arrays';
  end if;

  insert into public.learning_games as g (
    id, name, url, maker, platform, price, audience, subjects, how_it_plays, mechanics, evidence,
    evidence_note, vendor_funded, scale, scale_as_of, borrow, fits, sources, checked_on, updated_at
  )
  select x.id, x.name, x.url, x.maker, x.platform, x.price, x.audience, x.subjects, x.how_it_plays,
         x.mechanics, x.evidence, x.evidence_note, x.vendor_funded, x.scale, x.scale_as_of, x.borrow,
         x.fits, x.sources, x.checked_on, now()
  from jsonb_to_recordset(p_games) as x(
    id text, name text, url text, maker text, platform text, price text, audience text, subjects text[],
    how_it_plays text, mechanics text[], evidence text, evidence_note text, vendor_funded boolean,
    scale text, scale_as_of date, borrow text, fits jsonb, sources jsonb, checked_on date
  )
  on conflict (id) do update set
    name = excluded.name, url = excluded.url, maker = excluded.maker, platform = excluded.platform,
    price = excluded.price, audience = excluded.audience, subjects = excluded.subjects,
    how_it_plays = excluded.how_it_plays, mechanics = excluded.mechanics, evidence = excluded.evidence,
    evidence_note = excluded.evidence_note, vendor_funded = excluded.vendor_funded, scale = excluded.scale,
    scale_as_of = excluded.scale_as_of, borrow = excluded.borrow, fits = excluded.fits,
    sources = excluded.sources, checked_on = excluded.checked_on, updated_at = now();

  insert into public.learning_game_notes as n (id, title, sort, paragraphs, bullets, sources, updated_at)
  select x.id, x.title, x.sort, x.paragraphs, x.bullets, x.sources, now()
  from jsonb_to_recordset(p_notes) as x(id text, title text, sort integer, paragraphs text[], bullets text[], sources jsonb)
  on conflict (id) do update set
    title = excluded.title, sort = excluded.sort, paragraphs = excluded.paragraphs,
    bullets = excluded.bullets, sources = excluded.sources, updated_at = now();

  if p_prune then
    delete from public.learning_games
    where id not in (select e->>'id' from jsonb_array_elements(p_games) as e);
    get diagnostics v_gone_games = row_count;
    delete from public.learning_game_notes
    where id not in (select e->>'id' from jsonb_array_elements(p_notes) as e);
    get diagnostics v_gone_notes = row_count;
  end if;

  return jsonb_build_object(
    'games', jsonb_array_length(p_games),
    'notes', jsonb_array_length(p_notes),
    'deleted', v_gone_games + v_gone_notes
  );
end;
$$;

revoke all on function public.load_learning_games(jsonb, jsonb, boolean) from public, anon, authenticated;
grant execute on function public.load_learning_games(jsonb, jsonb, boolean) to service_role;
