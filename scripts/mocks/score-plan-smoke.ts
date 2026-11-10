/**
 * "How to raise your score" over real attempts (lib/mocks/scorePlan.ts):
 * builds each plan the way the result page does (the student's performance
 * payload, other students' accuracy per question, the exam's chapter weights)
 * and prints what it would show, or why the plain card stays. Read-only.
 *
 *   npm run score-plan:smoke              the 12 latest full-paper attempts
 *   npm run score-plan:smoke -- 2da7fe20  attempts whose id starts so
 *
 * The result page is signed in and server-rendered, so the build never runs
 * it: this proves the numbers, not the layout.
 */
import "../lib/serverOnly";
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentPerformance } from "@/lib/performance/query";
import { readPeerAccuracy } from "@/lib/email/mockReportService";
import { readWeights } from "@/lib/me/startNextServer";
import { buildScorePlan } from "@/lib/mocks/scorePlan";

const m1 = (n: number) => (Math.round(n * 10) / 10).toString();

async function main() {
  const db = createSupabaseAdminClient();
  const prefixes = process.argv.slice(2).filter((a) => /^[0-9a-f-]{4,}$/i.test(a));
  let q = db
    .from("mock_attempts")
    .select("id, user_id, mock_id, mock_tests!inner(exam_id, scope, title)")
    .in("status", ["submitted", "expired"])
    .eq("mock_tests.scope", "full")
    .order("submitted_at", { ascending: false })
    .limit(prefixes.length ? 2000 : 12);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  type Row = { id: string; user_id: string; mock_tests: { exam_id: string; title: string } };
  const rows = ((data ?? []) as unknown as Row[]).filter((r) => !prefixes.length || prefixes.some((p) => r.id.startsWith(p)));

  let shown = 0;
  for (const a of rows) {
    const payload = await fetchStudentPerformance(db, a.user_id);
    const ids = payload.facts.filter((f) => f.a === a.id).map((f) => f.q);
    const [peer, weights] = await Promise.all([readPeerAccuracy(db, ids).catch(() => new Map()), readWeights(a.mock_tests.exam_id).catch(() => [])]);
    const plan = buildScorePlan({ payload, attemptId: a.id, peer, weights });
    console.log(`\n${a.id.slice(0, 8)}  ${a.mock_tests.title}`);
    if (!plan) {
      console.log("  plain card (rushed, abandoned or not graded)");
      continue;
    }
    shown += 1;
    console.log(`  ${m1(plan.score)}/${m1(plan.maxScore)}  headline: ${plan.headlineGain > 0 ? `up to +${plan.headlineGain} marks` : "(no number)"}`);
    if (plan.wentWell) console.log(`  went well: ${plan.wentWell.section} ${plan.wentWell.right} of ${plan.wentWell.answered} answered, in ${m1(plan.wentWell.mins)} min`);
    if (plan.easy) console.log(`  easy: ${plan.easy.count} wrong x ${plan.easy.valueEach} -> +${plan.easy.gain} (${plan.easy.bySection.map((b) => `${b.section} ${b.count}`).join(", ")})`);
    if (plan.time) console.log(`  time: ${plan.time.section} ${m1(plan.time.mins)} of ${m1(plan.time.totalMins)} min, ${plan.time.secsPerQ}s/q vs ${plan.time.paperSecsPerQ}s; ${plan.time.slowWrong} slow wrong = ${m1(plan.time.slowWrongMins)} min; cap ${plan.time.capSecs}s`);
    for (const t of plan.topics) console.log(`  topic: ${t.subject} / ${t.chapter} ${t.right}/${t.asked}, ${t.marksLost} marks lost${t.qPerPaper !== null ? `, ~${m1(t.qPerPaper)} a paper` : ""}`);
    if (plan.strategy) console.log(`  strategy: ${JSON.stringify(plan.strategy)}`);
    if (plan.progress) console.log(`  progress: ${plan.progress.kind} ${plan.progress.previous} -> ${m1(plan.score)} (${plan.progress.delta >= 0 ? "+" : ""}${plan.progress.delta}) ${plan.progress.sections.map((x) => `${x.section} ${x.delta >= 0 ? "+" : ""}${x.delta}`).join(", ")}`);
  }
  console.log(`\n${shown} of ${rows.length} full-paper attempts get the plan; the rest keep the plain card.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
