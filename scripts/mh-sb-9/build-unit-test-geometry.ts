/**
 * Build the Class-9 Geometry Unit Test 1 (Basic Concepts in Geometry) as .docx.
 *
 *   npx tsx scripts/mh-sb-9/build-unit-test-geometry.ts            # dry run
 *   npx tsx scripts/mh-sb-9/build-unit-test-geometry.ts --apply
 *   npx tsx scripts/mh-sb-9/build-unit-test-geometry.ts --apply --out=<dir>
 *
 * Output (default `generated-papers/`, gitignored + regenerable):
 *   MH_SB_9_Geometry_Unit_Test_1.docx        — questions only
 *   MH_SB_9_Geometry_Unit_Test_1_Key.docx    — questions + full model solutions
 *   MH_SB_9_Geometry_Unit_Test_1_Slots.md    — the assembly plan
 *
 * ⚠ FLAT OUTPUT, BY REQUEST. buildQuestionPaper renders one numbered item per
 * ROW and has no written-paper slot renderer (no "Q.1" heading, no "Attempt any
 * THREE", no marks column — those live on WrittenSlot and never reach
 * docxBuilder). This chapter is stored at SUB-ITEM granularity, so a three-part
 * question prints as three consecutive numbered items sharing one "Common
 * context" line. The _Slots.md plan says exactly which printed numbers merge into
 * which question and with what roman labels; the shared context becomes the
 * merged stem, so assembly is a formatting step, not a reconstruction.
 *
 * FIGURE-FREE by selection, so the answer key's inability to embed question
 * figures (AnswerKeyInput.imageBytes is documented as ignored) costs nothing.
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
  BOILERPLATE_CONTEXT,
  type UnitTestItem,
} from "./unit-test-geometry-1";
import { EXAM_ID } from "./config";

const BASE = "MH_SB_9_Geometry_Unit_Test_1";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}
function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/** Verify every recorded id still points at a PUBLIC row whose ref and subtopic
 *  match the selection. Keyed by id because refs repeat across this bank. */
async function assertSelection(client: SupabaseClient): Promise<void> {
  const ids = UNIT_TEST.map((i) => i.id);
  const dupes = ids.filter((id, k) => ids.indexOf(id) !== k);
  if (dupes.length) throw new Error(`the same question is selected twice: ${dupes.join(", ")}`);

  const { data, error } = await client
    .from("questions")
    .select("id, question_number, visibility, image_url, solution, subtopics(name)")
    .in("id", ids);
  if (error) throw new Error(`verification read failed: ${error.message}`);
  const live = new Map(
    ((data ?? []) as unknown as {
      id: string; question_number: string | null; visibility: string; image_url: string | null;
      solution: string | null; subtopics: { name: string } | null;
    }[]).map((r) => [r.id, r])
  );

  const problems: string[] = [];
  for (const it of UNIT_TEST) {
    const r = live.get(it.id);
    if (!r) { problems.push(`${it.ref}: id ${it.id} no longer exists`); continue; }
    if (r.visibility !== "PUBLIC") problems.push(`${it.ref}: is ${r.visibility}, not PUBLIC`);
    if (r.question_number !== it.ref) problems.push(`ref drifted "${it.ref}" -> "${r.question_number}"`);
    if (r.subtopics?.name !== it.subtopic) problems.push(`${it.ref}: subtopic drifted "${it.subtopic}" -> "${r.subtopics?.name}"`);
    // The paper is meant to be figure-free; a figure appearing here would print
    // in the QUESTION paper but never in the key, which is the worst combination.
    if (r.image_url) problems.push(`${it.ref}: has a figure — this paper is figure-free`);
    // A blank solution means the answer key would print the question and nothing
    // else. That is precisely the defect this chapter had before today.
    if (!r.solution || !r.solution.trim()) problems.push(`${it.ref}: has NO solution — the key would be blank for it`);
  }
  if (problems.length) {
    throw new Error(`SELECTION DRIFT — fix scripts/mh-sb-9/unit-test-geometry-1.ts:\n  ` + problems.join("\n  "));
  }
}

