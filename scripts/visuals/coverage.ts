/**
 * How far animated solutions have got, per exam / subject / chapter.
 *
 *   npm run visuals:coverage                       # JEE Mains + MHT-CET (Wave 1)
 *   npm run visuals:coverage -- --exam="JEE Mains" # one exam
 *   npm run visuals:coverage -- --all              # every chapter, not just the 25 busiest
 *
 * Every PUBLIC question is animated, stale, still / none / noFit (reviewed,
 * verdict recorded in a batch file under data/), or notReviewed
 * (lib/visuals/coverage.ts). Chapters are ordered by mock answers, and the
 * "mock answers covered" share says how much of what students actually sit
 * has an animated solution. Read-only.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { verdictsFromBatchFiles } from "./batchFiles";
import { STATES, summarise, type CoverageQuestion } from "../../src/lib/visuals/coverage";

const PAGE = 1000;
const CHUNK = 150;

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const examArg = process.argv.find((a) => a.startsWith("--exam="))?.slice(7);
  const exams = examArg ? [examArg] : ["JEE Mains", "MHT-CET"];
  const showAll = process.argv.includes("--all");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  type Raw = { id: string; solution_visual?: unknown; exams: { name: string }; subjects: { name: string } | null; chapters: { name: string } | null };
  const questions = new Map<string, CoverageQuestion>();
  let hasColumn = true;
  for (let from = 0; ; from += PAGE) {
    const cols = (withVisual: boolean) => `id, ${withVisual ? "solution_visual, " : ""}exams!inner(name), subjects(name), chapters(name)`;
    const run = (withVisual: boolean) =>
      client.from("questions").select(cols(withVisual)).eq("visibility", "PUBLIC").in("exams.name", exams).order("id").range(from, from + PAGE - 1);
    let res = await run(hasColumn);
    if (res.error && /solution_visual/.test(res.error.message)) {
      hasColumn = false;
      res = await run(false);
    }
    if (res.error) throw new Error(`questions: ${res.error.message}`);
    const rows = res.data as unknown as Raw[];
    for (const r of rows) {
      questions.set(r.id, {
        id: r.id,
        exam: r.exams.name,
        subject: r.subjects?.name ?? "?",
        chapter: r.chapters?.name ?? "?",
        solution: null,
        visual: r.solution_visual ?? null,
        answers: 0,
      });
    }
    if (rows.length < PAGE) break;
  }

  // The solution text only for questions that carry a visual: it decides "stale".
  const withVisual = [...questions.values()].filter((q) => q.visual !== null).map((q) => q.id);
  for (let i = 0; i < withVisual.length; i += CHUNK) {
    const { data, error } = await client.from("questions").select("id, solution").in("id", withVisual.slice(i, i + CHUNK));
    if (error) throw new Error(`solutions: ${error.message}`);
    for (const r of data as { id: string; solution: string | null }[]) questions.get(r.id)!.solution = r.solution;
  }

  // Mock answers per question (paged: the table is far past PostgREST's 1000-row cap).
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client.from("attempt_answers").select("question_id").order("attempt_id").order("question_id").range(from, from + PAGE - 1);
    if (error) throw new Error(`attempt_answers: ${error.message}`);
    for (const r of data as { question_id: string }[]) {
      const q = questions.get(r.question_id);
      if (q) q.answers++;
    }
    if (data.length < PAGE) break;
  }

  const s = summarise([...questions.values()], verdictsFromBatchFiles());
  if (!hasColumn) console.log("note: migration 0184 is not applied to this database yet; every question reads as having no visual.\n");
  const head = ["chapter".padEnd(44), "total".padStart(6), ...STATES.map((x) => x.padStart(11)), "answers".padStart(8), "covered".padStart(8)].join(" ");
  console.log(`Animated solutions: ${exams.join(" + ")}\n`);
  console.log(head);
  for (const r of showAll ? s.rows : s.rows.slice(0, 25)) {
    const name = `${r.exam === "MHT-CET" ? "CET" : r.exam === "JEE Mains" ? "JEE" : r.exam} · ${r.subject} · ${r.chapter}`.slice(0, 44);
    console.log([name.padEnd(44), String(r.total).padStart(6), ...STATES.map((x) => String(r.counts[x]).padStart(11)), String(r.answers).padStart(8), pct(r.answersCoveredShare).padStart(8)].join(" "));
  }
  if (!showAll && s.rows.length > 25) console.log(`... ${s.rows.length - 25} more chapters (--all to list them)`);
  const t = s.total;
  console.log(`\nAll ${t.total} PUBLIC questions: ${STATES.map((x) => `${x} ${t.counts[x]}`).join(" · ")}`);
  console.log(`Reviewed: ${pct(t.reviewedShare)} of questions · mock answers covered by an animated solution: ${pct(t.answersCoveredShare)}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
