/**
 * Aggregate every textbook-defect flag across ALL State Board chapters into one
 * errata report — the list of question/answer-key errors to send back to the
 * publisher (Balbharati).
 *
 *   npx tsx scripts/mh-sb-9/errata.ts            # print the report to stdout
 *   npx tsx scripts/mh-sb-9/errata.ts --write    # also write generated-papers/StateBoard_Errata.md
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
import { EXAM_ID } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = {
  question_number: string | null;
  question_format: string;
  text: string;
  solution: string;
  chapter: { name: string } | null;
};

/**
 * Defects that live in the book's THEORY PROSE, not in a question — so there is
 * no `solution` to carry a `[Textbook ...]` bracket. Recorded here by hand so the
 * publisher-facing report is complete; forcing one onto the nearest question's
 * model answer would put an unrelated note in front of a student.
 * Each entry must be verified on the RENDERED page (the text layer strips this
 * book's vector-drawn radicals), and cite the printed page number.
 */
const THEORY_ERRATA: { chapter: string; where: string; type: string; issue: string }[] = [
  {
    chapter: "Real Numbers",
    where: "p.29, 'Rationalization of surd' theory",
    type: "Misprint",
    issue:
      "The book states \"√6, √16 √50 are the rationalizing factors of √2\". Only √50 is one " +
      "(√2·√50 = 10); √2·√6 = 2√3 and √2·√16 = 4√2 are both irrational. The intended list is " +
      "presumably √8, √18, √50. (A comma between √16 and √50 is also missing.)",
  },
];

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
  const { data, error } = await c
    .from("questions")
    .select("question_number, question_format, text, solution, chapter:chapters!chapter_id(name)")
    .eq("exam_id", EXAM_ID)
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

  type Item = { chapter: string; question: string; type: string; issue: string };
  const items: Item[] = rows.map((r) => ({
    chapter: r.chapter?.name ?? "(unknown)",
    question: r.question_number ?? "—",
    type: categorize(r.flag!),
    issue: r.flag!,
  }));
  for (const t of THEORY_ERRATA) {
    items.push({ chapter: t.chapter, question: t.where, type: t.type, issue: t.issue });
  }
  items.sort((a, b) => a.chapter.localeCompare(b.chapter) || a.question.localeCompare(b.question));

  const byChapter = new Map<string, Item[]>();
  for (const r of items) {
    (byChapter.get(r.chapter) ?? byChapter.set(r.chapter, []).get(r.chapter)!).push(r);
  }

  const L: string[] = [];
  L.push("# Maharashtra State Board — Textbook Errata");
  L.push("");
  L.push(`Compiled from the PYQ Vault question bank. **${items.length} flagged item(s)** across ${byChapter.size} chapter(s).`);
  L.push("Each entry is a misprint in the question, an error in the printed answer key, or a defect in the chapter's theory prose, found while authoring/verifying model solutions.");
  L.push("");
  const misprint = items.filter((r) => r.type === "Misprint" || r.type === "Error").length;
  const ak = items.filter((r) => r.type === "Answer-key").length;
  L.push(`- Question misprints: **${misprint}**`);
  L.push(`- Answer-key errors: **${ak}**`);
  L.push("");
  for (const [ch, chapterItems] of byChapter) {
    L.push(`## ${ch}  (${chapterItems.length})`);
    L.push("");
    L.push("| Question | Type | Issue |");
    L.push("|---|---|---|");
    for (const r of chapterItems) {
      const q = r.question.replace(/\|/g, "\\|");
      const issue = r.issue.replace(/\s+/g, " ").replace(/\|/g, "\\|");
      L.push(`| ${q} | ${r.type} | ${issue} |`);
    }
    L.push("");
  }
  const md = L.join("\n");
  console.log(md);

  if (write) {
    const dir = join(process.cwd(), "generated-papers");
    mkdirSync(dir, { recursive: true });
    const p = join(dir, "StateBoard_Errata.md");
    writeFileSync(p, md, "utf8");
    console.error(`\n[written] ${p}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
