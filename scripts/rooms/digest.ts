/**
 * npm run rooms:digest: the owner's evening rooms email (owner moderates,
 * 2026-11-25). Reported or hidden messages to check, doubts nobody answered,
 * and each room's day. Nothing to report: no email. DRY RUN by default (prints
 * the email); `--apply` lives ONLY in .github/workflows/rooms-digest.yml
 * (13:00 UTC = 18:30 IST, after the checkout list). `--sample-to=<email>`
 * mails one copy to that address instead. One email a day from the shared
 * 100/day Resend quota.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { buildRoomsDigest } from "../../src/lib/rooms/digest";
import { loadRoomsDigest } from "../../src/lib/rooms/digestServer";
import { readGraderEmails } from "../../src/lib/answerSheets/grader";
import { sendEmail } from "../../src/lib/email/resend";

function flag(name: string): string | null {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const sampleTo = flag("sample-to");
  if (apply && sampleTo) throw new Error("--apply and --sample-to do not go together.");
  const now = new Date();
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const data = await loadRoomsDigest(db, now);
  const email = buildRoomsDigest({
    ...data,
    dateLabel: new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }).format(now),
    dashboardUrl: "https://www.pyqvault.com/dashboard/rooms",
  });
  if (!email) {
    console.log("Nothing to check and no room activity. No email.");
    return;
  }
  const to = sampleTo ? [sampleTo] : await readGraderEmails(db);
  console.log(`To: ${to.join(", ") || "(no superadmin email)"}\nSubject: ${email.subject}\n\n${email.text}`);
  if (!apply && !sampleTo) {
    console.log("\nDry run. The evening workflow adds --apply.");
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
