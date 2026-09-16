-- 0106_student_profile_acquisition.sql
--
-- First-touch acquisition attribution on the student profile.
--
-- WHY: nothing in this codebase captured where a student came from. With 330
-- accounts and no referrer, UTM or landing page recorded anywhere, no cohort
-- could be attributed to a channel, and the top of the funnel had no denominator
-- at all — we could not say whether those accounts cost 3,000 visitors or
-- 300,000, nor which of /questions, /notes or /guide actually converts. That is
-- the single biggest gap in the PMF coverage map (lib/pmf/snapshot.ts).
--
-- WHY ON student_profiles AND NOT ITS OWN TABLE: this is exactly one immutable
-- fact per account — the first touch, never updated (see below). A separate
-- table would buy nothing but a join, and there is no multi-row history to hold
-- because we deliberately do not record subsequent visits.
--
-- FIRST TOUCH, NEVER OVERWRITTEN. A student may find us on Google, leave, and
-- return via a WhatsApp link a week later. The channel that earned the account
-- is the FIRST one; last-touch would credit whichever link they happened to
-- click most recently and would make every campaign look like it works. The
-- write path uses a coalesce-style guard and the values are treated as
-- write-once — see isFirstTouchWorthStoring in lib/acquisition/source.ts.
--
-- DIRECT IS NOT STORED as a first touch. If a bare direct hit could claim the
-- slot, the first internal page load after a campaign click would overwrite
-- nothing with "direct" and the campaign would be attributed to nobody. So these
-- columns stay NULL until a hit actually names a channel — a NULL here means
-- "we never learned", which is the honest value, and is why there is no DEFAULT.
--
-- NO QUERY STRING on the landing path: a student's own search terms can contain
-- their name, and this row is not the place for it. Every field is length-capped
-- in the parser AND here, so a crafted URL cannot write an essay into the table.
--
-- HISTORICAL ROWS STAY NULL. This is not backfillable — the information was
-- never collected. Any future read must treat "unknown" as its own bucket and
-- never fold it into "direct", or the past will quietly look like a channel.

ALTER TABLE public.student_profiles
  ADD COLUMN acq_source        text CHECK (acq_source IS NULL OR char_length(acq_source) <= 64),
  ADD COLUMN acq_medium        text CHECK (acq_medium IS NULL OR char_length(acq_medium) <= 64),
  ADD COLUMN acq_campaign      text CHECK (acq_campaign IS NULL OR char_length(acq_campaign) <= 64),
  ADD COLUMN acq_landing       text CHECK (acq_landing IS NULL OR char_length(acq_landing) <= 64),
  ADD COLUMN acq_referrer_host text CHECK (acq_referrer_host IS NULL OR char_length(acq_referrer_host) <= 64),
  ADD COLUMN acq_captured_at   timestamptz;

-- The read this exists for: group cohorts by channel.
CREATE INDEX student_profiles_acq_idx
  ON public.student_profiles (acq_source, acq_medium)
  WHERE acq_source IS NOT NULL;

COMMENT ON COLUMN public.student_profiles.acq_source IS
  'First-touch channel (google|instagram|<utm_source>|<referrer host>). Write-once; NULL = never learned, which is NOT the same as direct.';
