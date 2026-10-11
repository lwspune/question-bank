/**
 * Drive the attempt-history chain (2026-10-11) against live data: the result
 * page's "since your last try" chip and time taken, and My attempts' subject
 * filter and marks trend.
 *
 * WHY. Both pages are auth-gated `ƒ`, so `next build` never renders them, and
 * the unit tests prove only the rules. This runs the pages' own loader
 * (getUserAttempts) and pure core (lib/mocks/attemptHistory) over the students
 * with the most attempts, and FAILS if a subject comes out unnamed or a
 * comparison crosses subjects, scopes or totals.
 *
 * WHAT IT DOES NOT PROVE: it reads with the SERVICE ROLE, where the pages read
 * with the student's own JWT, so the RLS path is untested; and it renders no
 * markup, so layout is a phone check. Read-only.
 *
 *   npm run attempts:smoke [-- <n students>]
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getUserAttempts } from "@/lib/mocks/query";
import {
  defaultTrendSubject,
  formatElapsed,
  previousComparable,
  subjectKey,
  subjectOptions,
  trendFor,
} from "@/lib/mocks/attemptHistory";

const LIMIT = Number(process.argv[2] ?? 8);

async function main() {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.from("mock_attempts").select("user_id").neq("status", "in_progress").limit(5000);
  if (error) throw new Error(error.message);
  const counts = new Map<string, number>();
  for (const r of (data ?? []) as { user_id: string }[]) counts.set(r.user_id, (counts.get(r.user_id) ?? 0) + 1);
  const heaviest = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, LIMIT);

  const problems: string[] = [];
  let chips = 0;
  let trends = 0;

  for (const [userId, n] of heaviest) {
    const attempts = await getUserAttempts(db, userId);
    const options = subjectOptions(attempts);
    for (const o of options) {
      if (!o.label.trim() || /^[a-z0-9-]+$/.test(o.label)) problems.push(`${userId}: unnamed subject ${o.key} -> "${o.label}"`);
    }
    for (const a of attempts) {
      if (!a.examSlug || a.examSlug === a.examName) problems.push(`${userId}: exam "${a.examName}" did not resolve to a slug`);
      const prev = previousComparable(attempts, a.attemptId);
      if (!prev) continue;
      chips += 1;
      const p = attempts.find((x) => x.attemptId === prev.attemptId)!;
      if (subjectKey(p) !== subjectKey(a) || p.scope !== "full" || a.scope !== "full" || p.maxScore !== a.maxScore || p.startedAt >= a.startedAt) {
        problems.push(`${userId}: bad comparison ${a.attemptId} vs ${p.attemptId}`);
      }
    }
    const key = defaultTrendSubject(attempts);
    const trend = key ? trendFor(attempts, key) : null;
    if (trend) trends += 1;
    const latest = attempts.find((a) => a.status !== "in_progress");
    const elapsed = latest?.durationSecs ? formatElapsed(latest.startedAt, latest.submittedAt, latest.durationSecs) : null;
    console.log(
      `${userId.slice(0, 8)}  ${n} finished · subjects: ${options.map((o) => `${o.label} (${o.count})`).join(", ")}` +
        `\n          trend: ${trend ? `${key} ${trend.points.map((pt) => pt.score).join(" → ")} / ${trend.maxScore}` : "none"}` +
        ` · latest time: ${elapsed ?? "n/a"}`
    );
  }

  console.log(`\n${heaviest.length} students · ${chips} attempts with a "since your last try" chip · ${trends} with a trend`);
  if (problems.length) {
    console.error(`\nFAIL: ${problems.length} problem(s)\n` + problems.slice(0, 30).join("\n"));
    process.exit(1);
  }
  console.log("OK: every subject named, every comparison same subject, full, same total, earlier.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
