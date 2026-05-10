-- Phase: PYQ details on uploads.
-- pyq_year already exists (0010_sync_metadata.sql). Add the two companion
-- fields that admins set per-upload-batch: which month the paper ran, and
-- a free-form note (commonly used for the shift/slot, e.g. "Shift I",
-- "Slot 2 Morning"). Both nullable; populated either at commit time
-- (Phase A picker on /upload) or via bulk-set on /uploads/[id] (Phase C).

alter table questions add column pyq_month text;
alter table questions add column pyq_note text;
