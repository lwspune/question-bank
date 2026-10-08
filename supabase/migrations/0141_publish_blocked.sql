-- 0141_publish_blocked.sql
--
-- A question that may never be published (2026-10-08).
--
-- WHY. The IMAT papers of 2011-2022 were set by Cambridge (UCLES), whose
-- policy refuses permission to publish multiple-choice papers. The owner is
-- ingesting them for INTERNAL use only: as source material for notes, guides
-- and original practice questions. PRIVATE alone does not protect them. It is
-- one setting away from PUBLIC, and the question edit page, the flip-public
-- scripts and any future bulk tool can all change it. A rule the database
-- enforces is the only one no path can skip (NICHE_SITES_SPEC.md).
--
-- HOW. `publish_blocked` holds the reason a row may not be published, and a
-- CHECK refuses visibility = 'PUBLIC' while it is set. A CHECK, not a trigger:
-- it covers INSERT and UPDATE alike, and a row inserted with a reason but no
-- visibility lands on the PUBLIC default and is refused, so forgetting to
-- write PRIVATE fails loudly rather than publishing.
--
-- THE WAY BACK is deliberate: clear the reason and set PUBLIC in the same
-- statement. Nothing does that by accident.
--
-- SAFE. Nullable and NULL on every existing row, so the CHECK holds for all
-- of them; the validation scan is brief. Nothing reads the column yet; apply
-- it before the code that writes it.

ALTER TABLE public.questions
  ADD COLUMN publish_blocked text
    CHECK (publish_blocked IS NULL OR length(btrim(publish_blocked)) BETWEEN 1 AND 300);

ALTER TABLE public.questions
  ADD CONSTRAINT questions_publish_blocked_private
    CHECK (publish_blocked IS NULL OR visibility = 'PRIVATE');

COMMENT ON COLUMN public.questions.publish_blocked IS
  'Why this question may never be PUBLIC (e.g. licensed for internal use only). While set, the questions_publish_blocked_private CHECK refuses visibility = PUBLIC. NULL = no restriction.';
