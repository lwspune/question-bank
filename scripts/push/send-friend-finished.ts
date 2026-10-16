/**
 * "Your friend finished" by BROWSER PUSH (practise together, step 2,
 * 2026-10-16). When a friend finishes a practice test someone sent them,
 * everyone in that test's group who had already finished gets one
 * notification linking to the shared results card on their own result page.
 *
 *   npx tsx scripts/push/send-friend-finished.ts           # DRY RUN
 *   npx tsx scripts/push/send-friend-finished.ts --apply   # send
 *
 * DRY RUN IS THE DEFAULT. `--apply` lives in .github/workflows/sweep-expired.yml
 * (hourly, after the sweep grades timed-out attempts), where the VAPID private
 * key is; Vercel has the public key only, so the website never sends this.
 *
 * WHO is pickFriendFinishedPushes (lib/practiceTests/together.ts): at most one
 * push per person per test a day, only about finishes in the last two days.
 * Push only (owner): a student without a subscription gets nothing and no row,
 * and is simply picked again next hour. One push_sends row per pick; its
 * dedupe_key is UNIQUE, so a re-run cannot send twice.
 */
import { join } from "node:path";
// Must precede the togetherService import: it reaches lib/mocks/service,
// which is marked `server-only` (see scripts/lib/serverOnly.ts).
import "../lib/serverOnly";
import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { newClickToken } from "../../src/lib/email/click";
import { serializePayload } from "../../src/lib/push/core";
import { readPriorPushSends, readSubscriptions, type PushSubRow } from "../../src/lib/push/service";
import { FRIEND_FINISHED_KIND, friendFinishedPayload, pickFriendFinishedPushes } from "../../src/lib/practiceTests/together";
import { readFriendFinishGroups } from "../../src/lib/practiceTests/togetherService";
import { deliverToAll, setVapidFromEnv } from "./webpush";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Finishes this far back are read; pickFriendFinishedPushes keeps the last two days. */
const LOOKBACK_MS = 48 * 3_600_000;

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createSupabaseAdminClient();
  console.log(`\n${apply ? "APPLY — REAL SENDS" : "DRY RUN — nothing will be sent"}`);
  if (apply) setVapidFromEnv();

  const now = new Date();
  const [groups, prior, subs] = await Promise.all([
    readFriendFinishGroups(db, new Date(now.getTime() - LOOKBACK_MS).toISOString()),
    readPriorPushSends(db),
    readSubscriptions(db),
  ]);
  const picks = pickFriendFinishedPushes({ groups, priorSends: prior, now });
  const subsByUser = new Map<string, PushSubRow[]>();
  for (const s of subs) subsByUser.set(s.userId, [...(subsByUser.get(s.userId) ?? []), s]);
  const reachable = picks.filter((p) => subsByUser.has(p.userId));
  console.log(`Groups with a recent finish: ${groups.length} · picks: ${picks.length} · with push on: ${reachable.length}`);

  let sent = 0;
  for (const p of reachable) {
    const clickToken = newClickToken();
    const payload = friendFinishedPayload({ names: p.names, recipientAttemptId: p.recipientAttemptId, clickToken });
    const browsers = subsByUser.get(p.userId) ?? [];
    console.log(`  push ${p.userId} — ${payload.title} [${browsers.length} browser(s)]`);
    sent++;
    if (!apply) continue;

    const best = await deliverToAll(db, browsers, serializePayload(payload));
    const { error } = await db.from("push_sends").insert({
      user_id: p.userId,
      subscription_id: best.subId,
      kind: FRIEND_FINISHED_KIND,
      dedupe_key: p.dedupeKey,
      click_token: clickToken,
      status: best.outcome,
      status_code: best.code,
      error: best.outcome === "sent" ? null : best.error,
      metadata: { rootId: p.rootId, friends: p.names.length, devices: browsers.length },
    });
    // 23505: another run logged this key first. Nothing to do.
    if (error && error.code !== "23505") throw new Error(`push_sends(${p.dedupeKey}): ${error.message}`);
  }
  console.log(`\n${apply ? "Sent" : "Would send"}: ${sent}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
