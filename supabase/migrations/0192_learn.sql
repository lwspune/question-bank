-- 0192_learn.sql -- the Learn tab: Concept Ladder's lessons, copied into PYQ Vault.
--
-- Why: an experiment (owner, 2026-10-27). Class 12 State Board and CBSE students get
-- step-by-step Maths lessons inside PYQ Vault. Concept Ladder (www.conceptladder.in) keeps
-- running and stays the ONLY place lessons are written; PYQ Vault takes a copy through
-- `npm run learn:import`, which reads the bundle Concept Ladder's `export:pyqvault` writes.
-- No shared code, database or runtime calls: a change on either side cannot break the other.
--
-- What is copied, and from where (Concept Ladder's supabase/migrations, final versions):
--   content   chapters, the concept prerequisite graph, misconceptions, items + options
--             (content_schema, item_solutions, item_figure, concept_position)
--   learner   per-concept state + the attempt log (learner_schema)
--   grading   record_attempt with its mastery rule (retry_until_right) and spaced review
--             (spaced_review), seed_chapter (translations dropped: none in Class 12 yet)
-- Every table is prefixed learn_: `items` and `attempts` would read as the bank's questions
-- and mock attempts here.
--
-- What differs from Concept Ladder, and why:
--   * Lessons are PUBLIC here (decision 3: open to everyone, progress saved when signed in),
--     but the tables stay server-only as there: anon and students read content through
--     SECURITY DEFINER functions that never return a key, a misconception tag, a draft
--     concept or an unverified item. No table or view is granted to the API roles.
--   * Guests have no account here (no anonymous sign-in), so a guest's answer is checked by
--     learn_check_answer, which writes nothing.
--   * learn_record_attempt records as auth.uid(). Concept Ladder's took a user id and was
--     called with the service role; here no request path needs the service role.
--   * Routing a repeated misconception back to its root concept (Concept Ladder's
--     engine/routing.ts + mark_review_due, run by its server) is done inside
--     learn_record_attempt, in the same transaction, with the same window (10) and repeats (2).
--   * Courses are data here (learn_courses), seeded from the bundle: Concept Ladder keeps its
--     catalog in code, and its course logic is not copied.

-- ─── Content ──────────────────────────────────────────────────────────────────────────────

create table public.learn_chapters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique constraint learn_chapters_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  created_at timestamptz not null default now()
);

create table public.learn_concepts (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.learn_chapters (id) on delete cascade,
  code text not null constraint learn_concepts_code_format check (code ~ '^C[0-9]{2,}$'),
  slug text not null constraint learn_concepts_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  one_liner text not null,
  grp text not null,
  tier text not null constraint learn_concepts_tier_check check (tier in ('core', 'adv')),
  ext text[] not null default '{}',
  sources text[] not null default '{}',
  status text not null default 'draft' constraint learn_concepts_status_check check (status in ('draft', 'approved')),
  -- Hook, explanation and engine notes; null until the concept is written.
  body jsonb,
  position integer not null default 0 constraint learn_concepts_position_positive check (position >= 0),
  constraint learn_concepts_approved_needs_body check (status = 'draft' or body is not null),
  unique (chapter_id, code),
  unique (chapter_id, slug)
);

create table public.learn_concept_prereqs (
  concept_id uuid not null references public.learn_concepts (id) on delete cascade,
  prereq_id uuid not null references public.learn_concepts (id) on delete cascade,
  primary key (concept_id, prereq_id),
  constraint learn_concept_prereqs_no_self_loop check (concept_id <> prereq_id)
);

create index learn_concept_prereqs_prereq_idx on public.learn_concept_prereqs (prereq_id);

-- Every concept reachable by following prerequisites from p_concept.
create function public.learn_concept_ancestors(p_concept uuid)
returns table (id uuid)
language sql stable
set search_path = ''
as $$
  with recursive up as (
    select cp.prereq_id as id from public.learn_concept_prereqs cp where cp.concept_id = p_concept
    union
    select cp.prereq_id from public.learn_concept_prereqs cp join up on cp.concept_id = up.id
  )
  select id from up;
$$;

create function public.learn_concept_prereqs_check() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select chapter_id from public.learn_concepts where id = new.concept_id)
     is distinct from (select chapter_id from public.learn_concepts where id = new.prereq_id) then
    raise exception 'prerequisite must be in the same chapter';
  end if;
  -- Adding concept <- prereq closes a cycle if concept is already an ancestor of prereq.
  if new.concept_id in (select a.id from public.learn_concept_ancestors(new.prereq_id) a) then
    raise exception 'prerequisite cycle: % would depend on itself', new.concept_id;
  end if;
  return new;
end;
$$;

