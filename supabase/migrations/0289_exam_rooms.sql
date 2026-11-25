-- 0289_exam_rooms.sql
--
-- Exam rooms (owner, 2026-11-25): a Telegram-like group chat inside PYQ Vault,
-- one room per exam, opened from a bubble on the LEFT (V keeps the right). A
-- student sees only the rooms for the exams on their profile, each with Join.
-- Every exam gets a room (owner's choice over a 3-room pilot); `open` switches
-- one off. Each morning a team message pins a past question (automatic, the
-- team can swap it); a student can tap Ask V on a doubt and V answers in the
-- room; the owner reviews reports.
--
-- WHY service-role-only (RLS enabled, NO policies): every read and write goes
-- through /api/rooms/*, which checks the session and the student's exams first
-- (the class-offer model, 0282). The rules that must hold whatever the route
-- does live HERE, in the guard triggers:
--   * a student posts only into an OPEN room they are a MEMBER of, and not
--     while muted by staff;
--   * at most one message every 5 seconds and 100 a day (IST) per student,
--     across rooms; a student's created_at is always now();
--   * a student message is at most 1,000 characters, carries no question and
--     is never pinned (V's reply may run to 1,500);
--   * V replies only to a visible student or team message in the same room,
--     once per message, at most 5 asks per student per IST day;
--   * one pinned message per room (partial unique index);
--   * 3 reports from different members hide a message until the owner looks;
--     a member cannot report their own message;
--   * whether a daily-question answer is right is decided here from
--     options.is_correct, never taken from the caller.
--
-- Rooms are created on first use (the route upserts the row when a student
-- joins), so a new exam needs no migration and no seed can drift.

CREATE TABLE public.exam_rooms (
  exam_slug  text PRIMARY KEY CHECK (exam_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(exam_slug) <= 60),
  open       boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.exam_room_members (
  exam_slug    text NOT NULL REFERENCES public.exam_rooms(exam_slug) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- "Priya S." (lib/rooms/names), saved at join so a rename never rewrites history.
  display_name text NOT NULL CHECK (length(btrim(display_name)) BETWEEN 1 AND 24),
  joined_at    timestamptz NOT NULL DEFAULT now(),
  last_read_id bigint NOT NULL DEFAULT 0,
  -- The student's own mute of the room's notifications (phase 2 push reads it).
  notify       boolean NOT NULL DEFAULT true,
  -- Staff mute: cannot post until then.
  muted_until  timestamptz,
  PRIMARY KEY (exam_slug, user_id)
);

CREATE INDEX exam_room_members_user_idx ON public.exam_room_members (user_id);

CREATE TABLE public.exam_room_messages (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  exam_slug     text NOT NULL REFERENCES public.exam_rooms(exam_slug) ON DELETE CASCADE,
  author_kind   text NOT NULL CHECK (author_kind IN ('student', 'team', 'v')),
  -- student: the author. team: the staff account that posted (null for the
  -- daily run). v: the student who tapped Ask V (their daily cap counts these).
  user_id       uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  text NOT NULL CHECK (length(btrim(display_name)) BETWEEN 1 AND 40),
  body          text NOT NULL CHECK (length(btrim(body)) BETWEEN 1 AND 1500),
  question_id   uuid REFERENCES public.questions(id) ON DELETE SET NULL,
  reply_to      bigint REFERENCES public.exam_room_messages(id) ON DELETE SET NULL,
  pinned        boolean NOT NULL DEFAULT false,
  hidden_at     timestamptz,
  hidden_reason text CHECK (hidden_reason IN ('reports', 'staff')),
  -- The owner looked at it and kept it: earlier reports no longer count.
  reviewed_at   timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT exam_room_messages_hidden_pair CHECK ((hidden_at IS NULL) = (hidden_reason IS NULL)),
  CONSTRAINT exam_room_messages_student_shape CHECK (
    author_kind <> 'student'
    OR (user_id IS NOT NULL AND length(body) <= 1000 AND question_id IS NULL AND NOT pinned)
  ),
  CONSTRAINT exam_room_messages_v_shape CHECK (author_kind <> 'v' OR (question_id IS NULL AND NOT pinned))
);

CREATE INDEX exam_room_messages_room_idx ON public.exam_room_messages (exam_slug, id DESC);
CREATE INDEX exam_room_messages_user_idx ON public.exam_room_messages (user_id, created_at DESC);
CREATE UNIQUE INDEX exam_room_messages_one_pin ON public.exam_room_messages (exam_slug) WHERE pinned;
CREATE UNIQUE INDEX exam_room_messages_one_v_reply ON public.exam_room_messages (reply_to) WHERE author_kind = 'v';
CREATE INDEX exam_room_messages_hidden_idx ON public.exam_room_messages (hidden_at) WHERE hidden_at IS NOT NULL;
CREATE INDEX exam_room_messages_question_idx ON public.exam_room_messages (exam_slug, question_id) WHERE question_id IS NOT NULL;

CREATE TABLE public.exam_room_reports (
  message_id bigint NOT NULL REFERENCES public.exam_room_messages(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason     text NOT NULL CHECK (reason IN ('spam', 'abuse', 'personal', 'off_topic', 'other')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, user_id)
);

CREATE TABLE public.exam_room_answers (
  message_id bigint NOT NULL REFERENCES public.exam_room_messages(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  option_id  uuid NOT NULL REFERENCES public.options(id) ON DELETE CASCADE,
  correct    boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, user_id)
);

COMMENT ON TABLE public.exam_rooms IS 'Exam rooms: one per exam slug, created on first join; open=false switches a room off. Service-role only; migration 0289.';
COMMENT ON TABLE public.exam_room_messages IS 'Exam room messages (student / team / V). Guarded by private.exam_room_message_guard; migration 0289.';

ALTER TABLE public.exam_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_room_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_room_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_room_answers ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION private.exam_room_message_guard() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
-- The IST day's start is written inline (not a private helper): the service
-- role, which writes here, cannot call functions in schema private.
DECLARE
  v_open   boolean;
  v_member public.exam_room_members%ROWTYPE;
  v_target public.exam_room_messages%ROWTYPE;
BEGIN
  SELECT open INTO v_open FROM public.exam_rooms WHERE exam_slug = NEW.exam_slug;
  IF v_open IS NOT TRUE THEN
    RAISE EXCEPTION 'exam_room:closed';
  END IF;

  IF NEW.author_kind = 'student' THEN
    NEW.created_at := now();
    SELECT * INTO v_member FROM public.exam_room_members WHERE exam_slug = NEW.exam_slug AND user_id = NEW.user_id;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'exam_room:not_member';
    END IF;
    IF v_member.muted_until IS NOT NULL AND v_member.muted_until > now() THEN
      RAISE EXCEPTION 'exam_room:muted';
    END IF;
    IF EXISTS (
      SELECT 1 FROM public.exam_room_messages
      WHERE user_id = NEW.user_id AND author_kind = 'student' AND created_at > now() - interval '5 seconds'
    ) THEN
      RAISE EXCEPTION 'exam_room:too_fast';
    END IF;
    IF (SELECT count(*) FROM public.exam_room_messages
        WHERE user_id = NEW.user_id AND author_kind = 'student' AND created_at >= (date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata')) AT TIME ZONE 'Asia/Kolkata') >= 100 THEN
      RAISE EXCEPTION 'exam_room:daily_limit';
    END IF;

  ELSIF NEW.author_kind = 'v' THEN
    IF NEW.reply_to IS NULL OR NEW.user_id IS NULL THEN
      RAISE EXCEPTION 'exam_room:v_target';
    END IF;
    SELECT * INTO v_target FROM public.exam_room_messages WHERE id = NEW.reply_to;
    IF NOT FOUND OR v_target.exam_slug <> NEW.exam_slug OR v_target.author_kind = 'v' OR v_target.hidden_at IS NOT NULL THEN
      RAISE EXCEPTION 'exam_room:v_target';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.exam_room_members WHERE exam_slug = NEW.exam_slug AND user_id = NEW.user_id) THEN
      RAISE EXCEPTION 'exam_room:not_member';
    END IF;
    IF (SELECT count(*) FROM public.exam_room_messages
        WHERE user_id = NEW.user_id AND author_kind = 'v' AND created_at >= (date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata')) AT TIME ZONE 'Asia/Kolkata') >= 5 THEN
      RAISE EXCEPTION 'exam_room:v_limit';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER exam_room_message_guard
  BEFORE INSERT ON public.exam_room_messages
  FOR EACH ROW EXECUTE FUNCTION private.exam_room_message_guard();

CREATE FUNCTION private.exam_room_report_guard() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE
  v_msg public.exam_room_messages%ROWTYPE;
BEGIN
  SELECT * INTO v_msg FROM public.exam_room_messages WHERE id = NEW.message_id;
  IF NOT EXISTS (SELECT 1 FROM public.exam_room_members WHERE exam_slug = v_msg.exam_slug AND user_id = NEW.user_id) THEN
    RAISE EXCEPTION 'exam_room:not_member';
  END IF;
  IF v_msg.author_kind = 'student' AND v_msg.user_id = NEW.user_id THEN
    RAISE EXCEPTION 'exam_room:own_message';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER exam_room_report_guard
  BEFORE INSERT ON public.exam_room_reports
  FOR EACH ROW EXECUTE FUNCTION private.exam_room_report_guard();

CREATE FUNCTION private.exam_room_report_hide() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  UPDATE public.exam_room_messages m
     SET hidden_at = now(), hidden_reason = 'reports'
   WHERE m.id = NEW.message_id
     AND m.hidden_at IS NULL
     AND (SELECT count(*) FROM public.exam_room_reports r
           WHERE r.message_id = m.id AND (m.reviewed_at IS NULL OR r.created_at > m.reviewed_at)) >= 3;
  RETURN NULL;
END;
$$;

CREATE TRIGGER exam_room_report_hide
  AFTER INSERT ON public.exam_room_reports
  FOR EACH ROW EXECUTE FUNCTION private.exam_room_report_hide();

CREATE FUNCTION private.exam_room_answer_guard() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE
  v_question uuid;
  v_correct  boolean;
BEGIN
  SELECT question_id INTO v_question FROM public.exam_room_messages WHERE id = NEW.message_id;
  SELECT o.is_correct INTO v_correct FROM public.options o WHERE o.id = NEW.option_id AND o.question_id = v_question;
  IF v_question IS NULL OR v_correct IS NULL THEN
    RAISE EXCEPTION 'exam_room:bad_option';
  END IF;
  NEW.correct := v_correct;
  NEW.created_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER exam_room_answer_guard
  BEFORE INSERT ON public.exam_room_answers
  FOR EACH ROW EXECUTE FUNCTION private.exam_room_answer_guard();

-- The morning question (or a staff swap): unpin the room's current pin and pin
-- this one, in one transaction, so a room never has two pins or none mid-swap.
CREATE FUNCTION public.post_exam_room_daily(
  p_exam_slug   text,
  p_question_id uuid,
  p_body        text,
  p_user_id     uuid DEFAULT NULL
) RETURNS bigint
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_id bigint;
BEGIN
  UPDATE public.exam_room_messages SET pinned = false WHERE exam_slug = p_exam_slug AND pinned;
  INSERT INTO public.exam_room_messages (exam_slug, author_kind, user_id, display_name, body, question_id, pinned)
  VALUES (p_exam_slug, 'team', p_user_id, 'PYQ Vault team', p_body, p_question_id, true)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- Per joined room: unread (capped at 100: the badge says 9+ long before) and
-- the latest visible message, for the rooms list. Own messages are not unread.
CREATE FUNCTION public.exam_room_summaries(p_user_id uuid)
RETURNS TABLE (exam_slug text, unread integer, last_name text, last_body text, last_at timestamptz)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT m.exam_slug,
         (SELECT count(*)::int FROM (
            SELECT 1 FROM public.exam_room_messages x
             WHERE x.exam_slug = m.exam_slug AND x.id > m.last_read_id AND x.hidden_at IS NULL
               AND NOT (x.author_kind = 'student' AND x.user_id = p_user_id)
             LIMIT 100) s),
         l.display_name, l.body, l.created_at
    FROM public.exam_room_members m
    LEFT JOIN LATERAL (
      SELECT x.display_name, x.body, x.created_at FROM public.exam_room_messages x
       WHERE x.exam_slug = m.exam_slug AND x.hidden_at IS NULL
       ORDER BY x.id DESC LIMIT 1
    ) l ON true
   WHERE m.user_id = p_user_id
$$;

REVOKE ALL ON FUNCTION public.post_exam_room_daily(text, uuid, text, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.exam_room_summaries(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.post_exam_room_daily(text, uuid, text, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.exam_room_summaries(uuid) TO service_role;
