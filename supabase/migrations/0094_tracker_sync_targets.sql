-- 0094_tracker_sync_targets.sql
--
-- Where each institute's nda-tracker lives, and the secret that identifies it.
--
-- Every institute gets its OWN tracker deployment (one codebase, N Vercel +
-- Supabase projects) while PYQ Vault stays a single multi-tenant app. So the
-- routing between them is per-org CONFIG, never a field in a request payload:
-- a caller-chosen destination means one wrong value delivers institute B's
-- paper into institute A's tracker.
--
-- The shared secret is the tenant boundary in BOTH directions:
--   • push  (vault → tracker): look up the org's row, POST to its tracker_url
--                              with its shared_secret.
--   • read  (tracker → vault): resolve the presented secret back to an org and
--                              scope the query to that org's rows + PUBLIC.
--
-- Stored in plaintext deliberately: the push direction must SEND the secret, so
-- a one-way hash would break it. That is why this table is service-role only.
--
-- RLS enabled with NO policies — the locked `platform_admins` pattern. Nothing
-- with an anon or authenticated JWT can read it, including a signed-in org
-- admin: a tracker credential is platform configuration, not org-visible data.

create table tracker_sync_targets (
  org_id        uuid primary key references organizations(id) on delete cascade,
  tracker_url   text not null,
  shared_secret text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Secret → org must be unambiguous; this is the resolution path for every
-- inbound read, so a duplicate secret would silently widen one institute's
-- scope to another's content.
create unique index tracker_sync_targets_secret_idx
  on tracker_sync_targets (shared_secret);

alter table tracker_sync_targets enable row level security;
