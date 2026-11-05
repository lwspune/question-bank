-- 0217: pin search_path on the two functions the security advisor flags (2026-11-05).
--
-- WHY. Supabase's security advisor (lint 0011, function_search_path_mutable) reports
-- exactly two functions with a role-mutable search_path: public.record_quiz_lead and
-- private.organizations_protect. A function that resolves names through the caller's
-- search_path can be steered to a same-named object in another schema. Both are SECURITY
-- INVOKER (measured: pg_proc.prosecdef = false), so the real risk is small; pinning it is
-- a no-behaviour-change fix that clears the warning. TECH_DEBT_SPEC.md item 1.5.
--
-- WHY '' IS SAFE HERE. Read from pg_get_functiondef on 2026-11-05:
--   * record_quiz_lead (LANGUAGE sql) names its one table as public.quiz_leads; GREATEST
--     and the jsonb/integer types live in pg_catalog, which is always searched.
--   * organizations_protect (trigger, plpgsql) touches no table: it reads OLD/NEW and RAISEs.
-- The same '' setting is what this project's SECURITY DEFINER functions already use.
--
-- VERIFIED by replaying on the test project (npm run testdb:migrate) and running
-- tests/public-quiz.integration.test.ts (calls record_quiz_lead) and
-- tests/superadmin-orgs.test.ts (the protected-org trigger, app and database).

alter function public.record_quiz_lead(uuid, text, text, integer, integer, integer, integer, integer, jsonb, text)
  set search_path = '';

alter function private.organizations_protect()
  set search_path = '';
