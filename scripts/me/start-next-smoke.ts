/**
 * Drive "Start next" (migration 0242) against live data, read-only.
 *
 *   npm run start-next:smoke
 *
 * 1. Every exam with published past papers: its top chapters by marks a paper,
 *    in the line the student reads ("about 10 questions a paper · 24 of 300
 *    marks (8%)"). A paper whose figures look wrong shows here first.
 * 2. AGREEMENT WITH THE GUIDES: the CDS Maths and MHT-CET Maths trend
 *    matrices count each chapter's questions per paper from the bank. The
 *    papers published as mocks are a subset of those sittings, so the two can
 *    differ a little, never a lot: anything more than 1.5 questions a paper
 *    apart fails the run.
 * 3. The heaviest students: what their Home card would show.
 *
 * Service role (the weights are public data; the started-chapters read here
 * bypasses RLS, which tests/start-next.integration.test.ts covers). Exits 1 on
 * any disagreement with the guides.
 */
import { join } from "node:path";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { pickStartNext, weightLine, type ChapterWeight } from "@/lib/me/startNext";
import { CHAPTER_MATRIX as CDS_MATRIX, PAPERS as CDS_PAPERS } from "@/app/guide/cds-maths/_data/matrix.generated";
import { CHAPTER_MATRIX as CET_MATRIX } from "@/app/guide/mht-cet-maths/_data/matrix.generated";
import { readAllPages } from "@/lib/supabase/readAllPages";

const TOLERANCE = 1.5;

type Row = {
  chapter_id: string;
  chapter: string;
  subject: string;
  exam: string;
  paper_code: string;
  papers: number;
  q_per_paper: string | number;
  marks_per_paper: string | number;
  paper_marks: string | number;
};

const toWeight = (r: Row): ChapterWeight => ({
  chapterId: r.chapter_id,
  chapter: r.chapter,
  subject: r.subject,
  exam: r.exam,
  paperCode: r.paper_code,
  papers: Number(r.papers),
  qPerPaper: Number(r.q_per_paper),
  marksPerPaper: Number(r.marks_per_paper),
  paperMarks: Number(r.paper_marks),
});

async function main() {
  const db = createSupabaseAdminClient();
  const { data: exams, error } = await db.from("exams").select("id, name");
  if (error) throw new Error(error.message);
  const idByName = new Map((exams ?? []).map((e) => [e.name as string, e.id as string]));
  const weightsByExam = new Map<string, ChapterWeight[]>();

  console.log("1. Top chapters by marks a paper");
  for (const exam of EXAM_REGISTRY) {
    const id = idByName.get(exam.examName);
    if (!id) continue;
    const { data, error: e } = await db.rpc("get_chapter_paper_weights", { p_exam_id: id });
    if (e) throw new Error(`${exam.slug}: ${e.message}`);
    const weights = ((data ?? []) as Row[]).map(toWeight);
    weightsByExam.set(exam.slug, weights);
    if (weights.length === 0) continue;
    const top = pickStartNext(weights, new Set(), 3);
    console.log(`  ${exam.examName} (${weights[0].papers}+ papers)`);
    for (const w of top) console.log(`    ${w.chapter} · ${w.subject}: ${weightLine(w)}`);
  }

  console.log("\n2. Agreement with the guides' trend matrices (questions a paper)");
  const broken: string[] = [];
  const compare = (label: string, slug: string, paperCode: string, rows: { chapter: string; total: number }[], papers: number) => {
    const live = new Map((weightsByExam.get(slug) ?? []).filter((w) => w.paperCode === paperCode).map((w) => [w.chapter, w.qPerPaper]));
    for (const r of rows.slice(0, 8)) {
      const guide = r.total / papers;
      const ours = live.get(r.chapter);
      const line = `  ${label} ${r.chapter}: guide ${guide.toFixed(1)}, papers ${ours === undefined ? "none" : ours.toFixed(1)}`;
      console.log(line);
      if (ours === undefined || Math.abs(ours - guide) > TOLERANCE) broken.push(line);
    }
  };
  compare("CDS Maths", "cds", "maths", CDS_MATRIX, CDS_PAPERS.length);
  compare("MHT-CET Maths", "mht-cet", "maths", CET_MATRIX, CET_MATRIX[0]?.counts.length ?? 1);

  console.log("\n3. What the heaviest students' Home card would show");
  const recent = await readAllPages<{ user_id: string }>((from, to) =>
    db
      .from("user_activity")
      .select("user_id")
      .eq("kind", "question_practiced")
      .gte("created_at", new Date(Date.now() - 7 * 86_400_000).toISOString())
      .order("id")
      .range(from, to)
      .returns<{ user_id: string }[]>()
  );
  const counts = new Map<string, number>();
  for (const r of recent) counts.set(r.user_id, (counts.get(r.user_id) ?? 0) + 1);
  const heavy = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([u]) => u);
  for (const userId of heavy) {
    const { data: prof } = await db.from("student_profiles").select("target_exams").eq("user_id", userId).maybeSingle();
    const slug = ((prof?.target_exams as string[] | null) ?? [])[0];
    const id = slug ? idByName.get(EXAM_REGISTRY.find((e) => e.slug === slug)?.examName ?? "") : undefined;
    const weights = slug ? (weightsByExam.get(slug) ?? []) : [];
    if (!id || weights.length === 0) {
      console.log(`  ${userId.slice(0, 8)} ${slug ?? "(no exam)"}: no card (no published papers)`);
      continue;
    }
    const { data: started, error: se } = await db.rpc("get_started_chapter_ids", { p_user_id: userId, p_exam_id: id });
    if (se) throw new Error(se.message);
    const set = new Set(((started ?? []) as (string | { get_started_chapter_ids: string })[]).map((r) => (typeof r === "string" ? r : r.get_started_chapter_ids)));
    const pick = pickStartNext(weights, set);
    console.log(`  ${userId.slice(0, 8)} ${slug}: ${set.size} chapters started; ${pick.length ? pick.map((w) => `${w.chapter} (${weightLine(w)})`).join("; ") : "no card"}`);
  }

  if (broken.length) {
    console.log(`\nDISAGREES WITH THE GUIDES (${broken.length}):`);
    for (const b of broken) console.log(b);
    process.exit(1);
  }
  console.log("\nOK: the papers' figures agree with the guides within 1.5 questions a paper");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
