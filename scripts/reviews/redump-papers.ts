/**
 * Re-dump every question of the reviewed papers from the LIVE database into
 * data/audit-run/, so the probes re-run against current text rather than the
 * pre-fix snapshot they were built from.
 *
 * Verifying a repair against the dump you authored it from proves nothing.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PAPERS: Record<string, string> = {
  "paper-95b50231-b106-4fcf-b3b3-3cb46483fa6b": "95b50231-b106-4fcf-b3b3-3cb46483fa6b",
  "paper-97ede96e-69cd-4715-bccc-f61efd837fea": "97ede96e-69cd-4715-bccc-f61efd837fea",
  "paper-5db793ae-7e65-450e-94c2-65c2fe9f6f60": "5db793ae-7e65-450e-94c2-65c2fe9f6f60",
};
const DIR = join(process.cwd(), "scripts", "reviews", "data", "audit-run");

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  mkdirSync(DIR, { recursive: true });
  let total = 0;
  for (const [name, id] of Object.entries(PAPERS)) {
    const { data, error } = await db
      .from("paper_questions")
      .select("questions:question_id (id, question_number, context, text, solution, options(label, text, is_correct))")
      .eq("paper_id", id);
    if (error) throw error;
    const rows = (data ?? [])
      .map((p: any) => p.questions)
      .filter(Boolean)
      .map((q: any) => ({
        questionId: q.id,
        questionNumber: q.question_number,
        context: q.context ?? null,
        text: q.text,
        options: q.options,
        solution: q.solution,
        verdict: "",
      }))
      .sort((a: any, b: any) => (a.questionNumber ?? "").localeCompare(b.questionNumber ?? "", undefined, { numeric: true }));
    writeFileSync(join(DIR, `${name}.audit.json`), JSON.stringify(rows, null, 2), "utf8");
    total += rows.length;
    console.log(`  ${rows.length}  ${name}`);
  }
  // the supplementary p1 file is now redundant — the paper dump above is complete
  writeFileSync(join(DIR, "paper-p1-confirmed.audit.json"), "[]", "utf8");
  console.log(`\n${total} row(s) re-dumped from live`);
})().catch((e) => {
  console.error(e instanceof Error ? e.message : JSON.stringify(e, null, 2));
  process.exit(1);
});
