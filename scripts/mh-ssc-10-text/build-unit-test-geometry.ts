/**
 * Build the Class-10 Geometry Unit Test 1 (Pythagoras Theorem) as .docx.
 *
 *   npx tsx scripts/mh-ssc-10-text/build-unit-test-geometry.ts            # dry run
 *   npx tsx scripts/mh-ssc-10-text/build-unit-test-geometry.ts --apply
 *   npx tsx scripts/mh-ssc-10-text/build-unit-test-geometry.ts --apply --out=<dir>
 *
 * Output (default `generated-papers/`, gitignored + regenerable):
 *   MH_SSC_10_Geometry_Unit_Test_1.docx        — questions only
 *   MH_SSC_10_Geometry_Unit_Test_1_Key.docx    — questions + full model solutions
 *   MH_SSC_10_Geometry_Unit_Test_1_Slots.md    — the assembly plan
 *
 * ⚠ THE .docx IS A FLAT NUMBERED LIST, BY DESIGN OF THE EXPORT LAYER — NOT THE
 * FINISHED PAPER. `buildQuestionPaper` has no concept of a written-paper slot: no
 * "Q.1" heading, no "Attempt any THREE of the following", no marks column. Those
 * four fields exist on `WrittenSlot` (src/lib/papers/written/types.ts) and none of
 * them reach docxBuilder, which exports only the two flat builders. Printing the
 * true written format needs a `buildWrittenPaper` INSIDE docxBuilder — it has to
 * live there to reuse the module-internal OMML pipeline (latexToOmml -> patchZip),
 * or every \triangle and \sqrt would print as raw LaTeX.
 *
 * Until that exists this emits the 13 questions IN SLOT ORDER plus a `_Slots.md`
 * plan giving printed-number -> slot/marks/instruction, so inserting the four
 * headings by hand is mechanical. Same interim arrangement as
 * scripts/mh-sb-11/build-unit-test.ts.
 *
 * FIGURES: this selection is figure-free by construction, so the answer key's
 * inability to embed question figures (see AnswerKeyInput.imageBytes — "ignored")
 * costs nothing here. That is why it is worth keeping the selection figure-free.
 *
 * Read-only against the DB. Writes nothing but files.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import {
  UNIT_TEST,
  UNIT_TEST_SLOTS,
  UNIT_TEST_TITLE,
  UNIT_TEST_INSTRUCTIONS,
  type UnitTestItem,
} from "./unit-test-geometry-1";

const BASE = "MH_SSC_10_Geometry_Unit_Test_1";
const KEY_SUFFIX = "Answer Key";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/**
 * The selection is keyed by question id (Class-10 refs are NOT unique — `Q1(A)(1)`
 * names four different questions in this chapter). So instead of resolving a ref
 * to an id, this verifies each recorded id still points at a PUBLIC row whose ref,
 * subtopic and kind match what the selection claims. Anything else is drift and
 * fails LOUDLY rather than quietly printing a different question.
 */
async function assertSelection(client: SupabaseClient): Promise<void> {
  const ids = UNIT_TEST.map((i) => i.id);
  const dupes = ids.filter((id, k) => ids.indexOf(id) !== k);
  if (dupes.length) throw new Error(`the same question is selected twice: ${dupes.join(", ")}`);

  const { data, error } = await client
    .from("questions")
    .select("id, question_number, question_kind, visibility, subtopics(name)")
    .in("id", ids);
  if (error) throw new Error(`verification read failed: ${error.message}`);

  const live = new Map(
    ((data ?? []) as unknown as {
      id: string; question_number: string | null; question_kind: string; visibility: string; subtopics: { name: string } | null;
    }[]).map((r) => [r.id, r])
  );

  const problems: string[] = [];
  for (const it of UNIT_TEST) {
    const r = live.get(it.id);
    if (!r) {
      problems.push(`${it.slot}.${it.ord} ${it.ref}: id ${it.id} no longer exists`);
      continue;
    }
    if (r.visibility !== "PUBLIC") problems.push(`${it.slot}.${it.ord} ${it.ref}: is ${r.visibility}, not PUBLIC`);
    if (r.question_number !== it.ref) problems.push(`${it.slot}.${it.ord}: ref drifted "${it.ref}" -> "${r.question_number}"`);
    if (r.question_kind !== it.kind) problems.push(`${it.slot}.${it.ord} ${it.ref}: kind drifted "${it.kind}" -> "${r.question_kind}"`);
    if (r.subtopics?.name !== it.subtopic) problems.push(`${it.slot}.${it.ord} ${it.ref}: subtopic drifted "${it.subtopic}" -> "${r.subtopics?.name}"`);
  }
  if (problems.length) {
    throw new Error(`SELECTION DRIFT — fix scripts/mh-ssc-10-text/unit-test-geometry-1.ts:\n  ` + problems.join("\n  "));
  }
}

