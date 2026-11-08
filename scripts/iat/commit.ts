/**
 * Commit one IAT year (all four subjects) as PRIVATE `pyq` rows, with figures.
 *
 *   npx tsx scripts/iat/commit.ts 2025            # dry run: every check, nothing written
 *   npx tsx scripts/iat/commit.ts 2025 --apply
 *
 * Refuses on ANY issue assemblePaper raises (an unread disagreement, a keyed
 * year whose (a)-is-correct format is unconfirmed, a no-key year without its
 * second solver), on a missing crop, and on a paper already PUBLIC. Run
 * seed.ts first: commitStaged refuses an unknown subject.
 *
 * One source file per year, numbered 1..N across the subjects (numberAcrossPaper).
 * After the insert, solution, difficulty and figures are synced onto THIS
 * paper's rows by content_hash, so a solution fix is a re-run. A no-key year is
 * stamped derived_model. Rollback: delete from questions where source_file =
 * '<sourceFile(year)>'.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { commitStaged } from "../../src/lib/upload/commit";
import { contentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import {
  assemblePaper, numberAcrossPaper, paperIssues, stemFigureFile,
  type Adjudication, type AssembledRow, type DerivedEntry, type IatPaper,
} from "./lib";
import {
  CREATED_BY, DERIVED_MODEL, EXAM_NAME, ORG_ID, PYQ_NOTE, SUBJECTS,
  blindDir, dataDir, figureDir, iatYear, sourceFile, type IatSubject,
} from "./config";

const DIFF = { Easy: "EASY", Moderate: "MODERATE", Hard: "HARD" } as const;
const read = <T>(p: string): T | undefined => (existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : undefined);
/** The kept copy in data/ first, else the solver's blind folder. */
const derivation = (stem: string, second: boolean) =>
  read<{ answers: DerivedEntry[] }>(join(dataDir(), `${stem}.${second ? "second" : "derived"}.json`)) ??
  read<{ answers: DerivedEntry[] }>(join(blindDir(second ? `${stem}-second` : stem), "derived.json"));

type Planned = { subject: IatSubject; stem: string; row: AssembledRow; n: number };

