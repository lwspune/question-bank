-- 0056_superadmin_content_lockdown.sql
--
-- SUPERADMIN + content-editing lockdown.
--
-- New role model: content (questions/options/taxonomy/tags/embeddings/uploads)
-- can be ADDED or EDITED by the SUPERADMIN ONLY. Org ADMINs and TEACHERs lose
-- all content-write access — admins keep org management (branches, members,
-- batches, papers, report triage), teachers keep read + paper building.
--
-- Superadmin is PLATFORM staff, above orgs (no org_members row). Identity lives
-- in `platform_admins` (a locked lookup table: RLS on, NO policies, so only
-- service-role + the SECURITY DEFINER helper below can read it).
--
-- WHY a separate `can_edit_content()` instead of redefining
-- `can_edit_questions()`: the latter is OVERLOADED — papers/batches/paper_questions
-- policies use it for PAPER BUILDING, which admins + teachers still need. So we
-- leave it alone and introduce a purpose-named content helper, repointing ONLY
-- the content-write policies. Content writes also DROP org-scoping (superadmin is
-- cross-org by definition; org admins are no longer in the picture).
--
-- The service-role ingestion scripts bypass RLS and are unaffected — they remain
-- the primary content-addition path; the superadmin console (a later slice) is
-- the cross-org edit surface.

-- ── superadmin identity ───────────────────────────────────────────────────────
CREATE TABLE public.platform_admins (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- RLS on with NO policies: authenticated/anon can't read it; only service-role
-- and the SECURITY DEFINER helper below (which runs as owner) can.
ALTER TABLE public.platform_admins ENABLE ROW LEVEL SECURITY;

-- Seed the founding superadmin.
INSERT INTO public.platform_admins (user_id)
SELECT id FROM auth.users WHERE email = 'connect.lwspune@gmail.com'
ON CONFLICT DO NOTHING;

-- ── helpers (mirror the existing private.* definer helpers) ───────────────────
CREATE OR REPLACE FUNCTION private.current_user_is_superadmin()
  RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from public.platform_admins where user_id = auth.uid()
  )
$function$;

-- Content add/edit permission = superadmin only. Purpose-named so future changes
-- touch one function, not every policy (the lesson from the overloaded
-- can_edit_questions helper).
CREATE OR REPLACE FUNCTION private.current_user_can_edit_content()
  RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from public.platform_admins where user_id = auth.uid()
  )
$function$;

-- ── repoint content-write policies to superadmin-only (cross-org) ─────────────
-- questions
DROP POLICY "admin insert questions"  ON public.questions;
DROP POLICY "editor update questions" ON public.questions;
DROP POLICY "admin delete questions"  ON public.questions;
CREATE POLICY "content insert questions" ON public.questions
  FOR INSERT TO authenticated WITH CHECK (private.current_user_can_edit_content());
CREATE POLICY "content update questions" ON public.questions
  FOR UPDATE TO authenticated
  USING (private.current_user_can_edit_content())
  WITH CHECK (private.current_user_can_edit_content());
CREATE POLICY "content delete questions" ON public.questions
  FOR DELETE TO authenticated USING (private.current_user_can_edit_content());

-- options
DROP POLICY "admin insert options"  ON public.options;
DROP POLICY "editor update options" ON public.options;
DROP POLICY "admin delete options"  ON public.options;
CREATE POLICY "content insert options" ON public.options
  FOR INSERT TO authenticated WITH CHECK (private.current_user_can_edit_content());
CREATE POLICY "content update options" ON public.options
  FOR UPDATE TO authenticated
  USING (private.current_user_can_edit_content())
  WITH CHECK (private.current_user_can_edit_content());
CREATE POLICY "content delete options" ON public.options
  FOR DELETE TO authenticated USING (private.current_user_can_edit_content());

-- taxonomy auto-create
DROP POLICY "admin insert chapters"  ON public.chapters;
CREATE POLICY "content insert chapters" ON public.chapters
  FOR INSERT TO authenticated WITH CHECK (private.current_user_can_edit_content());
DROP POLICY "admin insert subtopics" ON public.subtopics;
CREATE POLICY "content insert subtopics" ON public.subtopics
  FOR INSERT TO authenticated WITH CHECK (private.current_user_can_edit_content());

-- upload jobs
DROP POLICY "admin write uploads" ON public.upload_jobs;
CREATE POLICY "content write uploads" ON public.upload_jobs
  FOR ALL TO authenticated
  USING (private.current_user_can_edit_content())
  WITH CHECK (private.current_user_can_edit_content());

-- embeddings (RAG grounding, content-derived)
DROP POLICY "embeddings_admin_write" ON public.embeddings;
CREATE POLICY "embeddings_content_write" ON public.embeddings
  FOR ALL TO authenticated
  USING (private.current_user_can_edit_content())
  WITH CHECK (private.current_user_can_edit_content());

-- concept + principle tags (content metadata)
DROP POLICY "tags_admin_write" ON public.question_concept_tags;
CREATE POLICY "tags_content_write" ON public.question_concept_tags
  FOR ALL TO authenticated
  USING (private.current_user_can_edit_content())
  WITH CHECK (private.current_user_can_edit_content());
DROP POLICY "principle_tags_admin_write" ON public.question_principle_tags;
CREATE POLICY "principle_tags_content_write" ON public.question_principle_tags
  FOR ALL TO authenticated
  USING (private.current_user_can_edit_content())
  WITH CHECK (private.current_user_can_edit_content());
