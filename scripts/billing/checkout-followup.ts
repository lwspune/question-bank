/**
 * npm run billing:followup: the owner's 6 pm email of students who left a pass
 * checkout without paying, each with a WhatsApp link that opens with a message
 * typed (2026-11-19, owner).
 *
 *   npm run billing:followup                            # DRY RUN: print the email, write nothing
 *   npm run billing:followup -- --at=2026-11-18T12:30:00Z   # as if run then (a past day's list)
 *   npm run billing:followup -- --sample-to=<email>     # send the dry-run email to one address, write nothing
 *   npm run billing:followup -- --apply                 # make parent links, email every superadmin
 *                                                       # (lives in .github/workflows/checkout-followup.yml)
 *
 * The window is the 24 hours ending an hour before the run, so the 18:00 IST
 * run covers 17:00 to 17:00. Nothing listed, no email. Owner mail, not student
 * mail: no email_sends row. One email a day from the shared Resend quota.
 * Pure core: src/lib/billing/checkoutFollowup.ts.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { buildFollowupEmail, buildFollowupRows } from "../../src/lib/billing/checkoutFollowupService";
import { readGraderEmails } from "../../src/lib/answerSheets/grader";
import { sendEmail } from "../../src/lib/email/resend";

function flag(name: string): string | null {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const sampleTo = flag("sample-to");
  const at = flag("at");
  if (apply && sampleTo) throw new Error("--apply and --sample-to do not go together.");
  const now = at ? new Date(at) : new Date();
  if (Number.isNaN(now.getTime())) throw new Error(`--at is not a date: ${at}`);

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const rows = await buildFollowupRows(admin, now, { makeParentLinks: apply });
  const email = buildFollowupEmail(rows, now);
  if (!email) {
    console.log("Nobody left a checkout unpaid in the window. No email.");
    return;
  }

  const to = sampleTo ? [sampleTo] : await readGraderEmails(admin);
  console.log(`To: ${to.join(", ") || "(no superadmin email)"}\nSubject: ${email.subject}\n\n${email.text}`);
  if (!apply && !sampleTo) {
    console.log("\nDry run. Add -- --apply to send (parent links are made then).");
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
