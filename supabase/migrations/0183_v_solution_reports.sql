-- 0183_v_solution_reports.sql
--
-- V reports a slip it spots in OUR solution (2026-10-23).
--
-- Explaining a JEE question, V noticed the solution listed -1 twice and told
-- that one student; nobody on the team heard, so every later student met the
-- same typo. V now files it as a question report (report_solution_issue, the
-- category 'incorrect-solution', details starting "V, while explaining:"), for
-- triage at /dashboard/reports like a student's.
--
-- filed_by_v marks those reports. V has no account, so reported_by is null,
-- and the existing guard (one open report per user per question) cannot see
-- them: with a null reporter every insert would pass. The unique index below
-- keeps ONE open V report per question, so a typo many students ask about is
-- reported once. A V report never names a user.

alter table public.question_reports
  add column filed_by_v boolean not null default false,
  add constraint question_reports_v_has_no_reporter check (not filed_by_v or reported_by is null);

create unique index one_open_v_report_per_question
  on public.question_reports (question_id)
  where filed_by_v and status = 'open';

comment on column public.question_reports.filed_by_v is
  'Filed by V, the chatbot, after spotting a slip in the solution while explaining (lib/chat/questionToolSet report_solution_issue). Migration 0183.';
