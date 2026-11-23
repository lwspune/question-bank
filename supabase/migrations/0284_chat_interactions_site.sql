-- 0284_chat_interactions_site.sql
--
-- Which site each V row came from, and the visitor's country.
--
-- site: www.pyqvault.com ('pyqvault') or intl.pyqvault.com ('intl'), the value
-- lib/sites/intl planSiteForHost already reads from the Host header for V's
-- prompt (2026-11-19).
--
-- country: ISO 3166-1 alpha-2 from Vercel's x-vercel-ip-country header
-- (lib/acquisition/country readCountry), signed in or not: the same value and
-- the same CHECK as student_profiles.signup_country (0142). The route already
-- reads it on every message to quote the buyer's price; it was never kept.
-- NULL when the header is missing (local dev, any host that is not Vercel).
--
-- Why now (2026-11-23): two signed-out visitors asked V about exams abroad (YÖS,
-- the Korean GKS). Which site they were on could only be worked out from the
-- page path, and many paths (/mock, /browse, /notes, /pricing) exist on both
-- sites; whether they were Indian students looking abroad or visitors from
-- abroad could not be told at all.
--
-- site NULL = a row written before this migration: unknown, never guessed.
-- Every writer passes both (RecordChatInteraction requires them), so a NULL
-- site after this date means a writer that bypassed it. No backfill: a path
-- that exists on one site only could be backfilled, but a partial backfill
-- reads as complete, and old rows answer no question anyone asks.
--
-- The country is shown to no one but the superadmin (RLS on, zero policies,
-- since 0127) and is never told to V: V's prompt is unchanged by this.

alter table public.chat_interactions
  add column site text
    constraint chat_interactions_site_known check (site in ('pyqvault', 'intl')),
  add column country text
    constraint chat_interactions_country_code check (country ~ '^[A-Z]{2}$');