create trigger learn_concept_prereqs_check
  before insert or update on public.learn_concept_prereqs
  for each row execute function public.learn_concept_prereqs_check();

create table public.learn_misconceptions (
  id uuid primary key default gen_random_uuid(),
  concept_id uuid not null references public.learn_concepts (id) on delete cascade,
  code text not null constraint learn_misconceptions_code_format check (code ~ '^C[0-9]{2,}-M[0-9]+$'),
  mistake text not null,
  remediation text not null,
  fallback_kind text not null constraint learn_misconceptions_fallback_kind_check check (fallback_kind in ('concept', 'ext', 'none')),
  fallback_concept_id uuid references public.learn_concepts (id),
  fallback_topic text,
  constraint learn_misconceptions_fallback_shape check (
    (fallback_kind = 'concept' and fallback_concept_id is not null and fallback_topic is null)
    or (fallback_kind = 'ext' and fallback_concept_id is null and fallback_topic is not null)
    or (fallback_kind = 'none' and fallback_concept_id is null and fallback_topic is null)
  ),
  unique (concept_id, code)
);

create function public.learn_misconceptions_check() returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_concept_code text := (select code from public.learn_concepts where id = new.concept_id);
begin
  if new.code not like v_concept_code || '-%' then
    raise exception 'misconception % must start with %-', new.code, v_concept_code;
  end if;
  -- Routing must go back to an earlier concept, never forward.
  if new.fallback_kind = 'concept'
     and new.fallback_concept_id not in (select a.id from public.learn_concept_ancestors(new.concept_id) a) then
    raise exception 'misconception % fallback is not a prerequisite ancestor of %', new.code, v_concept_code;
  end if;
  return new;
end;
$$;

create trigger learn_misconceptions_check
  before insert or update on public.learn_misconceptions
  for each row execute function public.learn_misconceptions_check();

-- A solution: at least two non-empty text steps, optionally a figure object.
create function public.learn_is_valid_solution(s jsonb) returns boolean
language sql immutable
set search_path = ''
as $$
  select jsonb_typeof(s) = 'object'
    and jsonb_typeof(s -> 'steps') = 'array'
    and jsonb_array_length(s -> 'steps') >= 2
    and not exists (
      select 1 from jsonb_array_elements(s -> 'steps') e
      where jsonb_typeof(e) <> 'string' or btrim(e #>> '{}') = ''
    )
    and (s -> 'figure' is null or jsonb_typeof(s -> 'figure') = 'object')
$$;

create table public.learn_items (
  id uuid primary key default gen_random_uuid(),
  concept_id uuid not null references public.learn_concepts (id) on delete cascade,
  code text not null constraint learn_items_code_format check (code ~ '^C[0-9]{2,}-Q[0-9]+$'),
  stem text not null,
  source jsonb not null,
  verify jsonb not null,
  -- True only when Concept Ladder's sympy verifier passed for this content (the export's gate).
  verified boolean not null default false,
  solution jsonb not null constraint learn_items_solution_shape check (public.learn_is_valid_solution(solution)),
  figure jsonb constraint learn_items_figure_shape check (
    figure is null or (
      jsonb_typeof(figure) = 'object'
      and coalesce(jsonb_typeof(figure -> 'alt') = 'string' and btrim(figure ->> 'alt') <> '', false)
      and coalesce(jsonb_typeof(figure -> 'elements') = 'array', false)
    )
  ),
  unique (concept_id, code)
);

create table public.learn_item_options (
  item_id uuid not null references public.learn_items (id) on delete cascade,
  key text not null constraint learn_item_options_key_check check (key in ('A', 'B', 'C', 'D')),
  text text not null,
  is_correct boolean not null,
  misconception_id uuid references public.learn_misconceptions (id),
  value text not null,
  primary key (item_id, key),
  constraint learn_item_options_tagging check (is_correct = (misconception_id is null))
);

create index learn_item_options_misconception_idx on public.learn_item_options (misconception_id);

create function public.learn_item_options_same_concept() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.misconception_id is not null
     and (select concept_id from public.learn_misconceptions where id = new.misconception_id)
         is distinct from (select concept_id from public.learn_items where id = new.item_id) then
    raise exception 'option misconception must belong to the same concept as its item';
  end if;
  return new;
end;
$$;

create trigger learn_item_options_same_concept
  before insert or update on public.learn_item_options
  for each row execute function public.learn_item_options_same_concept();

-- Exactly one correct option per item, checked at commit so an item and its options can be
-- written in one transaction.
create function public.learn_items_one_correct_option() returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_item uuid;
  v_correct int;
