/**
 * Phase 4: load the IPMAT corpus into the bank — PRIVATE.
 *
 *   npx tsx scripts/ipmat/preflight.ts                     # ALWAYS run this first
 *   npx tsx scripts/ipmat/commit.ts                        # dry run, writes nothing
 *   npx tsx scripts/ipmat/commit.ts -- --apply
 *   npx tsx scripts/ipmat/commit.ts -- --exam=jipmat --apply
 *   npx tsx scripts/ipmat/commit.ts -- --paper=jipmat-2025-QA --apply
 *
 * Goes through the existing `commitStaged` pipeline, so taxonomy auto-create,
 * the write-boundary text guard, and dedup-by-content-hash all behave exactly
 * as they do for an admin upload. One `upload_jobs` row per paper, so a paper is
 * a first-class manageable upload and can be rolled back from /uploads.
 *
 * EVERYTHING LANDS PRIVATE. Rows default to PUBLIC since migration 0022, so the
 * flip is explicit and runs immediately after each paper. The three exams are
 * also deliberately absent from `EXAM_REGISTRY`, which is the UPSC CSE pattern:
 * even a row that somehow escaped the flip has no student-facing surface to
 * appear on.
 *
 * WHAT IT DOES NOT SHIP. The source's `difficulty` is their editorial judgement
 * about the question, not ours, so every row goes in as MODERATE rather than
 * importing their label. `pyq_note` is left EMPTY: IPMAT runs one sitting a
 * year, so `pyq_year` alone identifies it, and anything else risks publishing a
 * source blurb (see `npm run audit:provenance`). Figures are a separate,
 * idempotent pass — `attach-figures.ts`.
 *
 * Idempotent: re-running upserts on (org_id, exam_id, content_hash).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { commitStaged } from "../../src/lib/upload/commit";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { IPMAT_EXAMS, parsePaperFileName, sourceFileFor, type IpmatExamSlug } from "./config";
import { resolveTaxonomy, SECTION_SUBJECTS } from "./taxonomy";
import { ipmatContentHash } from "./hash";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");
const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f"; // admin

function arg(name: string): string | undefined {
  return process.argv.slice(2).find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

function loadEnv() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Paper = {
  exam: IpmatExamSlug;
  year: number;
  section: string;
  rows: BuiltQuestion[];
};

function loadPapers(only?: IpmatExamSlug, onlyPaper?: string): Paper[] {
  const out: Paper[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    const key = parsePaperFileName(f.replace(/\.json$/, ".html"));
    if (!key) throw new Error(`unrecognised file in data/build: ${f}`);
    if (only && key.exam !== only) continue;
    const label = `${key.exam}-${key.year}-${key.section}`;
    if (onlyPaper && label !== onlyPaper) continue;
    const all = JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[];
    const rows = all.filter((r) => !r.reconstructed && !r.dropped && r.problems.length === 0);
    if (rows.length) out.push({ ...key, rows });
  }
  return out.sort(
    (a, b) => a.exam.localeCompare(b.exam) || a.year - b.year || a.section.localeCompare(b.section)
  );
}

function buildRows(paper: Paper): ParsedRowPayload[] {
  return paper.rows.map((r) => {
    const tax = resolveTaxonomy(r.exam, r.section, r.sourceTopic, r.sourceSubTopic);
    if (!tax) {
      throw new Error(
        `${r.exam} ${r.year} ${r.section} Q${r.questionNumber}: no taxonomy for ${r.sourceTopic} > ${r.sourceSubTopic}`
      );
    }
    const answer = r.options.find((o) => o.isCorrect)?.label ?? "";
    const contentHash = ipmatContentHash({
      format: r.format,
      text: r.text,
      context: r.context,
      options: r.options.map((o) => o.text),
      answer,
    });

    const base = {
      sourceRow: r.questionNumber,
      questionNumber: String(r.questionNumber),
      subjectName: tax.subject,
      chapterName: tax.chapter,
      subtopicName: tax.subtopic,
      text: r.text,
      context: r.context ?? undefined,
      // Flat MODERATE: the source's Easy/Medium/Hard is THEIR judgement about
      // the question and is not ours to ship.
      difficulty: "MODERATE" as const,
      contentHash,
    };

    if (r.format === "numeric") {
      if (r.numericAnswer === null) {
        throw new Error(`${r.exam} ${r.year} ${r.section} Q${r.questionNumber}: numeric row with no answer`);
      }
      return {
        ...base,
        questionFormat: "numeric" as const,
        numericAnswer: Number(r.numericAnswer),
        options: [],
      };
    }

    if (!answer) {
      throw new Error(`${r.exam} ${r.year} ${r.section} Q${r.questionNumber}: MCQ with no correct option`);
    }
    return {
      ...base,
      options: r.options.map((o) => ({
        label: o.label,
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    };
  });
}

/**
 * Find-or-create the three exam rows and their nine subjects.
 *
 * Subjects do NOT auto-create in `commitStaged` (chapters and subtopics do), so
 * they have to exist before the first row lands or every row fails to resolve.
 */
