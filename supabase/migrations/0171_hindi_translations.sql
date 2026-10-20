-- 0171: Hindi translations — SSC CGL prints every non-English question in Hindi too.
--
-- WHY: a Hindi-medium student asked V for SSC CGL in Hindi (2026-10-19). SSC's
-- own response sheets print each question and option in English and Hindi, so
-- the Hindi is READ from the sheet, never machine-translated. It is stored the
-- way 0118 stores Marathi: a presentation of the canonical English row, which
-- keeps content_hash, the key, item stats and mocks.
--
-- ONE SECOND LANGUAGE PER QUESTION. Every surface (lib/i18n/bilingual.ts) shows
-- English / <the other print> / Both, with ONE middle button. A question that
-- carried both Marathi and Hindi would hide one of them silently, so the table
-- refuses the second. No exam prints three languages, so nothing is lost.
--
-- AN OPTION'S TRANSLATION MUST MATCH ITS QUESTION'S. An option in a language
-- its question has no translation in is never rendered (the reader looks the
-- option up by the question's language). put_question_translation always
-- writes the question row first, so the RPC passes; a stray direct insert does
-- not. Checked on prod before applying: 0 option rows break this.
--
-- Both trigger functions are SECURITY DEFINER: they only test existence, and
-- RLS must not hide from them a row the writer cannot read.
--
-- ALTERNATIVE REJECTED: letting a question carry several languages and a
-- per-page language list in the UI. Nothing prints that, and it would make the
-- "middle button" ambiguous for a stored preference.

alter table public.question_translations drop constraint question_translations_lang_check;
alter table public.question_translations
  add constraint question_translations_lang_check check (lang in ('mr', 'hi'));

alter table public.option_translations drop constraint option_translations_lang_check;
alter table public.option_translations
  add constraint option_translations_lang_check check (lang in ('mr', 'hi'));

create or replace function private.question_translation_one_language()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1 from public.question_translations t
    where t.question_id = new.question_id and t.lang <> new.lang
  ) then
    raise exception 'question % already has a translation in another language', new.question_id
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger question_translations_one_language
  before insert or update of lang, question_id on public.question_translations
  for each row execute function private.question_translation_one_language();

create or replace function private.option_translation_matches_question()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.options o
    join public.question_translations t on t.question_id = o.question_id and t.lang = new.lang
    where o.id = new.option_id
  ) then
    raise exception 'option %: its question has no % translation', new.option_id, new.lang
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger option_translations_match_question
  before insert or update of lang, option_id on public.option_translations
  for each row execute function private.option_translation_matches_question();
