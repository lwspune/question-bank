> Extracted from CLAUDE.md (linked from its "Operations" pointer) to keep the always-loaded file lean.
> Edit here; keep the CLAUDE.md pointer terse.

## Operations

Day-to-day knobs and where to look when something goes sideways.

### Monitoring

- **Vercel function logs:** dashboard → Project → Logs. The `/api/export`, `/api/sync/mock`, and `/api/upload/*` route handlers all `console.error` on the catch path; surface there.
- **Vercel Analytics:** dashboard → Project → Analytics. Pageviews + visitor counts. Free tier, cookieless. Frontend errors don't surface here yet — if/when noise picks up, consider Sentry.
- **Supabase logs:** dashboard → Logs → API/Postgres. Useful when an export 500s and you want to see the underlying SQL error.
- **Supabase advisor:** run `mcp__supabase__get_advisors` periodically (or after a migration). Two acceptable lints today: `rls_enabled_no_policy` on `public.rate_limits` (intentional, service-role-only access) and `auth_leaked_password_protection` (Supabase auth setting, can be enabled in dashboard).

### Database backups

`npm run db:backup` → `backups/` (gitignored). ~25 MB, ~16 s. Full runbook:
[scripts/backup/README.md](scripts/backup/README.md).

- **Weekly, already registered:** Windows task "PYQ Vault DB backup" runs
  `scripts/backup/weekly.cmd` every **Monday 11:00** (verified end-to-end, not
  just registered). `-StartWhenAvailable` is set — without it a sleeping laptop
  silently skips the week. Output appends to `backups/last-run.log`; a scheduled
  run's console output otherwise goes nowhere.
  Check: `Get-ScheduledTaskInfo -TaskName "PYQ Vault DB backup"` (0 = success),
  but the real evidence is a dump in `backups/` newer than 7 days.
- **Before any bulk-write script, by hand.** This is the habit that matters: the
  realistic risk to this data has always been our own scripts, not Supabase.
- Needs **PostgreSQL 17+ client tools** (command-line tools only, no server) and
  `SUPABASE_DB_URL` in `.env.local`. The direct DB host is **IPv6-only** — on a
  network without IPv6 use the session pooler instead.
- The script **rejects and deletes** a dump that fails verification (non-zero
  pg_dump exit, under 1 MB, or any live table absent from the `pg_restore` TOC),
  and prunes nothing when it does — so a bad run can't cost you the good ones.
- **Not covered:** Storage bucket files (figures — regenerable from source PDFs),
  and anything off this machine. The dumps contain `auth.users`, student mobiles
  and quiz-lead consent records, so they must never leave `backups/` unencrypted.

### When to upgrade tiers

- **Vercel Hobby (current)** is bounded by ~100 GB-h/month of function execution and ~100 GB of bandwidth. The export endpoint is the heavy hitter — when daily traffic crosses ~500 papers, watch the dashboard's bandwidth meter weekly.
- **Supabase Free (current)** is bounded by 500 MB DB + 1 GB storage egress + 5 GB bandwidth. The public bucket of question images is the egress risk; if egress crosses ~80% of the cap mid-month, plan a Pro upgrade.

### Rate limit visibility

The rate-limit table (Phase D) is service-role only and not exposed to the API. To see who's hitting the limit:
```sql
select bucket, count, window_start
from rate_limits
order by count desc
limit 20;
```
Buckets are formatted `export:anon:<ip>` or `export:user:<user_id>`.

### Rotating SYNC_SHARED_SECRET

No code change needed. Set a new value in:
1. Vercel env vars (Question Bank project) → trigger redeploy
2. MHT_CET_AI's env (whatever variable name its publisher uses) → redeploy

The secret is read at request time via `process.env.SYNC_SHARED_SECRET`, so a redeploy on Question Bank's side picks up the new value immediately. Until both sides match, syncs return 401.

### Billing (Razorpay) — env + going live

