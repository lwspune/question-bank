-- 0114_due_nudge_kind.sql
--
-- 'due_nudge' joins the email_sends kind allowlist (0059, widened in 0110).
-- ENGAGEMENT_SPEC.md C2: the content-led nudge, sent only when a student has
-- mistakes waiting in the drill. The user's channel decision (2026-09-24) was
-- email only; WhatsApp can be added later on the same selection logic.
--
-- The dedupe key is `due_nudge:{userId}:{YYYY-MM-DD in IST}`, so the UNIQUE
-- constraint from 0059 makes "one a day at most" a property of the table, not
-- of the runner. The three-day gap between nudges and the 24-hour quiet window
-- after a drill are policy in src/lib/email/dueNudge.ts; the table backstops
-- only the daily cap, which is the one that would double-send on a re-run.
--
-- ref_kind carries 'drill' and ref_id is null: a nudge is about the student's
-- whole due pool, not one row of it.

ALTER TABLE public.email_sends DROP CONSTRAINT email_sends_kind_ck;
ALTER TABLE public.email_sends ADD CONSTRAINT email_sends_kind_ck
  CHECK (kind IN ('next_mock', 'first_mock', 'mock_report', 'due_nudge'));