begin
  -- Separate branches: plpgsql only plans the statement it runs, and item rows have no item_id.
  if tg_table_name = 'learn_items' then
    v_item := new.id;
  elsif tg_op = 'DELETE' then
    v_item := old.item_id;
  else
    v_item := new.item_id;
  end if;
  if not exists (select 1 from public.learn_items where id = v_item) then
    return null; -- item deleted in the same transaction
  end if;
  select count(*) filter (where is_correct) into v_correct from public.learn_item_options where item_id = v_item;
  if v_correct <> 1 then
    raise exception 'item % needs exactly one correct option, has %', v_item, v_correct;
  end if;
  return null;
end;
$$;

create constraint trigger learn_items_one_correct_option
  after insert on public.learn_items
  deferrable initially deferred
  for each row execute function public.learn_items_one_correct_option();

create constraint trigger learn_item_options_one_correct_option
  after insert or update or delete on public.learn_item_options
  deferrable initially deferred
  for each row execute function public.learn_items_one_correct_option();

-- ─── Courses ──────────────────────────────────────────────────────────────────────────────
-- A course is one PYQ Vault exam's subject (`mh-hsc-12-maths`). Its chapters are Concept
-- Ladder's course chapters; each takes concepts from one or more pool chapters. Mastery is per
-- concept, so a concept two courses share counts in both.

create table public.learn_courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique constraint learn_courses_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  -- EXAM_REGISTRY's slug; checked against the registry by the importer (the registry is code).
  exam_slug text not null,
  subject text not null constraint learn_courses_subject_check check (subject in ('maths', 'physics')),
  standard smallint not null constraint learn_courses_standard_check check (standard between 9 and 12),
  unique (exam_slug, subject)
);

create table public.learn_course_chapters (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.learn_courses (id) on delete cascade,
  slug text not null constraint learn_course_chapters_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  standard smallint not null constraint learn_course_chapters_standard_check check (standard between 9 and 12),
  -- The chapter's slug on PYQ Vault's own taxonomy pages, when Concept Ladder names one.
  pyqvault_slug text,
  position integer not null constraint learn_course_chapters_position_positive check (position > 0),
  unique (course_id, slug),
  unique (course_id, position)
);

create table public.learn_course_concepts (
  course_chapter_id uuid not null references public.learn_course_chapters (id) on delete cascade,
  concept_id uuid not null references public.learn_concepts (id) on delete cascade,
  -- Which pool chapter of the course chapter (1-based), then graph order within it.
  part integer not null constraint learn_course_concepts_part_positive check (part > 0),
  position integer not null constraint learn_course_concepts_position_positive check (position > 0),
  primary key (course_chapter_id, concept_id)
);

create index learn_course_concepts_concept_idx on public.learn_course_concepts (concept_id);

-- One row per `npm run learn:import --apply`: which Concept Ladder commit the content came from.
create table public.learn_imports (
  id bigint generated always as identity primary key,
  source_commit text not null,
  exported_at timestamptz not null,
  imported_at timestamptz not null default now(),
  chapters integer not null,
  courses integer not null
);

-- ─── Learner data ─────────────────────────────────────────────────────────────────────────

create table public.learn_concept_state (
  user_id uuid not null references auth.users (id) on delete cascade,
  -- restrict: content a student used is retired, never deleted.
  concept_id uuid not null references public.learn_concepts (id) on delete restrict,
  state text not null constraint learn_concept_state_state_check check (state in ('learning', 'mastered')),
  mastery numeric(4, 3) not null default 0 constraint learn_concept_state_mastery_range check (mastery between 0 and 1),
  -- Questions whose latest answer is right / wrong (Concept Ladder's "retry until right").
  streak integer not null default 0 constraint learn_concept_state_streak_check check (streak >= 0),
  to_retry integer not null default 0 constraint learn_concept_state_to_retry_check check (to_retry >= 0),
  -- Spaced review (Leitner boxes 1..5: 1, 3, 7, 14, 30 days).
  review_box smallint not null default 0 constraint learn_concept_state_review_box_range check (review_box between 0 and 5),
  review_correct smallint not null default 0 constraint learn_concept_state_review_correct_range check (review_correct >= 0),
  next_review_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, concept_id)
);

create index learn_concept_state_review_idx on public.learn_concept_state (user_id, next_review_at);

create table public.learn_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id uuid not null references public.learn_items (id) on delete restrict,
  option_key text not null constraint learn_attempts_option_key_check check (option_key in ('A', 'B', 'C', 'D')),
  correct boolean not null,
  misconception_id uuid references public.learn_misconceptions (id),
  created_at timestamptz not null default now(),
  constraint learn_attempts_option_exists foreign key (item_id, option_key) references public.learn_item_options (item_id, key)
);

create index learn_attempts_user_item_idx on public.learn_attempts (user_id, item_id, id);
create index learn_attempts_item_idx on public.learn_attempts (item_id);
create index learn_attempts_misconception_idx on public.learn_attempts (misconception_id);

