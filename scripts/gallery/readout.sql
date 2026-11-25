-- Readout for the "notes-visuals" experiment (src/lib/growth/registry.ts;
-- 2026-11-23): signed-in students who opened the Visuals gallery, opened a
-- visual, tapped Practise 3 questions or Read in notes (user_activity
-- surface_viewed, metadata.surface = 'visuals'). Since 2026-11-25 Read in
-- notes opens a panel over the visual, and full_notes = left from that panel
-- for the notes page. Staff (org members) and platform admins are left out.
-- Run read-only (SQL editor or MCP execute_sql).

WITH v AS (
  SELECT ua.user_id, ua.metadata->>'action' AS action, ua.metadata->>'subject' AS subject, ua.created_at
  FROM user_activity ua
  WHERE ua.kind = 'surface_viewed'
    AND ua.metadata->>'surface' = 'visuals'
    AND ua.created_at >= '2026-11-23'
    AND NOT EXISTS (SELECT 1 FROM org_members m WHERE m.user_id = ua.user_id)
    AND NOT EXISTS (SELECT 1 FROM platform_admins p WHERE p.user_id = ua.user_id)
),
openers AS (SELECT DISTINCT user_id FROM v WHERE action = 'open')
SELECT
  (SELECT count(DISTINCT user_id) FROM v WHERE action = 'page')                       AS opened_gallery,
  (SELECT count(*) FROM openers)                                                       AS opened_a_visual,
  (SELECT count(DISTINCT user_id) FROM v WHERE action = 'practise')                    AS tapped_practise,
  round(100.0 * (SELECT count(DISTINCT user_id) FROM v WHERE action = 'practise')
        / NULLIF((SELECT count(*) FROM openers), 0), 1)                                AS practise_pct_of_openers,
  (SELECT count(DISTINCT user_id) FROM v WHERE action = 'notes')                       AS tapped_read_in_notes,
  (SELECT count(DISTINCT user_id) FROM v WHERE action = 'full_notes')                  AS left_for_full_notes,
  (SELECT count(*) FROM v WHERE action = 'open')                                       AS visual_opens_days;

-- By subject:
-- SELECT subject, action, count(DISTINCT user_id) FROM v GROUP BY 1, 2 ORDER BY 1, 2;
