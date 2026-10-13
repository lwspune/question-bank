/**
 * Write scripts/mhtcet/difficulty-baseline.json: each subject's EASY / MODERATE / HARD
 * share over the 2023-2025 PUBLIC MHT-CET PYQs, the reference scale build-pdf-shift
 * checks a new shift's labels against (see difficultyDrift.ts).
 *
 *   npx tsx scripts/mhtcet/difficulty-baseline.ts
 *
 * 2023-2025 and not "everything": those are the years labelled on the scale the guides
 * quote, and including the shifts being checked would let them pull their own baseline.
 * Re-run only if the scale itself is deliberately re-graded.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";
import { difficultyMix, type Difficulty } from "./difficultyDrift";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const bySubject: Record<string, Difficulty[]> = {};
  for (let from = 0; ; from += 1000) {
    const { data, error } = await c
      .from("questions")
      .select("difficulty,subjects(name)")
      .eq("exam_id", EXAM_ID)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .gte("pyq_year", 2023)
      .lte("pyq_year", 2025)
      .order("id")
      .range(from, from + 999);
    if (error) throw error;
    for (const r of data ?? []) {
      const s = (r.subjects as unknown as { name: string } | null)?.name;
      if (s) (bySubject[s] ??= []).push(r.difficulty as Difficulty);
    }
    if (!data || data.length < 1000) break;
  }
  const out: Record<string, ReturnType<typeof difficultyMix>> = {};
  for (const [s, labels] of Object.entries(bySubject).sort()) out[s] = difficultyMix(labels);
  const path = join(__dirname, "difficulty-baseline.json");
  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  console.log(out);
  console.log(`wrote ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