-- ─── Access ───────────────────────────────────────────────────────────────────────────────
-- Content is server-only: RLS on with no policies, no privileges for the API roles. Students
-- read their own progress and attempts; every write goes through the functions below.

alter table public.learn_chapters enable row level security;
alter table public.learn_concepts enable row level security;
alter table public.learn_concept_prereqs enable row level security;
alter table public.learn_misconceptions enable row level security;
alter table public.learn_items enable row level security;
alter table public.learn_item_options enable row level security;
alter table public.learn_courses enable row level security;
alter table public.learn_course_chapters enable row level security;
alter table public.learn_course_concepts enable row level security;
alter table public.learn_imports enable row level security;
alter table public.learn_concept_state enable row level security;
alter table public.learn_attempts enable row level security;

revoke all on public.learn_chapters, public.learn_concepts, public.learn_concept_prereqs,
  public.learn_misconceptions, public.learn_items, public.learn_item_options, public.learn_courses,
  public.learn_course_chapters, public.learn_course_concepts, public.learn_imports,
  public.learn_concept_state, public.learn_attempts
  from anon, authenticated;

grant select on public.learn_concept_state, public.learn_attempts to authenticated;

create policy "students read their own learn state" on public.learn_concept_state
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "students read their own learn attempts" on public.learn_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

-- ─── Tuning constants (Concept Ladder's values) ───────────────────────────────────────────

create function public.learn_mastery_needed() returns integer language sql immutable set search_path = '' as $$ select 3 $$;
create function public.learn_review_needed() returns integer language sql immutable set search_path = '' as $$ select 2 $$;
create function public.learn_routing_window() returns integer language sql immutable set search_path = '' as $$ select 10 $$;
create function public.learn_routing_repeats() returns integer language sql immutable set search_path = '' as $$ select 2 $$;

create function public.learn_review_interval(p_box integer) returns interval
language sql immutable
set search_path = ''
as $$
  select case p_box
    when 1 then interval '1 day'
    when 2 then interval '3 days'
    when 3 then interval '7 days'
    when 4 then interval '14 days'
    else interval '30 days'
  end
$$;

-- ─── Reading content (anon + authenticated) ───────────────────────────────────────────────

-- A course's chapters with the concepts each shows, plus each pool chapter's whole graph
-- (unlock needs every prerequisite, including ones the course does not cover). Null if unknown.
create function public.learn_course_outline(p_course text) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  with course as (
    select * from public.learn_courses where slug = p_course
  ),
  cc as (
    select ch.* from public.learn_course_chapters ch join course on course.id = ch.course_id
  ),
  parts as (
    select x.course_chapter_id, x.part, pc.slug as chapter, jsonb_agg(c.code order by x.position) as concepts
    from public.learn_course_concepts x
    join cc on cc.id = x.course_chapter_id
    join public.learn_concepts c on c.id = x.concept_id
    join public.learn_chapters pc on pc.id = c.chapter_id
    group by x.course_chapter_id, x.part, pc.slug
  ),
  pool_ids as (
    select distinct c.chapter_id
    from public.learn_course_concepts x
    join cc on cc.id = x.course_chapter_id
    join public.learn_concepts c on c.id = x.concept_id
  ),
  pools as (
    select pc.slug, jsonb_build_object(
      'title', pc.title,
      'concepts', (
        select jsonb_agg(jsonb_build_object(
          'code', c.code,
          'slug', c.slug,
          'title', c.title,
          'one_liner', c.one_liner,
          'grp', c.grp,
          'tier', c.tier,
          'prereqs', coalesce((
            select jsonb_agg(p.code order by p.position)
            from public.learn_concept_prereqs cp join public.learn_concepts p on p.id = cp.prereq_id
            where cp.concept_id = c.id
          ), '[]'::jsonb),
          'published', c.status = 'approved'
        ) order by c.position)
        from public.learn_concepts c where c.chapter_id = pc.id
      )
    ) as body
    from public.learn_chapters pc join pool_ids on pool_ids.chapter_id = pc.id
  )
  select jsonb_build_object(
    'slug', course.slug,
    'title', course.title,
    'exam', course.exam_slug,
    'subject', course.subject,
    'standard', course.standard,
    'chapters', coalesce((
      select jsonb_agg(jsonb_build_object(
        'slug', cc.slug,
        'title', cc.title,
        'standard', cc.standard,
        'pyqvault', cc.pyqvault_slug,
        'parts', coalesce((
          select jsonb_agg(jsonb_build_object('chapter', parts.chapter, 'concepts', parts.concepts) order by parts.part)
          from parts where parts.course_chapter_id = cc.id
        ), '[]'::jsonb)
      ) order by cc.position)
      from cc
    ), '[]'::jsonb),
    'pools', coalesce((select jsonb_object_agg(pools.slug, pools.body) from pools), '{}'::jsonb)
  )
  from course
$$;

-- One published concept: its body and its verified items, options without keys. Null when the
-- concept is unknown or a draft. The order options are shown in is the app's (seeded shuffle).
create function public.learn_concept(p_chapter text, p_concept text) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'chapter', jsonb_build_object('slug', ch.slug, 'title', ch.title),
    'concept', jsonb_build_object(
      'code', c.code, 'slug', c.slug, 'title', c.title, 'one_liner', c.one_liner,
      'grp', c.grp, 'tier', c.tier, 'position', c.position, 'body', c.body
    ),
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id,
        'code', i.code,
        'stem', i.stem,
        'figure', i.figure,
        'options', (
          select jsonb_agg(jsonb_build_object('key', o.key, 'text', o.text) order by o.key)
          from public.learn_item_options o where o.item_id = i.id
        )
      ) order by i.code)
      from public.learn_items i where i.concept_id = c.id and i.verified
    ), '[]'::jsonb)
  )
  from public.learn_concepts c
  join public.learn_chapters ch on ch.id = c.chapter_id
  where ch.slug = p_chapter and c.slug = p_concept and c.status = 'approved'
