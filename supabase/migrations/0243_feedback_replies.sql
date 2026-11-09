-- 0243_feedback_replies.sql
--
-- Replies to students' feature requests. Until now a request went into
-- user_feedback (0051) and nothing ever came back: staff could read it on
-- /dashboard/feedback, the student never heard anything. 10 requests from 9
-- students arrived 2026-10-15 to 2026-11-08, all unanswered.
--
-- A reply is a STATUS (received · planned · done · not_now) plus an optional
-- note. The student reads it on /feedback, sees "reply to your feedback" in the
-- avatar menu while it is unread, and gets one email per status (email_sends
-- kind `feedback_reply`, dedupe key `feedback_reply:<request>:<status>`).
--
-- WHY A SEPARATE TABLE, not status/note columns on user_feedback: user_feedback
-- is append-only (no UPDATE policy, the trend over time is the signal) and a
-- student's own row. A reply is staff data about that row, written only by the
-- server, and it changes (planned -> done). Keeping it apart leaves the
-- student's submission exactly as they sent it.
--
-- ONE ROW PER REQUEST, edited in place. A status change or note edit sets
-- seen_at back to NULL (unread again); the HISTORY of statuses lives in
-- email_sends, which is enough for ~10 requests a month.
--
-- DATA RULES IN THE DATABASE:
-- - user_id is copied onto the reply so RLS is one indexed comparison, and the
--   composite FK (feedback_id, user_id, kind) -> user_feedback(id, user_id,
--   kind) makes a reply on the wrong student's request, or on an NPS score,
--   impossible rather than merely unlikely. Deleting the request (or the
--   account) deletes the reply.
-- - status and note CHECKs mirror src/lib/feedback/replies.ts.
--
-- ACCESS: a student SELECTs replies to their own requests. No write policy at
-- all: only the service role writes (POST /api/admin/feedback-reply,
-- superadmin). The one thing a student changes is "I have seen it", through
-- mark_feedback_replies_seen(), which can only touch the caller's rows.

ALTER TABLE public.user_feedback
  ADD CONSTRAINT user_feedback_id_user_kind_key UNIQUE (id, user_id, kind);

CREATE TABLE public.feedback_replies (
  feedback_id uuid        PRIMARY KEY,
  user_id     uuid        NOT NULL,
  kind        text        NOT NULL DEFAULT 'feature',
  status      text        NOT NULL,
  note        text,
  replied_by  uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  replied_at  timestamptz NOT NULL DEFAULT now(),
  seen_at     timestamptz,
  CONSTRAINT feedback_replies_request_fk
    FOREIGN KEY (feedback_id, user_id, kind)
    REFERENCES public.user_feedback (id, user_id, kind) ON DELETE CASCADE,
  CONSTRAINT feedback_replies_kind_ck CHECK (kind = 'feature'),
  CONSTRAINT feedback_replies_status_ck CHECK (status IN ('received', 'planned', 'done', 'not_now')),
  CONSTRAINT feedback_replies_note_ck CHECK (note IS NULL OR char_length(note) BETWEEN 1 AND 1000)
);

-- The avatar menu's unread count (one student, seen_at IS NULL) and /feedback's
-- own list both filter on user_id.
CREATE INDEX feedback_replies_user_idx ON public.feedback_replies (user_id);

ALTER TABLE public.feedback_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feedback_replies_select_own"
  ON public.feedback_replies
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- "I have read my replies": called when the student opens /feedback. SECURITY
-- DEFINER because the student has no UPDATE on the table; it can only ever
-- touch rows whose user_id is the caller. Returns how many it marked.
CREATE OR REPLACE FUNCTION public.mark_feedback_replies_seen()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  uid uuid := auth.uid();
  n integer;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'not signed in' USING ERRCODE = '42501';
  END IF;
  UPDATE public.feedback_replies
     SET seen_at = now()
   WHERE user_id = uid
     AND seen_at IS NULL;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_feedback_replies_seen() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_feedback_replies_seen() TO authenticated;

-- The reply email.
ALTER TABLE public.email_sends DROP CONSTRAINT email_sends_kind_ck;
ALTER TABLE public.email_sends ADD CONSTRAINT email_sends_kind_ck
  CHECK (kind IN ('next_mock', 'first_mock', 'mock_report', 'due_nudge', 'welcome', 'answer_report', 'feedback_reply'));
