/**
 * Create the two UP Board exam rows and their subjects.
 *
 *   npx tsx scripts/up-board/seed-exam.ts          # dry-run: report only
 *   npx tsx scripts/up-board/seed-exam.ts --apply  # create what is missing
 *
 * Idempotent. Prints the exam ids to paste into config.ts (EXAM_ID_UP_10 /
 * EXAM_ID_UP_12): every row this lane writes hangs off them, so they come from
 * a committed script, not ad-hoc SQL.
 *
 * Subjects are created here because commitStaged auto-creates chapters and
 * subtopics but deliberately NOT subjects (a typo would corrupt the top level).
 *
 * VISIBLE SIDE EFFECT: listExams reads every `exams` row, so each new exam joins
 * the /browse exam dropdown at once, empty until a paper is made PUBLIC (this
 * lane commits PRIVATE). Homepage cards, hubs and nav come from EXAM_REGISTRY,
 * which this script does not touch.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_NAME_UP_10, EXAM_NAME_UP_12, SUBJECTS } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const WANT: { name: string; cls: 10 | 12 }[] = [
  { name: EXAM_NAME_UP_10, cls: 10 },
  { name: EXAM_NAME_UP_12, cls: 12 },
];

async function main() {
  const apply = process.argv.includes("--apply");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const { name, cls } of WANT) {
    let { data: exam, error } = await client.from("exams").select("id, name").eq("name", name).maybeSingle();
    if (error) throw new Error(`exam read failed: ${error.message}`);
    if (!exam) {
      if (!apply) {
        console.log(`"${name}": missing (dry run: --apply creates it and its subjects)`);
        continue;
      }
      const ins = await client.from("exams").insert({ name }).select("id, name").single();
      if (ins.error) throw new Error(`exam insert failed: ${ins.error.message}`);
      exam = ins.data;
      console.log(`"${name}": created`);
    }
    console.log(`"${name}": EXAM_ID_UP_${cls} = "${exam.id}"`);

    const wanted = Object.values(SUBJECTS).filter((s) => s.cls === cls).map((s) => s.subjectName);
    const { data: have, error: sErr } = await client.from("subjects").select("name").eq("exam_id", exam.id);
    if (sErr) throw new Error(`subject read failed: ${sErr.message}`);
    const missing = wanted.filter((n) => !(have ?? []).some((h) => h.name === n));
    if (!missing.length) {
      console.log(`  subjects ok: ${wanted.join(", ")}`);
      continue;
    }
    if (!apply) {
      console.log(`  subjects missing: ${missing.join(", ")}`);
      continue;
    }
    const { error: iErr } = await client.from("subjects").insert(missing.map((n) => ({ exam_id: exam!.id, name: n })));
    if (iErr) throw new Error(`subject insert failed: ${iErr.message}`);
    console.log(`  subjects created: ${missing.join(", ")}`);
  }
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