$$;

-- ─── Answering ────────────────────────────────────────────────────────────────────────────

-- The published item's key facts, or an exception when the item or option does not exist.
create function public.learn_grade(p_item uuid, p_key text)
returns table (concept_id uuid, correct boolean, misconception_id uuid, correct_key text, solution jsonb)
language plpgsql stable
set search_path = ''
as $$
begin
  return query
  select i.concept_id, o.is_correct, o.misconception_id,
         (select k.key from public.learn_item_options k where k.item_id = i.id and k.is_correct),
         i.solution
  from public.learn_items i
  join public.learn_concepts c on c.id = i.concept_id
  join public.learn_item_options o on o.item_id = i.id and o.key = p_key
  where i.id = p_item and i.verified and c.status = 'approved';
  if not found then
    raise exception 'no published item % with option %', p_item, p_key;
  end if;
end;
$$;

-- A guest's answer (or anyone's): graded, nothing stored.
create function public.learn_check_answer(p_item uuid, p_key text) returns jsonb
language sql stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'correct', g.correct,
    'correct_key', g.correct_key,
    'misconception_code', m.code,
    'remediation', m.remediation,
    'solution', g.solution
  )
  from public.learn_grade(p_item, p_key) g
  left join public.learn_misconceptions m on m.id = g.misconception_id
$$;

-- A signed-in student's answer: graded, logged, and the concept's state updated, atomically.
-- Mastery: each question counts by its latest answer; mastered at learn_mastery_needed()
-- different questions right with none left to retry. A mastered concept stays mastered.
-- Spaced review: mastering puts it in box 1 (due in 1 day); when due, learn_review_needed()
-- right answers pass it to the next box, a miss sends it back to box 1.
-- Routing: a misconception seen learn_routing_repeats() times in the last learn_routing_window()
-- answers on the concept returns where its fallback points; a published root concept also
-- becomes due for review now (when mastered).
create function public.learn_record_attempt(p_item uuid, p_key text) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_concept uuid;
  v_correct boolean;
  v_misconception uuid;
  v_correct_key text;
  v_solution jsonb;
  v_state text;
  v_was_mastered boolean;
  v_right integer;
  v_to_retry integer;
  v_needed integer := public.learn_mastery_needed();
  v_box integer;
  v_next timestamptz;
  v_review_correct integer;
  v_reviewing boolean;
  v_review_done boolean := false;
  v_review_passed boolean := false;
  v_repeats integer;
  v_m public.learn_misconceptions%rowtype;
  v_target public.learn_concepts%rowtype;
  v_route jsonb := null;
