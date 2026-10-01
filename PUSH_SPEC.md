# Browser push for the due-queue nudge — implementation spec

**Written for:** a Claude coding session implementing this in the `question-bank` repo, with no access to the conversation that produced it. Everything you need is here or in the files it names. Read CLAUDE.md first (always loaded), then this file end to end, then ENGAGEMENT_SPEC.md §C2. Present your plan to the user before writing code; follow TDD on every pure part; do not use subagents.

**Status:** specified 2026-10-01, copy and icon revised against the mockups the same day; **BUILT the same day on `feat/browser-push`** (migration 0128 applied to prod). Three departures from the text below, each recorded where it applies: (1) push sends use the email's OWN dedupe key format, with no `push:` prefix, in their own table — the union of both tables then feeds `selectDueNudges` unchanged; (2) the sender tries EVERY stored subscription, not only `failed_at is null` ones, because a failing row is deleted after `PUSH_MAX_FAILS` and filtering on `failed_at` would drop it after one; (3) the two browser helpers live in `lib/push/browser.ts`, because `core.ts` reaches `node:crypto` through `lib/email/click.ts` and cannot enter a client bundle. Decided by the user on 2026-09-30 after the email channel was measured (see §1). The three defaults in §2 were offered to the user as defaults and not changed — treat them as decided.

---

## 1. Why this exists (read once, then act)

The due nudge (ENGAGEMENT_SPEC.md C2) is an email: "3 Trigonometry questions are waiting", one a day at most, 12:30 IST, only when something is due in `/drill`. It was measured on 2026-09-30:

- **Email delivers but moves nothing.** Two test welcomes landed in Gmail's Primary tab, so spam is not the cause. Yet 1 drill from 260 nudges, 0 of 157 tracked clicks, and dormant welcomed accounts came back at 1.3% in 48 h against a 2.4% no-email baseline.
- **A Gmail tap opens an in-app browser with no session**, so the nudge's one button landed on `/drill` → `/login`. Fixed the same day: `/api/e/<token>` now signs the student in for 7 days after the send (`src/lib/email/signedLink.ts`, `signedLinkService.ts`). The next nudge run is the first honest read of email.
- **The audience is 15–19 and on phones.** The user's hypothesis, which the data cannot refute, is that a Gmail address is a login for them, not a channel. A browser notification is tied to the browser they already signed in on, so a tap lands with the session live. **The user declined WhatsApp**; do not propose it.

What push can and cannot do, so the build stays honest: it reaches only students who come back at least once after it ships and say yes. It cannot wake the dormant backlog. It is retention for the ~240 students active in a month (92 on 2+ days). Device split is unknown — nothing records a user-agent and the user has no Vercel Analytics — so iPhone reach (Home-Screen-only) is unquantified.

**The engagement gate (CLAUDE.md "Engagement engine — principles gate") applies.** This mechanic serves spaced repetition and deliberate practice: it resurfaces the specific questions a student got wrong, when they are due. It is content-led by rule — it names the chapters and the count, never the absence ("you haven't practised"). It is sent only when something is due. One a day at most.

## 2. Decided (do not re-litigate)

1. **A subscribed student gets the nudge by push, not by email.** No double-nudging. Students with no live subscription keep getting the email exactly as today.
2. **The ask is made once, on the mock result page**, after a graded mock, where the WhatsApp opt-in card already lives. Copy: "Tell me when my mistakes are due". Buttons: Turn on / Not now. A toggle on `/account` to change it later from any device. **Never on page load, never on a public page, never two asks on one screen.**
3. **The ask is hidden on iPhone browsers unless the site is on the Home Screen** (`navigator.standalone`), because push does not work there otherwise and asking would promise what cannot be delivered.

