-- Open question + option EDITS to the TEACHER role (in addition to ADMIN).
-- INSERT, DELETE, upload, taxonomy auto-create, visibility flip, reports
-- triage, and member management stay admin-only.
--
-- Also adds audit columns on `questions` so we can attribute every edit to
-- the user who last touched it — particularly relevant once teachers can
-- write.

-- ────────────────────────────────────────────────────────────────────
-- Helper: can the caller edit questions? (ADMIN OR TEACHER, org-scoped)
-- ────────────────────────────────────────────────────────────────────

create or replace function private.current_user_can_edit_questions()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.org_members
    where user_id = auth.uid() and role in ('ADMIN', 'TEACHER')
  )
$$;

revoke all on function private.current_user_can_edit_questions() from public;
grant execute on function private.current_user_can_edit_questions() to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- questions: open UPDATE to editors; keep INSERT + DELETE admin-only
-- ────────────────────────────────────────────────────────────────────

drop policy "admin update questions" on questions;
create policy "editor update questions"
  on questions for update
  to authenticated
  using (
    org_id = private.current_user_org_id()
    and private.current_user_can_edit_questions()
  )
  with check (
    org_id = private.current_user_org_id()
    and private.current_user_can_edit_questions()
  );

-- ────────────────────────────────────────────────────────────────────
-- options: split the old FOR ALL admin policy into INSERT/DELETE
-- (admin-only) + UPDATE (editor).
-- ────────────────────────────────────────────────────────────────────

drop policy "admin write options" on options;

create policy "admin insert options"
  on options for insert
  to authenticated
  with check (
    private.current_user_is_admin()
    and exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  );

create policy "editor update options"
  on options for update
  to authenticated
  using (
    private.current_user_can_edit_questions()
    and exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  )
  with check (
    private.current_user_can_edit_questions()
    and exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  );

create policy "admin delete options"
  on options for delete
  to authenticated
  using (
    private.current_user_is_admin()
    and exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  );

-- ────────────────────────────────────────────────────────────────────
-- storage.objects (question-images bucket): open INSERT/UPDATE/DELETE
-- in the own-org folder to editors so teachers can replace question and
-- option images while editing. SELECT remains free (public bucket).
-- ────────────────────────────────────────────────────────────────────

drop policy "admin upload to own org folder" on storage.objects;
create policy "editor upload to own org folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_can_edit_questions()
  );

drop policy "admin update in own org folder" on storage.objects;
create policy "editor update in own org folder"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_can_edit_questions()
  )
  with check (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_can_edit_questions()
  );

drop policy "admin delete in own org folder" on storage.objects;
create policy "editor delete in own org folder"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'question-images'
    and (storage.foldername(name))[1] = (private.current_user_org_id())::text
    and private.current_user_can_edit_questions()
  );

-- ────────────────────────────────────────────────────────────────────
-- Audit columns on questions: who last edited it, and when.
-- Populated by applyEdit() at the API layer; never set during upload
-- (created_by + created_at already cover that path).
-- ────────────────────────────────────────────────────────────────────

alter table questions
  add column if not exists last_edited_by uuid references auth.users(id),
  add column if not exists last_edited_at timestamptz;

-- Index for the admin audit-by-editor query pattern (small bank today,
-- partial index keeps it cheap until edits are actually populated).
create index if not exists questions_last_edited_at_idx
  on questions (last_edited_at desc nulls last)
  where last_edited_at is not null;
