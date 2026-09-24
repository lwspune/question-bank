/**
 * GROUNDING AUDIT for the Geography BOARD PAPER answers — does every factual
 * claim in an authored answer appear anywhere in the Class-12 Geography
 * textbook, or in the question's own stem and context?
 *
 *   npx tsx scripts/mh-hsc-12-geo-pyq/audit-grounding.ts <paperId>
 *   npx tsx scripts/mh-hsc-12-geo-pyq/audit-grounding.ts --all
 *
 * WHY THIS IS THE ONLY CHECK THIS LANE HAS. A board question paper prints no
 * answer key, no solutions and no worked examples — measured across all 124
 * pages of the six PDFs. So there is nothing to diff against, every MCQ key is
 * derived and every model answer authored, and the failure mode is not a wrong
 * key but a FLUENT INVENTION: a real-sounding place, figure, organisation or
 * year that the syllabus never mentions and a student would then memorise.
 *
 * THE HAYSTACK IS THE WHOLE BOOK, NOT ONE CHAPTER, and that is the difference
 * from the textbook lane's copy of this probe. There, an answer is written from
 * one chapter and anything outside it is suspect — the tight scope IS the
 * signal, and it caught seven inventions. Here a board question deliberately
 * cuts across the syllabus: a "give geographical reasons" answer about industry
 * may legitimately cite a grassland from the primary-activities chapter. Scoping
 * to one chapter would therefore manufacture a finding from every correct
 * cross-chapter example. So all eight chapter dumps are concatenated, plus the
 * question's own stem and context, and a hit means the claim is outside the
 * SYLLABUS — which for a board answer is the question worth asking.
 *
 * PREREQUISITE: the eight chapter text dumps must exist —
 *   npx tsx scripts/stateboard/dump-text.ts <chapterId>   (per Geography chapter)
 *
 * READ IT AS TRIAGE, NOT A GATE. Two things it cannot do, both of which matter
 * more here than on the textbook lane:
 *   • It cannot see an invention phrased in ordinary lowercase words ("output
 *     tripled in the last decade"), because it only tests distinctive tokens.
 *   • A hit is NOT automatically wrong. A board answer may cite a real place the
 *     textbook happens not to name, and naming it can be the better answer. The
 *     question a hit asks is "is this true, and does the syllabus support it?",
 *     which a human answers, not this script.
 * Exits 0 always.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ungroundedTokens, type Hit } from "../lib/grounding";
import { OUT as SB_OUT, CHAPTERS as SB_CHAPTERS } from "../stateboard/config";
import { EXAM_ID, PAPERS, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Every Geography chapter dump, concatenated. Missing dumps are NAMED, not skipped. */
function loadSyllabus(): { text: string; missing: string[] } {
  const ids = Object.values(SB_CHAPTERS as Record<string, { id: string; subjectName?: string }>)
    .map((c) => c.id)
    .filter((id) => id.endsWith("-geo"));
  const parts: string[] = [];
  const missing: string[] = [];
  for (const id of ids) {
    const p = join(SB_OUT, `${id}.text.md`);
    if (!existsSync(p)) missing.push(id);
    else parts.push(readFileSync(p, "utf8"));
  }
  return { text: parts.join("\n\n"), missing };
}

async function main() {
  const arg = process.argv[2];
  if (!arg) throw new Error("usage: audit-grounding.ts <paperId> | --all");
  const ids = arg === "--all" ? Object.keys(PAPERS) : [arg];

  const { text: syllabus, missing } = loadSyllabus();
  if (missing.length) {
    console.log(
      `⚠ ${missing.length} Geography chapter dump(s) absent, so their content counts as\n` +
        `  UNGROUNDED and this run will over-report: ${missing.join(", ")}\n` +
        `  Run scripts/stateboard/dump-text.ts for each before trusting the output.\n`
    );
  }
  console.log(`syllabus haystack: ${syllabus.length.toLocaleString()} chars from ${8 - missing.length}/8 chapters\n`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let totalHits = 0;
  let totalRows = 0;
  for (const id of ids) {
    const paper = requirePaper(id);
    const { data: rows, error } = await db
      .from("questions")
      .select("question_number, text, context, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .order("source_row");
    if (error) throw new Error(error.message);

    const hits: Hit[] = [];
    for (const r of rows ?? []) {
      if (!r.solution) continue;
      // The question's own words are ground truth too: a stem naming Ratnagiri
      // licenses an answer naming Ratnagiri whether or not the book does.
      const hay = `${syllabus}\n\n${r.text ?? ""}\n\n${r.context ?? ""}`;
      for (const h of ungroundedTokens(r.solution as string, hay)) {
        hits.push({ ...h, ref: (r.question_number as string) ?? h.ref });
      }
    }
    totalRows += rows?.length ?? 0;
    totalHits += hits.length;
    console.log(`=== ${id} (${paper.month} ${paper.year}) — ${rows?.length ?? 0} rows, ${hits.length} hit(s)`);
    const byRef = new Map<string, Hit[]>();
    for (const h of hits) byRef.set(h.ref, [...(byRef.get(h.ref) ?? []), h]);
    for (const [ref, hs] of byRef) {
      console.log(`  ${ref.padEnd(12)} ${hs.map((h) => `${h.token} [${h.kind}]`).join(", ")}`);
    }
  }
  console.log(
    `\n${totalHits} ungrounded token(s) across ${totalRows} row(s). TRIAGE — a hit is a question,\n` +
      `not a verdict, and a clean run is not proof of grounding.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
