/**
 * Drive the Review tab's OWN read chain against live data: the drill's pool
 * (loadOwnPool), the exam focus, today's plan row, the miss rows and the
 * grouping core, exactly as src/app/review/page.tsx runs them.
 *
 *   npm run review:smoke            # the 10 heaviest students + every recent Review later
 *   npm run review:smoke -- 25      # the 25 heaviest
 *
 * WHY. /review is auth-gated `ƒ`, so `next build` never renders it. This proves
 * the data: that every waiting question has the miss that explains it (a kind
 * or metadata key read wrong would label it nothing, or the wrong thing), that
 * the chapter counts add up to the total (the badge's number), and that a
 * chapter's own page lists as many questions as its row says.
 *
 * WHAT IT DOES NOT PROVE: it reads with the SERVICE ROLE where the page uses
 * the student's own login (tests/review-query.integration.test.ts covers RLS),
 * and it renders no markup. Read-only. Exits 1 on any broken invariant.
 */
import { join } from "node:path";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadOwnPool } from "@/lib/drill/compose";
import { scopeToExam } from "@/lib/drill/select";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { loadFocus } from "@/lib/me/focusServer";
import { readTodayRow } from "@/lib/path/exemptions";
import { buildFixList, chapterQuestions, latestMisses, reasonOf, type Reason } from "@/lib/review/fixList";
import { loadMissRows } from "@/lib/review/query";
import { readAllPages } from "@/lib/supabase/readAllPages";

const LIMIT = Number(process.argv[2] ?? 10);
const DAY = 86_400_000;

/** Who has a row of this kind since `sinceIso` (optionally with metadata.mark = `mark`), paged. */
async function pagedUserIds(
  db: ReturnType<typeof createSupabaseAdminClient>,
  kind: string,
  sinceIso: string,
  mark?: string
): Promise<string[]> {
  const rows = await readAllPages<{ user_id: string }>((from, to) => {
    let q = db.from("user_activity").select("user_id").eq("kind", kind).gte("created_at", sinceIso);
    if (mark) q = q.eq("metadata->>mark", mark);
    return q.order("id").range(from, to).returns<{ user_id: string }[]>();
  });
  return rows.map((r) => r.user_id);
}

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();
  const since = new Date(now.getTime() - 30 * DAY).toISOString();

  const { data: exams, error: examErr } = await db.from("exams").select("id, name");
  if (examErr) throw new Error(examErr.message);
  const byName = new Map((exams ?? []).map((e) => [e.name as string, e.id as string]));
  const examIds: Record<string, string | null> = {};
  for (const e of EXAM_REGISTRY) examIds[e.slug] = byName.get(e.examName) ?? null;

  // The heaviest recent missers (the biggest lists), plus every student who
  // marked Review later or told V No (the reasons with the least data).
  const counts = new Map<string, number>();
  for (const u of await pagedUserIds(db, "answer_wrong", since)) counts.set(u, (counts.get(u) ?? 0) + 1);
  const heavy = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, LIMIT).map(([u]) => u);
  const marked = await pagedUserIds(db, "self_mark", since, "review");
  const unclear = await pagedUserIds(db, "v_not_understood", since);
  const users = [...new Set([...heavy, ...marked, ...unclear])];
  console.log(`students: ${heavy.length} heaviest + ${new Set(marked).size} Review later + ${new Set(unclear).size} V No = ${users.length}`);

  const broken: string[] = [];
  const reasons: Record<Reason | "none", number> = { mock: 0, practice: 0, drill: 0, daily: 0, v_question: 0, review_later: 0, v_unclear: 0, none: 0 };
  let totalDue = 0;
  let withPlan = 0;

  for (const userId of users) {
    const [pool, focus, plan] = await Promise.all([
      loadOwnPool(db, userId, now),
      loadFocus(db, userId, examIds),
      readTodayRow(db, userId, now).catch(() => null),
    ]);
    const due = scopeToExam(pool.drillable, focus.filterExamName);
    const misses = latestMisses(await loadMissRows(db, userId, due.map((q) => q.questionId)));
    const planIds = new Set(plan?.drillIds ?? []);
    const list = buildFixList(due, misses, planIds);
    totalDue += list.total;
    if (list.inPlan > 0) withPlan += 1;

    for (const q of due) {
      const m = misses.get(q.questionId);
      reasons[m ? reasonOf(m) : "none"] += 1;
    }
    const unexplained = due.filter((q) => !misses.has(q.questionId)).length;
    if (unexplained > 0) broken.push(`${userId}: ${unexplained} waiting question(s) with no miss row to explain them`);

    const noChapter = due.filter((q) => !q.chapterId).length;
    const sum = list.chapters.reduce((n, c) => n + c.count, 0);
    if (sum + noChapter !== list.total) broken.push(`${userId}: chapters add to ${sum} + ${noChapter} without a chapter, total ${list.total}`);
    if (new Set(list.chapters.map((c) => c.chapterId)).size !== list.chapters.length) broken.push(`${userId}: a chapter listed twice`);
    for (const c of list.chapters) {
      if (c.wrong + c.reviewLater + c.vUnclear !== c.count) broken.push(`${userId}: ${c.name} reasons add to ${c.wrong + c.reviewLater + c.vUnclear}, count ${c.count}`);
      const page = chapterQuestions(due, c.chapterId, misses, planIds);
      if (page.length !== c.count) broken.push(`${userId}: ${c.name} row says ${c.count}, its page lists ${page.length}`);
    }
    if (planIds.size > 0 && list.inPlan > planIds.size) broken.push(`${userId}: ${list.inPlan} in plan, plan holds ${planIds.size}`);

    const top = list.chapters[0];
    console.log(
      `  ${userId.slice(0, 8)}  ${String(list.total).padStart(4)} to fix in ${String(list.chapters.length).padStart(3)} chapters` +
        `${focus.filterExamName ? ` (${focus.filterExamName} only)` : ""}${list.inPlan ? `, ${list.inPlan} in today's plan` : ""}` +
        `${top ? `  top: ${top.name} ${top.count}` : ""}`
    );
  }

  console.log(`\n${totalDue} waiting questions; ${withPlan} students with plan questions today`);
  console.log(`reasons: ${Object.entries(reasons).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
  if (broken.length > 0) {
    console.log(`\nBROKEN (${broken.length}):`);
    for (const b of broken.slice(0, 30)) console.log(`  ${b}`);
    process.exit(1);
  }
  console.log("\nOK: every waiting question explained, every chapter count adds up");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
