/**
 * Flip one MPSC Prelims exam's questions PUBLIC — the deliberate publishing step
 * commit.ts refuses to take (it forces PRIVATE).
 *
 *   npx tsx scripts/mpsc/flip-public.ts ssp            # dry run: counts only
 *   npx tsx scripts/mpsc/flip-public.ts ssp --apply
 *
 * Scoped to the one exam row named in config.ts EXAMS (by id AND name), so no
 * other exam can be touched. Reversible: set the same rows back to PRIVATE.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAMS, type ExamKey } from "./config";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const key = process.argv.slice(2).find((a) => !a.startsWith("--")) as ExamKey | undefined;
  const exam = key ? EXAMS[key] : undefined;
  if (!exam?.id) throw new Error(`name an exam with an id: ${Object.keys(EXAMS).join(", ")}`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: row, error } = await db.from("exams").select("id, name").eq("id", exam.id).single();
  if (error) throw new Error(error.message);
  if (row.name !== exam.name) throw new Error(`exam ${exam.id} is "${row.name}", expected "${exam.name}"`);

  const count = async (vis: string) =>
    (await db.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", exam.id).eq("visibility", vis)).count ?? 0;
  const before = `PUBLIC ${await count("PUBLIC")} · PRIVATE ${await count("PRIVATE")}`;
  if (apply) {
    const { error: uErr } = await db.from("questions").update({ visibility: "PUBLIC" }).eq("exam_id", exam.id).eq("visibility", "PRIVATE");
    if (uErr) throw new Error(uErr.message);
  }
  console.log(`${exam.name}: before ${before}${apply ? ` → after PUBLIC ${await count("PUBLIC")} · PRIVATE ${await count("PRIVATE")}` : ""}`);
  if (!apply) console.log("[dry run] pass --apply to flip.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
