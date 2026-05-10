-- Backfill upload_job_id for questions inserted before migration 0013.
--
-- Strategy: for each (org_id, filename) where EXACTLY ONE upload_jobs row has
-- inserted > 0, claim all matching unlinked questions for that row. If two
-- nonzero-insert jobs share a filename in the same org, ownership is ambiguous
-- and we leave those questions NULL (still editable via /browse).
--
-- Synced questions (source_file IS NULL) and questions in (org, filename)
-- combos with ambiguous ownership are intentionally untouched.
--
-- Idempotent: re-running only affects upload_job_id IS NULL rows, so already
-- linked questions are skipped.

with claimable as (
  -- having count(*) = 1 guarantees a single job; (array_agg(id))[1] just
  -- extracts that one uuid (Postgres has no max(uuid)).
  select org_id, filename, (array_agg(id))[1] as job_id
  from upload_jobs
  where inserted > 0
  group by org_id, filename
  having count(*) = 1
)
update questions q
set upload_job_id = c.job_id
from claimable c
where q.upload_job_id is null
  and q.source_file is not null
  and q.source_file = c.filename
  and q.org_id = c.org_id;
