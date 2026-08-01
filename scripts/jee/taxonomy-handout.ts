/**
 * Regenerate the classification handout for a subject FROM THE LIVE DB.
 *
 *   npx tsx scripts/jee/taxonomy-handout.ts --subject=Chemistry
 *
 * Why this is a script and not a manual step: on the 2026 Maths batch a STALE
 * handout (written before a chapter reshape) made the agents classify into
 * retired chapter names, and commit would have re-created the dead chapters.
 * The handout must be regenerated immediately before every agent batch —
 * especially mid-ingest, when earlier batches have auto-created new subtopics
 * that later batches must reuse rather than duplicate under a synonym.
 *
 * Writes out/_<subject>_taxonomy.txt.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";
import { parseSubjectArg } from "./lib";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const HEADER = (subject: string, stamp: string, chapters: number, subtopics: number) => `JEE Mains — ${subject} taxonomy (regenerated from the LIVE DB, ${stamp}).
${chapters} chapters · ${subtopics} subtopics.

HOW TO USE THIS FILE
1. Prefer an EXISTING (chapter, subtopic) pair below. Copy both names EXACTLY.
2. If an existing subtopic fits, USE IT — do not coin a near-synonym. A bank with
   both "Nernst Equation and Cell EMF" and "Nernst Equation" is worse than one
   with either.
3. When nothing fits: keep the CHAPTER from the list (the chapter spine is the
   NCERT one and is almost certainly right), put your best-fit existing subtopic
   in \`subtopic\`, and put your PROPOSED subtopic name in \`taxonomyGap\`.
   Never invent a subtopic silently. Never force a bad fit.
4. Only propose a NEW CHAPTER if the question belongs to none below. Say so
   loudly in \`taxonomyGap\` — that is a taxonomy decision, not a classification.

CHAPTERS :: SUBTOPICS

`;

async function main() {
  loadEnv();
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: subj, error: se } = await db
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", subject)
    .single();
  if (se || !subj) throw new Error(`subject not found: ${subject} (${se?.message})`);

  const { data: chapters, error: ce } = await db
    .from("chapters")
    .select("name, subtopics(name)")
    .eq("subject_id", subj.id)
    .order("name");
  if (ce) throw new Error(ce.message);

  const rows = (chapters ?? []).map((c: any) => ({
    name: c.name as string,
    subs: ((c.subtopics ?? []) as { name: string }[]).map((s) => s.name).sort(),
  }));
  const subCount = rows.reduce((n, r) => n + r.subs.length, 0);

  const stamp = new Date().toISOString().slice(0, 10);
  const body = rows.map((r) => `${r.name} :: ${r.subs.join(" | ")}`).join("\n");
  const path = join("scripts/jee/out", `_${subject.toLowerCase()}_taxonomy.txt`);
  writeFileSync(path, HEADER(subject, stamp, rows.length, subCount) + body + "\n", "utf8");
  console.log(`wrote ${rows.length} chapters / ${subCount} subtopics -> ${path}`);
}

main();
