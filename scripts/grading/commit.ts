/**
 * npm run grading:commit -- <submission id>: check a filled grade.json, save
 * it, and email the student.
 *
 *   npm run grading:commit -- <id>                  # check, save, email
 *   npm run grading:commit -- <id> --dry            # check only, write nothing
 *   npm run grading:commit -- <id> --no-email       # save without the email
 *   npm run grading:commit -- <id> --reject="Pages 3 to 6 are too dark to read. Retake them in daylight."
 *
 * The check (lib/answerSheets/marking.ts: the grades, then the page marks)
 * runs first and prints EVERY problem; nothing is saved unless it passes AND
 * the marks were previewed as they stand (grading:preview's stamp). Then the
 * pages AS DRAWN in the preview and the report PDF are uploaded to
 * <user>/<submission>/marked/ (the student sees exactly what the grader looked
 * at), and answer_grade_commit saves the grade and its marks together, sums
 * the total itself and refuses a total over the paper's maximum (0153, 0175).
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
import { loadGradingPaper, readSheet, readSheetMeta } from "../../src/lib/answerSheets/grader";
import { checkSheet } from "../../src/lib/answerSheets/marking";
import { ANSWER_SHEETS_BUCKET, markedPagePath, reportPdfPath } from "../../src/lib/answerSheets/upload";
import {
  ANSWER_REPORT_KIND,
  answerReportDedupeKey,
  buildAnswerRejectedEmail,
  buildAnswerReportEmail,
} from "../../src/lib/answerSheets/emails";
import { sendEmail } from "../../src/lib/email/resend";
import type { BuiltEmail } from "../../src/lib/email/templates";

import { INBOX, fail, preparedPageCount, preparedTurns, previewStamp } from "./inbox";

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
  const check = checkSheet({ items, totalMarks: paper.totalMarks, file, pageCount: preparedPageCount(dir, id) });
  if (!check.ok) {
    console.error(`grade.json has ${check.errors.length} problem(s):`);
    for (const e of check.errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  // The marks as they stand must be the ones last drawn and looked at.
  if (previewStamp(dir) !== check.stamp) {
    console.error(`The marks have not been previewed as they stand. Run npm run grading:preview -- ${id} and look at every page first.`);
    process.exit(1);
  }
  const { grade } = check;
  console.log(
    `Check passed: ${grade.totalAwarded} / ${paper.totalMarks} over ${grade.rows.length} questions, ${check.marks.length} mark(s) on ${check.pageCount} page(s).`
  );
  if (dry) return;

  // The marked pages as previewed, then the report. Upserted, so a regrade or
  // a retry after a failed save overwrites rather than duplicates.
  const uploads = [
    ...Array.from({ length: check.pageCount }, (_, i) => ({
      from: join(dir, "preview", `${String(i + 1).padStart(2, "0")}.jpg`),
      to: markedPagePath(sheet.userId, id, i),
      type: "image/jpeg",
    })),
    { from: join(dir, "preview", "report.pdf"), to: reportPdfPath(sheet.userId, id), type: "application/pdf" },
  ];
  for (const u of uploads) {
    if (!existsSync(u.from)) throw new Error(`${u.from} is missing. Run npm run grading:preview -- ${id} again.`);
    const { error: upErr } = await admin.storage
      .from(ANSWER_SHEETS_BUCKET)
      .upload(u.to, readFileSync(u.from), { contentType: u.type, upsert: true });
    if (upErr) throw new Error(`upload ${u.to}: ${upErr.message}`);
  }

  const { data: total, error } = await admin.rpc("answer_grade_commit", {
    p_submission: id,
    p_grades: grade.rows,
    p_went_well: grade.wentWell,
    p_next_steps: grade.nextSteps,
    p_marks: check.marks,
    p_marked_pages: check.pageCount,
    p_page_turns: preparedTurns(dir, id),
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

main().catch(fail);
