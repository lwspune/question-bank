-- 0045_student_profiles.sql
--
-- Per-STUDENT profile data captured AFTER signup — currently just the contact
-- mobile number. Keyed on auth.users(id), independent of orgs (a self-serve
-- student has no org_members row), like the entitlements axis (migration 0026).
--
-- WHY a table (not user_metadata): the mobile is contact data LWS's sales team
-- reads, and storing it in a real column lets an account be correlated to a
-- quiz_lead by mobile later. Unlike entitlements, a student WRITES THEIR OWN row
-- (own-row upsert via their JWT) — the mobile is collected from the student at
-- the mock-result "gate the reward" step, not granted by an admin.
--
-- Mobile is stored CANONICAL (`91XXXXXXXXXX`) via normalizeMobile
-- (src/lib/profile/mobile.ts). Deliberately NOT unique: siblings can share a
-- number and a re-used number must never block a student from seeing their
-- result (duplicates are a signal, mirroring the quiz_leads convention).

CREATE TABLE public.student_profiles (
  user_id     uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  mobile      text NOT NULL,
  consent     boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Correlate accounts ↔ quiz_leads by mobile (future funnel unification).
CREATE INDEX student_profiles_mobile_idx ON public.student_profiles (mobile);

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- A student reads only their own profile. Admin roster reads go through the
-- service-role client, which bypasses RLS by design.
CREATE POLICY "student_profiles_select_own"
  ON public.student_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- A student may create their own row (WITH CHECK pins it to their uid so they
-- can't forge a profile for someone else).
CREATE POLICY "student_profiles_insert_own"
  ON public.student_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- A student may update their own row (e.g. correct a mistyped number).
CREATE POLICY "student_profiles_update_own"
  ON public.student_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- No DELETE policy: a student can't delete their profile (cascade on user
-- deletion handles cleanup).
