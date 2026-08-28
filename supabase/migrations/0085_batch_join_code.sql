-- 0085_batch_join_code.sql
--
-- The second way into a batch: a code the teacher reads out and the student
-- enters themselves.
--
-- WHY BOTH THIS AND INVITES (0084). They fail in opposite directions and cover
-- each other. An invite needs the teacher to hold an accurate email address and
-- reaches a stranger when they mistype one; a code needs no addresses at all
-- but depends on the student actually acting on it. Google Classroom ships
-- exactly this pair for the same reason.
--
-- GLOBALLY UNIQUE, and that is what makes it work as a bootstrap. A student is
-- org-less, so at the moment they type a code there is no org, no branch and no
-- batch context to scope the lookup by — the code has to resolve on its own.
--
-- join_open IS SEPARATE FROM archived ON PURPOSE. A teacher wants to stop new
-- students joining a live batch once the class is formed, without archiving a
-- cohort they are still building papers for. Closing the door is not the same
-- as ending the course.
--
-- STILL NO INSERT POLICY ON batch_enrollments. Presenting a valid code is a
-- grant only the server can verify, exactly like an invite, so joining stays a
-- service-role write behind a check. See 0083's header.

ALTER TABLE public.batches
  ADD COLUMN join_code text UNIQUE,
  ADD COLUMN join_open boolean NOT NULL DEFAULT true;

-- Mirrors the generator's contract (Crockford base32, 8 chars) so a bug that
-- stores a lowercase or malformed code fails here rather than producing a code
-- that can be printed but never successfully typed.
ALTER TABLE public.batches
  ADD CONSTRAINT batches_join_code_shape
  CHECK (join_code IS NULL OR join_code ~ '^[0-9A-HJKMNP-TV-Z]{8}$');

-- The student's lookup is BY CODE ALONE and runs service-role: there is no
-- policy change here, because a student must not be able to read the batches
-- table (batches_select_scoped needs an org id, and they have none). The code
-- is resolved for them by the server, which is also what stops the table being
-- enumerable.
