/** throwaway: show p17 Q35 stored text + options with delimiter counts */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data } = await db
    .from("questions")
    .select("question_number,text,options(label,text)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", "JEE_2021_Paper17.docx")
    .eq("question_number", "35");
  const r = data?.[0] as any;
  const cnt = (s: string) => `${(s.match(/\\\(/g) ?? []).length}/${(s.match(/\\\)/g) ?? []).length}`;
  console.log(`STEM [${cnt(r.text)}]: ${JSON.stringify(r.text)}\n`);
  for (const o of r.options) console.log(`  (${o.label}) [${cnt(o.text)}] ${JSON.stringify(o.text)}`);
}
main();
