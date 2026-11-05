/**
 * Email the owner that a scheduled check failed, naming the failing tests.
 *
 *   npm run ops:notify-check-failure -- --workflow="Prod contract" --log=contract.log
 *   ... --apply   (lives only in the workflows' `if: failure()` steps)
 *
 * Without --apply it prints the email and sends nothing. Recipients are the platform
 * admins (the same list the answer-sheet queue email uses). Several --log= files may be
 * given; a missing one is skipped, since the step that writes it may not have run.
 * The run link comes from --run-url= or GitHub's own GITHUB_* variables.
 * Pure core: src/lib/ops/checkFailureEmail.ts. Why: TECH_DEBT_SPEC.md 1.2.
 */
import { config } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { readGraderEmails } from "../../src/lib/answerSheets/grader";
import { buildCheckFailureEmail, extractFailures } from "../../src/lib/ops/checkFailureEmail";
import { sendEmail } from "../../src/lib/email/resend";

config({ path: ".env.local" });

function arg(name: string): string[] {
  const p = `--${name}=`;
  return process.argv.filter((a) => a.startsWith(p)).map((a) => a.slice(p.length));
}

async function main() {
  const apply = process.argv.includes("--apply");
  const workflow = arg("workflow")[0] ?? process.env.GITHUB_WORKFLOW ?? "scheduled";
  const env = process.env;
  const runUrl =
    arg("run-url")[0] ??
    (env.GITHUB_SERVER_URL && env.GITHUB_REPOSITORY && env.GITHUB_RUN_ID
      ? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`
      : "https://github.com/lwspune/question-bank/actions");
  const log = arg("log")
    .filter((f) => existsSync(f))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");
  const date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const email = buildCheckFailureEmail({ workflow, runUrl, date, failures: extractFailures(log) });

  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const to = await readGraderEmails(admin);
  console.log(`To: ${to.join(", ") || "(no platform admin email)"}\nSubject: ${email.subject}\n\n${email.text}`);
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
  console.error(e);
  process.exit(1);
});
