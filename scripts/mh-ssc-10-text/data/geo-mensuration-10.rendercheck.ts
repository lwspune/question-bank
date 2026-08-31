// scratch (geo-mensuration-10): push every stored math zone through the REAL
// KaTeX the website uses, so a zone that renders as raw LaTeX is caught before a
// human ever sees it. Also confirms the two errata brackets are live.
// Delete after use.
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { ORG_ID, EXAM_ID, requireChapter } from "../config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const ZONE = /\\\(([\s\S]*?)\\\)/g;

async function main() {
  const ch = requireChapter("geo-mensuration-10");
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await c
    .from("questions")
    .select("question_number, text, context, solution, options(text)")
    .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile);
  if (error) throw error;

  let zones = 0;
  const fails: string[] = [];
  for (const r of data as any[]) {
    const fields: [string, string | null][] = [
      ["text", r.text], ["context", r.context], ["solution", r.solution],
      ...(r.options ?? []).map((o: any, i: number) => [`option${i}`, o.text] as [string, string]),
    ];
    for (const [f, v] of fields) {
      if (typeof v !== "string") continue;
      for (const m of v.matchAll(ZONE)) {
        zones++;
        try {
          katex.renderToString(m[1], { throwOnError: true });
        } catch (e) {
          fails.push(`${r.question_number} [${f}]: ${(e as Error).message.slice(0, 120)}\n      ${m[1].slice(0, 120)}`);
        }
      }
    }
  }
  const errata = (data as any[]).filter((r) => (r.solution ?? "").startsWith("[Textbook note:"));
  console.log(`KaTeX: ${zones} math zones, ${fails.length} failure(s)`);
  for (const f of fails) console.log("  " + f);
  console.log(`\nerrata brackets live: ${errata.length}`);
  for (const r of errata) console.log(`  ${r.question_number}`);
  if (fails.length) process.exit(1);
}
main().catch((e) => { console.error(e); process.exit(1); });
