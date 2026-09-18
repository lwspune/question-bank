/**
 * Drive the mock result page's FINDINGS CARD against live data.
 *
 * WHY THIS EXISTS. `/mock/attempt/[id]/result` is auth-gated `ƒ`, so `next
 * build` never renders it: the gate proves the card COMPILES and the unit tests
 * prove buildMockReport's rules, but neither proves that real sittings actually
 * produce findings. This runs the page's own chain — payload → buildMockReport
 * → the strings the card prints — over the most recent attempts.
 *
 * WHAT IT DOES NOT PROVE, and the report says so rather than implying
 * otherwise: it reads with the SERVICE ROLE, where the page uses the student's
 * own JWT through get_own_performance (0110), so the RLS path is untested here;
 * and it renders no markup, so layout is a browser check.
 *
 * Read-only. Same shape as perf:smoke / itemstats:smoke.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentPerformance } from "@/lib/performance/query";
import { buildMockReport, formatMarks, formatWhere } from "@/lib/email/mockReport";

const LIMIT = Number(process.argv[2] ?? 12);

async function main() {
  const db = createSupabaseAdminClient();

  const { data, error } = await db
    .from("mock_attempts")
    .select("id, user_id")
    .in("status", ["submitted", "expired"])
    .order("submitted_at", { ascending: false })
    .limit(LIMIT);
  if (error) throw new Error(error.message);
  const attempts = (data ?? []) as { id: string; user_id: string }[];

  let rendered = 0;
  let withSubtopics = 0;

  for (const a of attempts) {
    const payload = await fetchStudentPerformance(db, a.user_id);
    // An empty PeerMap, exactly as the page passes: question_item_stats is
    // staff-read by RLS, so a student's card never shows peer accuracy.
    const r = buildMockReport(payload, a.id, new Map(), new Date());
    if (!r) {
      console.log(`- ${a.id.slice(0, 8)}  NO REPORT (ungraded or not in payload)`);
      continue;
    }
    if (r.hasFindings) rendered++;
    if (r.subtopics.length) withSubtopics++;
    console.log(
      `- ${a.id.slice(0, 8)}  ${r.examName} ${formatMarks(r.score)}/${formatMarks(r.maxScore)}  ` +
        `easyWrong=${r.easyWrong.length} easyLeft=${r.easyLeft.length} ` +
        `pacing=${r.pacing ? r.pacing.neverReached : "-"} subs=${r.subtopics.length} ` +
        `card=${r.hasFindings ? "SHOWN" : "hidden"}`
    );
    for (const s of r.subtopics) {
      console.log(`     ${formatMarks(s.gap)} marks · ${s.subject} · ${formatWhere(s)}`);
    }
  }

  console.log(
    `\n${rendered}/${attempts.length} attempts render the card; ` +
      `${withSubtopics} carry POOLED subtopic picks.`
  );
  // Subtopic picks need an attempt above ENGAGEMENT_FLOOR (20% of the paper
  // answered) to exist at all, so a low count here is a statement about how
  // much of the paper these students attempted — not a fault in the card.
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
