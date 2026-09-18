-- 0109_share_events.sql
--
-- A row per outbound share tapped on the mock result screen.
--
-- WHY: 733 mock attempts had produced no distribution events at all — the only
-- share affordance in the app was staff-only, on the catalogue page. The result
-- screen now offers one, and this table is what makes that loop falsifiable.
--
-- WHY IT IS NOT ENOUGH TO MEASURE THE INBOUND SIDE: migration 0106 already
-- attributes an arriving click (utm_campaign='mock-result' lands in
-- student_profiles.acq_campaign), so signups FROM shares are already countable.
-- But zero signups is ambiguous without this table — it reads identically
-- whether nobody tapped share or plenty did and nobody clicked through, and
-- those call for opposite fixes (change the button vs change the link card).
-- Recording the outbound tap separates them, and gives the two ratios that
-- describe a viral loop: shares per attempt, and signups per share.
--
-- WHY A TABLE AND NOT A user_activity KIND: the same rule 0104 was written
-- under. user_activity is a closed, learning-anchored allowlist about what a
-- STUDENT learns, and every kind in it is a learning act. Sharing a link is a
-- DISTRIBUTION act — filing it there would put it into FEATURE_LABELS and the
-- per-feature retention-lift table as though it were a feature students learn
-- from, and dilute both readings.
--
-- WHAT A ROW DOES NOT PROVE: that anything was actually sent. navigator.share()
-- resolves when the OS sheet is dismissed and never reports the chosen app, and
-- a wa.me tap can be abandoned in WhatsApp. This records INTENT TO SHARE, which
-- is the honest name for it; the delivered half of the loop is only ever
-- visible as an inbound tagged arrival. Read the two together, never this alone.
--
-- included_score is stored because it is the one product question this feature
-- was built around: the share defaults to naming the TEST rather than the score,
-- on the argument that a score-forward share only fires for students who did
-- well. This column is what will eventually settle that — what share of students
-- opt in, and whether their scores skew high.
--
-- user_id is NULLABLE with ON DELETE SET NULL, matching export_events: losing
-- the row when an account is deleted would silently revise the past volume.

CREATE TABLE public.share_events (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  -- What was shared. Only mocks today; a column rather than an assumption so a
  -- /notes or /quiz share does not need a second table.
  subject_kind   text        NOT NULL CHECK (subject_kind IN ('mock')),
  -- The mock's slug (not its uuid): the slug is what the shared URL carries, so
  -- a row can be reconciled against an inbound landing path without a join.
  subject_slug   text        NOT NULL CHECK (length(subject_slug) BETWEEN 1 AND 200),
  -- Mirrors ShareChannel in lib/mocks/share.ts. 'share' is the OS sheet, whose
  -- destination app is genuinely unknown — it is NOT a synonym for whatsapp.
  channel        text        NOT NULL CHECK (channel IN ('whatsapp', 'share', 'copy')),
  -- Did the student tick "include my score"? See the header.
  included_score boolean     NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- The two reads this table exists for: volume over time, and shares per mock.
CREATE INDEX share_events_created_idx ON public.share_events (created_at DESC);
CREATE INDEX share_events_subject_idx ON public.share_events (subject_kind, subject_slug, created_at DESC);

-- RLS on, ZERO policies — same posture as export_events (0104) and rate_limits
-- (0011). Nobody reads this through PostgREST: the write goes through a server
-- route holding the service-role client, and no student surface reads it back.
ALTER TABLE public.share_events ENABLE ROW LEVEL SECURITY;