/**
 * Two of the four MCQs are sub-items of Problem set 2 Q.1, so they share that
 * question's `context`. On a paper that prints as
 *
 *   "Common context for questions 3-4: Some questions and their alternative
 *    answers are given. Select the correct alternative."
 *
 * which says nothing the Q.1 slot heading ("Choose the correct alternative and
 * write its alphabet") does not already say, and reads as though questions 3-4
 * are a special pair. Blank it for the PAPER only.
 *
 * Deliberately narrow: it drops ONLY this known boilerplate, matched on its own
 * wording. A context that carries real shared information — a passage, a figure
 * description, a shared "In the following, O is the centre" — must survive, or a
 * question becomes unanswerable. Anything not matching is left untouched.
 *
 * Mutates the view-model rows in memory. The DB is not touched.
 */
function stripBoilerplateContext(rows: QuestionRow[]): void {
  const BOILERPLATE = /^\s*some questions and their alternative answers are given\.?\s*select the correct alternative\.?\s*$/i;
  let dropped = 0;
  for (const r of rows) {
    if (r.context && BOILERPLATE.test(r.context)) {
      (r as { context: string | null }).context = null;
      dropped++;
    }
  }
  if (dropped) console.log(`  (dropped ${dropped} boilerplate MCQ context line(s) — duplicates the Q.1 heading)`);
}

/** Assert the printed shape actually adds up to the marks it claims. */
function assertBlueprint(): number {
  let total = 0;
  for (const slot of UNIT_TEST_SLOTS) {
    const n = UNIT_TEST.filter((i) => i.slot === slot.key).length;
    if (n !== slot.print) throw new Error(`${slot.code}: selection has ${n} questions but the slot prints ${slot.print}`);
    if (slot.attempt > slot.print) throw new Error(`${slot.code}: attempt ${slot.attempt} > print ${slot.print}`);
    total += slot.attempt * slot.marksEach;
  }
  if (total !== 20) throw new Error(`marks add to ${total}, expected 20 (the school's Algebra Unit Test 1 shape)`);
  return total;
}

