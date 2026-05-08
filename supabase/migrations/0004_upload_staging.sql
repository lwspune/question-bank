-- M2 prep:
-- 1) staged_rows column holds parsed+validated rows between preview and commit.
-- 2) Tighten write policies on questions/options/upload_jobs to ADMIN only.
--    Reads stay open to all org members for questions/options (teachers browse).
--    Upload jobs are admin-only for both read and write (teachers don't audit uploads).

alter table upload_jobs add column staged_rows jsonb;

-- Questions: writes require admin.
drop policy "org insert questions" on questions;
create policy "admin insert questions"
  on questions for insert
  to authenticated
  with check (
    org_id = private.current_user_org_id()
    and private.current_user_is_admin()
  );

drop policy "org update questions" on questions;
create policy "admin update questions"
  on questions for update
  to authenticated
  using (org_id = private.current_user_org_id() and private.current_user_is_admin())
  with check (org_id = private.current_user_org_id() and private.current_user_is_admin());

drop policy "org delete questions" on questions;
create policy "admin delete questions"
  on questions for delete
  to authenticated
  using (org_id = private.current_user_org_id() and private.current_user_is_admin());

-- Options: writes require admin (reads stay open to org members).
drop policy "org write options" on options;
create policy "admin write options"
  on options for all
  to authenticated
  using (
    private.current_user_is_admin()
    and exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  )
  with check (
    private.current_user_is_admin()
    and exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  );

-- Upload jobs: admin only for read and write.
drop policy "org read uploads" on upload_jobs;
create policy "admin read uploads"
  on upload_jobs for select
  to authenticated
  using (org_id = private.current_user_org_id() and private.current_user_is_admin());

drop policy "org write uploads" on upload_jobs;
create policy "admin write uploads"
  on upload_jobs for all
  to authenticated
  using (org_id = private.current_user_org_id() and private.current_user_is_admin())
  with check (org_id = private.current_user_org_id() and private.current_user_is_admin());
