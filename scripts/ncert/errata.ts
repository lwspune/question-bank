/**
 * Aggregate every textbook-defect flag across ALL State Board chapters into one
 * errata report — the list of question/answer-key errors to send back to the
 * publisher (NCERT).
 *
 *   npx tsx scripts/ncert/errata.ts            # print the report to stdout
 *   npx tsx scripts/ncert/errata.ts --write    # also write generated-papers/NCERT_Errata.md
 *
 * THE CONVENTION (set during solution authoring + the answer-key cross-check):
 * a question whose model `solution` BEGINS with a `[Textbook ...]` bracket is a
 * flagged textbook defect. Two kinds, both detected here:
 *   [Textbook misprint: ...]        → the QUESTION (stem/option/target) is misprinted.
 *   [Textbook answer-key error: ...]→ the question is fine but the book's printed
 *                                     ANSWER KEY is wrong (our derived answer is correct).
 *   [Textbook answer-key note: ...] → a milder answer-key discrepancy (e.g. not fully reduced).
 * Every new chapter feeds this automatically — flag defects with the bracket, and
 * they surface here with zero extra bookkeeping. See [[textbook-chapter-ingestion]].
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { NCERT_EXAMS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = {
  question_number: string | null;
  question_format: string;
  text: string;
  solution: string;
  exam_id: string;
  chapter: { name: string } | null;
};

/** The leading `[...]` flag; assumes the bracket body carries no literal `]`. */
function extractFlag(solution: string): string | null {
  if (!solution.startsWith("[")) return null;
  const end = solution.indexOf("]");
  return end > 0 ? solution.slice(1, end).trim() : null;
}

function categorize(flag: string): string {
  const f = flag.toLowerCase();
  if (f.includes("answer-key")) return "Answer-key";
  if (f.includes("misprint")) return "Misprint";
  if (f.includes("error")) return "Error";
  return "Other";
}

async function main() {
  const write = process.argv.includes("--write");
  loadEnv();
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // PostgREST: `like` on a column that starts with a literal '['. Fetch the
  // exam's rows that have a solution, filter the bracket in JS (small set).
  // BOTH classes, always — never one with the other silently omitted. This
  // report goes to the publisher, so a Class-11 batch's defects vanishing from a
  // run that still looks complete is the failure mode to design against; a
  // `--class` flag defaulting to 12 would have exactly that shape.
  const { data, error } = await c
    .from("questions")
    .select("question_number, question_format, text, solution, exam_id, chapter:chapters!chapter_id(name)")
    .in("exam_id", NCERT_EXAMS.map((e) => e.examId))
    .not("solution", "is", null)
    .like("solution", "[Textbook%");
  if (error) throw new Error(error.message);

  const rows = ((data ?? []) as unknown as Row[])
    .map((r) => ({ ...r, flag: extractFlag(r.solution) }))
    .filter((r) => r.flag)
    .sort((a, b) =>
      (a.chapter?.name ?? "").localeCompare(b.chapter?.name ?? "") ||
      (a.question_number ?? "").localeCompare(b.question_number ?? "")
    );

  const L: string[] = [];
  L.push("# NCERT — Textbook Errata");
  L.push("");
  L.push(`Compiled from the PYQ Vault question bank. **${rows.length} flagged item(s)**.`);
  L.push("Each entry is a misprint in the question, or an error in the printed answer key, found while authoring/verifying model solutions.");
  L.push("");
  const countOf = (rs: typeof rows, kind: "misprint" | "ak") =>
    rs.filter((r) =>
      kind === "ak"
        ? categorize(r.flag!) === "Answer-key"
        : categorize(r.flag!) === "Misprint" || categorize(r.flag!) === "Error"
    ).length;
  L.push(`- Question misprints: **${countOf(rows, "misprint")}**`);
  L.push(`- Answer-key errors: **${countOf(rows, "ak")}**`);
  L.push("");

  // One section per class. A chapter name is NOT unique across classes
  // (Probability, Relations and Functions and Three Dimensional Geometry each
  // exist in both), so group by exam id and only then by chapter.
  for (const exam of NCERT_EXAMS) {
    const mine = rows.filter((r) => r.exam_id === exam.examId);
    const byChapter = new Map<string, typeof rows>();
    for (const r of mine) {
      const name = r.chapter?.name ?? "(unknown)";
      (byChapter.get(name) ?? byChapter.set(name, []).get(name)!).push(r);
    }
    L.push(`# ${exam.label}`);
    L.push("");
    // Print the zero explicitly. A class with no section at all reads as "not
    // checked"; "0 flagged items" reads as "checked and clean", and those are
    // different claims.
    L.push(
      mine.length
        ? `**${mine.length} flagged item(s)** across ${byChapter.size} chapter(s) — ` +
            `${countOf(mine, "misprint")} question misprint(s), ${countOf(mine, "ak")} answer-key error(s).`
        : "**0 flagged items.**"
    );
    L.push("");
    for (const [ch, items] of byChapter) {
      L.push(`## ${ch}  (${items.length})`);
      L.push("");
      L.push("| Question | Type | Issue |");
      L.push("|---|---|---|");
      for (const r of items) {
        const q = (r.question_number ?? "—").replace(/\|/g, "\\|");
        const issue = r.flag!.replace(/\s+/g, " ").replace(/\|/g, "\\|");
        L.push(`| ${q} | ${categorize(r.flag!)} | ${issue} |`);
      }
      L.push("");
    }
  }
  const md = L.join("\n");
  console.log(md);

  if (write) {
    const dir = join(process.cwd(), "generated-papers");
    mkdirSync(dir, { recursive: true });
    const p = join(dir, "NCERT_Errata.md");
    writeFileSync(p, md, "utf8");
    console.error(`\n[written] ${p}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
