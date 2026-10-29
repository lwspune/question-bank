/**
 * Make every question on the flawed list (src/lib/mocks/flawed.json) grace in
 * the mocks that already exist.
 *
 *   npx tsx scripts/mocks/regrace-flawed.ts            # dry run: what would change
 *   npx tsx scripts/mocks/regrace-flawed.ts --apply
 *
 * Changes ONLY the `grace` flag of listed questions inside `mock_tests.questions`
 * (the same `withFlawedGrace` every builder now applies), so a mock comes back
 * otherwise identical. Re-running finds nothing to do.
 *
 * A submitted attempt keeps the score it was given: scores are stored on
 * `mock_attempts`, so grace counts for every attempt submitted from now on.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { FLAWED_QUESTIONS, withFlawedGrace } from "../../src/lib/mocks/flawed";
import type { MockQuestionSnapshot } from "../../src/lib/mocks/reconstruct";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const ids = new Set(FLAWED_QUESTIONS.map((f) => f.id));
  console.log(`${ids.size} flawed questions on the list`);
  if (ids.size === 0) return;

  let changed = 0;
  const PAGE = 200;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_tests")
      .select("id, slug, status, questions")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    for (const m of data ?? []) {
      const before = m.questions as MockQuestionSnapshot[];
      const after = withFlawedGrace(before);
      const added = after.filter((q, i) => q.grace && !before[i].grace).map((q) => q.position);
      if (added.length === 0) continue;
      changed++;
      console.log(`  ${m.slug.padEnd(28)} ${m.status.padEnd(9)} grace +${added.length} (Q${added.join(", Q")})`);
      if (apply) {
        const { error: e } = await db.from("mock_tests").update({ questions: after }).eq("id", m.id);
        if (e) throw new Error(`${m.slug}: ${e.message}`);
      }
    }
    if (!data || data.length < PAGE) break;
  }
  console.log(`\n${apply ? "updated" : "would update"} ${changed} mocks${apply ? "" : " (dry run; --apply to write)"}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