async function main() {
  const yearArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
  const year = iatYear(Number(yearArg));
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const issues: string[] = [];
  const papers: { subject: IatSubject; stem: string; rows: AssembledRow[] }[] = [];
  for (const subject of SUBJECTS) {
    const stem = `${year.year}-${subject}`;
    const paper = read<IatPaper>(join(dataDir(), `${stem}.questions.json`));
    if (!paper) {
      issues.push(`${stem}: no transcription`);
      continue;
    }
    issues.push(...paperIssues(paper));
    const derived = derivation(stem, false);
    if (!derived) {
      issues.push(`${stem}: no derivation`);
      continue;
    }
    const adj = read<{ adjudications: Adjudication[] }>(join(dataDir(), `${stem}.adjudication.json`));
    const res = assemblePaper({
      paper, year, derived: derived.answers, second: derivation(stem, true)?.answers, adjudications: adj?.adjudications,
    });
    issues.push(...res.issues);
    papers.push({ subject, stem, rows: res.rows });
  }

  const planned: Planned[] = numberAcrossPaper(papers).map((x) => ({
    subject: x.subject, stem: `${year.year}-${x.subject}`, row: x.row, n: x.n,
  }));
  const figures = (p: Planned) => [
    ...(p.row.figure && p.row.figure.required !== false ? [{ file: stemFigureFile(p.row.ref), watermark: p.row.figure.watermark }] : []),
    ...p.row.options.flatMap((o) => (o.figureFile ? [{ file: o.figureFile, watermark: o.figureWatermark }] : [])),
  ];
  const files = (p: Planned) => figures(p).map((f) => f.file);
  for (const p of planned) {
    for (const f of figures(p)) {
      const path = join(figureDir(p.stem), f.file);
      if (!existsSync(path)) {
        issues.push(`${p.stem} ${f.file}: not cropped`);
        continue;
      }
      const wm = figureWatermarkIssue(`${p.stem} ${f.file}`, await checkFigureFile(path), f.watermark);
      if (wm) issues.push(wm);
    }
  }

  const payload: ParsedRowPayload[] = planned.map((p) => ({
    sourceRow: p.n,
    questionNumber: String(p.n),
    subjectName: p.subject,
    chapterName: p.row.chapter,
    subtopicName: p.row.subtopic,
    text: p.row.text,
    ...(p.row.context ? { context: p.row.context } : {}),
    difficulty: DIFF[p.row.difficulty],
    solution: p.row.solution,
    questionFormat: "mcq",
    options: p.row.options.map((o) => ({ label: o.label, text: o.text, isCorrect: o.isCorrect })),
    contentHash: contentHash(p.row.text, p.row.options.map((o) => o.text), p.row.answer),
  }));
  if (new Set(payload.map((p) => p.contentHash)).size !== payload.length) {
    issues.push("two rows share a content_hash; one would be silently dropped");
  }

  const src = sourceFile(year.year);
  const perSubject = SUBJECTS.map((s) => `${s} ${planned.filter((p) => p.subject === s).length}`).join(" | ");
  console.log(`IAT ${year.year}: ${payload.length} rows (${perSubject})  source_file="${src}"`);
  console.log(`  key: ${year.keyMode === "none" ? "none; two solvers, derived_model stamped" : "IISER's (printed (a))"}`);
  console.log(`  figure files: ${planned.reduce((n, p) => n + files(p).length, 0)}`);
  console.log(`  grace in mocks: ${planned.filter((p) => p.row.grace).map((p) => `${p.subject} ${p.row.ref}`).join(", ") || "none"}`);
  console.log(`  answers by slot: ${["A", "B", "C", "D"].map((l) => `${l} ${planned.filter((p) => p.row.answer === l).length}`).join(", ")}`);
  if (issues.length) {
    console.error(`REFUSING: ${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }
  if (!apply) return console.log("\nDRY RUN: pass --apply to write.");

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" missing: run seed.ts --apply first`);
  const examId = exam.id as string;
  const { count: live } = await client
    .from("questions").select("id", { count: "exact", head: true })
    .eq("exam_id", examId).eq("source_file", src).eq("visibility", "PUBLIC");
  if ((live ?? 0) > 0) throw new Error(`${live} row(s) of ${src} are PUBLIC; refusing to re-commit a live paper`);

  const res = await commitStaged(client, {
    orgId: ORG_ID, examId, filename: src, createdBy: CREATED_BY, rows: payload,
    pyqYear: year.year, pyqMonth: null, pyqNote: PYQ_NOTE, visibility: "PRIVATE", questionKind: "pyq",
  });
  console.log(`inserted ${res.inserted} | skipped ${res.skipped} | failed ${res.failed}`);
  for (const e of res.errors) console.log(`  row ${e.sourceRow}: ${e.message}`);
  if (res.failed) process.exit(1);

  const ids = await sync(client, examId, src, planned, payload);
  recordGrace(year.year, planned, ids);
  if (year.keyMode === "none") {
    const { error, count } = await client
      .from("questions")
      .update({ derived_model: DERIVED_MODEL, derived_at: new Date().toISOString() }, { count: "exact" })
      .eq("exam_id", examId).eq("source_file", src);
    if (error) throw new Error(`derived stamp failed: ${error.message}`);
    console.log(`stamped ${count} row(s) derived_model`);
  }
}

/** Solution, difficulty, question figure and option pictures onto THIS paper's rows, by content_hash. */
async function sync(
  client: SupabaseClient, examId: string, src: string, planned: Planned[], payload: ParsedRowPayload[]
): Promise<Map<number, string>> {
  const ids = new Map<number, string>();
  const { data, error } = await client
    .from("questions")
    .select("id, content_hash, image_url, options(id, label, image_url)")
    .eq("exam_id", examId).eq("source_file", src);
  if (error) throw new Error(`row lookup failed: ${error.message}`);
  const byHash = new Map((data ?? []).map((q) => [q.content_hash as string, q]));
  const put = (path: string) => uploadImage(client, ORG_ID, readFileSync(path), "image/png");
  let synced = 0;
  let uploaded = 0;
  for (const [i, p] of planned.entries()) {
    const q = byHash.get(payload[i].contentHash);
    if (!q) {
      console.log(`  ${p.stem} ${p.row.ref}: deduped into a row outside this paper; left as it is`);
      continue;
    }
    ids.set(p.n, q.id as string);
    const update: Record<string, string> = { solution: payload[i].solution!, difficulty: payload[i].difficulty };
    if (p.row.figure && p.row.figure.required !== false && !q.image_url) {
      update.image_url = await put(join(figureDir(p.stem), stemFigureFile(p.row.ref)));
      uploaded++;
    }
    const { error: uErr } = await client.from("questions").update(update).eq("id", q.id);
    if (uErr) throw new Error(`${p.stem} ${p.row.ref}: sync failed: ${uErr.message}`);
    for (const o of p.row.options) {
      if (!o.figureFile) continue;
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((x) => x.label === o.label);
      if (!opt) throw new Error(`${p.stem} ${p.row.ref}: no option ${o.label}`);
      if (opt.image_url) continue;
      const { error: oErr } = await client
        .from("options").update({ image_url: await put(join(figureDir(p.stem), o.figureFile)) }).eq("id", opt.id);
      if (oErr) throw new Error(`${p.stem} ${p.row.ref} option ${o.label}: ${oErr.message}`);
      uploaded++;
    }
    synced++;
  }
  console.log(`synced ${synced} row(s); ${uploaded} picture(s) uploaded; ${(data ?? []).length} row(s) under "${src}"`);
  return ids;
}

/**
 * A question defective as printed is grace in every mock (owner policy 2026-10-29): its id goes
 * in src/lib/mocks/flawed.json, the one list the mock builders read. Idempotent; commit the file.
 */
function recordGrace(year: number, planned: Planned[], ids: Map<number, string>) {
  const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
  const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
  const known = new Set(list.map((f) => f.id));
  let added = 0;
  for (const p of planned.filter((x) => x.row.grace)) {
    const id = ids.get(p.n);
    if (!id || known.has(id)) continue;
    list.push({ id, reason: `IAT ${year} ${p.subject} Q${p.row.ref}: defective as printed (scripts/iat/data/${p.stem}.adjudication.json)` });
    added++;
  }
  if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
  console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
