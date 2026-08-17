/**
 * Build the Class-11 Unit Test 1 question paper + answer key as .docx.
 *
 *   npx tsx scripts/mh-sb-11/build-unit-test.ts            # dry run: resolve + report
 *   npx tsx scripts/mh-sb-11/build-unit-test.ts --apply    # write the .docx pair
 *   npx tsx scripts/mh-sb-11/build-unit-test.ts --apply --out=<dir>
 *
 * Output (default `generated-papers/`, gitignored + regenerable):
 *   MH_SB_11_Maths_Unit_Test_1.docx        — questions only
 *   MH_SB_11_Maths_Unit_Test_1_Key.docx    — questions + full model solutions
 *   MH_SB_11_Maths_Unit_Test_1_Slots.md    — the slot plan (see below)
 *
 * ⚠ INTERIM RENDERER — READ THIS BEFORE ASSUMING THE .docx IS THE FINISHED PAPER.
 * `buildQuestionPaper` / `buildAnswerKey` render a FLAT numbered list. They have no
 * concept of a written-paper slot: no "Q.1 (A)" heading, no "Attempt any THREE"
 * instruction, and no marks column — `docxBuilder` exports only the two flat
 * builders and none of the WrittenSlot fields (code / instruction / attempt /
 * marksEach) reach it.
 *
 * Printing the true written format needs a `buildWrittenPaper` renderer added
 * INSIDE docxBuilder — it must live there to reuse the OMML math pipeline
 * (`latexToOmml` -> `patchZip`), which is module-internal; a standalone script
 * would render this book's trigonometry as raw LaTeX. That is the missing consumer
 * for the whole src/lib/papers/written module.
 *
 * Until it exists, this script emits the 15 questions IN SLOT ORDER plus a
 * `_Slots.md` plan giving the printed-number -> slot/marks mapping, so inserting
 * the four headings by hand is mechanical rather than a puzzle.
 *
 * Read-only against the DB. Writes nothing but files.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import { downloadImage } from "@/lib/storage/images";
import { EXAM_ID } from "./config";
import { UNIT_TEST_1, UNIT_TEST_1_SLOTS, UNIT_TEST_1_TITLE, type UnitTestItem } from "./unit-test-1";

const BASE = "MH_SB_11_Maths_Unit_Test_1";
const KEY_SUFFIX =
  "Answer Key (Class 11 is not a board year — answers are the book's own or authored, and cross-checked against the Balbharati key)";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/** Resolve each (chapter, ref) to a question id, failing LOUDLY on any drift. */
async function resolveIds(client: SupabaseClient): Promise<Map<UnitTestItem, string>> {
  const { data: subjects, error: sErr } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", "Mathematics");
  if (sErr) throw new Error(`subject read failed: ${sErr.message}`);
  const subjectId = subjects?.[0]?.id;
  if (!subjectId) throw new Error("Mathematics subject not found for mh-sb-11");

  const { data: chapters, error: cErr } = await client
    .from("chapters")
    .select("id, name")
    .eq("subject_id", subjectId);
  if (cErr) throw new Error(`chapter read failed: ${cErr.message}`);
  const chapterId = new Map((chapters ?? []).map((c) => [c.name as string, c.id as string]));

  const out = new Map<UnitTestItem, string>();
  const missing: string[] = [];
  for (const item of UNIT_TEST_1) {
    const cid = chapterId.get(item.chapter);
    if (!cid) {
      missing.push(`${item.chapter} / ${item.ref} (chapter not in bank)`);
      continue;
    }
    const { data, error } = await client
      .from("questions")
      .select("id")
      .eq("chapter_id", cid)
      .eq("question_number", item.ref)
      .eq("visibility", "PUBLIC");
    if (error) throw new Error(`question read failed for ${item.ref}: ${error.message}`);
    if (!data || data.length !== 1) {
      missing.push(`${item.chapter} / ${item.ref} (matched ${data?.length ?? 0} PUBLIC rows)`);
      continue;
    }
    out.set(item, data[0].id as string);
  }
  if (missing.length) {
    throw new Error(
      `selection drift — these picks no longer resolve to exactly one PUBLIC row:\n  ` +
        missing.join("\n  ") +
        `\nFix scripts/mh-sb-11/unit-test-1.ts.`
    );
  }
  return out;
}

async function fetchImageBytes(client: SupabaseClient, questions: QuestionRow[]) {
  const paths = new Set<string>();
  for (const q of questions) {
    if (q.imageUrl) paths.add(q.imageUrl);
    if (q.solutionImageUrl) paths.add(q.solutionImageUrl);
    for (const opt of q.options) if (opt.imageUrl) paths.add(opt.imageUrl);
  }
  const out = new Map<string, Buffer>();
  await Promise.all(
    Array.from(paths).map(async (p) => {
      try {
        out.set(p, await downloadImage(client, p));
      } catch (err) {
        console.warn(`  ! image fetch failed ${p}: ${err instanceof Error ? err.message : err}`);
      }
    })
  );
  return out;
}

