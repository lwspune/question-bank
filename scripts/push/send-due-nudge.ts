/**
 * Due-queue nudge by BROWSER PUSH. PUSH_SPEC.md §8; the email twin is
 * scripts/email/send-due-nudge.ts.
 *
 *   npx tsx scripts/push/send-due-nudge.ts                     # DRY RUN
 *   npx tsx scripts/push/send-due-nudge.ts --apply             # send
 *   npx tsx scripts/push/send-due-nudge.ts --only=a@b.com --apply
 *   npx tsx scripts/push/send-due-nudge.ts --limit=50 --apply
 *   npx tsx scripts/push/send-due-nudge.ts --self-test=a@b.com # a test notification to every browser of that account, NO row
 *   npx tsx scripts/push/send-due-nudge.ts --report            # sends, taps, drills within 24h
 *
 * DRY RUN IS THE DEFAULT. `--apply` lives in .github/workflows/due-nudge.yml,
 * which runs this BEFORE the email nudge: the email run then skips every
 * student with a subscription (has-push), so nobody gets both.
 *
 * WHO. The same readDueCandidates + selectDueNudges as the email, with
 * channel "push": only subscribed students, email consent ignored (the
 * subscription is its own consent), and prior sends read from BOTH tables so
 * one-a-day, the 3-day gap and the backoff hold across channels.
 *
 * DELIVERY. One notification per pick to EACH of the student's browsers, one
 * push_sends row per pick (UNIQUE dedupe_key: a re-run sends nothing). A 404/410
 * deletes that browser's subscription; any other failure counts toward
 * PUSH_MAX_FAILS. --self-test writes no row, so it cannot burn the day's key,
 * and may target a staff account, which the real run never reaches.
 */
import { join } from "node:path";
import webpush from "web-push";
import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { selectDueNudges } from "../../src/lib/email/dueNudge";
import { readDueCandidates } from "../../src/lib/email/dueNudgeService";
import { newClickToken, clickUrl } from "../../src/lib/email/click";
import { readPriorSends, readStudents } from "../../src/lib/email/service";
import {
  PUSH_BADGE,
  PUSH_ICON,
  PUSH_KIND,
  PUSH_TTL_SECONDS,
  buildDuePushPayload,
  classifyDelivery,
  serializePayload,
  shouldDropAfterFailure,
  type DeliveryOutcome,
} from "../../src/lib/push/core";
import {
  readPriorPushSends,
  readPushConversion,
  readSubscriptions,
  recordDelivery,
  type PushSubRow,
} from "../../src/lib/push/service";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const THROTTLE_MS = 100;

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}
const has = (name: string) => process.argv.includes(`--${name}`);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function vapidEnv(): { subject: string; publicKey: string; privateKey: string } {
  const subject = process.env.VAPID_SUBJECT;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!subject || !publicKey || !privateKey) {
    throw new Error("VAPID_SUBJECT, VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY must all be set (see OPERATIONS.md).");
  }
  return { subject, publicKey, privateKey };
}

/** One delivery; never throws. The status code decides the subscription's fate. */
async function deliver(sub: PushSubRow, payload: string): Promise<{ outcome: DeliveryOutcome; code: number | null; error: string | null }> {
  try {
    const res = await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      payload,
      { TTL: PUSH_TTL_SECONDS, urgency: "normal" }
    );
    return { outcome: classifyDelivery(res.statusCode), code: res.statusCode, error: null };
  } catch (e) {
    const code = (e as { statusCode?: number }).statusCode ?? null;
    const body = (e as { body?: string }).body ?? (e instanceof Error ? e.message : String(e));
    return { outcome: classifyDelivery(code), code, error: String(body).slice(0, 1000) };
  }
}

