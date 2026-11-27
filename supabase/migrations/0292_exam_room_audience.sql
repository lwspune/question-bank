-- 0292_exam_room_audience.sql
--
-- Exam circles reach students who have not joined (owner, 2026-11-27). In the
-- first day and a half 4 of 341 active students joined a circle, and the five
-- circles that existed were the five the owner had joined: a circle's row was
-- made on its first join, and the morning question went only to circles with
-- members. A student who had not joined saw no number on the bubble at all.
--
-- Now the morning question goes to the circle of every exam students have,
-- and the bubble counts 1 for each such circle not joined that has today's
-- question (app side, lib/rooms/alert). This function is the "every exam
-- students have" list for the morning run (scripts/rooms/daily.ts): each exam
-- a student CHOSE (student_profiles.target_exams) plus the GUESSED exam
-- (student_exam_guesses, 0254) of a student who chose none. A guess is left
-- out once the student has chosen, because their circles list leaves it out
-- then too (lib/rooms/list buildRoomList).
--
-- WHY a function and not a read in the script: there are more profiles than
-- PostgREST returns in one page (1,000), and the answer is a short distinct
-- list. Slugs the exam registry no longer knows are dropped app side
-- (lib/rooms/alert dailyRooms), like target_exams everywhere else.
--
-- Service role only, like every other exam room function.

CREATE FUNCTION public.exam_room_audience()
RETURNS TABLE (exam_slug text)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT DISTINCT s.exam_slug FROM (
    SELECT unnest(p.target_exams) AS exam_slug
      FROM public.student_profiles p
    UNION
    SELECT g.exam
      FROM public.student_exam_guesses g
      LEFT JOIN public.student_profiles p ON p.user_id = g.user_id
     WHERE coalesce(cardinality(p.target_exams), 0) = 0
  ) s
  WHERE s.exam_slug IS NOT NULL
$$;

REVOKE ALL ON FUNCTION public.exam_room_audience() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.exam_room_audience() TO service_role;
