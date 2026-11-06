// Build the evidence for one exam-twin run: the exam questions to match (the
// reference every agent reads in full) and the board questions, split into
// slices (one agent each). Runbook: scripts/cross-exam/README.md.
//
//   npx tsx scripts/cross-exam/prep.ts --plan=scripts/cross-exam/pairs/<plan>.json --run=<slug> [--slices=N] [--force]
//
// Plan mode (the normal way) reads the run's chapters from the plan and prepares
// ONLY the comparisons no settled run has made (src/lib/crossExam/pending.ts):
// the first time, the whole chapter; after an ingest, just the new questions
// against the other side. Prints "nothing to do" when every comparison is made.
// When the work comes in more than one part (both sides got new questions), it
// prepares part 1; settle and commit it, then run prep again for the next.
// Writes the same evidence to generated-papers/cross-exam/<slug>-a and -b (the
// two passes): evidence/target.md, evidence/board-<n>.md, evidence/ids.json
// (what settle.ts records as read) and an empty out/. Refuses to overwrite a
// folder that already holds agent drafts unless --force.
//
//   npx tsx scripts/cross-exam/prep.ts --target="Exam|Subject|Chapter" [...] --board="Exam|Subject|Chapter" [...] --out=<dir>
//
// Ad-hoc mode: every question of the chapters, one folder, no plan. For trials only.
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { twinPaper } from "@/lib/crossExam/paper";
import { pendingWork, type IdSets } from "@/lib/crossExam/pending";
import type { ChapterRef } from "@/lib/crossExam/settled";
import { WORK_DIR, chapterRows, currentIds, doneSets, planRun, readPlan, runRefs, serviceClient } from "./bank";

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

function hasDrafts(dir: string): boolean {
  const out = join(dir, "out");
  return existsSync(out) && readdirSync(out).some((f) => f.endsWith(".json"));
}

async function main() {
  const args = process.argv.slice(2);
  const value = (k: string) => args.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
  const slices = Number(value("slices") ?? 0) || 0;
  const force = args.includes("--force");
  const c = serviceClient();

  let targets: ChapterRef[];
  let boards: ChapterRef[];
  let dirs: string[];
  let only: IdSets | null = null;
  const planPath = value("plan");
  if (planPath) {
    const slug = value("run");
    if (!slug) throw new Error("--plan needs --run=<slug>");
    const plan = readPlan(planPath);
    ({ targets, board: boards } = runRefs(plan, planRun(plan, slug)));
    const parts = pendingWork(await currentIds(c, { targets, board: boards }), doneSets(slug));
    if (parts.length === 0) {
      console.log(`${slug}: nothing to do, every comparison is already made`);
      return;
    }
    only = parts[0];
    const later = parts.slice(1).map((p, i) => `part ${i + 2}: ${p.targets.length} exam x ${p.board.length} board`);
    console.log(`${slug}: part 1 of ${parts.length} (${only.targets.length} exam x ${only.board.length} board)${later.length ? `; after it is committed, run prep again for ${later.join("; ")}` : ""}`);
    dirs = [join(WORK_DIR, `${slug}-a`), join(WORK_DIR, `${slug}-b`)];
  } else {
    targets = args.filter((a) => a.startsWith("--target=")).map((a) => parseRef(a.slice(9)));
    boards = args.filter((a) => a.startsWith("--board=")).map((a) => parseRef(a.slice(8)));
    if (targets.length === 0 || boards.length === 0)
      throw new Error("usage: prep.ts --plan=<plan.json> --run=<slug>, or --target=Exam|Subject|Chapter [...] --board=Exam|Subject|Chapter [...] --out=<dir>");
    const t0 = targets[0];
    dirs = [value("out") ?? join(WORK_DIR, `${t0.exam}-${t0.chapter}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"))];
  }
  for (const d of dirs) {
    if (hasDrafts(d) && !force) throw new Error(`${d}/out holds agent drafts; settle them first, or pass --force to start over`);
  }

  // The exam side: past questions only, chapter by chapter, grouped by subtopic, oldest first.
  const tq: { r: Row; chapter: string }[] = [];
  for (const ref of targets) {
    const rows = (await chapterRows<Row>(c, ref, true, SELECT)).filter((r) => !only || only.targets.includes(r.id));
    rows.sort((a, b) => (a.subtopic?.name ?? "").localeCompare(b.subtopic?.name ?? "") || (a.pyq_year ?? 0) - (b.pyq_year ?? 0));
    tq.push(...rows.map((r) => ({ r, chapter: ref.chapter })));
  }
  const target = targets[0];
  let t = `# ${target.exam} | ${target.subject} | ${targets.map((x) => x.chapter).join(" + ")} | ${tq.length} past questions (reference)\n\n`;
  for (const { r, chapter } of tq) {
    const paper = twinPaper(target.exam, r.pyq_year ?? 0, r.pyq_month, r.pyq_note).paper;
    t += `${item(r, `${paper} | ${targets.length > 1 ? `${chapter}: ` : ""}${r.subtopic?.name ?? "-"}`)}\n`;
  }

  // The board side: each chapter's book questions in book order, then its board papers.
  const board: { r: Row; src: string }[] = [];
  for (const ref of boards) {
    const rows = (await chapterRows<Row>(c, ref, false, SELECT)).filter((r) => !only || only.board.includes(r.id));
    const book = rows.filter((r) => r.question_kind !== "pyq").sort((a, b) => (a.section_seq ?? 0) - (b.section_seq ?? 0));
    const papers = rows.filter((r) => r.question_kind === "pyq").sort((a, b) => (a.pyq_year ?? 0) - (b.pyq_year ?? 0));
    for (const r of book) board.push({ r, src: `${ref.exam} textbook | ${r.section_label ?? "-"} ${r.question_number ?? "?"}` });
    for (const r of papers) board.push({ r, src: `${ref.exam} board paper ${r.pyq_month ?? ""} ${r.pyq_year} ${r.question_number ?? "?"}` });
  }
  // --slices=N, or about 135 board questions a slice (one agent each; the calibration's size).
  const n = slices > 0 ? slices : Math.max(1, Math.ceil(board.length / 135));
  const size = Math.ceil(board.length / n);
  const ids: IdSets = { targets: tq.map((x) => x.r.id), board: board.map((x) => x.r.id) };

  for (const out of dirs) {
    rmSync(out, { recursive: true, force: true });
    mkdirSync(join(out, "evidence"), { recursive: true });
    mkdirSync(join(out, "out"), { recursive: true });
    writeFileSync(join(out, "evidence/target.md"), t);
    for (let i = 0; i < n; i++) {
      const part = board.slice(i * size, (i + 1) * size);
      let s = `# Board ${target.subject} | slice ${i + 1} of ${n} | ${part.length} questions\n\n`;
      for (const { r, src } of part) s += `${item(r, `${src} | ${r.question_format}`)}\n`;
      writeFileSync(join(out, `evidence/board-${i + 1}.md`), s);
    }
    writeFileSync(join(out, "evidence/ids.json"), `${JSON.stringify(ids)}\n`);
  }
  console.log(`${dirs.join(" + ")}: ${tq.length} ${target.exam} past questions; ${board.length} board questions in ${n} slices`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
