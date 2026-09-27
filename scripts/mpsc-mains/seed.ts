/**
 * Create the five MPSC Mains exam rows and their subjects.
 *
 *   npx tsx scripts/mpsc-mains/seed.ts          # dry-run: report only
 *   npx tsx scripts/mpsc-mains/seed.ts --apply  # create whatever is missing
 *
 * Idempotent. Exam ids are resolved by NAME at commit time (commit.ts), so
 * nothing is pasted back into config.ts.
 *
 * Subjects are curated here, not auto-created: commitStaged never creates a
 * subject, so a typo in a batch fails loudly instead of forking the taxonomy.
 * Only the 2018 joint paper carries General Knowledge.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAMS, type ExamKey } from "./config";

const SUBJECTS_BY_EXAM: Record<ExamKey, string[]> = {
  ssm: ["Marathi", "English"],
  grpb: ["Marathi", "English", "General Knowledge"],
  sti: ["Marathi", "English"],
  aso: ["Marathi", "English"],
  psi: ["Marathi", "English"],
};

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const [key, exam] of Object.entries(EXAMS) as [ExamKey, (typeof EXAMS)[ExamKey]][]) {
    let { data: row, error } = await client.from("exams").select("id").eq("name", exam.name).maybeSingle();
    if (error) throw new Error(`exam read failed: ${error.message}`);
    if (!row) {
      if (!apply) {
        console.log(`${exam.name}: missing — [dry-run]`);
        continue;
      }
      const ins = await client.from("exams").insert({ name: exam.name }).select("id").single();
      if (ins.error) throw new Error(`exam insert failed: ${ins.error.message}`);
      row = ins.data;
      console.log(`${exam.name}: created ${row.id}`);
    }
    const { data: have, error: sErr } = await client.from("subjects").select("name").eq("exam_id", row.id);
    if (sErr) throw new Error(`subject read failed: ${sErr.message}`);
    const missing = SUBJECTS_BY_EXAM[key].filter((s) => !(have ?? []).some((h) => h.name === s));
    if (missing.length && apply) {
      const { error: iErr } = await client.from("subjects").insert(missing.map((name) => ({ exam_id: row!.id, name })));
      if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
    }
    console.log(`${exam.name}: ${row.id} · subjects missing ${missing.length ? missing.join(", ") : "none"}${missing.length && !apply ? " [dry-run]" : ""}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
