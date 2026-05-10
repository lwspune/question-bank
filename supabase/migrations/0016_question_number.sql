-- Phase: capture the original question number from the Excel "Q" column.
-- Stored as text (not int) so papers with sub-parts like "1(a)", "2A",
-- "12-i" round-trip cleanly. Nullable: the "Q" column is optional in the
-- Excel template, and pre-migration questions stay NULL (the
-- /uploads/[id] page falls back to source_row for those).

alter table questions add column question_number text;
