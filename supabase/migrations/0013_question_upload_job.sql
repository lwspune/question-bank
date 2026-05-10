-- Phase: dashboard recent-uploads → upload-detail.
-- Link a question back to the upload_jobs row that inserted it. Lets
-- /uploads/[id] list "questions added by this upload" + lets us delete
-- a whole upload's questions in one go.
--
-- ON DELETE SET NULL (not CASCADE) so an accidental delete on the
-- upload_jobs row alone doesn't blow away questions. Whole-upload
-- deletes go through a route handler that explicitly deletes the
-- linked questions first, then the job row.
--
-- Backfill is impossible: existing rows have only `source_file` (text)
-- which can't distinguish between two uploads of the same filename.
-- Pre-migration questions stay at upload_job_id = NULL and aren't
-- reachable from the new page (still editable from /browse).
--
-- Synced rows (POST /api/sync/mock) also leave this NULL — they don't
-- belong to any upload_jobs row.

alter table questions
  add column upload_job_id uuid references upload_jobs(id) on delete set null;

create index questions_upload_job_idx on questions(upload_job_id)
  where upload_job_id is not null;
