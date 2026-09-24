/**
 * Welcome email runner. STUDENT_EDUCATION_SPEC.md §4 item 6.
 *
 *   npx tsx scripts/email/send-welcome.ts                  # DRY RUN
 *   npx tsx scripts/email/send-welcome.ts --apply          # send
 *   npx tsx scripts/email/send-welcome.ts --only=a@b.com --apply
 *   npx tsx scripts/email/send-welcome.ts --limit=100 --apply
 *   npx tsx scripts/email/send-welcome.ts --sample-to=me@x.com   # one rendered mail to a reviewer, no row
 *   npx tsx scripts/email/send-welcome.ts --html           # write generated-papers/welcome-preview.html
 *   npx tsx scripts/email/send-welcome.ts --text           # print the plain-text bodies
 *   npx tsx scripts/email/send-welcome.ts --report         # recipients active within 48h of the send
 *
 * DRY RUN IS THE DEFAULT and prints exactly who would receive what, and why
 * everyone else would not. `--apply` lives in the workflow file
 * (.github/workflows/welcome.yml) and nowhere else.
 *
 * THE BACKLOG IS INCLUDED. Every student account that has never been
 * welcomed is a candidate, newest first, so under --limit today's signups
 * go before July's. The first live run therefore mails existing students —
 * that is the point (they are the ones who did not know the features
 * existed), and it is why the first --apply is the owner's call.
 *
 * IDEMPOTENT. The dedupe key is `welcome:<userId>` with no day, and
 * email_sends.dedupe_key is UNIQUE, so a second run can never mail anyone
 * twice, whatever this file does.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { selectWelcomes, WELCOME_KIND } from "../../src/lib/email/welcome";
import { readPrimaryExams, readWelcomeConversion } from "../../src/lib/email/welcomeService";
import { buildWelcomeEmail } from "../../src/lib/email/templates";
import { loopFor } from "../../src/lib/education/howItWorks";
import { getExamBySlug } from "../../src/lib/exam/examContext";
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
    const r = await readWelcomeConversion(db, 48);
    console.log(`\nWelcome sends: ${r.sent}; recipients with any activity within 48h: ${r.activeAfter}`);
    if (r.sent > 0) console.log(`Conversion: ${Math.round((r.activeAfter / r.sent) * 100)}%`);
    return;
  }

  console.log(
    `\n${sampleTo ? `SAMPLE — one rendered welcome to ${sampleTo}, no student is mailed` : apply ? "APPLY — REAL SENDS" : "DRY RUN — nothing will be sent"}`
  );

  const now = new Date();
  const [students, priorSends, primaryExams] = await Promise.all([
    readStudents(db),
    readPriorSends(db),
    readPrimaryExams(db),
  ]);
  console.log(`Students: ${students.length} · with a profile: ${primaryExams.size}`);

  const { picks, skipped } = selectWelcomes({ students, primaryExams, priorSends, now });

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

    const loop = loopFor(getExamBySlug(p.exam));
    const email = buildWelcomeEmail({
      name: p.name,
      loop,
      unsubscribeToken: tokens.get(p.userId) ?? "",
    });

    // A SAMPLE goes to a reviewer, never the student, and writes NO row — so
    // it cannot burn the account's one dedupe key and leave the real welcome
    // unsendable forever.
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

    console.log(`  send ${p.email} — ${email.subject} [${loop.kind}${loop.examLabel ? ` · ${loop.examLabel}` : ""}]`);
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
        kind: WELCOME_KIND,
        to_email: p.email,
        subject: email.subject,
        ref_id: null,
        ref_kind: "start",
        dedupe_key: p.dedupeKey,
        status: outcome.ok ? "sent" : "failed",
        provider_id: outcome.ok ? outcome.providerId : null,
        error: outcome.ok ? null : outcome.error.slice(0, 1000),
        metadata: { loop: loop.kind, exam: p.exam },
      });
      if (error) throw new Error(`recordSend(${p.dedupeKey}): ${error.message}`);
      if (!outcome.ok) console.log(`       FAILED: ${outcome.error}`);
      await sleep(THROTTLE_MS);
    }
    sent++;
  }

  if (wantHtml && previews.length) {
    const out = join(process.cwd(), "generated-papers", "welcome-preview.html");
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
