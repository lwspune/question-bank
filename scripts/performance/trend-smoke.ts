/**
 * Drive Papers' marks line (2026-11-10) against LIVE data: for the students
 * with the most marked papers, every performance lane is matched to the paper
 * that carries its subject (laneTrendKey), and that paper's line is built
 * (trendFor). Read-only, service role.
 *
 *   npm run trend:smoke            # the 40 students with the most papers
 *   npm run trend:smoke -- <n>
 *
 * Exits 1 when a lane's subject is carried by NO paper of its exam: the lane's
 * subject name and the blueprints' subject names have drifted apart, and the
 * line would silently vanish for that subject. A lane with no line is not a
 * failure by itself: the student may not have finished three full papers.
 */
import { join } from "node:path";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { fetchStudentPerformance } = await import("@/lib/performance/query");
  const { buildPerformance } = await import("@/lib/performance/compute");
  const { getUserAttempts } = await import("@/lib/mocks/query");
  const { laneTrendKey, trendFor } = await import("@/lib/mocks/attemptHistory");
  const { getBlueprint } = await import("@/lib/mocks/blueprints");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const n = Number(process.argv[2] ?? 40);

  const { data, error } = await db
    .from("mock_attempts")
    .select("user_id")
    .in("status", ["submitted", "expired"])
    .not("score", "is", null)
    .order("submitted_at", { ascending: false })
    .limit(1000);
  if (error) throw new Error(error.message);
  const tally = new Map<string, number>();
  for (const r of (data ?? []) as { user_id: string }[]) tally.set(r.user_id, (tally.get(r.user_id) ?? 0) + 1);
  const ids = [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([id]) => id);

  let lanes = 0;
  let keyed = 0;
  let lined = 0;
  // Every subject any sat paper of an exam carries, across all these students.
  const carried = new Map<string, Set<string>>();
  const seen: { exam: string; subject: string }[] = [];
  for (const id of ids) {
    const [payload, attempts] = await Promise.all([fetchStudentPerformance(db, id), getUserAttempts(db, id)]);
    for (const a of attempts) {
      const bp = getBlueprint(a.examSlug, a.paperCode);
      if (!bp) continue;
      const set = carried.get(a.examName) ?? new Set<string>();
      for (const sec of bp.sections) for (const sub of sec.subjects) set.add(sub);
      carried.set(a.examName, set);
    }
    for (const lane of buildPerformance(payload, new Date()).lanes) {
      lanes += 1;
      seen.push({ exam: lane.exam, subject: lane.subject });
      const key = laneTrendKey(attempts, lane);
      if (!key) continue;
      keyed += 1;
      if (trendFor(attempts, key)) lined += 1;
    }
  }
  console.log(`${ids.length} students, ${lanes} lanes: ${keyed} matched to a paper, ${lined} with a line (3+ papers)`);

  // Drift: a lane whose subject NO paper of its exam carries, though papers of
  // that exam were sat. Its line could never appear.
  const drift = new Set<string>();
  for (const l of seen) {
    const set = carried.get(l.exam);
    if (set && !set.has(l.subject)) drift.add(`${l.exam} / ${l.subject}  (papers carry: ${[...set].join(", ")})`);
  }
  if (drift.size > 0) {
    console.log("Lane subjects no paper of their exam carries:");
    for (const d of drift) console.log(`  ${d}`);
    process.exit(1);
  }
  console.log("OK: every lane subject is carried by a paper of its exam");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
