/**
 * Which homework plans are missing questions from a newly ingested paper
 * (2026-11-06). Read-only. Run after any ingest into a subject that has a plan;
 * the daily prod check (tests/homework-plan-coverage.test.ts) asks the same.
 *
 *   npm run homework:coverage                 every plan file
 *   npm run homework:coverage -- jee-mains    plans whose slug contains this
 *
 * Exits 1 when a published plan is behind the bank. To catch it up:
 * `npm run homework:new -- <plan>` (review only the new paper), then
 * `npm run homework:add-new -- <plan>`, then homework:build.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { describeUnplanned, readPlanCoverage, readPlanFiles } from "../lib/homeworkCoverage";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const filter = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "";
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let behind = 0;
  for (const plan of readPlanFiles().filter((p) => p.slug.includes(filter))) {
    const c = await readPlanCoverage(client, plan);
    const state = c.published === null ? "not stored" : c.published ? "published" : "unpublished";
    if (c.unplanned.length === 0) {
      console.log(`OK      ${c.slug} (${state})`);
      continue;
    }
    if (c.published) behind++;
    console.log(`BEHIND  ${c.slug} (${state}): ${describeUnplanned(c.unplanned)}`);
  }
  if (behind) {
    console.log(`\n${behind} published plan(s) behind the bank: npm run homework:new -- <plan>`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
