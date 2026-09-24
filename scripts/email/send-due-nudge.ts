/**
 * Due-queue nudge runner. ENGAGEMENT_SPEC.md C2.
 *
 *   npx tsx scripts/email/send-due-nudge.ts                  # DRY RUN
 *   npx tsx scripts/email/send-due-nudge.ts --apply          # send
 *   npx tsx scripts/email/send-due-nudge.ts --only=a@b.com --apply
 *   npx tsx scripts/email/send-due-nudge.ts --limit=50 --apply
 *   npx tsx scripts/email/send-due-nudge.ts --sample-to=me@x.com   # one rendered mail to a reviewer, no row
 *   npx tsx scripts/email/send-due-nudge.ts --html           # write generated-papers/due-nudge-preview.html
 *   npx tsx scripts/email/send-due-nudge.ts --text           # print the plain-text bodies
 *   npx tsx scripts/email/send-due-nudge.ts --report         # how many recipients drilled within 24h
 *
 * DRY RUN IS THE DEFAULT and prints exactly who would receive what, and why
 * everyone else would not. `--apply` lives in the workflow file
 * (.github/workflows/due-nudge.yml) and nowhere else.
 *
 * WHO IS READ. One pass over user_activity (readDueCandidates) gives every
 * student's due pool with the SAME fold /drill uses, so a nudge can never name
 * a question the drill would not serve. The selector (dueNudge.ts) applies the
 * anti-nag rules and is total: every candidate lands in picks or skipped with
 * a reason, and the reasons are printed as a histogram so a quiet run is
 * explainable ("312 nothing-due, 40 nudged-recently, 9 sent").
 *
 * IDEMPOTENT. The dedupe key carries the IST day and email_sends.dedupe_key is
 * UNIQUE, so a second run on the same day inserts nothing and mails nobody.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { selectDueNudges, NUDGE_KIND } from "../../src/lib/email/dueNudge";
import { readDueCandidates, readNudgeConversion } from "../../src/lib/email/dueNudgeService";
import { buildDueNudgeEmail } from "../../src/lib/email/templates";
import { sendEmail, sleep, THROTTLE_MS } from "../../src/lib/email/resend";
import { ensureUnsubscribeTokens, readPriorSends, readStudents } from "../../src/lib/email/service";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}
const has = (name: string) => process.argv.includes(`--${name}`);

async function main() {
  const apply = has("apply");
  const only = arg("only")?.toLowerCase();
  const wantHtml = has("html");
  const wantText = has("text");
  const sampleTo = arg("sample-to");
  const limit = arg("limit") ? Number(arg("limit")) : undefined;

  const db = createSupabaseAdminClient();

  if (has("report")) {
    const r = await readNudgeConversion(db, 24);
    console.log(`\nDue-nudge sends: ${r.sent}; recipients who drilled within 24h: ${r.drilledAfter}`);
    if (r.sent > 0) console.log(`Conversion: ${Math.round((r.drilledAfter / r.sent) * 100)}%`);
    return;
  }

  console.log(
    `\n${sampleTo ? `SAMPLE — one rendered nudge to ${sampleTo}, no student is mailed` : apply ? "APPLY — REAL SENDS" : "DRY RUN — nothing will be sent"}`
  );

  const now = new Date();
  const [students, priorSends, candidates] = await Promise.all([
    readStudents(db),
    readPriorSends(db),
    readDueCandidates(db, now),
  ]);
  console.log(`Students: ${students.length} · candidates with any answer history: ${candidates.length}`);

  const { picks, skipped } = selectDueNudges({
    candidates,
    students: new Map(students.map((s) => [s.userId, s])),
    priorSends,
    now,
  });

  const reasons = new Map<string, number>();
  for (const s of skipped) reasons.set(s.reason, (reasons.get(s.reason) ?? 0) + 1);
  console.log(
    `Picks: ${picks.length} · skipped: ${skipped.length} (${[...reasons.entries()].map(([r, n]) => `${n} ${r}`).join(", ") || "none"})`
  );

  const chosen = picks.filter((p) => !only || p.email.toLowerCase() === only);
  const tokens = await ensureUnsubscribeTokens(db, chosen.map((p) => p.userId));

  let sent = 0;
  const previews: { subject: string; html: string }[] = [];

  for (const p of chosen) {
    if (limit !== undefined && sent >= limit) break;

    const email = buildDueNudgeEmail({
      name: p.name,
      summary: p.summary,
      unsubscribeToken: tokens.get(p.userId) ?? "",
    });

    // A SAMPLE goes to a reviewer, never the student, and writes NO row — so it
    // cannot burn the day's dedupe key and leave the real nudge unsendable.
    if (sampleTo) {
      const outcome = await sendEmail({
        to: sampleTo,
        subject: `[SAMPLE] ${email.subject}`,
        text: email.text,
        html: email.html,
        replyTo: email.replyTo,
        headers: {},
      });
      console.log(
        outcome.ok
          ? `  SAMPLE sent to ${sampleTo} (provider id ${outcome.providerId}) — no row written`
          : `  SAMPLE FAILED: ${outcome.error}`
      );
      return;
    }

    console.log(`  send ${p.email} — ${email.subject}`);
    if (wantHtml) previews.push({ subject: email.subject, html: email.html });
    if (wantText) console.log(`\n${"-".repeat(70)}\n${email.text}\n${"-".repeat(70)}\n`);

    if (apply) {
      const outcome = await sendEmail({
        to: p.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
        replyTo: email.replyTo,
        headers: email.headers,
      });
      const { error } = await db.from("email_sends").insert({
        user_id: p.userId,
        kind: NUDGE_KIND,
        to_email: p.email,
        subject: email.subject,
        ref_id: null,
        ref_kind: "drill",
        dedupe_key: p.dedupeKey,
        status: outcome.ok ? "sent" : "failed",
        provider_id: outcome.ok ? outcome.providerId : null,
        error: outcome.ok ? null : outcome.error.slice(0, 1000),
        metadata: { due: p.summary.total, top: p.summary.chapters[0] ?? null },
      });
      if (error) throw new Error(`recordSend(${p.dedupeKey}): ${error.message}`);
      if (!outcome.ok) console.log(`       FAILED: ${outcome.error}`);
      await sleep(THROTTLE_MS);
    }
    sent++;
  }

  if (wantHtml && previews.length) {
    const out = join(process.cwd(), "generated-papers", "due-nudge-preview.html");
    writeFileSync(
      out,
      previews
        .map((p) => `<h2 style="font-family:sans-serif">${p.subject}</h2>${p.html}<hr>`)
        .join("\n"),
      "utf8"
    );
    console.log(`Preview written: ${out}`);
  }

  console.log(`\n${apply ? "Sent" : "Would send"}: ${sent}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
