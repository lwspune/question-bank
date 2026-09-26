-- 0119: officially CANCELLED questions — kept, with their notice, and no key.
--
-- WHY: MPSC's final answer keys cancel 35 of the 1,400 Group B & C prelim
-- questions (`#`). They were printed, candidates sat them, and a faithful paper
-- and mock contain them — so they belong in the bank. But the Commission awards
-- NO option, and a bank row has always marked exactly one correct.
--
-- The earlier workaround (NEET 2022 Q93/Q128) kept such a question PRIVATE with
-- a PLACEHOLDER correct option and the truth in a bracket in `solution`. That
-- leaves an invented key in the data for every consumer that does not read the
-- bracket — the paper builder, the answer key, item stats — which is exactly the
-- failure a key-trust corpus exists to prevent.
--
-- SHAPE: `cancelled_note` IS the flag. Non-null means officially cancelled, and
-- the text is the notice students and teachers see ("Cancelled by MPSC in the
-- final answer key…"). A boolean plus a separate note would allow a flag
-- without a reason; one column cannot.
--
-- ENFORCED HERE, not only in the validator: a cancelled question can never
-- gain a correct option, and a question with a correct option can never be
-- marked cancelled — whichever write lands first, the other is refused. So no
-- path (upload, the edit form, a repair script running as service role) can
-- put an invented key back. Triggers, because the rule spans two tables.
--
-- Mocks award a cancelled question to every candidate (the existing `grace`
-- scoring); that is a mock-builder decision and lives there.

alter table public.questions
  add column cancelled_note text
  check (cancelled_note is null or length(btrim(cancelled_note)) > 0);

comment on column public.questions.cancelled_note is
  'Non-null = officially cancelled by the exam body; the text is the notice shown. Such a question has NO correct option (trigger-enforced, 0119).';

create or replace function private.forbid_key_on_cancelled_option()
  returns trigger language plpgsql set search_path = public
as $$
begin
  if new.is_correct and exists (
    select 1 from public.questions q where q.id = new.question_id and q.cancelled_note is not null
  ) then
    raise exception 'option %: question % is officially cancelled and cannot have a correct option', new.label, new.question_id
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger options_no_key_on_cancelled
  before insert or update of is_correct, question_id on public.options
  for each row execute function private.forbid_key_on_cancelled_option();

create or replace function private.forbid_cancelling_keyed_question()
  returns trigger language plpgsql set search_path = public
as $$
begin
  if new.cancelled_note is not null and exists (
    select 1 from public.options o where o.question_id = new.id and o.is_correct
  ) then
    raise exception 'question %: has a correct option, so it cannot be marked cancelled — clear the key first', new.id
      using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger questions_no_cancel_with_key
  before update of cancelled_note on public.questions
  for each row execute function private.forbid_cancelling_keyed_question();
