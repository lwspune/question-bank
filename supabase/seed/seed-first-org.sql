-- Manual onboarding for your initial organization + admin user.
--
-- WHEN: After (a) all migrations + taxonomy seed have run, AND (b) the admin user
-- has signed in via magic link at least once (so a row exists in auth.users).
--
-- WHAT: Creates one organization and links the admin's auth user to it as ADMIN.
--
-- Replace the two placeholders below, then paste into the Supabase SQL editor.

with new_org as (
  insert into organizations (name) values ('REPLACE_WITH_ORG_NAME')
  returning id
)
insert into org_members (org_id, user_id, role)
select new_org.id, u.id, 'ADMIN'
from new_org, auth.users u
where u.email = 'REPLACE_WITH_ADMIN_EMAIL';
