/**
 * npm run grading:commit -- <submission id>: check a filled grade.json, save
 * it, and email the student.
 *
 *   npm run grading:commit -- <id>                  # check, save, email
 *   npm run grading:commit -- <id> --dry            # check only, write nothing
 *   npm run grading:commit -- <id> --no-email       # save without the email
 *   npm run grading:commit -- <id> --reject="Pages 3 to 6 are too dark to read. Retake them in daylight."
 *
 * The check (lib/answerSheets/grade.ts) runs first and prints EVERY problem;
 * nothing is saved unless it passes. answer_grade_commit then saves the rows,
 * sums the total itself and refuses a total over the paper's maximum (0153).
 *
 * A REGRADE (after a student questioned a grade) is the same command: pull the
 * sheet with --id, fix grade.json, write grading-inbox/<id>/answers.json as
 * [{"position": N, "answer": "..."}], and commit again. The answers close the
 * questions; the email is not sent twice (one per sheet, by dedupe key).
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { validateGrade } from "../../src/lib/answerSheets/grade";
import { loadGradingPaper, readSheet, readSheetMeta } from "../../src/lib/answerSheets/grader";
import {
  ANSWER_REPORT_KIND,
  answerReportDedupeKey,
  buildAnswerRejectedEmail,
  buildAnswerReportEmail,
} from "../../src/lib/answerSheets/emails";
import { sendEmail } from "../../src/lib/email/resend";
import type { BuiltEmail } from "../../src/lib/email/templates";

const INBOX = join(process.cwd(), "grading-inbox");

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}

async function mailStudent(admin: SupabaseClient, submissionId: string, userId: string, build: (name: string) => BuiltEmail) {
  const key = answerReportDedupeKey(submissionId);
  const { count } = await admin.from("email_sends").select("id", { count: "exact", head: true }).eq("dedupe_key", key);
  if ((count ?? 0) > 0) {
    console.log("Email: already sent for this sheet, not sending again.");
    return;
  }
  const { data: u } = await admin.auth.admin.getUserById(userId);
  const email = u?.user?.email;
  if (!email) {
    console.log("Email: the student has no email address. Skipped.");
    return;
  }
  const meta = (u?.user?.user_metadata ?? {}) as { full_name?: string; name?: string };
  const built = build((meta.full_name ?? meta.name ?? "").trim());
  const outcome = await sendEmail({ to: email, ...built });
  const { error } = await admin.from("email_sends").insert({
    user_id: userId,
    kind: ANSWER_REPORT_KIND,
    to_email: email,
    subject: built.subject,
    ref_id: submissionId,
    ref_kind: "answer_submission",
    dedupe_key: key,
    status: outcome.ok ? "sent" : "failed",
    provider_id: outcome.ok ? outcome.providerId : null,
    error: outcome.ok ? null : outcome.error.slice(0, 1000),
  });
  if (error) console.error(`Email record failed: ${error.message}`);
  console.log(outcome.ok ? `Email: sent to the student.` : `Email FAILED: ${outcome.error}`);
}

async function main() {
  const id = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!id) throw new Error("Usage: npm run grading:commit -- <submission id> [--dry] [--no-email] [--reject=\"reason\"]");
  const dry = process.argv.includes("--dry");
  const email = !process.argv.includes("--no-email");
  const reject = arg("reject")?.trim();

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const sheet = await readSheet(admin, id);
  const meta = await readSheetMeta(admin, id);

  if (reject !== undefined) {
    if (reject.length < 10) throw new Error("--reject needs a reason the student can act on (10+ characters).");
    if (dry) {
      console.log(`Would reject ${id}: ${reject}`);
      return;
    }
    const { error } = await admin.rpc("answer_submission_reject", { p_submission: id, p_reason: reject });
    if (error) throw new Error(`reject: ${error.message}`);
    console.log(`Rejected ${id}. The student's day is free again.`);
    if (email) {
      await mailStudent(admin, id, sheet.userId, (name) =>
        buildAnswerRejectedEmail({ name, paperTitle: meta.paperTitle, reason: reject, paperUrl: meta.paperUrl })
      );
    }
    return;
  }

  const dir = join(INBOX, id);
  const file = JSON.parse(readFileSync(join(dir, "grade.json"), "utf8")) as { submissionId?: string };
  if (file.submissionId !== id) throw new Error(`grade.json is for ${file.submissionId}, not ${id}.`);
  const { paper, items } = await loadGradingPaper(admin, sheet.paperId);
  const check = validateGrade({ items, totalMarks: paper.totalMarks, file });
  if (!check.ok) {
    console.error(`grade.json has ${check.errors.length} problem(s):`);
    for (const e of check.errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`Check passed: ${check.totalAwarded} / ${paper.totalMarks} over ${check.rows.length} questions.`);
  if (dry) return;

  const { data: total, error } = await admin.rpc("answer_grade_commit", {
    p_submission: id,
    p_grades: check.rows,
    p_went_well: check.wentWell,
    p_next_steps: check.nextSteps,
  });
  if (error) throw new Error(`save: ${error.message}`);
  console.log(`Saved: ${Number(total)} / ${paper.totalMarks}${meta.status === "graded" ? " (regrade)" : ""}.`);

  const answersPath = join(dir, "answers.json");
  if (existsSync(answersPath)) {
    const answers = JSON.parse(readFileSync(answersPath, "utf8")) as { position: number; answer: string }[];
    for (const a of answers) {
      const { error: aErr } = await admin
        .from("answer_grade_disputes")
        .update({ resolution: a.answer.trim(), resolved_at: new Date().toISOString() })
        .eq("submission_id", id)
        .eq("position", a.position)
        .is("resolved_at", null);
      if (aErr) throw new Error(`answer to Q position ${a.position}: ${aErr.message}`);
    }
    console.log(`Answered ${answers.length} grade question(s).`);
  }

  if (email) {
    await mailStudent(admin, id, sheet.userId, (name) =>
      buildAnswerReportEmail({
        name,
        paperTitle: meta.paperTitle,
        totalAwarded: Number(total),
        totalMax: paper.totalMarks,
        submissionId: id,
      })
    );
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
