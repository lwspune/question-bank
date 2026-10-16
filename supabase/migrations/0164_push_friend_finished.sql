-- 0164_push_friend_finished.sql
--
-- "Your friend finished" by browser push (2026-10-16, owner): when a friend
-- finishes a practice test someone sent them (0163), everyone in that test's
-- group who already finished gets one notification linking to the shared
-- results card on their own result page.
--
-- push_sends gains the kind. The dedupe key is
-- friend_finished:<recipient>:<root test>:<newest finisher's attempt>, UNIQUE
-- like every other key, so a re-run of the hourly job cannot send twice. The
-- due nudge reads prior sends by its own key prefix, so this kind never counts
-- against a student's daily nudge. Sent by scripts/push/send-friend-finished.ts
-- from GitHub Actions, where the VAPID private key lives (Vercel has the public
-- key only).

alter table public.push_sends
  drop constraint push_sends_kind_check,
  add constraint push_sends_kind_check
    check (kind in ('due_nudge', 'friend_finished'));
