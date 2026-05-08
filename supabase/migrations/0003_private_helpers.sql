-- Move RLS helper functions out of `public` (which PostgREST exposes via /rpc)
-- into a `private` schema that is not exposed externally.
-- Closes lints 0028/0029 (anon/authenticated SECURITY DEFINER function executable).

create schema if not exists private;
grant usage on schema private to authenticated;

create or replace function private.current_user_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select org_id from public.org_members where user_id = auth.uid() limit 1
$$;

create or replace function private.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.org_members
    where user_id = auth.uid() and role = 'ADMIN'
  )
$$;

revoke all on function private.current_user_org_id() from public;
revoke all on function private.current_user_is_admin() from public;
grant execute on function private.current_user_org_id() to authenticated;
grant execute on function private.current_user_is_admin() to authenticated;

-- Repoint every policy at the private versions.

drop policy "members read own org" on organizations;
create policy "members read own org"
  on organizations for select
  to authenticated
  using (id = private.current_user_org_id());

drop policy "admin reads org members" on org_members;
create policy "admin reads org members"
  on org_members for select
  to authenticated
  using (org_id = private.current_user_org_id() and private.current_user_is_admin());

drop policy "org read questions" on questions;
create policy "org read questions"
  on questions for select
  to authenticated
  using (org_id = private.current_user_org_id());

drop policy "org insert questions" on questions;
create policy "org insert questions"
  on questions for insert
  to authenticated
  with check (org_id = private.current_user_org_id());

drop policy "org update questions" on questions;
create policy "org update questions"
  on questions for update
  to authenticated
  using (org_id = private.current_user_org_id())
  with check (org_id = private.current_user_org_id());

drop policy "org delete questions" on questions;
create policy "org delete questions"
  on questions for delete
  to authenticated
  using (org_id = private.current_user_org_id());

drop policy "org read options" on options;
create policy "org read options"
  on options for select
  to authenticated
  using (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  );

drop policy "org write options" on options;
create policy "org write options"
  on options for all
  to authenticated
  using (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  )
  with check (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = private.current_user_org_id()
    )
  );

drop policy "org read uploads" on upload_jobs;
create policy "org read uploads"
  on upload_jobs for select
  to authenticated
  using (org_id = private.current_user_org_id());

drop policy "org write uploads" on upload_jobs;
create policy "org write uploads"
  on upload_jobs for all
  to authenticated
  using (org_id = private.current_user_org_id())
  with check (org_id = private.current_user_org_id());

drop function if exists public.current_user_org_id();
drop function if exists public.current_user_is_admin();