begin
  if v_user is null then
    raise exception 'sign in to record an answer';
  end if;

  select g.concept_id, g.correct, g.misconception_id, g.correct_key, g.solution
  into v_concept, v_correct, v_misconception, v_correct_key, v_solution
  from public.learn_grade(p_item, p_key) g;

  -- Serialise concurrent answers for this learner and concept.
  insert into public.learn_concept_state (user_id, concept_id, state)
  values (v_user, v_concept, 'learning')
  on conflict (user_id, concept_id) do nothing;
  select (s.state = 'mastered'), s.review_box, s.next_review_at, s.review_correct
  into v_was_mastered, v_box, v_next, v_review_correct
  from public.learn_concept_state s
  where s.user_id = v_user and s.concept_id = v_concept
  for update;

  insert into public.learn_attempts (user_id, item_id, option_key, correct, misconception_id)
  values (v_user, p_item, p_key, v_correct, v_misconception);

  -- Each question by its latest answer: right, or open to retry.
  select count(*) filter (where l.correct), count(*) filter (where not l.correct)
  into v_right, v_to_retry
  from (
    select distinct on (a.item_id) a.correct
    from public.learn_attempts a join public.learn_items i on i.id = a.item_id
    where a.user_id = v_user and i.concept_id = v_concept
    order by a.item_id, a.id desc
  ) l;

  v_state := case
    when v_was_mastered or (v_right >= v_needed and v_to_retry = 0) then 'mastered'
    else 'learning'
  end;

  v_reviewing := v_was_mastered and v_next is not null and v_next <= now();
  if v_reviewing then
    if v_correct then
      v_review_correct := v_review_correct + 1;
      if v_review_correct >= public.learn_review_needed() then
        v_box := least(v_box + 1, 5);
        v_next := now() + public.learn_review_interval(v_box);
        v_review_correct := 0;
        v_review_done := true;
        v_review_passed := true;
      end if;
    else
      v_box := 1;
      v_next := now() + public.learn_review_interval(1);
      v_review_correct := 0;
      v_review_done := true;
    end if;
  elsif v_state = 'mastered' and not v_was_mastered then
    v_box := 1;
    v_next := now() + public.learn_review_interval(1);
    v_review_correct := 0;
  end if;

  update public.learn_concept_state s
  set state = v_state,
      streak = v_right,
      to_retry = v_to_retry,
      mastery = case when v_state = 'mastered' then 1 else round(least(v_right, v_needed)::numeric / v_needed, 3) end,
      review_box = v_box,
      next_review_at = v_next,
      review_correct = v_review_correct,
      updated_at = now()
  where s.user_id = v_user and s.concept_id = v_concept;

  -- Routing a repeated misconception.
  if not v_correct and v_misconception is not null then
    select count(*) into v_repeats
    from (
      select a.misconception_id
      from public.learn_attempts a join public.learn_items i on i.id = a.item_id
      where a.user_id = v_user and i.concept_id = v_concept
      order by a.id desc
      limit public.learn_routing_window()
    ) recent
    where recent.misconception_id = v_misconception;

    if v_repeats >= public.learn_routing_repeats() then
      select * into v_m from public.learn_misconceptions where id = v_misconception;
      if v_m.fallback_kind = 'ext' then
        v_route := jsonb_build_object('kind', 'revise', 'label', v_m.fallback_topic);
      elsif v_m.fallback_kind = 'concept' then
        select * into v_target from public.learn_concepts where id = v_m.fallback_concept_id;
        if v_target.status <> 'approved' then
          v_route := jsonb_build_object('kind', 'revise', 'label', v_target.title || ' (coming soon)');
        else
          update public.learn_concept_state
          set next_review_at = now(), review_correct = 0, updated_at = now()
          where user_id = v_user and concept_id = v_target.id and state = 'mastered';
          v_route := jsonb_build_object(
            'kind', 'refresher',
            'chapter', (select slug from public.learn_chapters where id = v_target.chapter_id),
            'concept', v_target.slug,
            'title', v_target.title
          );
        end if;
      end if;
    end if;
  end if;

  return jsonb_build_object(
    'correct', v_correct,
    'correct_key', v_correct_key,
    'misconception_code', (select m.code from public.learn_misconceptions m where m.id = v_misconception),
    'remediation', (select m.remediation from public.learn_misconceptions m where m.id = v_misconception),
    'solution', v_solution,
    'streak', v_right,
    'to_retry', v_to_retry,
    'needed', v_needed,
    'state', v_state,
    'mastered_now', v_state = 'mastered' and not v_was_mastered,
    'reviewing', v_reviewing,
    'review_done', v_review_done,
    'review_passed', v_review_passed,
    'review_correct', v_review_correct,
    'review_needed', public.learn_review_needed(),
    'review_box', v_box,
    'next_review_at', v_next,
    'route', v_route
  );
end;
$$;

-- ─── Seeding (service role: npm run learn:import) ─────────────────────────────────────────

-- One chapter from Concept Ladder's seed payload, in one transaction: upserts by stable codes,
-- then removes what left the content. Every rule above still applies, so invalid content aborts
-- the whole seed, and content a student used cannot be deleted (it must be retired).
create function public.learn_seed_chapter(p jsonb) returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_chapter uuid;
  v_concept uuid;
  v_item uuid;
  c jsonb;
  n bigint;
  m jsonb;
  it jsonb;
  o jsonb;
  pr text;
