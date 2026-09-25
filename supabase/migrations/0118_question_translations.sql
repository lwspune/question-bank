-- 0118: question + option translations — the bank's first non-English content.
--
-- WHY: MPSC Group B & C prelim papers print every question twice, Marathi then
-- English, and the booklet's instruction 4(b) declares NEITHER authoritative.
-- The audience reads Marathi. Every earlier bilingual source (UPSC CDS / NDA /
-- CSE booklets) had its Hindi pages thrown away; this keeps them.
--
-- SHAPE: a translation is a PRESENTATION of a question, never a second question.
-- The English row stays canonical — it owns content_hash, dedup, the answer key
-- (options.is_correct), item stats, mocks and search — and a translation hangs
-- off it by id. So a Marathi typo fix never changes a question's identity, and
-- one question keeps one key however many languages it is printed in.
--
-- ALTERNATIVES REJECTED:
--   * text_mr / context_mr columns on questions + options. Widens the hot
--     `questions` row that /browse sorts (the sort-payload pitfall in CLAUDE.md),
--     and bakes in exactly one extra language — Hindi (the UPSC pages exist)
--     would need another set of columns.
--   * a separate question row per language. Two ids for one question: item
--     stats split, a mock doubles, the per-exam dedup sees two questions, and
--     the two keys can drift apart.
--
-- VISIBILITY: a translation is exactly as readable as its parent. The read
-- policies test EXISTS against questions/options, and that subquery runs under
-- the CALLER's own RLS on those tables — so the rule is inherited, not copied,
-- and cannot drift from 0009/0022 when those change.
--
-- WRITES: content, so superadmin-only (private.current_user_can_edit_content(),
-- 0056). put_question_translation writes a question's translation and its
-- options' translations in ONE transaction and refuses an option that belongs
-- to a different question — the one mistake a caller mapping option ids by
-- label could make silently.
--
-- `lang` is CHECK-constrained to the languages the product actually serves.
-- Adding one is a deliberate migration, not a typo.

create table public.question_translations (
  question_id uuid not null references public.questions(id) on delete cascade,
  lang        text not null check (lang in ('mr')),
  text        text not null check (length(btrim(text)) > 0),
  context     text,
  solution    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (question_id, lang)
);

create table public.option_translations (
  option_id  uuid not null references public.options(id) on delete cascade,
  lang       text not null check (lang in ('mr')),
  text       text not null,
  updated_at timestamptz not null default now(),
  primary key (option_id, lang)
);

comment on table public.question_translations is
  'A question printed in another language. English questions row stays canonical (hash, key, stats). Read = parent visibility; write = superadmin (0118).';
comment on table public.option_translations is
  'An option printed in another language. Read = parent option visibility; write = superadmin (0118).';

alter table public.question_translations enable row level security;
alter table public.option_translations enable row level security;

create policy "read translations of readable questions"
  on public.question_translations for select
  to anon, authenticated
  using (exists (select 1 from public.questions q where q.id = question_translations.question_id));

create policy "read translations of readable options"
  on public.option_translations for select
  to anon, authenticated
  using (exists (select 1 from public.options o where o.id = option_translations.option_id));

create policy "content write question translations"
  on public.question_translations for all
  to authenticated
  using (private.current_user_can_edit_content())
  with check (private.current_user_can_edit_content());

create policy "content write option translations"
  on public.option_translations for all
  to authenticated
  using (private.current_user_can_edit_content())
  with check (private.current_user_can_edit_content());

grant select on public.question_translations, public.option_translations to anon, authenticated;
grant insert, update, delete on public.question_translations, public.option_translations to authenticated;

-- One question's translation + its options', atomically. SECURITY INVOKER, so
-- the write policies above decide who may call it usefully; the service role
-- (ingestion scripts) bypasses RLS by design.
--   p_options: [{"option_id": uuid, "text": text}, ...]
create or replace function public.put_question_translation(
  p_question_id uuid,
  p_lang        text,
  p_text        text,
  p_context     text,
  p_solution    text,
  p_options     jsonb
) returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  foreign_count int;
begin
  select count(*) into foreign_count
  from jsonb_array_elements(coalesce(p_options, '[]'::jsonb)) e
  where not exists (
    select 1 from public.options o
    where o.id = (e->>'option_id')::uuid and o.question_id = p_question_id
  );
  if foreign_count > 0 then
    raise exception 'put_question_translation: % option(s) do not belong to question %', foreign_count, p_question_id
      using errcode = '22023';
  end if;

  insert into public.question_translations (question_id, lang, text, context, solution)
  values (p_question_id, p_lang, p_text, p_context, p_solution)
  on conflict (question_id, lang) do update
    set text = excluded.text,
        context = excluded.context,
        solution = excluded.solution,
        updated_at = now();

  insert into public.option_translations (option_id, lang, text)
  select (e->>'option_id')::uuid, p_lang, e->>'text'
  from jsonb_array_elements(coalesce(p_options, '[]'::jsonb)) e
  on conflict (option_id, lang) do update
    set text = excluded.text,
        updated_at = now();
end;
$$;

revoke all on function public.put_question_translation(uuid, text, text, text, text, jsonb) from public, anon;
grant execute on function public.put_question_translation(uuid, text, text, text, text, jsonb) to authenticated, service_role;
