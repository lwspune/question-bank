-- 0022_visibility_default_public.sql
--
-- Change the default visibility for new questions from PRIVATE to PUBLIC, and
-- flip every currently-PRIVATE row to PUBLIC in the same transaction.
--
-- Why: Question Bank's product positioning is "free public PYQ paper builder";
-- defaulting PUBLIC matches intent and removes the manual bulk-flip step admins
-- have been running after every upload batch (NDA GAT 2021, 2022, 2025, etc.).
-- Synced rows from MHT_CET_AI already arrive PUBLIC; the only path that landed
-- PRIVATE was the admin Excel upload.
--
-- Reversibility: re-run ALTER ... SET DEFAULT 'PRIVATE' to restore the old default.
-- Re-flipping individual rows back to PRIVATE remains a per-row admin action via
-- the edit page or a targeted UPDATE.

ALTER TABLE questions ALTER COLUMN visibility SET DEFAULT 'PUBLIC';

UPDATE questions
SET visibility = 'PUBLIC'
WHERE visibility = 'PRIVATE';
