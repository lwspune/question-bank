/** Full KaTeX validation of the live JEE rows (text/context/options/solution). */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";

const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string; image_url: string | null };
type Row = { question_number: string; text: string; context: string | null; solution: string | null; image_url: string | null; options: Opt[] };

// Stem references a visual element (reaction scheme / figure / circuit / graph /
// diagram) that should have an image. A figure that silently failed to extract
// passes every render/leak/artifact scan yet leaves the question unanswerable.
const VISUAL_REF =
  /\b(following|given|above|below)\s+(chemical\s+)?(reaction|figure|circuit|diagram|graph|structure|scheme)\b|\bshown\s+(in\s+the\s+\w+|above|below)\b|\bin\s+the\s+(figure|circuit|diagram|graph)\b|\bradial\s+distribution\b|\bgiven\s+below\s+are\s+the\s+(plots|graphs|figures)\b/i;

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
    .select("question_number, text, context, solution, image_url, options(label, text, image_url)")
    .eq("exam_id", EXAM_ID);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Row[];

  const cnt = (s: string, re: RegExp) => (s.match(re) || []).length;
  let broken = 0;
  let mdLeaks = 0;
  let artifacts = 0;
  let incomplete = 0;
  for (const r of rows) {
    // Completeness ≠ renderability: a visual-referencing stem with no image
    // anywhere is probably missing a figure that failed to extract.
    // Skip if the stem renders the content in display math (`\[...\]`) — the
    // reaction/figure is shown as text, not a missing image (e.g. P1 Q42).
    if (VISUAL_REF.test(r.text) && !/\\\[/.test(r.text) && !r.image_url && r.options.every((o) => !o.image_url)) {
      incomplete++;
      console.log(`Q${r.question_number} [INCOMPLETE?] visual-ref stem but no image: ${r.text.slice(0, 70)}`);
    }
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
      // Dangling artifacts KaTeX-on-complete-segments misses: unbalanced math
      // delimiters (split across options) and a leaked trailing hard-break `\`.
      if (cnt(val, /\\\(/g) !== cnt(val, /\\\)/g) || cnt(val, /\\\[/g) !== cnt(val, /\\\]/g)) {
        artifacts++;
        console.log(`Q${r.question_number} [${where}] unbalanced delimiters: ...${val.slice(-40)}`);
      }
      if (/(?<!\\)\\\s*$/.test(val)) {
        artifacts++;
        console.log(`Q${r.question_number} [${where}] trailing backslash: ...${val.slice(-40)}`);
      }
    }
  }
  console.log(`\n${rows.length} questions checked | KaTeX-broken: ${broken} | markdown leaks: ${mdLeaks} | dangling artifacts: ${artifacts} | incomplete? ${incomplete} (soft — review each)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