/** The hand-assembly plan: which printed numbers belong to which slot. */
function slotPlan(rows: QuestionRow[], order: UnitTestItem[]): string {
  const L: string[] = [];
  L.push(`# ${UNIT_TEST_1_TITLE}`);
  L.push("");
  L.push("**25 marks · 60 minutes · pattern `mh-sb-11-maths-unit-25`**");
  L.push("");
  L.push(
    "The .docx renders a FLAT numbered list — the export layer has no written-paper " +
      "renderer yet (see the header of build-unit-test.ts). Insert these four headings " +
      "at the printed positions below and the paper is in format."
  );
  L.push("");
  let n = 0;
  let total = 0;
  for (const slot of UNIT_TEST_1_SLOTS) {
    const items = order.filter((i) => i.slot === slot.key);
    const from = n + 1;
    n += items.length;
    const marks = slot.attempt * slot.marksEach;
    total += marks;
    L.push(`## ${slot.code} — printed questions ${from}–${n}  ·  ${marks} marks`);
    L.push("");
    L.push(`*${slot.label}.*${slot.instruction ? ` **${slot.instruction}.**` : ""}`);
    L.push("");
    L.push(`Prints ${slot.print}, student answers ${slot.attempt}, ${slot.marksEach} mark(s) each.`);
    L.push("");
    L.push("| Printed # | Chapter | Book ref | Difficulty |");
    L.push("|---|---|---|---|");
    items.forEach((it, k) => {
      const row = rows[from - 1 + k];
      L.push(`| ${from + k} | ${it.chapter} | ${it.ref} | ${row?.difficulty ?? "?"} |`);
    });
    L.push("");
  }
  L.push(`**Total: ${total} marks.**`);
  L.push("");
  return L.join("\n");
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const outDir = arg("out") ?? join(process.cwd(), "generated-papers");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required");
  const client = createClient(url, key, { auth: { persistSession: false } });

  const idByItem = await resolveIds(client);
  const ordered = [...UNIT_TEST_1];
  const ids = ordered.map((i) => idByItem.get(i)!);

  // queryQuestionsByIds returns rows in the ORDER OF THE IDS PASSED, which is what
  // preserves slot order here — do not sort the result.
  const rows = await queryQuestionsByIds(client, ids);
  if (rows.length !== ids.length) {
    throw new Error(`expected ${ids.length} rows, got ${rows.length}`);
  }

  console.log(`${UNIT_TEST_1_TITLE}\n`);
  let n = 0;
  for (const slot of UNIT_TEST_1_SLOTS) {
    const items = ordered.filter((i) => i.slot === slot.key);
    console.log(
      `  ${slot.code}  ${items.length} printed / ${slot.attempt} attempted x ${slot.marksEach}` +
        ` = ${slot.attempt * slot.marksEach} marks`
    );
    for (const it of items) {
      n += 1;
      console.log(`      ${String(n).padStart(2)}. ${it.chapter.padEnd(28)} ${it.ref}`);
    }
  }
  const totalMarks = UNIT_TEST_1_SLOTS.reduce((s, x) => s + x.attempt * x.marksEach, 0);
  console.log(`\n  total ${n} printed questions, ${totalMarks} marks`);

  const mcq = rows.filter((r) => r.questionFormat === "mcq").length;
  const withSol = rows.filter((r) => r.solution).length;
  console.log(`  ${mcq} MCQ (keys) · ${rows.length - mcq} subjective · ${withSol} carry a solution`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write the .docx pair + slot plan.");
    return;
  }

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const imageBytes = await fetchImageBytes(client, rows);

  const paper = await buildQuestionPaper({ title: UNIT_TEST_1_TITLE, questions: rows, imageBytes });
  writeFileSync(join(outDir, `${BASE}.docx`), paper);

  const keyDoc = await buildAnswerKey({
    title: `${UNIT_TEST_1_TITLE} · ${KEY_SUFFIX}`,
    questions: rows,
    includeSolutions: true,
    imageBytes,
  });
  writeFileSync(join(outDir, `${BASE}_Key.docx`), keyDoc);
  writeFileSync(join(outDir, `${BASE}_Slots.md`), slotPlan(rows, ordered), "utf8");

  console.log(`\nwrote:\n  ${BASE}.docx\n  ${BASE}_Key.docx\n  ${BASE}_Slots.md\nin ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
