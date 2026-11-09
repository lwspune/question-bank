/**
 * `npm run fix-points:backfill`: the Fix Points launch grant (migration 0245).
 * Grants the points the award WOULD have paid for graded fixes in the last 30
 * days, so students who were already fixing mistakes start with them. Each
 * point keeps its fix's own time, so it lapses when it would have lapsed.
 *
 * Rule: lib/billing/fixPoints pickBackfillFixes (a graded right answer, not a
 * self-mark, on a question missed on an earlier IST day; once per student and
 * question). Staff are left out. Rows are source 'backfill', so the readout
 * can tell them from points earned after launch.
 *
 * DRY RUN by default: prints how many students and points. `-- --apply` writes.
 * Idempotent: the primary key ignores a point already granted.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { pickBackfillFixes, FIX_POINTS_WINDOW_DAYS, fixPointsPct } from "@/lib/billing/fixPoints";

const APPLY = process.argv.includes("--apply");
const PAGE = 1000;
const CHUNK = 200;

type ActRow = { user_id: string; ref_id: string; created_at: string; metadata: Record<string, unknown> | null };

async function main() {
  const db = createSupabaseAdminClient();
  const since = new Date(Date.now() - FIX_POINTS_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const staff = new Set<string>();
  for (const t of ["org_members", "platform_admins"]) {
    const { data, error } = await db.from(t).select("user_id");
    if (error) throw new Error(`${t}: ${error.message}`);
    for (const r of (data ?? []) as { user_id: string }[]) staff.add(r.user_id);
  }

  // Graded right answers on a missed question, last 30 days, paged.
  const rights: ActRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("user_id, ref_id, created_at, metadata")
      .eq("kind", "answer_correct")
      .gte("created_at", since)
      .not("ref_id", "is", null)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`answer_correct: ${error.message}`);
    const rows = (data ?? []) as ActRow[];
    rights.push(...rows.filter((r) => !staff.has(r.user_id) && r.metadata?.selfMark === undefined));
    if (rows.length < PAGE) break;
  }

  // Every miss on those questions by those students, any time, chunked by question.
  const users = new Set(rights.map((r) => r.user_id));
  const qids = [...new Set(rights.map((r) => r.ref_id))];
  const misses: ActRow[] = [];
  for (let i = 0; i < qids.length; i += CHUNK) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("user_activity")
        .select("user_id, ref_id, created_at, metadata")
        .in("kind", ["answer_wrong", "v_not_understood"])
        .in("ref_id", qids.slice(i, i + CHUNK))
        .order("id")
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`misses: ${error.message}`);
      const rows = (data ?? []) as ActRow[];
      misses.push(...rows.filter((r) => users.has(r.user_id)));
      if (rows.length < PAGE) break;
    }
  }

  const fixes = pickBackfillFixes(
    rights.map((r) => ({ userId: r.user_id, questionId: r.ref_id, at: r.created_at })),
    misses.map((r) => ({ userId: r.user_id, questionId: r.ref_id, at: r.created_at }))
  );
  const perStudent = new Map<string, number>();
  for (const f of fixes) perStudent.set(f.userId, (perStudent.get(f.userId) ?? 0) + 1);
  const pcts = [...perStudent.values()].map(fixPointsPct).sort((a, b) => a - b);
  const median = pcts.length ? pcts[Math.floor(pcts.length / 2)] : 0;

  console.log(`graded fixes found: ${fixes.length}, students: ${perStudent.size}`);
  console.log(`their discount: median ${median}%, 10%+ for ${pcts.filter((p) => p >= 10).length}, the full 40% for ${pcts.filter((p) => p >= 40).length}`);

  if (!APPLY) {
    console.log("DRY RUN: nothing written. Add `-- --apply` to grant.");
    return;
  }
  let written = 0;
  for (let i = 0; i < fixes.length; i += 500) {
    const { data, error } = await db
      .from("fix_points")
      .upsert(
        fixes.slice(i, i + 500).map((f) => ({ user_id: f.userId, question_id: f.questionId, source: "backfill", earned_at: f.earnedAt })),
        { onConflict: "user_id,question_id", ignoreDuplicates: true }
      )
      .select("question_id");
    if (error) throw new Error(`insert: ${error.message}`);
    written += (data ?? []).length;
  }
  console.log(`granted ${written} points (${fixes.length - written} were already there)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
