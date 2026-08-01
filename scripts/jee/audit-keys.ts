/**
 * JEE Mains answer-key audit — the practice-bank structural probe (scripts/practice/
 * audit-keys.ts) pointed at the JEE `pyq` MCQ corpus as a zero-LLM backstop over the
 * pandoc/SAFE+BLIND ingest. Reuses `auditRow` verbatim.
 *
 * NOTE ON SIGNAL: JEE solutions conclude with a VALUE ("=395", "16/3"), not an option
 * letter, so the SOLN≠KEY class barely fires here — the reliable classes are DUP_OPT
 * (duplicated/dropped distractor) and STRUCT (not exactly 4 options / not exactly 1
 * correct). Section-B NAT rows have no options and are excluded (numeric format).
 *
 * TRIAGE ONLY — source-verify a flag against the paper before flipping a key.
 *
 *   npx tsx scripts/jee/audit-keys.ts                 # JEE Maths pyq MCQs
 *   npx tsx scripts/jee/audit-keys.ts Physics         # other JEE subject
 *   npx tsx scripts/jee/audit-keys.ts Maths JEE_2023  # + source_file substring
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { auditRow } from "../practice/audit-keys";

/**
 * Rows whose duplicate options are FAITHFUL to the source docx — the printed
 * paper itself repeats an option. Verified by pandoc-ing the source; the answer
 * is present and correctly keyed, so inventing a distractor to break the tie
 * would be fabrication. Labelled rather than silenced, so the count can reach a
 * meaningful zero without hiding a real extraction bug.
 */
const SOURCE_DUPS: { file: string; qnum: string; note: string }[] = [
  { file: "JEE_2022_Jun27.docx", qnum: "71", note: "options (c) and (d) both print 2 - log_2 3" },
  { file: "JEE_2024_Apr08.docx", qnum: "152", note: "options (b) and (c) both print 25" },
];
const isSourceDup = (file: string | null, qnum: string) =>
  SOURCE_DUPS.some((d) => d.file === file && d.qnum === qnum);
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const JEE_EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";

async function main() {
  const subject = process.argv[2] ?? "Maths";
  const srcFilter = process.argv[3];
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const PAGE = 1000;
  let from = 0, scanned = 0;
  const flags: { src: string; qnum: string; flag: string; vis: string }[] = [];
  for (;;) {
    let q = db.from("questions")
      .select("question_number, source_file, visibility, solution, subjects!inner(name), options(label, text, is_correct, image_url)")
      .eq("exam_id", JEE_EXAM_ID)
      .eq("subjects.name", subject)
      .eq("question_kind", "pyq")
      // MCQ only — Section-B NAT rows are question_format='numeric' with no options
      .or("question_format.is.null,question_format.eq.mcq")
      .order("id").range(from, from + PAGE - 1);
    if (srcFilter) q = q.like("source_file", `%${srcFilter}%`);
    const { data, error } = await q;
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const row of data as any[]) {
      scanned++;
      const raw = auditRow(row.options ?? [], row.solution);
      const flag = raw === "DUP_OPT" && isSourceDup(row.source_file, row.question_number) ? "SOURCE_DUP" : raw;
      if (flag) flags.push({ src: row.source_file ?? "?", qnum: row.question_number, flag, vis: row.visibility });
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }

  const byType: Record<string, number> = {};
  const bySrc: Record<string, number> = {};
  for (const f of flags) {
    const t = f.flag.startsWith("SOLN") ? "SOLN≠KEY" : f.flag.startsWith("STRUCT") ? "STRUCT" : f.flag;
    byType[t] = (byType[t] ?? 0) + 1;
    bySrc[f.src] = (bySrc[f.src] ?? 0) + 1;
  }
  console.log(`Scanned ${scanned} JEE ${subject} pyq MCQs${srcFilter ? ` (source ~ "${srcFilter}")` : ""}`);
  console.log(`Flagged ${flags.length}:`, JSON.stringify(byType));
  if (flags.length) {
    console.log("\nBy source file:");
    for (const [s, n] of Object.entries(bySrc).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${s}`);
    console.log("\nRows (source-verify before fixing):");
    for (const f of flags.sort((a, b) => (a.src + a.qnum).localeCompare(b.src + b.qnum))) {
      console.log(`  Q${f.qnum}\t${f.vis}\t${f.flag}\t${f.src}`);
    }
  }
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
