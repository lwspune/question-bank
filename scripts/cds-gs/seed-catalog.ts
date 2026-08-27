/**
 * Generate scripts/cds-gs/catalog.json — the HARD-validated chapter/subtopic
 * catalog for CDS General Knowledge — by MIRRORING the NDA GAT-GK taxonomy.
 *
 *   npx tsx scripts/cds-gs/seed-catalog.ts          # print a summary, write nothing
 *   npx tsx scripts/cds-gs/seed-catalog.ts --write  # (re)generate catalog.json
 *
 * WHY MIRROR RATHER THAN AUTHOR: CDS General Knowledge and NDA's GAT General
 * Knowledge half test the same syllabus, and NDA's 8-subject / 59-chapter /
 * 246-subtopic taxonomy is already technique-canonical — it cost a full
 * bank-wide cleanup pass to reach that state (see CLAUDE.md "Cleaned subjects").
 * Re-authoring it from scratch would re-earn every one of those decisions badly.
 *
 * ONE-SHOT, NOT A LIVE READ. catalog.json is COMMITTED and is the source of
 * truth from the moment it exists: a hard-validation catalog that silently
 * changes underneath an ingest is worthless, and NDA's taxonomy keeps moving
 * (Phase-D splits land on it regularly). Re-running this with --write after
 * the pilot would be a taxonomy migration, not a refresh — treat it as one.
 *
 * The generated file is a STARTING POINT that is then EXTENDED BY HAND for the
 * places CDS asks more than NDA does (Economics is 1 chapter / 3 subtopics in
 * NDA and CDS leans on it far harder). Extensions live in catalog.json only —
 * never re-derived from NDA.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const NDA_GK_SUBJECTS = ["Physics", "Chemistry", "Biology", "History", "Geography", "Polity", "Economics", "Current Affairs"];

async function main() {
  loadEnv();
  const write = process.argv.includes("--write");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: nda, error: eErr } = await client.from("exams").select("id").eq("name", "NDA").single();
  if (eErr || !nda) throw new Error(`NDA exam lookup failed: ${eErr?.message}`);

  const { data: subjects, error: sErr } = await client
    .from("subjects")
    .select("id, name, chapters(id, name, subtopics(id, name))")
    .eq("exam_id", nda.id)
    .in("name", NDA_GK_SUBJECTS);
  if (sErr) throw new Error(`subject read failed: ${sErr.message}`);

  // Order deliberately: subjects in NDA_GK_SUBJECTS order (stable, human-meaningful),
  // chapters + subtopics alphabetically (the DB returns no ordering guarantee, and an
  // unordered catalog produces a meaningless diff on every regeneration).
  const catalog: Record<string, Record<string, string[]>> = {};
  for (const name of NDA_GK_SUBJECTS) {
    const s = (subjects ?? []).find((x) => x.name === name);
    if (!s) throw new Error(`NDA subject "${name}" not found — refusing to emit a partial catalog`);
    const chapters: Record<string, string[]> = {};
    for (const c of [...(s.chapters ?? [])].sort((a, b) => a.name.localeCompare(b.name))) {
      chapters[c.name] = [...(c.subtopics ?? [])].map((t) => t.name).sort((a, b) => a.localeCompare(b));
    }
    catalog[name] = chapters;
  }

  let chapters = 0;
  let subtopics = 0;
  for (const [subject, chs] of Object.entries(catalog)) {
    const nCh = Object.keys(chs).length;
    const nSt = Object.values(chs).reduce((a, b) => a + b.length, 0);
    chapters += nCh;
    subtopics += nSt;
    console.log(`  ${subject.padEnd(16)} ${String(nCh).padStart(2)} ch  ${String(nSt).padStart(3)} subtopics`);
  }
  console.log(`\ntotal: ${Object.keys(catalog).length} subjects, ${chapters} chapters, ${subtopics} subtopics`);

  const out = join(__dirname, "catalog.json");
  if (!write) {
    console.log(`\n[dry-run] pass --write to (re)generate ${out}. Nothing written.`);
    return;
  }
  writeFileSync(out, JSON.stringify(catalog, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
