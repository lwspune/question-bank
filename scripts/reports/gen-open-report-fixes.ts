/**
 * Build the textfix payload for the 8 open /dashboard/reports rows (2026-08-01).
 *
 * Every edit is expressed as a TARGETED replacement against the row's CURRENT
 * live text, not a hand-retyped stem — retyping LaTeX by hand is how a repair
 * introduces a second defect. Each replacement ASSERTS it actually matched, so
 * a silent no-op fails the run instead of reporting success (the "verify a
 * no-op before believing it" lesson from the mh-ssc-10 cross-check).
 *
 *   npx tsx scripts/reports/gen-open-report-fixes.ts
 *     -> writes scripts/grounding/data/open-reports-2026-08-01.textfix.json
 *
 * Then review, and apply with:
 *   npx tsx scripts/grounding/apply-text-fix.ts open-reports-2026-08-01 --apply
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Replace `find` with `repl` exactly once, or throw. */
function sub(field: string, id: string, src: string, find: string, repl: string): string {
  const n = src.split(find).length - 1;
  if (n !== 1) {
    throw new Error(`${id} ${field}: expected exactly 1 match for ${JSON.stringify(find.slice(0, 60))}, found ${n}`);
  }
  return src.replace(find, repl);
}

interface OptEdit { label: string; text: string }
interface TextFix {
  id: string;
  text?: string;
  options?: OptEdit[];
  solution?: string;
  note: string;
}

// ---------------------------------------------------------------------------
// The 8 rows, keyed by report.
// ---------------------------------------------------------------------------
const LWS_Q84 = "79731ab8-a09a-4635-b6aa-ad9c67620ff5";
const LWS_Q81 = "c62e5487-ad3a-45f6-a2a6-3897c4094ecf";
const JEE_Q37 = "b6a3ae11-6e43-4024-8591-f7f0a0d065b3";
const JEE_Q32 = "8c7e0a6a-81d5-4f53-acfe-f6e3e911b7a3";
const JEE_Q30 = "524dbb38-7953-4ef6-b6d6-50f19bfac5d7";
const JEE_Q29 = "83c54ff3-8d16-4002-a34a-fb30f72dbda6";
const JEE_Q3 = "e4049dd2-d0f5-4bbd-afc3-2fb465429f21";
const JEE_Q1 = "db975aa3-904f-480a-a415-4608642124a4";

/** Bare 3x1 matrix markup (no delimiters) so it can be embedded mid-sentence. */
const MAT = (a: string, b: string, c: string) =>
  String.raw`\begin{bmatrix} ${a} \\ ${b} \\ ${c} \end{bmatrix}`;
/** The same, as a standalone inline-math zone (option text). */
const COL = (a: string, b: string, c: string) => String.raw`\(${MAT(a, b, c)}\)`;

// Source-verified against "5th april 2026 shift-2.docx": the merged header cells
// read "List-I (Purification technique)" and "List-II (Used to separate)".
// GFM has no colspan, so each spanning label sits over the column it describes
// (2 and 4), leaving the (A)/(I) label columns blank.
const Q37_HEADER_BAD = "| List-I (Purification | List-II (Used to |  | technique) |";
const Q37_HEADER_GOOD = "|  | List-I (Purification technique) |  | List-II (Used to separate) |";

const LWS_Q84_SOLUTION =
  String.raw`\(\det(\operatorname{Adj} A) = (\det A)^{2}\); computing \(\det(\operatorname{Adj} A) = 4\) gives \(\det A = 2\) (positive, as required). ` +
  String.raw`Then \(X = A^{-1}B = \frac{1}{\det A}(\operatorname{Adj} A)B\). With \(B = ${MAT("1", "1", "2")}\), ` +
  String.raw`\((\operatorname{Adj} A)B = ${MAT("1-1-2", "1+1-2", "1+1+2")} = ${MAT("-2", "0", "4")}\); ` +
  String.raw`dividing by \(2\) gives \(X = ${MAT("-1", "0", "2")}\). Matches option A.`;

