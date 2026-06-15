-- Per-exam question dedup.
--
-- The original dedup key was org-wide: UNIQUE (org_id, content_hash). But CDS and
-- NDA are both UPSC GAT-style English and legitimately SHARE questions — under the
-- org-wide index, ingesting a CDS question that already existed under NDA silently
-- dropped the CDS copy, so CDS papers came in short and the cross-exam recurrence
-- was invisible. Make the dedup per-EXAM instead: a question is unique within its
-- exam, and the same question may appear under two exams (a real recurrence signal).
--
-- Safe: a pre-flight check found 0 groups sharing (org_id, exam_id, content_hash),
-- so the new unique constraint creates cleanly. `commitStaged`'s upsert conflict
-- target is updated to match (org_id, exam_id, content_hash).

alter table public.questions
  drop constraint questions_org_id_content_hash_key;

alter table public.questions
  add constraint questions_org_id_exam_id_content_hash_key
  unique (org_id, exam_id, content_hash);