async function ensureTaxonomy(
  client: SupabaseClient,
  apply: boolean
): Promise<Map<IpmatExamSlug, string>> {
  const examIds = new Map<IpmatExamSlug, string>();

  for (const exam of IPMAT_EXAMS) {
    const { data: found, error } = await client
      .from("exams")
      .select("id")
      .eq("name", exam.examName)
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`exam lookup failed for ${exam.examName}: ${error.message}`);

    let id = found?.id as string | undefined;
    if (!id) {
      if (!apply) {
        console.log(`  would CREATE exam  ${exam.examName}`);
        continue;
      }
      const { data: made, error: iErr } = await client
        .from("exams")
        .insert({ name: exam.examName })
        .select("id")
        .single();
      if (iErr) throw new Error(`exam insert failed for ${exam.examName}: ${iErr.message}`);
      id = made.id as string;
      console.log(`  created exam  ${exam.examName}  ${id}`);
    } else {
      console.log(`  exam exists   ${exam.examName}  ${id}`);
    }
    examIds.set(exam.slug, id);

    for (const subjectName of Object.values(SECTION_SUBJECTS[exam.slug])) {
      const { data: sFound, error: sErr } = await client
        .from("subjects")
        .select("id")
        .eq("exam_id", id)
        .eq("name", subjectName)
        .limit(1)
        .maybeSingle();
      if (sErr) throw new Error(`subject lookup failed for ${subjectName}: ${sErr.message}`);
      if (sFound) {
        console.log(`    subject exists  ${subjectName}`);
        continue;
      }
      if (!apply) {
        console.log(`    would CREATE subject  ${subjectName}`);
        continue;
      }
      const { error: siErr } = await client.from("subjects").insert({ exam_id: id, name: subjectName });
      if (siErr) throw new Error(`subject insert failed for ${subjectName}: ${siErr.message}`);
      console.log(`    created subject ${subjectName}`);
    }
  }

  return examIds;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const only = arg("exam") as IpmatExamSlug | undefined;
  const onlyPaper = arg("paper");
  loadEnv();

  const papers = loadPapers(only, onlyPaper);
  if (papers.length === 0) {
    console.error("no papers matched");
    process.exit(1);
  }
  const total = papers.reduce((n, p) => n + p.rows.length, 0);

  console.log(`${apply ? "LOADING" : "DRY RUN"}: ${papers.length} papers, ${total} rows -> PRIVATE\n`);

  // Build every paper's rows BEFORE touching the database, so a taxonomy or
  // answer fault stops the run with nothing written rather than halfway through.
  const planned = papers.map((p) => ({ paper: p, rows: buildRows(p) }));
  console.log(`built ${planned.reduce((n, x) => n + x.rows.length, 0)} payload rows with no faults\n`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const client = createClient(url, key, { auth: { persistSession: false } });

  console.log("taxonomy:");
  const examIds = await ensureTaxonomy(client, apply);

  if (!apply) {
    console.log("\nper paper:");
    for (const { paper, rows } of planned) {
      console.log(`  ${paper.exam} ${paper.year} ${paper.section}  ${String(rows.length).padStart(3)} rows  -> ${sourceFileFor(paper.exam, paper.year, paper.section)}`);
    }
    console.log("\n[dry run] nothing written. Pass --apply to load.");
    return;
  }

  let inserted = 0;
  let skipped = 0;
  let failed = 0;
  let madePrivate = 0;

  for (const { paper, rows } of planned) {
    const examId = examIds.get(paper.exam);
    if (!examId) throw new Error(`no exam id for ${paper.exam}`);
    const sourceFile = sourceFileFor(paper.exam, paper.year, paper.section);

    // One upload job per paper, idempotent on (org_id, filename).
    const { data: job } = await client
      .from("upload_jobs")
      .select("id")
      .eq("org_id", ORG_ID)
      .eq("filename", sourceFile)
      .limit(1)
      .maybeSingle();
    let jobId = job?.id as string | undefined;
    if (!jobId) {
      const { data: made, error } = await client
        .from("upload_jobs")
        .insert({
          org_id: ORG_ID,
          filename: sourceFile,
          created_by: CREATED_BY,
          status: "PROCESSING",
          total_rows: rows.length,
        })
        .select("id")
        .single();
      if (error) throw new Error(`upload_jobs insert failed for ${sourceFile}: ${error.message}`);
      jobId = made.id as string;
    }

    const result = await commitStaged(client, {
      orgId: ORG_ID,
      examId,
      filename: sourceFile,
      createdBy: CREATED_BY,
      rows,
      uploadJobId: jobId,
      pyqYear: paper.year,
      // Left empty on purpose: one sitting a year, so pyq_year identifies it.
    });
    inserted += result.inserted;
    skipped += result.skipped;
    failed += result.failed;

    // Flip to PRIVATE straight away — rows default to PUBLIC since 0022.
    const { count, error: vErr } = await client
      .from("questions")
      .update({ visibility: "PRIVATE" }, { count: "exact" })
      .eq("exam_id", examId)
      .eq("source_file", sourceFile)
      .eq("visibility", "PUBLIC");
    if (vErr) throw new Error(`visibility flip failed for ${sourceFile}: ${vErr.message}`);
    madePrivate += count ?? 0;

    console.log(
      `  ${paper.exam} ${paper.year} ${paper.section}  inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed} -> PRIVATE ${count ?? 0}`
    );
    for (const e of result.errors.slice(0, 5)) console.log(`      err row ${e.sourceRow}: ${e.message}`);
  }

  console.log(`\ntotal: inserted=${inserted} skipped=${skipped} failed=${failed}`);
  console.log(`flipped to PRIVATE: ${madePrivate}`);
  console.log("\nnext: npx tsx scripts/ipmat/attach-figures.ts   (figures are a separate pass)");
  console.log("then: npx tsx scripts/ipmat/verify-load.ts      (reconcile the DB against data/build)");

  if (failed > 0) process.exit(1);
}

void main();
