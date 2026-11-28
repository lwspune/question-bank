-- 0295: a picture on a TEAM circle message (owner, 2026-11-28).
--
-- Why: the team answered a student's "Tips for maths" in the CBSE Class 12
-- circle and wanted a branded graphic under the tip. A picture saved from a
-- circle travels to WhatsApp with our name on it, which a chart drawn by the
-- app cannot do.
--
-- What:
--   image_path  a path in the existing public question-images bucket, always
--               circles/<exam>/<name>.png|jpg (no new bucket: same 1 MB limit,
--               same PNG/JPEG types, already public).
--   image_alt   what the picture shows, for screen readers. Always with a picture.
--
-- Rules held HERE, whatever a route does:
--   - only author_kind = 'team' carries a picture. Students still cannot post
--     pictures (or links): moderation stays text-only, as in 0289;
--   - picture and description come as a pair;
--   - the path shape keeps a team post from naming any other file in the bucket.
--
-- Rejected: a separate circle-images bucket (a second set of limits and
-- policies for one owner-only upload path), and attaching pictures to student
-- posts (moderating pictures is a different job, out of scope for circles).
--
-- Additive: nothing reads the columns until the code that selects them ships.
-- Rollback: ALTER TABLE public.exam_room_messages DROP COLUMN image_path, DROP COLUMN image_alt;

ALTER TABLE public.exam_room_messages
  ADD COLUMN image_path text,
  ADD COLUMN image_alt  text;

ALTER TABLE public.exam_room_messages
  ADD CONSTRAINT exam_room_messages_image_team_only CHECK (image_path IS NULL OR author_kind = 'team'),
  ADD CONSTRAINT exam_room_messages_image_pair CHECK ((image_path IS NULL) = (image_alt IS NULL)),
  ADD CONSTRAINT exam_room_messages_image_path CHECK (
    image_path IS NULL OR image_path ~ '^circles/[a-z0-9]+(-[a-z0-9]+)*/[A-Za-z0-9_-]+\.(png|jpg)$'
  ),
  ADD CONSTRAINT exam_room_messages_image_alt CHECK (image_alt IS NULL OR length(btrim(image_alt)) BETWEEN 1 AND 300);

COMMENT ON COLUMN public.exam_room_messages.image_path IS 'Team posts only: circles/<exam>/<name>.png|jpg in the question-images bucket; migration 0295.';
COMMENT ON COLUMN public.exam_room_messages.image_alt IS 'What the picture shows (screen readers); set exactly when image_path is; migration 0295.';
