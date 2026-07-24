/**
 * Validate the committed rows of one MHT-CET shift (text/options/solution):
 * KaTeX renderability, markdown leaks, unbalanced delimiters, trailing backslash,
 * raw-unicode-math leaks, and visual-ref-but-no-image completeness. Read-only.
 *
 *   npx tsx scripts/mhtcet/validate-db.ts <shiftId>
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { renderCorruption } from "../lib/render-lint";
import { EXAM_ID, loadShift, requireShiftId } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string; image_url: string | null };
type Row = { question_number: string; text: string; solution: string | null; image_url: string | null; options: Opt[] };

const VISUAL_REF =
  /\b(following|given|above|below|shown)\s+(figure|circuit|diagram|graph|structure|network|arrangement)\b|\bin\s+the\s+(figure|circuit|diagram|graph)\b|\bas\s+shown\b/i;
// Raw unicode math that should be LaTeX (the MHT-CET hard rule). Greek + operators + super/subscripts + fractions.
const RAW_UNICODE =
  /[×÷→←⇌≥≤≠≈∞√∑∏∫°±·²³¹⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉αβγδεζηθλμνξπρστφχψωΩΔΣΠΘΦ½⅓¼¾∂∇∈∉⊆∪∩Å]/;

function katexErr(text: string): string | null {
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
  const shiftId = requireShiftId(process.argv, 2, "validate-db.ts <shiftId>");
  const { sourceFile, questions } = loadShift(shiftId);
  const flawed = new Set(Object.entries(questions).filter(([, q]) => q.flawed).map(([k]) => k));
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await client
    .from("questions")
    .select("question_number, text, solution, image_url, options(label, text, image_url)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", sourceFile);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Row[];

  const cnt = (s: string, re: RegExp) => (s.match(re) || []).length;
  let broken = 0, mdLeaks = 0, artifacts = 0, unicode = 0, incomplete = 0, corruption = 0;
  for (const r of rows.sort((a, b) => Number(a.question_number) - Number(b.question_number))) {
    if (VISUAL_REF.test(r.text) && !/\\\[/.test(r.text) && !r.image_url && r.options.every((o) => !o.image_url)) {
      incomplete++;
      console.log(`Q${r.question_number} [INCOMPLETE?] visual-ref stem but no image: ${r.text.slice(0, 70)}`);
    }
    const fields: [string, string][] = [["text", r.text]];
    if (r.solution) fields.push(["solution", r.solution]);
    for (const o of r.options) fields.push([`opt ${o.label}`, o.text]);
    for (const [where, val] of fields) {
      const err = katexErr(val);
      if (err) { broken++; console.log(`Q${r.question_number} [${where}] KaTeX: ${err}`); }
      if (/!\[\]\(|<!--|\{width=/.test(val)) { mdLeaks++; console.log(`Q${r.question_number} [${where}] markdown leak`); }
      if (cnt(val, /\\\(/g) !== cnt(val, /\\\)/g) || cnt(val, /\\\[/g) !== cnt(val, /\\\]/g)) {
        artifacts++; console.log(`Q${r.question_number} [${where}] unbalanced delimiters: ...${val.slice(-40)}`);
      }
      if (/(?<!\\)\\\s*$/.test(val)) { artifacts++; console.log(`Q${r.question_number} [${where}] trailing backslash`); }
      if (RAW_UNICODE.test(val)) {
        unicode++;
        const ch = [...new Set((val.match(new RegExp(RAW_UNICODE, "g")) || []))].join("");
        console.log(`Q${r.question_number} [${where}] raw unicode math: ${ch}`);
      }
      // Render-corruption classes from the OCR ingest: lowercase-start stem
      // (dropped lead-in), $/\( delimiter scramble, plain-text \_ blank.
      for (const flag of renderCorruption(val, { isStem: where === "text" })) {
        corruption++;
        console.log(`Q${r.question_number} [${where}] render-corruption: ${flag} :: ${val.slice(0, 55)}`);
      }
    }
  }
  console.log(`\n${rows.length} rows | KaTeX-broken: ${broken} | md leaks: ${mdLeaks} | delimiter/backslash: ${artifacts} | raw-unicode: ${unicode} | render-corruption: ${corruption} | incomplete?: ${incomplete}`);
  console.log(`flawed (PRIVATE): ${[...flawed].map((k) => "Q" + k).join(", ") || "none"}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
