-- 0135: protect the content-owning org from delete and rename.
--
-- WHY. The superadmin console gains rename + delete for organisations
-- (2026-10-06). Deleting an org CASCADES its questions, and LWS Pune owns the
-- whole bank (86,880 rows on the day). Until now the only thing standing in the
-- way was an accident: question_reports / concept_reports reference the org with
-- ON DELETE RESTRICT, so a delete happened to fail while any report existed.
--
-- WHY A FLAG, NOT "REFUSE WHILE IT OWNS QUESTIONS". That rule was the first
-- design, and it broke the cleanup of 40 integration-test files, every one of
-- which deletes a fixture org that owns fixture questions. The flag protects the
-- same thing: content editing is superadmin-only (0056) and every question lives
-- in the content org, so "owns questions" and "is LWS Pune" coincide in
-- practice. The app ALSO refuses deleting any org that owns questions
-- (lib/superadmin/admin.ts deleteOrg), so a second content org would still be
-- safe from the console; flag it here if one ever exists.
--
-- RENAME IS BLOCKED TOO. /api/sync/mock finds its destination org BY NAME
-- ("LWS Pune"), so renaming it would silently break the MHT_CET_AI sync.
--
-- The flag itself stays writable by service-role on purpose: clearing it is a
-- deliberate, reviewable step, not something the console offers.

ALTER TABLE public.organizations
  ADD COLUMN deletion_protected boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.organizations.deletion_protected IS
  'When true the org cannot be deleted or renamed (trigger organizations_protect). Set on the content-owning org.';

CREATE OR REPLACE FUNCTION private.organizations_protect()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.deletion_protected THEN
      RAISE EXCEPTION 'organization % is protected and cannot be deleted', OLD.name
        USING ERRCODE = 'P0001';
    END IF;
    RETURN OLD;
  END IF;
  IF OLD.deletion_protected AND NEW.name IS DISTINCT FROM OLD.name THEN
    RAISE EXCEPTION 'organization % is protected and cannot be renamed', OLD.name
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER organizations_protect
  BEFORE DELETE OR UPDATE OF name ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION private.organizations_protect();

UPDATE public.organizations SET deletion_protected = true WHERE name = 'LWS Pune';
