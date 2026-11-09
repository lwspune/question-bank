-- 0246_institute_prospects.sql
--
-- Institute prospects (owner, 2026-11-09). Coaching classes within 3 km of FC
-- Road, Pune, taken from Google Maps through Apify's Google Maps scraper, so
-- the owner can call or visit them to sell PYQ Vault to institutes. Read and
-- edited at /dashboard/institutes (superadmin only).
--
-- WHY: B2C sells a Rs 199 / Rs 499 pass; the owner wants to try institutes as
-- steady money, small classes first because they have no question bank of
-- their own. Self-serve institute signups had stalled (7 outside orgs, 0 papers
-- in 30 days), so this is a sales list, not a product feature.
--
-- WHY service-role-only (RLS enabled, NO policies): the rows carry phone
-- numbers (some listings are home tutors, so a private person's number) and the
-- owner's sales notes. Only scripts/institutes/import.ts, the page and POST
-- /api/admin/institute-prospect touch it, all with the service role behind a
-- superadmin check. Same model as tutor_interest (0190).
--
-- TWO KINDS OF COLUMN:
--   * Maps fields (name ... area): written by the import, refreshed on a re-run.
--   * Owner fields (status, note, follow_up): written only from the page. The
--     import's upsert never names them, so a re-run keeps them; on a first
--     insert they take their defaults.
--
-- kind is a GUESS (lib/institutes/prospects classifyKind) from the name, the
-- Maps category and the search that found the place. The owner corrects a
-- wrong one by marking it not_fit, so kind is never edited by hand.
-- Size (small/medium/large) is derived from `reviews` at read time, not stored.
--
-- place_id is Google's id for the place: one row per place, and the key the
-- re-import upserts on.

CREATE TABLE public.institute_prospects (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id      text NOT NULL UNIQUE CHECK (char_length(place_id) BETWEEN 1 AND 200),
  name          text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 300),
  category      text CHECK (char_length(category) <= 120),
  address       text CHECK (char_length(address) <= 400),
  neighborhood  text CHECK (char_length(neighborhood) <= 120),
  phone         text CHECK (char_length(phone) <= 40),
  website       text CHECK (char_length(website) <= 600),
  maps_url      text CHECK (char_length(maps_url) <= 1000),
  lat           double precision NOT NULL CHECK (lat BETWEEN -90 AND 90),
  lng           double precision NOT NULL CHECK (lng BETWEEN -180 AND 180),
  distance_km   numeric(6,2) NOT NULL CHECK (distance_km >= 0),
  rating        numeric(2,1) CHECK (rating BETWEEN 0 AND 5),
  reviews       integer NOT NULL DEFAULT 0 CHECK (reviews >= 0),
  kind          text NOT NULL CHECK (kind IN ('entrance', 'board', 'other')),
  searches      text[] NOT NULL DEFAULT '{}',
  area          text NOT NULL CHECK (char_length(area) BETWEEN 1 AND 80),
  status        text NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'contacted', 'interested', 'demo', 'won', 'lost', 'not_fit')),
  note          text CHECK (char_length(note) <= 1000),
  follow_up     date,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.institute_prospects IS
  'Coaching institutes near FC Road from Google Maps: a superadmin sales list. Service-role only; see migration 0246.';

-- RLS enabled with NO policies -> only the service-role client can read/write.
ALTER TABLE public.institute_prospects ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.institute_prospects FROM anon, authenticated;
