-- 0122_email_click_token — click tracking for outbound email (2026-09-27).
--
-- WHAT: email_sends.click_token, minted by the send script BEFORE the message
-- goes out and embedded in every CTA as /api/e/<token>?to=<path>. The route
-- looks the send up by token, writes one `email_clicked` row to user_activity
-- for that student (dedupe_key email_click:<send id>, so "clicked" is a fact
-- about the send, not a count), and redirects to the same-site path.
--
-- WHY NOT THE ROW ID: the email_sends row is written only after Resend accepts
-- the message (send → record), so at render time there is no id to link to.
--
-- WHY NOT RESEND'S CLICK TRACKING: it rewrites links to Resend's domain and
-- keeps the click there. Our redirect lands it in user_activity beside the
-- student's other acts, where `--report` can join it, and keeps every link on
-- www.pyqvault.com.
--
-- Nullable: sends before this migration, and samples, carry none. UNIQUE so
-- the lookup is one indexed row and a collision can never credit the wrong
-- student.

alter table public.email_sends add column click_token text;

alter table public.email_sends
  add constraint email_sends_click_token_unique unique (click_token);

comment on column public.email_sends.click_token is
  'Per-send redirect token embedded in the email''s CTAs as /api/e/<token>. Minted before the send; NULL for samples and pre-0122 sends.';
