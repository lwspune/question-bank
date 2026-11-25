-- 0290_exam_room_nicknames_and_hiding.sql
--
-- Exam rooms, round 2 (owner, 2026-11-25), on top of 0289.
--
-- 1. Anonymity. exam_room_members.display_name becomes the student's ROOM
--    NICKNAME, picked at Join (prefilled with a random friendly name, e.g.
--    "Quiet Falcon") and changeable from the room's menu; 0289 had filled it
--    with the account name cut to "Priya S.", which in a small room can still
--    point to a real student. Nicknames are 2-20 characters (lib/rooms/nickname
--    checks letters, long numbers, staff-like names and abuse first) and unique
--    within a room ignoring case and outer spaces, so two students can never
--    look the same. Old messages keep the name they were sent under
--    (exam_room_messages.display_name is a copy, by design).
--    Safe to tighten: production had 0 members when this was written (0289's
--    code had not shipped).
--
-- 2. Focus. student_profiles.rooms_button_hidden_until hides the rooms button:
--    null = shown, a time = hidden until then (the 2-hour option), 'infinity' =
--    until the student turns it back on. On the account, not in one browser, so
--    it holds on phone and computer. The rooms stay reachable from the account menu.

ALTER TABLE public.exam_room_members DROP CONSTRAINT exam_room_members_display_name_check;
ALTER TABLE public.exam_room_members
  ADD CONSTRAINT exam_room_members_display_name_check CHECK (length(btrim(display_name)) BETWEEN 2 AND 20);

CREATE UNIQUE INDEX exam_room_members_nickname_uniq
  ON public.exam_room_members (exam_slug, lower(btrim(display_name)));

ALTER TABLE public.student_profiles ADD COLUMN rooms_button_hidden_until timestamptz;

COMMENT ON COLUMN public.student_profiles.rooms_button_hidden_until IS
  'Exam rooms button hidden until this time; infinity = until turned back on; null = shown. Migration 0290.';
