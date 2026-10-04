-- 0131_free_downloads.sql
--
-- One free Word download per account (2026-10-04). A visitor without the
-- Premium Pass may download ONE file, a Question Paper or an Answer Key, after
-- signing in, so they see the proof before paying. In the week before, 107
-- visitors met the download gate, 52 of the 94 signed-out ones tapped "Get
-- pass" with the price shown, and none bought.
--
-- WHAT MAKES IT ONCE: `user_id` is the PRIMARY KEY, so a second row for the
-- same account cannot exist. The export route checks for a row before the
-- expensive build (fail fast), builds the file, then inserts with
-- ON CONFLICT DO NOTHING and serves the file only if its insert won. Two taps
-- racing therefore yield one file, and a build that fails never spends it.
--
-- The free file is per ACCOUNT, deliberately not per device or per person: a
-- second Google account costs more effort than the ₹99 pass (the owner's call).
--
-- WRITES ARE SERVICE-ROLE ONLY (the export route), as with entitlements, so a
-- user JWT can neither reset nor forge the row. A user reads only their own,
-- which is how /browse tells the box whether the free file is still there.

CREATE TABLE public.free_downloads (
  user_id        uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  kind           text NOT NULL CHECK (kind IN ('paper', 'key')),
  question_count integer NOT NULL CHECK (question_count BETWEEN 1 AND 200),
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.free_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "free_downloads_select_own"
  ON public.free_downloads
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- No INSERT/UPDATE/DELETE policies: writes are service-role only.
