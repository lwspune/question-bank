/**
 * Commit reviewed ENEM years into the bank, PRIVATE, then attach their figures.
 *
 *   npx tsx scripts/enem/commit.ts 2025            # dry run: check, write nothing
 *   npx tsx scripts/enem/commit.ts 2025 --apply
 *   npx tsx scripts/enem/commit.ts all --apply     # every year in config.ts YEARS
 *
 * Reads data/<year>.questions.json (the reviewed transcription, assembled by
 * assemble.py) with INEP's key (data/<year>.key.json), and for a question with a
 * figure, C:\Vilas\LWS_Pune\ENEM\figures\<year>_q<n>.png (crop.py).
 *
 * PRIVATE AT INSERT: commitStaged writes `visibility` with the row, so no ENEM
 * question is public until the go-public step (rows flipped, noPublicContent
 * dropped from the registry entry, the intl home updated).
 *
 * Every row carries pyq_note "ENEM <year>, 2º dia, caderno 7" (pyqNoteFor). A
 * question INEP cancelled is stored keyless with its notice (cancelledNote); one
 * defective as printed that INEP did not cancel (data/flawed.json) keeps INEP's
 * key and goes on src/lib/mocks/flawed.json, so it is grace in every mock.
 *
 * Refuses to write while the year fails check.ts. Rollback is by source_file:
 * every row carries the paper's filename.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { uploadImage } from "../../src/lib/storage/images";
import { CREATED_BY, EXAM_NAME, ORG_ID, PYQ_MONTH, YEARS } from "./config";
import { buildRow, pyqNoteFor } from "./lib";
import { checkPaper, figurePath, loadPaper } from "./check";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Flawed = Record<string, Record<string, string>>;
function flawedFor(year: number): Map<number, string> {
  const all = JSON.parse(readFileSync(join(__dirname, "data", "flawed.json"), "utf8")) as Flawed;
  return new Map(Object.entries(all[String(year)] ?? {}).map(([n, why]) => [Number(n), why]));
}

async function commitYear(client: SupabaseClient | null, year: number, examId: string | null): Promise<void> {
  const { paper, key } = loadPaper(year);
  const day = paper.day ?? 2;
  const errors = checkPaper(year);
  const rows = errors.length ? [] : paper.questions.map((q) => buildRow(year, q, key[String(q.n)], { day }));
  const figures = paper.questions.filter((q) => q.figure || q.option_figures).map((q) => q.n);
  const cancelled = Object.entries(key).filter(([, v]) => v === "ANULADO").map(([n]) => n);
  const flawed = flawedFor(year);

  console.log(
    `\nENEM ${year}  ${paper.source_file}  ${paper.questions.length} questions, ${figures.length} figure(s), ` +
      `cancelled [${cancelled.join(", ")}], flawed [${[...flawed.keys()].join(", ")}]  pyq_note "${pyqNoteFor(year, day)}"`
  );
  if (errors.length) {
    console.log(`CHECK: ${errors.length} problem(s)`);
    for (const e of errors.slice(0, 40)) console.log(`  - ${e}`);
    throw new Error(`ENEM ${year}: refusing to commit with problems; fix the transcription first.`);
  }
  console.log("CHECK: ok");
  if (!client || !examId) return;

  const sourceFile = paper.source_file;
  // A paper already live must not be silently re-written PRIVATE.
  const { count: publicBefore } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("source_file", sourceFile)
    .eq("visibility", "PUBLIC");
  if ((publicBefore ?? 0) > 0) {
    throw new Error(`${publicBefore} row(s) of ${sourceFile} are PUBLIC already; this script only writes PRIVATE.`);
  }

  const { data: existingJob } = await client
    .from("upload_jobs")
    .select("id")
    .eq("org_id", ORG_ID)
    .eq("filename", sourceFile)
    .limit(1)
    .maybeSingle();
  let jobId = existingJob?.id as string | undefined;
  if (!jobId) {
    const { data: job, error } = await client
      .from("upload_jobs")
      .insert({ org_id: ORG_ID, filename: sourceFile, created_by: CREATED_BY, status: "PROCESSING", total_rows: rows.length })
      .select("id")
      .single();
    if (error) throw new Error(`upload_jobs insert failed: ${error.message}`);
    jobId = job.id;
  }

  const result = await commitStaged(client, {
    orgId: ORG_ID,
    examId,
    filename: sourceFile,
    createdBy: CREATED_BY,
    rows,
    uploadJobId: jobId,
    pyqYear: year,
    pyqMonth: PYQ_MONTH,
    pyqNote: pyqNoteFor(year, day),
    visibility: "PRIVATE",
    questionKind: "pyq",
  });
  console.log(`commit: inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed}`);
  for (const e of result.errors) console.log(`  err row ${e.sourceRow}: ${e.message}`);
  if (result.skipped > 0) {
    console.log(`!! ${result.skipped} row(s) SKIPPED as duplicates (a re-run, or two questions hashing alike). Check before trusting.`);
  }

  // Every committed row of this paper, by printed number (90 rows: one read, no paging).
  const { data: committed, error: cErr } = await client
    .from("questions")
    .select("id, question_number, image_url, visibility")
    .eq("exam_id", examId)
    .eq("source_file", sourceFile);
  if (cErr) throw new Error(`read back failed: ${cErr.message}`);
  const byNumber = new Map((committed ?? []).map((r) => [Number(r.question_number), r]));

  let attached = 0;
  for (const n of figures) {
    const q = byNumber.get(n);
    if (!q) {
      console.log(`  Q${n}: no committed row, figure not attached`);
      continue;
    }
    if (q.image_url) continue;
    const path = await uploadImage(client, ORG_ID, readFileSync(figurePath(year, n)), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`Q${n} set image_url: ${uErr.message}`);
    attached++;
  }
  console.log(`figures: ${attached} attached, ${figures.length - attached} already present or missing.`);

  // Grace in every mock (owner policy 2026-10-29, case 3): src/lib/mocks/flawed.json
  // is the one list the mock builders read.
  if (flawed.size) {
    const file = join(process.cwd(), "src", "lib", "mocks", "flawed.json");
    const list: { id: string; reason: string }[] = JSON.parse(readFileSync(file, "utf8"));
    const known = new Set(list.map((f) => f.id));
    let added = 0;
    for (const [n, why] of flawed) {
      const row = byNumber.get(n);
      if (!row) throw new Error(`flawed Q${n}: no committed row`);
      if (known.has(row.id)) continue;
      list.push({ id: row.id, reason: `ENEM ${year} Q${n}: ${why} (scripts/enem)` });
      added++;
    }
    if (added) writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
    console.log(`grace: ${added} question(s) added to src/lib/mocks/flawed.json`);
  }

  const total = committed?.length ?? 0;
  const priv = (committed ?? []).filter((r) => r.visibility === "PRIVATE").length;
  await client
    .from("upload_jobs")
    .update({ status: "COMPLETED", total_rows: total, inserted: result.inserted, skipped: result.skipped, finished_at: new Date().toISOString() })
    .eq("id", jobId);
  console.log(`done: ${total} row(s) for ${sourceFile}, ${priv} PRIVATE.`);
  if (total !== paper.questions.length) console.log(`!! expected ${paper.questions.length} rows, found ${total}.`);
  if (priv !== total) console.log(`!! ${total - priv} row(s) are not PRIVATE.`);
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const which = args.find((a) => !a.startsWith("--"));
  const apply = args.includes("--apply");
  const years = which === "all" ? [...YEARS] : [Number(which)];
  for (const y of years) if (!YEARS.includes(y)) throw new Error(`year must be one of ${YEARS.join(", ")} or "all"`);

  // Check every year before writing any, so a bad year cannot leave the bank half-loaded.
  for (const y of years) await commitYear(null, y, null);
  if (!apply) {
    console.log("\n[dry run] pass --apply to write. Nothing inserted.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: exam } = await client.from("exams").select("id, pass_scope").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" not found; run scripts/enem/seed.ts --apply first`);
  if (exam.pass_scope !== "free") throw new Error(`ENEM's pass_scope is '${exam.pass_scope}', expected 'free'`);
  for (const y of years) await commitYear(client, y, exam.id as string);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
