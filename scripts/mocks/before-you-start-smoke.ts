/**
 * "Before you start" over EVERY published mock (lib/mocks/beforeYouStartServer):
 * the lines each paper's instructions page would show, grouped by exam, paper
 * and the marking that produced them, so each group can be checked by hand
 * against the exam's real scheme. Read-only.
 *
 *   npm run before-you-start:smoke
 *
 * Also lists every paper with a penalty and a blueprint that gets NO
 * multiple-choice line, so each silence is seen and judged (by design: UCEED,
 * MPSC CSAT; or a data question). Triage, exits 0 unless a read fails.
 */
import "../lib/serverOnly";
import { join } from "node:path";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getExamByName } from "@/lib/exam/examContext";
import { getBlueprint, optionCountOf } from "@/lib/mocks/blueprints";
import { loadBeforeYouStart } from "@/lib/mocks/beforeYouStartServer";
import type { MockSnapshotQuestion } from "@/lib/mocks/query";

type Row = { slug: string; paper_code: string; scope: string; questions: MockSnapshotQuestion[]; exams: { name: string } };

async function main() {
  const db = createSupabaseAdminClient();
  const rows: Row[] = [];
  for (let from = 0; ; from += 200) {
    const { data, error } = await db
      .from("mock_tests")
      .select("slug, paper_code, scope, questions, exams!inner(name)")
      .eq("status", "published")
      .order("slug")
      .range(from, from + 199);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < 200) break;
  }

  const groups = new Map<string, { n: number; example: string; lines: string[] }>();
  const skipped: string[] = [];
  for (const r of rows) {
    const examSlug = getExamByName(r.exams.name)?.slug ?? null;
    const lines = await loadBeforeYouStart(db, { questions: r.questions, paperCode: r.paper_code }, examSlug);
    const bp = examSlug ? getBlueprint(examSlug, r.paper_code) : null;
    const schemes = [...new Set(r.questions.filter((q) => !q.grace).map((q) => `${q.marks}/${q.negMarks}`))].join(" ");
    const key = `${r.exams.name} · ${r.paper_code} · options ${bp ? optionCountOf(bp) : "?"} · marks ${schemes}`;
    const g = groups.get(key) ?? { n: 0, example: r.slug, lines: lines.map((l) => `[${l.kind}] ${l.text}`) };
    const sig = lines.map((l) => `[${l.kind}] ${l.text}`);
    if (g.n > 0 && sig.join("|") !== g.lines.join("|")) g.lines.push(`  (differs on ${r.slug}: ${sig.join(" / ") || "no lines"})`);
    g.n += 1;
    groups.set(key, g);
    const hasPenalty = r.questions.some((q) => q.negMarks !== 0);
    if (bp && hasPenalty && !lines.some((l) => l.kind.startsWith("mcq_"))) skipped.push(`${r.slug} (${key})`);
  }

  for (const [key, g] of [...groups].sort()) {
    console.log(`\n${key}  ·  ${g.n} mock(s), e.g. ${g.example}`);
    for (const l of g.lines.length ? g.lines : ["(no lines)"]) console.log(`  ${l}`);
  }
  console.log(`\n${rows.length} published mocks read.`);
  if (skipped.length) {
    console.log(`\n${skipped.length} penalty paper(s) with a blueprint but no multiple-choice line (silent by design or a data question):`);
    for (const s of skipped.slice(0, 40)) console.log(`  ${s}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