async function main() {
  const apply = has("apply");
  const only = arg("only")?.toLowerCase();
  const selfTest = arg("self-test")?.toLowerCase();
  const limit = arg("limit") ? Number(arg("limit")) : undefined;
  const db = createSupabaseAdminClient();

  if (has("report")) {
    const r = await readPushConversion(db, 24);
    console.log(
      `\nSubscribed browsers: ${r.subscribers}\nPush nudges sent: ${r.sent}; tapped: ${r.tapped}; recipients who drilled within 24h: ${r.drilledAfter}`
    );
    if (r.sent > 0) console.log(`Conversion: ${Math.round((r.drilledAfter / r.sent) * 100)}%`);
    return;
  }

  if (selfTest) {
    const v = vapidEnv();
    webpush.setVapidDetails(v.subject, v.publicKey, v.privateKey);
    const { data, error } = await db.from("push_subscriptions").select("id, user_id, endpoint, p256dh, auth, fail_count");
    if (error) throw new Error(error.message);
    const users = new Map<string, string>();
    for (let page = 1; page < 50; page++) {
      const { data: list, error: uErr } = await db.auth.admin.listUsers({ page, perPage: 1000 });
      if (uErr) throw new Error(uErr.message);
      for (const u of list.users) if (u.email) users.set(u.id, u.email.toLowerCase());
      if (list.users.length < 1000) break;
    }
    const mine = ((data ?? []) as Record<string, unknown>[]).filter((r) => users.get(r.user_id as string) === selfTest);
    console.log(`\nSELF-TEST — ${mine.length} browser(s) subscribed for ${selfTest}; no row is written`);
    const payload = serializePayload({
      title: "PYQ Vault test",
      body: "Notifications are working.",
      url: clickUrl(newClickToken(), "/me"),
      tag: "due-nudge",
      icon: PUSH_ICON,
      badge: PUSH_BADGE,
    });
    for (const r of mine) {
      const d = await deliver(
        { id: r.id as string, userId: r.user_id as string, endpoint: r.endpoint as string, p256dh: r.p256dh as string, auth: r.auth as string, failCount: r.fail_count as number },
        payload
      );
      console.log(`  ${d.outcome} (${d.code ?? "no status"})${d.error ? ` — ${d.error}` : ""}`);
    }
    return;
  }

  console.log(`\n${apply ? "APPLY — REAL SENDS" : "DRY RUN — nothing will be sent"}`);
  if (apply) {
    const v = vapidEnv();
    webpush.setVapidDetails(v.subject, v.publicKey, v.privateKey);
  }

  const now = new Date();
  const [students, priorEmail, priorPush, subs, candidates] = await Promise.all([
    readStudents(db),
    readPriorSends(db),
    readPriorPushSends(db),
    readSubscriptions(db),
    readDueCandidates(db, now),
  ]);
  const subsByUser = new Map<string, PushSubRow[]>();
  for (const s of subs) subsByUser.set(s.userId, [...(subsByUser.get(s.userId) ?? []), s]);
  console.log(`Subscribed browsers: ${subs.length} · students with one: ${subsByUser.size} · candidates: ${candidates.length}`);

  const { picks, skipped } = selectDueNudges({
    candidates,
    students: new Map(students.map((s) => [s.userId, s])),
    priorSends: [...priorEmail, ...priorPush],
    now,
    channel: "push",
    pushUsers: new Set(subsByUser.keys()),
  });
  const reasons = new Map<string, number>();
  for (const s of skipped) reasons.set(s.reason, (reasons.get(s.reason) ?? 0) + 1);
  console.log(
    `Picks: ${picks.length} · skipped: ${skipped.length} (${[...reasons.entries()].map(([r, n]) => `${n} ${r}`).join(", ") || "none"})`
  );

  const emailOf = new Map(students.map((s) => [s.userId, (s.email ?? "").toLowerCase()]));
  const chosen = picks.filter((p) => !only || emailOf.get(p.userId) === only);
  let sent = 0;

  for (const p of chosen) {
    if (limit !== undefined && sent >= limit) break;
    const clickToken = newClickToken();
    const payload = buildDuePushPayload({ summary: p.summary, clickToken });
    const browsers = subsByUser.get(p.userId) ?? [];
    console.log(`  push ${emailOf.get(p.userId) || p.userId} — ${payload.title} · ${payload.body} [${browsers.length} browser(s)]`);
    sent++;
    if (!apply) continue;

    const body = serializePayload(payload);
    let best: { outcome: DeliveryOutcome; code: number | null; error: string | null; subId: string | null } = {
      outcome: "failed",
      code: null,
      error: "no browser",
      subId: null,
    };
    const rank = { sent: 2, failed: 1, gone: 0 } as const;
    for (const sub of browsers) {
      const d = await deliver(sub, body);
      await recordDelivery(db, sub, d.outcome, d.outcome === "failed" && shouldDropAfterFailure(sub.failCount));
      if (d.outcome !== "sent") console.log(`       ${d.outcome} (${d.code ?? "no status"})${d.error ? ` — ${d.error.slice(0, 120)}` : ""}`);
      if (best.subId === null || rank[d.outcome] > rank[best.outcome]) best = { ...d, subId: d.outcome === "sent" ? sub.id : null };
      await sleep(THROTTLE_MS);
    }
    const { error } = await db.from("push_sends").insert({
      user_id: p.userId,
      subscription_id: best.subId,
      kind: PUSH_KIND,
      dedupe_key: p.dedupeKey,
      click_token: clickToken,
      status: best.outcome,
      status_code: best.code,
      error: best.outcome === "sent" ? null : best.error,
      metadata: { due: p.summary.total, top: p.summary.chapters[0] ?? null, devices: browsers.length },
    });
    if (error) throw new Error(`push_sends(${p.dedupeKey}): ${error.message}`);
  }

  console.log(`\n${apply ? "Sent" : "Would send"}: ${sent}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
