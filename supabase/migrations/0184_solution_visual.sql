-- 0184_solution_visual.sql
--
-- Animated solutions (owner, 2026-10-25). A question can carry a picture drawn
-- from its own numbers that moves with the solution step by step: a wheel
-- turning, a ray through a glass slab, a parabola that follows a slider. The
-- student sees it as the "Animated" view of the solution and can switch to
-- "Still", which is the solution exactly as before.
--
-- solution_visual holds the scene name, its numbers, which solution sentence
-- each step starts at, a fingerprint of that solution, and the answer the
-- scene must reproduce (lib/visuals/visual.ts parses it; types.ts is the
-- shape). It is ADDED beside `solution` and `solution_image_url`, which it
-- never replaces: the owner's rule is that no earlier solution is deleted or
-- overwritten. It is not part of content_hash, so adding a visual never
-- changes a question's identity.
--
-- Why a column and not a side table: every surface that shows a solution
-- already reads the questions row, and a visual belongs to exactly one
-- question. Why jsonb: the params differ per scene, and the full validation
-- (beats, labels, the self-check) runs in code where the scenes live. The
-- CHECK below is the backstop for the parts a scene cannot vouch for: the
-- envelope, the step count, the fingerprint format, and a size cap so a
-- malformed write cannot bloat every question read. Every test is wrapped in
-- coalesce(..., false-ish): a missing key makes jsonb_typeof() NULL, and a
-- CHECK that evaluates to NULL PASSES, so without it a visual with no answer
-- value or no scene would be accepted (tests/solution-visual-db.test.ts).
--
-- Writes come only from scripts/visuals/run.ts (service role), after the
-- scene's self-check has passed against the question's key. Read access
-- follows the questions row's existing RLS.

alter table public.questions add column solution_visual jsonb;

alter table public.questions add constraint questions_solution_visual_shape check (
  solution_visual is null or (
    jsonb_typeof(solution_visual) = 'object'
    and coalesce(solution_visual->>'v', '') = '1'
    and coalesce(jsonb_typeof(solution_visual->'scene'), '') = 'string'
    and coalesce(jsonb_typeof(solution_visual->'params'), '') = 'object'
    and coalesce(jsonb_typeof(solution_visual->'steps'), '') = 'array'
    and coalesce(jsonb_array_length(case when jsonb_typeof(solution_visual->'steps') = 'array' then solution_visual->'steps' end), 0) between 1 and 12
    and coalesce(solution_visual->>'fingerprint', '') ~ '^[0-9a-f]{8}$'
    and coalesce(jsonb_typeof(solution_visual->'answer'->'value'), '') = 'number'
    and pg_column_size(solution_visual) <= 8192
  )
);

comment on column public.questions.solution_visual is
  'Animated solution: scene + params + steps tied to the solution''s sentences + the answer the scene reproduces (lib/visuals). Added beside solution and solution_image_url, never replacing them. Not in content_hash. Migration 0184.';
