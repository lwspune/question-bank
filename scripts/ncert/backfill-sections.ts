/**
 * Backfill the book-faithful section columns (migration 0043) for one State
 * Board chapter — populate section_kind / section_group / section_label /
 * section_seq so the /board reader can render the chapter in book order.
 *
 *   npx tsx scripts/ncert/backfill-sections.ts <chapterId>          # dry-run: print the reconstructed outline
 *   npx tsx scripts/ncert/backfill-sections.ts <chapterId> --apply  # write the columns
 *
 * Source of truth: the authored, PDF-verified outline in sections.ts + the
 * committed transcription data/<id>.questions.json (ref + bucket). We update
 * live rows by (exam_id, source_file, question_number = ref). Idempotent —
 * re-running rewrites the same values. Refuses --apply if any ref is unmatched
 * or contradicts its block kind (fix the outline first).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { assignSections, type SBQuestion } from "./lib";
import { sectionsFor } from "./sections";
import { ORG_ID, EXAM_ID, requireChapter, questionsJsonPath } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  const specs = sectionsFor(id);

  const questions: SBQuestion[] = JSON.parse(readFileSync(questionsJsonPath(id), "utf8"));
  const { assignments, unmatched, mismatches, emptySpecs } = assignSections(
    questions.map((q) => ({ ref: q.ref, bucket: q.bucket })),
    specs
  );

  // Reconstructed outline, in book order.
  console.log(`\n${ch.chapterName} — reconstructed book outline (${assignments.length} q):\n`);
  const byBlock = new Map<number, { group: string; label: string; kind: string; n: number }>();
  for (const a of assignments) {
    const b = byBlock.get(a.sectionSeq) ?? { group: a.sectionGroup, label: a.sectionLabel, kind: a.sectionKind, n: 0 };
    b.n++;
    byBlock.set(a.sectionSeq, b);
  }
  let lastGroup = "";
  for (const seq of [...byBlock.keys()].sort((a, b) => a - b)) {
    const b = byBlock.get(seq)!;
    if (b.group !== lastGroup) {
      console.log(`  ${b.group}`);
      lastGroup = b.group;
    }
    const kindTag = b.kind === "solved_example" ? "solved" : b.kind === "exercise" ? "exercise" : "misc";
    const label = b.label === b.group ? "(questions)" : b.label;
    console.log(`      [${String(seq).padStart(2)}] ${label.padEnd(34)} ${String(b.n).padStart(3)} q  · ${kindTag}`);
  }

  const problems = unmatched.length + mismatches.length;
  if (unmatched.length) {
    console.log(`\n⚠ ${unmatched.length} ref(s) matched NO block (fix sections.ts):`);
    for (const r of unmatched) console.log(`    ${r}`);
  }
  if (mismatches.length) {
    console.log(`\n⚠ ${mismatches.length} bucket/kind mismatch(es):`);
    for (const m of mismatches) console.log(`    ${m.ref}: ${m.reason}`);
  }
  if (emptySpecs.length) {
    console.log(`\n· ${emptySpecs.length} outline block(s) matched nothing:`);
    for (const s of emptySpecs) console.log(`    ${s}`);
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write the section columns. Nothing updated.`);
    return;
  }
  if (problems) throw new Error("refusing to --apply with unmatched refs or bucket/kind mismatches — fix sections.ts first.");

  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let updated = 0;
  const missing: string[] = [];
  for (const a of assignments) {
    const { data, error } = await client
      .from("questions")
      .update({
        section_kind: a.sectionKind,
        section_group: a.sectionGroup,
        section_label: a.sectionLabel,
        section_seq: a.sectionSeq,
      })
      .eq("org_id", ORG_ID)
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", a.ref)
      .select("id");
    if (error) throw new Error(`update failed for "${a.ref}": ${error.message}`);
    if (!data || data.length === 0) missing.push(a.ref);
    else updated += data.length;
  }

  console.log(`\napplied: ${updated} rows updated.`);
  if (missing.length) {
    console.log(`⚠ ${missing.length} ref(s) in the outline had NO matching live row (question_number mismatch?):`);
    for (const r of missing) console.log(`    ${r}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