/** The hand-assembly plan: which printed numbers belong to which slot. */
function slotPlan(rows: QuestionRow[], order: UnitTestItem[], totalMarks: number): string {
  const L: string[] = [];
  L.push(`# ${UNIT_TEST_TITLE}`);
  L.push("");
  L.push(`**${totalMarks} marks · 60 minutes · mirrors the school's Algebra Unit Test 1 shape**`);
  L.push("");
  L.push(
    "The .docx renders a FLAT numbered list — the export layer has no written-paper " +
      "renderer yet (see the header of build-unit-test-geometry.ts). Insert the four " +
      "headings below at the printed positions given, add the header block and the " +
      "general instructions, and the paper is in format."
  );
  L.push("");
  L.push("## Header block");
  L.push("");
  L.push("```");
  L.push("Dr. APJ Innovation School & Junior College, Sonde Karla, Velhe");
  L.push("First Unit Test — Mathematics Part II (Geometry)");
  L.push("(2026-2027)");
  L.push("Date -                                              Std - 10th");
  L.push("Duration - 1 Hour                                   Marks - 20");
  L.push("```");
  L.push("");
  L.push("**General instructions** (the Algebra paper carries none of these; the board paper carries all):");
  L.push("");
  UNIT_TEST_INSTRUCTIONS.forEach((s, i) => L.push(`${i + 1}. ${s}`));
  L.push("");
  let n = 0;
  for (const slot of UNIT_TEST_SLOTS) {
    const items = order.filter((i) => i.slot === slot.key);
    const from = n + 1;
    n += items.length;
    const marks = slot.attempt * slot.marksEach;
    L.push(`## ${slot.code} — printed questions ${from}–${n}  ·  ${marks} marks`);
    L.push("");
    L.push(`*${slot.label}.*${slot.instruction ? ` **${slot.instruction}.**` : ""}`);
    L.push("");
    L.push(`Prints ${slot.print}, student answers ${slot.attempt}, ${slot.marksEach} mark(s) each.`);
    L.push("");
    L.push("| Printed # | Sub-label | Source | Book ref | Subtopic | Difficulty | Why |");
    L.push("|---|---|---|---|---|---|---|");
    items.forEach((it, k) => {
      const row = rows[from - 1 + k];
      const sub = slot.key === "q4" ? `(${k + 1})` : `(${k + 1})`;
      const src = it.kind === "pyq" ? "board PYQ" : "textbook";
      L.push(`| ${from + k} | ${sub} | ${src} | ${it.ref} | ${it.subtopic} | ${row?.difficulty ?? "?"} | ${it.note} |`);
    });
    L.push("");
  }
  L.push(`**Total: ${totalMarks} marks.**`);
  L.push("");
  L.push("### Notes for formatting");
  L.push("");
  L.push("- Label Q.4's two alternatives **(1)** and **(2)** with **OR** between them. The Algebra paper labelled them `(1)` and `(b)`.");
  L.push("- Print the marks for each sub-question in the right margin — the Algebra paper gives only block totals.");
  L.push("- Wording is *\"Attempt any THREE of the following\"*; the Algebra paper reads *\"Solve any three among the following\"*.");
  L.push("- Title the paper **Mathematics Part II (Geometry)**, not just *Mathematics* — Class 10 Maths is two papers.");
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

  const totalMarks = assertBlueprint();
  await assertSelection(client);

  const ordered = [...UNIT_TEST];
  const ids = ordered.map((i) => i.id);

  // queryQuestionsByIds returns rows in the ORDER OF THE IDS PASSED, which is what
  // preserves slot order here — do not sort the result.
  const rows = await queryQuestionsByIds(client, ids);
  if (rows.length !== ids.length) throw new Error(`expected ${ids.length} rows, got ${rows.length}`);

  stripBoilerplateContext(rows);

  console.log(`${UNIT_TEST_TITLE}\n`);
  let n = 0;
  for (const slot of UNIT_TEST_SLOTS) {
    const items = ordered.filter((i) => i.slot === slot.key);
    console.log(
      `  ${slot.code}  ${items.length} printed / ${slot.attempt} attempted x ${slot.marksEach}` +
        ` = ${slot.attempt * slot.marksEach} marks` +
        (slot.instruction ? `   [${slot.instruction}]` : "")
    );
    for (const it of items) {
      n += 1;
      const row = rows[n - 1];
      console.log(
        `      ${String(n).padStart(2)}. ${(it.kind === "pyq" ? "PYQ " : "text").padEnd(5)}` +
          `${it.ref.padEnd(12)} ${(row?.difficulty ?? "?").padEnd(9)} ${it.subtopic}`
      );
    }
  }
  console.log(`\n  total ${n} printed questions, ${totalMarks} marks`);

  const mcq = rows.filter((r) => r.questionFormat === "mcq").length;
  const withSol = rows.filter((r) => r.solution).length;
  const withFig = rows.filter((r) => r.imageUrl).length;
  const pyq = ordered.filter((i) => i.kind === "pyq").length;
  console.log(`  ${mcq} MCQ · ${rows.length - mcq} subjective · ${withSol}/${rows.length} carry a solution`);
  console.log(`  ${pyq} board PYQ · ${rows.length - pyq} textbook · ${withFig} with a figure (must be 0)`);
  if (withFig !== 0) throw new Error(`${withFig} selected question(s) carry a figure — this paper is meant to be figure-free`);
  const subs = new Set(ordered.map((i) => i.subtopic));
  console.log(`  ${subs.size} of the chapter's 7 subtopics represented`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write the .docx pair + slot plan.");
    return;
  }

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const paper = await buildQuestionPaper({ title: UNIT_TEST_TITLE, questions: rows });
  writeFileSync(join(outDir, `${BASE}.docx`), paper);

  const keyDoc = await buildAnswerKey({
    title: `${UNIT_TEST_TITLE} · ${KEY_SUFFIX}`,
    questions: rows,
    includeSolutions: true,
  });
  writeFileSync(join(outDir, `${BASE}_Key.docx`), keyDoc);
  writeFileSync(join(outDir, `${BASE}_Slots.md`), slotPlan(rows, ordered, totalMarks), "utf8");

  console.log(`\nwrote:\n  ${BASE}.docx\n  ${BASE}_Key.docx\n  ${BASE}_Slots.md\nin ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
