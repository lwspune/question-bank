-- 0269_partner_course_clicks.sql
--
-- Taps on partner course cards on /store (owner, 2026-11-17). A TRIAL: /store
-- (renamed Ebooks -> Store) links online courses of our offline partner
-- Defence Mania, CDS 1 2027 Sikandar 3.0 and the AFCAT 1 2027 Crash Course, to
-- see whether students want them before anything is agreed with the partner.
-- Experiment `partner-courses`: keep going if 30+ different students tap a
-- course in 6 weeks. The course list is code (src/lib/partnerCourses/courses.ts).
--
--   course_id   the course's id in that list (the UTM campaign too)
--   exam_slug   the exam shelf it sat on
--   user_id     the account, when signed in
--   visitor_id  a random first-party id per browser (cookie qb_vid), on EVERY
--               row, so signed-out visitors (most of the traffic) can be
--               counted once each
--
-- WHY A TABLE AND NOT user_activity: user_activity is signed-in only, and most
-- taps will come from signed-out visitors. WHY NOT Vercel Analytics alone: ad
-- blockers drop its events and it cannot count unique students per course.
--
-- WHY service-role-only (RLS enabled, NO policies): GET /api/partner-course/[id]
-- writes with the service role after the redirect target is fixed, and the
-- readout (scripts/partner-courses/readout.sql) is run by hand. Staff taps are
-- left out at read time by joining org_members and platform_admins.
--
-- The CHECKs mirror the route and lib/partnerCourses/courses.ts, so a bad row
-- is refused by the database as well as the app.

CREATE TABLE public.partner_course_clicks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   text NOT NULL CHECK (course_id ~ '^[a-z0-9-]{1,60}$'),
  exam_slug   text CHECK (char_length(exam_slug) BETWEEN 1 AND 64),
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  visitor_id  uuid NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.partner_course_clicks IS
  'Taps on partner course cards on /store (trial, 2026-11-17). Service-role only; see migration 0269.';

CREATE INDEX partner_course_clicks_course_idx ON public.partner_course_clicks (course_id, created_at DESC);
CREATE INDEX partner_course_clicks_user_idx ON public.partner_course_clicks (user_id) WHERE user_id IS NOT NULL;

-- RLS enabled with NO policies -> only the service-role client can read/write.
ALTER TABLE public.partner_course_clicks ENABLE ROW LEVEL SECURITY;
