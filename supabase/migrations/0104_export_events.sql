-- 0104_export_events.sql
--
-- A row per Word/PPT export served by /api/export.
--
-- WHY: the download is the teacher-gated payoff — the whole point of the access
-- gate shipped 2026-07-18 — and until now the route wrote NOTHING. There was no
-- way to tell whether gating downloads created value or simply added friction,
-- because nobody could answer "who downloads, how often, and what". The PMF
-- coverage map (lib/pmf/snapshot.ts) listed this as one of four dark surfaces.
--
-- WHY A TABLE AND NOT A user_activity KIND: user_activity is a closed,
-- learning-anchored allowlist about what a STUDENT learns. An export is a
-- TEACHER's production action against the bank, and it carries a payload the
-- activity spine has no room for (how many questions, which kind of artifact).
-- Filing it under a learning-event log would dilute both.
--
-- NOT RECORDED, deliberately: the filter set or question ids behind the export.
-- The interesting questions here are "how much is this used and by whom", and
-- storing the exact paper a teacher built is a materially more sensitive record
-- for no measurement gain. question_count is the size signal; that is enough.
--
-- user_id is NULLABLE: the route's access rules have changed once already
-- (anon → any signed-in → teacher-only) and could again. A null means the
-- export was served without a resolvable user rather than "no user exists", and
-- an ON DELETE SET NULL keeps the volume history honest when an account is
-- deleted — losing the row would silently revise the past.

CREATE TABLE public.export_events (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  org_id         uuid        REFERENCES public.organizations(id) ON DELETE SET NULL,
  -- 'paper' | 'key' | 'tags' | 'ppt' — mirrors ExportKind in lib/export/access.ts.
  kind           text        NOT NULL,
  question_count integer     NOT NULL DEFAULT 0 CHECK (question_count >= 0),
  -- 'cart' (explicit question ids) | 'filters' (a filtered slice of the bank).
  mode           text        NOT NULL CHECK (mode IN ('cart', 'filters')),
  -- true when the caller held an org role at export time — separates staff
  -- production from student/self-serve use without a second join later.
  is_staff       boolean     NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT export_events_kind_ck CHECK (kind IN ('paper', 'key', 'tags', 'ppt'))
);

-- The two reads this table exists for: volume over time, and per-user history.
CREATE INDEX export_events_created_idx ON public.export_events (created_at DESC);
CREATE INDEX export_events_user_idx ON public.export_events (user_id, created_at DESC);

-- RLS on, ZERO policies: nobody reads this through PostgREST. Admin surfaces use
-- the service-role client (which bypasses RLS), and a student has no business
-- reading an export log — including their own, which would leak nothing useful
-- to them and adds a surface for no reason. Same posture as rate_limits (0011).
ALTER TABLE public.export_events ENABLE ROW LEVEL SECURITY;