begin
  insert into public.learn_chapters (slug, title) values (p ->> 'slug', p ->> 'title')
  on conflict (slug) do update set title = excluded.title
  returning id into v_chapter;

  -- Graph nodes, numbered in the order the content lists them.
  for c, n in select value, ordinality from jsonb_array_elements(p -> 'concepts') with ordinality loop
    insert into public.learn_concepts (chapter_id, code, slug, title, one_liner, grp, tier, ext, sources, status, body, position)
    values (
      v_chapter, c ->> 'code', c ->> 'slug', c ->> 'title', c ->> 'one_liner', c ->> 'grp', c ->> 'tier',
      array(select jsonb_array_elements_text(c -> 'ext')),
      array(select jsonb_array_elements_text(c -> 'sources')),
      c ->> 'status', nullif(c -> 'body', 'null'::jsonb), n
    )
    on conflict (chapter_id, code) do update set
      slug = excluded.slug, title = excluded.title, one_liner = excluded.one_liner, grp = excluded.grp,
      tier = excluded.tier, ext = excluded.ext, sources = excluded.sources, status = excluded.status,
      body = excluded.body, position = excluded.position;
  end loop;

  -- Edges: replace the chapter's edge set (the trigger re-checks cycles per edge).
  delete from public.learn_concept_prereqs cp
  using public.learn_concepts cc
  where cc.id = cp.concept_id and cc.chapter_id = v_chapter;

  for c in select * from jsonb_array_elements(p -> 'concepts') loop
    for pr in select * from jsonb_array_elements_text(c -> 'prereqs') loop
      insert into public.learn_concept_prereqs (concept_id, prereq_id)
      select a.id, b.id from public.learn_concepts a, public.learn_concepts b
      where a.chapter_id = v_chapter and a.code = c ->> 'code'
        and b.chapter_id = v_chapter and b.code = pr;
      if not found then
        raise exception 'concept % has unknown prerequisite %', c ->> 'code', pr;
      end if;
    end loop;
  end loop;

  -- Misconceptions, then items and options (options reference misconceptions).
  for c in select * from jsonb_array_elements(p -> 'concepts') loop
    select id into v_concept from public.learn_concepts where chapter_id = v_chapter and code = c ->> 'code';

    for m in select * from jsonb_array_elements(c -> 'misconceptions') loop
      insert into public.learn_misconceptions (concept_id, code, mistake, remediation, fallback_kind, fallback_concept_id, fallback_topic)
      values (
        v_concept, m ->> 'code', m ->> 'mistake', m ->> 'remediation', m -> 'fallback' ->> 'kind',
        (select id from public.learn_concepts where chapter_id = v_chapter and code = m -> 'fallback' ->> 'id'),
        m -> 'fallback' ->> 'topic'
      )
      on conflict (concept_id, code) do update set
        mistake = excluded.mistake, remediation = excluded.remediation, fallback_kind = excluded.fallback_kind,
        fallback_concept_id = excluded.fallback_concept_id, fallback_topic = excluded.fallback_topic;
    end loop;

    for it in select * from jsonb_array_elements(c -> 'items') loop
      insert into public.learn_items (concept_id, code, stem, source, verify, verified, solution, figure)
      values (
        v_concept, it ->> 'code', it ->> 'stem', it -> 'source', it -> 'verify', (it ->> 'verified')::boolean,
        it -> 'solution', nullif(it -> 'figure', 'null'::jsonb)
      )
      on conflict (concept_id, code) do update set
        stem = excluded.stem, source = excluded.source, verify = excluded.verify, verified = excluded.verified,
        solution = excluded.solution, figure = excluded.figure
      returning id into v_item;

      for o in select * from jsonb_array_elements(it -> 'options') loop
        insert into public.learn_item_options (item_id, key, text, is_correct, misconception_id, value)
        values (
          v_item, o ->> 'key', o ->> 'text', (o ->> 'is_correct')::boolean,
          (select id from public.learn_misconceptions where concept_id = v_concept and code = o ->> 'misconception'),
          o ->> 'value'
        )
        on conflict (item_id, key) do update set
          text = excluded.text, is_correct = excluded.is_correct,
          misconception_id = excluded.misconception_id, value = excluded.value;
      end loop;
    end loop;
  end loop;

  -- Remove what left the content. FKs from learner tables refuse to delete anything a student used.
  delete from public.learn_item_options io
  using public.learn_items i, public.learn_concepts cc
  where io.item_id = i.id and i.concept_id = cc.id and cc.chapter_id = v_chapter
    and not exists (
      select 1
      from jsonb_array_elements(p -> 'concepts') pc,
           jsonb_array_elements(pc -> 'items') pi,
           jsonb_array_elements(pi -> 'options') po
      where pc ->> 'code' = cc.code and pi ->> 'code' = i.code and po ->> 'key' = io.key
    );

  delete from public.learn_items i
  using public.learn_concepts cc
  where i.concept_id = cc.id and cc.chapter_id = v_chapter
    and not exists (
      select 1 from jsonb_array_elements(p -> 'concepts') pc, jsonb_array_elements(pc -> 'items') pi
      where pc ->> 'code' = cc.code and pi ->> 'code' = i.code
    );

  delete from public.learn_misconceptions mi
  using public.learn_concepts cc
  where mi.concept_id = cc.id and cc.chapter_id = v_chapter
    and not exists (
      select 1 from jsonb_array_elements(p -> 'concepts') pc, jsonb_array_elements(pc -> 'misconceptions') pm
      where pc ->> 'code' = cc.code and pm ->> 'code' = mi.code
    );

  delete from public.learn_concepts cc
  where cc.chapter_id = v_chapter
    and not exists (select 1 from jsonb_array_elements(p -> 'concepts') pc where pc ->> 'code' = cc.code);

  return jsonb_build_object(
    'chapter', p ->> 'slug',
    'concepts', (select count(*) from public.learn_concepts where chapter_id = v_chapter),
    'items', (select count(*) from public.learn_items i join public.learn_concepts cc on cc.id = i.concept_id where cc.chapter_id = v_chapter)
  );
