-- 0009_visibility.sql
--
-- Phase A of the public-product pivot. Adds a `visibility` enum to questions
-- (PUBLIC | PRIVATE) so that the same table can serve:
--   - the public PYQ paper builder (anon + authenticated read PUBLIC rows)
--   - existing org-scoped private banks (authenticated org members read their
--     org's PRIVATE rows, as before)
--
-- Existing org-based RLS policies are left intact. New policies are added
-- (permissive, OR'd against the existing ones) to grant the anon role + all
-- authenticated users read access to PUBLIC rows.
--
-- Backfill: existing 150 questions in the LWS Pune org are seeded as PUBLIC
-- so the public bank is non-empty on day one. Visibility is editable per
-- question in the admin edit form.

create type visibility as enum ('PUBLIC', 'PRIVATE');

alter table questions
  add column visibility visibility not null default 'PRIVATE';

create index questions_visibility_idx on questions (visibility);

update questions
set visibility = 'PUBLIC'
where org_id = (select id from organizations where name = 'LWS Pune');

-- Anyone (anon or authenticated) can read PUBLIC questions.
create policy "public read public questions"
  on questions for select
  to anon, authenticated
  using (visibility = 'PUBLIC');

-- Anyone can read options of PUBLIC questions.
create policy "public read options of public questions"
  on options for select
  to anon, authenticated
  using (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.visibility = 'PUBLIC'
    )
  );

-- Anon needs taxonomy reads to populate filter dropdowns on the public browse page.
-- Existing "to authenticated" policies stay; these add anon access alongside.
create policy "anon read exams"     on exams     for select to anon using (true);
create policy "anon read subjects"  on subjects  for select to anon using (true);
create policy "anon read chapters"  on chapters  for select to anon using (true);
create policy "anon read subtopics" on subtopics for select to anon using (true);
