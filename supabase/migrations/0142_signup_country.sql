-- 0142_signup_country.sql
--
-- The country an account was created from (2026-10-09).
--
-- WHY. Nothing recorded where a student is. The only location field is the
-- self-reported `city`, empty on almost every row, and auth.sessions.ip is no
-- substitute: an email/password sign-in runs on our server, so its session IP
-- is Vercel's (an AWS us-east address), not the student's.
--
-- WHERE IT COMES FROM. Vercel's edge sends `x-vercel-ip-country` (ISO 3166-1
-- alpha-2) on every request; the sign-in paths save it once, on a NEW account
-- only, beside the first-touch channel (0106). It is not tied to that channel's
-- cookie, so an account with no channel still gets its country.
--
-- WRITE-ONCE is enforced in the query (`.is("signup_country", null)`), the
-- same guard the channel uses. The CHECK keeps anything but two capital
-- letters out, whatever path writes it.
--
-- SAFE. Nullable and NULL on every existing row; nothing reads it yet. Apply
-- before the code that writes it.

ALTER TABLE public.student_profiles
  ADD COLUMN signup_country text
    CHECK (signup_country IS NULL OR signup_country ~ '^[A-Z]{2}$');

COMMENT ON COLUMN public.student_profiles.signup_country IS
  'ISO 3166-1 alpha-2 country the account was created from (Vercel x-vercel-ip-country). Write-once, new accounts only. 0142.';
