-- 0123_activity_kinds_reach — five instrumentation kinds for the engagement
-- read (2026-09-27). The CHECK is the DB-level backstop for ACTIVITY_KINDS in
-- src/lib/activity/events.ts; a kind missing here is silently dropped by the
-- best-effort writer, which is how the first click-redirect test found it.
--
-- WHAT THEY ANSWER, and why the read could not without them:
--   surface_viewed  "did the student SEE it?" — one row per surface per IST day
--                   (dedupe_key), so a refresh cannot inflate it, and the
--                   header's pulse fetch writes surface='site' as the day's
--                   heartbeat. 51 of the 265 students who signed in during the
--                   prior month left no row at all and counted as absent.
--   drill_started   /drill served a question — an opened, unfinished drill was
--                   invisible; only drill_completed existed.
--   goal_set        the weekly goal was chosen or changed (0 of 400 profiles
--                   had one and nothing said whether anyone had tried).
--   paywall_event   a gate shown / checkout opened / dismissed / verify failed
--                   (metadata.step, metadata.gate); only a success left a row.
--   email_clicked   a link in one of our emails was followed, via the
--                   /api/e/<token> redirect (0122) — one per send.
--
-- None is rewarded, none is a learning act, and none feeds a streak; they are
-- reach and funnel counts the PMF readout lists as TELEMETRY, not features.

ALTER TABLE public.user_activity DROP CONSTRAINT user_activity_kind_ck;

ALTER TABLE public.user_activity ADD CONSTRAINT user_activity_kind_ck CHECK (kind IN (
  'mock_submitted',
  'mock_started',
  'answer_wrong',
  'answer_correct',
  'chapter_mastered',
  'note_checkpoint',
  'question_bookmarked',
  'question_practiced',
  'quiz_taken',
  'drill_completed',
  'surface_viewed',
  'drill_started',
  'goal_set',
  'paywall_event',
  'email_clicked'
));
