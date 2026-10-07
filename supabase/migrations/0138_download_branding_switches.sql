-- 0138_download_branding_switches.sql — the owner's switches for download branding.
--
-- WHY (owner, 2026-10-07). Pass and free downloads carry three pieces of PYQ
-- Vault branding: a light diagonal watermark behind every page, the site
-- address in every footer, and a "PYQ Vault" line above the title (PDF only).
-- The owner wants each one switchable at /dashboard/pricing, beside the other
-- download and paywall settings, without a deploy.
--
-- WHAT THEY DO NOT DO. They never brand a download that is not branded already:
-- institute staff downloads stay clean whatever these say. Whether a download
-- is branded at all is still resolveExportAccess's call (lib/export/access.ts);
-- these only remove pieces from one that is (lib/export/branding.ts).
--
-- Default ON, so applying this changes nothing a student sees.

alter table public.paywall_settings
  add column brand_watermark boolean not null default true,
  add column brand_site_url boolean not null default true,
  add column brand_name_line boolean not null default true;

comment on column public.paywall_settings.brand_watermark is
  'Branded (pass/free) downloads carry the diagonal PYQ Vault watermark. Never brands a staff download.';
comment on column public.paywall_settings.brand_site_url is
  'Branded downloads carry www.pyqvault.com in every page footer (page numbers always print).';
comment on column public.paywall_settings.brand_name_line is
  'Branded PDF downloads carry the "PYQ Vault" line above the title (Word has none).';