/** Assert the printed shape adds up to the marks it claims. */
function assertBlueprint(): number {
  let total = 0;
  for (const slot of UNIT_TEST_SLOTS) {
    const qs = new Set(UNIT_TEST.filter((i) => i.slot === slot.key).map((i) => i.ord));
    if (qs.size !== slot.questions) throw new Error(`${slot.code}: selection has ${qs.size} questions but the slot wants ${slot.questions}`);
    if (slot.attempt > slot.questions) throw new Error(`${slot.code}: attempt ${slot.attempt} > questions ${slot.questions}`);
    total += slot.attempt * slot.marksEach;
  }
  if (total !== 20) throw new Error(`marks add to ${total}, expected 20 (the school's Class-9 paper shape)`);
  return total;
}

/** Drop context strings that merely restate a slot heading. Narrow on purpose —
 *  a context carrying real shared data (the co-ordinate table, "write the
 *  converse of") must survive or its question becomes unanswerable. */
function stripBoilerplateContext(rows: QuestionRow[]): void {
  const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
  const bad = new Set(BOILERPLATE_CONTEXT.map(norm));
  let dropped = 0;
  for (const r of rows) {
    if (r.context && bad.has(norm(r.context))) {
      (r as { context: string | null }).context = null;
      dropped++;
    }
  }
  if (dropped) console.log(`  (dropped ${dropped} boilerplate context line(s) — duplicates the Q.1 heading)`);
}

