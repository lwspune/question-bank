-- M5: image support.
-- Stores the storage path (e.g. "<orgId>/<uuid>.png"), not the public URL —
-- keeps the bucket name out of the data layer so we can move it later.

alter table questions add column image_url text;
alter table options add column image_url text;
