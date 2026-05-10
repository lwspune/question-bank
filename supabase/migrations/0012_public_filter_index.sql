-- 0012_public_filter_index.sql
--
-- Phase E performance pass. The public bank's hot path is "list questions
-- where visibility = PUBLIC, optionally filtered by exam_id + subject_id,
-- ordered by created_at desc, paginated."
--
-- Cheap to add now (150 rows). Expensive to retrofit at 10k+. Partial index
-- so we don't waste IO indexing PRIVATE rows that the public flow never reads.

create index if not exists questions_public_filters_idx
  on questions (visibility, exam_id, subject_id, created_at desc)
  where visibility = 'PUBLIC';
