/**
 * Per-attempt mock report runner.
 *
 *   npx tsx scripts/email/send-mock-report.ts                      # DRY RUN
 *   npx tsx scripts/email/send-mock-report.ts --apply              # send
 *   npx tsx scripts/email/send-mock-report.ts --attempt=<uuid>     # just this one
 *   npx tsx scripts/email/send-mock-report.ts --only=a@b.com --apply
 *   npx tsx scripts/email/send-mock-report.ts --html               # write a preview file
 *   npx tsx scripts/email/send-mock-report.ts --lookback-hours=48 # the cron's window
 *
 * DRY RUN IS THE DEFAULT and prints exactly who would receive what. Sending is
 * an explicit, irreversible act — it must be typed, not defaulted into. That
 * stays true with a schedule attached: `--apply` lives in the workflow file
 * (.github/workflows/mock-report.yml) and nowhere else, so a human running this
 * to ask "who is owed a report?" can never mail anybody as a side effect.
 *
 * FORWARD-ONLY. `SINCE` below is the feature's start line: 542 attempts predate
 * it, and mailing a report for a paper somebody sat six weeks ago is noise, not
 * feedback. The cutoff is a constant rather than a flag so a re-run can't
 * accidentally sweep history back in. `--lookback-hours` narrows that window
 * for the scheduled run and can only ever NARROW it — see resolveCutoff.
 *
 * THE DAILY CAP IS THE POINT, not a nicety. Production has 118 student-days
 * carrying 2+ attempts and one student who sat NINE mocks in a day; one email
 * per attempt would have put nine in their inbox before dinner. Past the cap
 * the run records a `skipped` row rather than staying silent, so a student who
 * got fewer emails than they had attempts is explainable afterwards.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createSupabaseAdminClient } from "../../src/lib/supabase/admin";
import { fetchStudentPerformance } from "../../src/lib/performance/query";
import { buildMockReport, resolveCutoff } from "../../src/lib/email/mockReport";
import { buildMockReportEmail } from "../../src/lib/email/templates";
import { sendEmail, sleep, THROTTLE_MS } from "../../src/lib/email/resend";
import { ensureUnsubscribeTokens, readStudents } from "../../src/lib/email/service";
import { readPeerAccuracy, readReportCandidates } from "../../src/lib/email/mockReportService";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** The feature's start line. Attempts before this are never mailed about. */
const SINCE = new Date("2026-09-18T00:00:00Z");

/** Max reports per student per calendar day (UTC). */
const DAILY_CAP = 3;

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}
const has = (name: string) => process.argv.includes(`--${name}`);

