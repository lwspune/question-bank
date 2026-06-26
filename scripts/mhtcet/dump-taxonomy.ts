/**
 * Dump the live MHT-CET chapter/subtopic taxonomy to out/taxonomy.json so the
 * classification/derivation step can map each question to an EXISTING chapter +
 * subtopic (auto-create is only a fallback). Read-only.
 *
 *   npx tsx scripts/mhtcet/dump-taxonomy.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: subjects } = await client.from("subjects").select("id, name").eq("exam_id", EXAM_ID);
  const out: Record<string, Record<string, string[]>> = {};
  for (const s of subjects ?? []) {
    const { data: chapters } = await client.from("chapters").select("id, name").eq("subject_id", s.id).order("name");
    out[s.name] = {};
    for (const c of chapters ?? []) {
      const { data: subs } = await client.from("subtopics").select("name").eq("chapter_id", c.id).order("name");
      out[s.name][c.name] = (subs ?? []).map((x) => x.name);
    }
  }
  const path = join(__dirname, "out", "taxonomy.json");
  writeFileSync(path, JSON.stringify(out, null, 2), "utf8");
  const nch = Object.values(out).reduce((a, m) => a + Object.keys(m).length, 0);
  console.log(`wrote ${path} — ${Object.keys(out).length} subjects, ${nch} chapters`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
