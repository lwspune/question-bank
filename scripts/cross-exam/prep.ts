// Build the evidence for one exam-twin run: the exam chapter's past questions
// (the reference every agent reads in full) and the board chapters' questions,
// split into slices (one agent each). Runbook: scripts/cross-exam/README.md.
//
//   npx tsx scripts/cross-exam/prep.ts \
//     --target="NDA|Mathematics|Matrices & Determinants" \
//     --board="Maharashtra State Board Class 11|Mathematics|Determinants and Matrices" \
//     --board="Maharashtra HSC Class 12|Mathematics|Matrices" \
//     [--slices=3] [--out=generated-papers/cross-exam/<run>]
//
// Writes <out>/evidence/target.md and <out>/evidence/board-<n>.md, plus an empty
// <out>/out/ for the agents. Read-only against the database.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { twinPaper } from "@/lib/crossExam/paper";
import type { ChapterRef } from "@/lib/crossExam/settled";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Row = {
  id: string;
  question_number: string | null;
  text: string;
  context: string | null;
  question_format: string;
  question_kind: string;
  pyq_year: number | null;
  pyq_month: string | null;
  pyq_note: string | null;
  image_url: string | null;
  section_label: string | null;
  section_seq: number | null;
  subtopic: { name: string } | null;
  options: { label: string; text: string }[];
};

const SELECT =
  "id, question_number, text, context, question_format, question_kind, pyq_year, pyq_month, pyq_note, image_url, section_label, section_seq, subtopic:subtopics(name), options(label, text)";

function parseRef(v: string): ChapterRef {
  const [exam, subject, chapter] = v.split("|").map((s) => s.trim());
  if (!exam || !subject || !chapter) throw new Error(`expected "Exam|Subject|Chapter", got "${v}"`);
  return { exam, subject, chapter };
}

async function chapterRows(c: SupabaseClient, ref: ChapterRef, pyqOnly: boolean): Promise<Row[]> {
  const { data: ex } = await c.from("exams").select("id").eq("name", ref.exam).single();
  if (!ex) throw new Error(`no exam ${ref.exam}`);
  const { data: sub } = await c.from("subjects").select("id").eq("exam_id", ex.id).eq("name", ref.subject).single();
  if (!sub) throw new Error(`no subject ${ref.exam} / ${ref.subject}`);
  const { data: ch } = await c.from("chapters").select("id").eq("subject_id", sub.id).eq("name", ref.chapter).single();
  if (!ch) throw new Error(`no chapter ${ref.exam} / ${ref.subject} / ${ref.chapter}`);
  const out: Row[] = [];
  for (let from = 0; ; from += 1000) {
    let q = c.from("questions").select(SELECT).eq("chapter_id", ch.id).eq("visibility", "PUBLIC");
    if (pyqOnly) q = q.eq("question_kind", "pyq");
    const { data, error } = await q.order("id").range(from, from + 999);
    if (error) throw new Error(`${ref.chapter}: ${error.message}`);
    out.push(...((data ?? []) as unknown as Row[]));
    if ((data ?? []).length < 1000) break;
  }
  return out;
}

function item(r: Row, header: string): string {
  const opts = [...(r.options ?? [])]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((o) => `(${o.label}) ${o.text}`)
    .join("\n");
  return (
    `### ${r.id} | ${header}${r.image_url ? " | has a figure you cannot see" : ""}\n` +
    (r.context ? `Passage: ${r.context}\n` : "") +
    `${r.text}\n${opts ? `${opts}\n` : ""}`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const value = (k: string) => args.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
  const targetArg = value("target");
  const boardArgs = args.filter((a) => a.startsWith("--board=")).map((a) => a.slice(8));
  if (!targetArg || boardArgs.length === 0) throw new Error("usage: prep.ts --target=Exam|Subject|Chapter --board=Exam|Subject|Chapter [...] [--slices=3] [--out=dir]");
  const target = parseRef(targetArg);
  const boards = boardArgs.map(parseRef);
  const slices = Number(value("slices") ?? 3);
  const out = value("out") ?? join("generated-papers/cross-exam", `${target.exam}-${target.chapter}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  mkdirSync(join(out, "evidence"), { recursive: true });
  mkdirSync(join(out, "out"), { recursive: true });

  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  // The exam side: past questions only, grouped by subtopic, oldest first.
  const tq = await chapterRows(c, target, true);
  tq.sort((a, b) => (a.subtopic?.name ?? "").localeCompare(b.subtopic?.name ?? "") || (a.pyq_year ?? 0) - (b.pyq_year ?? 0));
  let t = `# ${target.exam} | ${target.subject} | ${target.chapter} | ${tq.length} past questions (reference)\n\n`;
  for (const r of tq) {
    const paper = twinPaper(target.exam, r.pyq_year ?? 0, r.pyq_month, r.pyq_note).paper;
    t += `${item(r, `${paper} | ${r.subtopic?.name ?? "-"}`)}\n`;
  }
  writeFileSync(join(out, "evidence/target.md"), t);

  // The board side: each chapter's book questions in book order, then its board papers.
  const board: { r: Row; src: string }[] = [];
  for (const ref of boards) {
    const rows = await chapterRows(c, ref, false);
    const book = rows.filter((r) => r.question_kind !== "pyq").sort((a, b) => (a.section_seq ?? 0) - (b.section_seq ?? 0));
    const papers = rows.filter((r) => r.question_kind === "pyq").sort((a, b) => (a.pyq_year ?? 0) - (b.pyq_year ?? 0));
    for (const r of book) board.push({ r, src: `${ref.exam} textbook | ${r.section_label ?? "-"} ${r.question_number ?? "?"}` });
    for (const r of papers) board.push({ r, src: `${ref.exam} board paper ${r.pyq_month ?? ""} ${r.pyq_year} ${r.question_number ?? "?"}` });
  }
  const size = Math.ceil(board.length / slices);
  for (let i = 0; i < slices; i++) {
    const part = board.slice(i * size, (i + 1) * size);
    let s = `# Board ${target.subject} | slice ${i + 1} of ${slices} | ${part.length} questions\n\n`;
    for (const { r, src } of part) s += `${item(r, `${src} | ${r.question_format}`)}\n`;
    writeFileSync(join(out, `evidence/board-${i + 1}.md`), s);
  }
  console.log(`${out}: ${tq.length} ${target.exam} past questions; ${board.length} board questions in ${slices} slices`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
