-- 0291_exam_room_system_lines.sql
--
-- Exam rooms, round 3 (owner, 2026-11-26), on top of 0289 + 0290.
--
-- 1. System lines. A small grey line in the chat when a student joins a room
--    ("Quiet Falcon joined") and when they answer a daily question ("Quiet
--    Falcon answered the daily question"). Stored as exam_room_messages rows
--    with author_kind 'system' and a system_event, so the window's existing
--    polling delivers them in order. Written HERE, by triggers, so no code
--    path can forget one:
--      * joined: on a student's FIRST join of a room only (owner's choice);
--        leaving and joining again writes nothing (partial unique index). A
--        closed room writes nothing, and the join is never blocked by it.
--      * answered: one per answer (exam_room_answers' primary key already
--        allows one per student per question). It never says which option or
--        whether it was right: that would give the answer away and shame a
--        wrong one (engagement gate, no ranking).
--    Under the room nickname (0290), never the account name. A system line is
--    never unread, never a room's last message in the list, and cannot be
--    reported, replied to or sent to V.
--
-- 2. Pin on join. post_exam_room_daily_if_missing pins a question only when the
--    room has no pin from today (IST), under an advisory lock, so two students
--    joining at once, or a join racing the 07:00 run, can never pin twice. A
--    room whose first student joins after 07:00 gets its question at once
--    instead of the next morning. Staff swaps keep post_exam_room_daily.
--
-- No back-fill: the 8 members who joined before this get no line (it would
-- sit out of order, and 5 of them are staff).

ALTER TABLE public.exam_room_messages DROP CONSTRAINT exam_room_messages_author_kind_check;
ALTER TABLE public.exam_room_messages
  ADD CONSTRAINT exam_room_messages_author_kind_check CHECK (author_kind IN ('student', 'team', 'v', 'system'));

ALTER TABLE public.exam_room_messages ADD COLUMN system_event text CHECK (system_event IN ('joined', 'answered'));

ALTER TABLE public.exam_room_messages
  ADD CONSTRAINT exam_room_messages_system_shape CHECK (
    (author_kind = 'system') = (system_event IS NOT NULL)
    AND (author_kind <> 'system' OR (user_id IS NOT NULL AND question_id IS NULL AND reply_to IS NULL AND NOT pinned))
  );

CREATE UNIQUE INDEX exam_room_messages_one_join_line
  ON public.exam_room_messages (exam_slug, user_id) WHERE system_event = 'joined';

COMMENT ON COLUMN public.exam_room_messages.system_event IS
  'For author_kind = system: joined (first join of the room) or answered (a daily question). Written by triggers; migration 0291.';

-- The message guard of 0289, plus: a system line needs a member; a student
-- reply and a V reply may not point at a system line.
CREATE OR REPLACE FUNCTION private.exam_room_message_guard() RETURNS trigger
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
    IF NEW.reply_to IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.exam_room_messages
      WHERE id = NEW.reply_to AND exam_slug = NEW.exam_slug AND author_kind <> 'system'
    ) THEN
      RAISE EXCEPTION 'exam_room:reply_target';
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
    IF NOT FOUND OR v_target.exam_slug <> NEW.exam_slug OR v_target.author_kind IN ('v', 'system') OR v_target.hidden_at IS NOT NULL THEN
      RAISE EXCEPTION 'exam_room:v_target';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.exam_room_members WHERE exam_slug = NEW.exam_slug AND user_id = NEW.user_id) THEN
      RAISE EXCEPTION 'exam_room:not_member';
    END IF;
    IF (SELECT count(*) FROM public.exam_room_messages
        WHERE user_id = NEW.user_id AND author_kind = 'v' AND created_at >= (date_trunc('day', now() AT TIME ZONE 'Asia/Kolkata')) AT TIME ZONE 'Asia/Kolkata') >= 5 THEN
      RAISE EXCEPTION 'exam_room:v_limit';
    END IF;

  ELSIF NEW.author_kind = 'system' THEN
    NEW.created_at := now();
    IF NOT EXISTS (SELECT 1 FROM public.exam_room_members WHERE exam_slug = NEW.exam_slug AND user_id = NEW.user_id) THEN
      RAISE EXCEPTION 'exam_room:not_member';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- The report guard of 0289, plus: a system line cannot be reported.
CREATE OR REPLACE FUNCTION private.exam_room_report_guard() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE
  v_msg public.exam_room_messages%ROWTYPE;