Also decided: one notification kind in v1 (the due nudge). `web-push` is the one new dependency (VAPID signing + payload encryption; not reasonable by hand — this satisfies CLAUDE.md's dependency rule, say so in the Decisions entry). No offline support, no app shell; the manifest is the minimum push needs. The notification's wording and icon were fixed against a mockup canvas (§3).

## 3. Behaviour (student-facing)

**The ask** (`PushOptIn` card on `/mock/attempt/[attemptId]/result`): rendered only when ALL hold — the profile's `push_prompted_at` is null (server) · the browser supports push (`"serviceWorker" in navigator && "PushManager" in window && "Notification" in window`) · `Notification.permission === "default"` · not iOS-non-standalone. Title "Tell me when my mistakes are due". Body: "One notification a day at most, only when something is waiting in Fix. Never on a day you already practised." Turn on → subscribe (§7) → toast "On. We'll tell you when something is waiting." Not now → nothing else. BOTH buttons `PATCH /api/profile { pushPrompted: true }`, which stamps `push_prompted_at` (mirror of `whatsappOptIn` → `whatsapp_prompted_at` in `src/lib/profile/service.ts:101-135`). If the browser denies, toast "Notifications are off in this browser. You can turn them on from your account page." and stamp anyway. If `needsWhatsappPrompt(profile)` is also true, render the push ask and NOT the WhatsApp card on that visit (push first; the WhatsApp card gets the next visit).

**The notification** (mocked up 2026-10-01 at https://claude.ai/artifact/86e7ao6tiae3bgjrc1EGoy, which is what fixed the three points below). Title = **"N mistakes are waiting in Fix"** ("1 mistake is waiting in Fix"), N = the due total. It is NOT the email subject: the subject ("3 Trigonometry questions are waiting — 5 in all") is cut to "…are waiting" on a collapsed Android lock screen, which is how most students see a notification. Body = the chapter list (at most 3, then "+K more") and then the time: **"About a minute."** for 1, **"About N minutes."** for N = min(total, 5), because a drill serves at most five questions at about a minute each — a fixed "About five minutes" is wrong for a single question. E.g. title "5 mistakes are waiting in Fix", body "Trigonometry 3 · Vectors 2 · About 5 minutes." `icon` = `/icons/push-192.png` (the header's BookOpen mark, white on the indigo brand fill) and `badge` = `/icons/push-badge-96.png` (the mark alone, white on transparent — Android paints the status-bar glyph from alpha only), so the sender is recognisable at a glance; without them every notification shows a generic browser icon. Both are committed PNGs rendered once from lucide's `book-open` SVG — no new package. `tag: "due-nudge"` so a second one replaces the first rather than stacking. TTL 12 hours so a phone that was off does not get a stale nudge at midnight.

**The tap** opens the tracked URL `clickUrl(token, "/drill")` (`src/lib/email/click.ts`) in an existing same-origin tab if one is open, else a new one. `/api/e/<token>` records `push_clicked` and redirects (§9). The session is live because it is the same browser; the sign-in branch will report `session-present`, which is correct.

**The account toggle** (`/account`, a `PushCard` client island under the existing cards): shows one of "On in this browser" (with Turn off) · "Off" (with Turn on) · "Not available in this browser" (iOS-non-standalone: one line telling them to add the site to the Home Screen first; unsupported: nothing more). Device state comes from `registration.pushManager.getSubscription()`, not the server.

**Policy carried over from email, unchanged:** nothing due → no send; a drill in the last 24 h → no send; 3-day gap between nudges; stop after 3 unanswered until they drill again; one a day at most, a property of the TABLE (dedupe key carries the IST day, UNIQUE). All of it already lives in `selectDueNudges` (`src/lib/email/dueNudge.ts`) — the push sender REUSES it, it does not copy it.

## 4. Data — migration `0128_push.sql` (next number; 0127 is `chat_interactions`)

Write the rationale in the file header (every migration here does; 18–58 lines). Apply via the Supabase MCP `apply_migration`, then `npm run testdb:migrate` so the test project has it BEFORE the integration tests run.

```sql
create table public.push_subscriptions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  endpoint      text not null unique,              -- one row per browser; a re-subscribe upserts on it
  p256dh        text not null,
  auth          text not null,
  user_agent    text,                               -- first thing in the repo that records one; truncate to 256
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now(), -- bumped on every (re)subscribe
  fail_count    int not null default 0,            -- consecutive delivery failures that were NOT 404/410
  failed_at     timestamptz,                        -- last failure; null = live
  constraint push_subscriptions_endpoint_https check (endpoint like 'https://%')
);
create index on public.push_subscriptions (user_id);

create table public.push_sends (                    -- the log, the shape of email_sends (0059) minus the mail columns
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  subscription_id  uuid references public.push_subscriptions(id) on delete set null,
  kind             text not null check (kind in ('due_nudge')),
  dedupe_key       text not null unique,             -- due_nudge:<userId>:<IST day> — the email's format (as built)
  click_token      text unique,                       -- same mint as email (newClickToken), looked up by /api/e
  status           text not null check (status in ('sent','failed','gone')),  -- gone = 404/410, the subscription was deleted
  status_code      int,
  error            text,
  metadata         jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now()
);
create index on public.push_sends (user_id, created_at desc);

-- RLS: a student may READ their own rows (transparency, the email_sends posture); all writes are service-role.
-- push_subscriptions: own-row SELECT only. The subscribe API verifies the session, then writes with the
-- service-role client scoped to that user id (the listMyAssignments precedent), because a re-subscribe on a
-- shared browser must be able to move an endpoint from one user to another, which own-row RLS cannot express.
alter table public.push_subscriptions enable row level security;
create policy push_subscriptions_own_read on public.push_subscriptions for select to authenticated using (user_id = auth.uid());
alter table public.push_sends enable row level security;
create policy push_sends_own_read on public.push_sends for select to authenticated using (user_id = auth.uid());

alter table public.student_profiles add column push_prompted_at timestamptz;

-- user_activity gains ONE kind. Copy 0123's pattern exactly: drop + re-add user_activity_kind_ck with 'push_clicked' appended.
```

Add `"push_clicked"` to `ACTIVITY_KINDS` in `src/lib/activity/events.ts` (comment: `// tapped one of our notifications (refId = push_sends.id, metadata: kind)`) and a label in `src/lib/activity/shape.ts` ("Notification tapped"). Check whether `src/lib/pmf/snapshot.ts` / migration 0125's `NOT IN (...)` reach list needs the new kind added to its exclusion — it is reach, not learning, so it must be excluded like `email_clicked`. Grep for `'email_clicked'` and mirror every occurrence.

RLS test `tests/push-rls.test.ts` (copy the shape of `tests/email-sends-rls.test.ts`): a student reads own rows, cannot read another's, cannot insert/update/delete either table; service role can.

## 5. Pure core — `src/lib/push/core.ts` (TDD: `tests/push-core.test.ts`, written FIRST)

Not `server-only` (the tsx script imports it; the `lib/email` precedent).

```ts
export const PUSH_KIND = "due_nudge" as const;
export const PUSH_TTL_SECONDS = 12 * 3600;
export const PUSH_MAX_FAILS = 5;             // consecutive non-gone failures before a subscription is dropped as a zombie

export type PushSubscriptionInput = { endpoint: string; keys: { p256dh: string; auth: string }; userAgent?: string };
/** Validates a browser's PushSubscription.toJSON(): https endpoint ≤ 2048 chars, both keys base64url 16..256 chars, userAgent truncated to 256. Returns the cleaned input or a reason string. */
export function parseSubscription(body: unknown): { ok: true; value: PushSubscriptionInput } | { ok: false; reason: string };

export const PUSH_ICON = "/icons/push-192.png";
export const PUSH_BADGE = "/icons/push-badge-96.png";
export type PushPayload = { title: string; body: string; url: string; tag: "due-nudge"; icon: string; badge: string };
/** "1 mistake is waiting in Fix" / "N mistakes are waiting in Fix". */
export function pushTitle(total: number): string;
/** "About a minute." for 1, else "About N minutes." with N = min(total, 5) — a drill serves at most five. */
export function drillTimeLine(total: number): string;
/** body = "Chapter N · Chapter M · +K more · <drillTimeLine>". Max 3 chapters then "+K more" (K = chapters left out). */
export function buildDuePushPayload(input: { summary: DueSummary; clickToken: string }): PushPayload;
/** JSON string of the payload, asserted < 3500 bytes (web-push's 4 KB cap, with headroom). */
export function serializePayload(p: PushPayload): string;

// (As built: no pushDedupeKey — a push send uses dueNudgeDedupeKey, the email's own key, in push_sends.)

export type DeliveryOutcome = "sent" | "gone" | "failed";
/** 200/201 → sent. 404/410 → gone (delete the subscription). Everything else → failed (keep, fail_count+1). A thrown non-HTTP error → failed. */
export function classifyDelivery(statusCode: number | null): DeliveryOutcome;
/** After a failed delivery: drop when fail_count+1 >= PUSH_MAX_FAILS. */
export function shouldDropAfterFailure(failCount: number): boolean;

/** iOS Safari/Chrome outside a Home-Screen install cannot receive push. Pure on (userAgent, standalone) so it is testable. */
export function isIosNotStandalone(userAgent: string, standalone: boolean): boolean;
export function urlBase64ToUint8Array(base64: string): Uint8Array;   // the VAPID public key → applicationServerKey
```

Test cases to pin: endpoint must be https and ≤ 2048; missing/short keys rejected; userAgent truncated; payload under the cap with 10 chapters; title singular at 1 and plural above, and short enough not to truncate (≤ 34 chars at a 3-digit total); time line at 1, 3, 5 and 40; body with 1, 3 and 5 chapters (the "+K more" count is CHAPTERS left out, not questions); icon and badge paths present; one-a-day across channels (a push sent today blocks the email run and the reverse); every status code class; drop at exactly `PUSH_MAX_FAILS`; iPad/iPhone UAs with `standalone` true vs false; the base64url conversion against a known vector.

**Email selection gains one skip reason.** In `src/lib/email/dueNudge.ts`, `SelectInput` gets `pushUsers?: ReadonlySet<string>` and `NudgeSkipReason` gets `"has-push"`, checked right after `opted-out` (a subscribed student is skipped by the email run). Add the case to `tests/email-due-nudge.test.ts`. The `priorSends` the email run reads must INCLUDE push sends (so the 3-day gap and the 3-unanswered backoff count across both transports): extend `readPriorSends` in `src/lib/email/service.ts` to read `push_sends` too and map rows to the same shape (`kind: "due_nudge"`), or add `readPriorPushSends` and concatenate in both senders — your call, state it.

## 6. API — `src/app/api/push/subscribe/route.ts`

- `POST` body = `PushSubscriptionInput`. `parseSubscription` → 400 `{ ok: false, error }` on failure. Session via `createSupabaseServerClient().auth.getUser()` → 401 if none. Then `createSupabaseAdminClient().from("push_subscriptions").upsert({ user_id, endpoint, p256dh, auth, user_agent, last_seen_at: now, fail_count: 0, failed_at: null }, { onConflict: "endpoint" })` → 200 `{ ok: true }`. Consistent response shape with `/api/profile`.
- `DELETE` body `{ endpoint }` → delete where `endpoint` AND `user_id = session user` → 200 `{ ok: true }` (also when nothing matched).
- Signed-in only, so no rate-limit table; validation fails fast before any DB call.
- `PATCH /api/profile` accepts `pushPrompted: z.literal(true).optional()` → stamps `push_prompted_at` (mirror the `whatsappOptIn` plumbing in `src/app/api/profile/route.ts` + `src/lib/profile/service.ts`; `needsPushPrompt(profile)` beside `needsWhatsappPrompt`).
- Integration test `tests/push-subscribe-route.integration.test.ts`: call the handlers directly like `tests/email-click-route.integration.test.ts` does, with `next/headers` replaced by an in-memory cookie jar (`vi.hoisted`; copy that file's mock) holding a real session minted via `mustSignIn` from `tests/helpers/fixture.ts`. Cases: 401 anon; 400 on a bad endpoint; 200 upsert then a second POST from a DIFFERENT user on the same endpoint moves the row; DELETE removes only own.

## 7. Client

- **`public/icons/push-192.png` + `public/icons/push-badge-96.png`**: rendered once from lucide's `book-open` SVG (the AppHeader mark) — 192 px white mark on a `#4f46e5` rounded square, and a 96 px white mark on transparent. Any local rasteriser will do (PyMuPDF renders SVG); commit the PNGs, not the tool.
- **`public/sw.js`** (plain JS, no bundling): `push` → `event.waitUntil(self.registration.showNotification(data.title, { body: data.body, tag: data.tag, icon: data.icon, badge: data.badge, data: { url: data.url } }))`, with a try/catch around `event.data.json()` that falls back to a generic "Something is waiting in Fix" / `/drill` with the same icon and badge. `notificationclick` → `notification.close()`, then `clients.matchAll({ type: "window", includeUncontrolled: true })`: focus the first same-origin client and `navigate(url)`, else `clients.openWindow(url)`. `pushsubscriptionchange` → re-subscribe with the stored `applicationServerKey` and POST (best effort). Keep it under 60 lines; it has no tests, so keep it boring.
- **`public/manifest.webmanifest`**: `{ name: "PYQ Vault", short_name: "PYQ Vault", start_url: "/me", display: "standalone", background_color: "#ffffff", theme_color: "#4f46e5", icons: [{ src: "/icons/push-192.png", sizes: "192x192", type: "image/png" }] }` (indigo-600 = the brand). Add `manifest: "/manifest.webmanifest"` to the `metadata` export in `src/app/layout.tsx` — static metadata, no `cookies()`, so it cannot de-cache the shell (CLAUDE.md "Recurring pitfalls"); verify after build that `find .next/server/app -name '*.html' | wc -l` is unchanged.
- **`src/lib/push/client.ts`** (`"use client"` helpers, no React): `isPushSupported()`, `subscribeToPush(vapidPublicKey)` → `navigator.serviceWorker.register("/sw.js")` → `ready` → `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(key) })` → `POST /api/push/subscribe` with `sub.toJSON()` + `navigator.userAgent` → returns `"subscribed" | "denied" | "unsupported" | "failed"`. `unsubscribeFromPush()` → `getSubscription()?.unsubscribe()` + `DELETE`. `currentSubscription()` for the toggle. Every `localStorage`/`Notification` access in try/catch (CLAUDE.md: storage can throw in private windows).
- **`PushOptIn.tsx`** next to `WhatsappOptIn.tsx` (same card chrome, `lucide-react` `BellRing`, brand button; focus styles + aria-labels per the accessibility rule). The VAPID public key reaches it as a PROP from the server page (`process.env.VAPID_PUBLIC_KEY`), so no `NEXT_PUBLIC_` variable is needed. The feature-detection runs in `useEffect` after mount, never in the render body (the `ShareResult` precedent — SSR has no `window`).
- **`src/app/account/PushCard.tsx`** (client island, key as a prop from `account/page.tsx`).
- `surface_viewed` already logs the result page; no new instrumentation on the ask. The decision itself is the stamp.

## 8. Sender — `scripts/push/send-due-nudge.ts` (`npm run push:due-nudge`)

Mirror `scripts/email/send-due-nudge.ts` line for line in shape: `--apply` (REAL SENDS; lives ONLY in the workflow), `--only=<email>`, `--limit=N`, `--report`, dry-run default printing the skip-reason histogram. Add `--self-test=<email>`: sends a fixed `{ title: "PYQ Vault test", body: "Notifications are working.", url: clickUrl(token, "/me") }` to every live subscription of that user and writes NO `push_sends` row (the `--sample-to` precedent — a test must not burn the day's dedupe key). The self-test is the browser check and may target a staff account; the real send never does, because `readStudents` excludes `org_members`.

Flow: `readStudents` + `readPriorSends` (both transports) + `readDueCandidates` → `readSubscriptions(db)` (ALL rows — as built; see Status — PAGED — never a bare `.select()`; group by user) → `selectDueNudges` over candidates INTERSECTED with subscribed users (a student with no live subscription is the email run's) → for each pick: mint `newClickToken()`, `buildDuePushPayload`, then for EACH of the user's live subscriptions `webpush.sendNotification(sub, serializePayload(p), { TTL: PUSH_TTL_SECONDS, urgency: "normal" })` → `classifyDelivery` → `gone`: delete the subscription row; `failed`: `fail_count+1`, `failed_at=now`, drop at `PUSH_MAX_FAILS`; `sent`: reset `fail_count`. Write ONE `push_sends` row per pick (status = best outcome across that user's subscriptions; `subscription_id` = the one that succeeded), `dedupe_key = p.dedupeKey` (the selection's own key), `metadata: { due, top, devices: n }`. Throttle 100 ms between sends. `--report`: sends · tapped (`push_clicked` joined on `push_sends.id` — copy `countClickedSends` in `src/lib/email/dueNudgeService.ts`, ONE pass, no `.in()` over ids) · drilled within 24 h.

`web-push` setup: `webpush.setVapidDetails(process.env.VAPID_SUBJECT!, process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!)`; fail loudly at start if any is missing (the `emailEnv()` precedent). Dependencies: `web-push` + `@types/web-push` (dev). Under `tsx` it is CJS; `import webpush from "web-push"` works with the repo's `esModuleInterop`.

**Workflow:** edit `.github/workflows/due-nudge.yml` to run TWO steps in order — `npm run push:due-nudge -- --apply --limit=200` with the three VAPID secrets, THEN the existing email step. The email run's `has-push` skip is what keeps the two from overlapping, and the shared prior-sends read is what keeps the gap rule honest across both. Update the header comment in the workflow to say so.

## 9. Click tracking — `/api/e/[token]`

`src/app/api/e/[token]/route.ts` looks a token up in `email_sends`. Generalise: if no email send matches, look in `push_sends` (`id, user_id, kind, created_at`); on a push match log `kind: "push_clicked"`, `refKind: "push_send"`, `dedupeKey: push_click:<id>`, the same `metadata` shape. The sign-in branch runs unchanged (it will record `session-present` for a push tap, which is the truth). Extend `tests/email-click-route.integration.test.ts` with one push case (insert a `push_sends` row with a token; GET; assert the `push_clicked` row and the redirect). Update the route's doc comment and the `click.ts` header.

## 10. Environment and secrets (the USER adds these; you generate the values and hand them over in the chat)

- Generate once: `npx web-push generate-vapid-keys` → `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`. `VAPID_SUBJECT=mailto:connect.lwspune@gmail.com`.
- `.env.local`: all three (the script reads them; the pages read the public one).
- **Vercel:** `VAPID_PUBLIC_KEY` only (the pages pass it as a prop; the private key must never reach Vercel because nothing there sends).
- **GitHub repo secrets:** all three (the cron sends). The workflow already needs the Supabase pair and the Resend pair; CLAUDE.md's "CI gate" paragraph lists the six — add a line there naming these three as cron-only, like `RESEND_API_KEY`.
- Rotating the keys invalidates every subscription (the browser's subscription is bound to the public key); say so in OPERATIONS.md.

## 11. Verification — what each layer proves

- **Unit (vitest):** `push-core` (every function in §5), the `has-push` skip in `email-due-nudge`, the payload size cap.
- **Integration (test project):** `push-rls`, `push-subscribe-route`, the `push_clicked` case in `email-click-route`. `npm run testdb:migrate` first or they fail on a missing table.
- **Gate:** `npm run prepush` (the build is needed — `src/` changes). Expect green; then the cache probe in §7.
- **What NO test here can prove, and must be handed to the user with that said plainly** (CLAUDE.md pitfall: the build is blind to `ƒ` pages and to click-gated UI): (1) the ask card renders and lays out on the result page after a graded mock — it is behind auth and behind a graded attempt; (2) the browser grants permission and `POST /api/push/subscribe` writes a row — check with SQL; (3) a notification arrives: `npm run push:due-nudge -- --self-test=<their email>` on the user's machine with `.env.local` populated, first Chrome on Windows, then Android Chrome on the user's phone; (4) the tap opens `/drill` signed in and writes `push_clicked`; (5) the `/account` toggle turns it off and the row goes away. Give the user that list as a checklist; do not report done until they confirm.

## 12. Documentation (part of done)

- **CLAUDE.md:** a Decisions digest at the top of `### 2026-10` (create the month block — it is the first October entry; the newest-first and ≤1.2 KB rules apply) AND the long form in `DECISIONS_HISTORY.md`'s current batch (write BOTH; the budget probe names digests with no long form). Add `npm run push:due-nudge` to the Commands block beside `email:due-nudge`, in the same voice. Mention the three secrets in the CI-gate paragraph. Run `npm run docs:budget`; archive the oldest entries if the log is over the ceiling — only ones whose long form exists (the probe tells you), and append the eviction clause to the 2026-09 block's header sentence as every eviction before did.
- **ARCHITECTURE.md:** one `lib/push/` line (pure core · client · the route · the script · the SW + manifest), appended to the `src/lib/` tree in the house style (dense, with the why).
- **ENGAGEMENT_SPEC.md §C2:** a paragraph "Browser push (2026-10-xx)" with the three decisions and the measure (`push:due-nudge -- --report`). Update the PMF table's nudge row.
- **OPERATIONS.md:** "### Browser push — the due-queue nudge (DAILY CRON)" after the email sections: secrets, the self-test command, key rotation.
- **Memory:** append to `project_engagement_engine.md` in the memory directory (one paragraph: shipped, the three decisions, what is still unmeasured).

## 13. Order of work and done

1. Plan to the user (one screen) → approval. 2. Migration + `testdb:migrate` + RLS test. 3. `push-core` tests → core. 4. `has-push` test → selection change + prior-sends union. 5. Subscribe route test → route + profile stamp. 6. SW + manifest + client helper + the two islands (hand-verified only). 7. Sender + workflow. 8. `/api/e` push case. 9. Docs + memory. 10. `npm run prepush` green + the cache-count probe. 11. Hand the §11 browser checklist to the user. 12. On their confirmation: merge to `main` with `--no-ff`, delete the branch, **do not push** (the user pushes).

Work on a branch off `main` (`feat/browser-push`). Conventional commits, one logical change each: `feat(push): migration 0128 …`, `feat(push): pure core`, `feat(push): subscribe API`, `feat(push): service worker, manifest and the ask`, `feat(push): due-nudge sender and cron`, `feat(email): skip subscribed students in the email nudge`, `docs(push): …`.

## 14. Repo traps that apply here (each has bitten this codebase; CLAUDE.md "Recurring pitfalls" has the long form)

- PostgREST returns at most 1000 rows from a bare `.select()` — page `push_subscriptions`; and `.in("col", ids)` overflows the URL past ~200 ids — chunk it or avoid it.
- `next/headers` `cookies()` throws outside a request — route tests replace it (see `tests/email-click-route.integration.test.ts`).
- `next build` never renders an auth-gated `ƒ` page or anything behind a click — the ask card and the toggle are unverifiable here; say so.
- One `cookies()` read in a shared shell de-caches the whole site — the manifest link is static metadata, which is fine; do not resolve a session in `layout.tsx` for any reason.
- `localStorage`/`Notification` can throw — try/catch every access.
- `next/link` prefetch on a dynamic route multiplies renders — `prefetch={false}` on any link the new islands add.
- `npm test` targets the TEST project and refuses prod; a migration applied to prod but not replayed with `testdb:migrate` fails every integration test on "relation does not exist".
- A bash heredoc eats backslashes; write files with the Write tool.
- Copy rule for anything the student reads: short sentences, content-led, never "we miss you", no vanity ("you've been away 3 days"), no exclamation marks.
