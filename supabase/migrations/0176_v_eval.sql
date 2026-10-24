-- 0176_v_eval.sql -- V's test cases and test runs (V_SPEC.md, 2026-10-22).
--
-- Why: V's rules (lib/chat/facts.ts) grew one patch at a time, each written
-- against the conversation that broke it, with nothing to tell whether the
-- patch broke something else. The owner asked for a framework (2026-10-22):
-- every change to V's instructions or tools is first replayed against a fixed
-- set of real student messages, through V's real code and model, and scored per
-- job (find, explain a question, explain a concept, practise, plan, reflect,
-- help, chat).
--
-- Why tables and not a file in git: the cases ARE student messages, and the
-- repository is public. They live here, readable by the service role only.
--
--   v_eval_cases    one real message with everything needed to replay it: the
--                   page, signed in or not, the student's exams, the question
--                   Ask V was tapped on, V's memory at the time (as the model
--                   received it) and, after a Reply, what V was told about the
--                   earlier exchange. `expect` holds the automatic checks
--                   (scripts/lib/vEval.ts parseExpect); `good_reply` says in
--                   words what a person marking the reply looks for.
--                   `original_verdict` marks the reply V actually gave at the
--                   time, the baseline the framework started from.
--   v_eval_runs     one replay of the active cases.
--   v_eval_results  each case's reply in a run, the automatic verdict and,
--                   when a person read it, their mark.
--
-- Snapshots, not references: the history and the student's exams are copied
-- in when a case is made, so a case replays the same way after the account or
-- conversation changes. source_interaction_id keeps the link back and is SET
-- NULL rather than blocking a delete. asked_question_id carries no foreign key,
-- for the reason migration 0174 gives: a question id must never cost the row.
--
-- Marking happens in a Claude Code session, never through a paid grader model
-- (owner, 2026-10-22); only V's replies cost money, about $0.0005 a case.
--
-- RLS on with no policies: service role only. Nothing in the app reads these.

create table public.v_eval_cases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source_interaction_id uuid references public.chat_interactions(id) on delete set null,
  job text not null check (job in (
    'find', 'explain_question', 'explain_concept', 'practise', 'plan', 'reflect', 'help', 'chat'
  )),
  message text not null check (char_length(message) between 1 and 2000),
  page_path text check (page_path is null or char_length(page_path) <= 300),
  signed_in boolean not null,
  profile_exams text[] not null default '{}',
  asked_question_id uuid,
  asked_chose text check (asked_chose is null or asked_chose in ('A', 'B', 'C', 'D', 'E')),
  history jsonb not null default '[]'::jsonb check (jsonb_typeof(history) = 'array'),
  reply_to text,
  expect jsonb not null default '{}'::jsonb check (jsonb_typeof(expect) = 'object'),
  good_reply text not null check (char_length(good_reply) between 1 and 1000),
  original_reply text,
  original_verdict text not null check (original_verdict in ('pass', 'fail', 'unclear')),
  active boolean not null default true
);

-- One case per stored message: re-running the seed updates, never duplicates.
create unique index v_eval_cases_source_key on public.v_eval_cases (source_interaction_id)
  where source_interaction_id is not null;

create table public.v_eval_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  label text check (label is null or char_length(label) <= 120),
  git_sha text,
  cases integer not null default 0 check (cases >= 0),
  cost_usd numeric(10, 5) not null default 0 check (cost_usd >= 0)
);

create table public.v_eval_results (
  run_id uuid not null references public.v_eval_runs(id) on delete cascade,
  case_id uuid not null references public.v_eval_cases(id) on delete cascade,
  reply text,
  links text[] not null default '{}',
  tool_calls jsonb,
  failures text[] not null default '{}',
  auto_pass boolean not null,
  mark text check (mark is null or mark in ('pass', 'fail')),
  mark_note text check (mark_note is null or char_length(mark_note) <= 1000),
  cost_usd numeric(10, 6) not null default 0 check (cost_usd >= 0),
  primary key (run_id, case_id)
);

alter table public.v_eval_cases enable row level security;
alter table public.v_eval_runs enable row level security;
alter table public.v_eval_results enable row level security;
