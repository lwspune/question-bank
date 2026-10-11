/**
 * npm run grading:notify: email the grader when answer sheets are waiting.
 *
 *   npm run grading:notify            # DRY RUN: print the email
 *   npm run grading:notify -- --apply # send it (lives in .github/workflows/grading-queue.yml)
 *
 * Sent only when something is waiting (a sheet or an open grade question), to
 * every superadmin (platform_admins). Students were promised a report within
 * 48 hours, so the email names the oldest wait and anything past 36 hours.
 * Grader mail, not student mail: no email_sends row.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { readGraderEmails, readOpenQuestions, readQueue } from "../../src/lib/answerSheets/grader";
import { buildGradingQueueEmail, queueSummary } from "../../src/lib/answerSheets/emails";
import { sendEmail } from "../../src/lib/email/resend";

async function main() {
  const apply = process.argv.includes("--apply");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const [queue, open] = await Promise.all([readQueue(admin), readOpenQuestions(admin)]);
  const summary = queueSummary(
    queue.map((q) => q.submittedAt),
    open.length,
    new Date()
  );
  if (!summary) {
    console.log("Nothing waiting. No email.");
    return;
  }
  const email = buildGradingQueueEmail(summary);
  const to = await readGraderEmails(admin);
  console.log(`To: ${to.join(", ") || "(no superadmin email)"}\nSubject: ${email.subject}\n\n${email.text}`);
  if (!apply) {
    console.log("\nDry run. Add -- --apply to send.");
    return;
  }
  let failed = 0;
  for (const address of to) {
    const r = await sendEmail({ to: address, ...email });
    if (!r.ok) {
      failed++;
      console.error(`Send to ${address} failed: ${r.error}`);
    }
  }
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
