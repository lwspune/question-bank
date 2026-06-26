> Extracted from CLAUDE.md (linked from its "Operations" pointer) to keep the always-loaded file lean.
> Edit here; keep the CLAUDE.md pointer terse.

## Operations

Day-to-day knobs and where to look when something goes sideways.

### Monitoring

- **Vercel function logs:** dashboard → Project → Logs. The `/api/export`, `/api/sync/mock`, and `/api/upload/*` route handlers all `console.error` on the catch path; surface there.
- **Vercel Analytics:** dashboard → Project → Analytics. Pageviews + visitor counts. Free tier, cookieless. Frontend errors don't surface here yet — if/when noise picks up, consider Sentry.
- **Supabase logs:** dashboard → Logs → API/Postgres. Useful when an export 500s and you want to see the underlying SQL error.
- **Supabase advisor:** run `mcp__supabase__get_advisors` periodically (or after a migration). Two acceptable lints today: `rls_enabled_no_policy` on `public.rate_limits` (intentional, service-role-only access) and `auth_leaked_password_protection` (Supabase auth setting, can be enabled in dashboard).

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
