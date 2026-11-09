-- 0244_parent_pay_links.sql
--
-- "Ask a parent to pay" (2026-11-09). A student who meets a pass offer and
-- cannot pay makes a short link (www.pyqvault.com/pay/<code>) and sends it to a
-- parent on WhatsApp. The parent opens it with no account and pays; the pass
-- goes to the student.
--
-- WHY: in the 30 days to 2026-11-09, 586 students met a pass offer and 85% left
-- without opening checkout; "Need to ask a parent" was one of the four reasons
-- they gave (6 of the first 26 answers).
--
-- WHY A TABLE, not a signed token in the URL: a sealed token is ~100
-- characters, and a parent is right to distrust a long, strange link. A row
-- gives a 10-character code, and a link the server can look up and expire.
--
-- WHAT THE LINK DECIDES: only who gets the pass and which pass. The PRICE is
-- the plan's on the day the parent pays, stamped into the Razorpay order (the
-- order is the contract, as for every pass). The grant goes to the order's own
-- student, so a forwarded link costs nothing but the payer's money.
--
-- DATA RULES IN THE DATABASE:
-- - the code CHECK mirrors isParentCode in src/lib/billing/parentLink.ts (no
--   look-alike characters, exactly 10);
-- - student_name is a first name or NULL (2-30 characters, one word, no digits,
--   @ _ . / or :), never an email or a URL: the parent page shows it to whoever
--   holds the link. The app is stricter (letters, ' and -); the database
--   refuses what must never be stored, without depending on the collation's
--   idea of a letter;
-- - a link lives at most 30 days (the app makes 7).
--
-- ACCESS: none. RLS on with no policies and no grants to anon/authenticated:
-- only the service role reads or writes (the link, order and verify routes and
-- the /pay page), so a code can never be listed through the API.
create table public.parent_pay_links (
  code          text        primary key
                check (code ~ '^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789]{10}$'),
  user_id       uuid        not null references auth.users (id) on delete cascade,
  plan_id       text        not null references public.plans (id),
  student_name  text        check (student_name is null
                  or (char_length(student_name) between 2 and 30 and student_name !~ '[0-9@_./:[:space:]]')),
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null,
  check (expires_at > created_at and expires_at <= created_at + interval '30 days')
);

-- A student's live link for a pass is reused rather than remade (the link
-- route looks it up by student + plan, newest first).
create index parent_pay_links_user_plan_idx on public.parent_pay_links (user_id, plan_id, expires_at desc);

alter table public.parent_pay_links enable row level security;
revoke all on public.parent_pay_links from anon, authenticated;

-- The student's "your pass is active" email when a parent pays (kind
-- `parent_paid`, dedupe key `parent_paid:<payment id>`): the verify route and
-- the webhook both grant, and only the one whose grant is new sends it.
alter table public.email_sends drop constraint email_sends_kind_ck;
alter table public.email_sends add constraint email_sends_kind_ck
  check (kind in ('next_mock', 'first_mock', 'mock_report', 'due_nudge', 'welcome', 'answer_report', 'feedback_reply', 'parent_paid'));