async function main() {
  const apply = has("apply");
  const only = arg("only")?.toLowerCase();
  const onlyAttempt = arg("attempt");
  const wantHtml = has("html");
  const wantText = has("text");
  const sampleTo = arg("sample-to");
  const limit = arg("limit") ? Number(arg("limit")) : undefined;
  // Deliberately NOT a truthiness check: `--lookback-hours=` with no value
  // becomes 0, which resolveCutoff rejects. Read as absent, it would silently
  // widen the run to every attempt since SINCE — the opposite of what the flag
  // was typed for.
  const rawLookback = arg("lookback-hours");
  const lookbackHours = rawLookback === undefined ? undefined : Number(rawLookback);

  // --sample-to DOES send, so it must not print under a "nothing will be sent"
  // banner. A runner that misreports its own mode is how somebody learns the
  // hard way that a dry run wasn't one.
  console.log(
    `\n${sampleTo ? `SAMPLE — one rendered report to ${sampleTo}, no student is mailed` : apply ? "APPLY — REAL SENDS" : "DRY RUN — nothing will be sent"}`
  );
  // Throws on an unusable --lookback-hours, before a single row is read.
  const cutoff = resolveCutoff(SINCE, new Date(), lookbackHours);
  console.log(
    `Cutoff: attempts submitted on or after ${cutoff.toISOString()}` +
      (lookbackHours === undefined ? "" : ` (--lookback-hours=${lookbackHours})`)
  );

  const db = createSupabaseAdminClient();

  const [students, priorSends] = await Promise.all([
    readStudents(db),
    db.from("email_sends").select("dedupe_key").eq("kind", "mock_report"),
  ]);
  const already = new Set((priorSends.data ?? []).map((r) => r.dedupe_key as string));
  const byId = new Map(students.map((s) => [s.userId, s]));

  let candidates = onlyAttempt
    ? [{ attemptId: onlyAttempt, userId: "", submittedAt: "" }]
    : await readReportCandidates(db, cutoff);

  // Resolve the owner for an explicitly named attempt (the --attempt path skips
  // the candidate query, so it has no user_id yet).
  if (onlyAttempt) {
    const { data } = await db
      .from("mock_attempts")
      .select("user_id, submitted_at")
      .eq("id", onlyAttempt)
      .maybeSingle();
    if (!data) throw new Error(`attempt ${onlyAttempt} not found`);
    candidates = [
      { attemptId: onlyAttempt, userId: data.user_id as string, submittedAt: (data.submitted_at as string) ?? "" },
    ];
  }

  console.log(`Candidate attempts: ${candidates.length}`);

  const perDay = new Map<string, number>();
  let sent = 0;
  let skipped = 0;
  const previews: { subject: string; html: string }[] = [];

  for (const c of candidates) {
    if (limit !== undefined && sent >= limit) break;

    const dedupeKey = `mock_report:${c.attemptId}`;
    if (already.has(dedupeKey)) {
      skipped++;
      continue;
    }

    const student = byId.get(c.userId);
    // An org member (staff) is not a student and gets no report. No email
    // address, or an opt-out, ends it here too.
    if (!student || !student.email || student.emailOptOut) {
      skipped++;
      continue;
    }
    if (only && student.email.toLowerCase() !== only) {
      skipped++;
      continue;
    }

    const dayKey = `${c.userId}:${c.submittedAt.slice(0, 10)}`;
    const soFar = perDay.get(dayKey) ?? 0;
    if (soFar >= DAILY_CAP) {
      console.log(`  cap  ${student.email} — ${c.attemptId} (${soFar} already today)`);
      skipped++;
      continue;
    }

    const payload = await fetchStudentPerformance(db, c.userId);
    const mine = payload.facts.filter((f) => f.a === c.attemptId).map((f) => f.q);
    const peer = await readPeerAccuracy(db, mine);
    const report = buildMockReport(payload, c.attemptId, peer, new Date());

    if (!report) {
      skipped++;
      continue;
    }
    if (!report.hasFindings) {
      console.log(`  none ${student.email} — ${report.mockTitle} (nothing to report)`);
      skipped++;
      continue;
    }

    const tokens = await ensureUnsubscribeTokens(db, [c.userId]);
    const email = buildMockReportEmail({
      report,
      name: student.name,
      unsubscribeToken: tokens.get(c.userId) ?? "",
    });

    // A SAMPLE is not a send: it goes to a named address (a reviewer's inbox),
    // never to the student, and writes NO email_sends row — so it cannot burn
    // the dedupe key and leave the real report unsendable later.
    if (sampleTo) {
      const outcome = await sendEmail({
        to: sampleTo,
        subject: `[SAMPLE] ${email.subject}`,
        text: email.text,
        html: email.html,
        replyTo: email.replyTo,
        // No List-Unsubscribe: an unsubscribe control on a sample would mutate
        // the real student's consent flag on behalf of whoever reviews it.
        headers: {},
      });
      console.log(
        outcome.ok
          ? `  SAMPLE sent to ${sampleTo} (provider id ${outcome.providerId}) — no row written`
          : `  SAMPLE FAILED: ${outcome.error}`
      );
      sent++;
      continue;
    }

    console.log(`  send ${student.email} — ${email.subject}`);
    if (wantHtml) previews.push({ subject: email.subject, html: email.html });
    // The plain-text body is a real alternative, not a degraded one, so it gets
    // reviewed like the HTML rather than being assumed correct.
    if (wantText) console.log(`\n${"-".repeat(70)}\n${email.text}\n${"-".repeat(70)}\n`);

    if (apply) {
      const outcome = await sendEmail({
        to: student.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
        replyTo: email.replyTo,
        headers: email.headers,
      });
      const { error } = await db.from("email_sends").insert({
        user_id: c.userId,
        kind: "mock_report",
        to_email: student.email,
        subject: email.subject,
        ref_id: c.attemptId,
        ref_kind: "mock_attempt",
        dedupe_key: dedupeKey,
        status: outcome.ok ? "sent" : "failed",
        provider_id: outcome.ok ? outcome.providerId : null,
        error: outcome.ok ? null : outcome.error.slice(0, 1000),
        metadata: { mockSlug: report.mockSlug, pct: report.pct },
      });
      if (error) throw new Error(`recordSend(${dedupeKey}): ${error.message}`);
      if (!outcome.ok) console.log(`       FAILED: ${outcome.error}`);
      await sleep(THROTTLE_MS);
    }

    perDay.set(dayKey, soFar + 1);
    sent++;
  }

  if (wantHtml && previews.length) {
    const out = join(process.cwd(), "generated-papers", "mock-report-preview.html");
    writeFileSync(
      out,
      previews
        .map((p) => `<h3 style="font-family:sans-serif">${p.subject}</h3>\n${p.html}\n<hr>`)
        .join("\n"),
      "utf8"
    );
    console.log(`\nPreview written: ${out}`);
  }

  console.log(`\n${apply ? "Sent" : "Would send"}: ${sent} · skipped: ${skipped}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
