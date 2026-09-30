// usage: _jee_duphash.mts <dump.json> — report any content_hash shared by a dump row and another row of the same exam
import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const d = JSON.parse(fs.readFileSync("generated-papers/" + process.argv[2], "utf8"));
const ids: string[] = d.questions.map((q: any) => q.id);
const rows: any[] = [];
for (let i = 0; i < ids.length; i += 150) {
  const { data } = await c.from("questions").select("id,content_hash,exam_id").in("id", ids.slice(i, i + 150));
  rows.push(...data!);
}
let dup = 0;
for (let i = 0; i < rows.length; i += 100) {
  const hs = rows.slice(i, i + 100).map((r) => r.content_hash);
  const { data } = await c.from("questions").select("id,content_hash").eq("exam_id", rows[0].exam_id).in("content_hash", hs);
  const n: Record<string, string[]> = {};
  for (const r of data!) (n[r.content_hash] ||= []).push(r.id);
  for (const [h, v] of Object.entries(n)) if (v.length > 1) { dup++; console.log("dup", h, v); }
}
console.log(rows.length, "rows checked, dup hashes:", dup);
