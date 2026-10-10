/**
 * npm run results:announce -- --exam=nda --sitting="NDA 2 2026" --stage=ssb
 *   [--announced=YYYY-MM-DD] [--ask-days=21] [--apply]
 *
 * Adds a result announcement (migration 0149). From its date, every signed-in
 * student who chose that exam is asked on /me "Did you clear it?" until the
 * window closes. DRY RUN by default: prints what it would add and how many
 * students would be asked. Answers are reviewed at /dashboard/results.
 */
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { getExamBySlug } from "../../src/lib/exam/examContext";
import { istDayKey } from "../../src/lib/email/dueNudge";
import { parseAnnounceArgs } from "./announceArgs";

async function main() {
  const parsed = parseAnnounceArgs(process.argv.slice(2), istDayKey(new Date()));
  if (!parsed.ok) {
    console.error(parsed.error);
    process.exit(1);
  }
  const a = parsed.value;
  const examName = getExamBySlug(a.examSlug)!.examName;
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam, error: examErr } = await db.from("exams").select("id").eq("name", examName).single();
  if (examErr || !exam) throw new Error(`no exam row named ${examName}`);
  const { count } = await db
    .from("student_profiles")
    .select("user_id", { count: "exact", head: true })
    .contains("target_exams", [a.examSlug]);

  console.log(`${examName} · ${a.sitting} · ${a.stage}: ask from ${a.announcedOn} to ${a.askUntil}`);
  console.log(`students who chose ${a.examSlug}: ${count ?? "?"}`);
  if (!a.apply) {
    console.log("dry run: nothing written. Add --apply to save.");
    return;
  }
  const { error } = await db.from("result_announcements").insert({
    exam_id: exam.id,
    sitting: a.sitting,
    stage: a.stage,
    announced_on: a.announcedOn,
    ask_until: a.askUntil,
  });
  if (error) throw new Error(error.message);
  console.log("saved. The card appears on /me from the announcement date.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
