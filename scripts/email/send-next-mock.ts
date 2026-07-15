/**
 * Mock-recommendation campaign runner.
 *
 *   npx tsx scripts/email/send-next-mock.ts                 # DRY RUN (default)
 *   npx tsx scripts/email/send-next-mock.ts --apply         # actually send
 *   npx tsx scripts/email/send-next-mock.ts --only=a@b.com  # one address
 *   npx tsx scripts/email/send-next-mock.ts --apply --limit=5
 *
 * DRY RUN IS THE DEFAULT and prints exactly who would receive what. Sending is
 * an explicit, irreversible act — it must be typed, not defaulted into.
 *
 * A manual script rather than a cron, deliberately: this repo's batch precedent
 * is tsx (scripts/mocks/build.ts, scripts/activity/backfill.ts), and CLAUDE.md's
 * engagement gate says measure the usage shape BEFORE automating a mechanic —
 * /dashboard/activity currently reports `insufficient`. Cron once there's a
 * verdict and this has proven itself.
 *
 * Safety properties:
 *  - Idempotent. Every send writes a UNIQUE dedupe_key; a re-run picks nobody
 *    already emailed for that mock. Safe to run twice by accident.
 *  - Sequential + throttled (Resend free tier is 2 req/sec).
 *  - A provider failure is RECORDED and the run continues — one bad address
 *    can't abort the batch.
 */
import { join } from "node:path";
import { pickRecipients } from "../../src/lib/email/recommend";
import { buildEmail } from "../../src/lib/email/templates";
import { sendEmail, sleep, THROTTLE_MS, emailEnv } from "../../src/lib/email/resend";
import {
  loadCampaignInputs,
  ensureUnsubscribeTokens,
  recordSend,
} from "../../src/lib/email/service";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}
const has = (name: string) => process.argv.includes(`--${name}`);

async function main() {
  const apply = has("apply");
  const only = arg("only")?.toLowerCase();
  const limit = arg("limit") ? Number(arg("limit")) : undefined;

  console.log(`\n${apply ? "APPLY — REAL SENDS" : "DRY RUN — nothing will be sent"}`);
  if (only) console.log(`Restricted to: ${only}`);
  if (limit) console.log(`Limit: ${limit}`);

  const { db, students, mocks, attempts, priorSends } = await loadCampaignInputs();
  console.log(
    `\nLoaded: ${students.length} students · ${mocks.length} published mocks · ` +
      `${attempts.length} attempts · ${priorSends.length} prior sends`
  );

  let recipients = pickRecipients({ students, mocks, attempts, priorSends, now: Date.now() });
  if (only) recipients = recipients.filter((r) => r.email.toLowerCase() === only);
  if (limit !== undefined) recipients = recipients.slice(0, limit);

  const nextCount = recipients.filter((r) => r.kind === "next_mock").length;
  const firstCount = recipients.filter((r) => r.kind === "first_mock").length;

  // Why the roster shrank to this — the numbers that make a surprise diagnosable.
  const skipped = students.length - recipients.length;
  console.log(
    `\nRecipients: ${recipients.length} (${nextCount} next_mock · ${firstCount} first_mock) · ` +
      `${skipped} skipped (opted out / no email / too new / cooldown / nothing left / mid-exam)`
  );

  if (recipients.length === 0) {
    console.log("\nNothing to send.\n");
    return;
  }

  // A DRY RUN MUST NOT WRITE. ensureUnsubscribeTokens upserts a student_profiles
  // row to mint a token, so it is deferred to the --apply path; the preview
  // renders subjects against a placeholder token (the subject line doesn't
  // depend on it). Minting on a dry run silently created profile rows for every
  // candidate the first time this ran.
  const DRY_TOKEN = "00000000-0000-0000-0000-000000000000";
  const tokens = apply
    ? await ensureUnsubscribeTokens(db, recipients.map((r) => r.userId))
    : new Map<string, string>();

  console.log("");
  console.log("KIND        EMAIL                              MOCK                      SUBJECT");
  console.log("-".repeat(140));
  for (const r of recipients) {
    const email = buildEmail(r, tokens.get(r.userId) ?? DRY_TOKEN);
    console.log(
      `${r.kind.padEnd(11)} ${r.email.padEnd(34)} ${r.mock.slug.padEnd(25)} ${email.subject}`
    );
  }

  if (!apply) {
    console.log(`\nDry run complete (no writes). Re-run with --apply to send these ${recipients.length}.\n`);
    return;
  }

  // Fail fast + loudly on missing env rather than recording N identical failures
  // (which would burn N dedupe keys and block the real run).
  emailEnv();

  console.log(`\nSending ${recipients.length}…\n`);
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < recipients.length; i++) {
    const r = recipients[i];
    const token = tokens.get(r.userId);
    if (!token) throw new Error(`no unsubscribe token minted for ${r.email}`);
    const email = buildEmail(r, token);

    if (i > 0) await sleep(THROTTLE_MS);

    const result = await sendEmail({
      to: r.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
      replyTo: email.replyTo,
      headers: email.headers,
    });

    await recordSend(db, r, email.subject, result);

    if (result.ok) {
      sent++;
      console.log(`  ok    ${r.email} — ${r.mock.slug}`);
    } else {
      failed++;
      console.error(`  FAIL  ${r.email} — ${result.error}`);
    }
  }

  console.log(`\nDone. sent=${sent} failed=${failed} total=${recipients.length}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
