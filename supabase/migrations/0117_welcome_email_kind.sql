-- 0117_welcome_email_kind.sql
--
-- 'welcome' joins the email_sends kind allowlist (0059, widened in 0110 and
-- 0114). STUDENT_EDUCATION_SPEC.md §4 item 6: the three-step "how PYQ Vault
-- works" loop, by email, once per account EVER.
--
-- Measured 2026-09-24: 149 of 193 mock-takers had used a mock and nothing
-- else, 2 students had ever finished a drill, and no email had ever described
-- a feature (38 sends in total, all about mocks). This is the one channel that
-- reaches a student who closed the tab.
--
-- The dedupe key is `welcome:{userId}` — NO day component — so the UNIQUE
-- constraint from 0059 makes "one welcome ever" a property of the table, not
-- of the runner. The 24-hour quiet window after any other send is policy in
-- src/lib/email/welcome.ts; the table backstops only the one that matters.
--
-- The existing backlog of accounts is mailed on purpose (newest first, capped
-- per run by the workflow): the students who did not know the features exist
-- are existing accounts.
--
-- ref_kind carries 'start' and ref_id is null: the mail is about the product,
-- not one row of it.

ALTER TABLE public.email_sends DROP CONSTRAINT email_sends_kind_ck;
ALTER TABLE public.email_sends ADD CONSTRAINT email_sends_kind_ck
  CHECK (kind IN ('next_mock', 'first_mock', 'mock_report', 'due_nudge', 'welcome'));
