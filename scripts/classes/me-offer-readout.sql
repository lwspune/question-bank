-- Readout for the "me-class-offer" experiment (src/lib/growth/registry.ts;
-- migrations 0282, 0285): per card (one per course: SPI crash course, NDA,
-- and from 2026-11-23 MHT-CET, JEE, CDS, AFCAT, 12th Board, SSC CGL), the
-- students who saw it, tapped Know more, said Yes or No, and the Yes leads by
-- Pune vs other. Staff (org members) and teachers are left out.
-- Run read-only (Supabase SQL editor or MCP execute_sql).

WITH a AS (
  SELECT ca.*
  FROM class_offer_answers ca
  LEFT JOIN student_profiles sp ON sp.user_id = ca.user_id
  WHERE NOT EXISTS (SELECT 1 FROM org_members m WHERE m.user_id = ca.user_id)
    AND COALESCE(sp.user_role, 'student') <> 'teacher'
)
SELECT
  a.offer,
  count(*)                                              AS saw,
  count(*) FILTER (WHERE a.more_at IS NOT NULL)         AS know_more,
  count(*) FILTER (WHERE a.answer = 'yes')              AS yes,
  count(*) FILTER (WHERE a.answer = 'no')               AS no,
  count(*) FILTER (WHERE a.answer IS NULL)              AS no_answer_yet,
  round(100.0 * count(*) FILTER (WHERE a.answer = 'yes') / NULLIF(count(*), 0), 1) AS yes_pct_of_saw,
  count(*) FILTER (WHERE a.answer = 'yes' AND EXISTS (
    SELECT 1 FROM class_interest ci
    WHERE ci.user_id = a.user_id AND a.offer = ANY (ci.courses) AND ci.is_pune
  ))                                                    AS yes_pune_leads,
  count(*) FILTER (WHERE a.answer = 'yes' AND a.more_at IS NOT NULL) AS yes_after_know_more
FROM a
GROUP BY a.offer
ORDER BY a.offer;
