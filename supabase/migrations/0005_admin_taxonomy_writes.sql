-- Admins can auto-create chapters and subtopics via the user-session client
-- during Excel uploads. Taxonomy stays global (shared across orgs by design).
-- Subjects and exams are NOT writable by admins via API — those are
-- service-role-only operations to keep the top-level taxonomy curated.

create policy "admin insert chapters"
  on chapters for insert
  to authenticated
  with check (private.current_user_is_admin());

create policy "admin insert subtopics"
  on subtopics for insert
  to authenticated
  with check (private.current_user_is_admin());