function slotPlan(rows: QuestionRow[], order: UnitTestItem[], totalMarks: number): string {
  const L: string[] = [];
  L.push(`# ${UNIT_TEST_TITLE}`);
  L.push("");
  L.push(`**${totalMarks} marks · 60 minutes · mirrors the school's Class-9 Maths I paper shape**`);
  L.push("");
  L.push(
    "The .docx is a FLAT numbered list. This chapter is stored at sub-item level, " +
      "so several questions print as consecutive numbered items sharing one *Common " +
      "context* line. **Merge the printed numbers shown in each `Merge` cell into a " +
      "single question**, using that shared context as the stem and (i)/(ii)/(iii) " +
      "as the sub-labels."
  );
  L.push("");
  L.push("## Header block");
  L.push("");
  L.push("```");
  L.push("Dr. APJ Innovation School & Junior College, Sonde Karla, Velhe");
  L.push("First Unit Test — Mathematics II (Geometry)");
  L.push("(2026-2027)");
  L.push("Date -                                              Std - 9th");
  L.push("Duration - 1 Hour                                   Marks - 20");
  L.push("```");
  L.push("");
  L.push("**General instructions** (the school's Class-9 paper carries none of these):");
  L.push("");
  UNIT_TEST_INSTRUCTIONS.forEach((s, i) => L.push(`${i + 1}. ${s}`));
  L.push("");

  let printed = 0;
  for (const slot of UNIT_TEST_SLOTS) {
    const items = order.filter((i) => i.slot === slot.key);
    const from = printed + 1;
    printed += items.length;
    const marks = slot.attempt * slot.marksEach;
    L.push(`## ${slot.code} — printed items ${from}–${printed}  ·  ${marks} marks`);
    L.push("");
    L.push(`*${slot.label}.*${slot.instruction ? ` **${slot.instruction}.**` : ""}`);
    L.push("");
    L.push(`${slot.questions} questions, student answers ${slot.attempt}, ${slot.marksEach} mark(s) each.`);
    L.push("");
    L.push("| Question | Merge printed # | Parts | Book ref | Subtopic | Why |");
    L.push("|---|---|---|---|---|---|");
    const ords = [...new Set(items.map((i) => i.ord))];
    for (const ord of ords) {
      const parts = items.filter((i) => i.ord === ord);
      const idx = parts.map((p) => from + items.indexOf(p));
      const range = idx.length === 1 ? `${idx[0]}` : `${idx[0]}–${idx[idx.length - 1]}`;
      const labels = parts[0].part ? parts.map((p) => `(${p.part})`).join(" ") : "—";
      const refs = parts.length === 1 ? parts[0].ref : parts[0].ref.replace(/\((i|ii|iii|iv|v)\)$/, "").trim();
      L.push(`| (${ord}) | ${range} | ${labels} | ${refs} | ${parts[0].subtopic} | ${parts[0].note} |`);
    }
    L.push("");
  }
  L.push(`**Total: ${totalMarks} marks.**`);
  L.push("");
  L.push("### Formatting notes");
  L.push("");
  L.push("- Label Q.4's two alternatives **(1)** and **(2)** with **OR** between them — as your Class-9 Maths I paper already does correctly.");
  L.push("- Print the marks for each sub-question in the right margin.");
  L.push("- Wording is *\"Attempt any THREE of the following\"*; your paper reads *\"Solve any three among the following\"*.");
  L.push("- Title it **Mathematics II (Geometry)** — your Part I paper is titled *Mathematics I*.");
  L.push("- Q.3 (2) carries a co-ordinate TABLE in its shared context. It renders as a real Word table; keep it above the three sub-parts.");
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
  const rows = await queryQuestionsByIds(client, ids);
  if (rows.length !== ids.length) throw new Error(`expected ${ids.length} rows, got ${rows.length}`);
  stripBoilerplateContext(rows);

  console.log(`${UNIT_TEST_TITLE}\n`);
  let printed = 0;
  for (const slot of UNIT_TEST_SLOTS) {
    const items = ordered.filter((i) => i.slot === slot.key);
    console.log(
      `  ${slot.code}  ${slot.questions} questions / ${slot.attempt} attempted x ${slot.marksEach}` +
        ` = ${slot.attempt * slot.marksEach} marks  (${items.length} printed item(s))` +
        (slot.instruction ? `   [${slot.instruction}]` : "")
    );
    for (const ord of [...new Set(items.map((i) => i.ord))]) {
      const parts = items.filter((i) => i.ord === ord);
      const first = printed + items.indexOf(parts[0]) + 1;
      const last = first + parts.length - 1;
      const span = parts.length === 1 ? `#${first}` : `#${first}-${last}`;
      console.log(`      (${ord}) ${span.padEnd(8)} ${parts.map((p) => p.ref).join(", ")}`);
    }
    printed += items.length;
  }
  console.log(`\n  ${printed} printed items -> ${UNIT_TEST_SLOTS.reduce((s, x) => s + x.questions, 0)} questions, ${totalMarks} marks`);
  const subs = new Set(ordered.map((i) => i.subtopic));
  console.log(`  ${subs.size} of the chapter's 6 subtopics represented`);
  console.log(`  ${rows.filter((r) => r.imageUrl).length} with a figure (must be 0) · ${rows.filter((r) => r.solution).length}/${rows.length} carry a solution`);

  if (!apply) { console.log("\n[dry-run] pass --apply to write the .docx pair + slot plan."); return; }

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${BASE}.docx`), await buildQuestionPaper({ title: UNIT_TEST_TITLE, questions: rows }));
  writeFileSync(
    join(outDir, `${BASE}_Key.docx`),
    await buildAnswerKey({ title: `${UNIT_TEST_TITLE} · Answer Key`, questions: rows, includeSolutions: true })
  );
  writeFileSync(join(outDir, `${BASE}_Slots.md`), slotPlan(rows, ordered, totalMarks), "utf8");
  console.log(`\nwrote:\n  ${BASE}.docx\n  ${BASE}_Key.docx\n  ${BASE}_Slots.md\nin ${outDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