Checkout is dormant until 4 env vars are set in Vercel + `.env.local`: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` (= key id, publishable for the client), `RAZORPAY_WEBHOOK_SECRET`. Without them `/api/billing/order` returns 503 (the `/pricing` Buy button shows "not configured"). Create a webhook in the Razorpay dashboard → `https://www.pyqvault.com/api/billing/webhook`, subscribe to **`order.paid`**, secret = `RAZORPAY_WEBHOOK_SECRET`. **Test mode needs no KYC**; KYC gates only live keys. Going live = swap the 4 vars to `rzp_live_…` values + repoint/add a live webhook (no code change). Change the price/duration in [src/lib/billing/plans.ts](src/lib/billing/plans.ts) (`PLANS`). As of 2026-06-01 the account is **not yet created** — see [[project-paywall-build]].

### Outbound email (Resend) — the mock-recommendation campaign

**Provider:** Resend, account `official.lwspune`. Domain `pyqvault.com` **Verified**, region Tokyo (ap-northeast-1), DNS auto-configured at GoDaddy. Free tier = **100 emails/day, 3,000/month, 2 req/sec** (the 600ms throttle in [resend.ts](src/lib/email/resend.ts) is sized to that rate limit). Env (`.env.local`, **not** Vercel — this is a local script, not a route): `RESEND_API_KEY` (send-only key) + `EMAIL_FROM` (`"PYQ Vault <mocks@pyqvault.com>"`). Missing either ⇒ the script fails fast before touching an address.

**Run it:**
```sh
npm run email:preview -- --html          # render the templates — no DB, no key, no send
npm run email:send                       # DRY RUN (default) — prints recipients, writes NOTHING
npm run email:send -- --apply --limit=3  # stage it: send to the first 3
npm run email:send -- --apply            # the rest
npm run email:send -- --apply --only=a@b.com
```
The `--` before flags is required — npm swallows them otherwise. That mis-typing is safe by construction (a dropped `--apply` just dry-runs), but it's why a "send" can look like it did nothing. `npx tsx scripts/email/send-next-mock.ts …` works too, without the `--`.
**Re-running is safe.** Every send writes a UNIQUE `dedupe_key` to `email_sends`, so a repeat run picks nobody already emailed for that mock — `first_mock:{user}` is once-ever, `next_mock:{user}:{mock}` never repeats a paper. The campaign **self-continues**: after the 7-day cooldown, each `next_mock` student is offered the next unattempted paper down the catalogue. Nothing to schedule; just re-run it.

**Suppress someone** — always via the real mechanism, never a code skip-list:
```sql
INSERT INTO public.student_profiles (user_id, email_opt_out)
SELECT id, true FROM auth.users WHERE email = 'someone@example.com'
ON CONFLICT (user_id) DO UPDATE SET email_opt_out = true, updated_at = now();
```
Students self-serve the same thing via the unsubscribe link in every email (`/unsubscribe/[token]` → confirm button → `POST /api/unsubscribe/[token]`; GET never acts, because mailbox scanners prefetch links).

**Reading the outcome — two traps.**
1. **`sent=N` is NOT evidence of delivery.** A pre-existing GoDaddy DMARC (`p=quarantine`) means an auth failure lands in **spam silently** — no bounce, and `email_sends.status` still says `sent`. Check Resend → Logs, or ask a recipient.
2. **Watch bounces.** Bounce rate is what throttles or suspends a sending domain. `isUndeliverable()` blocks RFC-2606 reserved TLDs (leaked test fixtures live in `auth.users` — the roster is derived from it), but a real-but-dead address still bounces.

**Audit:** every attempt — sent OR failed — is one immutable `email_sends` row (own-row readable by the student; service-role written).
```sql
SELECT status, count(*), max(created_at) FROM public.email_sends GROUP BY status;
```

**Delivery is PROVEN, not assumed (2026-07-16):** the first campaign put **31/31 in the inbox** — Gmail reported **SPF PASS · DKIM PASS (`pyqvault.com`) · DMARC PASS**, delivered in ~1s via `ap-northeast-1.amazonses.com`. So the domain is healthy; if a future send lands in spam, suspect the **content**, not the DNS (see the auth-mail note below for a worked example).

