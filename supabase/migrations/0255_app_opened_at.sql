-- 0255_app_opened_at.sql — when a student first opened PYQ Vault from its
-- home-screen icon (2026-11-14, growth registry "install-app").
--
-- WHY: about 8 students in four weeks asked whether PYQ Vault has an app. The
-- site installs to the home screen already (manifest + service worker), so the
-- first step is offering that (/app), not a Play Store app. Whether a store app
-- is worth it next depends on one question this column answers: do students who
-- install it come back more than those who do not? Vercel counts installs and
-- launches, but anonymously; this is the per-student half.
--
-- WRITTEN BY the student's own PATCH /api/profile ({ appOpened: true }), sent
-- once per device by AppInstallCapture on a launch from the icon. Own-row RLS
-- (student_profiles_update_own) already covers it; no new policy.
--
-- FIRST VALUE WINS, in the database rather than the app: a second phone, a
-- cleared browser or a re-install sends it again, and the readout compares
-- return visits from the INSTALL date. A BEFORE UPDATE trigger keeps a set
-- value whatever the write path (the route, a script, a hand edit). An upsert's
-- ON CONFLICT DO UPDATE fires it too. Rejected: making the app send it only
-- "if empty", which a second device cannot know.

ALTER TABLE public.student_profiles ADD COLUMN app_opened_at timestamptz;

COMMENT ON COLUMN public.student_profiles.app_opened_at IS
  'First time this student opened PYQ Vault from its home-screen icon (installed app). NULL = never seen. Kept at the first value by student_profiles_keep_app_opened_at. 0255.';

CREATE OR REPLACE FUNCTION private.student_profiles_keep_app_opened_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF OLD.app_opened_at IS NOT NULL THEN
    NEW.app_opened_at := OLD.app_opened_at;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER student_profiles_keep_app_opened_at
  BEFORE UPDATE OF app_opened_at ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION private.student_profiles_keep_app_opened_at();