end;
$$;

-- Courses from the bundle: each course upserted by slug and its chapters replaced wholesale.
-- Courses not in the payload are left alone. A concept the course names must already be seeded.
create function public.learn_seed_courses(p jsonb) returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_course uuid;
  v_cc uuid;
  co jsonb;
  ch jsonb;
  pt jsonb;
  n bigint;
  k bigint;
  j bigint;
  v_code text;
  v_concept uuid;
  v_count integer := 0;
begin
  for co in select * from jsonb_array_elements(p -> 'courses') loop
    insert into public.learn_courses (slug, title, exam_slug, subject, standard)
    values (co ->> 'slug', co ->> 'title', co ->> 'exam', co ->> 'subject', (co ->> 'standard')::smallint)
    on conflict (slug) do update set
      title = excluded.title, exam_slug = excluded.exam_slug, subject = excluded.subject, standard = excluded.standard
    returning id into v_course;

    delete from public.learn_course_chapters where course_id = v_course;

    for ch, n in select value, ordinality from jsonb_array_elements(co -> 'chapters') with ordinality loop
      insert into public.learn_course_chapters (course_id, slug, title, standard, pyqvault_slug, position)
      values (v_course, ch ->> 'slug', ch ->> 'title', (ch ->> 'standard')::smallint, ch ->> 'pyqvault', n)
      returning id into v_cc;

      for pt, k in select value, ordinality from jsonb_array_elements(ch -> 'parts') with ordinality loop
        for v_code, j in select value, ordinality from jsonb_array_elements_text(pt -> 'concepts') with ordinality loop
          select c.id into v_concept
          from public.learn_concepts c join public.learn_chapters pc on pc.id = c.chapter_id
          where pc.slug = pt ->> 'chapter' and c.code = v_code;
          if v_concept is null then
            raise exception 'course % chapter % names unknown concept %/%', co ->> 'slug', ch ->> 'slug', pt ->> 'chapter', v_code;
          end if;
          insert into public.learn_course_concepts (course_chapter_id, concept_id, part, position)
          values (v_cc, v_concept, k, j);
        end loop;
      end loop;
    end loop;
    v_count := v_count + 1;
  end loop;
  return jsonb_build_object('courses', v_count);
end;
$$;

-- ─── Function privileges ──────────────────────────────────────────────────────────────────

revoke execute on function
  public.learn_concept_ancestors(uuid),
  public.learn_concept_prereqs_check(),
  public.learn_misconceptions_check(),
  public.learn_is_valid_solution(jsonb),
  public.learn_item_options_same_concept(),
  public.learn_items_one_correct_option(),
  public.learn_mastery_needed(),
  public.learn_review_needed(),
  public.learn_routing_window(),
  public.learn_routing_repeats(),
  public.learn_review_interval(integer),
  public.learn_course_outline(text),
  public.learn_concept(text, text),
  public.learn_grade(uuid, text),
  public.learn_check_answer(uuid, text),
  public.learn_record_attempt(uuid, text),
  public.learn_seed_chapter(jsonb),
  public.learn_seed_courses(jsonb)
  from public, anon, authenticated;

grant execute on function public.learn_course_outline(text), public.learn_concept(text, text),
  public.learn_check_answer(uuid, text)
  to anon, authenticated, service_role;
grant execute on function public.learn_record_attempt(uuid, text) to authenticated, service_role;
grant execute on function public.learn_seed_chapter(jsonb), public.learn_seed_courses(jsonb) to service_role;
