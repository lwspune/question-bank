-- 0281_exam_sittings.sql
--
-- The exam calendar moves from code (src/lib/exam/calendar.ts EXAM_CALENDAR)
-- to a table, so the /blog skill can record a sitting's date the day its
-- notice comes out, without a branch, a merge and a push (owner, 2026-11-22).
-- Students' countdowns (the avatar menu, /me, V's day card, the board path,
-- the Learn course page) read it through lib/exam/calendarQuery, cached for a
-- day, so a new date shows within a day.
--
-- DERIVE-WITH-OVERRIDE is unchanged: student_profiles.exam_date (0116) still
-- wins when set and in the future.
--
-- `official` is true only once the conducting body has announced the date,
-- and then the row must link the notice (official_needs_url). An expected
-- date ("the usual pattern") is allowed without one, and the UI says
-- "expected". A guess labelled as one is honest; a guess stored as a fact is
-- not.
--
-- THE ROT PROBE that the code calendar's test used to be is now
-- tests/exam-calendar-live.test.ts (prod-contract, daily): it fails when an
-- exam's LATEST sitting is more than 14 days past. Past rows may stay as
-- history; what must not happen is an exam whose countdown quietly vanished.
-- Rejected: keeping the code file as a second copy (two sources drift), and an
-- approval step before a date goes live (owner: an official date is a fact).
--
-- Writes: service role only (`npm run calendar -- --file=... --apply`, which
-- applies the same checks first). No write policy, so no JWT can write.
-- Exam slugs are checked against EXAM_REGISTRY by that script: the registry is
-- code, so no foreign key can say it.

CREATE TABLE public.exam_sittings (
  exam        text NOT NULL CHECK (exam ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sitting     text NOT NULL CHECK (sitting ~ '^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$' AND char_length(sitting) <= 20),
  label       text NOT NULL CHECK (char_length(label) BETWEEN 1 AND 80 AND label !~ '(—|–|\s--\s)'),
  date        date NOT NULL,
  official    boolean NOT NULL DEFAULT false,
  source      text NOT NULL CHECK (char_length(source) BETWEEN 1 AND 400),
  source_url  text CHECK (source_url ~ '^https://\S+$'),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (exam, sitting),
  CONSTRAINT exam_sittings_official_needs_url CHECK (NOT official OR source_url IS NOT NULL)
);

COMMENT ON TABLE public.exam_sittings IS
  'The exam calendar behind every countdown (0281). One row per sitting; written by npm run calendar (service role).';

ALTER TABLE public.exam_sittings ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.exam_sittings FROM anon, authenticated;
GRANT SELECT ON public.exam_sittings TO anon, authenticated;

CREATE POLICY exam_sittings_select_all ON public.exam_sittings
  FOR SELECT TO anon, authenticated
  USING (true);

-- The 15 sittings the code calendar held on 2026-11-22, with their notices.
INSERT INTO public.exam_sittings (exam, sitting, label, date, official, source, source_url) VALUES
  ('jee-mains', '2027-Jan', 'JEE Main 2027 (January)', '2027-01-20', true,
   'NTA, JEE (Main) 2027 Information Bulletin (24 Oct 2026); NTA calls the dates tentative: 20-24 and 28 Jan 2027',
   'https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf'),
  ('mh-hsc-12', '2027', 'HSC boards 2027', '2027-02-11', false, 'expected from the usual pattern; not yet announced', NULL),
  ('cbse-10', '2027', 'CBSE Class 10 boards 2027', '2027-02-15', false, 'expected from the usual pattern; not yet announced', NULL),
  ('cbse-12', '2027', 'CBSE Class 12 boards 2027', '2027-02-15', false, 'expected from the usual pattern; not yet announced', NULL),
  ('mh-ssc-10', '2027', 'SSC boards 2027', '2027-03-01', false, 'expected from the usual pattern; not yet announced', NULL),
  ('jee-mains', '2027-Apr', 'JEE Main 2027 (April)', '2027-04-02', true,
   'NTA, JEE (Main) 2027 Information Bulletin (24 Oct 2026); NTA calls the dates tentative: 2-7 Apr 2027',
   'https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf'),
  ('nda', '2027-I', 'NDA 2027 (I)', '2027-04-11', true,
   'UPSC Calendar of examinations 2027 (uploaded 20 May 2026)',
   'https://www.upsc.gov.in/uploads/2026/06/Calendar-Year-2027-Engl-200526.pdf'),
  ('cds', '2027-I', 'CDS 2027 (I)', '2027-04-11', true,
   'UPSC Calendar of examinations 2027 (uploaded 20 May 2026): listed with NDA (I), 2027 on the same dates',
   'https://www.upsc.gov.in/uploads/2026/06/Calendar-Year-2027-Engl-200526.pdf'),
  ('mht-cet', '2027', 'MHT-CET 2027', '2027-04-16', true,
   'State CET Cell press note, 16 Nov 2026: PCM 16-26 Apr 2027 (PCB 8-13 Apr); the note calls the dates probable',
   'https://cetcell.mahacet.org/wp-content/uploads/2026/11/DATES-OF-COMMENCEMENT-OF-MAHA-CET-2027-16-NOV-2026.pdf'),
  ('neet', '2027', 'NEET 2027', '2027-05-02', false, 'expected from the usual pattern; not yet announced', NULL),
  ('ipmat-indore', '2027', 'IPMAT Indore 2027', '2027-05-09', false, 'expected from the usual pattern; not yet announced', NULL),
  ('ipmat-rohtak', '2027', 'IPMAT Rohtak 2027', '2027-05-09', false, 'expected from the usual pattern; not yet announced', NULL),
  ('jipmat', '2027', 'JIPMAT 2027', '2027-05-09', false, 'expected from the usual pattern; not yet announced', NULL),
  ('nda', '2027-II', 'NDA 2027 (II)', '2027-09-19', true,
   'UPSC Calendar of examinations 2027 (uploaded 20 May 2026)',
   'https://www.upsc.gov.in/uploads/2026/06/Calendar-Year-2027-Engl-200526.pdf'),
  ('cds', '2027-II', 'CDS 2027 (II)', '2027-09-19', true,
   'UPSC Calendar of examinations 2027 (uploaded 20 May 2026): listed with NDA (II), 2027 on the same dates',
   'https://www.upsc.gov.in/uploads/2026/06/Calendar-Year-2027-Engl-200526.pdf');
