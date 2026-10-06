-- 0136_export_events_mock.sql
--
-- Log a past paper downloaded whole, and WHICH paper (2026-10-07).
--
-- WHY: a pass holder or a free download can now take a published past paper
-- (a mock's exact sitting) as a PDF from /mock pages. The question this feature
-- exists to answer is "which papers do people pay for", and export_events could
-- not say: its mode allowed only 'cart' and 'filters', so the insert would have
-- failed (recordExportEvent never throws, so the download would have been
-- served and silently not logged).
--
-- WHY NAMING THE PAPER IS FINE HERE when 0104 refused to record contents: 0104
-- protects the paper a TEACHER built, which is their work. A published past
-- paper is public, the same for everyone; recording its id reveals nothing.
--
-- mock_id is allowed ONLY on a 'mock' row (a cart or filter export has no
-- paper). It is NOT required on one: ON DELETE SET NULL keeps the download in
-- the history if a paper is ever deleted, where a NOT NULL rule would instead
-- block the delete. The app always sets it.

ALTER TABLE public.export_events
  DROP CONSTRAINT export_events_mode_check,
  ADD CONSTRAINT export_events_mode_check CHECK (mode IN ('cart', 'filters', 'mock'));

ALTER TABLE public.export_events
  ADD COLUMN mock_id uuid REFERENCES public.mock_tests(id) ON DELETE SET NULL,
  ADD CONSTRAINT export_events_mock_id_only_for_mock CHECK (mock_id IS NULL OR mode = 'mock');

-- "Which papers sell": downloads per paper.
CREATE INDEX export_events_mock_idx ON public.export_events (mock_id) WHERE mock_id IS NOT NULL;