**NOT the same thing as Supabase Auth SMTP** — see the next section. This is our app calling the Resend **API**; auth mail is sent by Supabase itself.

### Supabase Auth SMTP (password reset / magic-link / invites)

Wired 2026-07-16. **Supabase → Authentication → Emails → SMTP Settings:** host `smtp.resend.com` · port 465 · username `resend` (literally, not an email) · password = a Resend API key · sender `noreply@pyqvault.com` / "PYQ Vault".

**Enabling SMTP does NOT lift the throttle** — that's a separate setting and the whole point of the exercise. **Authentication → Rate Limits → "Rate limit for sending emails"** is now **30/hour** (was Supabase's built-in 2/hour, which is dev-only). Both halves are required; check both when auth mail "sends" but nobody gets it.

**Test it without a UI** (there's no `/forgot-password` page yet — ROADMAP):
```sh
curl -X POST "$NEXT_PUBLIC_SUPABASE_URL/auth/v1/recover" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" -H "Content-Type: application/json" \
  -d '{"email":"someone@example.com"}'
```
It always returns **200 with `{}`** — deliberately, to prevent email enumeration — so **200 is not proof of sending**. Verify in the Supabase auth logs instead: look for `action:"user_recovery_requested"` and check the `duration`. ~2.7s means a real SMTP round-trip happened; milliseconds means it never left. `error:null` means SMTP accepted it.

**⚠️ Known: auth mail lands in SPAM with a Gmail phishing banner.** Not a deliverability fault — auth is PASS/PASS/PASS and the campaign from the same domain reaches the inbox. Supabase's stock template links to `<project-ref>.supabase.co` while the From says `pyqvault.com`, and a password-reset email whose link domain ≠ From domain is the classic credential-harvesting shape. Fix = point the template at `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}` + build that route. Deferred — see ROADMAP "Password reset flow".

### Managing members (admins + teachers)

`/dashboard/members` is the admin UI as of 2026-05-26. Add new admins/teachers with name + email + password + role; reset passwords; change roles; remove members. Last-admin protection + self-protection prevent locking yourself out. The page is admin-only; teachers are redirected to /browse.

For one-off ops outside the UI (cron, scripted bulk reset, etc.), the helpers in `src/lib/members/admin.ts` are importable from any server-only context (they use `createSupabaseAdminClient()`). For purely manual SQL reset of a password without the UI:
```sql
update auth.users
set encrypted_password = crypt('new-password', gen_salt('bf'))
where email = 'admin@example.com';
```
Run in the Supabase SQL editor with the service role.

### Flipping visibility on existing questions

The default for new rows is **PUBLIC** (since migration 0022). To take a batch PRIVATE (e.g., a paid-org-only release):
```sql
update questions
set visibility = 'PRIVATE'
where source_file = 'NDA_2024_paper.xlsx';
```
The reverse (flipping PRIVATE → PUBLIC) is rarely needed now since the default is PUBLIC, but the same shape with `set visibility = 'PUBLIC'` still works.

### Setting PYQ year/month/comment for a whole upload

Preferred path: open `/uploads/<jobId>` as the org admin, click **Edit** on the PYQ row, fill any of Year / Month / Comment, save. The PATCH covers all questions linked via `upload_job_id`. For a one-shot SQL backfill (e.g. tagging a batch that was uploaded before Phase A landed):
```sql
update questions
set pyq_year = 2025, pyq_month = 'May', pyq_note = 'Shift I'
where source_file = 'MHT_CET_2025_PCM.xlsx';
```
Use SQL only when you can't reach the upload via the UI (ambiguous `upload_job_id`) — otherwise the UI is auditable.

### Deleting a whole upload

`/uploads/<jobId>` → **Delete upload** removes every question linked via `upload_job_id` (cascades options + question_images via FK), then deletes the storage objects, then deletes the `upload_jobs` row. Pre-0013 questions have `upload_job_id = NULL` and are unreachable via this UI — delete those by `source_file` from SQL if needed:
```sql
delete from questions
where source_file = 'BAD_BATCH.xlsx' and upload_job_id is null;
```
