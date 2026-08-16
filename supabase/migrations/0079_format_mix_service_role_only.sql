-- get_format_mix() becomes a service-role-only PROBE, not a runtime read.
--
-- 0078 added it intending an hourly cached read from the anon client. That
-- failed in a production build and the reason is worth keeping: grouping
-- (exam, kind, format) over the bank is a 49,372-row SEQ SCAN — ~4.4s, 8,838
-- buffers — against the anon role's 3s statement_timeout. It timed out
-- INTERMITTENTLY (a direct REST call succeeded; the same call through
-- supabase-js minutes later returned 57014), which is worse than failing
-- outright: the caller's catch fell through to "mix unavailable" and the
-- filter rendered everywhere, silently.
--
-- Splitting the aggregate per exam uses questions_filter_idx and helps, but
-- JEE Mains alone is still ~3.7s / 10,291 buffers. Serving this live would
-- need either a new index on the most heavily written table in the schema, or
-- a raised statement_timeout — both far too much to decide whether to draw a
-- filter control. So the fact moved to EXAM_REGISTRY.mixedFormats and this
-- function's only caller is now tests/format-mix-registry.test.ts, which runs
-- as service_role (no timeout) and fails the gate if the flag has drifted.
--
-- A MEASUREMENT TRAP, recorded because it cost a debugging cycle: `SET ROLE
-- anon` does NOT reproduce the timeout. statement_timeout is a per-role
-- setting applied at LOGIN, so SET ROLE changes what RLS sees and nothing
-- about the cap. The probe that found it was a real anon-key call through
-- supabase-js; every earlier in-console check had passed.
--
-- Left executable by anon, it is a 3-second scan any anonymous caller can
-- trigger at will and which cannot succeed. Revoked to service_role only,
-- following get_activity_shape (0053).

revoke execute on function public.get_format_mix() from public;
revoke execute on function public.get_format_mix() from anon;
revoke execute on function public.get_format_mix() from authenticated;
grant execute on function public.get_format_mix() to service_role;

comment on function public.get_format_mix() is
  'Per (exam, kind, format) PUBLIC question counts. SERVICE-ROLE ONLY (0079): it is a 49k-row seq scan that exceeds the anon 3s statement_timeout, so it is a gate-time PROBE, never a runtime read. Its one caller is tests/format-mix-registry.test.ts, which checks EXAM_REGISTRY.mixedFormats — the flag that actually drives the /browse format control — against the live bank.';