async function main() {
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const ids = [LWS_Q84, LWS_Q81, JEE_Q37, JEE_Q32, JEE_Q30, JEE_Q29, JEE_Q3, JEE_Q1];
  const { data, error } = await client
    .from("questions")
    .select("id, text, solution, options(label, text)")
    .in("id", ids);
  if (error) throw error;

  const rows = new Map((data ?? []).map((r: any) => [r.id, r]));
  for (const id of ids) if (!rows.has(id)) throw new Error(`row not found: ${id}`);
  const stem = (id: string) => rows.get(id).text as string;
  const soln = (id: string) => (rows.get(id).solution ?? "") as string;
  const opt = (id: string, label: string) =>
    (rows.get(id).options as any[]).find((o) => o.label === label).text as string;

  const fixes: TextFix[] = [];

  // 1. LWS Mock 2 Q84 — X = A^-1 B is necessarily 3x1; the stem already renders
  //    the RHS as a column, so row-vector options were internally inconsistent.
  fixes.push({
    id: LWS_Q84,
    options: [
      { label: "A", text: COL("-1", "0", "2") },
      { label: "B", text: COL("1", "1", "2") },
      { label: "C", text: COL("0", "-1", "-1") },
      { label: "D", text: COL("2", "1", "1") },
    ],
    solution: LWS_Q84_SOLUTION,
    note: "options row->column vectors; solution restated in column form (key A unchanged, verified)",
  });

  // 2. LWS Mock 2 Q81 — the printed paper says "x, y, z in R" but the determinant
  //    only ever uses x (bases 5, 6, 7). Vestigial from the classic x/y/z version.
  fixes.push({
    id: LWS_Q81,
    text: sub("text", LWS_Q81, stem(LWS_Q81), String.raw`\(x, y, z \in R\)`, String.raw`\(x \in R\)`),
    note: "stem: dropped vestigial y,z (determinant uses only x). Key D=0 unchanged, verified",
  });

  // 3. JEE Apr05 S2 Q37 — merged Match-List header shredded by gridTableToPipe.
  fixes.push({
    id: JEE_Q37,
    text: sub("text", JEE_Q37, stem(JEE_Q37), Q37_HEADER_BAD, Q37_HEADER_GOOD),
    note: "table header rebuilt from source docx (List-I (Purification technique) / List-II (Used to separate))",
  });

  // 4. JEE Apr05 S2 Q32 — pandoc hard-line-break artifact in the STEM (the report
  //    attributed it to options a/b; the options are clean).
  fixes.push({
    id: JEE_Q32,
    text: sub("text", JEE_Q32, stem(JEE_Q32), "?\\ \\(E_{Zn", "?\n\\(E_{Zn"),
    note: "stem: stray pandoc line-break backslash -> newline",
  });

  // 5. JEE Apr05 S2 Q30 — escaped `\>` renders literally; options C/D already use \(>\).
  fixes.push({
    id: JEE_Q30,
    options: ["A", "B"].map((label) => ({
      label,
      text: opt(JEE_Q30, label).split("\\>").join("\\(>\\)"),
    })),
    note: "options A/B: \\> -> \\(>\\), matching options C/D",
  });

  // 6. JEE Apr05 S2 Q29 — same pandoc line-break artifact.
  fixes.push({
    id: JEE_Q29,
    text: sub("text", JEE_Q29, stem(JEE_Q29), "reaction\\ \\(X_{2}", "reaction\n\\(X_{2}"),
    note: "stem: stray pandoc line-break backslash -> newline",
  });

  // 7. JEE Apr06 S1 Q3 — artifact is in the SOLUTION, not the stem.
  fixes.push({
    id: JEE_Q3,
    solution: sub("solution", JEE_Q3, soln(JEE_Q3), "\\Delta k\\)\\ \\[", "\\Delta k\\)\n\\["),
    note: "solution: stray pandoc line-break backslash -> newline (stem was clean)",
  });

  // 8. JEE Apr06 S1 Q1 — CJK full stop U+3002; plus the solution's OCR "1" for
  //    the length variable "l" (the very next line uses \mathcal{l}).
  fixes.push({
    id: JEE_Q1,
    text: sub("text", JEE_Q1, stem(JEE_Q1), "。", "."),
    solution: sub("solution", JEE_Q1, soln(JEE_Q1), "{1 = 8.35", "{l = 8.35"),
    note: "stem: CJK full stop -> '.'; solution: OCR '1' -> 'l' for the length variable",
  });

  const out = join(process.cwd(), "scripts", "grounding", "data", "open-reports-2026-08-01.textfix.json");
  writeFileSync(out, JSON.stringify(fixes, null, 2) + "\n", "utf8");
  console.log(`wrote ${fixes.length} fixes -> ${out}`);
  for (const f of fixes) console.log(`  ${f.id.slice(0, 8)}  ${f.note}`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
