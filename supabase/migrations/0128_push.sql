-- 0128_push.sql — browser push for the due-queue nudge (PUSH_SPEC.md, 2026-10-01).
--
-- WHY: the nudge is an email, and on 2026-09-30 the email channel was measured
-- as moving nothing — 1 drill from 260 nudges, 0 of 157 tracked clicks, and
-- dormant welcomed accounts returning BELOW the no-email baseline, although
-- both test emails landed in Gmail's Primary tab. A browser notification is
-- bound to the browser the student signed in on, so a tap lands with the
-- session live. WhatsApp was declined by the owner.
--
-- push_subscriptions — one row per BROWSER (endpoint UNIQUE), not per user: a
-- student may subscribe a phone and a laptop. Written ONLY by the service role,
-- after /api/push/subscribe has verified the session, because a re-subscribe on
-- a shared browser must MOVE the endpoint from one user to another — own-row
-- RLS cannot express "take this row from someone else". Own-row SELECT so the
-- student can see what is stored about them. fail_count / failed_at let the
-- sender drop a zombie after PUSH_MAX_FAILS (lib/push/core.ts); a 404/410 from
-- the push service deletes the row outright. user_agent is the first device
-- signal this repo records — the device split was unknown when push was chosen.
--
-- push_sends — the log, the shape of email_sends (0059) minus the mail
-- columns. dedupe_key carries the SAME format as the email nudge's
-- (due_nudge:<user>:<IST day>) and is UNIQUE here, so a re-run cannot send twice
-- in a day; the senders read BOTH tables into one prior-sends list, which is
-- what makes "one a day, 3-day gap, back off after 3 unanswered" hold ACROSS
-- the two channels with no key mapping. click_token is looked up by the same
-- /api/e/<token> redirect the email uses. status 'gone' = the push service
-- said the subscription no longer exists (it was deleted).
--
-- student_profiles.push_prompted_at — the ask-once stamp, the
-- whatsapp_prompted_at pattern: Turn on and Not now both stamp it.
--
-- user_activity gains push_clicked (the tap, through /api/e). It is REACH, not
-- use, so get_acquisition_snapshot (0125) is redefined to exclude it beside
-- email_clicked — otherwise one tap would count a student as "signalled".

CREATE TABLE public.push_subscriptions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint      text        NOT NULL UNIQUE CHECK (endpoint LIKE 'https://%' AND length(endpoint) <= 2048),
  p256dh        text        NOT NULL CHECK (length(p256dh) BETWEEN 16 AND 256),
  auth          text        NOT NULL CHECK (length(auth) BETWEEN 16 AND 256),
  user_agent    text        CHECK (user_agent IS NULL OR length(user_agent) <= 256),
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_seen_at  timestamptz NOT NULL DEFAULT now(),
  fail_count    int         NOT NULL DEFAULT 0 CHECK (fail_count >= 0),
  failed_at     timestamptz
);

CREATE INDEX push_subscriptions_user_idx ON public.push_subscriptions (user_id);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "push_subscriptions_select_own"
  ON public.push_subscriptions FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE TABLE public.push_sends (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id  uuid        REFERENCES public.push_subscriptions(id) ON DELETE SET NULL,
  kind             text        NOT NULL CHECK (kind IN ('due_nudge')),
  dedupe_key       text        NOT NULL UNIQUE,
  click_token      text        UNIQUE,
  status           text        NOT NULL CHECK (status IN ('sent', 'failed', 'gone')),
  status_code      int,
  error            text        CHECK (error IS NULL OR length(error) <= 1000),
  metadata         jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX push_sends_user_created_idx ON public.push_sends (user_id, created_at DESC);

ALTER TABLE public.push_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "push_sends_select_own"
  ON public.push_sends FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

ALTER TABLE public.student_profiles ADD COLUMN push_prompted_at timestamptz;

COMMENT ON COLUMN public.student_profiles.push_prompted_at IS
  'When the student answered the browser-push ask on the mock result page (Turn on or Not now). NULL = not yet asked. 0128.';

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
  'email_clicked',
  'push_clicked'
));

-- 0125's function, unchanged but for push_clicked joining the reach events.
CREATE OR REPLACE FUNCTION public.get_acquisition_snapshot(p_since timestamptz, p_exam text DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH students AS (
    SELECT u.id,
           u.created_at,
           p.acq_source,
           p.acq_medium,
           p.acq_campaign,
           p.acq_landing,
           (p.acq_source IS NULL AND u.created_at < timestamptz '2026-09-17 00:00:00+05:30') AS before_tracking
    FROM auth.users u
    LEFT JOIN public.student_profiles p ON p.user_id = u.id
    WHERE u.created_at >= p_since
      AND NOT EXISTS (SELECT 1 FROM public.org_members m WHERE m.user_id = u.id)
      AND (p_exam IS NULL OR p_exam = ANY (p.target_exams))
  ),
  flags AS (
    SELECT s.*,
      (
        EXISTS (SELECT 1 FROM public.mock_attempts ma WHERE ma.user_id = s.id)
        OR EXISTS (SELECT 1 FROM public.notes_progress np WHERE np.user_id = s.id)
        OR EXISTS (SELECT 1 FROM public.question_bookmarks qb WHERE qb.user_id = s.id)
        OR EXISTS (
          SELECT 1 FROM public.user_activity a
          WHERE a.user_id = s.id
            AND a.kind NOT IN ('surface_viewed', 'paywall_event', 'email_clicked', 'push_clicked')
        )
      ) AS signalled,
      EXISTS (
        SELECT 1 FROM public.mock_attempts ma
        WHERE ma.user_id = s.id AND ma.status IN ('submitted', 'expired')
      ) AS mocked,
      EXISTS (
        SELECT 1 FROM public.entitlements e
        WHERE e.user_id = s.id AND e.source = 'razorpay' AND e.status IN ('active', 'expired')
      ) AS paid
    FROM students s
  )
  SELECT jsonb_build_object(
    'channels', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'source', acq_source, 'medium', acq_medium, 'campaign', acq_campaign,
               'beforeTracking', before_tracking,
               'students', students, 'signalled', signalled, 'mocked', mocked, 'paid', paid
             ) ORDER BY students DESC)
      FROM (
        SELECT acq_source, acq_medium, acq_campaign, before_tracking,
               count(*)::int AS students,
               count(*) FILTER (WHERE signalled)::int AS signalled,
               count(*) FILTER (WHERE mocked)::int AS mocked,
               count(*) FILTER (WHERE paid)::int AS paid
        FROM flags
        GROUP BY 1, 2, 3, 4
      ) c
    ), '[]'::jsonb),
    'landings', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
               'landing', acq_landing,
               'students', students, 'signalled', signalled, 'mocked', mocked, 'paid', paid
             ) ORDER BY students DESC)
      FROM (
        SELECT acq_landing,
               count(*)::int AS students,
               count(*) FILTER (WHERE signalled)::int AS signalled,
               count(*) FILTER (WHERE mocked)::int AS mocked,
               count(*) FILTER (WHERE paid)::int AS paid
        FROM flags
        WHERE NOT before_tracking
        GROUP BY 1
      ) l
    ), '[]'::jsonb)
  );
$$;

REVOKE ALL ON FUNCTION public.get_acquisition_snapshot(timestamptz, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_acquisition_snapshot(timestamptz, text) TO service_role;
