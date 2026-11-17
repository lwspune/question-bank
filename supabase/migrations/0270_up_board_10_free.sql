-- 0270_up_board_10_free.sql -- UP Board Class 10 needs no pass.
--
-- Why: the Class 9-10 exams are free (0210, owner 2026-11-02): those students
-- buy a year or two later, in Class 11-12. UP Board Class 10 (scripts/up-board,
-- ingested 2026-11-17) is a Class 10 exam, so it joins them. UP Board Class 12
-- keeps the www Premium Pass ('mocks'), like CBSE Class 12.
--
-- The app mirrors this: EXAM_REGISTRY passScope 'free' on up-board-10, kept in
-- step by tests/billing-exam-pass.test.ts. Undo: set pass_scope back to 'mocks'.

update public.exams set pass_scope = 'free' where name = 'UP Board Class 10';
