/**
 * Drive /quiz/attempts' OWN loader + the pure read core against live data.
 *
 *   npm run quiz:smoke-attempts
 *
 * That page is auth-gated `ƒ`, so `next build` never executes it — a green build
 * proves it compiles and nothing more. This runs the loader the page calls and
 * pushes the real rows through parseQuizAttempt, which is the half that can fail
 * against live data (a metadata key that was never written, a score arriving as
 * a string from jsonb, a row with no ref_id).
 *
 * It does NOT prove the page lays out. That is owed to a browser.
 *
 * NOTE ON THE CLIENT: the page reads through the RLS-bound server client and
 * relies on `user_activity_select_own`. This script uses the service-role client
 * and filters by user_id in the query, so it exercises the QUERY and the SHAPING
 * but deliberately NOT the policy. The policy is asserted in the DB-integration
 * suite, not here.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { getUserQuizAttempts } = await import("@/lib/quiz/attempts");
  const { parseQuizAttempt } = await import("@/lib/quiz/activity");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Every quiz_taken row in the bank, regardless of owner — the shaping core has
  // to survive all of them, not just one tidy user's.
  const { data, error } = await db
    .from("user_activity")
    .select("user_id, ref_id, metadata, created_at")
    .eq("kind", "quiz_taken")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(`probe read failed: ${error.message}`);

  const rows = data ?? [];
  console.log(`quiz_taken rows in the bank: ${rows.length}`);

  if (rows.length === 0) {
    // NOT a failure. This emitter shipped 2026-09-18 and only fires for a
    // SIGNED-IN submit on a published quiz; an empty log is the expected state
    // until one happens. Saying so beats a red run nobody can act on.
    console.log("no rows yet — the emitter is new and fires only for signed-in submits.");
    console.log("SMOKE: PASS (nothing to shape)");
    return;
  }

  // The shaping core over every real row.
  let nullScore = 0;
  let nullSlug = 0;
  for (const r of rows) {
    const v = parseQuizAttempt(r as never);
    if (!v.title) throw new Error(`empty title survived parseQuizAttempt: ${JSON.stringify(r)}`);
    if (v.score === null) nullScore++;
    if (v.slug === null) nullSlug++;
    if (v.score !== null && Number.isNaN(v.score)) throw new Error("NaN score reached the view model");
  }
  console.log(`shaped ${rows.length} rows · ${nullScore} without a score · ${nullSlug} without a slug`);

  // The loader itself, for the user who has the most rows.
  const byUser = new Map<string, number>();
  for (const r of rows) byUser.set(r.user_id as string, (byUser.get(r.user_id as string) ?? 0) + 1);
  const [heaviest] = [...byUser.entries()].sort((a, b) => b[1] - a[1]);
  const page = await getUserQuizAttempts(db, heaviest[0]);
  console.log(`loader for heaviest user (${heaviest[1]} rows): ${page.attempts.length}, truncated=${page.truncated}`);
  if (page.attempts.length !== heaviest[1]) {
    throw new Error(`loader returned ${page.attempts.length}, expected ${heaviest[1]}`);
  }

  // Newest-first is what the page promises.
  const times = page.attempts.map((a) => a.takenAt);
  const sorted = [...times].sort().reverse();
  if (JSON.stringify(times) !== JSON.stringify(sorted)) throw new Error("attempts are not newest-first");

  console.log("SMOKE: PASS");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
