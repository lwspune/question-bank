-- 0111_share_snapshot_rpc.sql
--
-- The reader for share_events (0109). That table shipped with a writer and no
-- reader at all, so the loop it was built to make falsifiable was, in practice,
-- still unmeasured.
--
-- WHY A SEPARATE FUNCTION RATHER THAN A KEY ON get_pmf_snapshot: this read is
-- anchored to a DIFFERENT window. get_pmf_snapshot takes p_weeks and reports the
-- product over that span; the share loop is anchored to the instant its button
-- shipped, which is not a number of weeks and does not move when the PMF window
-- does. Folding it in would also mean re-creating a 258-line function to add one
-- key, with the transcription risk that carries and no way to test the rest of
-- it in isolation.
--
-- THE DENOMINATOR IS THE WHOLE POINT, and it is why p_since is a REQUIRED
-- argument with no default. public.mock_attempts held 619 finished attempts when
-- this was written and AT MOST 2 of them could have seen a share button — the
-- affordance went live 2026-09-18. Dividing intents by all 619 reports ~0%
-- forever, which reads as a dead feature rather than as one nobody has had the
-- chance to use yet. Callers pass SHARE_LIVE_SINCE from src/lib/pmf/snapshot.ts.
--
-- NUMERATOR AND DENOMINATOR SHARE THE WINDOW. Events are filtered by p_since
-- too, not counted all-time. A row cannot predate the button in practice, but a
-- numerator and denominator measured over different spans is the defect this
-- function exists to avoid, and it should not be reintroduced one line below the
-- comment warning about it.
--
-- WHAT THIS CANNOT TELL YOU: whether anything was actually sent. A row records
-- a TAP — navigator.share() resolves when the OS sheet is dismissed and never
-- reports the chosen app. The inbound half is acq_campaign='mock-result' (0106),
-- returned here so the two are read together; neither is meaningful alone.
--
-- POPULATION MATCHES THE REST OF THE PAGE: self-serve students only, i.e. users
-- with no org_members row, exactly as 0103's `students` CTE defines it. The page
-- header says "staff excluded"; a panel that quietly counted staff taps in its
-- numerator and staff attempts in its denominator would make that header false.
--
-- ORPHANED ROWS ARE KEPT. share_events.user_id is nullable ON DELETE SET NULL
-- precisely so deleting an account cannot silently revise past volume (0109's
-- header). A plain JOIN to the student set would undo that, so the filter is
-- "not a staff member" — NULL passes — rather than "is a known student".
--
-- SECURITY DEFINER + REVOKE-from-public + GRANT-to-service_role, matching 0103:
-- share_events has RLS enabled with ZERO policies, the read crosses every user,
-- and only the superadmin-gated /dashboard/pmf surfaces it. search_path pinned
-- to '' so every reference is schema-qualified.

CREATE OR REPLACE FUNCTION public.get_share_snapshot(p_since timestamptz)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH ev AS (
    SELECT se.channel, se.included_score, se.subject_slug
    FROM public.share_events se
    WHERE se.created_at >= p_since
      AND (
        se.user_id IS NULL
        OR NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = se.user_id)
      )
  ),
  by_mock AS (
    SELECT ev.subject_slug AS slug, count(*) AS events
    FROM ev
    GROUP BY ev.subject_slug
    ORDER BY count(*) DESC, ev.subject_slug
    -- Capped: this feeds a panel, not an export. A mock outside the top 20 is
    -- not a finding, and an unbounded agg here would grow without limit.
    LIMIT 20
  )
  SELECT jsonb_build_object(
    'events',    (SELECT count(*) FROM ev),
    'withScore', (SELECT count(*) FROM ev WHERE ev.included_score),
    'byChannel', jsonb_build_object(
      -- Enumerated rather than aggregated by key so a channel with no rows is
      -- present as 0. An absent key would render as a gap in the panel and read
      -- as "not tracked", which is a different claim from "nobody used it".
      'whatsapp', (SELECT count(*) FROM ev WHERE ev.channel = 'whatsapp'),
      'share',    (SELECT count(*) FROM ev WHERE ev.channel = 'share'),
      'copy',     (SELECT count(*) FROM ev WHERE ev.channel = 'copy')
    ),
    'byMock', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('slug', bm.slug, 'events', bm.events))
      FROM by_mock bm
    ), '[]'::jsonb),
    'opportunities', (
      SELECT count(*)
      FROM public.mock_attempts ma
      WHERE ma.submitted_at IS NOT NULL
        AND ma.submitted_at >= p_since
        AND NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = ma.user_id)
    ),
    'inboundSignups', (
      SELECT count(*)
      FROM public.student_profiles sp
      WHERE sp.acq_campaign = 'mock-result'
    )
  );
$$;

COMMENT ON FUNCTION public.get_share_snapshot(timestamptz) IS
  'Share loop (0109) over the window since p_since: intents, channel split, score opt-in, per-mock, opportunities (attempts finished since p_since) and inbound tagged signups. A row is an INTENT to share, never a proven delivery.';

REVOKE ALL ON FUNCTION public.get_share_snapshot(timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_share_snapshot(timestamptz) TO service_role;
