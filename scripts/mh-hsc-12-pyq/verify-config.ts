/**
 * Check every configured chapter against the LIVE database before any extraction
 * or commit.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/verify-config.ts            # all chapters
 *   npx tsx scripts/mh-hsc-12-pyq/verify-config.ts Physics    # one subject
 *
 * Exists because both failure modes here are SILENT:
 *   - a chapterName that does not match the DB row auto-CREATES a second chapter
 *     on commit, forking the corpus in two with no error (the mh-ssc-10-text
 *     lesson);
 *   - a subtopic that does not match is refused by assign.ts, but only after a
 *     whole chapter has been transcribed and assigned.
 * Also confirms the source .docx is where config says it is — one Physics
 * filename carries a double space that is easy to normalise away by accident.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, CHAPTERS, type Chapter } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const only = process.argv[2];
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: subjects, error: se } = await client
    .from("subjects")
    .select("id,name")
    .eq("exam_id", EXAM_ID);
  if (se) throw se;

  const chapters = Object.values(CHAPTERS).filter(
    (c: Chapter) => !only || c.subjectName === only,
  );
  let problems = 0;
  const report = (msg: string) => {
    problems += 1;
    console.log(`  ✗ ${msg}`);
  };

  for (const ch of chapters) {
    const subject = (subjects ?? []).find((s) => s.name === ch.subjectName);
    console.log(`\n${ch.id}  (${ch.subjectName} / ${ch.chapterName})`);

    if (!existsSync(ch.docx)) report(`source .docx not found: ${ch.docx}`);
    if (!subject) {
      report(`subject "${ch.subjectName}" does not exist on this exam`);
      continue;
    }

    const { data: rows, error: ce } = await client
      .from("chapters")
      .select("id,name")
      .eq("subject_id", subject.id)
      .eq("name", ch.chapterName);
    if (ce) throw ce;
    if (!rows?.length) {
      // Name it explicitly: this is the case that would auto-create on commit.
      const { data: near } = await client
        .from("chapters")
        .select("name")
        .eq("subject_id", subject.id);
      report(
        `no DB chapter named "${ch.chapterName}" — commit would CREATE one. ` +
          `Existing: ${(near ?? []).map((n) => `"${n.name}"`).join(", ")}`,
      );
      continue;
    }

    const { data: subs, error: te } = await client
      .from("subtopics")
      .select("name")
      .eq("chapter_id", rows[0].id);
    if (te) throw te;
    const live = new Set((subs ?? []).map((s) => s.name));
    const configured = new Set(ch.subtopics);

    for (const name of ch.subtopics) {
      if (!live.has(name)) report(`configured subtopic not in DB: "${name}"`);
    }
    for (const name of live) {
      // Not a failure — a chapter may legitimately hold a subtopic the PYQs
      // never touch — but worth seeing, since the axis is meant to be shared.
      if (!configured.has(name)) console.log(`  · DB subtopic not configured: "${name}"`);
    }
    if (live.size === configured.size && ch.subtopics.every((n) => live.has(n))) {
      console.log(`  ✓ chapter + all ${live.size} subtopics match`);
    }
  }

  console.log(
    problems === 0
      ? `\nOK — ${chapters.length} chapter(s) verified against the live DB.`
      : `\n${problems} problem(s). Fix config before extracting.`,
  );
  process.exit(problems === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