BEGIN
  SELECT * INTO v_msg FROM public.exam_room_messages WHERE id = NEW.message_id;
  IF v_msg.author_kind = 'system' THEN
    RAISE EXCEPTION 'exam_room:system';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.exam_room_members WHERE exam_slug = v_msg.exam_slug AND user_id = NEW.user_id) THEN
    RAISE EXCEPTION 'exam_room:not_member';
  END IF;
  IF v_msg.author_kind = 'student' AND v_msg.user_id = NEW.user_id THEN
    RAISE EXCEPTION 'exam_room:own_message';
  END IF;
  RETURN NEW;
END;
$$;

CREATE FUNCTION private.exam_room_join_line() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.exam_rooms WHERE exam_slug = NEW.exam_slug AND open) THEN
    INSERT INTO public.exam_room_messages (exam_slug, author_kind, user_id, display_name, body, system_event)
    VALUES (NEW.exam_slug, 'system', NEW.user_id, NEW.display_name, 'joined the room', 'joined')
    ON CONFLICT (exam_slug, user_id) WHERE system_event = 'joined' DO NOTHING;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER exam_room_join_line
  AFTER INSERT ON public.exam_room_members
  FOR EACH ROW EXECUTE FUNCTION private.exam_room_join_line();

CREATE FUNCTION private.exam_room_answer_line() RETURNS trigger
LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE
  v_slug text;
  v_name text;
BEGIN
  SELECT m.exam_slug INTO v_slug
    FROM public.exam_room_messages m
    JOIN public.exam_rooms r ON r.exam_slug = m.exam_slug AND r.open
   WHERE m.id = NEW.message_id;
  IF v_slug IS NULL THEN
    RETURN NULL;
  END IF;
  SELECT display_name INTO v_name FROM public.exam_room_members WHERE exam_slug = v_slug AND user_id = NEW.user_id;
  IF v_name IS NULL THEN
    RETURN NULL;
  END IF;
  INSERT INTO public.exam_room_messages (exam_slug, author_kind, user_id, display_name, body, system_event)
  VALUES (v_slug, 'system', NEW.user_id, v_name, 'answered the daily question', 'answered');
  RETURN NULL;
END;
$$;

CREATE TRIGGER exam_room_answer_line
  AFTER INSERT ON public.exam_room_answers
  FOR EACH ROW EXECUTE FUNCTION private.exam_room_answer_line();

-- The summaries of 0289, minus system lines (never unread, never the preview).
CREATE OR REPLACE FUNCTION public.exam_room_summaries(p_user_id uuid)
RETURNS TABLE (exam_slug text, unread integer, last_name text, last_body text, last_at timestamptz)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT m.exam_slug,
         (SELECT count(*)::int FROM (
            SELECT 1 FROM public.exam_room_messages x
             WHERE x.exam_slug = m.exam_slug AND x.id > m.last_read_id AND x.hidden_at IS NULL
               AND x.author_kind <> 'system'
               AND NOT (x.author_kind = 'student' AND x.user_id = p_user_id)
             LIMIT 100) s),
         l.display_name, l.body, l.created_at
    FROM public.exam_room_members m
    LEFT JOIN LATERAL (
      SELECT x.display_name, x.body, x.created_at FROM public.exam_room_messages x
       WHERE x.exam_slug = m.exam_slug AND x.hidden_at IS NULL AND x.author_kind <> 'system'
       ORDER BY x.id DESC LIMIT 1
    ) l ON true
   WHERE m.user_id = p_user_id
$$;

CREATE FUNCTION public.post_exam_room_daily_if_missing(
  p_exam_slug   text,
  p_question_id uuid,
  p_body        text
) RETURNS bigint
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('exam_room_daily:' || p_exam_slug));
  IF EXISTS (
    SELECT 1 FROM public.exam_room_messages
     WHERE exam_slug = p_exam_slug AND pinned
       AND (created_at AT TIME ZONE 'Asia/Kolkata')::date = (now() AT TIME ZONE 'Asia/Kolkata')::date
  ) THEN
    RETURN NULL;
  END IF;
  RETURN public.post_exam_room_daily(p_exam_slug, p_question_id, p_body, NULL);
END;
$$;

REVOKE ALL ON FUNCTION public.exam_room_summaries(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.exam_room_summaries(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.post_exam_room_daily_if_missing(text, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.post_exam_room_daily_if_missing(text, uuid, text) TO service_role;
