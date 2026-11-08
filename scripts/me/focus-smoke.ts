/**
 * Drive the exam focus (lib/me/focus, migration 0231) over real two-exam
 * students: what each would be focused on, and that the focus-filtered
 * mistake counts per exam (plus questions of an exam they did not choose) add
 * up to the unfocused total, so no mistake falls between the chips.
 *
 * WHY THIS EXISTS. /me, /performance and the badge are signed-in pages and a
 * client fetch, so the build never runs them and no headless check can reach
 * them. The unit tests prove the rules; this proves them on live rows.
 *
 * Read-only, service role (the pages read with the student's own JWT, so the
 * RLS path is the integration test's job, not this one's). Reads `focus_exam`
 * where the column exists and treats every focus as unsaved where it does not,
 * so it runs before and after 0231 is applied. `-- <n>` caps the students
 * read (default 120).
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadDrillEvents, loadQuestionRefs } from "@/lib/drill/query";
import { attachRefs, dueQuestions, scopeToExam } from "@/lib/drill/select";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { needsRecentRead, resolveFocus } from "@/lib/me/focus";
import { recentExam } from "@/lib/me/focusServer";

const LIMIT = Number(process.argv[2] ?? 120);

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();
  const { data: exams, error: examErr } = await db.from("exams").select("id, name");
  if (examErr) throw new Error(examErr.message);
  const byName = new Map((exams ?? []).map((e) => [e.name as string, e.id as string]));
  const examIds: Record<string, string | null> = {};
  for (const e of EXAM_REGISTRY) examIds[e.slug] = byName.get(e.examName) ?? null;

  // focus_exam where 0231 is applied; without it, every focus is unsaved.
  // Paged: PostgREST returns 1,000 rows at most, whatever .limit() says.
  type Row = { user_id: string; target_exams: string[] | null; focus_exam?: string | null };
  let cols = "user_id, target_exams, focus_exam";
  const probe = await db.from("student_profiles").select(cols).limit(1);
  if (probe.error) {
    cols = "user_id, target_exams";
    console.log("focus_exam column not found: treating every focus as unsaved");
  }
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const page = await db.from("student_profiles").select(cols).order("user_id").range(from, from + 999);
    if (page.error) throw new Error(page.error.message);
    rows.push(...((page.data ?? []) as unknown as Row[]));
    if ((page.data ?? []).length < 1000) break;
  }
  const multi = rows.filter((r) => resolveFocus({ targets: r.target_exams ?? [], saved: null, recent: null }).switchable);
  console.log(`profiles ${rows.length} · two or more exams on www ${multi.length} · reading ${Math.min(LIMIT, multi.length)}`);

  const sources: Record<string, number> = {};
  let withDue = 0;
  let totalDue = 0;
  let shownDue = 0;
  let otherExam = 0;
  const broken: string[] = [];

  for (const r of multi.slice(0, LIMIT)) {
    const targets = r.target_exams ?? [];
    const saved = r.focus_exam ?? null;
    const recent = needsRecentRead({ targets, saved }) ? await recentExam(db, r.user_id, examIds) : null;
    const focus = resolveFocus({ targets, saved, recent });
    sources[focus.source] = (sources[focus.source] ?? 0) + 1;

    const due = dueQuestions(await loadDrillEvents(db, r.user_id), now);
    if (due.length === 0) continue;
    const all = attachRefs(due, await loadQuestionRefs(db, due.map((d) => d.questionId)));
    const names = focus.options.map((s) => EXAM_REGISTRY.find((e) => e.slug === s)!.examName);
    const perExam = names.map((n) => scopeToExam(all, n).length);
    const outside = all.filter((q) => !names.includes(q.exam ?? "")).length;
    if (perExam.reduce((a, b) => a + b, 0) + outside !== all.length) broken.push(r.user_id);

    withDue++;
    totalDue += all.length;
    shownDue += scopeToExam(all, focus.filterExamName).length;
    otherExam += outside;
  }

  console.log("default focus by source:", sources);
  console.log(
    `with mistakes waiting ${withDue} · waiting ${totalDue} · shown under the default focus ${shownDue} · in an exam they did not choose ${otherExam}`
  );
  if (broken.length > 0) throw new Error(`per-exam counts do not add up for ${broken.length}: ${broken.slice(0, 5).join(", ")}`);
  console.log("OK: per-exam counts add up to the All total for every student read");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
