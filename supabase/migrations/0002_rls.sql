-- Helper: org_id of the currently authenticated user.
-- security definer + locked search_path so the function can read org_members
-- regardless of the caller's RLS context, but cannot be hijacked by schema shadowing.
create or replace function public.current_user_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select org_id from public.org_members where user_id = auth.uid() limit 1
$$;

create or replace function public.current_user_is_admin()
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

revoke all on function public.current_user_org_id() from public;
revoke all on function public.current_user_is_admin() from public;
grant execute on function public.current_user_org_id() to authenticated;
grant execute on function public.current_user_is_admin() to authenticated;

-- Enable RLS on every user-facing table
alter table organizations enable row level security;
alter table org_members   enable row level security;
alter table exams         enable row level security;
alter table subjects      enable row level security;
alter table chapters      enable row level security;
alter table subtopics     enable row level security;
alter table questions     enable row level security;
alter table options       enable row level security;
alter table upload_jobs   enable row level security;

-- Organizations: a member can read their own org row
create policy "members read own org"
  on organizations for select
  to authenticated
  using (id = current_user_org_id());

-- OrgMembers: user can read their own membership row;
-- admins can read all members of their own org
create policy "self read membership"
  on org_members for select
  to authenticated
  using (user_id = auth.uid());

create policy "admin reads org members"
  on org_members for select
  to authenticated
  using (org_id = current_user_org_id() and current_user_is_admin());

-- Taxonomy: read-only for all authenticated users; writes are service-role only (bypasses RLS).
create policy "authed read exams"     on exams     for select to authenticated using (true);
create policy "authed read subjects"  on subjects  for select to authenticated using (true);
create policy "authed read chapters"  on chapters  for select to authenticated using (true);
create policy "authed read subtopics" on subtopics for select to authenticated using (true);

-- Questions: org-scoped CRUD
create policy "org read questions"
  on questions for select
  to authenticated
  using (org_id = current_user_org_id());

create policy "org insert questions"
  on questions for insert
  to authenticated
  with check (org_id = current_user_org_id());

create policy "org update questions"
  on questions for update
  to authenticated
  using (org_id = current_user_org_id())
  with check (org_id = current_user_org_id());

create policy "org delete questions"
  on questions for delete
  to authenticated
  using (org_id = current_user_org_id());

-- Options: tied to a question whose org matches
create policy "org read options"
  on options for select
  to authenticated
  using (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = current_user_org_id()
    )
  );

create policy "org write options"
  on options for all
  to authenticated
  using (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = current_user_org_id()
    )
  )
  with check (
    exists (
      select 1 from questions q
      where q.id = options.question_id and q.org_id = current_user_org_id()
    )
  );

-- Upload jobs: org-scoped
create policy "org read uploads"
  on upload_jobs for select
  to authenticated
  using (org_id = current_user_org_id());

create policy "org write uploads"
  on upload_jobs for all
  to authenticated
  using (org_id = current_user_org_id())
  with check (org_id = current_user_org_id());
