/** Full KaTeX validation of the live JEE rows (text/context/options/solution). */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";

const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string };
type Row = { question_number: string; text: string; context: string | null; solution: string | null; options: Opt[] };

function check(text: string): string | null {
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      return `${seg.content.slice(0, 45)} :: ${String((e as Error).message).slice(0, 50)}`;
    }
  }
  return null;
}

async function main() {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await client
    .from("questions")
    .select("question_number, text, context, solution, options(label, text)")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Row[];

  let broken = 0;
  let mdLeaks = 0;
  for (const r of rows) {
    const fields: [string, string][] = [["text", r.text]];
    if (r.context) fields.push(["context", r.context]);
    if (r.solution) fields.push(["solution", r.solution]);
    for (const o of r.options) fields.push([`opt ${o.label}`, o.text]);
    for (const [where, val] of fields) {
      const err = check(val);
      if (err) {
        broken++;
        console.log(`Q${r.question_number} [${where}] ${err}`);
      }
      if (/!\[\]\(|<!--|\{width=/.test(val)) {
        mdLeaks++;
        console.log(`Q${r.question_number} [${where}] markdown leak`);
      }
    }
  }
  console.log(`\n${rows.length} questions checked | KaTeX-broken segments: ${broken} | markdown leaks: ${mdLeaks}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
